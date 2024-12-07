#include <emscripten/bind.h>
#include "emscripten/Path2D.h"

using namespace emscripten;
using namespace TwoD;

struct PathOps {};

EMSCRIPTEN_BINDINGS(pathops_module) {

enum_<Types>("CurveType")
.value("move", Types::move)
.value("line", Types::line)
.value("quad", Types::quad)
.value("cubic", Types::cubic)
.value("close", Types::close);

class_<Curve>("Curve2D")
.constructor<>()
.property("type", &Curve::type)
.property("data", &Curve::data);

register_vector<Curve>("VectorCurve");
register_vector<float>("VectorFloat");

class_<OpPoint>("OpPoint")
.constructor<>()
.constructor<float, float>()
.property("x", &OpPoint::x)
.property("y", &OpPoint::y);

class_<Path>("Path2D")
.constructor<>()
.function("addPath", &Path::addPath)
.function("eraseRange", &Path::eraseRange)
.function("insertPath", &Path::insertPath)
.function("clear", &Path::clear)
.function("clone", &Path::clone)
.function("curveCount", &Path::curveCount)
.function("getCurve", &Path::getCurve)
.function("setCurve", &Path::setCurve)
.function("pointCount", &Path::pointCount)
.function("getPoint", &Path::getPoint)
.function("setPoint", &Path::setPoint)
.function("moveTo", &Path::moveTo)
.function("rMoveTo", &Path::rMoveTo)
.function("lineTo", &Path::lineTo)
.function("rLineTo", &Path::rLineTo)
.function("quadraticCurveTo", &Path::quadraticCurveTo)
.function("rQuadraticCurveTo", &Path::rQuadraticCurveTo)
.function("bezierCurveTo", &Path::bezierCurveTo)
.function("rBezierCurveTo", &Path::rBezierCurveTo)
.function("closePath", &Path::closePath)
.function("rect", &Path::rect)
.function("difference", &Path::difference)
.function("intersect", &Path::intersect)
.function("reverseDifference", &Path::reverseDifference)
.function("union", &Path::_union)
.function("xor", &Path::_xor)
.function("simplify", &Path::simplify)
.function("fromCommands", &Path::fromCommands)
.function("fromSVG", &Path::fromSVG)
.function("toCommands", &Path::toCommands)
.function("toSVG", &Path::toSVG);

class_<PathOps>("PathOps")
    .class_function("intersect", optional_override([](Path& left, Path& right) {
        Path result = left;
        result.opCommon(right, Ops::sect);
        return result;
    }));
}
