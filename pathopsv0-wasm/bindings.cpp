#include <emscripten/bind.h>
#include "PathOps.h"
#include "PathOpsTypes.h"
#include "skia/SkiaPaths.h"
#include "curves/Line.h"
#include "curves/NoCurve.h"
#include "curves/QuadBezier.h"
#include "OpContour.h"
#include "OpMath.h"
#include "OpDebug.h"

using namespace emscripten;
using namespace PathOpsV0Lib;
using IntPtr = int*;

static std::vector<std::vector<OpPoint>> allPoints;

// Helper functions
uintptr_t getAddContextData(AddContext& self) {
    return reinterpret_cast<uintptr_t>(self.data);
}

void setAddContextData(AddContext& self, uintptr_t value) {
    self.data = reinterpret_cast<void*>(value);
}

CurveData* getCurveData(Curve& self) {
    return self.data;
}

void setCurveData(Curve& self, CurveData* value) {
    self.data = value;
}

uintptr_t getAddContourData(AddContour& self) {
    return reinterpret_cast<uintptr_t>(self.data);
}

void setAddContourData(AddContour& self, uintptr_t value) {
    self.data = reinterpret_cast<void*>(value);
}

Context* getAddContourContext(AddContour& self) {
    return self.context;
}

void setAddContourContext(AddContour& self, Context* value) {
    self.context = value;
}

OpContours* getContours(OpContour& self) {
    return self.contours;
}

OpPoint* getAddCurvePoints(AddCurve& self) {
    return self.points;
}

void setAddCurvePoints(AddCurve& self, uintptr_t ptr) {
    self.points = reinterpret_cast<OpPoint*>(ptr);
}

Contour* getAddWindingContour(AddWinding& self) {
    return self.contour;
}

void setAddWindingContour(AddWinding& self, Contour* value) {
    self.contour = value;
}

int* getAddWindingWindings(AddWinding& self) {
    return self.windings;
}

void setAddWindingWindings(AddWinding& self, uintptr_t ptr) {
    self.windings = reinterpret_cast<int*>(ptr);
}

// Wrapper for SetContextCallBacks that accepts function indices
struct ContextCallbacksWrapper {
    static void setCallbacks(Context* context,
                           int emptyPathFunc,      // void (*)(PathOutput)
                           int makeLineFunc,       // Curve (*)(Curve)
                           int setLineTypeFunc,    // CurveType (*)(Curve)
                           int signSwapFunc,       // float (*)(Curve, Curve)
                           int depthFunc,          // int (*)(Curve, Curve)
                           int splitsFunc,         // int (*)(Curve, Curve)
                           int limbsFunc)          // int (*)()
    {
        SetContextCallBacks(
            context,
            reinterpret_cast<EmptyNativePath>(emptyPathFunc),
            reinterpret_cast<MakeLine>(makeLineFunc),
            reinterpret_cast<SetLineType>(setLineTypeFunc),
            reinterpret_cast<MaxSignSwap>(signSwapFunc),
            reinterpret_cast<MaxCurveCurve>(depthFunc),
            reinterpret_cast<MaxCurveCurve>(splitsFunc),
            reinterpret_cast<MaxLimbs>(limbsFunc)
        );
    }
};

// Helper functions for Add/AddQuads with correct structs
struct AddCurveWrapper {
    uintptr_t points;  // Will store pointer as integer
    size_t size;
    CurveType type;
};

struct AddWindingWrapper {
    uintptr_t contour;  // Will store pointer as integer
    uintptr_t windings; // Will store pointer as integer
    size_t size;
};

// Helper functions for Add/AddQuads with wrapped structs
void wrapAdd(const AddCurveWrapper& curveWrapper, const AddWindingWrapper& windingWrapper) {
    AddCurve curve;
    curve.points = reinterpret_cast<OpPoint*>(curveWrapper.points);
    curve.size = curveWrapper.size;
    curve.type = curveWrapper.type;

    AddWinding winding;
    winding.contour = reinterpret_cast<Contour*>(windingWrapper.contour);
    winding.windings = reinterpret_cast<int*>(windingWrapper.windings);
    winding.size = windingWrapper.size;

    Add(curve, winding);
}

struct WindingCallbacksWrapper {
    static void setCallbacks(Contour* contour,
                           int addFunc,
                           int keepFunc,
                           int subtractFunc,
                           int visibleFunc,
                           int zeroFunc)
    {
        SetWindingCallBacks(
            contour,
            reinterpret_cast<WindingAdd>(addFunc),
            reinterpret_cast<WindingKeep>(keepFunc),
            reinterpret_cast<WindingSubtract>(subtractFunc),
            reinterpret_cast<WindingVisible>(visibleFunc),
            reinterpret_cast<WindingZero>(zeroFunc)
            OP_DEBUG_DUMP_PARAMS(nullptr, nullptr, nullptr)
            OP_DEBUG_IMAGE_PARAMS(nullptr, nullptr, nullptr, nullptr, nullptr)
        );
    }
};

EMSCRIPTEN_BINDINGS(pathops_module) {
    // Basic types
    value_object<OpPoint>("OpPoint")
        .field("x", &OpPoint::x)
        .field("y", &OpPoint::y);

    register_vector<OpPoint>("VectorOpPoint");
    register_vector<int>("VectorInt");

    class_<CurveData>("CurveData")
        .property("start", &CurveData::start)
        .property("end", &CurveData::end);

    // Context related
    class_<AddContext>("AddContext")
        .constructor<>()
        .function("getData", &getAddContextData)
        .function("setData", &setAddContextData)
        .property("size", &AddContext::size);

    class_<Context>("Context")
        .constructor<>();

    class_<AddContour>("AddContour")
        .constructor<>()
        .function("getData", &getAddContourData)
        .function("setData", &setAddContourData)
        .function("getContext", &getAddContourContext, allow_raw_pointers())
        .function("setContext", &setAddContourContext, allow_raw_pointers())
        .property("size", &AddContour::size);

    class_<Contour>("Contour")
        .constructor<>();

    class_<OpContour>("OpContour")
        .constructor<>()
        .function("addCallerData", &OpContour::addCallerData)
        .function("apply", &OpContour::apply)
        .function("normalize", &OpContour::normalize)
        .function("makeCoins", &OpContour::makeCoins)
        .function("makeEdges", &OpContour::makeEdges)
        .function("makePals", &OpContour::makePals)
        .function("transferCoins", &OpContour::transferCoins)
        .function("nextID", &OpContour::nextID);

    class_<AddCurve>("AddCurve")
        .constructor<>()
        .function("getPoints", &getAddCurvePoints, allow_raw_pointers())
        .function("setPoints", &setAddCurvePoints, allow_raw_pointers())
        .property("size", &AddCurve::size)
        .property("type", &AddCurve::type);

    class_<AddWinding>("AddWinding")
        .constructor<>()
        .function("getContour", &getAddWindingContour, allow_raw_pointers())
        .function("setContour", &setAddWindingContour, allow_raw_pointers())
        .function("getWindings", &getAddWindingWindings, allow_raw_pointers())
        .function("setWindings", &setAddWindingWindings, allow_raw_pointers())
        .property("size", &AddWinding::size);

    // Curve related
    enum_<CurveType>("CurveType")
        .value("no", CurveType::no)
        .value("line", CurveType::line)
        .value("quad", CurveType::quad)
        .value("conic", CurveType::conic)
        .value("cubic", CurveType::cubic);

    class_<Curve>("Curve")
        .constructor<>()
        .function("getData", select_overload<CurveData*(Curve&)>(&getCurveData), allow_raw_pointers())
        .function("setData", select_overload<void(Curve&, CurveData*)>(&setCurveData), allow_raw_pointers())
        .property("size", &Curve::size)
        .property("type", &Curve::type);

    // Main functions with raw pointer handling
    function("CreateContext", &CreateContext, allow_raw_pointers());
    function("DeleteContext", &DeleteContext, allow_raw_pointers());
    function("CreateContour", &CreateContour, allow_raw_pointers());
    function("Add", &wrapAdd);            // Use our wrapper
    function("AddQuads", &AddQuads, allow_raw_pointers());
    function("Error", &Error, allow_raw_pointers());
    function("Resolve", &Resolve, allow_raw_pointers());

    // Callbacks with raw pointer handling
    function("SetContextCallBacks", &ContextCallbacksWrapper::setCallbacks, allow_raw_pointers());
    function("SetCurveCallBacks", &SetCurveCallBacks, allow_raw_pointers());
    function("SetWindingCallBacks", &WindingCallbacksWrapper::setCallbacks, allow_raw_pointers());

    function("maxDepth", &maxDepth, allow_raw_pointers());
    function("maxSplits", &maxSplits, allow_raw_pointers());
    function("maxSignSwap", &maxSignSwap, allow_raw_pointers());
    function("maxLimbs", &maxLimbs);

    // Line callbacks
    function("noEmptyPath", &noEmptyPath, allow_raw_pointers());
    function("lineAxisRawHit", &lineAxisRawHit, allow_raw_pointers());
    function("lineIsFinite", &lineIsFinite, allow_raw_pointers());
    function("lineIsLine", &lineIsLine, allow_raw_pointers());
    function("lineNormal", &lineNormal, allow_raw_pointers());
    function("linesEqual", &linesEqual, allow_raw_pointers());
    function("linePtAtT", &linePtAtT, allow_raw_pointers());
    function("linePtCount", &linePtCount, allow_raw_pointers());
    function("lineSubDivide", &lineSubDivide, allow_raw_pointers());
    function("lineXYAtT", &lineXYAtT, allow_raw_pointers());

    // Quad callbacks
    function("quadAxisRawHit", &quadAxisRawHit, allow_raw_pointers());
    function("quadHull", &quadHull, allow_raw_pointers());
    function("quadIsFinite", &quadIsFinite, allow_raw_pointers());
    function("quadIsLine", &quadIsLine, allow_raw_pointers());
    function("quadSetBounds", &quadSetBounds, allow_raw_pointers());
    function("quadNormal", &quadNormal, allow_raw_pointers());
    function("quadPinCtrl", &quadPinCtrl, allow_raw_pointers());
    function("quadsEqual", &quadsEqual, allow_raw_pointers());
    function("quadPtAtT", &quadPtAtT, allow_raw_pointers());
    function("quadPtCount", &quadPtCount, allow_raw_pointers());
    function("quadRotate", &quadRotate, allow_raw_pointers());
    function("quadSubDivide", &quadSubDivide, allow_raw_pointers());
    function("quadXYAtT", &quadXYAtT, allow_raw_pointers());
}
