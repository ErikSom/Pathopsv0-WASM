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

class_<FillPath>("FillPath2D")
.constructor<>()
.function("addPath", &FillPath::addPath)
.function("eraseRange", &FillPath::eraseRange)
.function("insertPath", &FillPath::insertPath)
.function("clear", &FillPath::clear)
.function("clone", &FillPath::clone, emscripten::return_value_policy::take_ownership())
.function("curveCount", &FillPath::curveCount)
.function("getCurve", &FillPath::getCurve)
.function("setCurve", &FillPath::setCurve)
.function("moveTo", &FillPath::moveTo)
.function("rMoveTo", &FillPath::rMoveTo)
.function("lineTo", &FillPath::lineTo)
.function("rLineTo", &FillPath::rLineTo)
.function("quadraticCurveTo", &FillPath::quadraticCurveTo)
.function("rQuadraticCurveTo", &FillPath::rQuadraticCurveTo)
.function("bezierCurveTo", &FillPath::bezierCurveTo)
.function("rBezierCurveTo", &FillPath::rBezierCurveTo)
.function("closePath", &FillPath::closePath)
.function("rect", &FillPath::rect)
.function("transform", &FillPath::transform)
.function("difference", &FillPath::difference)
.function("intersect", &FillPath::intersect)
.function("reverseDifference", &FillPath::reverseDifference)
.function("union", &FillPath::_union)
.function("xor", &FillPath::_xor)
.function("simplify", &FillPath::simplify)
.function("fromCommands", &FillPath::fromCommands)
.function("fromSVG", &FillPath::fromSVG)
.function("toCommands", &FillPath::toCommands)
.function("toSVG", &FillPath::toSVG);

class_<FramePath>("FramePath2D")
.constructor<>()
.function("addPath", &FramePath::addPath)
.function("eraseRange", &FramePath::eraseRange)
.function("insertPath", &FramePath::insertPath)
.function("clear", &FramePath::clear)
.function("clone", &FramePath::clone, emscripten::return_value_policy::take_ownership())
.function("curveCount", &FramePath::curveCount)
.function("getCurve", &FramePath::getCurve)
.function("setCurve", &FramePath::setCurve)
.function("moveTo", &FramePath::moveTo)
.function("rMoveTo", &FramePath::rMoveTo)
.function("lineTo", &FramePath::lineTo)
.function("rLineTo", &FramePath::rLineTo)
.function("quadraticCurveTo", &FramePath::quadraticCurveTo)
.function("rQuadraticCurveTo", &FramePath::rQuadraticCurveTo)
.function("bezierCurveTo", &FramePath::bezierCurveTo)
.function("rBezierCurveTo", &FramePath::rBezierCurveTo)
.function("closePath", &FramePath::closePath)
.function("rect", &FramePath::rect)
.function("transform", &FillPath::transform)
.function("difference", &FramePath::difference)
.function("intersect", &FramePath::intersect)
.function("fromCommands", &FramePath::fromCommands)
.function("fromSVG", &FramePath::fromSVG)
.function("toCommands", &FramePath::toCommands)
.function("toSVG", &FramePath::toSVG);

class_<PathOps>("PathOps")
    .class_function("intersect", optional_override([](FillPath& left, FillPath& right) {
        FillPath result = left;
        result.opCommon(right, Ops::sect);
        return result;
    }));
}
