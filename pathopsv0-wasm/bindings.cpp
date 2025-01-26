#include <emscripten/bind.h>
#include "emscripten/Path2D.h"
#include <malloc.h>

using namespace emscripten;
using namespace TwoD;

struct PathOps {};

EMSCRIPTEN_BINDINGS(pathops_module) {

enum_<Types>("CurveType")
.value("move", Types::move)
.value("line", Types::line)
.value("quad", Types::quad)
.value("conic", Types::conic)
.value("cubic", Types::cubic)
.value("close", Types::close);

enum_<PathOpsV0Lib::ContextError>("OpError")
.value("none", PathOpsV0Lib::ContextError::none)
.value("end", PathOpsV0Lib::ContextError::end)
.value("finite", PathOpsV0Lib::ContextError::finite)
.value("intersection", PathOpsV0Lib::ContextError::intersection)
.value("missing", PathOpsV0Lib::ContextError::missing)
.value("toVertical", PathOpsV0Lib::ContextError::toVertical)
.value("tree", PathOpsV0Lib::ContextError::tree);

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
.function("conicTo", &FillPath::conicTo)
.function("rConicTo", &FillPath::rConicTo)
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
.function("conicTo", &FramePath::conicTo)
.function("rConicTo", &FramePath::rConicTo)
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
.class_function("difference", optional_override([](FillPath& left, FillPath& right) {
    FillPath result = left;
    result.opCommon(right, Ops::diff);
    return result;
}))
.class_function("intersect", optional_override([](FillPath& left, FillPath& right) {
    FillPath result = left;
    result.opCommon(right, Ops::sect);
    return result;
}))
.class_function("reverseDifference", optional_override([](FillPath& left, FillPath& right) {
    FillPath result = left;
    result.opCommon(right, Ops::revDiff);
    return result;
}))
.class_function("union", optional_override([](FillPath& left, FillPath& right) {
    FillPath result = left;
    result.opCommon(right, Ops::_union);
    return result;
}))
.class_function("xor", optional_override([](FillPath& left, FillPath& right) {
    FillPath result = left;
    result.opCommon(right, Ops::_xor);
    return result;
}))
.class_function("simplify", optional_override([](FillPath& left) {
    FillPath result = left;
    result.simplify();
    return result;
}))
.class_function("frameDifference", optional_override([](FramePath& left, FillPath& right) {
    FramePath result = left;
    result.opCommon(right, Ops::diff);
    return result;
}))
.class_function("frameIntersect", optional_override([](FramePath& left, FillPath& right) {
    FramePath result = left;
    result.opCommon(right, Ops::sect);
    return result;
}));

// ------------------------------------------------------------------------
// Memory debugging
// ------------------------------------------------------------------------
struct MemoryStats {
    size_t arena;
    size_t ordblks;
    size_t smblks;
    size_t hblks;
    size_t hblkhd;
    size_t usmblks;
    size_t fsmblks;
    size_t uordblks;
    size_t fordblks;
    size_t keepcost;
    // user-friendly aliases
    size_t allocatedSpace;
    size_t freeSpace;
    size_t totalSpace;
};

value_object<MemoryStats>("MemoryStats")
    // original mallinfo fields
    .field("arena", &MemoryStats::arena)
    .field("ordblks", &MemoryStats::ordblks)
    .field("smblks", &MemoryStats::smblks)
    .field("hblks", &MemoryStats::hblks)
    .field("hblkhd", &MemoryStats::hblkhd)
    .field("usmblks", &MemoryStats::usmblks)
    .field("fsmblks", &MemoryStats::fsmblks)
    .field("uordblks", &MemoryStats::uordblks)
    .field("fordblks", &MemoryStats::fordblks)
    .field("keepcost", &MemoryStats::keepcost)
    // user-friendly aliases
    .field("allocatedSpace", &MemoryStats::allocatedSpace)
    .field("freeSpace", &MemoryStats::freeSpace)
    .field("totalSpace", &MemoryStats::totalSpace)
;

function("GetMemoryStats", +[]() -> MemoryStats {
    struct mallinfo info = mallinfo();
    size_t totalSpace = static_cast<size_t>(info.arena) + static_cast<size_t>(info.hblkhd);
    return MemoryStats {
        static_cast<size_t>(info.arena),
        static_cast<size_t>(info.ordblks),
        static_cast<size_t>(info.smblks),
        static_cast<size_t>(info.hblks),
        static_cast<size_t>(info.hblkhd),
        static_cast<size_t>(info.usmblks),
        static_cast<size_t>(info.fsmblks),
        static_cast<size_t>(info.uordblks),
        static_cast<size_t>(info.fordblks),
        static_cast<size_t>(info.keepcost),
        static_cast<size_t>(info.uordblks),
        static_cast<size_t>(info.fordblks),
        totalSpace
    };
});

}
