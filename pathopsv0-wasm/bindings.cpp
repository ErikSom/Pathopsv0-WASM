#include <emscripten/bind.h>
#include "PathOps.h"  // Include your header with the function declarations

using namespace emscripten;
using namespace PathOpsV0Lib;

EMSCRIPTEN_BINDINGS(my_module) {
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
}
