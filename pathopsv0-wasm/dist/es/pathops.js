
var PathOps = (() => {
  var _scriptDir = import.meta.url;
  
  return (
function(moduleArg = {}) {

var Module = moduleArg;

var readyPromiseResolve, readyPromiseReject;

Module["ready"] = new Promise((resolve, reject) => {
 readyPromiseResolve = resolve;
 readyPromiseReject = reject;
});

[ "_main", "_memory", "___indirect_function_table", "__embind_initialize_bindings", "_fflush", "___set_stack_limits", "onRuntimeInitialized" ].forEach(prop => {
 if (!Object.getOwnPropertyDescriptor(Module["ready"], prop)) {
  Object.defineProperty(Module["ready"], prop, {
   get: () => abort("You are getting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),
   set: () => abort("You are setting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")
  });
 }
});

var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = true;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

if (Module["ENVIRONMENT"]) {
 throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

if (ENVIRONMENT_IS_SHELL) {
 if (typeof process == "object" && typeof require === "function" || typeof window == "object" || typeof importScripts == "function") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
 if (typeof read != "undefined") {
  read_ = read;
 }
 readBinary = f => {
  if (typeof readbuffer == "function") {
   return new Uint8Array(readbuffer(f));
  }
  let data = read(f, "binary");
  assert(typeof data == "object");
  return data;
 };
 readAsync = (f, onload, onerror) => {
  setTimeout(() => onload(readBinary(f)));
 };
 if (typeof clearTimeout == "undefined") {
  globalThis.clearTimeout = id => {};
 }
 if (typeof setTimeout == "undefined") {
  globalThis.setTimeout = f => typeof f == "function" ? f() : abort();
 }
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit == "function") {
  quit_ = (status, toThrow) => {
   setTimeout(() => {
    if (!(toThrow instanceof ExitStatus)) {
     let toLog = toThrow;
     if (toThrow && typeof toThrow == "object" && toThrow.stack) {
      toLog = [ toThrow, toThrow.stack ];
     }
     err(`exiting due to exception: ${toLog}`);
    }
    quit(status);
   });
   throw toThrow;
  };
 }
 if (typeof print != "undefined") {
  if (typeof console == "undefined") console = {};
  console.log = print;
  console.warn = console.error = typeof printErr != "undefined" ? printErr : print;
 }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (typeof document != "undefined" && document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (_scriptDir) {
  scriptDirectory = _scriptDir;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 if (!(typeof window == "object" || typeof importScripts == "function")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
 {
  read_ = url => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = url => {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(xhr.response);
   };
  }
  readAsync = (url, onload, onerror) => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = () => {
    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
 setWindowTitle = title => document.title = title;
} else {
 throw new Error("environment detection error");
}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.error.bind(console);

Object.assign(Module, moduleOverrides);

moduleOverrides = null;

checkIncomingModuleAPI();

if (Module["arguments"]) arguments_ = Module["arguments"];

legacyModuleProp("arguments", "arguments_");

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

legacyModuleProp("thisProgram", "thisProgram");

if (Module["quit"]) quit_ = Module["quit"];

legacyModuleProp("quit", "quit_");

assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["read"] == "undefined", "Module.read option was removed (modify read_ in JS)");

assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");

assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");

assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");

assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");

legacyModuleProp("asm", "wasmExports");

legacyModuleProp("read", "read_");

legacyModuleProp("readAsync", "readAsync");

legacyModuleProp("readBinary", "readBinary");

legacyModuleProp("setWindowTitle", "setWindowTitle");

var IDBFS = "IDBFS is no longer included by default; build with -lidbfs.js";

var PROXYFS = "PROXYFS is no longer included by default; build with -lproxyfs.js";

var WORKERFS = "WORKERFS is no longer included by default; build with -lworkerfs.js";

var NODEFS = "NODEFS is no longer included by default; build with -lnodefs.js";

assert(!ENVIRONMENT_IS_WORKER, "worker environment detected but not enabled at build time.  Add 'worker' to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_NODE, "node environment detected but not enabled at build time.  Add 'node' to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

legacyModuleProp("wasmBinary", "wasmBinary");

var noExitRuntime = Module["noExitRuntime"] || true;

legacyModuleProp("noExitRuntime", "noExitRuntime");

if (typeof WebAssembly != "object") {
 abort("no native wasm support detected");
}

function getSafeHeapType(bytes, isFloat) {
 switch (bytes) {
 case 1:
  return "i8";

 case 2:
  return "i16";

 case 4:
  return isFloat ? "float" : "i32";

 case 8:
  return isFloat ? "double" : "i64";

 default:
  assert(0, `getSafeHeapType() invalid bytes=${bytes}`);
 }
}

function SAFE_HEAP_STORE(dest, value, bytes, isFloat) {
 if (dest <= 0) abort(`segmentation fault storing ${bytes} bytes to address ${dest}`);
 if (dest % bytes !== 0) abort(`alignment error storing to address ${dest}, which was expected to be aligned to a multiple of ${bytes}`);
 if (runtimeInitialized) {
  var brk = _sbrk(0);
  if (dest + bytes > brk) abort(`segmentation fault, exceeded the top of the available dynamic heap when storing ${bytes} bytes to address ${dest}. DYNAMICTOP=${brk}`);
  assert(brk >= _emscripten_stack_get_base(), `brk >= _emscripten_stack_get_base() (brk=${brk}, _emscripten_stack_get_base()=${_emscripten_stack_get_base()})`);
  assert(brk <= wasmMemory.buffer.byteLength, `brk <= wasmMemory.buffer.byteLength (brk=${brk}, wasmMemory.buffer.byteLength=${wasmMemory.buffer.byteLength})`);
 }
 setValue_safe(dest, value, getSafeHeapType(bytes, isFloat));
 return value;
}

function SAFE_HEAP_STORE_D(dest, value, bytes) {
 return SAFE_HEAP_STORE(dest, value, bytes, true);
}

function SAFE_HEAP_LOAD(dest, bytes, unsigned, isFloat) {
 if (dest <= 0) abort(`segmentation fault loading ${bytes} bytes from address ${dest}`);
 if (dest % bytes !== 0) abort(`alignment error loading from address ${dest}, which was expected to be aligned to a multiple of ${bytes}`);
 if (runtimeInitialized) {
  var brk = _sbrk(0);
  if (dest + bytes > brk) abort(`segmentation fault, exceeded the top of the available dynamic heap when loading ${bytes} bytes from address ${dest}. DYNAMICTOP=${brk}`);
  assert(brk >= _emscripten_stack_get_base(), `brk >= _emscripten_stack_get_base() (brk=${brk}, _emscripten_stack_get_base()=${_emscripten_stack_get_base()})`);
  assert(brk <= wasmMemory.buffer.byteLength, `brk <= wasmMemory.buffer.byteLength (brk=${brk}, wasmMemory.buffer.byteLength=${wasmMemory.buffer.byteLength})`);
 }
 var type = getSafeHeapType(bytes, isFloat);
 var ret = getValue_safe(dest, type);
 if (unsigned) ret = unSign(ret, parseInt(type.substr(1), 10));
 return ret;
}

function SAFE_HEAP_LOAD_D(dest, bytes, unsigned) {
 return SAFE_HEAP_LOAD(dest, bytes, unsigned, true);
}

function SAFE_FT_MASK(value, mask) {
 var ret = value & mask;
 if (ret !== value) {
  abort(`Function table mask error: function pointer is ${value} which is masked by ${mask}, the likely cause of this is that the function pointer is being called by the wrong type.`);
 }
 return ret;
}

function segfault() {
 abort("segmentation fault");
}

function alignfault() {
 abort("alignment fault");
}

var wasmMemory;

var wasmExports;

var ABORT = false;

var EXITSTATUS;

function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed" + (text ? ": " + text : ""));
 }
}

var HEAP, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64;

function updateMemoryViews() {
 var b = wasmMemory.buffer;
 Module["HEAP8"] = HEAP8 = new Int8Array(b);
 Module["HEAP16"] = HEAP16 = new Int16Array(b);
 Module["HEAP32"] = HEAP32 = new Int32Array(b);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
 Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
 Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b);
}

assert(!Module["STACK_SIZE"], "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");

assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined, "JS engine does not provide full typed array support");

assert(!Module["wasmMemory"], "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");

assert(!Module["INITIAL_MEMORY"], "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");

var wasmTable;

function writeStackCookie() {
 var max = _emscripten_stack_get_end();
 assert((max & 3) == 0);
 if (max == 0) {
  max += 4;
 }
 SAFE_HEAP_STORE((max >> 2) * 4, 34821223, 4);
 checkInt32(34821223);
 SAFE_HEAP_STORE((max + 4 >> 2) * 4, 2310721022, 4);
 checkInt32(2310721022);
}

function checkStackCookie() {
 if (ABORT) return;
 var max = _emscripten_stack_get_end();
 if (max == 0) {
  max += 4;
 }
 var cookie1 = SAFE_HEAP_LOAD((max >> 2) * 4, 4, 1);
 var cookie2 = SAFE_HEAP_LOAD((max + 4 >> 2) * 4, 4, 1);
 if (cookie1 != 34821223 || cookie2 != 2310721022) {
  abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
 }
}

(function() {
 var h16 = new Int16Array(1);
 var h8 = new Int8Array(h16.buffer);
 h16[0] = 25459;
 if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
})();

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATEXIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
 return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 assert(!runtimeInitialized);
 runtimeInitialized = true;
 checkStackCookie();
 setStackLimits();
 callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
 checkStackCookie();
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}

function addOnExit(cb) {}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

var runDependencyTracking = {};

function getUniqueRunDependency(id) {
 var orig = id;
 while (1) {
  if (!runDependencyTracking[id]) return id;
  id = orig + Math.random();
 }
}

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(!runDependencyTracking[id]);
  runDependencyTracking[id] = 1;
  if (runDependencyWatcher === null && typeof setInterval != "undefined") {
   runDependencyWatcher = setInterval(() => {
    if (ABORT) {
     clearInterval(runDependencyWatcher);
     runDependencyWatcher = null;
     return;
    }
    var shown = false;
    for (var dep in runDependencyTracking) {
     if (!shown) {
      shown = true;
      err("still waiting on run dependencies:");
     }
     err("dependency: " + dep);
    }
    if (shown) {
     err("(end of list)");
    }
   }, 1e4);
  }
 } else {
  err("warning: run dependency added without ID");
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(runDependencyTracking[id]);
  delete runDependencyTracking[id];
 } else {
  err("warning: run dependency removed without ID");
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 what = "Aborted(" + what + ")";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 var e = new WebAssembly.RuntimeError(what);
 readyPromiseReject(e);
 throw e;
}

var FS = {
 error() {
  abort("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM");
 },
 init() {
  FS.error();
 },
 createDataFile() {
  FS.error();
 },
 createPreloadedFile() {
  FS.error();
 },
 createLazyFile() {
  FS.error();
 },
 open() {
  FS.error();
 },
 mkdev() {
  FS.error();
 },
 registerDevice() {
  FS.error();
 },
 analyzePath() {
  FS.error();
 },
 ErrnoError() {
  FS.error();
 }
};

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return filename.startsWith(dataURIPrefix);
}

function isFileURI(filename) {
 return filename.startsWith("file://");
}

function createExportWrapper(name) {
 return function() {
  assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
  var f = wasmExports[name];
  assert(f, `exported native function \`${name}\` not found`);
  return f.apply(null, arguments);
 };
}

var wasmBinaryFile;

if (Module["locateFile"]) {
 wasmBinaryFile = "pathops.wasm";
 if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
 }
} else {
 wasmBinaryFile = new URL("pathops.wasm", import.meta.url).href;
}

function getBinarySync(file) {
 if (file == wasmBinaryFile && wasmBinary) {
  return new Uint8Array(wasmBinary);
 }
 if (readBinary) {
  return readBinary(file);
 }
 throw "both async and sync fetching of the wasm failed";
}

function getBinaryPromise(binaryFile) {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
  if (typeof fetch == "function") {
   return fetch(binaryFile, {
    credentials: "same-origin"
   }).then(response => {
    if (!response["ok"]) {
     throw "failed to load wasm binary file at '" + binaryFile + "'";
    }
    return response["arrayBuffer"]();
   }).catch(() => getBinarySync(binaryFile));
  }
 }
 return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
 return getBinaryPromise(binaryFile).then(binary => WebAssembly.instantiate(binary, imports)).then(instance => instance).then(receiver, reason => {
  err("failed to asynchronously prepare wasm: " + reason);
  if (isFileURI(wasmBinaryFile)) {
   err("warning: Loading from a file URI (" + wasmBinaryFile + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing");
  }
  abort(reason);
 });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
 if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
  return fetch(binaryFile, {
   credentials: "same-origin"
  }).then(response => {
   var result = WebAssembly.instantiateStreaming(response, imports);
   return result.then(callback, function(reason) {
    err("wasm streaming compile failed: " + reason);
    err("falling back to ArrayBuffer instantiation");
    return instantiateArrayBuffer(binaryFile, imports, callback);
   });
  });
 }
 return instantiateArrayBuffer(binaryFile, imports, callback);
}

function createWasm() {
 var info = {
  "env": wasmImports,
  "wasi_snapshot_preview1": wasmImports
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  wasmExports = exports;
  wasmMemory = wasmExports["memory"];
  assert(wasmMemory, "memory not found in wasm exports");
  updateMemoryViews();
  wasmTable = wasmExports["__indirect_function_table"];
  assert(wasmTable, "table not found in wasm exports");
  addOnInit(wasmExports["__wasm_call_ctors"]);
  removeRunDependency("wasm-instantiate");
  return exports;
 }
 addRunDependency("wasm-instantiate");
 var trueModule = Module;
 function receiveInstantiationResult(result) {
  assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
  trueModule = null;
  receiveInstance(result["instance"]);
 }
 if (Module["instantiateWasm"]) {
  try {
   return Module["instantiateWasm"](info, receiveInstance);
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   readyPromiseReject(e);
  }
 }
 instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
 return {};
}

function legacyModuleProp(prop, newName, incomming = true) {
 if (!Object.getOwnPropertyDescriptor(Module, prop)) {
  Object.defineProperty(Module, prop, {
   configurable: true,
   get() {
    let extra = incomming ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)" : "";
    abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);
   }
  });
 }
}

function ignoredModuleProp(prop) {
 if (Object.getOwnPropertyDescriptor(Module, prop)) {
  abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
 }
}

function isExportedByForceFilesystem(name) {
 return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
}

function missingGlobal(sym, msg) {
 if (typeof globalThis !== "undefined") {
  Object.defineProperty(globalThis, sym, {
   configurable: true,
   get() {
    warnOnce("`" + sym + "` is not longer defined by emscripten. " + msg);
    return undefined;
   }
  });
 }
}

missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");

function missingLibrarySymbol(sym) {
 if (typeof globalThis !== "undefined" && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
  Object.defineProperty(globalThis, sym, {
   configurable: true,
   get() {
    var msg = "`" + sym + "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";
    var librarySymbol = sym;
    if (!librarySymbol.startsWith("_")) {
     librarySymbol = "$" + sym;
    }
    msg += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='" + librarySymbol + "')";
    if (isExportedByForceFilesystem(sym)) {
     msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    warnOnce(msg);
    return undefined;
   }
  });
 }
 unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
 if (!Object.getOwnPropertyDescriptor(Module, sym)) {
  Object.defineProperty(Module, sym, {
   configurable: true,
   get() {
    var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)";
    if (isExportedByForceFilesystem(sym)) {
     msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    abort(msg);
   }
  });
 }
}

var MAX_UINT8 = 2 ** 8 - 1;

var MAX_UINT16 = 2 ** 16 - 1;

var MAX_UINT32 = 2 ** 32 - 1;

var MAX_UINT53 = 2 ** 53 - 1;

var MAX_UINT64 = 2 ** 64 - 1;

var MIN_INT8 = -(2 ** (8 - 1)) + 1;

var MIN_INT16 = -(2 ** (16 - 1)) + 1;

var MIN_INT32 = -(2 ** (32 - 1)) + 1;

var MIN_INT53 = -(2 ** (53 - 1)) + 1;

var MIN_INT64 = -(2 ** (64 - 1)) + 1;

function checkInt(value, bits, min, max) {
 assert(Number.isInteger(Number(value)), "attempt to write non-integer (" + value + ") into integer heap");
 assert(value <= max, "value (" + value + ") too large to write as " + bits + "-bit value");
 assert(value >= min, "value (" + value + ") too small to write as " + bits + "-bit value");
}

var checkInt1 = value => checkInt(value, 1, 1);

var checkInt8 = value => checkInt(value, 8, MIN_INT8, MAX_UINT8);

var checkInt16 = value => checkInt(value, 16, MIN_INT16, MAX_UINT16);

var checkInt32 = value => checkInt(value, 32, MIN_INT32, MAX_UINT32);

var checkInt53 = value => checkInt(value, 53, MIN_INT53, MAX_UINT53);

var checkInt64 = value => checkInt(value, 64, MIN_INT64, MAX_UINT64);

function dbg(text) {
 console.warn.apply(console, arguments);
}

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = `Program terminated with exit(${status})`;
 this.status = status;
}

var callRuntimeCallbacks = callbacks => {
 while (callbacks.length > 0) {
  callbacks.shift()(Module);
 }
};

var withStackSave = f => {
 var stack = stackSave();
 var ret = f();
 stackRestore(stack);
 return ret;
};

var lengthBytesUTF8 = str => {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var c = str.charCodeAt(i);
  if (c <= 127) {
   len++;
  } else if (c <= 2047) {
   len += 2;
  } else if (c >= 55296 && c <= 57343) {
   len += 4;
   ++i;
  } else {
   len += 3;
  }
 }
 return len;
};

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
 assert(typeof str === "string");
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++] = 192 | u >> 6;
   heap[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++] = 224 | u >> 12;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   if (u > 1114111) warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
   heap[outIdx++] = 240 | u >> 18;
   heap[outIdx++] = 128 | u >> 12 & 63;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  }
 }
 heap[outIdx] = 0;
 return outIdx - startIdx;
};

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
 assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
};

var stringToUTF8OnStack = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8(str, ret, size);
 return ret;
};

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
  return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
 }
 var str = "";
 while (idx < endPtr) {
  var u0 = heapOrArray[idx++];
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = heapOrArray[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode((u0 & 31) << 6 | u1);
   continue;
  }
  var u2 = heapOrArray[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = (u0 & 15) << 12 | u1 << 6 | u2;
  } else {
   if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
   u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  }
 }
 return str;
};

var UTF8ToString = (ptr, maxBytesToRead) => {
 assert(typeof ptr == "number");
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
};

function demangle(func) {
 demangle.recursionGuard = (demangle.recursionGuard | 0) + 1;
 if (demangle.recursionGuard > 1) return func;
 return withStackSave(function() {
  try {
   var s = func;
   if (s.startsWith("__Z")) s = s.substr(1);
   var buf = stringToUTF8OnStack(s);
   var status = stackAlloc(4);
   var ret = ___cxa_demangle(buf, 0, 0, status);
   if (SAFE_HEAP_LOAD((status >> 2) * 4, 4, 0) === 0 && ret) {
    return UTF8ToString(ret);
   }
  } catch (e) {} finally {
   _free(ret);
   if (demangle.recursionGuard < 2) --demangle.recursionGuard;
  }
  return func;
 });
}

function getValue(ptr, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  return SAFE_HEAP_LOAD(ptr >> 0, 1, 0);

 case "i8":
  return SAFE_HEAP_LOAD(ptr >> 0, 1, 0);

 case "i16":
  return SAFE_HEAP_LOAD((ptr >> 1) * 2, 2, 0);

 case "i32":
  return SAFE_HEAP_LOAD((ptr >> 2) * 4, 4, 0);

 case "i64":
  return HEAP64[ptr >> 3];

 case "float":
  return SAFE_HEAP_LOAD_D((ptr >> 2) * 4, 4, 0);

 case "double":
  return SAFE_HEAP_LOAD_D((ptr >> 3) * 8, 8, 0);

 case "*":
  return SAFE_HEAP_LOAD((ptr >> 2) * 4, 4, 1);

 default:
  abort(`invalid type for getValue: ${type}`);
 }
}

function getValue_safe(ptr, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  return HEAP8[ptr >> 0];

 case "i8":
  return HEAP8[ptr >> 0];

 case "i16":
  return HEAP16[ptr >> 1];

 case "i32":
  return HEAP32[ptr >> 2];

 case "i64":
  return HEAP64[ptr >> 3];

 case "float":
  return HEAPF32[ptr >> 2];

 case "double":
  return HEAPF64[ptr >> 3];

 case "*":
  return HEAPU32[ptr >> 2];

 default:
  abort(`invalid type for getValue: ${type}`);
 }
}

var ptrToString = ptr => {
 assert(typeof ptr === "number");
 ptr >>>= 0;
 return "0x" + ptr.toString(16).padStart(8, "0");
};

var setStackLimits = () => {
 var stackLow = _emscripten_stack_get_base();
 var stackHigh = _emscripten_stack_get_end();
 ___set_stack_limits(stackLow, stackHigh);
};

function setValue(ptr, value, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  SAFE_HEAP_STORE(ptr >> 0, value, 1);
  checkInt8(value);
  break;

 case "i8":
  SAFE_HEAP_STORE(ptr >> 0, value, 1);
  checkInt8(value);
  break;

 case "i16":
  SAFE_HEAP_STORE((ptr >> 1) * 2, value, 2);
  checkInt16(value);
  break;

 case "i32":
  SAFE_HEAP_STORE((ptr >> 2) * 4, value, 4);
  checkInt32(value);
  break;

 case "i64":
  HEAP64[ptr >> 3] = BigInt(value);
  checkInt64(value);
  break;

 case "float":
  SAFE_HEAP_STORE_D((ptr >> 2) * 4, value, 4);
  break;

 case "double":
  SAFE_HEAP_STORE_D((ptr >> 3) * 8, value, 8);
  break;

 case "*":
  SAFE_HEAP_STORE((ptr >> 2) * 4, value, 4);
  break;

 default:
  abort(`invalid type for setValue: ${type}`);
 }
}

function setValue_safe(ptr, value, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  HEAP8[ptr >> 0] = value;
  checkInt8(value);
  break;

 case "i8":
  HEAP8[ptr >> 0] = value;
  checkInt8(value);
  break;

 case "i16":
  HEAP16[ptr >> 1] = value;
  checkInt16(value);
  break;

 case "i32":
  HEAP32[ptr >> 2] = value;
  checkInt32(value);
  break;

 case "i64":
  HEAP64[ptr >> 3] = BigInt(value);
  checkInt64(value);
  break;

 case "float":
  HEAPF32[ptr >> 2] = value;
  break;

 case "double":
  HEAPF64[ptr >> 3] = value;
  break;

 case "*":
  HEAPU32[ptr >> 2] = value;
  break;

 default:
  abort(`invalid type for setValue: ${type}`);
 }
}

function jsStackTrace() {
 var error = new Error;
 if (!error.stack) {
  try {
   throw new Error;
  } catch (e) {
   error = e;
  }
  if (!error.stack) {
   return "(no stack trace available)";
  }
 }
 return error.stack.toString();
}

function demangleAll(text) {
 var regex = /\b_Z[\w\d_]+/g;
 return text.replace(regex, function(x) {
  var y = demangle(x);
  return x === y ? x : y + " [" + x + "]";
 });
}

function stackTrace() {
 var js = jsStackTrace();
 if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
 return demangleAll(js);
}

function unSign(value, bits) {
 if (value >= 0) {
  return value;
 }
 return bits <= 32 ? 2 * Math.abs(1 << bits - 1) + value : Math.pow(2, bits) + value;
}

var warnOnce = text => {
 if (!warnOnce.shown) warnOnce.shown = {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  err(text);
 }
};

var ___assert_fail = (condition, filename, line, func) => {
 abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
};

function ExceptionInfo(excPtr) {
 this.excPtr = excPtr;
 this.ptr = excPtr - 24;
 this.set_type = function(type) {
  SAFE_HEAP_STORE((this.ptr + 4 >> 2) * 4, type, 4);
 };
 this.get_type = function() {
  return SAFE_HEAP_LOAD((this.ptr + 4 >> 2) * 4, 4, 1);
 };
 this.set_destructor = function(destructor) {
  SAFE_HEAP_STORE((this.ptr + 8 >> 2) * 4, destructor, 4);
 };
 this.get_destructor = function() {
  return SAFE_HEAP_LOAD((this.ptr + 8 >> 2) * 4, 4, 1);
 };
 this.set_caught = function(caught) {
  caught = caught ? 1 : 0;
  SAFE_HEAP_STORE(this.ptr + 12 >> 0, caught, 1);
  checkInt8(caught);
 };
 this.get_caught = function() {
  return SAFE_HEAP_LOAD(this.ptr + 12 >> 0, 1, 0) != 0;
 };
 this.set_rethrown = function(rethrown) {
  rethrown = rethrown ? 1 : 0;
  SAFE_HEAP_STORE(this.ptr + 13 >> 0, rethrown, 1);
  checkInt8(rethrown);
 };
 this.get_rethrown = function() {
  return SAFE_HEAP_LOAD(this.ptr + 13 >> 0, 1, 0) != 0;
 };
 this.init = function(type, destructor) {
  this.set_adjusted_ptr(0);
  this.set_type(type);
  this.set_destructor(destructor);
 };
 this.set_adjusted_ptr = function(adjustedPtr) {
  SAFE_HEAP_STORE((this.ptr + 16 >> 2) * 4, adjustedPtr, 4);
 };
 this.get_adjusted_ptr = function() {
  return SAFE_HEAP_LOAD((this.ptr + 16 >> 2) * 4, 4, 1);
 };
 this.get_exception_ptr = function() {
  var isPointer = ___cxa_is_pointer_type(this.get_type());
  if (isPointer) {
   return SAFE_HEAP_LOAD((this.excPtr >> 2) * 4, 4, 1);
  }
  var adjusted = this.get_adjusted_ptr();
  if (adjusted !== 0) return adjusted;
  return this.excPtr;
 };
}

var exceptionLast = 0;

var uncaughtExceptionCount = 0;

function ___cxa_throw(ptr, type, destructor) {
 var info = new ExceptionInfo(ptr);
 info.init(type, destructor);
 exceptionLast = ptr;
 uncaughtExceptionCount++;
 assert(false, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}

var ___handle_stack_overflow = requested => {
 var base = _emscripten_stack_get_base();
 var end = _emscripten_stack_get_end();
 abort(`stack overflow (Attempt to set SP to ${ptrToString(requested)}` + `, with stack limits [${ptrToString(end)} - ${ptrToString(base)}` + "]). If you require more stack space build with -sSTACK_SIZE=<bytes>");
};

var structRegistrations = {};

function runDestructors(destructors) {
 while (destructors.length) {
  var ptr = destructors.pop();
  var del = destructors.pop();
  del(ptr);
 }
}

function simpleReadValueFromPointer(pointer) {
 return this["fromWireType"](SAFE_HEAP_LOAD((pointer >> 2) * 4, 4, 0));
}

var awaitingDependencies = {};

var registeredTypes = {};

var typeDependencies = {};

var InternalError = undefined;

function throwInternalError(message) {
 throw new InternalError(message);
}

function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
 myTypes.forEach(function(type) {
  typeDependencies[type] = dependentTypes;
 });
 function onComplete(typeConverters) {
  var myTypeConverters = getTypeConverters(typeConverters);
  if (myTypeConverters.length !== myTypes.length) {
   throwInternalError("Mismatched type converter count");
  }
  for (var i = 0; i < myTypes.length; ++i) {
   registerType(myTypes[i], myTypeConverters[i]);
  }
 }
 var typeConverters = new Array(dependentTypes.length);
 var unregisteredTypes = [];
 var registered = 0;
 dependentTypes.forEach((dt, i) => {
  if (registeredTypes.hasOwnProperty(dt)) {
   typeConverters[i] = registeredTypes[dt];
  } else {
   unregisteredTypes.push(dt);
   if (!awaitingDependencies.hasOwnProperty(dt)) {
    awaitingDependencies[dt] = [];
   }
   awaitingDependencies[dt].push(() => {
    typeConverters[i] = registeredTypes[dt];
    ++registered;
    if (registered === unregisteredTypes.length) {
     onComplete(typeConverters);
    }
   });
  }
 });
 if (0 === unregisteredTypes.length) {
  onComplete(typeConverters);
 }
}

var __embind_finalize_value_object = function(structType) {
 var reg = structRegistrations[structType];
 delete structRegistrations[structType];
 var rawConstructor = reg.rawConstructor;
 var rawDestructor = reg.rawDestructor;
 var fieldRecords = reg.fields;
 var fieldTypes = fieldRecords.map(field => field.getterReturnType).concat(fieldRecords.map(field => field.setterArgumentType));
 whenDependentTypesAreResolved([ structType ], fieldTypes, fieldTypes => {
  var fields = {};
  fieldRecords.forEach((field, i) => {
   var fieldName = field.fieldName;
   var getterReturnType = fieldTypes[i];
   var getter = field.getter;
   var getterContext = field.getterContext;
   var setterArgumentType = fieldTypes[i + fieldRecords.length];
   var setter = field.setter;
   var setterContext = field.setterContext;
   fields[fieldName] = {
    read: ptr => getterReturnType["fromWireType"](getter(getterContext, ptr)),
    write: (ptr, o) => {
     var destructors = [];
     setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
     runDestructors(destructors);
    }
   };
  });
  return [ {
   name: reg.name,
   "fromWireType": function(ptr) {
    var rv = {};
    for (var i in fields) {
     rv[i] = fields[i].read(ptr);
    }
    rawDestructor(ptr);
    return rv;
   },
   "toWireType": function(destructors, o) {
    for (var fieldName in fields) {
     if (!(fieldName in o)) {
      throw new TypeError(`Missing field: "${fieldName}"`);
     }
    }
    var ptr = rawConstructor();
    for (fieldName in fields) {
     fields[fieldName].write(ptr, o[fieldName]);
    }
    if (destructors !== null) {
     destructors.push(rawDestructor, ptr);
    }
    return ptr;
   },
   "argPackAdvance": 8,
   "readValueFromPointer": simpleReadValueFromPointer,
   destructorFunction: rawDestructor
  } ];
 });
};

function embindRepr(v) {
 if (v === null) {
  return "null";
 }
 var t = typeof v;
 if (t === "object" || t === "array" || t === "function") {
  return v.toString();
 } else {
  return "" + v;
 }
}

function embind_init_charCodes() {
 var codes = new Array(256);
 for (var i = 0; i < 256; ++i) {
  codes[i] = String.fromCharCode(i);
 }
 embind_charCodes = codes;
}

var embind_charCodes = undefined;

function readLatin1String(ptr) {
 var ret = "";
 var c = ptr;
 while (SAFE_HEAP_LOAD(c, 1, 1)) {
  ret += embind_charCodes[SAFE_HEAP_LOAD(c++, 1, 1)];
 }
 return ret;
}

var BindingError = undefined;

function throwBindingError(message) {
 throw new BindingError(message);
}

function sharedRegisterType(rawType, registeredInstance, options = {}) {
 var name = registeredInstance.name;
 if (!rawType) {
  throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
 }
 if (registeredTypes.hasOwnProperty(rawType)) {
  if (options.ignoreDuplicateRegistrations) {
   return;
  } else {
   throwBindingError(`Cannot register type '${name}' twice`);
  }
 }
 registeredTypes[rawType] = registeredInstance;
 delete typeDependencies[rawType];
 if (awaitingDependencies.hasOwnProperty(rawType)) {
  var callbacks = awaitingDependencies[rawType];
  delete awaitingDependencies[rawType];
  callbacks.forEach(cb => cb());
 }
}

function registerType(rawType, registeredInstance, options = {}) {
 if (!("argPackAdvance" in registeredInstance)) {
  throw new TypeError("registerType registeredInstance requires argPackAdvance");
 }
 return sharedRegisterType(rawType, registeredInstance, options);
}

function integerReadValueFromPointer(name, shift, signed) {
 switch (shift) {
 case 0:
  return signed ? function readS8FromPointer(pointer) {
   return SAFE_HEAP_LOAD(pointer, 1, 0);
  } : function readU8FromPointer(pointer) {
   return SAFE_HEAP_LOAD(pointer, 1, 1);
  };

 case 1:
  return signed ? function readS16FromPointer(pointer) {
   return SAFE_HEAP_LOAD((pointer >> 1) * 2, 2, 0);
  } : function readU16FromPointer(pointer) {
   return SAFE_HEAP_LOAD((pointer >> 1) * 2, 2, 1);
  };

 case 2:
  return signed ? function readS32FromPointer(pointer) {
   return SAFE_HEAP_LOAD((pointer >> 2) * 4, 4, 0);
  } : function readU32FromPointer(pointer) {
   return SAFE_HEAP_LOAD((pointer >> 2) * 4, 4, 1);
  };

 case 3:
  return signed ? function readS64FromPointer(pointer) {
   return HEAP64[pointer >> 3];
  } : function readU64FromPointer(pointer) {
   return HEAPU64[pointer >> 3];
  };

 default:
  throw new TypeError("Unknown integer type: " + name);
 }
}

function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {
 name = readLatin1String(name);
 var shift = getShiftFromSize(size);
 var isUnsignedType = name.indexOf("u") != -1;
 if (isUnsignedType) {
  maxRange = (1n << 64n) - 1n;
 }
 registerType(primitiveType, {
  name: name,
  "fromWireType": function(value) {
   return value;
  },
  "toWireType": function(destructors, value) {
   if (typeof value != "bigint" && typeof value != "number") {
    throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${this.name}`);
   }
   if (value < minRange || value > maxRange) {
    throw new TypeError(`Passing a number "${embindRepr(value)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`);
   }
   return value;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": integerReadValueFromPointer(name, shift, !isUnsignedType),
  destructorFunction: null
 });
}

function getShiftFromSize(size) {
 switch (size) {
 case 1:
  return 0;

 case 2:
  return 1;

 case 4:
  return 2;

 case 8:
  return 3;

 default:
  throw new TypeError(`Unknown type size: ${size}`);
 }
}

function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(wt) {
   return !!wt;
  },
  "toWireType": function(destructors, o) {
   return o ? trueValue : falseValue;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": function(pointer) {
   var heap;
   if (size === 1) {
    heap = HEAP8;
   } else if (size === 2) {
    heap = HEAP16;
   } else if (size === 4) {
    heap = HEAP32;
   } else {
    throw new TypeError("Unknown boolean type size: " + name);
   }
   return this["fromWireType"](heap[pointer >> shift]);
  },
  destructorFunction: null
 });
}

function ClassHandle_isAliasOf(other) {
 if (!(this instanceof ClassHandle)) {
  return false;
 }
 if (!(other instanceof ClassHandle)) {
  return false;
 }
 var leftClass = this.$$.ptrType.registeredClass;
 var left = this.$$.ptr;
 var rightClass = other.$$.ptrType.registeredClass;
 var right = other.$$.ptr;
 while (leftClass.baseClass) {
  left = leftClass.upcast(left);
  leftClass = leftClass.baseClass;
 }
 while (rightClass.baseClass) {
  right = rightClass.upcast(right);
  rightClass = rightClass.baseClass;
 }
 return leftClass === rightClass && left === right;
}

function shallowCopyInternalPointer(o) {
 return {
  count: o.count,
  deleteScheduled: o.deleteScheduled,
  preservePointerOnDelete: o.preservePointerOnDelete,
  ptr: o.ptr,
  ptrType: o.ptrType,
  smartPtr: o.smartPtr,
  smartPtrType: o.smartPtrType
 };
}

function throwInstanceAlreadyDeleted(obj) {
 function getInstanceTypeName(handle) {
  return handle.$$.ptrType.registeredClass.name;
 }
 throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
}

var finalizationRegistry = false;

function detachFinalizer(handle) {}

function runDestructor($$) {
 if ($$.smartPtr) {
  $$.smartPtrType.rawDestructor($$.smartPtr);
 } else {
  $$.ptrType.registeredClass.rawDestructor($$.ptr);
 }
}

function releaseClassHandle($$) {
 $$.count.value -= 1;
 var toDelete = 0 === $$.count.value;
 if (toDelete) {
  runDestructor($$);
 }
}

function downcastPointer(ptr, ptrClass, desiredClass) {
 if (ptrClass === desiredClass) {
  return ptr;
 }
 if (undefined === desiredClass.baseClass) {
  return null;
 }
 var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
 if (rv === null) {
  return null;
 }
 return desiredClass.downcast(rv);
}

var registeredPointers = {};

function getInheritedInstanceCount() {
 return Object.keys(registeredInstances).length;
}

function getLiveInheritedInstances() {
 var rv = [];
 for (var k in registeredInstances) {
  if (registeredInstances.hasOwnProperty(k)) {
   rv.push(registeredInstances[k]);
  }
 }
 return rv;
}

var deletionQueue = [];

function flushPendingDeletes() {
 while (deletionQueue.length) {
  var obj = deletionQueue.pop();
  obj.$$.deleteScheduled = false;
  obj["delete"]();
 }
}

var delayFunction = undefined;

function setDelayFunction(fn) {
 delayFunction = fn;
 if (deletionQueue.length && delayFunction) {
  delayFunction(flushPendingDeletes);
 }
}

function init_embind() {
 Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
 Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
 Module["flushPendingDeletes"] = flushPendingDeletes;
 Module["setDelayFunction"] = setDelayFunction;
}

var registeredInstances = {};

function getBasestPointer(class_, ptr) {
 if (ptr === undefined) {
  throwBindingError("ptr should not be undefined");
 }
 while (class_.baseClass) {
  ptr = class_.upcast(ptr);
  class_ = class_.baseClass;
 }
 return ptr;
}

function getInheritedInstance(class_, ptr) {
 ptr = getBasestPointer(class_, ptr);
 return registeredInstances[ptr];
}

function makeClassHandle(prototype, record) {
 if (!record.ptrType || !record.ptr) {
  throwInternalError("makeClassHandle requires ptr and ptrType");
 }
 var hasSmartPtrType = !!record.smartPtrType;
 var hasSmartPtr = !!record.smartPtr;
 if (hasSmartPtrType !== hasSmartPtr) {
  throwInternalError("Both smartPtrType and smartPtr must be specified");
 }
 record.count = {
  value: 1
 };
 return attachFinalizer(Object.create(prototype, {
  $$: {
   value: record
  }
 }));
}

function RegisteredPointer_fromWireType(ptr) {
 var rawPointer = this.getPointee(ptr);
 if (!rawPointer) {
  this.destructor(ptr);
  return null;
 }
 var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
 if (undefined !== registeredInstance) {
  if (0 === registeredInstance.$$.count.value) {
   registeredInstance.$$.ptr = rawPointer;
   registeredInstance.$$.smartPtr = ptr;
   return registeredInstance["clone"]();
  } else {
   var rv = registeredInstance["clone"]();
   this.destructor(ptr);
   return rv;
  }
 }
 function makeDefaultHandle() {
  if (this.isSmartPointer) {
   return makeClassHandle(this.registeredClass.instancePrototype, {
    ptrType: this.pointeeType,
    ptr: rawPointer,
    smartPtrType: this,
    smartPtr: ptr
   });
  } else {
   return makeClassHandle(this.registeredClass.instancePrototype, {
    ptrType: this,
    ptr: ptr
   });
  }
 }
 var actualType = this.registeredClass.getActualType(rawPointer);
 var registeredPointerRecord = registeredPointers[actualType];
 if (!registeredPointerRecord) {
  return makeDefaultHandle.call(this);
 }
 var toType;
 if (this.isConst) {
  toType = registeredPointerRecord.constPointerType;
 } else {
  toType = registeredPointerRecord.pointerType;
 }
 var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
 if (dp === null) {
  return makeDefaultHandle.call(this);
 }
 if (this.isSmartPointer) {
  return makeClassHandle(toType.registeredClass.instancePrototype, {
   ptrType: toType,
   ptr: dp,
   smartPtrType: this,
   smartPtr: ptr
  });
 } else {
  return makeClassHandle(toType.registeredClass.instancePrototype, {
   ptrType: toType,
   ptr: dp
  });
 }
}

var attachFinalizer = function(handle) {
 if ("undefined" === typeof FinalizationRegistry) {
  attachFinalizer = handle => handle;
  return handle;
 }
 finalizationRegistry = new FinalizationRegistry(info => {
  console.warn(info.leakWarning.stack.replace(/^Error: /, ""));
  releaseClassHandle(info.$$);
 });
 attachFinalizer = handle => {
  var $$ = handle.$$;
  var hasSmartPtr = !!$$.smartPtr;
  if (hasSmartPtr) {
   var info = {
    $$: $$
   };
   var cls = $$.ptrType.registeredClass;
   info.leakWarning = new Error(`Embind found a leaked C++ instance ${cls.name} <${ptrToString($$.ptr)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\n" + "Make sure to invoke .delete() manually once you're done with the instance instead.\n" + "Originally allocated");
   if ("captureStackTrace" in Error) {
    Error.captureStackTrace(info.leakWarning, RegisteredPointer_fromWireType);
   }
   finalizationRegistry.register(handle, info, handle);
  }
  return handle;
 };
 detachFinalizer = handle => finalizationRegistry.unregister(handle);
 return attachFinalizer(handle);
};

function ClassHandle_clone() {
 if (!this.$$.ptr) {
  throwInstanceAlreadyDeleted(this);
 }
 if (this.$$.preservePointerOnDelete) {
  this.$$.count.value += 1;
  return this;
 } else {
  var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
   $$: {
    value: shallowCopyInternalPointer(this.$$)
   }
  }));
  clone.$$.count.value += 1;
  clone.$$.deleteScheduled = false;
  return clone;
 }
}

function ClassHandle_delete() {
 if (!this.$$.ptr) {
  throwInstanceAlreadyDeleted(this);
 }
 if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
  throwBindingError("Object already scheduled for deletion");
 }
 detachFinalizer(this);
 releaseClassHandle(this.$$);
 if (!this.$$.preservePointerOnDelete) {
  this.$$.smartPtr = undefined;
  this.$$.ptr = undefined;
 }
}

function ClassHandle_isDeleted() {
 return !this.$$.ptr;
}

function ClassHandle_deleteLater() {
 if (!this.$$.ptr) {
  throwInstanceAlreadyDeleted(this);
 }
 if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
  throwBindingError("Object already scheduled for deletion");
 }
 deletionQueue.push(this);
 if (deletionQueue.length === 1 && delayFunction) {
  delayFunction(flushPendingDeletes);
 }
 this.$$.deleteScheduled = true;
 return this;
}

function init_ClassHandle() {
 ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
 ClassHandle.prototype["clone"] = ClassHandle_clone;
 ClassHandle.prototype["delete"] = ClassHandle_delete;
 ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
 ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
}

function ClassHandle() {}

var char_0 = 48;

var char_9 = 57;

function makeLegalFunctionName(name) {
 if (undefined === name) {
  return "_unknown";
 }
 name = name.replace(/[^a-zA-Z0-9_]/g, "$");
 var f = name.charCodeAt(0);
 if (f >= char_0 && f <= char_9) {
  return `_${name}`;
 }
 return name;
}

function createNamedFunction(name, body) {
 name = makeLegalFunctionName(name);
 return {
  [name]: function() {
   return body.apply(this, arguments);
  }
 }[name];
}

function ensureOverloadTable(proto, methodName, humanName) {
 if (undefined === proto[methodName].overloadTable) {
  var prevFunc = proto[methodName];
  proto[methodName] = function() {
   if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
    throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${arguments.length}) - expects one of (${proto[methodName].overloadTable})!`);
   }
   return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
  };
  proto[methodName].overloadTable = [];
  proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
 }
}

function exposePublicSymbol(name, value, numArguments) {
 if (Module.hasOwnProperty(name)) {
  if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
   throwBindingError(`Cannot register public name '${name}' twice`);
  }
  ensureOverloadTable(Module, name, name);
  if (Module.hasOwnProperty(numArguments)) {
   throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
  }
  Module[name].overloadTable[numArguments] = value;
 } else {
  Module[name] = value;
  if (undefined !== numArguments) {
   Module[name].numArguments = numArguments;
  }
 }
}

function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
 this.name = name;
 this.constructor = constructor;
 this.instancePrototype = instancePrototype;
 this.rawDestructor = rawDestructor;
 this.baseClass = baseClass;
 this.getActualType = getActualType;
 this.upcast = upcast;
 this.downcast = downcast;
 this.pureVirtualFunctions = [];
}

function upcastPointer(ptr, ptrClass, desiredClass) {
 while (ptrClass !== desiredClass) {
  if (!ptrClass.upcast) {
   throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`);
  }
  ptr = ptrClass.upcast(ptr);
  ptrClass = ptrClass.baseClass;
 }
 return ptr;
}

function constNoSmartPtrRawPointerToWireType(destructors, handle) {
 if (handle === null) {
  if (this.isReference) {
   throwBindingError(`null is not a valid ${this.name}`);
  }
  return 0;
 }
 if (!handle.$$) {
  throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
 }
 if (!handle.$$.ptr) {
  throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
 }
 var handleClass = handle.$$.ptrType.registeredClass;
 var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
 return ptr;
}

function genericPointerToWireType(destructors, handle) {
 var ptr;
 if (handle === null) {
  if (this.isReference) {
   throwBindingError(`null is not a valid ${this.name}`);
  }
  if (this.isSmartPointer) {
   ptr = this.rawConstructor();
   if (destructors !== null) {
    destructors.push(this.rawDestructor, ptr);
   }
   return ptr;
  } else {
   return 0;
  }
 }
 if (!handle.$$) {
  throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
 }
 if (!handle.$$.ptr) {
  throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
 }
 if (!this.isConst && handle.$$.ptrType.isConst) {
  throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
 }
 var handleClass = handle.$$.ptrType.registeredClass;
 ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
 if (this.isSmartPointer) {
  if (undefined === handle.$$.smartPtr) {
   throwBindingError("Passing raw pointer to smart pointer is illegal");
  }
  switch (this.sharingPolicy) {
  case 0:
   if (handle.$$.smartPtrType === this) {
    ptr = handle.$$.smartPtr;
   } else {
    throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
   }
   break;

  case 1:
   ptr = handle.$$.smartPtr;
   break;

  case 2:
   if (handle.$$.smartPtrType === this) {
    ptr = handle.$$.smartPtr;
   } else {
    var clonedHandle = handle["clone"]();
    ptr = this.rawShare(ptr, Emval.toHandle(function() {
     clonedHandle["delete"]();
    }));
    if (destructors !== null) {
     destructors.push(this.rawDestructor, ptr);
    }
   }
   break;

  default:
   throwBindingError("Unsupporting sharing policy");
  }
 }
 return ptr;
}

function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
 if (handle === null) {
  if (this.isReference) {
   throwBindingError(`null is not a valid ${this.name}`);
  }
  return 0;
 }
 if (!handle.$$) {
  throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
 }
 if (!handle.$$.ptr) {
  throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
 }
 if (handle.$$.ptrType.isConst) {
  throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`);
 }
 var handleClass = handle.$$.ptrType.registeredClass;
 var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
 return ptr;
}

function RegisteredPointer_getPointee(ptr) {
 if (this.rawGetPointee) {
  ptr = this.rawGetPointee(ptr);
 }
 return ptr;
}

function RegisteredPointer_destructor(ptr) {
 if (this.rawDestructor) {
  this.rawDestructor(ptr);
 }
}

function RegisteredPointer_deleteObject(handle) {
 if (handle !== null) {
  handle["delete"]();
 }
}

function init_RegisteredPointer() {
 RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
 RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
 RegisteredPointer.prototype["argPackAdvance"] = 8;
 RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
 RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
 RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType;
}

function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
 this.name = name;
 this.registeredClass = registeredClass;
 this.isReference = isReference;
 this.isConst = isConst;
 this.isSmartPointer = isSmartPointer;
 this.pointeeType = pointeeType;
 this.sharingPolicy = sharingPolicy;
 this.rawGetPointee = rawGetPointee;
 this.rawConstructor = rawConstructor;
 this.rawShare = rawShare;
 this.rawDestructor = rawDestructor;
 if (!isSmartPointer && registeredClass.baseClass === undefined) {
  if (isConst) {
   this["toWireType"] = constNoSmartPtrRawPointerToWireType;
   this.destructorFunction = null;
  } else {
   this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
   this.destructorFunction = null;
  }
 } else {
  this["toWireType"] = genericPointerToWireType;
 }
}

function replacePublicSymbol(name, value, numArguments) {
 if (!Module.hasOwnProperty(name)) {
  throwInternalError("Replacing nonexistant public symbol");
 }
 if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
  Module[name].overloadTable[numArguments] = value;
 } else {
  Module[name] = value;
  Module[name].argCount = numArguments;
 }
}

var wasmTableMirror = [];

var getWasmTableEntry = funcPtr => {
 var func = wasmTableMirror[funcPtr];
 if (!func) {
  if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
  wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
 }
 assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
 return func;
};

function embind__requireFunction(signature, rawFunction) {
 signature = readLatin1String(signature);
 function makeDynCaller() {
  return getWasmTableEntry(rawFunction);
 }
 var fp = makeDynCaller();
 if (typeof fp != "function") {
  throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
 }
 return fp;
}

function extendError(baseErrorType, errorName) {
 var errorClass = createNamedFunction(errorName, function(message) {
  this.name = errorName;
  this.message = message;
  var stack = new Error(message).stack;
  if (stack !== undefined) {
   this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
  }
 });
 errorClass.prototype = Object.create(baseErrorType.prototype);
 errorClass.prototype.constructor = errorClass;
 errorClass.prototype.toString = function() {
  if (this.message === undefined) {
   return this.name;
  } else {
   return `${this.name}: ${this.message}`;
  }
 };
 return errorClass;
}

var UnboundTypeError = undefined;

function getTypeName(type) {
 var ptr = ___getTypeName(type);
 var rv = readLatin1String(ptr);
 _free(ptr);
 return rv;
}

function throwUnboundTypeError(message, types) {
 var unboundTypes = [];
 var seen = {};
 function visit(type) {
  if (seen[type]) {
   return;
  }
  if (registeredTypes[type]) {
   return;
  }
  if (typeDependencies[type]) {
   typeDependencies[type].forEach(visit);
   return;
  }
  unboundTypes.push(type);
  seen[type] = true;
 }
 types.forEach(visit);
 throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([ ", " ]));
}

function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
 name = readLatin1String(name);
 getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
 if (upcast) {
  upcast = embind__requireFunction(upcastSignature, upcast);
 }
 if (downcast) {
  downcast = embind__requireFunction(downcastSignature, downcast);
 }
 rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
 var legalFunctionName = makeLegalFunctionName(name);
 exposePublicSymbol(legalFunctionName, function() {
  throwUnboundTypeError(`Cannot construct ${name} due to unbound types`, [ baseClassRawType ]);
 });
 whenDependentTypesAreResolved([ rawType, rawPointerType, rawConstPointerType ], baseClassRawType ? [ baseClassRawType ] : [], function(base) {
  base = base[0];
  var baseClass;
  var basePrototype;
  if (baseClassRawType) {
   baseClass = base.registeredClass;
   basePrototype = baseClass.instancePrototype;
  } else {
   basePrototype = ClassHandle.prototype;
  }
  var constructor = createNamedFunction(legalFunctionName, function() {
   if (Object.getPrototypeOf(this) !== instancePrototype) {
    throw new BindingError("Use 'new' to construct " + name);
   }
   if (undefined === registeredClass.constructor_body) {
    throw new BindingError(name + " has no accessible constructor");
   }
   var body = registeredClass.constructor_body[arguments.length];
   if (undefined === body) {
    throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`);
   }
   return body.apply(this, arguments);
  });
  var instancePrototype = Object.create(basePrototype, {
   constructor: {
    value: constructor
   }
  });
  constructor.prototype = instancePrototype;
  var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
  if (registeredClass.baseClass) {
   if (registeredClass.baseClass.__derivedClasses === undefined) {
    registeredClass.baseClass.__derivedClasses = [];
   }
   registeredClass.baseClass.__derivedClasses.push(registeredClass);
  }
  var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
  var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
  var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
  registeredPointers[rawType] = {
   pointerType: pointerConverter,
   constPointerType: constPointerConverter
  };
  replacePublicSymbol(legalFunctionName, constructor);
  return [ referenceConverter, pointerConverter, constPointerConverter ];
 });
}

function heap32VectorToArray(count, firstElement) {
 var array = [];
 for (var i = 0; i < count; i++) {
  array.push(SAFE_HEAP_LOAD((firstElement + i * 4 >> 2) * 4, 4, 1));
 }
 return array;
}

function newFunc(constructor, argumentList) {
 if (!(constructor instanceof Function)) {
  throw new TypeError(`new_ called with constructor type ${typeof constructor} which is not a function`);
 }
 var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {});
 dummy.prototype = constructor.prototype;
 var obj = new dummy;
 var r = constructor.apply(obj, argumentList);
 return r instanceof Object ? r : obj;
}

function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
 var argCount = argTypes.length;
 if (argCount < 2) {
  throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
 }
 assert(!isAsync, "Async bindings are only supported with JSPI.");
 var isClassMethodFunc = argTypes[1] !== null && classType !== null;
 var needsDestructorStack = false;
 for (var i = 1; i < argTypes.length; ++i) {
  if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
   needsDestructorStack = true;
   break;
  }
 }
 var returns = argTypes[0].name !== "void";
 var argsList = "";
 var argsListWired = "";
 for (var i = 0; i < argCount - 2; ++i) {
  argsList += (i !== 0 ? ", " : "") + "arg" + i;
  argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
 }
 var invokerFnBody = `\n        return function ${makeLegalFunctionName(humanName)}(${argsList}) {\n        if (arguments.length !== ${argCount - 2}) {\n          throwBindingError('function ${humanName} called with ${arguments.length} arguments, expected ${argCount - 2} args!');\n        }`;
 if (needsDestructorStack) {
  invokerFnBody += "var destructors = [];\n";
 }
 var dtorStack = needsDestructorStack ? "destructors" : "null";
 var args1 = [ "throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam" ];
 var args2 = [ throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1] ];
 if (isClassMethodFunc) {
  invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
 }
 for (var i = 0; i < argCount - 2; ++i) {
  invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
  args1.push("argType" + i);
  args2.push(argTypes[i + 2]);
 }
 if (isClassMethodFunc) {
  argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
 }
 invokerFnBody += (returns || isAsync ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
 if (needsDestructorStack) {
  invokerFnBody += "runDestructors(destructors);\n";
 } else {
  for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
   var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
   if (argTypes[i].destructorFunction !== null) {
    invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
    args1.push(paramName + "_dtor");
    args2.push(argTypes[i].destructorFunction);
   }
  }
 }
 if (returns) {
  invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n";
 } else {}
 invokerFnBody += "}\n";
 args1.push(invokerFnBody);
 return newFunc(Function, args1).apply(null, args2);
}

function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
 assert(argCount > 0);
 var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 invoker = embind__requireFunction(invokerSignature, invoker);
 var args = [ rawConstructor ];
 var destructors = [];
 whenDependentTypesAreResolved([], [ rawClassType ], function(classType) {
  classType = classType[0];
  var humanName = `constructor ${classType.name}`;
  if (undefined === classType.registeredClass.constructor_body) {
   classType.registeredClass.constructor_body = [];
  }
  if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
   throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount - 1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
  }
  classType.registeredClass.constructor_body[argCount - 1] = () => {
   throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`, rawArgTypes);
  };
  whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
   argTypes.splice(1, 0, null);
   classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
   return [];
  });
  return [];
 });
}

function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual, isAsync) {
 var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 methodName = readLatin1String(methodName);
 rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
 whenDependentTypesAreResolved([], [ rawClassType ], function(classType) {
  classType = classType[0];
  var humanName = `${classType.name}.${methodName}`;
  if (methodName.startsWith("@@")) {
   methodName = Symbol[methodName.substring(2)];
  }
  if (isPureVirtual) {
   classType.registeredClass.pureVirtualFunctions.push(methodName);
  }
  function unboundTypesHandler() {
   throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
  }
  var proto = classType.registeredClass.instancePrototype;
  var method = proto[methodName];
  if (undefined === method || undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
   unboundTypesHandler.argCount = argCount - 2;
   unboundTypesHandler.className = classType.name;
   proto[methodName] = unboundTypesHandler;
  } else {
   ensureOverloadTable(proto, methodName, humanName);
   proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
  }
  whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
   var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
   if (undefined === proto[methodName].overloadTable) {
    memberFunction.argCount = argCount - 2;
    proto[methodName] = memberFunction;
   } else {
    proto[methodName].overloadTable[argCount - 2] = memberFunction;
   }
   return [];
  });
  return [];
 });
}

function validateThis(this_, classType, humanName) {
 if (!(this_ instanceof Object)) {
  throwBindingError(`${humanName} with invalid "this": ${this_}`);
 }
 if (!(this_ instanceof classType.registeredClass.constructor)) {
  throwBindingError(`${humanName} incompatible with "this" of type ${this_.constructor.name}`);
 }
 if (!this_.$$.ptr) {
  throwBindingError(`cannot call emscripten binding method ${humanName} on deleted object`);
 }
 return upcastPointer(this_.$$.ptr, this_.$$.ptrType.registeredClass, classType.registeredClass);
}

function __embind_register_class_property(classType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
 fieldName = readLatin1String(fieldName);
 getter = embind__requireFunction(getterSignature, getter);
 whenDependentTypesAreResolved([], [ classType ], function(classType) {
  classType = classType[0];
  var humanName = `${classType.name}.${fieldName}`;
  var desc = {
   get() {
    throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`, [ getterReturnType, setterArgumentType ]);
   },
   enumerable: true,
   configurable: true
  };
  if (setter) {
   desc.set = () => {
    throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`, [ getterReturnType, setterArgumentType ]);
   };
  } else {
   desc.set = v => {
    throwBindingError(humanName + " is a read-only property");
   };
  }
  Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
  whenDependentTypesAreResolved([], setter ? [ getterReturnType, setterArgumentType ] : [ getterReturnType ], function(types) {
   var getterReturnType = types[0];
   var desc = {
    get() {
     var ptr = validateThis(this, classType, humanName + " getter");
     return getterReturnType["fromWireType"](getter(getterContext, ptr));
    },
    enumerable: true
   };
   if (setter) {
    setter = embind__requireFunction(setterSignature, setter);
    var setterArgumentType = types[1];
    desc.set = function(v) {
     var ptr = validateThis(this, classType, humanName + " setter");
     var destructors = [];
     setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, v));
     runDestructors(destructors);
    };
   }
   Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
   return [];
  });
  return [];
 });
}

function handleAllocatorInit() {
 Object.assign(HandleAllocator.prototype, {
  get(id) {
   assert(this.allocated[id] !== undefined, `invalid handle: ${id}`);
   return this.allocated[id];
  },
  has(id) {
   return this.allocated[id] !== undefined;
  },
  allocate(handle) {
   var id = this.freelist.pop() || this.allocated.length;
   this.allocated[id] = handle;
   return id;
  },
  free(id) {
   assert(this.allocated[id] !== undefined);
   this.allocated[id] = undefined;
   this.freelist.push(id);
  }
 });
}

function HandleAllocator() {
 this.allocated = [ undefined ];
 this.freelist = [];
}

var emval_handles = new HandleAllocator;

function __emval_decref(handle) {
 if (handle >= emval_handles.reserved && 0 === --emval_handles.get(handle).refcount) {
  emval_handles.free(handle);
 }
}

function count_emval_handles() {
 var count = 0;
 for (var i = emval_handles.reserved; i < emval_handles.allocated.length; ++i) {
  if (emval_handles.allocated[i] !== undefined) {
   ++count;
  }
 }
 return count;
}

function init_emval() {
 emval_handles.allocated.push({
  value: undefined
 }, {
  value: null
 }, {
  value: true
 }, {
  value: false
 });
 emval_handles.reserved = emval_handles.allocated.length;
 Module["count_emval_handles"] = count_emval_handles;
}

var Emval = {
 toValue: handle => {
  if (!handle) {
   throwBindingError("Cannot use deleted val. handle = " + handle);
  }
  return emval_handles.get(handle).value;
 },
 toHandle: value => {
  switch (value) {
  case undefined:
   return 1;

  case null:
   return 2;

  case true:
   return 3;

  case false:
   return 4;

  default:
   {
    return emval_handles.allocate({
     refcount: 1,
     value: value
    });
   }
  }
 }
};

function __embind_register_emval(rawType, name) {
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(handle) {
   var rv = Emval.toValue(handle);
   __emval_decref(handle);
   return rv;
  },
  "toWireType": function(destructors, value) {
   return Emval.toHandle(value);
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: null
 });
}

function enumReadValueFromPointer(name, shift, signed) {
 switch (shift) {
 case 0:
  return function(pointer) {
   var heap = signed ? HEAP8 : HEAPU8;
   return this["fromWireType"](heap[pointer]);
  };

 case 1:
  return function(pointer) {
   var heap = signed ? HEAP16 : HEAPU16;
   return this["fromWireType"](heap[pointer >> 1]);
  };

 case 2:
  return function(pointer) {
   var heap = signed ? HEAP32 : HEAPU32;
   return this["fromWireType"](heap[pointer >> 2]);
  };

 default:
  throw new TypeError("Unknown integer type: " + name);
 }
}

function __embind_register_enum(rawType, name, size, isSigned) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 function ctor() {}
 ctor.values = {};
 registerType(rawType, {
  name: name,
  constructor: ctor,
  "fromWireType": function(c) {
   return this.constructor.values[c];
  },
  "toWireType": function(destructors, c) {
   return c.value;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": enumReadValueFromPointer(name, shift, isSigned),
  destructorFunction: null
 });
 exposePublicSymbol(name, ctor);
}

function requireRegisteredType(rawType, humanName) {
 var impl = registeredTypes[rawType];
 if (undefined === impl) {
  throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
 }
 return impl;
}

function __embind_register_enum_value(rawEnumType, name, enumValue) {
 var enumType = requireRegisteredType(rawEnumType, "enum");
 name = readLatin1String(name);
 var Enum = enumType.constructor;
 var Value = Object.create(enumType.constructor.prototype, {
  value: {
   value: enumValue
  },
  constructor: {
   value: createNamedFunction(`${enumType.name}_${name}`, function() {})
  }
 });
 Enum.values[enumValue] = Value;
 Enum[name] = Value;
}

function floatReadValueFromPointer(name, shift) {
 switch (shift) {
 case 2:
  return function(pointer) {
   return this["fromWireType"](SAFE_HEAP_LOAD_D((pointer >> 2) * 4, 4, 0));
  };

 case 3:
  return function(pointer) {
   return this["fromWireType"](SAFE_HEAP_LOAD_D((pointer >> 3) * 8, 8, 0));
  };

 default:
  throw new TypeError("Unknown float type: " + name);
 }
}

function __embind_register_float(rawType, name, size) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   return value;
  },
  "toWireType": function(destructors, value) {
   if (typeof value != "number" && typeof value != "boolean") {
    throw new TypeError(`Cannot convert ${embindRepr(value)} to ${this.name}`);
   }
   return value;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": floatReadValueFromPointer(name, shift),
  destructorFunction: null
 });
}

function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync) {
 var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 name = readLatin1String(name);
 rawInvoker = embind__requireFunction(signature, rawInvoker);
 exposePublicSymbol(name, function() {
  throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
 }, argCount - 1);
 whenDependentTypesAreResolved([], argTypes, function(argTypes) {
  var invokerArgsArray = [ argTypes[0], null ].concat(argTypes.slice(1));
  replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
  return [];
 });
}

function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
 name = readLatin1String(name);
 if (maxRange === -1) {
  maxRange = 4294967295;
 }
 var shift = getShiftFromSize(size);
 var fromWireType = value => value;
 if (minRange === 0) {
  var bitshift = 32 - 8 * size;
  fromWireType = value => value << bitshift >>> bitshift;
 }
 var isUnsignedType = name.includes("unsigned");
 var checkAssertions = (value, toTypeName) => {
  if (typeof value != "number" && typeof value != "boolean") {
   throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${toTypeName}`);
  }
  if (value < minRange || value > maxRange) {
   throw new TypeError(`Passing a number "${embindRepr(value)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`);
  }
 };
 var toWireType;
 if (isUnsignedType) {
  toWireType = function(destructors, value) {
   checkAssertions(value, this.name);
   return value >>> 0;
  };
 } else {
  toWireType = function(destructors, value) {
   checkAssertions(value, this.name);
   return value;
  };
 }
 registerType(primitiveType, {
  name: name,
  "fromWireType": fromWireType,
  "toWireType": toWireType,
  "argPackAdvance": 8,
  "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
  destructorFunction: null
 });
}

function __embind_register_memory_view(rawType, dataTypeIndex, name) {
 var typeMapping = [ Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array ];
 var TA = typeMapping[dataTypeIndex];
 function decodeMemoryView(handle) {
  handle = handle >> 2;
  var heap = HEAPU32;
  var size = heap[handle];
  var data = heap[handle + 1];
  return new TA(heap.buffer, data, size);
 }
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": decodeMemoryView,
  "argPackAdvance": 8,
  "readValueFromPointer": decodeMemoryView
 }, {
  ignoreDuplicateRegistrations: true
 });
}

function __embind_register_std_string(rawType, name) {
 name = readLatin1String(name);
 var stdStringIsUTF8 = name === "std::string";
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   var length = SAFE_HEAP_LOAD((value >> 2) * 4, 4, 1);
   var payload = value + 4;
   var str;
   if (stdStringIsUTF8) {
    var decodeStartPtr = payload;
    for (var i = 0; i <= length; ++i) {
     var currentBytePtr = payload + i;
     if (i == length || SAFE_HEAP_LOAD(currentBytePtr, 1, 1) == 0) {
      var maxRead = currentBytePtr - decodeStartPtr;
      var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
      if (str === undefined) {
       str = stringSegment;
      } else {
       str += String.fromCharCode(0);
       str += stringSegment;
      }
      decodeStartPtr = currentBytePtr + 1;
     }
    }
   } else {
    var a = new Array(length);
    for (var i = 0; i < length; ++i) {
     a[i] = String.fromCharCode(SAFE_HEAP_LOAD(payload + i, 1, 1));
    }
    str = a.join("");
   }
   _free(value);
   return str;
  },
  "toWireType": function(destructors, value) {
   if (value instanceof ArrayBuffer) {
    value = new Uint8Array(value);
   }
   var length;
   var valueIsOfTypeString = typeof value == "string";
   if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
    throwBindingError("Cannot pass non-string to std::string");
   }
   if (stdStringIsUTF8 && valueIsOfTypeString) {
    length = lengthBytesUTF8(value);
   } else {
    length = value.length;
   }
   var base = _malloc(4 + length + 1);
   var ptr = base + 4;
   SAFE_HEAP_STORE((base >> 2) * 4, length, 4);
   checkInt32(length);
   if (stdStringIsUTF8 && valueIsOfTypeString) {
    stringToUTF8(value, ptr, length + 1);
   } else {
    if (valueIsOfTypeString) {
     for (var i = 0; i < length; ++i) {
      var charCode = value.charCodeAt(i);
      if (charCode > 255) {
       _free(ptr);
       throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
      }
      SAFE_HEAP_STORE(ptr + i, charCode, 1);
     }
    } else {
     for (var i = 0; i < length; ++i) {
      SAFE_HEAP_STORE(ptr + i, value[i], 1);
     }
    }
   }
   if (destructors !== null) {
    destructors.push(_free, base);
   }
   return base;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: function(ptr) {
   _free(ptr);
  }
 });
}

var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : undefined;

var UTF16ToString = (ptr, maxBytesToRead) => {
 assert(ptr % 2 == 0, "Pointer passed to UTF16ToString must be aligned to two bytes!");
 var endPtr = ptr;
 var idx = endPtr >> 1;
 var maxIdx = idx + maxBytesToRead / 2;
 while (!(idx >= maxIdx) && SAFE_HEAP_LOAD(idx * 2, 2, 1)) ++idx;
 endPtr = idx << 1;
 if (endPtr - ptr > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
 var str = "";
 for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
  var codeUnit = SAFE_HEAP_LOAD((ptr + i * 2 >> 1) * 2, 2, 0);
  if (codeUnit == 0) break;
  str += String.fromCharCode(codeUnit);
 }
 return str;
};

var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
 assert(outPtr % 2 == 0, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
 assert(typeof maxBytesToWrite == "number", "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 2) return 0;
 maxBytesToWrite -= 2;
 var startPtr = outPtr;
 var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
 for (var i = 0; i < numCharsToWrite; ++i) {
  var codeUnit = str.charCodeAt(i);
  SAFE_HEAP_STORE((outPtr >> 1) * 2, codeUnit, 2);
  checkInt16(codeUnit);
  outPtr += 2;
 }
 SAFE_HEAP_STORE((outPtr >> 1) * 2, 0, 2);
 checkInt16(0);
 return outPtr - startPtr;
};

var lengthBytesUTF16 = str => str.length * 2;

var UTF32ToString = (ptr, maxBytesToRead) => {
 assert(ptr % 4 == 0, "Pointer passed to UTF32ToString must be aligned to four bytes!");
 var i = 0;
 var str = "";
 while (!(i >= maxBytesToRead / 4)) {
  var utf32 = SAFE_HEAP_LOAD((ptr + i * 4 >> 2) * 4, 4, 0);
  if (utf32 == 0) break;
  ++i;
  if (utf32 >= 65536) {
   var ch = utf32 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  } else {
   str += String.fromCharCode(utf32);
  }
 }
 return str;
};

var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
 assert(outPtr % 4 == 0, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
 assert(typeof maxBytesToWrite == "number", "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 4) return 0;
 var startPtr = outPtr;
 var endPtr = startPtr + maxBytesToWrite - 4;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) {
   var trailSurrogate = str.charCodeAt(++i);
   codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
  }
  SAFE_HEAP_STORE((outPtr >> 2) * 4, codeUnit, 4);
  checkInt32(codeUnit);
  outPtr += 4;
  if (outPtr + 4 > endPtr) break;
 }
 SAFE_HEAP_STORE((outPtr >> 2) * 4, 0, 4);
 checkInt32(0);
 return outPtr - startPtr;
};

var lengthBytesUTF32 = str => {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
  len += 4;
 }
 return len;
};

var __embind_register_std_wstring = function(rawType, charSize, name) {
 name = readLatin1String(name);
 var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
 if (charSize === 2) {
  decodeString = UTF16ToString;
  encodeString = stringToUTF16;
  lengthBytesUTF = lengthBytesUTF16;
  getHeap = () => HEAPU16;
  shift = 1;
 } else if (charSize === 4) {
  decodeString = UTF32ToString;
  encodeString = stringToUTF32;
  lengthBytesUTF = lengthBytesUTF32;
  getHeap = () => HEAPU32;
  shift = 2;
 }
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   var length = SAFE_HEAP_LOAD((value >> 2) * 4, 4, 1);
   var HEAP = getHeap();
   var str;
   var decodeStartPtr = value + 4;
   for (var i = 0; i <= length; ++i) {
    var currentBytePtr = value + 4 + i * charSize;
    if (i == length || HEAP[currentBytePtr >> shift] == 0) {
     var maxReadBytes = currentBytePtr - decodeStartPtr;
     var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
     if (str === undefined) {
      str = stringSegment;
     } else {
      str += String.fromCharCode(0);
      str += stringSegment;
     }
     decodeStartPtr = currentBytePtr + charSize;
    }
   }
   _free(value);
   return str;
  },
  "toWireType": function(destructors, value) {
   if (!(typeof value == "string")) {
    throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
   }
   var length = lengthBytesUTF(value);
   var ptr = _malloc(4 + length + charSize);
   SAFE_HEAP_STORE((ptr >> 2) * 4, length >> shift, 4);
   encodeString(value, ptr + 4, length + charSize);
   if (destructors !== null) {
    destructors.push(_free, ptr);
   }
   return ptr;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: function(ptr) {
   _free(ptr);
  }
 });
};

function __embind_register_value_object(rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) {
 structRegistrations[rawType] = {
  name: readLatin1String(name),
  rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
  rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
  fields: []
 };
}

function __embind_register_value_object_field(structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
 structRegistrations[structType].fields.push({
  fieldName: readLatin1String(fieldName),
  getterReturnType: getterReturnType,
  getter: embind__requireFunction(getterSignature, getter),
  getterContext: getterContext,
  setterArgumentType: setterArgumentType,
  setter: embind__requireFunction(setterSignature, setter),
  setterContext: setterContext
 });
}

function __embind_register_void(rawType, name) {
 name = readLatin1String(name);
 registerType(rawType, {
  isVoid: true,
  name: name,
  "argPackAdvance": 0,
  "fromWireType": function() {
   return undefined;
  },
  "toWireType": function(destructors, o) {
   return undefined;
  }
 });
}

var _abort = () => {
 abort("native code called abort()");
};

var _emscripten_memcpy_big = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

var getHeapMax = () => 2147483648;

var _emscripten_get_now;

_emscripten_get_now = () => performance.now();

var growMemory = size => {
 var b = wasmMemory.buffer;
 var pages = size - b.byteLength + 65535 >>> 16;
 try {
  wasmMemory.grow(pages);
  updateMemoryViews();
  return 1;
 } catch (e) {
  err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
 }
};

var _emscripten_resize_heap = requestedSize => {
 var oldSize = HEAPU8.length;
 requestedSize >>>= 0;
 assert(requestedSize > oldSize);
 var maxHeapSize = getHeapMax();
 if (requestedSize > maxHeapSize) {
  err(`Cannot enlarge memory, asked to go up to ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
  return false;
 }
 var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  var t0 = _emscripten_get_now();
  var replacement = growMemory(newSize);
  var t1 = _emscripten_get_now();
  out(`Heap resize call from ${oldSize} to ${newSize} took ${t1 - t0} msecs. Success: ${!!replacement}`);
  if (replacement) {
   return true;
  }
 }
 err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
 return false;
};

var SYSCALLS = {
 varargs: undefined,
 get() {
  assert(SYSCALLS.varargs != undefined);
  SYSCALLS.varargs += 4;
  var ret = SAFE_HEAP_LOAD((SYSCALLS.varargs - 4 >> 2) * 4, 4, 0);
  return ret;
 },
 getStr(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 }
};

var _fd_close = fd => {
 abort("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM");
};

var MAX_INT53 = 9007199254740992;

var MIN_INT53 = -9007199254740992;

function bigintToI53Checked(num) {
 return num < MIN_INT53 || num > MAX_INT53 ? NaN : Number(num);
}

function _fd_seek(fd, offset, whence, newOffset) {
 offset = bigintToI53Checked(offset);
 newOffset = bigintToI53Checked(newOffset);
 return 70;
}

var printCharBuffers = [ null, [], [] ];

var printChar = (stream, curr) => {
 var buffer = printCharBuffers[stream];
 assert(buffer);
 if (curr === 0 || curr === 10) {
  (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
  buffer.length = 0;
 } else {
  buffer.push(curr);
 }
};

var flush_NO_FILESYSTEM = () => {
 _fflush(0);
 if (printCharBuffers[1].length) printChar(1, 10);
 if (printCharBuffers[2].length) printChar(2, 10);
};

var _fd_write = (fd, iov, iovcnt, pnum) => {
 var num = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = SAFE_HEAP_LOAD((iov >> 2) * 4, 4, 1);
  var len = SAFE_HEAP_LOAD((iov + 4 >> 2) * 4, 4, 1);
  iov += 8;
  for (var j = 0; j < len; j++) {
   printChar(fd, SAFE_HEAP_LOAD(ptr + j, 1, 1));
  }
  num += len;
 }
 SAFE_HEAP_STORE((pnum >> 2) * 4, num, 4);
 checkInt32(num);
 return 0;
};

InternalError = Module["InternalError"] = class InternalError extends Error {
 constructor(message) {
  super(message);
  this.name = "InternalError";
 }
};

embind_init_charCodes();

BindingError = Module["BindingError"] = class BindingError extends Error {
 constructor(message) {
  super(message);
  this.name = "BindingError";
 }
};

init_ClassHandle();

init_embind();

init_RegisteredPointer();

UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");

handleAllocatorInit();

init_emval();

function checkIncomingModuleAPI() {
 ignoredModuleProp("fetchSettings");
}

var wasmImports = {
 __assert_fail: ___assert_fail,
 __cxa_throw: ___cxa_throw,
 __handle_stack_overflow: ___handle_stack_overflow,
 _embind_finalize_value_object: __embind_finalize_value_object,
 _embind_register_bigint: __embind_register_bigint,
 _embind_register_bool: __embind_register_bool,
 _embind_register_class: __embind_register_class,
 _embind_register_class_constructor: __embind_register_class_constructor,
 _embind_register_class_function: __embind_register_class_function,
 _embind_register_class_property: __embind_register_class_property,
 _embind_register_emval: __embind_register_emval,
 _embind_register_enum: __embind_register_enum,
 _embind_register_enum_value: __embind_register_enum_value,
 _embind_register_float: __embind_register_float,
 _embind_register_function: __embind_register_function,
 _embind_register_integer: __embind_register_integer,
 _embind_register_memory_view: __embind_register_memory_view,
 _embind_register_std_string: __embind_register_std_string,
 _embind_register_std_wstring: __embind_register_std_wstring,
 _embind_register_value_object: __embind_register_value_object,
 _embind_register_value_object_field: __embind_register_value_object_field,
 _embind_register_void: __embind_register_void,
 abort: _abort,
 alignfault: alignfault,
 emscripten_memcpy_big: _emscripten_memcpy_big,
 emscripten_resize_heap: _emscripten_resize_heap,
 fd_close: _fd_close,
 fd_seek: _fd_seek,
 fd_write: _fd_write,
 segfault: segfault
};

var asm = createWasm();

var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors");

var ___getTypeName = createExportWrapper("__getTypeName");

var __embind_initialize_bindings = Module["__embind_initialize_bindings"] = createExportWrapper("_embind_initialize_bindings");

var ___errno_location = createExportWrapper("__errno_location");

var _fflush = Module["_fflush"] = createExportWrapper("fflush");

var _emscripten_get_sbrk_ptr = createExportWrapper("emscripten_get_sbrk_ptr");

var _sbrk = createExportWrapper("sbrk");

var _malloc = createExportWrapper("malloc");

var _free = createExportWrapper("free");

var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports["emscripten_stack_init"])();

var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"])();

var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"])();

var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();

var stackSave = createExportWrapper("stackSave");

var stackRestore = createExportWrapper("stackRestore");

var stackAlloc = createExportWrapper("stackAlloc");

var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();

var ___cxa_demangle = createExportWrapper("__cxa_demangle");

var ___cxa_is_pointer_type = createExportWrapper("__cxa_is_pointer_type");

var ___set_stack_limits = Module["___set_stack_limits"] = createExportWrapper("__set_stack_limits");

var missingLibrarySymbols = [ "writeI53ToI64", "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "readI53FromI64", "readI53FromU64", "convertI32PairToI53", "convertI32PairToI53Checked", "convertU32PairToI53", "zeroMemory", "exitJS", "isLeapYear", "ydayFromDate", "arraySum", "addDays", "setErrNo", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "getHostByName", "initRandomFill", "randomFill", "getCallstack", "emscriptenLog", "convertPCtoSourceLocation", "readEmAsmArgs", "jstoi_q", "jstoi_s", "getExecutableName", "listenOnce", "autoResumeAudioContext", "getDynCaller", "dynCall", "handleException", "runtimeKeepalivePush", "runtimeKeepalivePop", "callUserCallback", "maybeExit", "safeSetTimeout", "asmjsMangle", "asyncLoad", "alignMemory", "mmapAlloc", "getNativeTypeSize", "STACK_SIZE", "STACK_ALIGN", "POINTER_SIZE", "ASSERTIONS", "getCFunc", "ccall", "cwrap", "uleb128Encode", "sigToWasmTypes", "generateFuncType", "convertJsFunctionToWasm", "getEmptyTableSlot", "updateTableMap", "getFunctionAddress", "addFunction", "removeFunction", "reallyNegative", "strLen", "reSign", "formatString", "intArrayFromString", "intArrayToString", "AsciiToString", "stringToAscii", "stringToNewUTF8", "writeArrayToMemory", "registerKeyEventCallback", "maybeCStringToJsString", "findEventTarget", "findCanvasEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerMouseEventCallback", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "hideEverythingExceptGivenElement", "restoreHiddenElements", "setLetterbox", "softFullscreenResizeWebGLRenderTarget", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "registerPointerlockErrorEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "setCanvasElementSize", "getCanvasElementSize", "getEnvStrings", "checkWasiClock", "wasiRightsToMuslOFlags", "wasiOFlagsToMuslOFlags", "createDyncallWrapper", "setImmediateWrapped", "clearImmediateWrapped", "polyfillSetImmediate", "getPromise", "makePromise", "idsToPromises", "makePromiseCallback", "findMatchingCatch", "setMainLoop", "getSocketFromFD", "getSocketAddress", "heapObjectForWebGLType", "heapAccessShiftForWebGLHeap", "webgl_enable_ANGLE_instanced_arrays", "webgl_enable_OES_vertex_array_object", "webgl_enable_WEBGL_draw_buffers", "webgl_enable_WEBGL_multi_draw", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "colorChannelsInGlTextureFormat", "emscriptenWebGLGetTexPixelData", "__glGenObject", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "__glGetActiveAttribOrUniform", "writeGLArray", "registerWebGlEventCallback", "runAndAbortIfError", "SDL_unicode", "SDL_ttfContext", "SDL_audio", "GLFW_Window", "ALLOC_NORMAL", "ALLOC_STACK", "allocate", "writeStringToMemory", "writeAsciiToMemory", "registerInheritedInstance", "unregisterInheritedInstance", "getStringOrSymbol", "craftEmvalAllocator", "emval_get_global", "emval_lookupTypes", "emval_allocateDestructors", "emval_addMethodCaller" ];

missingLibrarySymbols.forEach(missingLibrarySymbol);

var unexportedSymbols = [ "run", "addOnPreRun", "addOnInit", "addOnPreMain", "addOnExit", "addOnPostRun", "addRunDependency", "removeRunDependency", "FS_createFolder", "FS_createPath", "FS_createDataFile", "FS_createLazyFile", "FS_createLink", "FS_createDevice", "FS_unlink", "out", "err", "callMain", "abort", "keepRuntimeAlive", "wasmMemory", "wasmTable", "wasmExports", "stackAlloc", "stackSave", "stackRestore", "getTempRet0", "setTempRet0", "writeStackCookie", "checkStackCookie", "MAX_INT53", "MIN_INT53", "bigintToI53Checked", "ptrToString", "getHeapMax", "growMemory", "ENV", "setStackLimits", "MONTH_DAYS_REGULAR", "MONTH_DAYS_LEAP", "MONTH_DAYS_REGULAR_CUMULATIVE", "MONTH_DAYS_LEAP_CUMULATIVE", "ERRNO_CODES", "ERRNO_MESSAGES", "DNS", "Protocols", "Sockets", "timers", "warnOnce", "UNWIND_CACHE", "readEmAsmArgsArray", "handleAllocatorInit", "HandleAllocator", "freeTableIndexes", "functionsInTableMap", "unSign", "setValue", "getValue", "PATH", "PATH_FS", "UTF8Decoder", "UTF8ArrayToString", "UTF8ToString", "stringToUTF8Array", "stringToUTF8", "lengthBytesUTF8", "UTF16Decoder", "UTF16ToString", "stringToUTF16", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "stringToUTF8OnStack", "JSEvents", "specialHTMLTargets", "currentFullscreenStrategy", "restoreOldWindowedStyle", "demangle", "demangleAll", "jsStackTrace", "stackTrace", "ExitStatus", "flush_NO_FILESYSTEM", "promiseMap", "uncaughtExceptionCount", "exceptionLast", "exceptionCaught", "ExceptionInfo", "Browser", "wget", "SYSCALLS", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "miniTempWebGLIntBuffers", "GL", "emscripten_webgl_power_preferences", "AL", "GLUT", "EGL", "GLEW", "IDBStore", "SDL", "SDL_gfx", "GLFW", "allocateUTF8", "allocateUTF8OnStack", "InternalError", "BindingError", "throwInternalError", "throwBindingError", "registeredTypes", "awaitingDependencies", "typeDependencies", "tupleRegistrations", "structRegistrations", "sharedRegisterType", "whenDependentTypesAreResolved", "embind_charCodes", "embind_init_charCodes", "readLatin1String", "getTypeName", "heap32VectorToArray", "requireRegisteredType", "UnboundTypeError", "PureVirtualError", "init_embind", "throwUnboundTypeError", "ensureOverloadTable", "exposePublicSymbol", "replacePublicSymbol", "extendError", "createNamedFunction", "embindRepr", "registeredInstances", "getBasestPointer", "getInheritedInstance", "getInheritedInstanceCount", "getLiveInheritedInstances", "registeredPointers", "registerType", "getShiftFromSize", "integerReadValueFromPointer", "enumReadValueFromPointer", "floatReadValueFromPointer", "simpleReadValueFromPointer", "runDestructors", "newFunc", "craftInvokerFunction", "embind__requireFunction", "genericPointerToWireType", "constNoSmartPtrRawPointerToWireType", "nonConstNoSmartPtrRawPointerToWireType", "init_RegisteredPointer", "RegisteredPointer", "RegisteredPointer_getPointee", "RegisteredPointer_destructor", "RegisteredPointer_deleteObject", "RegisteredPointer_fromWireType", "runDestructor", "releaseClassHandle", "finalizationRegistry", "detachFinalizer_deps", "detachFinalizer", "attachFinalizer", "makeClassHandle", "init_ClassHandle", "ClassHandle", "ClassHandle_isAliasOf", "throwInstanceAlreadyDeleted", "ClassHandle_clone", "ClassHandle_delete", "deletionQueue", "ClassHandle_isDeleted", "ClassHandle_deleteLater", "flushPendingDeletes", "delayFunction", "setDelayFunction", "RegisteredClass", "shallowCopyInternalPointer", "downcastPointer", "upcastPointer", "validateThis", "char_0", "char_9", "makeLegalFunctionName", "emval_handles", "emval_symbols", "init_emval", "count_emval_handles", "Emval", "emval_newers", "emval_methodCallers", "emval_registeredMethods" ];

unexportedSymbols.forEach(unexportedRuntimeSymbol);

var calledRun;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function stackCheckInit() {
 _emscripten_stack_init();
 writeStackCookie();
}

function run() {
 if (runDependencies > 0) {
  return;
 }
 stackCheckInit();
 preRun();
 if (runDependencies > 0) {
  return;
 }
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  readyPromiseResolve(Module);
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
 checkStackCookie();
}

function checkUnflushedContent() {
 var oldOut = out;
 var oldErr = err;
 var has = false;
 out = err = x => {
  has = true;
 };
 try {
  flush_NO_FILESYSTEM();
 } catch (e) {}
 out = oldOut;
 err = oldErr;
 if (has) {
  warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
  warnOnce("(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)");
 }
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

run();


  return moduleArg.ready
}

);
})();
export default PathOps;