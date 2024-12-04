#include <emscripten/bind.h>
#include "emscripten/Path2D.h"

using namespace emscripten;
using namespace TwoD;

EMSCRIPTEN_BINDINGS(pathops_module) {
class_<Path>("Path2D")
.constructor<>()
.function("moveTo", &Path::moveTo)
.function("lineTo", &Path::lineTo)
.function("quadraticCurveTo", &Path::quadraticCurveTo)
.function("closePath", &Path::closePath)
.function("fromCommands", &Path::fromCommands, return_value_policy::reference())
.function("fromSVG", &Path::fromSVG, return_value_policy::reference())
.function("toCommands", &Path::toCommands)
.function("toSVG", &Path::toSVG);

class_<PathOps>("PathOps")
.class_function("intersect", &PathOps::Intersect, return_value_policy::reference());
}
