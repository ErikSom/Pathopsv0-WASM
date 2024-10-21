#include <emscripten/bind.h>
#include "PathOps.h"  // Include your header with the function declarations
#include "PathOpsTypes.h"  // Include other necessary headers for the types

#include "curves/Line.h"
#include "curves/NoCurve.h"
#include "curves/QuadBezier.h"

using namespace emscripten;
using namespace PathOpsV0Lib;


EMSCRIPTEN_BINDINGS(my_module) {
    // Expose functions
    function("CreateContext", &CreateContext, allow_raw_pointers());
    function("Add", &Add, allow_raw_pointers());
    function("CreateContour", &CreateContour, allow_raw_pointers());
    function("DeleteContext", &DeleteContext, allow_raw_pointers());
    function("Error", &Error, allow_raw_pointers());
    function("ResetContour", &ResetContour, allow_raw_pointers());
    function("Resolve", &Resolve, allow_raw_pointers());
    function("SetContextCallBacks", &SetContextCallBacks, allow_raw_pointers());
    function("SetCurveCallBacks", &SetCurveCallBacks, allow_raw_pointers());
    function("SetWindingCallBacks", &SetWindingCallBacks, allow_raw_pointers());

    // Expose missing callback functions (example placeholders)
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

    // Expose Curve
    class_<Curve>("Curve")
        .constructor<>()
        .property("data", &Curve::data)
        .property("size", &Curve::size)
        .property("type", &Curve::type);

    // Expose enums
    enum_<CurveType>("CurveType")
        .value("no", CurveType::no)
        .value("line", CurveType::line)
        .value("quad", CurveType::quad)
        .value("conic", CurveType::conic)
        .value("cubic", CurveType::cubic);
}
