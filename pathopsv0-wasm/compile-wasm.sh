#!/usr/bin/env bash

# Set default build type to 'dev' if not specified
BUILD_TYPE=${1:-dev}

# Create necessary directories
mkdir -p pathopsv0-wasm/dist
mkdir -p pathopsv0-wasm/dist/es
mkdir -p pathopsv0-wasm/dist/umd

# Common flags
COMMON_FLAGS="-Ipathopsv0/ -Ipathopsv0/debug -Ipathopsv0/src -Ipathopsv0/tests --bind -DOP_TINY_SKIA=1 -s MODULARIZE=1 -s WASM_BIGINT -s ALLOW_MEMORY_GROWTH=1 -s EXIT_RUNTIME=0"

# Development build flags
DEV_FLAGS="-g3 -s ASSERTIONS=2 --source-map-base http://localhost:11009/ -s DISABLE_EXCEPTION_CATCHING=0 -s DEMANGLE_SUPPORT=1 -s SAFE_HEAP=1 -O0"

# Production build flags
PROD_FLAGS="-O3 -s DISABLE_EXCEPTION_CATCHING=1 -DNDEBUG"

# Select flags based on build type
if [ "$BUILD_TYPE" = "dev" ]; then
    FLAGS="$COMMON_FLAGS $DEV_FLAGS"
    echo "Building Development Version"
else
    FLAGS="$COMMON_FLAGS $PROD_FLAGS"
    echo "Building Production Version"
fi

# Web

# build ES6a
echo "Building ES6"
emcc $FLAGS -s EXPORT_ES6=1 -s NO_FILESYSTEM=1 -s ENVIRONMENT='web' -s MODULARIZE=1 -s WASM_BIGINT -s ALLOW_MEMORY_GROWTH=1 -s EXIT_RUNTIME=0 -O3 -s DISABLE_EXCEPTION_CATCHING=1 \
    -I./pathopsv0/src -I. -I./pathopsv0/debug -DOP_TINY_TEST=1 -DNDEBUG \
    ./pathopsv0/PathOps.cpp ./pathopsv0/src/*.cpp ./pathopsv0/debug/OpDebug.cpp ./pathopsv0-wasm/bindings.cpp \
    -o pathopsv0-wasm/dist/es/pathops.js \
    -s EXPORT_NAME="PathOps" \
    --bind

# # build UMD
# echo "Building UMD"
# em++ $FLAGS -s NO_FILESYSTEM=1 \
#     pathopsv0-wasm/pathopsv0.bindings.cpp pathopsv0/build/pov0/libPathOps.a \
#     -o pathopsv0-wasm/dist/umd/pathops.js \
#     -s ENVIRONMENT='web' -s EXPORT_NAME="PathOpsFactory" \

