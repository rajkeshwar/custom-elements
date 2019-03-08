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
/******/ 	var hotCurrentHash = "1fa5d0861d5971414b3e";
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
 * @Last Modified time: 2019-03-02 19:37:39
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYWNjb3JkaW9uL2NlLWFjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NoZWNrYm94L2NlLWNoZWNrYm94LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvZXZlbnQvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9saW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3JhZGlvZ3JvdXAvY2UtcmFkaW9ncm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3N0eWxlcy5zY3NzPzZiYWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90YWJzL2NlLXRhYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RvZ2dsZS9jZS10b2dnbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90b29sdGlwL2NlLXRvb2x0aXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC91aS1yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkFDQ09SRElPTl9IRUFERVIiLCJBQ0NPUkRJT05fUEFORUwiLCJLRVlDT0RFIiwiRE9XTiIsIkxFRlQiLCJSSUdIVCIsIlVQIiwiSE9NRSIsIkVORCIsImFjY29yZGlvblRlbXBsYXRlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiQ2VBY2NvcmRpb24iLCJhdHRhY2hTaGFkb3ciLCJtb2RlIiwic2hhZG93Um9vdCIsImFwcGVuZENoaWxkIiwiY29udGVudCIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25DaGFuZ2UiLCJfb25LZXlEb3duIiwiUHJvbWlzZSIsImFsbCIsImN1c3RvbUVsZW1lbnRzIiwid2hlbkRlZmluZWQiLCJ0aGVuIiwiXyIsImhlYWRpbmdzIiwiX2FsbEhlYWRpbmdzIiwiZm9yRWFjaCIsImhlYWRpbmciLCJzZXRBdHRyaWJ1dGUiLCJwYW5lbCIsIl9wYW5lbEZvckhlYWRpbmciLCJpZCIsImV4cGFuZGVkIiwiX2NvbGxhcHNlSGVhZGluZyIsIl9jb2xsYXBzZVBhbmVsIiwiX2V4cGFuZEhlYWRpbmciLCJfZXhwYW5kUGFuZWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImV2ZW50IiwiX2FuaW1hdGVQYW5lbEZvckhlYWRpbmciLCJ0YXJnZXQiLCJkZXRhaWwiLCJpc0V4cGFuZGVkTm93IiwiZXhwYW5kIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJfYW5pbWF0ZUluIiwiX2FuaW1hdGVPdXQiLCJjdXJyZW50SGVhZGluZyIsIl9pc0hlYWRpbmciLCJhbHRLZXkiLCJuZXdIZWFkaW5nIiwia2V5Q29kZSIsIl9wcmV2SGVhZGluZyIsIl9uZXh0SGVhZGluZyIsIl9maXJzdEhlYWRpbmciLCJfbGFzdEhlYWRpbmciLCJwcmV2ZW50RGVmYXVsdCIsImZvY3VzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsIm5leHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJjb25zb2xlIiwiZXJyb3IiLCJuZXdJZHgiLCJmaW5kSW5kZXgiLCJhY3RpdmVFbGVtZW50IiwibGVuZ3RoIiwiaGVpZ2h0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiX2FuaW1hdGUiLCJzdGFydE9mZnNldCIsImVuZE9mZnNldCIsInJlc29sdmUiLCJhZGQiLCJjaGlsZHJlbiIsImlkeCIsImluZGV4T2YiLCJhbmltYXRlZENoaWxkcmVuIiwic2xpY2UiLCJzdHlsZSIsIm92ZXJmbG93IiwiY2hpbGQiLCJwb3NpdGlvbiIsInpJbmRleCIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2UiLCJ0cmFuc2l0aW9uRW5kUHJvbWlzZSIsInJlbW92ZSIsIkhUTUxFbGVtZW50IiwiaGVhZGluZ0lkQ291bnRlciIsImFjY29yZGlvbkhlYWRpbmdUZW1wbGF0ZSIsIkNlQWNjb3JkaW9uSGVhZGluZyIsIl9vbkNsaWNrIiwiYmluZCIsImRlbGVnYXRlc0ZvY3VzIiwiX3NoYWRvd0J1dHRvbiIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNBdHRyaWJ1dGUiLCJuYW1lIiwidmFsdWUiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJidWJibGVzIiwiQm9vbGVhbiIsInJlbW92ZUF0dHJpYnV0ZSIsImFjY29yZGlvblBhbmVsVGVtcGxhdGUiLCJwYW5lbElkQ291bnRlciIsIkNlQWNjb3JkaW9uUGFuZWwiLCJ2YWwiLCJlbGVtZW50IiwiZiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIlNQQUNFIiwidGVtcGxhdGUiLCJDZUNoZWNrYm94IiwiX3VwZ3JhZGVQcm9wZXJ0eSIsIl9vbktleVVwIiwicHJvcCIsImhhc093blByb3BlcnR5Iiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsImhhc1ZhbHVlIiwiYmx1ciIsIl90b2dnbGVDaGVja2VkIiwiZGlzYWJsZWQiLCJjaGVja2VkIiwiaXNDaGVja2VkIiwiaXNEaXNhYmxlZCIsIlVpRXZlbnQiLCJjaXR5IiwiX3JlbmRlciIsImxvZyIsIl9hZGRFdmVudExpc3RlbmVycyIsImV2dCIsImVsIiwiYXR0cmlidXRlcyIsImZpbHRlciIsImF0dHIiLCJ0ZXN0IiwidGFyZ2V0Rm4iLCJldmFsIiwiZXZlbnROYW1lIiwicmVwbGFjZSIsImFwcGx5IiwiZnVuY3Rpb25BbmRQYXJhbXMiLCJleGVjIiwicGFyYW1zIiwic3BsaXQiLCJ3aW5kb3ciLCJkZWZpbmUiLCJvbmxvYWQiLCJiaW5kTGlua3MiLCJsaW5rcyIsImxpbmsiLCJoaWphY2tMaW5rcyIsInBhZ2UiLCJnZXRBdHRyaWJ1dGUiLCJfbG9hZFZpZXciLCJwYWdlVXJsIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJuZXdEb2MiLCJyZXNwb25zZSIsInJvdXRlclNsb3QiLCJyZXNwb25zZVR5cGUiLCJvcGVuIiwic2VuZCIsInJhZGlvQnV0dG9uVGVtcGxhdGUiLCJDZVJhZGlvQnV0dG9uIiwicmFkaW9Hcm91cFRlbXBsYXRlIiwiQ2VSYWRpb0dyb3VwIiwiZmlyc3RDaGVja2VkQnV0dG9uIiwiY2hlY2tlZFJhZGlvQnV0dG9uIiwiX3VuY2hlY2tBbGwiLCJfY2hlY2tOb2RlIiwiaGFzUm9sZVJhZGlvIiwiZSIsIl9zZXRDaGVja2VkVG9QcmV2QnV0dG9uIiwiX3NldENoZWNrZWRUb05leHRCdXR0b24iLCJfc2V0Q2hlY2tlZCIsImZpcnN0UmFkaW9CdXR0b24iLCJsYXN0UmFkaW9CdXR0b24iLCJub2RlIiwicHJldiIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJjaGVja2VkQnV0dG9uIiwiX3ByZXZSYWRpb0J1dHRvbiIsIl9uZXh0UmFkaW9CdXR0b24iLCJfZm9jdXNOb2RlIiwicmFkaW9CdXR0b25zIiwiaSIsImJ0biIsInRhYkluZGV4IiwiQ2VUYWJzIiwiX29uU2xvdENoYW5nZSIsIl90YWJTbG90IiwiX3BhbmVsU2xvdCIsIl9saW5rUGFuZWxzIiwidGFicyIsIl9hbGxUYWJzIiwidGFiIiwic2VsZWN0ZWRUYWIiLCJmaW5kIiwic2VsZWN0ZWQiLCJfc2VsZWN0VGFiIiwicGFuZWxJZCIsInBhbmVscyIsIl9hbGxQYW5lbHMiLCJoaWRkZW4iLCJuZXdUYWIiLCJyZXNldCIsIm5ld1BhbmVsIiwiX3BhbmVsRm9yVGFiIiwiRXJyb3IiLCJuZXdQYW5lbElkIiwiX3ByZXZUYWIiLCJfbmV4dFRhYiIsIl9maXJzdFRhYiIsIl9sYXN0VGFiIiwiY2VUYWJDb3VudGVyIiwiQ2VUYWIiLCJjZVBhbmVsQ291bnRlciIsIkNlVGFiUGFuZWwiLCJFTlRFUiIsIkNlVG9nZ2xlQnV0dG9uIiwiX3RvZ2dsZVByZXNzZWQiLCJwcmVzc2VkIiwiaXNQcmVzc2VkIiwiQ2VUb29sdGlwIiwiX3Nob3ciLCJfaGlkZSIsIl90YXJnZXQiLCJVaVJvdXRlciIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LE1BQXRCLENBQTZCLGtCQUE3QixFQUFpRDJFLG9FQUFqRDtBQUVBNUUsTUFBTSxDQUFDdEksY0FBUCxDQUFzQnVJLE1BQXRCLENBQTZCLFlBQTdCLEVBQTJDK0UsaUVBQTNDO0FBRUFoRixNQUFNLENBQUN0SSxjQUFQLENBQXNCdUksTUFBdEIsQ0FBNkIsaUJBQTdCLEVBQWdEbUIsMkVBQWhEO0FBQ0FwQixNQUFNLENBQUN0SSxjQUFQLENBQXNCdUksTUFBdEIsQ0FBNkIsZ0JBQTdCLEVBQStDcUIsMEVBQS9DOztBQUdBK0QsbUJBQU8sQ0FBQywrQ0FBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLHVDQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsbURBQUQsQ0FBUCxDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIxZmE1ZDA4NjFkNTk3MTQxNGIzZVwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiY2UtY2hlY2tib3gge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcblxcbmNlLWxhYmVsIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IDhweDsgfVxcblxcbmNlLWFjY29yZGlvbi1oZWFkaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7IH1cXG5cXG5jZS1hY2NvcmRpb24taGVhZGluZyArIGNlLWFjY29yZGlvbi1oZWFkaW5nIHtcXG4gIGJvcmRlci10b3A6IG5vbmU7IH1cXG5cXG5jZS1hY2NvcmRpb24taGVhZGluZ1tleHBhbmRlZF0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlOyB9XFxuXFxuY2UtYWNjb3JkaW9uLXBhbmVsIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7IH1cXG5cXG5jZS10YWIge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBwYWRkaW5nOiAyMHB4OyB9XFxuXFxuY2UtdGFiLXBhbmVsIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7IH1cXG5cXG5jZS10YWJbc2VsZWN0ZWRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTsgfVxcblxcbmNlLXRhYnM6bm90KDpkZWZpbmVkKSxcXG5jZS10YWI6bm90KDpkZWZpbmVkKSxcXG5jZS10YWItcGFuZWw6bm90KDpkZWZpbmVkKSB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmNlLXRvZ2dsZS1idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gIHBhZGRpbmc6IDNweDtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjJzIGVhc2U7IH1cXG5cXG5jZS10b2dnbGUtYnV0dG9uW3ByZXNzZWRdLFxcbmNlLXRvZ2dsZS1idXR0b246bm90KFtkaXNhYmxlZF0pOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OyB9XFxuXFxuY2UtdG9nZ2xlLWJ1dHRvbltkaXNhYmxlZF0ge1xcbiAgb3BhY2l0eTogMC4zNTsgfVxcblxcbmh0bWwsIGJvZHkge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDsgfVxcbiAgaHRtbCAqLCBib2R5ICoge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuLnVpLWRlbW8ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG4gIC51aS1kZW1vIC5zaWRlbmF2IHtcXG4gICAgZmxleC1iYXNpczogMzAwcHg7XFxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTsgfVxcbiAgLnVpLWRlbW8gLmNvbnRlbnQge1xcbiAgICBmbGV4OiAxO1xcbiAgICBib3JkZXItbGVmdDogbm9uZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDIwcHg7IH1cXG5cXG51aS1yb3V0ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi51aS1lbGVtZW50cyB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgYmFja2dyb3VuZDogI2ZhZmFmYTsgfVxcbiAgLnVpLWVsZW1lbnRzX19pdGVtIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XFxuICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjNzIGxpbmVhcjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICAgIC51aS1lbGVtZW50c19faXRlbSBhIHtcXG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiAxMDAlOyB9XFxuICAgIC51aS1lbGVtZW50c19faXRlbTpob3ZlciB7XFxuICAgICAgYm94LXNoYWRvdzogMHB4IDFweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZmOyB9XFxuICAgICAgLnVpLWVsZW1lbnRzX19pdGVtOmhvdmVyOmJlZm9yZSB7XFxuICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogMDtcXG4gICAgICAgIGJvdHRvbTogMDtcXG4gICAgICAgIGxlZnQ6IDA7XFxuICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICB3aWR0aDogNXB4O1xcbiAgICAgICAgYmFja2dyb3VuZDogIzJmNjJhMzsgfVxcblwiLCBcIlwiXSk7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiAnQG1lZGlhICcgKyBpdGVtWzJdICsgJ3snICsgY29udGVudCArICd9JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSAnKCcgKyBpdGVtWzJdICsgJykgYW5kICgnICsgbWVkaWFRdWVyeSArICcpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJztcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcbiAgcmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn0iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJcbmNvbnN0IEFDQ09SRElPTl9IRUFERVIgPSAnY2UtYWNjb3JkaW9uLWhlYWRpbmcnO1xuY29uc3QgQUNDT1JESU9OX1BBTkVMID0gJ2NlLWFjY29yZGlvbi1wYW5lbCc7XG5cbmNvbnN0IEtFWUNPREUgPSB7XG4gIERPV046IDQwLFxuICBMRUZUOiAzNyxcbiAgUklHSFQ6IDM5LFxuICBVUDogMzgsXG4gIEhPTUU6IDM2LFxuICBFTkQ6IDM1LFxufTtcblxuY29uc3QgYWNjb3JkaW9uVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuYWNjb3JkaW9uVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICB9XG4gICAgOjpzbG90dGVkKC5hbmltYXRpbmcpIHtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0O1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlQWNjb3JkaW9uIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChhY2NvcmRpb25UZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5fb25DaGFuZ2UpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZChBQ0NPUkRJT05fSEVBREVSKSxcbiAgICAgIGN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKEFDQ09SRElPTl9QQU5FTCksXG4gICAgXSlcbiAgICAgIC50aGVuKF8gPT4ge1xuXG4gICAgICAgIGNvbnN0IGhlYWRpbmdzID0gdGhpcy5fYWxsSGVhZGluZ3MoKTtcblxuICAgICAgICBoZWFkaW5ncy5mb3JFYWNoKGhlYWRpbmcgPT4ge1xuICAgICAgICAgIGhlYWRpbmcuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKTtcblxuICAgICAgICAgIGhlYWRpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgcGFuZWwuaWQpO1xuICAgICAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgaGVhZGluZy5pZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhlYWRpbmdzWzBdLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcblxuICAgICAgICBoZWFkaW5nc1xuICAgICAgICAgIC5mb3JFYWNoKGhlYWRpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLl9wYW5lbEZvckhlYWRpbmcoaGVhZGluZyk7XG4gICAgICAgICAgICBpZiAoIWhlYWRpbmcuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fY29sbGFwc2VIZWFkaW5nKGhlYWRpbmcpO1xuICAgICAgICAgICAgICB0aGlzLl9jb2xsYXBzZVBhbmVsKHBhbmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2V4cGFuZEhlYWRpbmcoaGVhZGluZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2V4cGFuZFBhbmVsKHBhbmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZSk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgfVxuXG4gIF9pc0hlYWRpbmcoZWxlbSkge1xuICAgIHJldHVybiBlbGVtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gQUNDT1JESU9OX0hFQURFUjtcbiAgfVxuXG4gIF9vbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMuX2FuaW1hdGVQYW5lbEZvckhlYWRpbmcoZXZlbnQudGFyZ2V0LCBldmVudC5kZXRhaWwuaXNFeHBhbmRlZE5vdyk7XG4gIH1cblxuICBfYW5pbWF0ZVBhbmVsRm9ySGVhZGluZyhoZWFkaW5nLCBleHBhbmQpIHtcbiBcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW1hdGluZycpKSByZXR1cm47XG5cbiAgICBjb25zdCBwYW5lbCA9IHRoaXMuX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKTtcbiAgICBpZiAoZXhwYW5kKSB7XG4gICAgICB0aGlzLl9leHBhbmRQYW5lbChwYW5lbCk7XG4gICAgICB0aGlzLl9hbmltYXRlSW4ocGFuZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hbmltYXRlT3V0KHBhbmVsKVxuICAgICAgICAudGhlbihfID0+IHRoaXMuX2NvbGxhcHNlUGFuZWwocGFuZWwpKTtcbiAgICB9XG4gIH1cblxuICBfb25LZXlEb3duKGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudEhlYWRpbmcgPSBldmVudC50YXJnZXQ7XG5cbiAgICBpZiAoIXRoaXMuX2lzSGVhZGluZyhjdXJyZW50SGVhZGluZykpIHJldHVybjtcblxuICAgIGlmIChldmVudC5hbHRLZXkpIHJldHVybjtcblxuICAgIGxldCBuZXdIZWFkaW5nO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLkxFRlQ6XG4gICAgICBjYXNlIEtFWUNPREUuVVA6XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9wcmV2SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLlJJR0hUOlxuICAgICAgY2FzZSBLRVlDT0RFLkRPV046XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9uZXh0SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkhPTUU6XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9maXJzdEhlYWRpbmcoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5FTkQ6XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9sYXN0SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY3VycmVudEhlYWRpbmcuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICBuZXdIZWFkaW5nLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICBuZXdIZWFkaW5nLmZvY3VzKCk7XG4gIH1cblxuICBfYWxsUGFuZWxzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbChBQ0NPUkRJT05fUEFORUwpKTtcbiAgfVxuXG4gIF9hbGxIZWFkaW5ncygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoQUNDT1JESU9OX0hFQURFUikpO1xuICB9XG5cbiAgX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKSB7XG4gICAgY29uc3QgbmV4dCA9IGhlYWRpbmcubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIGlmIChuZXh0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gQUNDT1JESU9OX1BBTkVMKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdTaWJsaW5nIGVsZW1lbnQgdG8gYSBoZWFkaW5nIG5lZWQgdG8gYmUgYSBwYW5lbC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICBfcHJldkhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuXG4gICAgbGV0IG5ld0lkeCA9IGhlYWRpbmdzLmZpbmRJbmRleChoZWFkaW5ncyA9PiBcbiAgICAgICAgaGVhZGluZ3MgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIC0gMTtcblxuICAgIHJldHVybiBoZWFkaW5nc1sobmV3SWR4ICsgaGVhZGluZ3MubGVuZ3RoKSAlIGhlYWRpbmdzLmxlbmd0aF07XG4gIH1cblxuICBfbmV4dEhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuICAgIGxldCBuZXdJZHggPSBoZWFkaW5ncy5maW5kSW5kZXgoaGVhZGluZyA9PlxuICAgICAgICBoZWFkaW5nID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSArIDE7XG5cbiAgICByZXR1cm4gaGVhZGluZ3NbbmV3SWR4ICUgaGVhZGluZ3MubGVuZ3RoXTtcbiAgfVxuXG4gIF9maXJzdEhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuICAgIHJldHVybiBoZWFkaW5nc1swXTtcbiAgfVxuXG4gIF9sYXN0SGVhZGluZygpIHtcbiAgICBjb25zdCBoZWFkaW5ncyA9IHRoaXMuX2FsbEhlYWRpbmdzKCk7XG4gICAgcmV0dXJuIGhlYWRpbmdzW2hlYWRpbmdzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgX2V4cGFuZFBhbmVsKHBhbmVsKSB7XG4gICAgcGFuZWwuZXhwYW5kZWQgPSB0cnVlO1xuICB9XG5cbiAgX2NvbGxhcHNlUGFuZWwocGFuZWwpIHtcbiAgICBwYW5lbC5leHBhbmRlZCA9IGZhbHNlO1xuICB9XG5cbiAgX2V4cGFuZEhlYWRpbmcoaGVhZGluZykge1xuICAgIGhlYWRpbmcuZXhwYW5kZWQgPSB0cnVlO1xuICB9XG5cbiAgX2NvbGxhcHNlSGVhZGluZyhoZWFkaW5nKSB7XG4gICAgaGVhZGluZy5leHBhbmRlZCA9IGZhbHNlO1xuICB9XG5cbiAgX2FuaW1hdGVJbihwYW5lbCkge1xuICAgIGNvbnN0IGhlaWdodCA9IHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZShwYW5lbCwgLWhlaWdodCwgMCk7XG4gIH1cblxuICBfYW5pbWF0ZU91dChwYW5lbCkge1xuICAgIGNvbnN0IGhlaWdodCA9IHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZShwYW5lbCwgMCwgLWhlaWdodCk7XG4gIH1cblxuICBfYW5pbWF0ZShwYW5lbCwgc3RhcnRPZmZzZXQsIGVuZE9mZnNldCkge1xuXG4gICAgaWYgKHN0YXJ0T2Zmc2V0ID09PSBlbmRPZmZzZXQpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGluZycpO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pO1xuXG4gICAgY29uc3QgaWR4ID0gY2hpbGRyZW4uaW5kZXhPZihwYW5lbCk7XG5cbiAgICBjb25zdCBhbmltYXRlZENoaWxkcmVuID0gY2hpbGRyZW4uc2xpY2UoaWR4KTtcbiAgICB0aGlzLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGNoaWxkLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgIGNoaWxkLnN0eWxlLnpJbmRleCA9IDI7XG4gICAgfSk7XG5cbiAgICBhbmltYXRlZENoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgY2hpbGQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgY2hpbGQuc3R5bGUuekluZGV4ID0gMTtcbiAgICAgIGNoaWxkLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7c3RhcnRPZmZzZXR9cHgpYDtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcm9taXNlKClcbiAgICAgIC50aGVuKF8gPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJvbWlzZSgpKVxuICAgICAgLnRoZW4oXyA9PiB7XG4gICAgICAgIGFuaW1hdGVkQ2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgY2hpbGQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtlbmRPZmZzZXR9cHgpYDtcbiAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKCdhbmltYXRpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25FbmRQcm9taXNlKHBhbmVsKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihfID0+IHtcbiAgICAgICAgYW5pbWF0ZWRDaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICBjaGlsZC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpbmcnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgIGNoaWxkLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgICAgICAgY2hpbGQuc3R5bGUuekluZGV4ID0gJyc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW5nJyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5sZXQgaGVhZGluZ0lkQ291bnRlciA9IDA7XG5cbmNvbnN0IGFjY29yZGlvbkhlYWRpbmdUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5hY2NvcmRpb25IZWFkaW5nVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgY29udGFpbjogY29udGVudDtcbiAgICB9XG4gICAgYnV0dG9uIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogaW5pdGlhbDtcbiAgICAgIGJvcmRlcjogaW5pdGlhbDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgcGFkZGluZzogMTBweDsgXG4gICAgfVxuICA8L3N0eWxlPlxuICA8YnV0dG9uPjxzbG90Pjwvc2xvdD48L2J1dHRvbj5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZUFjY29yZGlvbkhlYWRpbmcgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2V4cGFuZGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fb25DbGljayA9IHRoaXMuX29uQ2xpY2suYmluZCh0aGlzKTtcblxuICAgIHRoaXMuYXR0YWNoU2hhZG93KHtcbiAgICAgIG1vZGU6ICdvcGVuJyxcbiAgICAgIGRlbGVnYXRlc0ZvY3VzOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChcbiAgICAgIGFjY29yZGlvbkhlYWRpbmdUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxuICAgICk7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdoZWFkaW5nJyk7XG4gICAgICBcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYCR7QUNDT1JESU9OX0hFQURFUn0tZ2VuZXJhdGVkLSR7aGVhZGluZ0lkQ291bnRlcisrfWA7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ2V4cGFuZGVkJyk7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHZhbHVlKTtcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2V4cGFuZGVkJyk7XG4gIH1cblxuICBzZXQgZXhwYW5kZWQodmFsdWUpIHtcbiAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmICh2YWx1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdleHBhbmRlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZXhwYW5kZWQnKTtcbiAgfVxuXG4gIF9vbkNsaWNrKCkge1xuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHtcbiAgICAgICAgZGV0YWlsOiB7IGlzRXhwYW5kZWROb3c6IHRoaXMuZXhwYW5kZWQgfSxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBhY2NvcmRpb25QYW5lbFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbmFjY29yZGlvblBhbmVsVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3QoOm5vdChbZXhwYW5kZWRdKSkge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmxldCBwYW5lbElkQ291bnRlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDZUFjY29yZGlvblBhbmVsIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChcbiAgICAgIGFjY29yZGlvblBhbmVsVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcbiAgICApO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYCR7QUNDT1JESU9OX1BBTkVMfS1nZW5lcmF0ZWQtJHtwYW5lbElkQ291bnRlcisrfWA7XG4gIH1cblxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdleHBhbmRlZCcpO1xuICB9XG5cbiAgc2V0IGV4cGFuZGVkKHZhbCkge1xuICAgIGNvbnN0IHZhbHVlID0gQm9vbGVhbih2YWwpO1xuICAgIGlmICh2YWx1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdleHBhbmRlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZXhwYW5kZWQnKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25FbmRQcm9taXNlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIGYoKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2UoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNvbHZlKSk7XG59IiwiXG4vLyBjb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL2NlLWNoZWNrYm94LnNjc3MnKTtcblxuY29uc3QgS0VZQ09ERSA9IHtcbiAgU1BBQ0U6IDMyLFxufTtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoJ2Fzc2V0cy9jaGVja2JveC91bmNoZWNrZWQtY2hlY2tib3guc3ZnJykgbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICB9XG4gICAgICA6aG9zdChbaGlkZGVuXSkge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuICAgICAgOmhvc3QoW2NoZWNrZWRdKSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgnYXNzZXRzL2NoZWNrYm94L2NoZWNrZWQtY2hlY2tib3guc3ZnJykgbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICB9XG4gICAgICA6aG9zdChbZGlzYWJsZWRdKSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgnYXNzZXRzL2NoZWNrYm94L3VuY2hlY2tlZC1jaGVja2JveC1kaXNhYmxlZC5zdmcnKSBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgIH1cbiAgICAgIDpob3N0KFtjaGVja2VkXVtkaXNhYmxlZF0pIHtcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKCdhc3NldHMvY2hlY2tib3gvY2hlY2tlZC1jaGVja2JveC1kaXNhYmxlZC5zdmcnKSBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgIH0gICAgICBcbiAgICA8L3N0eWxlPlxuICBgO1xuXG4vLyBISURFXG4vLyBTaGFkeUNTUyB3aWxsIHJlbmFtZSBjbGFzc2VzIGFzIG5lZWRlZCB0byBlbnN1cmUgc3R5bGUgc2NvcGluZy5cbi8vIFNoYWR5Q1NTLnByZXBhcmVUZW1wbGF0ZSh0ZW1wbGF0ZSwgJ2hvd3RvLWNoZWNrYm94Jyk7XG4vLyAvSElERVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZUNoZWNrYm94IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydjaGVja2VkJywgJ2Rpc2FibGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2NoZWNrYm94Jyk7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuXG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdjaGVja2VkJyk7XG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdkaXNhYmxlZCcpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX29uS2V5VXApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIF91cGdyYWRlUHJvcGVydHkocHJvcCkge1xuICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzW3Byb3BdO1xuICAgICAgZGVsZXRlIHRoaXNbcHJvcF07XG4gICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX29uS2V5VXApO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIHNldCBjaGVja2VkKHZhbHVlKSB7XG4gICAgY29uc3QgaXNDaGVja2VkID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKGlzQ2hlY2tlZClcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gIH1cblxuICBnZXQgY2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgfVxuXG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBCb29sZWFuKHZhbHVlKTtcbiAgICBpZiAoaXNEaXNhYmxlZClcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgY29uc3QgaGFzVmFsdWUgPSBuZXdWYWx1ZSAhPT0gbnVsbDtcbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ2NoZWNrZWQnOlxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1jaGVja2VkJywgaGFzVmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBoYXNWYWx1ZSk7XG5cbiAgICAgICAgaWYgKGhhc1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBfb25LZXlVcChldmVudCkge1xuXG4gICAgaWYgKGV2ZW50LmFsdEtleSkgcmV0dXJuO1xuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIEtFWUNPREUuU1BBQ0U6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUNoZWNrZWQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgX29uQ2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLl90b2dnbGVDaGVja2VkKCk7XG4gIH1cblxuICBfdG9nZ2xlQ2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZClcbiAgICAgIHJldHVybjtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBjaGVja2VkOiB0aGlzLmNoZWNrZWQsXG4gICAgICB9LFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICB9KSk7XG4gIH1cbn1cbiIsIlxuXG5leHBvcnQgY2xhc3MgVWlFdmVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5uYW1lID0gJ1Jhamtlc2h3YXInO1xuICAgIHRoaXMuY2l0eSA9ICdIeWRlcmFiYWQnO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF8gPT4ge1xuICAgICAgdGhpcy5pbm5lckhUTUwgPSB0aGlzLl9yZW5kZXIoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdDb25zdHJ1Y3RvciBnZXRzIGNhbGxlZCcpO1xuICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcbiAgfVxuICBcbiAgX3JlbmRlciAoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJwYXJlbnRcIj5cbiAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93TmFtZVwiPlNob3cgTmFtZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIEBjbGljaz1cInNob3dOYW1lXCI+RXZlbnQsIE5hbWU8L2J1dHRvbj5cbiAgICAgICAgPHNwYW4+JHt0aGlzLm5hbWV9PC9zcGFuPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxidXR0b24gQGNsaWNrPVwic2hvd0NpdHlcIj5TaG93IENpdHk8L2J1dHRvbj5cbiAgICAgICAgPGgzPiR7dGhpcy5jaXR5fTwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc2hvd05hbWUgKGV2dCkge1xuICAgIGNvbnNvbGUubG9nKCdzaG93TmFtZTogJywgZXZ0KTtcbiAgICB0aGlzLm5hbWUgPSBldnQudGFyZ2V0O1xuICB9XG5cbiAgc2hvd0NpdHkoZXZ0KSB7XG4gICAgY29uc29sZS5sb2coJ3Nob3dDaXR5OiAnLCBldnQudGFyZ2V0KTtcbiAgICB0aGlzLmNpdHkgPSBldnQudGFyZ2V0O1xuICB9XG5cbiAgX2FkZEV2ZW50TGlzdGVuZXJzICgpIHtcbiAgICBjb25zb2xlLmxvZygnZXZlbnQgbGlzdGVuZXJzIGNhbGxlZCcpO1xuICAgIHRoaXMucXVlcnlTZWxlY3RvckFsbCgnKicpXG4gICAgICAuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIEFycmF5LmZyb20oZWwuYXR0cmlidXRlcylcbiAgICAgICAgICAuZmlsdGVyKGF0dHIgPT4gL15ALy50ZXN0KGF0dHIubmFtZSkpXG4gICAgICAgICAgLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRGbiA9IGV2YWwodGhpc1thdHRyLnZhbHVlXSk7XG4gICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyLm5hbWUucmVwbGFjZSgvXkAvLCAnJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXZlbnROYW1lOiAnLCBldmVudE5hbWUsIHRhcmdldEZuKTtcblxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2dCA9PiB7XG4gICAgICAgICAgICAgIHRhcmdldEZuLmFwcGx5KGVsLCBbZXZ0XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgfVxuXG4gIF9iaW5kRXZlbnRzICgpIHtcbiAgICBjb25zb2xlLmxvZyhhdHRyLm5hbWUsIGF0dHIudmFsdWUpXG4gICAgY29uc3QgZnVuY3Rpb25BbmRQYXJhbXMgPSAvXihbYS16QS1aXSspXFwoKC4qKVxcKS8uZXhlYyhhdHRyLnZhbHVlKTtcbiAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyLm5hbWUucmVwbGFjZSgvXkAvLCAnJyk7XG4gICAgY29uc3QgdGFyZ2V0Rm4gPSBldmFsKHRoaXNbZnVuY3Rpb25BbmRQYXJhbXNbMV1dKTtcbiAgICBjb25zdCBwYXJhbXMgPSBmdW5jdGlvbkFuZFBhcmFtc1syXS5zcGxpdCgvLC8pO1xuXG4gICAgY29uc29sZS5sb2coJ2hlbGxvLi4uLi4nLCBldmVudE5hbWUsIHRhcmdldEZuLCBwYXJhbXMpO1xuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChldnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdSdW5uaW5nIGNoYW5nZSBkZXRlY3Rpb24nKTtcbiAgICAgIGlmKHBhcmFtc1swXSA9PT0gJyRldmVudCcpIHtcbiAgICAgICAgdGFyZ2V0Rm4uYXBwbHkoZWwsIFtldnQsIC4uLnBhcmFtc10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0Rm4uYXBwbHkoZWwsIFsxLCAyXSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdVaVJvdXRlciByb2NrcyBub3cnKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdhdHRhY2hlZENhbGxiYWNrIGNhbGxlZCcpO1xuICB9XG5cbn1cblxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd1aS1ldmVudCcsIFVpRXZlbnQpOyIsIi8qXG4gKiBAQXV0aG9yOiBSYWprZXNod2FyIFByYXNhZChyYWprZXNod2FyLnBkQGdtYWlsLmNvbSkgXG4gKiBARGF0ZTogMjAxOS0wMi0yMyAyMzozMDoxMSBcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiBSYWprZXNod2FyIFByYXNhZFxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxOS0wMy0wMiAxOToyOTo0MlxuICovXG5cbndpbmRvdy5vbmxvYWQgPSBiaW5kTGlua3M7XG5cblxuZnVuY3Rpb24gYmluZExpbmtzKCkge1xuICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tocmVmXScpO1xuICBsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpamFja0xpbmtzKSkgXG59XG5cbmZ1bmN0aW9uIGhpamFja0xpbmtzKGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgcGFnZSA9IGV2dC50YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cbiAgX2xvYWRWaWV3KHBhZ2UpO1xufVxuXG5mdW5jdGlvbiBfbG9hZFZpZXcgKHBhZ2VVcmwpIHtcblxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICB4aHIub25sb2FkID0gZXZ0ID0+IHtcbiAgICBjb25zdCBuZXdEb2MgPSBldnQudGFyZ2V0LnJlc3BvbnNlO1xuICAgIGNvbnN0IHJvdXRlclNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1aS1yb3V0ZXInKTtcblxuICAgIHJvdXRlclNsb3QuaW5uZXJIVE1MID0gbmV3RG9jO1xuICAgIFxuICB9O1xuICB4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuICB4aHIub3BlbignR0VUJywgYGFwcC8ke3BhZ2VVcmx9L2RlbW8uaHRtbGApO1xuICB4aHIuc2VuZCgpO1xufSIsImNvbnN0IEtFWUNPREUgPSB7XG4gIERPV046IDQwLFxuICBMRUZUOiAzNyxcbiAgUklHSFQ6IDM5LFxuICBTUEFDRTogMzIsXG4gIFVQOiAzOCxcbiAgSE9NRTogMzYsXG4gIEVORDogMzUsXG59O1xuXG5jb25zdCByYWRpb0J1dHRvblRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnJhZGlvQnV0dG9uVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIH1cbiAgXG4gICAgOmhvc3QoOmZvY3VzKSB7XG4gICAgICBvdXRsaW5lOiAwO1xuICAgIH1cbiAgXG4gICAgOmhvc3QoOmZvY3VzKTo6YmVmb3JlIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAxcHggMnB4ICM1QjlERDk7XG4gICAgfVxuICBcbiAgICA6aG9zdDo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB3aWR0aDogMTBweDtcbiAgICAgIGhlaWdodDogMTBweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogLTE4cHg7XG4gICAgICB0b3A6IDNweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICB9XG4gIFxuICAgIDpob3N0KFthcmlhLWNoZWNrZWQ9XCJ0cnVlXCJdKTo6YmVmb3JlIHtcbiAgICAgIGJhY2tncm91bmQ6IHJlZDtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZVJhZGlvQnV0dG9uIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQocmFkaW9CdXR0b25UZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3JhZGlvJyk7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgfVxufVxuXG5jb25zdCByYWRpb0dyb3VwVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xucmFkaW9Hcm91cFRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdD48L3Nsb3Q+XG5gO1xuXG5leHBvcnQgY2xhc3MgQ2VSYWRpb0dyb3VwIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQocmFkaW9Hcm91cFRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncmFkaW9ncm91cCcpO1xuXG4gICAgbGV0IGZpcnN0Q2hlY2tlZEJ1dHRvbiA9IHRoaXMuY2hlY2tlZFJhZGlvQnV0dG9uO1xuICAgIGlmIChmaXJzdENoZWNrZWRCdXR0b24pIHtcbiAgICAgIHRoaXMuX3VuY2hlY2tBbGwoKTtcbiAgICAgIHRoaXMuX2NoZWNrTm9kZShmaXJzdENoZWNrZWRCdXR0b24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoYXNSb2xlUmFkaW8gPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwicmFkaW9cIl0nKTtcbiAgICAgIGlmKGhhc1JvbGVSYWRpbykgXG4gICAgICAgIGhhc1JvbGVSYWRpby5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIF9vbktleURvd24oZSkge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIEtFWUNPREUuVVA6XG4gICAgICBjYXNlIEtFWUNPREUuTEVGVDpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9zZXRDaGVja2VkVG9QcmV2QnV0dG9uKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuRE9XTjpcbiAgICAgIGNhc2UgS0VZQ09ERS5SSUdIVDpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9zZXRDaGVja2VkVG9OZXh0QnV0dG9uKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuSE9NRTpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9zZXRDaGVja2VkKHRoaXMuZmlyc3RSYWRpb0J1dHRvbik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuRU5EOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3NldENoZWNrZWQodGhpcy5sYXN0UmFkaW9CdXR0b24pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLlNQQUNFOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdob3d0by1yYWRpby1idXR0b24nKVxuICAgICAgICAgIHRoaXMuX3NldENoZWNrZWQoZS50YXJnZXQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNoZWNrZWRSYWRpb0J1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jaGVja2VkPVwidHJ1ZVwiXScpO1xuICB9XG5cbiAgZ2V0IGZpcnN0UmFkaW9CdXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW3JvbGU9XCJyYWRpb1wiXTpmaXJzdC1vZi10eXBlJyk7XG4gIH1cblxuICBnZXQgbGFzdFJhZGlvQnV0dG9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwicmFkaW9cIl06bGFzdC1vZi10eXBlJyk7XG4gIH1cblxuICBfcHJldlJhZGlvQnV0dG9uKG5vZGUpIHtcbiAgICBsZXQgcHJldiA9IG5vZGUucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICB3aGlsZSAocHJldikge1xuICAgICAgaWYgKHByZXYuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICdyYWRpbycpIHtcbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICB9XG4gICAgICBwcmV2ID0gcHJldi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIF9uZXh0UmFkaW9CdXR0b24obm9kZSkge1xuICAgIGxldCBuZXh0ID0gbm9kZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgd2hpbGUgKG5leHQpIHtcbiAgICAgIGlmIChuZXh0LmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAncmFkaW8nKSB7XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfVxuICAgICAgbmV4dCA9IG5leHQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIF9zZXRDaGVja2VkVG9QcmV2QnV0dG9uKCkge1xuICAgIGxldCBjaGVja2VkQnV0dG9uID0gdGhpcy5jaGVja2VkUmFkaW9CdXR0b24gfHwgdGhpcy5maXJzdFJhZGlvQnV0dG9uO1xuICAgIGlmIChjaGVja2VkQnV0dG9uID09PSB0aGlzLmZpcnN0UmFkaW9CdXR0b24pIHtcbiAgICAgIHRoaXMuX3NldENoZWNrZWQodGhpcy5sYXN0UmFkaW9CdXR0b24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRDaGVja2VkKHRoaXMuX3ByZXZSYWRpb0J1dHRvbihjaGVja2VkQnV0dG9uKSk7XG4gICAgfVxuICB9XG5cbiAgX3NldENoZWNrZWRUb05leHRCdXR0b24oKSB7XG4gICAgbGV0IGNoZWNrZWRCdXR0b24gPSB0aGlzLmNoZWNrZWRSYWRpb0J1dHRvbiB8fCB0aGlzLmZpcnN0UmFkaW9CdXR0b247XG4gICAgaWYgKGNoZWNrZWRCdXR0b24gPT09IHRoaXMubGFzdFJhZGlvQnV0dG9uKSB7XG4gICAgICB0aGlzLl9zZXRDaGVja2VkKHRoaXMuZmlyc3RSYWRpb0J1dHRvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldENoZWNrZWQodGhpcy5fbmV4dFJhZGlvQnV0dG9uKGNoZWNrZWRCdXR0b24pKTtcbiAgICB9XG4gIH1cblxuICBfc2V0Q2hlY2tlZChub2RlKSB7XG4gICAgdGhpcy5fdW5jaGVja0FsbCgpO1xuICAgIHRoaXMuX2NoZWNrTm9kZShub2RlKTtcbiAgICB0aGlzLl9mb2N1c05vZGUobm9kZSk7XG4gIH1cblxuICBfdW5jaGVja0FsbCgpIHtcbiAgICBjb25zdCByYWRpb0J1dHRvbnMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwicmFkaW9cIl0nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ0biA9IHJhZGlvQnV0dG9uc1tpXTtcbiAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY2hlY2tlZCcsICdmYWxzZScpO1xuICAgICAgYnRuLnRhYkluZGV4ID0gLTE7XG4gICAgfVxuICB9XG5cbiAgX2NoZWNrTm9kZShub2RlKSB7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtY2hlY2tlZCcsICd0cnVlJyk7XG4gICAgbm9kZS50YWJJbmRleCA9IDA7XG4gIH1cblxuICBfZm9jdXNOb2RlKG5vZGUpIHtcbiAgICBub2RlLmZvY3VzKCk7XG4gIH1cblxuICBfb25DbGljayhlKSB7XG4gICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAncmFkaW8nKSB7XG4gICAgICB0aGlzLl9zZXRDaGVja2VkKGUudGFyZ2V0KTtcbiAgICB9XG4gIH1cbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9zdHlsZXMuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vc3R5bGVzLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9zdHlsZXMuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIlxuY29uc3QgS0VZQ09ERSA9IHtcbiAgRE9XTjogNDAsXG4gIExFRlQ6IDM3LFxuICBSSUdIVDogMzksXG4gIFVQOiAzOCxcbiAgSE9NRTogMzYsXG4gIEVORDogMzUsXG59O1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cbiAgICA6OnNsb3R0ZWQoY2UtdGFiLXBhbmVsKSB7XG4gICAgICBmbGV4LWJhc2lzOiAxMDAlO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3QgbmFtZT1cInRhYlwiPjwvc2xvdD5cbiAgPHNsb3QgbmFtZT1cInBhbmVsXCI+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlVGFicyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX29uU2xvdENoYW5nZSA9IHRoaXMuX29uU2xvdENoYW5nZS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICB0aGlzLl90YWJTbG90ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3RbbmFtZT10YWJdJyk7XG4gICAgdGhpcy5fcGFuZWxTbG90ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3Nsb3RbbmFtZT1wYW5lbF0nKTtcblxuICAgIHRoaXMuX3RhYlNsb3QuYWRkRXZlbnRMaXN0ZW5lcignc2xvdGNoYW5nZScsIHRoaXMuX29uU2xvdENoYW5nZSk7XG4gICAgdGhpcy5fcGFuZWxTbG90LmFkZEV2ZW50TGlzdGVuZXIoJ3Nsb3RjaGFuZ2UnLCB0aGlzLl9vblNsb3RDaGFuZ2UpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIGN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKCdjZS10YWInKSxcbiAgICAgIGN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKCdjZS10YWItcGFuZWwnKSxcbiAgICBdKVxuICAgIC50aGVuKF8gPT4gdGhpcy5fbGlua1BhbmVscygpKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgX29uU2xvdENoYW5nZSgpIHtcbiAgICB0aGlzLl9saW5rUGFuZWxzKCk7XG4gIH1cblxuICBfbGlua1BhbmVscygpIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy5fYWxsVGFicygpO1xuICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgY29uc3QgcGFuZWwgPSB0YWIubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgaWYgKHBhbmVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2NlLXRhYi1wYW5lbCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgVGFiICMke3RhYi5pZH0gaXMgbm90IGEgc2libGluZyBvZiBhIDxjZS10YWItcGFuZWw+YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHBhbmVsLmlkKTtcbiAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgdGFiLmlkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbGVjdGVkVGFiID0gdGFicy5maW5kKHRhYiA9PiB0YWIuc2VsZWN0ZWQpIHx8IHRhYnNbMF07XG5cbiAgICB0aGlzLl9zZWxlY3RUYWIoc2VsZWN0ZWRUYWIpO1xuICB9XG5cbiAgX2FsbFBhbmVscygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NlLXRhYi1wYW5lbCcpKTtcbiAgfVxuXG4gIF9hbGxUYWJzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbCgnY2UtdGFiJykpO1xuICB9XG5cbiAgX3BhbmVsRm9yVGFiKHRhYikge1xuICAgIGNvbnN0IHBhbmVsSWQgPSB0YWIuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcihgIyR7cGFuZWxJZH1gKTtcbiAgfVxuXG4gIF9wcmV2VGFiKCkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLl9hbGxUYWJzKCk7XG4gICAgbGV0IG5ld0lkeCA9IHRhYnMuZmluZEluZGV4KHRhYiA9PiB0YWIuc2VsZWN0ZWQpIC0gMTtcbiAgICByZXR1cm4gdGFic1sobmV3SWR4ICsgdGFicy5sZW5ndGgpICUgdGFicy5sZW5ndGhdO1xuICB9XG5cbiAgX2ZpcnN0VGFiKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGxUYWJzKClbMF07XG4gIH1cblxuICBfbGFzdFRhYigpIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy5fYWxsVGFicygpO1xuICAgIHJldHVybiB0YWJzW3RhYnMubGVuZ3RoIC0gMV07XG4gIH1cblxuICBfbmV4dFRhYigpIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy5fYWxsVGFicygpO1xuICAgIGxldCBuZXdJZHggPSB0YWJzLmZpbmRJbmRleCh0YWIgPT4gdGFiLnNlbGVjdGVkKSArIDE7XG4gICAgcmV0dXJuIHRhYnNbbmV3SWR4ICUgdGFicy5sZW5ndGhdO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuX2FsbFRhYnMoKTtcbiAgICBjb25zdCBwYW5lbHMgPSB0aGlzLl9hbGxQYW5lbHMoKTtcblxuICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLnNlbGVjdGVkID0gZmFsc2UpO1xuICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHBhbmVsLmhpZGRlbiA9IHRydWUpO1xuICB9XG5cbiAgX3NlbGVjdFRhYihuZXdUYWIpIHtcblxuICAgIHRoaXMucmVzZXQoKTtcblxuICAgIGNvbnN0IG5ld1BhbmVsID0gdGhpcy5fcGFuZWxGb3JUYWIobmV3VGFiKTtcblxuICAgIGlmICghbmV3UGFuZWwpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHBhbmVsIHdpdGggaWQgJHtuZXdQYW5lbElkfWApO1xuICAgIG5ld1RhYi5zZWxlY3RlZCA9IHRydWU7XG4gICAgbmV3UGFuZWwuaGlkZGVuID0gZmFsc2U7XG4gICAgbmV3VGFiLmZvY3VzKCk7XG4gIH1cblxuICBfb25LZXlEb3duKGV2ZW50KSB7XG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgncm9sZScpICE9PSAndGFiJykgcmV0dXJuO1xuICAgIGlmIChldmVudC5hbHRLZXkpIHJldHVybjtcblxuICAgIGxldCBuZXdUYWI7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIEtFWUNPREUuTEVGVDpcbiAgICAgIGNhc2UgS0VZQ09ERS5VUDpcbiAgICAgICAgbmV3VGFiID0gdGhpcy5fcHJldlRhYigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLlJJR0hUOlxuICAgICAgY2FzZSBLRVlDT0RFLkRPV046XG4gICAgICAgIG5ld1RhYiA9IHRoaXMuX25leHRUYWIoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5IT01FOlxuICAgICAgICBuZXdUYWIgPSB0aGlzLl9maXJzdFRhYigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkVORDpcbiAgICAgICAgbmV3VGFiID0gdGhpcy5fbGFzdFRhYigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLl9zZWxlY3RUYWIobmV3VGFiKTtcbiAgfVxuXG4gIF9vbkNsaWNrKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSAhPT0gJ3RhYicpIHJldHVybjtcbiAgICB0aGlzLl9zZWxlY3RUYWIoZXZlbnQudGFyZ2V0KTtcbiAgfVxufVxuXG5sZXQgY2VUYWJDb3VudGVyID0gMDtcblxuZXhwb3J0IGNsYXNzIENlVGFiIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydzZWxlY3RlZCddO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYicpO1xuICAgIGlmICghdGhpcy5pZClcbiAgICAgIHRoaXMuaWQgPSBgY2UtdGFiLWdlbmVyYXRlZC0ke2NlVGFiQ291bnRlcisrfWA7XG5cbiAgICAvLyBTZXQgYSB3ZWxsLWRlZmluZWQgaW5pdGlhbCBzdGF0ZS5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICB0aGlzLl91cGdyYWRlUHJvcGVydHkoJ3NlbGVjdGVkJyk7XG4gIH1cblxuICBfdXBncmFkZVByb3BlcnR5KHByb3ApIHtcbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgbGV0IHZhbHVlID0gdGhpc1twcm9wXTtcbiAgICAgIGRlbGV0ZSB0aGlzW3Byb3BdO1xuICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdmFsdWUpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIHZhbHVlID8gMCA6IC0xKTtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZCh2YWx1ZSkge1xuICAgIHZhbHVlID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKHZhbHVlKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgfVxufVxuXG5sZXQgY2VQYW5lbENvdW50ZXIgPSAwO1xuXG5leHBvcnQgY2xhc3MgQ2VUYWJQYW5lbCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XG4gICAgaWYgKCF0aGlzLmlkKVxuICAgICAgdGhpcy5pZCA9IGBjZS1wYW5lbC1nZW5lcmF0ZWQtJHtjZVBhbmVsQ291bnRlcisrfWA7XG4gIH1cbn0iLCJcbmNvbnN0IEtFWUNPREUgPSB7XG4gIFNQQUNFOiAzMixcbiAgRU5URVI6IDEzLFxufTtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cbiAgICA6aG9zdChbaGlkZGVuXSkge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZVRvZ2dsZUJ1dHRvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsncHJlc3NlZCcsICdkaXNhYmxlZCddO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdhcmlhLXByZXNzZWQnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCAnZmFsc2UnKTtcblxuICAgIHRoaXMuX3VwZ3JhZGVQcm9wZXJ0eSgncHJlc3NlZCcpO1xuICAgIHRoaXMuX3VwZ3JhZGVQcm9wZXJ0eSgnZGlzYWJsZWQnKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgX3VwZ3JhZGVQcm9wZXJ0eShwcm9wKSB7XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXNbcHJvcF07XG4gICAgICBkZWxldGUgdGhpc1twcm9wXTtcbiAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIHNldCBwcmVzc2VkKHZhbHVlKSB7XG4gICAgY29uc3QgaXNQcmVzc2VkID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKGlzUHJlc3NlZClcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwcmVzc2VkJywgJycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdwcmVzc2VkJyk7XG4gIH1cblxuICBnZXQgcHJlc3NlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3ByZXNzZWQnKTtcbiAgfVxuXG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBCb29sZWFuKHZhbHVlKTtcbiAgICBpZiAoaXNEaXNhYmxlZClcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgY29uc3QgaGFzVmFsdWUgPSBuZXdWYWx1ZSAhPT0gbnVsbDtcbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ3ByZXNzZWQnOlxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgaGFzVmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBoYXNWYWx1ZSk7XG4gICAgICAgIGlmIChoYXNWYWx1ZSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgX29uS2V5RG93bihldmVudCkge1xuXG4gICAgaWYgKGV2ZW50LmFsdEtleSkgcmV0dXJuO1xuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIEtFWUNPREUuU1BBQ0U6XG4gICAgICBjYXNlIEtFWUNPREUuRU5URVI6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZVByZXNzZWQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBfb25DbGljayhldmVudCkge1xuICAgIHRoaXMuX3RvZ2dsZVByZXNzZWQoKTtcbiAgfVxuXG4gIF90b2dnbGVQcmVzc2VkKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgdGhpcy5wcmVzc2VkID0gIXRoaXMucHJlc3NlZDtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjaGFuZ2UnLCB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgcHJlc3NlZDogdGhpcy5wcmVzc2VkLFxuICAgICAgfSxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgfSkpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQ2VUb29sdGlwIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fc2hvdyA9IHRoaXMuX3Nob3cuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oaWRlID0gdGhpcy5faGlkZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndG9vbHRpcCcpO1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcblxuICAgIHRoaXMuX2hpZGUoKTtcblxuICAgIHRoaXMuX3RhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWRlc2NyaWJlZGJ5PScgKyB0aGlzLmlkICsgJ10nKTtcblxuICAgIGlmICghdGhpcy5fdGFyZ2V0KSByZXR1cm47XG5cbiAgICB0aGlzLl90YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9zaG93KTtcbiAgICB0aGlzLl90YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX2hpZGUpO1xuICAgIHRoaXMuX3RhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fc2hvdyk7XG4gICAgdGhpcy5fdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9oaWRlKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgaWYgKCF0aGlzLl90YXJnZXQpIHJldHVybjtcblxuICAgIHRoaXMuX3RhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3Nob3cpO1xuICAgIHRoaXMuX3RhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5faGlkZSk7XG4gICAgdGhpcy5fdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9zaG93KTtcbiAgICB0aGlzLl90YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX2hpZGUpO1xuICAgIHRoaXMuX3RhcmdldCA9IG51bGw7XG4gIH1cblxuICBfc2hvdygpIHtcbiAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICB9XG5cbiAgX2hpZGUoKSB7XG4gICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICB9XG59XG4iLCIvKlxuICogQEF1dGhvcjogUmFqa2VzaHdhciBQcmFzYWQocmFqa2VzaHdhci5wZEBnbWFpbC5jb20pIFxuICogQERhdGU6IDIwMTktMDItMjMgMjM6MDA6NDIgXG4gKiBATGFzdCBNb2RpZmllZCBieTogUmFqa2VzaHdhciBQcmFzYWRcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTktMDItMjQgMDA6Mzc6NDZcbiAqL1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT48L3N0eWxlPlxuICA8c2xvdD48L3Nsb3Q+XG5gO1xuXG5leHBvcnQgY2xhc3MgVWlSb3V0ZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAvLyBjb25zb2xlLmxvZygnQ29uc3RydWN0b3IgZ2V0cyBjYWxsZWQnKTtcbiAgfVxuICBcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ1VpUm91dGVyIHJvY2tzIG5vdycpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2F0dGFjaGVkQ2FsbGJhY2sgY2FsbGVkJyk7XG4gIH1cblxufVxuXG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3h1aS1yb3V0ZXInLCBVaVJvdXRlcik7IiwiLypcbiAqIEBBdXRob3I6IFJhamtlc2h3YXIgUHJhc2FkKHJhamtlc2h3YXIucGRAZ21haWwuY29tKSBcbiAqIEBEYXRlOiAyMDE5LTAyLTIzIDIyOjI0OjMyIFxuICogQExhc3QgTW9kaWZpZWQgYnk6IFJhamtlc2h3YXIgUHJhc2FkXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE5LTAzLTAyIDE5OjM3OjM5XG4gKi9cblxucmVxdWlyZSgnLi9hcHAvc3R5bGVzLnNjc3MnKTtcblxuaW1wb3J0IENlQ2hlY2tib3ggZnJvbSAnLi9hcHAvY2hlY2tib3gvY2UtY2hlY2tib3gnO1xuaW1wb3J0IHsgXG4gIENlQWNjb3JkaW9uLCBDZUFjY29yZGlvbkhlYWRpbmcsIENlQWNjb3JkaW9uUGFuZWwgXG59IGZyb20gJy4vYXBwL2FjY29yZGlvbi9jZS1hY2NvcmRpb24nO1xuXG5pbXBvcnQgeyBDZVRhYiwgQ2VUYWJzLCBDZVRhYlBhbmVsIH0gZnJvbSAnLi9hcHAvdGFicy9jZS10YWInO1xuaW1wb3J0IHsgQ2VUb2dnbGVCdXR0b24gfSBmcm9tICcuL2FwcC90b2dnbGUvY2UtdG9nZ2xlJztcbmltcG9ydCB7IENlVG9vbHRpcCB9IGZyb20gJy4vYXBwL3Rvb2x0aXAvY2UtdG9vbHRpcCc7XG5pbXBvcnQgeyBDZVJhZGlvQnV0dG9uLCBDZVJhZGlvR3JvdXAgfSBmcm9tICcuL2FwcC9yYWRpb2dyb3VwL2NlLXJhZGlvZ3JvdXAnO1xuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1jaGVja2JveCcsIENlQ2hlY2tib3gpOyBcblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtYWNjb3JkaW9uJywgQ2VBY2NvcmRpb24pO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtYWNjb3JkaW9uLWhlYWRpbmcnLCBDZUFjY29yZGlvbkhlYWRpbmcpO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtYWNjb3JkaW9uLXBhbmVsJywgQ2VBY2NvcmRpb25QYW5lbCk7XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRhYicsIENlVGFiKTtcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRhYnMnLCBDZVRhYnMpO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtdGFiLXBhbmVsJywgQ2VUYWJQYW5lbCk7IFxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS10b2dnbGUtYnV0dG9uJywgQ2VUb2dnbGVCdXR0b24pO1xuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS10b29sdGlwJywgQ2VUb29sdGlwKTtcblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtcmFkaW8tYnV0dG9uJywgQ2VSYWRpb0J1dHRvbik7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1yYWRpby1ncm91cCcsIENlUmFkaW9Hcm91cCk7XG5cblxucmVxdWlyZSgnLi9hcHAvdWktcm91dGVyJyk7XG5yZXF1aXJlKCcuL2FwcC9saW5rcycpO1xucmVxdWlyZSgnLi9hcHAvZXZlbnQvZXZlbnQnKTtcblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=