# Building and running Pathopsv0

# step 1 building the framework
```bash
# From project root
$cd pathopsv0
$unzip cmake/skiatests.zip -d .
$cd cmake
$mkdir mytest
$cd mytest
$cmake ..
$make
```

# step 2 installing emsdk
See https://emscripten.org/docs/getting_started/downloads.html

# step 3 building the wasm
```bash
# From project root
$source "/path/to/your/emsdk/emsdk_env.sh"
$npm install
$npm run build-wasm
```

# step 4 testing the wasm
```bash
# From project root
$npm run dev
```
navigate to http://localhost:8080/ in your browser
