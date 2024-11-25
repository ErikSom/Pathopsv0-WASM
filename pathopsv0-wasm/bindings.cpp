#include <emscripten/bind.h>
#include "PathOps.h"
#include "PathOpsTypes.h"
#include "skia/SkiaPaths.h"
#include "curves/Line.h"
#include "curves/NoCurve.h"
#include "curves/QuadBezier.h"

using namespace emscripten;
using namespace PathOpsV0Lib;

CurveData* getCurveData(Curve& self) {
    return self.data;
}

void setCurveData(Curve& self, CurveData* value) {
    self.data = value;
}

uintptr_t getAddContextData(AddContext& self) {
    return reinterpret_cast<uintptr_t>(self.data);
}

void setAddContextData(AddContext& self, uintptr_t value) {
    self.data = reinterpret_cast<void*>(value);
}

OpContours* getOpContoursFromContext(Context* ctx) {
    return reinterpret_cast<OpContours*>(ctx);
}

EMSCRIPTEN_BINDINGS(my_module) {
    // Expose functions
    function("CreateContext", &CreateContext, allow_raw_pointers());
    function("DeleteContext", &DeleteContext, allow_raw_pointers());
    function("Add", &Add, allow_raw_pointers());
    function("CreateContour", &CreateContour, allow_raw_pointers());
    function("Error", &Error, allow_raw_pointers());
    function("ResetContour", &ResetContour, allow_raw_pointers());
    function("Resolve", &Resolve, allow_raw_pointers());
    function("SetContextCallBacks", &SetContextCallBacks, allow_raw_pointers());
    function("SetCurveCallBacks", &SetCurveCallBacks, allow_raw_pointers());
    function("SetWindingCallBacks", &SetWindingCallBacks, allow_raw_pointers());

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

    function("quadAxisRawHit", &quadAxisRawHit, allow_raw_pointers());
    function("quadHull", &quadHull, allow_raw_pointers());
    function("quadIsFinite", &quadIsFinite, allow_raw_pointers());
    function("quadIsLine", &quadIsLine, allow_raw_pointers());
    function("quadSetBounds", &quadSetBounds, allow_raw_pointers());
    function("quadNormal", &quadNormal, allow_raw_pointers());
    function("quadsEqual", &quadsEqual, allow_raw_pointers());
    function("quadPtAtT", &quadPtAtT, allow_raw_pointers());
    function("quadPtCount", &quadPtCount, allow_raw_pointers());
    function("quadSubDivide", &quadSubDivide, allow_raw_pointers());
    function("quadXYAtT", &quadXYAtT, allow_raw_pointers());

    class_<AddContext>("AddContext")
        .constructor<>()
        .function("getData", &getAddContextData)
        .function("setData", &setAddContextData)
        .property("size", &AddContext::size);

    class_<Context>("Context")
        .constructor<>();

    value_object<OpPoint>("OpPoint")
        .field("x", &OpPoint::x)
        .field("y", &OpPoint::y);

    class_<CurveData>("CurveData")
        .property("start", &CurveData::start)
        .property("end", &CurveData::end);

    enum_<CurveType>("CurveType")
        .value("no", CurveType::no)
        .value("line", CurveType::line)
        .value("quad", CurveType::quad)
        .value("conic", CurveType::conic)
        .value("cubic", CurveType::cubic);

    class_<Curve>("Curve")
        .constructor<>()
        .function("getData", &getCurveData, allow_raw_pointers())
        .function("setData", &setCurveData, allow_raw_pointers())
        .property("size", &Curve::size)
        .property("type", &Curve::type);
}
