#include <emscripten/bind.h>
#include "PathOps.h"       // Includes definitions for Context, Contour, etc.
#include "OpContour.h"     // Includes definitions for OpContour and related classes
#include "PathOpsTypes.h"  // Make sure this is included to avoid forward declaration issues

using namespace emscripten;
using namespace PathOpsV0Lib;

// Bind AddCurve, AddContext, etc., structs
EMSCRIPTEN_BINDINGS(pathops_bindings) {
    // Bind the full Context and Contour types
    class_<Context>("Context");    // Context must be fully defined in PathOps.h
    class_<Contour>("Contour");    // Contour must be fully defined in PathOpsTypes.h

    // Binding AddContext (example)
    value_object<AddContext>("AddContext")
        .field("data", &AddContext::data, allow_raw_pointers());

    // Binding AddCurve
    value_object<AddCurve>("AddCurve")
        .field("points", &AddCurve::points, allow_raw_pointers());

    // Binding AddWinding
    value_object<AddWinding>("AddWinding");

    // Functions in the PathOpsV0Lib namespace
    function("Add", &Add);
    function("CreateContext", &CreateContext, allow_raw_pointers());
    function("DeleteContext", &DeleteContext, allow_raw_pointers());
    function("CreateContour", &CreateContour, allow_raw_pointers());
    function("Error", &Error, allow_raw_pointers());
    function("ResetContour", &ResetContour, allow_raw_pointers());
    function("Resolve", &Resolve, allow_raw_pointers());

    // Binding the SetContextCallBacks function
    function("SetContextCallBacks", &SetContextCallBacks, allow_raw_pointers());

    // Binding the SetCurveCallBacks function
    function("SetCurveCallBacks", &SetCurveCallBacks, allow_raw_pointers());

    // Binding the SetWindingCallBacks function
    function("SetWindingCallBacks", &SetWindingCallBacks, allow_raw_pointers());

    // Bind OpContour class and its methods
    class_<OpContour>("OpContour")
        .function("apply", &OpContour::apply)
        .function("makeEdges", &OpContour::makeEdges)
        .function("normalize", &OpContour::normalize)
        .function("makeCoins", &OpContour::makeCoins);

    // Bind OpContours class and its methods
    class_<OpContours>("OpContours")
        .constructor<>()
        .function("addCallerData", &OpContours::addCallerData)
        .function("makeEdges", &OpContours::makeEdges)
        .function("normalize", &OpContours::normalize);
}
