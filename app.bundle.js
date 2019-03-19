/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ead32e0175bc48d686f5";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/button/button.scss":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/app/button/button.scss ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "ce-button {\n  display: inline-block;\n  position: relative;\n  outline: none;\n  white-space: nowrap; }\n\nce-button[hidden] {\n  display: none !important; }\n\n.vaadin-button-container::before {\n  content: \"\\2003\";\n  display: inline-block;\n  width: 0; }\n\n.vaadin-button-container {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  width: 100%;\n  height: 100%;\n  min-height: inherit;\n  text-shadow: inherit;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none; }\n\n[part=\"prefix\"],\n[part=\"suffix\"] {\n  flex: none; }\n\n[part=\"label\"] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\nce-button {\n  --lumo-button-size: var(--lumo-size-m);\n  min-width: calc(var(--lumo-button-size) * 2);\n  height: var(--lumo-button-size);\n  padding: 0 calc(var(--lumo-button-size) / 3 + var(--lumo-border-radius) / 2);\n  margin: var(--lumo-space-xs) 0;\n  box-sizing: border-box;\n  font-family: var(--lumo-font-family);\n  font-size: var(--lumo-font-size-m);\n  font-weight: 500;\n  color: var(--lumo-primary-text-color);\n  background-color: var(--lumo-contrast-5pct);\n  border-radius: var(--lumo-border-radius);\n  cursor: default;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n[part=\"label\"],\n[part=\"prefix\"],\n[part=\"suffix\"] {\n  line-height: var(--lumo-line-height-xs); }\n\n[part=\"label\"] {\n  padding: calc(var(--lumo-button-size) / 6) 0; }\n\nce-button[theme~=\"small\"] {\n  font-size: var(--lumo-font-size-s);\n  --lumo-button-size: var(--lumo-size-s); }\n\nce-button[theme~=\"large\"] {\n  font-size: var(--lumo-font-size-l);\n  --lumo-button-size: var(--lumo-size-l); }\n\nce-button[disabled][disabled] {\n  pointer-events: none;\n  color: var(--lumo-disabled-text-color);\n  background-color: var(--lumo-contrast-5pct); }\n\nce-button:hover::before {\n  opacity: 0.05; }\n\n@media (pointer: coarse) {\n  ce-button[active]:hover::before {\n    opacity: 0; } }\n\nce-button::after {\n  transition: opacity 1.4s, transform 0.1s;\n  filter: blur(8px); }\n\nce-button[active]::before {\n  opacity: 0.1;\n  transition-duration: 0s; }\n\nce-button[active]::after {\n  opacity: 0.1;\n  transition-duration: 0s, 0s;\n  transform: scale(0); }\n\nce-button[focus-ring] {\n  box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct); }\n\nce-button[theme~=\"tertiary\"],\nce-button[theme~=\"tertiary-inline\"] {\n  background-color: transparent !important;\n  transition: opacity 0.2s;\n  min-width: 0; }\n\nce-button[theme~=\"tertiary\"]::before,\nce-button[theme~=\"tertiary-inline\"]::before {\n  display: none; }\n\nce-button[theme~=\"tertiary\"] {\n  padding: 0 calc(var(--lumo-button-size) / 6); }\n\n@media (hover: hover) {\n  ce-button[theme*=\"tertiary\"]:not([active]:hover) {\n    opacity: 0.8; } }\n\nce-button[theme~=\"tertiary\"][active],\nce-button[theme~=\"tertiary-inline\"][active] {\n  opacity: 0.5;\n  transition-duration: 0s; }\n\nce-button[theme~=\"tertiary-inline\"] {\n  margin: 0;\n  height: auto;\n  padding: 0;\n  line-height: inherit;\n  font-size: inherit; }\n\nce-button[theme~=\"tertiary-inline\"] [part=\"label\"] {\n  padding: 0;\n  overflow: visible;\n  line-height: inherit; }\n\nce-button[theme~=\"primary\"] {\n  background-color: var(--lumo-primary-color);\n  color: var(--lumo-primary-contrast-color);\n  font-weight: 600;\n  min-width: calc(var(--lumo-button-size) * 2.5); }\n\nce-button[theme~=\"primary\"][disabled] {\n  background-color: var(--lumo-primary-color-50pct);\n  color: var(--lumo-primary-contrast-color); }\n\nce-button[theme~=\"primary\"]:hover::before {\n  opacity: 0.1; }\n\nce-button[theme~=\"primary\"][active]::before {\n  background-color: var(--lumo-shade-20pct); }\n\n@media (pointer: coarse) {\n  ce-button[theme~=\"primary\"][active]::before {\n    background-color: var(--lumo-shade-60pct); }\n  ce-button[theme~=\"primary\"]:not([active]:hover)::before {\n    opacity: 0; } }\n\nce-button[theme~=\"primary\"][active]::after {\n  opacity: 0.2; }\n\nce-button[theme~=\"success\"] {\n  color: var(--lumo-success-text-color); }\n\nce-button[theme~=\"success\"][theme~=\"primary\"] {\n  background-color: var(--lumo-success-color);\n  color: var(--lumo-success-contrast-color); }\n\nce-button[theme~=\"success\"][theme~=\"primary\"][disabled] {\n  background-color: var(--lumo-success-color-50pct); }\n\nce-button[theme~=\"error\"] {\n  color: var(--lumo-error-text-color); }\n\nce-button[theme~=\"error\"][theme~=\"primary\"] {\n  background-color: var(--lumo-error-color);\n  color: var(--lumo-error-contrast-color); }\n\nce-button[theme~=\"error\"][theme~=\"primary\"][disabled] {\n  background-color: var(--lumo-error-color-50pct); }\n\nce-button[theme~=\"contrast\"] {\n  color: var(--lumo-contrast); }\n\nce-button[theme~=\"contrast\"][theme~=\"primary\"] {\n  background-color: var(--lumo-contrast);\n  color: var(--lumo-base-color); }\n\nce-button[theme~=\"contrast\"][theme~=\"primary\"][disabled] {\n  background-color: var(--lumo-contrast-50pct); }\n\n[part] ::slotted(iron-icon) {\n  display: inline-block;\n  width: var(--lumo-icon-size-m);\n  height: var(--lumo-icon-size-m); }\n\n[part] ::slotted(iron-icon[icon^=\"vaadin:\"]) {\n  padding: 0.25em;\n  box-sizing: border-box !important; }\n\n[part=\"prefix\"] {\n  margin-left: -0.25em;\n  margin-right: 0.25em; }\n\n[part=\"suffix\"] {\n  margin-left: 0.25em;\n  margin-right: -0.25em; }\n\nce-button[theme~=\"icon\"] {\n  min-width: var(--lumo-button-size);\n  padding-left: calc(var(--lumo-button-size) / 4);\n  padding-right: calc(var(--lumo-button-size) / 4); }\n\nce-button[theme~=\"icon\"] [part=\"prefix\"],\nce-button[theme~=\"icon\"] [part=\"suffix\"] {\n  margin-left: 0;\n  margin-right: 0; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/slider/slider.scss":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/app/slider/slider.scss ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/*! lightslider - v1.1.3 - 2015-04-14\n* https://github.com/sachinchoolur/lightslider\n* Copyright (c) 2015 Sachin N; Licensed MIT */\n/** /!!! core css Should not edit !!!/**/\n.lSSlideOuter {\n  overflow: hidden;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.lightSlider:before,\n.lightSlider:after {\n  content: \" \";\n  display: table; }\n\n.lightSlider {\n  overflow: hidden;\n  margin: 0; }\n\n.lSSlideWrapper {\n  max-width: 100%;\n  overflow: hidden;\n  position: relative; }\n\n.lSSlideWrapper > .lightSlider:after {\n  clear: both; }\n\n.lSSlideWrapper .lSSlide {\n  -webkit-transform: translate(0px, 0px);\n  -ms-transform: translate(0px, 0px);\n  transform: translate(0px, 0px);\n  -webkit-transition: all 1s;\n  -webkit-transition-property: -webkit-transform, height;\n  -moz-transition-property: -moz-transform, height;\n  transition-property: transform, height;\n  -webkit-transition-duration: inherit !important;\n  transition-duration: inherit !important;\n  -webkit-transition-timing-function: inherit !important;\n  transition-timing-function: inherit !important; }\n\n.lSSlideWrapper .lSFade {\n  position: relative; }\n\n.lSSlideWrapper .lSFade > * {\n  position: absolute !important;\n  top: 0;\n  left: 0;\n  z-index: 9;\n  margin-right: 0;\n  width: 100%; }\n\n.lSSlideWrapper.usingCss .lSFade > * {\n  opacity: 0;\n  -webkit-transition-delay: 0s;\n  transition-delay: 0s;\n  -webkit-transition-duration: inherit !important;\n  transition-duration: inherit !important;\n  -webkit-transition-property: opacity;\n  transition-property: opacity;\n  -webkit-transition-timing-function: inherit !important;\n  transition-timing-function: inherit !important; }\n\n.lSSlideWrapper .lSFade > *.active {\n  z-index: 10; }\n\n.lSSlideWrapper.usingCss .lSFade > *.active {\n  opacity: 1; }\n\n/** /!!! End of core css Should not edit !!!/**/\n/* Pager */\n.lSSlideOuter .lSPager.lSpg {\n  margin: 10px 0 0;\n  padding: 0;\n  text-align: center; }\n\n.lSSlideOuter .lSPager.lSpg > li {\n  cursor: pointer;\n  display: inline-block;\n  padding: 0 5px; }\n\n.lSSlideOuter .lSPager.lSpg > li a {\n  background-color: #222222;\n  border-radius: 30px;\n  display: inline-block;\n  height: 8px;\n  overflow: hidden;\n  text-indent: -999em;\n  width: 8px;\n  position: relative;\n  z-index: 99;\n  -webkit-transition: all 0.5s linear 0s;\n  transition: all 0.5s linear 0s; }\n\n.lSSlideOuter .lSPager.lSpg > li:hover a,\n.lSSlideOuter .lSPager.lSpg > li.active a {\n  background-color: #428bca; }\n\n.lSSlideOuter .media {\n  opacity: 0.8; }\n\n.lSSlideOuter .media.active {\n  opacity: 1; }\n\n/* End of pager */\n/** Gallery */\n.lSSlideOuter .lSPager.lSGallery {\n  list-style: none outside none;\n  padding-left: 0;\n  margin: 0;\n  overflow: hidden;\n  transform: translate3d(0px, 0px, 0px);\n  -moz-transform: translate3d(0px, 0px, 0px);\n  -ms-transform: translate3d(0px, 0px, 0px);\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  -o-transform: translate3d(0px, 0px, 0px);\n  -webkit-transition-property: -webkit-transform;\n  -moz-transition-property: -moz-transform;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.lSSlideOuter .lSPager.lSGallery li {\n  overflow: hidden;\n  -webkit-transition: border-radius 0.12s linear 0s 0.35s linear 0s;\n  transition: border-radius 0.12s linear 0s 0.35s linear 0s; }\n\n.lSSlideOuter .lSPager.lSGallery li.active,\n.lSSlideOuter .lSPager.lSGallery li:hover {\n  border-radius: 5px; }\n\n.lSSlideOuter .lSPager.lSGallery img {\n  display: block;\n  height: auto;\n  max-width: 100%; }\n\n.lSSlideOuter .lSPager.lSGallery:before,\n.lSSlideOuter .lSPager.lSGallery:after {\n  content: \" \";\n  display: table; }\n\n.lSSlideOuter .lSPager.lSGallery:after {\n  clear: both; }\n\n/* End of Gallery*/\n/* slider actions */\n.lSAction > a {\n  width: 32px;\n  display: block;\n  top: 50%;\n  height: 32px;\n  background-image: url(\"/assets/controls.png\");\n  cursor: pointer;\n  position: absolute;\n  z-index: 99;\n  margin-top: -16px;\n  opacity: 0.5;\n  -webkit-transition: opacity 0.35s linear 0s;\n  transition: opacity 0.35s linear 0s; }\n\n.lSAction > a:hover {\n  opacity: 1; }\n\n.lSAction > .lSPrev {\n  background-position: 0 0;\n  left: 10px; }\n\n.lSAction > .lSNext {\n  background-position: -32px 0;\n  right: 10px; }\n\n.lSAction > a.disabled {\n  pointer-events: none; }\n\n.cS-hidden {\n  height: 1px;\n  opacity: 0;\n  filter: alpha(opacity=0);\n  overflow: hidden; }\n\n/* vertical */\n.lSSlideOuter.vertical {\n  position: relative; }\n\n.lSSlideOuter.vertical.noPager {\n  padding-right: 0px !important; }\n\n.lSSlideOuter.vertical .lSGallery {\n  position: absolute !important;\n  right: 0;\n  top: 0; }\n\n.lSSlideOuter.vertical .lightSlider > * {\n  width: 100% !important;\n  max-width: none !important; }\n\n/* vertical controlls */\n.lSSlideOuter.vertical .lSAction > a {\n  left: 50%;\n  margin-left: -14px;\n  margin-top: 0; }\n\n.lSSlideOuter.vertical .lSAction > .lSNext {\n  background-position: 31px -31px;\n  bottom: 10px;\n  top: auto; }\n\n.lSSlideOuter.vertical .lSAction > .lSPrev {\n  background-position: 0 -31px;\n  bottom: auto;\n  top: 10px; }\n\n/* vertical */\n/* Rtl */\n.lSSlideOuter.lSrtl {\n  direction: rtl; }\n\n.lSSlideOuter .lightSlider,\n.lSSlideOuter .lSPager {\n  padding-left: 0;\n  list-style: none outside none; }\n\n.lSSlideOuter.lSrtl .lightSlider,\n.lSSlideOuter.lSrtl .lSPager {\n  padding-right: 0; }\n\n.lSSlideOuter .lightSlider > *,\n.lSSlideOuter .lSGallery li {\n  float: left; }\n\n.lSSlideOuter.lSrtl .lightSlider > *,\n.lSSlideOuter.lSrtl .lSGallery li {\n  float: right !important; }\n\n/* Rtl */\n@-webkit-keyframes rightEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: -15px; }\n  100% {\n    left: 0; } }\n\n@keyframes rightEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: -15px; }\n  100% {\n    left: 0; } }\n\n@-webkit-keyframes topEnd {\n  0% {\n    top: 0; }\n  50% {\n    top: -15px; }\n  100% {\n    top: 0; } }\n\n@keyframes topEnd {\n  0% {\n    top: 0; }\n  50% {\n    top: -15px; }\n  100% {\n    top: 0; } }\n\n@-webkit-keyframes leftEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: 15px; }\n  100% {\n    left: 0; } }\n\n@keyframes leftEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: 15px; }\n  100% {\n    left: 0; } }\n\n@-webkit-keyframes bottomEnd {\n  0% {\n    bottom: 0; }\n  50% {\n    bottom: -15px; }\n  100% {\n    bottom: 0; } }\n\n@keyframes bottomEnd {\n  0% {\n    bottom: 0; }\n  50% {\n    bottom: -15px; }\n  100% {\n    bottom: 0; } }\n\n.lSSlideOuter .rightEnd {\n  -webkit-animation: rightEnd 0.3s;\n  animation: rightEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter .leftEnd {\n  -webkit-animation: leftEnd 0.3s;\n  animation: leftEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.vertical .rightEnd {\n  -webkit-animation: topEnd 0.3s;\n  animation: topEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.vertical .leftEnd {\n  -webkit-animation: bottomEnd 0.3s;\n  animation: bottomEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.lSrtl .rightEnd {\n  -webkit-animation: leftEnd 0.3s;\n  animation: leftEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.lSrtl .leftEnd {\n  -webkit-animation: rightEnd 0.3s;\n  animation: rightEnd 0.3s;\n  position: relative; }\n\n/*/  GRab cursor */\n.lightSlider.lsGrab > * {\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: -o-grab;\n  cursor: -ms-grab;\n  cursor: grab; }\n\n.lightSlider.lsGrabbing > * {\n  cursor: move;\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: -o-grabbing;\n  cursor: -ms-grabbing;\n  cursor: grabbing; }\n\n/* Tiny Carousel */\n/* sliderNew */\n#sliderNew {\n  margin: 0 0 20px; }\n\n#sliderNew .viewport {\n  width: 240px;\n  height: 125px;\n  float: left;\n  overflow: hidden;\n  position: relative; }\n\n#sliderNew .bullets {\n  overflow: hidden;\n  list-style: none;\n  clear: both;\n  margin: 0 0 0 45px; }\n\n#sliderNew .bullets li {\n  float: left; }\n\n#sliderNew .bullet {\n  background-color: #fff;\n  text-decoration: none;\n  text-align: center;\n  padding: 5px;\n  color: #555555;\n  font-size: 14px;\n  font-weight: bold;\n  display: block; }\n\n#sliderNew .bullet.active {\n  color: #fff;\n  background-color: #555555; }\n\n#sliderNew .buttons {\n  background: #C01313;\n  border-radius: 35px;\n  display: block;\n  margin: 30px 10px 0 0;\n  float: left;\n  width: 35px;\n  height: 35px;\n  position: relative;\n  color: #fff;\n  font-weight: bold;\n  text-align: center;\n  line-height: 35px;\n  text-decoration: none;\n  font-size: 22px; }\n\n#sliderNew .next {\n  margin: 30px 0 0 10px; }\n\n#sliderNew .buttons:hover {\n  color: #C01313;\n  background: #fff; }\n\n#sliderNew .disable {\n  visibility: hidden; }\n\n#sliderNew .overview {\n  list-style: none;\n  position: absolute;\n  width: 240px;\n  left: 0;\n  top: 0; }\n\n#sliderNew .overview li {\n  float: left;\n  margin: 0 20px 0 0;\n  padding: 1px;\n  height: 121px;\n  border: 1px solid #dcdcdc;\n  width: 236px; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/styles.scss":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/app/styles.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/*! lightslider - v1.1.3 - 2015-04-14\n* https://github.com/sachinchoolur/lightslider\n* Copyright (c) 2015 Sachin N; Licensed MIT */\n/** /!!! core css Should not edit !!!/**/\n.lSSlideOuter {\n  overflow: hidden;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.lightSlider:before,\n.lightSlider:after {\n  content: \" \";\n  display: table; }\n\n.lightSlider {\n  overflow: hidden;\n  margin: 0; }\n\n.lSSlideWrapper {\n  max-width: 100%;\n  overflow: hidden;\n  position: relative; }\n\n.lSSlideWrapper > .lightSlider:after {\n  clear: both; }\n\n.lSSlideWrapper .lSSlide {\n  -webkit-transform: translate(0px, 0px);\n  -ms-transform: translate(0px, 0px);\n  transform: translate(0px, 0px);\n  -webkit-transition: all 1s;\n  -webkit-transition-property: -webkit-transform, height;\n  -moz-transition-property: -moz-transform, height;\n  transition-property: transform, height;\n  -webkit-transition-duration: inherit !important;\n  transition-duration: inherit !important;\n  -webkit-transition-timing-function: inherit !important;\n  transition-timing-function: inherit !important; }\n\n.lSSlideWrapper .lSFade {\n  position: relative; }\n\n.lSSlideWrapper .lSFade > * {\n  position: absolute !important;\n  top: 0;\n  left: 0;\n  z-index: 9;\n  margin-right: 0;\n  width: 100%; }\n\n.lSSlideWrapper.usingCss .lSFade > * {\n  opacity: 0;\n  -webkit-transition-delay: 0s;\n  transition-delay: 0s;\n  -webkit-transition-duration: inherit !important;\n  transition-duration: inherit !important;\n  -webkit-transition-property: opacity;\n  transition-property: opacity;\n  -webkit-transition-timing-function: inherit !important;\n  transition-timing-function: inherit !important; }\n\n.lSSlideWrapper .lSFade > *.active {\n  z-index: 10; }\n\n.lSSlideWrapper.usingCss .lSFade > *.active {\n  opacity: 1; }\n\n/** /!!! End of core css Should not edit !!!/**/\n/* Pager */\n.lSSlideOuter .lSPager.lSpg {\n  margin: 10px 0 0;\n  padding: 0;\n  text-align: center; }\n\n.lSSlideOuter .lSPager.lSpg > li {\n  cursor: pointer;\n  display: inline-block;\n  padding: 0 5px; }\n\n.lSSlideOuter .lSPager.lSpg > li a {\n  background-color: #222222;\n  border-radius: 30px;\n  display: inline-block;\n  height: 8px;\n  overflow: hidden;\n  text-indent: -999em;\n  width: 8px;\n  position: relative;\n  z-index: 99;\n  -webkit-transition: all 0.5s linear 0s;\n  transition: all 0.5s linear 0s; }\n\n.lSSlideOuter .lSPager.lSpg > li:hover a,\n.lSSlideOuter .lSPager.lSpg > li.active a {\n  background-color: #428bca; }\n\n.lSSlideOuter .media {\n  opacity: 0.8; }\n\n.lSSlideOuter .media.active {\n  opacity: 1; }\n\n/* End of pager */\n/** Gallery */\n.lSSlideOuter .lSPager.lSGallery {\n  list-style: none outside none;\n  padding-left: 0;\n  margin: 0;\n  overflow: hidden;\n  transform: translate3d(0px, 0px, 0px);\n  -moz-transform: translate3d(0px, 0px, 0px);\n  -ms-transform: translate3d(0px, 0px, 0px);\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  -o-transform: translate3d(0px, 0px, 0px);\n  -webkit-transition-property: -webkit-transform;\n  -moz-transition-property: -moz-transform;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.lSSlideOuter .lSPager.lSGallery li {\n  overflow: hidden;\n  -webkit-transition: border-radius 0.12s linear 0s 0.35s linear 0s;\n  transition: border-radius 0.12s linear 0s 0.35s linear 0s; }\n\n.lSSlideOuter .lSPager.lSGallery li.active,\n.lSSlideOuter .lSPager.lSGallery li:hover {\n  border-radius: 5px; }\n\n.lSSlideOuter .lSPager.lSGallery img {\n  display: block;\n  height: auto;\n  max-width: 100%; }\n\n.lSSlideOuter .lSPager.lSGallery:before,\n.lSSlideOuter .lSPager.lSGallery:after {\n  content: \" \";\n  display: table; }\n\n.lSSlideOuter .lSPager.lSGallery:after {\n  clear: both; }\n\n/* End of Gallery*/\n/* slider actions */\n.lSAction > a {\n  width: 32px;\n  display: block;\n  top: 50%;\n  height: 32px;\n  background-image: url(\"/assets/controls.png\");\n  cursor: pointer;\n  position: absolute;\n  z-index: 99;\n  margin-top: -16px;\n  opacity: 0.5;\n  -webkit-transition: opacity 0.35s linear 0s;\n  transition: opacity 0.35s linear 0s; }\n\n.lSAction > a:hover {\n  opacity: 1; }\n\n.lSAction > .lSPrev {\n  background-position: 0 0;\n  left: 10px; }\n\n.lSAction > .lSNext {\n  background-position: -32px 0;\n  right: 10px; }\n\n.lSAction > a.disabled {\n  pointer-events: none; }\n\n.cS-hidden {\n  height: 1px;\n  opacity: 0;\n  filter: alpha(opacity=0);\n  overflow: hidden; }\n\n/* vertical */\n.lSSlideOuter.vertical {\n  position: relative; }\n\n.lSSlideOuter.vertical.noPager {\n  padding-right: 0px !important; }\n\n.lSSlideOuter.vertical .lSGallery {\n  position: absolute !important;\n  right: 0;\n  top: 0; }\n\n.lSSlideOuter.vertical .lightSlider > * {\n  width: 100% !important;\n  max-width: none !important; }\n\n/* vertical controlls */\n.lSSlideOuter.vertical .lSAction > a {\n  left: 50%;\n  margin-left: -14px;\n  margin-top: 0; }\n\n.lSSlideOuter.vertical .lSAction > .lSNext {\n  background-position: 31px -31px;\n  bottom: 10px;\n  top: auto; }\n\n.lSSlideOuter.vertical .lSAction > .lSPrev {\n  background-position: 0 -31px;\n  bottom: auto;\n  top: 10px; }\n\n/* vertical */\n/* Rtl */\n.lSSlideOuter.lSrtl {\n  direction: rtl; }\n\n.lSSlideOuter .lightSlider,\n.lSSlideOuter .lSPager {\n  padding-left: 0;\n  list-style: none outside none; }\n\n.lSSlideOuter.lSrtl .lightSlider,\n.lSSlideOuter.lSrtl .lSPager {\n  padding-right: 0; }\n\n.lSSlideOuter .lightSlider > *,\n.lSSlideOuter .lSGallery li {\n  float: left; }\n\n.lSSlideOuter.lSrtl .lightSlider > *,\n.lSSlideOuter.lSrtl .lSGallery li {\n  float: right !important; }\n\n/* Rtl */\n@-webkit-keyframes rightEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: -15px; }\n  100% {\n    left: 0; } }\n\n@keyframes rightEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: -15px; }\n  100% {\n    left: 0; } }\n\n@-webkit-keyframes topEnd {\n  0% {\n    top: 0; }\n  50% {\n    top: -15px; }\n  100% {\n    top: 0; } }\n\n@keyframes topEnd {\n  0% {\n    top: 0; }\n  50% {\n    top: -15px; }\n  100% {\n    top: 0; } }\n\n@-webkit-keyframes leftEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: 15px; }\n  100% {\n    left: 0; } }\n\n@keyframes leftEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: 15px; }\n  100% {\n    left: 0; } }\n\n@-webkit-keyframes bottomEnd {\n  0% {\n    bottom: 0; }\n  50% {\n    bottom: -15px; }\n  100% {\n    bottom: 0; } }\n\n@keyframes bottomEnd {\n  0% {\n    bottom: 0; }\n  50% {\n    bottom: -15px; }\n  100% {\n    bottom: 0; } }\n\n.lSSlideOuter .rightEnd {\n  -webkit-animation: rightEnd 0.3s;\n  animation: rightEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter .leftEnd {\n  -webkit-animation: leftEnd 0.3s;\n  animation: leftEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.vertical .rightEnd {\n  -webkit-animation: topEnd 0.3s;\n  animation: topEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.vertical .leftEnd {\n  -webkit-animation: bottomEnd 0.3s;\n  animation: bottomEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.lSrtl .rightEnd {\n  -webkit-animation: leftEnd 0.3s;\n  animation: leftEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.lSrtl .leftEnd {\n  -webkit-animation: rightEnd 0.3s;\n  animation: rightEnd 0.3s;\n  position: relative; }\n\n/*/  GRab cursor */\n.lightSlider.lsGrab > * {\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: -o-grab;\n  cursor: -ms-grab;\n  cursor: grab; }\n\n.lightSlider.lsGrabbing > * {\n  cursor: move;\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: -o-grabbing;\n  cursor: -ms-grabbing;\n  cursor: grabbing; }\n\n/* Tiny Carousel */\n/* sliderNew */\n#sliderNew {\n  margin: 0 0 20px; }\n\n#sliderNew .viewport {\n  width: 240px;\n  height: 125px;\n  float: left;\n  overflow: hidden;\n  position: relative; }\n\n#sliderNew .bullets {\n  overflow: hidden;\n  list-style: none;\n  clear: both;\n  margin: 0 0 0 45px; }\n\n#sliderNew .bullets li {\n  float: left; }\n\n#sliderNew .bullet {\n  background-color: #fff;\n  text-decoration: none;\n  text-align: center;\n  padding: 5px;\n  color: #555555;\n  font-size: 14px;\n  font-weight: bold;\n  display: block; }\n\n#sliderNew .bullet.active {\n  color: #fff;\n  background-color: #555555; }\n\n#sliderNew .buttons {\n  background: #C01313;\n  border-radius: 35px;\n  display: block;\n  margin: 30px 10px 0 0;\n  float: left;\n  width: 35px;\n  height: 35px;\n  position: relative;\n  color: #fff;\n  font-weight: bold;\n  text-align: center;\n  line-height: 35px;\n  text-decoration: none;\n  font-size: 22px; }\n\n#sliderNew .next {\n  margin: 30px 0 0 10px; }\n\n#sliderNew .buttons:hover {\n  color: #C01313;\n  background: #fff; }\n\n#sliderNew .disable {\n  visibility: hidden; }\n\n#sliderNew .overview {\n  list-style: none;\n  position: absolute;\n  width: 240px;\n  left: 0;\n  top: 0; }\n\n#sliderNew .overview li {\n  float: left;\n  margin: 0 20px 0 0;\n  padding: 1px;\n  height: 121px;\n  border: 1px solid #dcdcdc;\n  width: 236px; }\n\nce-checkbox {\n  vertical-align: middle; }\n\nce-label {\n  vertical-align: middle;\n  display: inline-block;\n  font-weight: bold;\n  font-family: sans-serif;\n  font-size: 20px;\n  margin-left: 8px; }\n\nce-accordion-heading {\n  background-color: white;\n  border: 1px solid black; }\n\nce-accordion-heading + ce-accordion-heading {\n  border-top: none; }\n\nce-accordion-heading[expanded] {\n  background-color: bisque; }\n\nce-accordion-panel {\n  padding: 20px;\n  background-color: lightgray; }\n\nce-tab {\n  border: 1px solid black;\n  padding: 20px; }\n\nce-tab-panel {\n  padding: 20px;\n  background-color: lightgray; }\n\nce-tab[selected] {\n  background-color: bisque; }\n\nce-tabs:not(:defined),\nce-tab:not(:defined),\nce-tab-panel:not(:defined) {\n  display: block; }\n\nce-toggle-button {\n  background-color: #eee;\n  padding: 3px;\n  cursor: default;\n  user-select: none;\n  border: 1px solid #333;\n  border-radius: 3px;\n  transition: background-color .2s ease; }\n\nce-toggle-button[pressed],\nce-toggle-button:not([disabled]):active {\n  background-color: #999; }\n\nce-toggle-button[disabled] {\n  opacity: 0.35; }\n\nhtml, body {\n  padding: 0;\n  margin: 0; }\n  html *, body * {\n    box-sizing: border-box; }\n\n.ui-demo {\n  display: flex;\n  height: 100%;\n  min-height: 100vh;\n  width: 100%; }\n  .ui-demo .sidenav {\n    flex-basis: 300px;\n    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3); }\n  .ui-demo .content {\n    flex: 1;\n    border-left: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 20px; }\n\nui-router {\n  display: block;\n  width: 100%; }\n\n.ui-elements {\n  padding: 0;\n  margin: 0;\n  list-style-type: none;\n  background: #fafafa; }\n  .ui-elements__item {\n    border-bottom: 1px solid #ccc;\n    transition: box-shadow .3s linear;\n    position: relative;\n    box-sizing: border-box; }\n    .ui-elements__item a {\n      padding: 10px 20px;\n      display: inline-block;\n      width: 100%; }\n    .ui-elements__item:hover {\n      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.3);\n      border-bottom: 1px solid #fff; }\n      .ui-elements__item:hover:before {\n        content: '';\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        height: 100%;\n        width: 5px;\n        background: #2f62a3; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/tree/tree.scss":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/app/tree/tree.scss ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "[ce-tree] {\n  list-style-type: none; }\n\n[aria-expanded=\"true\"] > [ce-tree] {\n  display: block; }\n\n[aria-expanded=\"false\"] > [ce-tree] {\n  display: none; }\n\n.ce-tree-folder > .ce-tree-icon:not([data-type=\"file\"]) {\n  height: 0;\n  width: 0;\n  border-style: solid;\n  border-width: 5px;\n  display: inline-block;\n  border-color: transparent transparent transparent #333;\n  transition: transform 0.1s ease-in-out; }\n\n.ce-tree-folder[aria-expanded=\"true\"] > .ce-tree-icon {\n  transform: rotate(45deg);\n  transform-origin: 25% 50%; }\n\n.ce-tree-file > .ce-tree-icon, .ce-tree-folder.ce-tree-file[aria-expanded=\"true\"] > .ce-tree-icon, .ce-tree-folder.ce-tree-file[aria-expanded=\"false\"] > .ce-tree-icon {\n  display: none; }\n\n.ce-tree-file,\n.ce-tree-folder {\n  position: relative; }\n  .ce-tree-file::before,\n  .ce-tree-folder::before {\n    display: inline-block;\n    content: \"\";\n    position: absolute;\n    top: 9px;\n    left: -14px;\n    width: 13px;\n    height: 0;\n    border-top: 1px dotted #67b2dd;\n    z-index: 1; }\n\n.ce-tree-content {\n  position: relative;\n  padding-left: 16px; }\n  .ce-tree-content::before {\n    display: inline-block;\n    content: \"\";\n    position: absolute;\n    z-index: 1;\n    top: -9px;\n    bottom: 16px;\n    left: 2px;\n    border: 1px dotted #67b2dd;\n    border-width: 0 0 0 1px;\n    height: 100%; }\n\n.ce-tree-content:first-child::before {\n  border: none; }\n\n.ce-tree-content:first-child > .ce-tree-folder:first-child {\n  border: none; }\n\n.source-view [class^=\"col-md-\"] {\n  padding-left: 0;\n  padding-right: 0;\n  border: 1px solid #ccc;\n  margin-bottom: 30px;\n  max-height: calc(100vh - 130px);\n  height: calc(100vh - 130px); }\n  .source-view [class^=\"col-md-\"] pre[class*=\"language-\"] {\n    margin: 0;\n    background: #fff;\n    border: none; }\n\n.source-view [class^=\"col-md-\"] + [class^=\"col-md-\"] {\n  border-left: none; }\n\n.source-tree,\n.source-snippets {\n  overflow: auto; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/app/accordion/ce-accordion.js":
/*!*******************************************!*\
  !*** ./src/app/accordion/ce-accordion.js ***!
  \*******************************************/
/*! exports provided: CeAccordion, CeAccordionHeading, CeAccordionPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeAccordion", function() { return CeAccordion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeAccordionHeading", function() { return CeAccordionHeading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeAccordionPanel", function() { return CeAccordionPanel; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ACCORDION_HEADER = 'ce-accordion-heading';
var ACCORDION_PANEL = 'ce-accordion-panel';
var KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  HOME: 36,
  END: 35
};
var accordionTemplate = document.createElement('template');
accordionTemplate.innerHTML = "\n  <style>\n    :host {\n      display: flex;\n      flex-wrap: wrap;\n      flex-direction: column;\n      align-items: stretch;\n    }\n    ::slotted(.animating) {\n      transition: transform 0.3s ease-in-out;\n    }\n  </style>\n  <slot></slot>\n";
var CeAccordion =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CeAccordion, _HTMLElement);

  function CeAccordion() {
    var _this;

    _classCallCheck(this, CeAccordion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CeAccordion).call(this));

    _this.attachShadow({
      mode: 'open'
    });

    _this.shadowRoot.appendChild(accordionTemplate.content.cloneNode(true));

    return _this;
  }

  _createClass(CeAccordion, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.addEventListener('change', this._onChange);
      this.addEventListener('keydown', this._onKeyDown);
      Promise.all([customElements.whenDefined(ACCORDION_HEADER), customElements.whenDefined(ACCORDION_PANEL)]).then(function (_) {
        var headings = _this2._allHeadings();

        headings.forEach(function (heading) {
          heading.setAttribute('tabindex', -1);

          var panel = _this2._panelForHeading(heading);

          heading.setAttribute('aria-controls', panel.id);
          panel.setAttribute('aria-labelledby', heading.id);
        });
        headings[0].setAttribute('tabindex', 0);
        headings.forEach(function (heading) {
          var panel = _this2._panelForHeading(heading);

          if (!heading.expanded) {
            _this2._collapseHeading(heading);

            _this2._collapsePanel(panel);
          } else {
            _this2._expandHeading(heading);

            _this2._expandPanel(panel);
          }
        });
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.removeEventListener('change', this._onChange);
      this.removeEventListener('keydown', this._onKeyDown);
    }
  }, {
    key: "_isHeading",
    value: function _isHeading(elem) {
      return elem.tagName.toLowerCase() === ACCORDION_HEADER;
    }
  }, {
    key: "_onChange",
    value: function _onChange(event) {
      this._animatePanelForHeading(event.target, event.detail.isExpandedNow);
    }
  }, {
    key: "_animatePanelForHeading",
    value: function _animatePanelForHeading(heading, expand) {
      var _this3 = this;

      if (this.classList.contains('animating')) return;

      var panel = this._panelForHeading(heading);

      if (expand) {
        this._expandPanel(panel);

        this._animateIn(panel);
      } else {
        this._animateOut(panel).then(function (_) {
          return _this3._collapsePanel(panel);
        });
      }
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      var currentHeading = event.target;
      if (!this._isHeading(currentHeading)) return;
      if (event.altKey) return;
      var newHeading;

      switch (event.keyCode) {
        case KEYCODE.LEFT:
        case KEYCODE.UP:
          newHeading = this._prevHeading();
          break;

        case KEYCODE.RIGHT:
        case KEYCODE.DOWN:
          newHeading = this._nextHeading();
          break;

        case KEYCODE.HOME:
          newHeading = this._firstHeading();
          break;

        case KEYCODE.END:
          newHeading = this._lastHeading();
          break;

        default:
          return;
      }

      event.preventDefault();
      currentHeading.setAttribute('tabindex', -1);
      newHeading.setAttribute('tabindex', 0);
      newHeading.focus();
    }
  }, {
    key: "_allPanels",
    value: function _allPanels() {
      return Array.from(this.querySelectorAll(ACCORDION_PANEL));
    }
  }, {
    key: "_allHeadings",
    value: function _allHeadings() {
      return Array.from(this.querySelectorAll(ACCORDION_HEADER));
    }
  }, {
    key: "_panelForHeading",
    value: function _panelForHeading(heading) {
      var next = heading.nextElementSibling;

      if (next.tagName.toLowerCase() !== ACCORDION_PANEL) {
        console.error('Sibling element to a heading need to be a panel.');
        return;
      }

      return next;
    }
  }, {
    key: "_prevHeading",
    value: function _prevHeading() {
      var headings = this._allHeadings();

      var newIdx = headings.findIndex(function (headings) {
        return headings === document.activeElement;
      }) - 1;
      return headings[(newIdx + headings.length) % headings.length];
    }
  }, {
    key: "_nextHeading",
    value: function _nextHeading() {
      var headings = this._allHeadings();

      var newIdx = headings.findIndex(function (heading) {
        return heading === document.activeElement;
      }) + 1;
      return headings[newIdx % headings.length];
    }
  }, {
    key: "_firstHeading",
    value: function _firstHeading() {
      var headings = this._allHeadings();

      return headings[0];
    }
  }, {
    key: "_lastHeading",
    value: function _lastHeading() {
      var headings = this._allHeadings();

      return headings[headings.length - 1];
    }
  }, {
    key: "_expandPanel",
    value: function _expandPanel(panel) {
      panel.expanded = true;
    }
  }, {
    key: "_collapsePanel",
    value: function _collapsePanel(panel) {
      panel.expanded = false;
    }
  }, {
    key: "_expandHeading",
    value: function _expandHeading(heading) {
      heading.expanded = true;
    }
  }, {
    key: "_collapseHeading",
    value: function _collapseHeading(heading) {
      heading.expanded = false;
    }
  }, {
    key: "_animateIn",
    value: function _animateIn(panel) {
      var height = panel.getBoundingClientRect().height;
      return this._animate(panel, -height, 0);
    }
  }, {
    key: "_animateOut",
    value: function _animateOut(panel) {
      var height = panel.getBoundingClientRect().height;
      return this._animate(panel, 0, -height);
    }
  }, {
    key: "_animate",
    value: function _animate(panel, startOffset, endOffset) {
      var _this4 = this;

      if (startOffset === endOffset) return Promise.resolve();
      this.classList.add('animating');
      var children = Array.from(this.children);
      var idx = children.indexOf(panel);
      var animatedChildren = children.slice(idx);
      this.style.overflow = 'hidden';
      children.forEach(function (child) {
        child.style.position = 'relative';
        child.style.zIndex = 2;
      });
      animatedChildren.forEach(function (child) {
        child.style.position = 'relative';
        child.style.zIndex = 1;
        child.style.transform = "translateY(".concat(startOffset, "px)");
      });
      return requestAnimationFramePromise().then(function (_) {
        return requestAnimationFramePromise();
      }).then(function (_) {
        animatedChildren.forEach(function (child) {
          child.style.transform = "translateY(".concat(endOffset, "px)");
          child.classList.add('animating');
        });
        return transitionEndPromise(panel);
      }).then(function (_) {
        animatedChildren.forEach(function (child) {
          child.style.transform = '';
          child.classList.remove('animating');
        });
        children.forEach(function (child) {
          child.style.position = '';
          child.style.zIndex = '';
        });
        _this4.style.overflow = '';

        _this4.classList.remove('animating');
      });
    }
  }]);

  return CeAccordion;
}(_wrapNativeSuper(HTMLElement));
var headingIdCounter = 0;
var accordionHeadingTemplate = document.createElement('template');
accordionHeadingTemplate.innerHTML = "\n  <style>\n    :host {\n      contain: content;\n    }\n    button {\n      display: block;\n      background-color: initial;\n      border: initial;\n      width: 100%;\n      padding: 10px; \n    }\n  </style>\n  <button><slot></slot></button>\n";
var CeAccordionHeading =
/*#__PURE__*/
function (_HTMLElement2) {
  _inherits(CeAccordionHeading, _HTMLElement2);

  _createClass(CeAccordionHeading, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['expanded'];
    }
  }]);

  function CeAccordionHeading() {
    var _this5;

    _classCallCheck(this, CeAccordionHeading);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(CeAccordionHeading).call(this));
    _this5._onClick = _this5._onClick.bind(_assertThisInitialized(_assertThisInitialized(_this5)));

    _this5.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });

    _this5.shadowRoot.appendChild(accordionHeadingTemplate.content.cloneNode(true));

    _this5._shadowButton = _this5.shadowRoot.querySelector('button');
    return _this5;
  }

  _createClass(CeAccordionHeading, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'heading');
      if (!this.id) this.id = "".concat(ACCORDION_HEADER, "-generated-").concat(headingIdCounter++);

      this._shadowButton.addEventListener('click', this._onClick);

      this._shadowButton.setAttribute('aria-expanded', 'false');
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this._shadowButton.removeEventListener('click', this._onClick);
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name) {
      var value = this.hasAttribute('expanded');

      this._shadowButton.setAttribute('aria-expanded', value);
    }
  }, {
    key: "_onClick",
    value: function _onClick() {
      this.expanded = !this.expanded;
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          isExpandedNow: this.expanded
        },
        bubbles: true
      }));
    }
  }, {
    key: "expanded",
    get: function get() {
      return this.hasAttribute('expanded');
    },
    set: function set(value) {
      value = Boolean(value);
      if (value) this.setAttribute('expanded', '');else this.removeAttribute('expanded');
    }
  }]);

  return CeAccordionHeading;
}(_wrapNativeSuper(HTMLElement));
var accordionPanelTemplate = document.createElement('template');
accordionPanelTemplate.innerHTML = "\n  <style>\n    :host(:not([expanded])) {\n      display: none;\n    }\n  </style>\n  <slot></slot>\n";
var panelIdCounter = 0;
var CeAccordionPanel =
/*#__PURE__*/
function (_HTMLElement3) {
  _inherits(CeAccordionPanel, _HTMLElement3);

  function CeAccordionPanel() {
    var _this6;

    _classCallCheck(this, CeAccordionPanel);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(CeAccordionPanel).call(this));

    _this6.attachShadow({
      mode: 'open'
    });

    _this6.shadowRoot.appendChild(accordionPanelTemplate.content.cloneNode(true));

    return _this6;
  }

  _createClass(CeAccordionPanel, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'region');
      if (!this.id) this.id = "".concat(ACCORDION_PANEL, "-generated-").concat(panelIdCounter++);
    }
  }, {
    key: "expanded",
    get: function get() {
      return this.hasAttribute('expanded');
    },
    set: function set(val) {
      var value = Boolean(val);
      if (value) this.setAttribute('expanded', '');else this.removeAttribute('expanded');
    }
  }]);

  return CeAccordionPanel;
}(_wrapNativeSuper(HTMLElement));

function transitionEndPromise(element) {
  return new Promise(function (resolve) {
    element.addEventListener('transitionend', function f() {
      element.removeEventListener('transitionend', f);
      resolve();
    });
  });
}

function requestAnimationFramePromise() {
  return new Promise(function (resolve) {
    return requestAnimationFrame(resolve);
  });
}

/***/ }),

/***/ "./src/app/button/button.js":
/*!**********************************!*\
  !*** ./src/app/button/button.js ***!
  \**********************************/
/*! exports provided: Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony import */ var _button_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.scss */ "./src/app/button/button.scss");
/* harmony import */ var _button_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_button_scss__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var Button =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(Button, _HTMLElement);

  _createClass(Button, null, [{
    key: "is",
    get: function get() {
      return 'ce-button';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return ['disabled', 'tabindex', 'autofocus'];
    }
  }]);

  function Button() {
    var _this;

    _classCallCheck(this, Button);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this));
    _this.innerHTML = _this.template();
    return _this;
  }

  _createClass(Button, [{
    key: "template",
    value: function template() {
      return "\n      <style>".concat(_button_scss__WEBPACK_IMPORTED_MODULE_0___default.a, "</style>\n      <div class=\"vaadin-button-container\">\n        <div part=\"prefix\">\n          <slot name=\"prefix\"></slot>\n        </div>\n        <div part=\"label\">\n          <slot></slot>\n        </div>\n        <div part=\"suffix\">\n          <slot name=\"suffix\"></slot>\n        </div>\n      </div>\n      <button id=\"button\" type=\"button\">Button</button>");
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      console.log('style: ', _button_scss__WEBPACK_IMPORTED_MODULE_0___default.a);
      this.addEventListener('focusin', function (e) {
        if (e.composedPath()[0] === _this2) {
          _this2._focus(e);
        } else if (e.composedPath().indexOf(_this2.focusElement) !== -1 && !_this2.disabled) {
          _this2._setFocused(true);
        }
      });
      this.addEventListener('focusout', function (e) {
        return _this2._setFocused(false);
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {}
  }]);

  return Button;
}(_wrapNativeSuper(HTMLElement));
customElements.define(Button.is, Button);

/***/ }),

/***/ "./src/app/button/button.scss":
/*!************************************!*\
  !*** ./src/app/button/button.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./button.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/button/button.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./button.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/button/button.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./button.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/button/button.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/checkbox/ce-checkbox.js":
/*!*****************************************!*\
  !*** ./src/app/checkbox/ce-checkbox.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CeCheckbox; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// const styles = require('./ce-checkbox.scss');
var KEYCODE = {
  SPACE: 32
};
var template = document.createElement('template');
template.innerHTML = "\n    <style>\n      :host {\n        display: inline-block;\n        background: url('assets/checkbox/unchecked-checkbox.svg') no-repeat;\n        background-size: contain;\n        width: 24px;\n        height: 24px;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n      :host([checked]) {\n        background: url('assets/checkbox/checked-checkbox.svg') no-repeat;\n        background-size: contain;\n      }\n      :host([disabled]) {\n        background: url('assets/checkbox/unchecked-checkbox-disabled.svg') no-repeat;\n        background-size: contain;\n      }\n      :host([checked][disabled]) {\n        background: url('assets/checkbox/checked-checkbox-disabled.svg') no-repeat;\n        background-size: contain;\n      }      \n    </style>\n  "; // HIDE
// ShadyCSS will rename classes as needed to ensure style scoping.
// ShadyCSS.prepareTemplate(template, 'howto-checkbox');
// /HIDE

var CeCheckbox =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CeCheckbox, _HTMLElement);

  _createClass(CeCheckbox, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['checked', 'disabled'];
    }
  }]);

  function CeCheckbox() {
    var _this;

    _classCallCheck(this, CeCheckbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CeCheckbox).call(this));

    _this.attachShadow({
      mode: 'open'
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    return _this;
  }

  _createClass(CeCheckbox, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'checkbox');
      if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', 0);

      this._upgradeProperty('checked');

      this._upgradeProperty('disabled');

      this.addEventListener('keyup', this._onKeyUp);
      this.addEventListener('click', this._onClick);
    }
  }, {
    key: "_upgradeProperty",
    value: function _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        var value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.removeEventListener('keyup', this._onKeyUp);
      this.removeEventListener('click', this._onClick);
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      var hasValue = newValue !== null;

      switch (name) {
        case 'checked':
          this.setAttribute('aria-checked', hasValue);
          break;

        case 'disabled':
          this.setAttribute('aria-disabled', hasValue);

          if (hasValue) {
            this.removeAttribute('tabindex');
            this.blur();
          } else {
            this.setAttribute('tabindex', '0');
          }

          break;
      }
    }
  }, {
    key: "_onKeyUp",
    value: function _onKeyUp(event) {
      if (event.altKey) return;

      switch (event.keyCode) {
        case KEYCODE.SPACE:
          event.preventDefault();

          this._toggleChecked();

          break;

        default:
          return;
      }
    }
  }, {
    key: "_onClick",
    value: function _onClick(event) {
      this._toggleChecked();
    }
  }, {
    key: "_toggleChecked",
    value: function _toggleChecked() {
      if (this.disabled) return;
      this.checked = !this.checked;
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          checked: this.checked
        },
        bubbles: true
      }));
    }
  }, {
    key: "checked",
    set: function set(value) {
      var isChecked = Boolean(value);
      if (isChecked) this.setAttribute('checked', '');else this.removeAttribute('checked');
    },
    get: function get() {
      return this.hasAttribute('checked');
    }
  }, {
    key: "disabled",
    set: function set(value) {
      var isDisabled = Boolean(value);
      if (isDisabled) this.setAttribute('disabled', '');else this.removeAttribute('disabled');
    },
    get: function get() {
      return this.hasAttribute('disabled');
    }
  }]);

  return CeCheckbox;
}(_wrapNativeSuper(HTMLElement));



/***/ }),

/***/ "./src/app/event/event.js":
/*!********************************!*\
  !*** ./src/app/event/event.js ***!
  \********************************/
/*! exports provided: UiEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiEvent", function() { return UiEvent; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var UiEvent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(UiEvent, _HTMLElement);

  function UiEvent() {
    var _this;

    _classCallCheck(this, UiEvent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UiEvent).call(this));
    _this.name = 'Rajkeshwar';
    _this.city = 'Hyderabad';
    requestAnimationFrame(function (_) {
      _this.innerHTML = _this._render();
      console.log('Constructor gets called');

      _this._addEventListeners();
    });
    return _this;
  }

  _createClass(UiEvent, [{
    key: "_render",
    value: function _render() {
      return "\n      <div class=\"parent\">\n        <button @click=\"showName\">Show Name</button>\n        <button @click=\"showName\">Event, Name</button>\n        <span>".concat(this.name, "</span>\n        <br>\n        <button @click=\"showCity\">Show City</button>\n        <h3>").concat(this.city, "</h3>\n      </div>\n    ");
    }
  }, {
    key: "showName",
    value: function showName(evt) {
      console.log('showName: ', evt);
      this.name = evt.target;
    }
  }, {
    key: "showCity",
    value: function showCity(evt) {
      console.log('showCity: ', evt.target);
      this.city = evt.target;
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this2 = this;

      console.log('event listeners called');
      this.querySelectorAll('*').forEach(function (el) {
        Array.from(el.attributes).filter(function (attr) {
          return /^@/.test(attr.name);
        }).forEach(function (attr) {
          var targetFn = eval(_this2[attr.value]);
          var eventName = attr.name.replace(/^@/, '');
          console.log('eventName: ', eventName, targetFn);
          el.addEventListener(eventName, function (evt) {
            targetFn.apply(el, [evt]);
          });
        });
      });
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      console.log(attr.name, attr.value);
      var functionAndParams = /^([a-zA-Z]+)\((.*)\)/.exec(attr.value);
      var eventName = attr.name.replace(/^@/, '');
      var targetFn = eval(this[functionAndParams[1]]);
      var params = functionAndParams[2].split(/,/);
      console.log('hello.....', eventName, targetFn, params);
      el.addEventListener(eventName, function (evt) {
        console.log('Running change detection');

        if (params[0] === '$event') {
          targetFn.apply(el, [evt].concat(_toConsumableArray(params)));
        } else {
          targetFn.apply(el, [1, 2]);
        }
      });
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {// console.log('UiRouter rocks now');
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {// console.log('attachedCallback called');
    }
  }]);

  return UiEvent;
}(_wrapNativeSuper(HTMLElement));
window.customElements.define('ui-event', UiEvent);

/***/ }),

/***/ "./src/app/links.js":
/*!**************************!*\
  !*** ./src/app/links.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * @Author: Rajkeshwar Prasad(rajkeshwar.pd@gmail.com) 
 * @Date: 2019-02-23 23:30:11 
 * @Last Modified by: Rajkeshwar Prasad
 * @Last Modified time: 2019-03-02 19:29:42
 */
window.onload = bindLinks;

function bindLinks() {
  var links = document.querySelectorAll('[href]');
  links.forEach(function (link) {
    return link.addEventListener('click', hijackLinks);
  });
}

function hijackLinks(evt) {
  evt.preventDefault();
  var page = evt.target.getAttribute('href');

  _loadView(page);
}

function _loadView(pageUrl) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function (evt) {
    var newDoc = evt.target.response;
    var routerSlot = document.querySelector('ui-router');
    routerSlot.innerHTML = newDoc;
  };

  xhr.responseType = 'text';
  xhr.open('GET', "app/".concat(pageUrl, "/demo.html"));
  xhr.send();
}

/***/ }),

/***/ "./src/app/radiogroup/ce-radiogroup.js":
/*!*********************************************!*\
  !*** ./src/app/radiogroup/ce-radiogroup.js ***!
  \*********************************************/
/*! exports provided: CeRadioButton, CeRadioGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeRadioButton", function() { return CeRadioButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeRadioGroup", function() { return CeRadioGroup; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38,
  HOME: 36,
  END: 35
};
var radioButtonTemplate = document.createElement('template');
radioButtonTemplate.innerHTML = "\n  <style>\n    :host {\n      display: inline-block;\n      position: relative;\n      cursor: default;\n    }\n  \n    :host(:focus) {\n      outline: 0;\n    }\n  \n    :host(:focus)::before {\n      box-shadow: 0 0 1px 2px #5B9DD9;\n    }\n  \n    :host::before {\n      content: '';\n      display: block;\n      width: 10px;\n      height: 10px;\n      border: 1px solid black;\n      position: absolute;\n      left: -18px;\n      top: 3px;\n      border-radius: 50%;\n    }\n  \n    :host([aria-checked=\"true\"])::before {\n      background: red;\n    }\n  </style>\n  <slot></slot>\n";
var CeRadioButton =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CeRadioButton, _HTMLElement);

  function CeRadioButton() {
    var _this;

    _classCallCheck(this, CeRadioButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CeRadioButton).call(this));

    _this.attachShadow({
      mode: 'open'
    });

    _this.shadowRoot.appendChild(radioButtonTemplate.content.cloneNode(true));

    return _this;
  }

  _createClass(CeRadioButton, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'radio');
      if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', -1);
    }
  }]);

  return CeRadioButton;
}(_wrapNativeSuper(HTMLElement));
var radioGroupTemplate = document.createElement('template');
radioGroupTemplate.innerHTML = "\n  <style>\n    :host {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      padding-left: 20px;\n    }\n  </style>\n  <slot></slot>\n";
var CeRadioGroup =
/*#__PURE__*/
function (_HTMLElement2) {
  _inherits(CeRadioGroup, _HTMLElement2);

  function CeRadioGroup() {
    var _this2;

    _classCallCheck(this, CeRadioGroup);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(CeRadioGroup).call(this));

    _this2.attachShadow({
      mode: 'open'
    });

    _this2.shadowRoot.appendChild(radioGroupTemplate.content.cloneNode(true));

    return _this2;
  }

  _createClass(CeRadioGroup, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'radiogroup');
      var firstCheckedButton = this.checkedRadioButton;

      if (firstCheckedButton) {
        this._uncheckAll();

        this._checkNode(firstCheckedButton);
      } else {
        var hasRoleRadio = this.querySelector('[role="radio"]');
        if (hasRoleRadio) hasRoleRadio.setAttribute('tabindex', 0);
      }

      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.removeEventListener('keydown', this._onKeyDown);
      this.removeEventListener('click', this._onClick);
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(e) {
      switch (e.keyCode) {
        case KEYCODE.UP:
        case KEYCODE.LEFT:
          e.preventDefault();

          this._setCheckedToPrevButton();

          break;

        case KEYCODE.DOWN:
        case KEYCODE.RIGHT:
          e.preventDefault();

          this._setCheckedToNextButton();

          break;

        case KEYCODE.HOME:
          e.preventDefault();

          this._setChecked(this.firstRadioButton);

          break;

        case KEYCODE.END:
          e.preventDefault();

          this._setChecked(this.lastRadioButton);

          break;

        case KEYCODE.SPACE:
          e.preventDefault();
          if (e.target.tagName.toLowerCase() === 'howto-radio-button') this._setChecked(e.target);
          break;

        default:
          break;
      }
    }
  }, {
    key: "_prevRadioButton",
    value: function _prevRadioButton(node) {
      var prev = node.previousElementSibling;

      while (prev) {
        if (prev.getAttribute('role') === 'radio') {
          return prev;
        }

        prev = prev.previousElementSibling;
      }

      return null;
    }
  }, {
    key: "_nextRadioButton",
    value: function _nextRadioButton(node) {
      var next = node.nextElementSibling;

      while (next) {
        if (next.getAttribute('role') === 'radio') {
          return next;
        }

        next = next.nextElementSibling;
      }

      return null;
    }
  }, {
    key: "_setCheckedToPrevButton",
    value: function _setCheckedToPrevButton() {
      var checkedButton = this.checkedRadioButton || this.firstRadioButton;

      if (checkedButton === this.firstRadioButton) {
        this._setChecked(this.lastRadioButton);
      } else {
        this._setChecked(this._prevRadioButton(checkedButton));
      }
    }
  }, {
    key: "_setCheckedToNextButton",
    value: function _setCheckedToNextButton() {
      var checkedButton = this.checkedRadioButton || this.firstRadioButton;

      if (checkedButton === this.lastRadioButton) {
        this._setChecked(this.firstRadioButton);
      } else {
        this._setChecked(this._nextRadioButton(checkedButton));
      }
    }
  }, {
    key: "_setChecked",
    value: function _setChecked(node) {
      this._uncheckAll();

      this._checkNode(node);

      this._focusNode(node);
    }
  }, {
    key: "_uncheckAll",
    value: function _uncheckAll() {
      var radioButtons = this.querySelectorAll('[role="radio"]');

      for (var i = 0; i < radioButtons.length; i++) {
        var btn = radioButtons[i];
        btn.setAttribute('aria-checked', 'false');
        btn.tabIndex = -1;
      }
    }
  }, {
    key: "_checkNode",
    value: function _checkNode(node) {
      node.setAttribute('aria-checked', 'true');
      node.tabIndex = 0;
    }
  }, {
    key: "_focusNode",
    value: function _focusNode(node) {
      node.focus();
    }
  }, {
    key: "_onClick",
    value: function _onClick(e) {
      if (e.target.getAttribute('role') === 'radio') {
        this._setChecked(e.target);
      }
    }
  }, {
    key: "checkedRadioButton",
    get: function get() {
      return this.querySelector('[aria-checked="true"]');
    }
  }, {
    key: "firstRadioButton",
    get: function get() {
      return this.querySelector('[role="radio"]:first-of-type');
    }
  }, {
    key: "lastRadioButton",
    get: function get() {
      return this.querySelector('[role="radio"]:last-of-type');
    }
  }]);

  return CeRadioGroup;
}(_wrapNativeSuper(HTMLElement));

/***/ }),

/***/ "./src/app/slider/ce-slider.js":
/*!*************************************!*\
  !*** ./src/app/slider/ce-slider.js ***!
  \*************************************/
/*! exports provided: CeSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeSlider", function() { return CeSlider; });
/* harmony import */ var _slider_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.scss */ "./src/app/slider/slider.scss");
/* harmony import */ var _slider_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slider_scss__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var CeSlider =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CeSlider, _HTMLElement);

  _createClass(CeSlider, null, [{
    key: "is",
    get: function get() {
      return 'ce-slider';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return ['disabled'];
    }
  }]);

  function CeSlider() {
    var _this;

    _classCallCheck(this, CeSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CeSlider).call(this));
    _this.slideCurrent = 0;
    _this.slidesTotal = 0;
    _this.intervalActive = false;
    _this.options = {
      start: 0,
      axis: "x",
      buttons: true,
      bullets: true,
      interval: true,
      intervalTime: 3000,
      animation: true,
      animationTime: 300,
      infinite: true
    };
    _this.innerHTML = "\n      <style>".concat(_slider_scss__WEBPACK_IMPORTED_MODULE_0___default.a, "</style>\n      <div id=\"sliderNew\">\n        <a class=\"buttons prev\" href=\"#\">&#60;</a>\n        <div class=\"viewport\">\n          <ul class=\"overview\">\n            <li><img src=\"assets/images/picture1.jpg\" /></li>\n            <li><img src=\"assets/images/picture2.jpg\" /></li>\n            <li><img src=\"assets/images/picture3.jpg\" /></li>\n            <li><img src=\"assets/images/picture4.jpg\" /></li>\n            <li><img src=\"assets/images/picture5.jpg\" /></li>\n            <li><img src=\"assets/images/picture6.jpg\" /></li>\n          </ul>\n        </div>\n        <a class=\"buttons next\" href=\"#\">&#62;</a>\n        <ul class=\"bullets\">\n          <li><a href=\"#\" class=\"bullet active\" data-slide=\"0\">1</a></li>\n          <li><a href=\"#\" class=\"bullet\" data-slide=\"1\">2</a></li>\n          <li><a href=\"#\" class=\"bullet\" data-slide=\"2\">3</a></li>\n          <li><a href=\"#\" class=\"bullet\" data-slide=\"3\">4</a></li>\n          <li><a href=\"#\" class=\"bullet\" data-slide=\"4\">5</a></li>\n          <li><a href=\"#\" class=\"bullet\" data-slide=\"5\">6</a></li>\n        </ul>\n      </div>\n    ");
    return _this;
  }

  _createClass(CeSlider, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.$container = $('#sliderNew');
      this.$viewport = this.$container.find(".viewport:first");
      this.$overview = this.$container.find(".overview:first");
      this.$next = this.$container.find(".next:first");
      this.$prev = this.$container.find(".prev:first");
      this.$bullets = this.$container.find(".bullet");
      this.$slides = null;
      this.viewportSize = 0;
      this.contentStyle = {};
      this.slidesVisible = 0;
      this.slideSize = 0;
      this.slideIndex = 0;
      this.isHorizontal = true;
      this.sizeLabel = this.isHorizontal ? "Width" : "Height";
      this.posiLabel = this.isHorizontal ? "left" : "top";
      this.intervalTimer = null;

      this._initialize();
    }
  }, {
    key: "_initialize",
    value: function _initialize() {
      this._update();

      this._move(this.slideCurrent);

      this._setEvents();
    }
  }, {
    key: "_update",
    value: function _update() {
      this.$overview.find(".mirrored").remove();
      this.$slides = this.$overview.children();
      var viewportSize = this.$viewport[0]["offset" + this.sizeLabel];
      this.slideSize = this.$slides.first()["outer" + this.sizeLabel](true);
      this.slidesTotal = this.$slides.length;
      this.slideCurrent = this.options.start || 0;
      var slidesVisible = Math.ceil(viewportSize / this.slideSize);
      this.$overview.append(this.$slides.slice(0, slidesVisible).clone().addClass("mirrored"));
      this.$overview.css(this.sizeLabel.toLowerCase(), this.slideSize * (this.slidesTotal + slidesVisible));

      this._setButtons();
    }
  }, {
    key: "_move",
    value: function _move(index) {
      var _this2 = this;

      var slideIndex = isNaN(index) ? this.slideCurrent : index;
      this.slideCurrent = slideIndex % this.slidesTotal;

      if (slideIndex < 0) {
        this.slideCurrent = slideIndex = this.slidesTotal - 1;
        this.$overview.css(this.posiLabel, -this.slidesTotal * this.slideSize);
      }

      if (slideIndex > this.slidesTotal) {
        this.slideCurrent = slideIndex = 1;
        this.$overview.css(this.posiLabel, 0);
      }

      this.contentStyle[this.posiLabel] = -slideIndex * this.slideSize;
      this.$overview.animate(this.contentStyle, {
        queue: false,
        duration: 1000,
        always: function always() {
          _this2.$container.trigger("move", [_this2.$slides[_this2.slideCurrent], _this2.slideCurrent]);
        }
      });

      this._setButtons();

      this._start();
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {
      var _this3 = this;

      if (this.options.buttons) {
        this.$prev.click(function (_) {
          _this3._move(--_this3.slideIndex);

          return false;
        });
        this.$next.click(function (_) {
          _this3._move(++_this3.slideIndex);

          return false;
        });
      }

      $(window).resize(this._update);

      if (this.options.bullets) {
        var __self = this;

        this.$container.on("click", ".bullet", function () {
          console.log('attribute: ', $(this).attr("data-slide"));

          __self._move(__self.slideIndex = +$(this).attr("data-slide"));

          return false;
        });
      }
    }
  }, {
    key: "_start",
    value: function _start() {
      var _this4 = this;

      if (this.options.interval) {
        clearTimeout(this.intervalTimer);
        this.intervalActive = true;
        this.intervalTimer = setTimeout(function (_) {
          _this4._move(++_this4.slideIndex);
        }, this.options.intervalTime);
      }
    }
  }, {
    key: "_stop",
    value: function _stop() {
      clearTimeout(this.intervalTimer);
      this.intervalActive = false;
    }
  }, {
    key: "_setButtons",
    value: function _setButtons() {
      if (this.options.buttons && !this.options.infinite) {
        this.$prev.toggleClass("disable", this.slideCurrent <= 0);
        this.$next.toggleClass("disable", this.slideCurrent >= this.slidesTotal - this.slidesVisible);
      }

      if (this.options.bullets) {
        this.$bullets.removeClass("active");
        $(this.$bullets[this.slideCurrent]).addClass("active");
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {}
  }]);

  return CeSlider;
}(_wrapNativeSuper(HTMLElement));
customElements.define(CeSlider.is, CeSlider);

/***/ }),

/***/ "./src/app/slider/slider-defaults.js":
/*!*******************************************!*\
  !*** ./src/app/slider/slider-defaults.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var settings = {
  item: 3,
  autoWidth: false,
  slideMove: 1,
  slideMargin: 10,
  addClass: '',
  mode: 'slide',
  useCSS: true,
  cssEasing: 'ease',
  //'cubic-bezier(0.25, 0, 0.25, 1)',
  easing: 'linear',
  //'for jquery animation',//
  speed: 400,
  //ms'
  auto: false,
  pauseOnHover: false,
  loop: false,
  slideEndAnimation: true,
  pause: 2000,
  keyPress: false,
  controls: true,
  prevHtml: '',
  nextHtml: '',
  rtl: false,
  adaptiveHeight: false,
  vertical: false,
  verticalHeight: 500,
  vThumbWidth: 100,
  thumbItem: 10,
  pager: true,
  gallery: false,
  galleryMargin: 5,
  thumbMargin: 5,
  currentPagerPosition: 'middle',
  enableTouch: true,
  enableDrag: true,
  freeMove: true,
  swipeThreshold: 40,
  responsive: [],

  /* jshint ignore:start */
  onBeforeStart: function onBeforeStart($el) {},
  onSliderLoad: function onSliderLoad($el) {},
  onBeforeSlide: function onBeforeSlide($el, scene) {},
  onAfterSlide: function onAfterSlide($el, scene) {},
  onBeforeNextSlide: function onBeforeNextSlide($el, scene) {},
  onBeforePrevSlide: function onBeforePrevSlide($el, scene) {}
  /* jshint ignore:end */

};
/* harmony default export */ __webpack_exports__["default"] = (settings);

/***/ }),

/***/ "./src/app/slider/slider.js":
/*!**********************************!*\
  !*** ./src/app/slider/slider.js ***!
  \**********************************/
/*! exports provided: ImageSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageSlider", function() { return ImageSlider; });
/* harmony import */ var _slider_defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider-defaults */ "./src/app/slider/slider-defaults.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var ImageSlider =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(ImageSlider, _HTMLElement);

  _createClass(ImageSlider, null, [{
    key: "is",
    get: function get() {
      return 'image-slider';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return ['disabled'];
    }
  }]);

  function ImageSlider() {
    var _this;

    _classCallCheck(this, ImageSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageSlider).call(this)); // this.innerHTML = this.render();

    _this.windowW = window.outerWidth;
    _this.breakpoint = null;
    _this.resposiveObj = null;
    _this.length = 0;
    _this.w = 0;
    _this.on = false;
    _this.elSize = 0;
    _this.$slide = '';
    _this.scene = 0;
    _this.property = _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].vertical === true ? 'height' : 'width';
    _this.gutter = _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].vertical === true ? 'margin-bottom' : 'margin-right';
    _this.slideValue = 0;
    _this.pagerWidth = 0;
    _this.slideWidth = 0;
    _this.thumbWidth = 0;
    _this.interval = null;
    _this.isTouch = 'ontouchstart' in document.documentElement;
    _this.lSSlideOuter = _this.querySelector('.lSSlideOuter');
    _this.lSSlideWrapper = _this.querySelector('.lSSlideWrapper');
    _this.$el = _this.querySelector('#content-slider2');
    _this.lSPager = _this.querySelector('.lSPager'); // this.$children = this.$el.childNodes;

    return _this;
  }

  _createClass(ImageSlider, [{
    key: "render",
    value: function render() {
      return "\n      <div class=\"lSSlideOuter\">\n        <div class=\"lSSlideWrapper usingCss\" style=\"transition-duration: 0ms;\">\n          <ul id=\"content-slider2\" class=\"content-slider lightSlider lSSlide lsGrabbing\"\n            style=\"width: 1620px; height: 162px; padding-bottom: 0%; transform: translate3d(0px, 0px, 0px);\">\n            <li class=\"lslide active\" style=\"width: 260px; margin-right: 10px;\">\n              <h3>1</h3>\n            </li>\n            <li class=\"lslide\" style=\"width: 260px; margin-right: 10px;\">\n              <h3>2</h3>\n            </li>\n            <li class=\"lslide\" style=\"width: 260px; margin-right: 10px;\">\n              <h3>3</h3>\n            </li>\n          </ul>\n          <div class=\"lSAction\"><a class=\"lSPrev\"></a><a class=\"lSNext\"></a></div>\n        </div>\n        <ul class=\"lSPager lSpg\" style=\"margin-top: 5px;\">\n          <li class=\"active\"><a href=\"#\">1</a></li>\n          <li><a href=\"#\">2</a></li>\n          <li><a href=\"#\">3</a></li>\n        </ul>\n      </div>\n    ";
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      $("#content-slider").lightSlider({
        loop: false,
        keyPress: true
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {}
  }, {
    key: "_inlineStyle",
    value: function _inlineStyle() {
      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].mode === 'fade') {
        _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].autoWidth = false;
        _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideEndAnimation = false;
      }

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].auto) {
        _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideEndAnimation = false;
      }

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].autoWidth) {
        _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMove = 1;
        _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].item = 1;
      }

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].loop) {
        _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMove = 1;
        _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].freeMove = false;
      }

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].vertical) {
        this.lSSlideWrapper.classList.add('vertical');
        this.elSize = _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].verticalHeight;
        this.lSSlideWrapper.style.height = "".concat(this.elSize, "px");
      } else {
        this.elSize = this.$el.outerWidth;
      }

      this.$el.childNodes.forEach(function (el) {
        return el.classList.add('lslide');
      });

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].loop === true && _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].mode === 'slide') {// need to handle
      }

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].mode === 'slide') {
        // refresh.calSW();
        this._refreshcalSW(); // refresh.sSW();


        this._refreshsSW();

        if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].loop === true) {
          this.slideValue = this._slideValue();
          this.move($el, slideValue);
        }

        if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].vertical === false) {
          this.setHeight($el, false);
        }
      } else {
        this.setHeight($el, true);
        $el.addClass('lSFade');

        if (!this.doCss()) {
          $children.fadeOut(0);
          $children.eq(scene).fadeIn(0);
        }
      }

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].loop === true && _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].mode === 'slide') {
        $children.eq(scene).addClass('active');
      } else {
        $children.first().addClass('active');
      }
    }
  }, {
    key: "_move",
    value: function _move(ob, v) {
      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].rtl === true) {
        v = -v;
      }

      if (this._doCss()) {
        if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].vertical === true) {
          ob.style.transform = "translate3d(0px, -".concat(v, "px, 0px)");
        } else {
          ob.style.transform = "translate3d(0px, -".concat(v, "px, 0px, 0px)");
        }
      } else {
        if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].vertical === true) {
          ob.css('position', 'relative').animate({
            top: -v + 'px'
          }, _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].speed, _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].easing);
        } else {
          ob.css('position', 'relative').animate({
            left: -v + 'px'
          }, _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].speed, _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].easing);
        }
      }

      var $thumb = $slide.parent().find('.lSPager').find('li');
      this.active($thumb, true);
    }
  }, {
    key: "_slideValue",
    value: function _slideValue() {
      var _sV = 0;

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].autoWidth === false) {
        _sV = this.scene * ((this.slideWidth + _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMargin) * _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMove);
      } else {
        _sV = 0;

        for (var i = 0; i < this.scene; i++) {
          _sV += parseInt(this.$el.childNodes[i].width + _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMargin);
        }
      }

      return _sV;
    }
  }, {
    key: "_refreshsSW",
    value: function _refreshsSW() {
      var _this2 = this;

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].autoWidth === false) {
        // $children.css(property, slideWidth + 'px');
        this.$el.childNodes.forEach(function (el) {
          return el.style[_this2.property] = "".concat(_this2.slideWidth, "px");
        });
      } // $children.css(gutter, settings.slideMargin + 'px');


      this.$el.childNodes.forEach(function (el) {
        return el.style[_this2.gutter] = "".concat(_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMargin, "px");
      });
      w = this._calWidth(false); // $el.css(property, w + 'px');

      this.$el.style[property] = "".concat(w, "px");

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].loop === true && _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].mode === 'slide') {
        if (this.on === false) {
          this.scene = this.$el.querySelector('.clone.left').length;
        }
      }

      if (this._doCss()) {
        this.lSSlideWrapper.classList.add('usingCss');
      }
    }
  }, {
    key: "_refreshcalSW",
    value: function _refreshcalSW() {
      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].autoWidth === false) {
        this.slideWidth = (this.elSize - (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].item * _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMargin - _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMargin)) / _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].item;
      }
    }
  }, {
    key: "_doCss",
    value: function _doCss() {
      var support = function support() {
        var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
        var root = document.documentElement;

        for (var i = 0; i < transition.length; i++) {
          if (transition[i] in root.style) {
            return true;
          }
        }
      };

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].useCSS && support()) {
        return true;
      }

      return false;
    }
  }, {
    key: "_calWidth",
    value: function _calWidth(cln) {
      var ln = cln === true ? $slide.find('.lslide').length : $children.length;

      if (_slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].autoWidth === false) {
        w = ln * (slideWidth + _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMargin);
      } else {
        w = 0;

        for (var i = 0; i < ln; i++) {
          w += parseInt($children.eq(i).width()) + _slider_defaults__WEBPACK_IMPORTED_MODULE_0__["default"].slideMargin;
        }
      }

      return w;
    }
  }]);

  return ImageSlider;
}(_wrapNativeSuper(HTMLElement));
customElements.define(ImageSlider.is, ImageSlider);

/***/ }),

/***/ "./src/app/slider/slider.scss":
/*!************************************!*\
  !*** ./src/app/slider/slider.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./slider.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/slider/slider.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./slider.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/slider/slider.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./slider.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/slider/slider.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/styles.scss":
/*!*****************************!*\
  !*** ./src/app/styles.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js??ref--4-2!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/styles.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js??ref--4-2!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/styles.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js??ref--4-2!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/styles.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/tabs/ce-tab.js":
/*!********************************!*\
  !*** ./src/app/tabs/ce-tab.js ***!
  \********************************/
/*! exports provided: CeTabs, CeTab, CeTabPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeTabs", function() { return CeTabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeTab", function() { return CeTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeTabPanel", function() { return CeTabPanel; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  HOME: 36,
  END: 35
};
var template = document.createElement('template');
template.innerHTML = "\n  <style>\n    :host {\n      display: flex;\n      flex-wrap: wrap;\n    }\n    ::slotted(ce-tab-panel) {\n      flex-basis: 100%;\n    }\n  </style>\n  <slot name=\"tab\"></slot>\n  <slot name=\"panel\"></slot>\n";
var CeTabs =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CeTabs, _HTMLElement);

  function CeTabs() {
    var _this;

    _classCallCheck(this, CeTabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CeTabs).call(this));
    _this._onSlotChange = _this._onSlotChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.attachShadow({
      mode: 'open'
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    _this._tabSlot = _this.shadowRoot.querySelector('slot[name=tab]');
    _this._panelSlot = _this.shadowRoot.querySelector('slot[name=panel]');

    _this._tabSlot.addEventListener('slotchange', _this._onSlotChange);

    _this._panelSlot.addEventListener('slotchange', _this._onSlotChange);

    return _this;
  }

  _createClass(CeTabs, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);
      if (!this.hasAttribute('role')) this.setAttribute('role', 'tablist');
      Promise.all([customElements.whenDefined('ce-tab'), customElements.whenDefined('ce-tab-panel')]).then(function (_) {
        return _this2._linkPanels();
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.removeEventListener('keydown', this._onKeyDown);
      this.removeEventListener('click', this._onClick);
    }
  }, {
    key: "_onSlotChange",
    value: function _onSlotChange() {
      this._linkPanels();
    }
  }, {
    key: "_linkPanels",
    value: function _linkPanels() {
      var tabs = this._allTabs();

      tabs.forEach(function (tab) {
        var panel = tab.nextElementSibling;

        if (panel.tagName.toLowerCase() !== 'ce-tab-panel') {
          console.error("Tab #".concat(tab.id, " is not a sibling of a <ce-tab-panel>"));
          return;
        }

        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', tab.id);
      });
      var selectedTab = tabs.find(function (tab) {
        return tab.selected;
      }) || tabs[0];

      this._selectTab(selectedTab);
    }
  }, {
    key: "_allPanels",
    value: function _allPanels() {
      return Array.from(this.querySelectorAll('ce-tab-panel'));
    }
  }, {
    key: "_allTabs",
    value: function _allTabs() {
      return Array.from(this.querySelectorAll('ce-tab'));
    }
  }, {
    key: "_panelForTab",
    value: function _panelForTab(tab) {
      var panelId = tab.getAttribute('aria-controls');
      return this.querySelector("#".concat(panelId));
    }
  }, {
    key: "_prevTab",
    value: function _prevTab() {
      var tabs = this._allTabs();

      var newIdx = tabs.findIndex(function (tab) {
        return tab.selected;
      }) - 1;
      return tabs[(newIdx + tabs.length) % tabs.length];
    }
  }, {
    key: "_firstTab",
    value: function _firstTab() {
      return this._allTabs()[0];
    }
  }, {
    key: "_lastTab",
    value: function _lastTab() {
      var tabs = this._allTabs();

      return tabs[tabs.length - 1];
    }
  }, {
    key: "_nextTab",
    value: function _nextTab() {
      var tabs = this._allTabs();

      var newIdx = tabs.findIndex(function (tab) {
        return tab.selected;
      }) + 1;
      return tabs[newIdx % tabs.length];
    }
  }, {
    key: "reset",
    value: function reset() {
      var tabs = this._allTabs();

      var panels = this._allPanels();

      tabs.forEach(function (tab) {
        return tab.selected = false;
      });
      panels.forEach(function (panel) {
        return panel.hidden = true;
      });
    }
  }, {
    key: "_selectTab",
    value: function _selectTab(newTab) {
      this.reset();

      var newPanel = this._panelForTab(newTab);

      if (!newPanel) throw new Error("No panel with id ".concat(newPanelId));
      newTab.selected = true;
      newPanel.hidden = false;
      newTab.focus();
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      if (event.target.getAttribute('role') !== 'tab') return;
      if (event.altKey) return;
      var newTab;

      switch (event.keyCode) {
        case KEYCODE.LEFT:
        case KEYCODE.UP:
          newTab = this._prevTab();
          break;

        case KEYCODE.RIGHT:
        case KEYCODE.DOWN:
          newTab = this._nextTab();
          break;

        case KEYCODE.HOME:
          newTab = this._firstTab();
          break;

        case KEYCODE.END:
          newTab = this._lastTab();
          break;

        default:
          return;
      }

      event.preventDefault();

      this._selectTab(newTab);
    }
  }, {
    key: "_onClick",
    value: function _onClick(event) {
      if (event.target.getAttribute('role') !== 'tab') return;

      this._selectTab(event.target);
    }
  }]);

  return CeTabs;
}(_wrapNativeSuper(HTMLElement));
var ceTabCounter = 0;
var CeTab =
/*#__PURE__*/
function (_HTMLElement2) {
  _inherits(CeTab, _HTMLElement2);

  _createClass(CeTab, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['selected'];
    }
  }]);

  function CeTab() {
    _classCallCheck(this, CeTab);

    return _possibleConstructorReturn(this, _getPrototypeOf(CeTab).call(this));
  }

  _createClass(CeTab, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.setAttribute('role', 'tab');
      if (!this.id) this.id = "ce-tab-generated-".concat(ceTabCounter++); // Set a well-defined initial state.

      this.setAttribute('aria-selected', 'false');
      this.setAttribute('tabindex', -1);

      this._upgradeProperty('selected');
    }
  }, {
    key: "_upgradeProperty",
    value: function _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        var value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback() {
      var value = this.hasAttribute('selected');
      this.setAttribute('aria-selected', value);
      this.setAttribute('tabindex', value ? 0 : -1);
    }
  }, {
    key: "selected",
    set: function set(value) {
      value = Boolean(value);
      if (value) this.setAttribute('selected', '');else this.removeAttribute('selected');
    },
    get: function get() {
      return this.hasAttribute('selected');
    }
  }]);

  return CeTab;
}(_wrapNativeSuper(HTMLElement));
var cePanelCounter = 0;
var CeTabPanel =
/*#__PURE__*/
function (_HTMLElement3) {
  _inherits(CeTabPanel, _HTMLElement3);

  function CeTabPanel() {
    _classCallCheck(this, CeTabPanel);

    return _possibleConstructorReturn(this, _getPrototypeOf(CeTabPanel).call(this));
  }

  _createClass(CeTabPanel, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.setAttribute('role', 'tabpanel');
      if (!this.id) this.id = "ce-panel-generated-".concat(cePanelCounter++);
    }
  }]);

  return CeTabPanel;
}(_wrapNativeSuper(HTMLElement));

/***/ }),

/***/ "./src/app/toggle/ce-toggle.js":
/*!*************************************!*\
  !*** ./src/app/toggle/ce-toggle.js ***!
  \*************************************/
/*! exports provided: CeToggleButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeToggleButton", function() { return CeToggleButton; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var KEYCODE = {
  SPACE: 32,
  ENTER: 13
};
var template = document.createElement('template');
template.innerHTML = "\n  <style>\n    :host {\n      display: inline-block;\n    }\n    :host([hidden]) {\n      display: none;\n    }\n  </style>\n  <slot></slot>\n";
var CeToggleButton =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CeToggleButton, _HTMLElement);

  _createClass(CeToggleButton, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['pressed', 'disabled'];
    }
  }]);

  function CeToggleButton() {
    var _this;

    _classCallCheck(this, CeToggleButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CeToggleButton).call(this));

    _this.attachShadow({
      mode: 'open'
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    return _this;
  }

  _createClass(CeToggleButton, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'button');
      if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', 0);
      if (!this.hasAttribute('aria-pressed')) this.setAttribute('aria-pressed', 'false');

      this._upgradeProperty('pressed');

      this._upgradeProperty('disabled');

      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);
    }
  }, {
    key: "_upgradeProperty",
    value: function _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        var value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.removeEventListener('keydown', this._onKeyDown);
      this.removeEventListener('click', this._onClick);
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      var hasValue = newValue !== null;

      switch (name) {
        case 'pressed':
          this.setAttribute('aria-pressed', hasValue);
          break;

        case 'disabled':
          this.setAttribute('aria-disabled', hasValue);

          if (hasValue) {
            this.removeAttribute('tabindex');
            this.blur();
          } else {
            this.setAttribute('tabindex', '0');
          }

          break;
      }
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      if (event.altKey) return;

      switch (event.keyCode) {
        case KEYCODE.SPACE:
        case KEYCODE.ENTER:
          event.preventDefault();

          this._togglePressed();

          break;

        default:
          return;
      }
    }
  }, {
    key: "_onClick",
    value: function _onClick(event) {
      this._togglePressed();
    }
  }, {
    key: "_togglePressed",
    value: function _togglePressed() {
      if (this.disabled) return;
      this.pressed = !this.pressed;
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          pressed: this.pressed
        },
        bubbles: true
      }));
    }
  }, {
    key: "pressed",
    set: function set(value) {
      var isPressed = Boolean(value);
      if (isPressed) this.setAttribute('pressed', '');else this.removeAttribute('pressed');
    },
    get: function get() {
      return this.hasAttribute('pressed');
    }
  }, {
    key: "disabled",
    set: function set(value) {
      var isDisabled = Boolean(value);
      if (isDisabled) this.setAttribute('disabled', '');else this.removeAttribute('disabled');
    },
    get: function get() {
      return this.hasAttribute('disabled');
    }
  }]);

  return CeToggleButton;
}(_wrapNativeSuper(HTMLElement));

/***/ }),

/***/ "./src/app/tooltip/ce-tooltip.js":
/*!***************************************!*\
  !*** ./src/app/tooltip/ce-tooltip.js ***!
  \***************************************/
/*! exports provided: CeTooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CeTooltip", function() { return CeTooltip; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CeTooltip =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CeTooltip, _HTMLElement);

  function CeTooltip() {
    var _this;

    _classCallCheck(this, CeTooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CeTooltip).call(this));
    _this._show = _this._show.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._hide = _this._hide.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(CeTooltip, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'tooltip');
      if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', -1);

      this._hide();

      this._target = document.querySelector('[aria-describedby=' + this.id + ']');
      if (!this._target) return;

      this._target.addEventListener('focus', this._show);

      this._target.addEventListener('blur', this._hide);

      this._target.addEventListener('mouseenter', this._show);

      this._target.addEventListener('mouseleave', this._hide);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      if (!this._target) return;

      this._target.removeEventListener('focus', this._show);

      this._target.removeEventListener('blur', this._hide);

      this._target.removeEventListener('mouseenter', this._show);

      this._target.removeEventListener('mouseleave', this._hide);

      this._target = null;
    }
  }, {
    key: "_show",
    value: function _show() {
      this.hidden = false;
    }
  }, {
    key: "_hide",
    value: function _hide() {
      this.hidden = true;
    }
  }]);

  return CeTooltip;
}(_wrapNativeSuper(HTMLElement));

/***/ }),

/***/ "./src/app/tree/tree-data.js":
/*!***********************************!*\
  !*** ./src/app/tree/tree-data.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var TreeData = {
  "path": "./docs",
  "name": "docs",
  "type": "folder",
  "children": [{
    "path": "./docs/angular",
    "name": "angular",
    "type": "folder",
    "children": [{
      "path": "./docs/angular/broadcaster.md",
      "name": "broadcaster.md",
      "type": "file"
    }, {
      "path": "./docs/angular/debounce.md",
      "name": "debounce.md",
      "type": "file"
    }, {
      "path": "./docs/angular/http-interceptor.md",
      "name": "http-interceptor.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/class.md",
    "name": "class.md",
    "type": "file"
  }, {
    "path": "./docs/css3-components",
    "name": "css3-components",
    "type": "folder",
    "children": [{
      "path": "./docs/css3-components/arrow.md",
      "name": "arrow.md",
      "type": "file"
    }, {
      "path": "./docs/css3-components/box-shadow.md",
      "name": "box-shadow.md",
      "type": "file"
    }, {
      "path": "./docs/css3-components/checkbox.md",
      "name": "checkbox.md",
      "type": "file"
    }, {
      "path": "./docs/css3-components/mat-box-shadow.md",
      "name": "mat-box-shadow.md",
      "type": "file"
    }, {
      "path": "./docs/css3-components/modal.md",
      "name": "modal.md",
      "type": "file"
    }, {
      "path": "./docs/css3-components/range-selector.md",
      "name": "range-selector.md",
      "type": "file"
    }, {
      "path": "./docs/css3-components/responsive-menu.md",
      "name": "responsive-menu.md",
      "type": "file"
    }, {
      "path": "./docs/css3-components/step-progress.md",
      "name": "step-progress.md",
      "type": "file"
    }, {
      "path": "./docs/css3-components/toggle-switch.md",
      "name": "toggle-switch.md",
      "type": "file"
    }, {
      "path": "./docs/css3-components/vertical-notification-bar.md",
      "name": "vertical-notification-bar.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/dom",
    "name": "dom",
    "type": "folder",
    "children": [{
      "path": "./docs/dom/dom-handler.md",
      "name": "dom-handler.md",
      "type": "file"
    }, {
      "path": "./docs/dom/dom-operations.md",
      "name": "dom-operations.md",
      "type": "file"
    }, {
      "path": "./docs/dom/dom-utils.md",
      "name": "dom-utils.md",
      "type": "file"
    }, {
      "path": "./docs/dom/scroll-table-column.md",
      "name": "scroll-table-column.md",
      "type": "file"
    }, {
      "path": "./docs/dom/scrollable-sidebar.md",
      "name": "scrollable-sidebar.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/ds",
    "name": "ds",
    "type": "folder",
    "children": [{
      "path": "./docs/ds/linked-list.md",
      "name": "linked-list.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/file-3.md",
    "name": "file-3.md",
    "type": "file"
  }, {
    "path": "./docs/folder-1",
    "name": "folder-1",
    "type": "folder",
    "children": [{
      "path": "./docs/folder-1/file-1.1.md",
      "name": "file-1.1.md",
      "type": "file"
    }, {
      "path": "./docs/folder-1/file-1.2.md",
      "name": "file-1.2.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/linux",
    "name": "linux",
    "type": "folder",
    "children": [{
      "path": "./docs/linux/ssh.md",
      "name": "ssh.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/misc",
    "name": "misc",
    "type": "folder",
    "children": [{
      "path": "./docs/misc/corporate-proxy.md",
      "name": "corporate-proxy.md",
      "type": "file"
    }, {
      "path": "./docs/misc/git-commands.md",
      "name": "git-commands.md",
      "type": "file"
    }, {
      "path": "./docs/misc/jekyll.md",
      "name": "jekyll.md",
      "type": "file"
    }, {
      "path": "./docs/misc/jira-issue-filter.md",
      "name": "jira-issue-filter.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/mobile",
    "name": "mobile",
    "type": "folder",
    "children": [{
      "path": "./docs/mobile/react-native.md",
      "name": "react-native.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/php",
    "name": "php",
    "type": "folder",
    "children": [{
      "path": "./docs/php/composer.md",
      "name": "composer.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/react-native",
    "name": "react-native",
    "type": "folder",
    "children": [{
      "path": "./docs/react-native/basic.md",
      "name": "basic.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/regex",
    "name": "regex",
    "type": "folder",
    "children": [{
      "path": "./docs/regex/camelcase.md",
      "name": "camelcase.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/rohit.md",
    "name": "rohit.md",
    "type": "file"
  }, {
    "path": "./docs/scss",
    "name": "scss",
    "type": "folder",
    "children": [{
      "path": "./docs/scss/box-shadow.md",
      "name": "box-shadow.md",
      "type": "file"
    }]
  }, {
    "path": "./docs/venkat.md",
    "name": "venkat.md",
    "type": "file"
  }]
};
/* harmony default export */ __webpack_exports__["default"] = (TreeData);

/***/ }),

/***/ "./src/app/tree/tree.js":
/*!******************************!*\
  !*** ./src/app/tree/tree.js ***!
  \******************************/
/*! exports provided: Tree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tree", function() { return Tree; });
/* harmony import */ var _tree_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree.scss */ "./src/app/tree/tree.scss");
/* harmony import */ var _tree_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tree_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tree_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tree-data */ "./src/app/tree/tree-data.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Tree =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(Tree, _HTMLElement);

  _createClass(Tree, null, [{
    key: "is",
    get: function get() {
      return 'ce-tree-view';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return ['disabled'];
    }
  }]);

  function Tree() {
    var _this;

    _classCallCheck(this, Tree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tree).call(this));
    _this.innerHTML = "\n      <style>".concat(_tree_scss__WEBPACK_IMPORTED_MODULE_0___default.a, "</style>\n      ").concat(_this._renderTree([_tree_data__WEBPACK_IMPORTED_MODULE_1__["default"]]), "\n    ");
    return _this;
  }

  _createClass(Tree, [{
    key: "_renderTree",
    value: function _renderTree(data) {
      return this.buildNode(data);
    }
  }, {
    key: "buildNode",
    value: function buildNode(data) {
      var _this2 = this;

      return "\n      <ul class=\"ce-tree-content\" ce-tree=\"\">\n        ".concat(data.reduce(function (t, d) {
        t += "\n            <li ce-folder class=\"ce-tree-folder\" aria-expanded=\"false\">\n              <i class=\"ce-tree-icon\" data-type=\"".concat(d.type, "\"></i>\n              <span class=\"ce-tree-item-name\">").concat(d.name, "</span>\n              ").concat(d.children ? _this2.buildNode(d.children) : '', "\n            </li>\n          ");
        return t;
      }, ''), "\n      </ul>\n    ");
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this3 = this;

      var folders = this.querySelectorAll('[ce-folder]');
      Array.from(folders).forEach(function (el) {
        el.addEventListener('click', function (evt) {
          return _this3.handleClick(evt, el);
        });
      }); // Expand the very first folder

      folders[0].setAttribute('aria-expanded', true);
    }
  }, {
    key: "handleClick",
    value: function handleClick(evt, el) {
      var isExpanded = el.getAttribute('aria-expanded');

      if (isExpanded === 'true') {
        el.setAttribute('aria-expanded', false);
      } else {
        el.setAttribute('aria-expanded', true);
      }

      evt.stopPropagation();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this4 = this;

      var folders = this.querySelectorAll('[ce-folder]');
      Array.from(folders).forEach(function (el) {
        el.removeEventListener('click', function (evt) {
          return _this4.handleClick(evt, el);
        });
      });
    }
  }]);

  return Tree;
}(_wrapNativeSuper(HTMLElement));
customElements.define(Tree.is, Tree);

/***/ }),

/***/ "./src/app/tree/tree.scss":
/*!********************************!*\
  !*** ./src/app/tree/tree.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./tree.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/tree/tree.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./tree.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/tree/tree.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./tree.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/tree/tree.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/ui-router.js":
/*!******************************!*\
  !*** ./src/app/ui-router.js ***!
  \******************************/
/*! exports provided: UiRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiRouter", function() { return UiRouter; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
 * @Author: Rajkeshwar Prasad(rajkeshwar.pd@gmail.com) 
 * @Date: 2019-02-23 23:00:42 
 * @Last Modified by: Rajkeshwar Prasad
 * @Last Modified time: 2019-03-18 19:40:38
 */
var template = document.createElement('template');
template.innerHTML = "\n  <style></style>\n  <slot></slot>\n";
var UiRouter =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(UiRouter, _HTMLElement);

  function UiRouter() {
    var _this;

    _classCallCheck(this, UiRouter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UiRouter).call(this));

    _this.attachShadow({
      mode: 'open'
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    return _this;
  }

  _createClass(UiRouter, [{
    key: "connectedCallback",
    value: function connectedCallback() {// console.log('UiRouter rocks now');
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {// console.log('attachedCallback called');
    }
  }]);

  return UiRouter;
}(_wrapNativeSuper(HTMLElement));
window.customElements.define('xui-router', UiRouter);

/***/ }),

/***/ "./src/assets/es-refresh.js":
/*!**********************************!*\
  !*** ./src/assets/es-refresh.js ***!
  \**********************************/
/*! exports provided: SliderRefresh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderRefresh", function() { return SliderRefresh; });
/* harmony import */ var _es_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./es-settings */ "./src/assets/es-settings.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var settings = _es_settings__WEBPACK_IMPORTED_MODULE_0__["default"];
var SliderRefresh =
/*#__PURE__*/
function () {
  function SliderRefresh($children) {
    _classCallCheck(this, SliderRefresh);

    this.slideValue = 0;
    this.pagerWidth = 0;
    this.slideWidth = 0;
    this.thumbWidth = 0;
    this.w = 0;
    this.$children = $children;
  }

  _createClass(SliderRefresh, [{
    key: "calSW",
    value: function calSW() {
      if (settings.autoWidth === false) {
        this.slideWidth = (this.elSize - (settings.item * settings.slideMargin - settings.slideMargin)) / settings.item;
      }
    }
  }, {
    key: "calWidth",
    value: function calWidth(cln) {
      var ln = cln === true ? this.$slide.find('.lslide').length : this.$children.length;

      if (settings.autoWidth === false) {
        this.w = ln * (this.slideWidth + settings.slideMargin);
      } else {
        this.w = 0;

        for (var i = 0; i < ln; i++) {
          this.w += parseInt(this.$children.eq(i).width()) + settings.slideMargin;
        }
      }

      return this.w;
    }
  }, {
    key: "chbreakpoint",
    value: function chbreakpoint() {
      var windowW = $(window).width();
      this.windowW = windowW;

      if (settings.responsive.length) {
        var item;

        if (settings.autoWidth === false) {
          item = settings.item;
        }

        if (windowW < settings.responsive[0].breakpoint) {
          for (var i = 0; i < settings.responsive.length; i++) {
            if (windowW < settings.responsive[i].breakpoint) {
              breakpoint = settings.responsive[i].breakpoint;
              resposiveObj = settings.responsive[i];
            }
          }
        }

        if (typeof resposiveObj !== 'undefined' && resposiveObj !== null) {
          for (var j in resposiveObj.settings) {
            if (resposiveObj.settings.hasOwnProperty(j)) {
              if (typeof settingsTemp[j] === 'undefined' || settingsTemp[j] === null) {
                settingsTemp[j] = settings[j];
              }

              settings[j] = resposiveObj.settings[j];
            }
          }
        }

        if (!$.isEmptyObject(settingsTemp) && windowW > settings.responsive[0].breakpoint) {
          for (var k in settingsTemp) {
            if (settingsTemp.hasOwnProperty(k)) {
              settings[k] = settingsTemp[k];
            }
          }
        }

        if (settings.autoWidth === false) {
          if (slideValue > 0 && this.slideWidth > 0) {
            if (item !== settings.item) {
              scene = Math.round(slideValue / ((this.slideWidth + settings.slideMargin) * settings.slideMove));
            }
          }
        }
      }
    }
  }]);

  return SliderRefresh;
}();

/***/ }),

/***/ "./src/assets/es-settings.js":
/*!***********************************!*\
  !*** ./src/assets/es-settings.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var defaults = {
  item: 3,
  autoWidth: false,
  slideMove: 1,
  slideMargin: 10,
  addClass: '',
  mode: 'slide',
  useCSS: true,
  cssEasing: 'ease',
  //'cubic-bezier(0.25, 0, 0.25, 1)',
  easing: 'linear',
  //'for jquery animation',//
  speed: 400,
  //ms'
  auto: false,
  pauseOnHover: false,
  loop: false,
  slideEndAnimation: true,
  pause: 2000,
  keyPress: false,
  controls: true,
  prevHtml: '',
  nextHtml: '',
  rtl: false,
  adaptiveHeight: false,
  vertical: false,
  verticalHeight: 500,
  vThumbWidth: 100,
  thumbItem: 10,
  pager: true,
  gallery: false,
  galleryMargin: 5,
  thumbMargin: 5,
  currentPagerPosition: 'middle',
  enableTouch: true,
  enableDrag: true,
  freeMove: true,
  swipeThreshold: 40,
  responsive: [],

  /* jshint ignore:start */
  onBeforeStart: function onBeforeStart($el) {},
  onSliderLoad: function onSliderLoad($el) {},
  onBeforeSlide: function onBeforeSlide($el, scene) {},
  onAfterSlide: function onAfterSlide($el, scene) {},
  onBeforeNextSlide: function onBeforeNextSlide($el, scene) {},
  onBeforePrevSlide: function onBeforePrevSlide($el, scene) {}
  /* jshint ignore:end */

};
/* harmony default export */ __webpack_exports__["default"] = (defaults);

/***/ }),

/***/ "./src/assets/es-slider.js":
/*!*********************************!*\
  !*** ./src/assets/es-slider.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _es_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./es-settings */ "./src/assets/es-settings.js");
/* harmony import */ var _es_refresh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./es-refresh */ "./src/assets/es-refresh.js");



(function ($, undefined) {
  'use strict';

  $.fn.lightSlider = function (options) {
    if (this.length === 0) {
      return this;
    }

    if (this.length > 1) {
      this.each(function () {
        $(this).lightSlider(options);
      });
      return this;
    }

    var plugin = {},
        settings = $.extend(true, {}, _es_settings__WEBPACK_IMPORTED_MODULE_0__["default"], options),
        settingsTemp = {},
        $el = this;
    plugin.$el = this;

    if (settings.mode === 'fade') {
      settings.vertical = false;
    }

    console.log('this', this.children());
    var $children = $el.children(),
        windowW = $(window).width(),
        breakpoint = null,
        resposiveObj = null,
        length = 0,
        w = 0,
        on = false,
        elSize = 0,
        $slide = '',
        scene = 0,
        property = settings.vertical === true ? 'height' : 'width',
        gutter = settings.vertical === true ? 'margin-bottom' : 'margin-right',
        slideValue = 0,
        pagerWidth = 0,
        slideWidth = 0,
        thumbWidth = 0,
        interval = null,
        isTouch = 'ontouchstart' in document.documentElement;
    var refresh = new _es_refresh__WEBPACK_IMPORTED_MODULE_1__["SliderRefresh"]($children);
    plugin = {
      doCss: function doCss() {
        var support = function support() {
          var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
          var root = document.documentElement;

          for (var i = 0; i < transition.length; i++) {
            if (transition[i] in root.style) {
              return true;
            }
          }
        };

        if (settings.useCSS && support()) {
          return true;
        }

        return false;
      },
      keyPress: function keyPress() {
        if (settings.keyPress) {
          $(document).on('keyup.lightslider', function (e) {
            if (!$(':focus').is('input, textarea')) {
              if (e.preventDefault) {
                e.preventDefault();
              } else {
                e.returnValue = false;
              }

              if (e.keyCode === 37) {
                $el.goToPrevSlide();
              } else if (e.keyCode === 39) {
                $el.goToNextSlide();
              }
            }
          });
        }
      },
      controls: function controls() {
        if (settings.controls) {
          $el.after('<div class="lSAction"><a class="lSPrev">' + settings.prevHtml + '</a><a class="lSNext">' + settings.nextHtml + '</a></div>');

          if (!settings.autoWidth) {
            if (length <= settings.item) {
              $slide.find('.lSAction').hide();
            }
          } else {
            if (refresh.calWidth(false) < elSize) {
              $slide.find('.lSAction').hide();
            }
          }

          $slide.find('.lSAction a').on('click', function (e) {
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }

            if ($(this).attr('class') === 'lSPrev') {
              $el.goToPrevSlide();
            } else {
              $el.goToNextSlide();
            }

            return false;
          });
        }
      },
      initialStyle: function initialStyle() {
        var $this = this;

        if (settings.mode === 'fade') {
          settings.autoWidth = false;
          settings.slideEndAnimation = false;
        }

        if (settings.auto) {
          settings.slideEndAnimation = false;
        }

        if (settings.autoWidth) {
          settings.slideMove = 1;
          settings.item = 1;
        }

        if (settings.loop) {
          settings.slideMove = 1;
          settings.freeMove = false;
        }

        settings.onBeforeStart.call(this, $el);
        refresh.chbreakpoint();
        $el.addClass('lightSlider').wrap('<div class="lSSlideOuter ' + settings.addClass + '"><div class="lSSlideWrapper"></div></div>');
        $slide = $el.parent('.lSSlideWrapper');

        if (settings.rtl === true) {
          $slide.parent().addClass('lSrtl');
        }

        if (settings.vertical) {
          $slide.parent().addClass('vertical');
          elSize = settings.verticalHeight;
          $slide.css('height', elSize + 'px');
        } else {
          elSize = $el.outerWidth();
        }

        $children.addClass('lslide');

        if (settings.loop === true && settings.mode === 'slide') {
          refresh.calSW();

          refresh.clone = function () {
            if (refresh.calWidth(true) > elSize) {
              /**/
              var tWr = 0,
                  tI = 0;

              for (var k = 0; k < $children.length; k++) {
                tWr += parseInt($el.find('.lslide').eq(k).width()) + settings.slideMargin;
                tI++;

                if (tWr >= elSize + settings.slideMargin) {
                  break;
                }
              }

              var tItem = settings.autoWidth === true ? tI : settings.item;
              /**/

              if (tItem < $el.find('.clone.left').length) {
                for (var i = 0; i < $el.find('.clone.left').length - tItem; i++) {
                  $children.eq(i).remove();
                }
              }

              if (tItem < $el.find('.clone.right').length) {
                for (var j = $children.length - 1; j > $children.length - 1 - $el.find('.clone.right').length; j--) {
                  scene--;
                  $children.eq(j).remove();
                }
              }
              /**/


              for (var n = $el.find('.clone.right').length; n < tItem; n++) {
                $el.find('.lslide').eq(n).clone().removeClass('lslide').addClass('clone right').appendTo($el);
                scene++;
              }

              for (var m = $el.find('.lslide').length - $el.find('.clone.left').length; m > $el.find('.lslide').length - tItem; m--) {
                $el.find('.lslide').eq(m - 1).clone().removeClass('lslide').addClass('clone left').prependTo($el);
              }

              $children = $el.children();
            } else {
              if ($children.hasClass('clone')) {
                $el.find('.clone').remove();
                $this.move($el, 0);
              }
            }
          };

          refresh.clone();
        }

        refresh.sSW = function () {
          length = $children.length;

          if (settings.rtl === true && settings.vertical === false) {
            gutter = 'margin-left';
          }

          if (settings.autoWidth === false) {
            $children.css(property, slideWidth + 'px');
          }

          $children.css(gutter, settings.slideMargin + 'px');
          w = refresh.calWidth(false);
          $el.css(property, w + 'px');

          if (settings.loop === true && settings.mode === 'slide') {
            if (on === false) {
              scene = $el.find('.clone.left').length;
            }
          }
        };

        refresh.calL = function () {
          $children = $el.children();
          length = $children.length;
        };

        if (this.doCss()) {
          $slide.addClass('usingCss');
        }

        refresh.calL();

        if (settings.mode === 'slide') {
          refresh.calSW();
          refresh.sSW();

          if (settings.loop === true) {
            slideValue = $this.slideValue();
            this.move($el, slideValue);
          }

          if (settings.vertical === false) {
            this.setHeight($el, false);
          }
        } else {
          this.setHeight($el, true);
          $el.addClass('lSFade');

          if (!this.doCss()) {
            $children.fadeOut(0);
            $children.eq(scene).fadeIn(0);
          }
        }

        if (settings.loop === true && settings.mode === 'slide') {
          $children.eq(scene).addClass('active');
        } else {
          $children.first().addClass('active');
        }
      },
      pager: function pager() {
        var $this = this;

        refresh.createPager = function () {
          thumbWidth = (elSize - (settings.thumbItem * settings.thumbMargin - settings.thumbMargin)) / settings.thumbItem;
          var $children = $slide.find('.lslide');
          var length = $slide.find('.lslide').length;
          var i = 0,
              pagers = '',
              v = 0;

          for (i = 0; i < length; i++) {
            if (settings.mode === 'slide') {
              // calculate scene * slide value
              if (!settings.autoWidth) {
                v = i * ((slideWidth + settings.slideMargin) * settings.slideMove);
              } else {
                v += (parseInt($children.eq(i).width()) + settings.slideMargin) * settings.slideMove;
              }
            }

            var thumb = $children.eq(i * settings.slideMove).attr('data-thumb');

            if (settings.gallery === true) {
              pagers += '<li style="width:100%;' + property + ':' + thumbWidth + 'px;' + gutter + ':' + settings.thumbMargin + 'px"><a href="#"><img src="' + thumb + '" /></a></li>';
            } else {
              pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
            }

            if (settings.mode === 'slide') {
              if (v >= w - elSize - settings.slideMargin) {
                i = i + 1;
                var minPgr = 2;

                if (settings.autoWidth) {
                  pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                  minPgr = 1;
                }

                if (i < minPgr) {
                  pagers = null;
                  $slide.parent().addClass('noPager');
                } else {
                  $slide.parent().removeClass('noPager');
                }

                break;
              }
            }
          }

          var $cSouter = $slide.parent();
          $cSouter.find('.lSPager').html(pagers);

          if (settings.gallery === true) {
            if (settings.vertical === true) {
              // set Gallery thumbnail width
              $cSouter.find('.lSPager').css('width', settings.vThumbWidth + 'px');
            }

            pagerWidth = i * (settings.thumbMargin + thumbWidth) + 0.5;
            $cSouter.find('.lSPager').css({
              property: pagerWidth + 'px',
              'transition-duration': settings.speed + 'ms'
            });

            if (settings.vertical === true) {
              $slide.parent().css('padding-right', settings.vThumbWidth + settings.galleryMargin + 'px');
            }

            $cSouter.find('.lSPager').css(property, pagerWidth + 'px');
          }

          var $pager = $cSouter.find('.lSPager').find('li');
          $pager.first().addClass('active');
          $pager.on('click', function () {
            if (settings.loop === true && settings.mode === 'slide') {
              scene = scene + ($pager.index(this) - $cSouter.find('.lSPager').find('li.active').index());
            } else {
              scene = $pager.index(this);
            }

            $el.mode(false);

            if (settings.gallery === true) {
              $this.slideThumb();
            }

            return false;
          });
        };

        if (settings.pager) {
          var cl = 'lSpg';

          if (settings.gallery) {
            cl = 'lSGallery';
          }

          $slide.after('<ul class="lSPager ' + cl + '"></ul>');
          var gMargin = settings.vertical ? 'margin-left' : 'margin-top';
          $slide.parent().find('.lSPager').css(gMargin, settings.galleryMargin + 'px');
          refresh.createPager();
        }

        setTimeout(function () {
          refresh.init();
        }, 0);
      },
      setHeight: function setHeight(ob, fade) {
        var obj = null,
            $this = this;

        if (settings.loop) {
          obj = ob.children('.lslide ').first();
        } else {
          obj = ob.children().first();
        }

        var setCss = function setCss() {
          var tH = obj.outerHeight(),
              tP = 0,
              tHT = tH;

          if (fade) {
            tH = 0;
            tP = tHT * 100 / elSize;
          }

          ob.css({
            'height': tH + 'px',
            'padding-bottom': tP + '%'
          });
        };

        setCss();

        if (obj.find('img').length) {
          if (obj.find('img')[0].complete) {
            setCss();

            if (!interval) {
              $this.auto();
            }
          } else {
            obj.find('img').on('load', function () {
              setTimeout(function () {
                setCss();

                if (!interval) {
                  $this.auto();
                }
              }, 100);
            });
          }
        } else {
          if (!interval) {
            $this.auto();
          }
        }
      },
      active: function active(ob, t) {
        if (this.doCss() && settings.mode === 'fade') {
          $slide.addClass('on');
        }

        var sc = 0;

        if (scene * settings.slideMove < length) {
          ob.removeClass('active');

          if (!this.doCss() && settings.mode === 'fade' && t === false) {
            ob.fadeOut(settings.speed);
          }

          if (t === true) {
            sc = scene;
          } else {
            sc = scene * settings.slideMove;
          } //t === true ? sc = scene : sc = scene * settings.slideMove;


          var l, nl;

          if (t === true) {
            l = ob.length;
            nl = l - 1;

            if (sc + 1 >= l) {
              sc = nl;
            }
          }

          if (settings.loop === true && settings.mode === 'slide') {
            //t === true ? sc = scene - $el.find('.clone.left').length : sc = scene * settings.slideMove;
            if (t === true) {
              sc = scene - $el.find('.clone.left').length;
            } else {
              sc = scene * settings.slideMove;
            }

            if (t === true) {
              l = ob.length;
              nl = l - 1;

              if (sc + 1 === l) {
                sc = nl;
              } else if (sc + 1 > l) {
                sc = 0;
              }
            }
          }

          if (!this.doCss() && settings.mode === 'fade' && t === false) {
            ob.eq(sc).fadeIn(settings.speed);
          }

          ob.eq(sc).addClass('active');
        } else {
          ob.removeClass('active');
          ob.eq(ob.length - 1).addClass('active');

          if (!this.doCss() && settings.mode === 'fade' && t === false) {
            ob.fadeOut(settings.speed);
            ob.eq(sc).fadeIn(settings.speed);
          }
        }
      },
      move: function move(ob, v) {
        if (settings.rtl === true) {
          v = -v;
        }

        if (this.doCss()) {
          if (settings.vertical === true) {
            ob.css({
              'transform': 'translate3d(0px, ' + -v + 'px, 0px)',
              '-webkit-transform': 'translate3d(0px, ' + -v + 'px, 0px)'
            });
          } else {
            ob.css({
              'transform': 'translate3d(' + -v + 'px, 0px, 0px)',
              '-webkit-transform': 'translate3d(' + -v + 'px, 0px, 0px)'
            });
          }
        } else {
          if (settings.vertical === true) {
            ob.css('position', 'relative').animate({
              top: -v + 'px'
            }, settings.speed, settings.easing);
          } else {
            ob.css('position', 'relative').animate({
              left: -v + 'px'
            }, settings.speed, settings.easing);
          }
        }

        var $thumb = $slide.parent().find('.lSPager').find('li');
        this.active($thumb, true);
      },
      fade: function fade() {
        this.active($children, false);
        var $thumb = $slide.parent().find('.lSPager').find('li');
        this.active($thumb, true);
      },
      slide: function slide() {
        var $this = this;

        refresh.calSlide = function () {
          if (w > elSize) {
            slideValue = $this.slideValue();
            $this.active($children, false);

            if (slideValue > w - elSize - settings.slideMargin) {
              slideValue = w - elSize - settings.slideMargin;
            } else if (slideValue < 0) {
              slideValue = 0;
            }

            $this.move($el, slideValue);

            if (settings.loop === true && settings.mode === 'slide') {
              if (scene >= length - $el.find('.clone.left').length / settings.slideMove) {
                $this.resetSlide($el.find('.clone.left').length);
              }

              if (scene === 0) {
                $this.resetSlide($slide.find('.lslide').length);
              }
            }
          }
        };

        refresh.calSlide();
      },
      resetSlide: function resetSlide(s) {
        var $this = this;
        $slide.find('.lSAction a').addClass('disabled');
        setTimeout(function () {
          scene = s;
          $slide.css('transition-duration', '0ms');
          slideValue = $this.slideValue();
          $this.active($children, false);
          plugin.move($el, slideValue);
          setTimeout(function () {
            $slide.css('transition-duration', settings.speed + 'ms');
            $slide.find('.lSAction a').removeClass('disabled');
          }, 50);
        }, settings.speed + 100);
      },
      slideValue: function slideValue() {
        var _sV = 0;

        if (settings.autoWidth === false) {
          _sV = scene * ((slideWidth + settings.slideMargin) * settings.slideMove);
        } else {
          _sV = 0;

          for (var i = 0; i < scene; i++) {
            _sV += parseInt($children.eq(i).width()) + settings.slideMargin;
          }
        }

        return _sV;
      },
      slideThumb: function slideThumb() {
        var position;

        switch (settings.currentPagerPosition) {
          case 'left':
            position = 0;
            break;

          case 'middle':
            position = elSize / 2 - thumbWidth / 2;
            break;

          case 'right':
            position = elSize - thumbWidth;
        }

        var sc = scene - $el.find('.clone.left').length;
        var $pager = $slide.parent().find('.lSPager');

        if (settings.mode === 'slide' && settings.loop === true) {
          if (sc >= $pager.children().length) {
            sc = 0;
          } else if (sc < 0) {
            sc = $pager.children().length;
          }
        }

        var thumbSlide = sc * (thumbWidth + settings.thumbMargin) - position;

        if (thumbSlide + elSize > pagerWidth) {
          thumbSlide = pagerWidth - elSize - settings.thumbMargin;
        }

        if (thumbSlide < 0) {
          thumbSlide = 0;
        }

        this.move($pager, thumbSlide);
      },
      auto: function auto() {
        if (settings.auto) {
          clearInterval(interval);
          interval = setInterval(function () {
            $el.goToNextSlide();
          }, settings.pause);
        }
      },
      pauseOnHover: function pauseOnHover() {
        var $this = this;

        if (settings.auto && settings.pauseOnHover) {
          $slide.on('mouseenter', function () {
            $(this).addClass('ls-hover');
            $el.pause();
            settings.auto = true;
          });
          $slide.on('mouseleave', function () {
            $(this).removeClass('ls-hover');

            if (!$slide.find('.lightSlider').hasClass('lsGrabbing')) {
              $this.auto();
            }
          });
        }
      },
      touchMove: function touchMove(endCoords, startCoords) {
        $slide.css('transition-duration', '0ms');

        if (settings.mode === 'slide') {
          var distance = endCoords - startCoords;
          var swipeVal = slideValue - distance;

          if (swipeVal >= w - elSize - settings.slideMargin) {
            if (settings.freeMove === false) {
              swipeVal = w - elSize - settings.slideMargin;
            } else {
              var swipeValT = w - elSize - settings.slideMargin;
              swipeVal = swipeValT + (swipeVal - swipeValT) / 5;
            }
          } else if (swipeVal < 0) {
            if (settings.freeMove === false) {
              swipeVal = 0;
            } else {
              swipeVal = swipeVal / 5;
            }
          }

          this.move($el, swipeVal);
        }
      },
      touchEnd: function touchEnd(distance) {
        $slide.css('transition-duration', settings.speed + 'ms');

        if (settings.mode === 'slide') {
          var mxVal = false;
          var _next = true;
          slideValue = slideValue - distance;

          if (slideValue > w - elSize - settings.slideMargin) {
            slideValue = w - elSize - settings.slideMargin;

            if (settings.autoWidth === false) {
              mxVal = true;
            }
          } else if (slideValue < 0) {
            slideValue = 0;
          }

          var gC = function gC(next) {
            var ad = 0;

            if (!mxVal) {
              if (next) {
                ad = 1;
              }
            }

            if (!settings.autoWidth) {
              var num = slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove);
              scene = parseInt(num) + ad;

              if (slideValue >= w - elSize - settings.slideMargin) {
                if (num % 1 !== 0) {
                  scene++;
                }
              }
            } else {
              var tW = 0;

              for (var i = 0; i < $children.length; i++) {
                tW += parseInt($children.eq(i).width()) + settings.slideMargin;
                scene = i + ad;

                if (tW >= slideValue) {
                  break;
                }
              }
            }
          };

          if (distance >= settings.swipeThreshold) {
            gC(false);
            _next = false;
          } else if (distance <= -settings.swipeThreshold) {
            gC(true);
            _next = false;
          }

          $el.mode(_next);
          this.slideThumb();
        } else {
          if (distance >= settings.swipeThreshold) {
            $el.goToPrevSlide();
          } else if (distance <= -settings.swipeThreshold) {
            $el.goToNextSlide();
          }
        }
      },
      enableDrag: function enableDrag() {
        var $this = this;

        if (!isTouch) {
          var startCoords = 0,
              endCoords = 0,
              isDraging = false;
          $slide.find('.lightSlider').addClass('lsGrab');
          $slide.on('mousedown', function (e) {
            if (w < elSize) {
              if (w !== 0) {
                return false;
              }
            }

            if ($(e.target).attr('class') !== 'lSPrev' && $(e.target).attr('class') !== 'lSNext') {
              startCoords = settings.vertical === true ? e.pageY : e.pageX;
              isDraging = true;

              if (e.preventDefault) {
                e.preventDefault();
              } else {
                e.returnValue = false;
              } // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723


              $slide.scrollLeft += 1;
              $slide.scrollLeft -= 1; // *

              $slide.find('.lightSlider').removeClass('lsGrab').addClass('lsGrabbing');
              clearInterval(interval);
            }
          });
          $(window).on('mousemove', function (e) {
            if (isDraging) {
              endCoords = settings.vertical === true ? e.pageY : e.pageX;
              $this.touchMove(endCoords, startCoords);
            }
          });
          $(window).on('mouseup', function (e) {
            if (isDraging) {
              $slide.find('.lightSlider').removeClass('lsGrabbing').addClass('lsGrab');
              isDraging = false;
              endCoords = settings.vertical === true ? e.pageY : e.pageX;
              var distance = endCoords - startCoords;

              if (Math.abs(distance) >= settings.swipeThreshold) {
                $(window).on('click.ls', function (e) {
                  if (e.preventDefault) {
                    e.preventDefault();
                  } else {
                    e.returnValue = false;
                  }

                  e.stopImmediatePropagation();
                  e.stopPropagation();
                  $(window).off('click.ls');
                });
              }

              $this.touchEnd(distance);
            }
          });
        }
      },
      enableTouch: function enableTouch() {
        var $this = this;

        if (isTouch) {
          var startCoords = {},
              endCoords = {};
          $slide.on('touchstart', function (e) {
            endCoords = e.originalEvent.targetTouches[0];
            startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
            startCoords.pageY = e.originalEvent.targetTouches[0].pageY;
            clearInterval(interval);
          });
          $slide.on('touchmove', function (e) {
            if (w < elSize) {
              if (w !== 0) {
                return false;
              }
            }

            var orig = e.originalEvent;
            endCoords = orig.targetTouches[0];
            var xMovement = Math.abs(endCoords.pageX - startCoords.pageX);
            var yMovement = Math.abs(endCoords.pageY - startCoords.pageY);

            if (settings.vertical === true) {
              if (yMovement * 3 > xMovement) {
                e.preventDefault();
              }

              $this.touchMove(endCoords.pageY, startCoords.pageY);
            } else {
              if (xMovement * 3 > yMovement) {
                e.preventDefault();
              }

              $this.touchMove(endCoords.pageX, startCoords.pageX);
            }
          });
          $slide.on('touchend', function () {
            if (w < elSize) {
              if (w !== 0) {
                return false;
              }
            }

            var distance;

            if (settings.vertical === true) {
              distance = endCoords.pageY - startCoords.pageY;
            } else {
              distance = endCoords.pageX - startCoords.pageX;
            }

            $this.touchEnd(distance);
          });
        }
      },
      build: function build() {
        var $this = this;
        $this.initialStyle();

        if (this.doCss()) {
          if (settings.enableTouch === true) {
            $this.enableTouch();
          }

          if (settings.enableDrag === true) {
            $this.enableDrag();
          }
        }

        $(window).on('focus', function () {
          $this.auto();
        });
        $(window).on('blur', function () {
          clearInterval(interval);
        });
        $this.pager();
        $this.pauseOnHover();
        $this.controls();
        $this.keyPress();
      }
    };
    plugin.build();

    refresh.init = function () {
      refresh.chbreakpoint();

      if (settings.vertical === true) {
        if (settings.item > 1) {
          elSize = settings.verticalHeight;
        } else {
          elSize = $children.outerHeight();
        }

        $slide.css('height', elSize + 'px');
      } else {
        elSize = $slide.outerWidth();
      }

      if (settings.loop === true && settings.mode === 'slide') {
        refresh.clone();
      }

      refresh.calL();

      if (settings.mode === 'slide') {
        $el.removeClass('lSSlide');
      }

      if (settings.mode === 'slide') {
        refresh.calSW();
        refresh.sSW();
      }

      setTimeout(function () {
        if (settings.mode === 'slide') {
          $el.addClass('lSSlide');
        }
      }, 1000);

      if (settings.pager) {
        refresh.createPager();
      }

      if (settings.adaptiveHeight === true && settings.vertical === false) {
        $el.css('height', $children.eq(scene).outerHeight(true));
      }

      if (settings.adaptiveHeight === false) {
        if (settings.mode === 'slide') {
          if (settings.vertical === false) {
            plugin.setHeight($el, false);
          } else {
            plugin.auto();
          }
        } else {
          plugin.setHeight($el, true);
        }
      }

      if (settings.gallery === true) {
        plugin.slideThumb();
      }

      if (settings.mode === 'slide') {
        plugin.slide();
      }

      if (settings.autoWidth === false) {
        if ($children.length <= settings.item) {
          $slide.find('.lSAction').hide();
        } else {
          $slide.find('.lSAction').show();
        }
      } else {
        if (refresh.calWidth(false) < elSize && w !== 0) {
          $slide.find('.lSAction').hide();
        } else {
          $slide.find('.lSAction').show();
        }
      }
    };

    $el.goToPrevSlide = function () {
      if (scene > 0) {
        settings.onBeforePrevSlide.call(this, $el, scene);
        scene--;
        $el.mode(false);

        if (settings.gallery === true) {
          plugin.slideThumb();
        }
      } else {
        if (settings.loop === true) {
          settings.onBeforePrevSlide.call(this, $el, scene);

          if (settings.mode === 'fade') {
            var l = length - 1;
            scene = parseInt(l / settings.slideMove);
          }

          $el.mode(false);

          if (settings.gallery === true) {
            plugin.slideThumb();
          }
        } else if (settings.slideEndAnimation === true) {
          $el.addClass('leftEnd');
          setTimeout(function () {
            $el.removeClass('leftEnd');
          }, 400);
        }
      }
    };

    $el.goToNextSlide = function () {
      var nextI = true;

      if (settings.mode === 'slide') {
        var _slideValue = plugin.slideValue();

        nextI = _slideValue < w - elSize - settings.slideMargin;
      }

      if (scene * settings.slideMove < length - settings.slideMove && nextI) {
        settings.onBeforeNextSlide.call(this, $el, scene);
        scene++;
        $el.mode(false);

        if (settings.gallery === true) {
          plugin.slideThumb();
        }
      } else {
        if (settings.loop === true) {
          settings.onBeforeNextSlide.call(this, $el, scene);
          scene = 0;
          $el.mode(false);

          if (settings.gallery === true) {
            plugin.slideThumb();
          }
        } else if (settings.slideEndAnimation === true) {
          $el.addClass('rightEnd');
          setTimeout(function () {
            $el.removeClass('rightEnd');
          }, 400);
        }
      }
    };

    $el.mode = function (_touch) {
      if (settings.adaptiveHeight === true && settings.vertical === false) {
        $el.css('height', $children.eq(scene).outerHeight(true));
      }

      if (on === false) {
        if (settings.mode === 'slide') {
          if (plugin.doCss()) {
            $el.addClass('lSSlide');

            if (settings.speed !== '') {
              $slide.css('transition-duration', settings.speed + 'ms');
            }

            if (settings.cssEasing !== '') {
              $slide.css('transition-timing-function', settings.cssEasing);
            }
          }
        } else {
          if (plugin.doCss()) {
            if (settings.speed !== '') {
              $el.css('transition-duration', settings.speed + 'ms');
            }

            if (settings.cssEasing !== '') {
              $el.css('transition-timing-function', settings.cssEasing);
            }
          }
        }
      }

      if (!_touch) {
        settings.onBeforeSlide.call(this, $el, scene);
      }

      if (settings.mode === 'slide') {
        plugin.slide();
      } else {
        plugin.fade();
      }

      if (!$slide.hasClass('ls-hover')) {
        plugin.auto();
      }

      setTimeout(function () {
        if (!_touch) {
          settings.onAfterSlide.call(this, $el, scene);
        }
      }, settings.speed);
      on = true;
    };

    $el.play = function () {
      $el.goToNextSlide();
      settings.auto = true;
      plugin.auto();
    };

    $el.pause = function () {
      settings.auto = false;
      clearInterval(interval);
    };

    $el.refresh = function () {
      refresh.init();
    };

    $el.getCurrentSlideCount = function () {
      var sc = scene;

      if (settings.loop) {
        var ln = $slide.find('.lslide').length,
            cl = $el.find('.clone.left').length;

        if (scene <= cl - 1) {
          sc = ln + (scene - cl);
        } else if (scene >= ln + cl) {
          sc = scene - ln - cl;
        } else {
          sc = scene - cl;
        }
      }

      return sc + 1;
    };

    $el.getTotalSlideCount = function () {
      return $slide.find('.lslide').length;
    };

    $el.goToSlide = function (s) {
      if (settings.loop) {
        scene = s + $el.find('.clone.left').length - 1;
      } else {
        scene = s;
      }

      $el.mode(false);

      if (settings.gallery === true) {
        plugin.slideThumb();
      }
    };

    $el.destroy = function () {
      if ($el.lightSlider) {
        $el.goToPrevSlide = function () {};

        $el.goToNextSlide = function () {};

        $el.mode = function () {};

        $el.play = function () {};

        $el.pause = function () {};

        $el.refresh = function () {};

        $el.getCurrentSlideCount = function () {};

        $el.getTotalSlideCount = function () {};

        $el.goToSlide = function () {};

        $el.lightSlider = null;
        refresh = {
          init: function init() {}
        };
        $el.parent().parent().find('.lSAction, .lSPager').remove();
        $el.removeClass('lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right').removeAttr('style').unwrap().unwrap();
        $el.children().removeAttr('style');
        $children.removeClass('lslide active');
        $el.find('.clone').remove();
        $children = null;
        interval = null;
        on = false;
        scene = 0;
      }
    };

    setTimeout(function () {
      settings.onSliderLoad.call(this, $el);
    }, 10);
    $(window).on('resize orientationchange', function (e) {
      setTimeout(function () {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }

        refresh.init();
      }, 200);
    });
    return this;
  };
})(jQuery);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_checkbox_ce_checkbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/checkbox/ce-checkbox */ "./src/app/checkbox/ce-checkbox.js");
/* harmony import */ var _app_accordion_ce_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/accordion/ce-accordion */ "./src/app/accordion/ce-accordion.js");
/* harmony import */ var _app_tabs_ce_tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/tabs/ce-tab */ "./src/app/tabs/ce-tab.js");
/* harmony import */ var _app_toggle_ce_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/toggle/ce-toggle */ "./src/app/toggle/ce-toggle.js");
/* harmony import */ var _app_tooltip_ce_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/tooltip/ce-tooltip */ "./src/app/tooltip/ce-tooltip.js");
/* harmony import */ var _app_radiogroup_ce_radiogroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/radiogroup/ce-radiogroup */ "./src/app/radiogroup/ce-radiogroup.js");
/*
 * @Author: Rajkeshwar Prasad(rajkeshwar.pd@gmail.com) 
 * @Date: 2019-02-23 22:24:32 
 * @Last Modified by: Rajkeshwar Prasad
 * @Last Modified time: 2019-03-19 23:16:50
 */
__webpack_require__(/*! ./app/styles.scss */ "./src/app/styles.scss");

__webpack_require__(/*! ./app/slider/slider.scss */ "./src/app/slider/slider.scss");

__webpack_require__(/*! ./assets/es-slider */ "./src/assets/es-slider.js");







window.customElements.define('ce-checkbox', _app_checkbox_ce_checkbox__WEBPACK_IMPORTED_MODULE_0__["default"]);
window.customElements.define('ce-accordion', _app_accordion_ce_accordion__WEBPACK_IMPORTED_MODULE_1__["CeAccordion"]);
window.customElements.define('ce-accordion-heading', _app_accordion_ce_accordion__WEBPACK_IMPORTED_MODULE_1__["CeAccordionHeading"]);
window.customElements.define('ce-accordion-panel', _app_accordion_ce_accordion__WEBPACK_IMPORTED_MODULE_1__["CeAccordionPanel"]);
window.customElements.define('ce-tab', _app_tabs_ce_tab__WEBPACK_IMPORTED_MODULE_2__["CeTab"]);
window.customElements.define('ce-tabs', _app_tabs_ce_tab__WEBPACK_IMPORTED_MODULE_2__["CeTabs"]);
window.customElements.define('ce-tab-panel', _app_tabs_ce_tab__WEBPACK_IMPORTED_MODULE_2__["CeTabPanel"]);
window.customElements.define('ce-toggle-button', _app_toggle_ce_toggle__WEBPACK_IMPORTED_MODULE_3__["CeToggleButton"]);
window.customElements.define('ce-tooltip', _app_tooltip_ce_tooltip__WEBPACK_IMPORTED_MODULE_4__["CeTooltip"]);
window.customElements.define('ce-radio-button', _app_radiogroup_ce_radiogroup__WEBPACK_IMPORTED_MODULE_5__["CeRadioButton"]);
window.customElements.define('ce-radio-group', _app_radiogroup_ce_radiogroup__WEBPACK_IMPORTED_MODULE_5__["CeRadioGroup"]);

__webpack_require__(/*! ./app/ui-router */ "./src/app/ui-router.js");

__webpack_require__(/*! ./app/links */ "./src/app/links.js");

__webpack_require__(/*! ./app/event/event */ "./src/app/event/event.js");

__webpack_require__(/*! ./app/button/button */ "./src/app/button/button.js");

__webpack_require__(/*! ./app/tree/tree */ "./src/app/tree/tree.js");

__webpack_require__(/*! ./app/slider/slider */ "./src/app/slider/slider.js");

__webpack_require__(/*! ./app/slider/ce-slider */ "./src/app/slider/ce-slider.js");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9idXR0b24vYnV0dG9uLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zbGlkZXIvc2xpZGVyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RyZWUvdHJlZS5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hY2NvcmRpb24vY2UtYWNjb3JkaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYnV0dG9uL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2J1dHRvbi9idXR0b24uc2Nzcz84M2Q1Iiwid2VicGFjazovLy8uL3NyYy9hcHAvY2hlY2tib3gvY2UtY2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9ldmVudC9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2xpbmtzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvcmFkaW9ncm91cC9jZS1yYWRpb2dyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2xpZGVyL2NlLXNsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3NsaWRlci9zbGlkZXItZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zbGlkZXIvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2xpZGVyL3NsaWRlci5zY3NzPzdkOGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zdHlsZXMuc2Nzcz82YmFlIiwid2VicGFjazovLy8uL3NyYy9hcHAvdGFicy9jZS10YWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90b2dnbGUvY2UtdG9nZ2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdG9vbHRpcC9jZS10b29sdGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdHJlZS90cmVlLWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90cmVlL3RyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90cmVlL3RyZWUuc2Nzcz84YmVlIiwid2VicGFjazovLy8uL3NyYy9hcHAvdWktcm91dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZXMtcmVmcmVzaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2VzLXNldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZXMtc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJBQ0NPUkRJT05fSEVBREVSIiwiQUNDT1JESU9OX1BBTkVMIiwiS0VZQ09ERSIsIkRPV04iLCJMRUZUIiwiUklHSFQiLCJVUCIsIkhPTUUiLCJFTkQiLCJhY2NvcmRpb25UZW1wbGF0ZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsIkNlQWNjb3JkaW9uIiwiYXR0YWNoU2hhZG93IiwibW9kZSIsInNoYWRvd1Jvb3QiLCJhcHBlbmRDaGlsZCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiX29uQ2hhbmdlIiwiX29uS2V5RG93biIsIlByb21pc2UiLCJhbGwiLCJjdXN0b21FbGVtZW50cyIsIndoZW5EZWZpbmVkIiwidGhlbiIsIl8iLCJoZWFkaW5ncyIsIl9hbGxIZWFkaW5ncyIsImZvckVhY2giLCJoZWFkaW5nIiwic2V0QXR0cmlidXRlIiwicGFuZWwiLCJfcGFuZWxGb3JIZWFkaW5nIiwiaWQiLCJleHBhbmRlZCIsIl9jb2xsYXBzZUhlYWRpbmciLCJfY29sbGFwc2VQYW5lbCIsIl9leHBhbmRIZWFkaW5nIiwiX2V4cGFuZFBhbmVsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImVsZW0iLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJldmVudCIsIl9hbmltYXRlUGFuZWxGb3JIZWFkaW5nIiwidGFyZ2V0IiwiZGV0YWlsIiwiaXNFeHBhbmRlZE5vdyIsImV4cGFuZCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiX2FuaW1hdGVJbiIsIl9hbmltYXRlT3V0IiwiY3VycmVudEhlYWRpbmciLCJfaXNIZWFkaW5nIiwiYWx0S2V5IiwibmV3SGVhZGluZyIsImtleUNvZGUiLCJfcHJldkhlYWRpbmciLCJfbmV4dEhlYWRpbmciLCJfZmlyc3RIZWFkaW5nIiwiX2xhc3RIZWFkaW5nIiwicHJldmVudERlZmF1bHQiLCJmb2N1cyIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJuZXh0IiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiY29uc29sZSIsImVycm9yIiwibmV3SWR4IiwiZmluZEluZGV4IiwiYWN0aXZlRWxlbWVudCIsImxlbmd0aCIsImhlaWdodCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIl9hbmltYXRlIiwic3RhcnRPZmZzZXQiLCJlbmRPZmZzZXQiLCJyZXNvbHZlIiwiYWRkIiwiY2hpbGRyZW4iLCJpZHgiLCJpbmRleE9mIiwiYW5pbWF0ZWRDaGlsZHJlbiIsInNsaWNlIiwic3R5bGUiLCJvdmVyZmxvdyIsImNoaWxkIiwicG9zaXRpb24iLCJ6SW5kZXgiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcm9taXNlIiwidHJhbnNpdGlvbkVuZFByb21pc2UiLCJyZW1vdmUiLCJIVE1MRWxlbWVudCIsImhlYWRpbmdJZENvdW50ZXIiLCJhY2NvcmRpb25IZWFkaW5nVGVtcGxhdGUiLCJDZUFjY29yZGlvbkhlYWRpbmciLCJfb25DbGljayIsImJpbmQiLCJkZWxlZ2F0ZXNGb2N1cyIsIl9zaGFkb3dCdXR0b24iLCJxdWVyeVNlbGVjdG9yIiwiaGFzQXR0cmlidXRlIiwibmFtZSIsInZhbHVlIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiYnViYmxlcyIsIkJvb2xlYW4iLCJyZW1vdmVBdHRyaWJ1dGUiLCJhY2NvcmRpb25QYW5lbFRlbXBsYXRlIiwicGFuZWxJZENvdW50ZXIiLCJDZUFjY29yZGlvblBhbmVsIiwidmFsIiwiZWxlbWVudCIsImYiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJCdXR0b24iLCJ0ZW1wbGF0ZSIsImxvZyIsImUiLCJjb21wb3NlZFBhdGgiLCJfZm9jdXMiLCJmb2N1c0VsZW1lbnQiLCJkaXNhYmxlZCIsIl9zZXRGb2N1c2VkIiwiYXR0ck5hbWUiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiZGVmaW5lIiwiaXMiLCJTUEFDRSIsIkNlQ2hlY2tib3giLCJfdXBncmFkZVByb3BlcnR5IiwiX29uS2V5VXAiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJoYXNWYWx1ZSIsImJsdXIiLCJfdG9nZ2xlQ2hlY2tlZCIsImNoZWNrZWQiLCJpc0NoZWNrZWQiLCJpc0Rpc2FibGVkIiwiVWlFdmVudCIsImNpdHkiLCJfcmVuZGVyIiwiX2FkZEV2ZW50TGlzdGVuZXJzIiwiZXZ0IiwiZWwiLCJhdHRyaWJ1dGVzIiwiZmlsdGVyIiwiYXR0ciIsInRlc3QiLCJ0YXJnZXRGbiIsImV2YWwiLCJldmVudE5hbWUiLCJyZXBsYWNlIiwiYXBwbHkiLCJmdW5jdGlvbkFuZFBhcmFtcyIsImV4ZWMiLCJwYXJhbXMiLCJzcGxpdCIsIndpbmRvdyIsIm9ubG9hZCIsImJpbmRMaW5rcyIsImxpbmtzIiwibGluayIsImhpamFja0xpbmtzIiwicGFnZSIsImdldEF0dHJpYnV0ZSIsIl9sb2FkVmlldyIsInBhZ2VVcmwiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm5ld0RvYyIsInJlc3BvbnNlIiwicm91dGVyU2xvdCIsInJlc3BvbnNlVHlwZSIsIm9wZW4iLCJzZW5kIiwicmFkaW9CdXR0b25UZW1wbGF0ZSIsIkNlUmFkaW9CdXR0b24iLCJyYWRpb0dyb3VwVGVtcGxhdGUiLCJDZVJhZGlvR3JvdXAiLCJmaXJzdENoZWNrZWRCdXR0b24iLCJjaGVja2VkUmFkaW9CdXR0b24iLCJfdW5jaGVja0FsbCIsIl9jaGVja05vZGUiLCJoYXNSb2xlUmFkaW8iLCJfc2V0Q2hlY2tlZFRvUHJldkJ1dHRvbiIsIl9zZXRDaGVja2VkVG9OZXh0QnV0dG9uIiwiX3NldENoZWNrZWQiLCJmaXJzdFJhZGlvQnV0dG9uIiwibGFzdFJhZGlvQnV0dG9uIiwibm9kZSIsInByZXYiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiY2hlY2tlZEJ1dHRvbiIsIl9wcmV2UmFkaW9CdXR0b24iLCJfbmV4dFJhZGlvQnV0dG9uIiwiX2ZvY3VzTm9kZSIsInJhZGlvQnV0dG9ucyIsImkiLCJidG4iLCJ0YWJJbmRleCIsIkNlU2xpZGVyIiwic2xpZGVDdXJyZW50Iiwic2xpZGVzVG90YWwiLCJpbnRlcnZhbEFjdGl2ZSIsIm9wdGlvbnMiLCJzdGFydCIsImF4aXMiLCJidXR0b25zIiwiYnVsbGV0cyIsImludGVydmFsIiwiaW50ZXJ2YWxUaW1lIiwiYW5pbWF0aW9uIiwiYW5pbWF0aW9uVGltZSIsImluZmluaXRlIiwiJGNvbnRhaW5lciIsIiQiLCIkdmlld3BvcnQiLCJmaW5kIiwiJG92ZXJ2aWV3IiwiJG5leHQiLCIkcHJldiIsIiRidWxsZXRzIiwiJHNsaWRlcyIsInZpZXdwb3J0U2l6ZSIsImNvbnRlbnRTdHlsZSIsInNsaWRlc1Zpc2libGUiLCJzbGlkZVNpemUiLCJzbGlkZUluZGV4IiwiaXNIb3Jpem9udGFsIiwic2l6ZUxhYmVsIiwicG9zaUxhYmVsIiwiaW50ZXJ2YWxUaW1lciIsIl9pbml0aWFsaXplIiwiX3VwZGF0ZSIsIl9tb3ZlIiwiX3NldEV2ZW50cyIsImZpcnN0IiwiTWF0aCIsImNlaWwiLCJhcHBlbmQiLCJjbG9uZSIsImFkZENsYXNzIiwiY3NzIiwiX3NldEJ1dHRvbnMiLCJpbmRleCIsImlzTmFOIiwiYW5pbWF0ZSIsInF1ZXVlIiwiZHVyYXRpb24iLCJhbHdheXMiLCJ0cmlnZ2VyIiwiX3N0YXJ0IiwiY2xpY2siLCJyZXNpemUiLCJfX3NlbGYiLCJvbiIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ0b2dnbGVDbGFzcyIsInJlbW92ZUNsYXNzIiwic2V0dGluZ3MiLCJpdGVtIiwiYXV0b1dpZHRoIiwic2xpZGVNb3ZlIiwic2xpZGVNYXJnaW4iLCJ1c2VDU1MiLCJjc3NFYXNpbmciLCJlYXNpbmciLCJzcGVlZCIsImF1dG8iLCJwYXVzZU9uSG92ZXIiLCJsb29wIiwic2xpZGVFbmRBbmltYXRpb24iLCJwYXVzZSIsImtleVByZXNzIiwiY29udHJvbHMiLCJwcmV2SHRtbCIsIm5leHRIdG1sIiwicnRsIiwiYWRhcHRpdmVIZWlnaHQiLCJ2ZXJ0aWNhbCIsInZlcnRpY2FsSGVpZ2h0IiwidlRodW1iV2lkdGgiLCJ0aHVtYkl0ZW0iLCJwYWdlciIsImdhbGxlcnkiLCJnYWxsZXJ5TWFyZ2luIiwidGh1bWJNYXJnaW4iLCJjdXJyZW50UGFnZXJQb3NpdGlvbiIsImVuYWJsZVRvdWNoIiwiZW5hYmxlRHJhZyIsImZyZWVNb3ZlIiwic3dpcGVUaHJlc2hvbGQiLCJyZXNwb25zaXZlIiwib25CZWZvcmVTdGFydCIsIiRlbCIsIm9uU2xpZGVyTG9hZCIsIm9uQmVmb3JlU2xpZGUiLCJzY2VuZSIsIm9uQWZ0ZXJTbGlkZSIsIm9uQmVmb3JlTmV4dFNsaWRlIiwib25CZWZvcmVQcmV2U2xpZGUiLCJJbWFnZVNsaWRlciIsIndpbmRvd1ciLCJvdXRlcldpZHRoIiwiYnJlYWtwb2ludCIsInJlc3Bvc2l2ZU9iaiIsInciLCJlbFNpemUiLCIkc2xpZGUiLCJwcm9wZXJ0eSIsImd1dHRlciIsInNsaWRlVmFsdWUiLCJwYWdlcldpZHRoIiwic2xpZGVXaWR0aCIsInRodW1iV2lkdGgiLCJpc1RvdWNoIiwiZG9jdW1lbnRFbGVtZW50IiwibFNTbGlkZU91dGVyIiwibFNTbGlkZVdyYXBwZXIiLCJsU1BhZ2VyIiwibGlnaHRTbGlkZXIiLCJjaGlsZE5vZGVzIiwiX3JlZnJlc2hjYWxTVyIsIl9yZWZyZXNoc1NXIiwiX3NsaWRlVmFsdWUiLCJtb3ZlIiwic2V0SGVpZ2h0IiwiZG9Dc3MiLCIkY2hpbGRyZW4iLCJmYWRlT3V0IiwiZXEiLCJmYWRlSW4iLCJvYiIsInYiLCJfZG9Dc3MiLCJ0b3AiLCJsZWZ0IiwiJHRodW1iIiwicGFyZW50IiwiYWN0aXZlIiwiX3NWIiwicGFyc2VJbnQiLCJ3aWR0aCIsIl9jYWxXaWR0aCIsInN1cHBvcnQiLCJ0cmFuc2l0aW9uIiwicm9vdCIsImNsbiIsImxuIiwiQ2VUYWJzIiwiX29uU2xvdENoYW5nZSIsIl90YWJTbG90IiwiX3BhbmVsU2xvdCIsIl9saW5rUGFuZWxzIiwidGFicyIsIl9hbGxUYWJzIiwidGFiIiwic2VsZWN0ZWRUYWIiLCJzZWxlY3RlZCIsIl9zZWxlY3RUYWIiLCJwYW5lbElkIiwicGFuZWxzIiwiX2FsbFBhbmVscyIsImhpZGRlbiIsIm5ld1RhYiIsInJlc2V0IiwibmV3UGFuZWwiLCJfcGFuZWxGb3JUYWIiLCJFcnJvciIsIm5ld1BhbmVsSWQiLCJfcHJldlRhYiIsIl9uZXh0VGFiIiwiX2ZpcnN0VGFiIiwiX2xhc3RUYWIiLCJjZVRhYkNvdW50ZXIiLCJDZVRhYiIsImNlUGFuZWxDb3VudGVyIiwiQ2VUYWJQYW5lbCIsIkVOVEVSIiwiQ2VUb2dnbGVCdXR0b24iLCJfdG9nZ2xlUHJlc3NlZCIsInByZXNzZWQiLCJpc1ByZXNzZWQiLCJDZVRvb2x0aXAiLCJfc2hvdyIsIl9oaWRlIiwiX3RhcmdldCIsIlRyZWVEYXRhIiwiVHJlZSIsIl9yZW5kZXJUcmVlIiwiZGF0YSIsImJ1aWxkTm9kZSIsInJlZHVjZSIsInQiLCJkIiwidHlwZSIsImZvbGRlcnMiLCJoYW5kbGVDbGljayIsImlzRXhwYW5kZWQiLCJzdG9wUHJvcGFnYXRpb24iLCJVaVJvdXRlciIsImRlZmF1bHRzIiwiU2xpZGVyUmVmcmVzaCIsImoiLCJzZXR0aW5nc1RlbXAiLCJpc0VtcHR5T2JqZWN0IiwiayIsInJvdW5kIiwidW5kZWZpbmVkIiwiZm4iLCJlYWNoIiwicGx1Z2luIiwiZXh0ZW5kIiwicmVmcmVzaCIsInJldHVyblZhbHVlIiwiZ29Ub1ByZXZTbGlkZSIsImdvVG9OZXh0U2xpZGUiLCJhZnRlciIsImhpZGUiLCJjYWxXaWR0aCIsImluaXRpYWxTdHlsZSIsIiR0aGlzIiwiY2FsbCIsImNoYnJlYWtwb2ludCIsIndyYXAiLCJjYWxTVyIsInRXciIsInRJIiwidEl0ZW0iLCJuIiwiYXBwZW5kVG8iLCJtIiwicHJlcGVuZFRvIiwiaGFzQ2xhc3MiLCJzU1ciLCJjYWxMIiwiY3JlYXRlUGFnZXIiLCJwYWdlcnMiLCJ0aHVtYiIsIm1pblBnciIsIiRjU291dGVyIiwiaHRtbCIsIiRwYWdlciIsInNsaWRlVGh1bWIiLCJjbCIsImdNYXJnaW4iLCJpbml0IiwiZmFkZSIsIm9iaiIsInNldENzcyIsInRIIiwib3V0ZXJIZWlnaHQiLCJ0UCIsInRIVCIsImNvbXBsZXRlIiwic2MiLCJsIiwibmwiLCJzbGlkZSIsImNhbFNsaWRlIiwicmVzZXRTbGlkZSIsInMiLCJ0aHVtYlNsaWRlIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwidG91Y2hNb3ZlIiwiZW5kQ29vcmRzIiwic3RhcnRDb29yZHMiLCJkaXN0YW5jZSIsInN3aXBlVmFsIiwic3dpcGVWYWxUIiwidG91Y2hFbmQiLCJteFZhbCIsIl9uZXh0IiwiZ0MiLCJhZCIsIm51bSIsInRXIiwiaXNEcmFnaW5nIiwicGFnZVkiLCJwYWdlWCIsInNjcm9sbExlZnQiLCJhYnMiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJvZmYiLCJvcmlnaW5hbEV2ZW50IiwidGFyZ2V0VG91Y2hlcyIsIm9yaWciLCJ4TW92ZW1lbnQiLCJ5TW92ZW1lbnQiLCJidWlsZCIsInNob3ciLCJuZXh0SSIsIl90b3VjaCIsInBsYXkiLCJnZXRDdXJyZW50U2xpZGVDb3VudCIsImdldFRvdGFsU2xpZGVDb3VudCIsImdvVG9TbGlkZSIsImRlc3Ryb3kiLCJyZW1vdmVBdHRyIiwidW53cmFwIiwialF1ZXJ5IiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHVDQUF1QztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBYyx3Q0FBd0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0EsOENBQXNDLHVCQUF1Qjs7O0FBRzdEO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3J4QkEsMkJBQTJCLG1CQUFPLENBQUMsMkdBQXNEO0FBQ3pGO0FBQ0EsY0FBYyxRQUFTLGNBQWMsMEJBQTBCLHVCQUF1QixrQkFBa0Isd0JBQXdCLEVBQUUsdUJBQXVCLDZCQUE2QixFQUFFLHNDQUFzQyx3QkFBd0IsMEJBQTBCLGFBQWEsRUFBRSw4QkFBOEIseUJBQXlCLHdCQUF3Qiw0QkFBNEIsdUJBQXVCLGdCQUFnQixpQkFBaUIsd0JBQXdCLHlCQUF5Qiw4QkFBOEIsMkJBQTJCLHNCQUFzQixFQUFFLDJDQUEyQyxlQUFlLEVBQUUsc0JBQXNCLHdCQUF3QixxQkFBcUIsNEJBQTRCLEVBQUUsZUFBZSwyQ0FBMkMsaURBQWlELG9DQUFvQyxpRkFBaUYsbUNBQW1DLDJCQUEyQix5Q0FBeUMsdUNBQXVDLHFCQUFxQiwwQ0FBMEMsZ0RBQWdELDZDQUE2QyxvQkFBb0IsNkNBQTZDLHdDQUF3Qyx1Q0FBdUMsRUFBRSw4REFBOEQsNENBQTRDLEVBQUUsc0JBQXNCLGlEQUFpRCxFQUFFLGlDQUFpQyx1Q0FBdUMsMkNBQTJDLEVBQUUsaUNBQWlDLHVDQUF1QywyQ0FBMkMsRUFBRSxtQ0FBbUMseUJBQXlCLDJDQUEyQyxnREFBZ0QsRUFBRSw2QkFBNkIsa0JBQWtCLEVBQUUsOEJBQThCLHFDQUFxQyxpQkFBaUIsRUFBRSxFQUFFLHNCQUFzQiw2Q0FBNkMsc0JBQXNCLEVBQUUsK0JBQStCLGlCQUFpQiw0QkFBNEIsRUFBRSw4QkFBOEIsaUJBQWlCLGdDQUFnQyx3QkFBd0IsRUFBRSwyQkFBMkIsMERBQTBELEVBQUUsNEVBQTRFLDZDQUE2Qyw2QkFBNkIsaUJBQWlCLEVBQUUsNEZBQTRGLGtCQUFrQixFQUFFLG9DQUFvQyxpREFBaUQsRUFBRSwyQkFBMkIsd0RBQXdELG1CQUFtQixFQUFFLEVBQUUsNEZBQTRGLGlCQUFpQiw0QkFBNEIsRUFBRSwyQ0FBMkMsY0FBYyxpQkFBaUIsZUFBZSx5QkFBeUIsdUJBQXVCLEVBQUUsNERBQTRELGVBQWUsc0JBQXNCLHlCQUF5QixFQUFFLG1DQUFtQyxnREFBZ0QsOENBQThDLHFCQUFxQixtREFBbUQsRUFBRSw2Q0FBNkMsc0RBQXNELDhDQUE4QyxFQUFFLGlEQUFpRCxpQkFBaUIsRUFBRSxtREFBbUQsOENBQThDLEVBQUUsOEJBQThCLG1EQUFtRCxnREFBZ0QsRUFBRSwrREFBK0QsaUJBQWlCLEVBQUUsRUFBRSxrREFBa0QsaUJBQWlCLEVBQUUsbUNBQW1DLDBDQUEwQyxFQUFFLHVEQUF1RCxnREFBZ0QsOENBQThDLEVBQUUsaUVBQWlFLHNEQUFzRCxFQUFFLGlDQUFpQyx3Q0FBd0MsRUFBRSxxREFBcUQsOENBQThDLDRDQUE0QyxFQUFFLCtEQUErRCxvREFBb0QsRUFBRSxvQ0FBb0MsZ0NBQWdDLEVBQUUsd0RBQXdELDJDQUEyQyxrQ0FBa0MsRUFBRSxrRUFBa0UsaURBQWlELEVBQUUsaUNBQWlDLDBCQUEwQixtQ0FBbUMsb0NBQW9DLEVBQUUsb0RBQW9ELG9CQUFvQixzQ0FBc0MsRUFBRSx1QkFBdUIseUJBQXlCLHlCQUF5QixFQUFFLHVCQUF1Qix3QkFBd0IsMEJBQTBCLEVBQUUsZ0NBQWdDLHVDQUF1QyxvREFBb0QscURBQXFELEVBQUUsaUdBQWlHLG1CQUFtQixvQkFBb0IsRUFBRTs7Ozs7Ozs7Ozs7OztBQ0Y1dUwsMkJBQTJCLG1CQUFPLENBQUMsMkdBQXNEO0FBQ3pGO0FBQ0EsY0FBYyxRQUFTLHdIQUF3SCw0RUFBNEUscUJBQXFCLGdDQUFnQyw4QkFBOEIsNkJBQTZCLDJCQUEyQiwwQkFBMEIsc0JBQXNCLEVBQUUsOENBQThDLG1CQUFtQixtQkFBbUIsRUFBRSxrQkFBa0IscUJBQXFCLGNBQWMsRUFBRSxxQkFBcUIsb0JBQW9CLHFCQUFxQix1QkFBdUIsRUFBRSwwQ0FBMEMsZ0JBQWdCLEVBQUUsOEJBQThCLDJDQUEyQyx1Q0FBdUMsbUNBQW1DLCtCQUErQiwyREFBMkQscURBQXFELDJDQUEyQyxvREFBb0QsNENBQTRDLDJEQUEyRCxtREFBbUQsRUFBRSw2QkFBNkIsdUJBQXVCLEVBQUUsaUNBQWlDLGtDQUFrQyxXQUFXLFlBQVksZUFBZSxvQkFBb0IsZ0JBQWdCLEVBQUUsMENBQTBDLGVBQWUsaUNBQWlDLHlCQUF5QixvREFBb0QsNENBQTRDLHlDQUF5QyxpQ0FBaUMsMkRBQTJELG1EQUFtRCxFQUFFLHdDQUF3QyxnQkFBZ0IsRUFBRSxpREFBaUQsZUFBZSxFQUFFLGdHQUFnRyxxQkFBcUIsZUFBZSx1QkFBdUIsRUFBRSxzQ0FBc0Msb0JBQW9CLDBCQUEwQixtQkFBbUIsRUFBRSx3Q0FBd0MsOEJBQThCLHdCQUF3QiwwQkFBMEIsZ0JBQWdCLHFCQUFxQix3QkFBd0IsZUFBZSx1QkFBdUIsZ0JBQWdCLDJDQUEyQyxtQ0FBbUMsRUFBRSwwRkFBMEYsOEJBQThCLEVBQUUsMEJBQTBCLGlCQUFpQixFQUFFLGlDQUFpQyxlQUFlLEVBQUUsMEVBQTBFLGtDQUFrQyxvQkFBb0IsY0FBYyxxQkFBcUIsMENBQTBDLCtDQUErQyw4Q0FBOEMsa0RBQWtELDZDQUE2QyxtREFBbUQsNkNBQTZDLGdDQUFnQyw4QkFBOEIsNkJBQTZCLDJCQUEyQiwwQkFBMEIsc0JBQXNCLEVBQUUseUNBQXlDLHFCQUFxQixzRUFBc0UsOERBQThELEVBQUUsNEZBQTRGLHVCQUF1QixFQUFFLDBDQUEwQyxtQkFBbUIsaUJBQWlCLG9CQUFvQixFQUFFLHNGQUFzRixtQkFBbUIsbUJBQW1CLEVBQUUsNENBQTRDLGdCQUFnQixFQUFFLDhEQUE4RCxnQkFBZ0IsbUJBQW1CLGFBQWEsaUJBQWlCLG9EQUFvRCxvQkFBb0IsdUJBQXVCLGdCQUFnQixzQkFBc0IsaUJBQWlCLGdEQUFnRCx3Q0FBd0MsRUFBRSx5QkFBeUIsZUFBZSxFQUFFLHlCQUF5Qiw2QkFBNkIsZUFBZSxFQUFFLHlCQUF5QixpQ0FBaUMsZ0JBQWdCLEVBQUUsNEJBQTRCLHlCQUF5QixFQUFFLGdCQUFnQixnQkFBZ0IsZUFBZSw2QkFBNkIscUJBQXFCLEVBQUUsNENBQTRDLHVCQUF1QixFQUFFLG9DQUFvQyxrQ0FBa0MsRUFBRSx1Q0FBdUMsa0NBQWtDLGFBQWEsV0FBVyxFQUFFLDZDQUE2QywyQkFBMkIsK0JBQStCLEVBQUUsb0VBQW9FLGNBQWMsdUJBQXVCLGtCQUFrQixFQUFFLGdEQUFnRCxvQ0FBb0MsaUJBQWlCLGNBQWMsRUFBRSxnREFBZ0QsaUNBQWlDLGlCQUFpQixjQUFjLEVBQUUsb0RBQW9ELG1CQUFtQixFQUFFLHlEQUF5RCxvQkFBb0Isa0NBQWtDLEVBQUUscUVBQXFFLHFCQUFxQixFQUFFLGtFQUFrRSxnQkFBZ0IsRUFBRSw4RUFBOEUsNEJBQTRCLEVBQUUsNENBQTRDLFFBQVEsY0FBYyxFQUFFLFNBQVMsa0JBQWtCLEVBQUUsVUFBVSxjQUFjLEVBQUUsRUFBRSx5QkFBeUIsUUFBUSxjQUFjLEVBQUUsU0FBUyxrQkFBa0IsRUFBRSxVQUFVLGNBQWMsRUFBRSxFQUFFLCtCQUErQixRQUFRLGFBQWEsRUFBRSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsYUFBYSxFQUFFLEVBQUUsdUJBQXVCLFFBQVEsYUFBYSxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsVUFBVSxhQUFhLEVBQUUsRUFBRSxnQ0FBZ0MsUUFBUSxjQUFjLEVBQUUsU0FBUyxpQkFBaUIsRUFBRSxVQUFVLGNBQWMsRUFBRSxFQUFFLHdCQUF3QixRQUFRLGNBQWMsRUFBRSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsY0FBYyxFQUFFLEVBQUUsa0NBQWtDLFFBQVEsZ0JBQWdCLEVBQUUsU0FBUyxvQkFBb0IsRUFBRSxVQUFVLGdCQUFnQixFQUFFLEVBQUUsMEJBQTBCLFFBQVEsZ0JBQWdCLEVBQUUsU0FBUyxvQkFBb0IsRUFBRSxVQUFVLGdCQUFnQixFQUFFLEVBQUUsNkJBQTZCLHFDQUFxQyw2QkFBNkIsdUJBQXVCLEVBQUUsNEJBQTRCLG9DQUFvQyw0QkFBNEIsdUJBQXVCLEVBQUUsc0NBQXNDLG1DQUFtQywyQkFBMkIsdUJBQXVCLEVBQUUscUNBQXFDLHNDQUFzQyw4QkFBOEIsdUJBQXVCLEVBQUUsbUNBQW1DLG9DQUFvQyw0QkFBNEIsdUJBQXVCLEVBQUUsa0NBQWtDLHFDQUFxQyw2QkFBNkIsdUJBQXVCLEVBQUUsa0RBQWtELHlCQUF5QixzQkFBc0Isb0JBQW9CLHFCQUFxQixpQkFBaUIsRUFBRSxpQ0FBaUMsaUJBQWlCLDZCQUE2QiwwQkFBMEIsd0JBQXdCLHlCQUF5QixxQkFBcUIsRUFBRSxzREFBc0QscUJBQXFCLEVBQUUsMEJBQTBCLGlCQUFpQixrQkFBa0IsZ0JBQWdCLHFCQUFxQix1QkFBdUIsRUFBRSx5QkFBeUIscUJBQXFCLHFCQUFxQixnQkFBZ0IsdUJBQXVCLEVBQUUsNEJBQTRCLGdCQUFnQixFQUFFLHdCQUF3QiwyQkFBMkIsMEJBQTBCLHVCQUF1QixpQkFBaUIsbUJBQW1CLG9CQUFvQixzQkFBc0IsbUJBQW1CLEVBQUUsK0JBQStCLGdCQUFnQiw4QkFBOEIsRUFBRSx5QkFBeUIsd0JBQXdCLHdCQUF3QixtQkFBbUIsMEJBQTBCLGdCQUFnQixnQkFBZ0IsaUJBQWlCLHVCQUF1QixnQkFBZ0Isc0JBQXNCLHVCQUF1QixzQkFBc0IsMEJBQTBCLG9CQUFvQixFQUFFLHNCQUFzQiwwQkFBMEIsRUFBRSwrQkFBK0IsbUJBQW1CLHFCQUFxQixFQUFFLHlCQUF5Qix1QkFBdUIsRUFBRSwwQkFBMEIscUJBQXFCLHVCQUF1QixpQkFBaUIsWUFBWSxXQUFXLEVBQUUsNkJBQTZCLGdCQUFnQix1QkFBdUIsaUJBQWlCLGtCQUFrQiw4QkFBOEIsaUJBQWlCLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUNGNWhTLDJCQUEyQixtQkFBTyxDQUFDLHdHQUFtRDtBQUN0RjtBQUNBLGNBQWMsUUFBUyx3SEFBd0gsNEVBQTRFLHFCQUFxQixnQ0FBZ0MsOEJBQThCLDZCQUE2QiwyQkFBMkIsMEJBQTBCLHNCQUFzQixFQUFFLDhDQUE4QyxtQkFBbUIsbUJBQW1CLEVBQUUsa0JBQWtCLHFCQUFxQixjQUFjLEVBQUUscUJBQXFCLG9CQUFvQixxQkFBcUIsdUJBQXVCLEVBQUUsMENBQTBDLGdCQUFnQixFQUFFLDhCQUE4QiwyQ0FBMkMsdUNBQXVDLG1DQUFtQywrQkFBK0IsMkRBQTJELHFEQUFxRCwyQ0FBMkMsb0RBQW9ELDRDQUE0QywyREFBMkQsbURBQW1ELEVBQUUsNkJBQTZCLHVCQUF1QixFQUFFLGlDQUFpQyxrQ0FBa0MsV0FBVyxZQUFZLGVBQWUsb0JBQW9CLGdCQUFnQixFQUFFLDBDQUEwQyxlQUFlLGlDQUFpQyx5QkFBeUIsb0RBQW9ELDRDQUE0Qyx5Q0FBeUMsaUNBQWlDLDJEQUEyRCxtREFBbUQsRUFBRSx3Q0FBd0MsZ0JBQWdCLEVBQUUsaURBQWlELGVBQWUsRUFBRSxnR0FBZ0cscUJBQXFCLGVBQWUsdUJBQXVCLEVBQUUsc0NBQXNDLG9CQUFvQiwwQkFBMEIsbUJBQW1CLEVBQUUsd0NBQXdDLDhCQUE4Qix3QkFBd0IsMEJBQTBCLGdCQUFnQixxQkFBcUIsd0JBQXdCLGVBQWUsdUJBQXVCLGdCQUFnQiwyQ0FBMkMsbUNBQW1DLEVBQUUsMEZBQTBGLDhCQUE4QixFQUFFLDBCQUEwQixpQkFBaUIsRUFBRSxpQ0FBaUMsZUFBZSxFQUFFLDBFQUEwRSxrQ0FBa0Msb0JBQW9CLGNBQWMscUJBQXFCLDBDQUEwQywrQ0FBK0MsOENBQThDLGtEQUFrRCw2Q0FBNkMsbURBQW1ELDZDQUE2QyxnQ0FBZ0MsOEJBQThCLDZCQUE2QiwyQkFBMkIsMEJBQTBCLHNCQUFzQixFQUFFLHlDQUF5QyxxQkFBcUIsc0VBQXNFLDhEQUE4RCxFQUFFLDRGQUE0Rix1QkFBdUIsRUFBRSwwQ0FBMEMsbUJBQW1CLGlCQUFpQixvQkFBb0IsRUFBRSxzRkFBc0YsbUJBQW1CLG1CQUFtQixFQUFFLDRDQUE0QyxnQkFBZ0IsRUFBRSw4REFBOEQsZ0JBQWdCLG1CQUFtQixhQUFhLGlCQUFpQixvREFBb0Qsb0JBQW9CLHVCQUF1QixnQkFBZ0Isc0JBQXNCLGlCQUFpQixnREFBZ0Qsd0NBQXdDLEVBQUUseUJBQXlCLGVBQWUsRUFBRSx5QkFBeUIsNkJBQTZCLGVBQWUsRUFBRSx5QkFBeUIsaUNBQWlDLGdCQUFnQixFQUFFLDRCQUE0Qix5QkFBeUIsRUFBRSxnQkFBZ0IsZ0JBQWdCLGVBQWUsNkJBQTZCLHFCQUFxQixFQUFFLDRDQUE0Qyx1QkFBdUIsRUFBRSxvQ0FBb0Msa0NBQWtDLEVBQUUsdUNBQXVDLGtDQUFrQyxhQUFhLFdBQVcsRUFBRSw2Q0FBNkMsMkJBQTJCLCtCQUErQixFQUFFLG9FQUFvRSxjQUFjLHVCQUF1QixrQkFBa0IsRUFBRSxnREFBZ0Qsb0NBQW9DLGlCQUFpQixjQUFjLEVBQUUsZ0RBQWdELGlDQUFpQyxpQkFBaUIsY0FBYyxFQUFFLG9EQUFvRCxtQkFBbUIsRUFBRSx5REFBeUQsb0JBQW9CLGtDQUFrQyxFQUFFLHFFQUFxRSxxQkFBcUIsRUFBRSxrRUFBa0UsZ0JBQWdCLEVBQUUsOEVBQThFLDRCQUE0QixFQUFFLDRDQUE0QyxRQUFRLGNBQWMsRUFBRSxTQUFTLGtCQUFrQixFQUFFLFVBQVUsY0FBYyxFQUFFLEVBQUUseUJBQXlCLFFBQVEsY0FBYyxFQUFFLFNBQVMsa0JBQWtCLEVBQUUsVUFBVSxjQUFjLEVBQUUsRUFBRSwrQkFBK0IsUUFBUSxhQUFhLEVBQUUsU0FBUyxpQkFBaUIsRUFBRSxVQUFVLGFBQWEsRUFBRSxFQUFFLHVCQUF1QixRQUFRLGFBQWEsRUFBRSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsYUFBYSxFQUFFLEVBQUUsZ0NBQWdDLFFBQVEsY0FBYyxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsVUFBVSxjQUFjLEVBQUUsRUFBRSx3QkFBd0IsUUFBUSxjQUFjLEVBQUUsU0FBUyxpQkFBaUIsRUFBRSxVQUFVLGNBQWMsRUFBRSxFQUFFLGtDQUFrQyxRQUFRLGdCQUFnQixFQUFFLFNBQVMsb0JBQW9CLEVBQUUsVUFBVSxnQkFBZ0IsRUFBRSxFQUFFLDBCQUEwQixRQUFRLGdCQUFnQixFQUFFLFNBQVMsb0JBQW9CLEVBQUUsVUFBVSxnQkFBZ0IsRUFBRSxFQUFFLDZCQUE2QixxQ0FBcUMsNkJBQTZCLHVCQUF1QixFQUFFLDRCQUE0QixvQ0FBb0MsNEJBQTRCLHVCQUF1QixFQUFFLHNDQUFzQyxtQ0FBbUMsMkJBQTJCLHVCQUF1QixFQUFFLHFDQUFxQyxzQ0FBc0MsOEJBQThCLHVCQUF1QixFQUFFLG1DQUFtQyxvQ0FBb0MsNEJBQTRCLHVCQUF1QixFQUFFLGtDQUFrQyxxQ0FBcUMsNkJBQTZCLHVCQUF1QixFQUFFLGtEQUFrRCx5QkFBeUIsc0JBQXNCLG9CQUFvQixxQkFBcUIsaUJBQWlCLEVBQUUsaUNBQWlDLGlCQUFpQiw2QkFBNkIsMEJBQTBCLHdCQUF3Qix5QkFBeUIscUJBQXFCLEVBQUUsc0RBQXNELHFCQUFxQixFQUFFLDBCQUEwQixpQkFBaUIsa0JBQWtCLGdCQUFnQixxQkFBcUIsdUJBQXVCLEVBQUUseUJBQXlCLHFCQUFxQixxQkFBcUIsZ0JBQWdCLHVCQUF1QixFQUFFLDRCQUE0QixnQkFBZ0IsRUFBRSx3QkFBd0IsMkJBQTJCLDBCQUEwQix1QkFBdUIsaUJBQWlCLG1CQUFtQixvQkFBb0Isc0JBQXNCLG1CQUFtQixFQUFFLCtCQUErQixnQkFBZ0IsOEJBQThCLEVBQUUseUJBQXlCLHdCQUF3Qix3QkFBd0IsbUJBQW1CLDBCQUEwQixnQkFBZ0IsZ0JBQWdCLGlCQUFpQix1QkFBdUIsZ0JBQWdCLHNCQUFzQix1QkFBdUIsc0JBQXNCLDBCQUEwQixvQkFBb0IsRUFBRSxzQkFBc0IsMEJBQTBCLEVBQUUsK0JBQStCLG1CQUFtQixxQkFBcUIsRUFBRSx5QkFBeUIsdUJBQXVCLEVBQUUsMEJBQTBCLHFCQUFxQix1QkFBdUIsaUJBQWlCLFlBQVksV0FBVyxFQUFFLDZCQUE2QixnQkFBZ0IsdUJBQXVCLGlCQUFpQixrQkFBa0IsOEJBQThCLGlCQUFpQixFQUFFLGlCQUFpQiwyQkFBMkIsRUFBRSxjQUFjLDJCQUEyQiwwQkFBMEIsc0JBQXNCLDRCQUE0QixvQkFBb0IscUJBQXFCLEVBQUUsMEJBQTBCLDRCQUE0Qiw0QkFBNEIsRUFBRSxpREFBaUQscUJBQXFCLEVBQUUsb0NBQW9DLDZCQUE2QixFQUFFLHdCQUF3QixrQkFBa0IsZ0NBQWdDLEVBQUUsWUFBWSw0QkFBNEIsa0JBQWtCLEVBQUUsa0JBQWtCLGtCQUFrQixnQ0FBZ0MsRUFBRSxzQkFBc0IsNkJBQTZCLEVBQUUsK0VBQStFLG1CQUFtQixFQUFFLHNCQUFzQiwyQkFBMkIsaUJBQWlCLG9CQUFvQixzQkFBc0IsMkJBQTJCLHVCQUF1QiwwQ0FBMEMsRUFBRSx5RUFBeUUsMkJBQTJCLEVBQUUsZ0NBQWdDLGtCQUFrQixFQUFFLGdCQUFnQixlQUFlLGNBQWMsRUFBRSxvQkFBb0IsNkJBQTZCLEVBQUUsY0FBYyxrQkFBa0IsaUJBQWlCLHNCQUFzQixnQkFBZ0IsRUFBRSx1QkFBdUIsd0JBQXdCLGlEQUFpRCxFQUFFLHVCQUF1QixjQUFjLHdCQUF3QixvQkFBb0IsMEJBQTBCLDhCQUE4QixvQkFBb0IsRUFBRSxlQUFlLG1CQUFtQixnQkFBZ0IsRUFBRSxrQkFBa0IsZUFBZSxjQUFjLDBCQUEwQix3QkFBd0IsRUFBRSx3QkFBd0Isb0NBQW9DLHdDQUF3Qyx5QkFBeUIsNkJBQTZCLEVBQUUsNEJBQTRCLDJCQUEyQiw4QkFBOEIsb0JBQW9CLEVBQUUsZ0NBQWdDLG1EQUFtRCxzQ0FBc0MsRUFBRSx5Q0FBeUMsc0JBQXNCLDZCQUE2QixpQkFBaUIsb0JBQW9CLGtCQUFrQix1QkFBdUIscUJBQXFCLDhCQUE4QixFQUFFOzs7Ozs7Ozs7Ozs7O0FDRngwVywyQkFBMkIsbUJBQU8sQ0FBQywyR0FBc0Q7QUFDekY7QUFDQSxjQUFjLFFBQVMsY0FBYywwQkFBMEIsRUFBRSwwQ0FBMEMsbUJBQW1CLEVBQUUsMkNBQTJDLGtCQUFrQixFQUFFLCtEQUErRCxjQUFjLGFBQWEsd0JBQXdCLHNCQUFzQiwwQkFBMEIsMkRBQTJELDJDQUEyQyxFQUFFLDZEQUE2RCw2QkFBNkIsOEJBQThCLEVBQUUsZ0xBQWdMLGtCQUFrQixFQUFFLHFDQUFxQyx1QkFBdUIsRUFBRSx1REFBdUQsNEJBQTRCLG9CQUFvQix5QkFBeUIsZUFBZSxrQkFBa0Isa0JBQWtCLGdCQUFnQixxQ0FBcUMsaUJBQWlCLEVBQUUsc0JBQXNCLHVCQUF1Qix1QkFBdUIsRUFBRSw4QkFBOEIsNEJBQTRCLG9CQUFvQix5QkFBeUIsaUJBQWlCLGdCQUFnQixtQkFBbUIsZ0JBQWdCLGlDQUFpQyw4QkFBOEIsbUJBQW1CLEVBQUUsMENBQTBDLGlCQUFpQixFQUFFLGdFQUFnRSxpQkFBaUIsRUFBRSx1Q0FBdUMsb0JBQW9CLHFCQUFxQiwyQkFBMkIsd0JBQXdCLG9DQUFvQyxnQ0FBZ0MsRUFBRSxpRUFBaUUsZ0JBQWdCLHVCQUF1QixtQkFBbUIsRUFBRSw4REFBOEQsc0JBQXNCLEVBQUUscUNBQXFDLG1CQUFtQixFQUFFOzs7Ozs7Ozs7Ozs7OztBQ0Y5OUQ7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsZ0JBQWdCO0FBQ3ZELE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxvQkFBb0I7QUFDbkMsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxjQUFjO0FBQ25FO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsdURBQVE7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQSxtQkFBbUIsMkJBQTJCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBOztBQUVBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQsa0RBQWtELHNCQUFzQjtBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBLEtBQUssS0FBd0MsRUFBRSxFQUU3Qzs7QUFFRixRQUFRLHNCQUFpQjtBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JE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Q0FBc0I4RyxNQUF0QixDQUE2QixRQUE3QixFQUF1QzRQLHNEQUF2QztBQUNBM04sTUFBTSxDQUFDL0ksY0FBUCxDQUFzQjhHLE1BQXRCLENBQTZCLFNBQTdCLEVBQXdDa08sdURBQXhDO0FBQ0FqTSxNQUFNLENBQUMvSSxjQUFQLENBQXNCOEcsTUFBdEIsQ0FBNkIsY0FBN0IsRUFBNkM4UCwyREFBN0M7QUFFQTdOLE1BQU0sQ0FBQy9JLGNBQVAsQ0FBc0I4RyxNQUF0QixDQUE2QixrQkFBN0IsRUFBaURnUSxvRUFBakQ7QUFFQS9OLE1BQU0sQ0FBQy9JLGNBQVAsQ0FBc0I4RyxNQUF0QixDQUE2QixZQUE3QixFQUEyQ29RLGlFQUEzQztBQUVBbk8sTUFBTSxDQUFDL0ksY0FBUCxDQUFzQjhHLE1BQXRCLENBQTZCLGlCQUE3QixFQUFnRG9ELDJFQUFoRDtBQUNBbkIsTUFBTSxDQUFDL0ksY0FBUCxDQUFzQjhHLE1BQXRCLENBQTZCLGdCQUE3QixFQUErQ3NELDBFQUEvQzs7QUFHQXFVLG1CQUFPLENBQUMsK0NBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyx1Q0FBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG1EQUFELENBQVA7O0FBRUFBLG1CQUFPLENBQUMsdURBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQywrQ0FBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLHVEQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsNkRBQUQsQ0FBUCxDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJlYWQzMmUwMTc1YmM0OGQ2ODZmNVwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiY2UtYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuXFxuY2UtYnV0dG9uW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnZhYWRpbi1idXR0b24tY29udGFpbmVyOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFwyMDAzXFxcIjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAwOyB9XFxuXFxuLnZhYWRpbi1idXR0b24tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtaW4taGVpZ2h0OiBpbmhlcml0O1xcbiAgdGV4dC1zaGFkb3c6IGluaGVyaXQ7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuW3BhcnQ9XFxcInByZWZpeFxcXCJdLFxcbltwYXJ0PVxcXCJzdWZmaXhcXFwiXSB7XFxuICBmbGV4OiBub25lOyB9XFxuXFxuW3BhcnQ9XFxcImxhYmVsXFxcIl0ge1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgfVxcblxcbmNlLWJ1dHRvbiB7XFxuICAtLWx1bW8tYnV0dG9uLXNpemU6IHZhcigtLWx1bW8tc2l6ZS1tKTtcXG4gIG1pbi13aWR0aDogY2FsYyh2YXIoLS1sdW1vLWJ1dHRvbi1zaXplKSAqIDIpO1xcbiAgaGVpZ2h0OiB2YXIoLS1sdW1vLWJ1dHRvbi1zaXplKTtcXG4gIHBhZGRpbmc6IDAgY2FsYyh2YXIoLS1sdW1vLWJ1dHRvbi1zaXplKSAvIDMgKyB2YXIoLS1sdW1vLWJvcmRlci1yYWRpdXMpIC8gMik7XFxuICBtYXJnaW46IHZhcigtLWx1bW8tc3BhY2UteHMpIDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWx1bW8tZm9udC1mYW1pbHkpO1xcbiAgZm9udC1zaXplOiB2YXIoLS1sdW1vLWZvbnQtc2l6ZS1tKTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBjb2xvcjogdmFyKC0tbHVtby1wcmltYXJ5LXRleHQtY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbHVtby1jb250cmFzdC01cGN0KTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWx1bW8tYm9yZGVyLXJhZGl1cyk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlOyB9XFxuXFxuW3BhcnQ9XFxcImxhYmVsXFxcIl0sXFxuW3BhcnQ9XFxcInByZWZpeFxcXCJdLFxcbltwYXJ0PVxcXCJzdWZmaXhcXFwiXSB7XFxuICBsaW5lLWhlaWdodDogdmFyKC0tbHVtby1saW5lLWhlaWdodC14cyk7IH1cXG5cXG5bcGFydD1cXFwibGFiZWxcXFwiXSB7XFxuICBwYWRkaW5nOiBjYWxjKHZhcigtLWx1bW8tYnV0dG9uLXNpemUpIC8gNikgMDsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInNtYWxsXFxcIl0ge1xcbiAgZm9udC1zaXplOiB2YXIoLS1sdW1vLWZvbnQtc2l6ZS1zKTtcXG4gIC0tbHVtby1idXR0b24tc2l6ZTogdmFyKC0tbHVtby1zaXplLXMpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwibGFyZ2VcXFwiXSB7XFxuICBmb250LXNpemU6IHZhcigtLWx1bW8tZm9udC1zaXplLWwpO1xcbiAgLS1sdW1vLWJ1dHRvbi1zaXplOiB2YXIoLS1sdW1vLXNpemUtbCk7IH1cXG5cXG5jZS1idXR0b25bZGlzYWJsZWRdW2Rpc2FibGVkXSB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIGNvbG9yOiB2YXIoLS1sdW1vLWRpc2FibGVkLXRleHQtY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbHVtby1jb250cmFzdC01cGN0KTsgfVxcblxcbmNlLWJ1dHRvbjpob3Zlcjo6YmVmb3JlIHtcXG4gIG9wYWNpdHk6IDAuMDU7IH1cXG5cXG5AbWVkaWEgKHBvaW50ZXI6IGNvYXJzZSkge1xcbiAgY2UtYnV0dG9uW2FjdGl2ZV06aG92ZXI6OmJlZm9yZSB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbmNlLWJ1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAxLjRzLCB0cmFuc2Zvcm0gMC4xcztcXG4gIGZpbHRlcjogYmx1cig4cHgpOyB9XFxuXFxuY2UtYnV0dG9uW2FjdGl2ZV06OmJlZm9yZSB7XFxuICBvcGFjaXR5OiAwLjE7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwczsgfVxcblxcbmNlLWJ1dHRvblthY3RpdmVdOjphZnRlciB7XFxuICBvcGFjaXR5OiAwLjE7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwcywgMHM7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XFxuXFxuY2UtYnV0dG9uW2ZvY3VzLXJpbmddIHtcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDJweCB2YXIoLS1sdW1vLXByaW1hcnktY29sb3ItNTBwY3QpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwidGVydGlhcnlcXFwiXSxcXG5jZS1idXR0b25bdGhlbWV+PVxcXCJ0ZXJ0aWFyeS1pbmxpbmVcXFwiXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzO1xcbiAgbWluLXdpZHRoOiAwOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwidGVydGlhcnlcXFwiXTo6YmVmb3JlLFxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInRlcnRpYXJ5LWlubGluZVxcXCJdOjpiZWZvcmUge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInRlcnRpYXJ5XFxcIl0ge1xcbiAgcGFkZGluZzogMCBjYWxjKHZhcigtLWx1bW8tYnV0dG9uLXNpemUpIC8gNik7IH1cXG5cXG5AbWVkaWEgKGhvdmVyOiBob3Zlcikge1xcbiAgY2UtYnV0dG9uW3RoZW1lKj1cXFwidGVydGlhcnlcXFwiXTpub3QoW2FjdGl2ZV06aG92ZXIpIHtcXG4gICAgb3BhY2l0eTogMC44OyB9IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJ0ZXJ0aWFyeVxcXCJdW2FjdGl2ZV0sXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwidGVydGlhcnktaW5saW5lXFxcIl1bYWN0aXZlXSB7XFxuICBvcGFjaXR5OiAwLjU7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwczsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInRlcnRpYXJ5LWlubGluZVxcXCJdIHtcXG4gIG1hcmdpbjogMDtcXG4gIGhlaWdodDogYXV0bztcXG4gIHBhZGRpbmc6IDA7XFxuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogaW5oZXJpdDsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInRlcnRpYXJ5LWlubGluZVxcXCJdIFtwYXJ0PVxcXCJsYWJlbFxcXCJdIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0OyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tcHJpbWFyeS1jb2xvcik7XFxuICBjb2xvcjogdmFyKC0tbHVtby1wcmltYXJ5LWNvbnRyYXN0LWNvbG9yKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBtaW4td2lkdGg6IGNhbGModmFyKC0tbHVtby1idXR0b24tc2l6ZSkgKiAyLjUpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdW2Rpc2FibGVkXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLXByaW1hcnktY29sb3ItNTBwY3QpO1xcbiAgY29sb3I6IHZhcigtLWx1bW8tcHJpbWFyeS1jb250cmFzdC1jb2xvcik7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJwcmltYXJ5XFxcIl06aG92ZXI6OmJlZm9yZSB7XFxuICBvcGFjaXR5OiAwLjE7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJwcmltYXJ5XFxcIl1bYWN0aXZlXTo6YmVmb3JlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tc2hhZGUtMjBwY3QpOyB9XFxuXFxuQG1lZGlhIChwb2ludGVyOiBjb2Fyc2UpIHtcXG4gIGNlLWJ1dHRvblt0aGVtZX49XFxcInByaW1hcnlcXFwiXVthY3RpdmVdOjpiZWZvcmUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLXNoYWRlLTYwcGN0KTsgfVxcbiAgY2UtYnV0dG9uW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdOm5vdChbYWN0aXZlXTpob3Zlcik6OmJlZm9yZSB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInByaW1hcnlcXFwiXVthY3RpdmVdOjphZnRlciB7XFxuICBvcGFjaXR5OiAwLjI7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJzdWNjZXNzXFxcIl0ge1xcbiAgY29sb3I6IHZhcigtLWx1bW8tc3VjY2Vzcy10ZXh0LWNvbG9yKTsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInN1Y2Nlc3NcXFwiXVt0aGVtZX49XFxcInByaW1hcnlcXFwiXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLXN1Y2Nlc3MtY29sb3IpO1xcbiAgY29sb3I6IHZhcigtLWx1bW8tc3VjY2Vzcy1jb250cmFzdC1jb2xvcik7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJzdWNjZXNzXFxcIl1bdGhlbWV+PVxcXCJwcmltYXJ5XFxcIl1bZGlzYWJsZWRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tc3VjY2Vzcy1jb2xvci01MHBjdCk7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJlcnJvclxcXCJdIHtcXG4gIGNvbG9yOiB2YXIoLS1sdW1vLWVycm9yLXRleHQtY29sb3IpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwiZXJyb3JcXFwiXVt0aGVtZX49XFxcInByaW1hcnlcXFwiXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLWVycm9yLWNvbG9yKTtcXG4gIGNvbG9yOiB2YXIoLS1sdW1vLWVycm9yLWNvbnRyYXN0LWNvbG9yKTsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcImVycm9yXFxcIl1bdGhlbWV+PVxcXCJwcmltYXJ5XFxcIl1bZGlzYWJsZWRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tZXJyb3ItY29sb3ItNTBwY3QpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwiY29udHJhc3RcXFwiXSB7XFxuICBjb2xvcjogdmFyKC0tbHVtby1jb250cmFzdCk7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJjb250cmFzdFxcXCJdW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tY29udHJhc3QpO1xcbiAgY29sb3I6IHZhcigtLWx1bW8tYmFzZS1jb2xvcik7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJjb250cmFzdFxcXCJdW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdW2Rpc2FibGVkXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLWNvbnRyYXN0LTUwcGN0KTsgfVxcblxcbltwYXJ0XSA6OnNsb3R0ZWQoaXJvbi1pY29uKSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogdmFyKC0tbHVtby1pY29uLXNpemUtbSk7XFxuICBoZWlnaHQ6IHZhcigtLWx1bW8taWNvbi1zaXplLW0pOyB9XFxuXFxuW3BhcnRdIDo6c2xvdHRlZChpcm9uLWljb25baWNvbl49XFxcInZhYWRpbjpcXFwiXSkge1xcbiAgcGFkZGluZzogMC4yNWVtO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50OyB9XFxuXFxuW3BhcnQ9XFxcInByZWZpeFxcXCJdIHtcXG4gIG1hcmdpbi1sZWZ0OiAtMC4yNWVtO1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjI1ZW07IH1cXG5cXG5bcGFydD1cXFwic3VmZml4XFxcIl0ge1xcbiAgbWFyZ2luLWxlZnQ6IDAuMjVlbTtcXG4gIG1hcmdpbi1yaWdodDogLTAuMjVlbTsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcImljb25cXFwiXSB7XFxuICBtaW4td2lkdGg6IHZhcigtLWx1bW8tYnV0dG9uLXNpemUpO1xcbiAgcGFkZGluZy1sZWZ0OiBjYWxjKHZhcigtLWx1bW8tYnV0dG9uLXNpemUpIC8gNCk7XFxuICBwYWRkaW5nLXJpZ2h0OiBjYWxjKHZhcigtLWx1bW8tYnV0dG9uLXNpemUpIC8gNCk7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJpY29uXFxcIl0gW3BhcnQ9XFxcInByZWZpeFxcXCJdLFxcbmNlLWJ1dHRvblt0aGVtZX49XFxcImljb25cXFwiXSBbcGFydD1cXFwic3VmZml4XFxcIl0ge1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxuICBtYXJnaW4tcmlnaHQ6IDA7IH1cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qISBsaWdodHNsaWRlciAtIHYxLjEuMyAtIDIwMTUtMDQtMTRcXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9zYWNoaW5jaG9vbHVyL2xpZ2h0c2xpZGVyXFxuKiBDb3B5cmlnaHQgKGMpIDIwMTUgU2FjaGluIE47IExpY2Vuc2VkIE1JVCAqL1xcbi8qKiAvISEhIGNvcmUgY3NzIFNob3VsZCBub3QgZWRpdCAhISEvKiovXFxuLmxTU2xpZGVPdXRlciB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcblxcbi5saWdodFNsaWRlcjpiZWZvcmUsXFxuLmxpZ2h0U2xpZGVyOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlOyB9XFxuXFxuLmxpZ2h0U2xpZGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDA7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciA+IC5saWdodFNsaWRlcjphZnRlciB7XFxuICBjbGVhcjogYm90aDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciAubFNTbGlkZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAxcztcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogLXdlYmtpdC10cmFuc2Zvcm0sIGhlaWdodDtcXG4gIC1tb3otdHJhbnNpdGlvbi1wcm9wZXJ0eTogLW1vei10cmFuc2Zvcm0sIGhlaWdodDtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zZm9ybSwgaGVpZ2h0O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50OyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU0ZhZGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU0ZhZGUgPiAqIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDk7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi5sU1NsaWRlV3JhcHBlci51c2luZ0NzcyAubFNGYWRlID4gKiB7XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OiAwcztcXG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IG9wYWNpdHk7XFxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciAubFNGYWRlID4gKi5hY3RpdmUge1xcbiAgei1pbmRleDogMTA7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIudXNpbmdDc3MgLmxTRmFkZSA+ICouYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG4vKiogLyEhISBFbmQgb2YgY29yZSBjc3MgU2hvdWxkIG5vdCBlZGl0ICEhIS8qKi9cXG4vKiBQYWdlciAqL1xcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyB7XFxuICBtYXJnaW46IDEwcHggMCAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyA+IGxpIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmc6IDAgNXB4OyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGkgYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyMjIyO1xcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGhlaWdodDogOHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRleHQtaW5kZW50OiAtOTk5ZW07XFxuICB3aWR0aDogOHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogOTk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjVzIGxpbmVhciAwcztcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGxpbmVhciAwczsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyA+IGxpOmhvdmVyIGEsXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGkuYWN0aXZlIGEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyOGJjYTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLm1lZGlhIHtcXG4gIG9wYWNpdHk6IDAuODsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLm1lZGlhLmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuLyogRW5kIG9mIHBhZ2VyICovXFxuLyoqIEdhbGxlcnkgKi9cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeSB7XFxuICBsaXN0LXN0eWxlOiBub25lIG91dHNpZGUgbm9uZTtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIG1hcmdpbjogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OiAtd2Via2l0LXRyYW5zZm9ybTtcXG4gIC1tb3otdHJhbnNpdGlvbi1wcm9wZXJ0eTogLW1vei10cmFuc2Zvcm07XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgbGkge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYm9yZGVyLXJhZGl1cyAwLjEycyBsaW5lYXIgMHMgMC4zNXMgbGluZWFyIDBzO1xcbiAgdHJhbnNpdGlvbjogYm9yZGVyLXJhZGl1cyAwLjEycyBsaW5lYXIgMHMgMC4zNXMgbGluZWFyIDBzOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgbGkuYWN0aXZlLFxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IGxpOmhvdmVyIHtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IGltZyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogYXV0bztcXG4gIG1heC13aWR0aDogMTAwJTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5OmJlZm9yZSxcXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICBkaXNwbGF5OiB0YWJsZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5OmFmdGVyIHtcXG4gIGNsZWFyOiBib3RoOyB9XFxuXFxuLyogRW5kIG9mIEdhbGxlcnkqL1xcbi8qIHNsaWRlciBhY3Rpb25zICovXFxuLmxTQWN0aW9uID4gYSB7XFxuICB3aWR0aDogMzJweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdG9wOiA1MCU7XFxuICBoZWlnaHQ6IDMycHg7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi9hc3NldHMvY29udHJvbHMucG5nXFxcIik7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiA5OTtcXG4gIG1hcmdpbi10b3A6IC0xNnB4O1xcbiAgb3BhY2l0eTogMC41O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMzVzIGxpbmVhciAwcztcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zNXMgbGluZWFyIDBzOyB9XFxuXFxuLmxTQWN0aW9uID4gYTpob3ZlciB7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuLmxTQWN0aW9uID4gLmxTUHJldiB7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICBsZWZ0OiAxMHB4OyB9XFxuXFxuLmxTQWN0aW9uID4gLmxTTmV4dCB7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMzJweCAwO1xcbiAgcmlnaHQ6IDEwcHg7IH1cXG5cXG4ubFNBY3Rpb24gPiBhLmRpc2FibGVkIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XFxuXFxuLmNTLWhpZGRlbiB7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG9wYWNpdHk6IDA7XFxuICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9MCk7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLyogdmVydGljYWwgKi9cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwubm9QYWdlciB7XFxuICBwYWRkaW5nLXJpZ2h0OiAwcHggIWltcG9ydGFudDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxTR2FsbGVyeSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubGlnaHRTbGlkZXIgPiAqIHtcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxuICBtYXgtd2lkdGg6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi8qIHZlcnRpY2FsIGNvbnRyb2xscyAqL1xcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxTQWN0aW9uID4gYSB7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogLTE0cHg7XFxuICBtYXJnaW4tdG9wOiAwOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubFNBY3Rpb24gPiAubFNOZXh0IHtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDMxcHggLTMxcHg7XFxuICBib3R0b206IDEwcHg7XFxuICB0b3A6IGF1dG87IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sU0FjdGlvbiA+IC5sU1ByZXYge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAtMzFweDtcXG4gIGJvdHRvbTogYXV0bztcXG4gIHRvcDogMTBweDsgfVxcblxcbi8qIHZlcnRpY2FsICovXFxuLyogUnRsICovXFxuLmxTU2xpZGVPdXRlci5sU3J0bCB7XFxuICBkaXJlY3Rpb246IHJ0bDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxpZ2h0U2xpZGVyLFxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZSBvdXRzaWRlIG5vbmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5saWdodFNsaWRlcixcXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5sU1BhZ2VyIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5saWdodFNsaWRlciA+ICosXFxuLmxTU2xpZGVPdXRlciAubFNHYWxsZXJ5IGxpIHtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuLmxTU2xpZGVPdXRlci5sU3J0bCAubGlnaHRTbGlkZXIgPiAqLFxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxTR2FsbGVyeSBsaSB7XFxuICBmbG9hdDogcmlnaHQgIWltcG9ydGFudDsgfVxcblxcbi8qIFJ0bCAqL1xcbkAtd2Via2l0LWtleWZyYW1lcyByaWdodEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyByaWdodEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMDsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHRvcEVuZCB7XFxuICAwJSB7XFxuICAgIHRvcDogMDsgfVxcbiAgNTAlIHtcXG4gICAgdG9wOiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIHRvcDogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyB0b3BFbmQge1xcbiAgMCUge1xcbiAgICB0b3A6IDA7IH1cXG4gIDUwJSB7XFxuICAgIHRvcDogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICB0b3A6IDA7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBsZWZ0RW5kIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDsgfVxcbiAgNTAlIHtcXG4gICAgbGVmdDogMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGxlZnQ6IDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgbGVmdEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IDE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAwOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYm90dG9tRW5kIHtcXG4gIDAlIHtcXG4gICAgYm90dG9tOiAwOyB9XFxuICA1MCUge1xcbiAgICBib3R0b206IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgYm90dG9tOiAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdHRvbUVuZCB7XFxuICAwJSB7XFxuICAgIGJvdHRvbTogMDsgfVxcbiAgNTAlIHtcXG4gICAgYm90dG9tOiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGJvdHRvbTogMDsgfSB9XFxuXFxuLmxTU2xpZGVPdXRlciAucmlnaHRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sZWZ0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBsZWZ0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IGxlZnRFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLnJpZ2h0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiB0b3BFbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogdG9wRW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sZWZ0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBib3R0b21FbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogYm90dG9tRW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5yaWdodEVuZCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogbGVmdEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiBsZWZ0RW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5sZWZ0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiByaWdodEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiByaWdodEVuZCAwLjNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLyovICBHUmFiIGN1cnNvciAqL1xcbi5saWdodFNsaWRlci5sc0dyYWIgPiAqIHtcXG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiO1xcbiAgY3Vyc29yOiAtbW96LWdyYWI7XFxuICBjdXJzb3I6IC1vLWdyYWI7XFxuICBjdXJzb3I6IC1tcy1ncmFiO1xcbiAgY3Vyc29yOiBncmFiOyB9XFxuXFxuLmxpZ2h0U2xpZGVyLmxzR3JhYmJpbmcgPiAqIHtcXG4gIGN1cnNvcjogbW92ZTtcXG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiYmluZztcXG4gIGN1cnNvcjogLW1vei1ncmFiYmluZztcXG4gIGN1cnNvcjogLW8tZ3JhYmJpbmc7XFxuICBjdXJzb3I6IC1tcy1ncmFiYmluZztcXG4gIGN1cnNvcjogZ3JhYmJpbmc7IH1cXG5cXG4vKiBUaW55IENhcm91c2VsICovXFxuLyogc2xpZGVyTmV3ICovXFxuI3NsaWRlck5ldyB7XFxuICBtYXJnaW46IDAgMCAyMHB4OyB9XFxuXFxuI3NsaWRlck5ldyAudmlld3BvcnQge1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgaGVpZ2h0OiAxMjVweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldHMge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBjbGVhcjogYm90aDtcXG4gIG1hcmdpbjogMCAwIDAgNDVweDsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldHMgbGkge1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4jc2xpZGVyTmV3IC5idWxsZXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGNvbG9yOiAjNTU1NTU1O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldC5hY3RpdmUge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1NTU1OyB9XFxuXFxuI3NsaWRlck5ldyAuYnV0dG9ucyB7XFxuICBiYWNrZ3JvdW5kOiAjQzAxMzEzO1xcbiAgYm9yZGVyLXJhZGl1czogMzVweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiAzMHB4IDEwcHggMCAwO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMzVweDtcXG4gIGhlaWdodDogMzVweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsaW5lLWhlaWdodDogMzVweDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMjJweDsgfVxcblxcbiNzbGlkZXJOZXcgLm5leHQge1xcbiAgbWFyZ2luOiAzMHB4IDAgMCAxMHB4OyB9XFxuXFxuI3NsaWRlck5ldyAuYnV0dG9uczpob3ZlciB7XFxuICBjb2xvcjogI0MwMTMxMztcXG4gIGJhY2tncm91bmQ6ICNmZmY7IH1cXG5cXG4jc2xpZGVyTmV3IC5kaXNhYmxlIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjsgfVxcblxcbiNzbGlkZXJOZXcgLm92ZXJ2aWV3IHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMjQwcHg7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuI3NsaWRlck5ldyAub3ZlcnZpZXcgbGkge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW46IDAgMjBweCAwIDA7XFxuICBwYWRkaW5nOiAxcHg7XFxuICBoZWlnaHQ6IDEyMXB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNkYztcXG4gIHdpZHRoOiAyMzZweDsgfVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIGxpZ2h0c2xpZGVyIC0gdjEuMS4zIC0gMjAxNS0wNC0xNFxcbiogaHR0cHM6Ly9naXRodWIuY29tL3NhY2hpbmNob29sdXIvbGlnaHRzbGlkZXJcXG4qIENvcHlyaWdodCAoYykgMjAxNSBTYWNoaW4gTjsgTGljZW5zZWQgTUlUICovXFxuLyoqIC8hISEgY29yZSBjc3MgU2hvdWxkIG5vdCBlZGl0ICEhIS8qKi9cXG4ubFNTbGlkZU91dGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuLmxpZ2h0U2xpZGVyOmJlZm9yZSxcXG4ubGlnaHRTbGlkZXI6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgZGlzcGxheTogdGFibGU7IH1cXG5cXG4ubGlnaHRTbGlkZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbjogMDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyID4gLmxpZ2h0U2xpZGVyOmFmdGVyIHtcXG4gIGNsZWFyOiBib3RoOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU1NsaWRlIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDFzO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OiAtd2Via2l0LXRyYW5zZm9ybSwgaGVpZ2h0O1xcbiAgLW1vei10cmFuc2l0aW9uLXByb3BlcnR5OiAtbW96LXRyYW5zZm9ybSwgaGVpZ2h0O1xcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtLCBoZWlnaHQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tZHVyYXRpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIgLmxTRmFkZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIgLmxTRmFkZSA+ICoge1xcbiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogOTtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyLnVzaW5nQ3NzIC5sU0ZhZGUgPiAqIHtcXG4gIG9wYWNpdHk6IDA7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6IDBzO1xcbiAgdHJhbnNpdGlvbi1kZWxheTogMHM7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tZHVyYXRpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogb3BhY2l0eTtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IG9wYWNpdHk7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50OyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU0ZhZGUgPiAqLmFjdGl2ZSB7XFxuICB6LWluZGV4OiAxMDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlci51c2luZ0NzcyAubFNGYWRlID4gKi5hY3RpdmUge1xcbiAgb3BhY2l0eTogMTsgfVxcblxcbi8qKiAvISEhIEVuZCBvZiBjb3JlIGNzcyBTaG91bGQgbm90IGVkaXQgISEhLyoqL1xcbi8qIFBhZ2VyICovXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnIHtcXG4gIG1hcmdpbjogMTBweCAwIDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGkge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZzogMCA1cHg7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTcGcgPiBsaSBhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIyMjI7XFxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgaGVpZ2h0OiA4cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgdGV4dC1pbmRlbnQ6IC05OTllbTtcXG4gIHdpZHRoOiA4cHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB6LWluZGV4OiA5OTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuNXMgbGluZWFyIDBzO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgbGluZWFyIDBzOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGk6aG92ZXIgYSxcXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTcGcgPiBsaS5hY3RpdmUgYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI4YmNhOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubWVkaWEge1xcbiAgb3BhY2l0eTogMC44OyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubWVkaWEuYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG4vKiBFbmQgb2YgcGFnZXIgKi9cXG4vKiogR2FsbGVyeSAqL1xcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmUgb3V0c2lkZSBub25lO1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcXG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IC13ZWJraXQtdHJhbnNmb3JtO1xcbiAgLW1vei10cmFuc2l0aW9uLXByb3BlcnR5OiAtbW96LXRyYW5zZm9ybTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeSBsaSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBib3JkZXItcmFkaXVzIDAuMTJzIGxpbmVhciAwcyAwLjM1cyBsaW5lYXIgMHM7XFxuICB0cmFuc2l0aW9uOiBib3JkZXItcmFkaXVzIDAuMTJzIGxpbmVhciAwcyAwLjM1cyBsaW5lYXIgMHM7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeSBsaS5hY3RpdmUsXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgbGk6aG92ZXIge1xcbiAgYm9yZGVyLXJhZGl1czogNXB4OyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgaW1nIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbWF4LXdpZHRoOiAxMDAlOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnk6YmVmb3JlLFxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnk6YWZ0ZXIge1xcbiAgY2xlYXI6IGJvdGg7IH1cXG5cXG4vKiBFbmQgb2YgR2FsbGVyeSovXFxuLyogc2xpZGVyIGFjdGlvbnMgKi9cXG4ubFNBY3Rpb24gPiBhIHtcXG4gIHdpZHRoOiAzMnB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB0b3A6IDUwJTtcXG4gIGhlaWdodDogMzJweDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiL2Fzc2V0cy9jb250cm9scy5wbmdcXFwiKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDk5O1xcbiAgbWFyZ2luLXRvcDogLTE2cHg7XFxuICBvcGFjaXR5OiAwLjU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC4zNXMgbGluZWFyIDBzO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjM1cyBsaW5lYXIgMHM7IH1cXG5cXG4ubFNBY3Rpb24gPiBhOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG4ubFNBY3Rpb24gPiAubFNQcmV2IHtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gIGxlZnQ6IDEwcHg7IH1cXG5cXG4ubFNBY3Rpb24gPiAubFNOZXh0IHtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IC0zMnB4IDA7XFxuICByaWdodDogMTBweDsgfVxcblxcbi5sU0FjdGlvbiA+IGEuZGlzYWJsZWQge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cXG5cXG4uY1MtaGlkZGVuIHtcXG4gIGhlaWdodDogMXB4O1xcbiAgb3BhY2l0eTogMDtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT0wKTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4vKiB2ZXJ0aWNhbCAqL1xcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbC5ub1BhZ2VyIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDBweCAhaW1wb3J0YW50OyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubFNHYWxsZXJ5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5saWdodFNsaWRlciA+ICoge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIG1heC13aWR0aDogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLyogdmVydGljYWwgY29udHJvbGxzICovXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubFNBY3Rpb24gPiBhIHtcXG4gIGxlZnQ6IDUwJTtcXG4gIG1hcmdpbi1sZWZ0OiAtMTRweDtcXG4gIG1hcmdpbi10b3A6IDA7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sU0FjdGlvbiA+IC5sU05leHQge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMzFweCAtMzFweDtcXG4gIGJvdHRvbTogMTBweDtcXG4gIHRvcDogYXV0bzsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxTQWN0aW9uID4gLmxTUHJldiB7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIC0zMXB4O1xcbiAgYm90dG9tOiBhdXRvO1xcbiAgdG9wOiAxMHB4OyB9XFxuXFxuLyogdmVydGljYWwgKi9cXG4vKiBSdGwgKi9cXG4ubFNTbGlkZU91dGVyLmxTcnRsIHtcXG4gIGRpcmVjdGlvbjogcnRsOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubGlnaHRTbGlkZXIsXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlciB7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBsaXN0LXN0eWxlOiBub25lIG91dHNpZGUgbm9uZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxpZ2h0U2xpZGVyLFxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxTUGFnZXIge1xcbiAgcGFkZGluZy1yaWdodDogMDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxpZ2h0U2xpZGVyID4gKixcXG4ubFNTbGlkZU91dGVyIC5sU0dhbGxlcnkgbGkge1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5saWdodFNsaWRlciA+ICosXFxuLmxTU2xpZGVPdXRlci5sU3J0bCAubFNHYWxsZXJ5IGxpIHtcXG4gIGZsb2F0OiByaWdodCAhaW1wb3J0YW50OyB9XFxuXFxuLyogUnRsICovXFxuQC13ZWJraXQta2V5ZnJhbWVzIHJpZ2h0RW5kIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDsgfVxcbiAgNTAlIHtcXG4gICAgbGVmdDogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHJpZ2h0RW5kIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDsgfVxcbiAgNTAlIHtcXG4gICAgbGVmdDogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAwOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgdG9wRW5kIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAwOyB9XFxuICA1MCUge1xcbiAgICB0b3A6IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHRvcEVuZCB7XFxuICAwJSB7XFxuICAgIHRvcDogMDsgfVxcbiAgNTAlIHtcXG4gICAgdG9wOiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIHRvcDogMDsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGxlZnRFbmQge1xcbiAgMCUge1xcbiAgICBsZWZ0OiAwOyB9XFxuICA1MCUge1xcbiAgICBsZWZ0OiAxNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBsZWZ0RW5kIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDsgfVxcbiAgNTAlIHtcXG4gICAgbGVmdDogMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGxlZnQ6IDA7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBib3R0b21FbmQge1xcbiAgMCUge1xcbiAgICBib3R0b206IDA7IH1cXG4gIDUwJSB7XFxuICAgIGJvdHRvbTogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBib3R0b206IDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgYm90dG9tRW5kIHtcXG4gIDAlIHtcXG4gICAgYm90dG9tOiAwOyB9XFxuICA1MCUge1xcbiAgICBib3R0b206IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgYm90dG9tOiAwOyB9IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5yaWdodEVuZCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogcmlnaHRFbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogcmlnaHRFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxlZnRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGxlZnRFbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogbGVmdEVuZCAwLjNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAucmlnaHRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHRvcEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiB0b3BFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxlZnRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGJvdHRvbUVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiBib3R0b21FbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLnJpZ2h0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBsZWZ0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IGxlZnRFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxlZnRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4vKi8gIEdSYWIgY3Vyc29yICovXFxuLmxpZ2h0U2xpZGVyLmxzR3JhYiA+ICoge1xcbiAgY3Vyc29yOiAtd2Via2l0LWdyYWI7XFxuICBjdXJzb3I6IC1tb3otZ3JhYjtcXG4gIGN1cnNvcjogLW8tZ3JhYjtcXG4gIGN1cnNvcjogLW1zLWdyYWI7XFxuICBjdXJzb3I6IGdyYWI7IH1cXG5cXG4ubGlnaHRTbGlkZXIubHNHcmFiYmluZyA+ICoge1xcbiAgY3Vyc29yOiBtb3ZlO1xcbiAgY3Vyc29yOiAtd2Via2l0LWdyYWJiaW5nO1xcbiAgY3Vyc29yOiAtbW96LWdyYWJiaW5nO1xcbiAgY3Vyc29yOiAtby1ncmFiYmluZztcXG4gIGN1cnNvcjogLW1zLWdyYWJiaW5nO1xcbiAgY3Vyc29yOiBncmFiYmluZzsgfVxcblxcbi8qIFRpbnkgQ2Fyb3VzZWwgKi9cXG4vKiBzbGlkZXJOZXcgKi9cXG4jc2xpZGVyTmV3IHtcXG4gIG1hcmdpbjogMCAwIDIwcHg7IH1cXG5cXG4jc2xpZGVyTmV3IC52aWV3cG9ydCB7XFxuICB3aWR0aDogMjQwcHg7XFxuICBoZWlnaHQ6IDEyNXB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuI3NsaWRlck5ldyAuYnVsbGV0cyB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIGNsZWFyOiBib3RoO1xcbiAgbWFyZ2luOiAwIDAgMCA0NXB4OyB9XFxuXFxuI3NsaWRlck5ldyAuYnVsbGV0cyBsaSB7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgY29sb3I6ICM1NTU1NTU7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuI3NsaWRlck5ldyAuYnVsbGV0LmFjdGl2ZSB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NTU1NTU7IH1cXG5cXG4jc2xpZGVyTmV3IC5idXR0b25zIHtcXG4gIGJhY2tncm91bmQ6ICNDMDEzMTM7XFxuICBib3JkZXItcmFkaXVzOiAzNXB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW46IDMwcHggMTBweCAwIDA7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAzNXB4O1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiAzNXB4O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZm9udC1zaXplOiAyMnB4OyB9XFxuXFxuI3NsaWRlck5ldyAubmV4dCB7XFxuICBtYXJnaW46IDMwcHggMCAwIDEwcHg7IH1cXG5cXG4jc2xpZGVyTmV3IC5idXR0b25zOmhvdmVyIHtcXG4gIGNvbG9yOiAjQzAxMzEzO1xcbiAgYmFja2dyb3VuZDogI2ZmZjsgfVxcblxcbiNzbGlkZXJOZXcgLmRpc2FibGUge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuOyB9XFxuXFxuI3NsaWRlck5ldyAub3ZlcnZpZXcge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7IH1cXG5cXG4jc2xpZGVyTmV3IC5vdmVydmlldyBsaSB7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbjogMCAyMHB4IDAgMDtcXG4gIHBhZGRpbmc6IDFweDtcXG4gIGhlaWdodDogMTIxcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2RjO1xcbiAgd2lkdGg6IDIzNnB4OyB9XFxuXFxuY2UtY2hlY2tib3gge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcblxcbmNlLWxhYmVsIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IDhweDsgfVxcblxcbmNlLWFjY29yZGlvbi1oZWFkaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7IH1cXG5cXG5jZS1hY2NvcmRpb24taGVhZGluZyArIGNlLWFjY29yZGlvbi1oZWFkaW5nIHtcXG4gIGJvcmRlci10b3A6IG5vbmU7IH1cXG5cXG5jZS1hY2NvcmRpb24taGVhZGluZ1tleHBhbmRlZF0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlOyB9XFxuXFxuY2UtYWNjb3JkaW9uLXBhbmVsIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7IH1cXG5cXG5jZS10YWIge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBwYWRkaW5nOiAyMHB4OyB9XFxuXFxuY2UtdGFiLXBhbmVsIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7IH1cXG5cXG5jZS10YWJbc2VsZWN0ZWRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTsgfVxcblxcbmNlLXRhYnM6bm90KDpkZWZpbmVkKSxcXG5jZS10YWI6bm90KDpkZWZpbmVkKSxcXG5jZS10YWItcGFuZWw6bm90KDpkZWZpbmVkKSB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmNlLXRvZ2dsZS1idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gIHBhZGRpbmc6IDNweDtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjJzIGVhc2U7IH1cXG5cXG5jZS10b2dnbGUtYnV0dG9uW3ByZXNzZWRdLFxcbmNlLXRvZ2dsZS1idXR0b246bm90KFtkaXNhYmxlZF0pOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OyB9XFxuXFxuY2UtdG9nZ2xlLWJ1dHRvbltkaXNhYmxlZF0ge1xcbiAgb3BhY2l0eTogMC4zNTsgfVxcblxcbmh0bWwsIGJvZHkge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDsgfVxcbiAgaHRtbCAqLCBib2R5ICoge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuLnVpLWRlbW8ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG4gIC51aS1kZW1vIC5zaWRlbmF2IHtcXG4gICAgZmxleC1iYXNpczogMzAwcHg7XFxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTsgfVxcbiAgLnVpLWRlbW8gLmNvbnRlbnQge1xcbiAgICBmbGV4OiAxO1xcbiAgICBib3JkZXItbGVmdDogbm9uZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDIwcHg7IH1cXG5cXG51aS1yb3V0ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi51aS1lbGVtZW50cyB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgYmFja2dyb3VuZDogI2ZhZmFmYTsgfVxcbiAgLnVpLWVsZW1lbnRzX19pdGVtIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XFxuICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjNzIGxpbmVhcjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICAgIC51aS1lbGVtZW50c19faXRlbSBhIHtcXG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiAxMDAlOyB9XFxuICAgIC51aS1lbGVtZW50c19faXRlbTpob3ZlciB7XFxuICAgICAgYm94LXNoYWRvdzogMHB4IDFweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZmOyB9XFxuICAgICAgLnVpLWVsZW1lbnRzX19pdGVtOmhvdmVyOmJlZm9yZSB7XFxuICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogMDtcXG4gICAgICAgIGJvdHRvbTogMDtcXG4gICAgICAgIGxlZnQ6IDA7XFxuICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICB3aWR0aDogNXB4O1xcbiAgICAgICAgYmFja2dyb3VuZDogIzJmNjJhMzsgfVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiW2NlLXRyZWVdIHtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsgfVxcblxcblthcmlhLWV4cGFuZGVkPVxcXCJ0cnVlXFxcIl0gPiBbY2UtdHJlZV0ge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5bYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiXSA+IFtjZS10cmVlXSB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmNlLXRyZWUtZm9sZGVyID4gLmNlLXRyZWUtaWNvbjpub3QoW2RhdGEtdHlwZT1cXFwiZmlsZVxcXCJdKSB7XFxuICBoZWlnaHQ6IDA7XFxuICB3aWR0aDogMDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDVweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgIzMzMztcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjFzIGVhc2UtaW4tb3V0OyB9XFxuXFxuLmNlLXRyZWUtZm9sZGVyW2FyaWEtZXhwYW5kZWQ9XFxcInRydWVcXFwiXSA+IC5jZS10cmVlLWljb24ge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogMjUlIDUwJTsgfVxcblxcbi5jZS10cmVlLWZpbGUgPiAuY2UtdHJlZS1pY29uLCAuY2UtdHJlZS1mb2xkZXIuY2UtdHJlZS1maWxlW2FyaWEtZXhwYW5kZWQ9XFxcInRydWVcXFwiXSA+IC5jZS10cmVlLWljb24sIC5jZS10cmVlLWZvbGRlci5jZS10cmVlLWZpbGVbYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiXSA+IC5jZS10cmVlLWljb24ge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5jZS10cmVlLWZpbGUsXFxuLmNlLXRyZWUtZm9sZGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLmNlLXRyZWUtZmlsZTo6YmVmb3JlLFxcbiAgLmNlLXRyZWUtZm9sZGVyOjpiZWZvcmUge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogOXB4O1xcbiAgICBsZWZ0OiAtMTRweDtcXG4gICAgd2lkdGg6IDEzcHg7XFxuICAgIGhlaWdodDogMDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IGRvdHRlZCAjNjdiMmRkO1xcbiAgICB6LWluZGV4OiAxOyB9XFxuXFxuLmNlLXRyZWUtY29udGVudCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nLWxlZnQ6IDE2cHg7IH1cXG4gIC5jZS10cmVlLWNvbnRlbnQ6OmJlZm9yZSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgei1pbmRleDogMTtcXG4gICAgdG9wOiAtOXB4O1xcbiAgICBib3R0b206IDE2cHg7XFxuICAgIGxlZnQ6IDJweDtcXG4gICAgYm9yZGVyOiAxcHggZG90dGVkICM2N2IyZGQ7XFxuICAgIGJvcmRlci13aWR0aDogMCAwIDAgMXB4O1xcbiAgICBoZWlnaHQ6IDEwMCU7IH1cXG5cXG4uY2UtdHJlZS1jb250ZW50OmZpcnN0LWNoaWxkOjpiZWZvcmUge1xcbiAgYm9yZGVyOiBub25lOyB9XFxuXFxuLmNlLXRyZWUtY29udGVudDpmaXJzdC1jaGlsZCA+IC5jZS10cmVlLWZvbGRlcjpmaXJzdC1jaGlsZCB7XFxuICBib3JkZXI6IG5vbmU7IH1cXG5cXG4uc291cmNlLXZpZXcgW2NsYXNzXj1cXFwiY29sLW1kLVxcXCJdIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcXG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAxMzBweCk7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxMzBweCk7IH1cXG4gIC5zb3VyY2UtdmlldyBbY2xhc3NePVxcXCJjb2wtbWQtXFxcIl0gcHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0ge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgIGJvcmRlcjogbm9uZTsgfVxcblxcbi5zb3VyY2UtdmlldyBbY2xhc3NePVxcXCJjb2wtbWQtXFxcIl0gKyBbY2xhc3NePVxcXCJjb2wtbWQtXFxcIl0ge1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7IH1cXG5cXG4uc291cmNlLXRyZWUsXFxuLnNvdXJjZS1zbmlwcGV0cyB7XFxuICBvdmVyZmxvdzogYXV0bzsgfVxcblwiLCBcIlwiXSk7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiAnQG1lZGlhICcgKyBpdGVtWzJdICsgJ3snICsgY29udGVudCArICd9JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSAnKCcgKyBpdGVtWzJdICsgJykgYW5kICgnICsgbWVkaWFRdWVyeSArICcpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJztcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcbiAgcmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn0iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJcbmNvbnN0IEFDQ09SRElPTl9IRUFERVIgPSAnY2UtYWNjb3JkaW9uLWhlYWRpbmcnO1xuY29uc3QgQUNDT1JESU9OX1BBTkVMID0gJ2NlLWFjY29yZGlvbi1wYW5lbCc7XG5cbmNvbnN0IEtFWUNPREUgPSB7XG4gIERPV046IDQwLFxuICBMRUZUOiAzNyxcbiAgUklHSFQ6IDM5LFxuICBVUDogMzgsXG4gIEhPTUU6IDM2LFxuICBFTkQ6IDM1LFxufTtcblxuY29uc3QgYWNjb3JkaW9uVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuYWNjb3JkaW9uVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICB9XG4gICAgOjpzbG90dGVkKC5hbmltYXRpbmcpIHtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0O1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlQWNjb3JkaW9uIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChhY2NvcmRpb25UZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5fb25DaGFuZ2UpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZChBQ0NPUkRJT05fSEVBREVSKSxcbiAgICAgIGN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKEFDQ09SRElPTl9QQU5FTCksXG4gICAgXSlcbiAgICAgIC50aGVuKF8gPT4ge1xuXG4gICAgICAgIGNvbnN0IGhlYWRpbmdzID0gdGhpcy5fYWxsSGVhZGluZ3MoKTtcblxuICAgICAgICBoZWFkaW5ncy5mb3JFYWNoKGhlYWRpbmcgPT4ge1xuICAgICAgICAgIGhlYWRpbmcuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKTtcblxuICAgICAgICAgIGhlYWRpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgcGFuZWwuaWQpO1xuICAgICAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgaGVhZGluZy5pZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhlYWRpbmdzWzBdLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcblxuICAgICAgICBoZWFkaW5nc1xuICAgICAgICAgIC5mb3JFYWNoKGhlYWRpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLl9wYW5lbEZvckhlYWRpbmcoaGVhZGluZyk7XG4gICAgICAgICAgICBpZiAoIWhlYWRpbmcuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fY29sbGFwc2VIZWFkaW5nKGhlYWRpbmcpO1xuICAgICAgICAgICAgICB0aGlzLl9jb2xsYXBzZVBhbmVsKHBhbmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2V4cGFuZEhlYWRpbmcoaGVhZGluZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2V4cGFuZFBhbmVsKHBhbmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZSk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgfVxuXG4gIF9pc0hlYWRpbmcoZWxlbSkge1xuICAgIHJldHVybiBlbGVtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gQUNDT1JESU9OX0hFQURFUjtcbiAgfVxuXG4gIF9vbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMuX2FuaW1hdGVQYW5lbEZvckhlYWRpbmcoZXZlbnQudGFyZ2V0LCBldmVudC5kZXRhaWwuaXNFeHBhbmRlZE5vdyk7XG4gIH1cblxuICBfYW5pbWF0ZVBhbmVsRm9ySGVhZGluZyhoZWFkaW5nLCBleHBhbmQpIHtcbiBcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW1hdGluZycpKSByZXR1cm47XG5cbiAgICBjb25zdCBwYW5lbCA9IHRoaXMuX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKTtcbiAgICBpZiAoZXhwYW5kKSB7XG4gICAgICB0aGlzLl9leHBhbmRQYW5lbChwYW5lbCk7XG4gICAgICB0aGlzLl9hbmltYXRlSW4ocGFuZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hbmltYXRlT3V0KHBhbmVsKVxuICAgICAgICAudGhlbihfID0+IHRoaXMuX2NvbGxhcHNlUGFuZWwocGFuZWwpKTtcbiAgICB9XG4gIH1cblxuICBfb25LZXlEb3duKGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudEhlYWRpbmcgPSBldmVudC50YXJnZXQ7XG5cbiAgICBpZiAoIXRoaXMuX2lzSGVhZGluZyhjdXJyZW50SGVhZGluZykpIHJldHVybjtcblxuICAgIGlmIChldmVudC5hbHRLZXkpIHJldHVybjtcblxuICAgIGxldCBuZXdIZWFkaW5nO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLkxFRlQ6XG4gICAgICBjYXNlIEtFWUNPREUuVVA6XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9wcmV2SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLlJJR0hUOlxuICAgICAgY2FzZSBLRVlDT0RFLkRPV046XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9uZXh0SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkhPTUU6XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9maXJzdEhlYWRpbmcoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5FTkQ6XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9sYXN0SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY3VycmVudEhlYWRpbmcuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICBuZXdIZWFkaW5nLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICBuZXdIZWFkaW5nLmZvY3VzKCk7XG4gIH1cblxuICBfYWxsUGFuZWxzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbChBQ0NPUkRJT05fUEFORUwpKTtcbiAgfVxuXG4gIF9hbGxIZWFkaW5ncygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoQUNDT1JESU9OX0hFQURFUikpO1xuICB9XG5cbiAgX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKSB7XG4gICAgY29uc3QgbmV4dCA9IGhlYWRpbmcubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIGlmIChuZXh0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gQUNDT1JESU9OX1BBTkVMKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdTaWJsaW5nIGVsZW1lbnQgdG8gYSBoZWFkaW5nIG5lZWQgdG8gYmUgYSBwYW5lbC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICBfcHJldkhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuXG4gICAgbGV0IG5ld0lkeCA9IGhlYWRpbmdzLmZpbmRJbmRleChoZWFkaW5ncyA9PiBcbiAgICAgICAgaGVhZGluZ3MgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIC0gMTtcblxuICAgIHJldHVybiBoZWFkaW5nc1sobmV3SWR4ICsgaGVhZGluZ3MubGVuZ3RoKSAlIGhlYWRpbmdzLmxlbmd0aF07XG4gIH1cblxuICBfbmV4dEhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuICAgIGxldCBuZXdJZHggPSBoZWFkaW5ncy5maW5kSW5kZXgoaGVhZGluZyA9PlxuICAgICAgICBoZWFkaW5nID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSArIDE7XG5cbiAgICByZXR1cm4gaGVhZGluZ3NbbmV3SWR4ICUgaGVhZGluZ3MubGVuZ3RoXTtcbiAgfVxuXG4gIF9maXJzdEhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuICAgIHJldHVybiBoZWFkaW5nc1swXTtcbiAgfVxuXG4gIF9sYXN0SGVhZGluZygpIHtcbiAgICBjb25zdCBoZWFkaW5ncyA9IHRoaXMuX2FsbEhlYWRpbmdzKCk7XG4gICAgcmV0dXJuIGhlYWRpbmdzW2hlYWRpbmdzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgX2V4cGFuZFBhbmVsKHBhbmVsKSB7XG4gICAgcGFuZWwuZXhwYW5kZWQgPSB0cnVlO1xuICB9XG5cbiAgX2NvbGxhcHNlUGFuZWwocGFuZWwpIHtcbiAgICBwYW5lbC5leHBhbmRlZCA9IGZhbHNlO1xuICB9XG5cbiAgX2V4cGFuZEhlYWRpbmcoaGVhZGluZykge1xuICAgIGhlYWRpbmcuZXhwYW5kZWQgPSB0cnVlO1xuICB9XG5cbiAgX2NvbGxhcHNlSGVhZGluZyhoZWFkaW5nKSB7XG4gICAgaGVhZGluZy5leHBhbmRlZCA9IGZhbHNlO1xuICB9XG5cbiAgX2FuaW1hdGVJbihwYW5lbCkge1xuICAgIGNvbnN0IGhlaWdodCA9IHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZShwYW5lbCwgLWhlaWdodCwgMCk7XG4gIH1cblxuICBfYW5pbWF0ZU91dChwYW5lbCkge1xuICAgIGNvbnN0IGhlaWdodCA9IHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZShwYW5lbCwgMCwgLWhlaWdodCk7XG4gIH1cblxuICBfYW5pbWF0ZShwYW5lbCwgc3RhcnRPZmZzZXQsIGVuZE9mZnNldCkge1xuXG4gICAgaWYgKHN0YXJ0T2Zmc2V0ID09PSBlbmRPZmZzZXQpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGluZycpO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pO1xuXG4gICAgY29uc3QgaWR4ID0gY2hpbGRyZW4uaW5kZXhPZihwYW5lbCk7XG5cbiAgICBjb25zdCBhbmltYXRlZENoaWxkcmVuID0gY2hpbGRyZW4uc2xpY2UoaWR4KTtcbiAgICB0aGlzLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGNoaWxkLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgIGNoaWxkLnN0eWxlLnpJbmRleCA9IDI7XG4gICAgfSk7XG5cbiAgICBhbmltYXRlZENoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgY2hpbGQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgY2hpbGQuc3R5bGUuekluZGV4ID0gMTtcbiAgICAgIGNoaWxkLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7c3RhcnRPZmZzZXR9cHgpYDtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcm9taXNlKClcbiAgICAgIC50aGVuKF8gPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJvbWlzZSgpKVxuICAgICAgLnRoZW4oXyA9PiB7XG4gICAgICAgIGFuaW1hdGVkQ2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgY2hpbGQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtlbmRPZmZzZXR9cHgpYDtcbiAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKCdhbmltYXRpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25FbmRQcm9taXNlKHBhbmVsKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihfID0+IHtcbiAgICAgICAgYW5pbWF0ZWRDaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICBjaGlsZC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpbmcnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgIGNoaWxkLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgICAgICAgY2hpbGQuc3R5bGUuekluZGV4ID0gJyc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW5nJyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5sZXQgaGVhZGluZ0lkQ291bnRlciA9IDA7XG5cbmNvbnN0IGFjY29yZGlvbkhlYWRpbmdUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5hY2NvcmRpb25IZWFkaW5nVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgY29udGFpbjogY29udGVudDtcbiAgICB9XG4gICAgYnV0dG9uIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogaW5pdGlhbDtcbiAgICAgIGJvcmRlcjogaW5pdGlhbDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgcGFkZGluZzogMTBweDsgXG4gICAgfVxuICA8L3N0eWxlPlxuICA8YnV0dG9uPjxzbG90Pjwvc2xvdD48L2J1dHRvbj5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZUFjY29yZGlvbkhlYWRpbmcgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2V4cGFuZGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fb25DbGljayA9IHRoaXMuX29uQ2xpY2suYmluZCh0aGlzKTtcblxuICAgIHRoaXMuYXR0YWNoU2hhZG93KHtcbiAgICAgIG1vZGU6ICdvcGVuJyxcbiAgICAgIGRlbGVnYXRlc0ZvY3VzOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChcbiAgICAgIGFjY29yZGlvbkhlYWRpbmdUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxuICAgICk7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdoZWFkaW5nJyk7XG4gICAgICBcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYCR7QUNDT1JESU9OX0hFQURFUn0tZ2VuZXJhdGVkLSR7aGVhZGluZ0lkQ291bnRlcisrfWA7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ2V4cGFuZGVkJyk7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHZhbHVlKTtcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2V4cGFuZGVkJyk7XG4gIH1cblxuICBzZXQgZXhwYW5kZWQodmFsdWUpIHtcbiAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmICh2YWx1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdleHBhbmRlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZXhwYW5kZWQnKTtcbiAgfVxuXG4gIF9vbkNsaWNrKCkge1xuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHtcbiAgICAgICAgZGV0YWlsOiB7IGlzRXhwYW5kZWROb3c6IHRoaXMuZXhwYW5kZWQgfSxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBhY2NvcmRpb25QYW5lbFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbmFjY29yZGlvblBhbmVsVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3QoOm5vdChbZXhwYW5kZWRdKSkge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmxldCBwYW5lbElkQ291bnRlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDZUFjY29yZGlvblBhbmVsIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChcbiAgICAgIGFjY29yZGlvblBhbmVsVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcbiAgICApO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYCR7QUNDT1JESU9OX1BBTkVMfS1nZW5lcmF0ZWQtJHtwYW5lbElkQ291bnRlcisrfWA7XG4gIH1cblxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdleHBhbmRlZCcpO1xuICB9XG5cbiAgc2V0IGV4cGFuZGVkKHZhbCkge1xuICAgIGNvbnN0IHZhbHVlID0gQm9vbGVhbih2YWwpO1xuICAgIGlmICh2YWx1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdleHBhbmRlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZXhwYW5kZWQnKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25FbmRQcm9taXNlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIGYoKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2UoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNvbHZlKSk7XG59IiwiXG5cbmltcG9ydCBzdHlsZSBmcm9tICcuL2J1dHRvbi5zY3NzJztcblxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBzdGF0aWMgZ2V0IGlzICgpIHtcbiAgICByZXR1cm4gJ2NlLWJ1dHRvbic7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcyAoKSB7XG4gICAgcmV0dXJuIFsnZGlzYWJsZWQnLCAndGFiaW5kZXgnLCAnYXV0b2ZvY3VzJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUoKTtcbiAgfVxuXG4gIHRlbXBsYXRlICgpIHtcbiAgICByZXR1cm4gKGBcbiAgICAgIDxzdHlsZT4ke3N0eWxlfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzPVwidmFhZGluLWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBwYXJ0PVwicHJlZml4XCI+XG4gICAgICAgICAgPHNsb3QgbmFtZT1cInByZWZpeFwiPjwvc2xvdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgcGFydD1cImxhYmVsXCI+XG4gICAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBwYXJ0PVwic3VmZml4XCI+XG4gICAgICAgICAgPHNsb3QgbmFtZT1cInN1ZmZpeFwiPjwvc2xvdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gaWQ9XCJidXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+QnV0dG9uPC9idXR0b24+YFxuICAgICk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjayAoKSB7XG4gICAgY29uc29sZS5sb2coJ3N0eWxlOiAnLCBzdHlsZSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCBlID0+IHtcbiAgICAgIGlmIChlLmNvbXBvc2VkUGF0aCgpWzBdID09PSB0aGlzKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzKGUpO1xuICAgICAgfSBlbHNlIGlmIChlLmNvbXBvc2VkUGF0aCgpLmluZGV4T2YodGhpcy5mb2N1c0VsZW1lbnQpICE9PSAtMSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICB0aGlzLl9zZXRGb2N1c2VkKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBlID0+IHRoaXMuX3NldEZvY3VzZWQoZmFsc2UpKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrICgpIHtcblxuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIChhdHRyTmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgXG4gIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQnV0dG9uLmlzLCBCdXR0b24pOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9idXR0b24uc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vYnV0dG9uLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9idXR0b24uc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIlxuLy8gY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi9jZS1jaGVja2JveC5zY3NzJyk7XG5cbmNvbnN0IEtFWUNPREUgPSB7XG4gIFNQQUNFOiAzMixcbn07XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgICA8c3R5bGU+XG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKCdhc3NldHMvY2hlY2tib3gvdW5jaGVja2VkLWNoZWNrYm94LnN2ZycpIG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgfVxuICAgICAgOmhvc3QoW2hpZGRlbl0pIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICAgIDpob3N0KFtjaGVja2VkXSkge1xuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoJ2Fzc2V0cy9jaGVja2JveC9jaGVja2VkLWNoZWNrYm94LnN2ZycpIG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgfVxuICAgICAgOmhvc3QoW2Rpc2FibGVkXSkge1xuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoJ2Fzc2V0cy9jaGVja2JveC91bmNoZWNrZWQtY2hlY2tib3gtZGlzYWJsZWQuc3ZnJykgbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICB9XG4gICAgICA6aG9zdChbY2hlY2tlZF1bZGlzYWJsZWRdKSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgnYXNzZXRzL2NoZWNrYm94L2NoZWNrZWQtY2hlY2tib3gtZGlzYWJsZWQuc3ZnJykgbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICB9ICAgICAgXG4gICAgPC9zdHlsZT5cbiAgYDtcblxuLy8gSElERVxuLy8gU2hhZHlDU1Mgd2lsbCByZW5hbWUgY2xhc3NlcyBhcyBuZWVkZWQgdG8gZW5zdXJlIHN0eWxlIHNjb3BpbmcuXG4vLyBTaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGUodGVtcGxhdGUsICdob3d0by1jaGVja2JveCcpO1xuLy8gL0hJREVcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VDaGVja2JveCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnY2hlY2tlZCcsICdkaXNhYmxlZCddO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdjaGVja2JveCcpO1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcblxuICAgIHRoaXMuX3VwZ3JhZGVQcm9wZXJ0eSgnY2hlY2tlZCcpO1xuICAgIHRoaXMuX3VwZ3JhZGVQcm9wZXJ0eSgnZGlzYWJsZWQnKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9vbktleVVwKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBfdXBncmFkZVByb3BlcnR5KHByb3ApIHtcbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgbGV0IHZhbHVlID0gdGhpc1twcm9wXTtcbiAgICAgIGRlbGV0ZSB0aGlzW3Byb3BdO1xuICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9vbktleVVwKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBzZXQgY2hlY2tlZCh2YWx1ZSkge1xuICAgIGNvbnN0IGlzQ2hlY2tlZCA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmIChpc0NoZWNrZWQpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICB9XG5cbiAgZ2V0IGNoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKGlzRGlzYWJsZWQpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGNvbnN0IGhhc1ZhbHVlID0gbmV3VmFsdWUgIT09IG51bGw7XG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdjaGVja2VkJzpcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtY2hlY2tlZCcsIGhhc1ZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgaGFzVmFsdWUpO1xuXG4gICAgICAgIGlmIChoYXNWYWx1ZSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgX29uS2V5VXAoZXZlbnQpIHtcblxuICAgIGlmIChldmVudC5hbHRLZXkpIHJldHVybjtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLlNQQUNFOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl90b2dnbGVDaGVja2VkKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIF9vbkNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5fdG9nZ2xlQ2hlY2tlZCgpO1xuICB9XG5cbiAgX3RvZ2dsZUNoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpXG4gICAgICByZXR1cm47XG4gICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjaGFuZ2UnLCB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgY2hlY2tlZDogdGhpcy5jaGVja2VkLFxuICAgICAgfSxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgfSkpO1xuICB9XG59XG4iLCJcblxuZXhwb3J0IGNsYXNzIFVpRXZlbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubmFtZSA9ICdSYWprZXNod2FyJztcbiAgICB0aGlzLmNpdHkgPSAnSHlkZXJhYmFkJztcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfID0+IHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gdGhpcy5fcmVuZGVyKCk7XG4gICAgICBjb25zb2xlLmxvZygnQ29uc3RydWN0b3IgZ2V0cyBjYWxsZWQnKTtcbiAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIF9yZW5kZXIgKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicGFyZW50XCI+XG4gICAgICAgIDxidXR0b24gQGNsaWNrPVwic2hvd05hbWVcIj5TaG93IE5hbWU8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93TmFtZVwiPkV2ZW50LCBOYW1lPC9idXR0b24+XG4gICAgICAgIDxzcGFuPiR7dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8YnV0dG9uIEBjbGljaz1cInNob3dDaXR5XCI+U2hvdyBDaXR5PC9idXR0b24+XG4gICAgICAgIDxoMz4ke3RoaXMuY2l0eX08L2gzPlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIHNob3dOYW1lIChldnQpIHtcbiAgICBjb25zb2xlLmxvZygnc2hvd05hbWU6ICcsIGV2dCk7XG4gICAgdGhpcy5uYW1lID0gZXZ0LnRhcmdldDtcbiAgfVxuXG4gIHNob3dDaXR5KGV2dCkge1xuICAgIGNvbnNvbGUubG9nKCdzaG93Q2l0eTogJywgZXZ0LnRhcmdldCk7XG4gICAgdGhpcy5jaXR5ID0gZXZ0LnRhcmdldDtcbiAgfVxuXG4gIF9hZGRFdmVudExpc3RlbmVycyAoKSB7XG4gICAgY29uc29sZS5sb2coJ2V2ZW50IGxpc3RlbmVycyBjYWxsZWQnKTtcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJyonKVxuICAgICAgLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgLmZpbHRlcihhdHRyID0+IC9eQC8udGVzdChhdHRyLm5hbWUpKVxuICAgICAgICAgIC5mb3JFYWNoKGF0dHIgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Rm4gPSBldmFsKHRoaXNbYXR0ci52YWx1ZV0pO1xuICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gYXR0ci5uYW1lLnJlcGxhY2UoL15ALywgJycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50TmFtZTogJywgZXZlbnROYW1lLCB0YXJnZXRGbik7XG5cbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldnQgPT4ge1xuICAgICAgICAgICAgICB0YXJnZXRGbi5hcHBseShlbCwgW2V2dF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gIH1cblxuICBfYmluZEV2ZW50cyAoKSB7XG4gICAgY29uc29sZS5sb2coYXR0ci5uYW1lLCBhdHRyLnZhbHVlKVxuICAgIGNvbnN0IGZ1bmN0aW9uQW5kUGFyYW1zID0gL14oW2EtekEtWl0rKVxcKCguKilcXCkvLmV4ZWMoYXR0ci52YWx1ZSk7XG4gICAgY29uc3QgZXZlbnROYW1lID0gYXR0ci5uYW1lLnJlcGxhY2UoL15ALywgJycpO1xuICAgIGNvbnN0IHRhcmdldEZuID0gZXZhbCh0aGlzW2Z1bmN0aW9uQW5kUGFyYW1zWzFdXSk7XG4gICAgY29uc3QgcGFyYW1zID0gZnVuY3Rpb25BbmRQYXJhbXNbMl0uc3BsaXQoLywvKTtcblxuICAgIGNvbnNvbGUubG9nKCdoZWxsby4uLi4uJywgZXZlbnROYW1lLCB0YXJnZXRGbiwgcGFyYW1zKTtcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnUnVubmluZyBjaGFuZ2UgZGV0ZWN0aW9uJyk7XG4gICAgICBpZihwYXJhbXNbMF0gPT09ICckZXZlbnQnKSB7XG4gICAgICAgIHRhcmdldEZuLmFwcGx5KGVsLCBbZXZ0LCAuLi5wYXJhbXNdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldEZuLmFwcGx5KGVsLCBbMSwgMl0pO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnVWlSb3V0ZXIgcm9ja3Mgbm93Jyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYXR0YWNoZWRDYWxsYmFjayBjYWxsZWQnKTtcbiAgfVxuXG59XG5cblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndWktZXZlbnQnLCBVaUV2ZW50KTsiLCIvKlxuICogQEF1dGhvcjogUmFqa2VzaHdhciBQcmFzYWQocmFqa2VzaHdhci5wZEBnbWFpbC5jb20pIFxuICogQERhdGU6IDIwMTktMDItMjMgMjM6MzA6MTEgXG4gKiBATGFzdCBNb2RpZmllZCBieTogUmFqa2VzaHdhciBQcmFzYWRcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTktMDMtMDIgMTk6Mjk6NDJcbiAqL1xuXG53aW5kb3cub25sb2FkID0gYmluZExpbmtzO1xuXG5cbmZ1bmN0aW9uIGJpbmRMaW5rcygpIHtcbiAgY29uc3QgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaHJlZl0nKTtcbiAgbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWphY2tMaW5rcykpIFxufVxuXG5mdW5jdGlvbiBoaWphY2tMaW5rcyhldnQpIHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHBhZ2UgPSBldnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gIF9sb2FkVmlldyhwYWdlKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRWaWV3IChwYWdlVXJsKSB7XG5cbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgeGhyLm9ubG9hZCA9IGV2dCA9PiB7XG4gICAgY29uc3QgbmV3RG9jID0gZXZ0LnRhcmdldC5yZXNwb25zZTtcbiAgICBjb25zdCByb3V0ZXJTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndWktcm91dGVyJyk7XG5cbiAgICByb3V0ZXJTbG90LmlubmVySFRNTCA9IG5ld0RvYztcbiAgICBcbiAgfTtcbiAgeGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgeGhyLm9wZW4oJ0dFVCcsIGBhcHAvJHtwYWdlVXJsfS9kZW1vLmh0bWxgKTtcbiAgeGhyLnNlbmQoKTtcbn0iLCJjb25zdCBLRVlDT0RFID0ge1xuICBET1dOOiA0MCxcbiAgTEVGVDogMzcsXG4gIFJJR0hUOiAzOSxcbiAgU1BBQ0U6IDMyLFxuICBVUDogMzgsXG4gIEhPTUU6IDM2LFxuICBFTkQ6IDM1LFxufTtcblxuY29uc3QgcmFkaW9CdXR0b25UZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5yYWRpb0J1dHRvblRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICB9XG4gIFxuICAgIDpob3N0KDpmb2N1cykge1xuICAgICAgb3V0bGluZTogMDtcbiAgICB9XG4gIFxuICAgIDpob3N0KDpmb2N1cyk6OmJlZm9yZSB7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMXB4IDJweCAjNUI5REQ5O1xuICAgIH1cbiAgXG4gICAgOmhvc3Q6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgd2lkdGg6IDEwcHg7XG4gICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGxlZnQ6IC0xOHB4O1xuICAgICAgdG9wOiAzcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgfVxuICBcbiAgICA6aG9zdChbYXJpYS1jaGVja2VkPVwidHJ1ZVwiXSk6OmJlZm9yZSB7XG4gICAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdD48L3Nsb3Q+XG5gO1xuXG5leHBvcnQgY2xhc3MgQ2VSYWRpb0J1dHRvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHJhZGlvQnV0dG9uVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdyYWRpbycpO1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gIH1cbn1cblxuY29uc3QgcmFkaW9Hcm91cFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnJhZGlvR3JvdXBUZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlUmFkaW9Hcm91cCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHJhZGlvR3JvdXBUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3JhZGlvZ3JvdXAnKTtcblxuICAgIGxldCBmaXJzdENoZWNrZWRCdXR0b24gPSB0aGlzLmNoZWNrZWRSYWRpb0J1dHRvbjtcbiAgICBpZiAoZmlyc3RDaGVja2VkQnV0dG9uKSB7XG4gICAgICB0aGlzLl91bmNoZWNrQWxsKCk7XG4gICAgICB0aGlzLl9jaGVja05vZGUoZmlyc3RDaGVja2VkQnV0dG9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGFzUm9sZVJhZGlvID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInJhZGlvXCJdJyk7XG4gICAgICBpZihoYXNSb2xlUmFkaW8pIFxuICAgICAgICBoYXNSb2xlUmFkaW8uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgIH1cblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBfb25LZXlEb3duKGUpIHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLlVQOlxuICAgICAgY2FzZSBLRVlDT0RFLkxFRlQ6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZFRvUHJldkJ1dHRvbigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkRPV046XG4gICAgICBjYXNlIEtFWUNPREUuUklHSFQ6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZFRvTmV4dEJ1dHRvbigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkhPTUU6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLmZpcnN0UmFkaW9CdXR0b24pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkVORDpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9zZXRDaGVja2VkKHRoaXMubGFzdFJhZGlvQnV0dG9uKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5TUEFDRTpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaG93dG8tcmFkaW8tYnV0dG9uJylcbiAgICAgICAgICB0aGlzLl9zZXRDaGVja2VkKGUudGFyZ2V0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaGVja2VkUmFkaW9CdXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW2FyaWEtY2hlY2tlZD1cInRydWVcIl0nKTtcbiAgfVxuXG4gIGdldCBmaXJzdFJhZGlvQnV0dG9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwicmFkaW9cIl06Zmlyc3Qtb2YtdHlwZScpO1xuICB9XG5cbiAgZ2V0IGxhc3RSYWRpb0J1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInJhZGlvXCJdOmxhc3Qtb2YtdHlwZScpO1xuICB9XG5cbiAgX3ByZXZSYWRpb0J1dHRvbihub2RlKSB7XG4gICAgbGV0IHByZXYgPSBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgd2hpbGUgKHByZXYpIHtcbiAgICAgIGlmIChwcmV2LmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAncmFkaW8nKSB7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfVxuICAgICAgcHJldiA9IHByZXYucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBfbmV4dFJhZGlvQnV0dG9uKG5vZGUpIHtcbiAgICBsZXQgbmV4dCA9IG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBpZiAobmV4dC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3JhZGlvJykge1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH1cbiAgICAgIG5leHQgPSBuZXh0Lm5leHRFbGVtZW50U2libGluZztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBfc2V0Q2hlY2tlZFRvUHJldkJ1dHRvbigpIHtcbiAgICBsZXQgY2hlY2tlZEJ1dHRvbiA9IHRoaXMuY2hlY2tlZFJhZGlvQnV0dG9uIHx8IHRoaXMuZmlyc3RSYWRpb0J1dHRvbjtcbiAgICBpZiAoY2hlY2tlZEJ1dHRvbiA9PT0gdGhpcy5maXJzdFJhZGlvQnV0dG9uKSB7XG4gICAgICB0aGlzLl9zZXRDaGVja2VkKHRoaXMubGFzdFJhZGlvQnV0dG9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLl9wcmV2UmFkaW9CdXR0b24oY2hlY2tlZEJ1dHRvbikpO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRDaGVja2VkVG9OZXh0QnV0dG9uKCkge1xuICAgIGxldCBjaGVja2VkQnV0dG9uID0gdGhpcy5jaGVja2VkUmFkaW9CdXR0b24gfHwgdGhpcy5maXJzdFJhZGlvQnV0dG9uO1xuICAgIGlmIChjaGVja2VkQnV0dG9uID09PSB0aGlzLmxhc3RSYWRpb0J1dHRvbikge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLmZpcnN0UmFkaW9CdXR0b24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRDaGVja2VkKHRoaXMuX25leHRSYWRpb0J1dHRvbihjaGVja2VkQnV0dG9uKSk7XG4gICAgfVxuICB9XG5cbiAgX3NldENoZWNrZWQobm9kZSkge1xuICAgIHRoaXMuX3VuY2hlY2tBbGwoKTtcbiAgICB0aGlzLl9jaGVja05vZGUobm9kZSk7XG4gICAgdGhpcy5fZm9jdXNOb2RlKG5vZGUpO1xuICB9XG5cbiAgX3VuY2hlY2tBbGwoKSB7XG4gICAgY29uc3QgcmFkaW9CdXR0b25zID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInJhZGlvXCJdJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWRpb0J1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidG4gPSByYWRpb0J1dHRvbnNbaV07XG4gICAgICBidG4uc2V0QXR0cmlidXRlKCdhcmlhLWNoZWNrZWQnLCAnZmFsc2UnKTtcbiAgICAgIGJ0bi50YWJJbmRleCA9IC0xO1xuICAgIH1cbiAgfVxuXG4gIF9jaGVja05vZGUobm9kZSkge1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWNoZWNrZWQnLCAndHJ1ZScpO1xuICAgIG5vZGUudGFiSW5kZXggPSAwO1xuICB9XG5cbiAgX2ZvY3VzTm9kZShub2RlKSB7XG4gICAgbm9kZS5mb2N1cygpO1xuICB9XG5cbiAgX29uQ2xpY2soZSkge1xuICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3JhZGlvJykge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZChlLnRhcmdldCk7XG4gICAgfVxuICB9XG59XG4iLCJcbmltcG9ydCBzdHlsZSBmcm9tICcuL3NsaWRlci5zY3NzJztcblxuZXhwb3J0IGNsYXNzIENlU2xpZGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgaXMoKSB7XG4gICAgcmV0dXJuICdjZS1zbGlkZXInO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnZGlzYWJsZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNsaWRlQ3VycmVudCA9IDA7XG4gICAgdGhpcy5zbGlkZXNUb3RhbCA9IDA7XG4gICAgdGhpcy5pbnRlcnZhbEFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgc3RhcnQ6IDAsXG4gICAgICBheGlzOiBcInhcIixcbiAgICAgIGJ1dHRvbnM6IHRydWUsXG4gICAgICBidWxsZXRzOiB0cnVlLFxuICAgICAgaW50ZXJ2YWw6IHRydWUsXG4gICAgICBpbnRlcnZhbFRpbWU6IDMwMDAsXG4gICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICBhbmltYXRpb25UaW1lOiAzMDAsXG4gICAgICBpbmZpbml0ZTogdHJ1ZVxuICAgIH07XG5cbiAgICB0aGlzLmlubmVySFRNTCA9IGBcbiAgICAgIDxzdHlsZT4ke3N0eWxlfTwvc3R5bGU+XG4gICAgICA8ZGl2IGlkPVwic2xpZGVyTmV3XCI+XG4gICAgICAgIDxhIGNsYXNzPVwiYnV0dG9ucyBwcmV2XCIgaHJlZj1cIiNcIj4mIzYwOzwvYT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdwb3J0XCI+XG4gICAgICAgICAgPHVsIGNsYXNzPVwib3ZlcnZpZXdcIj5cbiAgICAgICAgICAgIDxsaT48aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvcGljdHVyZTEuanBnXCIgLz48L2xpPlxuICAgICAgICAgICAgPGxpPjxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9waWN0dXJlMi5qcGdcIiAvPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL3BpY3R1cmUzLmpwZ1wiIC8+PC9saT5cbiAgICAgICAgICAgIDxsaT48aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvcGljdHVyZTQuanBnXCIgLz48L2xpPlxuICAgICAgICAgICAgPGxpPjxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9waWN0dXJlNS5qcGdcIiAvPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL3BpY3R1cmU2LmpwZ1wiIC8+PC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGEgY2xhc3M9XCJidXR0b25zIG5leHRcIiBocmVmPVwiI1wiPiYjNjI7PC9hPlxuICAgICAgICA8dWwgY2xhc3M9XCJidWxsZXRzXCI+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidWxsZXQgYWN0aXZlXCIgZGF0YS1zbGlkZT1cIjBcIj4xPC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidWxsZXRcIiBkYXRhLXNsaWRlPVwiMVwiPjI8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ1bGxldFwiIGRhdGEtc2xpZGU9XCIyXCI+MzwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnVsbGV0XCIgZGF0YS1zbGlkZT1cIjNcIj40PC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidWxsZXRcIiBkYXRhLXNsaWRlPVwiNFwiPjU8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ1bGxldFwiIGRhdGEtc2xpZGU9XCI1XCI+NjwvYT48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLiRjb250YWluZXIgPSAkKCcjc2xpZGVyTmV3Jyk7XG4gICAgdGhpcy4kdmlld3BvcnQgPSB0aGlzLiRjb250YWluZXIuZmluZChcIi52aWV3cG9ydDpmaXJzdFwiKTtcbiAgICB0aGlzLiRvdmVydmlldyA9IHRoaXMuJGNvbnRhaW5lci5maW5kKFwiLm92ZXJ2aWV3OmZpcnN0XCIpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRjb250YWluZXIuZmluZChcIi5uZXh0OmZpcnN0XCIpO1xuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRjb250YWluZXIuZmluZChcIi5wcmV2OmZpcnN0XCIpO1xuICAgIHRoaXMuJGJ1bGxldHMgPSB0aGlzLiRjb250YWluZXIuZmluZChcIi5idWxsZXRcIik7XG5cbiAgICB0aGlzLiRzbGlkZXMgPSBudWxsO1xuICAgIHRoaXMudmlld3BvcnRTaXplID0gMDtcbiAgICB0aGlzLmNvbnRlbnRTdHlsZSA9IHt9O1xuICAgIHRoaXMuc2xpZGVzVmlzaWJsZSA9IDA7XG4gICAgdGhpcy5zbGlkZVNpemUgPSAwO1xuICAgIHRoaXMuc2xpZGVJbmRleCA9IDA7XG4gICAgdGhpcy5pc0hvcml6b250YWwgPSB0cnVlO1xuICAgIHRoaXMuc2l6ZUxhYmVsID0gdGhpcy5pc0hvcml6b250YWwgPyBcIldpZHRoXCIgOiBcIkhlaWdodFwiO1xuICAgIHRoaXMucG9zaUxhYmVsID0gdGhpcy5pc0hvcml6b250YWwgPyBcImxlZnRcIiA6IFwidG9wXCI7XG4gICAgdGhpcy5pbnRlcnZhbFRpbWVyID0gbnVsbDtcblxuICAgIHRoaXMuX2luaXRpYWxpemUoKTtcbiAgfVxuXG4gIF9pbml0aWFsaXplKCkge1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHRoaXMuX21vdmUodGhpcy5zbGlkZUN1cnJlbnQpO1xuICAgIHRoaXMuX3NldEV2ZW50cygpO1xuICB9XG5cbiAgX3VwZGF0ZSgpIHtcbiAgICB0aGlzLiRvdmVydmlldy5maW5kKFwiLm1pcnJvcmVkXCIpLnJlbW92ZSgpO1xuXG4gICAgdGhpcy4kc2xpZGVzID0gdGhpcy4kb3ZlcnZpZXcuY2hpbGRyZW4oKTtcbiAgICBjb25zdCB2aWV3cG9ydFNpemUgPSB0aGlzLiR2aWV3cG9ydFswXVtcIm9mZnNldFwiICsgdGhpcy5zaXplTGFiZWxdO1xuICAgIHRoaXMuc2xpZGVTaXplID0gdGhpcy4kc2xpZGVzLmZpcnN0KClbXCJvdXRlclwiICsgdGhpcy5zaXplTGFiZWxdKHRydWUpO1xuICAgIHRoaXMuc2xpZGVzVG90YWwgPSB0aGlzLiRzbGlkZXMubGVuZ3RoO1xuICAgIHRoaXMuc2xpZGVDdXJyZW50ID0gdGhpcy5vcHRpb25zLnN0YXJ0IHx8IDA7XG4gICAgY29uc3Qgc2xpZGVzVmlzaWJsZSA9IE1hdGguY2VpbCh2aWV3cG9ydFNpemUgLyB0aGlzLnNsaWRlU2l6ZSk7XG5cbiAgICB0aGlzLiRvdmVydmlldy5hcHBlbmQodGhpcy4kc2xpZGVzLnNsaWNlKDAsIHNsaWRlc1Zpc2libGUpLmNsb25lKCkuYWRkQ2xhc3MoXCJtaXJyb3JlZFwiKSk7XG4gICAgdGhpcy4kb3ZlcnZpZXcuY3NzKHRoaXMuc2l6ZUxhYmVsLnRvTG93ZXJDYXNlKCksIHRoaXMuc2xpZGVTaXplICogKHRoaXMuc2xpZGVzVG90YWwgKyBzbGlkZXNWaXNpYmxlKSk7XG5cbiAgICB0aGlzLl9zZXRCdXR0b25zKCk7XG4gIH1cblxuICBfbW92ZShpbmRleCkge1xuICAgIGxldCBzbGlkZUluZGV4ID0gaXNOYU4oaW5kZXgpID8gdGhpcy5zbGlkZUN1cnJlbnQgOiBpbmRleDtcbiAgICB0aGlzLnNsaWRlQ3VycmVudCA9IHNsaWRlSW5kZXggJSB0aGlzLnNsaWRlc1RvdGFsO1xuXG4gICAgaWYgKHNsaWRlSW5kZXggPCAwKSB7XG4gICAgICB0aGlzLnNsaWRlQ3VycmVudCA9IHNsaWRlSW5kZXggPSB0aGlzLnNsaWRlc1RvdGFsIC0gMTtcbiAgICAgIHRoaXMuJG92ZXJ2aWV3LmNzcyh0aGlzLnBvc2lMYWJlbCwgLSh0aGlzLnNsaWRlc1RvdGFsKSAqIHRoaXMuc2xpZGVTaXplKTtcbiAgICB9XG5cbiAgICBpZiAoc2xpZGVJbmRleCA+IHRoaXMuc2xpZGVzVG90YWwpIHtcbiAgICAgIHRoaXMuc2xpZGVDdXJyZW50ID0gc2xpZGVJbmRleCA9IDE7XG4gICAgICB0aGlzLiRvdmVydmlldy5jc3ModGhpcy5wb3NpTGFiZWwsIDApO1xuICAgIH1cbiAgICB0aGlzLmNvbnRlbnRTdHlsZVt0aGlzLnBvc2lMYWJlbF0gPSAtc2xpZGVJbmRleCAqIHRoaXMuc2xpZGVTaXplO1xuXG4gICAgdGhpcy4kb3ZlcnZpZXcuYW5pbWF0ZSh0aGlzLmNvbnRlbnRTdHlsZSwge1xuICAgICAgcXVldWU6IGZhbHNlLFxuICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICBhbHdheXM6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnRyaWdnZXIoXCJtb3ZlXCIsIFt0aGlzLiRzbGlkZXNbdGhpcy5zbGlkZUN1cnJlbnRdLCB0aGlzLnNsaWRlQ3VycmVudF0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fc2V0QnV0dG9ucygpO1xuICAgIHRoaXMuX3N0YXJ0KCk7XG4gIH1cblxuICBfc2V0RXZlbnRzKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYnV0dG9ucykge1xuICAgICAgdGhpcy4kcHJldi5jbGljayhfID0+IHtcbiAgICAgICAgdGhpcy5fbW92ZSgtLXRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLiRuZXh0LmNsaWNrKF8gPT4ge1xuICAgICAgICB0aGlzLl9tb3ZlKCsrdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJCh3aW5kb3cpLnJlc2l6ZSh0aGlzLl91cGRhdGUpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5idWxsZXRzKSB7XG4gICAgICBjb25zdCBfX3NlbGYgPSB0aGlzO1xuICAgICAgdGhpcy4kY29udGFpbmVyLm9uKFwiY2xpY2tcIiwgXCIuYnVsbGV0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZTogJywgJCh0aGlzKS5hdHRyKFwiZGF0YS1zbGlkZVwiKSlcbiAgICAgICAgX19zZWxmLl9tb3ZlKF9fc2VsZi5zbGlkZUluZGV4ID0gKyQodGhpcykuYXR0cihcImRhdGEtc2xpZGVcIikpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcnZhbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWxUaW1lcik7XG5cbiAgICAgIHRoaXMuaW50ZXJ2YWxBY3RpdmUgPSB0cnVlO1xuXG4gICAgICB0aGlzLmludGVydmFsVGltZXIgPSBzZXRUaW1lb3V0KF8gPT4ge1xuICAgICAgICB0aGlzLl9tb3ZlKCsrdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbFRpbWUpO1xuICAgIH1cbiAgfVxuXG4gIF9zdG9wKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsVGltZXIpO1xuICAgIHRoaXMuaW50ZXJ2YWxBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIF9zZXRCdXR0b25zKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYnV0dG9ucyAmJiAhdGhpcy5vcHRpb25zLmluZmluaXRlKSB7XG4gICAgICB0aGlzLiRwcmV2LnRvZ2dsZUNsYXNzKFwiZGlzYWJsZVwiLCB0aGlzLnNsaWRlQ3VycmVudCA8PSAwKTtcbiAgICAgIHRoaXMuJG5leHQudG9nZ2xlQ2xhc3MoXCJkaXNhYmxlXCIsIHRoaXMuc2xpZGVDdXJyZW50ID49IHRoaXMuc2xpZGVzVG90YWwgLSB0aGlzLnNsaWRlc1Zpc2libGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYnVsbGV0cykge1xuICAgICAgdGhpcy4kYnVsbGV0cy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICQodGhpcy4kYnVsbGV0c1t0aGlzLnNsaWRlQ3VycmVudF0pLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ck5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXG4gIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2VTbGlkZXIuaXMsIENlU2xpZGVyKTsiLCJjb25zdCBzZXR0aW5ncyA9IHtcbiAgaXRlbTogMyxcbiAgYXV0b1dpZHRoOiBmYWxzZSxcbiAgc2xpZGVNb3ZlOiAxLFxuICBzbGlkZU1hcmdpbjogMTAsXG4gIGFkZENsYXNzOiAnJyxcbiAgbW9kZTogJ3NsaWRlJyxcbiAgdXNlQ1NTOiB0cnVlLFxuICBjc3NFYXNpbmc6ICdlYXNlJywgLy8nY3ViaWMtYmV6aWVyKDAuMjUsIDAsIDAuMjUsIDEpJyxcbiAgZWFzaW5nOiAnbGluZWFyJywgLy8nZm9yIGpxdWVyeSBhbmltYXRpb24nLC8vXG4gIHNwZWVkOiA0MDAsIC8vbXMnXG4gIGF1dG86IGZhbHNlLFxuICBwYXVzZU9uSG92ZXI6IGZhbHNlLFxuICBsb29wOiBmYWxzZSxcbiAgc2xpZGVFbmRBbmltYXRpb246IHRydWUsXG4gIHBhdXNlOiAyMDAwLFxuICBrZXlQcmVzczogZmFsc2UsXG4gIGNvbnRyb2xzOiB0cnVlLFxuICBwcmV2SHRtbDogJycsXG4gIG5leHRIdG1sOiAnJyxcbiAgcnRsOiBmYWxzZSxcbiAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICB2ZXJ0aWNhbDogZmFsc2UsXG4gIHZlcnRpY2FsSGVpZ2h0OiA1MDAsXG4gIHZUaHVtYldpZHRoOiAxMDAsXG4gIHRodW1iSXRlbTogMTAsXG4gIHBhZ2VyOiB0cnVlLFxuICBnYWxsZXJ5OiBmYWxzZSxcbiAgZ2FsbGVyeU1hcmdpbjogNSxcbiAgdGh1bWJNYXJnaW46IDUsXG4gIGN1cnJlbnRQYWdlclBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgZW5hYmxlVG91Y2g6IHRydWUsXG4gIGVuYWJsZURyYWc6IHRydWUsXG4gIGZyZWVNb3ZlOiB0cnVlLFxuICBzd2lwZVRocmVzaG9sZDogNDAsXG4gIHJlc3BvbnNpdmU6IFtdLFxuICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gIG9uQmVmb3JlU3RhcnQ6IGZ1bmN0aW9uICgkZWwpIHsgfSxcbiAgb25TbGlkZXJMb2FkOiBmdW5jdGlvbiAoJGVsKSB7IH0sXG4gIG9uQmVmb3JlU2xpZGU6IGZ1bmN0aW9uICgkZWwsIHNjZW5lKSB7IH0sXG4gIG9uQWZ0ZXJTbGlkZTogZnVuY3Rpb24gKCRlbCwgc2NlbmUpIHsgfSxcbiAgb25CZWZvcmVOZXh0U2xpZGU6IGZ1bmN0aW9uICgkZWwsIHNjZW5lKSB7IH0sXG4gIG9uQmVmb3JlUHJldlNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkgeyB9XG4gIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzOyIsIlxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2xpZGVyLWRlZmF1bHRzJztcblxuZXhwb3J0IGNsYXNzIEltYWdlU2xpZGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgaXMoKSB7XG4gICAgcmV0dXJuICdpbWFnZS1zbGlkZXInO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnZGlzYWJsZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gdGhpcy5pbm5lckhUTUwgPSB0aGlzLnJlbmRlcigpO1xuXG4gICAgdGhpcy53aW5kb3dXID0gd2luZG93Lm91dGVyV2lkdGg7XG4gICAgdGhpcy5icmVha3BvaW50ID0gbnVsbDtcbiAgICB0aGlzLnJlc3Bvc2l2ZU9iaiA9IG51bGw7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIHRoaXMudyA9IDA7XG4gICAgdGhpcy5vbiA9IGZhbHNlO1xuICAgIHRoaXMuZWxTaXplID0gMDtcbiAgICB0aGlzLiRzbGlkZSA9ICcnO1xuICAgIHRoaXMuc2NlbmUgPSAwO1xuICAgIHRoaXMucHJvcGVydHkgPSAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICAgIHRoaXMuZ3V0dGVyID0gKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSA/ICdtYXJnaW4tYm90dG9tJyA6ICdtYXJnaW4tcmlnaHQnO1xuICAgIHRoaXMuc2xpZGVWYWx1ZSA9IDA7XG4gICAgdGhpcy5wYWdlcldpZHRoID0gMDtcbiAgICB0aGlzLnNsaWRlV2lkdGggPSAwO1xuICAgIHRoaXMudGh1bWJXaWR0aCA9IDA7XG4gICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XG4gICAgdGhpcy5pc1RvdWNoID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cbiAgICB0aGlzLmxTU2xpZGVPdXRlciA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxTU2xpZGVPdXRlcicpO1xuICAgIHRoaXMubFNTbGlkZVdyYXBwZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5sU1NsaWRlV3JhcHBlcicpO1xuICAgIHRoaXMuJGVsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcjY29udGVudC1zbGlkZXIyJyk7XG4gICAgdGhpcy5sU1BhZ2VyID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubFNQYWdlcicpO1xuICAgIC8vIHRoaXMuJGNoaWxkcmVuID0gdGhpcy4kZWwuY2hpbGROb2RlcztcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoYFxuICAgICAgPGRpdiBjbGFzcz1cImxTU2xpZGVPdXRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibFNTbGlkZVdyYXBwZXIgdXNpbmdDc3NcIiBzdHlsZT1cInRyYW5zaXRpb24tZHVyYXRpb246IDBtcztcIj5cbiAgICAgICAgICA8dWwgaWQ9XCJjb250ZW50LXNsaWRlcjJcIiBjbGFzcz1cImNvbnRlbnQtc2xpZGVyIGxpZ2h0U2xpZGVyIGxTU2xpZGUgbHNHcmFiYmluZ1wiXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNjIwcHg7IGhlaWdodDogMTYycHg7IHBhZGRpbmctYm90dG9tOiAwJTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIj5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cImxzbGlkZSBhY3RpdmVcIiBzdHlsZT1cIndpZHRoOiAyNjBweDsgbWFyZ2luLXJpZ2h0OiAxMHB4O1wiPlxuICAgICAgICAgICAgICA8aDM+MTwvaDM+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwibHNsaWRlXCIgc3R5bGU9XCJ3aWR0aDogMjYwcHg7IG1hcmdpbi1yaWdodDogMTBweDtcIj5cbiAgICAgICAgICAgICAgPGgzPjI8L2gzPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cImxzbGlkZVwiIHN0eWxlPVwid2lkdGg6IDI2MHB4OyBtYXJnaW4tcmlnaHQ6IDEwcHg7XCI+XG4gICAgICAgICAgICAgIDxoMz4zPC9oMz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibFNBY3Rpb25cIj48YSBjbGFzcz1cImxTUHJldlwiPjwvYT48YSBjbGFzcz1cImxTTmV4dFwiPjwvYT48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx1bCBjbGFzcz1cImxTUGFnZXIgbFNwZ1wiIHN0eWxlPVwibWFyZ2luLXRvcDogNXB4O1wiPlxuICAgICAgICAgIDxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjXCI+MTwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPjI8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj4zPC9hPjwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICBgKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICQoXCIjY29udGVudC1zbGlkZXJcIikubGlnaHRTbGlkZXIoe1xuICAgICAgbG9vcDogZmFsc2UsXG4gICAgICBrZXlQcmVzczogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyTmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cbiAgfVxuXG4gIF9pbmxpbmVTdHlsZSgpIHtcblxuICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnZmFkZScpIHtcbiAgICAgIHNldHRpbmdzLmF1dG9XaWR0aCA9IGZhbHNlO1xuICAgICAgc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNldHRpbmdzLmF1dG8pIHtcbiAgICAgIHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGgpIHtcbiAgICAgIHNldHRpbmdzLnNsaWRlTW92ZSA9IDE7XG4gICAgICBzZXR0aW5ncy5pdGVtID0gMTtcbiAgICB9XG4gICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcbiAgICAgIHNldHRpbmdzLnNsaWRlTW92ZSA9IDE7XG4gICAgICBzZXR0aW5ncy5mcmVlTW92ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCkge1xuICAgICAgdGhpcy5sU1NsaWRlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd2ZXJ0aWNhbCcpO1xuICAgICAgdGhpcy5lbFNpemUgPSBzZXR0aW5ncy52ZXJ0aWNhbEhlaWdodDtcbiAgICAgIHRoaXMubFNTbGlkZVdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5lbFNpemV9cHhgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsU2l6ZSA9IHRoaXMuJGVsLm91dGVyV2lkdGg7XG4gICAgfVxuXG4gICAgdGhpcy4kZWwuY2hpbGROb2Rlcy5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5hZGQoJ2xzbGlkZScpKTtcbiAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAvLyBuZWVkIHRvIGhhbmRsZVxuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgLy8gcmVmcmVzaC5jYWxTVygpO1xuICAgICAgdGhpcy5fcmVmcmVzaGNhbFNXKCk7XG5cbiAgICAgIC8vIHJlZnJlc2guc1NXKCk7XG4gICAgICB0aGlzLl9yZWZyZXNoc1NXKCk7XG5cbiAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc2xpZGVWYWx1ZSA9IHRoaXMuX3NsaWRlVmFsdWUoKTtcbiAgICAgICAgdGhpcy5tb3ZlKCRlbCwgc2xpZGVWYWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc2V0SGVpZ2h0KCRlbCwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0SGVpZ2h0KCRlbCwgdHJ1ZSk7XG4gICAgICAkZWwuYWRkQ2xhc3MoJ2xTRmFkZScpO1xuICAgICAgaWYgKCF0aGlzLmRvQ3NzKCkpIHtcbiAgICAgICAgJGNoaWxkcmVuLmZhZGVPdXQoMCk7XG4gICAgICAgICRjaGlsZHJlbi5lcShzY2VuZSkuZmFkZUluKDApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAkY2hpbGRyZW4uZXEoc2NlbmUpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGNoaWxkcmVuLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cblxuICB9XG5cbiAgX21vdmUob2IsIHYpIHtcbiAgICBpZiAoc2V0dGluZ3MucnRsID09PSB0cnVlKSB7XG4gICAgICB2ID0gLXY7XG4gICAgfVxuICAgIGlmICh0aGlzLl9kb0NzcygpKSB7XG4gICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgb2Iuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKDBweCwgLSR7dn1weCwgMHB4KWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYi5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMHB4LCAtJHt2fXB4LCAwcHgsIDBweClgO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgb2IuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpLmFuaW1hdGUoe1xuICAgICAgICAgIHRvcDogLXYgKyAncHgnXG4gICAgICAgIH0sIHNldHRpbmdzLnNwZWVkLCBzZXR0aW5ncy5lYXNpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2IuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpLmFuaW1hdGUoe1xuICAgICAgICAgIGxlZnQ6IC12ICsgJ3B4J1xuICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCwgc2V0dGluZ3MuZWFzaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyICR0aHVtYiA9ICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpLmZpbmQoJ2xpJyk7XG4gICAgdGhpcy5hY3RpdmUoJHRodW1iLCB0cnVlKTtcbiAgfVxuXG4gIF9zbGlkZVZhbHVlKCkge1xuICAgIGxldCBfc1YgPSAwO1xuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICBfc1YgPSB0aGlzLnNjZW5lICogKCh0aGlzLnNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfc1YgPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNjZW5lOyBpKyspIHtcbiAgICAgICAgX3NWICs9IHBhcnNlSW50KHRoaXMuJGVsLmNoaWxkTm9kZXNbaV0ud2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfc1Y7XG4gIH1cblxuICBfcmVmcmVzaHNTVyAoKSB7XG5cbiAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgLy8gJGNoaWxkcmVuLmNzcyhwcm9wZXJ0eSwgc2xpZGVXaWR0aCArICdweCcpO1xuICAgICAgdGhpcy4kZWwuY2hpbGROb2Rlcy5mb3JFYWNoKGVsID0+IGVsLnN0eWxlW3RoaXMucHJvcGVydHldID0gYCR7dGhpcy5zbGlkZVdpZHRofXB4YCk7XG4gICAgfVxuICAgIC8vICRjaGlsZHJlbi5jc3MoZ3V0dGVyLCBzZXR0aW5ncy5zbGlkZU1hcmdpbiArICdweCcpO1xuICAgIHRoaXMuJGVsLmNoaWxkTm9kZXMuZm9yRWFjaChlbCA9PiBlbC5zdHlsZVt0aGlzLmd1dHRlcl0gPSBgJHtzZXR0aW5ncy5zbGlkZU1hcmdpbn1weGApO1xuXG4gICAgdyA9IHRoaXMuX2NhbFdpZHRoKGZhbHNlKTtcbiAgICAvLyAkZWwuY3NzKHByb3BlcnR5LCB3ICsgJ3B4Jyk7XG4gICAgdGhpcy4kZWwuc3R5bGVbcHJvcGVydHldID0gYCR7d31weGA7XG4gICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgaWYgKHRoaXMub24gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuY2xvbmUubGVmdCcpLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZG9Dc3MoKSkge1xuICAgICAgdGhpcy5sU1NsaWRlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd1c2luZ0NzcycpO1xuICAgIH1cbiAgfVxuXG4gIF9yZWZyZXNoY2FsU1cgKCkge1xuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNsaWRlV2lkdGggPSAodGhpcy5lbFNpemUgLSAoKHNldHRpbmdzLml0ZW0gKiAoc2V0dGluZ3Muc2xpZGVNYXJnaW4pKSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luKSkgLyBzZXR0aW5ncy5pdGVtO1xuICAgIH1cbiAgfVxuXG4gIF9kb0NzcygpIHtcbiAgICBjb25zdCBzdXBwb3J0ID0gKCkgPT4ge1xuICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IFsndHJhbnNpdGlvbicsICdNb3pUcmFuc2l0aW9uJywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nLCAnbXNUcmFuc2l0aW9uJywgJ0todG1sVHJhbnNpdGlvbiddO1xuICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhbnNpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHJhbnNpdGlvbltpXSBpbiByb290LnN0eWxlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHNldHRpbmdzLnVzZUNTUyAmJiBzdXBwb3J0KCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG4gIF9jYWxXaWR0aCAoY2xuKSB7XG4gICAgdmFyIGxuID0gY2xuID09PSB0cnVlID8gJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGggOiAkY2hpbGRyZW4ubGVuZ3RoO1xuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICB3ID0gbG4gKiAoc2xpZGVXaWR0aCArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdyA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxuOyBpKyspIHtcbiAgICAgICAgdyArPSAocGFyc2VJbnQoJGNoaWxkcmVuLmVxKGkpLndpZHRoKCkpICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdztcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoSW1hZ2VTbGlkZXIuaXMsIEltYWdlU2xpZGVyKTsiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vc2xpZGVyLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3NsaWRlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vc2xpZGVyLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vc3R5bGVzLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3N0eWxlcy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vc3R5bGVzLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbmNvbnN0IEtFWUNPREUgPSB7XG4gIERPV046IDQwLFxuICBMRUZUOiAzNyxcbiAgUklHSFQ6IDM5LFxuICBVUDogMzgsXG4gIEhPTUU6IDM2LFxuICBFTkQ6IDM1LFxufTtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICB9XG4gICAgOjpzbG90dGVkKGNlLXRhYi1wYW5lbCkge1xuICAgICAgZmxleC1iYXNpczogMTAwJTtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90IG5hbWU9XCJ0YWJcIj48L3Nsb3Q+XG4gIDxzbG90IG5hbWU9XCJwYW5lbFwiPjwvc2xvdD5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZVRhYnMgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9vblNsb3RDaGFuZ2UgPSB0aGlzLl9vblNsb3RDaGFuZ2UuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgdGhpcy5fdGFiU2xvdCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdzbG90W25hbWU9dGFiXScpO1xuICAgIHRoaXMuX3BhbmVsU2xvdCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdzbG90W25hbWU9cGFuZWxdJyk7XG5cbiAgICB0aGlzLl90YWJTbG90LmFkZEV2ZW50TGlzdGVuZXIoJ3Nsb3RjaGFuZ2UnLCB0aGlzLl9vblNsb3RDaGFuZ2UpO1xuICAgIHRoaXMuX3BhbmVsU2xvdC5hZGRFdmVudExpc3RlbmVyKCdzbG90Y2hhbmdlJywgdGhpcy5fb25TbG90Q2hhbmdlKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJsaXN0Jyk7XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZCgnY2UtdGFiJyksXG4gICAgICBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZCgnY2UtdGFiLXBhbmVsJyksXG4gICAgXSlcbiAgICAudGhlbihfID0+IHRoaXMuX2xpbmtQYW5lbHMoKSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIF9vblNsb3RDaGFuZ2UoKSB7XG4gICAgdGhpcy5fbGlua1BhbmVscygpO1xuICB9XG5cbiAgX2xpbmtQYW5lbHMoKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuX2FsbFRhYnMoKTtcbiAgICB0YWJzLmZvckVhY2godGFiID0+IHtcbiAgICAgIGNvbnN0IHBhbmVsID0gdGFiLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIGlmIChwYW5lbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdjZS10YWItcGFuZWwnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFRhYiAjJHt0YWIuaWR9IGlzIG5vdCBhIHNpYmxpbmcgb2YgYSA8Y2UtdGFiLXBhbmVsPmApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBwYW5lbC5pZCk7XG4gICAgICBwYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIHRhYi5pZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZFRhYiA9IHRhYnMuZmluZCh0YWIgPT4gdGFiLnNlbGVjdGVkKSB8fCB0YWJzWzBdO1xuXG4gICAgdGhpcy5fc2VsZWN0VGFiKHNlbGVjdGVkVGFiKTtcbiAgfVxuXG4gIF9hbGxQYW5lbHMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdjZS10YWItcGFuZWwnKSk7XG4gIH1cblxuICBfYWxsVGFicygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NlLXRhYicpKTtcbiAgfVxuXG4gIF9wYW5lbEZvclRhYih0YWIpIHtcbiAgICBjb25zdCBwYW5lbElkID0gdGFiLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoYCMke3BhbmVsSWR9YCk7XG4gIH1cblxuICBfcHJldlRhYigpIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy5fYWxsVGFicygpO1xuICAgIGxldCBuZXdJZHggPSB0YWJzLmZpbmRJbmRleCh0YWIgPT4gdGFiLnNlbGVjdGVkKSAtIDE7XG4gICAgcmV0dXJuIHRhYnNbKG5ld0lkeCArIHRhYnMubGVuZ3RoKSAlIHRhYnMubGVuZ3RoXTtcbiAgfVxuXG4gIF9maXJzdFRhYigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsVGFicygpWzBdO1xuICB9XG5cbiAgX2xhc3RUYWIoKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuX2FsbFRhYnMoKTtcbiAgICByZXR1cm4gdGFic1t0YWJzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgX25leHRUYWIoKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuX2FsbFRhYnMoKTtcbiAgICBsZXQgbmV3SWR4ID0gdGFicy5maW5kSW5kZXgodGFiID0+IHRhYi5zZWxlY3RlZCkgKyAxO1xuICAgIHJldHVybiB0YWJzW25ld0lkeCAlIHRhYnMubGVuZ3RoXTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLl9hbGxUYWJzKCk7XG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5fYWxsUGFuZWxzKCk7XG5cbiAgICB0YWJzLmZvckVhY2godGFiID0+IHRhYi5zZWxlY3RlZCA9IGZhbHNlKTtcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiBwYW5lbC5oaWRkZW4gPSB0cnVlKTtcbiAgfVxuXG4gIF9zZWxlY3RUYWIobmV3VGFiKSB7XG5cbiAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICBjb25zdCBuZXdQYW5lbCA9IHRoaXMuX3BhbmVsRm9yVGFiKG5ld1RhYik7XG5cbiAgICBpZiAoIW5ld1BhbmVsKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBwYW5lbCB3aXRoIGlkICR7bmV3UGFuZWxJZH1gKTtcbiAgICBuZXdUYWIuc2VsZWN0ZWQgPSB0cnVlO1xuICAgIG5ld1BhbmVsLmhpZGRlbiA9IGZhbHNlO1xuICAgIG5ld1RhYi5mb2N1cygpO1xuICB9XG5cbiAgX29uS2V5RG93bihldmVudCkge1xuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSAhPT0gJ3RhYicpIHJldHVybjtcbiAgICBpZiAoZXZlbnQuYWx0S2V5KSByZXR1cm47XG5cbiAgICBsZXQgbmV3VGFiO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLkxFRlQ6XG4gICAgICBjYXNlIEtFWUNPREUuVVA6XG4gICAgICAgIG5ld1RhYiA9IHRoaXMuX3ByZXZUYWIoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5SSUdIVDpcbiAgICAgIGNhc2UgS0VZQ09ERS5ET1dOOlxuICAgICAgICBuZXdUYWIgPSB0aGlzLl9uZXh0VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuSE9NRTpcbiAgICAgICAgbmV3VGFiID0gdGhpcy5fZmlyc3RUYWIoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5FTkQ6XG4gICAgICAgIG5ld1RhYiA9IHRoaXMuX2xhc3RUYWIoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5fc2VsZWN0VGFiKG5ld1RhYik7XG4gIH1cblxuICBfb25DbGljayhldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdyb2xlJykgIT09ICd0YWInKSByZXR1cm47XG4gICAgdGhpcy5fc2VsZWN0VGFiKGV2ZW50LnRhcmdldCk7XG4gIH1cbn1cblxubGV0IGNlVGFiQ291bnRlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDZVRhYiBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnc2VsZWN0ZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYGNlLXRhYi1nZW5lcmF0ZWQtJHtjZVRhYkNvdW50ZXIrK31gO1xuXG4gICAgLy8gU2V0IGEgd2VsbC1kZWZpbmVkIGluaXRpYWwgc3RhdGUuXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdzZWxlY3RlZCcpO1xuICB9XG5cbiAgX3VwZ3JhZGVQcm9wZXJ0eShwcm9wKSB7XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXNbcHJvcF07XG4gICAgICBkZWxldGUgdGhpc1twcm9wXTtcbiAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHZhbHVlKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCB2YWx1ZSA/IDAgOiAtMSk7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWQodmFsdWUpIHtcbiAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmICh2YWx1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gIH1cbn1cblxubGV0IGNlUGFuZWxDb3VudGVyID0gMDtcblxuZXhwb3J0IGNsYXNzIENlVGFiUGFuZWwgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIGlmICghdGhpcy5pZClcbiAgICAgIHRoaXMuaWQgPSBgY2UtcGFuZWwtZ2VuZXJhdGVkLSR7Y2VQYW5lbENvdW50ZXIrK31gO1xuICB9XG59IiwiXG5jb25zdCBLRVlDT0RFID0ge1xuICBTUEFDRTogMzIsXG4gIEVOVEVSOiAxMyxcbn07XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG4gICAgOmhvc3QoW2hpZGRlbl0pIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdD48L3Nsb3Q+XG5gO1xuXG5leHBvcnQgY2xhc3MgQ2VUb2dnbGVCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3ByZXNzZWQnLCAnZGlzYWJsZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgJ2ZhbHNlJyk7XG5cbiAgICB0aGlzLl91cGdyYWRlUHJvcGVydHkoJ3ByZXNzZWQnKTtcbiAgICB0aGlzLl91cGdyYWRlUHJvcGVydHkoJ2Rpc2FibGVkJyk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIF91cGdyYWRlUHJvcGVydHkocHJvcCkge1xuICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzW3Byb3BdO1xuICAgICAgZGVsZXRlIHRoaXNbcHJvcF07XG4gICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBzZXQgcHJlc3NlZCh2YWx1ZSkge1xuICAgIGNvbnN0IGlzUHJlc3NlZCA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmIChpc1ByZXNzZWQpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncHJlc3NlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncHJlc3NlZCcpO1xuICB9XG5cbiAgZ2V0IHByZXNzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdwcmVzc2VkJyk7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKGlzRGlzYWJsZWQpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGNvbnN0IGhhc1ZhbHVlID0gbmV3VmFsdWUgIT09IG51bGw7XG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdwcmVzc2VkJzpcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIGhhc1ZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgaGFzVmFsdWUpO1xuICAgICAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIF9vbktleURvd24oZXZlbnQpIHtcblxuICAgIGlmIChldmVudC5hbHRLZXkpIHJldHVybjtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLlNQQUNFOlxuICAgICAgY2FzZSBLRVlDT0RFLkVOVEVSOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl90b2dnbGVQcmVzc2VkKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgX29uQ2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLl90b2dnbGVQcmVzc2VkKCk7XG4gIH1cblxuICBfdG9nZ2xlUHJlc3NlZCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgIHRoaXMucHJlc3NlZCA9ICF0aGlzLnByZXNzZWQ7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHByZXNzZWQ6IHRoaXMucHJlc3NlZCxcbiAgICAgIH0sXG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgIH0pKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENlVG9vbHRpcCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3Nob3cgPSB0aGlzLl9zaG93LmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGlkZSA9IHRoaXMuX2hpZGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3Rvb2x0aXAnKTtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG5cbiAgICB0aGlzLl9oaWRlKCk7XG5cbiAgICB0aGlzLl90YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1kZXNjcmliZWRieT0nICsgdGhpcy5pZCArICddJyk7XG5cbiAgICBpZiAoIXRoaXMuX3RhcmdldCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fc2hvdyk7XG4gICAgdGhpcy5fdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9oaWRlKTtcbiAgICB0aGlzLl90YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX3Nob3cpO1xuICAgIHRoaXMuX3RhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5faGlkZSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5fdGFyZ2V0KSByZXR1cm47XG5cbiAgICB0aGlzLl90YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9zaG93KTtcbiAgICB0aGlzLl90YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX2hpZGUpO1xuICAgIHRoaXMuX3RhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fc2hvdyk7XG4gICAgdGhpcy5fdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9oaWRlKTtcbiAgICB0aGlzLl90YXJnZXQgPSBudWxsO1xuICB9XG5cbiAgX3Nob3coKSB7XG4gICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgfVxuXG4gIF9oaWRlKCkge1xuICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgfVxufVxuIiwiXG5cbmNvbnN0IFRyZWVEYXRhID0ge1xuICBcInBhdGhcIjogXCIuL2RvY3NcIixcbiAgXCJuYW1lXCI6IFwiZG9jc1wiLFxuICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2FuZ3VsYXJcIixcbiAgICAgIFwibmFtZVwiOiBcImFuZ3VsYXJcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvYW5ndWxhci9icm9hZGNhc3Rlci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImJyb2FkY2FzdGVyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvYW5ndWxhci9kZWJvdW5jZS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImRlYm91bmNlLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvYW5ndWxhci9odHRwLWludGVyY2VwdG9yLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiaHR0cC1pbnRlcmNlcHRvci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvY2xhc3MubWRcIixcbiAgICAgIFwibmFtZVwiOiBcImNsYXNzLm1kXCIsXG4gICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHNcIixcbiAgICAgIFwibmFtZVwiOiBcImNzczMtY29tcG9uZW50c1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvYXJyb3cubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJhcnJvdy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9ib3gtc2hhZG93Lm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiYm94LXNoYWRvdy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9jaGVja2JveC5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImNoZWNrYm94Lm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzL21hdC1ib3gtc2hhZG93Lm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwibWF0LWJveC1zaGFkb3cubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvbW9kYWwubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJtb2RhbC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9yYW5nZS1zZWxlY3Rvci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInJhbmdlLXNlbGVjdG9yLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzL3Jlc3BvbnNpdmUtbWVudS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInJlc3BvbnNpdmUtbWVudS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9zdGVwLXByb2dyZXNzLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwic3RlcC1wcm9ncmVzcy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy90b2dnbGUtc3dpdGNoLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwidG9nZ2xlLXN3aXRjaC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy92ZXJ0aWNhbC1ub3RpZmljYXRpb24tYmFyLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwidmVydGljYWwtbm90aWZpY2F0aW9uLWJhci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tXCIsXG4gICAgICBcIm5hbWVcIjogXCJkb21cIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tL2RvbS1oYW5kbGVyLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZG9tLWhhbmRsZXIubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kb20vZG9tLW9wZXJhdGlvbnMubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJkb20tb3BlcmF0aW9ucy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2RvbS9kb20tdXRpbHMubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJkb20tdXRpbHMubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kb20vc2Nyb2xsLXRhYmxlLWNvbHVtbi5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInNjcm9sbC10YWJsZS1jb2x1bW4ubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kb20vc2Nyb2xsYWJsZS1zaWRlYmFyLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwic2Nyb2xsYWJsZS1zaWRlYmFyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kc1wiLFxuICAgICAgXCJuYW1lXCI6IFwiZHNcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZHMvbGlua2VkLWxpc3QubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJsaW5rZWQtbGlzdC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvZmlsZS0zLm1kXCIsXG4gICAgICBcIm5hbWVcIjogXCJmaWxlLTMubWRcIixcbiAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2ZvbGRlci0xXCIsXG4gICAgICBcIm5hbWVcIjogXCJmb2xkZXItMVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9mb2xkZXItMS9maWxlLTEuMS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImZpbGUtMS4xLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZm9sZGVyLTEvZmlsZS0xLjIubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJmaWxlLTEuMi5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvbGludXhcIixcbiAgICAgIFwibmFtZVwiOiBcImxpbnV4XCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2xpbnV4L3NzaC5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInNzaC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvbWlzY1wiLFxuICAgICAgXCJuYW1lXCI6IFwibWlzY1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9taXNjL2NvcnBvcmF0ZS1wcm94eS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImNvcnBvcmF0ZS1wcm94eS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21pc2MvZ2l0LWNvbW1hbmRzLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZ2l0LWNvbW1hbmRzLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvbWlzYy9qZWt5bGwubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJqZWt5bGwubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9taXNjL2ppcmEtaXNzdWUtZmlsdGVyLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiamlyYS1pc3N1ZS1maWx0ZXIubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21vYmlsZVwiLFxuICAgICAgXCJuYW1lXCI6IFwibW9iaWxlXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21vYmlsZS9yZWFjdC1uYXRpdmUubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJyZWFjdC1uYXRpdmUubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3BocFwiLFxuICAgICAgXCJuYW1lXCI6IFwicGhwXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3BocC9jb21wb3Nlci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImNvbXBvc2VyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9yZWFjdC1uYXRpdmVcIixcbiAgICAgIFwibmFtZVwiOiBcInJlYWN0LW5hdGl2ZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9yZWFjdC1uYXRpdmUvYmFzaWMubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJiYXNpYy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvcmVnZXhcIixcbiAgICAgIFwibmFtZVwiOiBcInJlZ2V4XCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3JlZ2V4L2NhbWVsY2FzZS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImNhbWVsY2FzZS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3Mvcm9oaXQubWRcIixcbiAgICAgIFwibmFtZVwiOiBcInJvaGl0Lm1kXCIsXG4gICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9zY3NzXCIsXG4gICAgICBcIm5hbWVcIjogXCJzY3NzXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3Njc3MvYm94LXNoYWRvdy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImJveC1zaGFkb3cubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3ZlbmthdC5tZFwiLFxuICAgICAgXCJuYW1lXCI6IFwidmVua2F0Lm1kXCIsXG4gICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICB9XG4gIF1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUcmVlRGF0YTsiLCJcblxuaW1wb3J0IHN0eWxlIGZyb20gJy4vdHJlZS5zY3NzJztcbmltcG9ydCBUcmVlRGF0YSBmcm9tICcuL3RyZWUtZGF0YSc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgaXMgKCkge1xuICAgIHJldHVybiAnY2UtdHJlZS12aWV3JztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzICgpIHtcbiAgICByZXR1cm4gWydkaXNhYmxlZCddO1xuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBgXG4gICAgICA8c3R5bGU+JHtzdHlsZX08L3N0eWxlPlxuICAgICAgJHt0aGlzLl9yZW5kZXJUcmVlKFtUcmVlRGF0YV0pfVxuICAgIGA7XG4gIH1cblxuICBfcmVuZGVyVHJlZSAoZGF0YSkge1xuICAgIHJldHVybiB0aGlzLmJ1aWxkTm9kZShkYXRhKTtcbiAgfVxuXG4gIGJ1aWxkTm9kZSAoZGF0YSkgeyBcbiAgICByZXR1cm4gKGBcbiAgICAgIDx1bCBjbGFzcz1cImNlLXRyZWUtY29udGVudFwiIGNlLXRyZWU9XCJcIj5cbiAgICAgICAgJHtkYXRhLnJlZHVjZSgodCwgZCkgPT4ge1xuICAgICAgICAgIHQgKz0gKGBcbiAgICAgICAgICAgIDxsaSBjZS1mb2xkZXIgY2xhc3M9XCJjZS10cmVlLWZvbGRlclwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImNlLXRyZWUtaWNvblwiIGRhdGEtdHlwZT1cIiR7ZC50eXBlfVwiPjwvaT5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjZS10cmVlLWl0ZW0tbmFtZVwiPiR7ZC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgJHtkLmNoaWxkcmVuID8gdGhpcy5idWlsZE5vZGUoZC5jaGlsZHJlbikgOiAnJ31cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgYCk7XG4gICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgIH0sICcnKX1cbiAgICAgIDwvdWw+XG4gICAgYCk7XG4gIH0gXG5cbiAgY29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuICAgIGNvbnN0IGZvbGRlcnMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjZS1mb2xkZXJdJyk7XG4gICAgQXJyYXkuZnJvbShmb2xkZXJzKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHRoaXMuaGFuZGxlQ2xpY2soZXZ0LCBlbCkpXG4gICAgfSk7XG5cbiAgICAvLyBFeHBhbmQgdGhlIHZlcnkgZmlyc3QgZm9sZGVyXG4gICAgZm9sZGVyc1swXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGV2dCwgZWwpIHtcbiAgICBsZXQgaXNFeHBhbmRlZCA9IGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpO1xuICAgIGlmKGlzRXhwYW5kZWQgPT09ICd0cnVlJykge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcbiAgICB9XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuICAgIGNvbnN0IGZvbGRlcnMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjZS1mb2xkZXJdJyk7XG4gICAgQXJyYXkuZnJvbShmb2xkZXJzKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHRoaXMuaGFuZGxlQ2xpY2soZXZ0LCBlbCkpXG4gICAgfSk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFRyZWUuaXMsIFRyZWUpO1xuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3RyZWUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vdHJlZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vdHJlZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiLypcbiAqIEBBdXRob3I6IFJhamtlc2h3YXIgUHJhc2FkKHJhamtlc2h3YXIucGRAZ21haWwuY29tKSBcbiAqIEBEYXRlOiAyMDE5LTAyLTIzIDIzOjAwOjQyIFxuICogQExhc3QgTW9kaWZpZWQgYnk6IFJhamtlc2h3YXIgUHJhc2FkXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE5LTAzLTE4IDE5OjQwOjM4XG4gKi9cblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+PC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIFVpUm91dGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cbiAgXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdVaVJvdXRlciByb2NrcyBub3cnKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdhdHRhY2hlZENhbGxiYWNrIGNhbGxlZCcpO1xuICB9XG5cbn1cblxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd4dWktcm91dGVyJywgVWlSb3V0ZXIpOyIsIlxuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZXMtc2V0dGluZ3MnO1xuXG5sZXQgc2V0dGluZ3MgPSBkZWZhdWx0cztcblxuZXhwb3J0IGNsYXNzIFNsaWRlclJlZnJlc2gge1xuXG4gIGNvbnN0cnVjdG9yKCRjaGlsZHJlbikge1xuICAgIHRoaXMuc2xpZGVWYWx1ZSA9IDA7XG4gICAgdGhpcy5wYWdlcldpZHRoID0gMDtcbiAgICB0aGlzLnNsaWRlV2lkdGggPSAwO1xuICAgIHRoaXMudGh1bWJXaWR0aCA9IDA7XG4gICAgdGhpcy53ICAgICAgICAgID0gMDtcbiAgICB0aGlzLiRjaGlsZHJlbiA9ICRjaGlsZHJlbjtcbiAgfVxuXG4gIGNhbFNXKCkge1xuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNsaWRlV2lkdGggPSAodGhpcy5lbFNpemUgLSAoKHNldHRpbmdzLml0ZW0gKiAoc2V0dGluZ3Muc2xpZGVNYXJnaW4pKSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luKSkgLyBzZXR0aW5ncy5pdGVtO1xuICAgIH1cbiAgfVxuXG4gIGNhbFdpZHRoKGNsbikge1xuICAgIHZhciBsbiA9IGNsbiA9PT0gdHJ1ZSA/IHRoaXMuJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGggOiB0aGlzLiRjaGlsZHJlbi5sZW5ndGg7XG4gICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudyA9IGxuICogKHRoaXMuc2xpZGVXaWR0aCArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53ID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG47IGkrKykge1xuICAgICAgICB0aGlzLncgKz0gKHBhcnNlSW50KHRoaXMuJGNoaWxkcmVuLmVxKGkpLndpZHRoKCkpICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy53O1xuICB9XG5cbiAgY2hicmVha3BvaW50KCkge1xuICAgIGxldCB3aW5kb3dXID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgdGhpcy53aW5kb3dXID0gd2luZG93VztcblxuICAgIGlmIChzZXR0aW5ncy5yZXNwb25zaXZlLmxlbmd0aCkge1xuICAgICAgdmFyIGl0ZW07XG4gICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgICBpdGVtID0gc2V0dGluZ3MuaXRlbTtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3dXIDwgc2V0dGluZ3MucmVzcG9uc2l2ZVswXS5icmVha3BvaW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0dGluZ3MucmVzcG9uc2l2ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh3aW5kb3dXIDwgc2V0dGluZ3MucmVzcG9uc2l2ZVtpXS5icmVha3BvaW50KSB7XG4gICAgICAgICAgICBicmVha3BvaW50ID0gc2V0dGluZ3MucmVzcG9uc2l2ZVtpXS5icmVha3BvaW50O1xuICAgICAgICAgICAgcmVzcG9zaXZlT2JqID0gc2V0dGluZ3MucmVzcG9uc2l2ZVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcmVzcG9zaXZlT2JqICE9PSAndW5kZWZpbmVkJyAmJiByZXNwb3NpdmVPYmogIT09IG51bGwpIHtcbiAgICAgICAgZm9yICh2YXIgaiBpbiByZXNwb3NpdmVPYmouc2V0dGluZ3MpIHtcbiAgICAgICAgICBpZiAocmVzcG9zaXZlT2JqLnNldHRpbmdzLmhhc093blByb3BlcnR5KGopKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzVGVtcFtqXSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2V0dGluZ3NUZW1wW2pdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHNldHRpbmdzVGVtcFtqXSA9IHNldHRpbmdzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0dGluZ3Nbal0gPSByZXNwb3NpdmVPYmouc2V0dGluZ3Nbal07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChzZXR0aW5nc1RlbXApICYmIHdpbmRvd1cgPiBzZXR0aW5ncy5yZXNwb25zaXZlWzBdLmJyZWFrcG9pbnQpIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBzZXR0aW5nc1RlbXApIHtcbiAgICAgICAgICBpZiAoc2V0dGluZ3NUZW1wLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBzZXR0aW5nc1trXSA9IHNldHRpbmdzVGVtcFtrXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChzbGlkZVZhbHVlID4gMCAmJiB0aGlzLnNsaWRlV2lkdGggPiAwKSB7XG4gICAgICAgICAgaWYgKGl0ZW0gIT09IHNldHRpbmdzLml0ZW0pIHtcbiAgICAgICAgICAgIHNjZW5lID0gTWF0aC5yb3VuZChzbGlkZVZhbHVlIC8gKCh0aGlzLnNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIlxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGl0ZW06IDMsXG4gIGF1dG9XaWR0aDogZmFsc2UsXG4gIHNsaWRlTW92ZTogMSxcbiAgc2xpZGVNYXJnaW46IDEwLFxuICBhZGRDbGFzczogJycsXG4gIG1vZGU6ICdzbGlkZScsXG4gIHVzZUNTUzogdHJ1ZSxcbiAgY3NzRWFzaW5nOiAnZWFzZScsIC8vJ2N1YmljLWJlemllcigwLjI1LCAwLCAwLjI1LCAxKScsXG4gIGVhc2luZzogJ2xpbmVhcicsIC8vJ2ZvciBqcXVlcnkgYW5pbWF0aW9uJywvL1xuICBzcGVlZDogNDAwLCAvL21zJ1xuICBhdXRvOiBmYWxzZSxcbiAgcGF1c2VPbkhvdmVyOiBmYWxzZSxcbiAgbG9vcDogZmFsc2UsXG4gIHNsaWRlRW5kQW5pbWF0aW9uOiB0cnVlLFxuICBwYXVzZTogMjAwMCxcbiAga2V5UHJlc3M6IGZhbHNlLFxuICBjb250cm9sczogdHJ1ZSxcbiAgcHJldkh0bWw6ICcnLFxuICBuZXh0SHRtbDogJycsXG4gIHJ0bDogZmFsc2UsXG4gIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcbiAgdmVydGljYWw6IGZhbHNlLFxuICB2ZXJ0aWNhbEhlaWdodDogNTAwLFxuICB2VGh1bWJXaWR0aDogMTAwLFxuICB0aHVtYkl0ZW06IDEwLFxuICBwYWdlcjogdHJ1ZSxcbiAgZ2FsbGVyeTogZmFsc2UsXG4gIGdhbGxlcnlNYXJnaW46IDUsXG4gIHRodW1iTWFyZ2luOiA1LFxuICBjdXJyZW50UGFnZXJQb3NpdGlvbjogJ21pZGRsZScsXG4gIGVuYWJsZVRvdWNoOiB0cnVlLFxuICBlbmFibGVEcmFnOiB0cnVlLFxuICBmcmVlTW92ZTogdHJ1ZSxcbiAgc3dpcGVUaHJlc2hvbGQ6IDQwLFxuICByZXNwb25zaXZlOiBbXSxcbiAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICBvbkJlZm9yZVN0YXJ0OiBmdW5jdGlvbiAoJGVsKSB7IH0sXG4gIG9uU2xpZGVyTG9hZDogZnVuY3Rpb24gKCRlbCkgeyB9LFxuICBvbkJlZm9yZVNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkgeyB9LFxuICBvbkFmdGVyU2xpZGU6IGZ1bmN0aW9uICgkZWwsIHNjZW5lKSB7IH0sXG4gIG9uQmVmb3JlTmV4dFNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkgeyB9LFxuICBvbkJlZm9yZVByZXZTbGlkZTogZnVuY3Rpb24gKCRlbCwgc2NlbmUpIHsgfVxuICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7IiwiXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9lcy1zZXR0aW5ncyc7XG5pbXBvcnQgeyBTbGlkZXJSZWZyZXNoIH0gZnJvbSAnLi9lcy1yZWZyZXNoJztcblxuKGZ1bmN0aW9uICgkLCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBcbiAgJC5mbi5saWdodFNsaWRlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykubGlnaHRTbGlkZXIob3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBwbHVnaW4gPSB7fSxcbiAgICAgIHNldHRpbmdzID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBvcHRpb25zKSxcbiAgICAgIHNldHRpbmdzVGVtcCA9IHt9LFxuICAgICAgJGVsID0gdGhpcztcbiAgICAgIHBsdWdpbi4kZWwgPSB0aGlzO1xuXG4gICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJykge1xuICAgICAgc2V0dGluZ3MudmVydGljYWwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygndGhpcycsIHRoaXMuY2hpbGRyZW4oKSk7XG5cbiAgICB2YXIgJGNoaWxkcmVuID0gJGVsLmNoaWxkcmVuKCksXG4gICAgICB3aW5kb3dXID0gJCh3aW5kb3cpLndpZHRoKCksXG4gICAgICBicmVha3BvaW50ID0gbnVsbCxcbiAgICAgIHJlc3Bvc2l2ZU9iaiA9IG51bGwsXG4gICAgICBsZW5ndGggPSAwLFxuICAgICAgdyA9IDAsXG4gICAgICBvbiA9IGZhbHNlLFxuICAgICAgZWxTaXplID0gMCxcbiAgICAgICRzbGlkZSA9ICcnLFxuICAgICAgc2NlbmUgPSAwLFxuICAgICAgcHJvcGVydHkgPSAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpID8gJ2hlaWdodCcgOiAnd2lkdGgnLFxuICAgICAgZ3V0dGVyID0gKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSA/ICdtYXJnaW4tYm90dG9tJyA6ICdtYXJnaW4tcmlnaHQnLFxuICAgICAgc2xpZGVWYWx1ZSA9IDAsXG4gICAgICBwYWdlcldpZHRoID0gMCxcbiAgICAgIHNsaWRlV2lkdGggPSAwLFxuICAgICAgdGh1bWJXaWR0aCA9IDAsXG4gICAgICBpbnRlcnZhbCA9IG51bGwsXG4gICAgICBpc1RvdWNoID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cbiAgICB2YXIgcmVmcmVzaCA9IG5ldyBTbGlkZXJSZWZyZXNoKCRjaGlsZHJlbik7XG5cbiAgICBwbHVnaW4gPSB7XG4gICAgICBkb0NzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3VwcG9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IFsndHJhbnNpdGlvbicsICdNb3pUcmFuc2l0aW9uJywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nLCAnbXNUcmFuc2l0aW9uJywgJ0todG1sVHJhbnNpdGlvbiddO1xuICAgICAgICAgIHZhciByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25baV0gaW4gcm9vdC5zdHlsZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzZXR0aW5ncy51c2VDU1MgJiYgc3VwcG9ydCgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGtleVByZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5rZXlQcmVzcykge1xuICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cC5saWdodHNsaWRlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoISQoJzpmb2N1cycpLmlzKCdpbnB1dCwgdGV4dGFyZWEnKSkge1xuICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgICAgICAgICAgICAkZWwuZ29Ub1ByZXZTbGlkZSgpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICAkZWwuZ29Ub05leHRTbGlkZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb250cm9sczogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2V0dGluZ3MuY29udHJvbHMpIHtcbiAgICAgICAgICAkZWwuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJsU0FjdGlvblwiPjxhIGNsYXNzPVwibFNQcmV2XCI+JyArIHNldHRpbmdzLnByZXZIdG1sICsgJzwvYT48YSBjbGFzcz1cImxTTmV4dFwiPicgKyBzZXR0aW5ncy5uZXh0SHRtbCArICc8L2E+PC9kaXY+Jyk7XG4gICAgICAgICAgaWYgKCFzZXR0aW5ncy5hdXRvV2lkdGgpIHtcbiAgICAgICAgICAgIGlmIChsZW5ndGggPD0gc2V0dGluZ3MuaXRlbSkge1xuICAgICAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uJykuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocmVmcmVzaC5jYWxXaWR0aChmYWxzZSkgPCBlbFNpemUpIHtcbiAgICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbicpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2NsYXNzJykgPT09ICdsU1ByZXYnKSB7XG4gICAgICAgICAgICAgICRlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkZWwuZ29Ub05leHRTbGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5pdGlhbFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnZmFkZScpIHtcbiAgICAgICAgICBzZXR0aW5ncy5hdXRvV2lkdGggPSBmYWxzZTtcbiAgICAgICAgICBzZXR0aW5ncy5zbGlkZUVuZEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy5hdXRvKSB7XG4gICAgICAgICAgc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICAgICAgc2V0dGluZ3Muc2xpZGVNb3ZlID0gMTtcbiAgICAgICAgICBzZXR0aW5ncy5pdGVtID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCkge1xuICAgICAgICAgIHNldHRpbmdzLnNsaWRlTW92ZSA9IDE7XG4gICAgICAgICAgc2V0dGluZ3MuZnJlZU1vdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZXR0aW5ncy5vbkJlZm9yZVN0YXJ0LmNhbGwodGhpcywgJGVsKTtcbiAgICAgICAgcmVmcmVzaC5jaGJyZWFrcG9pbnQoKTtcbiAgICAgICAgJGVsLmFkZENsYXNzKCdsaWdodFNsaWRlcicpLndyYXAoJzxkaXYgY2xhc3M9XCJsU1NsaWRlT3V0ZXIgJyArIHNldHRpbmdzLmFkZENsYXNzICsgJ1wiPjxkaXYgY2xhc3M9XCJsU1NsaWRlV3JhcHBlclwiPjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAkc2xpZGUgPSAkZWwucGFyZW50KCcubFNTbGlkZVdyYXBwZXInKTtcbiAgICAgICAgaWYgKHNldHRpbmdzLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICRzbGlkZS5wYXJlbnQoKS5hZGRDbGFzcygnbFNydGwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwpIHtcbiAgICAgICAgICAkc2xpZGUucGFyZW50KCkuYWRkQ2xhc3MoJ3ZlcnRpY2FsJyk7XG4gICAgICAgICAgZWxTaXplID0gc2V0dGluZ3MudmVydGljYWxIZWlnaHQ7XG4gICAgICAgICAgJHNsaWRlLmNzcygnaGVpZ2h0JywgZWxTaXplICsgJ3B4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxTaXplID0gJGVsLm91dGVyV2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgICAkY2hpbGRyZW4uYWRkQ2xhc3MoJ2xzbGlkZScpO1xuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgcmVmcmVzaC5jYWxTVygpO1xuICAgICAgICAgIHJlZnJlc2guY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocmVmcmVzaC5jYWxXaWR0aCh0cnVlKSA+IGVsU2l6ZSkge1xuICAgICAgICAgICAgICAvKiovXG4gICAgICAgICAgICAgIHZhciB0V3IgPSAwLFxuICAgICAgICAgICAgICAgIHRJID0gMDtcbiAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCAkY2hpbGRyZW4ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICB0V3IgKz0gKHBhcnNlSW50KCRlbC5maW5kKCcubHNsaWRlJykuZXEoaykud2lkdGgoKSkgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICAgICAgICAgICAgdEkrKztcbiAgICAgICAgICAgICAgICBpZiAodFdyID49IChlbFNpemUgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikpIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgdEl0ZW0gPSBzZXR0aW5ncy5hdXRvV2lkdGggPT09IHRydWUgPyB0SSA6IHNldHRpbmdzLml0ZW07XG5cbiAgICAgICAgICAgICAgLyoqL1xuICAgICAgICAgICAgICBpZiAodEl0ZW0gPCAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aCAtIHRJdGVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICRjaGlsZHJlbi5lcShpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRJdGVtIDwgJGVsLmZpbmQoJy5jbG9uZS5yaWdodCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAkY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaiA+ICgkY2hpbGRyZW4ubGVuZ3RoIC0gMSAtICRlbC5maW5kKCcuY2xvbmUucmlnaHQnKS5sZW5ndGgpOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgIHNjZW5lLS07XG4gICAgICAgICAgICAgICAgICAkY2hpbGRyZW4uZXEoaikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgICAgZm9yICh2YXIgbiA9ICRlbC5maW5kKCcuY2xvbmUucmlnaHQnKS5sZW5ndGg7IG4gPCB0SXRlbTsgbisrKSB7XG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5sc2xpZGUnKS5lcShuKS5jbG9uZSgpLnJlbW92ZUNsYXNzKCdsc2xpZGUnKS5hZGRDbGFzcygnY2xvbmUgcmlnaHQnKS5hcHBlbmRUbygkZWwpO1xuICAgICAgICAgICAgICAgIHNjZW5lKys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZm9yICh2YXIgbSA9ICRlbC5maW5kKCcubHNsaWRlJykubGVuZ3RoIC0gJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoOyBtID4gKCRlbC5maW5kKCcubHNsaWRlJykubGVuZ3RoIC0gdEl0ZW0pOyBtLS0pIHtcbiAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmxzbGlkZScpLmVxKG0gLSAxKS5jbG9uZSgpLnJlbW92ZUNsYXNzKCdsc2xpZGUnKS5hZGRDbGFzcygnY2xvbmUgbGVmdCcpLnByZXBlbmRUbygkZWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRjaGlsZHJlbiA9ICRlbC5jaGlsZHJlbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCRjaGlsZHJlbi5oYXNDbGFzcygnY2xvbmUnKSkge1xuICAgICAgICAgICAgICAgICRlbC5maW5kKCcuY2xvbmUnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5tb3ZlKCRlbCwgMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlZnJlc2guY2xvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoLnNTVyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsZW5ndGggPSAkY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5ydGwgPT09IHRydWUgJiYgc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBndXR0ZXIgPSAnbWFyZ2luLWxlZnQnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgJGNoaWxkcmVuLmNzcyhwcm9wZXJ0eSwgc2xpZGVXaWR0aCArICdweCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkY2hpbGRyZW4uY3NzKGd1dHRlciwgc2V0dGluZ3Muc2xpZGVNYXJnaW4gKyAncHgnKTtcbiAgICAgICAgICB3ID0gcmVmcmVzaC5jYWxXaWR0aChmYWxzZSk7XG4gICAgICAgICAgJGVsLmNzcyhwcm9wZXJ0eSwgdyArICdweCcpO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgIGlmIChvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc2NlbmUgPSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZWZyZXNoLmNhbEwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJGNoaWxkcmVuID0gJGVsLmNoaWxkcmVuKCk7XG4gICAgICAgICAgbGVuZ3RoID0gJGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZG9Dc3MoKSkge1xuICAgICAgICAgICRzbGlkZS5hZGRDbGFzcygndXNpbmdDc3MnKTtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoLmNhbEwoKTtcbiAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICByZWZyZXNoLmNhbFNXKCk7XG4gICAgICAgICAgcmVmcmVzaC5zU1coKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2xpZGVWYWx1ZSA9ICR0aGlzLnNsaWRlVmFsdWUoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZSgkZWwsIHNsaWRlVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEhlaWdodCgkZWwsIGZhbHNlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEhlaWdodCgkZWwsIHRydWUpO1xuICAgICAgICAgICRlbC5hZGRDbGFzcygnbFNGYWRlJyk7XG4gICAgICAgICAgaWYgKCF0aGlzLmRvQ3NzKCkpIHtcbiAgICAgICAgICAgICRjaGlsZHJlbi5mYWRlT3V0KDApO1xuICAgICAgICAgICAgJGNoaWxkcmVuLmVxKHNjZW5lKS5mYWRlSW4oMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAkY2hpbGRyZW4uZXEoc2NlbmUpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkY2hpbGRyZW4uZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYWdlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICByZWZyZXNoLmNyZWF0ZVBhZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRodW1iV2lkdGggPSAoZWxTaXplIC0gKChzZXR0aW5ncy50aHVtYkl0ZW0gKiAoc2V0dGluZ3MudGh1bWJNYXJnaW4pKSAtIHNldHRpbmdzLnRodW1iTWFyZ2luKSkgLyBzZXR0aW5ncy50aHVtYkl0ZW07XG4gICAgICAgICAgdmFyICRjaGlsZHJlbiA9ICRzbGlkZS5maW5kKCcubHNsaWRlJyk7XG4gICAgICAgICAgdmFyIGxlbmd0aCA9ICRzbGlkZS5maW5kKCcubHNsaWRlJykubGVuZ3RoO1xuICAgICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgIHBhZ2VycyA9ICcnLFxuICAgICAgICAgICAgdiA9IDA7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgc2NlbmUgKiBzbGlkZSB2YWx1ZVxuICAgICAgICAgICAgICBpZiAoIXNldHRpbmdzLmF1dG9XaWR0aCkge1xuICAgICAgICAgICAgICAgIHYgPSBpICogKChzbGlkZVdpZHRoICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pICogc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ICs9ICgocGFyc2VJbnQoJGNoaWxkcmVuLmVxKGkpLndpZHRoKCkpICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pICogc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRodW1iID0gJGNoaWxkcmVuLmVxKGkgKiBzZXR0aW5ncy5zbGlkZU1vdmUpLmF0dHIoJ2RhdGEtdGh1bWInKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHBhZ2VycyArPSAnPGxpIHN0eWxlPVwid2lkdGg6MTAwJTsnICsgcHJvcGVydHkgKyAnOicgKyB0aHVtYldpZHRoICsgJ3B4OycgKyBndXR0ZXIgKyAnOicgKyBzZXR0aW5ncy50aHVtYk1hcmdpbiArICdweFwiPjxhIGhyZWY9XCIjXCI+PGltZyBzcmM9XCInICsgdGh1bWIgKyAnXCIgLz48L2E+PC9saT4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFnZXJzICs9ICc8bGk+PGEgaHJlZj1cIiNcIj4nICsgKGkgKyAxKSArICc8L2E+PC9saT4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgaWYgKCh2KSA+PSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgICAgICBpID0gaSArIDE7XG4gICAgICAgICAgICAgICAgdmFyIG1pblBnciA9IDI7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgcGFnZXJzICs9ICc8bGk+PGEgaHJlZj1cIiNcIj4nICsgKGkgKyAxKSArICc8L2E+PC9saT4nO1xuICAgICAgICAgICAgICAgICAgbWluUGdyID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBtaW5QZ3IpIHtcbiAgICAgICAgICAgICAgICAgIHBhZ2VycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAkc2xpZGUucGFyZW50KCkuYWRkQ2xhc3MoJ25vUGFnZXInKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJHNsaWRlLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdub1BhZ2VyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciAkY1NvdXRlciA9ICRzbGlkZS5wYXJlbnQoKTtcbiAgICAgICAgICAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmh0bWwocGFnZXJzKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIC8vIHNldCBHYWxsZXJ5IHRodW1ibmFpbCB3aWR0aFxuICAgICAgICAgICAgICAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmNzcygnd2lkdGgnLCBzZXR0aW5ncy52VGh1bWJXaWR0aCArICdweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFnZXJXaWR0aCA9IChpICogKHNldHRpbmdzLnRodW1iTWFyZ2luICsgdGh1bWJXaWR0aCkpICsgMC41O1xuICAgICAgICAgICAgJGNTb3V0ZXIuZmluZCgnLmxTUGFnZXInKS5jc3Moe1xuICAgICAgICAgICAgICBwcm9wZXJ0eTogcGFnZXJXaWR0aCArICdweCcsXG4gICAgICAgICAgICAgICd0cmFuc2l0aW9uLWR1cmF0aW9uJzogc2V0dGluZ3Muc3BlZWQgKyAnbXMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAkc2xpZGUucGFyZW50KCkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgKHNldHRpbmdzLnZUaHVtYldpZHRoICsgc2V0dGluZ3MuZ2FsbGVyeU1hcmdpbikgKyAncHgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRjU291dGVyLmZpbmQoJy5sU1BhZ2VyJykuY3NzKHByb3BlcnR5LCBwYWdlcldpZHRoICsgJ3B4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciAkcGFnZXIgPSAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmZpbmQoJ2xpJyk7XG4gICAgICAgICAgJHBhZ2VyLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICRwYWdlci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgIHNjZW5lID0gc2NlbmUgKyAoJHBhZ2VyLmluZGV4KHRoaXMpIC0gJGNTb3V0ZXIuZmluZCgnLmxTUGFnZXInKS5maW5kKCdsaS5hY3RpdmUnKS5pbmRleCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNjZW5lID0gJHBhZ2VyLmluZGV4KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGVsLm1vZGUoZmFsc2UpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgJHRoaXMuc2xpZGVUaHVtYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoc2V0dGluZ3MucGFnZXIpIHtcbiAgICAgICAgICB2YXIgY2wgPSAnbFNwZyc7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkpIHtcbiAgICAgICAgICAgIGNsID0gJ2xTR2FsbGVyeSc7XG4gICAgICAgICAgfVxuICAgICAgICAgICRzbGlkZS5hZnRlcignPHVsIGNsYXNzPVwibFNQYWdlciAnICsgY2wgKyAnXCI+PC91bD4nKTtcbiAgICAgICAgICB2YXIgZ01hcmdpbiA9IChzZXR0aW5ncy52ZXJ0aWNhbCkgPyAnbWFyZ2luLWxlZnQnIDogJ21hcmdpbi10b3AnO1xuICAgICAgICAgICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpLmNzcyhnTWFyZ2luLCBzZXR0aW5ncy5nYWxsZXJ5TWFyZ2luICsgJ3B4Jyk7XG4gICAgICAgICAgcmVmcmVzaC5jcmVhdGVQYWdlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVmcmVzaC5pbml0KCk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSxcbiAgICAgIHNldEhlaWdodDogZnVuY3Rpb24gKG9iLCBmYWRlKSB7XG4gICAgICAgIHZhciBvYmogPSBudWxsLFxuICAgICAgICAgICR0aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcbiAgICAgICAgICBvYmogPSBvYi5jaGlsZHJlbignLmxzbGlkZSAnKS5maXJzdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9iaiA9IG9iLmNoaWxkcmVuKCkuZmlyc3QoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2V0Q3NzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB0SCA9IG9iai5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgdFAgPSAwLFxuICAgICAgICAgICAgdEhUID0gdEg7XG4gICAgICAgICAgaWYgKGZhZGUpIHtcbiAgICAgICAgICAgIHRIID0gMDtcbiAgICAgICAgICAgIHRQID0gKCh0SFQpICogMTAwKSAvIGVsU2l6ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2IuY3NzKHtcbiAgICAgICAgICAgICdoZWlnaHQnOiB0SCArICdweCcsXG4gICAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiB0UCArICclJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBzZXRDc3MoKTtcbiAgICAgICAgaWYgKG9iai5maW5kKCdpbWcnKS5sZW5ndGgpIHtcbiAgICAgICAgICBpZiAob2JqLmZpbmQoJ2ltZycpWzBdLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICBzZXRDc3MoKTtcbiAgICAgICAgICAgIGlmICghaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmouZmluZCgnaW1nJykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldENzcygpO1xuICAgICAgICAgICAgICAgIGlmICghaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAgICR0aGlzLmF1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFpbnRlcnZhbCkge1xuICAgICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFjdGl2ZTogZnVuY3Rpb24gKG9iLCB0KSB7XG4gICAgICAgIGlmICh0aGlzLmRvQ3NzKCkgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnKSB7XG4gICAgICAgICAgJHNsaWRlLmFkZENsYXNzKCdvbicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzYyA9IDA7XG4gICAgICAgIGlmIChzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZSA8IGxlbmd0aCkge1xuICAgICAgICAgIG9iLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBpZiAoIXRoaXMuZG9Dc3MoKSAmJiBzZXR0aW5ncy5tb2RlID09PSAnZmFkZScgJiYgdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG9iLmZhZGVPdXQoc2V0dGluZ3Muc3BlZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2MgPSBzY2VuZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2MgPSBzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy90ID09PSB0cnVlID8gc2MgPSBzY2VuZSA6IHNjID0gc2NlbmUgKiBzZXR0aW5ncy5zbGlkZU1vdmU7XG4gICAgICAgICAgdmFyIGwsIG5sO1xuICAgICAgICAgIGlmICh0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsID0gb2IubGVuZ3RoO1xuICAgICAgICAgICAgbmwgPSBsIC0gMTtcbiAgICAgICAgICAgIGlmIChzYyArIDEgPj0gbCkge1xuICAgICAgICAgICAgICBzYyA9IG5sO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAvL3QgPT09IHRydWUgPyBzYyA9IHNjZW5lIC0gJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoIDogc2MgPSBzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZTtcbiAgICAgICAgICAgIGlmICh0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHNjID0gc2NlbmUgLSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzYyA9IHNjZW5lICogc2V0dGluZ3Muc2xpZGVNb3ZlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgbCA9IG9iLmxlbmd0aDtcbiAgICAgICAgICAgICAgbmwgPSBsIC0gMTtcbiAgICAgICAgICAgICAgaWYgKHNjICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgICAgIHNjID0gbmw7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2MgKyAxID4gbCkge1xuICAgICAgICAgICAgICAgIHNjID0gMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGhpcy5kb0NzcygpICYmIHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJyAmJiB0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgb2IuZXEoc2MpLmZhZGVJbihzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9iLmVxKHNjKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2IucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgIG9iLmVxKG9iLmxlbmd0aCAtIDEpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBpZiAoIXRoaXMuZG9Dc3MoKSAmJiBzZXR0aW5ncy5tb2RlID09PSAnZmFkZScgJiYgdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG9iLmZhZGVPdXQoc2V0dGluZ3Muc3BlZWQpO1xuICAgICAgICAgICAgb2IuZXEoc2MpLmZhZGVJbihzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbW92ZTogZnVuY3Rpb24gKG9iLCB2KSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICB2ID0gLXY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZG9Dc3MoKSkge1xuICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgb2IuY3NzKHtcbiAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgwcHgsICcgKyAoLXYpICsgJ3B4LCAwcHgpJyxcbiAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDBweCwgJyArICgtdikgKyAncHgsIDBweCknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2IuY3NzKHtcbiAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnICsgKC12KSArICdweCwgMHB4LCAwcHgpJyxcbiAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyAoLXYpICsgJ3B4LCAwcHgsIDBweCknLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgb2IuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICB0b3A6IC12ICsgJ3B4J1xuICAgICAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQsIHNldHRpbmdzLmVhc2luZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgbGVmdDogLXYgKyAncHgnXG4gICAgICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCwgc2V0dGluZ3MuZWFzaW5nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyICR0aHVtYiA9ICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpLmZpbmQoJ2xpJyk7XG4gICAgICAgIHRoaXMuYWN0aXZlKCR0aHVtYiwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgZmFkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZSgkY2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgICAgdmFyICR0aHVtYiA9ICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpLmZpbmQoJ2xpJyk7XG4gICAgICAgIHRoaXMuYWN0aXZlKCR0aHVtYiwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgc2xpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgcmVmcmVzaC5jYWxTbGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAodyA+IGVsU2l6ZSkge1xuICAgICAgICAgICAgc2xpZGVWYWx1ZSA9ICR0aGlzLnNsaWRlVmFsdWUoKTtcbiAgICAgICAgICAgICR0aGlzLmFjdGl2ZSgkY2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICgoc2xpZGVWYWx1ZSkgPiB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgICAgc2xpZGVWYWx1ZSA9IHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVWYWx1ZSA8IDApIHtcbiAgICAgICAgICAgICAgc2xpZGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkdGhpcy5tb3ZlKCRlbCwgc2xpZGVWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgIGlmIChzY2VuZSA+PSAobGVuZ3RoIC0gKCRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aCAvIHNldHRpbmdzLnNsaWRlTW92ZSkpKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucmVzZXRTbGlkZSgkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzY2VuZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICR0aGlzLnJlc2V0U2xpZGUoJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZWZyZXNoLmNhbFNsaWRlKCk7XG4gICAgICB9LFxuICAgICAgcmVzZXRTbGlkZTogZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbiBhJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNjZW5lID0gcztcbiAgICAgICAgICAkc2xpZGUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJzBtcycpO1xuICAgICAgICAgIHNsaWRlVmFsdWUgPSAkdGhpcy5zbGlkZVZhbHVlKCk7XG4gICAgICAgICAgJHRoaXMuYWN0aXZlKCRjaGlsZHJlbiwgZmFsc2UpO1xuICAgICAgICAgIHBsdWdpbi5tb3ZlKCRlbCwgc2xpZGVWYWx1ZSk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2xpZGUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgc2V0dGluZ3Muc3BlZWQgKyAnbXMnKTtcbiAgICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24gYScpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQgKyAxMDApO1xuICAgICAgfSxcbiAgICAgIHNsaWRlVmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9zViA9IDA7XG4gICAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgICAgX3NWID0gc2NlbmUgKiAoKHNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9zViA9IDA7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY2VuZTsgaSsrKSB7XG4gICAgICAgICAgICBfc1YgKz0gKHBhcnNlSW50KCRjaGlsZHJlbi5lcShpKS53aWR0aCgpKSArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zVjtcbiAgICAgIH0sXG4gICAgICBzbGlkZVRodW1iOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwb3NpdGlvbjtcbiAgICAgICAgc3dpdGNoIChzZXR0aW5ncy5jdXJyZW50UGFnZXJQb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWlkZGxlJzpcbiAgICAgICAgICAgIHBvc2l0aW9uID0gKGVsU2l6ZSAvIDIpIC0gKHRodW1iV2lkdGggLyAyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHBvc2l0aW9uID0gZWxTaXplIC0gdGh1bWJXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2MgPSBzY2VuZSAtICRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aDtcbiAgICAgICAgdmFyICRwYWdlciA9ICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpO1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJyAmJiBzZXR0aW5ncy5sb29wID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHNjID49ICRwYWdlci5jaGlsZHJlbigpLmxlbmd0aCkge1xuICAgICAgICAgICAgc2MgPSAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2MgPCAwKSB7XG4gICAgICAgICAgICBzYyA9ICRwYWdlci5jaGlsZHJlbigpLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRodW1iU2xpZGUgPSBzYyAqICgodGh1bWJXaWR0aCArIHNldHRpbmdzLnRodW1iTWFyZ2luKSkgLSAocG9zaXRpb24pO1xuICAgICAgICBpZiAoKHRodW1iU2xpZGUgKyBlbFNpemUpID4gcGFnZXJXaWR0aCkge1xuICAgICAgICAgIHRodW1iU2xpZGUgPSBwYWdlcldpZHRoIC0gZWxTaXplIC0gc2V0dGluZ3MudGh1bWJNYXJnaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRodW1iU2xpZGUgPCAwKSB7XG4gICAgICAgICAgdGh1bWJTbGlkZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb3ZlKCRwYWdlciwgdGh1bWJTbGlkZSk7XG4gICAgICB9LFxuICAgICAgYXV0bzogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2V0dGluZ3MuYXV0bykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgICAgICB9LCBzZXR0aW5ncy5wYXVzZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXVzZU9uSG92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHNldHRpbmdzLmF1dG8gJiYgc2V0dGluZ3MucGF1c2VPbkhvdmVyKSB7XG4gICAgICAgICAgJHNsaWRlLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbHMtaG92ZXInKTtcbiAgICAgICAgICAgICRlbC5wYXVzZSgpO1xuICAgICAgICAgICAgc2V0dGluZ3MuYXV0byA9IHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJHNsaWRlLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbHMtaG92ZXInKTtcbiAgICAgICAgICAgIGlmICghJHNsaWRlLmZpbmQoJy5saWdodFNsaWRlcicpLmhhc0NsYXNzKCdsc0dyYWJiaW5nJykpIHtcbiAgICAgICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG91Y2hNb3ZlOiBmdW5jdGlvbiAoZW5kQ29vcmRzLCBzdGFydENvb3Jkcykge1xuICAgICAgICAkc2xpZGUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJzBtcycpO1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgIHZhciBkaXN0YW5jZSA9IGVuZENvb3JkcyAtIHN0YXJ0Q29vcmRzO1xuICAgICAgICAgIHZhciBzd2lwZVZhbCA9IHNsaWRlVmFsdWUgLSBkaXN0YW5jZTtcbiAgICAgICAgICBpZiAoKHN3aXBlVmFsKSA+PSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5mcmVlTW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc3dpcGVWYWwgPSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgc3dpcGVWYWxUID0gdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgICAgICAgICBzd2lwZVZhbCA9IHN3aXBlVmFsVCArICgoc3dpcGVWYWwgLSBzd2lwZVZhbFQpIC8gNSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlVmFsIDwgMCkge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmZyZWVNb3ZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzd2lwZVZhbCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzd2lwZVZhbCA9IHN3aXBlVmFsIC8gNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlKCRlbCwgc3dpcGVWYWwpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICB0b3VjaEVuZDogZnVuY3Rpb24gKGRpc3RhbmNlKSB7XG4gICAgICAgICRzbGlkZS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBzZXR0aW5ncy5zcGVlZCArICdtcycpO1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgIHZhciBteFZhbCA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfbmV4dCA9IHRydWU7XG4gICAgICAgICAgc2xpZGVWYWx1ZSA9IHNsaWRlVmFsdWUgLSBkaXN0YW5jZTtcbiAgICAgICAgICBpZiAoKHNsaWRlVmFsdWUpID4gdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luKSB7XG4gICAgICAgICAgICBzbGlkZVZhbHVlID0gdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgbXhWYWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVWYWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHNsaWRlVmFsdWUgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZ0MgPSBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICAgICAgdmFyIGFkID0gMDtcbiAgICAgICAgICAgIGlmICghbXhWYWwpIHtcbiAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBhZCA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICAgICAgICAgIHZhciBudW0gPSBzbGlkZVZhbHVlIC8gKChzbGlkZVdpZHRoICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pICogc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICAgICAgICAgICAgc2NlbmUgPSBwYXJzZUludChudW0pICsgYWQ7XG4gICAgICAgICAgICAgIGlmIChzbGlkZVZhbHVlID49ICh3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG51bSAlIDEgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgIHNjZW5lKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgdFcgPSAwO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICRjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRXICs9IChwYXJzZUludCgkY2hpbGRyZW4uZXEoaSkud2lkdGgoKSkgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICAgICAgICAgICAgc2NlbmUgPSBpICsgYWQ7XG4gICAgICAgICAgICAgICAgaWYgKHRXID49IHNsaWRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGRpc3RhbmNlID49IHNldHRpbmdzLnN3aXBlVGhyZXNob2xkKSB7XG4gICAgICAgICAgICBnQyhmYWxzZSk7XG4gICAgICAgICAgICBfbmV4dCA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdGFuY2UgPD0gLXNldHRpbmdzLnN3aXBlVGhyZXNob2xkKSB7XG4gICAgICAgICAgICBnQyh0cnVlKTtcbiAgICAgICAgICAgIF9uZXh0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgICRlbC5tb2RlKF9uZXh0KTtcbiAgICAgICAgICB0aGlzLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZGlzdGFuY2UgPj0gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICRlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChkaXN0YW5jZSA8PSAtc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICRlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG5cblxuICAgICAgZW5hYmxlRHJhZzogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIWlzVG91Y2gpIHtcbiAgICAgICAgICB2YXIgc3RhcnRDb29yZHMgPSAwLFxuICAgICAgICAgICAgZW5kQ29vcmRzID0gMCxcbiAgICAgICAgICAgIGlzRHJhZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICRzbGlkZS5maW5kKCcubGlnaHRTbGlkZXInKS5hZGRDbGFzcygnbHNHcmFiJyk7XG4gICAgICAgICAgJHNsaWRlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHcgPCBlbFNpemUpIHtcbiAgICAgICAgICAgICAgaWYgKHcgIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5hdHRyKCdjbGFzcycpICE9PSAoJ2xTUHJldicpICYmICQoZS50YXJnZXQpLmF0dHIoJ2NsYXNzJykgIT09ICgnbFNOZXh0JykpIHtcbiAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpID8gZS5wYWdlWSA6IGUucGFnZVg7XG4gICAgICAgICAgICAgIGlzRHJhZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyAqKiBGaXggZm9yIHdlYmtpdCBjdXJzb3IgaXNzdWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI2NzIzXG4gICAgICAgICAgICAgICRzbGlkZS5zY3JvbGxMZWZ0ICs9IDE7XG4gICAgICAgICAgICAgICRzbGlkZS5zY3JvbGxMZWZ0IC09IDE7XG4gICAgICAgICAgICAgIC8vICpcbiAgICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5saWdodFNsaWRlcicpLnJlbW92ZUNsYXNzKCdsc0dyYWInKS5hZGRDbGFzcygnbHNHcmFiYmluZycpO1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoaXNEcmFnaW5nKSB7XG4gICAgICAgICAgICAgIGVuZENvb3JkcyA9IChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgPyBlLnBhZ2VZIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgJHRoaXMudG91Y2hNb3ZlKGVuZENvb3Jkcywgc3RhcnRDb29yZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgICQod2luZG93KS5vbignbW91c2V1cCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoaXNEcmFnaW5nKSB7XG4gICAgICAgICAgICAgICRzbGlkZS5maW5kKCcubGlnaHRTbGlkZXInKS5yZW1vdmVDbGFzcygnbHNHcmFiYmluZycpLmFkZENsYXNzKCdsc0dyYWInKTtcbiAgICAgICAgICAgICAgaXNEcmFnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIGVuZENvb3JkcyA9IChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgPyBlLnBhZ2VZIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gZW5kQ29vcmRzIC0gc3RhcnRDb29yZHM7XG4gICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPj0gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ2NsaWNrLmxzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9mZignY2xpY2subHMnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICR0aGlzLnRvdWNoRW5kKGRpc3RhbmNlKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuXG5cblxuXG4gICAgICBlbmFibGVUb3VjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IHt9LFxuICAgICAgICAgICAgZW5kQ29vcmRzID0ge307XG4gICAgICAgICAgJHNsaWRlLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGVuZENvb3JkcyA9IGUub3JpZ2luYWxFdmVudC50YXJnZXRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgc3RhcnRDb29yZHMucGFnZVggPSBlLm9yaWdpbmFsRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgIHN0YXJ0Q29vcmRzLnBhZ2VZID0gZS5vcmlnaW5hbEV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkc2xpZGUub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodyA8IGVsU2l6ZSkge1xuICAgICAgICAgICAgICBpZiAodyAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9yaWcgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgICBlbmRDb29yZHMgPSBvcmlnLnRhcmdldFRvdWNoZXNbMF07XG4gICAgICAgICAgICB2YXIgeE1vdmVtZW50ID0gTWF0aC5hYnMoZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVgpO1xuICAgICAgICAgICAgdmFyIHlNb3ZlbWVudCA9IE1hdGguYWJzKGVuZENvb3Jkcy5wYWdlWSAtIHN0YXJ0Q29vcmRzLnBhZ2VZKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBpZiAoKHlNb3ZlbWVudCAqIDMpID4geE1vdmVtZW50KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLnRvdWNoTW92ZShlbmRDb29yZHMucGFnZVksIHN0YXJ0Q29vcmRzLnBhZ2VZKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICgoeE1vdmVtZW50ICogMykgPiB5TW92ZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMudG91Y2hNb3ZlKGVuZENvb3Jkcy5wYWdlWCwgc3RhcnRDb29yZHMucGFnZVgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJHNsaWRlLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh3IDwgZWxTaXplKSB7XG4gICAgICAgICAgICAgIGlmICh3ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2U7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgZGlzdGFuY2UgPSBlbmRDb29yZHMucGFnZVkgLSBzdGFydENvb3Jkcy5wYWdlWTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpc3RhbmNlID0gZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkdGhpcy50b3VjaEVuZChkaXN0YW5jZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICAkdGhpcy5pbml0aWFsU3R5bGUoKTtcbiAgICAgICAgaWYgKHRoaXMuZG9Dc3MoKSkge1xuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLmVuYWJsZVRvdWNoID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkdGhpcy5lbmFibGVUb3VjaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZW5hYmxlRHJhZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgJHRoaXMuZW5hYmxlRHJhZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQod2luZG93KS5vbignZm9jdXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKHdpbmRvdykub24oJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR0aGlzLnBhZ2VyKCk7XG4gICAgICAgICR0aGlzLnBhdXNlT25Ib3ZlcigpO1xuICAgICAgICAkdGhpcy5jb250cm9scygpO1xuICAgICAgICAkdGhpcy5rZXlQcmVzcygpO1xuICAgICAgfVxuICAgIH07XG4gICAgcGx1Z2luLmJ1aWxkKCk7XG4gICAgcmVmcmVzaC5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVmcmVzaC5jaGJyZWFrcG9pbnQoKTtcbiAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MuaXRlbSA+IDEpIHtcbiAgICAgICAgICBlbFNpemUgPSBzZXR0aW5ncy52ZXJ0aWNhbEhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbFNpemUgPSAkY2hpbGRyZW4ub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgICAkc2xpZGUuY3NzKCdoZWlnaHQnLCBlbFNpemUgKyAncHgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsU2l6ZSA9ICRzbGlkZS5vdXRlcldpZHRoKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgIHJlZnJlc2guY2xvbmUoKTtcbiAgICAgIH1cbiAgICAgIHJlZnJlc2guY2FsTCgpO1xuICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdsU1NsaWRlJyk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICByZWZyZXNoLmNhbFNXKCk7XG4gICAgICAgIHJlZnJlc2guc1NXKCk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2xTU2xpZGUnKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgICBpZiAoc2V0dGluZ3MucGFnZXIpIHtcbiAgICAgICAgcmVmcmVzaC5jcmVhdGVQYWdlcigpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICYmIHNldHRpbmdzLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAkZWwuY3NzKCdoZWlnaHQnLCAkY2hpbGRyZW4uZXEoc2NlbmUpLm91dGVySGVpZ2h0KHRydWUpKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5hZGFwdGl2ZUhlaWdodCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBwbHVnaW4uc2V0SGVpZ2h0KCRlbCwgZmFsc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW4uYXV0bygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwbHVnaW4uc2V0SGVpZ2h0KCRlbCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgIHBsdWdpbi5zbGlkZVRodW1iKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICBwbHVnaW4uc2xpZGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgIGlmICgkY2hpbGRyZW4ubGVuZ3RoIDw9IHNldHRpbmdzLml0ZW0pIHtcbiAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uJykuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24nKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgocmVmcmVzaC5jYWxXaWR0aChmYWxzZSkgPCBlbFNpemUpICYmICh3ICE9PSAwKSkge1xuICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24nKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbicpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgJGVsLmdvVG9QcmV2U2xpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2NlbmUgPiAwKSB7XG4gICAgICAgIHNldHRpbmdzLm9uQmVmb3JlUHJldlNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgIHNjZW5lLS07XG4gICAgICAgICRlbC5tb2RlKGZhbHNlKTtcbiAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICBwbHVnaW4uc2xpZGVUaHVtYigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNldHRpbmdzLm9uQmVmb3JlUHJldlNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJykge1xuICAgICAgICAgICAgdmFyIGwgPSAobGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBzY2VuZSA9IHBhcnNlSW50KGwgLyBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBsdWdpbi5zbGlkZVRodW1iKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKCdsZWZ0RW5kJyk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2xlZnRFbmQnKTtcbiAgICAgICAgICB9LCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAkZWwuZ29Ub05leHRTbGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBuZXh0SSA9IHRydWU7XG4gICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICB2YXIgX3NsaWRlVmFsdWUgPSBwbHVnaW4uc2xpZGVWYWx1ZSgpO1xuICAgICAgICBuZXh0SSA9IF9zbGlkZVZhbHVlIDwgdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgfVxuICAgICAgaWYgKCgoc2NlbmUgKiBzZXR0aW5ncy5zbGlkZU1vdmUpIDwgbGVuZ3RoIC0gc2V0dGluZ3Muc2xpZGVNb3ZlKSAmJiBuZXh0SSkge1xuICAgICAgICBzZXR0aW5ncy5vbkJlZm9yZU5leHRTbGlkZS5jYWxsKHRoaXMsICRlbCwgc2NlbmUpO1xuICAgICAgICBzY2VuZSsrO1xuICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgICAgcGx1Z2luLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUpIHtcbiAgICAgICAgICBzZXR0aW5ncy5vbkJlZm9yZU5leHRTbGlkZS5jYWxsKHRoaXMsICRlbCwgc2NlbmUpO1xuICAgICAgICAgIHNjZW5lID0gMDtcbiAgICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBsdWdpbi5zbGlkZVRodW1iKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKCdyaWdodEVuZCcpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdyaWdodEVuZCcpO1xuICAgICAgICAgIH0sIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgICRlbC5tb2RlID0gZnVuY3Rpb24gKF90b3VjaCkge1xuICAgICAgaWYgKHNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICYmIHNldHRpbmdzLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAkZWwuY3NzKCdoZWlnaHQnLCAkY2hpbGRyZW4uZXEoc2NlbmUpLm91dGVySGVpZ2h0KHRydWUpKTtcbiAgICAgIH1cbiAgICAgIGlmIChvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICBpZiAocGx1Z2luLmRvQ3NzKCkpIHtcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygnbFNTbGlkZScpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnNwZWVkICE9PSAnJykge1xuICAgICAgICAgICAgICAkc2xpZGUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgc2V0dGluZ3Muc3BlZWQgKyAnbXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5jc3NFYXNpbmcgIT09ICcnKSB7XG4gICAgICAgICAgICAgICRzbGlkZS5jc3MoJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJywgc2V0dGluZ3MuY3NzRWFzaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHBsdWdpbi5kb0NzcygpKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3Muc3BlZWQgIT09ICcnKSB7XG4gICAgICAgICAgICAgICRlbC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBzZXR0aW5ncy5zcGVlZCArICdtcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmNzc0Vhc2luZyAhPT0gJycpIHtcbiAgICAgICAgICAgICAgJGVsLmNzcygndHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nLCBzZXR0aW5ncy5jc3NFYXNpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFfdG91Y2gpIHtcbiAgICAgICAgc2V0dGluZ3Mub25CZWZvcmVTbGlkZS5jYWxsKHRoaXMsICRlbCwgc2NlbmUpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgcGx1Z2luLnNsaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbHVnaW4uZmFkZSgpO1xuICAgICAgfVxuICAgICAgaWYgKCEkc2xpZGUuaGFzQ2xhc3MoJ2xzLWhvdmVyJykpIHtcbiAgICAgICAgcGx1Z2luLmF1dG8oKTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIV90b3VjaCkge1xuICAgICAgICAgIHNldHRpbmdzLm9uQWZ0ZXJTbGlkZS5jYWxsKHRoaXMsICRlbCwgc2NlbmUpO1xuICAgICAgICB9XG4gICAgICB9LCBzZXR0aW5ncy5zcGVlZCk7XG4gICAgICBvbiA9IHRydWU7XG4gICAgfTtcbiAgICAkZWwucGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICBzZXR0aW5ncy5hdXRvID0gdHJ1ZTtcbiAgICAgIHBsdWdpbi5hdXRvKCk7XG4gICAgfTtcbiAgICAkZWwucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXR0aW5ncy5hdXRvID0gZmFsc2U7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9O1xuICAgICRlbC5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVmcmVzaC5pbml0KCk7XG4gICAgfTtcbiAgICAkZWwuZ2V0Q3VycmVudFNsaWRlQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2MgPSBzY2VuZTtcbiAgICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XG4gICAgICAgIHZhciBsbiA9ICRzbGlkZS5maW5kKCcubHNsaWRlJykubGVuZ3RoLFxuICAgICAgICAgIGNsID0gJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoO1xuICAgICAgICBpZiAoc2NlbmUgPD0gY2wgLSAxKSB7XG4gICAgICAgICAgc2MgPSBsbiArIChzY2VuZSAtIGNsKTtcbiAgICAgICAgfSBlbHNlIGlmIChzY2VuZSA+PSAobG4gKyBjbCkpIHtcbiAgICAgICAgICBzYyA9IHNjZW5lIC0gbG4gLSBjbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzYyA9IHNjZW5lIC0gY2w7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzYyArIDE7XG4gICAgfTtcbiAgICAkZWwuZ2V0VG90YWxTbGlkZUNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICRzbGlkZS5maW5kKCcubHNsaWRlJykubGVuZ3RoO1xuICAgIH07XG4gICAgJGVsLmdvVG9TbGlkZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICBpZiAoc2V0dGluZ3MubG9vcCkge1xuICAgICAgICBzY2VuZSA9IChzICsgJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoIC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZSA9IHM7XG4gICAgICB9XG4gICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICBwbHVnaW4uc2xpZGVUaHVtYigpO1xuICAgICAgfVxuICAgIH07XG4gICAgJGVsLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJGVsLmxpZ2h0U2xpZGVyKSB7XG4gICAgICAgICRlbC5nb1RvUHJldlNsaWRlID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAkZWwuZ29Ub05leHRTbGlkZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgJGVsLm1vZGUgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5wbGF5ID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAkZWwucGF1c2UgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5yZWZyZXNoID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAkZWwuZ2V0Q3VycmVudFNsaWRlQ291bnQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5nZXRUb3RhbFNsaWRlQ291bnQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5nb1RvU2xpZGUgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5saWdodFNsaWRlciA9IG51bGw7XG4gICAgICAgIHJlZnJlc2ggPSB7XG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkgeyB9XG4gICAgICAgIH07XG4gICAgICAgICRlbC5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcubFNBY3Rpb24sIC5sU1BhZ2VyJykucmVtb3ZlKCk7XG4gICAgICAgICRlbC5yZW1vdmVDbGFzcygnbGlnaHRTbGlkZXIgbFNGYWRlIGxTU2xpZGUgbHNHcmFiIGxzR3JhYmJpbmcgbGVmdEVuZCByaWdodCcpLnJlbW92ZUF0dHIoJ3N0eWxlJykudW53cmFwKCkudW53cmFwKCk7XG4gICAgICAgICRlbC5jaGlsZHJlbigpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICRjaGlsZHJlbi5yZW1vdmVDbGFzcygnbHNsaWRlIGFjdGl2ZScpO1xuICAgICAgICAkZWwuZmluZCgnLmNsb25lJykucmVtb3ZlKCk7XG4gICAgICAgICRjaGlsZHJlbiA9IG51bGw7XG4gICAgICAgIGludGVydmFsID0gbnVsbDtcbiAgICAgICAgb24gPSBmYWxzZTtcbiAgICAgICAgc2NlbmUgPSAwO1xuICAgICAgfVxuXG4gICAgfTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldHRpbmdzLm9uU2xpZGVyTG9hZC5jYWxsKHRoaXMsICRlbCk7XG4gICAgfSwgMTApO1xuICAgICQod2luZG93KS5vbigncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaC5pbml0KCk7XG4gICAgICB9LCAyMDApO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xufShqUXVlcnkpKTsiLCIvKlxuICogQEF1dGhvcjogUmFqa2VzaHdhciBQcmFzYWQocmFqa2VzaHdhci5wZEBnbWFpbC5jb20pIFxuICogQERhdGU6IDIwMTktMDItMjMgMjI6MjQ6MzIgXG4gKiBATGFzdCBNb2RpZmllZCBieTogUmFqa2VzaHdhciBQcmFzYWRcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTktMDMtMTkgMjM6MTY6NTBcbiAqL1xuXG5yZXF1aXJlKCcuL2FwcC9zdHlsZXMuc2NzcycpO1xucmVxdWlyZSgnLi9hcHAvc2xpZGVyL3NsaWRlci5zY3NzJyk7XG5yZXF1aXJlKCcuL2Fzc2V0cy9lcy1zbGlkZXInKTtcblxuaW1wb3J0IENlQ2hlY2tib3ggZnJvbSAnLi9hcHAvY2hlY2tib3gvY2UtY2hlY2tib3gnO1xuaW1wb3J0IHsgXG4gIENlQWNjb3JkaW9uLCBDZUFjY29yZGlvbkhlYWRpbmcsIENlQWNjb3JkaW9uUGFuZWwgXG59IGZyb20gJy4vYXBwL2FjY29yZGlvbi9jZS1hY2NvcmRpb24nO1xuXG5pbXBvcnQgeyBDZVRhYiwgQ2VUYWJzLCBDZVRhYlBhbmVsIH0gZnJvbSAnLi9hcHAvdGFicy9jZS10YWInO1xuaW1wb3J0IHsgQ2VUb2dnbGVCdXR0b24gfSBmcm9tICcuL2FwcC90b2dnbGUvY2UtdG9nZ2xlJztcbmltcG9ydCB7IENlVG9vbHRpcCB9IGZyb20gJy4vYXBwL3Rvb2x0aXAvY2UtdG9vbHRpcCc7XG5pbXBvcnQgeyBDZVJhZGlvQnV0dG9uLCBDZVJhZGlvR3JvdXAgfSBmcm9tICcuL2FwcC9yYWRpb2dyb3VwL2NlLXJhZGlvZ3JvdXAnO1xuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1jaGVja2JveCcsIENlQ2hlY2tib3gpOyBcblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtYWNjb3JkaW9uJywgQ2VBY2NvcmRpb24pO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtYWNjb3JkaW9uLWhlYWRpbmcnLCBDZUFjY29yZGlvbkhlYWRpbmcpO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtYWNjb3JkaW9uLXBhbmVsJywgQ2VBY2NvcmRpb25QYW5lbCk7XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRhYicsIENlVGFiKTtcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRhYnMnLCBDZVRhYnMpO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtdGFiLXBhbmVsJywgQ2VUYWJQYW5lbCk7IFxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS10b2dnbGUtYnV0dG9uJywgQ2VUb2dnbGVCdXR0b24pO1xuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS10b29sdGlwJywgQ2VUb29sdGlwKTtcblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtcmFkaW8tYnV0dG9uJywgQ2VSYWRpb0J1dHRvbik7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1yYWRpby1ncm91cCcsIENlUmFkaW9Hcm91cCk7XG5cblxucmVxdWlyZSgnLi9hcHAvdWktcm91dGVyJyk7XG5yZXF1aXJlKCcuL2FwcC9saW5rcycpO1xucmVxdWlyZSgnLi9hcHAvZXZlbnQvZXZlbnQnKTtcblxucmVxdWlyZSgnLi9hcHAvYnV0dG9uL2J1dHRvbicpO1xucmVxdWlyZSgnLi9hcHAvdHJlZS90cmVlJyk7XG5yZXF1aXJlKCcuL2FwcC9zbGlkZXIvc2xpZGVyJyk7XG5yZXF1aXJlKCcuL2FwcC9zbGlkZXIvY2Utc2xpZGVyJyk7XG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9