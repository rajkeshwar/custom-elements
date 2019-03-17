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
/******/ 	var hotCurrentHash = "4f779619a7411381d341";
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/styles.scss":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/app/styles.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "ce-checkbox {\n  vertical-align: middle; }\n\nce-label {\n  vertical-align: middle;\n  display: inline-block;\n  font-weight: bold;\n  font-family: sans-serif;\n  font-size: 20px;\n  margin-left: 8px; }\n\nce-accordion-heading {\n  background-color: white;\n  border: 1px solid black; }\n\nce-accordion-heading + ce-accordion-heading {\n  border-top: none; }\n\nce-accordion-heading[expanded] {\n  background-color: bisque; }\n\nce-accordion-panel {\n  padding: 20px;\n  background-color: lightgray; }\n\nce-tab {\n  border: 1px solid black;\n  padding: 20px; }\n\nce-tab-panel {\n  padding: 20px;\n  background-color: lightgray; }\n\nce-tab[selected] {\n  background-color: bisque; }\n\nce-tabs:not(:defined),\nce-tab:not(:defined),\nce-tab-panel:not(:defined) {\n  display: block; }\n\nce-toggle-button {\n  background-color: #eee;\n  padding: 3px;\n  cursor: default;\n  user-select: none;\n  border: 1px solid #333;\n  border-radius: 3px;\n  transition: background-color .2s ease; }\n\nce-toggle-button[pressed],\nce-toggle-button:not([disabled]):active {\n  background-color: #999; }\n\nce-toggle-button[disabled] {\n  opacity: 0.35; }\n\nhtml, body {\n  padding: 0;\n  margin: 0; }\n  html *, body * {\n    box-sizing: border-box; }\n\n.ui-demo {\n  display: flex;\n  height: 100%;\n  min-height: 100vh;\n  width: 100%; }\n  .ui-demo .sidenav {\n    flex-basis: 300px;\n    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3); }\n  .ui-demo .content {\n    flex: 1;\n    border-left: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 20px; }\n\nui-router {\n  display: block;\n  width: 100%; }\n\n.ui-elements {\n  padding: 0;\n  margin: 0;\n  list-style-type: none;\n  background: #fafafa; }\n  .ui-elements__item {\n    border-bottom: 1px solid #ccc;\n    transition: box-shadow .3s linear;\n    position: relative;\n    box-sizing: border-box; }\n    .ui-elements__item a {\n      padding: 10px 20px;\n      display: inline-block;\n      width: 100%; }\n    .ui-elements__item:hover {\n      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.3);\n      border-bottom: 1px solid #fff; }\n      .ui-elements__item:hover:before {\n        content: '';\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        height: 100%;\n        width: 5px;\n        background: #2f62a3; }\n", ""]);



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
 * @Last Modified time: 2019-02-24 00:37:46
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

    _this.shadowRoot.appendChild(template.content.cloneNode(true)); // console.log('Constructor gets called');


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
 * @Last Modified time: 2019-03-17 10:09:53
 */
__webpack_require__(/*! ./app/styles.scss */ "./src/app/styles.scss");







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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9idXR0b24vYnV0dG9uLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RyZWUvdHJlZS5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hY2NvcmRpb24vY2UtYWNjb3JkaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYnV0dG9uL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2J1dHRvbi9idXR0b24uc2Nzcz84M2Q1Iiwid2VicGFjazovLy8uL3NyYy9hcHAvY2hlY2tib3gvY2UtY2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9ldmVudC9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2xpbmtzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvcmFkaW9ncm91cC9jZS1yYWRpb2dyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc3R5bGVzLnNjc3M/NmJhZSIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RhYnMvY2UtdGFiLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdG9nZ2xlL2NlLXRvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3Rvb2x0aXAvY2UtdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RyZWUvdHJlZS1kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdHJlZS90cmVlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdHJlZS90cmVlLnNjc3M/OGJlZSIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3VpLXJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQUNDT1JESU9OX0hFQURFUiIsIkFDQ09SRElPTl9QQU5FTCIsIktFWUNPREUiLCJET1dOIiwiTEVGVCIsIlJJR0hUIiwiVVAiLCJIT01FIiwiRU5EIiwiYWNjb3JkaW9uVGVtcGxhdGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJDZUFjY29yZGlvbiIsImF0dGFjaFNoYWRvdyIsIm1vZGUiLCJzaGFkb3dSb290IiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vbkNoYW5nZSIsIl9vbktleURvd24iLCJQcm9taXNlIiwiYWxsIiwiY3VzdG9tRWxlbWVudHMiLCJ3aGVuRGVmaW5lZCIsInRoZW4iLCJfIiwiaGVhZGluZ3MiLCJfYWxsSGVhZGluZ3MiLCJmb3JFYWNoIiwiaGVhZGluZyIsInNldEF0dHJpYnV0ZSIsInBhbmVsIiwiX3BhbmVsRm9ySGVhZGluZyIsImlkIiwiZXhwYW5kZWQiLCJfY29sbGFwc2VIZWFkaW5nIiwiX2NvbGxhcHNlUGFuZWwiLCJfZXhwYW5kSGVhZGluZyIsIl9leHBhbmRQYW5lbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbGVtIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiZXZlbnQiLCJfYW5pbWF0ZVBhbmVsRm9ySGVhZGluZyIsInRhcmdldCIsImRldGFpbCIsImlzRXhwYW5kZWROb3ciLCJleHBhbmQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIl9hbmltYXRlSW4iLCJfYW5pbWF0ZU91dCIsImN1cnJlbnRIZWFkaW5nIiwiX2lzSGVhZGluZyIsImFsdEtleSIsIm5ld0hlYWRpbmciLCJrZXlDb2RlIiwiX3ByZXZIZWFkaW5nIiwiX25leHRIZWFkaW5nIiwiX2ZpcnN0SGVhZGluZyIsIl9sYXN0SGVhZGluZyIsInByZXZlbnREZWZhdWx0IiwiZm9jdXMiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwibmV4dCIsIm5leHRFbGVtZW50U2libGluZyIsImNvbnNvbGUiLCJlcnJvciIsIm5ld0lkeCIsImZpbmRJbmRleCIsImFjdGl2ZUVsZW1lbnQiLCJsZW5ndGgiLCJoZWlnaHQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJfYW5pbWF0ZSIsInN0YXJ0T2Zmc2V0IiwiZW5kT2Zmc2V0IiwicmVzb2x2ZSIsImFkZCIsImNoaWxkcmVuIiwiaWR4IiwiaW5kZXhPZiIsImFuaW1hdGVkQ2hpbGRyZW4iLCJzbGljZSIsInN0eWxlIiwib3ZlcmZsb3ciLCJjaGlsZCIsInBvc2l0aW9uIiwiekluZGV4IiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJvbWlzZSIsInRyYW5zaXRpb25FbmRQcm9taXNlIiwicmVtb3ZlIiwiSFRNTEVsZW1lbnQiLCJoZWFkaW5nSWRDb3VudGVyIiwiYWNjb3JkaW9uSGVhZGluZ1RlbXBsYXRlIiwiQ2VBY2NvcmRpb25IZWFkaW5nIiwiX29uQ2xpY2siLCJiaW5kIiwiZGVsZWdhdGVzRm9jdXMiLCJfc2hhZG93QnV0dG9uIiwicXVlcnlTZWxlY3RvciIsImhhc0F0dHJpYnV0ZSIsIm5hbWUiLCJ2YWx1ZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJCb29sZWFuIiwicmVtb3ZlQXR0cmlidXRlIiwiYWNjb3JkaW9uUGFuZWxUZW1wbGF0ZSIsInBhbmVsSWRDb3VudGVyIiwiQ2VBY2NvcmRpb25QYW5lbCIsInZhbCIsImVsZW1lbnQiLCJmIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiQnV0dG9uIiwidGVtcGxhdGUiLCJsb2ciLCJlIiwiY29tcG9zZWRQYXRoIiwiX2ZvY3VzIiwiZm9jdXNFbGVtZW50IiwiZGlzYWJsZWQiLCJfc2V0Rm9jdXNlZCIsImF0dHJOYW1lIiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsImRlZmluZSIsImlzIiwiU1BBQ0UiLCJDZUNoZWNrYm94IiwiX3VwZ3JhZGVQcm9wZXJ0eSIsIl9vbktleVVwIiwicHJvcCIsImhhc093blByb3BlcnR5IiwiaGFzVmFsdWUiLCJibHVyIiwiX3RvZ2dsZUNoZWNrZWQiLCJjaGVja2VkIiwiaXNDaGVja2VkIiwiaXNEaXNhYmxlZCIsIlVpRXZlbnQiLCJjaXR5IiwiX3JlbmRlciIsIl9hZGRFdmVudExpc3RlbmVycyIsImV2dCIsImVsIiwiYXR0cmlidXRlcyIsImZpbHRlciIsImF0dHIiLCJ0ZXN0IiwidGFyZ2V0Rm4iLCJldmFsIiwiZXZlbnROYW1lIiwicmVwbGFjZSIsImFwcGx5IiwiZnVuY3Rpb25BbmRQYXJhbXMiLCJleGVjIiwicGFyYW1zIiwic3BsaXQiLCJ3aW5kb3ciLCJvbmxvYWQiLCJiaW5kTGlua3MiLCJsaW5rcyIsImxpbmsiLCJoaWphY2tMaW5rcyIsInBhZ2UiLCJnZXRBdHRyaWJ1dGUiLCJfbG9hZFZpZXciLCJwYWdlVXJsIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJuZXdEb2MiLCJyZXNwb25zZSIsInJvdXRlclNsb3QiLCJyZXNwb25zZVR5cGUiLCJvcGVuIiwic2VuZCIsInJhZGlvQnV0dG9uVGVtcGxhdGUiLCJDZVJhZGlvQnV0dG9uIiwicmFkaW9Hcm91cFRlbXBsYXRlIiwiQ2VSYWRpb0dyb3VwIiwiZmlyc3RDaGVja2VkQnV0dG9uIiwiY2hlY2tlZFJhZGlvQnV0dG9uIiwiX3VuY2hlY2tBbGwiLCJfY2hlY2tOb2RlIiwiaGFzUm9sZVJhZGlvIiwiX3NldENoZWNrZWRUb1ByZXZCdXR0b24iLCJfc2V0Q2hlY2tlZFRvTmV4dEJ1dHRvbiIsIl9zZXRDaGVja2VkIiwiZmlyc3RSYWRpb0J1dHRvbiIsImxhc3RSYWRpb0J1dHRvbiIsIm5vZGUiLCJwcmV2IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNoZWNrZWRCdXR0b24iLCJfcHJldlJhZGlvQnV0dG9uIiwiX25leHRSYWRpb0J1dHRvbiIsIl9mb2N1c05vZGUiLCJyYWRpb0J1dHRvbnMiLCJpIiwiYnRuIiwidGFiSW5kZXgiLCJDZVRhYnMiLCJfb25TbG90Q2hhbmdlIiwiX3RhYlNsb3QiLCJfcGFuZWxTbG90IiwiX2xpbmtQYW5lbHMiLCJ0YWJzIiwiX2FsbFRhYnMiLCJ0YWIiLCJzZWxlY3RlZFRhYiIsImZpbmQiLCJzZWxlY3RlZCIsIl9zZWxlY3RUYWIiLCJwYW5lbElkIiwicGFuZWxzIiwiX2FsbFBhbmVscyIsImhpZGRlbiIsIm5ld1RhYiIsInJlc2V0IiwibmV3UGFuZWwiLCJfcGFuZWxGb3JUYWIiLCJFcnJvciIsIm5ld1BhbmVsSWQiLCJfcHJldlRhYiIsIl9uZXh0VGFiIiwiX2ZpcnN0VGFiIiwiX2xhc3RUYWIiLCJjZVRhYkNvdW50ZXIiLCJDZVRhYiIsImNlUGFuZWxDb3VudGVyIiwiQ2VUYWJQYW5lbCIsIkVOVEVSIiwiQ2VUb2dnbGVCdXR0b24iLCJfdG9nZ2xlUHJlc3NlZCIsInByZXNzZWQiLCJpc1ByZXNzZWQiLCJDZVRvb2x0aXAiLCJfc2hvdyIsIl9oaWRlIiwiX3RhcmdldCIsIlRyZWVEYXRhIiwiVHJlZSIsIl9yZW5kZXJUcmVlIiwiZGF0YSIsImJ1aWxkTm9kZSIsInJlZHVjZSIsInQiLCJkIiwidHlwZSIsImZvbGRlcnMiLCJoYW5kbGVDbGljayIsImlzRXhwYW5kZWQiLCJzdG9wUHJvcGFnYXRpb24iLCJVaVJvdXRlciIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxj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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQSxLQUFLLEtBQXdDLEVBQUUsRUFFN0M7O0FBRUYsUUFBUSxzQkFBaUI7QUFDekI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtB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LENBQUMvSSxjQUFQLENBQXNCOEcsTUFBdEIsQ0FBNkIsWUFBN0IsRUFBMkMrRyxpRUFBM0M7QUFFQTlFLE1BQU0sQ0FBQy9JLGNBQVAsQ0FBc0I4RyxNQUF0QixDQUE2QixpQkFBN0IsRUFBZ0RvRCwyRUFBaEQ7QUFDQW5CLE1BQU0sQ0FBQy9JLGNBQVAsQ0FBc0I4RyxNQUF0QixDQUE2QixnQkFBN0IsRUFBK0NzRCwwRUFBL0M7O0FBR0EyRSxtQkFBTyxDQUFDLCtDQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsdUNBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxtREFBRCxDQUFQOztBQUVBQSxtQkFBTyxDQUFDLHVEQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsK0NBQUQsQ0FBUCxDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI0Zjc3OTYxOWE3NDExMzgxZDM0MVwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiY2UtYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuXFxuY2UtYnV0dG9uW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnZhYWRpbi1idXR0b24tY29udGFpbmVyOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFwyMDAzXFxcIjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAwOyB9XFxuXFxuLnZhYWRpbi1idXR0b24tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtaW4taGVpZ2h0OiBpbmhlcml0O1xcbiAgdGV4dC1zaGFkb3c6IGluaGVyaXQ7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuW3BhcnQ9XFxcInByZWZpeFxcXCJdLFxcbltwYXJ0PVxcXCJzdWZmaXhcXFwiXSB7XFxuICBmbGV4OiBub25lOyB9XFxuXFxuW3BhcnQ9XFxcImxhYmVsXFxcIl0ge1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgfVxcblxcbmNlLWJ1dHRvbiB7XFxuICAtLWx1bW8tYnV0dG9uLXNpemU6IHZhcigtLWx1bW8tc2l6ZS1tKTtcXG4gIG1pbi13aWR0aDogY2FsYyh2YXIoLS1sdW1vLWJ1dHRvbi1zaXplKSAqIDIpO1xcbiAgaGVpZ2h0OiB2YXIoLS1sdW1vLWJ1dHRvbi1zaXplKTtcXG4gIHBhZGRpbmc6IDAgY2FsYyh2YXIoLS1sdW1vLWJ1dHRvbi1zaXplKSAvIDMgKyB2YXIoLS1sdW1vLWJvcmRlci1yYWRpdXMpIC8gMik7XFxuICBtYXJnaW46IHZhcigtLWx1bW8tc3BhY2UteHMpIDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWx1bW8tZm9udC1mYW1pbHkpO1xcbiAgZm9udC1zaXplOiB2YXIoLS1sdW1vLWZvbnQtc2l6ZS1tKTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBjb2xvcjogdmFyKC0tbHVtby1wcmltYXJ5LXRleHQtY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbHVtby1jb250cmFzdC01cGN0KTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWx1bW8tYm9yZGVyLXJhZGl1cyk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlOyB9XFxuXFxuW3BhcnQ9XFxcImxhYmVsXFxcIl0sXFxuW3BhcnQ9XFxcInByZWZpeFxcXCJdLFxcbltwYXJ0PVxcXCJzdWZmaXhcXFwiXSB7XFxuICBsaW5lLWhlaWdodDogdmFyKC0tbHVtby1saW5lLWhlaWdodC14cyk7IH1cXG5cXG5bcGFydD1cXFwibGFiZWxcXFwiXSB7XFxuICBwYWRkaW5nOiBjYWxjKHZhcigtLWx1bW8tYnV0dG9uLXNpemUpIC8gNikgMDsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInNtYWxsXFxcIl0ge1xcbiAgZm9udC1zaXplOiB2YXIoLS1sdW1vLWZvbnQtc2l6ZS1zKTtcXG4gIC0tbHVtby1idXR0b24tc2l6ZTogdmFyKC0tbHVtby1zaXplLXMpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwibGFyZ2VcXFwiXSB7XFxuICBmb250LXNpemU6IHZhcigtLWx1bW8tZm9udC1zaXplLWwpO1xcbiAgLS1sdW1vLWJ1dHRvbi1zaXplOiB2YXIoLS1sdW1vLXNpemUtbCk7IH1cXG5cXG5jZS1idXR0b25bZGlzYWJsZWRdW2Rpc2FibGVkXSB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIGNvbG9yOiB2YXIoLS1sdW1vLWRpc2FibGVkLXRleHQtY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbHVtby1jb250cmFzdC01cGN0KTsgfVxcblxcbmNlLWJ1dHRvbjpob3Zlcjo6YmVmb3JlIHtcXG4gIG9wYWNpdHk6IDAuMDU7IH1cXG5cXG5AbWVkaWEgKHBvaW50ZXI6IGNvYXJzZSkge1xcbiAgY2UtYnV0dG9uW2FjdGl2ZV06aG92ZXI6OmJlZm9yZSB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbmNlLWJ1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAxLjRzLCB0cmFuc2Zvcm0gMC4xcztcXG4gIGZpbHRlcjogYmx1cig4cHgpOyB9XFxuXFxuY2UtYnV0dG9uW2FjdGl2ZV06OmJlZm9yZSB7XFxuICBvcGFjaXR5OiAwLjE7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwczsgfVxcblxcbmNlLWJ1dHRvblthY3RpdmVdOjphZnRlciB7XFxuICBvcGFjaXR5OiAwLjE7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwcywgMHM7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XFxuXFxuY2UtYnV0dG9uW2ZvY3VzLXJpbmddIHtcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDJweCB2YXIoLS1sdW1vLXByaW1hcnktY29sb3ItNTBwY3QpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwidGVydGlhcnlcXFwiXSxcXG5jZS1idXR0b25bdGhlbWV+PVxcXCJ0ZXJ0aWFyeS1pbmxpbmVcXFwiXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzO1xcbiAgbWluLXdpZHRoOiAwOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwidGVydGlhcnlcXFwiXTo6YmVmb3JlLFxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInRlcnRpYXJ5LWlubGluZVxcXCJdOjpiZWZvcmUge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInRlcnRpYXJ5XFxcIl0ge1xcbiAgcGFkZGluZzogMCBjYWxjKHZhcigtLWx1bW8tYnV0dG9uLXNpemUpIC8gNik7IH1cXG5cXG5AbWVkaWEgKGhvdmVyOiBob3Zlcikge1xcbiAgY2UtYnV0dG9uW3RoZW1lKj1cXFwidGVydGlhcnlcXFwiXTpub3QoW2FjdGl2ZV06aG92ZXIpIHtcXG4gICAgb3BhY2l0eTogMC44OyB9IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJ0ZXJ0aWFyeVxcXCJdW2FjdGl2ZV0sXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwidGVydGlhcnktaW5saW5lXFxcIl1bYWN0aXZlXSB7XFxuICBvcGFjaXR5OiAwLjU7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwczsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInRlcnRpYXJ5LWlubGluZVxcXCJdIHtcXG4gIG1hcmdpbjogMDtcXG4gIGhlaWdodDogYXV0bztcXG4gIHBhZGRpbmc6IDA7XFxuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogaW5oZXJpdDsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInRlcnRpYXJ5LWlubGluZVxcXCJdIFtwYXJ0PVxcXCJsYWJlbFxcXCJdIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0OyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tcHJpbWFyeS1jb2xvcik7XFxuICBjb2xvcjogdmFyKC0tbHVtby1wcmltYXJ5LWNvbnRyYXN0LWNvbG9yKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBtaW4td2lkdGg6IGNhbGModmFyKC0tbHVtby1idXR0b24tc2l6ZSkgKiAyLjUpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdW2Rpc2FibGVkXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLXByaW1hcnktY29sb3ItNTBwY3QpO1xcbiAgY29sb3I6IHZhcigtLWx1bW8tcHJpbWFyeS1jb250cmFzdC1jb2xvcik7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJwcmltYXJ5XFxcIl06aG92ZXI6OmJlZm9yZSB7XFxuICBvcGFjaXR5OiAwLjE7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJwcmltYXJ5XFxcIl1bYWN0aXZlXTo6YmVmb3JlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tc2hhZGUtMjBwY3QpOyB9XFxuXFxuQG1lZGlhIChwb2ludGVyOiBjb2Fyc2UpIHtcXG4gIGNlLWJ1dHRvblt0aGVtZX49XFxcInByaW1hcnlcXFwiXVthY3RpdmVdOjpiZWZvcmUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLXNoYWRlLTYwcGN0KTsgfVxcbiAgY2UtYnV0dG9uW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdOm5vdChbYWN0aXZlXTpob3Zlcik6OmJlZm9yZSB7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInByaW1hcnlcXFwiXVthY3RpdmVdOjphZnRlciB7XFxuICBvcGFjaXR5OiAwLjI7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJzdWNjZXNzXFxcIl0ge1xcbiAgY29sb3I6IHZhcigtLWx1bW8tc3VjY2Vzcy10ZXh0LWNvbG9yKTsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcInN1Y2Nlc3NcXFwiXVt0aGVtZX49XFxcInByaW1hcnlcXFwiXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLXN1Y2Nlc3MtY29sb3IpO1xcbiAgY29sb3I6IHZhcigtLWx1bW8tc3VjY2Vzcy1jb250cmFzdC1jb2xvcik7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJzdWNjZXNzXFxcIl1bdGhlbWV+PVxcXCJwcmltYXJ5XFxcIl1bZGlzYWJsZWRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tc3VjY2Vzcy1jb2xvci01MHBjdCk7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJlcnJvclxcXCJdIHtcXG4gIGNvbG9yOiB2YXIoLS1sdW1vLWVycm9yLXRleHQtY29sb3IpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwiZXJyb3JcXFwiXVt0aGVtZX49XFxcInByaW1hcnlcXFwiXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLWVycm9yLWNvbG9yKTtcXG4gIGNvbG9yOiB2YXIoLS1sdW1vLWVycm9yLWNvbnRyYXN0LWNvbG9yKTsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcImVycm9yXFxcIl1bdGhlbWV+PVxcXCJwcmltYXJ5XFxcIl1bZGlzYWJsZWRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tZXJyb3ItY29sb3ItNTBwY3QpOyB9XFxuXFxuY2UtYnV0dG9uW3RoZW1lfj1cXFwiY29udHJhc3RcXFwiXSB7XFxuICBjb2xvcjogdmFyKC0tbHVtby1jb250cmFzdCk7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJjb250cmFzdFxcXCJdW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWx1bW8tY29udHJhc3QpO1xcbiAgY29sb3I6IHZhcigtLWx1bW8tYmFzZS1jb2xvcik7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJjb250cmFzdFxcXCJdW3RoZW1lfj1cXFwicHJpbWFyeVxcXCJdW2Rpc2FibGVkXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sdW1vLWNvbnRyYXN0LTUwcGN0KTsgfVxcblxcbltwYXJ0XSA6OnNsb3R0ZWQoaXJvbi1pY29uKSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogdmFyKC0tbHVtby1pY29uLXNpemUtbSk7XFxuICBoZWlnaHQ6IHZhcigtLWx1bW8taWNvbi1zaXplLW0pOyB9XFxuXFxuW3BhcnRdIDo6c2xvdHRlZChpcm9uLWljb25baWNvbl49XFxcInZhYWRpbjpcXFwiXSkge1xcbiAgcGFkZGluZzogMC4yNWVtO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50OyB9XFxuXFxuW3BhcnQ9XFxcInByZWZpeFxcXCJdIHtcXG4gIG1hcmdpbi1sZWZ0OiAtMC4yNWVtO1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjI1ZW07IH1cXG5cXG5bcGFydD1cXFwic3VmZml4XFxcIl0ge1xcbiAgbWFyZ2luLWxlZnQ6IDAuMjVlbTtcXG4gIG1hcmdpbi1yaWdodDogLTAuMjVlbTsgfVxcblxcbmNlLWJ1dHRvblt0aGVtZX49XFxcImljb25cXFwiXSB7XFxuICBtaW4td2lkdGg6IHZhcigtLWx1bW8tYnV0dG9uLXNpemUpO1xcbiAgcGFkZGluZy1sZWZ0OiBjYWxjKHZhcigtLWx1bW8tYnV0dG9uLXNpemUpIC8gNCk7XFxuICBwYWRkaW5nLXJpZ2h0OiBjYWxjKHZhcigtLWx1bW8tYnV0dG9uLXNpemUpIC8gNCk7IH1cXG5cXG5jZS1idXR0b25bdGhlbWV+PVxcXCJpY29uXFxcIl0gW3BhcnQ9XFxcInByZWZpeFxcXCJdLFxcbmNlLWJ1dHRvblt0aGVtZX49XFxcImljb25cXFwiXSBbcGFydD1cXFwic3VmZml4XFxcIl0ge1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxuICBtYXJnaW4tcmlnaHQ6IDA7IH1cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImNlLWNoZWNrYm94IHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cXG5cXG5jZS1sYWJlbCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIG1hcmdpbi1sZWZ0OiA4cHg7IH1cXG5cXG5jZS1hY2NvcmRpb24taGVhZGluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrOyB9XFxuXFxuY2UtYWNjb3JkaW9uLWhlYWRpbmcgKyBjZS1hY2NvcmRpb24taGVhZGluZyB7XFxuICBib3JkZXItdG9wOiBub25lOyB9XFxuXFxuY2UtYWNjb3JkaW9uLWhlYWRpbmdbZXhwYW5kZWRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTsgfVxcblxcbmNlLWFjY29yZGlvbi1wYW5lbCB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5OyB9XFxuXFxuY2UtdGFiIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgcGFkZGluZzogMjBweDsgfVxcblxcbmNlLXRhYi1wYW5lbCB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5OyB9XFxuXFxuY2UtdGFiW3NlbGVjdGVkXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7IH1cXG5cXG5jZS10YWJzOm5vdCg6ZGVmaW5lZCksXFxuY2UtdGFiOm5vdCg6ZGVmaW5lZCksXFxuY2UtdGFiLXBhbmVsOm5vdCg6ZGVmaW5lZCkge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5jZS10b2dnbGUtYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XFxuICBwYWRkaW5nOiAzcHg7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4ycyBlYXNlOyB9XFxuXFxuY2UtdG9nZ2xlLWJ1dHRvbltwcmVzc2VkXSxcXG5jZS10b2dnbGUtYnV0dG9uOm5vdChbZGlzYWJsZWRdKTphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTsgfVxcblxcbmNlLXRvZ2dsZS1idXR0b25bZGlzYWJsZWRdIHtcXG4gIG9wYWNpdHk6IDAuMzU7IH1cXG5cXG5odG1sLCBib2R5IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7IH1cXG4gIGh0bWwgKiwgYm9keSAqIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblxcbi51aS1kZW1vIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuICAudWktZGVtbyAuc2lkZW5hdiB7XFxuICAgIGZsZXgtYmFzaXM6IDMwMHB4O1xcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMyk7IH1cXG4gIC51aS1kZW1vIC5jb250ZW50IHtcXG4gICAgZmxleDogMTtcXG4gICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAyMHB4OyB9XFxuXFxudWktcm91dGVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4udWktZWxlbWVudHMge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7IH1cXG4gIC51aS1lbGVtZW50c19faXRlbSB7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xcbiAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC4zcyBsaW5lYXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgICAudWktZWxlbWVudHNfX2l0ZW0gYSB7XFxuICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICB3aWR0aDogMTAwJTsgfVxcbiAgICAudWktZWxlbWVudHNfX2l0ZW06aG92ZXIge1xcbiAgICAgIGJveC1zaGFkb3c6IDBweCAxcHggOHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmZjsgfVxcbiAgICAgIC51aS1lbGVtZW50c19faXRlbTpob3ZlcjpiZWZvcmUge1xcbiAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDA7XFxuICAgICAgICBib3R0b206IDA7XFxuICAgICAgICBsZWZ0OiAwO1xcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgd2lkdGg6IDVweDtcXG4gICAgICAgIGJhY2tncm91bmQ6ICMyZjYyYTM7IH1cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIltjZS10cmVlXSB7XFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IH1cXG5cXG5bYXJpYS1leHBhbmRlZD1cXFwidHJ1ZVxcXCJdID4gW2NlLXRyZWVdIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuW2FyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIl0gPiBbY2UtdHJlZV0ge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5jZS10cmVlLWZvbGRlciA+IC5jZS10cmVlLWljb246bm90KFtkYXRhLXR5cGU9XFxcImZpbGVcXFwiXSkge1xcbiAgaGVpZ2h0OiAwO1xcbiAgd2lkdGg6IDA7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLXdpZHRoOiA1cHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICMzMzM7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xcyBlYXNlLWluLW91dDsgfVxcblxcbi5jZS10cmVlLWZvbGRlclthcmlhLWV4cGFuZGVkPVxcXCJ0cnVlXFxcIl0gPiAuY2UtdHJlZS1pY29uIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IDI1JSA1MCU7IH1cXG5cXG4uY2UtdHJlZS1maWxlID4gLmNlLXRyZWUtaWNvbiwgLmNlLXRyZWUtZm9sZGVyLmNlLXRyZWUtZmlsZVthcmlhLWV4cGFuZGVkPVxcXCJ0cnVlXFxcIl0gPiAuY2UtdHJlZS1pY29uLCAuY2UtdHJlZS1mb2xkZXIuY2UtdHJlZS1maWxlW2FyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIl0gPiAuY2UtdHJlZS1pY29uIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uY2UtdHJlZS1maWxlLFxcbi5jZS10cmVlLWZvbGRlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5jZS10cmVlLWZpbGU6OmJlZm9yZSxcXG4gIC5jZS10cmVlLWZvbGRlcjo6YmVmb3JlIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDlweDtcXG4gICAgbGVmdDogLTE0cHg7XFxuICAgIHdpZHRoOiAxM3B4O1xcbiAgICBoZWlnaHQ6IDA7XFxuICAgIGJvcmRlci10b3A6IDFweCBkb3R0ZWQgIzY3YjJkZDtcXG4gICAgei1pbmRleDogMTsgfVxcblxcbi5jZS10cmVlLWNvbnRlbnQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1sZWZ0OiAxNnB4OyB9XFxuICAuY2UtdHJlZS1jb250ZW50OjpiZWZvcmUge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHotaW5kZXg6IDE7XFxuICAgIHRvcDogLTlweDtcXG4gICAgYm90dG9tOiAxNnB4O1xcbiAgICBsZWZ0OiAycHg7XFxuICAgIGJvcmRlcjogMXB4IGRvdHRlZCAjNjdiMmRkO1xcbiAgICBib3JkZXItd2lkdGg6IDAgMCAwIDFweDtcXG4gICAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLmNlLXRyZWUtY29udGVudDpmaXJzdC1jaGlsZDo6YmVmb3JlIHtcXG4gIGJvcmRlcjogbm9uZTsgfVxcblxcbi5jZS10cmVlLWNvbnRlbnQ6Zmlyc3QtY2hpbGQgPiAuY2UtdHJlZS1mb2xkZXI6Zmlyc3QtY2hpbGQge1xcbiAgYm9yZGVyOiBub25lOyB9XFxuXFxuLnNvdXJjZS12aWV3IFtjbGFzc149XFxcImNvbC1tZC1cXFwiXSB7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBwYWRkaW5nLXJpZ2h0OiAwO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTMwcHgpO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTMwcHgpOyB9XFxuICAuc291cmNlLXZpZXcgW2NsYXNzXj1cXFwiY29sLW1kLVxcXCJdIHByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBib3JkZXI6IG5vbmU7IH1cXG5cXG4uc291cmNlLXZpZXcgW2NsYXNzXj1cXFwiY29sLW1kLVxcXCJdICsgW2NsYXNzXj1cXFwiY29sLW1kLVxcXCJdIHtcXG4gIGJvcmRlci1sZWZ0OiBub25lOyB9XFxuXFxuLnNvdXJjZS10cmVlLFxcbi5zb3VyY2Utc25pcHBldHMge1xcbiAgb3ZlcmZsb3c6IGF1dG87IH1cXG5cIiwgXCJcIl0pO1xuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gJ0BtZWRpYSAnICsgaXRlbVsyXSArICd7JyArIGNvbnRlbnQgKyAnfSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgIH1cbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tpXTsgLy8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuICAgICAgLy8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcbiAgICAgIC8vIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cbiAgICAgIC8vIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblxuICAgICAgaWYgKGl0ZW1bMF0gPT0gbnVsbCB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBpZiAobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgICBpdGVtWzJdID0gJygnICsgaXRlbVsyXSArICcpIGFuZCAoJyArIG1lZGlhUXVlcnkgKyAnKSc7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLyc7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG4gIHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gdHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nXG5cdFx0ID8gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcykgXG5cdFx0IDogb3B0aW9ucy50cmFuc2Zvcm0uZGVmYXVsdChvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiXG5jb25zdCBBQ0NPUkRJT05fSEVBREVSID0gJ2NlLWFjY29yZGlvbi1oZWFkaW5nJztcbmNvbnN0IEFDQ09SRElPTl9QQU5FTCA9ICdjZS1hY2NvcmRpb24tcGFuZWwnO1xuXG5jb25zdCBLRVlDT0RFID0ge1xuICBET1dOOiA0MCxcbiAgTEVGVDogMzcsXG4gIFJJR0hUOiAzOSxcbiAgVVA6IDM4LFxuICBIT01FOiAzNixcbiAgRU5EOiAzNSxcbn07XG5cbmNvbnN0IGFjY29yZGlvblRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbmFjY29yZGlvblRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgfVxuICAgIDo6c2xvdHRlZCguYW5pbWF0aW5nKSB7XG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dDtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZUFjY29yZGlvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoYWNjb3JkaW9uVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX29uQ2hhbmdlKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgY3VzdG9tRWxlbWVudHMud2hlbkRlZmluZWQoQUNDT1JESU9OX0hFQURFUiksXG4gICAgICBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZChBQ0NPUkRJT05fUEFORUwpLFxuICAgIF0pXG4gICAgICAudGhlbihfID0+IHtcblxuICAgICAgICBjb25zdCBoZWFkaW5ncyA9IHRoaXMuX2FsbEhlYWRpbmdzKCk7XG5cbiAgICAgICAgaGVhZGluZ3MuZm9yRWFjaChoZWFkaW5nID0+IHtcbiAgICAgICAgICBoZWFkaW5nLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gICAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLl9wYW5lbEZvckhlYWRpbmcoaGVhZGluZyk7XG5cbiAgICAgICAgICBoZWFkaW5nLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHBhbmVsLmlkKTtcbiAgICAgICAgICBwYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIGhlYWRpbmcuaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBoZWFkaW5nc1swXS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG5cbiAgICAgICAgaGVhZGluZ3NcbiAgICAgICAgICAuZm9yRWFjaChoZWFkaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5fcGFuZWxGb3JIZWFkaW5nKGhlYWRpbmcpO1xuICAgICAgICAgICAgaWYgKCFoZWFkaW5nLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbGxhcHNlSGVhZGluZyhoZWFkaW5nKTtcbiAgICAgICAgICAgICAgdGhpcy5fY29sbGFwc2VQYW5lbChwYW5lbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9leHBhbmRIZWFkaW5nKGhlYWRpbmcpO1xuICAgICAgICAgICAgICB0aGlzLl9leHBhbmRQYW5lbChwYW5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5fb25DaGFuZ2UpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gIH1cblxuICBfaXNIZWFkaW5nKGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IEFDQ09SRElPTl9IRUFERVI7XG4gIH1cblxuICBfb25DaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLl9hbmltYXRlUGFuZWxGb3JIZWFkaW5nKGV2ZW50LnRhcmdldCwgZXZlbnQuZGV0YWlsLmlzRXhwYW5kZWROb3cpO1xuICB9XG5cbiAgX2FuaW1hdGVQYW5lbEZvckhlYWRpbmcoaGVhZGluZywgZXhwYW5kKSB7XG4gXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhbmltYXRpbmcnKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLl9wYW5lbEZvckhlYWRpbmcoaGVhZGluZyk7XG4gICAgaWYgKGV4cGFuZCkge1xuICAgICAgdGhpcy5fZXhwYW5kUGFuZWwocGFuZWwpO1xuICAgICAgdGhpcy5fYW5pbWF0ZUluKHBhbmVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYW5pbWF0ZU91dChwYW5lbClcbiAgICAgICAgLnRoZW4oXyA9PiB0aGlzLl9jb2xsYXBzZVBhbmVsKHBhbmVsKSk7XG4gICAgfVxuICB9XG5cbiAgX29uS2V5RG93bihldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbnRIZWFkaW5nID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgaWYgKCF0aGlzLl9pc0hlYWRpbmcoY3VycmVudEhlYWRpbmcpKSByZXR1cm47XG5cbiAgICBpZiAoZXZlbnQuYWx0S2V5KSByZXR1cm47XG5cbiAgICBsZXQgbmV3SGVhZGluZztcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZQ09ERS5MRUZUOlxuICAgICAgY2FzZSBLRVlDT0RFLlVQOlxuICAgICAgICBuZXdIZWFkaW5nID0gdGhpcy5fcHJldkhlYWRpbmcoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5SSUdIVDpcbiAgICAgIGNhc2UgS0VZQ09ERS5ET1dOOlxuICAgICAgICBuZXdIZWFkaW5nID0gdGhpcy5fbmV4dEhlYWRpbmcoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5IT01FOlxuICAgICAgICBuZXdIZWFkaW5nID0gdGhpcy5fZmlyc3RIZWFkaW5nKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuRU5EOlxuICAgICAgICBuZXdIZWFkaW5nID0gdGhpcy5fbGFzdEhlYWRpbmcoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGN1cnJlbnRIZWFkaW5nLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gICAgbmV3SGVhZGluZy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgbmV3SGVhZGluZy5mb2N1cygpO1xuICB9XG5cbiAgX2FsbFBhbmVscygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoQUNDT1JESU9OX1BBTkVMKSk7XG4gIH1cblxuICBfYWxsSGVhZGluZ3MoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5xdWVyeVNlbGVjdG9yQWxsKEFDQ09SRElPTl9IRUFERVIpKTtcbiAgfVxuXG4gIF9wYW5lbEZvckhlYWRpbmcoaGVhZGluZykge1xuICAgIGNvbnN0IG5leHQgPSBoZWFkaW5nLm5leHRFbGVtZW50U2libGluZztcbiAgICBpZiAobmV4dC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09IEFDQ09SRElPTl9QQU5FTCkge1xuICAgICAgY29uc29sZS5lcnJvcignU2libGluZyBlbGVtZW50IHRvIGEgaGVhZGluZyBuZWVkIHRvIGJlIGEgcGFuZWwuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBuZXh0O1xuICB9XG5cbiAgX3ByZXZIZWFkaW5nKCkge1xuICAgIGNvbnN0IGhlYWRpbmdzID0gdGhpcy5fYWxsSGVhZGluZ3MoKTtcblxuICAgIGxldCBuZXdJZHggPSBoZWFkaW5ncy5maW5kSW5kZXgoaGVhZGluZ3MgPT4gXG4gICAgICAgIGhlYWRpbmdzID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAtIDE7XG5cbiAgICByZXR1cm4gaGVhZGluZ3NbKG5ld0lkeCArIGhlYWRpbmdzLmxlbmd0aCkgJSBoZWFkaW5ncy5sZW5ndGhdO1xuICB9XG5cbiAgX25leHRIZWFkaW5nKCkge1xuICAgIGNvbnN0IGhlYWRpbmdzID0gdGhpcy5fYWxsSGVhZGluZ3MoKTtcbiAgICBsZXQgbmV3SWR4ID0gaGVhZGluZ3MuZmluZEluZGV4KGhlYWRpbmcgPT5cbiAgICAgICAgaGVhZGluZyA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgKyAxO1xuXG4gICAgcmV0dXJuIGhlYWRpbmdzW25ld0lkeCAlIGhlYWRpbmdzLmxlbmd0aF07XG4gIH1cblxuICBfZmlyc3RIZWFkaW5nKCkge1xuICAgIGNvbnN0IGhlYWRpbmdzID0gdGhpcy5fYWxsSGVhZGluZ3MoKTtcbiAgICByZXR1cm4gaGVhZGluZ3NbMF07XG4gIH1cblxuICBfbGFzdEhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuICAgIHJldHVybiBoZWFkaW5nc1toZWFkaW5ncy5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIF9leHBhbmRQYW5lbChwYW5lbCkge1xuICAgIHBhbmVsLmV4cGFuZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIF9jb2xsYXBzZVBhbmVsKHBhbmVsKSB7XG4gICAgcGFuZWwuZXhwYW5kZWQgPSBmYWxzZTtcbiAgfVxuXG4gIF9leHBhbmRIZWFkaW5nKGhlYWRpbmcpIHtcbiAgICBoZWFkaW5nLmV4cGFuZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIF9jb2xsYXBzZUhlYWRpbmcoaGVhZGluZykge1xuICAgIGhlYWRpbmcuZXhwYW5kZWQgPSBmYWxzZTtcbiAgfVxuXG4gIF9hbmltYXRlSW4ocGFuZWwpIHtcbiAgICBjb25zdCBoZWlnaHQgPSBwYW5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGUocGFuZWwsIC1oZWlnaHQsIDApO1xuICB9XG5cbiAgX2FuaW1hdGVPdXQocGFuZWwpIHtcbiAgICBjb25zdCBoZWlnaHQgPSBwYW5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGUocGFuZWwsIDAsIC1oZWlnaHQpO1xuICB9XG5cbiAgX2FuaW1hdGUocGFuZWwsIHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpIHtcblxuICAgIGlmIChzdGFydE9mZnNldCA9PT0gZW5kT2Zmc2V0KVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhbmltYXRpbmcnKTtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbSh0aGlzLmNoaWxkcmVuKTtcblxuICAgIGNvbnN0IGlkeCA9IGNoaWxkcmVuLmluZGV4T2YocGFuZWwpO1xuXG4gICAgY29uc3QgYW5pbWF0ZWRDaGlsZHJlbiA9IGNoaWxkcmVuLnNsaWNlKGlkeCk7XG4gICAgdGhpcy5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBjaGlsZC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICBjaGlsZC5zdHlsZS56SW5kZXggPSAyO1xuICAgIH0pO1xuXG4gICAgYW5pbWF0ZWRDaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGNoaWxkLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgIGNoaWxkLnN0eWxlLnpJbmRleCA9IDE7XG4gICAgICBjaGlsZC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke3N0YXJ0T2Zmc2V0fXB4KWA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJvbWlzZSgpXG4gICAgICAudGhlbihfID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2UoKSlcbiAgICAgIC50aGVuKF8gPT4ge1xuICAgICAgICBhbmltYXRlZENoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgIGNoaWxkLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7ZW5kT2Zmc2V0fXB4KWA7XG4gICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0cmFuc2l0aW9uRW5kUHJvbWlzZShwYW5lbCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oXyA9PiB7XG4gICAgICAgIGFuaW1hdGVkQ2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgY2hpbGQuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW5nJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICBjaGlsZC5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICAgICAgICAgIGNoaWxkLnN0eWxlLnpJbmRleCA9ICcnO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGluZycpO1xuICAgICAgfSk7XG4gIH1cbn1cblxubGV0IGhlYWRpbmdJZENvdW50ZXIgPSAwO1xuXG5jb25zdCBhY2NvcmRpb25IZWFkaW5nVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuYWNjb3JkaW9uSGVhZGluZ1RlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGNvbnRhaW46IGNvbnRlbnQ7XG4gICAgfVxuICAgIGJ1dHRvbiB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGluaXRpYWw7XG4gICAgICBib3JkZXI6IGluaXRpYWw7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHBhZGRpbmc6IDEwcHg7IFxuICAgIH1cbiAgPC9zdHlsZT5cbiAgPGJ1dHRvbj48c2xvdD48L3Nsb3Q+PC9idXR0b24+XG5gO1xuXG5leHBvcnQgY2xhc3MgQ2VBY2NvcmRpb25IZWFkaW5nIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydleHBhbmRlZCddO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX29uQ2xpY2sgPSB0aGlzLl9vbkNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7XG4gICAgICBtb2RlOiAnb3BlbicsXG4gICAgICBkZWxlZ2F0ZXNGb2N1czogdHJ1ZSxcbiAgICB9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoXG4gICAgICBhY2NvcmRpb25IZWFkaW5nVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcbiAgICApO1xuICAgIHRoaXMuX3NoYWRvd0J1dHRvbiA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnaGVhZGluZycpO1xuICAgICAgXG4gICAgaWYgKCF0aGlzLmlkKVxuICAgICAgdGhpcy5pZCA9IGAke0FDQ09SRElPTl9IRUFERVJ9LWdlbmVyYXRlZC0ke2hlYWRpbmdJZENvdW50ZXIrK31gO1xuICAgIHRoaXMuX3NoYWRvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICAgIHRoaXMuX3NoYWRvd0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX3NoYWRvd0J1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaGFzQXR0cmlidXRlKCdleHBhbmRlZCcpO1xuICAgIHRoaXMuX3NoYWRvd0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB2YWx1ZSk7XG4gIH1cblxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdleHBhbmRlZCcpO1xuICB9XG5cbiAgc2V0IGV4cGFuZGVkKHZhbHVlKSB7XG4gICAgdmFsdWUgPSBCb29sZWFuKHZhbHVlKTtcbiAgICBpZiAodmFsdWUpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZXhwYW5kZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2V4cGFuZGVkJyk7XG4gIH1cblxuICBfb25DbGljaygpIHtcbiAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdjaGFuZ2UnLCB7XG4gICAgICAgIGRldGFpbDogeyBpc0V4cGFuZGVkTm93OiB0aGlzLmV4cGFuZGVkIH0sXG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgYWNjb3JkaW9uUGFuZWxUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5hY2NvcmRpb25QYW5lbFRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0KDpub3QoW2V4cGFuZGVkXSkpIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdD48L3Nsb3Q+XG5gO1xuXG5sZXQgcGFuZWxJZENvdW50ZXIgPSAwO1xuXG5leHBvcnQgY2xhc3MgQ2VBY2NvcmRpb25QYW5lbCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoXG4gICAgICBhY2NvcmRpb25QYW5lbFRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncmVnaW9uJyk7XG4gICAgaWYgKCF0aGlzLmlkKVxuICAgICAgdGhpcy5pZCA9IGAke0FDQ09SRElPTl9QQU5FTH0tZ2VuZXJhdGVkLSR7cGFuZWxJZENvdW50ZXIrK31gO1xuICB9XG5cbiAgZ2V0IGV4cGFuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnZXhwYW5kZWQnKTtcbiAgfVxuXG4gIHNldCBleHBhbmRlZCh2YWwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IEJvb2xlYW4odmFsKTtcbiAgICBpZiAodmFsdWUpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZXhwYW5kZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2V4cGFuZGVkJyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uRW5kUHJvbWlzZShlbGVtZW50KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBmKCkge1xuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZik7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcm9taXNlKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZSkpO1xufSIsIlxuXG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9idXR0b24uc2Nzcyc7XG5cbmV4cG9ydCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgc3RhdGljIGdldCBpcyAoKSB7XG4gICAgcmV0dXJuICdjZS1idXR0b24nO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMgKCkge1xuICAgIHJldHVybiBbJ2Rpc2FibGVkJywgJ3RhYmluZGV4JywgJ2F1dG9mb2N1cyddO1xuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlKCk7XG4gIH1cblxuICB0ZW1wbGF0ZSAoKSB7XG4gICAgcmV0dXJuIChgXG4gICAgICA8c3R5bGU+JHtzdHlsZX08L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzcz1cInZhYWRpbi1idXR0b24tY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgcGFydD1cInByZWZpeFwiPlxuICAgICAgICAgIDxzbG90IG5hbWU9XCJwcmVmaXhcIj48L3Nsb3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHBhcnQ9XCJsYWJlbFwiPlxuICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgcGFydD1cInN1ZmZpeFwiPlxuICAgICAgICAgIDxzbG90IG5hbWU9XCJzdWZmaXhcIj48L3Nsb3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGlkPVwiYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPkJ1dHRvbjwvYnV0dG9uPmBcbiAgICApO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuICAgIGNvbnNvbGUubG9nKCdzdHlsZTogJywgc3R5bGUpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgZSA9PiB7XG4gICAgICBpZiAoZS5jb21wb3NlZFBhdGgoKVswXSA9PT0gdGhpcykge1xuICAgICAgICB0aGlzLl9mb2N1cyhlKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5jb21wb3NlZFBhdGgoKS5pbmRleE9mKHRoaXMuZm9jdXNFbGVtZW50KSAhPT0gLTEgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5fc2V0Rm9jdXNlZCh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgZSA9PiB0aGlzLl9zZXRGb2N1c2VkKGZhbHNlKSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjayAoKSB7XG5cbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayAoYXR0ck5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIFxuICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEJ1dHRvbi5pcywgQnV0dG9uKTsiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vYnV0dG9uLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL2J1dHRvbi5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vYnV0dG9uLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbi8vIGNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vY2UtY2hlY2tib3guc2NzcycpO1xuXG5jb25zdCBLRVlDT0RFID0ge1xuICBTUEFDRTogMzIsXG59O1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gICAgPHN0eWxlPlxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgnYXNzZXRzL2NoZWNrYm94L3VuY2hlY2tlZC1jaGVja2JveC5zdmcnKSBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgIH1cbiAgICAgIDpob3N0KFtoaWRkZW5dKSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgICA6aG9zdChbY2hlY2tlZF0pIHtcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKCdhc3NldHMvY2hlY2tib3gvY2hlY2tlZC1jaGVja2JveC5zdmcnKSBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgIH1cbiAgICAgIDpob3N0KFtkaXNhYmxlZF0pIHtcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKCdhc3NldHMvY2hlY2tib3gvdW5jaGVja2VkLWNoZWNrYm94LWRpc2FibGVkLnN2ZycpIG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgfVxuICAgICAgOmhvc3QoW2NoZWNrZWRdW2Rpc2FibGVkXSkge1xuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoJ2Fzc2V0cy9jaGVja2JveC9jaGVja2VkLWNoZWNrYm94LWRpc2FibGVkLnN2ZycpIG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgfSAgICAgIFxuICAgIDwvc3R5bGU+XG4gIGA7XG5cbi8vIEhJREVcbi8vIFNoYWR5Q1NTIHdpbGwgcmVuYW1lIGNsYXNzZXMgYXMgbmVlZGVkIHRvIGVuc3VyZSBzdHlsZSBzY29waW5nLlxuLy8gU2hhZHlDU1MucHJlcGFyZVRlbXBsYXRlKHRlbXBsYXRlLCAnaG93dG8tY2hlY2tib3gnKTtcbi8vIC9ISURFXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlQ2hlY2tib3ggZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2NoZWNrZWQnLCAnZGlzYWJsZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnY2hlY2tib3gnKTtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG5cbiAgICB0aGlzLl91cGdyYWRlUHJvcGVydHkoJ2NoZWNrZWQnKTtcbiAgICB0aGlzLl91cGdyYWRlUHJvcGVydHkoJ2Rpc2FibGVkJyk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fb25LZXlVcCk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgX3VwZ3JhZGVQcm9wZXJ0eShwcm9wKSB7XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXNbcHJvcF07XG4gICAgICBkZWxldGUgdGhpc1twcm9wXTtcbiAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fb25LZXlVcCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgc2V0IGNoZWNrZWQodmFsdWUpIHtcbiAgICBjb25zdCBpc0NoZWNrZWQgPSBCb29sZWFuKHZhbHVlKTtcbiAgICBpZiAoaXNDaGVja2VkKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgfVxuXG4gIGdldCBjaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmIChpc0Rpc2FibGVkKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBjb25zdCBoYXNWYWx1ZSA9IG5ld1ZhbHVlICE9PSBudWxsO1xuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAnY2hlY2tlZCc6XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLWNoZWNrZWQnLCBoYXNWYWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIGhhc1ZhbHVlKTtcblxuICAgICAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIF9vbktleVVwKGV2ZW50KSB7XG5cbiAgICBpZiAoZXZlbnQuYWx0S2V5KSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZQ09ERS5TUEFDRTpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQ2hlY2tlZCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBfb25DbGljayhldmVudCkge1xuICAgIHRoaXMuX3RvZ2dsZUNoZWNrZWQoKTtcbiAgfVxuXG4gIF90b2dnbGVDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIGNoZWNrZWQ6IHRoaXMuY2hlY2tlZCxcbiAgICAgIH0sXG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgIH0pKTtcbiAgfVxufVxuIiwiXG5cbmV4cG9ydCBjbGFzcyBVaUV2ZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm5hbWUgPSAnUmFqa2VzaHdhcic7XG4gICAgdGhpcy5jaXR5ID0gJ0h5ZGVyYWJhZCc7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoXyA9PiB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9IHRoaXMuX3JlbmRlcigpO1xuICAgICAgY29uc29sZS5sb2coJ0NvbnN0cnVjdG9yIGdldHMgY2FsbGVkJyk7XG4gICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuICB9XG4gIFxuICBfcmVuZGVyICgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInBhcmVudFwiPlxuICAgICAgICA8YnV0dG9uIEBjbGljaz1cInNob3dOYW1lXCI+U2hvdyBOYW1lPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gQGNsaWNrPVwic2hvd05hbWVcIj5FdmVudCwgTmFtZTwvYnV0dG9uPlxuICAgICAgICA8c3Bhbj4ke3RoaXMubmFtZX08L3NwYW4+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93Q2l0eVwiPlNob3cgQ2l0eTwvYnV0dG9uPlxuICAgICAgICA8aDM+JHt0aGlzLmNpdHl9PC9oMz5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBzaG93TmFtZSAoZXZ0KSB7XG4gICAgY29uc29sZS5sb2coJ3Nob3dOYW1lOiAnLCBldnQpO1xuICAgIHRoaXMubmFtZSA9IGV2dC50YXJnZXQ7XG4gIH1cblxuICBzaG93Q2l0eShldnQpIHtcbiAgICBjb25zb2xlLmxvZygnc2hvd0NpdHk6ICcsIGV2dC50YXJnZXQpO1xuICAgIHRoaXMuY2l0eSA9IGV2dC50YXJnZXQ7XG4gIH1cblxuICBfYWRkRXZlbnRMaXN0ZW5lcnMgKCkge1xuICAgIGNvbnNvbGUubG9nKCdldmVudCBsaXN0ZW5lcnMgY2FsbGVkJyk7XG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCcqJylcbiAgICAgIC5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgQXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKVxuICAgICAgICAgIC5maWx0ZXIoYXR0ciA9PiAvXkAvLnRlc3QoYXR0ci5uYW1lKSlcbiAgICAgICAgICAuZm9yRWFjaChhdHRyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEZuID0gZXZhbCh0aGlzW2F0dHIudmFsdWVdKTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGF0dHIubmFtZS5yZXBsYWNlKC9eQC8sICcnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdldmVudE5hbWU6ICcsIGV2ZW50TmFtZSwgdGFyZ2V0Rm4pO1xuXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZ0ID0+IHtcbiAgICAgICAgICAgICAgdGFyZ2V0Rm4uYXBwbHkoZWwsIFtldnRdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICB9KVxuICB9XG5cbiAgX2JpbmRFdmVudHMgKCkge1xuICAgIGNvbnNvbGUubG9nKGF0dHIubmFtZSwgYXR0ci52YWx1ZSlcbiAgICBjb25zdCBmdW5jdGlvbkFuZFBhcmFtcyA9IC9eKFthLXpBLVpdKylcXCgoLiopXFwpLy5leGVjKGF0dHIudmFsdWUpO1xuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGF0dHIubmFtZS5yZXBsYWNlKC9eQC8sICcnKTtcbiAgICBjb25zdCB0YXJnZXRGbiA9IGV2YWwodGhpc1tmdW5jdGlvbkFuZFBhcmFtc1sxXV0pO1xuICAgIGNvbnN0IHBhcmFtcyA9IGZ1bmN0aW9uQW5kUGFyYW1zWzJdLnNwbGl0KC8sLyk7XG5cbiAgICBjb25zb2xlLmxvZygnaGVsbG8uLi4uLicsIGV2ZW50TmFtZSwgdGFyZ2V0Rm4sIHBhcmFtcyk7XG5cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgKGV2dCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1J1bm5pbmcgY2hhbmdlIGRldGVjdGlvbicpO1xuICAgICAgaWYocGFyYW1zWzBdID09PSAnJGV2ZW50Jykge1xuICAgICAgICB0YXJnZXRGbi5hcHBseShlbCwgW2V2dCwgLi4ucGFyYW1zXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRGbi5hcHBseShlbCwgWzEsIDJdKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ1VpUm91dGVyIHJvY2tzIG5vdycpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2F0dGFjaGVkQ2FsbGJhY2sgY2FsbGVkJyk7XG4gIH1cblxufVxuXG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3VpLWV2ZW50JywgVWlFdmVudCk7IiwiLypcbiAqIEBBdXRob3I6IFJhamtlc2h3YXIgUHJhc2FkKHJhamtlc2h3YXIucGRAZ21haWwuY29tKSBcbiAqIEBEYXRlOiAyMDE5LTAyLTIzIDIzOjMwOjExIFxuICogQExhc3QgTW9kaWZpZWQgYnk6IFJhamtlc2h3YXIgUHJhc2FkXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE5LTAzLTAyIDE5OjI5OjQyXG4gKi9cblxud2luZG93Lm9ubG9hZCA9IGJpbmRMaW5rcztcblxuXG5mdW5jdGlvbiBiaW5kTGlua3MoKSB7XG4gIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2hyZWZdJyk7XG4gIGxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlqYWNrTGlua3MpKSBcbn1cblxuZnVuY3Rpb24gaGlqYWNrTGlua3MoZXZ0KSB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBwYWdlID0gZXZ0LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblxuICBfbG9hZFZpZXcocGFnZSk7XG59XG5cbmZ1bmN0aW9uIF9sb2FkVmlldyAocGFnZVVybCkge1xuXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHhoci5vbmxvYWQgPSBldnQgPT4ge1xuICAgIGNvbnN0IG5ld0RvYyA9IGV2dC50YXJnZXQucmVzcG9uc2U7XG4gICAgY29uc3Qgcm91dGVyU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VpLXJvdXRlcicpO1xuXG4gICAgcm91dGVyU2xvdC5pbm5lckhUTUwgPSBuZXdEb2M7XG4gICAgXG4gIH07XG4gIHhoci5yZXNwb25zZVR5cGUgPSAndGV4dCc7XG4gIHhoci5vcGVuKCdHRVQnLCBgYXBwLyR7cGFnZVVybH0vZGVtby5odG1sYCk7XG4gIHhoci5zZW5kKCk7XG59IiwiY29uc3QgS0VZQ09ERSA9IHtcbiAgRE9XTjogNDAsXG4gIExFRlQ6IDM3LFxuICBSSUdIVDogMzksXG4gIFNQQUNFOiAzMixcbiAgVVA6IDM4LFxuICBIT01FOiAzNixcbiAgRU5EOiAzNSxcbn07XG5cbmNvbnN0IHJhZGlvQnV0dG9uVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xucmFkaW9CdXR0b25UZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgfVxuICBcbiAgICA6aG9zdCg6Zm9jdXMpIHtcbiAgICAgIG91dGxpbmU6IDA7XG4gICAgfVxuICBcbiAgICA6aG9zdCg6Zm9jdXMpOjpiZWZvcmUge1xuICAgICAgYm94LXNoYWRvdzogMCAwIDFweCAycHggIzVCOUREOTtcbiAgICB9XG4gIFxuICAgIDpob3N0OjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiAtMThweDtcbiAgICAgIHRvcDogM3B4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIH1cbiAgXG4gICAgOmhvc3QoW2FyaWEtY2hlY2tlZD1cInRydWVcIl0pOjpiZWZvcmUge1xuICAgICAgYmFja2dyb3VuZDogcmVkO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlUmFkaW9CdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChyYWRpb0J1dHRvblRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncmFkaW8nKTtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICB9XG59XG5cbmNvbnN0IHJhZGlvR3JvdXBUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5yYWRpb0dyb3VwVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIHBhZGRpbmctbGVmdDogMjBweDtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZVJhZGlvR3JvdXAgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChyYWRpb0dyb3VwVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdyYWRpb2dyb3VwJyk7XG5cbiAgICBsZXQgZmlyc3RDaGVja2VkQnV0dG9uID0gdGhpcy5jaGVja2VkUmFkaW9CdXR0b247XG4gICAgaWYgKGZpcnN0Q2hlY2tlZEJ1dHRvbikge1xuICAgICAgdGhpcy5fdW5jaGVja0FsbCgpO1xuICAgICAgdGhpcy5fY2hlY2tOb2RlKGZpcnN0Q2hlY2tlZEJ1dHRvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhhc1JvbGVSYWRpbyA9IHRoaXMucXVlcnlTZWxlY3RvcignW3JvbGU9XCJyYWRpb1wiXScpO1xuICAgICAgaWYoaGFzUm9sZVJhZGlvKSBcbiAgICAgICAgaGFzUm9sZVJhZGlvLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgX29uS2V5RG93bihlKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZQ09ERS5VUDpcbiAgICAgIGNhc2UgS0VZQ09ERS5MRUZUOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3NldENoZWNrZWRUb1ByZXZCdXR0b24oKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5ET1dOOlxuICAgICAgY2FzZSBLRVlDT0RFLlJJR0hUOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3NldENoZWNrZWRUb05leHRCdXR0b24oKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5IT01FOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3NldENoZWNrZWQodGhpcy5maXJzdFJhZGlvQnV0dG9uKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5FTkQ6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLmxhc3RSYWRpb0J1dHRvbik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuU1BBQ0U6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2hvd3RvLXJhZGlvLWJ1dHRvbicpXG4gICAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZChlLnRhcmdldCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBnZXQgY2hlY2tlZFJhZGlvQnV0dG9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNoZWNrZWQ9XCJ0cnVlXCJdJyk7XG4gIH1cblxuICBnZXQgZmlyc3RSYWRpb0J1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInJhZGlvXCJdOmZpcnN0LW9mLXR5cGUnKTtcbiAgfVxuXG4gIGdldCBsYXN0UmFkaW9CdXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW3JvbGU9XCJyYWRpb1wiXTpsYXN0LW9mLXR5cGUnKTtcbiAgfVxuXG4gIF9wcmV2UmFkaW9CdXR0b24obm9kZSkge1xuICAgIGxldCBwcmV2ID0gbm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIHdoaWxlIChwcmV2KSB7XG4gICAgICBpZiAocHJldi5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3JhZGlvJykge1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH1cbiAgICAgIHByZXYgPSBwcmV2LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgX25leHRSYWRpb0J1dHRvbihub2RlKSB7XG4gICAgbGV0IG5leHQgPSBub2RlLm5leHRFbGVtZW50U2libGluZztcbiAgICB3aGlsZSAobmV4dCkge1xuICAgICAgaWYgKG5leHQuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICdyYWRpbycpIHtcbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9XG4gICAgICBuZXh0ID0gbmV4dC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgX3NldENoZWNrZWRUb1ByZXZCdXR0b24oKSB7XG4gICAgbGV0IGNoZWNrZWRCdXR0b24gPSB0aGlzLmNoZWNrZWRSYWRpb0J1dHRvbiB8fCB0aGlzLmZpcnN0UmFkaW9CdXR0b247XG4gICAgaWYgKGNoZWNrZWRCdXR0b24gPT09IHRoaXMuZmlyc3RSYWRpb0J1dHRvbikge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLmxhc3RSYWRpb0J1dHRvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldENoZWNrZWQodGhpcy5fcHJldlJhZGlvQnV0dG9uKGNoZWNrZWRCdXR0b24pKTtcbiAgICB9XG4gIH1cblxuICBfc2V0Q2hlY2tlZFRvTmV4dEJ1dHRvbigpIHtcbiAgICBsZXQgY2hlY2tlZEJ1dHRvbiA9IHRoaXMuY2hlY2tlZFJhZGlvQnV0dG9uIHx8IHRoaXMuZmlyc3RSYWRpb0J1dHRvbjtcbiAgICBpZiAoY2hlY2tlZEJ1dHRvbiA9PT0gdGhpcy5sYXN0UmFkaW9CdXR0b24pIHtcbiAgICAgIHRoaXMuX3NldENoZWNrZWQodGhpcy5maXJzdFJhZGlvQnV0dG9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLl9uZXh0UmFkaW9CdXR0b24oY2hlY2tlZEJ1dHRvbikpO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRDaGVja2VkKG5vZGUpIHtcbiAgICB0aGlzLl91bmNoZWNrQWxsKCk7XG4gICAgdGhpcy5fY2hlY2tOb2RlKG5vZGUpO1xuICAgIHRoaXMuX2ZvY3VzTm9kZShub2RlKTtcbiAgfVxuXG4gIF91bmNoZWNrQWxsKCkge1xuICAgIGNvbnN0IHJhZGlvQnV0dG9ucyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJyYWRpb1wiXScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFkaW9CdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnRuID0gcmFkaW9CdXR0b25zW2ldO1xuICAgICAgYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1jaGVja2VkJywgJ2ZhbHNlJyk7XG4gICAgICBidG4udGFiSW5kZXggPSAtMTtcbiAgICB9XG4gIH1cblxuICBfY2hlY2tOb2RlKG5vZGUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1jaGVja2VkJywgJ3RydWUnKTtcbiAgICBub2RlLnRhYkluZGV4ID0gMDtcbiAgfVxuXG4gIF9mb2N1c05vZGUobm9kZSkge1xuICAgIG5vZGUuZm9jdXMoKTtcbiAgfVxuXG4gIF9vbkNsaWNrKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICdyYWRpbycpIHtcbiAgICAgIHRoaXMuX3NldENoZWNrZWQoZS50YXJnZXQpO1xuICAgIH1cbiAgfVxufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3N0eWxlcy5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9zdHlsZXMuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3N0eWxlcy5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG5jb25zdCBLRVlDT0RFID0ge1xuICBET1dOOiA0MCxcbiAgTEVGVDogMzcsXG4gIFJJR0hUOiAzOSxcbiAgVVA6IDM4LFxuICBIT01FOiAzNixcbiAgRU5EOiAzNSxcbn07XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgfVxuICAgIDo6c2xvdHRlZChjZS10YWItcGFuZWwpIHtcbiAgICAgIGZsZXgtYmFzaXM6IDEwMCU7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdCBuYW1lPVwidGFiXCI+PC9zbG90PlxuICA8c2xvdCBuYW1lPVwicGFuZWxcIj48L3Nsb3Q+XG5gO1xuXG5leHBvcnQgY2xhc3MgQ2VUYWJzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fb25TbG90Q2hhbmdlID0gdGhpcy5fb25TbG90Q2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgIHRoaXMuX3RhYlNsb3QgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc2xvdFtuYW1lPXRhYl0nKTtcbiAgICB0aGlzLl9wYW5lbFNsb3QgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc2xvdFtuYW1lPXBhbmVsXScpO1xuXG4gICAgdGhpcy5fdGFiU2xvdC5hZGRFdmVudExpc3RlbmVyKCdzbG90Y2hhbmdlJywgdGhpcy5fb25TbG90Q2hhbmdlKTtcbiAgICB0aGlzLl9wYW5lbFNsb3QuYWRkRXZlbnRMaXN0ZW5lcignc2xvdGNoYW5nZScsIHRoaXMuX29uU2xvdENoYW5nZSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFibGlzdCcpO1xuXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgY3VzdG9tRWxlbWVudHMud2hlbkRlZmluZWQoJ2NlLXRhYicpLFxuICAgICAgY3VzdG9tRWxlbWVudHMud2hlbkRlZmluZWQoJ2NlLXRhYi1wYW5lbCcpLFxuICAgIF0pXG4gICAgLnRoZW4oXyA9PiB0aGlzLl9saW5rUGFuZWxzKCkpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBfb25TbG90Q2hhbmdlKCkge1xuICAgIHRoaXMuX2xpbmtQYW5lbHMoKTtcbiAgfVxuXG4gIF9saW5rUGFuZWxzKCkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLl9hbGxUYWJzKCk7XG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICBjb25zdCBwYW5lbCA9IHRhYi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBpZiAocGFuZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnY2UtdGFiLXBhbmVsJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBUYWIgIyR7dGFiLmlkfSBpcyBub3QgYSBzaWJsaW5nIG9mIGEgPGNlLXRhYi1wYW5lbD5gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgcGFuZWwuaWQpO1xuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCB0YWIuaWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRUYWIgPSB0YWJzLmZpbmQodGFiID0+IHRhYi5zZWxlY3RlZCkgfHwgdGFic1swXTtcblxuICAgIHRoaXMuX3NlbGVjdFRhYihzZWxlY3RlZFRhYik7XG4gIH1cblxuICBfYWxsUGFuZWxzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbCgnY2UtdGFiLXBhbmVsJykpO1xuICB9XG5cbiAgX2FsbFRhYnMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdjZS10YWInKSk7XG4gIH1cblxuICBfcGFuZWxGb3JUYWIodGFiKSB7XG4gICAgY29uc3QgcGFuZWxJZCA9IHRhYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKGAjJHtwYW5lbElkfWApO1xuICB9XG5cbiAgX3ByZXZUYWIoKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuX2FsbFRhYnMoKTtcbiAgICBsZXQgbmV3SWR4ID0gdGFicy5maW5kSW5kZXgodGFiID0+IHRhYi5zZWxlY3RlZCkgLSAxO1xuICAgIHJldHVybiB0YWJzWyhuZXdJZHggKyB0YWJzLmxlbmd0aCkgJSB0YWJzLmxlbmd0aF07XG4gIH1cblxuICBfZmlyc3RUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbFRhYnMoKVswXTtcbiAgfVxuXG4gIF9sYXN0VGFiKCkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLl9hbGxUYWJzKCk7XG4gICAgcmV0dXJuIHRhYnNbdGFicy5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIF9uZXh0VGFiKCkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLl9hbGxUYWJzKCk7XG4gICAgbGV0IG5ld0lkeCA9IHRhYnMuZmluZEluZGV4KHRhYiA9PiB0YWIuc2VsZWN0ZWQpICsgMTtcbiAgICByZXR1cm4gdGFic1tuZXdJZHggJSB0YWJzLmxlbmd0aF07XG4gIH1cblxuICByZXNldCgpIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy5fYWxsVGFicygpO1xuICAgIGNvbnN0IHBhbmVscyA9IHRoaXMuX2FsbFBhbmVscygpO1xuXG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuc2VsZWN0ZWQgPSBmYWxzZSk7XG4gICAgcGFuZWxzLmZvckVhY2gocGFuZWwgPT4gcGFuZWwuaGlkZGVuID0gdHJ1ZSk7XG4gIH1cblxuICBfc2VsZWN0VGFiKG5ld1RhYikge1xuXG4gICAgdGhpcy5yZXNldCgpO1xuXG4gICAgY29uc3QgbmV3UGFuZWwgPSB0aGlzLl9wYW5lbEZvclRhYihuZXdUYWIpO1xuXG4gICAgaWYgKCFuZXdQYW5lbClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gcGFuZWwgd2l0aCBpZCAke25ld1BhbmVsSWR9YCk7XG4gICAgbmV3VGFiLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICBuZXdQYW5lbC5oaWRkZW4gPSBmYWxzZTtcbiAgICBuZXdUYWIuZm9jdXMoKTtcbiAgfVxuXG4gIF9vbktleURvd24oZXZlbnQpIHtcblxuICAgIGlmIChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdyb2xlJykgIT09ICd0YWInKSByZXR1cm47XG4gICAgaWYgKGV2ZW50LmFsdEtleSkgcmV0dXJuO1xuXG4gICAgbGV0IG5ld1RhYjtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZQ09ERS5MRUZUOlxuICAgICAgY2FzZSBLRVlDT0RFLlVQOlxuICAgICAgICBuZXdUYWIgPSB0aGlzLl9wcmV2VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuUklHSFQ6XG4gICAgICBjYXNlIEtFWUNPREUuRE9XTjpcbiAgICAgICAgbmV3VGFiID0gdGhpcy5fbmV4dFRhYigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkhPTUU6XG4gICAgICAgIG5ld1RhYiA9IHRoaXMuX2ZpcnN0VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuRU5EOlxuICAgICAgICBuZXdUYWIgPSB0aGlzLl9sYXN0VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMuX3NlbGVjdFRhYihuZXdUYWIpO1xuICB9XG5cbiAgX29uQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgncm9sZScpICE9PSAndGFiJykgcmV0dXJuO1xuICAgIHRoaXMuX3NlbGVjdFRhYihldmVudC50YXJnZXQpO1xuICB9XG59XG5cbmxldCBjZVRhYkNvdW50ZXIgPSAwO1xuXG5leHBvcnQgY2xhc3MgQ2VUYWIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3NlbGVjdGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgaWYgKCF0aGlzLmlkKVxuICAgICAgdGhpcy5pZCA9IGBjZS10YWItZ2VuZXJhdGVkLSR7Y2VUYWJDb3VudGVyKyt9YDtcblxuICAgIC8vIFNldCBhIHdlbGwtZGVmaW5lZCBpbml0aWFsIHN0YXRlLlxuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgIHRoaXMuX3VwZ3JhZGVQcm9wZXJ0eSgnc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIF91cGdyYWRlUHJvcGVydHkocHJvcCkge1xuICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzW3Byb3BdO1xuICAgICAgZGVsZXRlIHRoaXNbcHJvcF07XG4gICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCB2YWx1ZSk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgdmFsdWUgPyAwIDogLTEpO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkKHZhbHVlKSB7XG4gICAgdmFsdWUgPSBCb29sZWFuKHZhbHVlKTtcbiAgICBpZiAodmFsdWUpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICB9XG59XG5cbmxldCBjZVBhbmVsQ291bnRlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDZVRhYlBhbmVsIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYGNlLXBhbmVsLWdlbmVyYXRlZC0ke2NlUGFuZWxDb3VudGVyKyt9YDtcbiAgfVxufSIsIlxuY29uc3QgS0VZQ09ERSA9IHtcbiAgU1BBQ0U6IDMyLFxuICBFTlRFUjogMTMsXG59O1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIDpob3N0KFtoaWRkZW5dKSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlVG9nZ2xlQnV0dG9uIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydwcmVzc2VkJywgJ2Rpc2FibGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsICdmYWxzZScpO1xuXG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdwcmVzc2VkJyk7XG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdkaXNhYmxlZCcpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBfdXBncmFkZVByb3BlcnR5KHByb3ApIHtcbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgbGV0IHZhbHVlID0gdGhpc1twcm9wXTtcbiAgICAgIGRlbGV0ZSB0aGlzW3Byb3BdO1xuICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgc2V0IHByZXNzZWQodmFsdWUpIHtcbiAgICBjb25zdCBpc1ByZXNzZWQgPSBCb29sZWFuKHZhbHVlKTtcbiAgICBpZiAoaXNQcmVzc2VkKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3ByZXNzZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3ByZXNzZWQnKTtcbiAgfVxuXG4gIGdldCBwcmVzc2VkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgncHJlc3NlZCcpO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmIChpc0Rpc2FibGVkKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBjb25zdCBoYXNWYWx1ZSA9IG5ld1ZhbHVlICE9PSBudWxsO1xuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAncHJlc3NlZCc6XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCBoYXNWYWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIGhhc1ZhbHVlKTtcbiAgICAgICAgaWYgKGhhc1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBfb25LZXlEb3duKGV2ZW50KSB7XG5cbiAgICBpZiAoZXZlbnQuYWx0S2V5KSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZQ09ERS5TUEFDRTpcbiAgICAgIGNhc2UgS0VZQ09ERS5FTlRFUjpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlUHJlc3NlZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIF9vbkNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5fdG9nZ2xlUHJlc3NlZCgpO1xuICB9XG5cbiAgX3RvZ2dsZVByZXNzZWQoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICB0aGlzLnByZXNzZWQgPSAhdGhpcy5wcmVzc2VkO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBwcmVzc2VkOiB0aGlzLnByZXNzZWQsXG4gICAgICB9LFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICB9KSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDZVRvb2x0aXAgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zaG93ID0gdGhpcy5fc2hvdy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hpZGUgPSB0aGlzLl9oaWRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICd0b29sdGlwJyk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuXG4gICAgdGhpcy5faGlkZSgpO1xuXG4gICAgdGhpcy5fdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtZGVzY3JpYmVkYnk9JyArIHRoaXMuaWQgKyAnXScpO1xuXG4gICAgaWYgKCF0aGlzLl90YXJnZXQpIHJldHVybjtcblxuICAgIHRoaXMuX3RhcmdldC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3Nob3cpO1xuICAgIHRoaXMuX3RhcmdldC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5faGlkZSk7XG4gICAgdGhpcy5fdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9zaG93KTtcbiAgICB0aGlzLl90YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX2hpZGUpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuX3RhcmdldCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fc2hvdyk7XG4gICAgdGhpcy5fdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9oaWRlKTtcbiAgICB0aGlzLl90YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX3Nob3cpO1xuICAgIHRoaXMuX3RhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5faGlkZSk7XG4gICAgdGhpcy5fdGFyZ2V0ID0gbnVsbDtcbiAgfVxuXG4gIF9zaG93KCkge1xuICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gIH1cblxuICBfaGlkZSgpIHtcbiAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gIH1cbn1cbiIsIlxuXG5jb25zdCBUcmVlRGF0YSA9IHtcbiAgXCJwYXRoXCI6IFwiLi9kb2NzXCIsXG4gIFwibmFtZVwiOiBcImRvY3NcIixcbiAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9hbmd1bGFyXCIsXG4gICAgICBcIm5hbWVcIjogXCJhbmd1bGFyXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2FuZ3VsYXIvYnJvYWRjYXN0ZXIubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJicm9hZGNhc3Rlci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2FuZ3VsYXIvZGVib3VuY2UubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJkZWJvdW5jZS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2FuZ3VsYXIvaHR0cC1pbnRlcmNlcHRvci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImh0dHAtaW50ZXJjZXB0b3IubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NsYXNzLm1kXCIsXG4gICAgICBcIm5hbWVcIjogXCJjbGFzcy5tZFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzXCIsXG4gICAgICBcIm5hbWVcIjogXCJjc3MzLWNvbXBvbmVudHNcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzL2Fycm93Lm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiYXJyb3cubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvYm94LXNoYWRvdy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImJveC1zaGFkb3cubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvY2hlY2tib3gubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJjaGVja2JveC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9tYXQtYm94LXNoYWRvdy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcIm1hdC1ib3gtc2hhZG93Lm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzL21vZGFsLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwibW9kYWwubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvcmFuZ2Utc2VsZWN0b3IubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJyYW5nZS1zZWxlY3Rvci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9yZXNwb25zaXZlLW1lbnUubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJyZXNwb25zaXZlLW1lbnUubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvc3RlcC1wcm9ncmVzcy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInN0ZXAtcHJvZ3Jlc3MubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvdG9nZ2xlLXN3aXRjaC5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInRvZ2dsZS1zd2l0Y2gubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvdmVydGljYWwtbm90aWZpY2F0aW9uLWJhci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInZlcnRpY2FsLW5vdGlmaWNhdGlvbi1iYXIubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2RvbVwiLFxuICAgICAgXCJuYW1lXCI6IFwiZG9tXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2RvbS9kb20taGFuZGxlci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImRvbS1oYW5kbGVyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tL2RvbS1vcGVyYXRpb25zLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZG9tLW9wZXJhdGlvbnMubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kb20vZG9tLXV0aWxzLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZG9tLXV0aWxzLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tL3Njcm9sbC10YWJsZS1jb2x1bW4ubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJzY3JvbGwtdGFibGUtY29sdW1uLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tL3Njcm9sbGFibGUtc2lkZWJhci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInNjcm9sbGFibGUtc2lkZWJhci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvZHNcIixcbiAgICAgIFwibmFtZVwiOiBcImRzXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2RzL2xpbmtlZC1saXN0Lm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwibGlua2VkLWxpc3QubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2ZpbGUtMy5tZFwiLFxuICAgICAgXCJuYW1lXCI6IFwiZmlsZS0zLm1kXCIsXG4gICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9mb2xkZXItMVwiLFxuICAgICAgXCJuYW1lXCI6IFwiZm9sZGVyLTFcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZm9sZGVyLTEvZmlsZS0xLjEubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJmaWxlLTEuMS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2ZvbGRlci0xL2ZpbGUtMS4yLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZmlsZS0xLjIubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2xpbnV4XCIsXG4gICAgICBcIm5hbWVcIjogXCJsaW51eFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9saW51eC9zc2gubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJzc2gubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21pc2NcIixcbiAgICAgIFwibmFtZVwiOiBcIm1pc2NcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvbWlzYy9jb3Jwb3JhdGUtcHJveHkubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJjb3Jwb3JhdGUtcHJveHkubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9taXNjL2dpdC1jb21tYW5kcy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImdpdC1jb21tYW5kcy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21pc2MvamVreWxsLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiamVreWxsLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvbWlzYy9qaXJhLWlzc3VlLWZpbHRlci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImppcmEtaXNzdWUtZmlsdGVyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9tb2JpbGVcIixcbiAgICAgIFwibmFtZVwiOiBcIm1vYmlsZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9tb2JpbGUvcmVhY3QtbmF0aXZlLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwicmVhY3QtbmF0aXZlLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9waHBcIixcbiAgICAgIFwibmFtZVwiOiBcInBocFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9waHAvY29tcG9zZXIubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJjb21wb3Nlci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvcmVhY3QtbmF0aXZlXCIsXG4gICAgICBcIm5hbWVcIjogXCJyZWFjdC1uYXRpdmVcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvcmVhY3QtbmF0aXZlL2Jhc2ljLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiYmFzaWMubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3JlZ2V4XCIsXG4gICAgICBcIm5hbWVcIjogXCJyZWdleFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9yZWdleC9jYW1lbGNhc2UubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJjYW1lbGNhc2UubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3JvaGl0Lm1kXCIsXG4gICAgICBcIm5hbWVcIjogXCJyb2hpdC5tZFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3Mvc2Nzc1wiLFxuICAgICAgXCJuYW1lXCI6IFwic2Nzc1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9zY3NzL2JveC1zaGFkb3cubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJib3gtc2hhZG93Lm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy92ZW5rYXQubWRcIixcbiAgICAgIFwibmFtZVwiOiBcInZlbmthdC5tZFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgfVxuICBdXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJlZURhdGE7IiwiXG5cbmltcG9ydCBzdHlsZSBmcm9tICcuL3RyZWUuc2Nzcyc7XG5pbXBvcnQgVHJlZURhdGEgZnJvbSAnLi90cmVlLWRhdGEnO1xuXG5leHBvcnQgY2xhc3MgVHJlZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBzdGF0aWMgZ2V0IGlzICgpIHtcbiAgICByZXR1cm4gJ2NlLXRyZWUtdmlldyc7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcyAoKSB7XG4gICAgcmV0dXJuIFsnZGlzYWJsZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gYFxuICAgICAgPHN0eWxlPiR7c3R5bGV9PC9zdHlsZT5cbiAgICAgICR7dGhpcy5fcmVuZGVyVHJlZShbVHJlZURhdGFdKX1cbiAgICBgO1xuICB9XG5cbiAgX3JlbmRlclRyZWUgKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5idWlsZE5vZGUoZGF0YSk7XG4gIH1cblxuICBidWlsZE5vZGUgKGRhdGEpIHsgXG4gICAgcmV0dXJuIChgXG4gICAgICA8dWwgY2xhc3M9XCJjZS10cmVlLWNvbnRlbnRcIiBjZS10cmVlPVwiXCI+XG4gICAgICAgICR7ZGF0YS5yZWR1Y2UoKHQsIGQpID0+IHtcbiAgICAgICAgICB0ICs9IChgXG4gICAgICAgICAgICA8bGkgY2UtZm9sZGVyIGNsYXNzPVwiY2UtdHJlZS1mb2xkZXJcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJjZS10cmVlLWljb25cIiBkYXRhLXR5cGU9XCIke2QudHlwZX1cIj48L2k+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2UtdHJlZS1pdGVtLW5hbWVcIj4ke2QubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICR7ZC5jaGlsZHJlbiA/IHRoaXMuYnVpbGROb2RlKGQuY2hpbGRyZW4pIDogJyd9XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGApO1xuICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICB9LCAnJyl9XG4gICAgICA8L3VsPlxuICAgIGApO1xuICB9IFxuXG4gIGNvbm5lY3RlZENhbGxiYWNrICgpIHtcbiAgICBjb25zdCBmb2xkZXJzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbY2UtZm9sZGVyXScpO1xuICAgIEFycmF5LmZyb20oZm9sZGVycykuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB0aGlzLmhhbmRsZUNsaWNrKGV2dCwgZWwpKVxuICAgIH0pO1xuXG4gICAgLy8gRXhwYW5kIHRoZSB2ZXJ5IGZpcnN0IGZvbGRlclxuICAgIGZvbGRlcnNbMF0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gIH1cblxuICBoYW5kbGVDbGljayhldnQsIGVsKSB7XG4gICAgbGV0IGlzRXhwYW5kZWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICBpZihpc0V4cGFuZGVkID09PSAndHJ1ZScpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgfVxuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrICgpIHtcbiAgICBjb25zdCBmb2xkZXJzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbY2UtZm9sZGVyXScpO1xuICAgIEFycmF5LmZyb20oZm9sZGVycykuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB0aGlzLmhhbmRsZUNsaWNrKGV2dCwgZWwpKVxuICAgIH0pO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShUcmVlLmlzLCBUcmVlKTtcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi90cmVlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3RyZWUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3RyZWUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8qXG4gKiBAQXV0aG9yOiBSYWprZXNod2FyIFByYXNhZChyYWprZXNod2FyLnBkQGdtYWlsLmNvbSkgXG4gKiBARGF0ZTogMjAxOS0wMi0yMyAyMzowMDo0MiBcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiBSYWprZXNod2FyIFByYXNhZFxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxOS0wMi0yNCAwMDozNzo0NlxuICovXG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPjwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmV4cG9ydCBjbGFzcyBVaVJvdXRlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdDb25zdHJ1Y3RvciBnZXRzIGNhbGxlZCcpO1xuICB9XG4gIFxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnVWlSb3V0ZXIgcm9ja3Mgbm93Jyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYXR0YWNoZWRDYWxsYmFjayBjYWxsZWQnKTtcbiAgfVxuXG59XG5cblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgneHVpLXJvdXRlcicsIFVpUm91dGVyKTsiLCIvKlxuICogQEF1dGhvcjogUmFqa2VzaHdhciBQcmFzYWQocmFqa2VzaHdhci5wZEBnbWFpbC5jb20pIFxuICogQERhdGU6IDIwMTktMDItMjMgMjI6MjQ6MzIgXG4gKiBATGFzdCBNb2RpZmllZCBieTogUmFqa2VzaHdhciBQcmFzYWRcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTktMDMtMTcgMTA6MDk6NTNcbiAqL1xuXG5yZXF1aXJlKCcuL2FwcC9zdHlsZXMuc2NzcycpO1xuXG5pbXBvcnQgQ2VDaGVja2JveCBmcm9tICcuL2FwcC9jaGVja2JveC9jZS1jaGVja2JveCc7XG5pbXBvcnQgeyBcbiAgQ2VBY2NvcmRpb24sIENlQWNjb3JkaW9uSGVhZGluZywgQ2VBY2NvcmRpb25QYW5lbCBcbn0gZnJvbSAnLi9hcHAvYWNjb3JkaW9uL2NlLWFjY29yZGlvbic7XG5cbmltcG9ydCB7IENlVGFiLCBDZVRhYnMsIENlVGFiUGFuZWwgfSBmcm9tICcuL2FwcC90YWJzL2NlLXRhYic7XG5pbXBvcnQgeyBDZVRvZ2dsZUJ1dHRvbiB9IGZyb20gJy4vYXBwL3RvZ2dsZS9jZS10b2dnbGUnO1xuaW1wb3J0IHsgQ2VUb29sdGlwIH0gZnJvbSAnLi9hcHAvdG9vbHRpcC9jZS10b29sdGlwJztcbmltcG9ydCB7IENlUmFkaW9CdXR0b24sIENlUmFkaW9Hcm91cCB9IGZyb20gJy4vYXBwL3JhZGlvZ3JvdXAvY2UtcmFkaW9ncm91cCc7XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLWNoZWNrYm94JywgQ2VDaGVja2JveCk7IFxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1hY2NvcmRpb24nLCBDZUFjY29yZGlvbik7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1hY2NvcmRpb24taGVhZGluZycsIENlQWNjb3JkaW9uSGVhZGluZyk7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1hY2NvcmRpb24tcGFuZWwnLCBDZUFjY29yZGlvblBhbmVsKTtcblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtdGFiJywgQ2VUYWIpO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtdGFicycsIENlVGFicyk7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS10YWItcGFuZWwnLCBDZVRhYlBhbmVsKTsgXG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRvZ2dsZS1idXR0b24nLCBDZVRvZ2dsZUJ1dHRvbik7XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRvb2x0aXAnLCBDZVRvb2x0aXApO1xuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1yYWRpby1idXR0b24nLCBDZVJhZGlvQnV0dG9uKTtcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXJhZGlvLWdyb3VwJywgQ2VSYWRpb0dyb3VwKTtcblxuXG5yZXF1aXJlKCcuL2FwcC91aS1yb3V0ZXInKTtcbnJlcXVpcmUoJy4vYXBwL2xpbmtzJyk7XG5yZXF1aXJlKCcuL2FwcC9ldmVudC9ldmVudCcpO1xuXG5yZXF1aXJlKCcuL2FwcC9idXR0b24vYnV0dG9uJyk7XG5yZXF1aXJlKCcuL2FwcC90cmVlL3RyZWUnKTtcblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=