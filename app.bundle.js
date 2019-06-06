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
/******/ 	var hotCurrentHash = "1d90b79c5918a40257cb";
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/font-awesome/css/font-awesome.min.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/font-awesome/css/font-awesome.min.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../fonts/fontawesome-webfont.eot?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0"));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! ../fonts/fontawesome-webfont.eot */ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot") + "?#iefix&v=4.7.0");
var ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(/*! ../fonts/fontawesome-webfont.woff2?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0"));
var ___CSS_LOADER_URL___3___ = urlEscape(__webpack_require__(/*! ../fonts/fontawesome-webfont.woff?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0"));
var ___CSS_LOADER_URL___4___ = urlEscape(__webpack_require__(/*! ../fonts/fontawesome-webfont.ttf?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0"));
var ___CSS_LOADER_URL___5___ = urlEscape(__webpack_require__(/*! ../fonts/fontawesome-webfont.svg?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0") + "#fontawesomeregular");

// Module
exports.push([module.i, "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */@font-face{font-family:'FontAwesome';src:url(" + ___CSS_LOADER_URL___0___ + ");src:url(" + ___CSS_LOADER_URL___1___ + ") format('embedded-opentype'),url(" + ___CSS_LOADER_URL___2___ + ") format('woff2'),url(" + ___CSS_LOADER_URL___3___ + ") format('woff'),url(" + ___CSS_LOADER_URL___4___ + ") format('truetype'),url(" + ___CSS_LOADER_URL___5___ + ") format('svg');font-weight:normal;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";-webkit-transform:scale(-1, 1);-ms-transform:scale(-1, 1);transform:scale(-1, 1)}.fa-flip-vertical{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";-webkit-transform:scale(1, -1);-ms-transform:scale(1, -1);transform:scale(1, -1)}:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-flip-horizontal,:root .fa-flip-vertical{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:\"\\f000\"}.fa-music:before{content:\"\\f001\"}.fa-search:before{content:\"\\f002\"}.fa-envelope-o:before{content:\"\\f003\"}.fa-heart:before{content:\"\\f004\"}.fa-star:before{content:\"\\f005\"}.fa-star-o:before{content:\"\\f006\"}.fa-user:before{content:\"\\f007\"}.fa-film:before{content:\"\\f008\"}.fa-th-large:before{content:\"\\f009\"}.fa-th:before{content:\"\\f00a\"}.fa-th-list:before{content:\"\\f00b\"}.fa-check:before{content:\"\\f00c\"}.fa-remove:before,.fa-close:before,.fa-times:before{content:\"\\f00d\"}.fa-search-plus:before{content:\"\\f00e\"}.fa-search-minus:before{content:\"\\f010\"}.fa-power-off:before{content:\"\\f011\"}.fa-signal:before{content:\"\\f012\"}.fa-gear:before,.fa-cog:before{content:\"\\f013\"}.fa-trash-o:before{content:\"\\f014\"}.fa-home:before{content:\"\\f015\"}.fa-file-o:before{content:\"\\f016\"}.fa-clock-o:before{content:\"\\f017\"}.fa-road:before{content:\"\\f018\"}.fa-download:before{content:\"\\f019\"}.fa-arrow-circle-o-down:before{content:\"\\f01a\"}.fa-arrow-circle-o-up:before{content:\"\\f01b\"}.fa-inbox:before{content:\"\\f01c\"}.fa-play-circle-o:before{content:\"\\f01d\"}.fa-rotate-right:before,.fa-repeat:before{content:\"\\f01e\"}.fa-refresh:before{content:\"\\f021\"}.fa-list-alt:before{content:\"\\f022\"}.fa-lock:before{content:\"\\f023\"}.fa-flag:before{content:\"\\f024\"}.fa-headphones:before{content:\"\\f025\"}.fa-volume-off:before{content:\"\\f026\"}.fa-volume-down:before{content:\"\\f027\"}.fa-volume-up:before{content:\"\\f028\"}.fa-qrcode:before{content:\"\\f029\"}.fa-barcode:before{content:\"\\f02a\"}.fa-tag:before{content:\"\\f02b\"}.fa-tags:before{content:\"\\f02c\"}.fa-book:before{content:\"\\f02d\"}.fa-bookmark:before{content:\"\\f02e\"}.fa-print:before{content:\"\\f02f\"}.fa-camera:before{content:\"\\f030\"}.fa-font:before{content:\"\\f031\"}.fa-bold:before{content:\"\\f032\"}.fa-italic:before{content:\"\\f033\"}.fa-text-height:before{content:\"\\f034\"}.fa-text-width:before{content:\"\\f035\"}.fa-align-left:before{content:\"\\f036\"}.fa-align-center:before{content:\"\\f037\"}.fa-align-right:before{content:\"\\f038\"}.fa-align-justify:before{content:\"\\f039\"}.fa-list:before{content:\"\\f03a\"}.fa-dedent:before,.fa-outdent:before{content:\"\\f03b\"}.fa-indent:before{content:\"\\f03c\"}.fa-video-camera:before{content:\"\\f03d\"}.fa-photo:before,.fa-image:before,.fa-picture-o:before{content:\"\\f03e\"}.fa-pencil:before{content:\"\\f040\"}.fa-map-marker:before{content:\"\\f041\"}.fa-adjust:before{content:\"\\f042\"}.fa-tint:before{content:\"\\f043\"}.fa-edit:before,.fa-pencil-square-o:before{content:\"\\f044\"}.fa-share-square-o:before{content:\"\\f045\"}.fa-check-square-o:before{content:\"\\f046\"}.fa-arrows:before{content:\"\\f047\"}.fa-step-backward:before{content:\"\\f048\"}.fa-fast-backward:before{content:\"\\f049\"}.fa-backward:before{content:\"\\f04a\"}.fa-play:before{content:\"\\f04b\"}.fa-pause:before{content:\"\\f04c\"}.fa-stop:before{content:\"\\f04d\"}.fa-forward:before{content:\"\\f04e\"}.fa-fast-forward:before{content:\"\\f050\"}.fa-step-forward:before{content:\"\\f051\"}.fa-eject:before{content:\"\\f052\"}.fa-chevron-left:before{content:\"\\f053\"}.fa-chevron-right:before{content:\"\\f054\"}.fa-plus-circle:before{content:\"\\f055\"}.fa-minus-circle:before{content:\"\\f056\"}.fa-times-circle:before{content:\"\\f057\"}.fa-check-circle:before{content:\"\\f058\"}.fa-question-circle:before{content:\"\\f059\"}.fa-info-circle:before{content:\"\\f05a\"}.fa-crosshairs:before{content:\"\\f05b\"}.fa-times-circle-o:before{content:\"\\f05c\"}.fa-check-circle-o:before{content:\"\\f05d\"}.fa-ban:before{content:\"\\f05e\"}.fa-arrow-left:before{content:\"\\f060\"}.fa-arrow-right:before{content:\"\\f061\"}.fa-arrow-up:before{content:\"\\f062\"}.fa-arrow-down:before{content:\"\\f063\"}.fa-mail-forward:before,.fa-share:before{content:\"\\f064\"}.fa-expand:before{content:\"\\f065\"}.fa-compress:before{content:\"\\f066\"}.fa-plus:before{content:\"\\f067\"}.fa-minus:before{content:\"\\f068\"}.fa-asterisk:before{content:\"\\f069\"}.fa-exclamation-circle:before{content:\"\\f06a\"}.fa-gift:before{content:\"\\f06b\"}.fa-leaf:before{content:\"\\f06c\"}.fa-fire:before{content:\"\\f06d\"}.fa-eye:before{content:\"\\f06e\"}.fa-eye-slash:before{content:\"\\f070\"}.fa-warning:before,.fa-exclamation-triangle:before{content:\"\\f071\"}.fa-plane:before{content:\"\\f072\"}.fa-calendar:before{content:\"\\f073\"}.fa-random:before{content:\"\\f074\"}.fa-comment:before{content:\"\\f075\"}.fa-magnet:before{content:\"\\f076\"}.fa-chevron-up:before{content:\"\\f077\"}.fa-chevron-down:before{content:\"\\f078\"}.fa-retweet:before{content:\"\\f079\"}.fa-shopping-cart:before{content:\"\\f07a\"}.fa-folder:before{content:\"\\f07b\"}.fa-folder-open:before{content:\"\\f07c\"}.fa-arrows-v:before{content:\"\\f07d\"}.fa-arrows-h:before{content:\"\\f07e\"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:\"\\f080\"}.fa-twitter-square:before{content:\"\\f081\"}.fa-facebook-square:before{content:\"\\f082\"}.fa-camera-retro:before{content:\"\\f083\"}.fa-key:before{content:\"\\f084\"}.fa-gears:before,.fa-cogs:before{content:\"\\f085\"}.fa-comments:before{content:\"\\f086\"}.fa-thumbs-o-up:before{content:\"\\f087\"}.fa-thumbs-o-down:before{content:\"\\f088\"}.fa-star-half:before{content:\"\\f089\"}.fa-heart-o:before{content:\"\\f08a\"}.fa-sign-out:before{content:\"\\f08b\"}.fa-linkedin-square:before{content:\"\\f08c\"}.fa-thumb-tack:before{content:\"\\f08d\"}.fa-external-link:before{content:\"\\f08e\"}.fa-sign-in:before{content:\"\\f090\"}.fa-trophy:before{content:\"\\f091\"}.fa-github-square:before{content:\"\\f092\"}.fa-upload:before{content:\"\\f093\"}.fa-lemon-o:before{content:\"\\f094\"}.fa-phone:before{content:\"\\f095\"}.fa-square-o:before{content:\"\\f096\"}.fa-bookmark-o:before{content:\"\\f097\"}.fa-phone-square:before{content:\"\\f098\"}.fa-twitter:before{content:\"\\f099\"}.fa-facebook-f:before,.fa-facebook:before{content:\"\\f09a\"}.fa-github:before{content:\"\\f09b\"}.fa-unlock:before{content:\"\\f09c\"}.fa-credit-card:before{content:\"\\f09d\"}.fa-feed:before,.fa-rss:before{content:\"\\f09e\"}.fa-hdd-o:before{content:\"\\f0a0\"}.fa-bullhorn:before{content:\"\\f0a1\"}.fa-bell:before{content:\"\\f0f3\"}.fa-certificate:before{content:\"\\f0a3\"}.fa-hand-o-right:before{content:\"\\f0a4\"}.fa-hand-o-left:before{content:\"\\f0a5\"}.fa-hand-o-up:before{content:\"\\f0a6\"}.fa-hand-o-down:before{content:\"\\f0a7\"}.fa-arrow-circle-left:before{content:\"\\f0a8\"}.fa-arrow-circle-right:before{content:\"\\f0a9\"}.fa-arrow-circle-up:before{content:\"\\f0aa\"}.fa-arrow-circle-down:before{content:\"\\f0ab\"}.fa-globe:before{content:\"\\f0ac\"}.fa-wrench:before{content:\"\\f0ad\"}.fa-tasks:before{content:\"\\f0ae\"}.fa-filter:before{content:\"\\f0b0\"}.fa-briefcase:before{content:\"\\f0b1\"}.fa-arrows-alt:before{content:\"\\f0b2\"}.fa-group:before,.fa-users:before{content:\"\\f0c0\"}.fa-chain:before,.fa-link:before{content:\"\\f0c1\"}.fa-cloud:before{content:\"\\f0c2\"}.fa-flask:before{content:\"\\f0c3\"}.fa-cut:before,.fa-scissors:before{content:\"\\f0c4\"}.fa-copy:before,.fa-files-o:before{content:\"\\f0c5\"}.fa-paperclip:before{content:\"\\f0c6\"}.fa-save:before,.fa-floppy-o:before{content:\"\\f0c7\"}.fa-square:before{content:\"\\f0c8\"}.fa-navicon:before,.fa-reorder:before,.fa-bars:before{content:\"\\f0c9\"}.fa-list-ul:before{content:\"\\f0ca\"}.fa-list-ol:before{content:\"\\f0cb\"}.fa-strikethrough:before{content:\"\\f0cc\"}.fa-underline:before{content:\"\\f0cd\"}.fa-table:before{content:\"\\f0ce\"}.fa-magic:before{content:\"\\f0d0\"}.fa-truck:before{content:\"\\f0d1\"}.fa-pinterest:before{content:\"\\f0d2\"}.fa-pinterest-square:before{content:\"\\f0d3\"}.fa-google-plus-square:before{content:\"\\f0d4\"}.fa-google-plus:before{content:\"\\f0d5\"}.fa-money:before{content:\"\\f0d6\"}.fa-caret-down:before{content:\"\\f0d7\"}.fa-caret-up:before{content:\"\\f0d8\"}.fa-caret-left:before{content:\"\\f0d9\"}.fa-caret-right:before{content:\"\\f0da\"}.fa-columns:before{content:\"\\f0db\"}.fa-unsorted:before,.fa-sort:before{content:\"\\f0dc\"}.fa-sort-down:before,.fa-sort-desc:before{content:\"\\f0dd\"}.fa-sort-up:before,.fa-sort-asc:before{content:\"\\f0de\"}.fa-envelope:before{content:\"\\f0e0\"}.fa-linkedin:before{content:\"\\f0e1\"}.fa-rotate-left:before,.fa-undo:before{content:\"\\f0e2\"}.fa-legal:before,.fa-gavel:before{content:\"\\f0e3\"}.fa-dashboard:before,.fa-tachometer:before{content:\"\\f0e4\"}.fa-comment-o:before{content:\"\\f0e5\"}.fa-comments-o:before{content:\"\\f0e6\"}.fa-flash:before,.fa-bolt:before{content:\"\\f0e7\"}.fa-sitemap:before{content:\"\\f0e8\"}.fa-umbrella:before{content:\"\\f0e9\"}.fa-paste:before,.fa-clipboard:before{content:\"\\f0ea\"}.fa-lightbulb-o:before{content:\"\\f0eb\"}.fa-exchange:before{content:\"\\f0ec\"}.fa-cloud-download:before{content:\"\\f0ed\"}.fa-cloud-upload:before{content:\"\\f0ee\"}.fa-user-md:before{content:\"\\f0f0\"}.fa-stethoscope:before{content:\"\\f0f1\"}.fa-suitcase:before{content:\"\\f0f2\"}.fa-bell-o:before{content:\"\\f0a2\"}.fa-coffee:before{content:\"\\f0f4\"}.fa-cutlery:before{content:\"\\f0f5\"}.fa-file-text-o:before{content:\"\\f0f6\"}.fa-building-o:before{content:\"\\f0f7\"}.fa-hospital-o:before{content:\"\\f0f8\"}.fa-ambulance:before{content:\"\\f0f9\"}.fa-medkit:before{content:\"\\f0fa\"}.fa-fighter-jet:before{content:\"\\f0fb\"}.fa-beer:before{content:\"\\f0fc\"}.fa-h-square:before{content:\"\\f0fd\"}.fa-plus-square:before{content:\"\\f0fe\"}.fa-angle-double-left:before{content:\"\\f100\"}.fa-angle-double-right:before{content:\"\\f101\"}.fa-angle-double-up:before{content:\"\\f102\"}.fa-angle-double-down:before{content:\"\\f103\"}.fa-angle-left:before{content:\"\\f104\"}.fa-angle-right:before{content:\"\\f105\"}.fa-angle-up:before{content:\"\\f106\"}.fa-angle-down:before{content:\"\\f107\"}.fa-desktop:before{content:\"\\f108\"}.fa-laptop:before{content:\"\\f109\"}.fa-tablet:before{content:\"\\f10a\"}.fa-mobile-phone:before,.fa-mobile:before{content:\"\\f10b\"}.fa-circle-o:before{content:\"\\f10c\"}.fa-quote-left:before{content:\"\\f10d\"}.fa-quote-right:before{content:\"\\f10e\"}.fa-spinner:before{content:\"\\f110\"}.fa-circle:before{content:\"\\f111\"}.fa-mail-reply:before,.fa-reply:before{content:\"\\f112\"}.fa-github-alt:before{content:\"\\f113\"}.fa-folder-o:before{content:\"\\f114\"}.fa-folder-open-o:before{content:\"\\f115\"}.fa-smile-o:before{content:\"\\f118\"}.fa-frown-o:before{content:\"\\f119\"}.fa-meh-o:before{content:\"\\f11a\"}.fa-gamepad:before{content:\"\\f11b\"}.fa-keyboard-o:before{content:\"\\f11c\"}.fa-flag-o:before{content:\"\\f11d\"}.fa-flag-checkered:before{content:\"\\f11e\"}.fa-terminal:before{content:\"\\f120\"}.fa-code:before{content:\"\\f121\"}.fa-mail-reply-all:before,.fa-reply-all:before{content:\"\\f122\"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:\"\\f123\"}.fa-location-arrow:before{content:\"\\f124\"}.fa-crop:before{content:\"\\f125\"}.fa-code-fork:before{content:\"\\f126\"}.fa-unlink:before,.fa-chain-broken:before{content:\"\\f127\"}.fa-question:before{content:\"\\f128\"}.fa-info:before{content:\"\\f129\"}.fa-exclamation:before{content:\"\\f12a\"}.fa-superscript:before{content:\"\\f12b\"}.fa-subscript:before{content:\"\\f12c\"}.fa-eraser:before{content:\"\\f12d\"}.fa-puzzle-piece:before{content:\"\\f12e\"}.fa-microphone:before{content:\"\\f130\"}.fa-microphone-slash:before{content:\"\\f131\"}.fa-shield:before{content:\"\\f132\"}.fa-calendar-o:before{content:\"\\f133\"}.fa-fire-extinguisher:before{content:\"\\f134\"}.fa-rocket:before{content:\"\\f135\"}.fa-maxcdn:before{content:\"\\f136\"}.fa-chevron-circle-left:before{content:\"\\f137\"}.fa-chevron-circle-right:before{content:\"\\f138\"}.fa-chevron-circle-up:before{content:\"\\f139\"}.fa-chevron-circle-down:before{content:\"\\f13a\"}.fa-html5:before{content:\"\\f13b\"}.fa-css3:before{content:\"\\f13c\"}.fa-anchor:before{content:\"\\f13d\"}.fa-unlock-alt:before{content:\"\\f13e\"}.fa-bullseye:before{content:\"\\f140\"}.fa-ellipsis-h:before{content:\"\\f141\"}.fa-ellipsis-v:before{content:\"\\f142\"}.fa-rss-square:before{content:\"\\f143\"}.fa-play-circle:before{content:\"\\f144\"}.fa-ticket:before{content:\"\\f145\"}.fa-minus-square:before{content:\"\\f146\"}.fa-minus-square-o:before{content:\"\\f147\"}.fa-level-up:before{content:\"\\f148\"}.fa-level-down:before{content:\"\\f149\"}.fa-check-square:before{content:\"\\f14a\"}.fa-pencil-square:before{content:\"\\f14b\"}.fa-external-link-square:before{content:\"\\f14c\"}.fa-share-square:before{content:\"\\f14d\"}.fa-compass:before{content:\"\\f14e\"}.fa-toggle-down:before,.fa-caret-square-o-down:before{content:\"\\f150\"}.fa-toggle-up:before,.fa-caret-square-o-up:before{content:\"\\f151\"}.fa-toggle-right:before,.fa-caret-square-o-right:before{content:\"\\f152\"}.fa-euro:before,.fa-eur:before{content:\"\\f153\"}.fa-gbp:before{content:\"\\f154\"}.fa-dollar:before,.fa-usd:before{content:\"\\f155\"}.fa-rupee:before,.fa-inr:before{content:\"\\f156\"}.fa-cny:before,.fa-rmb:before,.fa-yen:before,.fa-jpy:before{content:\"\\f157\"}.fa-ruble:before,.fa-rouble:before,.fa-rub:before{content:\"\\f158\"}.fa-won:before,.fa-krw:before{content:\"\\f159\"}.fa-bitcoin:before,.fa-btc:before{content:\"\\f15a\"}.fa-file:before{content:\"\\f15b\"}.fa-file-text:before{content:\"\\f15c\"}.fa-sort-alpha-asc:before{content:\"\\f15d\"}.fa-sort-alpha-desc:before{content:\"\\f15e\"}.fa-sort-amount-asc:before{content:\"\\f160\"}.fa-sort-amount-desc:before{content:\"\\f161\"}.fa-sort-numeric-asc:before{content:\"\\f162\"}.fa-sort-numeric-desc:before{content:\"\\f163\"}.fa-thumbs-up:before{content:\"\\f164\"}.fa-thumbs-down:before{content:\"\\f165\"}.fa-youtube-square:before{content:\"\\f166\"}.fa-youtube:before{content:\"\\f167\"}.fa-xing:before{content:\"\\f168\"}.fa-xing-square:before{content:\"\\f169\"}.fa-youtube-play:before{content:\"\\f16a\"}.fa-dropbox:before{content:\"\\f16b\"}.fa-stack-overflow:before{content:\"\\f16c\"}.fa-instagram:before{content:\"\\f16d\"}.fa-flickr:before{content:\"\\f16e\"}.fa-adn:before{content:\"\\f170\"}.fa-bitbucket:before{content:\"\\f171\"}.fa-bitbucket-square:before{content:\"\\f172\"}.fa-tumblr:before{content:\"\\f173\"}.fa-tumblr-square:before{content:\"\\f174\"}.fa-long-arrow-down:before{content:\"\\f175\"}.fa-long-arrow-up:before{content:\"\\f176\"}.fa-long-arrow-left:before{content:\"\\f177\"}.fa-long-arrow-right:before{content:\"\\f178\"}.fa-apple:before{content:\"\\f179\"}.fa-windows:before{content:\"\\f17a\"}.fa-android:before{content:\"\\f17b\"}.fa-linux:before{content:\"\\f17c\"}.fa-dribbble:before{content:\"\\f17d\"}.fa-skype:before{content:\"\\f17e\"}.fa-foursquare:before{content:\"\\f180\"}.fa-trello:before{content:\"\\f181\"}.fa-female:before{content:\"\\f182\"}.fa-male:before{content:\"\\f183\"}.fa-gittip:before,.fa-gratipay:before{content:\"\\f184\"}.fa-sun-o:before{content:\"\\f185\"}.fa-moon-o:before{content:\"\\f186\"}.fa-archive:before{content:\"\\f187\"}.fa-bug:before{content:\"\\f188\"}.fa-vk:before{content:\"\\f189\"}.fa-weibo:before{content:\"\\f18a\"}.fa-renren:before{content:\"\\f18b\"}.fa-pagelines:before{content:\"\\f18c\"}.fa-stack-exchange:before{content:\"\\f18d\"}.fa-arrow-circle-o-right:before{content:\"\\f18e\"}.fa-arrow-circle-o-left:before{content:\"\\f190\"}.fa-toggle-left:before,.fa-caret-square-o-left:before{content:\"\\f191\"}.fa-dot-circle-o:before{content:\"\\f192\"}.fa-wheelchair:before{content:\"\\f193\"}.fa-vimeo-square:before{content:\"\\f194\"}.fa-turkish-lira:before,.fa-try:before{content:\"\\f195\"}.fa-plus-square-o:before{content:\"\\f196\"}.fa-space-shuttle:before{content:\"\\f197\"}.fa-slack:before{content:\"\\f198\"}.fa-envelope-square:before{content:\"\\f199\"}.fa-wordpress:before{content:\"\\f19a\"}.fa-openid:before{content:\"\\f19b\"}.fa-institution:before,.fa-bank:before,.fa-university:before{content:\"\\f19c\"}.fa-mortar-board:before,.fa-graduation-cap:before{content:\"\\f19d\"}.fa-yahoo:before{content:\"\\f19e\"}.fa-google:before{content:\"\\f1a0\"}.fa-reddit:before{content:\"\\f1a1\"}.fa-reddit-square:before{content:\"\\f1a2\"}.fa-stumbleupon-circle:before{content:\"\\f1a3\"}.fa-stumbleupon:before{content:\"\\f1a4\"}.fa-delicious:before{content:\"\\f1a5\"}.fa-digg:before{content:\"\\f1a6\"}.fa-pied-piper-pp:before{content:\"\\f1a7\"}.fa-pied-piper-alt:before{content:\"\\f1a8\"}.fa-drupal:before{content:\"\\f1a9\"}.fa-joomla:before{content:\"\\f1aa\"}.fa-language:before{content:\"\\f1ab\"}.fa-fax:before{content:\"\\f1ac\"}.fa-building:before{content:\"\\f1ad\"}.fa-child:before{content:\"\\f1ae\"}.fa-paw:before{content:\"\\f1b0\"}.fa-spoon:before{content:\"\\f1b1\"}.fa-cube:before{content:\"\\f1b2\"}.fa-cubes:before{content:\"\\f1b3\"}.fa-behance:before{content:\"\\f1b4\"}.fa-behance-square:before{content:\"\\f1b5\"}.fa-steam:before{content:\"\\f1b6\"}.fa-steam-square:before{content:\"\\f1b7\"}.fa-recycle:before{content:\"\\f1b8\"}.fa-automobile:before,.fa-car:before{content:\"\\f1b9\"}.fa-cab:before,.fa-taxi:before{content:\"\\f1ba\"}.fa-tree:before{content:\"\\f1bb\"}.fa-spotify:before{content:\"\\f1bc\"}.fa-deviantart:before{content:\"\\f1bd\"}.fa-soundcloud:before{content:\"\\f1be\"}.fa-database:before{content:\"\\f1c0\"}.fa-file-pdf-o:before{content:\"\\f1c1\"}.fa-file-word-o:before{content:\"\\f1c2\"}.fa-file-excel-o:before{content:\"\\f1c3\"}.fa-file-powerpoint-o:before{content:\"\\f1c4\"}.fa-file-photo-o:before,.fa-file-picture-o:before,.fa-file-image-o:before{content:\"\\f1c5\"}.fa-file-zip-o:before,.fa-file-archive-o:before{content:\"\\f1c6\"}.fa-file-sound-o:before,.fa-file-audio-o:before{content:\"\\f1c7\"}.fa-file-movie-o:before,.fa-file-video-o:before{content:\"\\f1c8\"}.fa-file-code-o:before{content:\"\\f1c9\"}.fa-vine:before{content:\"\\f1ca\"}.fa-codepen:before{content:\"\\f1cb\"}.fa-jsfiddle:before{content:\"\\f1cc\"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-saver:before,.fa-support:before,.fa-life-ring:before{content:\"\\f1cd\"}.fa-circle-o-notch:before{content:\"\\f1ce\"}.fa-ra:before,.fa-resistance:before,.fa-rebel:before{content:\"\\f1d0\"}.fa-ge:before,.fa-empire:before{content:\"\\f1d1\"}.fa-git-square:before{content:\"\\f1d2\"}.fa-git:before{content:\"\\f1d3\"}.fa-y-combinator-square:before,.fa-yc-square:before,.fa-hacker-news:before{content:\"\\f1d4\"}.fa-tencent-weibo:before{content:\"\\f1d5\"}.fa-qq:before{content:\"\\f1d6\"}.fa-wechat:before,.fa-weixin:before{content:\"\\f1d7\"}.fa-send:before,.fa-paper-plane:before{content:\"\\f1d8\"}.fa-send-o:before,.fa-paper-plane-o:before{content:\"\\f1d9\"}.fa-history:before{content:\"\\f1da\"}.fa-circle-thin:before{content:\"\\f1db\"}.fa-header:before{content:\"\\f1dc\"}.fa-paragraph:before{content:\"\\f1dd\"}.fa-sliders:before{content:\"\\f1de\"}.fa-share-alt:before{content:\"\\f1e0\"}.fa-share-alt-square:before{content:\"\\f1e1\"}.fa-bomb:before{content:\"\\f1e2\"}.fa-soccer-ball-o:before,.fa-futbol-o:before{content:\"\\f1e3\"}.fa-tty:before{content:\"\\f1e4\"}.fa-binoculars:before{content:\"\\f1e5\"}.fa-plug:before{content:\"\\f1e6\"}.fa-slideshare:before{content:\"\\f1e7\"}.fa-twitch:before{content:\"\\f1e8\"}.fa-yelp:before{content:\"\\f1e9\"}.fa-newspaper-o:before{content:\"\\f1ea\"}.fa-wifi:before{content:\"\\f1eb\"}.fa-calculator:before{content:\"\\f1ec\"}.fa-paypal:before{content:\"\\f1ed\"}.fa-google-wallet:before{content:\"\\f1ee\"}.fa-cc-visa:before{content:\"\\f1f0\"}.fa-cc-mastercard:before{content:\"\\f1f1\"}.fa-cc-discover:before{content:\"\\f1f2\"}.fa-cc-amex:before{content:\"\\f1f3\"}.fa-cc-paypal:before{content:\"\\f1f4\"}.fa-cc-stripe:before{content:\"\\f1f5\"}.fa-bell-slash:before{content:\"\\f1f6\"}.fa-bell-slash-o:before{content:\"\\f1f7\"}.fa-trash:before{content:\"\\f1f8\"}.fa-copyright:before{content:\"\\f1f9\"}.fa-at:before{content:\"\\f1fa\"}.fa-eyedropper:before{content:\"\\f1fb\"}.fa-paint-brush:before{content:\"\\f1fc\"}.fa-birthday-cake:before{content:\"\\f1fd\"}.fa-area-chart:before{content:\"\\f1fe\"}.fa-pie-chart:before{content:\"\\f200\"}.fa-line-chart:before{content:\"\\f201\"}.fa-lastfm:before{content:\"\\f202\"}.fa-lastfm-square:before{content:\"\\f203\"}.fa-toggle-off:before{content:\"\\f204\"}.fa-toggle-on:before{content:\"\\f205\"}.fa-bicycle:before{content:\"\\f206\"}.fa-bus:before{content:\"\\f207\"}.fa-ioxhost:before{content:\"\\f208\"}.fa-angellist:before{content:\"\\f209\"}.fa-cc:before{content:\"\\f20a\"}.fa-shekel:before,.fa-sheqel:before,.fa-ils:before{content:\"\\f20b\"}.fa-meanpath:before{content:\"\\f20c\"}.fa-buysellads:before{content:\"\\f20d\"}.fa-connectdevelop:before{content:\"\\f20e\"}.fa-dashcube:before{content:\"\\f210\"}.fa-forumbee:before{content:\"\\f211\"}.fa-leanpub:before{content:\"\\f212\"}.fa-sellsy:before{content:\"\\f213\"}.fa-shirtsinbulk:before{content:\"\\f214\"}.fa-simplybuilt:before{content:\"\\f215\"}.fa-skyatlas:before{content:\"\\f216\"}.fa-cart-plus:before{content:\"\\f217\"}.fa-cart-arrow-down:before{content:\"\\f218\"}.fa-diamond:before{content:\"\\f219\"}.fa-ship:before{content:\"\\f21a\"}.fa-user-secret:before{content:\"\\f21b\"}.fa-motorcycle:before{content:\"\\f21c\"}.fa-street-view:before{content:\"\\f21d\"}.fa-heartbeat:before{content:\"\\f21e\"}.fa-venus:before{content:\"\\f221\"}.fa-mars:before{content:\"\\f222\"}.fa-mercury:before{content:\"\\f223\"}.fa-intersex:before,.fa-transgender:before{content:\"\\f224\"}.fa-transgender-alt:before{content:\"\\f225\"}.fa-venus-double:before{content:\"\\f226\"}.fa-mars-double:before{content:\"\\f227\"}.fa-venus-mars:before{content:\"\\f228\"}.fa-mars-stroke:before{content:\"\\f229\"}.fa-mars-stroke-v:before{content:\"\\f22a\"}.fa-mars-stroke-h:before{content:\"\\f22b\"}.fa-neuter:before{content:\"\\f22c\"}.fa-genderless:before{content:\"\\f22d\"}.fa-facebook-official:before{content:\"\\f230\"}.fa-pinterest-p:before{content:\"\\f231\"}.fa-whatsapp:before{content:\"\\f232\"}.fa-server:before{content:\"\\f233\"}.fa-user-plus:before{content:\"\\f234\"}.fa-user-times:before{content:\"\\f235\"}.fa-hotel:before,.fa-bed:before{content:\"\\f236\"}.fa-viacoin:before{content:\"\\f237\"}.fa-train:before{content:\"\\f238\"}.fa-subway:before{content:\"\\f239\"}.fa-medium:before{content:\"\\f23a\"}.fa-yc:before,.fa-y-combinator:before{content:\"\\f23b\"}.fa-optin-monster:before{content:\"\\f23c\"}.fa-opencart:before{content:\"\\f23d\"}.fa-expeditedssl:before{content:\"\\f23e\"}.fa-battery-4:before,.fa-battery:before,.fa-battery-full:before{content:\"\\f240\"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:\"\\f241\"}.fa-battery-2:before,.fa-battery-half:before{content:\"\\f242\"}.fa-battery-1:before,.fa-battery-quarter:before{content:\"\\f243\"}.fa-battery-0:before,.fa-battery-empty:before{content:\"\\f244\"}.fa-mouse-pointer:before{content:\"\\f245\"}.fa-i-cursor:before{content:\"\\f246\"}.fa-object-group:before{content:\"\\f247\"}.fa-object-ungroup:before{content:\"\\f248\"}.fa-sticky-note:before{content:\"\\f249\"}.fa-sticky-note-o:before{content:\"\\f24a\"}.fa-cc-jcb:before{content:\"\\f24b\"}.fa-cc-diners-club:before{content:\"\\f24c\"}.fa-clone:before{content:\"\\f24d\"}.fa-balance-scale:before{content:\"\\f24e\"}.fa-hourglass-o:before{content:\"\\f250\"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:\"\\f251\"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:\"\\f252\"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:\"\\f253\"}.fa-hourglass:before{content:\"\\f254\"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:\"\\f255\"}.fa-hand-stop-o:before,.fa-hand-paper-o:before{content:\"\\f256\"}.fa-hand-scissors-o:before{content:\"\\f257\"}.fa-hand-lizard-o:before{content:\"\\f258\"}.fa-hand-spock-o:before{content:\"\\f259\"}.fa-hand-pointer-o:before{content:\"\\f25a\"}.fa-hand-peace-o:before{content:\"\\f25b\"}.fa-trademark:before{content:\"\\f25c\"}.fa-registered:before{content:\"\\f25d\"}.fa-creative-commons:before{content:\"\\f25e\"}.fa-gg:before{content:\"\\f260\"}.fa-gg-circle:before{content:\"\\f261\"}.fa-tripadvisor:before{content:\"\\f262\"}.fa-odnoklassniki:before{content:\"\\f263\"}.fa-odnoklassniki-square:before{content:\"\\f264\"}.fa-get-pocket:before{content:\"\\f265\"}.fa-wikipedia-w:before{content:\"\\f266\"}.fa-safari:before{content:\"\\f267\"}.fa-chrome:before{content:\"\\f268\"}.fa-firefox:before{content:\"\\f269\"}.fa-opera:before{content:\"\\f26a\"}.fa-internet-explorer:before{content:\"\\f26b\"}.fa-tv:before,.fa-television:before{content:\"\\f26c\"}.fa-contao:before{content:\"\\f26d\"}.fa-500px:before{content:\"\\f26e\"}.fa-amazon:before{content:\"\\f270\"}.fa-calendar-plus-o:before{content:\"\\f271\"}.fa-calendar-minus-o:before{content:\"\\f272\"}.fa-calendar-times-o:before{content:\"\\f273\"}.fa-calendar-check-o:before{content:\"\\f274\"}.fa-industry:before{content:\"\\f275\"}.fa-map-pin:before{content:\"\\f276\"}.fa-map-signs:before{content:\"\\f277\"}.fa-map-o:before{content:\"\\f278\"}.fa-map:before{content:\"\\f279\"}.fa-commenting:before{content:\"\\f27a\"}.fa-commenting-o:before{content:\"\\f27b\"}.fa-houzz:before{content:\"\\f27c\"}.fa-vimeo:before{content:\"\\f27d\"}.fa-black-tie:before{content:\"\\f27e\"}.fa-fonticons:before{content:\"\\f280\"}.fa-reddit-alien:before{content:\"\\f281\"}.fa-edge:before{content:\"\\f282\"}.fa-credit-card-alt:before{content:\"\\f283\"}.fa-codiepie:before{content:\"\\f284\"}.fa-modx:before{content:\"\\f285\"}.fa-fort-awesome:before{content:\"\\f286\"}.fa-usb:before{content:\"\\f287\"}.fa-product-hunt:before{content:\"\\f288\"}.fa-mixcloud:before{content:\"\\f289\"}.fa-scribd:before{content:\"\\f28a\"}.fa-pause-circle:before{content:\"\\f28b\"}.fa-pause-circle-o:before{content:\"\\f28c\"}.fa-stop-circle:before{content:\"\\f28d\"}.fa-stop-circle-o:before{content:\"\\f28e\"}.fa-shopping-bag:before{content:\"\\f290\"}.fa-shopping-basket:before{content:\"\\f291\"}.fa-hashtag:before{content:\"\\f292\"}.fa-bluetooth:before{content:\"\\f293\"}.fa-bluetooth-b:before{content:\"\\f294\"}.fa-percent:before{content:\"\\f295\"}.fa-gitlab:before{content:\"\\f296\"}.fa-wpbeginner:before{content:\"\\f297\"}.fa-wpforms:before{content:\"\\f298\"}.fa-envira:before{content:\"\\f299\"}.fa-universal-access:before{content:\"\\f29a\"}.fa-wheelchair-alt:before{content:\"\\f29b\"}.fa-question-circle-o:before{content:\"\\f29c\"}.fa-blind:before{content:\"\\f29d\"}.fa-audio-description:before{content:\"\\f29e\"}.fa-volume-control-phone:before{content:\"\\f2a0\"}.fa-braille:before{content:\"\\f2a1\"}.fa-assistive-listening-systems:before{content:\"\\f2a2\"}.fa-asl-interpreting:before,.fa-american-sign-language-interpreting:before{content:\"\\f2a3\"}.fa-deafness:before,.fa-hard-of-hearing:before,.fa-deaf:before{content:\"\\f2a4\"}.fa-glide:before{content:\"\\f2a5\"}.fa-glide-g:before{content:\"\\f2a6\"}.fa-signing:before,.fa-sign-language:before{content:\"\\f2a7\"}.fa-low-vision:before{content:\"\\f2a8\"}.fa-viadeo:before{content:\"\\f2a9\"}.fa-viadeo-square:before{content:\"\\f2aa\"}.fa-snapchat:before{content:\"\\f2ab\"}.fa-snapchat-ghost:before{content:\"\\f2ac\"}.fa-snapchat-square:before{content:\"\\f2ad\"}.fa-pied-piper:before{content:\"\\f2ae\"}.fa-first-order:before{content:\"\\f2b0\"}.fa-yoast:before{content:\"\\f2b1\"}.fa-themeisle:before{content:\"\\f2b2\"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:\"\\f2b3\"}.fa-fa:before,.fa-font-awesome:before{content:\"\\f2b4\"}.fa-handshake-o:before{content:\"\\f2b5\"}.fa-envelope-open:before{content:\"\\f2b6\"}.fa-envelope-open-o:before{content:\"\\f2b7\"}.fa-linode:before{content:\"\\f2b8\"}.fa-address-book:before{content:\"\\f2b9\"}.fa-address-book-o:before{content:\"\\f2ba\"}.fa-vcard:before,.fa-address-card:before{content:\"\\f2bb\"}.fa-vcard-o:before,.fa-address-card-o:before{content:\"\\f2bc\"}.fa-user-circle:before{content:\"\\f2bd\"}.fa-user-circle-o:before{content:\"\\f2be\"}.fa-user-o:before{content:\"\\f2c0\"}.fa-id-badge:before{content:\"\\f2c1\"}.fa-drivers-license:before,.fa-id-card:before{content:\"\\f2c2\"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:\"\\f2c3\"}.fa-quora:before{content:\"\\f2c4\"}.fa-free-code-camp:before{content:\"\\f2c5\"}.fa-telegram:before{content:\"\\f2c6\"}.fa-thermometer-4:before,.fa-thermometer:before,.fa-thermometer-full:before{content:\"\\f2c7\"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:\"\\f2c8\"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:\"\\f2c9\"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:\"\\f2ca\"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:\"\\f2cb\"}.fa-shower:before{content:\"\\f2cc\"}.fa-bathtub:before,.fa-s15:before,.fa-bath:before{content:\"\\f2cd\"}.fa-podcast:before{content:\"\\f2ce\"}.fa-window-maximize:before{content:\"\\f2d0\"}.fa-window-minimize:before{content:\"\\f2d1\"}.fa-window-restore:before{content:\"\\f2d2\"}.fa-times-rectangle:before,.fa-window-close:before{content:\"\\f2d3\"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:\"\\f2d4\"}.fa-bandcamp:before{content:\"\\f2d5\"}.fa-grav:before{content:\"\\f2d6\"}.fa-etsy:before{content:\"\\f2d7\"}.fa-imdb:before{content:\"\\f2d8\"}.fa-ravelry:before{content:\"\\f2d9\"}.fa-eercast:before{content:\"\\f2da\"}.fa-microchip:before{content:\"\\f2db\"}.fa-snowflake-o:before{content:\"\\f2dc\"}.fa-superpowers:before{content:\"\\f2dd\"}.fa-wpexplorer:before{content:\"\\f2de\"}.fa-meetup:before{content:\"\\f2e0\"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/primeicons/primeicons.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/primeicons/primeicons.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ./fonts/primeicons.eot */ "./node_modules/primeicons/fonts/primeicons.eot"));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! ./fonts/primeicons.eot */ "./node_modules/primeicons/fonts/primeicons.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(/*! ./fonts/primeicons.ttf */ "./node_modules/primeicons/fonts/primeicons.ttf"));
var ___CSS_LOADER_URL___3___ = urlEscape(__webpack_require__(/*! ./fonts/primeicons.woff */ "./node_modules/primeicons/fonts/primeicons.woff"));
var ___CSS_LOADER_URL___4___ = urlEscape(__webpack_require__(/*! ./fonts/primeicons.svg */ "./node_modules/primeicons/fonts/primeicons.svg") + "?#primeicons");

// Module
exports.push([module.i, "@font-face {\n    font-family: 'PrimeIcons';\n    src: url(" + ___CSS_LOADER_URL___0___ + ");\n    src: url(" + ___CSS_LOADER_URL___1___ + ") format('embedded-opentype'), url(" + ___CSS_LOADER_URL___2___ + ") format('truetype'), url(" + ___CSS_LOADER_URL___3___ + ") format('woff'), url(" + ___CSS_LOADER_URL___4___ + ") format('svg');\n    font-weight: normal;\n    font-style: normal;\n}\n\n.pi {\n    font-family: 'primeicons';\n    speak: none;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n    line-height: 1;\n    display: inline-block;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n.pi-fw {\n    width: 1.28571429em;\n    text-align: center;\n}\n\n.pi-spin {\n    -webkit-animation: fa-spin 2s infinite linear;\n    animation: fa-spin 2s infinite linear;\n}\n\n@-webkit-keyframes fa-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n\n@keyframes fa-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n\n.pi-mobile:before {\n    content: \"\\e982\";\n}\n\n.pi-tablet:before {\n    content: \"\\e983\";\n}\n\n.pi-key:before {\n    content: \"\\e981\";\n}\n\n.pi-shopping-cart:before {\n    content: \"\\e980\";\n}\n\n.pi-comments:before {\n    content: \"\\e97e\";\n}\n\n.pi-comment:before {\n    content: \"\\e97f\";\n}\n\n.pi-briefcase:before {\n    content: \"\\e97d\";\n}\n\n.pi-bell:before {\n    content: \"\\e97c\";\n}\n\n.pi-paperclip:before {\n    content: \"\\e97b\";\n}\n\n.pi-share-alt:before {\n    content: \"\\e97a\";\n}\n\n.pi-envelope:before {\n    content: \"\\e979\";\n}\n\n.pi-volume-down:before {\n    content: \"\\e976\";\n}\n\n.pi-volume-up:before {\n    content: \"\\e977\";\n}\n\n.pi-volume-off:before {\n    content: \"\\e978\";\n}\n\n.pi-eject:before {\n    content: \"\\e975\";\n}\n\n.pi-money-bill:before {\n    content: \"\\e974\";\n}\n\n.pi-images:before {\n    content: \"\\e973\";\n}\n\n.pi-image:before {\n    content: \"\\e972\";\n}\n\n.pi-sign-in:before {\n    content: \"\\e970\";\n}\n\n.pi-sign-out:before {\n    content: \"\\e971\";\n}\n\n.pi-wifi:before {\n    content: \"\\e96f\";\n}\n\n.pi-sitemap:before {\n    content: \"\\e96e\";\n}\n\n.pi-chart-bar:before {\n    content: \"\\e96d\";\n}\n\n.pi-camera:before {\n    content: \"\\e96c\";\n}\n\n.pi-dollar:before {\n    content: \"\\e96b\";\n}\n\n.pi-lock-open:before {\n    content: \"\\e96a\";\n}\n\n.pi-table:before {\n    content: \"\\e969\";\n}\n\n.pi-map-marker:before {\n    content: \"\\e968\";\n}\n\n.pi-list:before {\n    content: \"\\e967\";\n}\n\n.pi-eye-slash:before {\n    content: \"\\e965\";\n}\n\n.pi-eye:before {\n    content: \"\\e966\";\n}\n\n.pi-folder-open:before {\n    content: \"\\e964\";\n}\n\n.pi-folder:before {\n    content: \"\\e963\";\n}\n\n.pi-video:before {\n    content: \"\\e962\";\n}\n\n.pi-inbox:before {\n    content: \"\\e961\";\n}\n\n.pi-lock:before {\n    content: \"\\e95f\";\n}\n\n.pi-unlock:before {\n    content: \"\\e960\";\n}\n\n.pi-tags:before {\n    content: \"\\e95d\";\n}\n\n.pi-tag:before {\n    content: \"\\e95e\";\n}\n\n.pi-power-off:before {\n    content: \"\\e95c\";\n}\n\n.pi-save:before {\n    content: \"\\e95b\";\n}\n\n.pi-question-circle:before {\n    content: \"\\e959\";\n}\n\n.pi-question:before {\n    content: \"\\e95a\";\n}\n\n.pi-copy:before {\n    content: \"\\e957\";\n}\n\n.pi-file:before {\n    content: \"\\e958\";\n}\n\n.pi-clone:before {\n    content: \"\\e955\";\n}\n\n.pi-calendar-times:before {\n    content: \"\\e952\";\n}\n\n.pi-calendar-minus:before {\n    content: \"\\e953\";\n}\n\n.pi-calendar-plus:before {\n    content: \"\\e954\";\n}\n\n.pi-ellipsis-v:before {\n    content: \"\\e950\";\n}\n\n.pi-ellipsis-h:before {\n    content: \"\\e951\";\n}\n\n.pi-bookmark:before {\n    content: \"\\e94e\";\n}\n\n.pi-globe:before {\n    content: \"\\e94f\";\n}\n\n.pi-replay:before {\n    content: \"\\e94d\";\n}\n\n.pi-filter:before {\n    content: \"\\e94c\";\n}\n\n.pi-print:before {\n    content: \"\\e94b\";\n}\n\n.pi-align-right:before {\n    content: \"\\e946\";\n}\n\n.pi-align-left:before {\n    content: \"\\e947\";\n}\n\n.pi-align-center:before {\n    content: \"\\e948\";\n}\n\n.pi-align-justify:before {\n    content: \"\\e949\";\n}\n\n.pi-cog:before {\n    content: \"\\e94a\";\n}\n\n.pi-cloud-download:before {\n    content: \"\\e943\";\n}\n\n.pi-cloud-upload:before {\n    content: \"\\e944\";\n}\n\n.pi-cloud:before {\n    content: \"\\e945\";\n}\n\n.pi-pencil:before {\n    content: \"\\e942\";\n}\n\n.pi-users:before {\n    content: \"\\e941\";\n}\n\n.pi-clock:before {\n    content: \"\\e940\";\n}\n\n.pi-user-minus:before {\n    content: \"\\e93e\";\n}\n\n.pi-user-plus:before {\n    content: \"\\e93f\";\n}\n\n.pi-trash:before {\n    content: \"\\e93d\";\n}\n\n.pi-external-link:before {\n    content: \"\\e93c\";\n}\n\n.pi-window-maximize:before {\n    content: \"\\e93b\";\n}\n\n.pi-window-minimize:before {\n    content: \"\\e93a\";\n}\n\n.pi-refresh:before {\n    content: \"\\e938\";\n}\n  \n.pi-user:before {\n    content: \"\\e939\";\n}\n\n.pi-exclamation-triangle:before {\n    content: \"\\e922\";\n}\n\n.pi-calendar:before {\n    content: \"\\e927\";\n}\n\n.pi-chevron-circle-left:before {\n    content: \"\\e928\";\n}\n\n.pi-chevron-circle-down:before {\n    content: \"\\e929\";\n}\n\n.pi-chevron-circle-right:before {\n    content: \"\\e92a\";\n}\n\n.pi-chevron-circle-up:before {\n    content: \"\\e92b\";\n}\n\n.pi-angle-double-down:before {\n    content: \"\\e92c\";\n}\n\n.pi-angle-double-left:before {\n    content: \"\\e92d\";\n}\n\n.pi-angle-double-right:before {\n    content: \"\\e92e\";\n}\n\n.pi-angle-double-up:before {\n    content: \"\\e92f\";\n}\n\n.pi-angle-down:before {\n    content: \"\\e930\";\n}\n\n.pi-angle-left:before {\n    content: \"\\e931\";\n}\n\n.pi-angle-right:before {\n    content: \"\\e932\";\n}\n\n.pi-angle-up:before {\n    content: \"\\e933\";\n}\n\n.pi-upload:before {\n    content: \"\\e934\";\n}\n\n.pi-download:before {\n    content: \"\\e956\";\n}\n\n.pi-ban:before {\n    content: \"\\e935\";\n}\n\n.pi-star-o:before {\n    content: \"\\e936\";\n}\n\n.pi-star:before {\n    content: \"\\e937\";\n}\n\n.pi-chevron-left:before {\n    content: \"\\e900\";\n}\n\n.pi-chevron-right:before {\n    content: \"\\e901\";\n}\n\n.pi-chevron-down:before {\n    content: \"\\e902\";\n}\n\n.pi-chevron-up:before {\n    content: \"\\e903\";\n}\n\n.pi-caret-left:before {\n    content: \"\\e904\";\n}\n\n.pi-caret-right:before {\n    content: \"\\e905\";\n}\n\n.pi-caret-down:before {\n    content: \"\\e906\";\n}\n\n.pi-caret-up:before {\n    content: \"\\e907\";\n}\n\n.pi-search:before {\n    content: \"\\e908\";\n}\n\n.pi-check:before {\n    content: \"\\e909\";\n}\n\n.pi-check-circle:before {\n    content: \"\\e90a\";\n}\n\n.pi-times:before {\n    content: \"\\e90b\";\n}\n\n.pi-times-circle:before {\n    content: \"\\e90c\";\n}\n\n.pi-plus:before {\n    content: \"\\e90d\";\n}\n\n.pi-plus-circle:before {\n    content: \"\\e90e\";\n}\n\n.pi-minus:before {\n    content: \"\\e90f\";\n}\n\n.pi-minus-circle:before {\n    content: \"\\e910\";\n}\n\n.pi-circle-on:before {\n    content: \"\\e911\";\n}\n\n.pi-circle-off:before {\n    content: \"\\e912\";\n}\n\n.pi-sort-down:before {\n    content: \"\\e913\";\n}\n\n.pi-sort-up:before {\n    content: \"\\e914\";\n}\n\n.pi-sort:before {\n    content: \"\\e915\";\n}\n\n.pi-step-backward:before {\n    content: \"\\e916\";\n}\n\n.pi-step-forward:before {\n    content: \"\\e917\";\n}\n\n.pi-th-large:before {\n    content: \"\\e918\";\n}\n\n.pi-arrow-down:before {\n    content: \"\\e919\";\n}\n\n.pi-arrow-left:before {\n    content: \"\\e91a\";\n}\n\n.pi-arrow-right:before {\n    content: \"\\e91b\";\n}\n\n.pi-arrow-up:before {\n    content: \"\\e91c\";\n}\n\n.pi-bars:before {\n    content: \"\\e91d\";\n}\n\n.pi-arrow-circle-down:before {\n    content: \"\\e91e\";\n}\n\n.pi-arrow-circle-left:before {\n    content: \"\\e91f\";\n}\n\n.pi-arrow-circle-right:before {\n    content: \"\\e920\";\n}\n\n.pi-arrow-circle-up:before {\n    content: \"\\e921\";\n}\n\n.pi-info:before {\n    content: \"\\e923\";\n}\n\n.pi-info-circle:before {\n    content: \"\\e924\";\n}\n\n.pi-home:before {\n    content: \"\\e925\";\n}\n\n.pi-spinner:before {\n    content: \"\\e926\";\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/ce-checkbox/checkbox.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/app/ce-checkbox/checkbox.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".ui-chkbox {\n  display: inline-block;\n  cursor: pointer;\n  vertical-align: middle;\n  margin-right: .25em;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none; }\n\n.ui-chkbox .ui-chkbox-box {\n  width: 1.125em;\n  height: 1.125em;\n  line-height: 1.125em;\n  -moz-border-radius: 2px;\n  -webkit-border-radius: 2px;\n  border-radius: 2px;\n  text-align: center; }\n\n.ui-chkbox .ui-chkbox-icon {\n  display: block; }\n\n.ui-chkbox-label {\n  vertical-align: middle; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/chips/chips.scss":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/app/chips/chips.scss ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".ui-chips > ul.ui-inputtext {\n  clear: left;\n  cursor: text;\n  list-style-type: none;\n  margin: 0;\n  overflow: hidden;\n  padding: 0 .25em; }\n\n.ui-chips-token {\n  cursor: default;\n  display: inline-block;\n  vertical-align: middle;\n  overflow: hidden;\n  padding: .125em .5em;\n  white-space: nowrap;\n  position: relative;\n  margin-right: .125em;\n  border: 0 none;\n  font-size: .9em; }\n\n.ui-chips-token .ui-chips-token-label {\n  display: block;\n  margin-right: 2em; }\n\n.ui-chips > .ui-state-disabled .ui-chips-token-label {\n  margin-right: 0; }\n\n.ui-chips-token .ui-chips-token-icon {\n  margin-top: -.5em;\n  position: absolute;\n  right: 0.2em;\n  top: 50%;\n  cursor: pointer; }\n\n.ui-chips-input-token {\n  display: inline-block;\n  vertical-align: middle;\n  list-style-type: none;\n  margin: 0 0 0 .125em;\n  padding: .25em .25em .25em 0; }\n\n.ui-chips-input-token input {\n  border: 0 none;\n  width: 10em;\n  outline: medium none;\n  background-color: transparent;\n  margin: 0;\n  padding: 0;\n  box-shadow: none;\n  -moz-border-radius: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/message/message.scss":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/app/message/message.scss ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".ui-message {\n  border: 1px solid;\n  margin: 0px .25em;\n  padding: .25em .5em;\n  display: inline-block;\n  vertical-align: top; }\n\n.ui-message .ui-message-icon,\n.ui-message .ui-message-text {\n  vertical-align: middle; }\n\n.ui-fluid .ui-message {\n  display: block; }\n", ""]);



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
// Imports
exports.i(__webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!primeicons/primeicons.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/primeicons/primeicons.css"), "");
exports.i(__webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!font-awesome/css/font-awesome.min.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/font-awesome/css/font-awesome.min.css"), "");

// Module
exports.push([module.i, "/*! lightslider - v1.1.3 - 2015-04-14\n* https://github.com/sachinchoolur/lightslider\n* Copyright (c) 2015 Sachin N; Licensed MIT */\n/** /!!! core css Should not edit !!!/**/\n.lSSlideOuter {\n  overflow: hidden;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.lightSlider:before,\n.lightSlider:after {\n  content: \" \";\n  display: table; }\n\n.lightSlider {\n  overflow: hidden;\n  margin: 0; }\n\n.lSSlideWrapper {\n  max-width: 100%;\n  overflow: hidden;\n  position: relative; }\n\n.lSSlideWrapper > .lightSlider:after {\n  clear: both; }\n\n.lSSlideWrapper .lSSlide {\n  -webkit-transform: translate(0px, 0px);\n  -ms-transform: translate(0px, 0px);\n  transform: translate(0px, 0px);\n  -webkit-transition: all 1s;\n  -webkit-transition-property: -webkit-transform, height;\n  -moz-transition-property: -moz-transform, height;\n  transition-property: transform, height;\n  -webkit-transition-duration: inherit !important;\n  transition-duration: inherit !important;\n  -webkit-transition-timing-function: inherit !important;\n  transition-timing-function: inherit !important; }\n\n.lSSlideWrapper .lSFade {\n  position: relative; }\n\n.lSSlideWrapper .lSFade > * {\n  position: absolute !important;\n  top: 0;\n  left: 0;\n  z-index: 9;\n  margin-right: 0;\n  width: 100%; }\n\n.lSSlideWrapper.usingCss .lSFade > * {\n  opacity: 0;\n  -webkit-transition-delay: 0s;\n  transition-delay: 0s;\n  -webkit-transition-duration: inherit !important;\n  transition-duration: inherit !important;\n  -webkit-transition-property: opacity;\n  transition-property: opacity;\n  -webkit-transition-timing-function: inherit !important;\n  transition-timing-function: inherit !important; }\n\n.lSSlideWrapper .lSFade > *.active {\n  z-index: 10; }\n\n.lSSlideWrapper.usingCss .lSFade > *.active {\n  opacity: 1; }\n\n/** /!!! End of core css Should not edit !!!/**/\n/* Pager */\n.lSSlideOuter .lSPager.lSpg {\n  margin: 10px 0 0;\n  padding: 0;\n  text-align: center; }\n\n.lSSlideOuter .lSPager.lSpg > li {\n  cursor: pointer;\n  display: inline-block;\n  padding: 0 5px; }\n\n.lSSlideOuter .lSPager.lSpg > li a {\n  background-color: #222222;\n  border-radius: 30px;\n  display: inline-block;\n  height: 8px;\n  overflow: hidden;\n  text-indent: -999em;\n  width: 8px;\n  position: relative;\n  z-index: 99;\n  -webkit-transition: all 0.5s linear 0s;\n  transition: all 0.5s linear 0s; }\n\n.lSSlideOuter .lSPager.lSpg > li:hover a,\n.lSSlideOuter .lSPager.lSpg > li.active a {\n  background-color: #428bca; }\n\n.lSSlideOuter .media {\n  opacity: 0.8; }\n\n.lSSlideOuter .media.active {\n  opacity: 1; }\n\n/* End of pager */\n/** Gallery */\n.lSSlideOuter .lSPager.lSGallery {\n  list-style: none outside none;\n  padding-left: 0;\n  margin: 0;\n  overflow: hidden;\n  transform: translate3d(0px, 0px, 0px);\n  -moz-transform: translate3d(0px, 0px, 0px);\n  -ms-transform: translate3d(0px, 0px, 0px);\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  -o-transform: translate3d(0px, 0px, 0px);\n  -webkit-transition-property: -webkit-transform;\n  -moz-transition-property: -moz-transform;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.lSSlideOuter .lSPager.lSGallery li {\n  overflow: hidden;\n  -webkit-transition: border-radius 0.12s linear 0s 0.35s linear 0s;\n  transition: border-radius 0.12s linear 0s 0.35s linear 0s; }\n\n.lSSlideOuter .lSPager.lSGallery li.active,\n.lSSlideOuter .lSPager.lSGallery li:hover {\n  border-radius: 5px; }\n\n.lSSlideOuter .lSPager.lSGallery img {\n  display: block;\n  height: auto;\n  max-width: 100%; }\n\n.lSSlideOuter .lSPager.lSGallery:before,\n.lSSlideOuter .lSPager.lSGallery:after {\n  content: \" \";\n  display: table; }\n\n.lSSlideOuter .lSPager.lSGallery:after {\n  clear: both; }\n\n/* End of Gallery*/\n/* slider actions */\n.lSAction > a {\n  width: 32px;\n  display: block;\n  top: 50%;\n  height: 32px;\n  background-image: url(\"/assets/controls.png\");\n  cursor: pointer;\n  position: absolute;\n  z-index: 99;\n  margin-top: -16px;\n  opacity: 0.5;\n  -webkit-transition: opacity 0.35s linear 0s;\n  transition: opacity 0.35s linear 0s; }\n\n.lSAction > a:hover {\n  opacity: 1; }\n\n.lSAction > .lSPrev {\n  background-position: 0 0;\n  left: 10px; }\n\n.lSAction > .lSNext {\n  background-position: -32px 0;\n  right: 10px; }\n\n.lSAction > a.disabled {\n  pointer-events: none; }\n\n.cS-hidden {\n  height: 1px;\n  opacity: 0;\n  filter: alpha(opacity=0);\n  overflow: hidden; }\n\n/* vertical */\n.lSSlideOuter.vertical {\n  position: relative; }\n\n.lSSlideOuter.vertical.noPager {\n  padding-right: 0px !important; }\n\n.lSSlideOuter.vertical .lSGallery {\n  position: absolute !important;\n  right: 0;\n  top: 0; }\n\n.lSSlideOuter.vertical .lightSlider > * {\n  width: 100% !important;\n  max-width: none !important; }\n\n/* vertical controlls */\n.lSSlideOuter.vertical .lSAction > a {\n  left: 50%;\n  margin-left: -14px;\n  margin-top: 0; }\n\n.lSSlideOuter.vertical .lSAction > .lSNext {\n  background-position: 31px -31px;\n  bottom: 10px;\n  top: auto; }\n\n.lSSlideOuter.vertical .lSAction > .lSPrev {\n  background-position: 0 -31px;\n  bottom: auto;\n  top: 10px; }\n\n/* vertical */\n/* Rtl */\n.lSSlideOuter.lSrtl {\n  direction: rtl; }\n\n.lSSlideOuter .lightSlider,\n.lSSlideOuter .lSPager {\n  padding-left: 0;\n  list-style: none outside none; }\n\n.lSSlideOuter.lSrtl .lightSlider,\n.lSSlideOuter.lSrtl .lSPager {\n  padding-right: 0; }\n\n.lSSlideOuter .lightSlider > *,\n.lSSlideOuter .lSGallery li {\n  float: left; }\n\n.lSSlideOuter.lSrtl .lightSlider > *,\n.lSSlideOuter.lSrtl .lSGallery li {\n  float: right !important; }\n\n/* Rtl */\n@-webkit-keyframes rightEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: -15px; }\n  100% {\n    left: 0; } }\n\n@keyframes rightEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: -15px; }\n  100% {\n    left: 0; } }\n\n@-webkit-keyframes topEnd {\n  0% {\n    top: 0; }\n  50% {\n    top: -15px; }\n  100% {\n    top: 0; } }\n\n@keyframes topEnd {\n  0% {\n    top: 0; }\n  50% {\n    top: -15px; }\n  100% {\n    top: 0; } }\n\n@-webkit-keyframes leftEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: 15px; }\n  100% {\n    left: 0; } }\n\n@keyframes leftEnd {\n  0% {\n    left: 0; }\n  50% {\n    left: 15px; }\n  100% {\n    left: 0; } }\n\n@-webkit-keyframes bottomEnd {\n  0% {\n    bottom: 0; }\n  50% {\n    bottom: -15px; }\n  100% {\n    bottom: 0; } }\n\n@keyframes bottomEnd {\n  0% {\n    bottom: 0; }\n  50% {\n    bottom: -15px; }\n  100% {\n    bottom: 0; } }\n\n.lSSlideOuter .rightEnd {\n  -webkit-animation: rightEnd 0.3s;\n  animation: rightEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter .leftEnd {\n  -webkit-animation: leftEnd 0.3s;\n  animation: leftEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.vertical .rightEnd {\n  -webkit-animation: topEnd 0.3s;\n  animation: topEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.vertical .leftEnd {\n  -webkit-animation: bottomEnd 0.3s;\n  animation: bottomEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.lSrtl .rightEnd {\n  -webkit-animation: leftEnd 0.3s;\n  animation: leftEnd 0.3s;\n  position: relative; }\n\n.lSSlideOuter.lSrtl .leftEnd {\n  -webkit-animation: rightEnd 0.3s;\n  animation: rightEnd 0.3s;\n  position: relative; }\n\n/*/  GRab cursor */\n.lightSlider.lsGrab > * {\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: -o-grab;\n  cursor: -ms-grab;\n  cursor: grab; }\n\n.lightSlider.lsGrabbing > * {\n  cursor: move;\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: -o-grabbing;\n  cursor: -ms-grabbing;\n  cursor: grabbing; }\n\n/* Tiny Carousel */\n/* sliderNew */\n#sliderNew {\n  margin: 0 0 20px; }\n\n#sliderNew .viewport {\n  width: 240px;\n  height: 125px;\n  float: left;\n  overflow: hidden;\n  position: relative; }\n\n#sliderNew .bullets {\n  overflow: hidden;\n  list-style: none;\n  clear: both;\n  margin: 0 0 0 45px; }\n\n#sliderNew .bullets li {\n  float: left; }\n\n#sliderNew .bullet {\n  background-color: #fff;\n  text-decoration: none;\n  text-align: center;\n  padding: 5px;\n  color: #555555;\n  font-size: 14px;\n  font-weight: bold;\n  display: block; }\n\n#sliderNew .bullet.active {\n  color: #fff;\n  background-color: #555555; }\n\n#sliderNew .buttons {\n  background: #C01313;\n  border-radius: 35px;\n  display: block;\n  margin: 30px 10px 0 0;\n  float: left;\n  width: 35px;\n  height: 35px;\n  position: relative;\n  color: #fff;\n  font-weight: bold;\n  text-align: center;\n  line-height: 35px;\n  text-decoration: none;\n  font-size: 22px; }\n\n#sliderNew .next {\n  margin: 30px 0 0 10px; }\n\n#sliderNew .buttons:hover {\n  color: #C01313;\n  background: #fff; }\n\n#sliderNew .disable {\n  visibility: hidden; }\n\n#sliderNew .overview {\n  list-style: none;\n  position: absolute;\n  width: 240px;\n  left: 0;\n  top: 0; }\n\n#sliderNew .overview li {\n  float: left;\n  margin: 0 20px 0 0;\n  padding: 1px;\n  height: 121px;\n  border: 1px solid #dcdcdc;\n  width: 236px; }\n\n.ui-widget, .ui-widget * {\n  box-sizing: border-box; }\n\n.ui-helper-hidden {\n  display: none !important; }\n\n.ui-helper-hidden-accessible {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.ui-helper-hidden-accessible input,\n.ui-helper-hidden-accessible select {\n  transform: scale(0); }\n\n.ui-helper-reset {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  line-height: 1.3;\n  text-decoration: none;\n  font-size: 100%;\n  list-style: none; }\n\n.ui-helper-clearfix::before,\n.ui-helper-clearfix::after {\n  content: \"\";\n  display: table; }\n\n.ui-helper-clearfix::after {\n  clear: both; }\n\n.ui-helper-clearfix {\n  zoom: 1; }\n\n.ui-helper-zfix {\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  position: absolute;\n  opacity: 0;\n  filter: Alpha(Opacity=0); }\n\n.ui-state-disabled {\n  cursor: default !important; }\n\n.ui-state-disabled a {\n  cursor: default !important; }\n\n.ui-icon {\n  display: block;\n  text-indent: -99999px;\n  overflow: hidden;\n  background-repeat: no-repeat; }\n\n.ui-widget-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n.ui-resizable {\n  position: relative; }\n\n.ui-resizable-handle {\n  position: absolute;\n  font-size: 0.1px;\n  display: block; }\n\n.ui-resizable-disabled .ui-resizable-handle,\n.ui-resizable-autohide .ui-resizable-handle {\n  display: none; }\n\n.ui-resizable-n {\n  cursor: n-resize;\n  height: 7px;\n  width: 100%;\n  top: -5px;\n  left: 0; }\n\n.ui-resizable-s {\n  cursor: s-resize;\n  height: 7px;\n  width: 100%;\n  bottom: -5px;\n  left: 0; }\n\n.ui-resizable-e {\n  cursor: e-resize;\n  width: 7px;\n  right: -5px;\n  top: 0;\n  height: 100%; }\n\n.ui-resizable-w {\n  cursor: w-resize;\n  width: 7px;\n  left: -5px;\n  top: 0;\n  height: 100%; }\n\n.ui-resizable-se {\n  cursor: se-resize;\n  width: 12px;\n  height: 12px;\n  right: 1px;\n  bottom: 1px; }\n\n.ui-resizable-sw {\n  cursor: sw-resize;\n  width: 9px;\n  height: 9px;\n  left: -5px;\n  bottom: -5px; }\n\n.ui-resizable-nw {\n  cursor: nw-resize;\n  width: 9px;\n  height: 9px;\n  left: -5px;\n  top: -5px; }\n\n.ui-resizable-ne {\n  cursor: ne-resize;\n  width: 9px;\n  height: 9px;\n  right: -5px;\n  top: -5px; }\n\n.ui-shadow {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  -moz-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3); }\n\n.ui-unselectable-text {\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -o-user-select: none;\n  user-select: none; }\n\n.ui-scrollbar-measure {\n  width: 100px;\n  height: 100px;\n  overflow: scroll;\n  position: absolute;\n  top: -9999px; }\n\n.ui-overflow-hidden {\n  overflow: hidden; }\n\n::-webkit-input-placeholder {\n  /* WebKit, Blink, Edge */\n  color: #898989; }\n\n:-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #898989;\n  opacity: 1; }\n\n::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #898989;\n  opacity: 1; }\n\n:-ms-input-placeholder {\n  /* Internet Explorer 10-11 */\n  color: #898989; }\n\n::-ms-input-placeholder {\n  /* Microsoft Edge */\n  color: #898989; }\n\n.ui-placeholder {\n  color: #898989; }\n\ninput[type=\"button\"],\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"file\"]::-webkit-file-upload-button,\nbutton {\n  -moz-border-radius: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0; }\n\n.ui-widget, .ui-widget * {\n  box-sizing: border-box; }\n\n.ui-helper-hidden {\n  display: none !important; }\n\n.ui-helper-hidden-accessible {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.ui-helper-hidden-accessible input,\n.ui-helper-hidden-accessible select {\n  transform: scale(0); }\n\n.ui-helper-reset {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  line-height: 1.3;\n  text-decoration: none;\n  font-size: 100%;\n  list-style: none; }\n\n.ui-helper-clearfix::before,\n.ui-helper-clearfix::after {\n  content: \"\";\n  display: table; }\n\n.ui-helper-clearfix::after {\n  clear: both; }\n\n.ui-helper-clearfix {\n  zoom: 1; }\n\n.ui-helper-zfix {\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  position: absolute;\n  opacity: 0;\n  filter: Alpha(Opacity=0); }\n\n.ui-state-disabled {\n  cursor: default !important; }\n\n.ui-state-disabled a {\n  cursor: default !important; }\n\n.ui-icon {\n  display: block;\n  text-indent: -99999px;\n  overflow: hidden;\n  background-repeat: no-repeat; }\n\n.ui-widget-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n.ui-resizable {\n  position: relative; }\n\n.ui-resizable-handle {\n  position: absolute;\n  font-size: 0.1px;\n  display: block; }\n\n.ui-resizable-disabled .ui-resizable-handle,\n.ui-resizable-autohide .ui-resizable-handle {\n  display: none; }\n\n.ui-resizable-n {\n  cursor: n-resize;\n  height: 7px;\n  width: 100%;\n  top: -5px;\n  left: 0; }\n\n.ui-resizable-s {\n  cursor: s-resize;\n  height: 7px;\n  width: 100%;\n  bottom: -5px;\n  left: 0; }\n\n.ui-resizable-e {\n  cursor: e-resize;\n  width: 7px;\n  right: -5px;\n  top: 0;\n  height: 100%; }\n\n.ui-resizable-w {\n  cursor: w-resize;\n  width: 7px;\n  left: -5px;\n  top: 0;\n  height: 100%; }\n\n.ui-resizable-se {\n  cursor: se-resize;\n  width: 12px;\n  height: 12px;\n  right: 1px;\n  bottom: 1px; }\n\n.ui-resizable-sw {\n  cursor: sw-resize;\n  width: 9px;\n  height: 9px;\n  left: -5px;\n  bottom: -5px; }\n\n.ui-resizable-nw {\n  cursor: nw-resize;\n  width: 9px;\n  height: 9px;\n  left: -5px;\n  top: -5px; }\n\n.ui-resizable-ne {\n  cursor: ne-resize;\n  width: 9px;\n  height: 9px;\n  right: -5px;\n  top: -5px; }\n\n.ui-shadow {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  -moz-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3); }\n\n.ui-unselectable-text {\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -o-user-select: none;\n  user-select: none; }\n\n.ui-scrollbar-measure {\n  width: 100px;\n  height: 100px;\n  overflow: scroll;\n  position: absolute;\n  top: -9999px; }\n\n.ui-overflow-hidden {\n  overflow: hidden; }\n\n::-webkit-input-placeholder {\n  /* WebKit, Blink, Edge */\n  color: #898989; }\n\n:-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #898989;\n  opacity: 1; }\n\n::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #898989;\n  opacity: 1; }\n\n:-ms-input-placeholder {\n  /* Internet Explorer 10-11 */\n  color: #898989; }\n\n::-ms-input-placeholder {\n  /* Microsoft Edge */\n  color: #898989; }\n\n.ui-placeholder {\n  color: #898989; }\n\ninput[type=\"button\"],\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"file\"]::-webkit-file-upload-button,\nbutton {\n  -moz-border-radius: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0; }\n\n/* Button */\n.ui-button {\n  display: inline-block;\n  position: relative;\n  padding: 0;\n  text-decoration: none !important;\n  cursor: pointer;\n  text-align: center;\n  zoom: 1;\n  overflow: visible;\n  /* the overflow property removes extra width in IE */ }\n\np-button {\n  display: inline-block; }\n\n/*button text element */\n.ui-button .ui-button-text {\n  display: block;\n  line-height: normal; }\n\n.ui-button-text-only .ui-button-text {\n  padding: .25em 1em; }\n\n.ui-button-icon-only .ui-button-text,\n.ui-button-text-empty .ui-button-text {\n  padding: .25em;\n  text-indent: -9999999px; }\n\n.ui-button-text-icon-left .ui-button-text {\n  padding: .25em 1em .25em 2.1em; }\n\n.ui-button-text-icon-right .ui-button-text {\n  padding: .25em 2.1em .25em 1em; }\n\n/*button icon element(s) */\n.ui-button-icon-only .ui-button-icon-left,\n.ui-button-text-icon-left .ui-button-icon-left,\n.ui-button-text-icon-right .ui-button-icon-right {\n  position: absolute;\n  top: 50%;\n  margin-top: -.5em;\n  height: 1em; }\n\n.ui-button-icon-only .ui-button-icon-left {\n  top: 50%;\n  left: 50%;\n  margin-top: -.5em;\n  margin-left: -.5em;\n  width: 1em;\n  height: 1em; }\n\n.ui-button-icon-left {\n  left: .5em; }\n\n.ui-button-icon-right {\n  right: .5em; }\n\n/*button sets*/\n.ui-buttonset .ui-button {\n  margin-left: 0;\n  margin-right: 0; }\n\n/* workarounds */\nbutton.ui-button::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n  /* reset extra padding in Firefox */ }\n\n/** Fluid **/\n.ui-fluid .ui-button {\n  width: 100%; }\n\n.ui-fluid .ui-button-text-icon-left .ui-button-text,\n.ui-fluid .ui-button-text-icon-right .ui-button-text {\n  padding-left: 1em;\n  padding-right: 1em; }\n\n/** ButtonSet **/\n.ui-fluid .ui-buttonset {\n  width: 100%; }\n\n.ui-fluid .ui-buttonset.ui-buttonset-1 .ui-button {\n  width: 100%; }\n\n.ui-fluid .ui-buttonset.ui-buttonset-2 .ui-button {\n  width: 50%; }\n\n.ui-fluid .ui-buttonset.ui-buttonset-3 .ui-button {\n  width: 33.3%; }\n\n.ui-fluid .ui-buttonset.ui-buttonset-4 .ui-button {\n  width: 25%; }\n\n.ui-fluid .ui-buttonset.ui-buttonset-5 .ui-button {\n  width: 20%; }\n\n.ui-fluid .ui-buttonset.ui-buttonset-6 .ui-button {\n  width: 16.6%; }\n\n@media (max-width: 640px) {\n  .ui-fluid .ui-buttonset.ui-buttonset-1 .ui-button,\n  .ui-fluid .ui-buttonset.ui-buttonset-2 .ui-button,\n  .ui-fluid .ui-buttonset.ui-buttonset-3 .ui-button,\n  .ui-fluid .ui-buttonset.ui-buttonset-4 .ui-button,\n  .ui-fluid .ui-buttonset.ui-buttonset-5 .ui-button,\n  .ui-fluid .ui-buttonset.ui-buttonset-6 .ui-button {\n    width: 100%; } }\n\nce-checkbox {\n  vertical-align: middle; }\n\nce-label {\n  vertical-align: middle;\n  display: inline-block;\n  font-weight: bold;\n  font-family: sans-serif;\n  font-size: 20px;\n  margin-left: 8px; }\n\nce-accordion-heading {\n  background-color: white;\n  border: 1px solid black; }\n\nce-accordion-heading + ce-accordion-heading {\n  border-top: none; }\n\nce-accordion-heading[expanded] {\n  background-color: bisque; }\n\nce-accordion-panel {\n  padding: 20px;\n  background-color: lightgray; }\n\nce-tab {\n  border: 1px solid black;\n  padding: 20px; }\n\nce-tab-panel {\n  padding: 20px;\n  background-color: lightgray; }\n\nce-tab[selected] {\n  background-color: bisque; }\n\nce-tabs:not(:defined),\nce-tab:not(:defined),\nce-tab-panel:not(:defined) {\n  display: block; }\n\nce-toggle-button {\n  background-color: #eee;\n  padding: 3px;\n  cursor: default;\n  user-select: none;\n  border: 1px solid #333;\n  border-radius: 3px;\n  transition: background-color .2s ease; }\n\nce-toggle-button[pressed],\nce-toggle-button:not([disabled]):active {\n  background-color: #999; }\n\nce-toggle-button[disabled] {\n  opacity: 0.35; }\n\nhtml, body {\n  padding: 0;\n  margin: 0; }\n  html *, body * {\n    box-sizing: border-box; }\n\n.ui-demo {\n  display: flex;\n  height: 100%;\n  min-height: 100vh;\n  width: 100%; }\n  .ui-demo .sidenav {\n    flex-basis: 300px;\n    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3); }\n  .ui-demo .content {\n    flex: 1;\n    border-left: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 20px; }\n\nui-router {\n  display: block;\n  width: 100%; }\n\n.ui-elements {\n  padding: 0;\n  margin: 0;\n  list-style-type: none;\n  background: #fafafa; }\n  .ui-elements__item {\n    border-bottom: 1px solid #ccc;\n    transition: box-shadow .3s linear;\n    position: relative;\n    box-sizing: border-box; }\n    .ui-elements__item a {\n      padding: 10px 20px;\n      display: inline-block;\n      width: 100%; }\n    .ui-elements__item:hover {\n      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.3);\n      border-bottom: 1px solid #fff; }\n      .ui-elements__item:hover:before {\n        content: '';\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        height: 100%;\n        width: 5px;\n        background: #2f62a3; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/switch/switch.scss":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--4-2!./src/app/switch/switch.scss ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".ui-inputswitch {\n  position: relative;\n  display: inline-block;\n  width: 3em;\n  height: 1.75em; }\n\n.ui-inputswitch-slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-transition: .3s;\n  transition: .3s;\n  border-radius: 30px; }\n\n.ui-inputswitch-slider:before {\n  position: absolute;\n  content: \"\";\n  height: 1.250em;\n  width: 1.250em;\n  left: .25em;\n  bottom: .25em;\n  border-radius: 50%;\n  -webkit-transition: .3s;\n  transition: .3s; }\n\n.ui-inputswitch-checked .ui-inputswitch-slider:before {\n  -webkit-transform: translateX(1.25em);\n  -ms-transform: translateX(1.25em);\n  transform: translateX(1.25em); }\n\n.ui-inputswitch.ui-state-disabled .ui-inputswitch-slider,\n.ui-inputswitch-readonly .ui-inputswitch-slider {\n  cursor: default; }\n", ""]);



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

/***/ "./node_modules/css-loader/dist/runtime/url-escape.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/url-escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot":
/*!*****************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.eot ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fontawesome-webfont.674f50d287a8c48dc19b.eot";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0":
/*!*************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0 ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fontawesome-webfont.674f50d287a8c48dc19b.eot";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0":
/*!*************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0 ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fontawesome-webfont.912ec66d7572ff821749.svg";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0":
/*!*************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0 ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fontawesome-webfont.b06871f281fee6b241d6.ttf";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0":
/*!***************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0 ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fontawesome-webfont.af7ae505a9eed503f8b8.woff2";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0":
/*!**************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0 ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fontawesome-webfont.fee66e712a8a08eef580.woff";

/***/ }),

/***/ "./node_modules/primeicons/fonts/primeicons.eot":
/*!******************************************************!*\
  !*** ./node_modules/primeicons/fonts/primeicons.eot ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "primeicons.b8eccb1059ea5faaf6d8.eot";

/***/ }),

/***/ "./node_modules/primeicons/fonts/primeicons.svg":
/*!******************************************************!*\
  !*** ./node_modules/primeicons/fonts/primeicons.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "primeicons.38d77552b0353684a208.svg";

/***/ }),

/***/ "./node_modules/primeicons/fonts/primeicons.ttf":
/*!******************************************************!*\
  !*** ./node_modules/primeicons/fonts/primeicons.ttf ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "primeicons.473e2a746d3c151d7dca.ttf";

/***/ }),

/***/ "./node_modules/primeicons/fonts/primeicons.woff":
/*!*******************************************************!*\
  !*** ./node_modules/primeicons/fonts/primeicons.woff ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "primeicons.71bb3d79dcf18b45ae84.woff";

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

var classMap = function classMap(classObj) {
  return Object.keys(classObj).filter(function (clz) {
    return classObj[clz];
  }).join(' ');
};

var styleMap = function styleMap(styleObj) {
  return Object.keys(styleObj).filter(function (style) {
    return styleObj[style];
  }).join(' ');
};

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
      return ['disabled', 'icon-pos', 'icon'];
    }
  }]);

  function Button() {
    var _this;

    _classCallCheck(this, Button);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this));

    _this._attributeSetup();

    _this._render();

    return _this;
  }

  _createClass(Button, [{
    key: "_attributeSetup",
    value: function _attributeSetup() {
      this._iconPos = this.getAttribute('icon-pos') || 'left';
      this._iconClass = this.getAttribute('icon');
      this._isDisabled = this.hasAttribute('disabled');
      this._isIconOnly = this.hasAttribute('icon-only');
      this._styles = this.getAttribute('style');
      this._styleClass = this.getAttribute('class');
    }
  }, {
    key: "_render",
    value: function _render() {
      this.innerHTML = "\n      <button type=\"button\" class=\"".concat(classMap({
        'ui-button ui-widget ui-state-default ui-corner-all': true,
        'ui-button-text-icon-left': this._iconPos === 'left',
        'ui-button-text-icon-right': this._iconPos === 'right',
        'ui-button-icon-only': this._isIconOnly,
        'ui-state-disabled': this._isDisabled
      }), "\">\n        <span class=\"").concat(classMap({
        'js-icon-type': true,
        'ui-clickable': true,
        'ui-button-icon-left': this._iconPos === 'left',
        'ui-button-icon-right': this._iconPos === 'right'
      }), "\">\n        </span>\n        <span class=\"ui-button-text ui-clickable\">").concat(this.textContent || 'ui-btn', "</span>\n      </button>\n    ");
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.$icon = this.querySelector('.js-icon-type');
      this.$button = this.querySelector('button');

      if (this._iconClass) {
        this.$icon.className += ' ' + this._iconClass;
      } else {
        this.$icon.parentElement.removeChild(this.$icon);
      }

      if (this._styleClass) {
        this.$button.className += ' ' + this._styleClass;
      }

      if (this._styles) {
        this.$button.style = this._styles;
      }
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName && oldValue !== newValue) {
        this._attributeSetup();

        this._render();
      }
    }
  }]);

  return Button;
}(_wrapNativeSuper(HTMLElement));
customElements.define(Button.is, Button);

/***/ }),

/***/ "./src/app/ce-checkbox/checkbox.js":
/*!*****************************************!*\
  !*** ./src/app/ce-checkbox/checkbox.js ***!
  \*****************************************/
/*! exports provided: Checkbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Checkbox", function() { return Checkbox; });
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom-utils */ "./src/app/utils/dom-utils.js");
/* harmony import */ var _ce_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ce-element */ "./src/app/ce-element.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Checkbox =
/*#__PURE__*/
function (_CEElement) {
  _inherits(Checkbox, _CEElement);

  _createClass(Checkbox, null, [{
    key: "is",
    get: function get() {
      return 'ce-checkbox';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return ['value', 'name', 'disabled', 'checked', 'binary', 'label', 'tabindex', 'inputid', 'style', 'style-class', 'label-style-class'];
    }
  }]);

  function Checkbox() {
    var _this;

    _classCallCheck(this, Checkbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Checkbox).call(this));
    _this.$checkboxWpr =
    /** @type {HTMLElement} */
    null;
    _this.$checkboxBox =
    /** @type {HTMLElement} */
    null;
    _this.$checkboxLabel =
    /** @type {HTMLElement} */
    null;
    _this.$checkboxInput =
    /** @type {HTMLElement} */
    null;
    return _this;
  }

  _createClass(Checkbox, [{
    key: "_render",
    value: function _render() {
      _get(_getPrototypeOf(Checkbox.prototype), "_removeEventListeners", this).call(this);

      _get(_getPrototypeOf(Checkbox.prototype), "_copyObservedAttributes", this).call(this);

      console.log('checked: %o, disabled: %o, focused: %o', this.checked, this.disabled, this.focused);
      this.innerHTML = "\n      <div $checkbox-wpr class=\"ui-chkbox ui-widget\">\n        <div class=\"ui-helper-hidden-accessible\">\n          <input $checkbox-input type=\"checkbox\" \n            id=\"".concat(this.inputid, "\" \n            name=\"").concat(this.name, "\" \n            value=\"").concat(this.value, "\" \n            tabindex=\"").concat(this.tabindex || 1, "\"\n            class=\"").concat(this.focused ? 'ui-state-focus' : '', "\"\n            @click=\"_handleClickEvent\" \n            @focus=\"_handleFocusEvent\" \n            @blur=\"_handleBlurEvent\"\n            @change=\"_handleChangeEvent\">\n        </div>\n        <div $checkbox-box class=\"").concat(Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__["classMap"])({
        'ui-chkbox-box ui-widget': true,
        'ui-corner-all ui-state-default': true,
        'ui-state-active': this.checked,
        'ui-state-disabled': this.disabled,
        'ui-state-focus': this.focused
      }), "\">\n          <span class=\"").concat(Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__["classMap"])({
        'ui-chkbox-icon ': true,
        'ui-clickable': true,
        'pi pi-check': this.checked
      }), "\"></span>\n        </div>\n      </div>\n      <label $checkbox-label \n        @click=\"_handleClickEvent\" \n        class=\"").concat(Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__["classMap"])({
        'ui-chkbox-label': true,
        'ui-label-active': this.checked,
        'ui-label-disabled': this.disabled,
        'ui-label-focus': this.focused
      }), "\" for=\"").concat(this.inputid, "\">").concat(this.label, "\n      </label>\n    ");

      _get(_getPrototypeOf(Checkbox.prototype), "_attachElementRefs", this).call(this);

      _get(_getPrototypeOf(Checkbox.prototype), "_addEventListeners", this).call(this);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this._render();

      _get(_getPrototypeOf(Checkbox.prototype), "suppliedAttribues", this).forEach(function (attrName) {
        var camelizedName = Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__["toCamelCase"])(attrName);

        _this2._mapAttribute(camelizedName, _this2[camelizedName]);
      });
    }
  }, {
    key: "_handleClickEvent",
    value: function _handleClickEvent(evt) {
      evt.preventDefault();

      if (this.disabled) {
        return;
      }

      this.checked = !this.checked;
      this.$checkboxInput.focus();
    }
  }, {
    key: "_handleFocusEvent",
    value: function _handleFocusEvent(e) {
      this.focused = true;

      this._render();
    }
  }, {
    key: "_handleBlurEvent",
    value: function _handleBlurEvent(e) {
      this.focused = false;

      this._render();
    }
  }, {
    key: "_handleChangeEvent",
    value: function _handleChangeEvent(evt) {
      this.checked = evt.target.checked;
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName && oldValue !== newValue) {
        this[Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__["toCamelCase"])(attrName)] = newValue;

        this._render();

        this._mapAttribute(attrName, newValue);
      }
    }
  }, {
    key: "_mapAttribute",
    value: function _mapAttribute(attrName, attrValue) {
      switch (attrName) {
        case 'style':
          {
            console.log('got ', attrName);
            this.$checkboxWpr.style = attrValue;
          }
          ;
          break;

        case 'style-class':
          {
            console.log('got ', attrName);
            this.$checkboxWpr.classList.add(attrValue);
          }
          ;
          break;

        case 'label-style-class':
          {
            console.log('got ', attrName);
            this.$checkboxLabel.classList.add(attrValue);
          }
          ;
          break;

        case 'checked':
          {
            console.log('got ', attrName);
            this.$checkboxInput.setAttribute('checked', '');
          }
          ;
          break;

        case 'disabled':
          {
            console.log('got ', attrName);
            this.$checkboxInput.setAttribute('disabled', '');
          }
          ;
          break;
      }
    }
  }]);

  return Checkbox;
}(_ce_element__WEBPACK_IMPORTED_MODULE_1__["CEElement"]);
customElements.define(Checkbox.is, Checkbox);

/***/ }),

/***/ "./src/app/ce-checkbox/checkbox.scss":
/*!*******************************************!*\
  !*** ./src/app/ce-checkbox/checkbox.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./checkbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/ce-checkbox/checkbox.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./checkbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/ce-checkbox/checkbox.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./checkbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/ce-checkbox/checkbox.scss");

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

/***/ "./src/app/ce-element.js":
/*!*******************************!*\
  !*** ./src/app/ce-element.js ***!
  \*******************************/
/*! exports provided: CEElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CEElement", function() { return CEElement; });
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/dom-utils */ "./src/app/utils/dom-utils.js");
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


var CEElement =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CEElement, _HTMLElement);

  _createClass(CEElement, [{
    key: "suppliedAttribues",
    get: function get() {
      return this._suppliedAttribues;
    }
  }]);

  function CEElement() {
    var _this;

    _classCallCheck(this, CEElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CEElement).call(this));
    _this._elementEventQueue = [];
    _this._suppliedAttribues = [];
    _this._initialized = false;
    return _this;
  }

  _createClass(CEElement, [{
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this._removeEventListeners();
    }
  }, {
    key: "_copyObservedAttributes",
    value: function _copyObservedAttributes() {
      var _this2 = this;

      if (this._initialized) return;
      Array.from(this.attributes).forEach(function (attr) {
        _this2[Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__["toCamelCase"])(attr.name)] = attr.value || true;

        _this2._suppliedAttribues.push(attr.name);
      });
      this._initialized = true;
    }
  }, {
    key: "_attachElementRefs",
    value: function _attachElementRefs() {
      var _this3 = this;

      this._forEachElement(/^\$/, function (el, attr) {
        _this3[Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__["toCamelCase"])(attr.name)] = el;
      });
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this4 = this;

      this._forEachElement(/^@/, function (el, attr) {
        var targetFn = eval(_this4[attr.value]);
        var eventName = attr.name.replace(/^@/, '');
        el.addEventListener(eventName, targetFn.bind(_this4));

        _this4._elementEventQueue.push({
          el: el,
          eventName: eventName,
          targetFn: targetFn
        });
      });
    }
  }, {
    key: "_removeEventListeners",
    value: function _removeEventListeners() {
      this._elementEventQueue.forEach(function (obj) {
        obj.el.removeEventListener(obj.eventName, obj.targetFn);
      });
    }
  }, {
    key: "_forEachElement",
    value: function _forEachElement(REGEX, callbackFn) {
      Array.from(this.querySelectorAll('*')).forEach(function (el) {
        Array.from(el.attributes).filter(function (attr) {
          return REGEX.test(attr.name);
        }).forEach(function (attr) {
          return callbackFn(el, attr);
        });
      });
    }
  }]);

  return CEElement;
}(_wrapNativeSuper(HTMLElement));

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

/***/ "./src/app/chips/chips.js":
/*!********************************!*\
  !*** ./src/app/chips/chips.js ***!
  \********************************/
/*! exports provided: Chips */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chips", function() { return Chips; });
/* harmony import */ var _ce_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ce-element */ "./src/app/ce-element.js");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom-utils */ "./src/app/utils/dom-utils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Chips =
/*#__PURE__*/
function (_CEElement) {
  _inherits(Chips, _CEElement);

  _createClass(Chips, null, [{
    key: "is",
    get: function get() {
      return 'ce-chips';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return ['disabled'];
    }
  }]);

  function Chips() {
    var _this;

    _classCallCheck(this, Chips);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Chips).call(this));
    _this.style =
    /** @type {Attribute} */
    '';
    _this.styleClass =
    /** @type {Attribute} */
    '';
    _this.disabled =
    /** @type {Attribute} */
    false;
    _this.field =
    /** @type {Attribute} */
    '';
    _this.placeholder =
    /** @type {Attribute} */
    'Select...';
    _this.max =
    /** @type {Attribute} */
    3;
    _this.tabindex =
    /** @type {Attribute} */
    0;
    _this.inputId =
    /** @type {Attribute} */
    '';
    _this.allowDuplicate =
    /** @type {Attribute} */
    true;
    _this.inputStyle =
    /** @type {Attribute} */
    '';
    _this.inputStyleClass =
    /** @type {Attribute} */
    '';
    _this.addOnTab =
    /** @type {Attribute} */
    false;
    _this.addOnBlur =
    /** @type {Attribute} */
    false;
    _this.$inputText =
    /** @type {HTMLElement} */
    null;
    _this.value = [1, 2, 3];
    return _this;
  }

  _createClass(Chips, [{
    key: "_render",
    value: function _render() {
      _get(_getPrototypeOf(Chips.prototype), "_removeEventListeners", this).call(this);

      _get(_getPrototypeOf(Chips.prototype), "_copyObservedAttributes", this).call(this);

      this.innerHTML = "\n      <div class=\"".concat(Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__["classMap"])({
        'ui-chips ui-widget': true
      }), "\" \n        @click=\"_handleClickEvent\">\n        <ul class=\"").concat(Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__["classMap"])({
        'ui-inputtext ui-state-default ui-corner-all': true,
        'ui-state-focus': this.focus,
        'ui-state-disabled': this.disabled
      }), "\">\n\n          ").concat(Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__["repeat"])(this.value, function (item, i) {
        return "\n            <li class=\"ui-chips-token ui-state-highlight ui-corner-all\" \n              item=\"".concat(item, "\" item-index=\"").concat(i, "\" \n              @click=\"_handleItemClick\">\n                <span class=\"ui-chips-token-icon pi pi-fw pi-times\" \n                  @click=\"_handleItemRemove\"></span>\n                <span class=\"ui-chips-token-label\">").concat(item, "</span>\n            </li>\n          ");
      }), "\n          \n          <li class=\"ui-chips-input-token\">\n            <input $input-text type=\"text\" id=\"").concat(this.inputid, "\" \n              placeholder=\"").concat(this.placeholder, "\" \n              tabindex=\"").concat(this.tabindex, "\" \n              @keydown=\"_handleKeydownEvent\" \n              @focus=\"_handleInputFocusEvent\" \n              @blur=\"_handleInputBlurEvent\">\n          </li>\n        </ul>\n      </div>\n    ");

      _get(_getPrototypeOf(Chips.prototype), "_attachElementRefs", this).call(this);

      _get(_getPrototypeOf(Chips.prototype), "_addEventListeners", this).call(this);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this._render();
    }
  }, {
    key: "_handleClickEvent",
    value: function _handleClickEvent(evt) {
      evt.stopPropagation();
      this.focus = true;
      this.$inputText.focus();
    }
  }, {
    key: "_handleKeydownEvent",
    value: function _handleKeydownEvent(evt) {
      switch (evt.which) {
        case _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__["KeyCode"].BACKSPACE:
          this._handleItemRemove(evt);

          break;

        case _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__["KeyCode"].ENTER:
          this._addItem(evt, this.$inputText.value);

          break;

        default:
          'handle max value';
          break;
      }
    }
  }, {
    key: "_handleInputFocusEvent",
    value: function _handleInputFocusEvent(evt) {
      this.focus = true;
    }
  }, {
    key: "_handleInputBlurEvent",
    value: function _handleInputBlurEvent(evt) {
      evt.stopPropagation();
      this.focus = false;

      if (this.$inputText.value) {
        this._addItem(evt, this.$inputText.value);
      }
    }
  }, {
    key: "_handleItemRemove",
    value: function _handleItemRemove(evt) {
      var _this2 = this;

      if (this.disabled) return;

      if (this.$inputText.value.length === 0) {
        var targetElement = evt.target.tagName === 'INPUT' ? evt.target.parentElement.previousElementSibling : evt.target.parentElement;
        var index = Number(targetElement.getAttribute('item-index'));
        this.value = this.value.filter(function (val, i) {
          return i != index;
        });
        this.dispatchEvent(new CustomEvent('chips:removed', {
          originalEvent: event,
          value: this.value[index]
        }));

        this._render();

        requestAnimationFrame(function (_) {
          return _this2.$inputText.focus();
        });
      }
    }
  }, {
    key: "_handleItemClick",
    value: function _handleItemClick(evt) {
      var customEvent = new CustomEvent('chips:click', {
        originalEvent: event,
        value: evt.target
      });
      this.dispatchEvent(customEvent);
    }
  }, {
    key: "_addItem",
    value: function _addItem(event, item) {
      var _this3 = this;

      this.value = this.value || [];

      if (item && item.trim().length) {
        if (!this.value.includes(item)) {
          this.value = [].concat(_toConsumableArray(this.value), [item]);
          this.dispatchEvent(new CustomEvent('chips:added', {
            originalEvent: event,
            value: item
          }));

          this._render();

          this.$inputText.value = '';
          requestAnimationFrame(function (_) {
            return _this3.$inputText.focus();
          });
        }
      }
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {}
  }]);

  return Chips;
}(_ce_element__WEBPACK_IMPORTED_MODULE_0__["CEElement"]);
customElements.define(Chips.is, Chips);

/***/ }),

/***/ "./src/app/chips/chips.scss":
/*!**********************************!*\
  !*** ./src/app/chips/chips.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./chips.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/chips/chips.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./chips.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/chips/chips.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./chips.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/chips/chips.scss");

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

/***/ "./src/app/message/message.js":
/*!************************************!*\
  !*** ./src/app/message/message.js ***!
  \************************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
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

var Message =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(Message, _HTMLElement);

  _createClass(Message, null, [{
    key: "is",
    get: function get() {
      return 'ce-message';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return ['disabled'];
    }
  }]);

  function Message() {
    var _this;

    _classCallCheck(this, Message);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Message).call(this));
    _this._icons = {
      'success': 'pi pi-check',
      'info': 'pi pi-info-circle',
      'error': 'pi pi-times',
      'warn': 'pi pi-exclamation-triangle',
      'default': 'pi pi-info-circle'
    };
    _this.severity =
    /** @type {Attribute} */
    'info';
    _this.text =
    /** @type {Attribute} */
    '';
    return _this;
  }

  _createClass(Message, [{
    key: "_render",
    value: function _render() {
      this.innerHTML = "\n      <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all\"\n        class=\"ui-message-".concat(this.severity, "\">\n        <span class=\"ui-message-icon ").concat(this._icons[this.severity], "\"></span>\n        <span class=\"ui-message-text\">").concat(this.text, "</span>\n      </div>\n    ");
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this._render();
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {}
  }]);

  return Message;
}(_wrapNativeSuper(HTMLElement));
customElements.define(Message.is, Message);

/***/ }),

/***/ "./src/app/message/message.scss":
/*!**************************************!*\
  !*** ./src/app/message/message.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./message.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/message/message.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./message.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/message/message.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./message.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/message/message.scss");

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

/***/ "./src/app/switch/switch.js":
/*!**********************************!*\
  !*** ./src/app/switch/switch.js ***!
  \**********************************/
/*! exports provided: Switch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return Switch; });
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom-utils */ "./src/app/utils/dom-utils.js");
/* harmony import */ var _ce_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ce-element */ "./src/app/ce-element.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Switch =
/*#__PURE__*/
function (_CEElement) {
  _inherits(Switch, _CEElement);

  _createClass(Switch, null, [{
    key: "is",
    get: function get() {
      return 'ce-switch';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return ['disabled'];
    }
  }]);

  function Switch() {
    var _this;

    _classCallCheck(this, Switch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Switch).call(this));
    _this.style =
    /** @type {Attribute} */
    '';
    _this.styleClass =
    /** @type {Attribute} */
    '';
    _this.tabindex =
    /** @type {Attribute} */
    0;
    _this.inputId =
    /** @type {Attribute} */
    '';
    _this.name =
    /** @type {Attribute} */
    '';
    _this.disabled =
    /** @type {Attribute} */
    false;
    _this.readonly =
    /** @type {Attribute} */
    false;
    _this.$inputCheckbox =
    /** @type {HTMLElement} */
    null;
    _this.checked = false;
    _this.focused = false;
    return _this;
  }

  _createClass(Switch, [{
    key: "_render",
    value: function _render() {
      _get(_getPrototypeOf(Switch.prototype), "_removeEventListeners", this).call(this);

      _get(_getPrototypeOf(Switch.prototype), "_copyObservedAttributes", this).call(this);

      this.innerHTML = "\n      <div class=\"".concat(Object(_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__["classMap"])({
        'ui-inputswitch ui-widget': true,
        'ui-inputswitch-checked': this.checked,
        'ui-state-disabled': this.disabled,
        'ui-inputswitch-readonly': this.readonly,
        'ui-inputswitch-focus': this.focused
      }), "\" \n        @click=\"_handleClickEvent\" \n        role=\"checkbox\" aria-checked=\"").concat(this.checked, "\">\n        <div class=\"ui-helper-hidden-accessible\">\n          <input $input-checkbox type=\"checkbox\" id=\"").concat(this.inputId, "\" \n            name=\"").concat(this.name, "\" tabindex=\"tabindex\" checked=\"").concat(this.checked, "\" \n            @change=\"_handleInputChange\"\n            @focus=\"_handleFocusEvent\" \n            @blur=\"_handleBlurEvent\" \n            disabled=\"").concat(this.disabled, "\"/>\n        </div>\n        <span class=\"ui-inputswitch-slider\"></span>\n      </div>\n    ");

      _get(_getPrototypeOf(Switch.prototype), "_attachElementRefs", this).call(this);

      _get(_getPrototypeOf(Switch.prototype), "_addEventListeners", this).call(this);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this._render();
    }
  }, {
    key: "_handleClickEvent",
    value: function _handleClickEvent(evt) {
      if (!this.disabled && !this.readonly) {
        this._toggle(event);
      }
    }
  }, {
    key: "_handleInputChange",
    value: function _handleInputChange(evt) {
      if (!this.readonly) {
        this._toggle(evt);
      }
    }
  }, {
    key: "_handleFocusEvent",
    value: function _handleFocusEvent(evt) {
      this.focus = true;
    }
  }, {
    key: "_handleBlurEvent",
    value: function _handleBlurEvent(evt) {
      this.focus = false;
    }
  }, {
    key: "_toggle",
    value: function _toggle(event) {
      this.checked = !this.checked;
      this.dispatchEvent(new CustomEvent('switch:toggle', {
        originalEvent: event,
        checked: this.checked
      }));

      this._render();

      this.$inputCheckbox.focus();
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {}
  }]);

  return Switch;
}(_ce_element__WEBPACK_IMPORTED_MODULE_1__["CEElement"]);
customElements.define(Switch.is, Switch);

/***/ }),

/***/ "./src/app/switch/switch.scss":
/*!************************************!*\
  !*** ./src/app/switch/switch.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./switch.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/switch/switch.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./switch.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/switch/switch.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js??ref--4-2!./switch.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/app/switch/switch.scss");

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

/***/ "./src/app/utils/dom-utils.js":
/*!************************************!*\
  !*** ./src/app/utils/dom-utils.js ***!
  \************************************/
/*! exports provided: repeat, classMap, styleMap, toCamelCase, toSnakeCase, KeyCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return repeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classMap", function() { return classMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleMap", function() { return styleMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCamelCase", function() { return toCamelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toSnakeCase", function() { return toSnakeCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCode", function() { return KeyCode; });
var repeat = function repeat(list, tpl) {
  return list.reduce(function (t, it, i) {
    return t + tpl(it, i);
  }, '');
};
var classMap = function classMap(classObj) {
  return Object.keys(classObj).filter(function (clz) {
    return classObj[clz] || '';
  }).join(' ');
};
var styleMap = function styleMap(styleObj) {
  return Object.keys(styleObj).filter(function (style) {
    return styleObj[style];
  }).join(' ');
};
var toCamelCase = function toCamelCase(str) {
  return str.replace(/(-[a-z])/g, function (t) {
    return t[1].toUpperCase();
  });
};
var toSnakeCase = function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, function (t) {
    return '-' + t.toLowerCase();
  });
};
var KeyCode = {
  BACKSPACE: 8,
  TAB: 9,
  CLEAR: 12,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17,
  ALT: 18,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACEBAR: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  INSERT: 45,
  DELETE: 46,
  HELP: 47,
  NUM_LOCK: 144
};

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
 * @Last Modified time: 2019-03-31 16:38:42
 */
__webpack_require__(/*! ./app/styles.scss */ "./src/app/styles.scss");

__webpack_require__(/*! ./app/slider/slider.scss */ "./src/app/slider/slider.scss");

__webpack_require__(/*! ./app/ce-checkbox/checkbox.scss */ "./src/app/ce-checkbox/checkbox.scss");

__webpack_require__(/*! ./app/chips/chips.scss */ "./src/app/chips/chips.scss");

__webpack_require__(/*! ./app/switch/switch.scss */ "./src/app/switch/switch.scss");

__webpack_require__(/*! ./app/message/message.scss */ "./src/app/message/message.scss");

__webpack_require__(/*! ./assets/es-slider */ "./src/assets/es-slider.js");

__webpack_require__(/*! ./app/ce-element */ "./src/app/ce-element.js");







window.customElements.define('ceb-checkbox', _app_checkbox_ce_checkbox__WEBPACK_IMPORTED_MODULE_0__["default"]);
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

__webpack_require__(/*! ./app/ce-checkbox/checkbox */ "./src/app/ce-checkbox/checkbox.js");

__webpack_require__(/*! ./app/chips/chips */ "./src/app/chips/chips.js");

__webpack_require__(/*! ./app/switch/switch */ "./src/app/switch/switch.js");

__webpack_require__(/*! ./app/message/message */ "./src/app/message/message.js");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ByaW1laWNvbnMvcHJpbWVpY29ucy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jZS1jaGVja2JveC9jaGVja2JveC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY2hpcHMvY2hpcHMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21lc3NhZ2UvbWVzc2FnZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2xpZGVyL3NsaWRlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zd2l0Y2gvc3dpdGNoLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90cmVlL3RyZWUuc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS91cmwtZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb250LWF3ZXNvbWUvZm9udHMvZm9udGF3ZXNvbWUtd2ViZm9udC5lb3QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9mb250cy9mb250YXdlc29tZS13ZWJmb250LmVvdD9hNTQ4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb250LWF3ZXNvbWUvZm9udHMvZm9udGF3ZXNvbWUtd2ViZm9udC5zdmciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9mb250cy9mb250YXdlc29tZS13ZWJmb250LnR0ZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9udC1hd2Vzb21lL2ZvbnRzL2ZvbnRhd2Vzb21lLXdlYmZvbnQud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9mb250cy9mb250YXdlc29tZS13ZWJmb250LndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ByaW1laWNvbnMvZm9udHMvcHJpbWVpY29ucy5lb3QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ByaW1laWNvbnMvZm9udHMvcHJpbWVpY29ucy5zdmciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ByaW1laWNvbnMvZm9udHMvcHJpbWVpY29ucy50dGYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ByaW1laWNvbnMvZm9udHMvcHJpbWVpY29ucy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYWNjb3JkaW9uL2NlLWFjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2J1dHRvbi9idXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jZS1jaGVja2JveC9jaGVja2JveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NlLWNoZWNrYm94L2NoZWNrYm94LnNjc3M/NDQwYyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jaGVja2JveC9jZS1jaGVja2JveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NoaXBzL2NoaXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY2hpcHMvY2hpcHMuc2Nzcz84ODk2Iiwid2VicGFjazovLy8uL3NyYy9hcHAvZXZlbnQvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9saW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21lc3NhZ2UvbWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21lc3NhZ2UvbWVzc2FnZS5zY3NzPzQwYzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9yYWRpb2dyb3VwL2NlLXJhZGlvZ3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zbGlkZXIvY2Utc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2xpZGVyL3NsaWRlci1kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3NsaWRlci9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zbGlkZXIvc2xpZGVyLnNjc3M/N2Q4YiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3N0eWxlcy5zY3NzPzZiYWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zd2l0Y2gvc3dpdGNoLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc3dpdGNoL3N3aXRjaC5zY3NzP2NmM2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90YWJzL2NlLXRhYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RvZ2dsZS9jZS10b2dnbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90b29sdGlwL2NlLXRvb2x0aXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90cmVlL3RyZWUtZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RyZWUvdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RyZWUvdHJlZS5zY3NzPzhiZWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC91aS1yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC91dGlscy9kb20tdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9lcy1yZWZyZXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZXMtc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9lcy1zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkFDQ09SRElPTl9IRUFERVIiLCJBQ0NPUkRJT05fUEFORUwiLCJLRVlDT0RFIiwiRE9XTiIsIkxFRlQiLCJSSUdIVCIsIlVQIiwiSE9NRSIsIkVORCIsImFjY29yZGlvblRlbXBsYXRlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiQ2VBY2NvcmRpb24iLCJhdHRhY2hTaGFkb3ciLCJtb2RlIiwic2hhZG93Um9vdCIsImFwcGVuZENoaWxkIiwiY29udGVudCIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25DaGFuZ2UiLCJfb25LZXlEb3duIiwiUHJvbWlzZSIsImFsbCIsImN1c3RvbUVsZW1lbnRzIiwid2hlbkRlZmluZWQiLCJ0aGVuIiwiXyIsImhlYWRpbmdzIiwiX2FsbEhlYWRpbmdzIiwiZm9yRWFjaCIsImhlYWRpbmciLCJzZXRBdHRyaWJ1dGUiLCJwYW5lbCIsIl9wYW5lbEZvckhlYWRpbmciLCJpZCIsImV4cGFuZGVkIiwiX2NvbGxhcHNlSGVhZGluZyIsIl9jb2xsYXBzZVBhbmVsIiwiX2V4cGFuZEhlYWRpbmciLCJfZXhwYW5kUGFuZWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImV2ZW50IiwiX2FuaW1hdGVQYW5lbEZvckhlYWRpbmciLCJ0YXJnZXQiLCJkZXRhaWwiLCJpc0V4cGFuZGVkTm93IiwiZXhwYW5kIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJfYW5pbWF0ZUluIiwiX2FuaW1hdGVPdXQiLCJjdXJyZW50SGVhZGluZyIsIl9pc0hlYWRpbmciLCJhbHRLZXkiLCJuZXdIZWFkaW5nIiwia2V5Q29kZSIsIl9wcmV2SGVhZGluZyIsIl9uZXh0SGVhZGluZyIsIl9maXJzdEhlYWRpbmciLCJfbGFzdEhlYWRpbmciLCJwcmV2ZW50RGVmYXVsdCIsImZvY3VzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsIm5leHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJjb25zb2xlIiwiZXJyb3IiLCJuZXdJZHgiLCJmaW5kSW5kZXgiLCJhY3RpdmVFbGVtZW50IiwibGVuZ3RoIiwiaGVpZ2h0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiX2FuaW1hdGUiLCJzdGFydE9mZnNldCIsImVuZE9mZnNldCIsInJlc29sdmUiLCJhZGQiLCJjaGlsZHJlbiIsImlkeCIsImluZGV4T2YiLCJhbmltYXRlZENoaWxkcmVuIiwic2xpY2UiLCJzdHlsZSIsIm92ZXJmbG93IiwiY2hpbGQiLCJwb3NpdGlvbiIsInpJbmRleCIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2UiLCJ0cmFuc2l0aW9uRW5kUHJvbWlzZSIsInJlbW92ZSIsIkhUTUxFbGVtZW50IiwiaGVhZGluZ0lkQ291bnRlciIsImFjY29yZGlvbkhlYWRpbmdUZW1wbGF0ZSIsIkNlQWNjb3JkaW9uSGVhZGluZyIsIl9vbkNsaWNrIiwiYmluZCIsImRlbGVnYXRlc0ZvY3VzIiwiX3NoYWRvd0J1dHRvbiIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNBdHRyaWJ1dGUiLCJuYW1lIiwidmFsdWUiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJidWJibGVzIiwiQm9vbGVhbiIsInJlbW92ZUF0dHJpYnV0ZSIsImFjY29yZGlvblBhbmVsVGVtcGxhdGUiLCJwYW5lbElkQ291bnRlciIsIkNlQWNjb3JkaW9uUGFuZWwiLCJ2YWwiLCJlbGVtZW50IiwiZiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNsYXNzTWFwIiwiY2xhc3NPYmoiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwiY2x6Iiwiam9pbiIsInN0eWxlTWFwIiwic3R5bGVPYmoiLCJCdXR0b24iLCJfYXR0cmlidXRlU2V0dXAiLCJfcmVuZGVyIiwiX2ljb25Qb3MiLCJnZXRBdHRyaWJ1dGUiLCJfaWNvbkNsYXNzIiwiX2lzRGlzYWJsZWQiLCJfaXNJY29uT25seSIsIl9zdHlsZXMiLCJfc3R5bGVDbGFzcyIsInRleHRDb250ZW50IiwiJGljb24iLCIkYnV0dG9uIiwiY2xhc3NOYW1lIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwiYXR0ck5hbWUiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiZGVmaW5lIiwiaXMiLCJDaGVja2JveCIsIiRjaGVja2JveFdwciIsIiRjaGVja2JveEJveCIsIiRjaGVja2JveExhYmVsIiwiJGNoZWNrYm94SW5wdXQiLCJsb2ciLCJjaGVja2VkIiwiZGlzYWJsZWQiLCJmb2N1c2VkIiwiaW5wdXRpZCIsInRhYmluZGV4IiwibGFiZWwiLCJjYW1lbGl6ZWROYW1lIiwidG9DYW1lbENhc2UiLCJfbWFwQXR0cmlidXRlIiwiZXZ0IiwiZSIsImF0dHJWYWx1ZSIsIkNFRWxlbWVudCIsIl9zdXBwbGllZEF0dHJpYnVlcyIsIl9lbGVtZW50RXZlbnRRdWV1ZSIsIl9pbml0aWFsaXplZCIsIl9yZW1vdmVFdmVudExpc3RlbmVycyIsImF0dHJpYnV0ZXMiLCJhdHRyIiwicHVzaCIsIl9mb3JFYWNoRWxlbWVudCIsImVsIiwidGFyZ2V0Rm4iLCJldmFsIiwiZXZlbnROYW1lIiwicmVwbGFjZSIsIm9iaiIsIlJFR0VYIiwiY2FsbGJhY2tGbiIsInRlc3QiLCJTUEFDRSIsInRlbXBsYXRlIiwiQ2VDaGVja2JveCIsIl91cGdyYWRlUHJvcGVydHkiLCJfb25LZXlVcCIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSIsImhhc1ZhbHVlIiwiYmx1ciIsIl90b2dnbGVDaGVja2VkIiwiaXNDaGVja2VkIiwiaXNEaXNhYmxlZCIsIkNoaXBzIiwic3R5bGVDbGFzcyIsImZpZWxkIiwicGxhY2Vob2xkZXIiLCJtYXgiLCJpbnB1dElkIiwiYWxsb3dEdXBsaWNhdGUiLCJpbnB1dFN0eWxlIiwiaW5wdXRTdHlsZUNsYXNzIiwiYWRkT25UYWIiLCJhZGRPbkJsdXIiLCIkaW5wdXRUZXh0IiwicmVwZWF0IiwiaXRlbSIsImkiLCJzdG9wUHJvcGFnYXRpb24iLCJ3aGljaCIsIktleUNvZGUiLCJCQUNLU1BBQ0UiLCJfaGFuZGxlSXRlbVJlbW92ZSIsIkVOVEVSIiwiX2FkZEl0ZW0iLCJ0YXJnZXRFbGVtZW50IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImluZGV4IiwiTnVtYmVyIiwib3JpZ2luYWxFdmVudCIsImN1c3RvbUV2ZW50IiwidHJpbSIsImluY2x1ZGVzIiwiVWlFdmVudCIsImNpdHkiLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJhcHBseSIsImZ1bmN0aW9uQW5kUGFyYW1zIiwiZXhlYyIsInBhcmFtcyIsInNwbGl0Iiwid2luZG93Iiwib25sb2FkIiwiYmluZExpbmtzIiwibGlua3MiLCJsaW5rIiwiaGlqYWNrTGlua3MiLCJwYWdlIiwiX2xvYWRWaWV3IiwicGFnZVVybCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwibmV3RG9jIiwicmVzcG9uc2UiLCJyb3V0ZXJTbG90IiwicmVzcG9uc2VUeXBlIiwib3BlbiIsInNlbmQiLCJNZXNzYWdlIiwiX2ljb25zIiwic2V2ZXJpdHkiLCJ0ZXh0IiwicmFkaW9CdXR0b25UZW1wbGF0ZSIsIkNlUmFkaW9CdXR0b24iLCJyYWRpb0dyb3VwVGVtcGxhdGUiLCJDZVJhZGlvR3JvdXAiLCJmaXJzdENoZWNrZWRCdXR0b24iLCJjaGVja2VkUmFkaW9CdXR0b24iLCJfdW5jaGVja0FsbCIsIl9jaGVja05vZGUiLCJoYXNSb2xlUmFkaW8iLCJfc2V0Q2hlY2tlZFRvUHJldkJ1dHRvbiIsIl9zZXRDaGVja2VkVG9OZXh0QnV0dG9uIiwiX3NldENoZWNrZWQiLCJmaXJzdFJhZGlvQnV0dG9uIiwibGFzdFJhZGlvQnV0dG9uIiwibm9kZSIsInByZXYiLCJjaGVja2VkQnV0dG9uIiwiX3ByZXZSYWRpb0J1dHRvbiIsIl9uZXh0UmFkaW9CdXR0b24iLCJfZm9jdXNOb2RlIiwicmFkaW9CdXR0b25zIiwiYnRuIiwidGFiSW5kZXgiLCJDZVNsaWRlciIsInNsaWRlQ3VycmVudCIsInNsaWRlc1RvdGFsIiwiaW50ZXJ2YWxBY3RpdmUiLCJvcHRpb25zIiwic3RhcnQiLCJheGlzIiwiYnV0dG9ucyIsImJ1bGxldHMiLCJpbnRlcnZhbCIsImludGVydmFsVGltZSIsImFuaW1hdGlvbiIsImFuaW1hdGlvblRpbWUiLCJpbmZpbml0ZSIsIiRjb250YWluZXIiLCIkIiwiJHZpZXdwb3J0IiwiZmluZCIsIiRvdmVydmlldyIsIiRuZXh0IiwiJHByZXYiLCIkYnVsbGV0cyIsIiRzbGlkZXMiLCJ2aWV3cG9ydFNpemUiLCJjb250ZW50U3R5bGUiLCJzbGlkZXNWaXNpYmxlIiwic2xpZGVTaXplIiwic2xpZGVJbmRleCIsImlzSG9yaXpvbnRhbCIsInNpemVMYWJlbCIsInBvc2lMYWJlbCIsImludGVydmFsVGltZXIiLCJfaW5pdGlhbGl6ZSIsIl91cGRhdGUiLCJfbW92ZSIsIl9zZXRFdmVudHMiLCJmaXJzdCIsIk1hdGgiLCJjZWlsIiwiYXBwZW5kIiwiY2xvbmUiLCJhZGRDbGFzcyIsImNzcyIsIl9zZXRCdXR0b25zIiwiaXNOYU4iLCJhbmltYXRlIiwicXVldWUiLCJkdXJhdGlvbiIsImFsd2F5cyIsInRyaWdnZXIiLCJfc3RhcnQiLCJjbGljayIsInJlc2l6ZSIsIl9fc2VsZiIsIm9uIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInRvZ2dsZUNsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzZXR0aW5ncyIsImF1dG9XaWR0aCIsInNsaWRlTW92ZSIsInNsaWRlTWFyZ2luIiwidXNlQ1NTIiwiY3NzRWFzaW5nIiwiZWFzaW5nIiwic3BlZWQiLCJhdXRvIiwicGF1c2VPbkhvdmVyIiwibG9vcCIsInNsaWRlRW5kQW5pbWF0aW9uIiwicGF1c2UiLCJrZXlQcmVzcyIsImNvbnRyb2xzIiwicHJldkh0bWwiLCJuZXh0SHRtbCIsInJ0bCIsImFkYXB0aXZlSGVpZ2h0IiwidmVydGljYWwiLCJ2ZXJ0aWNhbEhlaWdodCIsInZUaHVtYldpZHRoIiwidGh1bWJJdGVtIiwicGFnZXIiLCJnYWxsZXJ5IiwiZ2FsbGVyeU1hcmdpbiIsInRodW1iTWFyZ2luIiwiY3VycmVudFBhZ2VyUG9zaXRpb24iLCJlbmFibGVUb3VjaCIsImVuYWJsZURyYWciLCJmcmVlTW92ZSIsInN3aXBlVGhyZXNob2xkIiwicmVzcG9uc2l2ZSIsIm9uQmVmb3JlU3RhcnQiLCIkZWwiLCJvblNsaWRlckxvYWQiLCJvbkJlZm9yZVNsaWRlIiwic2NlbmUiLCJvbkFmdGVyU2xpZGUiLCJvbkJlZm9yZU5leHRTbGlkZSIsIm9uQmVmb3JlUHJldlNsaWRlIiwiSW1hZ2VTbGlkZXIiLCJ3aW5kb3dXIiwib3V0ZXJXaWR0aCIsImJyZWFrcG9pbnQiLCJyZXNwb3NpdmVPYmoiLCJ3IiwiZWxTaXplIiwiJHNsaWRlIiwicHJvcGVydHkiLCJndXR0ZXIiLCJzbGlkZVZhbHVlIiwicGFnZXJXaWR0aCIsInNsaWRlV2lkdGgiLCJ0aHVtYldpZHRoIiwiaXNUb3VjaCIsImRvY3VtZW50RWxlbWVudCIsImxTU2xpZGVPdXRlciIsImxTU2xpZGVXcmFwcGVyIiwibFNQYWdlciIsImxpZ2h0U2xpZGVyIiwiY2hpbGROb2RlcyIsIl9yZWZyZXNoY2FsU1ciLCJfcmVmcmVzaHNTVyIsIl9zbGlkZVZhbHVlIiwibW92ZSIsInNldEhlaWdodCIsImRvQ3NzIiwiJGNoaWxkcmVuIiwiZmFkZU91dCIsImVxIiwiZmFkZUluIiwib2IiLCJ2IiwiX2RvQ3NzIiwidG9wIiwibGVmdCIsIiR0aHVtYiIsInBhcmVudCIsImFjdGl2ZSIsIl9zViIsInBhcnNlSW50Iiwid2lkdGgiLCJfY2FsV2lkdGgiLCJzdXBwb3J0IiwidHJhbnNpdGlvbiIsInJvb3QiLCJjbG4iLCJsbiIsIlN3aXRjaCIsInJlYWRvbmx5IiwiJGlucHV0Q2hlY2tib3giLCJfdG9nZ2xlIiwiQ2VUYWJzIiwiX29uU2xvdENoYW5nZSIsIl90YWJTbG90IiwiX3BhbmVsU2xvdCIsIl9saW5rUGFuZWxzIiwidGFicyIsIl9hbGxUYWJzIiwidGFiIiwic2VsZWN0ZWRUYWIiLCJzZWxlY3RlZCIsIl9zZWxlY3RUYWIiLCJwYW5lbElkIiwicGFuZWxzIiwiX2FsbFBhbmVscyIsImhpZGRlbiIsIm5ld1RhYiIsInJlc2V0IiwibmV3UGFuZWwiLCJfcGFuZWxGb3JUYWIiLCJFcnJvciIsIm5ld1BhbmVsSWQiLCJfcHJldlRhYiIsIl9uZXh0VGFiIiwiX2ZpcnN0VGFiIiwiX2xhc3RUYWIiLCJjZVRhYkNvdW50ZXIiLCJDZVRhYiIsImNlUGFuZWxDb3VudGVyIiwiQ2VUYWJQYW5lbCIsIkNlVG9nZ2xlQnV0dG9uIiwiX3RvZ2dsZVByZXNzZWQiLCJwcmVzc2VkIiwiaXNQcmVzc2VkIiwiQ2VUb29sdGlwIiwiX3Nob3ciLCJfaGlkZSIsIl90YXJnZXQiLCJUcmVlRGF0YSIsIlRyZWUiLCJfcmVuZGVyVHJlZSIsImRhdGEiLCJidWlsZE5vZGUiLCJyZWR1Y2UiLCJ0IiwiZCIsInR5cGUiLCJmb2xkZXJzIiwiaGFuZGxlQ2xpY2siLCJpc0V4cGFuZGVkIiwiVWlSb3V0ZXIiLCJsaXN0IiwidHBsIiwiaXQiLCJzdHIiLCJ0b1VwcGVyQ2FzZSIsInRvU25ha2VDYXNlIiwiVEFCIiwiQ0xFQVIiLCJTSElGVCIsIkNPTlRST0wiLCJBTFQiLCJDQVBTX0xPQ0siLCJFU0NBUEUiLCJTUEFDRUJBUiIsIlBBR0VfVVAiLCJQQUdFX0RPV04iLCJJTlNFUlQiLCJERUxFVEUiLCJIRUxQIiwiTlVNX0xPQ0siLCJkZWZhdWx0cyIsIlNsaWRlclJlZnJlc2giLCJqIiwic2V0dGluZ3NUZW1wIiwiaXNFbXB0eU9iamVjdCIsImsiLCJyb3VuZCIsInVuZGVmaW5lZCIsImZuIiwiZWFjaCIsInBsdWdpbiIsImV4dGVuZCIsInJlZnJlc2giLCJyZXR1cm5WYWx1ZSIsImdvVG9QcmV2U2xpZGUiLCJnb1RvTmV4dFNsaWRlIiwiYWZ0ZXIiLCJoaWRlIiwiY2FsV2lkdGgiLCJpbml0aWFsU3R5bGUiLCIkdGhpcyIsImNhbGwiLCJjaGJyZWFrcG9pbnQiLCJ3cmFwIiwiY2FsU1ciLCJ0V3IiLCJ0SSIsInRJdGVtIiwibiIsImFwcGVuZFRvIiwibSIsInByZXBlbmRUbyIsImhhc0NsYXNzIiwic1NXIiwiY2FsTCIsImNyZWF0ZVBhZ2VyIiwicGFnZXJzIiwidGh1bWIiLCJtaW5QZ3IiLCIkY1NvdXRlciIsImh0bWwiLCIkcGFnZXIiLCJzbGlkZVRodW1iIiwiY2wiLCJnTWFyZ2luIiwiaW5pdCIsImZhZGUiLCJzZXRDc3MiLCJ0SCIsIm91dGVySGVpZ2h0IiwidFAiLCJ0SFQiLCJjb21wbGV0ZSIsInNjIiwibCIsIm5sIiwic2xpZGUiLCJjYWxTbGlkZSIsInJlc2V0U2xpZGUiLCJzIiwidGh1bWJTbGlkZSIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInRvdWNoTW92ZSIsImVuZENvb3JkcyIsInN0YXJ0Q29vcmRzIiwiZGlzdGFuY2UiLCJzd2lwZVZhbCIsInN3aXBlVmFsVCIsInRvdWNoRW5kIiwibXhWYWwiLCJfbmV4dCIsImdDIiwiYWQiLCJudW0iLCJ0VyIsImlzRHJhZ2luZyIsInBhZ2VZIiwicGFnZVgiLCJzY3JvbGxMZWZ0IiwiYWJzIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwib2ZmIiwidGFyZ2V0VG91Y2hlcyIsIm9yaWciLCJ4TW92ZW1lbnQiLCJ5TW92ZW1lbnQiLCJidWlsZCIsInNob3ciLCJuZXh0SSIsIl90b3VjaCIsInBsYXkiLCJnZXRDdXJyZW50U2xpZGVDb3VudCIsImdldFRvdGFsU2xpZGVDb3VudCIsImdvVG9TbGlkZSIsImRlc3Ryb3kiLCJyZW1vdmVBdHRyIiwidW53cmFwIiwialF1ZXJ5IiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHVDQUF1QztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBYyx3Q0FBd0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0EsOENBQXNDLHVCQUF1Qjs7O0FBRzdEO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3J4QkEsMkJBQTJCLG1CQUFPLENBQUMsMkZBQXNDO0FBQ3pFO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMseUdBQTZDO0FBQ3JFLHlDQUF5QyxtQkFBTyxDQUFDLG1IQUEwQztBQUMzRix5Q0FBeUMsbUJBQU8sQ0FBQyxtR0FBa0M7QUFDbkYseUNBQXlDLG1CQUFPLENBQUMsdUhBQTRDO0FBQzdGLHlDQUF5QyxtQkFBTyxDQUFDLHFIQUEyQztBQUM1Rix5Q0FBeUMsbUJBQU8sQ0FBQyxtSEFBMEM7QUFDM0YseUNBQXlDLG1CQUFPLENBQUMsbUhBQTBDOztBQUUzRjtBQUNBLGNBQWMsUUFBUyxzTEFBc0wsMEJBQTBCLDBDQUEwQyw4UkFBOFIsbUJBQW1CLGtCQUFrQixJQUFJLHFCQUFxQiw2Q0FBNkMsa0JBQWtCLG9CQUFvQixtQ0FBbUMsa0NBQWtDLE9BQU8sdUJBQXVCLGtCQUFrQixvQkFBb0IsT0FBTyxjQUFjLE9BQU8sY0FBYyxPQUFPLGNBQWMsT0FBTyxjQUFjLE9BQU8sbUJBQW1CLGtCQUFrQixPQUFPLGVBQWUseUJBQXlCLHFCQUFxQixVQUFVLGtCQUFrQixPQUFPLGtCQUFrQixtQkFBbUIsbUJBQW1CLGdCQUFnQixrQkFBa0IsYUFBYSxtQkFBbUIsV0FBVyx5QkFBeUIsd0JBQXdCLG1CQUFtQixjQUFjLFdBQVcsZUFBZSxZQUFZLGlCQUFpQixrQkFBa0Isa0JBQWtCLGlCQUFpQixZQUFZLFlBQVksV0FBVyxXQUFXLGNBQWMsa0JBQWtCLGVBQWUsaUJBQWlCLFNBQVMsNkNBQTZDLHFDQUFxQyxVQUFVLCtDQUErQyx1Q0FBdUMsMkJBQTJCLEdBQUcsK0JBQStCLHVCQUF1QixLQUFLLGlDQUFpQywwQkFBMEIsbUJBQW1CLEdBQUcsK0JBQStCLHVCQUF1QixLQUFLLGlDQUFpQywwQkFBMEIsY0FBYyx3RUFBd0UsZ0NBQWdDLDRCQUE0Qix3QkFBd0IsZUFBZSx3RUFBd0UsaUNBQWlDLDZCQUE2Qix5QkFBeUIsZUFBZSx3RUFBd0UsaUNBQWlDLDZCQUE2Qix5QkFBeUIsb0JBQW9CLGtGQUFrRiwrQkFBK0IsMkJBQTJCLHVCQUF1QixrQkFBa0Isa0ZBQWtGLCtCQUErQiwyQkFBMkIsdUJBQXVCLGdIQUFnSCxZQUFZLFVBQVUsa0JBQWtCLHFCQUFxQixVQUFVLFdBQVcsZ0JBQWdCLHNCQUFzQiwwQkFBMEIsa0JBQWtCLE9BQU8sV0FBVyxrQkFBa0IsYUFBYSxvQkFBb0IsYUFBYSxjQUFjLFlBQVksV0FBVyxpQkFBaUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsa0JBQWtCLG1CQUFtQixzQkFBc0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGNBQWMsbUJBQW1CLG1CQUFtQixtQkFBbUIsaUJBQWlCLG1CQUFtQixvREFBb0QsbUJBQW1CLHVCQUF1QixtQkFBbUIsd0JBQXdCLG1CQUFtQixxQkFBcUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsK0JBQStCLG1CQUFtQixtQkFBbUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsa0JBQWtCLG1CQUFtQixtQkFBbUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsb0JBQW9CLG1CQUFtQiwrQkFBK0IsbUJBQW1CLDZCQUE2QixtQkFBbUIsaUJBQWlCLG1CQUFtQix5QkFBeUIsbUJBQW1CLDBDQUEwQyxtQkFBbUIsbUJBQW1CLG1CQUFtQixvQkFBb0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsdUJBQXVCLG1CQUFtQixxQkFBcUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsbUJBQW1CLG1CQUFtQixlQUFlLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsb0JBQW9CLG1CQUFtQixpQkFBaUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsdUJBQXVCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsd0JBQXdCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHlCQUF5QixtQkFBbUIsZ0JBQWdCLG1CQUFtQixxQ0FBcUMsbUJBQW1CLGtCQUFrQixtQkFBbUIsd0JBQXdCLG1CQUFtQix1REFBdUQsbUJBQW1CLGtCQUFrQixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsMkNBQTJDLG1CQUFtQiwwQkFBMEIsbUJBQW1CLDBCQUEwQixtQkFBbUIsa0JBQWtCLG1CQUFtQix5QkFBeUIsbUJBQW1CLHlCQUF5QixtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixtQkFBbUIsbUJBQW1CLHdCQUF3QixtQkFBbUIsd0JBQXdCLG1CQUFtQixpQkFBaUIsbUJBQW1CLHdCQUF3QixtQkFBbUIseUJBQXlCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHdCQUF3QixtQkFBbUIsd0JBQXdCLG1CQUFtQix3QkFBd0IsbUJBQW1CLDJCQUEyQixtQkFBbUIsdUJBQXVCLG1CQUFtQixzQkFBc0IsbUJBQW1CLDBCQUEwQixtQkFBbUIsMEJBQTBCLG1CQUFtQixlQUFlLG1CQUFtQixzQkFBc0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsb0JBQW9CLG1CQUFtQixzQkFBc0IsbUJBQW1CLHlDQUF5QyxtQkFBbUIsa0JBQWtCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsaUJBQWlCLG1CQUFtQixvQkFBb0IsbUJBQW1CLDhCQUE4QixtQkFBbUIsZ0JBQWdCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsZUFBZSxtQkFBbUIscUJBQXFCLG1CQUFtQixtREFBbUQsbUJBQW1CLGlCQUFpQixtQkFBbUIsb0JBQW9CLG1CQUFtQixrQkFBa0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHdCQUF3QixtQkFBbUIsbUJBQW1CLG1CQUFtQix5QkFBeUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsdUJBQXVCLG1CQUFtQixvQkFBb0IsbUJBQW1CLG9CQUFvQixtQkFBbUIsNENBQTRDLG1CQUFtQiwwQkFBMEIsbUJBQW1CLDJCQUEyQixtQkFBbUIsd0JBQXdCLG1CQUFtQixlQUFlLG1CQUFtQixpQ0FBaUMsbUJBQW1CLG9CQUFvQixtQkFBbUIsdUJBQXVCLG1CQUFtQix5QkFBeUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsbUJBQW1CLG1CQUFtQixvQkFBb0IsbUJBQW1CLDJCQUEyQixtQkFBbUIsc0JBQXNCLG1CQUFtQix5QkFBeUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCLG1CQUFtQix5QkFBeUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsbUJBQW1CLG1CQUFtQixpQkFBaUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0JBQXNCLG1CQUFtQix3QkFBd0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsMENBQTBDLG1CQUFtQixrQkFBa0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsdUJBQXVCLG1CQUFtQiwrQkFBK0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsd0JBQXdCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsdUJBQXVCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLDhCQUE4QixtQkFBbUIsMkJBQTJCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLGlCQUFpQixtQkFBbUIsa0JBQWtCLG1CQUFtQixpQkFBaUIsbUJBQW1CLGtCQUFrQixtQkFBbUIscUJBQXFCLG1CQUFtQixzQkFBc0IsbUJBQW1CLGtDQUFrQyxtQkFBbUIsaUNBQWlDLG1CQUFtQixpQkFBaUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsbUNBQW1DLG1CQUFtQixtQ0FBbUMsbUJBQW1CLHFCQUFxQixtQkFBbUIsb0NBQW9DLG1CQUFtQixrQkFBa0IsbUJBQW1CLHNEQUFzRCxtQkFBbUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsbUJBQW1CLHlCQUF5QixtQkFBbUIscUJBQXFCLG1CQUFtQixpQkFBaUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsaUJBQWlCLG1CQUFtQixxQkFBcUIsbUJBQW1CLDRCQUE0QixtQkFBbUIsOEJBQThCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsc0JBQXNCLG1CQUFtQixvQkFBb0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsdUJBQXVCLG1CQUFtQixtQkFBbUIsbUJBQW1CLG9DQUFvQyxtQkFBbUIsMENBQTBDLG1CQUFtQix1Q0FBdUMsbUJBQW1CLG9CQUFvQixtQkFBbUIsb0JBQW9CLG1CQUFtQix1Q0FBdUMsbUJBQW1CLGtDQUFrQyxtQkFBbUIsMkNBQTJDLG1CQUFtQixxQkFBcUIsbUJBQW1CLHNCQUFzQixtQkFBbUIsaUNBQWlDLG1CQUFtQixtQkFBbUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0NBQXNDLG1CQUFtQix1QkFBdUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsMEJBQTBCLG1CQUFtQix3QkFBd0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsdUJBQXVCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQixtQkFBbUIsbUJBQW1CLHVCQUF1QixtQkFBbUIsc0JBQXNCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsa0JBQWtCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsb0JBQW9CLG1CQUFtQix1QkFBdUIsbUJBQW1CLDZCQUE2QixtQkFBbUIsOEJBQThCLG1CQUFtQiwyQkFBMkIsbUJBQW1CLDZCQUE2QixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0JBQXNCLG1CQUFtQixtQkFBbUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQiwwQ0FBMEMsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCLG1CQUFtQix1Q0FBdUMsbUJBQW1CLHNCQUFzQixtQkFBbUIsb0JBQW9CLG1CQUFtQix5QkFBeUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsbUJBQW1CLG1CQUFtQixpQkFBaUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLDBCQUEwQixtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLCtDQUErQyxtQkFBbUIsNEVBQTRFLG1CQUFtQiwwQkFBMEIsbUJBQW1CLGdCQUFnQixtQkFBbUIscUJBQXFCLG1CQUFtQiwwQ0FBMEMsbUJBQW1CLG9CQUFvQixtQkFBbUIsZ0JBQWdCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHVCQUF1QixtQkFBbUIscUJBQXFCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHdCQUF3QixtQkFBbUIsc0JBQXNCLG1CQUFtQiw0QkFBNEIsbUJBQW1CLGtCQUFrQixtQkFBbUIsc0JBQXNCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQiwrQkFBK0IsbUJBQW1CLGdDQUFnQyxtQkFBbUIsNkJBQTZCLG1CQUFtQiwrQkFBK0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsb0JBQW9CLG1CQUFtQixzQkFBc0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsd0JBQXdCLG1CQUFtQiwwQkFBMEIsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0JBQXNCLG1CQUFtQix3QkFBd0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsZ0NBQWdDLG1CQUFtQix3QkFBd0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsc0RBQXNELG1CQUFtQixrREFBa0QsbUJBQW1CLHdEQUF3RCxtQkFBbUIsK0JBQStCLG1CQUFtQixlQUFlLG1CQUFtQixpQ0FBaUMsbUJBQW1CLGdDQUFnQyxtQkFBbUIsNERBQTRELG1CQUFtQixrREFBa0QsbUJBQW1CLDhCQUE4QixtQkFBbUIsa0NBQWtDLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsMEJBQTBCLG1CQUFtQiwyQkFBMkIsbUJBQW1CLDJCQUEyQixtQkFBbUIsNEJBQTRCLG1CQUFtQiw0QkFBNEIsbUJBQW1CLDZCQUE2QixtQkFBbUIscUJBQXFCLG1CQUFtQix1QkFBdUIsbUJBQW1CLDBCQUEwQixtQkFBbUIsbUJBQW1CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsd0JBQXdCLG1CQUFtQixtQkFBbUIsbUJBQW1CLDBCQUEwQixtQkFBbUIscUJBQXFCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGVBQWUsbUJBQW1CLHFCQUFxQixtQkFBbUIsNEJBQTRCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsMkJBQTJCLG1CQUFtQix5QkFBeUIsbUJBQW1CLDJCQUEyQixtQkFBbUIsNEJBQTRCLG1CQUFtQixpQkFBaUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsbUJBQW1CLG1CQUFtQixpQkFBaUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsaUJBQWlCLG1CQUFtQixzQkFBc0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHNDQUFzQyxtQkFBbUIsaUJBQWlCLG1CQUFtQixrQkFBa0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsZUFBZSxtQkFBbUIsY0FBYyxtQkFBbUIsaUJBQWlCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsMEJBQTBCLG1CQUFtQixnQ0FBZ0MsbUJBQW1CLCtCQUErQixtQkFBbUIsc0RBQXNELG1CQUFtQix3QkFBd0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsd0JBQXdCLG1CQUFtQix1Q0FBdUMsbUJBQW1CLHlCQUF5QixtQkFBbUIseUJBQXlCLG1CQUFtQixpQkFBaUIsbUJBQW1CLDJCQUEyQixtQkFBbUIscUJBQXFCLG1CQUFtQixrQkFBa0IsbUJBQW1CLDZEQUE2RCxtQkFBbUIsa0RBQWtELG1CQUFtQixpQkFBaUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQix5QkFBeUIsbUJBQW1CLDhCQUE4QixtQkFBbUIsdUJBQXVCLG1CQUFtQixxQkFBcUIsbUJBQW1CLGdCQUFnQixtQkFBbUIseUJBQXlCLG1CQUFtQiwwQkFBMEIsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGVBQWUsbUJBQW1CLG9CQUFvQixtQkFBbUIsaUJBQWlCLG1CQUFtQixlQUFlLG1CQUFtQixpQkFBaUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsaUJBQWlCLG1CQUFtQixtQkFBbUIsbUJBQW1CLDBCQUEwQixtQkFBbUIsaUJBQWlCLG1CQUFtQix3QkFBd0IsbUJBQW1CLG1CQUFtQixtQkFBbUIscUNBQXFDLG1CQUFtQiwrQkFBK0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsbUJBQW1CLG1CQUFtQixzQkFBc0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsb0JBQW9CLG1CQUFtQixzQkFBc0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsd0JBQXdCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLDBFQUEwRSxtQkFBbUIsZ0RBQWdELG1CQUFtQixnREFBZ0QsbUJBQW1CLGdEQUFnRCxtQkFBbUIsdUJBQXVCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsb0JBQW9CLG1CQUFtQix3R0FBd0csbUJBQW1CLDBCQUEwQixtQkFBbUIscURBQXFELG1CQUFtQixnQ0FBZ0MsbUJBQW1CLHNCQUFzQixtQkFBbUIsZUFBZSxtQkFBbUIsMkVBQTJFLG1CQUFtQix5QkFBeUIsbUJBQW1CLGNBQWMsbUJBQW1CLG9DQUFvQyxtQkFBbUIsdUNBQXVDLG1CQUFtQiwyQ0FBMkMsbUJBQW1CLG1CQUFtQixtQkFBbUIsdUJBQXVCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLDRCQUE0QixtQkFBbUIsZ0JBQWdCLG1CQUFtQiw2Q0FBNkMsbUJBQW1CLGVBQWUsbUJBQW1CLHNCQUFzQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixzQkFBc0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsZ0JBQWdCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsbUJBQW1CLG1CQUFtQix5QkFBeUIsbUJBQW1CLHVCQUF1QixtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsc0JBQXNCLG1CQUFtQix3QkFBd0IsbUJBQW1CLGlCQUFpQixtQkFBbUIscUJBQXFCLG1CQUFtQixjQUFjLG1CQUFtQixzQkFBc0IsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsc0JBQXNCLG1CQUFtQixxQkFBcUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsZUFBZSxtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLGNBQWMsbUJBQW1CLG1EQUFtRCxtQkFBbUIsb0JBQW9CLG1CQUFtQixzQkFBc0IsbUJBQW1CLDBCQUEwQixtQkFBbUIsb0JBQW9CLG1CQUFtQixvQkFBb0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCLG1CQUFtQix3QkFBd0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsb0JBQW9CLG1CQUFtQixxQkFBcUIsbUJBQW1CLDJCQUEyQixtQkFBbUIsbUJBQW1CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsaUJBQWlCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsMkNBQTJDLG1CQUFtQiwyQkFBMkIsbUJBQW1CLHdCQUF3QixtQkFBbUIsdUJBQXVCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQix5QkFBeUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsc0JBQXNCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLHVCQUF1QixtQkFBbUIsb0JBQW9CLG1CQUFtQixrQkFBa0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsc0JBQXNCLG1CQUFtQixnQ0FBZ0MsbUJBQW1CLG1CQUFtQixtQkFBbUIsaUJBQWlCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsc0NBQXNDLG1CQUFtQix5QkFBeUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsd0JBQXdCLG1CQUFtQixnRUFBZ0UsbUJBQW1CLHVEQUF1RCxtQkFBbUIsNkNBQTZDLG1CQUFtQixnREFBZ0QsbUJBQW1CLDhDQUE4QyxtQkFBbUIseUJBQXlCLG1CQUFtQixvQkFBb0IsbUJBQW1CLHdCQUF3QixtQkFBbUIsMEJBQTBCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHlCQUF5QixtQkFBbUIsa0JBQWtCLG1CQUFtQiwwQkFBMEIsbUJBQW1CLGlCQUFpQixtQkFBbUIseUJBQXlCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGtEQUFrRCxtQkFBbUIsaURBQWlELG1CQUFtQixnREFBZ0QsbUJBQW1CLHFCQUFxQixtQkFBbUIsOENBQThDLG1CQUFtQiwrQ0FBK0MsbUJBQW1CLDJCQUEyQixtQkFBbUIseUJBQXlCLG1CQUFtQix3QkFBd0IsbUJBQW1CLDBCQUEwQixtQkFBbUIsd0JBQXdCLG1CQUFtQixxQkFBcUIsbUJBQW1CLHNCQUFzQixtQkFBbUIsNEJBQTRCLG1CQUFtQixjQUFjLG1CQUFtQixxQkFBcUIsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQixnQ0FBZ0MsbUJBQW1CLHNCQUFzQixtQkFBbUIsdUJBQXVCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsbUJBQW1CLG1CQUFtQixpQkFBaUIsbUJBQW1CLDZCQUE2QixtQkFBbUIsb0NBQW9DLG1CQUFtQixrQkFBa0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsa0JBQWtCLG1CQUFtQiwyQkFBMkIsbUJBQW1CLDRCQUE0QixtQkFBbUIsNEJBQTRCLG1CQUFtQiw0QkFBNEIsbUJBQW1CLG9CQUFvQixtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsZUFBZSxtQkFBbUIsc0JBQXNCLG1CQUFtQix3QkFBd0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsaUJBQWlCLG1CQUFtQixxQkFBcUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsd0JBQXdCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLDJCQUEyQixtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHdCQUF3QixtQkFBbUIsZUFBZSxtQkFBbUIsd0JBQXdCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsd0JBQXdCLG1CQUFtQiwwQkFBMEIsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQix3QkFBd0IsbUJBQW1CLDJCQUEyQixtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLHVCQUF1QixtQkFBbUIsbUJBQW1CLG1CQUFtQixrQkFBa0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsbUJBQW1CLG1CQUFtQixrQkFBa0IsbUJBQW1CLDRCQUE0QixtQkFBbUIsMEJBQTBCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLGlCQUFpQixtQkFBbUIsNkJBQTZCLG1CQUFtQixnQ0FBZ0MsbUJBQW1CLG1CQUFtQixtQkFBbUIsdUNBQXVDLG1CQUFtQiwyRUFBMkUsbUJBQW1CLCtEQUErRCxtQkFBbUIsaUJBQWlCLG1CQUFtQixtQkFBbUIsbUJBQW1CLDRDQUE0QyxtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsb0JBQW9CLG1CQUFtQiwwQkFBMEIsbUJBQW1CLDJCQUEyQixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGlCQUFpQixtQkFBbUIscUJBQXFCLG1CQUFtQiw4REFBOEQsbUJBQW1CLHNDQUFzQyxtQkFBbUIsdUJBQXVCLG1CQUFtQix5QkFBeUIsbUJBQW1CLDJCQUEyQixtQkFBbUIsa0JBQWtCLG1CQUFtQix3QkFBd0IsbUJBQW1CLDBCQUEwQixtQkFBbUIseUNBQXlDLG1CQUFtQiw2Q0FBNkMsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQixrQkFBa0IsbUJBQW1CLG9CQUFvQixtQkFBbUIsOENBQThDLG1CQUFtQixrREFBa0QsbUJBQW1CLGlCQUFpQixtQkFBbUIsMEJBQTBCLG1CQUFtQixvQkFBb0IsbUJBQW1CLDRFQUE0RSxtQkFBbUIsK0RBQStELG1CQUFtQixxREFBcUQsbUJBQW1CLHdEQUF3RCxtQkFBbUIsc0RBQXNELG1CQUFtQixrQkFBa0IsbUJBQW1CLGtEQUFrRCxtQkFBbUIsbUJBQW1CLG1CQUFtQiwyQkFBMkIsbUJBQW1CLDJCQUEyQixtQkFBbUIsMEJBQTBCLG1CQUFtQixtREFBbUQsbUJBQW1CLHVEQUF1RCxtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixtQkFBbUIsbUJBQW1CLG1CQUFtQixtQkFBbUIscUJBQXFCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHVCQUF1QixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLFNBQVMsa0JBQWtCLFVBQVUsV0FBVyxVQUFVLFlBQVksZ0JBQWdCLHNCQUFzQixTQUFTLG1EQUFtRCxnQkFBZ0IsV0FBVyxZQUFZLFNBQVMsaUJBQWlCLFVBQVU7Ozs7Ozs7Ozs7Ozs7QUNYOXNnQywyQkFBMkIsbUJBQU8sQ0FBQyx3RkFBbUM7QUFDdEU7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxzR0FBMEM7QUFDbEUseUNBQXlDLG1CQUFPLENBQUMsOEVBQXdCO0FBQ3pFLHlDQUF5QyxtQkFBTyxDQUFDLDhFQUF3QjtBQUN6RSx5Q0FBeUMsbUJBQU8sQ0FBQyw4RUFBd0I7QUFDekUseUNBQXlDLG1CQUFPLENBQUMsZ0ZBQXlCO0FBQzFFLHlDQUF5QyxtQkFBTyxDQUFDLDhFQUF3Qjs7QUFFekU7QUFDQSxjQUFjLFFBQVMsZUFBZSxnQ0FBZ0MsaURBQWlELGtQQUFrUCwwQkFBMEIseUJBQXlCLEdBQUcsU0FBUyxnQ0FBZ0Msa0JBQWtCLHlCQUF5QiwwQkFBMEIsMkJBQTJCLDJCQUEyQixxQkFBcUIsNEJBQTRCLDBDQUEwQyx5Q0FBeUMsR0FBRyxZQUFZLDBCQUEwQix5QkFBeUIsR0FBRyxjQUFjLG9EQUFvRCw0Q0FBNEMsR0FBRyxnQ0FBZ0MsVUFBVSwwQ0FBMEMsa0NBQWtDLE9BQU8sWUFBWSw0Q0FBNEMsb0NBQW9DLE9BQU8sR0FBRyx3QkFBd0IsVUFBVSwwQ0FBMEMsa0NBQWtDLE9BQU8sWUFBWSw0Q0FBNEMsb0NBQW9DLE9BQU8sR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcsdUJBQXVCLDBCQUEwQixHQUFHLG9CQUFvQiwwQkFBMEIsR0FBRyw4QkFBOEIsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLHdCQUF3QiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLDBCQUEwQiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLDRCQUE0QiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLHNCQUFzQiwwQkFBMEIsR0FBRywyQkFBMkIsMEJBQTBCLEdBQUcsdUJBQXVCLDBCQUEwQixHQUFHLHNCQUFzQiwwQkFBMEIsR0FBRyx3QkFBd0IsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyx3QkFBd0IsMEJBQTBCLEdBQUcsMEJBQTBCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcsMEJBQTBCLDBCQUEwQixHQUFHLHNCQUFzQiwwQkFBMEIsR0FBRywyQkFBMkIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLDBCQUEwQiwwQkFBMEIsR0FBRyxvQkFBb0IsMEJBQTBCLEdBQUcsNEJBQTRCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLG9CQUFvQiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLGdDQUFnQywwQkFBMEIsR0FBRyx5QkFBeUIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsK0JBQStCLDBCQUEwQixHQUFHLCtCQUErQiwwQkFBMEIsR0FBRyw4QkFBOEIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDJCQUEyQiwwQkFBMEIsR0FBRyx5QkFBeUIsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLDRCQUE0QiwwQkFBMEIsR0FBRywyQkFBMkIsMEJBQTBCLEdBQUcsNkJBQTZCLDBCQUEwQixHQUFHLDhCQUE4QiwwQkFBMEIsR0FBRyxvQkFBb0IsMEJBQTBCLEdBQUcsK0JBQStCLDBCQUEwQixHQUFHLDZCQUE2QiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsdUJBQXVCLDBCQUEwQixHQUFHLHNCQUFzQiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDBCQUEwQiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsOEJBQThCLDBCQUEwQixHQUFHLGdDQUFnQywwQkFBMEIsR0FBRyxnQ0FBZ0MsMEJBQTBCLEdBQUcsd0JBQXdCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyxxQ0FBcUMsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLG9DQUFvQywwQkFBMEIsR0FBRyxvQ0FBb0MsMEJBQTBCLEdBQUcscUNBQXFDLDBCQUEwQixHQUFHLGtDQUFrQywwQkFBMEIsR0FBRyxrQ0FBa0MsMEJBQTBCLEdBQUcsa0NBQWtDLDBCQUEwQixHQUFHLG1DQUFtQywwQkFBMEIsR0FBRyxnQ0FBZ0MsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDJCQUEyQiwwQkFBMEIsR0FBRyw0QkFBNEIsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyx5QkFBeUIsMEJBQTBCLEdBQUcsb0JBQW9CLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyxxQkFBcUIsMEJBQTBCLEdBQUcsNkJBQTZCLDBCQUEwQixHQUFHLDhCQUE4QiwwQkFBMEIsR0FBRyw2QkFBNkIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDJCQUEyQiwwQkFBMEIsR0FBRyw0QkFBNEIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLHlCQUF5QiwwQkFBMEIsR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLDZCQUE2QiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsNkJBQTZCLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyw0QkFBNEIsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLDZCQUE2QiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDBCQUEwQiwwQkFBMEIsR0FBRyx3QkFBd0IsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLDhCQUE4QiwwQkFBMEIsR0FBRyw2QkFBNkIsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLDJCQUEyQiwwQkFBMEIsR0FBRywyQkFBMkIsMEJBQTBCLEdBQUcsNEJBQTRCLDBCQUEwQixHQUFHLHlCQUF5QiwwQkFBMEIsR0FBRyxxQkFBcUIsMEJBQTBCLEdBQUcsa0NBQWtDLDBCQUEwQixHQUFHLGtDQUFrQywwQkFBMEIsR0FBRyxtQ0FBbUMsMEJBQTBCLEdBQUcsZ0NBQWdDLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyw0QkFBNEIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLHdCQUF3QiwwQkFBMEIsR0FBRzs7Ozs7Ozs7Ozs7OztBQ1Z0NVEsMkJBQTJCLG1CQUFPLENBQUMsMkdBQXNEO0FBQ3pGO0FBQ0EsY0FBYyxRQUFTLGVBQWUsMEJBQTBCLG9CQUFvQiwyQkFBMkIsd0JBQXdCLHNCQUFzQiwyQkFBMkIsOEJBQThCLEVBQUUsK0JBQStCLG1CQUFtQixvQkFBb0IseUJBQXlCLDRCQUE0QiwrQkFBK0IsdUJBQXVCLHVCQUF1QixFQUFFLGdDQUFnQyxtQkFBbUIsRUFBRSxzQkFBc0IsMkJBQTJCLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUNGMWdCLDJCQUEyQixtQkFBTyxDQUFDLDJHQUFzRDtBQUN6RjtBQUNBLGNBQWMsUUFBUyxnQ0FBZ0MsZ0JBQWdCLGlCQUFpQiwwQkFBMEIsY0FBYyxxQkFBcUIscUJBQXFCLEVBQUUscUJBQXFCLG9CQUFvQiwwQkFBMEIsMkJBQTJCLHFCQUFxQix5QkFBeUIsd0JBQXdCLHVCQUF1Qix5QkFBeUIsbUJBQW1CLG9CQUFvQixFQUFFLDJDQUEyQyxtQkFBbUIsc0JBQXNCLEVBQUUsMERBQTBELG9CQUFvQixFQUFFLDBDQUEwQyxzQkFBc0IsdUJBQXVCLGlCQUFpQixhQUFhLG9CQUFvQixFQUFFLDJCQUEyQiwwQkFBMEIsMkJBQTJCLDBCQUEwQix5QkFBeUIsaUNBQWlDLEVBQUUsaUNBQWlDLG1CQUFtQixnQkFBZ0IseUJBQXlCLGtDQUFrQyxjQUFjLGVBQWUscUJBQXFCLDBCQUEwQiw2QkFBNkIscUJBQXFCLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUNGL25DLDJCQUEyQixtQkFBTyxDQUFDLDJHQUFzRDtBQUN6RjtBQUNBLGNBQWMsUUFBUyxnQkFBZ0Isc0JBQXNCLHNCQUFzQix3QkFBd0IsMEJBQTBCLHdCQUF3QixFQUFFLGlFQUFpRSwyQkFBMkIsRUFBRSwyQkFBMkIsbUJBQW1CLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUNGN1MsMkJBQTJCLG1CQUFPLENBQUMsMkdBQXNEO0FBQ3pGO0FBQ0EsY0FBYyxRQUFTLHdIQUF3SCw0RUFBNEUscUJBQXFCLGdDQUFnQyw4QkFBOEIsNkJBQTZCLDJCQUEyQiwwQkFBMEIsc0JBQXNCLEVBQUUsOENBQThDLG1CQUFtQixtQkFBbUIsRUFBRSxrQkFBa0IscUJBQXFCLGNBQWMsRUFBRSxxQkFBcUIsb0JBQW9CLHFCQUFxQix1QkFBdUIsRUFBRSwwQ0FBMEMsZ0JBQWdCLEVBQUUsOEJBQThCLDJDQUEyQyx1Q0FBdUMsbUNBQW1DLCtCQUErQiwyREFBMkQscURBQXFELDJDQUEyQyxvREFBb0QsNENBQTRDLDJEQUEyRCxtREFBbUQsRUFBRSw2QkFBNkIsdUJBQXVCLEVBQUUsaUNBQWlDLGtDQUFrQyxXQUFXLFlBQVksZUFBZSxvQkFBb0IsZ0JBQWdCLEVBQUUsMENBQTBDLGVBQWUsaUNBQWlDLHlCQUF5QixvREFBb0QsNENBQTRDLHlDQUF5QyxpQ0FBaUMsMkRBQTJELG1EQUFtRCxFQUFFLHdDQUF3QyxnQkFBZ0IsRUFBRSxpREFBaUQsZUFBZSxFQUFFLGdHQUFnRyxxQkFBcUIsZUFBZSx1QkFBdUIsRUFBRSxzQ0FBc0Msb0JBQW9CLDBCQUEwQixtQkFBbUIsRUFBRSx3Q0FBd0MsOEJBQThCLHdCQUF3QiwwQkFBMEIsZ0JBQWdCLHFCQUFxQix3QkFBd0IsZUFBZSx1QkFBdUIsZ0JBQWdCLDJDQUEyQyxtQ0FBbUMsRUFBRSwwRkFBMEYsOEJBQThCLEVBQUUsMEJBQTBCLGlCQUFpQixFQUFFLGlDQUFpQyxlQUFlLEVBQUUsMEVBQTBFLGtDQUFrQyxvQkFBb0IsY0FBYyxxQkFBcUIsMENBQTBDLCtDQUErQyw4Q0FBOEMsa0RBQWtELDZDQUE2QyxtREFBbUQsNkNBQTZDLGdDQUFnQyw4QkFBOEIsNkJBQTZCLDJCQUEyQiwwQkFBMEIsc0JBQXNCLEVBQUUseUNBQXlDLHFCQUFxQixzRUFBc0UsOERBQThELEVBQUUsNEZBQTRGLHVCQUF1QixFQUFFLDBDQUEwQyxtQkFBbUIsaUJBQWlCLG9CQUFvQixFQUFFLHNGQUFzRixtQkFBbUIsbUJBQW1CLEVBQUUsNENBQTRDLGdCQUFnQixFQUFFLDhEQUE4RCxnQkFBZ0IsbUJBQW1CLGFBQWEsaUJBQWlCLG9EQUFvRCxvQkFBb0IsdUJBQXVCLGdCQUFnQixzQkFBc0IsaUJBQWlCLGdEQUFnRCx3Q0FBd0MsRUFBRSx5QkFBeUIsZUFBZSxFQUFFLHlCQUF5Qiw2QkFBNkIsZUFBZSxFQUFFLHlCQUF5QixpQ0FBaUMsZ0JBQWdCLEVBQUUsNEJBQTRCLHlCQUF5QixFQUFFLGdCQUFnQixnQkFBZ0IsZUFBZSw2QkFBNkIscUJBQXFCLEVBQUUsNENBQTRDLHVCQUF1QixFQUFFLG9DQUFvQyxrQ0FBa0MsRUFBRSx1Q0FBdUMsa0NBQWtDLGFBQWEsV0FBVyxFQUFFLDZDQUE2QywyQkFBMkIsK0JBQStCLEVBQUUsb0VBQW9FLGNBQWMsdUJBQXVCLGtCQUFrQixFQUFFLGdEQUFnRCxvQ0FBb0MsaUJBQWlCLGNBQWMsRUFBRSxnREFBZ0QsaUNBQWlDLGlCQUFpQixjQUFjLEVBQUUsb0RBQW9ELG1CQUFtQixFQUFFLHlEQUF5RCxvQkFBb0Isa0NBQWtDLEVBQUUscUVBQXFFLHFCQUFxQixFQUFFLGtFQUFrRSxnQkFBZ0IsRUFBRSw4RUFBOEUsNEJBQTRCLEVBQUUsNENBQTRDLFFBQVEsY0FBYyxFQUFFLFNBQVMsa0JBQWtCLEVBQUUsVUFBVSxjQUFjLEVBQUUsRUFBRSx5QkFBeUIsUUFBUSxjQUFjLEVBQUUsU0FBUyxrQkFBa0IsRUFBRSxVQUFVLGNBQWMsRUFBRSxFQUFFLCtCQUErQixRQUFRLGFBQWEsRUFBRSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsYUFBYSxFQUFFLEVBQUUsdUJBQXVCLFFBQVEsYUFBYSxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsVUFBVSxhQUFhLEVBQUUsRUFBRSxnQ0FBZ0MsUUFBUSxjQUFjLEVBQUUsU0FBUyxpQkFBaUIsRUFBRSxVQUFVLGNBQWMsRUFBRSxFQUFFLHdCQUF3QixRQUFRLGNBQWMsRUFBRSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsY0FBYyxFQUFFLEVBQUUsa0NBQWtDLFFBQVEsZ0JBQWdCLEVBQUUsU0FBUyxvQkFBb0IsRUFBRSxVQUFVLGdCQUFnQixFQUFFLEVBQUUsMEJBQTBCLFFBQVEsZ0JBQWdCLEVBQUUsU0FBUyxvQkFBb0IsRUFBRSxVQUFVLGdCQUFnQixFQUFFLEVBQUUsNkJBQTZCLHFDQUFxQyw2QkFBNkIsdUJBQXVCLEVBQUUsNEJBQTRCLG9DQUFvQyw0QkFBNEIsdUJBQXVCLEVBQUUsc0NBQXNDLG1DQUFtQywyQkFBMkIsdUJBQXVCLEVBQUUscUNBQXFDLHNDQUFzQyw4QkFBOEIsdUJBQXVCLEVBQUUsbUNBQW1DLG9DQUFvQyw0QkFBNEIsdUJBQXVCLEVBQUUsa0NBQWtDLHFDQUFxQyw2QkFBNkIsdUJBQXVCLEVBQUUsa0RBQWtELHlCQUF5QixzQkFBc0Isb0JBQW9CLHFCQUFxQixpQkFBaUIsRUFBRSxpQ0FBaUMsaUJBQWlCLDZCQUE2QiwwQkFBMEIsd0JBQXdCLHlCQUF5QixxQkFBcUIsRUFBRSxzREFBc0QscUJBQXFCLEVBQUUsMEJBQTBCLGlCQUFpQixrQkFBa0IsZ0JBQWdCLHFCQUFxQix1QkFBdUIsRUFBRSx5QkFBeUIscUJBQXFCLHFCQUFxQixnQkFBZ0IsdUJBQXVCLEVBQUUsNEJBQTRCLGdCQUFnQixFQUFFLHdCQUF3QiwyQkFBMkIsMEJBQTBCLHVCQUF1QixpQkFBaUIsbUJBQW1CLG9CQUFvQixzQkFBc0IsbUJBQW1CLEVBQUUsK0JBQStCLGdCQUFnQiw4QkFBOEIsRUFBRSx5QkFBeUIsd0JBQXdCLHdCQUF3QixtQkFBbUIsMEJBQTBCLGdCQUFnQixnQkFBZ0IsaUJBQWlCLHVCQUF1QixnQkFBZ0Isc0JBQXNCLHVCQUF1QixzQkFBc0IsMEJBQTBCLG9CQUFvQixFQUFFLHNCQUFzQiwwQkFBMEIsRUFBRSwrQkFBK0IsbUJBQW1CLHFCQUFxQixFQUFFLHlCQUF5Qix1QkFBdUIsRUFBRSwwQkFBMEIscUJBQXFCLHVCQUF1QixpQkFBaUIsWUFBWSxXQUFXLEVBQUUsNkJBQTZCLGdCQUFnQix1QkFBdUIsaUJBQWlCLGtCQUFrQiw4QkFBOEIsaUJBQWlCLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUNGNWhTLDJCQUEyQixtQkFBTyxDQUFDLHdHQUFtRDtBQUN0RjtBQUNBLFVBQVUsbUJBQU8sQ0FBQyw2SkFBdUU7QUFDekYsVUFBVSxtQkFBTyxDQUFDLHFMQUFtRjs7QUFFckc7QUFDQSxjQUFjLFFBQVMsd0hBQXdILDRFQUE0RSxxQkFBcUIsZ0NBQWdDLDhCQUE4Qiw2QkFBNkIsMkJBQTJCLDBCQUEwQixzQkFBc0IsRUFBRSw4Q0FBOEMsbUJBQW1CLG1CQUFtQixFQUFFLGtCQUFrQixxQkFBcUIsY0FBYyxFQUFFLHFCQUFxQixvQkFBb0IscUJBQXFCLHVCQUF1QixFQUFFLDBDQUEwQyxnQkFBZ0IsRUFBRSw4QkFBOEIsMkNBQTJDLHVDQUF1QyxtQ0FBbUMsK0JBQStCLDJEQUEyRCxxREFBcUQsMkNBQTJDLG9EQUFvRCw0Q0FBNEMsMkRBQTJELG1EQUFtRCxFQUFFLDZCQUE2Qix1QkFBdUIsRUFBRSxpQ0FBaUMsa0NBQWtDLFdBQVcsWUFBWSxlQUFlLG9CQUFvQixnQkFBZ0IsRUFBRSwwQ0FBMEMsZUFBZSxpQ0FBaUMseUJBQXlCLG9EQUFvRCw0Q0FBNEMseUNBQXlDLGlDQUFpQywyREFBMkQsbURBQW1ELEVBQUUsd0NBQXdDLGdCQUFnQixFQUFFLGlEQUFpRCxlQUFlLEVBQUUsZ0dBQWdHLHFCQUFxQixlQUFlLHVCQUF1QixFQUFFLHNDQUFzQyxvQkFBb0IsMEJBQTBCLG1CQUFtQixFQUFFLHdDQUF3Qyw4QkFBOEIsd0JBQXdCLDBCQUEwQixnQkFBZ0IscUJBQXFCLHdCQUF3QixlQUFlLHVCQUF1QixnQkFBZ0IsMkNBQTJDLG1DQUFtQyxFQUFFLDBGQUEwRiw4QkFBOEIsRUFBRSwwQkFBMEIsaUJBQWlCLEVBQUUsaUNBQWlDLGVBQWUsRUFBRSwwRUFBMEUsa0NBQWtDLG9CQUFvQixjQUFjLHFCQUFxQiwwQ0FBMEMsK0NBQStDLDhDQUE4QyxrREFBa0QsNkNBQTZDLG1EQUFtRCw2Q0FBNkMsZ0NBQWdDLDhCQUE4Qiw2QkFBNkIsMkJBQTJCLDBCQUEwQixzQkFBc0IsRUFBRSx5Q0FBeUMscUJBQXFCLHNFQUFzRSw4REFBOEQsRUFBRSw0RkFBNEYsdUJBQXVCLEVBQUUsMENBQTBDLG1CQUFtQixpQkFBaUIsb0JBQW9CLEVBQUUsc0ZBQXNGLG1CQUFtQixtQkFBbUIsRUFBRSw0Q0FBNEMsZ0JBQWdCLEVBQUUsOERBQThELGdCQUFnQixtQkFBbUIsYUFBYSxpQkFBaUIsb0RBQW9ELG9CQUFvQix1QkFBdUIsZ0JBQWdCLHNCQUFzQixpQkFBaUIsZ0RBQWdELHdDQUF3QyxFQUFFLHlCQUF5QixlQUFlLEVBQUUseUJBQXlCLDZCQUE2QixlQUFlLEVBQUUseUJBQXlCLGlDQUFpQyxnQkFBZ0IsRUFBRSw0QkFBNEIseUJBQXlCLEVBQUUsZ0JBQWdCLGdCQUFnQixlQUFlLDZCQUE2QixxQkFBcUIsRUFBRSw0Q0FBNEMsdUJBQXVCLEVBQUUsb0NBQW9DLGtDQUFrQyxFQUFFLHVDQUF1QyxrQ0FBa0MsYUFBYSxXQUFXLEVBQUUsNkNBQTZDLDJCQUEyQiwrQkFBK0IsRUFBRSxvRUFBb0UsY0FBYyx1QkFBdUIsa0JBQWtCLEVBQUUsZ0RBQWdELG9DQUFvQyxpQkFBaUIsY0FBYyxFQUFFLGdEQUFnRCxpQ0FBaUMsaUJBQWlCLGNBQWMsRUFBRSxvREFBb0QsbUJBQW1CLEVBQUUseURBQXlELG9CQUFvQixrQ0FBa0MsRUFBRSxxRUFBcUUscUJBQXFCLEVBQUUsa0VBQWtFLGdCQUFnQixFQUFFLDhFQUE4RSw0QkFBNEIsRUFBRSw0Q0FBNEMsUUFBUSxjQUFjLEVBQUUsU0FBUyxrQkFBa0IsRUFBRSxVQUFVLGNBQWMsRUFBRSxFQUFFLHlCQUF5QixRQUFRLGNBQWMsRUFBRSxTQUFTLGtCQUFrQixFQUFFLFVBQVUsY0FBYyxFQUFFLEVBQUUsK0JBQStCLFFBQVEsYUFBYSxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsVUFBVSxhQUFhLEVBQUUsRUFBRSx1QkFBdUIsUUFBUSxhQUFhLEVBQUUsU0FBUyxpQkFBaUIsRUFBRSxVQUFVLGFBQWEsRUFBRSxFQUFFLGdDQUFnQyxRQUFRLGNBQWMsRUFBRSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsY0FBYyxFQUFFLEVBQUUsd0JBQXdCLFFBQVEsY0FBYyxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsVUFBVSxjQUFjLEVBQUUsRUFBRSxrQ0FBa0MsUUFBUSxnQkFBZ0IsRUFBRSxTQUFTLG9CQUFvQixFQUFFLFVBQVUsZ0JBQWdCLEVBQUUsRUFBRSwwQkFBMEIsUUFBUSxnQkFBZ0IsRUFBRSxTQUFTLG9CQUFvQixFQUFFLFVBQVUsZ0JBQWdCLEVBQUUsRUFBRSw2QkFBNkIscUNBQXFDLDZCQUE2Qix1QkFBdUIsRUFBRSw0QkFBNEIsb0NBQW9DLDRCQUE0Qix1QkFBdUIsRUFBRSxzQ0FBc0MsbUNBQW1DLDJCQUEyQix1QkFBdUIsRUFBRSxxQ0FBcUMsc0NBQXNDLDhCQUE4Qix1QkFBdUIsRUFBRSxtQ0FBbUMsb0NBQW9DLDRCQUE0Qix1QkFBdUIsRUFBRSxrQ0FBa0MscUNBQXFDLDZCQUE2Qix1QkFBdUIsRUFBRSxrREFBa0QseUJBQXlCLHNCQUFzQixvQkFBb0IscUJBQXFCLGlCQUFpQixFQUFFLGlDQUFpQyxpQkFBaUIsNkJBQTZCLDBCQUEwQix3QkFBd0IseUJBQXlCLHFCQUFxQixFQUFFLHNEQUFzRCxxQkFBcUIsRUFBRSwwQkFBMEIsaUJBQWlCLGtCQUFrQixnQkFBZ0IscUJBQXFCLHVCQUF1QixFQUFFLHlCQUF5QixxQkFBcUIscUJBQXFCLGdCQUFnQix1QkFBdUIsRUFBRSw0QkFBNEIsZ0JBQWdCLEVBQUUsd0JBQXdCLDJCQUEyQiwwQkFBMEIsdUJBQXVCLGlCQUFpQixtQkFBbUIsb0JBQW9CLHNCQUFzQixtQkFBbUIsRUFBRSwrQkFBK0IsZ0JBQWdCLDhCQUE4QixFQUFFLHlCQUF5Qix3QkFBd0Isd0JBQXdCLG1CQUFtQiwwQkFBMEIsZ0JBQWdCLGdCQUFnQixpQkFBaUIsdUJBQXVCLGdCQUFnQixzQkFBc0IsdUJBQXVCLHNCQUFzQiwwQkFBMEIsb0JBQW9CLEVBQUUsc0JBQXNCLDBCQUEwQixFQUFFLCtCQUErQixtQkFBbUIscUJBQXFCLEVBQUUseUJBQXlCLHVCQUF1QixFQUFFLDBCQUEwQixxQkFBcUIsdUJBQXVCLGlCQUFpQixZQUFZLFdBQVcsRUFBRSw2QkFBNkIsZ0JBQWdCLHVCQUF1QixpQkFBaUIsa0JBQWtCLDhCQUE4QixpQkFBaUIsRUFBRSw4QkFBOEIsMkJBQTJCLEVBQUUsdUJBQXVCLDZCQUE2QixFQUFFLGtDQUFrQyxjQUFjLHdCQUF3QixnQkFBZ0IsaUJBQWlCLHFCQUFxQixlQUFlLHVCQUF1QixlQUFlLEVBQUUsOEVBQThFLHdCQUF3QixFQUFFLHNCQUFzQixjQUFjLGVBQWUsY0FBYyxlQUFlLHFCQUFxQiwwQkFBMEIsb0JBQW9CLHFCQUFxQixFQUFFLDhEQUE4RCxrQkFBa0IsbUJBQW1CLEVBQUUsZ0NBQWdDLGdCQUFnQixFQUFFLHlCQUF5QixZQUFZLEVBQUUscUJBQXFCLGdCQUFnQixpQkFBaUIsV0FBVyxZQUFZLHVCQUF1QixlQUFlLDZCQUE2QixFQUFFLHdCQUF3QiwrQkFBK0IsRUFBRSwwQkFBMEIsK0JBQStCLEVBQUUsY0FBYyxtQkFBbUIsMEJBQTBCLHFCQUFxQixpQ0FBaUMsRUFBRSx3QkFBd0IsdUJBQXVCLFdBQVcsWUFBWSxnQkFBZ0IsaUJBQWlCLEVBQUUsbUJBQW1CLHVCQUF1QixFQUFFLDBCQUEwQix1QkFBdUIscUJBQXFCLG1CQUFtQixFQUFFLCtGQUErRixrQkFBa0IsRUFBRSxxQkFBcUIscUJBQXFCLGdCQUFnQixnQkFBZ0IsY0FBYyxZQUFZLEVBQUUscUJBQXFCLHFCQUFxQixnQkFBZ0IsZ0JBQWdCLGlCQUFpQixZQUFZLEVBQUUscUJBQXFCLHFCQUFxQixlQUFlLGdCQUFnQixXQUFXLGlCQUFpQixFQUFFLHFCQUFxQixxQkFBcUIsZUFBZSxlQUFlLFdBQVcsaUJBQWlCLEVBQUUsc0JBQXNCLHNCQUFzQixnQkFBZ0IsaUJBQWlCLGVBQWUsZ0JBQWdCLEVBQUUsc0JBQXNCLHNCQUFzQixlQUFlLGdCQUFnQixlQUFlLGlCQUFpQixFQUFFLHNCQUFzQixzQkFBc0IsZUFBZSxnQkFBZ0IsZUFBZSxjQUFjLEVBQUUsc0JBQXNCLHNCQUFzQixlQUFlLGdCQUFnQixnQkFBZ0IsY0FBYyxFQUFFLGdCQUFnQiwyREFBMkQsd0RBQXdELG1EQUFtRCxFQUFFLDJCQUEyQiw4QkFBOEIsNkJBQTZCLDJCQUEyQix5QkFBeUIsc0JBQXNCLEVBQUUsMkJBQTJCLGlCQUFpQixrQkFBa0IscUJBQXFCLHVCQUF1QixpQkFBaUIsRUFBRSx5QkFBeUIscUJBQXFCLEVBQUUsaUNBQWlDLGdEQUFnRCxFQUFFLHVCQUF1QixvREFBb0QsZUFBZSxFQUFFLHdCQUF3QixnREFBZ0QsZUFBZSxFQUFFLDRCQUE0QixvREFBb0QsRUFBRSw2QkFBNkIsMkNBQTJDLEVBQUUscUJBQXFCLG1CQUFtQixFQUFFLHlJQUF5SSwwQkFBMEIsNkJBQTZCLHFCQUFxQixFQUFFLDhCQUE4QiwyQkFBMkIsRUFBRSx1QkFBdUIsNkJBQTZCLEVBQUUsa0NBQWtDLGNBQWMsd0JBQXdCLGdCQUFnQixpQkFBaUIscUJBQXFCLGVBQWUsdUJBQXVCLGVBQWUsRUFBRSw4RUFBOEUsd0JBQXdCLEVBQUUsc0JBQXNCLGNBQWMsZUFBZSxjQUFjLGVBQWUscUJBQXFCLDBCQUEwQixvQkFBb0IscUJBQXFCLEVBQUUsOERBQThELGtCQUFrQixtQkFBbUIsRUFBRSxnQ0FBZ0MsZ0JBQWdCLEVBQUUseUJBQXlCLFlBQVksRUFBRSxxQkFBcUIsZ0JBQWdCLGlCQUFpQixXQUFXLFlBQVksdUJBQXVCLGVBQWUsNkJBQTZCLEVBQUUsd0JBQXdCLCtCQUErQixFQUFFLDBCQUEwQiwrQkFBK0IsRUFBRSxjQUFjLG1CQUFtQiwwQkFBMEIscUJBQXFCLGlDQUFpQyxFQUFFLHdCQUF3Qix1QkFBdUIsV0FBVyxZQUFZLGdCQUFnQixpQkFBaUIsRUFBRSxtQkFBbUIsdUJBQXVCLEVBQUUsMEJBQTBCLHVCQUF1QixxQkFBcUIsbUJBQW1CLEVBQUUsK0ZBQStGLGtCQUFrQixFQUFFLHFCQUFxQixxQkFBcUIsZ0JBQWdCLGdCQUFnQixjQUFjLFlBQVksRUFBRSxxQkFBcUIscUJBQXFCLGdCQUFnQixnQkFBZ0IsaUJBQWlCLFlBQVksRUFBRSxxQkFBcUIscUJBQXFCLGVBQWUsZ0JBQWdCLFdBQVcsaUJBQWlCLEVBQUUscUJBQXFCLHFCQUFxQixlQUFlLGVBQWUsV0FBVyxpQkFBaUIsRUFBRSxzQkFBc0Isc0JBQXNCLGdCQUFnQixpQkFBaUIsZUFBZSxnQkFBZ0IsRUFBRSxzQkFBc0Isc0JBQXNCLGVBQWUsZ0JBQWdCLGVBQWUsaUJBQWlCLEVBQUUsc0JBQXNCLHNCQUFzQixlQUFlLGdCQUFnQixlQUFlLGNBQWMsRUFBRSxzQkFBc0Isc0JBQXNCLGVBQWUsZ0JBQWdCLGdCQUFnQixjQUFjLEVBQUUsZ0JBQWdCLDJEQUEyRCx3REFBd0QsbURBQW1ELEVBQUUsMkJBQTJCLDhCQUE4Qiw2QkFBNkIsMkJBQTJCLHlCQUF5QixzQkFBc0IsRUFBRSwyQkFBMkIsaUJBQWlCLGtCQUFrQixxQkFBcUIsdUJBQXVCLGlCQUFpQixFQUFFLHlCQUF5QixxQkFBcUIsRUFBRSxpQ0FBaUMsZ0RBQWdELEVBQUUsdUJBQXVCLG9EQUFvRCxlQUFlLEVBQUUsd0JBQXdCLGdEQUFnRCxlQUFlLEVBQUUsNEJBQTRCLG9EQUFvRCxFQUFFLDZCQUE2QiwyQ0FBMkMsRUFBRSxxQkFBcUIsbUJBQW1CLEVBQUUseUlBQXlJLDBCQUEwQiw2QkFBNkIscUJBQXFCLEVBQUUsOEJBQThCLDBCQUEwQix1QkFBdUIsZUFBZSxxQ0FBcUMsb0JBQW9CLHVCQUF1QixZQUFZLHNCQUFzQiwyREFBMkQsY0FBYywwQkFBMEIsRUFBRSwwREFBMEQsbUJBQW1CLHdCQUF3QixFQUFFLDBDQUEwQyx1QkFBdUIsRUFBRSxrRkFBa0YsbUJBQW1CLDRCQUE0QixFQUFFLCtDQUErQyxtQ0FBbUMsRUFBRSxnREFBZ0QsbUNBQW1DLEVBQUUsZ0xBQWdMLHVCQUF1QixhQUFhLHNCQUFzQixnQkFBZ0IsRUFBRSwrQ0FBK0MsYUFBYSxjQUFjLHNCQUFzQix1QkFBdUIsZUFBZSxnQkFBZ0IsRUFBRSwwQkFBMEIsZUFBZSxFQUFFLDJCQUEyQixnQkFBZ0IsRUFBRSwrQ0FBK0MsbUJBQW1CLG9CQUFvQixFQUFFLDJEQUEyRCxjQUFjLGVBQWUsMENBQTBDLHlDQUF5QyxnQkFBZ0IsRUFBRSxnSEFBZ0gsc0JBQXNCLHVCQUF1QixFQUFFLGdEQUFnRCxnQkFBZ0IsRUFBRSx1REFBdUQsZ0JBQWdCLEVBQUUsdURBQXVELGVBQWUsRUFBRSx1REFBdUQsaUJBQWlCLEVBQUUsdURBQXVELGVBQWUsRUFBRSx1REFBdUQsZUFBZSxFQUFFLHVEQUF1RCxpQkFBaUIsRUFBRSwrQkFBK0IscVVBQXFVLGtCQUFrQixFQUFFLEVBQUUsaUJBQWlCLDJCQUEyQixFQUFFLGNBQWMsMkJBQTJCLDBCQUEwQixzQkFBc0IsNEJBQTRCLG9CQUFvQixxQkFBcUIsRUFBRSwwQkFBMEIsNEJBQTRCLDRCQUE0QixFQUFFLGlEQUFpRCxxQkFBcUIsRUFBRSxvQ0FBb0MsNkJBQTZCLEVBQUUsd0JBQXdCLGtCQUFrQixnQ0FBZ0MsRUFBRSxZQUFZLDRCQUE0QixrQkFBa0IsRUFBRSxrQkFBa0Isa0JBQWtCLGdDQUFnQyxFQUFFLHNCQUFzQiw2QkFBNkIsRUFBRSwrRUFBK0UsbUJBQW1CLEVBQUUsc0JBQXNCLDJCQUEyQixpQkFBaUIsb0JBQW9CLHNCQUFzQiwyQkFBMkIsdUJBQXVCLDBDQUEwQyxFQUFFLHlFQUF5RSwyQkFBMkIsRUFBRSxnQ0FBZ0Msa0JBQWtCLEVBQUUsZ0JBQWdCLGVBQWUsY0FBYyxFQUFFLG9CQUFvQiw2QkFBNkIsRUFBRSxjQUFjLGtCQUFrQixpQkFBaUIsc0JBQXNCLGdCQUFnQixFQUFFLHVCQUF1Qix3QkFBd0IsaURBQWlELEVBQUUsdUJBQXVCLGNBQWMsd0JBQXdCLG9CQUFvQiwwQkFBMEIsOEJBQThCLG9CQUFvQixFQUFFLGVBQWUsbUJBQW1CLGdCQUFnQixFQUFFLGtCQUFrQixlQUFlLGNBQWMsMEJBQTBCLHdCQUF3QixFQUFFLHdCQUF3QixvQ0FBb0Msd0NBQXdDLHlCQUF5Qiw2QkFBNkIsRUFBRSw0QkFBNEIsMkJBQTJCLDhCQUE4QixvQkFBb0IsRUFBRSxnQ0FBZ0MsbURBQW1ELHNDQUFzQyxFQUFFLHlDQUF5QyxzQkFBc0IsNkJBQTZCLGlCQUFpQixvQkFBb0Isa0JBQWtCLHVCQUF1QixxQkFBcUIsOEJBQThCLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUNOeHZwQiwyQkFBMkIsbUJBQU8sQ0FBQywyR0FBc0Q7QUFDekY7QUFDQSxjQUFjLFFBQVMsb0JBQW9CLHVCQUF1QiwwQkFBMEIsZUFBZSxtQkFBbUIsRUFBRSw0QkFBNEIsdUJBQXVCLG9CQUFvQixXQUFXLFlBQVksYUFBYSxjQUFjLDRCQUE0QixvQkFBb0Isd0JBQXdCLEVBQUUsbUNBQW1DLHVCQUF1QixrQkFBa0Isb0JBQW9CLG1CQUFtQixnQkFBZ0Isa0JBQWtCLHVCQUF1Qiw0QkFBNEIsb0JBQW9CLEVBQUUsMkRBQTJELDBDQUEwQyxzQ0FBc0Msa0NBQWtDLEVBQUUsZ0hBQWdILG9CQUFvQixFQUFFOzs7Ozs7Ozs7Ozs7O0FDRnQxQiwyQkFBMkIsbUJBQU8sQ0FBQywyR0FBc0Q7QUFDekY7QUFDQSxjQUFjLFFBQVMsY0FBYywwQkFBMEIsRUFBRSwwQ0FBMEMsbUJBQW1CLEVBQUUsMkNBQTJDLGtCQUFrQixFQUFFLCtEQUErRCxjQUFjLGFBQWEsd0JBQXdCLHNCQUFzQiwwQkFBMEIsMkRBQTJELDJDQUEyQyxFQUFFLDZEQUE2RCw2QkFBNkIsOEJBQThCLEVBQUUsZ0xBQWdMLGtCQUFrQixFQUFFLHFDQUFxQyx1QkFBdUIsRUFBRSx1REFBdUQsNEJBQTRCLG9CQUFvQix5QkFBeUIsZUFBZSxrQkFBa0Isa0JBQWtCLGdCQUFnQixxQ0FBcUMsaUJBQWlCLEVBQUUsc0JBQXNCLHVCQUF1Qix1QkFBdUIsRUFBRSw4QkFBOEIsNEJBQTRCLG9CQUFvQix5QkFBeUIsaUJBQWlCLGdCQUFnQixtQkFBbUIsZ0JBQWdCLGlDQUFpQyw4QkFBOEIsbUJBQW1CLEVBQUUsMENBQTBDLGlCQUFpQixFQUFFLGdFQUFnRSxpQkFBaUIsRUFBRSx1Q0FBdUMsb0JBQW9CLHFCQUFxQiwyQkFBMkIsd0JBQXdCLG9DQUFvQyxnQ0FBZ0MsRUFBRSxpRUFBaUUsZ0JBQWdCLHVCQUF1QixtQkFBbUIsRUFBRSw4REFBOEQsc0JBQXNCLEVBQUUscUNBQXFDLG1CQUFtQixFQUFFOzs7Ozs7Ozs7Ozs7OztBQ0Y5OUQ7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsZ0JBQWdCO0FBQ3ZELE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxvQkFBb0I7QUFDbkMsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxjQUFjO0FBQ25FO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDbkJBLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsb0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsbUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIseUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIseUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIseUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsMEM7Ozs7Ozs7Ozs7O0FDQXhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxtQkFBTyxDQUFDLHVEQUFROztBQUU5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0EsbUJBQW1CLDJCQUEyQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTs7QUFFQSxRQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQSxLQUFLLEtBQXdDLEVBQUUsRUFFN0M7O0FBRUYsUUFBUSxzQkFBaUI7QUFDekI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkZBLElBQU1BLGdCQUFnQixHQUFHLHNCQUF6QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxvQkFBeEI7QUFFQSxJQUFNQyxPQUFPLEdBQUc7QUFDZEMsTUFBSSxFQUFFLEVBRFE7QUFFZEMsTUFBSSxFQUFFLEVBRlE7QUFHZEMsT0FBSyxFQUFFLEVBSE87QUFJZEMsSUFBRSxFQUFFLEVBSlU7QUFLZEMsTUFBSSxFQUFFLEVBTFE7QUFNZEMsS0FBRyxFQUFFO0FBTlMsQ0FBaEI7QUFTQSxJQUFNQyxpQkFBaUIsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLENBQTFCO0FBQ0FGLGlCQUFpQixDQUFDRyxTQUFsQjtBQWVPLElBQU1DLFdBQWI7QUFBQTtBQUFBO0FBQUE7O0FBQ0UseUJBQWM7QUFBQTs7QUFBQTs7QUFDWjs7QUFDQSxVQUFLQyxZQUFMLENBQWtCO0FBQUVDLFVBQUksRUFBRTtBQUFSLEtBQWxCOztBQUNBLFVBQUtDLFVBQUwsQ0FBZ0JDLFdBQWhCLENBQTRCUixpQkFBaUIsQ0FBQ1MsT0FBbEIsQ0FBMEJDLFNBQTFCLENBQW9DLElBQXBDLENBQTVCOztBQUhZO0FBSWI7O0FBTEg7QUFBQTtBQUFBLHdDQU9zQjtBQUFBOztBQUVsQixXQUFLQyxnQkFBTCxDQUFzQixRQUF0QixFQUFnQyxLQUFLQyxTQUFyQztBQUNBLFdBQUtELGdCQUFMLENBQXNCLFNBQXRCLEVBQWlDLEtBQUtFLFVBQXRDO0FBRUFDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLENBQ1ZDLGNBQWMsQ0FBQ0MsV0FBZixDQUEyQjFCLGdCQUEzQixDQURVLEVBRVZ5QixjQUFjLENBQUNDLFdBQWYsQ0FBMkJ6QixlQUEzQixDQUZVLENBQVosRUFJRzBCLElBSkgsQ0FJUSxVQUFBQyxDQUFDLEVBQUk7QUFFVCxZQUFNQyxRQUFRLEdBQUcsTUFBSSxDQUFDQyxZQUFMLEVBQWpCOztBQUVBRCxnQkFBUSxDQUFDRSxPQUFULENBQWlCLFVBQUFDLE9BQU8sRUFBSTtBQUMxQkEsaUJBQU8sQ0FBQ0MsWUFBUixDQUFxQixVQUFyQixFQUFpQyxDQUFDLENBQWxDOztBQUNBLGNBQU1DLEtBQUssR0FBRyxNQUFJLENBQUNDLGdCQUFMLENBQXNCSCxPQUF0QixDQUFkOztBQUVBQSxpQkFBTyxDQUFDQyxZQUFSLENBQXFCLGVBQXJCLEVBQXNDQyxLQUFLLENBQUNFLEVBQTVDO0FBQ0FGLGVBQUssQ0FBQ0QsWUFBTixDQUFtQixpQkFBbkIsRUFBc0NELE9BQU8sQ0FBQ0ksRUFBOUM7QUFDRCxTQU5EO0FBUUFQLGdCQUFRLENBQUMsQ0FBRCxDQUFSLENBQVlJLFlBQVosQ0FBeUIsVUFBekIsRUFBcUMsQ0FBckM7QUFFQUosZ0JBQVEsQ0FDTEUsT0FESCxDQUNXLFVBQUFDLE9BQU8sRUFBSTtBQUNsQixjQUFNRSxLQUFLLEdBQUcsTUFBSSxDQUFDQyxnQkFBTCxDQUFzQkgsT0FBdEIsQ0FBZDs7QUFDQSxjQUFJLENBQUNBLE9BQU8sQ0FBQ0ssUUFBYixFQUF1QjtBQUNyQixrQkFBSSxDQUFDQyxnQkFBTCxDQUFzQk4sT0FBdEI7O0FBQ0Esa0JBQUksQ0FBQ08sY0FBTCxDQUFvQkwsS0FBcEI7QUFDRCxXQUhELE1BR087QUFDTCxrQkFBSSxDQUFDTSxjQUFMLENBQW9CUixPQUFwQjs7QUFDQSxrQkFBSSxDQUFDUyxZQUFMLENBQWtCUCxLQUFsQjtBQUNEO0FBQ0YsU0FWSDtBQVdELE9BN0JIO0FBOEJEO0FBMUNIO0FBQUE7QUFBQSwyQ0E0Q3lCO0FBQ3JCLFdBQUtRLG1CQUFMLENBQXlCLFFBQXpCLEVBQW1DLEtBQUtyQixTQUF4QztBQUNBLFdBQUtxQixtQkFBTCxDQUF5QixTQUF6QixFQUFvQyxLQUFLcEIsVUFBekM7QUFDRDtBQS9DSDtBQUFBO0FBQUEsK0JBaURhcUIsSUFqRGIsRUFpRG1CO0FBQ2YsYUFBT0EsSUFBSSxDQUFDQyxPQUFMLENBQWFDLFdBQWIsT0FBK0I3QyxnQkFBdEM7QUFDRDtBQW5ESDtBQUFBO0FBQUEsOEJBcURZOEMsS0FyRFosRUFxRG1CO0FBQ2YsV0FBS0MsdUJBQUwsQ0FBNkJELEtBQUssQ0FBQ0UsTUFBbkMsRUFBMkNGLEtBQUssQ0FBQ0csTUFBTixDQUFhQyxhQUF4RDtBQUNEO0FBdkRIO0FBQUE7QUFBQSw0Q0F5RDBCbEIsT0F6RDFCLEVBeURtQ21CLE1BekRuQyxFQXlEMkM7QUFBQTs7QUFFdkMsVUFBSSxLQUFLQyxTQUFMLENBQWVDLFFBQWYsQ0FBd0IsV0FBeEIsQ0FBSixFQUEwQzs7QUFFMUMsVUFBTW5CLEtBQUssR0FBRyxLQUFLQyxnQkFBTCxDQUFzQkgsT0FBdEIsQ0FBZDs7QUFDQSxVQUFJbUIsTUFBSixFQUFZO0FBQ1YsYUFBS1YsWUFBTCxDQUFrQlAsS0FBbEI7O0FBQ0EsYUFBS29CLFVBQUwsQ0FBZ0JwQixLQUFoQjtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUtxQixXQUFMLENBQWlCckIsS0FBakIsRUFDR1AsSUFESCxDQUNRLFVBQUFDLENBQUM7QUFBQSxpQkFBSSxNQUFJLENBQUNXLGNBQUwsQ0FBb0JMLEtBQXBCLENBQUo7QUFBQSxTQURUO0FBRUQ7QUFDRjtBQXJFSDtBQUFBO0FBQUEsK0JBdUVhWSxLQXZFYixFQXVFb0I7QUFDaEIsVUFBTVUsY0FBYyxHQUFHVixLQUFLLENBQUNFLE1BQTdCO0FBRUEsVUFBSSxDQUFDLEtBQUtTLFVBQUwsQ0FBZ0JELGNBQWhCLENBQUwsRUFBc0M7QUFFdEMsVUFBSVYsS0FBSyxDQUFDWSxNQUFWLEVBQWtCO0FBRWxCLFVBQUlDLFVBQUo7O0FBQ0EsY0FBUWIsS0FBSyxDQUFDYyxPQUFkO0FBQ0UsYUFBSzFELE9BQU8sQ0FBQ0UsSUFBYjtBQUNBLGFBQUtGLE9BQU8sQ0FBQ0ksRUFBYjtBQUNFcUQsb0JBQVUsR0FBRyxLQUFLRSxZQUFMLEVBQWI7QUFDQTs7QUFFRixhQUFLM0QsT0FBTyxDQUFDRyxLQUFiO0FBQ0EsYUFBS0gsT0FBTyxDQUFDQyxJQUFiO0FBQ0V3RCxvQkFBVSxHQUFHLEtBQUtHLFlBQUwsRUFBYjtBQUNBOztBQUVGLGFBQUs1RCxPQUFPLENBQUNLLElBQWI7QUFDRW9ELG9CQUFVLEdBQUcsS0FBS0ksYUFBTCxFQUFiO0FBQ0E7O0FBRUYsYUFBSzdELE9BQU8sQ0FBQ00sR0FBYjtBQUNFbUQsb0JBQVUsR0FBRyxLQUFLSyxZQUFMLEVBQWI7QUFDQTs7QUFFRjtBQUNFO0FBcEJKOztBQXVCQWxCLFdBQUssQ0FBQ21CLGNBQU47QUFDQVQsb0JBQWMsQ0FBQ3ZCLFlBQWYsQ0FBNEIsVUFBNUIsRUFBd0MsQ0FBQyxDQUF6QztBQUNBMEIsZ0JBQVUsQ0FBQzFCLFlBQVgsQ0FBd0IsVUFBeEIsRUFBb0MsQ0FBcEM7QUFDQTBCLGdCQUFVLENBQUNPLEtBQVg7QUFDRDtBQTFHSDtBQUFBO0FBQUEsaUNBNEdlO0FBQ1gsYUFBT0MsS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBS0MsZ0JBQUwsQ0FBc0JwRSxlQUF0QixDQUFYLENBQVA7QUFDRDtBQTlHSDtBQUFBO0FBQUEsbUNBZ0hpQjtBQUNiLGFBQU9rRSxLQUFLLENBQUNDLElBQU4sQ0FBVyxLQUFLQyxnQkFBTCxDQUFzQnJFLGdCQUF0QixDQUFYLENBQVA7QUFDRDtBQWxISDtBQUFBO0FBQUEscUNBb0htQmdDLE9BcEhuQixFQW9INEI7QUFDeEIsVUFBTXNDLElBQUksR0FBR3RDLE9BQU8sQ0FBQ3VDLGtCQUFyQjs7QUFDQSxVQUFJRCxJQUFJLENBQUMxQixPQUFMLENBQWFDLFdBQWIsT0FBK0I1QyxlQUFuQyxFQUFvRDtBQUNsRHVFLGVBQU8sQ0FBQ0MsS0FBUixDQUFjLGtEQUFkO0FBQ0E7QUFDRDs7QUFDRCxhQUFPSCxJQUFQO0FBQ0Q7QUEzSEg7QUFBQTtBQUFBLG1DQTZIaUI7QUFDYixVQUFNekMsUUFBUSxHQUFHLEtBQUtDLFlBQUwsRUFBakI7O0FBRUEsVUFBSTRDLE1BQU0sR0FBRzdDLFFBQVEsQ0FBQzhDLFNBQVQsQ0FBbUIsVUFBQTlDLFFBQVE7QUFBQSxlQUNwQ0EsUUFBUSxLQUFLbkIsUUFBUSxDQUFDa0UsYUFEYztBQUFBLE9BQTNCLElBQzhCLENBRDNDO0FBR0EsYUFBTy9DLFFBQVEsQ0FBQyxDQUFDNkMsTUFBTSxHQUFHN0MsUUFBUSxDQUFDZ0QsTUFBbkIsSUFBNkJoRCxRQUFRLENBQUNnRCxNQUF2QyxDQUFmO0FBQ0Q7QUFwSUg7QUFBQTtBQUFBLG1DQXNJaUI7QUFDYixVQUFNaEQsUUFBUSxHQUFHLEtBQUtDLFlBQUwsRUFBakI7O0FBQ0EsVUFBSTRDLE1BQU0sR0FBRzdDLFFBQVEsQ0FBQzhDLFNBQVQsQ0FBbUIsVUFBQTNDLE9BQU87QUFBQSxlQUNuQ0EsT0FBTyxLQUFLdEIsUUFBUSxDQUFDa0UsYUFEYztBQUFBLE9BQTFCLElBQzZCLENBRDFDO0FBR0EsYUFBTy9DLFFBQVEsQ0FBQzZDLE1BQU0sR0FBRzdDLFFBQVEsQ0FBQ2dELE1BQW5CLENBQWY7QUFDRDtBQTVJSDtBQUFBO0FBQUEsb0NBOElrQjtBQUNkLFVBQU1oRCxRQUFRLEdBQUcsS0FBS0MsWUFBTCxFQUFqQjs7QUFDQSxhQUFPRCxRQUFRLENBQUMsQ0FBRCxDQUFmO0FBQ0Q7QUFqSkg7QUFBQTtBQUFBLG1DQW1KaUI7QUFDYixVQUFNQSxRQUFRLEdBQUcsS0FBS0MsWUFBTCxFQUFqQjs7QUFDQSxhQUFPRCxRQUFRLENBQUNBLFFBQVEsQ0FBQ2dELE1BQVQsR0FBa0IsQ0FBbkIsQ0FBZjtBQUNEO0FBdEpIO0FBQUE7QUFBQSxpQ0F3SmUzQyxLQXhKZixFQXdKc0I7QUFDbEJBLFdBQUssQ0FBQ0csUUFBTixHQUFpQixJQUFqQjtBQUNEO0FBMUpIO0FBQUE7QUFBQSxtQ0E0SmlCSCxLQTVKakIsRUE0SndCO0FBQ3BCQSxXQUFLLENBQUNHLFFBQU4sR0FBaUIsS0FBakI7QUFDRDtBQTlKSDtBQUFBO0FBQUEsbUNBZ0tpQkwsT0FoS2pCLEVBZ0swQjtBQUN0QkEsYUFBTyxDQUFDSyxRQUFSLEdBQW1CLElBQW5CO0FBQ0Q7QUFsS0g7QUFBQTtBQUFBLHFDQW9LbUJMLE9BcEtuQixFQW9LNEI7QUFDeEJBLGFBQU8sQ0FBQ0ssUUFBUixHQUFtQixLQUFuQjtBQUNEO0FBdEtIO0FBQUE7QUFBQSwrQkF3S2FILEtBeEtiLEVBd0tvQjtBQUNoQixVQUFNNEMsTUFBTSxHQUFHNUMsS0FBSyxDQUFDNkMscUJBQU4sR0FBOEJELE1BQTdDO0FBQ0EsYUFBTyxLQUFLRSxRQUFMLENBQWM5QyxLQUFkLEVBQXFCLENBQUM0QyxNQUF0QixFQUE4QixDQUE5QixDQUFQO0FBQ0Q7QUEzS0g7QUFBQTtBQUFBLGdDQTZLYzVDLEtBN0tkLEVBNktxQjtBQUNqQixVQUFNNEMsTUFBTSxHQUFHNUMsS0FBSyxDQUFDNkMscUJBQU4sR0FBOEJELE1BQTdDO0FBQ0EsYUFBTyxLQUFLRSxRQUFMLENBQWM5QyxLQUFkLEVBQXFCLENBQXJCLEVBQXdCLENBQUM0QyxNQUF6QixDQUFQO0FBQ0Q7QUFoTEg7QUFBQTtBQUFBLDZCQWtMVzVDLEtBbExYLEVBa0xrQitDLFdBbExsQixFQWtMK0JDLFNBbEwvQixFQWtMMEM7QUFBQTs7QUFFdEMsVUFBSUQsV0FBVyxLQUFLQyxTQUFwQixFQUNFLE9BQU8zRCxPQUFPLENBQUM0RCxPQUFSLEVBQVA7QUFFRixXQUFLL0IsU0FBTCxDQUFlZ0MsR0FBZixDQUFtQixXQUFuQjtBQUVBLFVBQU1DLFFBQVEsR0FBR2xCLEtBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUtpQixRQUFoQixDQUFqQjtBQUVBLFVBQU1DLEdBQUcsR0FBR0QsUUFBUSxDQUFDRSxPQUFULENBQWlCckQsS0FBakIsQ0FBWjtBQUVBLFVBQU1zRCxnQkFBZ0IsR0FBR0gsUUFBUSxDQUFDSSxLQUFULENBQWVILEdBQWYsQ0FBekI7QUFDQSxXQUFLSSxLQUFMLENBQVdDLFFBQVgsR0FBc0IsUUFBdEI7QUFFQU4sY0FBUSxDQUFDdEQsT0FBVCxDQUFpQixVQUFBNkQsS0FBSyxFQUFJO0FBQ3hCQSxhQUFLLENBQUNGLEtBQU4sQ0FBWUcsUUFBWixHQUF1QixVQUF2QjtBQUNBRCxhQUFLLENBQUNGLEtBQU4sQ0FBWUksTUFBWixHQUFxQixDQUFyQjtBQUNELE9BSEQ7QUFLQU4sc0JBQWdCLENBQUN6RCxPQUFqQixDQUF5QixVQUFBNkQsS0FBSyxFQUFJO0FBQ2hDQSxhQUFLLENBQUNGLEtBQU4sQ0FBWUcsUUFBWixHQUF1QixVQUF2QjtBQUNBRCxhQUFLLENBQUNGLEtBQU4sQ0FBWUksTUFBWixHQUFxQixDQUFyQjtBQUNBRixhQUFLLENBQUNGLEtBQU4sQ0FBWUssU0FBWix3QkFBc0NkLFdBQXRDO0FBQ0QsT0FKRDtBQU1BLGFBQU9lLDRCQUE0QixHQUNoQ3JFLElBREksQ0FDQyxVQUFBQyxDQUFDO0FBQUEsZUFBSW9FLDRCQUE0QixFQUFoQztBQUFBLE9BREYsRUFFSnJFLElBRkksQ0FFQyxVQUFBQyxDQUFDLEVBQUk7QUFDVDRELHdCQUFnQixDQUFDekQsT0FBakIsQ0FBeUIsVUFBQTZELEtBQUssRUFBSTtBQUNoQ0EsZUFBSyxDQUFDRixLQUFOLENBQVlLLFNBQVosd0JBQXNDYixTQUF0QztBQUNBVSxlQUFLLENBQUN4QyxTQUFOLENBQWdCZ0MsR0FBaEIsQ0FBb0IsV0FBcEI7QUFDRCxTQUhEO0FBS0EsZUFBT2Esb0JBQW9CLENBQUMvRCxLQUFELENBQTNCO0FBQ0QsT0FUSSxFQVVKUCxJQVZJLENBVUMsVUFBQUMsQ0FBQyxFQUFJO0FBQ1Q0RCx3QkFBZ0IsQ0FBQ3pELE9BQWpCLENBQXlCLFVBQUE2RCxLQUFLLEVBQUk7QUFDaENBLGVBQUssQ0FBQ0YsS0FBTixDQUFZSyxTQUFaLEdBQXdCLEVBQXhCO0FBQ0FILGVBQUssQ0FBQ3hDLFNBQU4sQ0FBZ0I4QyxNQUFoQixDQUF1QixXQUF2QjtBQUNELFNBSEQ7QUFJQWIsZ0JBQVEsQ0FBQ3RELE9BQVQsQ0FBaUIsVUFBQTZELEtBQUssRUFBSTtBQUN4QkEsZUFBSyxDQUFDRixLQUFOLENBQVlHLFFBQVosR0FBdUIsRUFBdkI7QUFDQUQsZUFBSyxDQUFDRixLQUFOLENBQVlJLE1BQVosR0FBcUIsRUFBckI7QUFDRCxTQUhEO0FBSUEsY0FBSSxDQUFDSixLQUFMLENBQVdDLFFBQVgsR0FBc0IsRUFBdEI7O0FBQ0EsY0FBSSxDQUFDdkMsU0FBTCxDQUFlOEMsTUFBZixDQUFzQixXQUF0QjtBQUNELE9BckJJLENBQVA7QUFzQkQ7QUFqT0g7O0FBQUE7QUFBQSxtQkFBaUNDLFdBQWpDO0FBb09BLElBQUlDLGdCQUFnQixHQUFHLENBQXZCO0FBRUEsSUFBTUMsd0JBQXdCLEdBQUczRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBakM7QUFDQTBGLHdCQUF3QixDQUFDekYsU0FBekI7QUFnQk8sSUFBTTBGLGtCQUFiO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx3QkFDa0M7QUFDOUIsYUFBTyxDQUFDLFVBQUQsQ0FBUDtBQUNEO0FBSEg7O0FBS0UsZ0NBQWM7QUFBQTs7QUFBQTs7QUFDWjtBQUVBLFdBQUtDLFFBQUwsR0FBZ0IsT0FBS0EsUUFBTCxDQUFjQyxJQUFkLHdEQUFoQjs7QUFFQSxXQUFLMUYsWUFBTCxDQUFrQjtBQUNoQkMsVUFBSSxFQUFFLE1BRFU7QUFFaEIwRixvQkFBYyxFQUFFO0FBRkEsS0FBbEI7O0FBSUEsV0FBS3pGLFVBQUwsQ0FBZ0JDLFdBQWhCLENBQ0VvRix3QkFBd0IsQ0FBQ25GLE9BQXpCLENBQWlDQyxTQUFqQyxDQUEyQyxJQUEzQyxDQURGOztBQUdBLFdBQUt1RixhQUFMLEdBQXFCLE9BQUsxRixVQUFMLENBQWdCMkYsYUFBaEIsQ0FBOEIsUUFBOUIsQ0FBckI7QUFaWTtBQWFiOztBQWxCSDtBQUFBO0FBQUEsd0NBb0JzQjtBQUVsQixVQUFJLENBQUMsS0FBS0MsWUFBTCxDQUFrQixNQUFsQixDQUFMLEVBQ0UsS0FBSzNFLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsU0FBMUI7QUFFRixVQUFJLENBQUMsS0FBS0csRUFBVixFQUNFLEtBQUtBLEVBQUwsYUFBYXBDLGdCQUFiLHdCQUEyQ29HLGdCQUFnQixFQUEzRDs7QUFDRixXQUFLTSxhQUFMLENBQW1CdEYsZ0JBQW5CLENBQW9DLE9BQXBDLEVBQTZDLEtBQUttRixRQUFsRDs7QUFDQSxXQUFLRyxhQUFMLENBQW1CekUsWUFBbkIsQ0FBZ0MsZUFBaEMsRUFBaUQsT0FBakQ7QUFDRDtBQTdCSDtBQUFBO0FBQUEsMkNBK0J5QjtBQUNyQixXQUFLeUUsYUFBTCxDQUFtQmhFLG1CQUFuQixDQUF1QyxPQUF2QyxFQUFnRCxLQUFLNkQsUUFBckQ7QUFDRDtBQWpDSDtBQUFBO0FBQUEsNkNBbUMyQk0sSUFuQzNCLEVBbUNpQztBQUM3QixVQUFNQyxLQUFLLEdBQUcsS0FBS0YsWUFBTCxDQUFrQixVQUFsQixDQUFkOztBQUNBLFdBQUtGLGFBQUwsQ0FBbUJ6RSxZQUFuQixDQUFnQyxlQUFoQyxFQUFpRDZFLEtBQWpEO0FBQ0Q7QUF0Q0g7QUFBQTtBQUFBLCtCQW9EYTtBQUNULFdBQUt6RSxRQUFMLEdBQWdCLENBQUMsS0FBS0EsUUFBdEI7QUFDQSxXQUFLMEUsYUFBTCxDQUNFLElBQUlDLFdBQUosQ0FBZ0IsUUFBaEIsRUFBMEI7QUFDeEIvRCxjQUFNLEVBQUU7QUFBRUMsdUJBQWEsRUFBRSxLQUFLYjtBQUF0QixTQURnQjtBQUV4QjRFLGVBQU8sRUFBRTtBQUZlLE9BQTFCLENBREY7QUFNRDtBQTVESDtBQUFBO0FBQUEsd0JBd0NpQjtBQUNiLGFBQU8sS0FBS0wsWUFBTCxDQUFrQixVQUFsQixDQUFQO0FBQ0QsS0ExQ0g7QUFBQSxzQkE0Q2VFLEtBNUNmLEVBNENzQjtBQUNsQkEsV0FBSyxHQUFHSSxPQUFPLENBQUNKLEtBQUQsQ0FBZjtBQUNBLFVBQUlBLEtBQUosRUFDRSxLQUFLN0UsWUFBTCxDQUFrQixVQUFsQixFQUE4QixFQUE5QixFQURGLEtBR0UsS0FBS2tGLGVBQUwsQ0FBcUIsVUFBckI7QUFDSDtBQWxESDs7QUFBQTtBQUFBLG1CQUF3Q2hCLFdBQXhDO0FBK0RBLElBQU1pQixzQkFBc0IsR0FBRzFHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUEvQjtBQUNBeUcsc0JBQXNCLENBQUN4RyxTQUF2QjtBQVNBLElBQUl5RyxjQUFjLEdBQUcsQ0FBckI7QUFFTyxJQUFNQyxnQkFBYjtBQUFBO0FBQUE7QUFBQTs7QUFDRSw4QkFBYztBQUFBOztBQUFBOztBQUNaOztBQUNBLFdBQUt4RyxZQUFMLENBQWtCO0FBQUVDLFVBQUksRUFBRTtBQUFSLEtBQWxCOztBQUNBLFdBQUtDLFVBQUwsQ0FBZ0JDLFdBQWhCLENBQ0VtRyxzQkFBc0IsQ0FBQ2xHLE9BQXZCLENBQStCQyxTQUEvQixDQUF5QyxJQUF6QyxDQURGOztBQUhZO0FBTWI7O0FBUEg7QUFBQTtBQUFBLHdDQVNzQjtBQUVsQixVQUFJLENBQUMsS0FBS3lGLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBTCxFQUNFLEtBQUszRSxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLFFBQTFCO0FBQ0YsVUFBSSxDQUFDLEtBQUtHLEVBQVYsRUFDRSxLQUFLQSxFQUFMLGFBQWFuQyxlQUFiLHdCQUEwQ29ILGNBQWMsRUFBeEQ7QUFDSDtBQWZIO0FBQUE7QUFBQSx3QkFpQmlCO0FBQ2IsYUFBTyxLQUFLVCxZQUFMLENBQWtCLFVBQWxCLENBQVA7QUFDRCxLQW5CSDtBQUFBLHNCQXFCZVcsR0FyQmYsRUFxQm9CO0FBQ2hCLFVBQU1ULEtBQUssR0FBR0ksT0FBTyxDQUFDSyxHQUFELENBQXJCO0FBQ0EsVUFBSVQsS0FBSixFQUNFLEtBQUs3RSxZQUFMLENBQWtCLFVBQWxCLEVBQThCLEVBQTlCLEVBREYsS0FHRSxLQUFLa0YsZUFBTCxDQUFxQixVQUFyQjtBQUNIO0FBM0JIOztBQUFBO0FBQUEsbUJBQXNDaEIsV0FBdEM7O0FBK0JBLFNBQVNGLG9CQUFULENBQThCdUIsT0FBOUIsRUFBdUM7QUFDckMsU0FBTyxJQUFJakcsT0FBSixDQUFZLFVBQUE0RCxPQUFPLEVBQUk7QUFDNUJxQyxXQUFPLENBQUNwRyxnQkFBUixDQUF5QixlQUF6QixFQUEwQyxTQUFTcUcsQ0FBVCxHQUFhO0FBQ3JERCxhQUFPLENBQUM5RSxtQkFBUixDQUE0QixlQUE1QixFQUE2QytFLENBQTdDO0FBQ0F0QyxhQUFPO0FBQ1IsS0FIRDtBQUlELEdBTE0sQ0FBUDtBQU1EOztBQUVELFNBQVNhLDRCQUFULEdBQXdDO0FBQ3RDLFNBQU8sSUFBSXpFLE9BQUosQ0FBWSxVQUFBNEQsT0FBTztBQUFBLFdBQUl1QyxxQkFBcUIsQ0FBQ3ZDLE9BQUQsQ0FBekI7QUFBQSxHQUFuQixDQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZZRCxJQUFNd0MsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsUUFBRCxFQUFjO0FBQzdCLFNBQU9DLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixRQUFaLEVBQXNCRyxNQUF0QixDQUE2QixVQUFBQyxHQUFHO0FBQUEsV0FBSUosUUFBUSxDQUFDSSxHQUFELENBQVo7QUFBQSxHQUFoQyxFQUFtREMsSUFBbkQsQ0FBd0QsR0FBeEQsQ0FBUDtBQUNELENBRkQ7O0FBSUEsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsUUFBRCxFQUFjO0FBQzdCLFNBQU9OLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSyxRQUFaLEVBQXNCSixNQUF0QixDQUE2QixVQUFBckMsS0FBSztBQUFBLFdBQUl5QyxRQUFRLENBQUN6QyxLQUFELENBQVo7QUFBQSxHQUFsQyxFQUF1RHVDLElBQXZELENBQTRELEdBQTVELENBQVA7QUFDRCxDQUZEOztBQUlPLElBQU1HLE1BQWI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHdCQUVtQjtBQUNmLGFBQU8sV0FBUDtBQUNEO0FBSkg7QUFBQTtBQUFBLHdCQU1tQztBQUMvQixhQUFPLENBQUMsVUFBRCxFQUFhLFVBQWIsRUFBeUIsTUFBekIsQ0FBUDtBQUNEO0FBUkg7O0FBVUUsb0JBQWM7QUFBQTs7QUFBQTs7QUFDWjs7QUFDQSxVQUFLQyxlQUFMOztBQUNBLFVBQUtDLE9BQUw7O0FBSFk7QUFJYjs7QUFkSDtBQUFBO0FBQUEsc0NBZ0JvQjtBQUNoQixXQUFLQyxRQUFMLEdBQWdCLEtBQUtDLFlBQUwsQ0FBa0IsVUFBbEIsS0FBaUMsTUFBakQ7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLEtBQUtELFlBQUwsQ0FBa0IsTUFBbEIsQ0FBbEI7QUFDQSxXQUFLRSxXQUFMLEdBQW1CLEtBQUs5QixZQUFMLENBQWtCLFVBQWxCLENBQW5CO0FBQ0EsV0FBSytCLFdBQUwsR0FBbUIsS0FBSy9CLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBbkI7QUFDQSxXQUFLZ0MsT0FBTCxHQUFlLEtBQUtKLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBZjtBQUNBLFdBQUtLLFdBQUwsR0FBbUIsS0FBS0wsWUFBTCxDQUFrQixPQUFsQixDQUFuQjtBQUNEO0FBdkJIO0FBQUE7QUFBQSw4QkF5Qlk7QUFDUixXQUFLNUgsU0FBTCxxREFDaUMrRyxRQUFRLENBQUM7QUFDdEMsOERBQXFELElBRGY7QUFFdEMsb0NBQTZCLEtBQUtZLFFBQUwsS0FBa0IsTUFGVDtBQUd0QyxxQ0FBOEIsS0FBS0EsUUFBTCxLQUFrQixPQUhWO0FBSXRDLCtCQUF1QixLQUFLSSxXQUpVO0FBS3RDLDZCQUFxQixLQUFLRDtBQUxZLE9BQUQsQ0FEekMsd0NBUW1CZixRQUFRLENBQUM7QUFDdEIsd0JBQWdCLElBRE07QUFFdEIsd0JBQWdCLElBRk07QUFHdEIsK0JBQXdCLEtBQUtZLFFBQUwsS0FBa0IsTUFIcEI7QUFJdEIsZ0NBQXlCLEtBQUtBLFFBQUwsS0FBa0I7QUFKckIsT0FBRCxDQVIzQix1RkFlZ0QsS0FBS08sV0FBTCxJQUFvQixRQWZwRTtBQWtCRDtBQTVDSDtBQUFBO0FBQUEsd0NBOEN1QjtBQUVuQixXQUFLQyxLQUFMLEdBQWEsS0FBS3BDLGFBQUwsQ0FBbUIsZUFBbkIsQ0FBYjtBQUNBLFdBQUtxQyxPQUFMLEdBQWUsS0FBS3JDLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBZjs7QUFFQSxVQUFHLEtBQUs4QixVQUFSLEVBQW9CO0FBQ2xCLGFBQUtNLEtBQUwsQ0FBV0UsU0FBWCxJQUF3QixNQUFNLEtBQUtSLFVBQW5DO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS00sS0FBTCxDQUFXRyxhQUFYLENBQXlCQyxXQUF6QixDQUFxQyxLQUFLSixLQUExQztBQUNEOztBQUVELFVBQUcsS0FBS0YsV0FBUixFQUFxQjtBQUNuQixhQUFLRyxPQUFMLENBQWFDLFNBQWIsSUFBMEIsTUFBTSxLQUFLSixXQUFyQztBQUNEOztBQUVELFVBQUcsS0FBS0QsT0FBUixFQUFpQjtBQUNmLGFBQUtJLE9BQUwsQ0FBYXRELEtBQWIsR0FBcUIsS0FBS2tELE9BQTFCO0FBQ0Q7QUFDRjtBQWhFSDtBQUFBO0FBQUEsNkNBa0U0QlEsUUFsRTVCLEVBa0VzQ0MsUUFsRXRDLEVBa0VnREMsUUFsRWhELEVBa0UwRDtBQUN0RCxVQUFHRixRQUFRLElBQUlDLFFBQVEsS0FBS0MsUUFBNUIsRUFBc0M7QUFDcEMsYUFBS2pCLGVBQUw7O0FBQ0EsYUFBS0MsT0FBTDtBQUNEO0FBQ0Y7QUF2RUg7O0FBQUE7QUFBQSxtQkFBNEJuQyxXQUE1QjtBQTBFQTFFLGNBQWMsQ0FBQzhILE1BQWYsQ0FBc0JuQixNQUFNLENBQUNvQixFQUE3QixFQUFpQ3BCLE1BQWpDLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkZBO0FBQ0E7QUFFTyxJQUFNcUIsUUFBYjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsd0JBRWtCO0FBQ2QsYUFBTyxhQUFQO0FBQ0Q7QUFKSDtBQUFBO0FBQUEsd0JBTWtDO0FBQzlCLGFBQU8sQ0FDTCxPQURLLEVBQ0ksTUFESixFQUNZLFVBRFosRUFDd0IsU0FEeEIsRUFDbUMsUUFEbkMsRUFDNkMsT0FEN0MsRUFDc0QsVUFEdEQsRUFFTCxTQUZLLEVBRU0sT0FGTixFQUVlLGFBRmYsRUFFOEIsbUJBRjlCLENBQVA7QUFJRDtBQVhIOztBQWFFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7QUFFQSxVQUFLQyxZQUFMO0FBQW9CO0FBQTJCLFFBQS9DO0FBQ0EsVUFBS0MsWUFBTDtBQUFvQjtBQUEyQixRQUEvQztBQUNBLFVBQUtDLGNBQUw7QUFBc0I7QUFBMkIsUUFBakQ7QUFDQSxVQUFLQyxjQUFMO0FBQXNCO0FBQTJCLFFBQWpEO0FBTlk7QUFPYjs7QUFwQkg7QUFBQTtBQUFBLDhCQXNCWTtBQUNSOztBQUNBOztBQUNBckYsYUFBTyxDQUFDc0YsR0FBUixDQUFZLHdDQUFaLEVBQXNELEtBQUtDLE9BQTNELEVBQW9FLEtBQUtDLFFBQXpFLEVBQW1GLEtBQUtDLE9BQXhGO0FBRUEsV0FBS3JKLFNBQUwsbU1BSWMsS0FBS3NKLE9BSm5CLHFDQUtnQixLQUFLckQsSUFMckIsc0NBTWlCLEtBQUtDLEtBTnRCLHlDQU9vQixLQUFLcUQsUUFBTCxJQUFpQixDQVByQyxxQ0FRaUIsS0FBS0YsT0FBTCxHQUFlLGdCQUFmLEdBQWdDLEVBUmpELCtPQWNnQ3RDLGlFQUFRLENBQUM7QUFDbkMsbUNBQTBCLElBRFM7QUFFbkMsMENBQWtDLElBRkM7QUFHbkMsMkJBQW1CLEtBQUtvQyxPQUhXO0FBSW5DLDZCQUFxQixLQUFLQyxRQUpTO0FBS25DLDBCQUFrQixLQUFLQztBQUxZLE9BQUQsQ0FkeEMsMENBcUJxQnRDLGlFQUFRLENBQUM7QUFDdEIsMkJBQW1CLElBREc7QUFFdEIsd0JBQWdCLElBRk07QUFHdEIsdUJBQWUsS0FBS29DO0FBSEUsT0FBRCxDQXJCN0IsNklBOEJhcEMsaUVBQVEsQ0FBQztBQUNoQiwyQkFBbUIsSUFESDtBQUVoQiwyQkFBbUIsS0FBS29DLE9BRlI7QUFHaEIsNkJBQXFCLEtBQUtDLFFBSFY7QUFJaEIsMEJBQWtCLEtBQUtDO0FBSlAsT0FBRCxDQTlCckIsc0JBbUNnQixLQUFLQyxPQW5DckIsZ0JBbUNpQyxLQUFLRSxLQW5DdEM7O0FBdUNBOztBQUNBO0FBQ0Q7QUFwRUg7QUFBQTtBQUFBLHdDQXNFc0I7QUFBQTs7QUFDbEIsV0FBSzlCLE9BQUw7O0FBQ0EsMkVBQXdCdkcsT0FBeEIsQ0FBZ0MsVUFBQXFILFFBQVEsRUFBSTtBQUMxQyxZQUFNaUIsYUFBYSxHQUFHQyxvRUFBVyxDQUFDbEIsUUFBRCxDQUFqQzs7QUFDQSxjQUFJLENBQUNtQixhQUFMLENBQW1CRixhQUFuQixFQUFrQyxNQUFJLENBQUNBLGFBQUQsQ0FBdEM7QUFDRCxPQUhEO0FBSUQ7QUE1RUg7QUFBQTtBQUFBLHNDQThFb0JHLEdBOUVwQixFQThFeUI7QUFDckJBLFNBQUcsQ0FBQ3ZHLGNBQUo7O0FBRUEsVUFBRyxLQUFLK0YsUUFBUixFQUFrQjtBQUNoQjtBQUNEOztBQUVELFdBQUtELE9BQUwsR0FBZSxDQUFDLEtBQUtBLE9BQXJCO0FBQ0EsV0FBS0YsY0FBTCxDQUFvQjNGLEtBQXBCO0FBQ0Q7QUF2Rkg7QUFBQTtBQUFBLHNDQXlGb0J1RyxDQXpGcEIsRUF5RnVCO0FBQ25CLFdBQUtSLE9BQUwsR0FBZSxJQUFmOztBQUNBLFdBQUszQixPQUFMO0FBQ0Q7QUE1Rkg7QUFBQTtBQUFBLHFDQThGbUJtQyxDQTlGbkIsRUE4RnNCO0FBQ2xCLFdBQUtSLE9BQUwsR0FBZSxLQUFmOztBQUNBLFdBQUszQixPQUFMO0FBQ0Q7QUFqR0g7QUFBQTtBQUFBLHVDQW1HcUJrQyxHQW5HckIsRUFtRzBCO0FBQ3RCLFdBQUtULE9BQUwsR0FBZVMsR0FBRyxDQUFDeEgsTUFBSixDQUFXK0csT0FBMUI7QUFDRDtBQXJHSDtBQUFBO0FBQUEsNkNBdUcyQlgsUUF2RzNCLEVBdUdxQ0MsUUF2R3JDLEVBdUcrQ0MsUUF2Ry9DLEVBdUd5RDtBQUNyRCxVQUFJRixRQUFRLElBQUlDLFFBQVEsS0FBS0MsUUFBN0IsRUFBdUM7QUFDckMsYUFBS2dCLG9FQUFXLENBQUNsQixRQUFELENBQWhCLElBQThCRSxRQUE5Qjs7QUFDQSxhQUFLaEIsT0FBTDs7QUFDQSxhQUFLaUMsYUFBTCxDQUFtQm5CLFFBQW5CLEVBQTZCRSxRQUE3QjtBQUNEO0FBQ0Y7QUE3R0g7QUFBQTtBQUFBLGtDQStHZ0JGLFFBL0doQixFQStHMEJzQixTQS9HMUIsRUErR3FDO0FBRWpDLGNBQVF0QixRQUFSO0FBQ0UsYUFBSyxPQUFMO0FBQWM7QUFDWjVFLG1CQUFPLENBQUNzRixHQUFSLENBQVksTUFBWixFQUFvQlYsUUFBcEI7QUFDQSxpQkFBS00sWUFBTCxDQUFrQmhFLEtBQWxCLEdBQTBCZ0YsU0FBMUI7QUFDRDtBQUFBO0FBQUU7O0FBRUgsYUFBSyxhQUFMO0FBQW9CO0FBQ2xCbEcsbUJBQU8sQ0FBQ3NGLEdBQVIsQ0FBWSxNQUFaLEVBQW9CVixRQUFwQjtBQUNBLGlCQUFLTSxZQUFMLENBQWtCdEcsU0FBbEIsQ0FBNEJnQyxHQUE1QixDQUFnQ3NGLFNBQWhDO0FBQ0Q7QUFBQTtBQUFFOztBQUVILGFBQUssbUJBQUw7QUFBMEI7QUFDeEJsRyxtQkFBTyxDQUFDc0YsR0FBUixDQUFZLE1BQVosRUFBb0JWLFFBQXBCO0FBQ0EsaUJBQUtRLGNBQUwsQ0FBb0J4RyxTQUFwQixDQUE4QmdDLEdBQTlCLENBQWtDc0YsU0FBbEM7QUFDRDtBQUFBO0FBQUU7O0FBRUgsYUFBSyxTQUFMO0FBQWdCO0FBQ2RsRyxtQkFBTyxDQUFDc0YsR0FBUixDQUFZLE1BQVosRUFBb0JWLFFBQXBCO0FBQ0EsaUJBQUtTLGNBQUwsQ0FBb0I1SCxZQUFwQixDQUFpQyxTQUFqQyxFQUE0QyxFQUE1QztBQUNEO0FBQUE7QUFBRTs7QUFFSCxhQUFLLFVBQUw7QUFBaUI7QUFDZnVDLG1CQUFPLENBQUNzRixHQUFSLENBQVksTUFBWixFQUFvQlYsUUFBcEI7QUFDQSxpQkFBS1MsY0FBTCxDQUFvQjVILFlBQXBCLENBQWlDLFVBQWpDLEVBQTZDLEVBQTdDO0FBQ0Q7QUFBQTtBQUFFO0FBeEJMO0FBMEJEO0FBM0lIOztBQUFBO0FBQUEsRUFBOEIwSSxxREFBOUI7QUE4SUFsSixjQUFjLENBQUM4SCxNQUFmLENBQXNCRSxRQUFRLENBQUNELEVBQS9CLEVBQW1DQyxRQUFuQyxFOzs7Ozs7Ozs7Ozs7QUNqSkEsY0FBYyxtQkFBTyxDQUFDLG9QQUEwSDs7QUFFaEosNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLG9QQUEwSDtBQUM3SSxtQkFBbUIsbUJBQU8sQ0FBQyxvUEFBMEg7O0FBRXJKLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNDQTtBQUVPLElBQU1rQixTQUFiO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx3QkFFMEI7QUFDdEIsYUFBTyxLQUFLQyxrQkFBWjtBQUNEO0FBSkg7O0FBTUUsdUJBQWM7QUFBQTs7QUFBQTs7QUFDWjtBQUNBLFVBQUtDLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0EsVUFBS0Qsa0JBQUwsR0FBMEIsRUFBMUI7QUFDQSxVQUFLRSxZQUFMLEdBQW9CLEtBQXBCO0FBSlk7QUFLYjs7QUFYSDtBQUFBO0FBQUEsMkNBYXlCO0FBQ3JCLFdBQUtDLHFCQUFMO0FBQ0Q7QUFmSDtBQUFBO0FBQUEsOENBaUI0QjtBQUFBOztBQUN4QixVQUFJLEtBQUtELFlBQVQsRUFBdUI7QUFFdkIzRyxXQUFLLENBQUNDLElBQU4sQ0FBVyxLQUFLNEcsVUFBaEIsRUFBNEJqSixPQUE1QixDQUFvQyxVQUFBa0osSUFBSSxFQUFJO0FBQzFDLGNBQUksQ0FBQ1gsb0VBQVcsQ0FBQ1csSUFBSSxDQUFDcEUsSUFBTixDQUFaLENBQUosR0FBK0JvRSxJQUFJLENBQUNuRSxLQUFMLElBQWMsSUFBN0M7O0FBQ0EsY0FBSSxDQUFDOEQsa0JBQUwsQ0FBd0JNLElBQXhCLENBQTZCRCxJQUFJLENBQUNwRSxJQUFsQztBQUNELE9BSEQ7QUFLQSxXQUFLaUUsWUFBTCxHQUFvQixJQUFwQjtBQUNEO0FBMUJIO0FBQUE7QUFBQSx5Q0E0QnVCO0FBQUE7O0FBQ25CLFdBQUtLLGVBQUwsQ0FBcUIsS0FBckIsRUFBNEIsVUFBQ0MsRUFBRCxFQUFLSCxJQUFMLEVBQWM7QUFDeEMsY0FBSSxDQUFDWCxvRUFBVyxDQUFDVyxJQUFJLENBQUNwRSxJQUFOLENBQVosQ0FBSixHQUErQnVFLEVBQS9CO0FBQ0QsT0FGRDtBQUdEO0FBaENIO0FBQUE7QUFBQSx5Q0FrQ3VCO0FBQUE7O0FBQ25CLFdBQUtELGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsVUFBQ0MsRUFBRCxFQUFLSCxJQUFMLEVBQWM7QUFDdkMsWUFBTUksUUFBUSxHQUFHQyxJQUFJLENBQUMsTUFBSSxDQUFDTCxJQUFJLENBQUNuRSxLQUFOLENBQUwsQ0FBckI7QUFDQSxZQUFNeUUsU0FBUyxHQUFHTixJQUFJLENBQUNwRSxJQUFMLENBQVUyRSxPQUFWLENBQWtCLElBQWxCLEVBQXdCLEVBQXhCLENBQWxCO0FBQ0FKLFVBQUUsQ0FBQ2hLLGdCQUFILENBQW9CbUssU0FBcEIsRUFBK0JGLFFBQVEsQ0FBQzdFLElBQVQsQ0FBYyxNQUFkLENBQS9COztBQUNBLGNBQUksQ0FBQ3FFLGtCQUFMLENBQXdCSyxJQUF4QixDQUE2QjtBQUFFRSxZQUFFLEVBQUZBLEVBQUY7QUFBTUcsbUJBQVMsRUFBVEEsU0FBTjtBQUFpQkYsa0JBQVEsRUFBUkE7QUFBakIsU0FBN0I7QUFDRCxPQUxEO0FBTUQ7QUF6Q0g7QUFBQTtBQUFBLDRDQTJDMEI7QUFDdEIsV0FBS1Isa0JBQUwsQ0FBd0I5SSxPQUF4QixDQUFnQyxVQUFBMEosR0FBRyxFQUFJO0FBQ3JDQSxXQUFHLENBQUNMLEVBQUosQ0FBTzFJLG1CQUFQLENBQTJCK0ksR0FBRyxDQUFDRixTQUEvQixFQUEwQ0UsR0FBRyxDQUFDSixRQUE5QztBQUNELE9BRkQ7QUFHRDtBQS9DSDtBQUFBO0FBQUEsb0NBaURrQkssS0FqRGxCLEVBaUR5QkMsVUFqRHpCLEVBaURxQztBQUNqQ3hILFdBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUtDLGdCQUFMLENBQXNCLEdBQXRCLENBQVgsRUFDR3RDLE9BREgsQ0FDVyxVQUFBcUosRUFBRSxFQUFJO0FBQ2JqSCxhQUFLLENBQUNDLElBQU4sQ0FBV2dILEVBQUUsQ0FBQ0osVUFBZCxFQUNHakQsTUFESCxDQUNVLFVBQUFrRCxJQUFJO0FBQUEsaUJBQUlTLEtBQUssQ0FBQ0UsSUFBTixDQUFXWCxJQUFJLENBQUNwRSxJQUFoQixDQUFKO0FBQUEsU0FEZCxFQUVHOUUsT0FGSCxDQUVXLFVBQUFrSixJQUFJO0FBQUEsaUJBQUlVLFVBQVUsQ0FBQ1AsRUFBRCxFQUFLSCxJQUFMLENBQWQ7QUFBQSxTQUZmO0FBR0QsT0FMSDtBQU1EO0FBeERIOztBQUFBO0FBQUEsbUJBQStCOUUsV0FBL0IsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBRUEsSUFBTWpHLE9BQU8sR0FBRztBQUNkMkwsT0FBSyxFQUFFO0FBRE8sQ0FBaEI7QUFJQSxJQUFNQyxRQUFRLEdBQUdwTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBakI7QUFDQW1MLFFBQVEsQ0FBQ2xMLFNBQVQsZ3hCLENBMkJBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQm1MLFU7Ozs7Ozs7d0JBQ2E7QUFDOUIsYUFBTyxDQUFDLFNBQUQsRUFBWSxVQUFaLENBQVA7QUFDRDs7O0FBRUQsd0JBQWM7QUFBQTs7QUFBQTs7QUFDWjs7QUFDQSxVQUFLakwsWUFBTCxDQUFrQjtBQUFFQyxVQUFJLEVBQUU7QUFBUixLQUFsQjs7QUFDQSxVQUFLQyxVQUFMLENBQWdCQyxXQUFoQixDQUE0QjZLLFFBQVEsQ0FBQzVLLE9BQVQsQ0FBaUJDLFNBQWpCLENBQTJCLElBQTNCLENBQTVCOztBQUhZO0FBSWI7Ozs7d0NBRW1CO0FBRWxCLFVBQUksQ0FBQyxLQUFLeUYsWUFBTCxDQUFrQixNQUFsQixDQUFMLEVBQ0UsS0FBSzNFLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsVUFBMUI7QUFDRixVQUFJLENBQUMsS0FBSzJFLFlBQUwsQ0FBa0IsVUFBbEIsQ0FBTCxFQUNFLEtBQUszRSxZQUFMLENBQWtCLFVBQWxCLEVBQThCLENBQTlCOztBQUVGLFdBQUsrSixnQkFBTCxDQUFzQixTQUF0Qjs7QUFDQSxXQUFLQSxnQkFBTCxDQUFzQixVQUF0Qjs7QUFFQSxXQUFLNUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSzZLLFFBQXBDO0FBQ0EsV0FBSzdLLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLEtBQUttRixRQUFwQztBQUNEOzs7cUNBRWdCMkYsSSxFQUFNO0FBQ3JCLFVBQUksS0FBS0MsY0FBTCxDQUFvQkQsSUFBcEIsQ0FBSixFQUErQjtBQUM3QixZQUFJcEYsS0FBSyxHQUFHLEtBQUtvRixJQUFMLENBQVo7QUFDQSxlQUFPLEtBQUtBLElBQUwsQ0FBUDtBQUNBLGFBQUtBLElBQUwsSUFBYXBGLEtBQWI7QUFDRDtBQUNGOzs7MkNBRXNCO0FBQ3JCLFdBQUtwRSxtQkFBTCxDQUF5QixPQUF6QixFQUFrQyxLQUFLdUosUUFBdkM7QUFDQSxXQUFLdkosbUJBQUwsQ0FBeUIsT0FBekIsRUFBa0MsS0FBSzZELFFBQXZDO0FBQ0Q7Ozs2Q0EwQndCTSxJLEVBQU13QyxRLEVBQVVDLFEsRUFBVTtBQUNqRCxVQUFNOEMsUUFBUSxHQUFHOUMsUUFBUSxLQUFLLElBQTlCOztBQUNBLGNBQVF6QyxJQUFSO0FBQ0UsYUFBSyxTQUFMO0FBQ0UsZUFBSzVFLFlBQUwsQ0FBa0IsY0FBbEIsRUFBa0NtSyxRQUFsQztBQUNBOztBQUNGLGFBQUssVUFBTDtBQUNFLGVBQUtuSyxZQUFMLENBQWtCLGVBQWxCLEVBQW1DbUssUUFBbkM7O0FBRUEsY0FBSUEsUUFBSixFQUFjO0FBQ1osaUJBQUtqRixlQUFMLENBQXFCLFVBQXJCO0FBQ0EsaUJBQUtrRixJQUFMO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsaUJBQUtwSyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLEdBQTlCO0FBQ0Q7O0FBQ0Q7QUFiSjtBQWVEOzs7NkJBRVFhLEssRUFBTztBQUVkLFVBQUlBLEtBQUssQ0FBQ1ksTUFBVixFQUFrQjs7QUFFbEIsY0FBUVosS0FBSyxDQUFDYyxPQUFkO0FBQ0UsYUFBSzFELE9BQU8sQ0FBQzJMLEtBQWI7QUFDRS9JLGVBQUssQ0FBQ21CLGNBQU47O0FBQ0EsZUFBS3FJLGNBQUw7O0FBQ0E7O0FBQ0Y7QUFDRTtBQU5KO0FBUUQ7Ozs2QkFFUXhKLEssRUFBTztBQUNkLFdBQUt3SixjQUFMO0FBQ0Q7OztxQ0FFZ0I7QUFDZixVQUFJLEtBQUt0QyxRQUFULEVBQ0U7QUFDRixXQUFLRCxPQUFMLEdBQWUsQ0FBQyxLQUFLQSxPQUFyQjtBQUNBLFdBQUtoRCxhQUFMLENBQW1CLElBQUlDLFdBQUosQ0FBZ0IsUUFBaEIsRUFBMEI7QUFDM0MvRCxjQUFNLEVBQUU7QUFDTjhHLGlCQUFPLEVBQUUsS0FBS0E7QUFEUixTQURtQztBQUkzQzlDLGVBQU8sRUFBRTtBQUprQyxPQUExQixDQUFuQjtBQU1EOzs7c0JBdkVXSCxLLEVBQU87QUFDakIsVUFBTXlGLFNBQVMsR0FBR3JGLE9BQU8sQ0FBQ0osS0FBRCxDQUF6QjtBQUNBLFVBQUl5RixTQUFKLEVBQ0UsS0FBS3RLLFlBQUwsQ0FBa0IsU0FBbEIsRUFBNkIsRUFBN0IsRUFERixLQUdFLEtBQUtrRixlQUFMLENBQXFCLFNBQXJCO0FBQ0gsSzt3QkFFYTtBQUNaLGFBQU8sS0FBS1AsWUFBTCxDQUFrQixTQUFsQixDQUFQO0FBQ0Q7OztzQkFFWUUsSyxFQUFPO0FBQ2xCLFVBQU0wRixVQUFVLEdBQUd0RixPQUFPLENBQUNKLEtBQUQsQ0FBMUI7QUFDQSxVQUFJMEYsVUFBSixFQUNFLEtBQUt2SyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLEVBQTlCLEVBREYsS0FHRSxLQUFLa0YsZUFBTCxDQUFxQixVQUFyQjtBQUNILEs7d0JBRWM7QUFDYixhQUFPLEtBQUtQLFlBQUwsQ0FBa0IsVUFBbEIsQ0FBUDtBQUNEOzs7O21CQTVEcUNULFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDeEM7QUFDQTtBQUVPLElBQU1zRyxLQUFiO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx3QkFFbUI7QUFDZixhQUFPLFVBQVA7QUFDRDtBQUpIO0FBQUE7QUFBQSx3QkFNbUM7QUFDL0IsYUFBTyxDQUFDLFVBQUQsQ0FBUDtBQUNEO0FBUkg7O0FBVUUsbUJBQWM7QUFBQTs7QUFBQTs7QUFDWjtBQUVBLFVBQUsvRyxLQUFMO0FBQXdCO0FBQXlCLE1BQWpEO0FBQ0EsVUFBS2dILFVBQUw7QUFBd0I7QUFBeUIsTUFBakQ7QUFDQSxVQUFLMUMsUUFBTDtBQUF3QjtBQUF5QixTQUFqRDtBQUNBLFVBQUsyQyxLQUFMO0FBQXdCO0FBQXlCLE1BQWpEO0FBQ0EsVUFBS0MsV0FBTDtBQUF3QjtBQUF5QixlQUFqRDtBQUNBLFVBQUtDLEdBQUw7QUFBd0I7QUFBeUIsS0FBakQ7QUFDQSxVQUFLMUMsUUFBTDtBQUF3QjtBQUF5QixLQUFqRDtBQUNBLFVBQUsyQyxPQUFMO0FBQXdCO0FBQXlCLE1BQWpEO0FBQ0EsVUFBS0MsY0FBTDtBQUF3QjtBQUF5QixRQUFqRDtBQUNBLFVBQUtDLFVBQUw7QUFBd0I7QUFBeUIsTUFBakQ7QUFDQSxVQUFLQyxlQUFMO0FBQXdCO0FBQXlCLE1BQWpEO0FBQ0EsVUFBS0MsUUFBTDtBQUF3QjtBQUF5QixTQUFqRDtBQUNBLFVBQUtDLFNBQUw7QUFBd0I7QUFBeUIsU0FBakQ7QUFFQSxVQUFLQyxVQUFMO0FBQXdCO0FBQTJCLFFBQW5EO0FBRUEsVUFBS3RHLEtBQUwsR0FBYSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUFiO0FBbkJZO0FBb0JiOztBQTlCSDtBQUFBO0FBQUEsOEJBZ0NZO0FBQ1I7O0FBQ0E7O0FBRUEsV0FBS2xHLFNBQUwsa0NBQ2dCK0csaUVBQVEsQ0FBQztBQUNuQiw4QkFBc0I7QUFESCxPQUFELENBRHhCLDZFQUtpQkEsaUVBQVEsQ0FBQztBQUNsQix1REFBK0MsSUFEN0I7QUFFbEIsMEJBQWtCLEtBQUt6RCxLQUZMO0FBR2xCLDZCQUFxQixLQUFLOEY7QUFIUixPQUFELENBTHpCLDhCQVdRcUQsK0RBQU0sQ0FBQyxLQUFLdkcsS0FBTixFQUFhLFVBQUN3RyxJQUFELEVBQU9DLENBQVA7QUFBQSw0SEFFVEQsSUFGUyw2QkFFWUMsQ0FGWixtUEFNc0JELElBTnRCO0FBQUEsT0FBYixDQVhkLDRIQXNCNkMsS0FBS3BELE9BdEJsRCw4Q0F1QnlCLEtBQUswQyxXQXZCOUIsMkNBd0JzQixLQUFLekMsUUF4QjNCOztBQWlDQTs7QUFDQTtBQUNEO0FBdkVIO0FBQUE7QUFBQSx3Q0EwRXVCO0FBQ25CLFdBQUs3QixPQUFMO0FBQ0Q7QUE1RUg7QUFBQTtBQUFBLHNDQThFb0JrQyxHQTlFcEIsRUE4RXlCO0FBQ3JCQSxTQUFHLENBQUNnRCxlQUFKO0FBQ0EsV0FBS3RKLEtBQUwsR0FBYSxJQUFiO0FBQ0EsV0FBS2tKLFVBQUwsQ0FBZ0JsSixLQUFoQjtBQUNEO0FBbEZIO0FBQUE7QUFBQSx3Q0FvRnNCc0csR0FwRnRCLEVBb0YyQjtBQUN2QixjQUFPQSxHQUFHLENBQUNpRCxLQUFYO0FBQ0UsYUFBS0Msd0RBQU8sQ0FBQ0MsU0FBYjtBQUF3QixlQUFLQyxpQkFBTCxDQUF1QnBELEdBQXZCOztBQUE2Qjs7QUFDckQsYUFBS2tELHdEQUFPLENBQUNHLEtBQWI7QUFBb0IsZUFBS0MsUUFBTCxDQUFjdEQsR0FBZCxFQUFtQixLQUFLNEMsVUFBTCxDQUFnQnRHLEtBQW5DOztBQUEyQzs7QUFDL0Q7QUFBUztBQUFvQjtBQUgvQjtBQUtEO0FBMUZIO0FBQUE7QUFBQSwyQ0E0RnlCMEQsR0E1RnpCLEVBNEY4QjtBQUMxQixXQUFLdEcsS0FBTCxHQUFhLElBQWI7QUFDRDtBQTlGSDtBQUFBO0FBQUEsMENBZ0d3QnNHLEdBaEd4QixFQWdHNkI7QUFDekJBLFNBQUcsQ0FBQ2dELGVBQUo7QUFFQSxXQUFLdEosS0FBTCxHQUFhLEtBQWI7O0FBQ0EsVUFBSyxLQUFLa0osVUFBTCxDQUFnQnRHLEtBQXJCLEVBQTZCO0FBQzNCLGFBQUtnSCxRQUFMLENBQWN0RCxHQUFkLEVBQW1CLEtBQUs0QyxVQUFMLENBQWdCdEcsS0FBbkM7QUFDRDtBQUNGO0FBdkdIO0FBQUE7QUFBQSxzQ0F5R29CMEQsR0F6R3BCLEVBeUd5QjtBQUFBOztBQUNyQixVQUFJLEtBQUtSLFFBQVQsRUFBb0I7O0FBRXBCLFVBQUcsS0FBS29ELFVBQUwsQ0FBZ0J0RyxLQUFoQixDQUFzQmpDLE1BQXRCLEtBQWlDLENBQXBDLEVBQXVDO0FBRXJDLFlBQU1rSixhQUFhLEdBQUd2RCxHQUFHLENBQUN4SCxNQUFKLENBQVdKLE9BQVgsS0FBdUIsT0FBdkIsR0FDbEI0SCxHQUFHLENBQUN4SCxNQUFKLENBQVdrRyxhQUFYLENBQXlCOEUsc0JBRFAsR0FFbEJ4RCxHQUFHLENBQUN4SCxNQUFKLENBQVdrRyxhQUZmO0FBSUEsWUFBTStFLEtBQUssR0FBR0MsTUFBTSxDQUFDSCxhQUFhLENBQUN2RixZQUFkLENBQTJCLFlBQTNCLENBQUQsQ0FBcEI7QUFDQSxhQUFLMUIsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV2lCLE1BQVgsQ0FBa0IsVUFBQ1IsR0FBRCxFQUFNZ0csQ0FBTjtBQUFBLGlCQUFZQSxDQUFDLElBQUlVLEtBQWpCO0FBQUEsU0FBbEIsQ0FBYjtBQUVBLGFBQUtsSCxhQUFMLENBQW1CLElBQUlDLFdBQUosQ0FBZ0IsZUFBaEIsRUFBaUM7QUFDbERtSCx1QkFBYSxFQUFFckwsS0FEbUM7QUFFbERnRSxlQUFLLEVBQUUsS0FBS0EsS0FBTCxDQUFXbUgsS0FBWDtBQUYyQyxTQUFqQyxDQUFuQjs7QUFLQSxhQUFLM0YsT0FBTDs7QUFDQVosNkJBQXFCLENBQUMsVUFBQTlGLENBQUM7QUFBQSxpQkFBSSxNQUFJLENBQUN3TCxVQUFMLENBQWdCbEosS0FBaEIsRUFBSjtBQUFBLFNBQUYsQ0FBckI7QUFDRDtBQUNGO0FBN0hIO0FBQUE7QUFBQSxxQ0ErSG1Cc0csR0EvSG5CLEVBK0h3QjtBQUNwQixVQUFNNEQsV0FBVyxHQUFHLElBQUlwSCxXQUFKLENBQWdCLGFBQWhCLEVBQStCO0FBQ2pEbUgscUJBQWEsRUFBRXJMLEtBRGtDO0FBRWpEZ0UsYUFBSyxFQUFFMEQsR0FBRyxDQUFDeEg7QUFGc0MsT0FBL0IsQ0FBcEI7QUFLQSxXQUFLK0QsYUFBTCxDQUFtQnFILFdBQW5CO0FBQ0Q7QUF0SUg7QUFBQTtBQUFBLDZCQXdJV3RMLEtBeElYLEVBd0lrQndLLElBeElsQixFQXdJd0I7QUFBQTs7QUFDcEIsV0FBS3hHLEtBQUwsR0FBYSxLQUFLQSxLQUFMLElBQWMsRUFBM0I7O0FBQ0EsVUFBSXdHLElBQUksSUFBSUEsSUFBSSxDQUFDZSxJQUFMLEdBQVl4SixNQUF4QixFQUFnQztBQUM5QixZQUFJLENBQUMsS0FBS2lDLEtBQUwsQ0FBV3dILFFBQVgsQ0FBb0JoQixJQUFwQixDQUFMLEVBQWdDO0FBQzlCLGVBQUt4RyxLQUFMLGdDQUFpQixLQUFLQSxLQUF0QixJQUE2QndHLElBQTdCO0FBRUEsZUFBS3ZHLGFBQUwsQ0FBbUIsSUFBSUMsV0FBSixDQUFnQixhQUFoQixFQUErQjtBQUNoRG1ILHlCQUFhLEVBQUVyTCxLQURpQztBQUVoRGdFLGlCQUFLLEVBQUV3RztBQUZ5QyxXQUEvQixDQUFuQjs7QUFLQSxlQUFLaEYsT0FBTDs7QUFDQSxlQUFLOEUsVUFBTCxDQUFnQnRHLEtBQWhCLEdBQXdCLEVBQXhCO0FBQ0FZLCtCQUFxQixDQUFDLFVBQUE5RixDQUFDO0FBQUEsbUJBQUksTUFBSSxDQUFDd0wsVUFBTCxDQUFnQmxKLEtBQWhCLEVBQUo7QUFBQSxXQUFGLENBQXJCO0FBQ0Q7QUFDRjtBQUNGO0FBeEpIO0FBQUE7QUFBQSw2Q0EwSjRCa0YsUUExSjVCLEVBMEpzQ0MsUUExSnRDLEVBMEpnREMsUUExSmhELEVBMEowRCxDQUV2RDtBQTVKSDs7QUFBQTtBQUFBLEVBQTJCcUIscURBQTNCO0FBZ0tBbEosY0FBYyxDQUFDOEgsTUFBZixDQUFzQmtELEtBQUssQ0FBQ2pELEVBQTVCLEVBQWdDaUQsS0FBaEMsRTs7Ozs7Ozs7Ozs7O0FDbEtBLGNBQWMsbUJBQU8sQ0FBQyx3T0FBdUg7O0FBRTdJLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyx5R0FBc0Q7O0FBRTNFOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQix3T0FBdUg7QUFDMUksbUJBQW1CLG1CQUFPLENBQUMsd09BQXVIOztBQUVsSixvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNPLElBQU04QixPQUFiO0FBQUE7QUFBQTtBQUFBOztBQUVFLHFCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7QUFFQSxVQUFLMUgsSUFBTCxHQUFZLFlBQVo7QUFDQSxVQUFLMkgsSUFBTCxHQUFZLFdBQVo7QUFFQTlHLHlCQUFxQixDQUFDLFVBQUE5RixDQUFDLEVBQUk7QUFDekIsWUFBS2hCLFNBQUwsR0FBaUIsTUFBSzBILE9BQUwsRUFBakI7QUFDQTlELGFBQU8sQ0FBQ3NGLEdBQVIsQ0FBWSx5QkFBWjs7QUFDQSxZQUFLMkUsa0JBQUw7QUFDRCxLQUpvQixDQUFyQjtBQU5ZO0FBV2I7O0FBYkg7QUFBQTtBQUFBLDhCQWVhO0FBQ1QsdUxBSVksS0FBSzVILElBSmpCLHdHQU9VLEtBQUsySCxJQVBmO0FBVUQ7QUExQkg7QUFBQTtBQUFBLDZCQTRCWWhFLEdBNUJaLEVBNEJpQjtBQUNiaEcsYUFBTyxDQUFDc0YsR0FBUixDQUFZLFlBQVosRUFBMEJVLEdBQTFCO0FBQ0EsV0FBSzNELElBQUwsR0FBWTJELEdBQUcsQ0FBQ3hILE1BQWhCO0FBQ0Q7QUEvQkg7QUFBQTtBQUFBLDZCQWlDV3dILEdBakNYLEVBaUNnQjtBQUNaaEcsYUFBTyxDQUFDc0YsR0FBUixDQUFZLFlBQVosRUFBMEJVLEdBQUcsQ0FBQ3hILE1BQTlCO0FBQ0EsV0FBS3dMLElBQUwsR0FBWWhFLEdBQUcsQ0FBQ3hILE1BQWhCO0FBQ0Q7QUFwQ0g7QUFBQTtBQUFBLHlDQXNDd0I7QUFBQTs7QUFDcEJ3QixhQUFPLENBQUNzRixHQUFSLENBQVksd0JBQVo7QUFDQSxXQUFLekYsZ0JBQUwsQ0FBc0IsR0FBdEIsRUFDR3RDLE9BREgsQ0FDVyxVQUFBcUosRUFBRSxFQUFJO0FBQ2JqSCxhQUFLLENBQUNDLElBQU4sQ0FBV2dILEVBQUUsQ0FBQ0osVUFBZCxFQUNHakQsTUFESCxDQUNVLFVBQUFrRCxJQUFJO0FBQUEsaUJBQUksS0FBS1csSUFBTCxDQUFVWCxJQUFJLENBQUNwRSxJQUFmLENBQUo7QUFBQSxTQURkLEVBRUc5RSxPQUZILENBRVcsVUFBQWtKLElBQUksRUFBSTtBQUNmLGNBQU1JLFFBQVEsR0FBR0MsSUFBSSxDQUFDLE1BQUksQ0FBQ0wsSUFBSSxDQUFDbkUsS0FBTixDQUFMLENBQXJCO0FBQ0EsY0FBTXlFLFNBQVMsR0FBR04sSUFBSSxDQUFDcEUsSUFBTCxDQUFVMkUsT0FBVixDQUFrQixJQUFsQixFQUF3QixFQUF4QixDQUFsQjtBQUNBaEgsaUJBQU8sQ0FBQ3NGLEdBQVIsQ0FBWSxhQUFaLEVBQTJCeUIsU0FBM0IsRUFBc0NGLFFBQXRDO0FBRUFELFlBQUUsQ0FBQ2hLLGdCQUFILENBQW9CbUssU0FBcEIsRUFBK0IsVUFBQWYsR0FBRyxFQUFJO0FBQ3BDYSxvQkFBUSxDQUFDcUQsS0FBVCxDQUFldEQsRUFBZixFQUFtQixDQUFDWixHQUFELENBQW5CO0FBQ0QsV0FGRDtBQUdELFNBVkg7QUFXRCxPQWJIO0FBY0Q7QUF0REg7QUFBQTtBQUFBLGtDQXdEaUI7QUFDYmhHLGFBQU8sQ0FBQ3NGLEdBQVIsQ0FBWW1CLElBQUksQ0FBQ3BFLElBQWpCLEVBQXVCb0UsSUFBSSxDQUFDbkUsS0FBNUI7QUFDQSxVQUFNNkgsaUJBQWlCLEdBQUcsdUJBQXVCQyxJQUF2QixDQUE0QjNELElBQUksQ0FBQ25FLEtBQWpDLENBQTFCO0FBQ0EsVUFBTXlFLFNBQVMsR0FBR04sSUFBSSxDQUFDcEUsSUFBTCxDQUFVMkUsT0FBVixDQUFrQixJQUFsQixFQUF3QixFQUF4QixDQUFsQjtBQUNBLFVBQU1ILFFBQVEsR0FBR0MsSUFBSSxDQUFDLEtBQUtxRCxpQkFBaUIsQ0FBQyxDQUFELENBQXRCLENBQUQsQ0FBckI7QUFDQSxVQUFNRSxNQUFNLEdBQUdGLGlCQUFpQixDQUFDLENBQUQsQ0FBakIsQ0FBcUJHLEtBQXJCLENBQTJCLEdBQTNCLENBQWY7QUFFQXRLLGFBQU8sQ0FBQ3NGLEdBQVIsQ0FBWSxZQUFaLEVBQTBCeUIsU0FBMUIsRUFBcUNGLFFBQXJDLEVBQStDd0QsTUFBL0M7QUFFQXpELFFBQUUsQ0FBQ2hLLGdCQUFILENBQW9CbUssU0FBcEIsRUFBK0IsVUFBQ2YsR0FBRCxFQUFTO0FBQ3RDaEcsZUFBTyxDQUFDc0YsR0FBUixDQUFZLDBCQUFaOztBQUNBLFlBQUcrRSxNQUFNLENBQUMsQ0FBRCxDQUFOLEtBQWMsUUFBakIsRUFBMkI7QUFDekJ4RCxrQkFBUSxDQUFDcUQsS0FBVCxDQUFldEQsRUFBZixHQUFvQlosR0FBcEIsNEJBQTRCcUUsTUFBNUI7QUFDRCxTQUZELE1BRU87QUFDTHhELGtCQUFRLENBQUNxRCxLQUFULENBQWV0RCxFQUFmLEVBQW1CLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBbkI7QUFDRDtBQUNGLE9BUEQ7QUFRRDtBQXpFSDtBQUFBO0FBQUEsd0NBMkVzQixDQUNsQjtBQUNEO0FBN0VIO0FBQUE7QUFBQSwyQ0ErRXlCLENBQ3JCO0FBQ0Q7QUFqRkg7O0FBQUE7QUFBQSxtQkFBNkJqRixXQUE3QjtBQXNGQTRJLE1BQU0sQ0FBQ3ROLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixVQUE3QixFQUF5Q2dGLE9BQXpDLEU7Ozs7Ozs7Ozs7O0FDeEZBOzs7Ozs7QUFPQVEsTUFBTSxDQUFDQyxNQUFQLEdBQWdCQyxTQUFoQjs7QUFHQSxTQUFTQSxTQUFULEdBQXFCO0FBQ25CLE1BQU1DLEtBQUssR0FBR3hPLFFBQVEsQ0FBQzJELGdCQUFULENBQTBCLFFBQTFCLENBQWQ7QUFDQTZLLE9BQUssQ0FBQ25OLE9BQU4sQ0FBYyxVQUFBb04sSUFBSTtBQUFBLFdBQUlBLElBQUksQ0FBQy9OLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCZ08sV0FBL0IsQ0FBSjtBQUFBLEdBQWxCO0FBQ0Q7O0FBRUQsU0FBU0EsV0FBVCxDQUFxQjVFLEdBQXJCLEVBQTBCO0FBQ3hCQSxLQUFHLENBQUN2RyxjQUFKO0FBQ0EsTUFBTW9MLElBQUksR0FBRzdFLEdBQUcsQ0FBQ3hILE1BQUosQ0FBV3dGLFlBQVgsQ0FBd0IsTUFBeEIsQ0FBYjs7QUFFQThHLFdBQVMsQ0FBQ0QsSUFBRCxDQUFUO0FBQ0Q7O0FBRUQsU0FBU0MsU0FBVCxDQUFvQkMsT0FBcEIsRUFBNkI7QUFFM0IsTUFBTUMsR0FBRyxHQUFHLElBQUlDLGNBQUosRUFBWjs7QUFFQUQsS0FBRyxDQUFDUixNQUFKLEdBQWEsVUFBQXhFLEdBQUcsRUFBSTtBQUNsQixRQUFNa0YsTUFBTSxHQUFHbEYsR0FBRyxDQUFDeEgsTUFBSixDQUFXMk0sUUFBMUI7QUFDQSxRQUFNQyxVQUFVLEdBQUdsUCxRQUFRLENBQUNpRyxhQUFULENBQXVCLFdBQXZCLENBQW5CO0FBRUFpSixjQUFVLENBQUNoUCxTQUFYLEdBQXVCOE8sTUFBdkI7QUFFRCxHQU5EOztBQU9BRixLQUFHLENBQUNLLFlBQUosR0FBbUIsTUFBbkI7QUFDQUwsS0FBRyxDQUFDTSxJQUFKLENBQVMsS0FBVCxnQkFBdUJQLE9BQXZCO0FBQ0FDLEtBQUcsQ0FBQ08sSUFBSjtBQUNELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ00sSUFBTUMsT0FBYjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsd0JBRW1CO0FBQ2YsYUFBTyxZQUFQO0FBQ0Q7QUFKSDtBQUFBO0FBQUEsd0JBTW1DO0FBQy9CLGFBQU8sQ0FBQyxVQUFELENBQVA7QUFDRDtBQVJIOztBQVVFLHFCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7QUFFQSxVQUFLQyxNQUFMLEdBQWM7QUFDWixpQkFBWSxhQURBO0FBRVosY0FBWSxtQkFGQTtBQUdaLGVBQVksYUFIQTtBQUlaLGNBQVksNEJBSkE7QUFLWixpQkFBWTtBQUxBLEtBQWQ7QUFRQSxVQUFLQyxRQUFMO0FBQWdCO0FBQXlCLFVBQXpDO0FBQ0EsVUFBS0MsSUFBTDtBQUFnQjtBQUF5QixNQUF6QztBQVpZO0FBYWI7O0FBdkJIO0FBQUE7QUFBQSw4QkF5Qlk7QUFDUixXQUFLdlAsU0FBTCx3SEFFd0IsS0FBS3NQLFFBRjdCLHdEQUdtQyxLQUFLRCxNQUFMLENBQVksS0FBS0MsUUFBakIsQ0FIbkMsaUVBSW9DLEtBQUtDLElBSnpDO0FBT0Q7QUFqQ0g7QUFBQTtBQUFBLHdDQW1DdUI7QUFDbkIsV0FBSzdILE9BQUw7QUFDRDtBQXJDSDtBQUFBO0FBQUEsNkNBdUM0QmMsUUF2QzVCLEVBdUNzQ0MsUUF2Q3RDLEVBdUNnREMsUUF2Q2hELEVBdUMwRCxDQUV2RDtBQXpDSDs7QUFBQTtBQUFBLG1CQUE2Qm5ELFdBQTdCO0FBNkNBMUUsY0FBYyxDQUFDOEgsTUFBZixDQUFzQnlHLE9BQU8sQ0FBQ3hHLEVBQTlCLEVBQWtDd0csT0FBbEMsRTs7Ozs7Ozs7Ozs7O0FDOUNBLGNBQWMsbUJBQU8sQ0FBQyw4T0FBeUg7O0FBRS9JLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyx5R0FBc0Q7O0FBRTNFOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQiw4T0FBeUg7QUFDNUksbUJBQW1CLG1CQUFPLENBQUMsOE9BQXlIOztBQUVwSixvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0EsSUFBTTlQLE9BQU8sR0FBRztBQUNkQyxNQUFJLEVBQUUsRUFEUTtBQUVkQyxNQUFJLEVBQUUsRUFGUTtBQUdkQyxPQUFLLEVBQUUsRUFITztBQUlkd0wsT0FBSyxFQUFFLEVBSk87QUFLZHZMLElBQUUsRUFBRSxFQUxVO0FBTWRDLE1BQUksRUFBRSxFQU5RO0FBT2RDLEtBQUcsRUFBRTtBQVBTLENBQWhCO0FBVUEsSUFBTTRQLG1CQUFtQixHQUFHMVAsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLENBQTVCO0FBQ0F5UCxtQkFBbUIsQ0FBQ3hQLFNBQXBCO0FBbUNPLElBQU15UCxhQUFiO0FBQUE7QUFBQTtBQUFBOztBQUNFLDJCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7O0FBQ0EsVUFBS3ZQLFlBQUwsQ0FBa0I7QUFBQ0MsVUFBSSxFQUFFO0FBQVAsS0FBbEI7O0FBQ0EsVUFBS0MsVUFBTCxDQUFnQkMsV0FBaEIsQ0FBNEJtUCxtQkFBbUIsQ0FBQ2xQLE9BQXBCLENBQTRCQyxTQUE1QixDQUFzQyxJQUF0QyxDQUE1Qjs7QUFIWTtBQUliOztBQUxIO0FBQUE7QUFBQSx3Q0FPc0I7QUFFbEIsVUFBSSxDQUFDLEtBQUt5RixZQUFMLENBQWtCLE1BQWxCLENBQUwsRUFDRSxLQUFLM0UsWUFBTCxDQUFrQixNQUFsQixFQUEwQixPQUExQjtBQUNGLFVBQUksQ0FBQyxLQUFLMkUsWUFBTCxDQUFrQixVQUFsQixDQUFMLEVBQ0UsS0FBSzNFLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsQ0FBQyxDQUEvQjtBQUNIO0FBYkg7O0FBQUE7QUFBQSxtQkFBbUNrRSxXQUFuQztBQWdCQSxJQUFNbUssa0JBQWtCLEdBQUc1UCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBM0I7QUFDQTJQLGtCQUFrQixDQUFDMVAsU0FBbkI7QUFZTyxJQUFNMlAsWUFBYjtBQUFBO0FBQUE7QUFBQTs7QUFDRSwwQkFBYztBQUFBOztBQUFBOztBQUNaOztBQUNBLFdBQUt6UCxZQUFMLENBQWtCO0FBQUNDLFVBQUksRUFBRTtBQUFQLEtBQWxCOztBQUNBLFdBQUtDLFVBQUwsQ0FBZ0JDLFdBQWhCLENBQTRCcVAsa0JBQWtCLENBQUNwUCxPQUFuQixDQUEyQkMsU0FBM0IsQ0FBcUMsSUFBckMsQ0FBNUI7O0FBSFk7QUFJYjs7QUFMSDtBQUFBO0FBQUEsd0NBT3NCO0FBRWxCLFVBQUksQ0FBQyxLQUFLeUYsWUFBTCxDQUFrQixNQUFsQixDQUFMLEVBQ0UsS0FBSzNFLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsWUFBMUI7QUFFRixVQUFJdU8sa0JBQWtCLEdBQUcsS0FBS0Msa0JBQTlCOztBQUNBLFVBQUlELGtCQUFKLEVBQXdCO0FBQ3RCLGFBQUtFLFdBQUw7O0FBQ0EsYUFBS0MsVUFBTCxDQUFnQkgsa0JBQWhCO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsWUFBTUksWUFBWSxHQUFHLEtBQUtqSyxhQUFMLENBQW1CLGdCQUFuQixDQUFyQjtBQUNBLFlBQUdpSyxZQUFILEVBQ0VBLFlBQVksQ0FBQzNPLFlBQWIsQ0FBMEIsVUFBMUIsRUFBc0MsQ0FBdEM7QUFDSDs7QUFFRCxXQUFLYixnQkFBTCxDQUFzQixTQUF0QixFQUFpQyxLQUFLRSxVQUF0QztBQUNBLFdBQUtGLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLEtBQUttRixRQUFwQztBQUNEO0FBeEJIO0FBQUE7QUFBQSwyQ0EwQnlCO0FBQ3JCLFdBQUs3RCxtQkFBTCxDQUF5QixTQUF6QixFQUFvQyxLQUFLcEIsVUFBekM7QUFDQSxXQUFLb0IsbUJBQUwsQ0FBeUIsT0FBekIsRUFBa0MsS0FBSzZELFFBQXZDO0FBQ0Q7QUE3Qkg7QUFBQTtBQUFBLCtCQStCYWtFLENBL0JiLEVBK0JnQjtBQUNaLGNBQVFBLENBQUMsQ0FBQzdHLE9BQVY7QUFDRSxhQUFLMUQsT0FBTyxDQUFDSSxFQUFiO0FBQ0EsYUFBS0osT0FBTyxDQUFDRSxJQUFiO0FBQ0VxSyxXQUFDLENBQUN4RyxjQUFGOztBQUNBLGVBQUs0TSx1QkFBTDs7QUFDQTs7QUFFRixhQUFLM1EsT0FBTyxDQUFDQyxJQUFiO0FBQ0EsYUFBS0QsT0FBTyxDQUFDRyxLQUFiO0FBQ0VvSyxXQUFDLENBQUN4RyxjQUFGOztBQUNBLGVBQUs2TSx1QkFBTDs7QUFDQTs7QUFFRixhQUFLNVEsT0FBTyxDQUFDSyxJQUFiO0FBQ0VrSyxXQUFDLENBQUN4RyxjQUFGOztBQUNBLGVBQUs4TSxXQUFMLENBQWlCLEtBQUtDLGdCQUF0Qjs7QUFDQTs7QUFFRixhQUFLOVEsT0FBTyxDQUFDTSxHQUFiO0FBQ0VpSyxXQUFDLENBQUN4RyxjQUFGOztBQUNBLGVBQUs4TSxXQUFMLENBQWlCLEtBQUtFLGVBQXRCOztBQUNBOztBQUVGLGFBQUsvUSxPQUFPLENBQUMyTCxLQUFiO0FBQ0VwQixXQUFDLENBQUN4RyxjQUFGO0FBQ0EsY0FBSXdHLENBQUMsQ0FBQ3pILE1BQUYsQ0FBU0osT0FBVCxDQUFpQkMsV0FBakIsT0FBbUMsb0JBQXZDLEVBQ0UsS0FBS2tPLFdBQUwsQ0FBaUJ0RyxDQUFDLENBQUN6SCxNQUFuQjtBQUNGOztBQUVGO0FBQ0U7QUE5Qko7QUFnQ0Q7QUFoRUg7QUFBQTtBQUFBLHFDQThFbUJrTyxJQTlFbkIsRUE4RXlCO0FBQ3JCLFVBQUlDLElBQUksR0FBR0QsSUFBSSxDQUFDbEQsc0JBQWhCOztBQUNBLGFBQU9tRCxJQUFQLEVBQWE7QUFDWCxZQUFJQSxJQUFJLENBQUMzSSxZQUFMLENBQWtCLE1BQWxCLE1BQThCLE9BQWxDLEVBQTJDO0FBQ3pDLGlCQUFPMkksSUFBUDtBQUNEOztBQUNEQSxZQUFJLEdBQUdBLElBQUksQ0FBQ25ELHNCQUFaO0FBQ0Q7O0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7QUF2Rkg7QUFBQTtBQUFBLHFDQXlGbUJrRCxJQXpGbkIsRUF5RnlCO0FBQ3JCLFVBQUk1TSxJQUFJLEdBQUc0TSxJQUFJLENBQUMzTSxrQkFBaEI7O0FBQ0EsYUFBT0QsSUFBUCxFQUFhO0FBQ1gsWUFBSUEsSUFBSSxDQUFDa0UsWUFBTCxDQUFrQixNQUFsQixNQUE4QixPQUFsQyxFQUEyQztBQUN6QyxpQkFBT2xFLElBQVA7QUFDRDs7QUFDREEsWUFBSSxHQUFHQSxJQUFJLENBQUNDLGtCQUFaO0FBQ0Q7O0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7QUFsR0g7QUFBQTtBQUFBLDhDQW9HNEI7QUFDeEIsVUFBSTZNLGFBQWEsR0FBRyxLQUFLWCxrQkFBTCxJQUEyQixLQUFLTyxnQkFBcEQ7O0FBQ0EsVUFBSUksYUFBYSxLQUFLLEtBQUtKLGdCQUEzQixFQUE2QztBQUMzQyxhQUFLRCxXQUFMLENBQWlCLEtBQUtFLGVBQXRCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS0YsV0FBTCxDQUFpQixLQUFLTSxnQkFBTCxDQUFzQkQsYUFBdEIsQ0FBakI7QUFDRDtBQUNGO0FBM0dIO0FBQUE7QUFBQSw4Q0E2RzRCO0FBQ3hCLFVBQUlBLGFBQWEsR0FBRyxLQUFLWCxrQkFBTCxJQUEyQixLQUFLTyxnQkFBcEQ7O0FBQ0EsVUFBSUksYUFBYSxLQUFLLEtBQUtILGVBQTNCLEVBQTRDO0FBQzFDLGFBQUtGLFdBQUwsQ0FBaUIsS0FBS0MsZ0JBQXRCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS0QsV0FBTCxDQUFpQixLQUFLTyxnQkFBTCxDQUFzQkYsYUFBdEIsQ0FBakI7QUFDRDtBQUNGO0FBcEhIO0FBQUE7QUFBQSxnQ0FzSGNGLElBdEhkLEVBc0hvQjtBQUNoQixXQUFLUixXQUFMOztBQUNBLFdBQUtDLFVBQUwsQ0FBZ0JPLElBQWhCOztBQUNBLFdBQUtLLFVBQUwsQ0FBZ0JMLElBQWhCO0FBQ0Q7QUExSEg7QUFBQTtBQUFBLGtDQTRIZ0I7QUFDWixVQUFNTSxZQUFZLEdBQUcsS0FBS25OLGdCQUFMLENBQXNCLGdCQUF0QixDQUFyQjs7QUFDQSxXQUFLLElBQUlrSixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaUUsWUFBWSxDQUFDM00sTUFBakMsRUFBeUMwSSxDQUFDLEVBQTFDLEVBQThDO0FBQzVDLFlBQUlrRSxHQUFHLEdBQUdELFlBQVksQ0FBQ2pFLENBQUQsQ0FBdEI7QUFDQWtFLFdBQUcsQ0FBQ3hQLFlBQUosQ0FBaUIsY0FBakIsRUFBaUMsT0FBakM7QUFDQXdQLFdBQUcsQ0FBQ0MsUUFBSixHQUFlLENBQUMsQ0FBaEI7QUFDRDtBQUNGO0FBbklIO0FBQUE7QUFBQSwrQkFxSWFSLElBckliLEVBcUltQjtBQUNmQSxVQUFJLENBQUNqUCxZQUFMLENBQWtCLGNBQWxCLEVBQWtDLE1BQWxDO0FBQ0FpUCxVQUFJLENBQUNRLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDRDtBQXhJSDtBQUFBO0FBQUEsK0JBMElhUixJQTFJYixFQTBJbUI7QUFDZkEsVUFBSSxDQUFDaE4sS0FBTDtBQUNEO0FBNUlIO0FBQUE7QUFBQSw2QkE4SVd1RyxDQTlJWCxFQThJYztBQUNWLFVBQUlBLENBQUMsQ0FBQ3pILE1BQUYsQ0FBU3dGLFlBQVQsQ0FBc0IsTUFBdEIsTUFBa0MsT0FBdEMsRUFBK0M7QUFDN0MsYUFBS3VJLFdBQUwsQ0FBaUJ0RyxDQUFDLENBQUN6SCxNQUFuQjtBQUNEO0FBQ0Y7QUFsSkg7QUFBQTtBQUFBLHdCQWtFMkI7QUFDdkIsYUFBTyxLQUFLMkQsYUFBTCxDQUFtQix1QkFBbkIsQ0FBUDtBQUNEO0FBcEVIO0FBQUE7QUFBQSx3QkFzRXlCO0FBQ3JCLGFBQU8sS0FBS0EsYUFBTCxDQUFtQiw4QkFBbkIsQ0FBUDtBQUNEO0FBeEVIO0FBQUE7QUFBQSx3QkEwRXdCO0FBQ3BCLGFBQU8sS0FBS0EsYUFBTCxDQUFtQiw2QkFBbkIsQ0FBUDtBQUNEO0FBNUVIOztBQUFBO0FBQUEsbUJBQWtDUixXQUFsQyxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUE7QUFFTyxJQUFNd0wsUUFBYjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsd0JBRWtCO0FBQ2QsYUFBTyxXQUFQO0FBQ0Q7QUFKSDtBQUFBO0FBQUEsd0JBTWtDO0FBQzlCLGFBQU8sQ0FBQyxVQUFELENBQVA7QUFDRDtBQVJIOztBQVVFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7QUFFQSxVQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFVBQUtDLGNBQUwsR0FBc0IsS0FBdEI7QUFFQSxVQUFLQyxPQUFMLEdBQWU7QUFDYkMsV0FBSyxFQUFFLENBRE07QUFFYkMsVUFBSSxFQUFFLEdBRk87QUFHYkMsYUFBTyxFQUFFLElBSEk7QUFJYkMsYUFBTyxFQUFFLElBSkk7QUFLYkMsY0FBUSxFQUFFLElBTEc7QUFNYkMsa0JBQVksRUFBRSxJQU5EO0FBT2JDLGVBQVMsRUFBRSxJQVBFO0FBUWJDLG1CQUFhLEVBQUUsR0FSRjtBQVNiQyxjQUFRLEVBQUU7QUFURyxLQUFmO0FBWUEsVUFBSzVSLFNBQUwsNEJBQ1c4RSxtREFEWDtBQW5CWTtBQTRDYjs7QUF0REg7QUFBQTtBQUFBLHdDQXVEc0I7QUFDbEIsV0FBSytNLFVBQUwsR0FBa0JDLENBQUMsQ0FBQyxZQUFELENBQW5CO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQixLQUFLRixVQUFMLENBQWdCRyxJQUFoQixDQUFxQixpQkFBckIsQ0FBakI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEtBQUtKLFVBQUwsQ0FBZ0JHLElBQWhCLENBQXFCLGlCQUFyQixDQUFqQjtBQUNBLFdBQUtFLEtBQUwsR0FBYSxLQUFLTCxVQUFMLENBQWdCRyxJQUFoQixDQUFxQixhQUFyQixDQUFiO0FBQ0EsV0FBS0csS0FBTCxHQUFhLEtBQUtOLFVBQUwsQ0FBZ0JHLElBQWhCLENBQXFCLGFBQXJCLENBQWI7QUFDQSxXQUFLSSxRQUFMLEdBQWdCLEtBQUtQLFVBQUwsQ0FBZ0JHLElBQWhCLENBQXFCLFNBQXJCLENBQWhCO0FBRUEsV0FBS0ssT0FBTCxHQUFlLElBQWY7QUFDQSxXQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLFdBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEtBQUtELFlBQUwsR0FBb0IsT0FBcEIsR0FBOEIsUUFBL0M7QUFDQSxXQUFLRSxTQUFMLEdBQWlCLEtBQUtGLFlBQUwsR0FBb0IsTUFBcEIsR0FBNkIsS0FBOUM7QUFDQSxXQUFLRyxhQUFMLEdBQXFCLElBQXJCOztBQUVBLFdBQUtDLFdBQUw7QUFDRDtBQTNFSDtBQUFBO0FBQUEsa0NBNkVnQjtBQUNaLFdBQUtDLE9BQUw7O0FBQ0EsV0FBS0MsS0FBTCxDQUFXLEtBQUtqQyxZQUFoQjs7QUFDQSxXQUFLa0MsVUFBTDtBQUNEO0FBakZIO0FBQUE7QUFBQSw4QkFtRlk7QUFDUixXQUFLakIsU0FBTCxDQUFlRCxJQUFmLENBQW9CLFdBQXBCLEVBQWlDMU0sTUFBakM7QUFFQSxXQUFLK00sT0FBTCxHQUFlLEtBQUtKLFNBQUwsQ0FBZXhOLFFBQWYsRUFBZjtBQUNBLFVBQU02TixZQUFZLEdBQUcsS0FBS1AsU0FBTCxDQUFlLENBQWYsRUFBa0IsV0FBVyxLQUFLYSxTQUFsQyxDQUFyQjtBQUNBLFdBQUtILFNBQUwsR0FBaUIsS0FBS0osT0FBTCxDQUFhYyxLQUFiLEdBQXFCLFVBQVUsS0FBS1AsU0FBcEMsRUFBK0MsSUFBL0MsQ0FBakI7QUFDQSxXQUFLM0IsV0FBTCxHQUFtQixLQUFLb0IsT0FBTCxDQUFhcE8sTUFBaEM7QUFDQSxXQUFLK00sWUFBTCxHQUFvQixLQUFLRyxPQUFMLENBQWFDLEtBQWIsSUFBc0IsQ0FBMUM7QUFDQSxVQUFNb0IsYUFBYSxHQUFHWSxJQUFJLENBQUNDLElBQUwsQ0FBVWYsWUFBWSxHQUFHLEtBQUtHLFNBQTlCLENBQXRCO0FBRUEsV0FBS1IsU0FBTCxDQUFlcUIsTUFBZixDQUFzQixLQUFLakIsT0FBTCxDQUFheE4sS0FBYixDQUFtQixDQUFuQixFQUFzQjJOLGFBQXRCLEVBQXFDZSxLQUFyQyxHQUE2Q0MsUUFBN0MsQ0FBc0QsVUFBdEQsQ0FBdEI7QUFDQSxXQUFLdkIsU0FBTCxDQUFld0IsR0FBZixDQUFtQixLQUFLYixTQUFMLENBQWUzUSxXQUFmLEVBQW5CLEVBQWlELEtBQUt3USxTQUFMLElBQWtCLEtBQUt4QixXQUFMLEdBQW1CdUIsYUFBckMsQ0FBakQ7O0FBRUEsV0FBS2tCLFdBQUw7QUFDRDtBQWpHSDtBQUFBO0FBQUEsMEJBbUdRckcsS0FuR1IsRUFtR2U7QUFBQTs7QUFDWCxVQUFJcUYsVUFBVSxHQUFHaUIsS0FBSyxDQUFDdEcsS0FBRCxDQUFMLEdBQWUsS0FBSzJELFlBQXBCLEdBQW1DM0QsS0FBcEQ7QUFDQSxXQUFLMkQsWUFBTCxHQUFvQjBCLFVBQVUsR0FBRyxLQUFLekIsV0FBdEM7O0FBRUEsVUFBSXlCLFVBQVUsR0FBRyxDQUFqQixFQUFvQjtBQUNsQixhQUFLMUIsWUFBTCxHQUFvQjBCLFVBQVUsR0FBRyxLQUFLekIsV0FBTCxHQUFtQixDQUFwRDtBQUNBLGFBQUtnQixTQUFMLENBQWV3QixHQUFmLENBQW1CLEtBQUtaLFNBQXhCLEVBQW1DLENBQUUsS0FBSzVCLFdBQVAsR0FBc0IsS0FBS3dCLFNBQTlEO0FBQ0Q7O0FBRUQsVUFBSUMsVUFBVSxHQUFHLEtBQUt6QixXQUF0QixFQUFtQztBQUNqQyxhQUFLRCxZQUFMLEdBQW9CMEIsVUFBVSxHQUFHLENBQWpDO0FBQ0EsYUFBS1QsU0FBTCxDQUFld0IsR0FBZixDQUFtQixLQUFLWixTQUF4QixFQUFtQyxDQUFuQztBQUNEOztBQUNELFdBQUtOLFlBQUwsQ0FBa0IsS0FBS00sU0FBdkIsSUFBb0MsQ0FBQ0gsVUFBRCxHQUFjLEtBQUtELFNBQXZEO0FBRUEsV0FBS1IsU0FBTCxDQUFlMkIsT0FBZixDQUF1QixLQUFLckIsWUFBNUIsRUFBMEM7QUFDeENzQixhQUFLLEVBQUUsS0FEaUM7QUFFeENDLGdCQUFRLEVBQUUsSUFGOEI7QUFHeENDLGNBQU0sRUFBRSxrQkFBTTtBQUNaLGdCQUFJLENBQUNsQyxVQUFMLENBQWdCbUMsT0FBaEIsQ0FBd0IsTUFBeEIsRUFBZ0MsQ0FBQyxNQUFJLENBQUMzQixPQUFMLENBQWEsTUFBSSxDQUFDckIsWUFBbEIsQ0FBRCxFQUFrQyxNQUFJLENBQUNBLFlBQXZDLENBQWhDO0FBQ0Q7QUFMdUMsT0FBMUM7O0FBUUEsV0FBSzBDLFdBQUw7O0FBQ0EsV0FBS08sTUFBTDtBQUNEO0FBNUhIO0FBQUE7QUFBQSxpQ0E4SGU7QUFBQTs7QUFDWCxVQUFJLEtBQUs5QyxPQUFMLENBQWFHLE9BQWpCLEVBQTBCO0FBQ3hCLGFBQUthLEtBQUwsQ0FBVytCLEtBQVgsQ0FBaUIsVUFBQWxULENBQUMsRUFBSTtBQUNwQixnQkFBSSxDQUFDaVMsS0FBTCxDQUFXLEVBQUUsTUFBSSxDQUFDUCxVQUFsQjs7QUFDQSxpQkFBTyxLQUFQO0FBQ0QsU0FIRDtBQUtBLGFBQUtSLEtBQUwsQ0FBV2dDLEtBQVgsQ0FBaUIsVUFBQWxULENBQUMsRUFBSTtBQUNwQixnQkFBSSxDQUFDaVMsS0FBTCxDQUFXLEVBQUUsTUFBSSxDQUFDUCxVQUFsQjs7QUFDQSxpQkFBTyxLQUFQO0FBQ0QsU0FIRDtBQUlEOztBQUVEWixPQUFDLENBQUMzRCxNQUFELENBQUQsQ0FBVWdHLE1BQVYsQ0FBaUIsS0FBS25CLE9BQXRCOztBQUVBLFVBQUksS0FBSzdCLE9BQUwsQ0FBYUksT0FBakIsRUFBMEI7QUFDeEIsWUFBTTZDLE1BQU0sR0FBRyxJQUFmOztBQUNBLGFBQUt2QyxVQUFMLENBQWdCd0MsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsU0FBNUIsRUFBdUMsWUFBWTtBQUNqRHpRLGlCQUFPLENBQUNzRixHQUFSLENBQVksYUFBWixFQUEyQjRJLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXpILElBQVIsQ0FBYSxZQUFiLENBQTNCOztBQUNBK0osZ0JBQU0sQ0FBQ25CLEtBQVAsQ0FBYW1CLE1BQU0sQ0FBQzFCLFVBQVAsR0FBb0IsQ0FBQ1osQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRekgsSUFBUixDQUFhLFlBQWIsQ0FBbEM7O0FBQ0EsaUJBQU8sS0FBUDtBQUNELFNBSkQ7QUFLRDtBQUNGO0FBckpIO0FBQUE7QUFBQSw2QkF1Slc7QUFBQTs7QUFDUCxVQUFJLEtBQUs4RyxPQUFMLENBQWFLLFFBQWpCLEVBQTJCO0FBQ3pCOEMsb0JBQVksQ0FBQyxLQUFLeEIsYUFBTixDQUFaO0FBRUEsYUFBSzVCLGNBQUwsR0FBc0IsSUFBdEI7QUFFQSxhQUFLNEIsYUFBTCxHQUFxQnlCLFVBQVUsQ0FBQyxVQUFBdlQsQ0FBQyxFQUFJO0FBQ25DLGdCQUFJLENBQUNpUyxLQUFMLENBQVcsRUFBRSxNQUFJLENBQUNQLFVBQWxCO0FBQ0QsU0FGOEIsRUFFNUIsS0FBS3ZCLE9BQUwsQ0FBYU0sWUFGZSxDQUEvQjtBQUdEO0FBQ0Y7QUFqS0g7QUFBQTtBQUFBLDRCQW1LVTtBQUNONkMsa0JBQVksQ0FBQyxLQUFLeEIsYUFBTixDQUFaO0FBQ0EsV0FBSzVCLGNBQUwsR0FBc0IsS0FBdEI7QUFDRDtBQXRLSDtBQUFBO0FBQUEsa0NBd0tnQjtBQUNaLFVBQUksS0FBS0MsT0FBTCxDQUFhRyxPQUFiLElBQXdCLENBQUMsS0FBS0gsT0FBTCxDQUFhUyxRQUExQyxFQUFvRDtBQUNsRCxhQUFLTyxLQUFMLENBQVdxQyxXQUFYLENBQXVCLFNBQXZCLEVBQWtDLEtBQUt4RCxZQUFMLElBQXFCLENBQXZEO0FBQ0EsYUFBS2tCLEtBQUwsQ0FBV3NDLFdBQVgsQ0FBdUIsU0FBdkIsRUFBa0MsS0FBS3hELFlBQUwsSUFBcUIsS0FBS0MsV0FBTCxHQUFtQixLQUFLdUIsYUFBL0U7QUFDRDs7QUFFRCxVQUFJLEtBQUtyQixPQUFMLENBQWFJLE9BQWpCLEVBQTBCO0FBQ3hCLGFBQUthLFFBQUwsQ0FBY3FDLFdBQWQsQ0FBMEIsUUFBMUI7QUFDQTNDLFNBQUMsQ0FBQyxLQUFLTSxRQUFMLENBQWMsS0FBS3BCLFlBQW5CLENBQUQsQ0FBRCxDQUFvQ3dDLFFBQXBDLENBQTZDLFFBQTdDO0FBQ0Q7QUFDRjtBQWxMSDtBQUFBO0FBQUEsMkNBb0x5QixDQUV0QjtBQXRMSDtBQUFBO0FBQUEsNkNBd0wyQmhMLFFBeEwzQixFQXdMcUNDLFFBeExyQyxFQXdMK0NDLFFBeEwvQyxFQXdMeUQsQ0FFdEQ7QUExTEg7O0FBQUE7QUFBQSxtQkFBOEJuRCxXQUE5QjtBQThMQTFFLGNBQWMsQ0FBQzhILE1BQWYsQ0FBc0JvSSxRQUFRLENBQUNuSSxFQUEvQixFQUFtQ21JLFFBQW5DLEU7Ozs7Ozs7Ozs7OztBQ2pNQTtBQUFBLElBQU0yRCxRQUFRLEdBQUc7QUFDZmhJLE1BQUksRUFBRSxDQURTO0FBRWZpSSxXQUFTLEVBQUUsS0FGSTtBQUdmQyxXQUFTLEVBQUUsQ0FISTtBQUlmQyxhQUFXLEVBQUUsRUFKRTtBQUtmckIsVUFBUSxFQUFFLEVBTEs7QUFNZnJULE1BQUksRUFBRSxPQU5TO0FBT2YyVSxRQUFNLEVBQUUsSUFQTztBQVFmQyxXQUFTLEVBQUUsTUFSSTtBQVFJO0FBQ25CQyxRQUFNLEVBQUUsUUFUTztBQVNHO0FBQ2xCQyxPQUFLLEVBQUUsR0FWUTtBQVVIO0FBQ1pDLE1BQUksRUFBRSxLQVhTO0FBWWZDLGNBQVksRUFBRSxLQVpDO0FBYWZDLE1BQUksRUFBRSxLQWJTO0FBY2ZDLG1CQUFpQixFQUFFLElBZEo7QUFlZkMsT0FBSyxFQUFFLElBZlE7QUFnQmZDLFVBQVEsRUFBRSxLQWhCSztBQWlCZkMsVUFBUSxFQUFFLElBakJLO0FBa0JmQyxVQUFRLEVBQUUsRUFsQks7QUFtQmZDLFVBQVEsRUFBRSxFQW5CSztBQW9CZkMsS0FBRyxFQUFFLEtBcEJVO0FBcUJmQyxnQkFBYyxFQUFFLEtBckJEO0FBc0JmQyxVQUFRLEVBQUUsS0F0Qks7QUF1QmZDLGdCQUFjLEVBQUUsR0F2QkQ7QUF3QmZDLGFBQVcsRUFBRSxHQXhCRTtBQXlCZkMsV0FBUyxFQUFFLEVBekJJO0FBMEJmQyxPQUFLLEVBQUUsSUExQlE7QUEyQmZDLFNBQU8sRUFBRSxLQTNCTTtBQTRCZkMsZUFBYSxFQUFFLENBNUJBO0FBNkJmQyxhQUFXLEVBQUUsQ0E3QkU7QUE4QmZDLHNCQUFvQixFQUFFLFFBOUJQO0FBK0JmQyxhQUFXLEVBQUUsSUEvQkU7QUFnQ2ZDLFlBQVUsRUFBRSxJQWhDRztBQWlDZkMsVUFBUSxFQUFFLElBakNLO0FBa0NmQyxnQkFBYyxFQUFFLEVBbENEO0FBbUNmQyxZQUFVLEVBQUUsRUFuQ0c7O0FBb0NmO0FBQ0FDLGVBQWEsRUFBRSx1QkFBVUMsR0FBVixFQUFlLENBQUcsQ0FyQ2xCO0FBc0NmQyxjQUFZLEVBQUUsc0JBQVVELEdBQVYsRUFBZSxDQUFHLENBdENqQjtBQXVDZkUsZUFBYSxFQUFFLHVCQUFVRixHQUFWLEVBQWVHLEtBQWYsRUFBc0IsQ0FBRyxDQXZDekI7QUF3Q2ZDLGNBQVksRUFBRSxzQkFBVUosR0FBVixFQUFlRyxLQUFmLEVBQXNCLENBQUcsQ0F4Q3hCO0FBeUNmRSxtQkFBaUIsRUFBRSwyQkFBVUwsR0FBVixFQUFlRyxLQUFmLEVBQXNCLENBQUcsQ0F6QzdCO0FBMENmRyxtQkFBaUIsRUFBRSwyQkFBVU4sR0FBVixFQUFlRyxLQUFmLEVBQXNCLENBQUc7QUFDNUM7O0FBM0NlLENBQWpCO0FBK0NlckMsdUVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFFTyxJQUFNeUMsV0FBYjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsd0JBRWtCO0FBQ2QsYUFBTyxjQUFQO0FBQ0Q7QUFKSDtBQUFBO0FBQUEsd0JBTWtDO0FBQzlCLGFBQU8sQ0FBQyxVQUFELENBQVA7QUFDRDtBQVJIOztBQVVFLHlCQUFjO0FBQUE7O0FBQUE7O0FBQ1osc0ZBRFksQ0FFWjs7QUFFQSxVQUFLQyxPQUFMLEdBQWVqSixNQUFNLENBQUNrSixVQUF0QjtBQUNBLFVBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsVUFBS3RULE1BQUwsR0FBYyxDQUFkO0FBQ0EsVUFBS3VULENBQUwsR0FBUyxDQUFUO0FBQ0EsVUFBS25ELEVBQUwsR0FBVSxLQUFWO0FBQ0EsVUFBS29ELE1BQUwsR0FBYyxDQUFkO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxVQUFLWCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFVBQUtZLFFBQUwsR0FBaUJqRCx3REFBUSxDQUFDbUIsUUFBVCxLQUFzQixJQUF2QixHQUErQixRQUEvQixHQUEwQyxPQUExRDtBQUNBLFVBQUsrQixNQUFMLEdBQWVsRCx3REFBUSxDQUFDbUIsUUFBVCxLQUFzQixJQUF2QixHQUErQixlQUEvQixHQUFpRCxjQUEvRDtBQUNBLFVBQUtnQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFVBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS3hHLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxVQUFLeUcsT0FBTCxHQUFnQixrQkFBa0JuWSxRQUFRLENBQUNvWSxlQUEzQztBQUVBLFVBQUtDLFlBQUwsR0FBb0IsTUFBS3BTLGFBQUwsQ0FBbUIsZUFBbkIsQ0FBcEI7QUFDQSxVQUFLcVMsY0FBTCxHQUFzQixNQUFLclMsYUFBTCxDQUFtQixpQkFBbkIsQ0FBdEI7QUFDQSxVQUFLNlEsR0FBTCxHQUFXLE1BQUs3USxhQUFMLENBQW1CLGtCQUFuQixDQUFYO0FBQ0EsVUFBS3NTLE9BQUwsR0FBZSxNQUFLdFMsYUFBTCxDQUFtQixVQUFuQixDQUFmLENBekJZLENBMEJaOztBQTFCWTtBQTRCYjs7QUF0Q0g7QUFBQTtBQUFBLDZCQXdDVztBQUNQO0FBd0JEO0FBakVIO0FBQUE7QUFBQSx3Q0FtRXNCO0FBQ2xCK0wsT0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJ3RyxXQUFyQixDQUFpQztBQUMvQmxELFlBQUksRUFBRSxLQUR5QjtBQUUvQkcsZ0JBQVEsRUFBRTtBQUZxQixPQUFqQztBQUlEO0FBeEVIO0FBQUE7QUFBQSwyQ0EwRXlCLENBRXRCO0FBNUVIO0FBQUE7QUFBQSw2Q0E4RTJCL00sUUE5RTNCLEVBOEVxQ0MsUUE5RXJDLEVBOEUrQ0MsUUE5RS9DLEVBOEV5RCxDQUV0RDtBQWhGSDtBQUFBO0FBQUEsbUNBa0ZpQjtBQUViLFVBQUlnTSx3REFBUSxDQUFDdlUsSUFBVCxLQUFrQixNQUF0QixFQUE4QjtBQUM1QnVVLGdFQUFRLENBQUNDLFNBQVQsR0FBcUIsS0FBckI7QUFDQUQsZ0VBQVEsQ0FBQ1csaUJBQVQsR0FBNkIsS0FBN0I7QUFDRDs7QUFDRCxVQUFJWCx3REFBUSxDQUFDUSxJQUFiLEVBQW1CO0FBQ2pCUixnRUFBUSxDQUFDVyxpQkFBVCxHQUE2QixLQUE3QjtBQUNEOztBQUNELFVBQUlYLHdEQUFRLENBQUNDLFNBQWIsRUFBd0I7QUFDdEJELGdFQUFRLENBQUNFLFNBQVQsR0FBcUIsQ0FBckI7QUFDQUYsZ0VBQVEsQ0FBQ2hJLElBQVQsR0FBZ0IsQ0FBaEI7QUFDRDs7QUFDRCxVQUFJZ0ksd0RBQVEsQ0FBQ1UsSUFBYixFQUFtQjtBQUNqQlYsZ0VBQVEsQ0FBQ0UsU0FBVCxHQUFxQixDQUFyQjtBQUNBRixnRUFBUSxDQUFDOEIsUUFBVCxHQUFvQixLQUFwQjtBQUNEOztBQUVELFVBQUk5Qix3REFBUSxDQUFDbUIsUUFBYixFQUF1QjtBQUNyQixhQUFLdUMsY0FBTCxDQUFvQjVWLFNBQXBCLENBQThCZ0MsR0FBOUIsQ0FBa0MsVUFBbEM7QUFDQSxhQUFLaVQsTUFBTCxHQUFjL0Msd0RBQVEsQ0FBQ29CLGNBQXZCO0FBQ0EsYUFBS3NDLGNBQUwsQ0FBb0J0VCxLQUFwQixDQUEwQlosTUFBMUIsYUFBc0MsS0FBS3VULE1BQTNDO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsYUFBS0EsTUFBTCxHQUFjLEtBQUtiLEdBQUwsQ0FBU1MsVUFBdkI7QUFDRDs7QUFFRCxXQUFLVCxHQUFMLENBQVMyQixVQUFULENBQW9CcFgsT0FBcEIsQ0FBNEIsVUFBQXFKLEVBQUU7QUFBQSxlQUFJQSxFQUFFLENBQUNoSSxTQUFILENBQWFnQyxHQUFiLENBQWlCLFFBQWpCLENBQUo7QUFBQSxPQUE5Qjs7QUFDQSxVQUFJa1Esd0RBQVEsQ0FBQ1UsSUFBVCxLQUFrQixJQUFsQixJQUEwQlYsd0RBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBaEQsRUFBeUQsQ0FDdkQ7QUFDRDs7QUFDRCxVQUFJdVUsd0RBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBdEIsRUFBK0I7QUFDN0I7QUFDQSxhQUFLcVksYUFBTCxHQUY2QixDQUk3Qjs7O0FBQ0EsYUFBS0MsV0FBTDs7QUFFQSxZQUFJL0Qsd0RBQVEsQ0FBQ1UsSUFBVCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQixlQUFLeUMsVUFBTCxHQUFrQixLQUFLYSxXQUFMLEVBQWxCO0FBQ0EsZUFBS0MsSUFBTCxDQUFVL0IsR0FBVixFQUFlaUIsVUFBZjtBQUNEOztBQUNELFlBQUluRCx3REFBUSxDQUFDbUIsUUFBVCxLQUFzQixLQUExQixFQUFpQztBQUMvQixlQUFLK0MsU0FBTCxDQUFlaEMsR0FBZixFQUFvQixLQUFwQjtBQUNEO0FBRUYsT0FmRCxNQWVPO0FBQ0wsYUFBS2dDLFNBQUwsQ0FBZWhDLEdBQWYsRUFBb0IsSUFBcEI7QUFDQUEsV0FBRyxDQUFDcEQsUUFBSixDQUFhLFFBQWI7O0FBQ0EsWUFBSSxDQUFDLEtBQUtxRixLQUFMLEVBQUwsRUFBbUI7QUFDakJDLG1CQUFTLENBQUNDLE9BQVYsQ0FBa0IsQ0FBbEI7QUFDQUQsbUJBQVMsQ0FBQ0UsRUFBVixDQUFhakMsS0FBYixFQUFvQmtDLE1BQXBCLENBQTJCLENBQTNCO0FBQ0Q7QUFDRjs7QUFDRCxVQUFJdkUsd0RBQVEsQ0FBQ1UsSUFBVCxLQUFrQixJQUFsQixJQUEwQlYsd0RBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBaEQsRUFBeUQ7QUFDdkQyWSxpQkFBUyxDQUFDRSxFQUFWLENBQWFqQyxLQUFiLEVBQW9CdkQsUUFBcEIsQ0FBNkIsUUFBN0I7QUFDRCxPQUZELE1BRU87QUFDTHNGLGlCQUFTLENBQUMzRixLQUFWLEdBQWtCSyxRQUFsQixDQUEyQixRQUEzQjtBQUNEO0FBRUY7QUE3SUg7QUFBQTtBQUFBLDBCQStJUTBGLEVBL0lSLEVBK0lZQyxDQS9JWixFQStJZTtBQUNYLFVBQUl6RSx3REFBUSxDQUFDaUIsR0FBVCxLQUFpQixJQUFyQixFQUEyQjtBQUN6QndELFNBQUMsR0FBRyxDQUFDQSxDQUFMO0FBQ0Q7O0FBQ0QsVUFBSSxLQUFLQyxNQUFMLEVBQUosRUFBbUI7QUFDakIsWUFBSTFFLHdEQUFRLENBQUNtQixRQUFULEtBQXNCLElBQTFCLEVBQWdDO0FBQzlCcUQsWUFBRSxDQUFDcFUsS0FBSCxDQUFTSyxTQUFULCtCQUEwQ2dVLENBQTFDO0FBQ0QsU0FGRCxNQUVPO0FBQ0xELFlBQUUsQ0FBQ3BVLEtBQUgsQ0FBU0ssU0FBVCwrQkFBMENnVSxDQUExQztBQUNEO0FBQ0YsT0FORCxNQU1PO0FBQ0wsWUFBSXpFLHdEQUFRLENBQUNtQixRQUFULEtBQXNCLElBQTFCLEVBQWdDO0FBQzlCcUQsWUFBRSxDQUFDekYsR0FBSCxDQUFPLFVBQVAsRUFBbUIsVUFBbkIsRUFBK0JHLE9BQS9CLENBQXVDO0FBQ3JDeUYsZUFBRyxFQUFFLENBQUNGLENBQUQsR0FBSztBQUQyQixXQUF2QyxFQUVHekUsd0RBQVEsQ0FBQ08sS0FGWixFQUVtQlAsd0RBQVEsQ0FBQ00sTUFGNUI7QUFHRCxTQUpELE1BSU87QUFDTGtFLFlBQUUsQ0FBQ3pGLEdBQUgsQ0FBTyxVQUFQLEVBQW1CLFVBQW5CLEVBQStCRyxPQUEvQixDQUF1QztBQUNyQzBGLGdCQUFJLEVBQUUsQ0FBQ0gsQ0FBRCxHQUFLO0FBRDBCLFdBQXZDLEVBRUd6RSx3REFBUSxDQUFDTyxLQUZaLEVBRW1CUCx3REFBUSxDQUFDTSxNQUY1QjtBQUdEO0FBQ0Y7O0FBQ0QsVUFBSXVFLE1BQU0sR0FBRzdCLE1BQU0sQ0FBQzhCLE1BQVAsR0FBZ0J4SCxJQUFoQixDQUFxQixVQUFyQixFQUFpQ0EsSUFBakMsQ0FBc0MsSUFBdEMsQ0FBYjtBQUNBLFdBQUt5SCxNQUFMLENBQVlGLE1BQVosRUFBb0IsSUFBcEI7QUFDRDtBQXRLSDtBQUFBO0FBQUEsa0NBd0tnQjtBQUNaLFVBQUlHLEdBQUcsR0FBRyxDQUFWOztBQUNBLFVBQUloRix3REFBUSxDQUFDQyxTQUFULEtBQXVCLEtBQTNCLEVBQWtDO0FBQ2hDK0UsV0FBRyxHQUFHLEtBQUszQyxLQUFMLElBQWMsQ0FBQyxLQUFLZ0IsVUFBTCxHQUFrQnJELHdEQUFRLENBQUNHLFdBQTVCLElBQTJDSCx3REFBUSxDQUFDRSxTQUFsRSxDQUFOO0FBQ0QsT0FGRCxNQUVPO0FBQ0w4RSxXQUFHLEdBQUcsQ0FBTjs7QUFDQSxhQUFLLElBQUkvTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtvSyxLQUF6QixFQUFnQ3BLLENBQUMsRUFBakMsRUFBcUM7QUFDbkMrTSxhQUFHLElBQUlDLFFBQVEsQ0FBQyxLQUFLL0MsR0FBTCxDQUFTMkIsVUFBVCxDQUFvQjVMLENBQXBCLEVBQXVCaU4sS0FBdkIsR0FBK0JsRix3REFBUSxDQUFDRyxXQUF6QyxDQUFmO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPNkUsR0FBUDtBQUNEO0FBbkxIO0FBQUE7QUFBQSxrQ0FxTGlCO0FBQUE7O0FBRWIsVUFBSWhGLHdEQUFRLENBQUNDLFNBQVQsS0FBdUIsS0FBM0IsRUFBa0M7QUFDaEM7QUFDQSxhQUFLaUMsR0FBTCxDQUFTMkIsVUFBVCxDQUFvQnBYLE9BQXBCLENBQTRCLFVBQUFxSixFQUFFO0FBQUEsaUJBQUlBLEVBQUUsQ0FBQzFGLEtBQUgsQ0FBUyxNQUFJLENBQUM2UyxRQUFkLGNBQTZCLE1BQUksQ0FBQ0ksVUFBbEMsT0FBSjtBQUFBLFNBQTlCO0FBQ0QsT0FMWSxDQU1iOzs7QUFDQSxXQUFLbkIsR0FBTCxDQUFTMkIsVUFBVCxDQUFvQnBYLE9BQXBCLENBQTRCLFVBQUFxSixFQUFFO0FBQUEsZUFBSUEsRUFBRSxDQUFDMUYsS0FBSCxDQUFTLE1BQUksQ0FBQzhTLE1BQWQsY0FBMkJsRCx3REFBUSxDQUFDRyxXQUFwQyxPQUFKO0FBQUEsT0FBOUI7QUFFQTJDLE9BQUMsR0FBRyxLQUFLcUMsU0FBTCxDQUFlLEtBQWYsQ0FBSixDQVRhLENBVWI7O0FBQ0EsV0FBS2pELEdBQUwsQ0FBUzlSLEtBQVQsQ0FBZTZTLFFBQWYsY0FBOEJILENBQTlCOztBQUNBLFVBQUk5Qyx3REFBUSxDQUFDVSxJQUFULEtBQWtCLElBQWxCLElBQTBCVix3REFBUSxDQUFDdlUsSUFBVCxLQUFrQixPQUFoRCxFQUF5RDtBQUN2RCxZQUFJLEtBQUtrVSxFQUFMLEtBQVksS0FBaEIsRUFBdUI7QUFDckIsZUFBSzBDLEtBQUwsR0FBYSxLQUFLSCxHQUFMLENBQVM3USxhQUFULENBQXVCLGFBQXZCLEVBQXNDOUIsTUFBbkQ7QUFDRDtBQUNGOztBQUVELFVBQUksS0FBS21WLE1BQUwsRUFBSixFQUFtQjtBQUNqQixhQUFLaEIsY0FBTCxDQUFvQjVWLFNBQXBCLENBQThCZ0MsR0FBOUIsQ0FBa0MsVUFBbEM7QUFDRDtBQUNGO0FBMU1IO0FBQUE7QUFBQSxvQ0E0TW1CO0FBQ2YsVUFBSWtRLHdEQUFRLENBQUNDLFNBQVQsS0FBdUIsS0FBM0IsRUFBa0M7QUFDaEMsYUFBS29ELFVBQUwsR0FBa0IsQ0FBQyxLQUFLTixNQUFMLElBQWdCL0Msd0RBQVEsQ0FBQ2hJLElBQVQsR0FBaUJnSSx3REFBUSxDQUFDRyxXQUEzQixHQUEyQ0gsd0RBQVEsQ0FBQ0csV0FBbkUsQ0FBRCxJQUFvRkgsd0RBQVEsQ0FBQ2hJLElBQS9HO0FBQ0Q7QUFDRjtBQWhOSDtBQUFBO0FBQUEsNkJBa05XO0FBQ1AsVUFBTW9OLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQU07QUFDcEIsWUFBTUMsVUFBVSxHQUFHLENBQUMsWUFBRCxFQUFlLGVBQWYsRUFBZ0Msa0JBQWhDLEVBQW9ELGFBQXBELEVBQW1FLGNBQW5FLEVBQW1GLGlCQUFuRixDQUFuQjtBQUNBLFlBQU1DLElBQUksR0FBR2xhLFFBQVEsQ0FBQ29ZLGVBQXRCOztBQUNBLGFBQUssSUFBSXZMLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdvTixVQUFVLENBQUM5VixNQUEvQixFQUF1QzBJLENBQUMsRUFBeEMsRUFBNEM7QUFDMUMsY0FBSW9OLFVBQVUsQ0FBQ3BOLENBQUQsQ0FBVixJQUFpQnFOLElBQUksQ0FBQ2xWLEtBQTFCLEVBQWlDO0FBQy9CLG1CQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0YsT0FSRDs7QUFVQSxVQUFJNFAsd0RBQVEsQ0FBQ0ksTUFBVCxJQUFtQmdGLE9BQU8sRUFBOUIsRUFBa0M7QUFDaEMsZUFBTyxJQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxLQUFQO0FBQ0Q7QUFqT0g7QUFBQTtBQUFBLDhCQW9PYUcsR0FwT2IsRUFvT2tCO0FBQ2QsVUFBSUMsRUFBRSxHQUFHRCxHQUFHLEtBQUssSUFBUixHQUFldkMsTUFBTSxDQUFDMUYsSUFBUCxDQUFZLFNBQVosRUFBdUIvTixNQUF0QyxHQUErQzZVLFNBQVMsQ0FBQzdVLE1BQWxFOztBQUNBLFVBQUl5USx3REFBUSxDQUFDQyxTQUFULEtBQXVCLEtBQTNCLEVBQWtDO0FBQ2hDNkMsU0FBQyxHQUFHMEMsRUFBRSxJQUFJbkMsVUFBVSxHQUFHckQsd0RBQVEsQ0FBQ0csV0FBMUIsQ0FBTjtBQUNELE9BRkQsTUFFTztBQUNMMkMsU0FBQyxHQUFHLENBQUo7O0FBQ0EsYUFBSyxJQUFJN0ssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3VOLEVBQXBCLEVBQXdCdk4sQ0FBQyxFQUF6QixFQUE2QjtBQUMzQjZLLFdBQUMsSUFBS21DLFFBQVEsQ0FBQ2IsU0FBUyxDQUFDRSxFQUFWLENBQWFyTSxDQUFiLEVBQWdCaU4sS0FBaEIsRUFBRCxDQUFSLEdBQW9DbEYsd0RBQVEsQ0FBQ0csV0FBbkQ7QUFDRDtBQUNGOztBQUNELGFBQU8yQyxDQUFQO0FBQ0Q7QUEvT0g7O0FBQUE7QUFBQSxtQkFBaUNqUyxXQUFqQztBQWtQQTFFLGNBQWMsQ0FBQzhILE1BQWYsQ0FBc0J3TyxXQUFXLENBQUN2TyxFQUFsQyxFQUFzQ3VPLFdBQXRDLEU7Ozs7Ozs7Ozs7OztBQ3BQQSxjQUFjLG1CQUFPLENBQUMsMk9BQXdIOztBQUU5SSw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMseUdBQXNEOztBQUUzRTs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsMk9BQXdIO0FBQzNJLG1CQUFtQixtQkFBTyxDQUFDLDJPQUF3SDs7QUFFbkosb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7OztBQzNDQSxjQUFjLG1CQUFPLENBQUMsOE5BQWtIOztBQUV4SSw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsc0dBQW1EOztBQUV4RTs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsOE5BQWtIO0FBQ3JJLG1CQUFtQixtQkFBTyxDQUFDLDhOQUFrSDs7QUFFN0ksb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFHTyxJQUFNZ0QsTUFBYjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsd0JBRW1CO0FBQ2YsYUFBTyxXQUFQO0FBQ0Q7QUFKSDtBQUFBO0FBQUEsd0JBTW1DO0FBQy9CLGFBQU8sQ0FBQyxVQUFELENBQVA7QUFDRDtBQVJIOztBQVVFLG9CQUFjO0FBQUE7O0FBQUE7O0FBQ1o7QUFFQSxVQUFLclYsS0FBTDtBQUFrQjtBQUF5QixNQUEzQztBQUNBLFVBQUtnSCxVQUFMO0FBQWtCO0FBQXlCLE1BQTNDO0FBQ0EsVUFBS3ZDLFFBQUw7QUFBa0I7QUFBeUIsS0FBM0M7QUFDQSxVQUFLMkMsT0FBTDtBQUFrQjtBQUF5QixNQUEzQztBQUNBLFVBQUtqRyxJQUFMO0FBQWtCO0FBQXlCLE1BQTNDO0FBQ0EsVUFBS21ELFFBQUw7QUFBa0I7QUFBeUIsU0FBM0M7QUFDQSxVQUFLZ1IsUUFBTDtBQUFrQjtBQUF5QixTQUEzQztBQUVBLFVBQUtDLGNBQUw7QUFBc0I7QUFBMkIsUUFBakQ7QUFFQSxVQUFLbFIsT0FBTCxHQUFlLEtBQWY7QUFDQSxVQUFLRSxPQUFMLEdBQWUsS0FBZjtBQWRZO0FBZ0JiOztBQTFCSDtBQUFBO0FBQUEsOEJBNEJZO0FBQ1I7O0FBQ0E7O0FBRUEsV0FBS3JKLFNBQUwsa0NBQ2dCK0csaUVBQVEsQ0FBQztBQUNuQixvQ0FBNEIsSUFEVDtBQUVuQixrQ0FBMEIsS0FBS29DLE9BRlo7QUFHbkIsNkJBQXFCLEtBQUtDLFFBSFA7QUFJbkIsbUNBQTJCLEtBQUtnUixRQUpiO0FBS25CLGdDQUF3QixLQUFLL1E7QUFMVixPQUFELENBRHhCLGtHQVNvQyxLQUFLRixPQVR6QywrSEFXbUQsS0FBSytDLE9BWHhELHFDQVlnQixLQUFLakcsSUFackIsZ0RBWTJELEtBQUtrRCxPQVpoRSx5S0FnQm9CLEtBQUtDLFFBaEJ6Qjs7QUFzQkE7O0FBQ0E7QUFDRDtBQXhESDtBQUFBO0FBQUEsd0NBMER1QjtBQUNuQixXQUFLMUIsT0FBTDtBQUNEO0FBNURIO0FBQUE7QUFBQSxzQ0E4RG9Ca0MsR0E5RHBCLEVBOER5QjtBQUNyQixVQUFJLENBQUMsS0FBS1IsUUFBTixJQUFrQixDQUFDLEtBQUtnUixRQUE1QixFQUFzQztBQUNwQyxhQUFLRSxPQUFMLENBQWFwWSxLQUFiO0FBQ0Q7QUFDRjtBQWxFSDtBQUFBO0FBQUEsdUNBb0VxQjBILEdBcEVyQixFQW9FMEI7QUFDdEIsVUFBSSxDQUFDLEtBQUt3USxRQUFWLEVBQW9CO0FBQ2xCLGFBQUtFLE9BQUwsQ0FBYTFRLEdBQWI7QUFDRDtBQUNGO0FBeEVIO0FBQUE7QUFBQSxzQ0EwRW9CQSxHQTFFcEIsRUEwRXlCO0FBQ3JCLFdBQUt0RyxLQUFMLEdBQWEsSUFBYjtBQUNEO0FBNUVIO0FBQUE7QUFBQSxxQ0E4RW1Cc0csR0E5RW5CLEVBOEV3QjtBQUNwQixXQUFLdEcsS0FBTCxHQUFhLEtBQWI7QUFDRDtBQWhGSDtBQUFBO0FBQUEsNEJBa0ZVcEIsS0FsRlYsRUFrRmlCO0FBQ2IsV0FBS2lILE9BQUwsR0FBZSxDQUFDLEtBQUtBLE9BQXJCO0FBQ0EsV0FBS2hELGFBQUwsQ0FBbUIsSUFBSUMsV0FBSixDQUFnQixlQUFoQixFQUFpQztBQUNsRG1ILHFCQUFhLEVBQUVyTCxLQURtQztBQUVsRGlILGVBQU8sRUFBRSxLQUFLQTtBQUZvQyxPQUFqQyxDQUFuQjs7QUFJQSxXQUFLekIsT0FBTDs7QUFDQSxXQUFLMlMsY0FBTCxDQUFvQi9XLEtBQXBCO0FBQ0Q7QUExRkg7QUFBQTtBQUFBLDZDQTRGNEJrRixRQTVGNUIsRUE0RnNDQyxRQTVGdEMsRUE0RmdEQyxRQTVGaEQsRUE0RjBELENBRXZEO0FBOUZIOztBQUFBO0FBQUEsRUFBNEJxQixxREFBNUI7QUFrR0FsSixjQUFjLENBQUM4SCxNQUFmLENBQXNCd1IsTUFBTSxDQUFDdlIsRUFBN0IsRUFBaUN1UixNQUFqQyxFOzs7Ozs7Ozs7Ozs7QUNyR0EsY0FBYyxtQkFBTyxDQUFDLDJPQUF3SDs7QUFFOUksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDJPQUF3SDtBQUMzSSxtQkFBbUIsbUJBQU8sQ0FBQywyT0FBd0g7O0FBRW5KLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ0EsSUFBTTdhLE9BQU8sR0FBRztBQUNkQyxNQUFJLEVBQUUsRUFEUTtBQUVkQyxNQUFJLEVBQUUsRUFGUTtBQUdkQyxPQUFLLEVBQUUsRUFITztBQUlkQyxJQUFFLEVBQUUsRUFKVTtBQUtkQyxNQUFJLEVBQUUsRUFMUTtBQU1kQyxLQUFHLEVBQUU7QUFOUyxDQUFoQjtBQVNBLElBQU1zTCxRQUFRLEdBQUdwTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBakI7QUFDQW1MLFFBQVEsQ0FBQ2xMLFNBQVQ7QUFjTyxJQUFNdWEsTUFBYjtBQUFBO0FBQUE7QUFBQTs7QUFDRSxvQkFBYztBQUFBOztBQUFBOztBQUNaO0FBRUEsVUFBS0MsYUFBTCxHQUFxQixNQUFLQSxhQUFMLENBQW1CNVUsSUFBbkIsdURBQXJCOztBQUVBLFVBQUsxRixZQUFMLENBQWtCO0FBQUNDLFVBQUksRUFBRTtBQUFQLEtBQWxCOztBQUNBLFVBQUtDLFVBQUwsQ0FBZ0JDLFdBQWhCLENBQTRCNkssUUFBUSxDQUFDNUssT0FBVCxDQUFpQkMsU0FBakIsQ0FBMkIsSUFBM0IsQ0FBNUI7O0FBRUEsVUFBS2thLFFBQUwsR0FBZ0IsTUFBS3JhLFVBQUwsQ0FBZ0IyRixhQUFoQixDQUE4QixnQkFBOUIsQ0FBaEI7QUFDQSxVQUFLMlUsVUFBTCxHQUFrQixNQUFLdGEsVUFBTCxDQUFnQjJGLGFBQWhCLENBQThCLGtCQUE5QixDQUFsQjs7QUFFQSxVQUFLMFUsUUFBTCxDQUFjamEsZ0JBQWQsQ0FBK0IsWUFBL0IsRUFBNkMsTUFBS2dhLGFBQWxEOztBQUNBLFVBQUtFLFVBQUwsQ0FBZ0JsYSxnQkFBaEIsQ0FBaUMsWUFBakMsRUFBK0MsTUFBS2dhLGFBQXBEOztBQVpZO0FBYWI7O0FBZEg7QUFBQTtBQUFBLHdDQWdCc0I7QUFBQTs7QUFFbEIsV0FBS2hhLGdCQUFMLENBQXNCLFNBQXRCLEVBQWlDLEtBQUtFLFVBQXRDO0FBQ0EsV0FBS0YsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBS21GLFFBQXBDO0FBRUEsVUFBSSxDQUFDLEtBQUtLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBTCxFQUNFLEtBQUszRSxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLFNBQTFCO0FBRUZWLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLENBQ1ZDLGNBQWMsQ0FBQ0MsV0FBZixDQUEyQixRQUEzQixDQURVLEVBRVZELGNBQWMsQ0FBQ0MsV0FBZixDQUEyQixjQUEzQixDQUZVLENBQVosRUFJQ0MsSUFKRCxDQUlNLFVBQUFDLENBQUM7QUFBQSxlQUFJLE1BQUksQ0FBQzJaLFdBQUwsRUFBSjtBQUFBLE9BSlA7QUFLRDtBQTdCSDtBQUFBO0FBQUEsMkNBK0J5QjtBQUNyQixXQUFLN1ksbUJBQUwsQ0FBeUIsU0FBekIsRUFBb0MsS0FBS3BCLFVBQXpDO0FBQ0EsV0FBS29CLG1CQUFMLENBQXlCLE9BQXpCLEVBQWtDLEtBQUs2RCxRQUF2QztBQUNEO0FBbENIO0FBQUE7QUFBQSxvQ0FvQ2tCO0FBQ2QsV0FBS2dWLFdBQUw7QUFDRDtBQXRDSDtBQUFBO0FBQUEsa0NBd0NnQjtBQUNaLFVBQU1DLElBQUksR0FBRyxLQUFLQyxRQUFMLEVBQWI7O0FBQ0FELFVBQUksQ0FBQ3paLE9BQUwsQ0FBYSxVQUFBMlosR0FBRyxFQUFJO0FBQ2xCLFlBQU14WixLQUFLLEdBQUd3WixHQUFHLENBQUNuWCxrQkFBbEI7O0FBQ0EsWUFBSXJDLEtBQUssQ0FBQ1UsT0FBTixDQUFjQyxXQUFkLE9BQWdDLGNBQXBDLEVBQW9EO0FBQ2xEMkIsaUJBQU8sQ0FBQ0MsS0FBUixnQkFBc0JpWCxHQUFHLENBQUN0WixFQUExQjtBQUNBO0FBQ0Q7O0FBRURzWixXQUFHLENBQUN6WixZQUFKLENBQWlCLGVBQWpCLEVBQWtDQyxLQUFLLENBQUNFLEVBQXhDO0FBQ0FGLGFBQUssQ0FBQ0QsWUFBTixDQUFtQixpQkFBbkIsRUFBc0N5WixHQUFHLENBQUN0WixFQUExQztBQUNELE9BVEQ7QUFXQSxVQUFNdVosV0FBVyxHQUFHSCxJQUFJLENBQUM1SSxJQUFMLENBQVUsVUFBQThJLEdBQUc7QUFBQSxlQUFJQSxHQUFHLENBQUNFLFFBQVI7QUFBQSxPQUFiLEtBQWtDSixJQUFJLENBQUMsQ0FBRCxDQUExRDs7QUFFQSxXQUFLSyxVQUFMLENBQWdCRixXQUFoQjtBQUNEO0FBeERIO0FBQUE7QUFBQSxpQ0EwRGU7QUFDWCxhQUFPeFgsS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBS0MsZ0JBQUwsQ0FBc0IsY0FBdEIsQ0FBWCxDQUFQO0FBQ0Q7QUE1REg7QUFBQTtBQUFBLCtCQThEYTtBQUNULGFBQU9GLEtBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUtDLGdCQUFMLENBQXNCLFFBQXRCLENBQVgsQ0FBUDtBQUNEO0FBaEVIO0FBQUE7QUFBQSxpQ0FrRWVxWCxHQWxFZixFQWtFb0I7QUFDaEIsVUFBTUksT0FBTyxHQUFHSixHQUFHLENBQUNsVCxZQUFKLENBQWlCLGVBQWpCLENBQWhCO0FBQ0EsYUFBTyxLQUFLN0IsYUFBTCxZQUF1Qm1WLE9BQXZCLEVBQVA7QUFDRDtBQXJFSDtBQUFBO0FBQUEsK0JBdUVhO0FBQ1QsVUFBTU4sSUFBSSxHQUFHLEtBQUtDLFFBQUwsRUFBYjs7QUFDQSxVQUFJL1csTUFBTSxHQUFHOFcsSUFBSSxDQUFDN1csU0FBTCxDQUFlLFVBQUErVyxHQUFHO0FBQUEsZUFBSUEsR0FBRyxDQUFDRSxRQUFSO0FBQUEsT0FBbEIsSUFBc0MsQ0FBbkQ7QUFDQSxhQUFPSixJQUFJLENBQUMsQ0FBQzlXLE1BQU0sR0FBRzhXLElBQUksQ0FBQzNXLE1BQWYsSUFBeUIyVyxJQUFJLENBQUMzVyxNQUEvQixDQUFYO0FBQ0Q7QUEzRUg7QUFBQTtBQUFBLGdDQTZFYztBQUNWLGFBQU8sS0FBSzRXLFFBQUwsR0FBZ0IsQ0FBaEIsQ0FBUDtBQUNEO0FBL0VIO0FBQUE7QUFBQSwrQkFpRmE7QUFDVCxVQUFNRCxJQUFJLEdBQUcsS0FBS0MsUUFBTCxFQUFiOztBQUNBLGFBQU9ELElBQUksQ0FBQ0EsSUFBSSxDQUFDM1csTUFBTCxHQUFjLENBQWYsQ0FBWDtBQUNEO0FBcEZIO0FBQUE7QUFBQSwrQkFzRmE7QUFDVCxVQUFNMlcsSUFBSSxHQUFHLEtBQUtDLFFBQUwsRUFBYjs7QUFDQSxVQUFJL1csTUFBTSxHQUFHOFcsSUFBSSxDQUFDN1csU0FBTCxDQUFlLFVBQUErVyxHQUFHO0FBQUEsZUFBSUEsR0FBRyxDQUFDRSxRQUFSO0FBQUEsT0FBbEIsSUFBc0MsQ0FBbkQ7QUFDQSxhQUFPSixJQUFJLENBQUM5VyxNQUFNLEdBQUc4VyxJQUFJLENBQUMzVyxNQUFmLENBQVg7QUFDRDtBQTFGSDtBQUFBO0FBQUEsNEJBNEZVO0FBQ04sVUFBTTJXLElBQUksR0FBRyxLQUFLQyxRQUFMLEVBQWI7O0FBQ0EsVUFBTU0sTUFBTSxHQUFHLEtBQUtDLFVBQUwsRUFBZjs7QUFFQVIsVUFBSSxDQUFDelosT0FBTCxDQUFhLFVBQUEyWixHQUFHO0FBQUEsZUFBSUEsR0FBRyxDQUFDRSxRQUFKLEdBQWUsS0FBbkI7QUFBQSxPQUFoQjtBQUNBRyxZQUFNLENBQUNoYSxPQUFQLENBQWUsVUFBQUcsS0FBSztBQUFBLGVBQUlBLEtBQUssQ0FBQytaLE1BQU4sR0FBZSxJQUFuQjtBQUFBLE9BQXBCO0FBQ0Q7QUFsR0g7QUFBQTtBQUFBLCtCQW9HYUMsTUFwR2IsRUFvR3FCO0FBRWpCLFdBQUtDLEtBQUw7O0FBRUEsVUFBTUMsUUFBUSxHQUFHLEtBQUtDLFlBQUwsQ0FBa0JILE1BQWxCLENBQWpCOztBQUVBLFVBQUksQ0FBQ0UsUUFBTCxFQUNFLE1BQU0sSUFBSUUsS0FBSiw0QkFBOEJDLFVBQTlCLEVBQU47QUFDRkwsWUFBTSxDQUFDTixRQUFQLEdBQWtCLElBQWxCO0FBQ0FRLGNBQVEsQ0FBQ0gsTUFBVCxHQUFrQixLQUFsQjtBQUNBQyxZQUFNLENBQUNoWSxLQUFQO0FBQ0Q7QUEvR0g7QUFBQTtBQUFBLCtCQWlIYXBCLEtBakhiLEVBaUhvQjtBQUVoQixVQUFJQSxLQUFLLENBQUNFLE1BQU4sQ0FBYXdGLFlBQWIsQ0FBMEIsTUFBMUIsTUFBc0MsS0FBMUMsRUFBaUQ7QUFDakQsVUFBSTFGLEtBQUssQ0FBQ1ksTUFBVixFQUFrQjtBQUVsQixVQUFJd1ksTUFBSjs7QUFDQSxjQUFRcFosS0FBSyxDQUFDYyxPQUFkO0FBQ0UsYUFBSzFELE9BQU8sQ0FBQ0UsSUFBYjtBQUNBLGFBQUtGLE9BQU8sQ0FBQ0ksRUFBYjtBQUNFNGIsZ0JBQU0sR0FBRyxLQUFLTSxRQUFMLEVBQVQ7QUFDQTs7QUFFRixhQUFLdGMsT0FBTyxDQUFDRyxLQUFiO0FBQ0EsYUFBS0gsT0FBTyxDQUFDQyxJQUFiO0FBQ0UrYixnQkFBTSxHQUFHLEtBQUtPLFFBQUwsRUFBVDtBQUNBOztBQUVGLGFBQUt2YyxPQUFPLENBQUNLLElBQWI7QUFDRTJiLGdCQUFNLEdBQUcsS0FBS1EsU0FBTCxFQUFUO0FBQ0E7O0FBRUYsYUFBS3hjLE9BQU8sQ0FBQ00sR0FBYjtBQUNFMGIsZ0JBQU0sR0FBRyxLQUFLUyxRQUFMLEVBQVQ7QUFDQTs7QUFFRjtBQUNFO0FBcEJKOztBQXVCQTdaLFdBQUssQ0FBQ21CLGNBQU47O0FBRUEsV0FBSzRYLFVBQUwsQ0FBZ0JLLE1BQWhCO0FBQ0Q7QUFqSkg7QUFBQTtBQUFBLDZCQW1KV3BaLEtBbkpYLEVBbUprQjtBQUNkLFVBQUlBLEtBQUssQ0FBQ0UsTUFBTixDQUFhd0YsWUFBYixDQUEwQixNQUExQixNQUFzQyxLQUExQyxFQUFpRDs7QUFDakQsV0FBS3FULFVBQUwsQ0FBZ0IvWSxLQUFLLENBQUNFLE1BQXRCO0FBQ0Q7QUF0Skg7O0FBQUE7QUFBQSxtQkFBNEJtRCxXQUE1QjtBQXlKQSxJQUFJeVcsWUFBWSxHQUFHLENBQW5CO0FBRU8sSUFBTUMsS0FBYjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsd0JBQ2tDO0FBQzlCLGFBQU8sQ0FBQyxVQUFELENBQVA7QUFDRDtBQUhIOztBQUtFLG1CQUFjO0FBQUE7O0FBQUE7QUFFYjs7QUFQSDtBQUFBO0FBQUEsd0NBU3NCO0FBQ2xCLFdBQUs1YSxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLEtBQTFCO0FBQ0EsVUFBSSxDQUFDLEtBQUtHLEVBQVYsRUFDRSxLQUFLQSxFQUFMLDhCQUE4QndhLFlBQVksRUFBMUMsRUFIZ0IsQ0FLbEI7O0FBQ0EsV0FBSzNhLFlBQUwsQ0FBa0IsZUFBbEIsRUFBbUMsT0FBbkM7QUFDQSxXQUFLQSxZQUFMLENBQWtCLFVBQWxCLEVBQThCLENBQUMsQ0FBL0I7O0FBQ0EsV0FBSytKLGdCQUFMLENBQXNCLFVBQXRCO0FBQ0Q7QUFsQkg7QUFBQTtBQUFBLHFDQW9CbUJFLElBcEJuQixFQW9CeUI7QUFDckIsVUFBSSxLQUFLQyxjQUFMLENBQW9CRCxJQUFwQixDQUFKLEVBQStCO0FBQzdCLFlBQUlwRixLQUFLLEdBQUcsS0FBS29GLElBQUwsQ0FBWjtBQUNBLGVBQU8sS0FBS0EsSUFBTCxDQUFQO0FBQ0EsYUFBS0EsSUFBTCxJQUFhcEYsS0FBYjtBQUNEO0FBQ0Y7QUExQkg7QUFBQTtBQUFBLCtDQTRCNkI7QUFDekIsVUFBTUEsS0FBSyxHQUFHLEtBQUtGLFlBQUwsQ0FBa0IsVUFBbEIsQ0FBZDtBQUNBLFdBQUszRSxZQUFMLENBQWtCLGVBQWxCLEVBQW1DNkUsS0FBbkM7QUFDQSxXQUFLN0UsWUFBTCxDQUFrQixVQUFsQixFQUE4QjZFLEtBQUssR0FBRyxDQUFILEdBQU8sQ0FBQyxDQUEzQztBQUNEO0FBaENIO0FBQUE7QUFBQSxzQkFrQ2VBLEtBbENmLEVBa0NzQjtBQUNsQkEsV0FBSyxHQUFHSSxPQUFPLENBQUNKLEtBQUQsQ0FBZjtBQUNBLFVBQUlBLEtBQUosRUFDRSxLQUFLN0UsWUFBTCxDQUFrQixVQUFsQixFQUE4QixFQUE5QixFQURGLEtBR0UsS0FBS2tGLGVBQUwsQ0FBcUIsVUFBckI7QUFDSCxLQXhDSDtBQUFBLHdCQTBDaUI7QUFDYixhQUFPLEtBQUtQLFlBQUwsQ0FBa0IsVUFBbEIsQ0FBUDtBQUNEO0FBNUNIOztBQUFBO0FBQUEsbUJBQTJCVCxXQUEzQjtBQStDQSxJQUFJMlcsY0FBYyxHQUFHLENBQXJCO0FBRU8sSUFBTUMsVUFBYjtBQUFBO0FBQUE7QUFBQTs7QUFDRSx3QkFBYztBQUFBOztBQUFBO0FBRWI7O0FBSEg7QUFBQTtBQUFBLHdDQUtzQjtBQUNsQixXQUFLOWEsWUFBTCxDQUFrQixNQUFsQixFQUEwQixVQUExQjtBQUNBLFVBQUksQ0FBQyxLQUFLRyxFQUFWLEVBQ0UsS0FBS0EsRUFBTCxnQ0FBZ0MwYSxjQUFjLEVBQTlDO0FBQ0g7QUFUSDs7QUFBQTtBQUFBLG1CQUFnQzNXLFdBQWhDLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwT0EsSUFBTWpHLE9BQU8sR0FBRztBQUNkMkwsT0FBSyxFQUFFLEVBRE87QUFFZGdDLE9BQUssRUFBRTtBQUZPLENBQWhCO0FBS0EsSUFBTS9CLFFBQVEsR0FBR3BMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFqQjtBQUNBbUwsUUFBUSxDQUFDbEwsU0FBVDtBQVlPLElBQU1vYyxjQUFiO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx3QkFDa0M7QUFDOUIsYUFBTyxDQUFDLFNBQUQsRUFBWSxVQUFaLENBQVA7QUFDRDtBQUhIOztBQUtFLDRCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7O0FBQ0EsVUFBS2xjLFlBQUwsQ0FBa0I7QUFBQ0MsVUFBSSxFQUFFO0FBQVAsS0FBbEI7O0FBQ0EsVUFBS0MsVUFBTCxDQUFnQkMsV0FBaEIsQ0FBNEI2SyxRQUFRLENBQUM1SyxPQUFULENBQWlCQyxTQUFqQixDQUEyQixJQUEzQixDQUE1Qjs7QUFIWTtBQUliOztBQVRIO0FBQUE7QUFBQSx3Q0FXc0I7QUFFbEIsVUFBSSxDQUFDLEtBQUt5RixZQUFMLENBQWtCLE1BQWxCLENBQUwsRUFDRSxLQUFLM0UsWUFBTCxDQUFrQixNQUFsQixFQUEwQixRQUExQjtBQUVGLFVBQUksQ0FBQyxLQUFLMkUsWUFBTCxDQUFrQixVQUFsQixDQUFMLEVBQ0UsS0FBSzNFLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsQ0FBOUI7QUFFRixVQUFJLENBQUMsS0FBSzJFLFlBQUwsQ0FBa0IsY0FBbEIsQ0FBTCxFQUNFLEtBQUszRSxZQUFMLENBQWtCLGNBQWxCLEVBQWtDLE9BQWxDOztBQUVGLFdBQUsrSixnQkFBTCxDQUFzQixTQUF0Qjs7QUFDQSxXQUFLQSxnQkFBTCxDQUFzQixVQUF0Qjs7QUFFQSxXQUFLNUssZ0JBQUwsQ0FBc0IsU0FBdEIsRUFBaUMsS0FBS0UsVUFBdEM7QUFDQSxXQUFLRixnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLbUYsUUFBcEM7QUFDRDtBQTNCSDtBQUFBO0FBQUEscUNBNkJtQjJGLElBN0JuQixFQTZCeUI7QUFDckIsVUFBSSxLQUFLQyxjQUFMLENBQW9CRCxJQUFwQixDQUFKLEVBQStCO0FBQzdCLFlBQUlwRixLQUFLLEdBQUcsS0FBS29GLElBQUwsQ0FBWjtBQUNBLGVBQU8sS0FBS0EsSUFBTCxDQUFQO0FBQ0EsYUFBS0EsSUFBTCxJQUFhcEYsS0FBYjtBQUNEO0FBQ0Y7QUFuQ0g7QUFBQTtBQUFBLDJDQXFDeUI7QUFDckIsV0FBS3BFLG1CQUFMLENBQXlCLFNBQXpCLEVBQW9DLEtBQUtwQixVQUF6QztBQUNBLFdBQUtvQixtQkFBTCxDQUF5QixPQUF6QixFQUFrQyxLQUFLNkQsUUFBdkM7QUFDRDtBQXhDSDtBQUFBO0FBQUEsNkNBa0UyQk0sSUFsRTNCLEVBa0VpQ3dDLFFBbEVqQyxFQWtFMkNDLFFBbEUzQyxFQWtFcUQ7QUFDakQsVUFBTThDLFFBQVEsR0FBRzlDLFFBQVEsS0FBSyxJQUE5Qjs7QUFDQSxjQUFRekMsSUFBUjtBQUNFLGFBQUssU0FBTDtBQUNFLGVBQUs1RSxZQUFMLENBQWtCLGNBQWxCLEVBQWtDbUssUUFBbEM7QUFDQTs7QUFDRixhQUFLLFVBQUw7QUFDRSxlQUFLbkssWUFBTCxDQUFrQixlQUFsQixFQUFtQ21LLFFBQW5DOztBQUNBLGNBQUlBLFFBQUosRUFBYztBQUNaLGlCQUFLakYsZUFBTCxDQUFxQixVQUFyQjtBQUNBLGlCQUFLa0YsSUFBTDtBQUNELFdBSEQsTUFHTztBQUNMLGlCQUFLcEssWUFBTCxDQUFrQixVQUFsQixFQUE4QixHQUE5QjtBQUNEOztBQUNEO0FBWko7QUFjRDtBQWxGSDtBQUFBO0FBQUEsK0JBb0ZhYSxLQXBGYixFQW9Gb0I7QUFFaEIsVUFBSUEsS0FBSyxDQUFDWSxNQUFWLEVBQWtCOztBQUVsQixjQUFRWixLQUFLLENBQUNjLE9BQWQ7QUFDRSxhQUFLMUQsT0FBTyxDQUFDMkwsS0FBYjtBQUNBLGFBQUszTCxPQUFPLENBQUMyTixLQUFiO0FBQ0UvSyxlQUFLLENBQUNtQixjQUFOOztBQUNBLGVBQUtnWixjQUFMOztBQUNBOztBQUVGO0FBQ0U7QUFSSjtBQVVEO0FBbEdIO0FBQUE7QUFBQSw2QkFvR1duYSxLQXBHWCxFQW9Ha0I7QUFDZCxXQUFLbWEsY0FBTDtBQUNEO0FBdEdIO0FBQUE7QUFBQSxxQ0F3R21CO0FBQ2YsVUFBSSxLQUFLalQsUUFBVCxFQUFtQjtBQUNuQixXQUFLa1QsT0FBTCxHQUFlLENBQUMsS0FBS0EsT0FBckI7QUFDQSxXQUFLblcsYUFBTCxDQUFtQixJQUFJQyxXQUFKLENBQWdCLFFBQWhCLEVBQTBCO0FBQzNDL0QsY0FBTSxFQUFFO0FBQ05pYSxpQkFBTyxFQUFFLEtBQUtBO0FBRFIsU0FEbUM7QUFJM0NqVyxlQUFPLEVBQUU7QUFKa0MsT0FBMUIsQ0FBbkI7QUFNRDtBQWpISDtBQUFBO0FBQUEsc0JBMENjSCxLQTFDZCxFQTBDcUI7QUFDakIsVUFBTXFXLFNBQVMsR0FBR2pXLE9BQU8sQ0FBQ0osS0FBRCxDQUF6QjtBQUNBLFVBQUlxVyxTQUFKLEVBQ0UsS0FBS2xiLFlBQUwsQ0FBa0IsU0FBbEIsRUFBNkIsRUFBN0IsRUFERixLQUdFLEtBQUtrRixlQUFMLENBQXFCLFNBQXJCO0FBQ0gsS0FoREg7QUFBQSx3QkFrRGdCO0FBQ1osYUFBTyxLQUFLUCxZQUFMLENBQWtCLFNBQWxCLENBQVA7QUFDRDtBQXBESDtBQUFBO0FBQUEsc0JBc0RlRSxLQXREZixFQXNEc0I7QUFDbEIsVUFBTTBGLFVBQVUsR0FBR3RGLE9BQU8sQ0FBQ0osS0FBRCxDQUExQjtBQUNBLFVBQUkwRixVQUFKLEVBQ0UsS0FBS3ZLLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsRUFBOUIsRUFERixLQUdFLEtBQUtrRixlQUFMLENBQXFCLFVBQXJCO0FBQ0gsS0E1REg7QUFBQSx3QkE4RGlCO0FBQ2IsYUFBTyxLQUFLUCxZQUFMLENBQWtCLFVBQWxCLENBQVA7QUFDRDtBQWhFSDs7QUFBQTtBQUFBLG1CQUFvQ1QsV0FBcEMsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CTyxJQUFNaVgsU0FBYjtBQUFBO0FBQUE7QUFBQTs7QUFFRSx1QkFBYztBQUFBOztBQUFBOztBQUNaO0FBQ0EsVUFBS0MsS0FBTCxHQUFhLE1BQUtBLEtBQUwsQ0FBVzdXLElBQVgsdURBQWI7QUFDQSxVQUFLOFcsS0FBTCxHQUFhLE1BQUtBLEtBQUwsQ0FBVzlXLElBQVgsdURBQWI7QUFIWTtBQUliOztBQU5IO0FBQUE7QUFBQSx3Q0FRc0I7QUFDbEIsVUFBSSxDQUFDLEtBQUtJLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBTCxFQUNFLEtBQUszRSxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLFNBQTFCO0FBRUYsVUFBSSxDQUFDLEtBQUsyRSxZQUFMLENBQWtCLFVBQWxCLENBQUwsRUFDRSxLQUFLM0UsWUFBTCxDQUFrQixVQUFsQixFQUE4QixDQUFDLENBQS9COztBQUVGLFdBQUtxYixLQUFMOztBQUVBLFdBQUtDLE9BQUwsR0FBZTdjLFFBQVEsQ0FBQ2lHLGFBQVQsQ0FBdUIsdUJBQXVCLEtBQUt2RSxFQUE1QixHQUFpQyxHQUF4RCxDQUFmO0FBRUEsVUFBSSxDQUFDLEtBQUttYixPQUFWLEVBQW1COztBQUVuQixXQUFLQSxPQUFMLENBQWFuYyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxLQUFLaWMsS0FBNUM7O0FBQ0EsV0FBS0UsT0FBTCxDQUFhbmMsZ0JBQWIsQ0FBOEIsTUFBOUIsRUFBc0MsS0FBS2tjLEtBQTNDOztBQUNBLFdBQUtDLE9BQUwsQ0FBYW5jLGdCQUFiLENBQThCLFlBQTlCLEVBQTRDLEtBQUtpYyxLQUFqRDs7QUFDQSxXQUFLRSxPQUFMLENBQWFuYyxnQkFBYixDQUE4QixZQUE5QixFQUE0QyxLQUFLa2MsS0FBakQ7QUFDRDtBQXpCSDtBQUFBO0FBQUEsMkNBMkJ5QjtBQUVyQixVQUFJLENBQUMsS0FBS0MsT0FBVixFQUFtQjs7QUFFbkIsV0FBS0EsT0FBTCxDQUFhN2EsbUJBQWIsQ0FBaUMsT0FBakMsRUFBMEMsS0FBSzJhLEtBQS9DOztBQUNBLFdBQUtFLE9BQUwsQ0FBYTdhLG1CQUFiLENBQWlDLE1BQWpDLEVBQXlDLEtBQUs0YSxLQUE5Qzs7QUFDQSxXQUFLQyxPQUFMLENBQWE3YSxtQkFBYixDQUFpQyxZQUFqQyxFQUErQyxLQUFLMmEsS0FBcEQ7O0FBQ0EsV0FBS0UsT0FBTCxDQUFhN2EsbUJBQWIsQ0FBaUMsWUFBakMsRUFBK0MsS0FBSzRhLEtBQXBEOztBQUNBLFdBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUFwQ0g7QUFBQTtBQUFBLDRCQXNDVTtBQUNOLFdBQUt0QixNQUFMLEdBQWMsS0FBZDtBQUNEO0FBeENIO0FBQUE7QUFBQSw0QkEwQ1U7QUFDTixXQUFLQSxNQUFMLEdBQWMsSUFBZDtBQUNEO0FBNUNIOztBQUFBO0FBQUEsbUJBQStCOVYsV0FBL0IsRzs7Ozs7Ozs7Ozs7O0FDRUE7QUFBQSxJQUFNcVgsUUFBUSxHQUFHO0FBQ2YsVUFBUSxRQURPO0FBRWYsVUFBUSxNQUZPO0FBR2YsVUFBUSxRQUhPO0FBSWYsY0FBWSxDQUNWO0FBQ0UsWUFBUSxnQkFEVjtBQUVFLFlBQVEsU0FGVjtBQUdFLFlBQVEsUUFIVjtBQUlFLGdCQUFZLENBQ1Y7QUFDRSxjQUFRLCtCQURWO0FBRUUsY0FBUSxnQkFGVjtBQUdFLGNBQVE7QUFIVixLQURVLEVBTVY7QUFDRSxjQUFRLDRCQURWO0FBRUUsY0FBUSxhQUZWO0FBR0UsY0FBUTtBQUhWLEtBTlUsRUFXVjtBQUNFLGNBQVEsb0NBRFY7QUFFRSxjQUFRLHFCQUZWO0FBR0UsY0FBUTtBQUhWLEtBWFU7QUFKZCxHQURVLEVBdUJWO0FBQ0UsWUFBUSxpQkFEVjtBQUVFLFlBQVEsVUFGVjtBQUdFLFlBQVE7QUFIVixHQXZCVSxFQTRCVjtBQUNFLFlBQVEsd0JBRFY7QUFFRSxZQUFRLGlCQUZWO0FBR0UsWUFBUSxRQUhWO0FBSUUsZ0JBQVksQ0FDVjtBQUNFLGNBQVEsaUNBRFY7QUFFRSxjQUFRLFVBRlY7QUFHRSxjQUFRO0FBSFYsS0FEVSxFQU1WO0FBQ0UsY0FBUSxzQ0FEVjtBQUVFLGNBQVEsZUFGVjtBQUdFLGNBQVE7QUFIVixLQU5VLEVBV1Y7QUFDRSxjQUFRLG9DQURWO0FBRUUsY0FBUSxhQUZWO0FBR0UsY0FBUTtBQUhWLEtBWFUsRUFnQlY7QUFDRSxjQUFRLDBDQURWO0FBRUUsY0FBUSxtQkFGVjtBQUdFLGNBQVE7QUFIVixLQWhCVSxFQXFCVjtBQUNFLGNBQVEsaUNBRFY7QUFFRSxjQUFRLFVBRlY7QUFHRSxjQUFRO0FBSFYsS0FyQlUsRUEwQlY7QUFDRSxjQUFRLDBDQURWO0FBRUUsY0FBUSxtQkFGVjtBQUdFLGNBQVE7QUFIVixLQTFCVSxFQStCVjtBQUNFLGNBQVEsMkNBRFY7QUFFRSxjQUFRLG9CQUZWO0FBR0UsY0FBUTtBQUhWLEtBL0JVLEVBb0NWO0FBQ0UsY0FBUSx5Q0FEVjtBQUVFLGNBQVEsa0JBRlY7QUFHRSxjQUFRO0FBSFYsS0FwQ1UsRUF5Q1Y7QUFDRSxjQUFRLHlDQURWO0FBRUUsY0FBUSxrQkFGVjtBQUdFLGNBQVE7QUFIVixLQXpDVSxFQThDVjtBQUNFLGNBQVEscURBRFY7QUFFRSxjQUFRLDhCQUZWO0FBR0UsY0FBUTtBQUhWLEtBOUNVO0FBSmQsR0E1QlUsRUFxRlY7QUFDRSxZQUFRLFlBRFY7QUFFRSxZQUFRLEtBRlY7QUFHRSxZQUFRLFFBSFY7QUFJRSxnQkFBWSxDQUNWO0FBQ0UsY0FBUSwyQkFEVjtBQUVFLGNBQVEsZ0JBRlY7QUFHRSxjQUFRO0FBSFYsS0FEVSxFQU1WO0FBQ0UsY0FBUSw4QkFEVjtBQUVFLGNBQVEsbUJBRlY7QUFHRSxjQUFRO0FBSFYsS0FOVSxFQVdWO0FBQ0UsY0FBUSx5QkFEVjtBQUVFLGNBQVEsY0FGVjtBQUdFLGNBQVE7QUFIVixLQVhVLEVBZ0JWO0FBQ0UsY0FBUSxtQ0FEVjtBQUVFLGNBQVEsd0JBRlY7QUFHRSxjQUFRO0FBSFYsS0FoQlUsRUFxQlY7QUFDRSxjQUFRLGtDQURWO0FBRUUsY0FBUSx1QkFGVjtBQUdFLGNBQVE7QUFIVixLQXJCVTtBQUpkLEdBckZVLEVBcUhWO0FBQ0UsWUFBUSxXQURWO0FBRUUsWUFBUSxJQUZWO0FBR0UsWUFBUSxRQUhWO0FBSUUsZ0JBQVksQ0FDVjtBQUNFLGNBQVEsMEJBRFY7QUFFRSxjQUFRLGdCQUZWO0FBR0UsY0FBUTtBQUhWLEtBRFU7QUFKZCxHQXJIVSxFQWlJVjtBQUNFLFlBQVEsa0JBRFY7QUFFRSxZQUFRLFdBRlY7QUFHRSxZQUFRO0FBSFYsR0FqSVUsRUFzSVY7QUFDRSxZQUFRLGlCQURWO0FBRUUsWUFBUSxVQUZWO0FBR0UsWUFBUSxRQUhWO0FBSUUsZ0JBQVksQ0FDVjtBQUNFLGNBQVEsNkJBRFY7QUFFRSxjQUFRLGFBRlY7QUFHRSxjQUFRO0FBSFYsS0FEVSxFQU1WO0FBQ0UsY0FBUSw2QkFEVjtBQUVFLGNBQVEsYUFGVjtBQUdFLGNBQVE7QUFIVixLQU5VO0FBSmQsR0F0SVUsRUF1SlY7QUFDRSxZQUFRLGNBRFY7QUFFRSxZQUFRLE9BRlY7QUFHRSxZQUFRLFFBSFY7QUFJRSxnQkFBWSxDQUNWO0FBQ0UsY0FBUSxxQkFEVjtBQUVFLGNBQVEsUUFGVjtBQUdFLGNBQVE7QUFIVixLQURVO0FBSmQsR0F2SlUsRUFtS1Y7QUFDRSxZQUFRLGFBRFY7QUFFRSxZQUFRLE1BRlY7QUFHRSxZQUFRLFFBSFY7QUFJRSxnQkFBWSxDQUNWO0FBQ0UsY0FBUSxnQ0FEVjtBQUVFLGNBQVEsb0JBRlY7QUFHRSxjQUFRO0FBSFYsS0FEVSxFQU1WO0FBQ0UsY0FBUSw2QkFEVjtBQUVFLGNBQVEsaUJBRlY7QUFHRSxjQUFRO0FBSFYsS0FOVSxFQVdWO0FBQ0UsY0FBUSx1QkFEVjtBQUVFLGNBQVEsV0FGVjtBQUdFLGNBQVE7QUFIVixLQVhVLEVBZ0JWO0FBQ0UsY0FBUSxrQ0FEVjtBQUVFLGNBQVEsc0JBRlY7QUFHRSxjQUFRO0FBSFYsS0FoQlU7QUFKZCxHQW5LVSxFQThMVjtBQUNFLFlBQVEsZUFEVjtBQUVFLFlBQVEsUUFGVjtBQUdFLFlBQVEsUUFIVjtBQUlFLGdCQUFZLENBQ1Y7QUFDRSxjQUFRLCtCQURWO0FBRUUsY0FBUSxpQkFGVjtBQUdFLGNBQVE7QUFIVixLQURVO0FBSmQsR0E5TFUsRUEwTVY7QUFDRSxZQUFRLFlBRFY7QUFFRSxZQUFRLEtBRlY7QUFHRSxZQUFRLFFBSFY7QUFJRSxnQkFBWSxDQUNWO0FBQ0UsY0FBUSx3QkFEVjtBQUVFLGNBQVEsYUFGVjtBQUdFLGNBQVE7QUFIVixLQURVO0FBSmQsR0ExTVUsRUFzTlY7QUFDRSxZQUFRLHFCQURWO0FBRUUsWUFBUSxjQUZWO0FBR0UsWUFBUSxRQUhWO0FBSUUsZ0JBQVksQ0FDVjtBQUNFLGNBQVEsOEJBRFY7QUFFRSxjQUFRLFVBRlY7QUFHRSxjQUFRO0FBSFYsS0FEVTtBQUpkLEdBdE5VLEVBa09WO0FBQ0UsWUFBUSxjQURWO0FBRUUsWUFBUSxPQUZWO0FBR0UsWUFBUSxRQUhWO0FBSUUsZ0JBQVksQ0FDVjtBQUNFLGNBQVEsMkJBRFY7QUFFRSxjQUFRLGNBRlY7QUFHRSxjQUFRO0FBSFYsS0FEVTtBQUpkLEdBbE9VLEVBOE9WO0FBQ0UsWUFBUSxpQkFEVjtBQUVFLFlBQVEsVUFGVjtBQUdFLFlBQVE7QUFIVixHQTlPVSxFQW1QVjtBQUNFLFlBQVEsYUFEVjtBQUVFLFlBQVEsTUFGVjtBQUdFLFlBQVEsUUFIVjtBQUlFLGdCQUFZLENBQ1Y7QUFDRSxjQUFRLDJCQURWO0FBRUUsY0FBUSxlQUZWO0FBR0UsY0FBUTtBQUhWLEtBRFU7QUFKZCxHQW5QVSxFQStQVjtBQUNFLFlBQVEsa0JBRFY7QUFFRSxZQUFRLFdBRlY7QUFHRSxZQUFRO0FBSFYsR0EvUFU7QUFKRyxDQUFqQjtBQTRRZUEsdUVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVRQTtBQUNBO0FBRU8sSUFBTUMsSUFBYjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsd0JBRW1CO0FBQ2YsYUFBTyxjQUFQO0FBQ0Q7QUFKSDtBQUFBO0FBQUEsd0JBTW1DO0FBQy9CLGFBQU8sQ0FBQyxVQUFELENBQVA7QUFDRDtBQVJIOztBQVVFLGtCQUFlO0FBQUE7O0FBQUE7O0FBQ2I7QUFDQSxVQUFLN2MsU0FBTCw0QkFDVzhFLGlEQURYLDZCQUVJLE1BQUtnWSxXQUFMLENBQWlCLENBQUNGLGtEQUFELENBQWpCLENBRko7QUFGYTtBQU1kOztBQWhCSDtBQUFBO0FBQUEsZ0NBa0JlRyxJQWxCZixFQWtCcUI7QUFDakIsYUFBTyxLQUFLQyxTQUFMLENBQWVELElBQWYsQ0FBUDtBQUNEO0FBcEJIO0FBQUE7QUFBQSw4QkFzQmFBLElBdEJiLEVBc0JtQjtBQUFBOztBQUNmLG9GQUVNQSxJQUFJLENBQUNFLE1BQUwsQ0FBWSxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUN0QkQsU0FBQyxpSkFFd0NDLENBQUMsQ0FBQ0MsSUFGMUMsc0VBR3FDRCxDQUFDLENBQUNsWCxJQUh2QyxvQ0FJS2tYLENBQUMsQ0FBQzFZLFFBQUYsR0FBYSxNQUFJLENBQUN1WSxTQUFMLENBQWVHLENBQUMsQ0FBQzFZLFFBQWpCLENBQWIsR0FBMEMsRUFKL0Msb0NBQUQ7QUFPQSxlQUFPeVksQ0FBUDtBQUNELE9BVEMsRUFTQyxFQVRELENBRk47QUFjRDtBQXJDSDtBQUFBO0FBQUEsd0NBdUN1QjtBQUFBOztBQUNuQixVQUFNRyxPQUFPLEdBQUcsS0FBSzVaLGdCQUFMLENBQXNCLGFBQXRCLENBQWhCO0FBQ0FGLFdBQUssQ0FBQ0MsSUFBTixDQUFXNlosT0FBWCxFQUFvQmxjLE9BQXBCLENBQTRCLFVBQUFxSixFQUFFLEVBQUk7QUFDaENBLFVBQUUsQ0FBQ2hLLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFVBQUFvSixHQUFHO0FBQUEsaUJBQUksTUFBSSxDQUFDMFQsV0FBTCxDQUFpQjFULEdBQWpCLEVBQXNCWSxFQUF0QixDQUFKO0FBQUEsU0FBaEM7QUFDRCxPQUZELEVBRm1CLENBTW5COztBQUNBNlMsYUFBTyxDQUFDLENBQUQsQ0FBUCxDQUFXaGMsWUFBWCxDQUF3QixlQUF4QixFQUF5QyxJQUF6QztBQUNEO0FBL0NIO0FBQUE7QUFBQSxnQ0FpRGN1SSxHQWpEZCxFQWlEbUJZLEVBakRuQixFQWlEdUI7QUFDbkIsVUFBSStTLFVBQVUsR0FBRy9TLEVBQUUsQ0FBQzVDLFlBQUgsQ0FBZ0IsZUFBaEIsQ0FBakI7O0FBQ0EsVUFBRzJWLFVBQVUsS0FBSyxNQUFsQixFQUEwQjtBQUN4Qi9TLFVBQUUsQ0FBQ25KLFlBQUgsQ0FBZ0IsZUFBaEIsRUFBaUMsS0FBakM7QUFDRCxPQUZELE1BRU87QUFDTG1KLFVBQUUsQ0FBQ25KLFlBQUgsQ0FBZ0IsZUFBaEIsRUFBaUMsSUFBakM7QUFDRDs7QUFDRHVJLFNBQUcsQ0FBQ2dELGVBQUo7QUFDRDtBQXpESDtBQUFBO0FBQUEsMkNBMkQwQjtBQUFBOztBQUN0QixVQUFNeVEsT0FBTyxHQUFHLEtBQUs1WixnQkFBTCxDQUFzQixhQUF0QixDQUFoQjtBQUNBRixXQUFLLENBQUNDLElBQU4sQ0FBVzZaLE9BQVgsRUFBb0JsYyxPQUFwQixDQUE0QixVQUFBcUosRUFBRSxFQUFJO0FBQ2hDQSxVQUFFLENBQUMxSSxtQkFBSCxDQUF1QixPQUF2QixFQUFnQyxVQUFBOEgsR0FBRztBQUFBLGlCQUFJLE1BQUksQ0FBQzBULFdBQUwsQ0FBaUIxVCxHQUFqQixFQUFzQlksRUFBdEIsQ0FBSjtBQUFBLFNBQW5DO0FBQ0QsT0FGRDtBQUdEO0FBaEVIOztBQUFBO0FBQUEsbUJBQTBCakYsV0FBMUI7QUFtRUExRSxjQUFjLENBQUM4SCxNQUFmLENBQXNCa1UsSUFBSSxDQUFDalUsRUFBM0IsRUFBK0JpVSxJQUEvQixFOzs7Ozs7Ozs7Ozs7QUN2RUEsY0FBYyxtQkFBTyxDQUFDLHFPQUFzSDs7QUFFNUksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLHFPQUFzSDtBQUN6SSxtQkFBbUIsbUJBQU8sQ0FBQyxxT0FBc0g7O0FBRWpKLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBOzs7Ozs7QUFPQSxJQUFNM1IsUUFBUSxHQUFHcEwsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLENBQWpCO0FBQ0FtTCxRQUFRLENBQUNsTCxTQUFUO0FBS08sSUFBTXdkLFFBQWI7QUFBQTtBQUFBO0FBQUE7O0FBRUUsc0JBQWM7QUFBQTs7QUFBQTs7QUFDWjs7QUFDQSxVQUFLdGQsWUFBTCxDQUFrQjtBQUFDQyxVQUFJLEVBQUU7QUFBUCxLQUFsQjs7QUFDQSxVQUFLQyxVQUFMLENBQWdCQyxXQUFoQixDQUE0QjZLLFFBQVEsQ0FBQzVLLE9BQVQsQ0FBaUJDLFNBQWpCLENBQTJCLElBQTNCLENBQTVCOztBQUhZO0FBSWI7O0FBTkg7QUFBQTtBQUFBLHdDQVFzQixDQUNsQjtBQUNEO0FBVkg7QUFBQTtBQUFBLDJDQVl5QixDQUNyQjtBQUNEO0FBZEg7O0FBQUE7QUFBQSxtQkFBOEJnRixXQUE5QjtBQW1CQTRJLE1BQU0sQ0FBQ3ROLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixZQUE3QixFQUEyQzZVLFFBQTNDLEU7Ozs7Ozs7Ozs7OztBQzlCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLElBQU0vUSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDZ1IsSUFBRCxFQUFPQyxHQUFQLEVBQWU7QUFDbkMsU0FBT0QsSUFBSSxDQUFDUixNQUFMLENBQVksVUFBQ0MsQ0FBRCxFQUFJUyxFQUFKLEVBQVFoUixDQUFSO0FBQUEsV0FBY3VRLENBQUMsR0FBR1EsR0FBRyxDQUFDQyxFQUFELEVBQUtoUixDQUFMLENBQXJCO0FBQUEsR0FBWixFQUEwQyxFQUExQyxDQUFQO0FBQ0QsQ0FGTTtBQUlBLElBQU01RixRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxRQUFELEVBQWM7QUFDcEMsU0FBT0MsTUFBTSxDQUFDQyxJQUFQLENBQVlGLFFBQVosRUFBc0JHLE1BQXRCLENBQTZCLFVBQUFDLEdBQUc7QUFBQSxXQUFJSixRQUFRLENBQUNJLEdBQUQsQ0FBUixJQUFpQixFQUFyQjtBQUFBLEdBQWhDLEVBQXlEQyxJQUF6RCxDQUE4RCxHQUE5RCxDQUFQO0FBQ0QsQ0FGTTtBQUlBLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLFFBQUQsRUFBYztBQUNwQyxTQUFPTixNQUFNLENBQUNDLElBQVAsQ0FBWUssUUFBWixFQUFzQkosTUFBdEIsQ0FBNkIsVUFBQXJDLEtBQUs7QUFBQSxXQUFJeUMsUUFBUSxDQUFDekMsS0FBRCxDQUFaO0FBQUEsR0FBbEMsRUFBdUR1QyxJQUF2RCxDQUE0RCxHQUE1RCxDQUFQO0FBQ0QsQ0FGTTtBQUlBLElBQU1xQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDa1UsR0FBRCxFQUFTO0FBQ2xDLFNBQU9BLEdBQUcsQ0FBQ2hULE9BQUosQ0FBWSxXQUFaLEVBQXlCLFVBQUFzUyxDQUFDO0FBQUEsV0FBSUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxDQUFLVyxXQUFMLEVBQUo7QUFBQSxHQUExQixDQUFQO0FBQ0QsQ0FGTTtBQUlBLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNGLEdBQUQsRUFBUztBQUNsQyxTQUFPQSxHQUFHLENBQUNoVCxPQUFKLENBQVksUUFBWixFQUFzQixVQUFBc1MsQ0FBQztBQUFBLFdBQUksTUFBTUEsQ0FBQyxDQUFDamIsV0FBRixFQUFWO0FBQUEsR0FBdkIsQ0FBUDtBQUNELENBRk07QUFJQSxJQUFNNkssT0FBTyxHQUFHO0FBQ3JCQyxXQUFTLEVBQUUsQ0FEVTtBQUVyQmdSLEtBQUcsRUFBRSxDQUZnQjtBQUdyQkMsT0FBSyxFQUFFLEVBSGM7QUFJckIvUSxPQUFLLEVBQUUsRUFKYztBQUtyQmdSLE9BQUssRUFBRSxFQUxjO0FBTXJCQyxTQUFPLEVBQUUsRUFOWTtBQU9yQkMsS0FBRyxFQUFFLEVBUGdCO0FBUXJCQyxXQUFTLEVBQUUsRUFSVTtBQVNyQkMsUUFBTSxFQUFFLEVBVGE7QUFVckJDLFVBQVEsRUFBRSxFQVZXO0FBV3JCQyxTQUFPLEVBQUUsRUFYWTtBQVlyQkMsV0FBUyxFQUFFLEVBWlU7QUFhckI1ZSxLQUFHLEVBQUUsRUFiZ0I7QUFjckJELE1BQUksRUFBRSxFQWRlO0FBZXJCSCxNQUFJLEVBQUUsRUFmZTtBQWdCckJFLElBQUUsRUFBRSxFQWhCaUI7QUFpQnJCRCxPQUFLLEVBQUUsRUFqQmM7QUFrQnJCRixNQUFJLEVBQUUsRUFsQmU7QUFtQnJCa2YsUUFBTSxFQUFFLEVBbkJhO0FBb0JyQkMsUUFBTSxFQUFFLEVBcEJhO0FBcUJyQkMsTUFBSSxFQUFFLEVBckJlO0FBc0JyQkMsVUFBUSxFQUFFO0FBdEJXLENBQWhCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCUDtBQUVBLElBQUlsSyxRQUFRLEdBQUdtSyxvREFBZjtBQUVPLElBQU1DLGFBQWI7QUFBQTtBQUFBO0FBRUUseUJBQVloRyxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUtqQixVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS1IsQ0FBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtzQixTQUFMLEdBQWlCQSxTQUFqQjtBQUNEOztBQVRIO0FBQUE7QUFBQSw0QkFXVTtBQUNOLFVBQUlwRSxRQUFRLENBQUNDLFNBQVQsS0FBdUIsS0FBM0IsRUFBa0M7QUFDaEMsYUFBS29ELFVBQUwsR0FBa0IsQ0FBQyxLQUFLTixNQUFMLElBQWdCL0MsUUFBUSxDQUFDaEksSUFBVCxHQUFpQmdJLFFBQVEsQ0FBQ0csV0FBM0IsR0FBMkNILFFBQVEsQ0FBQ0csV0FBbkUsQ0FBRCxJQUFvRkgsUUFBUSxDQUFDaEksSUFBL0c7QUFDRDtBQUNGO0FBZkg7QUFBQTtBQUFBLDZCQWlCV3VOLEdBakJYLEVBaUJnQjtBQUNaLFVBQUlDLEVBQUUsR0FBR0QsR0FBRyxLQUFLLElBQVIsR0FBZSxLQUFLdkMsTUFBTCxDQUFZMUYsSUFBWixDQUFpQixTQUFqQixFQUE0Qi9OLE1BQTNDLEdBQW9ELEtBQUs2VSxTQUFMLENBQWU3VSxNQUE1RTs7QUFDQSxVQUFJeVEsUUFBUSxDQUFDQyxTQUFULEtBQXVCLEtBQTNCLEVBQWtDO0FBQ2hDLGFBQUs2QyxDQUFMLEdBQVMwQyxFQUFFLElBQUksS0FBS25DLFVBQUwsR0FBa0JyRCxRQUFRLENBQUNHLFdBQS9CLENBQVg7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLMkMsQ0FBTCxHQUFTLENBQVQ7O0FBQ0EsYUFBSyxJQUFJN0ssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3VOLEVBQXBCLEVBQXdCdk4sQ0FBQyxFQUF6QixFQUE2QjtBQUMzQixlQUFLNkssQ0FBTCxJQUFXbUMsUUFBUSxDQUFDLEtBQUtiLFNBQUwsQ0FBZUUsRUFBZixDQUFrQnJNLENBQWxCLEVBQXFCaU4sS0FBckIsRUFBRCxDQUFSLEdBQXlDbEYsUUFBUSxDQUFDRyxXQUE3RDtBQUNEO0FBQ0Y7O0FBQ0QsYUFBTyxLQUFLMkMsQ0FBWjtBQUNEO0FBNUJIO0FBQUE7QUFBQSxtQ0E4QmlCO0FBQ2IsVUFBSUosT0FBTyxHQUFHdEYsQ0FBQyxDQUFDM0QsTUFBRCxDQUFELENBQVV5TCxLQUFWLEVBQWQ7QUFDQSxXQUFLeEMsT0FBTCxHQUFlQSxPQUFmOztBQUVBLFVBQUkxQyxRQUFRLENBQUNnQyxVQUFULENBQW9CelMsTUFBeEIsRUFBZ0M7QUFDOUIsWUFBSXlJLElBQUo7O0FBQ0EsWUFBSWdJLFFBQVEsQ0FBQ0MsU0FBVCxLQUF1QixLQUEzQixFQUFrQztBQUNoQ2pJLGNBQUksR0FBR2dJLFFBQVEsQ0FBQ2hJLElBQWhCO0FBQ0Q7O0FBQ0QsWUFBSTBLLE9BQU8sR0FBRzFDLFFBQVEsQ0FBQ2dDLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUJZLFVBQXJDLEVBQWlEO0FBQy9DLGVBQUssSUFBSTNLLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcrSCxRQUFRLENBQUNnQyxVQUFULENBQW9CelMsTUFBeEMsRUFBZ0QwSSxDQUFDLEVBQWpELEVBQXFEO0FBQ25ELGdCQUFJeUssT0FBTyxHQUFHMUMsUUFBUSxDQUFDZ0MsVUFBVCxDQUFvQi9KLENBQXBCLEVBQXVCMkssVUFBckMsRUFBaUQ7QUFDL0NBLHdCQUFVLEdBQUc1QyxRQUFRLENBQUNnQyxVQUFULENBQW9CL0osQ0FBcEIsRUFBdUIySyxVQUFwQztBQUNBQywwQkFBWSxHQUFHN0MsUUFBUSxDQUFDZ0MsVUFBVCxDQUFvQi9KLENBQXBCLENBQWY7QUFDRDtBQUNGO0FBQ0Y7O0FBQ0QsWUFBSSxPQUFPNEssWUFBUCxLQUF3QixXQUF4QixJQUF1Q0EsWUFBWSxLQUFLLElBQTVELEVBQWtFO0FBQ2hFLGVBQUssSUFBSXdILENBQVQsSUFBY3hILFlBQVksQ0FBQzdDLFFBQTNCLEVBQXFDO0FBQ25DLGdCQUFJNkMsWUFBWSxDQUFDN0MsUUFBYixDQUFzQm5KLGNBQXRCLENBQXFDd1QsQ0FBckMsQ0FBSixFQUE2QztBQUMzQyxrQkFBSSxPQUFPQyxZQUFZLENBQUNELENBQUQsQ0FBbkIsS0FBMkIsV0FBM0IsSUFBMENDLFlBQVksQ0FBQ0QsQ0FBRCxDQUFaLEtBQW9CLElBQWxFLEVBQXdFO0FBQ3RFQyw0QkFBWSxDQUFDRCxDQUFELENBQVosR0FBa0JySyxRQUFRLENBQUNxSyxDQUFELENBQTFCO0FBQ0Q7O0FBQ0RySyxzQkFBUSxDQUFDcUssQ0FBRCxDQUFSLEdBQWN4SCxZQUFZLENBQUM3QyxRQUFiLENBQXNCcUssQ0FBdEIsQ0FBZDtBQUNEO0FBQ0Y7QUFDRjs7QUFDRCxZQUFJLENBQUNqTixDQUFDLENBQUNtTixhQUFGLENBQWdCRCxZQUFoQixDQUFELElBQWtDNUgsT0FBTyxHQUFHMUMsUUFBUSxDQUFDZ0MsVUFBVCxDQUFvQixDQUFwQixFQUF1QlksVUFBdkUsRUFBbUY7QUFDakYsZUFBSyxJQUFJNEgsQ0FBVCxJQUFjRixZQUFkLEVBQTRCO0FBQzFCLGdCQUFJQSxZQUFZLENBQUN6VCxjQUFiLENBQTRCMlQsQ0FBNUIsQ0FBSixFQUFvQztBQUNsQ3hLLHNCQUFRLENBQUN3SyxDQUFELENBQVIsR0FBY0YsWUFBWSxDQUFDRSxDQUFELENBQTFCO0FBQ0Q7QUFDRjtBQUNGOztBQUNELFlBQUl4SyxRQUFRLENBQUNDLFNBQVQsS0FBdUIsS0FBM0IsRUFBa0M7QUFDaEMsY0FBSWtELFVBQVUsR0FBRyxDQUFiLElBQWtCLEtBQUtFLFVBQUwsR0FBa0IsQ0FBeEMsRUFBMkM7QUFDekMsZ0JBQUlyTCxJQUFJLEtBQUtnSSxRQUFRLENBQUNoSSxJQUF0QixFQUE0QjtBQUMxQnFLLG1CQUFLLEdBQUczRCxJQUFJLENBQUMrTCxLQUFMLENBQVd0SCxVQUFVLElBQUksQ0FBQyxLQUFLRSxVQUFMLEdBQWtCckQsUUFBUSxDQUFDRyxXQUE1QixJQUEyQ0gsUUFBUSxDQUFDRSxTQUF4RCxDQUFyQixDQUFSO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRjtBQXhFSDs7QUFBQTtBQUFBLEk7Ozs7Ozs7Ozs7OztBQ0pBO0FBQUEsSUFBTWlLLFFBQVEsR0FBRztBQUNmblMsTUFBSSxFQUFFLENBRFM7QUFFZmlJLFdBQVMsRUFBRSxLQUZJO0FBR2ZDLFdBQVMsRUFBRSxDQUhJO0FBSWZDLGFBQVcsRUFBRSxFQUpFO0FBS2ZyQixVQUFRLEVBQUUsRUFMSztBQU1mclQsTUFBSSxFQUFFLE9BTlM7QUFPZjJVLFFBQU0sRUFBRSxJQVBPO0FBUWZDLFdBQVMsRUFBRSxNQVJJO0FBUUk7QUFDbkJDLFFBQU0sRUFBRSxRQVRPO0FBU0c7QUFDbEJDLE9BQUssRUFBRSxHQVZRO0FBVUg7QUFDWkMsTUFBSSxFQUFFLEtBWFM7QUFZZkMsY0FBWSxFQUFFLEtBWkM7QUFhZkMsTUFBSSxFQUFFLEtBYlM7QUFjZkMsbUJBQWlCLEVBQUUsSUFkSjtBQWVmQyxPQUFLLEVBQUUsSUFmUTtBQWdCZkMsVUFBUSxFQUFFLEtBaEJLO0FBaUJmQyxVQUFRLEVBQUUsSUFqQks7QUFrQmZDLFVBQVEsRUFBRSxFQWxCSztBQW1CZkMsVUFBUSxFQUFFLEVBbkJLO0FBb0JmQyxLQUFHLEVBQUUsS0FwQlU7QUFxQmZDLGdCQUFjLEVBQUUsS0FyQkQ7QUFzQmZDLFVBQVEsRUFBRSxLQXRCSztBQXVCZkMsZ0JBQWMsRUFBRSxHQXZCRDtBQXdCZkMsYUFBVyxFQUFFLEdBeEJFO0FBeUJmQyxXQUFTLEVBQUUsRUF6Qkk7QUEwQmZDLE9BQUssRUFBRSxJQTFCUTtBQTJCZkMsU0FBTyxFQUFFLEtBM0JNO0FBNEJmQyxlQUFhLEVBQUUsQ0E1QkE7QUE2QmZDLGFBQVcsRUFBRSxDQTdCRTtBQThCZkMsc0JBQW9CLEVBQUUsUUE5QlA7QUErQmZDLGFBQVcsRUFBRSxJQS9CRTtBQWdDZkMsWUFBVSxFQUFFLElBaENHO0FBaUNmQyxVQUFRLEVBQUUsSUFqQ0s7QUFrQ2ZDLGdCQUFjLEVBQUUsRUFsQ0Q7QUFtQ2ZDLFlBQVUsRUFBRSxFQW5DRzs7QUFvQ2Y7QUFDQUMsZUFBYSxFQUFFLHVCQUFVQyxHQUFWLEVBQWUsQ0FBRyxDQXJDbEI7QUFzQ2ZDLGNBQVksRUFBRSxzQkFBVUQsR0FBVixFQUFlLENBQUcsQ0F0Q2pCO0FBdUNmRSxlQUFhLEVBQUUsdUJBQVVGLEdBQVYsRUFBZUcsS0FBZixFQUFzQixDQUFHLENBdkN6QjtBQXdDZkMsY0FBWSxFQUFFLHNCQUFVSixHQUFWLEVBQWVHLEtBQWYsRUFBc0IsQ0FBRyxDQXhDeEI7QUF5Q2ZFLG1CQUFpQixFQUFFLDJCQUFVTCxHQUFWLEVBQWVHLEtBQWYsRUFBc0IsQ0FBRyxDQXpDN0I7QUEwQ2ZHLG1CQUFpQixFQUFFLDJCQUFVTixHQUFWLEVBQWVHLEtBQWYsRUFBc0IsQ0FBRztBQUM1Qzs7QUEzQ2UsQ0FBakI7QUE4Q2U4SCx1RUFBZixFOzs7Ozs7Ozs7Ozs7QUM5Q0E7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQyxXQUFVL00sQ0FBVixFQUFhc04sU0FBYixFQUF3QjtBQUN2Qjs7QUFFQXROLEdBQUMsQ0FBQ3VOLEVBQUYsQ0FBSy9HLFdBQUwsR0FBbUIsVUFBVW5ILE9BQVYsRUFBbUI7QUFFcEMsUUFBSSxLQUFLbE4sTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNyQixhQUFPLElBQVA7QUFDRDs7QUFFRCxRQUFJLEtBQUtBLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNuQixXQUFLcWIsSUFBTCxDQUFVLFlBQVk7QUFDcEJ4TixTQUFDLENBQUMsSUFBRCxDQUFELENBQVF3RyxXQUFSLENBQW9CbkgsT0FBcEI7QUFDRCxPQUZEO0FBR0EsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQsUUFBSW9PLE1BQU0sR0FBRyxFQUFiO0FBQUEsUUFDRTdLLFFBQVEsR0FBRzVDLENBQUMsQ0FBQzBOLE1BQUYsQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQlgsb0RBQW5CLEVBQTZCMU4sT0FBN0IsQ0FEYjtBQUFBLFFBRUU2TixZQUFZLEdBQUcsRUFGakI7QUFBQSxRQUdFcEksR0FBRyxHQUFHLElBSFI7QUFJRTJJLFVBQU0sQ0FBQzNJLEdBQVAsR0FBYSxJQUFiOztBQUVGLFFBQUlsQyxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE1BQXRCLEVBQThCO0FBQzVCdVUsY0FBUSxDQUFDbUIsUUFBVCxHQUFvQixLQUFwQjtBQUNEOztBQUVEalMsV0FBTyxDQUFDc0YsR0FBUixDQUFZLE1BQVosRUFBb0IsS0FBS3pFLFFBQUwsRUFBcEI7QUFFQSxRQUFJcVUsU0FBUyxHQUFHbEMsR0FBRyxDQUFDblMsUUFBSixFQUFoQjtBQUFBLFFBQ0UyUyxPQUFPLEdBQUd0RixDQUFDLENBQUMzRCxNQUFELENBQUQsQ0FBVXlMLEtBQVYsRUFEWjtBQUFBLFFBRUV0QyxVQUFVLEdBQUcsSUFGZjtBQUFBLFFBR0VDLFlBQVksR0FBRyxJQUhqQjtBQUFBLFFBSUV0VCxNQUFNLEdBQUcsQ0FKWDtBQUFBLFFBS0V1VCxDQUFDLEdBQUcsQ0FMTjtBQUFBLFFBTUVuRCxFQUFFLEdBQUcsS0FOUDtBQUFBLFFBT0VvRCxNQUFNLEdBQUcsQ0FQWDtBQUFBLFFBUUVDLE1BQU0sR0FBRyxFQVJYO0FBQUEsUUFTRVgsS0FBSyxHQUFHLENBVFY7QUFBQSxRQVVFWSxRQUFRLEdBQUlqRCxRQUFRLENBQUNtQixRQUFULEtBQXNCLElBQXZCLEdBQStCLFFBQS9CLEdBQTBDLE9BVnZEO0FBQUEsUUFXRStCLE1BQU0sR0FBSWxELFFBQVEsQ0FBQ21CLFFBQVQsS0FBc0IsSUFBdkIsR0FBK0IsZUFBL0IsR0FBaUQsY0FYNUQ7QUFBQSxRQVlFZ0MsVUFBVSxHQUFHLENBWmY7QUFBQSxRQWFFQyxVQUFVLEdBQUcsQ0FiZjtBQUFBLFFBY0VDLFVBQVUsR0FBRyxDQWRmO0FBQUEsUUFlRUMsVUFBVSxHQUFHLENBZmY7QUFBQSxRQWdCRXhHLFFBQVEsR0FBRyxJQWhCYjtBQUFBLFFBaUJFeUcsT0FBTyxHQUFJLGtCQUFrQm5ZLFFBQVEsQ0FBQ29ZLGVBakJ4QztBQW1CQSxRQUFJdUgsT0FBTyxHQUFHLElBQUlYLHlEQUFKLENBQWtCaEcsU0FBbEIsQ0FBZDtBQUVBeUcsVUFBTSxHQUFHO0FBQ1AxRyxXQUFLLEVBQUUsaUJBQVk7QUFDakIsWUFBSWlCLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQVk7QUFDeEIsY0FBSUMsVUFBVSxHQUFHLENBQUMsWUFBRCxFQUFlLGVBQWYsRUFBZ0Msa0JBQWhDLEVBQW9ELGFBQXBELEVBQW1FLGNBQW5FLEVBQW1GLGlCQUFuRixDQUFqQjtBQUNBLGNBQUlDLElBQUksR0FBR2xhLFFBQVEsQ0FBQ29ZLGVBQXBCOztBQUNBLGVBQUssSUFBSXZMLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdvTixVQUFVLENBQUM5VixNQUEvQixFQUF1QzBJLENBQUMsRUFBeEMsRUFBNEM7QUFDMUMsZ0JBQUlvTixVQUFVLENBQUNwTixDQUFELENBQVYsSUFBaUJxTixJQUFJLENBQUNsVixLQUExQixFQUFpQztBQUMvQixxQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNGLFNBUkQ7O0FBU0EsWUFBSTRQLFFBQVEsQ0FBQ0ksTUFBVCxJQUFtQmdGLE9BQU8sRUFBOUIsRUFBa0M7QUFDaEMsaUJBQU8sSUFBUDtBQUNEOztBQUNELGVBQU8sS0FBUDtBQUNELE9BZk07QUFnQlB2RSxjQUFRLEVBQUUsb0JBQVk7QUFDcEIsWUFBSWIsUUFBUSxDQUFDYSxRQUFiLEVBQXVCO0FBQ3JCekQsV0FBQyxDQUFDaFMsUUFBRCxDQUFELENBQVl1VSxFQUFaLENBQWUsbUJBQWYsRUFBb0MsVUFBVXhLLENBQVYsRUFBYTtBQUMvQyxnQkFBSSxDQUFDaUksQ0FBQyxDQUFDLFFBQUQsQ0FBRCxDQUFZbEosRUFBWixDQUFlLGlCQUFmLENBQUwsRUFBd0M7QUFDdEMsa0JBQUlpQixDQUFDLENBQUN4RyxjQUFOLEVBQXNCO0FBQ3BCd0csaUJBQUMsQ0FBQ3hHLGNBQUY7QUFDRCxlQUZELE1BRU87QUFDTHdHLGlCQUFDLENBQUM2VixXQUFGLEdBQWdCLEtBQWhCO0FBQ0Q7O0FBQ0Qsa0JBQUk3VixDQUFDLENBQUM3RyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEI0VCxtQkFBRyxDQUFDK0ksYUFBSjtBQUNELGVBRkQsTUFFTyxJQUFJOVYsQ0FBQyxDQUFDN0csT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQzNCNFQsbUJBQUcsQ0FBQ2dKLGFBQUo7QUFDRDtBQUNGO0FBQ0YsV0FiRDtBQWNEO0FBQ0YsT0FqQ007QUFrQ1BwSyxjQUFRLEVBQUUsb0JBQVk7QUFDcEIsWUFBSWQsUUFBUSxDQUFDYyxRQUFiLEVBQXVCO0FBQ3JCb0IsYUFBRyxDQUFDaUosS0FBSixDQUFVLDZDQUE2Q25MLFFBQVEsQ0FBQ2UsUUFBdEQsR0FBaUUsd0JBQWpFLEdBQTRGZixRQUFRLENBQUNnQixRQUFyRyxHQUFnSCxZQUExSDs7QUFDQSxjQUFJLENBQUNoQixRQUFRLENBQUNDLFNBQWQsRUFBeUI7QUFDdkIsZ0JBQUkxUSxNQUFNLElBQUl5USxRQUFRLENBQUNoSSxJQUF2QixFQUE2QjtBQUMzQmdMLG9CQUFNLENBQUMxRixJQUFQLENBQVksV0FBWixFQUF5QjhOLElBQXpCO0FBQ0Q7QUFDRixXQUpELE1BSU87QUFDTCxnQkFBSUwsT0FBTyxDQUFDTSxRQUFSLENBQWlCLEtBQWpCLElBQTBCdEksTUFBOUIsRUFBc0M7QUFDcENDLG9CQUFNLENBQUMxRixJQUFQLENBQVksV0FBWixFQUF5QjhOLElBQXpCO0FBQ0Q7QUFDRjs7QUFDRHBJLGdCQUFNLENBQUMxRixJQUFQLENBQVksYUFBWixFQUEyQnFDLEVBQTNCLENBQThCLE9BQTlCLEVBQXVDLFVBQVV4SyxDQUFWLEVBQWE7QUFDbEQsZ0JBQUlBLENBQUMsQ0FBQ3hHLGNBQU4sRUFBc0I7QUFDcEJ3RyxlQUFDLENBQUN4RyxjQUFGO0FBQ0QsYUFGRCxNQUVPO0FBQ0x3RyxlQUFDLENBQUM2VixXQUFGLEdBQWdCLEtBQWhCO0FBQ0Q7O0FBQ0QsZ0JBQUk1TixDQUFDLENBQUMsSUFBRCxDQUFELENBQVF6SCxJQUFSLENBQWEsT0FBYixNQUEwQixRQUE5QixFQUF3QztBQUN0Q3VNLGlCQUFHLENBQUMrSSxhQUFKO0FBQ0QsYUFGRCxNQUVPO0FBQ0wvSSxpQkFBRyxDQUFDZ0osYUFBSjtBQUNEOztBQUNELG1CQUFPLEtBQVA7QUFDRCxXQVpEO0FBYUQ7QUFDRixPQTVETTtBQTZEUEksa0JBQVksRUFBRSx3QkFBWTtBQUN4QixZQUFJQyxLQUFLLEdBQUcsSUFBWjs7QUFDQSxZQUFJdkwsUUFBUSxDQUFDdlUsSUFBVCxLQUFrQixNQUF0QixFQUE4QjtBQUM1QnVVLGtCQUFRLENBQUNDLFNBQVQsR0FBcUIsS0FBckI7QUFDQUQsa0JBQVEsQ0FBQ1csaUJBQVQsR0FBNkIsS0FBN0I7QUFDRDs7QUFDRCxZQUFJWCxRQUFRLENBQUNRLElBQWIsRUFBbUI7QUFDakJSLGtCQUFRLENBQUNXLGlCQUFULEdBQTZCLEtBQTdCO0FBQ0Q7O0FBQ0QsWUFBSVgsUUFBUSxDQUFDQyxTQUFiLEVBQXdCO0FBQ3RCRCxrQkFBUSxDQUFDRSxTQUFULEdBQXFCLENBQXJCO0FBQ0FGLGtCQUFRLENBQUNoSSxJQUFULEdBQWdCLENBQWhCO0FBQ0Q7O0FBQ0QsWUFBSWdJLFFBQVEsQ0FBQ1UsSUFBYixFQUFtQjtBQUNqQlYsa0JBQVEsQ0FBQ0UsU0FBVCxHQUFxQixDQUFyQjtBQUNBRixrQkFBUSxDQUFDOEIsUUFBVCxHQUFvQixLQUFwQjtBQUNEOztBQUNEOUIsZ0JBQVEsQ0FBQ2lDLGFBQVQsQ0FBdUJ1SixJQUF2QixDQUE0QixJQUE1QixFQUFrQ3RKLEdBQWxDO0FBQ0E2SSxlQUFPLENBQUNVLFlBQVI7QUFDQXZKLFdBQUcsQ0FBQ3BELFFBQUosQ0FBYSxhQUFiLEVBQTRCNE0sSUFBNUIsQ0FBaUMsOEJBQThCMUwsUUFBUSxDQUFDbEIsUUFBdkMsR0FBa0QsNENBQW5GO0FBQ0FrRSxjQUFNLEdBQUdkLEdBQUcsQ0FBQzRDLE1BQUosQ0FBVyxpQkFBWCxDQUFUOztBQUNBLFlBQUk5RSxRQUFRLENBQUNpQixHQUFULEtBQWlCLElBQXJCLEVBQTJCO0FBQ3pCK0IsZ0JBQU0sQ0FBQzhCLE1BQVAsR0FBZ0JoRyxRQUFoQixDQUF5QixPQUF6QjtBQUNEOztBQUNELFlBQUlrQixRQUFRLENBQUNtQixRQUFiLEVBQXVCO0FBQ3JCNkIsZ0JBQU0sQ0FBQzhCLE1BQVAsR0FBZ0JoRyxRQUFoQixDQUF5QixVQUF6QjtBQUNBaUUsZ0JBQU0sR0FBRy9DLFFBQVEsQ0FBQ29CLGNBQWxCO0FBQ0E0QixnQkFBTSxDQUFDakUsR0FBUCxDQUFXLFFBQVgsRUFBcUJnRSxNQUFNLEdBQUcsSUFBOUI7QUFDRCxTQUpELE1BSU87QUFDTEEsZ0JBQU0sR0FBR2IsR0FBRyxDQUFDUyxVQUFKLEVBQVQ7QUFDRDs7QUFDRHlCLGlCQUFTLENBQUN0RixRQUFWLENBQW1CLFFBQW5COztBQUNBLFlBQUlrQixRQUFRLENBQUNVLElBQVQsS0FBa0IsSUFBbEIsSUFBMEJWLFFBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBaEQsRUFBeUQ7QUFDdkRzZixpQkFBTyxDQUFDWSxLQUFSOztBQUNBWixpQkFBTyxDQUFDbE0sS0FBUixHQUFnQixZQUFZO0FBQzFCLGdCQUFJa00sT0FBTyxDQUFDTSxRQUFSLENBQWlCLElBQWpCLElBQXlCdEksTUFBN0IsRUFBcUM7QUFDbkM7QUFDQSxrQkFBSTZJLEdBQUcsR0FBRyxDQUFWO0FBQUEsa0JBQ0VDLEVBQUUsR0FBRyxDQURQOztBQUVBLG1CQUFLLElBQUlyQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcEcsU0FBUyxDQUFDN1UsTUFBOUIsRUFBc0NpYixDQUFDLEVBQXZDLEVBQTJDO0FBQ3pDb0IsbUJBQUcsSUFBSzNHLFFBQVEsQ0FBQy9DLEdBQUcsQ0FBQzVFLElBQUosQ0FBUyxTQUFULEVBQW9CZ0gsRUFBcEIsQ0FBdUJrRyxDQUF2QixFQUEwQnRGLEtBQTFCLEVBQUQsQ0FBUixHQUE4Q2xGLFFBQVEsQ0FBQ0csV0FBL0Q7QUFDQTBMLGtCQUFFOztBQUNGLG9CQUFJRCxHQUFHLElBQUs3SSxNQUFNLEdBQUcvQyxRQUFRLENBQUNHLFdBQTlCLEVBQTRDO0FBQzFDO0FBQ0Q7QUFDRjs7QUFDRCxrQkFBSTJMLEtBQUssR0FBRzlMLFFBQVEsQ0FBQ0MsU0FBVCxLQUF1QixJQUF2QixHQUE4QjRMLEVBQTlCLEdBQW1DN0wsUUFBUSxDQUFDaEksSUFBeEQ7QUFFQTs7QUFDQSxrQkFBSThULEtBQUssR0FBRzVKLEdBQUcsQ0FBQzVFLElBQUosQ0FBUyxhQUFULEVBQXdCL04sTUFBcEMsRUFBNEM7QUFDMUMscUJBQUssSUFBSTBJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdpSyxHQUFHLENBQUM1RSxJQUFKLENBQVMsYUFBVCxFQUF3Qi9OLE1BQXhCLEdBQWlDdWMsS0FBckQsRUFBNEQ3VCxDQUFDLEVBQTdELEVBQWlFO0FBQy9EbU0sMkJBQVMsQ0FBQ0UsRUFBVixDQUFhck0sQ0FBYixFQUFnQnJILE1BQWhCO0FBQ0Q7QUFDRjs7QUFDRCxrQkFBSWtiLEtBQUssR0FBRzVKLEdBQUcsQ0FBQzVFLElBQUosQ0FBUyxjQUFULEVBQXlCL04sTUFBckMsRUFBNkM7QUFDM0MscUJBQUssSUFBSThhLENBQUMsR0FBR2pHLFNBQVMsQ0FBQzdVLE1BQVYsR0FBbUIsQ0FBaEMsRUFBbUM4YSxDQUFDLEdBQUlqRyxTQUFTLENBQUM3VSxNQUFWLEdBQW1CLENBQW5CLEdBQXVCMlMsR0FBRyxDQUFDNUUsSUFBSixDQUFTLGNBQVQsRUFBeUIvTixNQUF4RixFQUFpRzhhLENBQUMsRUFBbEcsRUFBc0c7QUFDcEdoSSx1QkFBSztBQUNMK0IsMkJBQVMsQ0FBQ0UsRUFBVixDQUFhK0YsQ0FBYixFQUFnQnpaLE1BQWhCO0FBQ0Q7QUFDRjtBQUNEOzs7QUFDQSxtQkFBSyxJQUFJbWIsQ0FBQyxHQUFHN0osR0FBRyxDQUFDNUUsSUFBSixDQUFTLGNBQVQsRUFBeUIvTixNQUF0QyxFQUE4Q3djLENBQUMsR0FBR0QsS0FBbEQsRUFBeURDLENBQUMsRUFBMUQsRUFBOEQ7QUFDNUQ3SixtQkFBRyxDQUFDNUUsSUFBSixDQUFTLFNBQVQsRUFBb0JnSCxFQUFwQixDQUF1QnlILENBQXZCLEVBQTBCbE4sS0FBMUIsR0FBa0NrQixXQUFsQyxDQUE4QyxRQUE5QyxFQUF3RGpCLFFBQXhELENBQWlFLGFBQWpFLEVBQWdGa04sUUFBaEYsQ0FBeUY5SixHQUF6RjtBQUNBRyxxQkFBSztBQUNOOztBQUNELG1CQUFLLElBQUk0SixDQUFDLEdBQUcvSixHQUFHLENBQUM1RSxJQUFKLENBQVMsU0FBVCxFQUFvQi9OLE1BQXBCLEdBQTZCMlMsR0FBRyxDQUFDNUUsSUFBSixDQUFTLGFBQVQsRUFBd0IvTixNQUFsRSxFQUEwRTBjLENBQUMsR0FBSS9KLEdBQUcsQ0FBQzVFLElBQUosQ0FBUyxTQUFULEVBQW9CL04sTUFBcEIsR0FBNkJ1YyxLQUE1RyxFQUFvSEcsQ0FBQyxFQUFySCxFQUF5SDtBQUN2SC9KLG1CQUFHLENBQUM1RSxJQUFKLENBQVMsU0FBVCxFQUFvQmdILEVBQXBCLENBQXVCMkgsQ0FBQyxHQUFHLENBQTNCLEVBQThCcE4sS0FBOUIsR0FBc0NrQixXQUF0QyxDQUFrRCxRQUFsRCxFQUE0RGpCLFFBQTVELENBQXFFLFlBQXJFLEVBQW1Gb04sU0FBbkYsQ0FBNkZoSyxHQUE3RjtBQUNEOztBQUNEa0MsdUJBQVMsR0FBR2xDLEdBQUcsQ0FBQ25TLFFBQUosRUFBWjtBQUNELGFBbENELE1Ba0NPO0FBQ0wsa0JBQUlxVSxTQUFTLENBQUMrSCxRQUFWLENBQW1CLE9BQW5CLENBQUosRUFBaUM7QUFDL0JqSyxtQkFBRyxDQUFDNUUsSUFBSixDQUFTLFFBQVQsRUFBbUIxTSxNQUFuQjtBQUNBMmEscUJBQUssQ0FBQ3RILElBQU4sQ0FBVy9CLEdBQVgsRUFBZ0IsQ0FBaEI7QUFDRDtBQUNGO0FBQ0YsV0F6Q0Q7O0FBMENBNkksaUJBQU8sQ0FBQ2xNLEtBQVI7QUFDRDs7QUFDRGtNLGVBQU8sQ0FBQ3FCLEdBQVIsR0FBYyxZQUFZO0FBQ3hCN2MsZ0JBQU0sR0FBRzZVLFNBQVMsQ0FBQzdVLE1BQW5COztBQUNBLGNBQUl5USxRQUFRLENBQUNpQixHQUFULEtBQWlCLElBQWpCLElBQXlCakIsUUFBUSxDQUFDbUIsUUFBVCxLQUFzQixLQUFuRCxFQUEwRDtBQUN4RCtCLGtCQUFNLEdBQUcsYUFBVDtBQUNEOztBQUNELGNBQUlsRCxRQUFRLENBQUNDLFNBQVQsS0FBdUIsS0FBM0IsRUFBa0M7QUFDaENtRSxxQkFBUyxDQUFDckYsR0FBVixDQUFja0UsUUFBZCxFQUF3QkksVUFBVSxHQUFHLElBQXJDO0FBQ0Q7O0FBQ0RlLG1CQUFTLENBQUNyRixHQUFWLENBQWNtRSxNQUFkLEVBQXNCbEQsUUFBUSxDQUFDRyxXQUFULEdBQXVCLElBQTdDO0FBQ0EyQyxXQUFDLEdBQUdpSSxPQUFPLENBQUNNLFFBQVIsQ0FBaUIsS0FBakIsQ0FBSjtBQUNBbkosYUFBRyxDQUFDbkQsR0FBSixDQUFRa0UsUUFBUixFQUFrQkgsQ0FBQyxHQUFHLElBQXRCOztBQUNBLGNBQUk5QyxRQUFRLENBQUNVLElBQVQsS0FBa0IsSUFBbEIsSUFBMEJWLFFBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBaEQsRUFBeUQ7QUFDdkQsZ0JBQUlrVSxFQUFFLEtBQUssS0FBWCxFQUFrQjtBQUNoQjBDLG1CQUFLLEdBQUdILEdBQUcsQ0FBQzVFLElBQUosQ0FBUyxhQUFULEVBQXdCL04sTUFBaEM7QUFDRDtBQUNGO0FBQ0YsU0FoQkQ7O0FBaUJBd2IsZUFBTyxDQUFDc0IsSUFBUixHQUFlLFlBQVk7QUFDekJqSSxtQkFBUyxHQUFHbEMsR0FBRyxDQUFDblMsUUFBSixFQUFaO0FBQ0FSLGdCQUFNLEdBQUc2VSxTQUFTLENBQUM3VSxNQUFuQjtBQUNELFNBSEQ7O0FBSUEsWUFBSSxLQUFLNFUsS0FBTCxFQUFKLEVBQWtCO0FBQ2hCbkIsZ0JBQU0sQ0FBQ2xFLFFBQVAsQ0FBZ0IsVUFBaEI7QUFDRDs7QUFDRGlNLGVBQU8sQ0FBQ3NCLElBQVI7O0FBQ0EsWUFBSXJNLFFBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBdEIsRUFBK0I7QUFDN0JzZixpQkFBTyxDQUFDWSxLQUFSO0FBQ0FaLGlCQUFPLENBQUNxQixHQUFSOztBQUNBLGNBQUlwTSxRQUFRLENBQUNVLElBQVQsS0FBa0IsSUFBdEIsRUFBNEI7QUFDMUJ5QyxzQkFBVSxHQUFHb0ksS0FBSyxDQUFDcEksVUFBTixFQUFiO0FBQ0EsaUJBQUtjLElBQUwsQ0FBVS9CLEdBQVYsRUFBZWlCLFVBQWY7QUFDRDs7QUFDRCxjQUFJbkQsUUFBUSxDQUFDbUIsUUFBVCxLQUFzQixLQUExQixFQUFpQztBQUMvQixpQkFBSytDLFNBQUwsQ0FBZWhDLEdBQWYsRUFBb0IsS0FBcEI7QUFDRDtBQUVGLFNBWEQsTUFXTztBQUNMLGVBQUtnQyxTQUFMLENBQWVoQyxHQUFmLEVBQW9CLElBQXBCO0FBQ0FBLGFBQUcsQ0FBQ3BELFFBQUosQ0FBYSxRQUFiOztBQUNBLGNBQUksQ0FBQyxLQUFLcUYsS0FBTCxFQUFMLEVBQW1CO0FBQ2pCQyxxQkFBUyxDQUFDQyxPQUFWLENBQWtCLENBQWxCO0FBQ0FELHFCQUFTLENBQUNFLEVBQVYsQ0FBYWpDLEtBQWIsRUFBb0JrQyxNQUFwQixDQUEyQixDQUEzQjtBQUNEO0FBQ0Y7O0FBQ0QsWUFBSXZFLFFBQVEsQ0FBQ1UsSUFBVCxLQUFrQixJQUFsQixJQUEwQlYsUUFBUSxDQUFDdlUsSUFBVCxLQUFrQixPQUFoRCxFQUF5RDtBQUN2RDJZLG1CQUFTLENBQUNFLEVBQVYsQ0FBYWpDLEtBQWIsRUFBb0J2RCxRQUFwQixDQUE2QixRQUE3QjtBQUNELFNBRkQsTUFFTztBQUNMc0YsbUJBQVMsQ0FBQzNGLEtBQVYsR0FBa0JLLFFBQWxCLENBQTJCLFFBQTNCO0FBQ0Q7QUFDRixPQTVMTTtBQTZMUHlDLFdBQUssRUFBRSxpQkFBWTtBQUNqQixZQUFJZ0ssS0FBSyxHQUFHLElBQVo7O0FBQ0FSLGVBQU8sQ0FBQ3VCLFdBQVIsR0FBc0IsWUFBWTtBQUNoQ2hKLG9CQUFVLEdBQUcsQ0FBQ1AsTUFBTSxJQUFLL0MsUUFBUSxDQUFDc0IsU0FBVCxHQUFzQnRCLFFBQVEsQ0FBQzBCLFdBQWhDLEdBQWdEMUIsUUFBUSxDQUFDMEIsV0FBN0QsQ0FBUCxJQUFvRjFCLFFBQVEsQ0FBQ3NCLFNBQTFHO0FBQ0EsY0FBSThDLFNBQVMsR0FBR3BCLE1BQU0sQ0FBQzFGLElBQVAsQ0FBWSxTQUFaLENBQWhCO0FBQ0EsY0FBSS9OLE1BQU0sR0FBR3lULE1BQU0sQ0FBQzFGLElBQVAsQ0FBWSxTQUFaLEVBQXVCL04sTUFBcEM7QUFDQSxjQUFJMEksQ0FBQyxHQUFHLENBQVI7QUFBQSxjQUNFc1UsTUFBTSxHQUFHLEVBRFg7QUFBQSxjQUVFOUgsQ0FBQyxHQUFHLENBRk47O0FBR0EsZUFBS3hNLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRzFJLE1BQWhCLEVBQXdCMEksQ0FBQyxFQUF6QixFQUE2QjtBQUMzQixnQkFBSStILFFBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBdEIsRUFBK0I7QUFDN0I7QUFDQSxrQkFBSSxDQUFDdVUsUUFBUSxDQUFDQyxTQUFkLEVBQXlCO0FBQ3ZCd0UsaUJBQUMsR0FBR3hNLENBQUMsSUFBSSxDQUFDb0wsVUFBVSxHQUFHckQsUUFBUSxDQUFDRyxXQUF2QixJQUFzQ0gsUUFBUSxDQUFDRSxTQUFuRCxDQUFMO0FBQ0QsZUFGRCxNQUVPO0FBQ0x1RSxpQkFBQyxJQUFLLENBQUNRLFFBQVEsQ0FBQ2IsU0FBUyxDQUFDRSxFQUFWLENBQWFyTSxDQUFiLEVBQWdCaU4sS0FBaEIsRUFBRCxDQUFSLEdBQW9DbEYsUUFBUSxDQUFDRyxXQUE5QyxJQUE2REgsUUFBUSxDQUFDRSxTQUE1RTtBQUNEO0FBQ0Y7O0FBQ0QsZ0JBQUlzTSxLQUFLLEdBQUdwSSxTQUFTLENBQUNFLEVBQVYsQ0FBYXJNLENBQUMsR0FBRytILFFBQVEsQ0FBQ0UsU0FBMUIsRUFBcUN2SyxJQUFyQyxDQUEwQyxZQUExQyxDQUFaOztBQUNBLGdCQUFJcUssUUFBUSxDQUFDd0IsT0FBVCxLQUFxQixJQUF6QixFQUErQjtBQUM3QitLLG9CQUFNLElBQUksMkJBQTJCdEosUUFBM0IsR0FBc0MsR0FBdEMsR0FBNENLLFVBQTVDLEdBQXlELEtBQXpELEdBQWlFSixNQUFqRSxHQUEwRSxHQUExRSxHQUFnRmxELFFBQVEsQ0FBQzBCLFdBQXpGLEdBQXVHLDRCQUF2RyxHQUFzSThLLEtBQXRJLEdBQThJLGVBQXhKO0FBQ0QsYUFGRCxNQUVPO0FBQ0xELG9CQUFNLElBQUksc0JBQXNCdFUsQ0FBQyxHQUFHLENBQTFCLElBQStCLFdBQXpDO0FBQ0Q7O0FBQ0QsZ0JBQUkrSCxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE9BQXRCLEVBQStCO0FBQzdCLGtCQUFLZ1osQ0FBRCxJQUFPM0IsQ0FBQyxHQUFHQyxNQUFKLEdBQWEvQyxRQUFRLENBQUNHLFdBQWpDLEVBQThDO0FBQzVDbEksaUJBQUMsR0FBR0EsQ0FBQyxHQUFHLENBQVI7QUFDQSxvQkFBSXdVLE1BQU0sR0FBRyxDQUFiOztBQUNBLG9CQUFJek0sUUFBUSxDQUFDQyxTQUFiLEVBQXdCO0FBQ3RCc00sd0JBQU0sSUFBSSxzQkFBc0J0VSxDQUFDLEdBQUcsQ0FBMUIsSUFBK0IsV0FBekM7QUFDQXdVLHdCQUFNLEdBQUcsQ0FBVDtBQUNEOztBQUNELG9CQUFJeFUsQ0FBQyxHQUFHd1UsTUFBUixFQUFnQjtBQUNkRix3QkFBTSxHQUFHLElBQVQ7QUFDQXZKLHdCQUFNLENBQUM4QixNQUFQLEdBQWdCaEcsUUFBaEIsQ0FBeUIsU0FBekI7QUFDRCxpQkFIRCxNQUdPO0FBQ0xrRSx3QkFBTSxDQUFDOEIsTUFBUCxHQUFnQi9FLFdBQWhCLENBQTRCLFNBQTVCO0FBQ0Q7O0FBQ0Q7QUFDRDtBQUNGO0FBQ0Y7O0FBQ0QsY0FBSTJNLFFBQVEsR0FBRzFKLE1BQU0sQ0FBQzhCLE1BQVAsRUFBZjtBQUNBNEgsa0JBQVEsQ0FBQ3BQLElBQVQsQ0FBYyxVQUFkLEVBQTBCcVAsSUFBMUIsQ0FBK0JKLE1BQS9COztBQUNBLGNBQUl2TSxRQUFRLENBQUN3QixPQUFULEtBQXFCLElBQXpCLEVBQStCO0FBQzdCLGdCQUFJeEIsUUFBUSxDQUFDbUIsUUFBVCxLQUFzQixJQUExQixFQUFnQztBQUM5QjtBQUNBdUwsc0JBQVEsQ0FBQ3BQLElBQVQsQ0FBYyxVQUFkLEVBQTBCeUIsR0FBMUIsQ0FBOEIsT0FBOUIsRUFBdUNpQixRQUFRLENBQUNxQixXQUFULEdBQXVCLElBQTlEO0FBQ0Q7O0FBQ0QrQixzQkFBVSxHQUFJbkwsQ0FBQyxJQUFJK0gsUUFBUSxDQUFDMEIsV0FBVCxHQUF1QjRCLFVBQTNCLENBQUYsR0FBNEMsR0FBekQ7QUFDQW9KLG9CQUFRLENBQUNwUCxJQUFULENBQWMsVUFBZCxFQUEwQnlCLEdBQTFCLENBQThCO0FBQzVCa0Usc0JBQVEsRUFBRUcsVUFBVSxHQUFHLElBREs7QUFFNUIscUNBQXVCcEQsUUFBUSxDQUFDTyxLQUFULEdBQWlCO0FBRlosYUFBOUI7O0FBSUEsZ0JBQUlQLFFBQVEsQ0FBQ21CLFFBQVQsS0FBc0IsSUFBMUIsRUFBZ0M7QUFDOUI2QixvQkFBTSxDQUFDOEIsTUFBUCxHQUFnQi9GLEdBQWhCLENBQW9CLGVBQXBCLEVBQXNDaUIsUUFBUSxDQUFDcUIsV0FBVCxHQUF1QnJCLFFBQVEsQ0FBQ3lCLGFBQWpDLEdBQWtELElBQXZGO0FBQ0Q7O0FBQ0RpTCxvQkFBUSxDQUFDcFAsSUFBVCxDQUFjLFVBQWQsRUFBMEJ5QixHQUExQixDQUE4QmtFLFFBQTlCLEVBQXdDRyxVQUFVLEdBQUcsSUFBckQ7QUFDRDs7QUFDRCxjQUFJd0osTUFBTSxHQUFHRixRQUFRLENBQUNwUCxJQUFULENBQWMsVUFBZCxFQUEwQkEsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FBYjtBQUNBc1AsZ0JBQU0sQ0FBQ25PLEtBQVAsR0FBZUssUUFBZixDQUF3QixRQUF4QjtBQUNBOE4sZ0JBQU0sQ0FBQ2pOLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLFlBQVk7QUFDN0IsZ0JBQUlLLFFBQVEsQ0FBQ1UsSUFBVCxLQUFrQixJQUFsQixJQUEwQlYsUUFBUSxDQUFDdlUsSUFBVCxLQUFrQixPQUFoRCxFQUF5RDtBQUN2RDRXLG1CQUFLLEdBQUdBLEtBQUssSUFBSXVLLE1BQU0sQ0FBQ2pVLEtBQVAsQ0FBYSxJQUFiLElBQXFCK1QsUUFBUSxDQUFDcFAsSUFBVCxDQUFjLFVBQWQsRUFBMEJBLElBQTFCLENBQStCLFdBQS9CLEVBQTRDM0UsS0FBNUMsRUFBekIsQ0FBYjtBQUNELGFBRkQsTUFFTztBQUNMMEosbUJBQUssR0FBR3VLLE1BQU0sQ0FBQ2pVLEtBQVAsQ0FBYSxJQUFiLENBQVI7QUFDRDs7QUFDRHVKLGVBQUcsQ0FBQ3pXLElBQUosQ0FBUyxLQUFUOztBQUNBLGdCQUFJdVUsUUFBUSxDQUFDd0IsT0FBVCxLQUFxQixJQUF6QixFQUErQjtBQUM3QitKLG1CQUFLLENBQUNzQixVQUFOO0FBQ0Q7O0FBQ0QsbUJBQU8sS0FBUDtBQUNELFdBWEQ7QUFZRCxTQXZFRDs7QUF3RUEsWUFBSTdNLFFBQVEsQ0FBQ3VCLEtBQWIsRUFBb0I7QUFDbEIsY0FBSXVMLEVBQUUsR0FBRyxNQUFUOztBQUNBLGNBQUk5TSxRQUFRLENBQUN3QixPQUFiLEVBQXNCO0FBQ3BCc0wsY0FBRSxHQUFHLFdBQUw7QUFDRDs7QUFDRDlKLGdCQUFNLENBQUNtSSxLQUFQLENBQWEsd0JBQXdCMkIsRUFBeEIsR0FBNkIsU0FBMUM7QUFDQSxjQUFJQyxPQUFPLEdBQUkvTSxRQUFRLENBQUNtQixRQUFWLEdBQXNCLGFBQXRCLEdBQXNDLFlBQXBEO0FBQ0E2QixnQkFBTSxDQUFDOEIsTUFBUCxHQUFnQnhILElBQWhCLENBQXFCLFVBQXJCLEVBQWlDeUIsR0FBakMsQ0FBcUNnTyxPQUFyQyxFQUE4Qy9NLFFBQVEsQ0FBQ3lCLGFBQVQsR0FBeUIsSUFBdkU7QUFDQXNKLGlCQUFPLENBQUN1QixXQUFSO0FBQ0Q7O0FBRUR6TSxrQkFBVSxDQUFDLFlBQVk7QUFDckJrTCxpQkFBTyxDQUFDaUMsSUFBUjtBQUNELFNBRlMsRUFFUCxDQUZPLENBQVY7QUFHRCxPQXJSTTtBQXNSUDlJLGVBQVMsRUFBRSxtQkFBVU0sRUFBVixFQUFjeUksSUFBZCxFQUFvQjtBQUM3QixZQUFJOVcsR0FBRyxHQUFHLElBQVY7QUFBQSxZQUNFb1YsS0FBSyxHQUFHLElBRFY7O0FBRUEsWUFBSXZMLFFBQVEsQ0FBQ1UsSUFBYixFQUFtQjtBQUNqQnZLLGFBQUcsR0FBR3FPLEVBQUUsQ0FBQ3pVLFFBQUgsQ0FBWSxVQUFaLEVBQXdCME8sS0FBeEIsRUFBTjtBQUNELFNBRkQsTUFFTztBQUNMdEksYUFBRyxHQUFHcU8sRUFBRSxDQUFDelUsUUFBSCxHQUFjME8sS0FBZCxFQUFOO0FBQ0Q7O0FBQ0QsWUFBSXlPLE1BQU0sR0FBRyxTQUFUQSxNQUFTLEdBQVk7QUFDdkIsY0FBSUMsRUFBRSxHQUFHaFgsR0FBRyxDQUFDaVgsV0FBSixFQUFUO0FBQUEsY0FDRUMsRUFBRSxHQUFHLENBRFA7QUFBQSxjQUVFQyxHQUFHLEdBQUdILEVBRlI7O0FBR0EsY0FBSUYsSUFBSixFQUFVO0FBQ1JFLGNBQUUsR0FBRyxDQUFMO0FBQ0FFLGNBQUUsR0FBS0MsR0FBRCxHQUFRLEdBQVQsR0FBZ0J2SyxNQUFyQjtBQUNEOztBQUNEeUIsWUFBRSxDQUFDekYsR0FBSCxDQUFPO0FBQ0wsc0JBQVVvTyxFQUFFLEdBQUcsSUFEVjtBQUVMLDhCQUFrQkUsRUFBRSxHQUFHO0FBRmxCLFdBQVA7QUFJRCxTQVpEOztBQWFBSCxjQUFNOztBQUNOLFlBQUkvVyxHQUFHLENBQUNtSCxJQUFKLENBQVMsS0FBVCxFQUFnQi9OLE1BQXBCLEVBQTRCO0FBQzFCLGNBQUk0RyxHQUFHLENBQUNtSCxJQUFKLENBQVMsS0FBVCxFQUFnQixDQUFoQixFQUFtQmlRLFFBQXZCLEVBQWlDO0FBQy9CTCxrQkFBTTs7QUFDTixnQkFBSSxDQUFDcFEsUUFBTCxFQUFlO0FBQ2J5TyxtQkFBSyxDQUFDL0ssSUFBTjtBQUNEO0FBQ0YsV0FMRCxNQUtPO0FBQ0xySyxlQUFHLENBQUNtSCxJQUFKLENBQVMsS0FBVCxFQUFnQnFDLEVBQWhCLENBQW1CLE1BQW5CLEVBQTJCLFlBQVk7QUFDckNFLHdCQUFVLENBQUMsWUFBWTtBQUNyQnFOLHNCQUFNOztBQUNOLG9CQUFJLENBQUNwUSxRQUFMLEVBQWU7QUFDYnlPLHVCQUFLLENBQUMvSyxJQUFOO0FBQ0Q7QUFDRixlQUxTLEVBS1AsR0FMTyxDQUFWO0FBTUQsYUFQRDtBQVFEO0FBQ0YsU0FoQkQsTUFnQk87QUFDTCxjQUFJLENBQUMxRCxRQUFMLEVBQWU7QUFDYnlPLGlCQUFLLENBQUMvSyxJQUFOO0FBQ0Q7QUFDRjtBQUNGLE9BalVNO0FBa1VQdUUsWUFBTSxFQUFFLGdCQUFVUCxFQUFWLEVBQWNnRSxDQUFkLEVBQWlCO0FBQ3ZCLFlBQUksS0FBS3JFLEtBQUwsTUFBZ0JuRSxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE1BQXRDLEVBQThDO0FBQzVDdVgsZ0JBQU0sQ0FBQ2xFLFFBQVAsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFDRCxZQUFJME8sRUFBRSxHQUFHLENBQVQ7O0FBQ0EsWUFBSW5MLEtBQUssR0FBR3JDLFFBQVEsQ0FBQ0UsU0FBakIsR0FBNkIzUSxNQUFqQyxFQUF5QztBQUN2Q2lWLFlBQUUsQ0FBQ3pFLFdBQUgsQ0FBZSxRQUFmOztBQUNBLGNBQUksQ0FBQyxLQUFLb0UsS0FBTCxFQUFELElBQWlCbkUsUUFBUSxDQUFDdlUsSUFBVCxLQUFrQixNQUFuQyxJQUE2QytjLENBQUMsS0FBSyxLQUF2RCxFQUE4RDtBQUM1RGhFLGNBQUUsQ0FBQ0gsT0FBSCxDQUFXckUsUUFBUSxDQUFDTyxLQUFwQjtBQUNEOztBQUNELGNBQUlpSSxDQUFDLEtBQUssSUFBVixFQUFnQjtBQUNkZ0YsY0FBRSxHQUFHbkwsS0FBTDtBQUNELFdBRkQsTUFFTztBQUNMbUwsY0FBRSxHQUFHbkwsS0FBSyxHQUFHckMsUUFBUSxDQUFDRSxTQUF0QjtBQUNELFdBVHNDLENBVXZDOzs7QUFDQSxjQUFJdU4sQ0FBSixFQUFPQyxFQUFQOztBQUNBLGNBQUlsRixDQUFDLEtBQUssSUFBVixFQUFnQjtBQUNkaUYsYUFBQyxHQUFHakosRUFBRSxDQUFDalYsTUFBUDtBQUNBbWUsY0FBRSxHQUFHRCxDQUFDLEdBQUcsQ0FBVDs7QUFDQSxnQkFBSUQsRUFBRSxHQUFHLENBQUwsSUFBVUMsQ0FBZCxFQUFpQjtBQUNmRCxnQkFBRSxHQUFHRSxFQUFMO0FBQ0Q7QUFDRjs7QUFDRCxjQUFJMU4sUUFBUSxDQUFDVSxJQUFULEtBQWtCLElBQWxCLElBQTBCVixRQUFRLENBQUN2VSxJQUFULEtBQWtCLE9BQWhELEVBQXlEO0FBQ3ZEO0FBQ0EsZ0JBQUkrYyxDQUFDLEtBQUssSUFBVixFQUFnQjtBQUNkZ0YsZ0JBQUUsR0FBR25MLEtBQUssR0FBR0gsR0FBRyxDQUFDNUUsSUFBSixDQUFTLGFBQVQsRUFBd0IvTixNQUFyQztBQUNELGFBRkQsTUFFTztBQUNMaWUsZ0JBQUUsR0FBR25MLEtBQUssR0FBR3JDLFFBQVEsQ0FBQ0UsU0FBdEI7QUFDRDs7QUFDRCxnQkFBSXNJLENBQUMsS0FBSyxJQUFWLEVBQWdCO0FBQ2RpRixlQUFDLEdBQUdqSixFQUFFLENBQUNqVixNQUFQO0FBQ0FtZSxnQkFBRSxHQUFHRCxDQUFDLEdBQUcsQ0FBVDs7QUFDQSxrQkFBSUQsRUFBRSxHQUFHLENBQUwsS0FBV0MsQ0FBZixFQUFrQjtBQUNoQkQsa0JBQUUsR0FBR0UsRUFBTDtBQUNELGVBRkQsTUFFTyxJQUFJRixFQUFFLEdBQUcsQ0FBTCxHQUFTQyxDQUFiLEVBQWdCO0FBQ3JCRCxrQkFBRSxHQUFHLENBQUw7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsY0FBSSxDQUFDLEtBQUtySixLQUFMLEVBQUQsSUFBaUJuRSxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE1BQW5DLElBQTZDK2MsQ0FBQyxLQUFLLEtBQXZELEVBQThEO0FBQzVEaEUsY0FBRSxDQUFDRixFQUFILENBQU1rSixFQUFOLEVBQVVqSixNQUFWLENBQWlCdkUsUUFBUSxDQUFDTyxLQUExQjtBQUNEOztBQUNEaUUsWUFBRSxDQUFDRixFQUFILENBQU1rSixFQUFOLEVBQVUxTyxRQUFWLENBQW1CLFFBQW5CO0FBQ0QsU0F6Q0QsTUF5Q087QUFDTDBGLFlBQUUsQ0FBQ3pFLFdBQUgsQ0FBZSxRQUFmO0FBQ0F5RSxZQUFFLENBQUNGLEVBQUgsQ0FBTUUsRUFBRSxDQUFDalYsTUFBSCxHQUFZLENBQWxCLEVBQXFCdVAsUUFBckIsQ0FBOEIsUUFBOUI7O0FBQ0EsY0FBSSxDQUFDLEtBQUtxRixLQUFMLEVBQUQsSUFBaUJuRSxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE1BQW5DLElBQTZDK2MsQ0FBQyxLQUFLLEtBQXZELEVBQThEO0FBQzVEaEUsY0FBRSxDQUFDSCxPQUFILENBQVdyRSxRQUFRLENBQUNPLEtBQXBCO0FBQ0FpRSxjQUFFLENBQUNGLEVBQUgsQ0FBTWtKLEVBQU4sRUFBVWpKLE1BQVYsQ0FBaUJ2RSxRQUFRLENBQUNPLEtBQTFCO0FBQ0Q7QUFDRjtBQUNGLE9BeFhNO0FBeVhQMEQsVUFBSSxFQUFFLGNBQVVPLEVBQVYsRUFBY0MsQ0FBZCxFQUFpQjtBQUNyQixZQUFJekUsUUFBUSxDQUFDaUIsR0FBVCxLQUFpQixJQUFyQixFQUEyQjtBQUN6QndELFdBQUMsR0FBRyxDQUFDQSxDQUFMO0FBQ0Q7O0FBQ0QsWUFBSSxLQUFLTixLQUFMLEVBQUosRUFBa0I7QUFDaEIsY0FBSW5FLFFBQVEsQ0FBQ21CLFFBQVQsS0FBc0IsSUFBMUIsRUFBZ0M7QUFDOUJxRCxjQUFFLENBQUN6RixHQUFILENBQU87QUFDTCwyQkFBYSxzQkFBdUIsQ0FBQzBGLENBQXhCLEdBQTZCLFVBRHJDO0FBRUwsbUNBQXFCLHNCQUF1QixDQUFDQSxDQUF4QixHQUE2QjtBQUY3QyxhQUFQO0FBSUQsV0FMRCxNQUtPO0FBQ0xELGNBQUUsQ0FBQ3pGLEdBQUgsQ0FBTztBQUNMLDJCQUFhLGlCQUFrQixDQUFDMEYsQ0FBbkIsR0FBd0IsZUFEaEM7QUFFTCxtQ0FBcUIsaUJBQWtCLENBQUNBLENBQW5CLEdBQXdCO0FBRnhDLGFBQVA7QUFJRDtBQUNGLFNBWkQsTUFZTztBQUNMLGNBQUl6RSxRQUFRLENBQUNtQixRQUFULEtBQXNCLElBQTFCLEVBQWdDO0FBQzlCcUQsY0FBRSxDQUFDekYsR0FBSCxDQUFPLFVBQVAsRUFBbUIsVUFBbkIsRUFBK0JHLE9BQS9CLENBQXVDO0FBQ3JDeUYsaUJBQUcsRUFBRSxDQUFDRixDQUFELEdBQUs7QUFEMkIsYUFBdkMsRUFFR3pFLFFBQVEsQ0FBQ08sS0FGWixFQUVtQlAsUUFBUSxDQUFDTSxNQUY1QjtBQUdELFdBSkQsTUFJTztBQUNMa0UsY0FBRSxDQUFDekYsR0FBSCxDQUFPLFVBQVAsRUFBbUIsVUFBbkIsRUFBK0JHLE9BQS9CLENBQXVDO0FBQ3JDMEYsa0JBQUksRUFBRSxDQUFDSCxDQUFELEdBQUs7QUFEMEIsYUFBdkMsRUFFR3pFLFFBQVEsQ0FBQ08sS0FGWixFQUVtQlAsUUFBUSxDQUFDTSxNQUY1QjtBQUdEO0FBQ0Y7O0FBQ0QsWUFBSXVFLE1BQU0sR0FBRzdCLE1BQU0sQ0FBQzhCLE1BQVAsR0FBZ0J4SCxJQUFoQixDQUFxQixVQUFyQixFQUFpQ0EsSUFBakMsQ0FBc0MsSUFBdEMsQ0FBYjtBQUNBLGFBQUt5SCxNQUFMLENBQVlGLE1BQVosRUFBb0IsSUFBcEI7QUFDRCxPQXRaTTtBQXVaUG9JLFVBQUksRUFBRSxnQkFBWTtBQUNoQixhQUFLbEksTUFBTCxDQUFZWCxTQUFaLEVBQXVCLEtBQXZCO0FBQ0EsWUFBSVMsTUFBTSxHQUFHN0IsTUFBTSxDQUFDOEIsTUFBUCxHQUFnQnhILElBQWhCLENBQXFCLFVBQXJCLEVBQWlDQSxJQUFqQyxDQUFzQyxJQUF0QyxDQUFiO0FBQ0EsYUFBS3lILE1BQUwsQ0FBWUYsTUFBWixFQUFvQixJQUFwQjtBQUNELE9BM1pNO0FBNFpQOEksV0FBSyxFQUFFLGlCQUFZO0FBQ2pCLFlBQUlwQyxLQUFLLEdBQUcsSUFBWjs7QUFDQVIsZUFBTyxDQUFDNkMsUUFBUixHQUFtQixZQUFZO0FBQzdCLGNBQUk5SyxDQUFDLEdBQUdDLE1BQVIsRUFBZ0I7QUFDZEksc0JBQVUsR0FBR29JLEtBQUssQ0FBQ3BJLFVBQU4sRUFBYjtBQUNBb0ksaUJBQUssQ0FBQ3hHLE1BQU4sQ0FBYVgsU0FBYixFQUF3QixLQUF4Qjs7QUFDQSxnQkFBS2pCLFVBQUQsR0FBZUwsQ0FBQyxHQUFHQyxNQUFKLEdBQWEvQyxRQUFRLENBQUNHLFdBQXpDLEVBQXNEO0FBQ3BEZ0Qsd0JBQVUsR0FBR0wsQ0FBQyxHQUFHQyxNQUFKLEdBQWEvQyxRQUFRLENBQUNHLFdBQW5DO0FBQ0QsYUFGRCxNQUVPLElBQUlnRCxVQUFVLEdBQUcsQ0FBakIsRUFBb0I7QUFDekJBLHdCQUFVLEdBQUcsQ0FBYjtBQUNEOztBQUNEb0ksaUJBQUssQ0FBQ3RILElBQU4sQ0FBVy9CLEdBQVgsRUFBZ0JpQixVQUFoQjs7QUFDQSxnQkFBSW5ELFFBQVEsQ0FBQ1UsSUFBVCxLQUFrQixJQUFsQixJQUEwQlYsUUFBUSxDQUFDdlUsSUFBVCxLQUFrQixPQUFoRCxFQUF5RDtBQUN2RCxrQkFBSTRXLEtBQUssSUFBSzlTLE1BQU0sR0FBSTJTLEdBQUcsQ0FBQzVFLElBQUosQ0FBUyxhQUFULEVBQXdCL04sTUFBeEIsR0FBaUN5USxRQUFRLENBQUNFLFNBQWxFLEVBQStFO0FBQzdFcUwscUJBQUssQ0FBQ3NDLFVBQU4sQ0FBaUIzTCxHQUFHLENBQUM1RSxJQUFKLENBQVMsYUFBVCxFQUF3Qi9OLE1BQXpDO0FBQ0Q7O0FBQ0Qsa0JBQUk4UyxLQUFLLEtBQUssQ0FBZCxFQUFpQjtBQUNma0oscUJBQUssQ0FBQ3NDLFVBQU4sQ0FBaUI3SyxNQUFNLENBQUMxRixJQUFQLENBQVksU0FBWixFQUF1Qi9OLE1BQXhDO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsU0FuQkQ7O0FBb0JBd2IsZUFBTyxDQUFDNkMsUUFBUjtBQUNELE9BbmJNO0FBb2JQQyxnQkFBVSxFQUFFLG9CQUFVQyxDQUFWLEVBQWE7QUFDdkIsWUFBSXZDLEtBQUssR0FBRyxJQUFaO0FBQ0F2SSxjQUFNLENBQUMxRixJQUFQLENBQVksYUFBWixFQUEyQndCLFFBQTNCLENBQW9DLFVBQXBDO0FBQ0FlLGtCQUFVLENBQUMsWUFBWTtBQUNyQndDLGVBQUssR0FBR3lMLENBQVI7QUFDQTlLLGdCQUFNLENBQUNqRSxHQUFQLENBQVcscUJBQVgsRUFBa0MsS0FBbEM7QUFDQW9FLG9CQUFVLEdBQUdvSSxLQUFLLENBQUNwSSxVQUFOLEVBQWI7QUFDQW9JLGVBQUssQ0FBQ3hHLE1BQU4sQ0FBYVgsU0FBYixFQUF3QixLQUF4QjtBQUNBeUcsZ0JBQU0sQ0FBQzVHLElBQVAsQ0FBWS9CLEdBQVosRUFBaUJpQixVQUFqQjtBQUNBdEQsb0JBQVUsQ0FBQyxZQUFZO0FBQ3JCbUQsa0JBQU0sQ0FBQ2pFLEdBQVAsQ0FBVyxxQkFBWCxFQUFrQ2lCLFFBQVEsQ0FBQ08sS0FBVCxHQUFpQixJQUFuRDtBQUNBeUMsa0JBQU0sQ0FBQzFGLElBQVAsQ0FBWSxhQUFaLEVBQTJCeUMsV0FBM0IsQ0FBdUMsVUFBdkM7QUFDRCxXQUhTLEVBR1AsRUFITyxDQUFWO0FBSUQsU0FWUyxFQVVQQyxRQUFRLENBQUNPLEtBQVQsR0FBaUIsR0FWVixDQUFWO0FBV0QsT0FsY007QUFtY1A0QyxnQkFBVSxFQUFFLHNCQUFZO0FBQ3RCLFlBQUk2QixHQUFHLEdBQUcsQ0FBVjs7QUFDQSxZQUFJaEYsUUFBUSxDQUFDQyxTQUFULEtBQXVCLEtBQTNCLEVBQWtDO0FBQ2hDK0UsYUFBRyxHQUFHM0MsS0FBSyxJQUFJLENBQUNnQixVQUFVLEdBQUdyRCxRQUFRLENBQUNHLFdBQXZCLElBQXNDSCxRQUFRLENBQUNFLFNBQW5ELENBQVg7QUFDRCxTQUZELE1BRU87QUFDTDhFLGFBQUcsR0FBRyxDQUFOOztBQUNBLGVBQUssSUFBSS9NLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdvSyxLQUFwQixFQUEyQnBLLENBQUMsRUFBNUIsRUFBZ0M7QUFDOUIrTSxlQUFHLElBQUtDLFFBQVEsQ0FBQ2IsU0FBUyxDQUFDRSxFQUFWLENBQWFyTSxDQUFiLEVBQWdCaU4sS0FBaEIsRUFBRCxDQUFSLEdBQW9DbEYsUUFBUSxDQUFDRyxXQUFyRDtBQUNEO0FBQ0Y7O0FBQ0QsZUFBTzZFLEdBQVA7QUFDRCxPQTljTTtBQStjUDZILGdCQUFVLEVBQUUsc0JBQVk7QUFDdEIsWUFBSXRjLFFBQUo7O0FBQ0EsZ0JBQVF5UCxRQUFRLENBQUMyQixvQkFBakI7QUFDRSxlQUFLLE1BQUw7QUFDRXBSLG9CQUFRLEdBQUcsQ0FBWDtBQUNBOztBQUNGLGVBQUssUUFBTDtBQUNFQSxvQkFBUSxHQUFJd1MsTUFBTSxHQUFHLENBQVYsR0FBZ0JPLFVBQVUsR0FBRyxDQUF4QztBQUNBOztBQUNGLGVBQUssT0FBTDtBQUNFL1Msb0JBQVEsR0FBR3dTLE1BQU0sR0FBR08sVUFBcEI7QUFSSjs7QUFVQSxZQUFJa0ssRUFBRSxHQUFHbkwsS0FBSyxHQUFHSCxHQUFHLENBQUM1RSxJQUFKLENBQVMsYUFBVCxFQUF3Qi9OLE1BQXpDO0FBQ0EsWUFBSXFkLE1BQU0sR0FBRzVKLE1BQU0sQ0FBQzhCLE1BQVAsR0FBZ0J4SCxJQUFoQixDQUFxQixVQUFyQixDQUFiOztBQUNBLFlBQUkwQyxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE9BQWxCLElBQTZCdVUsUUFBUSxDQUFDVSxJQUFULEtBQWtCLElBQW5ELEVBQXlEO0FBQ3ZELGNBQUk4TSxFQUFFLElBQUlaLE1BQU0sQ0FBQzdjLFFBQVAsR0FBa0JSLE1BQTVCLEVBQW9DO0FBQ2xDaWUsY0FBRSxHQUFHLENBQUw7QUFDRCxXQUZELE1BRU8sSUFBSUEsRUFBRSxHQUFHLENBQVQsRUFBWTtBQUNqQkEsY0FBRSxHQUFHWixNQUFNLENBQUM3YyxRQUFQLEdBQWtCUixNQUF2QjtBQUNEO0FBQ0Y7O0FBQ0QsWUFBSXdlLFVBQVUsR0FBR1AsRUFBRSxJQUFLbEssVUFBVSxHQUFHdEQsUUFBUSxDQUFDMEIsV0FBM0IsQ0FBRixHQUE4Q25SLFFBQS9EOztBQUNBLFlBQUt3ZCxVQUFVLEdBQUdoTCxNQUFkLEdBQXdCSyxVQUE1QixFQUF3QztBQUN0QzJLLG9CQUFVLEdBQUczSyxVQUFVLEdBQUdMLE1BQWIsR0FBc0IvQyxRQUFRLENBQUMwQixXQUE1QztBQUNEOztBQUNELFlBQUlxTSxVQUFVLEdBQUcsQ0FBakIsRUFBb0I7QUFDbEJBLG9CQUFVLEdBQUcsQ0FBYjtBQUNEOztBQUNELGFBQUs5SixJQUFMLENBQVUySSxNQUFWLEVBQWtCbUIsVUFBbEI7QUFDRCxPQTVlTTtBQTZlUHZOLFVBQUksRUFBRSxnQkFBWTtBQUNoQixZQUFJUixRQUFRLENBQUNRLElBQWIsRUFBbUI7QUFDakJ3Tix1QkFBYSxDQUFDbFIsUUFBRCxDQUFiO0FBQ0FBLGtCQUFRLEdBQUdtUixXQUFXLENBQUMsWUFBWTtBQUNqQy9MLGVBQUcsQ0FBQ2dKLGFBQUo7QUFDRCxXQUZxQixFQUVuQmxMLFFBQVEsQ0FBQ1ksS0FGVSxDQUF0QjtBQUdEO0FBQ0YsT0FwZk07QUFxZlBILGtCQUFZLEVBQUUsd0JBQVk7QUFDeEIsWUFBSThLLEtBQUssR0FBRyxJQUFaOztBQUNBLFlBQUl2TCxRQUFRLENBQUNRLElBQVQsSUFBaUJSLFFBQVEsQ0FBQ1MsWUFBOUIsRUFBNEM7QUFDMUN1QyxnQkFBTSxDQUFDckQsRUFBUCxDQUFVLFlBQVYsRUFBd0IsWUFBWTtBQUNsQ3ZDLGFBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTBCLFFBQVIsQ0FBaUIsVUFBakI7QUFDQW9ELGVBQUcsQ0FBQ3RCLEtBQUo7QUFDQVosb0JBQVEsQ0FBQ1EsSUFBVCxHQUFnQixJQUFoQjtBQUNELFdBSkQ7QUFLQXdDLGdCQUFNLENBQUNyRCxFQUFQLENBQVUsWUFBVixFQUF3QixZQUFZO0FBQ2xDdkMsYUFBQyxDQUFDLElBQUQsQ0FBRCxDQUFRMkMsV0FBUixDQUFvQixVQUFwQjs7QUFDQSxnQkFBSSxDQUFDaUQsTUFBTSxDQUFDMUYsSUFBUCxDQUFZLGNBQVosRUFBNEI2TyxRQUE1QixDQUFxQyxZQUFyQyxDQUFMLEVBQXlEO0FBQ3ZEWixtQkFBSyxDQUFDL0ssSUFBTjtBQUNEO0FBQ0YsV0FMRDtBQU1EO0FBQ0YsT0FwZ0JNO0FBcWdCUDBOLGVBQVMsRUFBRSxtQkFBVUMsU0FBVixFQUFxQkMsV0FBckIsRUFBa0M7QUFDM0NwTCxjQUFNLENBQUNqRSxHQUFQLENBQVcscUJBQVgsRUFBa0MsS0FBbEM7O0FBQ0EsWUFBSWlCLFFBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBdEIsRUFBK0I7QUFDN0IsY0FBSTRpQixRQUFRLEdBQUdGLFNBQVMsR0FBR0MsV0FBM0I7QUFDQSxjQUFJRSxRQUFRLEdBQUduTCxVQUFVLEdBQUdrTCxRQUE1Qjs7QUFDQSxjQUFLQyxRQUFELElBQWN4TCxDQUFDLEdBQUdDLE1BQUosR0FBYS9DLFFBQVEsQ0FBQ0csV0FBeEMsRUFBcUQ7QUFDbkQsZ0JBQUlILFFBQVEsQ0FBQzhCLFFBQVQsS0FBc0IsS0FBMUIsRUFBaUM7QUFDL0J3TSxzQkFBUSxHQUFHeEwsQ0FBQyxHQUFHQyxNQUFKLEdBQWEvQyxRQUFRLENBQUNHLFdBQWpDO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsa0JBQUlvTyxTQUFTLEdBQUd6TCxDQUFDLEdBQUdDLE1BQUosR0FBYS9DLFFBQVEsQ0FBQ0csV0FBdEM7QUFDQW1PLHNCQUFRLEdBQUdDLFNBQVMsR0FBSSxDQUFDRCxRQUFRLEdBQUdDLFNBQVosSUFBeUIsQ0FBakQ7QUFFRDtBQUNGLFdBUkQsTUFRTyxJQUFJRCxRQUFRLEdBQUcsQ0FBZixFQUFrQjtBQUN2QixnQkFBSXRPLFFBQVEsQ0FBQzhCLFFBQVQsS0FBc0IsS0FBMUIsRUFBaUM7QUFDL0J3TSxzQkFBUSxHQUFHLENBQVg7QUFDRCxhQUZELE1BRU87QUFDTEEsc0JBQVEsR0FBR0EsUUFBUSxHQUFHLENBQXRCO0FBQ0Q7QUFDRjs7QUFDRCxlQUFLckssSUFBTCxDQUFVL0IsR0FBVixFQUFlb00sUUFBZjtBQUNEO0FBQ0YsT0EzaEJNO0FBNmhCUEUsY0FBUSxFQUFFLGtCQUFVSCxRQUFWLEVBQW9CO0FBQzVCckwsY0FBTSxDQUFDakUsR0FBUCxDQUFXLHFCQUFYLEVBQWtDaUIsUUFBUSxDQUFDTyxLQUFULEdBQWlCLElBQW5EOztBQUNBLFlBQUlQLFFBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBdEIsRUFBK0I7QUFDN0IsY0FBSWdqQixLQUFLLEdBQUcsS0FBWjtBQUNBLGNBQUlDLEtBQUssR0FBRyxJQUFaO0FBQ0F2TCxvQkFBVSxHQUFHQSxVQUFVLEdBQUdrTCxRQUExQjs7QUFDQSxjQUFLbEwsVUFBRCxHQUFlTCxDQUFDLEdBQUdDLE1BQUosR0FBYS9DLFFBQVEsQ0FBQ0csV0FBekMsRUFBc0Q7QUFDcERnRCxzQkFBVSxHQUFHTCxDQUFDLEdBQUdDLE1BQUosR0FBYS9DLFFBQVEsQ0FBQ0csV0FBbkM7O0FBQ0EsZ0JBQUlILFFBQVEsQ0FBQ0MsU0FBVCxLQUF1QixLQUEzQixFQUFrQztBQUNoQ3dPLG1CQUFLLEdBQUcsSUFBUjtBQUNEO0FBQ0YsV0FMRCxNQUtPLElBQUl0TCxVQUFVLEdBQUcsQ0FBakIsRUFBb0I7QUFDekJBLHNCQUFVLEdBQUcsQ0FBYjtBQUNEOztBQUNELGNBQUl3TCxFQUFFLEdBQUcsU0FBTEEsRUFBSyxDQUFVM2YsSUFBVixFQUFnQjtBQUN2QixnQkFBSTRmLEVBQUUsR0FBRyxDQUFUOztBQUNBLGdCQUFJLENBQUNILEtBQUwsRUFBWTtBQUNWLGtCQUFJemYsSUFBSixFQUFVO0FBQ1I0ZixrQkFBRSxHQUFHLENBQUw7QUFDRDtBQUNGOztBQUNELGdCQUFJLENBQUM1TyxRQUFRLENBQUNDLFNBQWQsRUFBeUI7QUFDdkIsa0JBQUk0TyxHQUFHLEdBQUcxTCxVQUFVLElBQUksQ0FBQ0UsVUFBVSxHQUFHckQsUUFBUSxDQUFDRyxXQUF2QixJQUFzQ0gsUUFBUSxDQUFDRSxTQUFuRCxDQUFwQjtBQUNBbUMsbUJBQUssR0FBRzRDLFFBQVEsQ0FBQzRKLEdBQUQsQ0FBUixHQUFnQkQsRUFBeEI7O0FBQ0Esa0JBQUl6TCxVQUFVLElBQUtMLENBQUMsR0FBR0MsTUFBSixHQUFhL0MsUUFBUSxDQUFDRyxXQUF6QyxFQUF1RDtBQUNyRCxvQkFBSTBPLEdBQUcsR0FBRyxDQUFOLEtBQVksQ0FBaEIsRUFBbUI7QUFDakJ4TSx1QkFBSztBQUNOO0FBQ0Y7QUFDRixhQVJELE1BUU87QUFDTCxrQkFBSXlNLEVBQUUsR0FBRyxDQUFUOztBQUNBLG1CQUFLLElBQUk3VyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHbU0sU0FBUyxDQUFDN1UsTUFBOUIsRUFBc0MwSSxDQUFDLEVBQXZDLEVBQTJDO0FBQ3pDNlcsa0JBQUUsSUFBSzdKLFFBQVEsQ0FBQ2IsU0FBUyxDQUFDRSxFQUFWLENBQWFyTSxDQUFiLEVBQWdCaU4sS0FBaEIsRUFBRCxDQUFSLEdBQW9DbEYsUUFBUSxDQUFDRyxXQUFwRDtBQUNBa0MscUJBQUssR0FBR3BLLENBQUMsR0FBRzJXLEVBQVo7O0FBQ0Esb0JBQUlFLEVBQUUsSUFBSTNMLFVBQVYsRUFBc0I7QUFDcEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixXQXpCRDs7QUEwQkEsY0FBSWtMLFFBQVEsSUFBSXJPLFFBQVEsQ0FBQytCLGNBQXpCLEVBQXlDO0FBQ3ZDNE0sY0FBRSxDQUFDLEtBQUQsQ0FBRjtBQUNBRCxpQkFBSyxHQUFHLEtBQVI7QUFDRCxXQUhELE1BR08sSUFBSUwsUUFBUSxJQUFJLENBQUNyTyxRQUFRLENBQUMrQixjQUExQixFQUEwQztBQUMvQzRNLGNBQUUsQ0FBQyxJQUFELENBQUY7QUFDQUQsaUJBQUssR0FBRyxLQUFSO0FBQ0Q7O0FBQ0R4TSxhQUFHLENBQUN6VyxJQUFKLENBQVNpakIsS0FBVDtBQUNBLGVBQUs3QixVQUFMO0FBQ0QsU0EvQ0QsTUErQ087QUFDTCxjQUFJd0IsUUFBUSxJQUFJck8sUUFBUSxDQUFDK0IsY0FBekIsRUFBeUM7QUFDdkNHLGVBQUcsQ0FBQytJLGFBQUo7QUFDRCxXQUZELE1BRU8sSUFBSW9ELFFBQVEsSUFBSSxDQUFDck8sUUFBUSxDQUFDK0IsY0FBMUIsRUFBMEM7QUFDL0NHLGVBQUcsQ0FBQ2dKLGFBQUo7QUFDRDtBQUNGO0FBQ0YsT0FybEJNO0FBeWxCUHJKLGdCQUFVLEVBQUUsc0JBQVk7QUFDdEIsWUFBSTBKLEtBQUssR0FBRyxJQUFaOztBQUNBLFlBQUksQ0FBQ2hJLE9BQUwsRUFBYztBQUNaLGNBQUk2SyxXQUFXLEdBQUcsQ0FBbEI7QUFBQSxjQUNFRCxTQUFTLEdBQUcsQ0FEZDtBQUFBLGNBRUVZLFNBQVMsR0FBRyxLQUZkO0FBR0EvTCxnQkFBTSxDQUFDMUYsSUFBUCxDQUFZLGNBQVosRUFBNEJ3QixRQUE1QixDQUFxQyxRQUFyQztBQUNBa0UsZ0JBQU0sQ0FBQ3JELEVBQVAsQ0FBVSxXQUFWLEVBQXVCLFVBQVV4SyxDQUFWLEVBQWE7QUFDbEMsZ0JBQUkyTixDQUFDLEdBQUdDLE1BQVIsRUFBZ0I7QUFDZCxrQkFBSUQsQ0FBQyxLQUFLLENBQVYsRUFBYTtBQUNYLHVCQUFPLEtBQVA7QUFDRDtBQUNGOztBQUNELGdCQUFJMUYsQ0FBQyxDQUFDakksQ0FBQyxDQUFDekgsTUFBSCxDQUFELENBQVlpSSxJQUFaLENBQWlCLE9BQWpCLE1BQStCLFFBQS9CLElBQTRDeUgsQ0FBQyxDQUFDakksQ0FBQyxDQUFDekgsTUFBSCxDQUFELENBQVlpSSxJQUFaLENBQWlCLE9BQWpCLE1BQStCLFFBQS9FLEVBQTBGO0FBQ3hGeVkseUJBQVcsR0FBSXBPLFFBQVEsQ0FBQ21CLFFBQVQsS0FBc0IsSUFBdkIsR0FBK0JoTSxDQUFDLENBQUM2WixLQUFqQyxHQUF5QzdaLENBQUMsQ0FBQzhaLEtBQXpEO0FBQ0FGLHVCQUFTLEdBQUcsSUFBWjs7QUFDQSxrQkFBSTVaLENBQUMsQ0FBQ3hHLGNBQU4sRUFBc0I7QUFDcEJ3RyxpQkFBQyxDQUFDeEcsY0FBRjtBQUNELGVBRkQsTUFFTztBQUNMd0csaUJBQUMsQ0FBQzZWLFdBQUYsR0FBZ0IsS0FBaEI7QUFDRCxlQVB1RixDQVF4Rjs7O0FBQ0FoSSxvQkFBTSxDQUFDa00sVUFBUCxJQUFxQixDQUFyQjtBQUNBbE0sb0JBQU0sQ0FBQ2tNLFVBQVAsSUFBcUIsQ0FBckIsQ0FWd0YsQ0FXeEY7O0FBQ0FsTSxvQkFBTSxDQUFDMUYsSUFBUCxDQUFZLGNBQVosRUFBNEJ5QyxXQUE1QixDQUF3QyxRQUF4QyxFQUFrRGpCLFFBQWxELENBQTJELFlBQTNEO0FBQ0FrUCwyQkFBYSxDQUFDbFIsUUFBRCxDQUFiO0FBQ0Q7QUFDRixXQXJCRDtBQXNCQU0sV0FBQyxDQUFDM0QsTUFBRCxDQUFELENBQVVrRyxFQUFWLENBQWEsV0FBYixFQUEwQixVQUFVeEssQ0FBVixFQUFhO0FBQ3JDLGdCQUFJNFosU0FBSixFQUFlO0FBQ2JaLHVCQUFTLEdBQUluTyxRQUFRLENBQUNtQixRQUFULEtBQXNCLElBQXZCLEdBQStCaE0sQ0FBQyxDQUFDNlosS0FBakMsR0FBeUM3WixDQUFDLENBQUM4WixLQUF2RDtBQUNBMUQsbUJBQUssQ0FBQzJDLFNBQU4sQ0FBZ0JDLFNBQWhCLEVBQTJCQyxXQUEzQjtBQUNEO0FBQ0YsV0FMRDtBQU1BaFIsV0FBQyxDQUFDM0QsTUFBRCxDQUFELENBQVVrRyxFQUFWLENBQWEsU0FBYixFQUF3QixVQUFVeEssQ0FBVixFQUFhO0FBQ25DLGdCQUFJNFosU0FBSixFQUFlO0FBQ2IvTCxvQkFBTSxDQUFDMUYsSUFBUCxDQUFZLGNBQVosRUFBNEJ5QyxXQUE1QixDQUF3QyxZQUF4QyxFQUFzRGpCLFFBQXRELENBQStELFFBQS9EO0FBQ0FpUSx1QkFBUyxHQUFHLEtBQVo7QUFDQVosdUJBQVMsR0FBSW5PLFFBQVEsQ0FBQ21CLFFBQVQsS0FBc0IsSUFBdkIsR0FBK0JoTSxDQUFDLENBQUM2WixLQUFqQyxHQUF5QzdaLENBQUMsQ0FBQzhaLEtBQXZEO0FBQ0Esa0JBQUlaLFFBQVEsR0FBR0YsU0FBUyxHQUFHQyxXQUEzQjs7QUFDQSxrQkFBSTFQLElBQUksQ0FBQ3lRLEdBQUwsQ0FBU2QsUUFBVCxLQUFzQnJPLFFBQVEsQ0FBQytCLGNBQW5DLEVBQW1EO0FBQ2pEM0UsaUJBQUMsQ0FBQzNELE1BQUQsQ0FBRCxDQUFVa0csRUFBVixDQUFhLFVBQWIsRUFBeUIsVUFBVXhLLENBQVYsRUFBYTtBQUNwQyxzQkFBSUEsQ0FBQyxDQUFDeEcsY0FBTixFQUFzQjtBQUNwQndHLHFCQUFDLENBQUN4RyxjQUFGO0FBQ0QsbUJBRkQsTUFFTztBQUNMd0cscUJBQUMsQ0FBQzZWLFdBQUYsR0FBZ0IsS0FBaEI7QUFDRDs7QUFDRDdWLG1CQUFDLENBQUNpYSx3QkFBRjtBQUNBamEsbUJBQUMsQ0FBQytDLGVBQUY7QUFDQWtGLG1CQUFDLENBQUMzRCxNQUFELENBQUQsQ0FBVTRWLEdBQVYsQ0FBYyxVQUFkO0FBQ0QsaUJBVEQ7QUFVRDs7QUFFRDlELG1CQUFLLENBQUNpRCxRQUFOLENBQWVILFFBQWY7QUFFRDtBQUNGLFdBdEJEO0FBdUJEO0FBQ0YsT0FwcEJNO0FBeXBCUHpNLGlCQUFXLEVBQUUsdUJBQVk7QUFDdkIsWUFBSTJKLEtBQUssR0FBRyxJQUFaOztBQUNBLFlBQUloSSxPQUFKLEVBQWE7QUFDWCxjQUFJNkssV0FBVyxHQUFHLEVBQWxCO0FBQUEsY0FDRUQsU0FBUyxHQUFHLEVBRGQ7QUFFQW5MLGdCQUFNLENBQUNyRCxFQUFQLENBQVUsWUFBVixFQUF3QixVQUFVeEssQ0FBVixFQUFhO0FBQ25DZ1oscUJBQVMsR0FBR2haLENBQUMsQ0FBQzBELGFBQUYsQ0FBZ0J5VyxhQUFoQixDQUE4QixDQUE5QixDQUFaO0FBQ0FsQix1QkFBVyxDQUFDYSxLQUFaLEdBQW9COVosQ0FBQyxDQUFDMEQsYUFBRixDQUFnQnlXLGFBQWhCLENBQThCLENBQTlCLEVBQWlDTCxLQUFyRDtBQUNBYix1QkFBVyxDQUFDWSxLQUFaLEdBQW9CN1osQ0FBQyxDQUFDMEQsYUFBRixDQUFnQnlXLGFBQWhCLENBQThCLENBQTlCLEVBQWlDTixLQUFyRDtBQUNBaEIseUJBQWEsQ0FBQ2xSLFFBQUQsQ0FBYjtBQUNELFdBTEQ7QUFNQWtHLGdCQUFNLENBQUNyRCxFQUFQLENBQVUsV0FBVixFQUF1QixVQUFVeEssQ0FBVixFQUFhO0FBQ2xDLGdCQUFJMk4sQ0FBQyxHQUFHQyxNQUFSLEVBQWdCO0FBQ2Qsa0JBQUlELENBQUMsS0FBSyxDQUFWLEVBQWE7QUFDWCx1QkFBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFDRCxnQkFBSXlNLElBQUksR0FBR3BhLENBQUMsQ0FBQzBELGFBQWI7QUFDQXNWLHFCQUFTLEdBQUdvQixJQUFJLENBQUNELGFBQUwsQ0FBbUIsQ0FBbkIsQ0FBWjtBQUNBLGdCQUFJRSxTQUFTLEdBQUc5USxJQUFJLENBQUN5USxHQUFMLENBQVNoQixTQUFTLENBQUNjLEtBQVYsR0FBa0JiLFdBQVcsQ0FBQ2EsS0FBdkMsQ0FBaEI7QUFDQSxnQkFBSVEsU0FBUyxHQUFHL1EsSUFBSSxDQUFDeVEsR0FBTCxDQUFTaEIsU0FBUyxDQUFDYSxLQUFWLEdBQWtCWixXQUFXLENBQUNZLEtBQXZDLENBQWhCOztBQUNBLGdCQUFJaFAsUUFBUSxDQUFDbUIsUUFBVCxLQUFzQixJQUExQixFQUFnQztBQUM5QixrQkFBS3NPLFNBQVMsR0FBRyxDQUFiLEdBQWtCRCxTQUF0QixFQUFpQztBQUMvQnJhLGlCQUFDLENBQUN4RyxjQUFGO0FBQ0Q7O0FBQ0Q0YyxtQkFBSyxDQUFDMkMsU0FBTixDQUFnQkMsU0FBUyxDQUFDYSxLQUExQixFQUFpQ1osV0FBVyxDQUFDWSxLQUE3QztBQUNELGFBTEQsTUFLTztBQUNMLGtCQUFLUSxTQUFTLEdBQUcsQ0FBYixHQUFrQkMsU0FBdEIsRUFBaUM7QUFDL0J0YSxpQkFBQyxDQUFDeEcsY0FBRjtBQUNEOztBQUNENGMsbUJBQUssQ0FBQzJDLFNBQU4sQ0FBZ0JDLFNBQVMsQ0FBQ2MsS0FBMUIsRUFBaUNiLFdBQVcsQ0FBQ2EsS0FBN0M7QUFDRDtBQUVGLFdBdEJEO0FBdUJBak0sZ0JBQU0sQ0FBQ3JELEVBQVAsQ0FBVSxVQUFWLEVBQXNCLFlBQVk7QUFDaEMsZ0JBQUltRCxDQUFDLEdBQUdDLE1BQVIsRUFBZ0I7QUFDZCxrQkFBSUQsQ0FBQyxLQUFLLENBQVYsRUFBYTtBQUNYLHVCQUFPLEtBQVA7QUFDRDtBQUNGOztBQUNELGdCQUFJdUwsUUFBSjs7QUFDQSxnQkFBSXJPLFFBQVEsQ0FBQ21CLFFBQVQsS0FBc0IsSUFBMUIsRUFBZ0M7QUFDOUJrTixzQkFBUSxHQUFHRixTQUFTLENBQUNhLEtBQVYsR0FBa0JaLFdBQVcsQ0FBQ1ksS0FBekM7QUFDRCxhQUZELE1BRU87QUFDTFgsc0JBQVEsR0FBR0YsU0FBUyxDQUFDYyxLQUFWLEdBQWtCYixXQUFXLENBQUNhLEtBQXpDO0FBQ0Q7O0FBQ0QxRCxpQkFBSyxDQUFDaUQsUUFBTixDQUFlSCxRQUFmO0FBQ0QsV0FiRDtBQWNEO0FBQ0YsT0Exc0JNO0FBMnNCUHFCLFdBQUssRUFBRSxpQkFBWTtBQUNqQixZQUFJbkUsS0FBSyxHQUFHLElBQVo7QUFDQUEsYUFBSyxDQUFDRCxZQUFOOztBQUNBLFlBQUksS0FBS25ILEtBQUwsRUFBSixFQUFrQjtBQUVoQixjQUFJbkUsUUFBUSxDQUFDNEIsV0FBVCxLQUF5QixJQUE3QixFQUFtQztBQUNqQzJKLGlCQUFLLENBQUMzSixXQUFOO0FBQ0Q7O0FBQ0QsY0FBSTVCLFFBQVEsQ0FBQzZCLFVBQVQsS0FBd0IsSUFBNUIsRUFBa0M7QUFDaEMwSixpQkFBSyxDQUFDMUosVUFBTjtBQUNEO0FBQ0Y7O0FBRUR6RSxTQUFDLENBQUMzRCxNQUFELENBQUQsQ0FBVWtHLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFlBQVk7QUFDaEM0TCxlQUFLLENBQUMvSyxJQUFOO0FBQ0QsU0FGRDtBQUlBcEQsU0FBQyxDQUFDM0QsTUFBRCxDQUFELENBQVVrRyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFZO0FBQy9CcU8sdUJBQWEsQ0FBQ2xSLFFBQUQsQ0FBYjtBQUNELFNBRkQ7QUFJQXlPLGFBQUssQ0FBQ2hLLEtBQU47QUFDQWdLLGFBQUssQ0FBQzlLLFlBQU47QUFDQThLLGFBQUssQ0FBQ3pLLFFBQU47QUFDQXlLLGFBQUssQ0FBQzFLLFFBQU47QUFDRDtBQXB1Qk0sS0FBVDtBQXN1QkFnSyxVQUFNLENBQUM2RSxLQUFQOztBQUNBM0UsV0FBTyxDQUFDaUMsSUFBUixHQUFlLFlBQVk7QUFDekJqQyxhQUFPLENBQUNVLFlBQVI7O0FBQ0EsVUFBSXpMLFFBQVEsQ0FBQ21CLFFBQVQsS0FBc0IsSUFBMUIsRUFBZ0M7QUFDOUIsWUFBSW5CLFFBQVEsQ0FBQ2hJLElBQVQsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIrSyxnQkFBTSxHQUFHL0MsUUFBUSxDQUFDb0IsY0FBbEI7QUFDRCxTQUZELE1BRU87QUFDTDJCLGdCQUFNLEdBQUdxQixTQUFTLENBQUNnSixXQUFWLEVBQVQ7QUFDRDs7QUFDRHBLLGNBQU0sQ0FBQ2pFLEdBQVAsQ0FBVyxRQUFYLEVBQXFCZ0UsTUFBTSxHQUFHLElBQTlCO0FBQ0QsT0FQRCxNQU9PO0FBQ0xBLGNBQU0sR0FBR0MsTUFBTSxDQUFDTCxVQUFQLEVBQVQ7QUFDRDs7QUFDRCxVQUFJM0MsUUFBUSxDQUFDVSxJQUFULEtBQWtCLElBQWxCLElBQTBCVixRQUFRLENBQUN2VSxJQUFULEtBQWtCLE9BQWhELEVBQXlEO0FBQ3ZEc2YsZUFBTyxDQUFDbE0sS0FBUjtBQUNEOztBQUNEa00sYUFBTyxDQUFDc0IsSUFBUjs7QUFDQSxVQUFJck0sUUFBUSxDQUFDdlUsSUFBVCxLQUFrQixPQUF0QixFQUErQjtBQUM3QnlXLFdBQUcsQ0FBQ25DLFdBQUosQ0FBZ0IsU0FBaEI7QUFDRDs7QUFDRCxVQUFJQyxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE9BQXRCLEVBQStCO0FBQzdCc2YsZUFBTyxDQUFDWSxLQUFSO0FBQ0FaLGVBQU8sQ0FBQ3FCLEdBQVI7QUFDRDs7QUFDRHZNLGdCQUFVLENBQUMsWUFBWTtBQUNyQixZQUFJRyxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE9BQXRCLEVBQStCO0FBQzdCeVcsYUFBRyxDQUFDcEQsUUFBSixDQUFhLFNBQWI7QUFDRDtBQUNGLE9BSlMsRUFJUCxJQUpPLENBQVY7O0FBS0EsVUFBSWtCLFFBQVEsQ0FBQ3VCLEtBQWIsRUFBb0I7QUFDbEJ3SixlQUFPLENBQUN1QixXQUFSO0FBQ0Q7O0FBQ0QsVUFBSXRNLFFBQVEsQ0FBQ2tCLGNBQVQsS0FBNEIsSUFBNUIsSUFBb0NsQixRQUFRLENBQUNtQixRQUFULEtBQXNCLEtBQTlELEVBQXFFO0FBQ25FZSxXQUFHLENBQUNuRCxHQUFKLENBQVEsUUFBUixFQUFrQnFGLFNBQVMsQ0FBQ0UsRUFBVixDQUFhakMsS0FBYixFQUFvQitLLFdBQXBCLENBQWdDLElBQWhDLENBQWxCO0FBQ0Q7O0FBQ0QsVUFBSXBOLFFBQVEsQ0FBQ2tCLGNBQVQsS0FBNEIsS0FBaEMsRUFBdUM7QUFDckMsWUFBSWxCLFFBQVEsQ0FBQ3ZVLElBQVQsS0FBa0IsT0FBdEIsRUFBK0I7QUFDN0IsY0FBSXVVLFFBQVEsQ0FBQ21CLFFBQVQsS0FBc0IsS0FBMUIsRUFBaUM7QUFDL0IwSixrQkFBTSxDQUFDM0csU0FBUCxDQUFpQmhDLEdBQWpCLEVBQXNCLEtBQXRCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wySSxrQkFBTSxDQUFDckssSUFBUDtBQUNEO0FBQ0YsU0FORCxNQU1PO0FBQ0xxSyxnQkFBTSxDQUFDM0csU0FBUCxDQUFpQmhDLEdBQWpCLEVBQXNCLElBQXRCO0FBQ0Q7QUFDRjs7QUFDRCxVQUFJbEMsUUFBUSxDQUFDd0IsT0FBVCxLQUFxQixJQUF6QixFQUErQjtBQUM3QnFKLGNBQU0sQ0FBQ2dDLFVBQVA7QUFDRDs7QUFDRCxVQUFJN00sUUFBUSxDQUFDdlUsSUFBVCxLQUFrQixPQUF0QixFQUErQjtBQUM3Qm9mLGNBQU0sQ0FBQzhDLEtBQVA7QUFDRDs7QUFDRCxVQUFJM04sUUFBUSxDQUFDQyxTQUFULEtBQXVCLEtBQTNCLEVBQWtDO0FBQ2hDLFlBQUltRSxTQUFTLENBQUM3VSxNQUFWLElBQW9CeVEsUUFBUSxDQUFDaEksSUFBakMsRUFBdUM7QUFDckNnTCxnQkFBTSxDQUFDMUYsSUFBUCxDQUFZLFdBQVosRUFBeUI4TixJQUF6QjtBQUNELFNBRkQsTUFFTztBQUNMcEksZ0JBQU0sQ0FBQzFGLElBQVAsQ0FBWSxXQUFaLEVBQXlCcVMsSUFBekI7QUFDRDtBQUNGLE9BTkQsTUFNTztBQUNMLFlBQUs1RSxPQUFPLENBQUNNLFFBQVIsQ0FBaUIsS0FBakIsSUFBMEJ0SSxNQUEzQixJQUF1Q0QsQ0FBQyxLQUFLLENBQWpELEVBQXFEO0FBQ25ERSxnQkFBTSxDQUFDMUYsSUFBUCxDQUFZLFdBQVosRUFBeUI4TixJQUF6QjtBQUNELFNBRkQsTUFFTztBQUNMcEksZ0JBQU0sQ0FBQzFGLElBQVAsQ0FBWSxXQUFaLEVBQXlCcVMsSUFBekI7QUFDRDtBQUNGO0FBQ0YsS0FoRUQ7O0FBaUVBek4sT0FBRyxDQUFDK0ksYUFBSixHQUFvQixZQUFZO0FBQzlCLFVBQUk1SSxLQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ2JyQyxnQkFBUSxDQUFDd0MsaUJBQVQsQ0FBMkJnSixJQUEzQixDQUFnQyxJQUFoQyxFQUFzQ3RKLEdBQXRDLEVBQTJDRyxLQUEzQztBQUNBQSxhQUFLO0FBQ0xILFdBQUcsQ0FBQ3pXLElBQUosQ0FBUyxLQUFUOztBQUNBLFlBQUl1VSxRQUFRLENBQUN3QixPQUFULEtBQXFCLElBQXpCLEVBQStCO0FBQzdCcUosZ0JBQU0sQ0FBQ2dDLFVBQVA7QUFDRDtBQUNGLE9BUEQsTUFPTztBQUNMLFlBQUk3TSxRQUFRLENBQUNVLElBQVQsS0FBa0IsSUFBdEIsRUFBNEI7QUFDMUJWLGtCQUFRLENBQUN3QyxpQkFBVCxDQUEyQmdKLElBQTNCLENBQWdDLElBQWhDLEVBQXNDdEosR0FBdEMsRUFBMkNHLEtBQTNDOztBQUNBLGNBQUlyQyxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE1BQXRCLEVBQThCO0FBQzVCLGdCQUFJZ2lCLENBQUMsR0FBSWxlLE1BQU0sR0FBRyxDQUFsQjtBQUNBOFMsaUJBQUssR0FBRzRDLFFBQVEsQ0FBQ3dJLENBQUMsR0FBR3pOLFFBQVEsQ0FBQ0UsU0FBZCxDQUFoQjtBQUNEOztBQUNEZ0MsYUFBRyxDQUFDelcsSUFBSixDQUFTLEtBQVQ7O0FBQ0EsY0FBSXVVLFFBQVEsQ0FBQ3dCLE9BQVQsS0FBcUIsSUFBekIsRUFBK0I7QUFDN0JxSixrQkFBTSxDQUFDZ0MsVUFBUDtBQUNEO0FBQ0YsU0FWRCxNQVVPLElBQUk3TSxRQUFRLENBQUNXLGlCQUFULEtBQStCLElBQW5DLEVBQXlDO0FBQzlDdUIsYUFBRyxDQUFDcEQsUUFBSixDQUFhLFNBQWI7QUFDQWUsb0JBQVUsQ0FBQyxZQUFZO0FBQ3JCcUMsZUFBRyxDQUFDbkMsV0FBSixDQUFnQixTQUFoQjtBQUNELFdBRlMsRUFFUCxHQUZPLENBQVY7QUFHRDtBQUNGO0FBQ0YsS0ExQkQ7O0FBMkJBbUMsT0FBRyxDQUFDZ0osYUFBSixHQUFvQixZQUFZO0FBQzlCLFVBQUkwRSxLQUFLLEdBQUcsSUFBWjs7QUFDQSxVQUFJNVAsUUFBUSxDQUFDdlUsSUFBVCxLQUFrQixPQUF0QixFQUErQjtBQUM3QixZQUFJdVksV0FBVyxHQUFHNkcsTUFBTSxDQUFDMUgsVUFBUCxFQUFsQjs7QUFDQXlNLGFBQUssR0FBRzVMLFdBQVcsR0FBR2xCLENBQUMsR0FBR0MsTUFBSixHQUFhL0MsUUFBUSxDQUFDRyxXQUE1QztBQUNEOztBQUNELFVBQU1rQyxLQUFLLEdBQUdyQyxRQUFRLENBQUNFLFNBQWxCLEdBQStCM1EsTUFBTSxHQUFHeVEsUUFBUSxDQUFDRSxTQUFsRCxJQUFnRTBQLEtBQXBFLEVBQTJFO0FBQ3pFNVAsZ0JBQVEsQ0FBQ3VDLGlCQUFULENBQTJCaUosSUFBM0IsQ0FBZ0MsSUFBaEMsRUFBc0N0SixHQUF0QyxFQUEyQ0csS0FBM0M7QUFDQUEsYUFBSztBQUNMSCxXQUFHLENBQUN6VyxJQUFKLENBQVMsS0FBVDs7QUFDQSxZQUFJdVUsUUFBUSxDQUFDd0IsT0FBVCxLQUFxQixJQUF6QixFQUErQjtBQUM3QnFKLGdCQUFNLENBQUNnQyxVQUFQO0FBQ0Q7QUFDRixPQVBELE1BT087QUFDTCxZQUFJN00sUUFBUSxDQUFDVSxJQUFULEtBQWtCLElBQXRCLEVBQTRCO0FBQzFCVixrQkFBUSxDQUFDdUMsaUJBQVQsQ0FBMkJpSixJQUEzQixDQUFnQyxJQUFoQyxFQUFzQ3RKLEdBQXRDLEVBQTJDRyxLQUEzQztBQUNBQSxlQUFLLEdBQUcsQ0FBUjtBQUNBSCxhQUFHLENBQUN6VyxJQUFKLENBQVMsS0FBVDs7QUFDQSxjQUFJdVUsUUFBUSxDQUFDd0IsT0FBVCxLQUFxQixJQUF6QixFQUErQjtBQUM3QnFKLGtCQUFNLENBQUNnQyxVQUFQO0FBQ0Q7QUFDRixTQVBELE1BT08sSUFBSTdNLFFBQVEsQ0FBQ1csaUJBQVQsS0FBK0IsSUFBbkMsRUFBeUM7QUFDOUN1QixhQUFHLENBQUNwRCxRQUFKLENBQWEsVUFBYjtBQUNBZSxvQkFBVSxDQUFDLFlBQVk7QUFDckJxQyxlQUFHLENBQUNuQyxXQUFKLENBQWdCLFVBQWhCO0FBQ0QsV0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUdEO0FBQ0Y7QUFDRixLQTVCRDs7QUE2QkFtQyxPQUFHLENBQUN6VyxJQUFKLEdBQVcsVUFBVW9rQixNQUFWLEVBQWtCO0FBQzNCLFVBQUk3UCxRQUFRLENBQUNrQixjQUFULEtBQTRCLElBQTVCLElBQW9DbEIsUUFBUSxDQUFDbUIsUUFBVCxLQUFzQixLQUE5RCxFQUFxRTtBQUNuRWUsV0FBRyxDQUFDbkQsR0FBSixDQUFRLFFBQVIsRUFBa0JxRixTQUFTLENBQUNFLEVBQVYsQ0FBYWpDLEtBQWIsRUFBb0IrSyxXQUFwQixDQUFnQyxJQUFoQyxDQUFsQjtBQUNEOztBQUNELFVBQUl6TixFQUFFLEtBQUssS0FBWCxFQUFrQjtBQUNoQixZQUFJSyxRQUFRLENBQUN2VSxJQUFULEtBQWtCLE9BQXRCLEVBQStCO0FBQzdCLGNBQUlvZixNQUFNLENBQUMxRyxLQUFQLEVBQUosRUFBb0I7QUFDbEJqQyxlQUFHLENBQUNwRCxRQUFKLENBQWEsU0FBYjs7QUFDQSxnQkFBSWtCLFFBQVEsQ0FBQ08sS0FBVCxLQUFtQixFQUF2QixFQUEyQjtBQUN6QnlDLG9CQUFNLENBQUNqRSxHQUFQLENBQVcscUJBQVgsRUFBa0NpQixRQUFRLENBQUNPLEtBQVQsR0FBaUIsSUFBbkQ7QUFDRDs7QUFDRCxnQkFBSVAsUUFBUSxDQUFDSyxTQUFULEtBQXVCLEVBQTNCLEVBQStCO0FBQzdCMkMsb0JBQU0sQ0FBQ2pFLEdBQVAsQ0FBVyw0QkFBWCxFQUF5Q2lCLFFBQVEsQ0FBQ0ssU0FBbEQ7QUFDRDtBQUNGO0FBQ0YsU0FWRCxNQVVPO0FBQ0wsY0FBSXdLLE1BQU0sQ0FBQzFHLEtBQVAsRUFBSixFQUFvQjtBQUNsQixnQkFBSW5FLFFBQVEsQ0FBQ08sS0FBVCxLQUFtQixFQUF2QixFQUEyQjtBQUN6QjJCLGlCQUFHLENBQUNuRCxHQUFKLENBQVEscUJBQVIsRUFBK0JpQixRQUFRLENBQUNPLEtBQVQsR0FBaUIsSUFBaEQ7QUFDRDs7QUFDRCxnQkFBSVAsUUFBUSxDQUFDSyxTQUFULEtBQXVCLEVBQTNCLEVBQStCO0FBQzdCNkIsaUJBQUcsQ0FBQ25ELEdBQUosQ0FBUSw0QkFBUixFQUFzQ2lCLFFBQVEsQ0FBQ0ssU0FBL0M7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFDRCxVQUFJLENBQUN3UCxNQUFMLEVBQWE7QUFDWDdQLGdCQUFRLENBQUNvQyxhQUFULENBQXVCb0osSUFBdkIsQ0FBNEIsSUFBNUIsRUFBa0N0SixHQUFsQyxFQUF1Q0csS0FBdkM7QUFDRDs7QUFDRCxVQUFJckMsUUFBUSxDQUFDdlUsSUFBVCxLQUFrQixPQUF0QixFQUErQjtBQUM3Qm9mLGNBQU0sQ0FBQzhDLEtBQVA7QUFDRCxPQUZELE1BRU87QUFDTDlDLGNBQU0sQ0FBQ29DLElBQVA7QUFDRDs7QUFDRCxVQUFJLENBQUNqSyxNQUFNLENBQUNtSixRQUFQLENBQWdCLFVBQWhCLENBQUwsRUFBa0M7QUFDaEN0QixjQUFNLENBQUNySyxJQUFQO0FBQ0Q7O0FBQ0RYLGdCQUFVLENBQUMsWUFBWTtBQUNyQixZQUFJLENBQUNnUSxNQUFMLEVBQWE7QUFDWDdQLGtCQUFRLENBQUNzQyxZQUFULENBQXNCa0osSUFBdEIsQ0FBMkIsSUFBM0IsRUFBaUN0SixHQUFqQyxFQUFzQ0csS0FBdEM7QUFDRDtBQUNGLE9BSlMsRUFJUHJDLFFBQVEsQ0FBQ08sS0FKRixDQUFWO0FBS0FaLFFBQUUsR0FBRyxJQUFMO0FBQ0QsS0EzQ0Q7O0FBNENBdUMsT0FBRyxDQUFDNE4sSUFBSixHQUFXLFlBQVk7QUFDckI1TixTQUFHLENBQUNnSixhQUFKO0FBQ0FsTCxjQUFRLENBQUNRLElBQVQsR0FBZ0IsSUFBaEI7QUFDQXFLLFlBQU0sQ0FBQ3JLLElBQVA7QUFDRCxLQUpEOztBQUtBMEIsT0FBRyxDQUFDdEIsS0FBSixHQUFZLFlBQVk7QUFDdEJaLGNBQVEsQ0FBQ1EsSUFBVCxHQUFnQixLQUFoQjtBQUNBd04sbUJBQWEsQ0FBQ2xSLFFBQUQsQ0FBYjtBQUNELEtBSEQ7O0FBSUFvRixPQUFHLENBQUM2SSxPQUFKLEdBQWMsWUFBWTtBQUN4QkEsYUFBTyxDQUFDaUMsSUFBUjtBQUNELEtBRkQ7O0FBR0E5SyxPQUFHLENBQUM2TixvQkFBSixHQUEyQixZQUFZO0FBQ3JDLFVBQUl2QyxFQUFFLEdBQUduTCxLQUFUOztBQUNBLFVBQUlyQyxRQUFRLENBQUNVLElBQWIsRUFBbUI7QUFDakIsWUFBSThFLEVBQUUsR0FBR3hDLE1BQU0sQ0FBQzFGLElBQVAsQ0FBWSxTQUFaLEVBQXVCL04sTUFBaEM7QUFBQSxZQUNFdWQsRUFBRSxHQUFHNUssR0FBRyxDQUFDNUUsSUFBSixDQUFTLGFBQVQsRUFBd0IvTixNQUQvQjs7QUFFQSxZQUFJOFMsS0FBSyxJQUFJeUssRUFBRSxHQUFHLENBQWxCLEVBQXFCO0FBQ25CVSxZQUFFLEdBQUdoSSxFQUFFLElBQUluRCxLQUFLLEdBQUd5SyxFQUFaLENBQVA7QUFDRCxTQUZELE1BRU8sSUFBSXpLLEtBQUssSUFBS21ELEVBQUUsR0FBR3NILEVBQW5CLEVBQXdCO0FBQzdCVSxZQUFFLEdBQUduTCxLQUFLLEdBQUdtRCxFQUFSLEdBQWFzSCxFQUFsQjtBQUNELFNBRk0sTUFFQTtBQUNMVSxZQUFFLEdBQUduTCxLQUFLLEdBQUd5SyxFQUFiO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPVSxFQUFFLEdBQUcsQ0FBWjtBQUNELEtBZEQ7O0FBZUF0TCxPQUFHLENBQUM4TixrQkFBSixHQUF5QixZQUFZO0FBQ25DLGFBQU9oTixNQUFNLENBQUMxRixJQUFQLENBQVksU0FBWixFQUF1Qi9OLE1BQTlCO0FBQ0QsS0FGRDs7QUFHQTJTLE9BQUcsQ0FBQytOLFNBQUosR0FBZ0IsVUFBVW5DLENBQVYsRUFBYTtBQUMzQixVQUFJOU4sUUFBUSxDQUFDVSxJQUFiLEVBQW1CO0FBQ2pCMkIsYUFBSyxHQUFJeUwsQ0FBQyxHQUFHNUwsR0FBRyxDQUFDNUUsSUFBSixDQUFTLGFBQVQsRUFBd0IvTixNQUE1QixHQUFxQyxDQUE5QztBQUNELE9BRkQsTUFFTztBQUNMOFMsYUFBSyxHQUFHeUwsQ0FBUjtBQUNEOztBQUNENUwsU0FBRyxDQUFDelcsSUFBSixDQUFTLEtBQVQ7O0FBQ0EsVUFBSXVVLFFBQVEsQ0FBQ3dCLE9BQVQsS0FBcUIsSUFBekIsRUFBK0I7QUFDN0JxSixjQUFNLENBQUNnQyxVQUFQO0FBQ0Q7QUFDRixLQVZEOztBQVdBM0ssT0FBRyxDQUFDZ08sT0FBSixHQUFjLFlBQVk7QUFDeEIsVUFBSWhPLEdBQUcsQ0FBQzBCLFdBQVIsRUFBcUI7QUFDbkIxQixXQUFHLENBQUMrSSxhQUFKLEdBQW9CLFlBQVksQ0FBRyxDQUFuQzs7QUFDQS9JLFdBQUcsQ0FBQ2dKLGFBQUosR0FBb0IsWUFBWSxDQUFHLENBQW5DOztBQUNBaEosV0FBRyxDQUFDelcsSUFBSixHQUFXLFlBQVksQ0FBRyxDQUExQjs7QUFDQXlXLFdBQUcsQ0FBQzROLElBQUosR0FBVyxZQUFZLENBQUcsQ0FBMUI7O0FBQ0E1TixXQUFHLENBQUN0QixLQUFKLEdBQVksWUFBWSxDQUFHLENBQTNCOztBQUNBc0IsV0FBRyxDQUFDNkksT0FBSixHQUFjLFlBQVksQ0FBRyxDQUE3Qjs7QUFDQTdJLFdBQUcsQ0FBQzZOLG9CQUFKLEdBQTJCLFlBQVksQ0FBRyxDQUExQzs7QUFDQTdOLFdBQUcsQ0FBQzhOLGtCQUFKLEdBQXlCLFlBQVksQ0FBRyxDQUF4Qzs7QUFDQTlOLFdBQUcsQ0FBQytOLFNBQUosR0FBZ0IsWUFBWSxDQUFHLENBQS9COztBQUNBL04sV0FBRyxDQUFDMEIsV0FBSixHQUFrQixJQUFsQjtBQUNBbUgsZUFBTyxHQUFHO0FBQ1JpQyxjQUFJLEVBQUUsZ0JBQVksQ0FBRztBQURiLFNBQVY7QUFHQTlLLFdBQUcsQ0FBQzRDLE1BQUosR0FBYUEsTUFBYixHQUFzQnhILElBQXRCLENBQTJCLHFCQUEzQixFQUFrRDFNLE1BQWxEO0FBQ0FzUixXQUFHLENBQUNuQyxXQUFKLENBQWdCLDREQUFoQixFQUE4RW9RLFVBQTlFLENBQXlGLE9BQXpGLEVBQWtHQyxNQUFsRyxHQUEyR0EsTUFBM0c7QUFDQWxPLFdBQUcsQ0FBQ25TLFFBQUosR0FBZW9nQixVQUFmLENBQTBCLE9BQTFCO0FBQ0EvTCxpQkFBUyxDQUFDckUsV0FBVixDQUFzQixlQUF0QjtBQUNBbUMsV0FBRyxDQUFDNUUsSUFBSixDQUFTLFFBQVQsRUFBbUIxTSxNQUFuQjtBQUNBd1QsaUJBQVMsR0FBRyxJQUFaO0FBQ0F0SCxnQkFBUSxHQUFHLElBQVg7QUFDQTZDLFVBQUUsR0FBRyxLQUFMO0FBQ0EwQyxhQUFLLEdBQUcsQ0FBUjtBQUNEO0FBRUYsS0ExQkQ7O0FBMkJBeEMsY0FBVSxDQUFDLFlBQVk7QUFDckJHLGNBQVEsQ0FBQ21DLFlBQVQsQ0FBc0JxSixJQUF0QixDQUEyQixJQUEzQixFQUFpQ3RKLEdBQWpDO0FBQ0QsS0FGUyxFQUVQLEVBRk8sQ0FBVjtBQUdBOUUsS0FBQyxDQUFDM0QsTUFBRCxDQUFELENBQVVrRyxFQUFWLENBQWEsMEJBQWIsRUFBeUMsVUFBVXhLLENBQVYsRUFBYTtBQUNwRDBLLGdCQUFVLENBQUMsWUFBWTtBQUNyQixZQUFJMUssQ0FBQyxDQUFDeEcsY0FBTixFQUFzQjtBQUNwQndHLFdBQUMsQ0FBQ3hHLGNBQUY7QUFDRCxTQUZELE1BRU87QUFDTHdHLFdBQUMsQ0FBQzZWLFdBQUYsR0FBZ0IsS0FBaEI7QUFDRDs7QUFDREQsZUFBTyxDQUFDaUMsSUFBUjtBQUNELE9BUFMsRUFPUCxHQVBPLENBQVY7QUFRRCxLQVREO0FBVUEsV0FBTyxJQUFQO0FBQ0QsR0E1Z0NEO0FBNmdDRCxDQWhoQ0EsRUFnaENDcUQsTUFoaENELENBQUQsQzs7Ozs7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7O0FBT0FDLG1CQUFPLENBQUMsZ0RBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyw4REFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLDRFQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsMERBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyw4REFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGtFQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMscURBQUQsQ0FBUDs7QUFFQUEsbUJBQU8sQ0FBQyxpREFBRCxDQUFQOztBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBN1csTUFBTSxDQUFDdE4sY0FBUCxDQUFzQjhILE1BQXRCLENBQTZCLGNBQTdCLEVBQTZDd0MsaUVBQTdDO0FBRUFnRCxNQUFNLENBQUN0TixjQUFQLENBQXNCOEgsTUFBdEIsQ0FBNkIsY0FBN0IsRUFBNkMxSSx1RUFBN0M7QUFDQWtPLE1BQU0sQ0FBQ3ROLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixzQkFBN0IsRUFBcURqRCw4RUFBckQ7QUFDQXlJLE1BQU0sQ0FBQ3ROLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixvQkFBN0IsRUFBbURqQyw0RUFBbkQ7QUFFQXlILE1BQU0sQ0FBQ3ROLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixRQUE3QixFQUF1Q3NULHNEQUF2QztBQUNBOU4sTUFBTSxDQUFDdE4sY0FBUCxDQUFzQjhILE1BQXRCLENBQTZCLFNBQTdCLEVBQXdDNFIsdURBQXhDO0FBQ0FwTSxNQUFNLENBQUN0TixjQUFQLENBQXNCOEgsTUFBdEIsQ0FBNkIsY0FBN0IsRUFBNkN3VCwyREFBN0M7QUFFQWhPLE1BQU0sQ0FBQ3ROLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixrQkFBN0IsRUFBaUR5VCxvRUFBakQ7QUFFQWpPLE1BQU0sQ0FBQ3ROLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixZQUE3QixFQUEyQzZULGlFQUEzQztBQUVBck8sTUFBTSxDQUFDdE4sY0FBUCxDQUFzQjhILE1BQXRCLENBQTZCLGlCQUE3QixFQUFnRDhHLDJFQUFoRDtBQUNBdEIsTUFBTSxDQUFDdE4sY0FBUCxDQUFzQjhILE1BQXRCLENBQTZCLGdCQUE3QixFQUErQ2dILDBFQUEvQzs7QUFHQXFWLG1CQUFPLENBQUMsK0NBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyx1Q0FBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG1EQUFELENBQVA7O0FBRUFBLG1CQUFPLENBQUMsdURBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQywrQ0FBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLHVEQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsNkRBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxxRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG1EQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsdURBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQywyREFBRCxDQUFQLEMiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjFkOTBiNzljNTkxOGE0MDI1N2NiXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcIm1haW5cIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9pbmRleC5qc1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBJbXBvcnRzXG52YXIgdXJsRXNjYXBlID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3VybC1lc2NhcGUuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18wX19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuLi9mb250cy9mb250YXdlc29tZS13ZWJmb250LmVvdD92PTQuNy4wXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzFfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4uL2ZvbnRzL2ZvbnRhd2Vzb21lLXdlYmZvbnQuZW90XCIpICsgXCI/I2llZml4JnY9NC43LjBcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18yX19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuLi9mb250cy9mb250YXdlc29tZS13ZWJmb250LndvZmYyP3Y9NC43LjBcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fM19fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi4vZm9udHMvZm9udGF3ZXNvbWUtd2ViZm9udC53b2ZmP3Y9NC43LjBcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fNF9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi4vZm9udHMvZm9udGF3ZXNvbWUtd2ViZm9udC50dGY/dj00LjcuMFwiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX181X19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuLi9mb250cy9mb250YXdlc29tZS13ZWJmb250LnN2Zz92PTQuNy4wXCIpICsgXCIjZm9udGF3ZXNvbWVyZWd1bGFyXCIpO1xuXG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIVxcbiAqICBGb250IEF3ZXNvbWUgNC43LjAgYnkgQGRhdmVnYW5keSAtIGh0dHA6Ly9mb250YXdlc29tZS5pbyAtIEBmb250YXdlc29tZVxcbiAqICBMaWNlbnNlIC0gaHR0cDovL2ZvbnRhd2Vzb21lLmlvL2xpY2Vuc2UgKEZvbnQ6IFNJTCBPRkwgMS4xLCBDU1M6IE1JVCBMaWNlbnNlKVxcbiAqL0Bmb250LWZhY2V7Zm9udC1mYW1pbHk6J0ZvbnRBd2Vzb21lJztzcmM6dXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18wX19fICsgXCIpO3NyYzp1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzFfX18gKyBcIikgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMl9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18zX19fICsgXCIpIGZvcm1hdCgnd29mZicpLHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fNF9fXyArIFwiKSBmb3JtYXQoJ3RydWV0eXBlJyksdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX181X19fICsgXCIpIGZvcm1hdCgnc3ZnJyk7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3R5bGU6bm9ybWFsfS5mYXtkaXNwbGF5OmlubGluZS1ibG9jaztmb250Om5vcm1hbCBub3JtYWwgbm9ybWFsIDE0cHgvMSBGb250QXdlc29tZTtmb250LXNpemU6aW5oZXJpdDt0ZXh0LXJlbmRlcmluZzphdXRvOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlfS5mYS1sZ3tmb250LXNpemU6MS4zMzMzMzMzM2VtO2xpbmUtaGVpZ2h0Oi43NWVtO3ZlcnRpY2FsLWFsaWduOi0xNSV9LmZhLTJ4e2ZvbnQtc2l6ZToyZW19LmZhLTN4e2ZvbnQtc2l6ZTozZW19LmZhLTR4e2ZvbnQtc2l6ZTo0ZW19LmZhLTV4e2ZvbnQtc2l6ZTo1ZW19LmZhLWZ3e3dpZHRoOjEuMjg1NzE0MjllbTt0ZXh0LWFsaWduOmNlbnRlcn0uZmEtdWx7cGFkZGluZy1sZWZ0OjA7bWFyZ2luLWxlZnQ6Mi4xNDI4NTcxNGVtO2xpc3Qtc3R5bGUtdHlwZTpub25lfS5mYS11bD5saXtwb3NpdGlvbjpyZWxhdGl2ZX0uZmEtbGl7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMi4xNDI4NTcxNGVtO3dpZHRoOjIuMTQyODU3MTRlbTt0b3A6LjE0Mjg1NzE0ZW07dGV4dC1hbGlnbjpjZW50ZXJ9LmZhLWxpLmZhLWxne2xlZnQ6LTEuODU3MTQyODZlbX0uZmEtYm9yZGVye3BhZGRpbmc6LjJlbSAuMjVlbSAuMTVlbTtib3JkZXI6c29saWQgLjA4ZW0gI2VlZTtib3JkZXItcmFkaXVzOi4xZW19LmZhLXB1bGwtbGVmdHtmbG9hdDpsZWZ0fS5mYS1wdWxsLXJpZ2h0e2Zsb2F0OnJpZ2h0fS5mYS5mYS1wdWxsLWxlZnR7bWFyZ2luLXJpZ2h0Oi4zZW19LmZhLmZhLXB1bGwtcmlnaHR7bWFyZ2luLWxlZnQ6LjNlbX0ucHVsbC1yaWdodHtmbG9hdDpyaWdodH0ucHVsbC1sZWZ0e2Zsb2F0OmxlZnR9LmZhLnB1bGwtbGVmdHttYXJnaW4tcmlnaHQ6LjNlbX0uZmEucHVsbC1yaWdodHttYXJnaW4tbGVmdDouM2VtfS5mYS1zcGluey13ZWJraXQtYW5pbWF0aW9uOmZhLXNwaW4gMnMgaW5maW5pdGUgbGluZWFyO2FuaW1hdGlvbjpmYS1zcGluIDJzIGluZmluaXRlIGxpbmVhcn0uZmEtcHVsc2V7LXdlYmtpdC1hbmltYXRpb246ZmEtc3BpbiAxcyBpbmZpbml0ZSBzdGVwcyg4KTthbmltYXRpb246ZmEtc3BpbiAxcyBpbmZpbml0ZSBzdGVwcyg4KX1ALXdlYmtpdC1rZXlmcmFtZXMgZmEtc3BpbnswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNTlkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzU5ZGVnKX19QGtleWZyYW1lcyBmYS1zcGluezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDBkZWcpfTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM1OWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNTlkZWcpfX0uZmEtcm90YXRlLTkwey1tcy1maWx0ZXI6XFxcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CYXNpY0ltYWdlKHJvdGF0aW9uPTEpXFxcIjstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpOy1tcy10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKX0uZmEtcm90YXRlLTE4MHstbXMtZmlsdGVyOlxcXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQmFzaWNJbWFnZShyb3RhdGlvbj0yKVxcXCI7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDE4MGRlZyk7LW1zLXRyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDE4MGRlZyl9LmZhLXJvdGF0ZS0yNzB7LW1zLWZpbHRlcjpcXFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJhc2ljSW1hZ2Uocm90YXRpb249MylcXFwiOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgyNzBkZWcpOy1tcy10cmFuc2Zvcm06cm90YXRlKDI3MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgyNzBkZWcpfS5mYS1mbGlwLWhvcml6b250YWx7LW1zLWZpbHRlcjpcXFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJhc2ljSW1hZ2Uocm90YXRpb249MCwgbWlycm9yPTEpXFxcIjstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgtMSwgMSk7LW1zLXRyYW5zZm9ybTpzY2FsZSgtMSwgMSk7dHJhbnNmb3JtOnNjYWxlKC0xLCAxKX0uZmEtZmxpcC12ZXJ0aWNhbHstbXMtZmlsdGVyOlxcXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQmFzaWNJbWFnZShyb3RhdGlvbj0yLCBtaXJyb3I9MSlcXFwiOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEsIC0xKTstbXMtdHJhbnNmb3JtOnNjYWxlKDEsIC0xKTt0cmFuc2Zvcm06c2NhbGUoMSwgLTEpfTpyb290IC5mYS1yb3RhdGUtOTAsOnJvb3QgLmZhLXJvdGF0ZS0xODAsOnJvb3QgLmZhLXJvdGF0ZS0yNzAsOnJvb3QgLmZhLWZsaXAtaG9yaXpvbnRhbCw6cm9vdCAuZmEtZmxpcC12ZXJ0aWNhbHtmaWx0ZXI6bm9uZX0uZmEtc3RhY2t7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MmVtO2hlaWdodDoyZW07bGluZS1oZWlnaHQ6MmVtO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uZmEtc3RhY2stMXgsLmZhLXN0YWNrLTJ4e3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyfS5mYS1zdGFjay0xeHtsaW5lLWhlaWdodDppbmhlcml0fS5mYS1zdGFjay0yeHtmb250LXNpemU6MmVtfS5mYS1pbnZlcnNle2NvbG9yOiNmZmZ9LmZhLWdsYXNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwMFxcXCJ9LmZhLW11c2ljOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwMVxcXCJ9LmZhLXNlYXJjaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMDJcXFwifS5mYS1lbnZlbG9wZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwM1xcXCJ9LmZhLWhlYXJ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwNFxcXCJ9LmZhLXN0YXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDA1XFxcIn0uZmEtc3Rhci1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwNlxcXCJ9LmZhLXVzZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDA3XFxcIn0uZmEtZmlsbTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMDhcXFwifS5mYS10aC1sYXJnZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMDlcXFwifS5mYS10aDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMGFcXFwifS5mYS10aC1saXN0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwYlxcXCJ9LmZhLWNoZWNrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwY1xcXCJ9LmZhLXJlbW92ZTpiZWZvcmUsLmZhLWNsb3NlOmJlZm9yZSwuZmEtdGltZXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDBkXFxcIn0uZmEtc2VhcmNoLXBsdXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDBlXFxcIn0uZmEtc2VhcmNoLW1pbnVzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxMFxcXCJ9LmZhLXBvd2VyLW9mZjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMTFcXFwifS5mYS1zaWduYWw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDEyXFxcIn0uZmEtZ2VhcjpiZWZvcmUsLmZhLWNvZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMTNcXFwifS5mYS10cmFzaC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxNFxcXCJ9LmZhLWhvbWU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDE1XFxcIn0uZmEtZmlsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxNlxcXCJ9LmZhLWNsb2NrLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDE3XFxcIn0uZmEtcm9hZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMThcXFwifS5mYS1kb3dubG9hZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMTlcXFwifS5mYS1hcnJvdy1jaXJjbGUtby1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxYVxcXCJ9LmZhLWFycm93LWNpcmNsZS1vLXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxYlxcXCJ9LmZhLWluYm94OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxY1xcXCJ9LmZhLXBsYXktY2lyY2xlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDFkXFxcIn0uZmEtcm90YXRlLXJpZ2h0OmJlZm9yZSwuZmEtcmVwZWF0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxZVxcXCJ9LmZhLXJlZnJlc2g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDIxXFxcIn0uZmEtbGlzdC1hbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDIyXFxcIn0uZmEtbG9jazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMjNcXFwifS5mYS1mbGFnOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAyNFxcXCJ9LmZhLWhlYWRwaG9uZXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDI1XFxcIn0uZmEtdm9sdW1lLW9mZjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMjZcXFwifS5mYS12b2x1bWUtZG93bjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMjdcXFwifS5mYS12b2x1bWUtdXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDI4XFxcIn0uZmEtcXJjb2RlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAyOVxcXCJ9LmZhLWJhcmNvZGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDJhXFxcIn0uZmEtdGFnOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAyYlxcXCJ9LmZhLXRhZ3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDJjXFxcIn0uZmEtYm9vazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMmRcXFwifS5mYS1ib29rbWFyazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMmVcXFwifS5mYS1wcmludDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMmZcXFwifS5mYS1jYW1lcmE6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDMwXFxcIn0uZmEtZm9udDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMzFcXFwifS5mYS1ib2xkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzMlxcXCJ9LmZhLWl0YWxpYzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMzNcXFwifS5mYS10ZXh0LWhlaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMzRcXFwifS5mYS10ZXh0LXdpZHRoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzNVxcXCJ9LmZhLWFsaWduLWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDM2XFxcIn0uZmEtYWxpZ24tY2VudGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzN1xcXCJ9LmZhLWFsaWduLXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzOFxcXCJ9LmZhLWFsaWduLWp1c3RpZnk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDM5XFxcIn0uZmEtbGlzdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwM2FcXFwifS5mYS1kZWRlbnQ6YmVmb3JlLC5mYS1vdXRkZW50OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzYlxcXCJ9LmZhLWluZGVudDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwM2NcXFwifS5mYS12aWRlby1jYW1lcmE6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDNkXFxcIn0uZmEtcGhvdG86YmVmb3JlLC5mYS1pbWFnZTpiZWZvcmUsLmZhLXBpY3R1cmUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwM2VcXFwifS5mYS1wZW5jaWw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDQwXFxcIn0uZmEtbWFwLW1hcmtlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNDFcXFwifS5mYS1hZGp1c3Q6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDQyXFxcIn0uZmEtdGludDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNDNcXFwifS5mYS1lZGl0OmJlZm9yZSwuZmEtcGVuY2lsLXNxdWFyZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0NFxcXCJ9LmZhLXNoYXJlLXNxdWFyZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0NVxcXCJ9LmZhLWNoZWNrLXNxdWFyZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0NlxcXCJ9LmZhLWFycm93czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNDdcXFwifS5mYS1zdGVwLWJhY2t3YXJkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0OFxcXCJ9LmZhLWZhc3QtYmFja3dhcmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDQ5XFxcIn0uZmEtYmFja3dhcmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDRhXFxcIn0uZmEtcGxheTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNGJcXFwifS5mYS1wYXVzZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNGNcXFwifS5mYS1zdG9wOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0ZFxcXCJ9LmZhLWZvcndhcmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDRlXFxcIn0uZmEtZmFzdC1mb3J3YXJkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1MFxcXCJ9LmZhLXN0ZXAtZm9yd2FyZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNTFcXFwifS5mYS1lamVjdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNTJcXFwifS5mYS1jaGV2cm9uLWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDUzXFxcIn0uZmEtY2hldnJvbi1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNTRcXFwifS5mYS1wbHVzLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNTVcXFwifS5mYS1taW51cy1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDU2XFxcIn0uZmEtdGltZXMtY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1N1xcXCJ9LmZhLWNoZWNrLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNThcXFwifS5mYS1xdWVzdGlvbi1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDU5XFxcIn0uZmEtaW5mby1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDVhXFxcIn0uZmEtY3Jvc3NoYWlyczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNWJcXFwifS5mYS10aW1lcy1jaXJjbGUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNWNcXFwifS5mYS1jaGVjay1jaXJjbGUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNWRcXFwifS5mYS1iYW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDVlXFxcIn0uZmEtYXJyb3ctbGVmdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNjBcXFwifS5mYS1hcnJvdy1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNjFcXFwifS5mYS1hcnJvdy11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNjJcXFwifS5mYS1hcnJvdy1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2M1xcXCJ9LmZhLW1haWwtZm9yd2FyZDpiZWZvcmUsLmZhLXNoYXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2NFxcXCJ9LmZhLWV4cGFuZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNjVcXFwifS5mYS1jb21wcmVzczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNjZcXFwifS5mYS1wbHVzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2N1xcXCJ9LmZhLW1pbnVzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2OFxcXCJ9LmZhLWFzdGVyaXNrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2OVxcXCJ9LmZhLWV4Y2xhbWF0aW9uLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNmFcXFwifS5mYS1naWZ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2YlxcXCJ9LmZhLWxlYWY6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDZjXFxcIn0uZmEtZmlyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNmRcXFwifS5mYS1leWU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDZlXFxcIn0uZmEtZXllLXNsYXNoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3MFxcXCJ9LmZhLXdhcm5pbmc6YmVmb3JlLC5mYS1leGNsYW1hdGlvbi10cmlhbmdsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNzFcXFwifS5mYS1wbGFuZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNzJcXFwifS5mYS1jYWxlbmRhcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNzNcXFwifS5mYS1yYW5kb206YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDc0XFxcIn0uZmEtY29tbWVudDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNzVcXFwifS5mYS1tYWduZXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDc2XFxcIn0uZmEtY2hldnJvbi11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNzdcXFwifS5mYS1jaGV2cm9uLWRvd246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDc4XFxcIn0uZmEtcmV0d2VldDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNzlcXFwifS5mYS1zaG9wcGluZy1jYXJ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3YVxcXCJ9LmZhLWZvbGRlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwN2JcXFwifS5mYS1mb2xkZXItb3BlbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwN2NcXFwifS5mYS1hcnJvd3MtdjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwN2RcXFwifS5mYS1hcnJvd3MtaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwN2VcXFwifS5mYS1iYXItY2hhcnQtbzpiZWZvcmUsLmZhLWJhci1jaGFydDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwODBcXFwifS5mYS10d2l0dGVyLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwODFcXFwifS5mYS1mYWNlYm9vay1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDgyXFxcIn0uZmEtY2FtZXJhLXJldHJvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA4M1xcXCJ9LmZhLWtleTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwODRcXFwifS5mYS1nZWFyczpiZWZvcmUsLmZhLWNvZ3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDg1XFxcIn0uZmEtY29tbWVudHM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDg2XFxcIn0uZmEtdGh1bWJzLW8tdXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDg3XFxcIn0uZmEtdGh1bWJzLW8tZG93bjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwODhcXFwifS5mYS1zdGFyLWhhbGY6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDg5XFxcIn0uZmEtaGVhcnQtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOGFcXFwifS5mYS1zaWduLW91dDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOGJcXFwifS5mYS1saW5rZWRpbi1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDhjXFxcIn0uZmEtdGh1bWItdGFjazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOGRcXFwifS5mYS1leHRlcm5hbC1saW5rOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA4ZVxcXCJ9LmZhLXNpZ24taW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDkwXFxcIn0uZmEtdHJvcGh5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA5MVxcXCJ9LmZhLWdpdGh1Yi1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDkyXFxcIn0uZmEtdXBsb2FkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA5M1xcXCJ9LmZhLWxlbW9uLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDk0XFxcIn0uZmEtcGhvbmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDk1XFxcIn0uZmEtc3F1YXJlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDk2XFxcIn0uZmEtYm9va21hcmstbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOTdcXFwifS5mYS1waG9uZS1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDk4XFxcIn0uZmEtdHdpdHRlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOTlcXFwifS5mYS1mYWNlYm9vay1mOmJlZm9yZSwuZmEtZmFjZWJvb2s6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDlhXFxcIn0uZmEtZ2l0aHViOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA5YlxcXCJ9LmZhLXVubG9jazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOWNcXFwifS5mYS1jcmVkaXQtY2FyZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOWRcXFwifS5mYS1mZWVkOmJlZm9yZSwuZmEtcnNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA5ZVxcXCJ9LmZhLWhkZC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhMFxcXCJ9LmZhLWJ1bGxob3JuOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhMVxcXCJ9LmZhLWJlbGw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGYzXFxcIn0uZmEtY2VydGlmaWNhdGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGEzXFxcIn0uZmEtaGFuZC1vLXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhNFxcXCJ9LmZhLWhhbmQtby1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhNVxcXCJ9LmZhLWhhbmQtby11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYTZcXFwifS5mYS1oYW5kLW8tZG93bjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYTdcXFwifS5mYS1hcnJvdy1jaXJjbGUtbGVmdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYThcXFwifS5mYS1hcnJvdy1jaXJjbGUtcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGE5XFxcIn0uZmEtYXJyb3ctY2lyY2xlLXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhYVxcXCJ9LmZhLWFycm93LWNpcmNsZS1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhYlxcXCJ9LmZhLWdsb2JlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhY1xcXCJ9LmZhLXdyZW5jaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYWRcXFwifS5mYS10YXNrczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYWVcXFwifS5mYS1maWx0ZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGIwXFxcIn0uZmEtYnJpZWZjYXNlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBiMVxcXCJ9LmZhLWFycm93cy1hbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGIyXFxcIn0uZmEtZ3JvdXA6YmVmb3JlLC5mYS11c2VyczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYzBcXFwifS5mYS1jaGFpbjpiZWZvcmUsLmZhLWxpbms6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGMxXFxcIn0uZmEtY2xvdWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGMyXFxcIn0uZmEtZmxhc2s6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGMzXFxcIn0uZmEtY3V0OmJlZm9yZSwuZmEtc2Npc3NvcnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGM0XFxcIn0uZmEtY29weTpiZWZvcmUsLmZhLWZpbGVzLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGM1XFxcIn0uZmEtcGFwZXJjbGlwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBjNlxcXCJ9LmZhLXNhdmU6YmVmb3JlLC5mYS1mbG9wcHktbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYzdcXFwifS5mYS1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGM4XFxcIn0uZmEtbmF2aWNvbjpiZWZvcmUsLmZhLXJlb3JkZXI6YmVmb3JlLC5mYS1iYXJzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBjOVxcXCJ9LmZhLWxpc3QtdWw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGNhXFxcIn0uZmEtbGlzdC1vbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwY2JcXFwifS5mYS1zdHJpa2V0aHJvdWdoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBjY1xcXCJ9LmZhLXVuZGVybGluZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwY2RcXFwifS5mYS10YWJsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwY2VcXFwifS5mYS1tYWdpYzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZDBcXFwifS5mYS10cnVjazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZDFcXFwifS5mYS1waW50ZXJlc3Q6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGQyXFxcIn0uZmEtcGludGVyZXN0LXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZDNcXFwifS5mYS1nb29nbGUtcGx1cy1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGQ0XFxcIn0uZmEtZ29vZ2xlLXBsdXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGQ1XFxcIn0uZmEtbW9uZXk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGQ2XFxcIn0uZmEtY2FyZXQtZG93bjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZDdcXFwifS5mYS1jYXJldC11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZDhcXFwifS5mYS1jYXJldC1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBkOVxcXCJ9LmZhLWNhcmV0LXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBkYVxcXCJ9LmZhLWNvbHVtbnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGRiXFxcIn0uZmEtdW5zb3J0ZWQ6YmVmb3JlLC5mYS1zb3J0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBkY1xcXCJ9LmZhLXNvcnQtZG93bjpiZWZvcmUsLmZhLXNvcnQtZGVzYzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZGRcXFwifS5mYS1zb3J0LXVwOmJlZm9yZSwuZmEtc29ydC1hc2M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGRlXFxcIn0uZmEtZW52ZWxvcGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGUwXFxcIn0uZmEtbGlua2VkaW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGUxXFxcIn0uZmEtcm90YXRlLWxlZnQ6YmVmb3JlLC5mYS11bmRvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBlMlxcXCJ9LmZhLWxlZ2FsOmJlZm9yZSwuZmEtZ2F2ZWw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGUzXFxcIn0uZmEtZGFzaGJvYXJkOmJlZm9yZSwuZmEtdGFjaG9tZXRlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZTRcXFwifS5mYS1jb21tZW50LW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGU1XFxcIn0uZmEtY29tbWVudHMtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZTZcXFwifS5mYS1mbGFzaDpiZWZvcmUsLmZhLWJvbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGU3XFxcIn0uZmEtc2l0ZW1hcDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZThcXFwifS5mYS11bWJyZWxsYTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZTlcXFwifS5mYS1wYXN0ZTpiZWZvcmUsLmZhLWNsaXBib2FyZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZWFcXFwifS5mYS1saWdodGJ1bGItbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZWJcXFwifS5mYS1leGNoYW5nZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZWNcXFwifS5mYS1jbG91ZC1kb3dubG9hZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZWRcXFwifS5mYS1jbG91ZC11cGxvYWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGVlXFxcIn0uZmEtdXNlci1tZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZjBcXFwifS5mYS1zdGV0aG9zY29wZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZjFcXFwifS5mYS1zdWl0Y2FzZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZjJcXFwifS5mYS1iZWxsLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGEyXFxcIn0uZmEtY29mZmVlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmNFxcXCJ9LmZhLWN1dGxlcnk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGY1XFxcIn0uZmEtZmlsZS10ZXh0LW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGY2XFxcIn0uZmEtYnVpbGRpbmctbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZjdcXFwifS5mYS1ob3NwaXRhbC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmOFxcXCJ9LmZhLWFtYnVsYW5jZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZjlcXFwifS5mYS1tZWRraXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGZhXFxcIn0uZmEtZmlnaHRlci1qZXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGZiXFxcIn0uZmEtYmVlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZmNcXFwifS5mYS1oLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZmRcXFwifS5mYS1wbHVzLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZmVcXFwifS5mYS1hbmdsZS1kb3VibGUtbGVmdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMDBcXFwifS5mYS1hbmdsZS1kb3VibGUtcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTAxXFxcIn0uZmEtYW5nbGUtZG91YmxlLXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEwMlxcXCJ9LmZhLWFuZ2xlLWRvdWJsZS1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEwM1xcXCJ9LmZhLWFuZ2xlLWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTA0XFxcIn0uZmEtYW5nbGUtcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTA1XFxcIn0uZmEtYW5nbGUtdXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTA2XFxcIn0uZmEtYW5nbGUtZG93bjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMDdcXFwifS5mYS1kZXNrdG9wOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEwOFxcXCJ9LmZhLWxhcHRvcDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMDlcXFwifS5mYS10YWJsZXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTBhXFxcIn0uZmEtbW9iaWxlLXBob25lOmJlZm9yZSwuZmEtbW9iaWxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEwYlxcXCJ9LmZhLWNpcmNsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEwY1xcXCJ9LmZhLXF1b3RlLWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTBkXFxcIn0uZmEtcXVvdGUtcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTBlXFxcIn0uZmEtc3Bpbm5lcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMTBcXFwifS5mYS1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTExXFxcIn0uZmEtbWFpbC1yZXBseTpiZWZvcmUsLmZhLXJlcGx5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjExMlxcXCJ9LmZhLWdpdGh1Yi1hbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTEzXFxcIn0uZmEtZm9sZGVyLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTE0XFxcIn0uZmEtZm9sZGVyLW9wZW4tbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMTVcXFwifS5mYS1zbWlsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjExOFxcXCJ9LmZhLWZyb3duLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTE5XFxcIn0uZmEtbWVoLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTFhXFxcIn0uZmEtZ2FtZXBhZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMWJcXFwifS5mYS1rZXlib2FyZC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjExY1xcXCJ9LmZhLWZsYWctbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMWRcXFwifS5mYS1mbGFnLWNoZWNrZXJlZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMWVcXFwifS5mYS10ZXJtaW5hbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMjBcXFwifS5mYS1jb2RlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEyMVxcXCJ9LmZhLW1haWwtcmVwbHktYWxsOmJlZm9yZSwuZmEtcmVwbHktYWxsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEyMlxcXCJ9LmZhLXN0YXItaGFsZi1lbXB0eTpiZWZvcmUsLmZhLXN0YXItaGFsZi1mdWxsOmJlZm9yZSwuZmEtc3Rhci1oYWxmLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTIzXFxcIn0uZmEtbG9jYXRpb24tYXJyb3c6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTI0XFxcIn0uZmEtY3JvcDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMjVcXFwifS5mYS1jb2RlLWZvcms6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTI2XFxcIn0uZmEtdW5saW5rOmJlZm9yZSwuZmEtY2hhaW4tYnJva2VuOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEyN1xcXCJ9LmZhLXF1ZXN0aW9uOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEyOFxcXCJ9LmZhLWluZm86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTI5XFxcIn0uZmEtZXhjbGFtYXRpb246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTJhXFxcIn0uZmEtc3VwZXJzY3JpcHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTJiXFxcIn0uZmEtc3Vic2NyaXB0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEyY1xcXCJ9LmZhLWVyYXNlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMmRcXFwifS5mYS1wdXp6bGUtcGllY2U6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTJlXFxcIn0uZmEtbWljcm9waG9uZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMzBcXFwifS5mYS1taWNyb3Bob25lLXNsYXNoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzMVxcXCJ9LmZhLXNoaWVsZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMzJcXFwifS5mYS1jYWxlbmRhci1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzM1xcXCJ9LmZhLWZpcmUtZXh0aW5ndWlzaGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzNFxcXCJ9LmZhLXJvY2tldDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMzVcXFwifS5mYS1tYXhjZG46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTM2XFxcIn0uZmEtY2hldnJvbi1jaXJjbGUtbGVmdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMzdcXFwifS5mYS1jaGV2cm9uLWNpcmNsZS1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMzhcXFwifS5mYS1jaGV2cm9uLWNpcmNsZS11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMzlcXFwifS5mYS1jaGV2cm9uLWNpcmNsZS1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzYVxcXCJ9LmZhLWh0bWw1OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzYlxcXCJ9LmZhLWNzczM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTNjXFxcIn0uZmEtYW5jaG9yOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzZFxcXCJ9LmZhLXVubG9jay1hbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTNlXFxcIn0uZmEtYnVsbHNleWU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTQwXFxcIn0uZmEtZWxsaXBzaXMtaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNDFcXFwifS5mYS1lbGxpcHNpcy12OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0MlxcXCJ9LmZhLXJzcy1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTQzXFxcIn0uZmEtcGxheS1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTQ0XFxcIn0uZmEtdGlja2V0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0NVxcXCJ9LmZhLW1pbnVzLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNDZcXFwifS5mYS1taW51cy1zcXVhcmUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNDdcXFwifS5mYS1sZXZlbC11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNDhcXFwifS5mYS1sZXZlbC1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0OVxcXCJ9LmZhLWNoZWNrLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNGFcXFwifS5mYS1wZW5jaWwtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0YlxcXCJ9LmZhLWV4dGVybmFsLWxpbmstc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0Y1xcXCJ9LmZhLXNoYXJlLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNGRcXFwifS5mYS1jb21wYXNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0ZVxcXCJ9LmZhLXRvZ2dsZS1kb3duOmJlZm9yZSwuZmEtY2FyZXQtc3F1YXJlLW8tZG93bjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNTBcXFwifS5mYS10b2dnbGUtdXA6YmVmb3JlLC5mYS1jYXJldC1zcXVhcmUtby11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNTFcXFwifS5mYS10b2dnbGUtcmlnaHQ6YmVmb3JlLC5mYS1jYXJldC1zcXVhcmUtby1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNTJcXFwifS5mYS1ldXJvOmJlZm9yZSwuZmEtZXVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1M1xcXCJ9LmZhLWdicDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNTRcXFwifS5mYS1kb2xsYXI6YmVmb3JlLC5mYS11c2Q6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTU1XFxcIn0uZmEtcnVwZWU6YmVmb3JlLC5mYS1pbnI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTU2XFxcIn0uZmEtY255OmJlZm9yZSwuZmEtcm1iOmJlZm9yZSwuZmEteWVuOmJlZm9yZSwuZmEtanB5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1N1xcXCJ9LmZhLXJ1YmxlOmJlZm9yZSwuZmEtcm91YmxlOmJlZm9yZSwuZmEtcnViOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1OFxcXCJ9LmZhLXdvbjpiZWZvcmUsLmZhLWtydzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNTlcXFwifS5mYS1iaXRjb2luOmJlZm9yZSwuZmEtYnRjOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1YVxcXCJ9LmZhLWZpbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTViXFxcIn0uZmEtZmlsZS10ZXh0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1Y1xcXCJ9LmZhLXNvcnQtYWxwaGEtYXNjOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1ZFxcXCJ9LmZhLXNvcnQtYWxwaGEtZGVzYzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNWVcXFwifS5mYS1zb3J0LWFtb3VudC1hc2M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTYwXFxcIn0uZmEtc29ydC1hbW91bnQtZGVzYzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNjFcXFwifS5mYS1zb3J0LW51bWVyaWMtYXNjOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2MlxcXCJ9LmZhLXNvcnQtbnVtZXJpYy1kZXNjOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2M1xcXCJ9LmZhLXRodW1icy11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNjRcXFwifS5mYS10aHVtYnMtZG93bjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNjVcXFwifS5mYS15b3V0dWJlLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNjZcXFwifS5mYS15b3V0dWJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2N1xcXCJ9LmZhLXhpbmc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTY4XFxcIn0uZmEteGluZy1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTY5XFxcIn0uZmEteW91dHViZS1wbGF5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2YVxcXCJ9LmZhLWRyb3Bib3g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTZiXFxcIn0uZmEtc3RhY2stb3ZlcmZsb3c6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTZjXFxcIn0uZmEtaW5zdGFncmFtOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2ZFxcXCJ9LmZhLWZsaWNrcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNmVcXFwifS5mYS1hZG46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTcwXFxcIn0uZmEtYml0YnVja2V0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE3MVxcXCJ9LmZhLWJpdGJ1Y2tldC1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTcyXFxcIn0uZmEtdHVtYmxyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE3M1xcXCJ9LmZhLXR1bWJsci1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTc0XFxcIn0uZmEtbG9uZy1hcnJvdy1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE3NVxcXCJ9LmZhLWxvbmctYXJyb3ctdXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTc2XFxcIn0uZmEtbG9uZy1hcnJvdy1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE3N1xcXCJ9LmZhLWxvbmctYXJyb3ctcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTc4XFxcIn0uZmEtYXBwbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTc5XFxcIn0uZmEtd2luZG93czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxN2FcXFwifS5mYS1hbmRyb2lkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE3YlxcXCJ9LmZhLWxpbnV4OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE3Y1xcXCJ9LmZhLWRyaWJiYmxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE3ZFxcXCJ9LmZhLXNreXBlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE3ZVxcXCJ9LmZhLWZvdXJzcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTgwXFxcIn0uZmEtdHJlbGxvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4MVxcXCJ9LmZhLWZlbWFsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxODJcXFwifS5mYS1tYWxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4M1xcXCJ9LmZhLWdpdHRpcDpiZWZvcmUsLmZhLWdyYXRpcGF5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4NFxcXCJ9LmZhLXN1bi1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4NVxcXCJ9LmZhLW1vb24tbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxODZcXFwifS5mYS1hcmNoaXZlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4N1xcXCJ9LmZhLWJ1ZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxODhcXFwifS5mYS12azpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxODlcXFwifS5mYS13ZWlibzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOGFcXFwifS5mYS1yZW5yZW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMThiXFxcIn0uZmEtcGFnZWxpbmVzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4Y1xcXCJ9LmZhLXN0YWNrLWV4Y2hhbmdlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4ZFxcXCJ9LmZhLWFycm93LWNpcmNsZS1vLXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4ZVxcXCJ9LmZhLWFycm93LWNpcmNsZS1vLWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTkwXFxcIn0uZmEtdG9nZ2xlLWxlZnQ6YmVmb3JlLC5mYS1jYXJldC1zcXVhcmUtby1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE5MVxcXCJ9LmZhLWRvdC1jaXJjbGUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOTJcXFwifS5mYS13aGVlbGNoYWlyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE5M1xcXCJ9LmZhLXZpbWVvLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOTRcXFwifS5mYS10dXJraXNoLWxpcmE6YmVmb3JlLC5mYS10cnk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTk1XFxcIn0uZmEtcGx1cy1zcXVhcmUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOTZcXFwifS5mYS1zcGFjZS1zaHV0dGxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE5N1xcXCJ9LmZhLXNsYWNrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE5OFxcXCJ9LmZhLWVudmVsb3BlLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOTlcXFwifS5mYS13b3JkcHJlc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTlhXFxcIn0uZmEtb3BlbmlkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE5YlxcXCJ9LmZhLWluc3RpdHV0aW9uOmJlZm9yZSwuZmEtYmFuazpiZWZvcmUsLmZhLXVuaXZlcnNpdHk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTljXFxcIn0uZmEtbW9ydGFyLWJvYXJkOmJlZm9yZSwuZmEtZ3JhZHVhdGlvbi1jYXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTlkXFxcIn0uZmEteWFob286YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTllXFxcIn0uZmEtZ29vZ2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhMFxcXCJ9LmZhLXJlZGRpdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYTFcXFwifS5mYS1yZWRkaXQtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhMlxcXCJ9LmZhLXN0dW1ibGV1cG9uLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYTNcXFwifS5mYS1zdHVtYmxldXBvbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYTRcXFwifS5mYS1kZWxpY2lvdXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWE1XFxcIn0uZmEtZGlnZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYTZcXFwifS5mYS1waWVkLXBpcGVyLXBwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhN1xcXCJ9LmZhLXBpZWQtcGlwZXItYWx0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhOFxcXCJ9LmZhLWRydXBhbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYTlcXFwifS5mYS1qb29tbGE6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWFhXFxcIn0uZmEtbGFuZ3VhZ2U6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWFiXFxcIn0uZmEtZmF4OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhY1xcXCJ9LmZhLWJ1aWxkaW5nOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhZFxcXCJ9LmZhLWNoaWxkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhZVxcXCJ9LmZhLXBhdzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYjBcXFwifS5mYS1zcG9vbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYjFcXFwifS5mYS1jdWJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFiMlxcXCJ9LmZhLWN1YmVzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFiM1xcXCJ9LmZhLWJlaGFuY2U6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWI0XFxcIn0uZmEtYmVoYW5jZS1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWI1XFxcIn0uZmEtc3RlYW06YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWI2XFxcIn0uZmEtc3RlYW0tc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFiN1xcXCJ9LmZhLXJlY3ljbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWI4XFxcIn0uZmEtYXV0b21vYmlsZTpiZWZvcmUsLmZhLWNhcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYjlcXFwifS5mYS1jYWI6YmVmb3JlLC5mYS10YXhpOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFiYVxcXCJ9LmZhLXRyZWU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWJiXFxcIn0uZmEtc3BvdGlmeTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYmNcXFwifS5mYS1kZXZpYW50YXJ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFiZFxcXCJ9LmZhLXNvdW5kY2xvdWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWJlXFxcIn0uZmEtZGF0YWJhc2U6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWMwXFxcIn0uZmEtZmlsZS1wZGYtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYzFcXFwifS5mYS1maWxlLXdvcmQtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYzJcXFwifS5mYS1maWxlLWV4Y2VsLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWMzXFxcIn0uZmEtZmlsZS1wb3dlcnBvaW50LW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWM0XFxcIn0uZmEtZmlsZS1waG90by1vOmJlZm9yZSwuZmEtZmlsZS1waWN0dXJlLW86YmVmb3JlLC5mYS1maWxlLWltYWdlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWM1XFxcIn0uZmEtZmlsZS16aXAtbzpiZWZvcmUsLmZhLWZpbGUtYXJjaGl2ZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFjNlxcXCJ9LmZhLWZpbGUtc291bmQtbzpiZWZvcmUsLmZhLWZpbGUtYXVkaW8tbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYzdcXFwifS5mYS1maWxlLW1vdmllLW86YmVmb3JlLC5mYS1maWxlLXZpZGVvLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWM4XFxcIn0uZmEtZmlsZS1jb2RlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWM5XFxcIn0uZmEtdmluZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxY2FcXFwifS5mYS1jb2RlcGVuOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFjYlxcXCJ9LmZhLWpzZmlkZGxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFjY1xcXCJ9LmZhLWxpZmUtYm91eTpiZWZvcmUsLmZhLWxpZmUtYnVveTpiZWZvcmUsLmZhLWxpZmUtc2F2ZXI6YmVmb3JlLC5mYS1zdXBwb3J0OmJlZm9yZSwuZmEtbGlmZS1yaW5nOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFjZFxcXCJ9LmZhLWNpcmNsZS1vLW5vdGNoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFjZVxcXCJ9LmZhLXJhOmJlZm9yZSwuZmEtcmVzaXN0YW5jZTpiZWZvcmUsLmZhLXJlYmVsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkMFxcXCJ9LmZhLWdlOmJlZm9yZSwuZmEtZW1waXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkMVxcXCJ9LmZhLWdpdC1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWQyXFxcIn0uZmEtZ2l0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkM1xcXCJ9LmZhLXktY29tYmluYXRvci1zcXVhcmU6YmVmb3JlLC5mYS15Yy1zcXVhcmU6YmVmb3JlLC5mYS1oYWNrZXItbmV3czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZDRcXFwifS5mYS10ZW5jZW50LXdlaWJvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkNVxcXCJ9LmZhLXFxOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkNlxcXCJ9LmZhLXdlY2hhdDpiZWZvcmUsLmZhLXdlaXhpbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZDdcXFwifS5mYS1zZW5kOmJlZm9yZSwuZmEtcGFwZXItcGxhbmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWQ4XFxcIn0uZmEtc2VuZC1vOmJlZm9yZSwuZmEtcGFwZXItcGxhbmUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZDlcXFwifS5mYS1oaXN0b3J5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkYVxcXCJ9LmZhLWNpcmNsZS10aGluOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkYlxcXCJ9LmZhLWhlYWRlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZGNcXFwifS5mYS1wYXJhZ3JhcGg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWRkXFxcIn0uZmEtc2xpZGVyczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZGVcXFwifS5mYS1zaGFyZS1hbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWUwXFxcIn0uZmEtc2hhcmUtYWx0LXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZTFcXFwifS5mYS1ib21iOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlMlxcXCJ9LmZhLXNvY2Nlci1iYWxsLW86YmVmb3JlLC5mYS1mdXRib2wtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZTNcXFwifS5mYS10dHk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWU0XFxcIn0uZmEtYmlub2N1bGFyczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZTVcXFwifS5mYS1wbHVnOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlNlxcXCJ9LmZhLXNsaWRlc2hhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWU3XFxcIn0uZmEtdHdpdGNoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlOFxcXCJ9LmZhLXllbHA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWU5XFxcIn0uZmEtbmV3c3BhcGVyLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWVhXFxcIn0uZmEtd2lmaTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZWJcXFwifS5mYS1jYWxjdWxhdG9yOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlY1xcXCJ9LmZhLXBheXBhbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZWRcXFwifS5mYS1nb29nbGUtd2FsbGV0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlZVxcXCJ9LmZhLWNjLXZpc2E6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWYwXFxcIn0uZmEtY2MtbWFzdGVyY2FyZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZjFcXFwifS5mYS1jYy1kaXNjb3ZlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZjJcXFwifS5mYS1jYy1hbWV4OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFmM1xcXCJ9LmZhLWNjLXBheXBhbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZjRcXFwifS5mYS1jYy1zdHJpcGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWY1XFxcIn0uZmEtYmVsbC1zbGFzaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZjZcXFwifS5mYS1iZWxsLXNsYXNoLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWY3XFxcIn0uZmEtdHJhc2g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWY4XFxcIn0uZmEtY29weXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFmOVxcXCJ9LmZhLWF0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFmYVxcXCJ9LmZhLWV5ZWRyb3BwZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWZiXFxcIn0uZmEtcGFpbnQtYnJ1c2g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWZjXFxcIn0uZmEtYmlydGhkYXktY2FrZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZmRcXFwifS5mYS1hcmVhLWNoYXJ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFmZVxcXCJ9LmZhLXBpZS1jaGFydDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMDBcXFwifS5mYS1saW5lLWNoYXJ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwMVxcXCJ9LmZhLWxhc3RmbTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMDJcXFwifS5mYS1sYXN0Zm0tc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwM1xcXCJ9LmZhLXRvZ2dsZS1vZmY6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjA0XFxcIn0uZmEtdG9nZ2xlLW9uOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwNVxcXCJ9LmZhLWJpY3ljbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjA2XFxcIn0uZmEtYnVzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwN1xcXCJ9LmZhLWlveGhvc3Q6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjA4XFxcIn0uZmEtYW5nZWxsaXN0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwOVxcXCJ9LmZhLWNjOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwYVxcXCJ9LmZhLXNoZWtlbDpiZWZvcmUsLmZhLXNoZXFlbDpiZWZvcmUsLmZhLWlsczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMGJcXFwifS5mYS1tZWFucGF0aDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMGNcXFwifS5mYS1idXlzZWxsYWRzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwZFxcXCJ9LmZhLWNvbm5lY3RkZXZlbG9wOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwZVxcXCJ9LmZhLWRhc2hjdWJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxMFxcXCJ9LmZhLWZvcnVtYmVlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxMVxcXCJ9LmZhLWxlYW5wdWI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjEyXFxcIn0uZmEtc2VsbHN5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxM1xcXCJ9LmZhLXNoaXJ0c2luYnVsazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMTRcXFwifS5mYS1zaW1wbHlidWlsdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMTVcXFwifS5mYS1za3lhdGxhczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMTZcXFwifS5mYS1jYXJ0LXBsdXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjE3XFxcIn0uZmEtY2FydC1hcnJvdy1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxOFxcXCJ9LmZhLWRpYW1vbmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjE5XFxcIn0uZmEtc2hpcDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMWFcXFwifS5mYS11c2VyLXNlY3JldDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMWJcXFwifS5mYS1tb3RvcmN5Y2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxY1xcXCJ9LmZhLXN0cmVldC12aWV3OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxZFxcXCJ9LmZhLWhlYXJ0YmVhdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMWVcXFwifS5mYS12ZW51czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMjFcXFwifS5mYS1tYXJzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIyMlxcXCJ9LmZhLW1lcmN1cnk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjIzXFxcIn0uZmEtaW50ZXJzZXg6YmVmb3JlLC5mYS10cmFuc2dlbmRlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMjRcXFwifS5mYS10cmFuc2dlbmRlci1hbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjI1XFxcIn0uZmEtdmVudXMtZG91YmxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIyNlxcXCJ9LmZhLW1hcnMtZG91YmxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIyN1xcXCJ9LmZhLXZlbnVzLW1hcnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjI4XFxcIn0uZmEtbWFycy1zdHJva2U6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjI5XFxcIn0uZmEtbWFycy1zdHJva2UtdjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMmFcXFwifS5mYS1tYXJzLXN0cm9rZS1oOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIyYlxcXCJ9LmZhLW5ldXRlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMmNcXFwifS5mYS1nZW5kZXJsZXNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIyZFxcXCJ9LmZhLWZhY2Vib29rLW9mZmljaWFsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzMFxcXCJ9LmZhLXBpbnRlcmVzdC1wOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzMVxcXCJ9LmZhLXdoYXRzYXBwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzMlxcXCJ9LmZhLXNlcnZlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMzNcXFwifS5mYS11c2VyLXBsdXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjM0XFxcIn0uZmEtdXNlci10aW1lczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMzVcXFwifS5mYS1ob3RlbDpiZWZvcmUsLmZhLWJlZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMzZcXFwifS5mYS12aWFjb2luOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzN1xcXCJ9LmZhLXRyYWluOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzOFxcXCJ9LmZhLXN1YndheTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMzlcXFwifS5mYS1tZWRpdW06YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjNhXFxcIn0uZmEteWM6YmVmb3JlLC5mYS15LWNvbWJpbmF0b3I6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjNiXFxcIn0uZmEtb3B0aW4tbW9uc3RlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyM2NcXFwifS5mYS1vcGVuY2FydDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyM2RcXFwifS5mYS1leHBlZGl0ZWRzc2w6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjNlXFxcIn0uZmEtYmF0dGVyeS00OmJlZm9yZSwuZmEtYmF0dGVyeTpiZWZvcmUsLmZhLWJhdHRlcnktZnVsbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNDBcXFwifS5mYS1iYXR0ZXJ5LTM6YmVmb3JlLC5mYS1iYXR0ZXJ5LXRocmVlLXF1YXJ0ZXJzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0MVxcXCJ9LmZhLWJhdHRlcnktMjpiZWZvcmUsLmZhLWJhdHRlcnktaGFsZjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNDJcXFwifS5mYS1iYXR0ZXJ5LTE6YmVmb3JlLC5mYS1iYXR0ZXJ5LXF1YXJ0ZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjQzXFxcIn0uZmEtYmF0dGVyeS0wOmJlZm9yZSwuZmEtYmF0dGVyeS1lbXB0eTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNDRcXFwifS5mYS1tb3VzZS1wb2ludGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0NVxcXCJ9LmZhLWktY3Vyc29yOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0NlxcXCJ9LmZhLW9iamVjdC1ncm91cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNDdcXFwifS5mYS1vYmplY3QtdW5ncm91cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNDhcXFwifS5mYS1zdGlja3ktbm90ZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNDlcXFwifS5mYS1zdGlja3ktbm90ZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0YVxcXCJ9LmZhLWNjLWpjYjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNGJcXFwifS5mYS1jYy1kaW5lcnMtY2x1YjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNGNcXFwifS5mYS1jbG9uZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNGRcXFwifS5mYS1iYWxhbmNlLXNjYWxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0ZVxcXCJ9LmZhLWhvdXJnbGFzcy1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1MFxcXCJ9LmZhLWhvdXJnbGFzcy0xOmJlZm9yZSwuZmEtaG91cmdsYXNzLXN0YXJ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1MVxcXCJ9LmZhLWhvdXJnbGFzcy0yOmJlZm9yZSwuZmEtaG91cmdsYXNzLWhhbGY6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjUyXFxcIn0uZmEtaG91cmdsYXNzLTM6YmVmb3JlLC5mYS1ob3VyZ2xhc3MtZW5kOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1M1xcXCJ9LmZhLWhvdXJnbGFzczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNTRcXFwifS5mYS1oYW5kLWdyYWItbzpiZWZvcmUsLmZhLWhhbmQtcm9jay1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1NVxcXCJ9LmZhLWhhbmQtc3RvcC1vOmJlZm9yZSwuZmEtaGFuZC1wYXBlci1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1NlxcXCJ9LmZhLWhhbmQtc2Npc3NvcnMtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNTdcXFwifS5mYS1oYW5kLWxpemFyZC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1OFxcXCJ9LmZhLWhhbmQtc3BvY2stbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNTlcXFwifS5mYS1oYW5kLXBvaW50ZXItbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNWFcXFwifS5mYS1oYW5kLXBlYWNlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjViXFxcIn0uZmEtdHJhZGVtYXJrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1Y1xcXCJ9LmZhLXJlZ2lzdGVyZWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjVkXFxcIn0uZmEtY3JlYXRpdmUtY29tbW9uczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNWVcXFwifS5mYS1nZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNjBcXFwifS5mYS1nZy1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjYxXFxcIn0uZmEtdHJpcGFkdmlzb3I6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjYyXFxcIn0uZmEtb2Rub2tsYXNzbmlraTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNjNcXFwifS5mYS1vZG5va2xhc3NuaWtpLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNjRcXFwifS5mYS1nZXQtcG9ja2V0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2NVxcXCJ9LmZhLXdpa2lwZWRpYS13OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2NlxcXCJ9LmZhLXNhZmFyaTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNjdcXFwifS5mYS1jaHJvbWU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjY4XFxcIn0uZmEtZmlyZWZveDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNjlcXFwifS5mYS1vcGVyYTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNmFcXFwifS5mYS1pbnRlcm5ldC1leHBsb3JlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNmJcXFwifS5mYS10djpiZWZvcmUsLmZhLXRlbGV2aXNpb246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjZjXFxcIn0uZmEtY29udGFvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2ZFxcXCJ9LmZhLTUwMHB4OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2ZVxcXCJ9LmZhLWFtYXpvbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNzBcXFwifS5mYS1jYWxlbmRhci1wbHVzLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjcxXFxcIn0uZmEtY2FsZW5kYXItbWludXMtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNzJcXFwifS5mYS1jYWxlbmRhci10aW1lcy1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI3M1xcXCJ9LmZhLWNhbGVuZGFyLWNoZWNrLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjc0XFxcIn0uZmEtaW5kdXN0cnk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjc1XFxcIn0uZmEtbWFwLXBpbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNzZcXFwifS5mYS1tYXAtc2lnbnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjc3XFxcIn0uZmEtbWFwLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjc4XFxcIn0uZmEtbWFwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI3OVxcXCJ9LmZhLWNvbW1lbnRpbmc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjdhXFxcIn0uZmEtY29tbWVudGluZy1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI3YlxcXCJ9LmZhLWhvdXp6OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI3Y1xcXCJ9LmZhLXZpbWVvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI3ZFxcXCJ9LmZhLWJsYWNrLXRpZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyN2VcXFwifS5mYS1mb250aWNvbnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjgwXFxcIn0uZmEtcmVkZGl0LWFsaWVuOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4MVxcXCJ9LmZhLWVkZ2U6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjgyXFxcIn0uZmEtY3JlZGl0LWNhcmQtYWx0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4M1xcXCJ9LmZhLWNvZGllcGllOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4NFxcXCJ9LmZhLW1vZHg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjg1XFxcIn0uZmEtZm9ydC1hd2Vzb21lOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4NlxcXCJ9LmZhLXVzYjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyODdcXFwifS5mYS1wcm9kdWN0LWh1bnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjg4XFxcIn0uZmEtbWl4Y2xvdWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjg5XFxcIn0uZmEtc2NyaWJkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4YVxcXCJ9LmZhLXBhdXNlLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOGJcXFwifS5mYS1wYXVzZS1jaXJjbGUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOGNcXFwifS5mYS1zdG9wLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOGRcXFwifS5mYS1zdG9wLWNpcmNsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4ZVxcXCJ9LmZhLXNob3BwaW5nLWJhZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOTBcXFwifS5mYS1zaG9wcGluZy1iYXNrZXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjkxXFxcIn0uZmEtaGFzaHRhZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOTJcXFwifS5mYS1ibHVldG9vdGg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjkzXFxcIn0uZmEtYmx1ZXRvb3RoLWI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjk0XFxcIn0uZmEtcGVyY2VudDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOTVcXFwifS5mYS1naXRsYWI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjk2XFxcIn0uZmEtd3BiZWdpbm5lcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOTdcXFwifS5mYS13cGZvcm1zOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5OFxcXCJ9LmZhLWVudmlyYTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOTlcXFwifS5mYS11bml2ZXJzYWwtYWNjZXNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5YVxcXCJ9LmZhLXdoZWVsY2hhaXItYWx0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5YlxcXCJ9LmZhLXF1ZXN0aW9uLWNpcmNsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5Y1xcXCJ9LmZhLWJsaW5kOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5ZFxcXCJ9LmZhLWF1ZGlvLWRlc2NyaXB0aW9uOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5ZVxcXCJ9LmZhLXZvbHVtZS1jb250cm9sLXBob25lOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhMFxcXCJ9LmZhLWJyYWlsbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmExXFxcIn0uZmEtYXNzaXN0aXZlLWxpc3RlbmluZy1zeXN0ZW1zOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhMlxcXCJ9LmZhLWFzbC1pbnRlcnByZXRpbmc6YmVmb3JlLC5mYS1hbWVyaWNhbi1zaWduLWxhbmd1YWdlLWludGVycHJldGluZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYTNcXFwifS5mYS1kZWFmbmVzczpiZWZvcmUsLmZhLWhhcmQtb2YtaGVhcmluZzpiZWZvcmUsLmZhLWRlYWY6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmE0XFxcIn0uZmEtZ2xpZGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmE1XFxcIn0uZmEtZ2xpZGUtZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYTZcXFwifS5mYS1zaWduaW5nOmJlZm9yZSwuZmEtc2lnbi1sYW5ndWFnZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYTdcXFwifS5mYS1sb3ctdmlzaW9uOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhOFxcXCJ9LmZhLXZpYWRlbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYTlcXFwifS5mYS12aWFkZW8tc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhYVxcXCJ9LmZhLXNuYXBjaGF0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhYlxcXCJ9LmZhLXNuYXBjaGF0LWdob3N0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhY1xcXCJ9LmZhLXNuYXBjaGF0LXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYWRcXFwifS5mYS1waWVkLXBpcGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhZVxcXCJ9LmZhLWZpcnN0LW9yZGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiMFxcXCJ9LmZhLXlvYXN0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiMVxcXCJ9LmZhLXRoZW1laXNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYjJcXFwifS5mYS1nb29nbGUtcGx1cy1jaXJjbGU6YmVmb3JlLC5mYS1nb29nbGUtcGx1cy1vZmZpY2lhbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYjNcXFwifS5mYS1mYTpiZWZvcmUsLmZhLWZvbnQtYXdlc29tZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYjRcXFwifS5mYS1oYW5kc2hha2UtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYjVcXFwifS5mYS1lbnZlbG9wZS1vcGVuOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiNlxcXCJ9LmZhLWVudmVsb3BlLW9wZW4tbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYjdcXFwifS5mYS1saW5vZGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmI4XFxcIn0uZmEtYWRkcmVzcy1ib29rOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiOVxcXCJ9LmZhLWFkZHJlc3MtYm9vay1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiYVxcXCJ9LmZhLXZjYXJkOmJlZm9yZSwuZmEtYWRkcmVzcy1jYXJkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiYlxcXCJ9LmZhLXZjYXJkLW86YmVmb3JlLC5mYS1hZGRyZXNzLWNhcmQtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYmNcXFwifS5mYS11c2VyLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYmRcXFwifS5mYS11c2VyLWNpcmNsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiZVxcXCJ9LmZhLXVzZXItbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYzBcXFwifS5mYS1pZC1iYWRnZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYzFcXFwifS5mYS1kcml2ZXJzLWxpY2Vuc2U6YmVmb3JlLC5mYS1pZC1jYXJkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjMlxcXCJ9LmZhLWRyaXZlcnMtbGljZW5zZS1vOmJlZm9yZSwuZmEtaWQtY2FyZC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjM1xcXCJ9LmZhLXF1b3JhOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjNFxcXCJ9LmZhLWZyZWUtY29kZS1jYW1wOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjNVxcXCJ9LmZhLXRlbGVncmFtOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjNlxcXCJ9LmZhLXRoZXJtb21ldGVyLTQ6YmVmb3JlLC5mYS10aGVybW9tZXRlcjpiZWZvcmUsLmZhLXRoZXJtb21ldGVyLWZ1bGw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmM3XFxcIn0uZmEtdGhlcm1vbWV0ZXItMzpiZWZvcmUsLmZhLXRoZXJtb21ldGVyLXRocmVlLXF1YXJ0ZXJzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjOFxcXCJ9LmZhLXRoZXJtb21ldGVyLTI6YmVmb3JlLC5mYS10aGVybW9tZXRlci1oYWxmOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjOVxcXCJ9LmZhLXRoZXJtb21ldGVyLTE6YmVmb3JlLC5mYS10aGVybW9tZXRlci1xdWFydGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjYVxcXCJ9LmZhLXRoZXJtb21ldGVyLTA6YmVmb3JlLC5mYS10aGVybW9tZXRlci1lbXB0eTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyY2JcXFwifS5mYS1zaG93ZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmNjXFxcIn0uZmEtYmF0aHR1YjpiZWZvcmUsLmZhLXMxNTpiZWZvcmUsLmZhLWJhdGg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmNkXFxcIn0uZmEtcG9kY2FzdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyY2VcXFwifS5mYS13aW5kb3ctbWF4aW1pemU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmQwXFxcIn0uZmEtd2luZG93LW1pbmltaXplOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJkMVxcXCJ9LmZhLXdpbmRvdy1yZXN0b3JlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJkMlxcXCJ9LmZhLXRpbWVzLXJlY3RhbmdsZTpiZWZvcmUsLmZhLXdpbmRvdy1jbG9zZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZDNcXFwifS5mYS10aW1lcy1yZWN0YW5nbGUtbzpiZWZvcmUsLmZhLXdpbmRvdy1jbG9zZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJkNFxcXCJ9LmZhLWJhbmRjYW1wOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJkNVxcXCJ9LmZhLWdyYXY6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmQ2XFxcIn0uZmEtZXRzeTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZDdcXFwifS5mYS1pbWRiOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJkOFxcXCJ9LmZhLXJhdmVscnk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmQ5XFxcIn0uZmEtZWVyY2FzdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZGFcXFwifS5mYS1taWNyb2NoaXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmRiXFxcIn0uZmEtc25vd2ZsYWtlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmRjXFxcIn0uZmEtc3VwZXJwb3dlcnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmRkXFxcIn0uZmEtd3BleHBsb3JlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZGVcXFwifS5mYS1tZWV0dXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmUwXFxcIn0uc3Itb25seXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7aGVpZ2h0OjFweDtwYWRkaW5nOjA7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgwLCAwLCAwLCAwKTtib3JkZXI6MH0uc3Itb25seS1mb2N1c2FibGU6YWN0aXZlLC5zci1vbmx5LWZvY3VzYWJsZTpmb2N1c3twb3NpdGlvbjpzdGF0aWM7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bzttYXJnaW46MDtvdmVyZmxvdzp2aXNpYmxlO2NsaXA6YXV0b31cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIEltcG9ydHNcbnZhciB1cmxFc2NhcGUgPSByZXF1aXJlKFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvdXJsLWVzY2FwZS5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzBfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vZm9udHMvcHJpbWVpY29ucy5lb3RcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMV9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9mb250cy9wcmltZWljb25zLmVvdFwiKSArIFwiPyNpZWZpeFwiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzJfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vZm9udHMvcHJpbWVpY29ucy50dGZcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fM19fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9mb250cy9wcmltZWljb25zLndvZmZcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fNF9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9mb250cy9wcmltZWljb25zLnN2Z1wiKSArIFwiPyNwcmltZWljb25zXCIpO1xuXG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogJ1ByaW1lSWNvbnMnO1xcbiAgICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMF9fXyArIFwiKTtcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzFfX18gKyBcIikgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLCB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzJfX18gKyBcIikgZm9ybWF0KCd0cnVldHlwZScpLCB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzNfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fNF9fXyArIFwiKSBmb3JtYXQoJ3N2ZycpO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbi5waSB7XFxuICAgIGZvbnQtZmFtaWx5OiAncHJpbWVpY29ucyc7XFxuICAgIHNwZWFrOiBub25lO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGZvbnQtdmFyaWFudDogbm9ybWFsO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gICAgbGluZS1oZWlnaHQ6IDE7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAgIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxufVxcblxcbi5waS1mdyB7XFxuICAgIHdpZHRoOiAxLjI4NTcxNDI5ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnBpLXNwaW4ge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmEtc3BpbiAycyBpbmZpbml0ZSBsaW5lYXI7XFxuICAgIGFuaW1hdGlvbjogZmEtc3BpbiAycyBpbmZpbml0ZSBsaW5lYXI7XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBmYS1zcGluIHtcXG4gICAgMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZhLXNwaW4ge1xcbiAgICAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xcbiAgICB9XFxufVxcblxcbi5waS1tb2JpbGU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTgyXFxcIjtcXG59XFxuXFxuLnBpLXRhYmxldDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5ODNcXFwiO1xcbn1cXG5cXG4ucGkta2V5OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk4MVxcXCI7XFxufVxcblxcbi5waS1zaG9wcGluZy1jYXJ0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk4MFxcXCI7XFxufVxcblxcbi5waS1jb21tZW50czpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5N2VcXFwiO1xcbn1cXG5cXG4ucGktY29tbWVudDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5N2ZcXFwiO1xcbn1cXG5cXG4ucGktYnJpZWZjYXNlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3ZFxcXCI7XFxufVxcblxcbi5waS1iZWxsOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3Y1xcXCI7XFxufVxcblxcbi5waS1wYXBlcmNsaXA6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTdiXFxcIjtcXG59XFxuXFxuLnBpLXNoYXJlLWFsdDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5N2FcXFwiO1xcbn1cXG5cXG4ucGktZW52ZWxvcGU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTc5XFxcIjtcXG59XFxuXFxuLnBpLXZvbHVtZS1kb3duOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3NlxcXCI7XFxufVxcblxcbi5waS12b2x1bWUtdXA6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTc3XFxcIjtcXG59XFxuXFxuLnBpLXZvbHVtZS1vZmY6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTc4XFxcIjtcXG59XFxuXFxuLnBpLWVqZWN0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3NVxcXCI7XFxufVxcblxcbi5waS1tb25leS1iaWxsOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3NFxcXCI7XFxufVxcblxcbi5waS1pbWFnZXM6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTczXFxcIjtcXG59XFxuXFxuLnBpLWltYWdlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3MlxcXCI7XFxufVxcblxcbi5waS1zaWduLWluOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3MFxcXCI7XFxufVxcblxcbi5waS1zaWduLW91dDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NzFcXFwiO1xcbn1cXG5cXG4ucGktd2lmaTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NmZcXFwiO1xcbn1cXG5cXG4ucGktc2l0ZW1hcDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NmVcXFwiO1xcbn1cXG5cXG4ucGktY2hhcnQtYmFyOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2ZFxcXCI7XFxufVxcblxcbi5waS1jYW1lcmE6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTZjXFxcIjtcXG59XFxuXFxuLnBpLWRvbGxhcjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NmJcXFwiO1xcbn1cXG5cXG4ucGktbG9jay1vcGVuOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2YVxcXCI7XFxufVxcblxcbi5waS10YWJsZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NjlcXFwiO1xcbn1cXG5cXG4ucGktbWFwLW1hcmtlcjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NjhcXFwiO1xcbn1cXG5cXG4ucGktbGlzdDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NjdcXFwiO1xcbn1cXG5cXG4ucGktZXllLXNsYXNoOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2NVxcXCI7XFxufVxcblxcbi5waS1leWU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTY2XFxcIjtcXG59XFxuXFxuLnBpLWZvbGRlci1vcGVuOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2NFxcXCI7XFxufVxcblxcbi5waS1mb2xkZXI6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTYzXFxcIjtcXG59XFxuXFxuLnBpLXZpZGVvOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2MlxcXCI7XFxufVxcblxcbi5waS1pbmJveDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NjFcXFwiO1xcbn1cXG5cXG4ucGktbG9jazpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NWZcXFwiO1xcbn1cXG5cXG4ucGktdW5sb2NrOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2MFxcXCI7XFxufVxcblxcbi5waS10YWdzOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1ZFxcXCI7XFxufVxcblxcbi5waS10YWc6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTVlXFxcIjtcXG59XFxuXFxuLnBpLXBvd2VyLW9mZjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NWNcXFwiO1xcbn1cXG5cXG4ucGktc2F2ZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NWJcXFwiO1xcbn1cXG5cXG4ucGktcXVlc3Rpb24tY2lyY2xlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1OVxcXCI7XFxufVxcblxcbi5waS1xdWVzdGlvbjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NWFcXFwiO1xcbn1cXG5cXG4ucGktY29weTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NTdcXFwiO1xcbn1cXG5cXG4ucGktZmlsZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NThcXFwiO1xcbn1cXG5cXG4ucGktY2xvbmU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTU1XFxcIjtcXG59XFxuXFxuLnBpLWNhbGVuZGFyLXRpbWVzOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1MlxcXCI7XFxufVxcblxcbi5waS1jYWxlbmRhci1taW51czpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NTNcXFwiO1xcbn1cXG5cXG4ucGktY2FsZW5kYXItcGx1czpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NTRcXFwiO1xcbn1cXG5cXG4ucGktZWxsaXBzaXMtdjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NTBcXFwiO1xcbn1cXG5cXG4ucGktZWxsaXBzaXMtaDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NTFcXFwiO1xcbn1cXG5cXG4ucGktYm9va21hcms6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTRlXFxcIjtcXG59XFxuXFxuLnBpLWdsb2JlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk0ZlxcXCI7XFxufVxcblxcbi5waS1yZXBsYXk6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTRkXFxcIjtcXG59XFxuXFxuLnBpLWZpbHRlcjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NGNcXFwiO1xcbn1cXG5cXG4ucGktcHJpbnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTRiXFxcIjtcXG59XFxuXFxuLnBpLWFsaWduLXJpZ2h0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk0NlxcXCI7XFxufVxcblxcbi5waS1hbGlnbi1sZWZ0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk0N1xcXCI7XFxufVxcblxcbi5waS1hbGlnbi1jZW50ZXI6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTQ4XFxcIjtcXG59XFxuXFxuLnBpLWFsaWduLWp1c3RpZnk6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTQ5XFxcIjtcXG59XFxuXFxuLnBpLWNvZzpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NGFcXFwiO1xcbn1cXG5cXG4ucGktY2xvdWQtZG93bmxvYWQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTQzXFxcIjtcXG59XFxuXFxuLnBpLWNsb3VkLXVwbG9hZDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NDRcXFwiO1xcbn1cXG5cXG4ucGktY2xvdWQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTQ1XFxcIjtcXG59XFxuXFxuLnBpLXBlbmNpbDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NDJcXFwiO1xcbn1cXG5cXG4ucGktdXNlcnM6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTQxXFxcIjtcXG59XFxuXFxuLnBpLWNsb2NrOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk0MFxcXCI7XFxufVxcblxcbi5waS11c2VyLW1pbnVzOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzZVxcXCI7XFxufVxcblxcbi5waS11c2VyLXBsdXM6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTNmXFxcIjtcXG59XFxuXFxuLnBpLXRyYXNoOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzZFxcXCI7XFxufVxcblxcbi5waS1leHRlcm5hbC1saW5rOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzY1xcXCI7XFxufVxcblxcbi5waS13aW5kb3ctbWF4aW1pemU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTNiXFxcIjtcXG59XFxuXFxuLnBpLXdpbmRvdy1taW5pbWl6ZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5M2FcXFwiO1xcbn1cXG5cXG4ucGktcmVmcmVzaDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MzhcXFwiO1xcbn1cXG4gIFxcbi5waS11c2VyOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzOVxcXCI7XFxufVxcblxcbi5waS1leGNsYW1hdGlvbi10cmlhbmdsZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjJcXFwiO1xcbn1cXG5cXG4ucGktY2FsZW5kYXI6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTI3XFxcIjtcXG59XFxuXFxuLnBpLWNoZXZyb24tY2lyY2xlLWxlZnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTI4XFxcIjtcXG59XFxuXFxuLnBpLWNoZXZyb24tY2lyY2xlLWRvd246YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTI5XFxcIjtcXG59XFxuXFxuLnBpLWNoZXZyb24tY2lyY2xlLXJpZ2h0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkyYVxcXCI7XFxufVxcblxcbi5waS1jaGV2cm9uLWNpcmNsZS11cDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MmJcXFwiO1xcbn1cXG5cXG4ucGktYW5nbGUtZG91YmxlLWRvd246YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTJjXFxcIjtcXG59XFxuXFxuLnBpLWFuZ2xlLWRvdWJsZS1sZWZ0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkyZFxcXCI7XFxufVxcblxcbi5waS1hbmdsZS1kb3VibGUtcmlnaHQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTJlXFxcIjtcXG59XFxuXFxuLnBpLWFuZ2xlLWRvdWJsZS11cDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MmZcXFwiO1xcbn1cXG5cXG4ucGktYW5nbGUtZG93bjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MzBcXFwiO1xcbn1cXG5cXG4ucGktYW5nbGUtbGVmdDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MzFcXFwiO1xcbn1cXG5cXG4ucGktYW5nbGUtcmlnaHQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTMyXFxcIjtcXG59XFxuXFxuLnBpLWFuZ2xlLXVwOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzM1xcXCI7XFxufVxcblxcbi5waS11cGxvYWQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTM0XFxcIjtcXG59XFxuXFxuLnBpLWRvd25sb2FkOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1NlxcXCI7XFxufVxcblxcbi5waS1iYW46YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTM1XFxcIjtcXG59XFxuXFxuLnBpLXN0YXItbzpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MzZcXFwiO1xcbn1cXG5cXG4ucGktc3RhcjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MzdcXFwiO1xcbn1cXG5cXG4ucGktY2hldnJvbi1sZWZ0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwMFxcXCI7XFxufVxcblxcbi5waS1jaGV2cm9uLXJpZ2h0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwMVxcXCI7XFxufVxcblxcbi5waS1jaGV2cm9uLWRvd246YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTAyXFxcIjtcXG59XFxuXFxuLnBpLWNoZXZyb24tdXA6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTAzXFxcIjtcXG59XFxuXFxuLnBpLWNhcmV0LWxlZnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTA0XFxcIjtcXG59XFxuXFxuLnBpLWNhcmV0LXJpZ2h0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwNVxcXCI7XFxufVxcblxcbi5waS1jYXJldC1kb3duOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwNlxcXCI7XFxufVxcblxcbi5waS1jYXJldC11cDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MDdcXFwiO1xcbn1cXG5cXG4ucGktc2VhcmNoOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwOFxcXCI7XFxufVxcblxcbi5waS1jaGVjazpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MDlcXFwiO1xcbn1cXG5cXG4ucGktY2hlY2stY2lyY2xlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwYVxcXCI7XFxufVxcblxcbi5waS10aW1lczpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MGJcXFwiO1xcbn1cXG5cXG4ucGktdGltZXMtY2lyY2xlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwY1xcXCI7XFxufVxcblxcbi5waS1wbHVzOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwZFxcXCI7XFxufVxcblxcbi5waS1wbHVzLWNpcmNsZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MGVcXFwiO1xcbn1cXG5cXG4ucGktbWludXM6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTBmXFxcIjtcXG59XFxuXFxuLnBpLW1pbnVzLWNpcmNsZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MTBcXFwiO1xcbn1cXG5cXG4ucGktY2lyY2xlLW9uOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkxMVxcXCI7XFxufVxcblxcbi5waS1jaXJjbGUtb2ZmOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkxMlxcXCI7XFxufVxcblxcbi5waS1zb3J0LWRvd246YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTEzXFxcIjtcXG59XFxuXFxuLnBpLXNvcnQtdXA6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTE0XFxcIjtcXG59XFxuXFxuLnBpLXNvcnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTE1XFxcIjtcXG59XFxuXFxuLnBpLXN0ZXAtYmFja3dhcmQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTE2XFxcIjtcXG59XFxuXFxuLnBpLXN0ZXAtZm9yd2FyZDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MTdcXFwiO1xcbn1cXG5cXG4ucGktdGgtbGFyZ2U6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTE4XFxcIjtcXG59XFxuXFxuLnBpLWFycm93LWRvd246YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTE5XFxcIjtcXG59XFxuXFxuLnBpLWFycm93LWxlZnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTFhXFxcIjtcXG59XFxuXFxuLnBpLWFycm93LXJpZ2h0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkxYlxcXCI7XFxufVxcblxcbi5waS1hcnJvdy11cDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MWNcXFwiO1xcbn1cXG5cXG4ucGktYmFyczpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MWRcXFwiO1xcbn1cXG5cXG4ucGktYXJyb3ctY2lyY2xlLWRvd246YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTFlXFxcIjtcXG59XFxuXFxuLnBpLWFycm93LWNpcmNsZS1sZWZ0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkxZlxcXCI7XFxufVxcblxcbi5waS1hcnJvdy1jaXJjbGUtcmlnaHQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTIwXFxcIjtcXG59XFxuXFxuLnBpLWFycm93LWNpcmNsZS11cDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjFcXFwiO1xcbn1cXG5cXG4ucGktaW5mbzpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjNcXFwiO1xcbn1cXG5cXG4ucGktaW5mby1jaXJjbGU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTI0XFxcIjtcXG59XFxuXFxuLnBpLWhvbWU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTI1XFxcIjtcXG59XFxuXFxuLnBpLXNwaW5uZXI6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTI2XFxcIjtcXG59XCIsIFwiXCJdKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudWktY2hrYm94IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBtYXJnaW4tcmlnaHQ6IC4yNWVtO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgfVxcblxcbi51aS1jaGtib3ggLnVpLWNoa2JveC1ib3gge1xcbiAgd2lkdGg6IDEuMTI1ZW07XFxuICBoZWlnaHQ6IDEuMTI1ZW07XFxuICBsaW5lLWhlaWdodDogMS4xMjVlbTtcXG4gIC1tb3otYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAycHg7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG4udWktY2hrYm94IC51aS1jaGtib3gtaWNvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi51aS1jaGtib3gtbGFiZWwge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnVpLWNoaXBzID4gdWwudWktaW5wdXR0ZXh0IHtcXG4gIGNsZWFyOiBsZWZ0O1xcbiAgY3Vyc29yOiB0ZXh0O1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgbWFyZ2luOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmc6IDAgLjI1ZW07IH1cXG5cXG4udWktY2hpcHMtdG9rZW4ge1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwYWRkaW5nOiAuMTI1ZW0gLjVlbTtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW4tcmlnaHQ6IC4xMjVlbTtcXG4gIGJvcmRlcjogMCBub25lO1xcbiAgZm9udC1zaXplOiAuOWVtOyB9XFxuXFxuLnVpLWNoaXBzLXRva2VuIC51aS1jaGlwcy10b2tlbi1sYWJlbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi1yaWdodDogMmVtOyB9XFxuXFxuLnVpLWNoaXBzID4gLnVpLXN0YXRlLWRpc2FibGVkIC51aS1jaGlwcy10b2tlbi1sYWJlbCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7IH1cXG5cXG4udWktY2hpcHMtdG9rZW4gLnVpLWNoaXBzLXRva2VuLWljb24ge1xcbiAgbWFyZ2luLXRvcDogLS41ZW07XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMC4yZW07XFxuICB0b3A6IDUwJTtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcblxcbi51aS1jaGlwcy1pbnB1dC10b2tlbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgbWFyZ2luOiAwIDAgMCAuMTI1ZW07XFxuICBwYWRkaW5nOiAuMjVlbSAuMjVlbSAuMjVlbSAwOyB9XFxuXFxuLnVpLWNoaXBzLWlucHV0LXRva2VuIGlucHV0IHtcXG4gIGJvcmRlcjogMCBub25lO1xcbiAgd2lkdGg6IDEwZW07XFxuICBvdXRsaW5lOiBtZWRpdW0gbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDA7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDA7XFxuICBib3JkZXItcmFkaXVzOiAwOyB9XFxuXCIsIFwiXCJdKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudWktbWVzc2FnZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZDtcXG4gIG1hcmdpbjogMHB4IC4yNWVtO1xcbiAgcGFkZGluZzogLjI1ZW0gLjVlbTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7IH1cXG5cXG4udWktbWVzc2FnZSAudWktbWVzc2FnZS1pY29uLFxcbi51aS1tZXNzYWdlIC51aS1tZXNzYWdlLXRleHQge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcblxcbi51aS1mbHVpZCAudWktbWVzc2FnZSB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIGxpZ2h0c2xpZGVyIC0gdjEuMS4zIC0gMjAxNS0wNC0xNFxcbiogaHR0cHM6Ly9naXRodWIuY29tL3NhY2hpbmNob29sdXIvbGlnaHRzbGlkZXJcXG4qIENvcHlyaWdodCAoYykgMjAxNSBTYWNoaW4gTjsgTGljZW5zZWQgTUlUICovXFxuLyoqIC8hISEgY29yZSBjc3MgU2hvdWxkIG5vdCBlZGl0ICEhIS8qKi9cXG4ubFNTbGlkZU91dGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuLmxpZ2h0U2xpZGVyOmJlZm9yZSxcXG4ubGlnaHRTbGlkZXI6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgZGlzcGxheTogdGFibGU7IH1cXG5cXG4ubGlnaHRTbGlkZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbjogMDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyID4gLmxpZ2h0U2xpZGVyOmFmdGVyIHtcXG4gIGNsZWFyOiBib3RoOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU1NsaWRlIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDFzO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OiAtd2Via2l0LXRyYW5zZm9ybSwgaGVpZ2h0O1xcbiAgLW1vei10cmFuc2l0aW9uLXByb3BlcnR5OiAtbW96LXRyYW5zZm9ybSwgaGVpZ2h0O1xcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtLCBoZWlnaHQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tZHVyYXRpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIgLmxTRmFkZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIgLmxTRmFkZSA+ICoge1xcbiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogOTtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyLnVzaW5nQ3NzIC5sU0ZhZGUgPiAqIHtcXG4gIG9wYWNpdHk6IDA7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6IDBzO1xcbiAgdHJhbnNpdGlvbi1kZWxheTogMHM7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tZHVyYXRpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogb3BhY2l0eTtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IG9wYWNpdHk7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50OyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU0ZhZGUgPiAqLmFjdGl2ZSB7XFxuICB6LWluZGV4OiAxMDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlci51c2luZ0NzcyAubFNGYWRlID4gKi5hY3RpdmUge1xcbiAgb3BhY2l0eTogMTsgfVxcblxcbi8qKiAvISEhIEVuZCBvZiBjb3JlIGNzcyBTaG91bGQgbm90IGVkaXQgISEhLyoqL1xcbi8qIFBhZ2VyICovXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnIHtcXG4gIG1hcmdpbjogMTBweCAwIDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGkge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZzogMCA1cHg7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTcGcgPiBsaSBhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIyMjI7XFxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgaGVpZ2h0OiA4cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgdGV4dC1pbmRlbnQ6IC05OTllbTtcXG4gIHdpZHRoOiA4cHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB6LWluZGV4OiA5OTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuNXMgbGluZWFyIDBzO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgbGluZWFyIDBzOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGk6aG92ZXIgYSxcXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTcGcgPiBsaS5hY3RpdmUgYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI4YmNhOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubWVkaWEge1xcbiAgb3BhY2l0eTogMC44OyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubWVkaWEuYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG4vKiBFbmQgb2YgcGFnZXIgKi9cXG4vKiogR2FsbGVyeSAqL1xcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmUgb3V0c2lkZSBub25lO1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcXG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IC13ZWJraXQtdHJhbnNmb3JtO1xcbiAgLW1vei10cmFuc2l0aW9uLXByb3BlcnR5OiAtbW96LXRyYW5zZm9ybTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeSBsaSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBib3JkZXItcmFkaXVzIDAuMTJzIGxpbmVhciAwcyAwLjM1cyBsaW5lYXIgMHM7XFxuICB0cmFuc2l0aW9uOiBib3JkZXItcmFkaXVzIDAuMTJzIGxpbmVhciAwcyAwLjM1cyBsaW5lYXIgMHM7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeSBsaS5hY3RpdmUsXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgbGk6aG92ZXIge1xcbiAgYm9yZGVyLXJhZGl1czogNXB4OyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgaW1nIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbWF4LXdpZHRoOiAxMDAlOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnk6YmVmb3JlLFxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnk6YWZ0ZXIge1xcbiAgY2xlYXI6IGJvdGg7IH1cXG5cXG4vKiBFbmQgb2YgR2FsbGVyeSovXFxuLyogc2xpZGVyIGFjdGlvbnMgKi9cXG4ubFNBY3Rpb24gPiBhIHtcXG4gIHdpZHRoOiAzMnB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB0b3A6IDUwJTtcXG4gIGhlaWdodDogMzJweDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiL2Fzc2V0cy9jb250cm9scy5wbmdcXFwiKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDk5O1xcbiAgbWFyZ2luLXRvcDogLTE2cHg7XFxuICBvcGFjaXR5OiAwLjU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC4zNXMgbGluZWFyIDBzO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjM1cyBsaW5lYXIgMHM7IH1cXG5cXG4ubFNBY3Rpb24gPiBhOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG4ubFNBY3Rpb24gPiAubFNQcmV2IHtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gIGxlZnQ6IDEwcHg7IH1cXG5cXG4ubFNBY3Rpb24gPiAubFNOZXh0IHtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IC0zMnB4IDA7XFxuICByaWdodDogMTBweDsgfVxcblxcbi5sU0FjdGlvbiA+IGEuZGlzYWJsZWQge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cXG5cXG4uY1MtaGlkZGVuIHtcXG4gIGhlaWdodDogMXB4O1xcbiAgb3BhY2l0eTogMDtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT0wKTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4vKiB2ZXJ0aWNhbCAqL1xcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbC5ub1BhZ2VyIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDBweCAhaW1wb3J0YW50OyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubFNHYWxsZXJ5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5saWdodFNsaWRlciA+ICoge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIG1heC13aWR0aDogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLyogdmVydGljYWwgY29udHJvbGxzICovXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubFNBY3Rpb24gPiBhIHtcXG4gIGxlZnQ6IDUwJTtcXG4gIG1hcmdpbi1sZWZ0OiAtMTRweDtcXG4gIG1hcmdpbi10b3A6IDA7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sU0FjdGlvbiA+IC5sU05leHQge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMzFweCAtMzFweDtcXG4gIGJvdHRvbTogMTBweDtcXG4gIHRvcDogYXV0bzsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxTQWN0aW9uID4gLmxTUHJldiB7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIC0zMXB4O1xcbiAgYm90dG9tOiBhdXRvO1xcbiAgdG9wOiAxMHB4OyB9XFxuXFxuLyogdmVydGljYWwgKi9cXG4vKiBSdGwgKi9cXG4ubFNTbGlkZU91dGVyLmxTcnRsIHtcXG4gIGRpcmVjdGlvbjogcnRsOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubGlnaHRTbGlkZXIsXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlciB7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBsaXN0LXN0eWxlOiBub25lIG91dHNpZGUgbm9uZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxpZ2h0U2xpZGVyLFxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxTUGFnZXIge1xcbiAgcGFkZGluZy1yaWdodDogMDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxpZ2h0U2xpZGVyID4gKixcXG4ubFNTbGlkZU91dGVyIC5sU0dhbGxlcnkgbGkge1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5saWdodFNsaWRlciA+ICosXFxuLmxTU2xpZGVPdXRlci5sU3J0bCAubFNHYWxsZXJ5IGxpIHtcXG4gIGZsb2F0OiByaWdodCAhaW1wb3J0YW50OyB9XFxuXFxuLyogUnRsICovXFxuQC13ZWJraXQta2V5ZnJhbWVzIHJpZ2h0RW5kIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDsgfVxcbiAgNTAlIHtcXG4gICAgbGVmdDogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHJpZ2h0RW5kIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDsgfVxcbiAgNTAlIHtcXG4gICAgbGVmdDogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAwOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgdG9wRW5kIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAwOyB9XFxuICA1MCUge1xcbiAgICB0b3A6IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHRvcEVuZCB7XFxuICAwJSB7XFxuICAgIHRvcDogMDsgfVxcbiAgNTAlIHtcXG4gICAgdG9wOiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIHRvcDogMDsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGxlZnRFbmQge1xcbiAgMCUge1xcbiAgICBsZWZ0OiAwOyB9XFxuICA1MCUge1xcbiAgICBsZWZ0OiAxNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBsZWZ0RW5kIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDsgfVxcbiAgNTAlIHtcXG4gICAgbGVmdDogMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGxlZnQ6IDA7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBib3R0b21FbmQge1xcbiAgMCUge1xcbiAgICBib3R0b206IDA7IH1cXG4gIDUwJSB7XFxuICAgIGJvdHRvbTogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBib3R0b206IDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgYm90dG9tRW5kIHtcXG4gIDAlIHtcXG4gICAgYm90dG9tOiAwOyB9XFxuICA1MCUge1xcbiAgICBib3R0b206IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgYm90dG9tOiAwOyB9IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5yaWdodEVuZCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogcmlnaHRFbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogcmlnaHRFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxlZnRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGxlZnRFbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogbGVmdEVuZCAwLjNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAucmlnaHRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHRvcEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiB0b3BFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxlZnRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGJvdHRvbUVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiBib3R0b21FbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLnJpZ2h0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBsZWZ0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IGxlZnRFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxlZnRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4vKi8gIEdSYWIgY3Vyc29yICovXFxuLmxpZ2h0U2xpZGVyLmxzR3JhYiA+ICoge1xcbiAgY3Vyc29yOiAtd2Via2l0LWdyYWI7XFxuICBjdXJzb3I6IC1tb3otZ3JhYjtcXG4gIGN1cnNvcjogLW8tZ3JhYjtcXG4gIGN1cnNvcjogLW1zLWdyYWI7XFxuICBjdXJzb3I6IGdyYWI7IH1cXG5cXG4ubGlnaHRTbGlkZXIubHNHcmFiYmluZyA+ICoge1xcbiAgY3Vyc29yOiBtb3ZlO1xcbiAgY3Vyc29yOiAtd2Via2l0LWdyYWJiaW5nO1xcbiAgY3Vyc29yOiAtbW96LWdyYWJiaW5nO1xcbiAgY3Vyc29yOiAtby1ncmFiYmluZztcXG4gIGN1cnNvcjogLW1zLWdyYWJiaW5nO1xcbiAgY3Vyc29yOiBncmFiYmluZzsgfVxcblxcbi8qIFRpbnkgQ2Fyb3VzZWwgKi9cXG4vKiBzbGlkZXJOZXcgKi9cXG4jc2xpZGVyTmV3IHtcXG4gIG1hcmdpbjogMCAwIDIwcHg7IH1cXG5cXG4jc2xpZGVyTmV3IC52aWV3cG9ydCB7XFxuICB3aWR0aDogMjQwcHg7XFxuICBoZWlnaHQ6IDEyNXB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuI3NsaWRlck5ldyAuYnVsbGV0cyB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIGNsZWFyOiBib3RoO1xcbiAgbWFyZ2luOiAwIDAgMCA0NXB4OyB9XFxuXFxuI3NsaWRlck5ldyAuYnVsbGV0cyBsaSB7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgY29sb3I6ICM1NTU1NTU7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuI3NsaWRlck5ldyAuYnVsbGV0LmFjdGl2ZSB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NTU1NTU7IH1cXG5cXG4jc2xpZGVyTmV3IC5idXR0b25zIHtcXG4gIGJhY2tncm91bmQ6ICNDMDEzMTM7XFxuICBib3JkZXItcmFkaXVzOiAzNXB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW46IDMwcHggMTBweCAwIDA7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAzNXB4O1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiAzNXB4O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZm9udC1zaXplOiAyMnB4OyB9XFxuXFxuI3NsaWRlck5ldyAubmV4dCB7XFxuICBtYXJnaW46IDMwcHggMCAwIDEwcHg7IH1cXG5cXG4jc2xpZGVyTmV3IC5idXR0b25zOmhvdmVyIHtcXG4gIGNvbG9yOiAjQzAxMzEzO1xcbiAgYmFja2dyb3VuZDogI2ZmZjsgfVxcblxcbiNzbGlkZXJOZXcgLmRpc2FibGUge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuOyB9XFxuXFxuI3NsaWRlck5ldyAub3ZlcnZpZXcge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7IH1cXG5cXG4jc2xpZGVyTmV3IC5vdmVydmlldyBsaSB7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbjogMCAyMHB4IDAgMDtcXG4gIHBhZGRpbmc6IDFweDtcXG4gIGhlaWdodDogMTIxcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2RjO1xcbiAgd2lkdGg6IDIzNnB4OyB9XFxuXCIsIFwiXCJdKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gSW1wb3J0c1xuZXhwb3J0cy5pKHJlcXVpcmUoXCItIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIXByaW1laWNvbnMvcHJpbWVpY29ucy5jc3NcIiksIFwiXCIpO1xuZXhwb3J0cy5pKHJlcXVpcmUoXCItIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIWZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcIiksIFwiXCIpO1xuXG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qISBsaWdodHNsaWRlciAtIHYxLjEuMyAtIDIwMTUtMDQtMTRcXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9zYWNoaW5jaG9vbHVyL2xpZ2h0c2xpZGVyXFxuKiBDb3B5cmlnaHQgKGMpIDIwMTUgU2FjaGluIE47IExpY2Vuc2VkIE1JVCAqL1xcbi8qKiAvISEhIGNvcmUgY3NzIFNob3VsZCBub3QgZWRpdCAhISEvKiovXFxuLmxTU2xpZGVPdXRlciB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcblxcbi5saWdodFNsaWRlcjpiZWZvcmUsXFxuLmxpZ2h0U2xpZGVyOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlOyB9XFxuXFxuLmxpZ2h0U2xpZGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDA7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciA+IC5saWdodFNsaWRlcjphZnRlciB7XFxuICBjbGVhcjogYm90aDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciAubFNTbGlkZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAxcztcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogLXdlYmtpdC10cmFuc2Zvcm0sIGhlaWdodDtcXG4gIC1tb3otdHJhbnNpdGlvbi1wcm9wZXJ0eTogLW1vei10cmFuc2Zvcm0sIGhlaWdodDtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zZm9ybSwgaGVpZ2h0O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50OyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU0ZhZGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU0ZhZGUgPiAqIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDk7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi5sU1NsaWRlV3JhcHBlci51c2luZ0NzcyAubFNGYWRlID4gKiB7XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OiAwcztcXG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IG9wYWNpdHk7XFxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciAubFNGYWRlID4gKi5hY3RpdmUge1xcbiAgei1pbmRleDogMTA7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIudXNpbmdDc3MgLmxTRmFkZSA+ICouYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG4vKiogLyEhISBFbmQgb2YgY29yZSBjc3MgU2hvdWxkIG5vdCBlZGl0ICEhIS8qKi9cXG4vKiBQYWdlciAqL1xcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyB7XFxuICBtYXJnaW46IDEwcHggMCAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyA+IGxpIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmc6IDAgNXB4OyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGkgYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyMjIyO1xcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGhlaWdodDogOHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRleHQtaW5kZW50OiAtOTk5ZW07XFxuICB3aWR0aDogOHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogOTk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjVzIGxpbmVhciAwcztcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGxpbmVhciAwczsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyA+IGxpOmhvdmVyIGEsXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGkuYWN0aXZlIGEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyOGJjYTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLm1lZGlhIHtcXG4gIG9wYWNpdHk6IDAuODsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLm1lZGlhLmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuLyogRW5kIG9mIHBhZ2VyICovXFxuLyoqIEdhbGxlcnkgKi9cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeSB7XFxuICBsaXN0LXN0eWxlOiBub25lIG91dHNpZGUgbm9uZTtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIG1hcmdpbjogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OiAtd2Via2l0LXRyYW5zZm9ybTtcXG4gIC1tb3otdHJhbnNpdGlvbi1wcm9wZXJ0eTogLW1vei10cmFuc2Zvcm07XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgbGkge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYm9yZGVyLXJhZGl1cyAwLjEycyBsaW5lYXIgMHMgMC4zNXMgbGluZWFyIDBzO1xcbiAgdHJhbnNpdGlvbjogYm9yZGVyLXJhZGl1cyAwLjEycyBsaW5lYXIgMHMgMC4zNXMgbGluZWFyIDBzOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgbGkuYWN0aXZlLFxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IGxpOmhvdmVyIHtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IGltZyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogYXV0bztcXG4gIG1heC13aWR0aDogMTAwJTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5OmJlZm9yZSxcXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICBkaXNwbGF5OiB0YWJsZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5OmFmdGVyIHtcXG4gIGNsZWFyOiBib3RoOyB9XFxuXFxuLyogRW5kIG9mIEdhbGxlcnkqL1xcbi8qIHNsaWRlciBhY3Rpb25zICovXFxuLmxTQWN0aW9uID4gYSB7XFxuICB3aWR0aDogMzJweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdG9wOiA1MCU7XFxuICBoZWlnaHQ6IDMycHg7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi9hc3NldHMvY29udHJvbHMucG5nXFxcIik7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiA5OTtcXG4gIG1hcmdpbi10b3A6IC0xNnB4O1xcbiAgb3BhY2l0eTogMC41O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMzVzIGxpbmVhciAwcztcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zNXMgbGluZWFyIDBzOyB9XFxuXFxuLmxTQWN0aW9uID4gYTpob3ZlciB7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuLmxTQWN0aW9uID4gLmxTUHJldiB7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICBsZWZ0OiAxMHB4OyB9XFxuXFxuLmxTQWN0aW9uID4gLmxTTmV4dCB7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMzJweCAwO1xcbiAgcmlnaHQ6IDEwcHg7IH1cXG5cXG4ubFNBY3Rpb24gPiBhLmRpc2FibGVkIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XFxuXFxuLmNTLWhpZGRlbiB7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG9wYWNpdHk6IDA7XFxuICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9MCk7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLyogdmVydGljYWwgKi9cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwubm9QYWdlciB7XFxuICBwYWRkaW5nLXJpZ2h0OiAwcHggIWltcG9ydGFudDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxTR2FsbGVyeSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubGlnaHRTbGlkZXIgPiAqIHtcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxuICBtYXgtd2lkdGg6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi8qIHZlcnRpY2FsIGNvbnRyb2xscyAqL1xcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxTQWN0aW9uID4gYSB7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogLTE0cHg7XFxuICBtYXJnaW4tdG9wOiAwOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubFNBY3Rpb24gPiAubFNOZXh0IHtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDMxcHggLTMxcHg7XFxuICBib3R0b206IDEwcHg7XFxuICB0b3A6IGF1dG87IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sU0FjdGlvbiA+IC5sU1ByZXYge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAtMzFweDtcXG4gIGJvdHRvbTogYXV0bztcXG4gIHRvcDogMTBweDsgfVxcblxcbi8qIHZlcnRpY2FsICovXFxuLyogUnRsICovXFxuLmxTU2xpZGVPdXRlci5sU3J0bCB7XFxuICBkaXJlY3Rpb246IHJ0bDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxpZ2h0U2xpZGVyLFxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZSBvdXRzaWRlIG5vbmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5saWdodFNsaWRlcixcXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5sU1BhZ2VyIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5saWdodFNsaWRlciA+ICosXFxuLmxTU2xpZGVPdXRlciAubFNHYWxsZXJ5IGxpIHtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuLmxTU2xpZGVPdXRlci5sU3J0bCAubGlnaHRTbGlkZXIgPiAqLFxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxTR2FsbGVyeSBsaSB7XFxuICBmbG9hdDogcmlnaHQgIWltcG9ydGFudDsgfVxcblxcbi8qIFJ0bCAqL1xcbkAtd2Via2l0LWtleWZyYW1lcyByaWdodEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyByaWdodEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMDsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHRvcEVuZCB7XFxuICAwJSB7XFxuICAgIHRvcDogMDsgfVxcbiAgNTAlIHtcXG4gICAgdG9wOiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIHRvcDogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyB0b3BFbmQge1xcbiAgMCUge1xcbiAgICB0b3A6IDA7IH1cXG4gIDUwJSB7XFxuICAgIHRvcDogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICB0b3A6IDA7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBsZWZ0RW5kIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDsgfVxcbiAgNTAlIHtcXG4gICAgbGVmdDogMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGxlZnQ6IDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgbGVmdEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IDE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAwOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYm90dG9tRW5kIHtcXG4gIDAlIHtcXG4gICAgYm90dG9tOiAwOyB9XFxuICA1MCUge1xcbiAgICBib3R0b206IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgYm90dG9tOiAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdHRvbUVuZCB7XFxuICAwJSB7XFxuICAgIGJvdHRvbTogMDsgfVxcbiAgNTAlIHtcXG4gICAgYm90dG9tOiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGJvdHRvbTogMDsgfSB9XFxuXFxuLmxTU2xpZGVPdXRlciAucmlnaHRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sZWZ0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBsZWZ0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IGxlZnRFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLnJpZ2h0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiB0b3BFbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogdG9wRW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sZWZ0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBib3R0b21FbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogYm90dG9tRW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5yaWdodEVuZCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogbGVmdEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiBsZWZ0RW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5sZWZ0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiByaWdodEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiByaWdodEVuZCAwLjNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLyovICBHUmFiIGN1cnNvciAqL1xcbi5saWdodFNsaWRlci5sc0dyYWIgPiAqIHtcXG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiO1xcbiAgY3Vyc29yOiAtbW96LWdyYWI7XFxuICBjdXJzb3I6IC1vLWdyYWI7XFxuICBjdXJzb3I6IC1tcy1ncmFiO1xcbiAgY3Vyc29yOiBncmFiOyB9XFxuXFxuLmxpZ2h0U2xpZGVyLmxzR3JhYmJpbmcgPiAqIHtcXG4gIGN1cnNvcjogbW92ZTtcXG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiYmluZztcXG4gIGN1cnNvcjogLW1vei1ncmFiYmluZztcXG4gIGN1cnNvcjogLW8tZ3JhYmJpbmc7XFxuICBjdXJzb3I6IC1tcy1ncmFiYmluZztcXG4gIGN1cnNvcjogZ3JhYmJpbmc7IH1cXG5cXG4vKiBUaW55IENhcm91c2VsICovXFxuLyogc2xpZGVyTmV3ICovXFxuI3NsaWRlck5ldyB7XFxuICBtYXJnaW46IDAgMCAyMHB4OyB9XFxuXFxuI3NsaWRlck5ldyAudmlld3BvcnQge1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgaGVpZ2h0OiAxMjVweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldHMge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBjbGVhcjogYm90aDtcXG4gIG1hcmdpbjogMCAwIDAgNDVweDsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldHMgbGkge1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4jc2xpZGVyTmV3IC5idWxsZXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGNvbG9yOiAjNTU1NTU1O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldC5hY3RpdmUge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1NTU1OyB9XFxuXFxuI3NsaWRlck5ldyAuYnV0dG9ucyB7XFxuICBiYWNrZ3JvdW5kOiAjQzAxMzEzO1xcbiAgYm9yZGVyLXJhZGl1czogMzVweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiAzMHB4IDEwcHggMCAwO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMzVweDtcXG4gIGhlaWdodDogMzVweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsaW5lLWhlaWdodDogMzVweDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMjJweDsgfVxcblxcbiNzbGlkZXJOZXcgLm5leHQge1xcbiAgbWFyZ2luOiAzMHB4IDAgMCAxMHB4OyB9XFxuXFxuI3NsaWRlck5ldyAuYnV0dG9uczpob3ZlciB7XFxuICBjb2xvcjogI0MwMTMxMztcXG4gIGJhY2tncm91bmQ6ICNmZmY7IH1cXG5cXG4jc2xpZGVyTmV3IC5kaXNhYmxlIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjsgfVxcblxcbiNzbGlkZXJOZXcgLm92ZXJ2aWV3IHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMjQwcHg7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuI3NsaWRlck5ldyAub3ZlcnZpZXcgbGkge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW46IDAgMjBweCAwIDA7XFxuICBwYWRkaW5nOiAxcHg7XFxuICBoZWlnaHQ6IDEyMXB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNkYztcXG4gIHdpZHRoOiAyMzZweDsgfVxcblxcbi51aS13aWRnZXQsIC51aS13aWRnZXQgKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuLnVpLWhlbHBlci1oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZSB7XFxuICBib3JkZXI6IDA7XFxuICBjbGlwOiByZWN0KDAgMCAwIDApO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBtYXJnaW46IC0xcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxcHg7IH1cXG5cXG4udWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlIGlucHV0LFxcbi51aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGUgc2VsZWN0IHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cXG5cXG4udWktaGVscGVyLXJlc2V0IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBvdXRsaW5lOiAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuMztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG4udWktaGVscGVyLWNsZWFyZml4OjpiZWZvcmUsXFxuLnVpLWhlbHBlci1jbGVhcmZpeDo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBkaXNwbGF5OiB0YWJsZTsgfVxcblxcbi51aS1oZWxwZXItY2xlYXJmaXg6OmFmdGVyIHtcXG4gIGNsZWFyOiBib3RoOyB9XFxuXFxuLnVpLWhlbHBlci1jbGVhcmZpeCB7XFxuICB6b29tOiAxOyB9XFxuXFxuLnVpLWhlbHBlci16Zml4IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG9wYWNpdHk6IDA7XFxuICBmaWx0ZXI6IEFscGhhKE9wYWNpdHk9MCk7IH1cXG5cXG4udWktc3RhdGUtZGlzYWJsZWQge1xcbiAgY3Vyc29yOiBkZWZhdWx0ICFpbXBvcnRhbnQ7IH1cXG5cXG4udWktc3RhdGUtZGlzYWJsZWQgYSB7XFxuICBjdXJzb3I6IGRlZmF1bHQgIWltcG9ydGFudDsgfVxcblxcbi51aS1pY29uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdGV4dC1pbmRlbnQ6IC05OTk5OXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IH1cXG5cXG4udWktd2lkZ2V0LW92ZXJsYXkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLnVpLXJlc2l6YWJsZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4udWktcmVzaXphYmxlLWhhbmRsZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBmb250LXNpemU6IDAuMXB4O1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG4udWktcmVzaXphYmxlLWRpc2FibGVkIC51aS1yZXNpemFibGUtaGFuZGxlLFxcbi51aS1yZXNpemFibGUtYXV0b2hpZGUgLnVpLXJlc2l6YWJsZS1oYW5kbGUge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi51aS1yZXNpemFibGUtbiB7XFxuICBjdXJzb3I6IG4tcmVzaXplO1xcbiAgaGVpZ2h0OiA3cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRvcDogLTVweDtcXG4gIGxlZnQ6IDA7IH1cXG5cXG4udWktcmVzaXphYmxlLXMge1xcbiAgY3Vyc29yOiBzLXJlc2l6ZTtcXG4gIGhlaWdodDogN3B4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3R0b206IC01cHg7XFxuICBsZWZ0OiAwOyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1lIHtcXG4gIGN1cnNvcjogZS1yZXNpemU7XFxuICB3aWR0aDogN3B4O1xcbiAgcmlnaHQ6IC01cHg7XFxuICB0b3A6IDA7XFxuICBoZWlnaHQ6IDEwMCU7IH1cXG5cXG4udWktcmVzaXphYmxlLXcge1xcbiAgY3Vyc29yOiB3LXJlc2l6ZTtcXG4gIHdpZHRoOiA3cHg7XFxuICBsZWZ0OiAtNXB4O1xcbiAgdG9wOiAwO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1zZSB7XFxuICBjdXJzb3I6IHNlLXJlc2l6ZTtcXG4gIHdpZHRoOiAxMnB4O1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgcmlnaHQ6IDFweDtcXG4gIGJvdHRvbTogMXB4OyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1zdyB7XFxuICBjdXJzb3I6IHN3LXJlc2l6ZTtcXG4gIHdpZHRoOiA5cHg7XFxuICBoZWlnaHQ6IDlweDtcXG4gIGxlZnQ6IC01cHg7XFxuICBib3R0b206IC01cHg7IH1cXG5cXG4udWktcmVzaXphYmxlLW53IHtcXG4gIGN1cnNvcjogbnctcmVzaXplO1xcbiAgd2lkdGg6IDlweDtcXG4gIGhlaWdodDogOXB4O1xcbiAgbGVmdDogLTVweDtcXG4gIHRvcDogLTVweDsgfVxcblxcbi51aS1yZXNpemFibGUtbmUge1xcbiAgY3Vyc29yOiBuZS1yZXNpemU7XFxuICB3aWR0aDogOXB4O1xcbiAgaGVpZ2h0OiA5cHg7XFxuICByaWdodDogLTVweDtcXG4gIHRvcDogLTVweDsgfVxcblxcbi51aS1zaGFkb3cge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMXB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgLW1vei1ib3gtc2hhZG93OiAwcHggMXB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4zKTsgfVxcblxcbi51aS11bnNlbGVjdGFibGUtdGV4dCB7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1vLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cXG5cXG4udWktc2Nyb2xsYmFyLW1lYXN1cmUge1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIG92ZXJmbG93OiBzY3JvbGw7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IC05OTk5cHg7IH1cXG5cXG4udWktb3ZlcmZsb3ctaGlkZGVuIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogV2ViS2l0LCBCbGluaywgRWRnZSAqL1xcbiAgY29sb3I6ICM4OTg5ODk7IH1cXG5cXG46LW1vei1wbGFjZWhvbGRlciB7XFxuICAvKiBNb3ppbGxhIEZpcmVmb3ggNCB0byAxOCAqL1xcbiAgY29sb3I6ICM4OTg5ODk7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuOjotbW96LXBsYWNlaG9sZGVyIHtcXG4gIC8qIE1vemlsbGEgRmlyZWZveCAxOSsgKi9cXG4gIGNvbG9yOiAjODk4OTg5O1xcbiAgb3BhY2l0eTogMTsgfVxcblxcbjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTAtMTEgKi9cXG4gIGNvbG9yOiAjODk4OTg5OyB9XFxuXFxuOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogTWljcm9zb2Z0IEVkZ2UgKi9cXG4gIGNvbG9yOiAjODk4OTg5OyB9XFxuXFxuLnVpLXBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjODk4OTg5OyB9XFxuXFxuaW5wdXRbdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuaW5wdXRbdHlwZT1cXFwic3VibWl0XFxcIl0sXFxuaW5wdXRbdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5pbnB1dFt0eXBlPVxcXCJmaWxlXFxcIl06Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uLFxcbmJ1dHRvbiB7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDA7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDA7XFxuICBib3JkZXItcmFkaXVzOiAwOyB9XFxuXFxuLnVpLXdpZGdldCwgLnVpLXdpZGdldCAqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG4udWktaGVscGVyLWhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4udWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlIHtcXG4gIGJvcmRlcjogMDtcXG4gIGNsaXA6IHJlY3QoMCAwIDAgMCk7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG1hcmdpbjogLTFweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwYWRkaW5nOiAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDFweDsgfVxcblxcbi51aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGUgaW5wdXQsXFxuLnVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZSBzZWxlY3Qge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxcblxcbi51aS1oZWxwZXItcmVzZXQge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIG91dGxpbmU6IDA7XFxuICBsaW5lLWhlaWdodDogMS4zO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbi51aS1oZWxwZXItY2xlYXJmaXg6OmJlZm9yZSxcXG4udWktaGVscGVyLWNsZWFyZml4OjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlOyB9XFxuXFxuLnVpLWhlbHBlci1jbGVhcmZpeDo6YWZ0ZXIge1xcbiAgY2xlYXI6IGJvdGg7IH1cXG5cXG4udWktaGVscGVyLWNsZWFyZml4IHtcXG4gIHpvb206IDE7IH1cXG5cXG4udWktaGVscGVyLXpmaXgge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgb3BhY2l0eTogMDtcXG4gIGZpbHRlcjogQWxwaGEoT3BhY2l0eT0wKTsgfVxcblxcbi51aS1zdGF0ZS1kaXNhYmxlZCB7XFxuICBjdXJzb3I6IGRlZmF1bHQgIWltcG9ydGFudDsgfVxcblxcbi51aS1zdGF0ZS1kaXNhYmxlZCBhIHtcXG4gIGN1cnNvcjogZGVmYXVsdCAhaW1wb3J0YW50OyB9XFxuXFxuLnVpLWljb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB0ZXh0LWluZGVudDogLTk5OTk5cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgfVxcblxcbi51aS13aWRnZXQtb3ZlcmxheSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7IH1cXG5cXG4udWktcmVzaXphYmxlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi51aS1yZXNpemFibGUtaGFuZGxlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGZvbnQtc2l6ZTogMC4xcHg7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi51aS1yZXNpemFibGUtZGlzYWJsZWQgLnVpLXJlc2l6YWJsZS1oYW5kbGUsXFxuLnVpLXJlc2l6YWJsZS1hdXRvaGlkZSAudWktcmVzaXphYmxlLWhhbmRsZSB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1uIHtcXG4gIGN1cnNvcjogbi1yZXNpemU7XFxuICBoZWlnaHQ6IDdweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdG9wOiAtNXB4O1xcbiAgbGVmdDogMDsgfVxcblxcbi51aS1yZXNpemFibGUtcyB7XFxuICBjdXJzb3I6IHMtcmVzaXplO1xcbiAgaGVpZ2h0OiA3cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvdHRvbTogLTVweDtcXG4gIGxlZnQ6IDA7IH1cXG5cXG4udWktcmVzaXphYmxlLWUge1xcbiAgY3Vyc29yOiBlLXJlc2l6ZTtcXG4gIHdpZHRoOiA3cHg7XFxuICByaWdodDogLTVweDtcXG4gIHRvcDogMDtcXG4gIGhlaWdodDogMTAwJTsgfVxcblxcbi51aS1yZXNpemFibGUtdyB7XFxuICBjdXJzb3I6IHctcmVzaXplO1xcbiAgd2lkdGg6IDdweDtcXG4gIGxlZnQ6IC01cHg7XFxuICB0b3A6IDA7XFxuICBoZWlnaHQ6IDEwMCU7IH1cXG5cXG4udWktcmVzaXphYmxlLXNlIHtcXG4gIGN1cnNvcjogc2UtcmVzaXplO1xcbiAgd2lkdGg6IDEycHg7XFxuICBoZWlnaHQ6IDEycHg7XFxuICByaWdodDogMXB4O1xcbiAgYm90dG9tOiAxcHg7IH1cXG5cXG4udWktcmVzaXphYmxlLXN3IHtcXG4gIGN1cnNvcjogc3ctcmVzaXplO1xcbiAgd2lkdGg6IDlweDtcXG4gIGhlaWdodDogOXB4O1xcbiAgbGVmdDogLTVweDtcXG4gIGJvdHRvbTogLTVweDsgfVxcblxcbi51aS1yZXNpemFibGUtbncge1xcbiAgY3Vyc29yOiBudy1yZXNpemU7XFxuICB3aWR0aDogOXB4O1xcbiAgaGVpZ2h0OiA5cHg7XFxuICBsZWZ0OiAtNXB4O1xcbiAgdG9wOiAtNXB4OyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1uZSB7XFxuICBjdXJzb3I6IG5lLXJlc2l6ZTtcXG4gIHdpZHRoOiA5cHg7XFxuICBoZWlnaHQ6IDlweDtcXG4gIHJpZ2h0OiAtNXB4O1xcbiAgdG9wOiAtNXB4OyB9XFxuXFxuLnVpLXNoYWRvdyB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAxcHggM3B4IDBweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICAtbW96LWJveC1zaGFkb3c6IDBweCAxcHggM3B4IDBweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBib3gtc2hhZG93OiAwcHggMXB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjMpOyB9XFxuXFxuLnVpLXVuc2VsZWN0YWJsZS10ZXh0IHtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW8tdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcblxcbi51aS1zY3JvbGxiYXItbWVhc3VyZSB7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogLTk5OTlweDsgfVxcblxcbi51aS1vdmVyZmxvdy1oaWRkZW4ge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblxcbjo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAvKiBXZWJLaXQsIEJsaW5rLCBFZGdlICovXFxuICBjb2xvcjogIzg5ODk4OTsgfVxcblxcbjotbW96LXBsYWNlaG9sZGVyIHtcXG4gIC8qIE1vemlsbGEgRmlyZWZveCA0IHRvIDE4ICovXFxuICBjb2xvcjogIzg5ODk4OTtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG46Oi1tb3otcGxhY2Vob2xkZXIge1xcbiAgLyogTW96aWxsYSBGaXJlZm94IDE5KyAqL1xcbiAgY29sb3I6ICM4OTg5ODk7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAvKiBJbnRlcm5ldCBFeHBsb3JlciAxMC0xMSAqL1xcbiAgY29sb3I6ICM4OTg5ODk7IH1cXG5cXG46Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAvKiBNaWNyb3NvZnQgRWRnZSAqL1xcbiAgY29sb3I6ICM4OTg5ODk7IH1cXG5cXG4udWktcGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICM4OTg5ODk7IH1cXG5cXG5pbnB1dFt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5pbnB1dFt0eXBlPVxcXCJzdWJtaXRcXFwiXSxcXG5pbnB1dFt0eXBlPVxcXCJyZXNldFxcXCJdLFxcbmlucHV0W3R5cGU9XFxcImZpbGVcXFwiXTo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24sXFxuYnV0dG9uIHtcXG4gIC1tb3otYm9yZGVyLXJhZGl1czogMDtcXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDA7IH1cXG5cXG4vKiBCdXR0b24gKi9cXG4udWktYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDA7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHpvb206IDE7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gIC8qIHRoZSBvdmVyZmxvdyBwcm9wZXJ0eSByZW1vdmVzIGV4dHJhIHdpZHRoIGluIElFICovIH1cXG5cXG5wLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG4vKmJ1dHRvbiB0ZXh0IGVsZW1lbnQgKi9cXG4udWktYnV0dG9uIC51aS1idXR0b24tdGV4dCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7IH1cXG5cXG4udWktYnV0dG9uLXRleHQtb25seSAudWktYnV0dG9uLXRleHQge1xcbiAgcGFkZGluZzogLjI1ZW0gMWVtOyB9XFxuXFxuLnVpLWJ1dHRvbi1pY29uLW9ubHkgLnVpLWJ1dHRvbi10ZXh0LFxcbi51aS1idXR0b24tdGV4dC1lbXB0eSAudWktYnV0dG9uLXRleHQge1xcbiAgcGFkZGluZzogLjI1ZW07XFxuICB0ZXh0LWluZGVudDogLTk5OTk5OTlweDsgfVxcblxcbi51aS1idXR0b24tdGV4dC1pY29uLWxlZnQgLnVpLWJ1dHRvbi10ZXh0IHtcXG4gIHBhZGRpbmc6IC4yNWVtIDFlbSAuMjVlbSAyLjFlbTsgfVxcblxcbi51aS1idXR0b24tdGV4dC1pY29uLXJpZ2h0IC51aS1idXR0b24tdGV4dCB7XFxuICBwYWRkaW5nOiAuMjVlbSAyLjFlbSAuMjVlbSAxZW07IH1cXG5cXG4vKmJ1dHRvbiBpY29uIGVsZW1lbnQocykgKi9cXG4udWktYnV0dG9uLWljb24tb25seSAudWktYnV0dG9uLWljb24tbGVmdCxcXG4udWktYnV0dG9uLXRleHQtaWNvbi1sZWZ0IC51aS1idXR0b24taWNvbi1sZWZ0LFxcbi51aS1idXR0b24tdGV4dC1pY29uLXJpZ2h0IC51aS1idXR0b24taWNvbi1yaWdodCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIG1hcmdpbi10b3A6IC0uNWVtO1xcbiAgaGVpZ2h0OiAxZW07IH1cXG5cXG4udWktYnV0dG9uLWljb24tb25seSAudWktYnV0dG9uLWljb24tbGVmdCB7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIG1hcmdpbi10b3A6IC0uNWVtO1xcbiAgbWFyZ2luLWxlZnQ6IC0uNWVtO1xcbiAgd2lkdGg6IDFlbTtcXG4gIGhlaWdodDogMWVtOyB9XFxuXFxuLnVpLWJ1dHRvbi1pY29uLWxlZnQge1xcbiAgbGVmdDogLjVlbTsgfVxcblxcbi51aS1idXR0b24taWNvbi1yaWdodCB7XFxuICByaWdodDogLjVlbTsgfVxcblxcbi8qYnV0dG9uIHNldHMqL1xcbi51aS1idXR0b25zZXQgLnVpLWJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogMDtcXG4gIG1hcmdpbi1yaWdodDogMDsgfVxcblxcbi8qIHdvcmthcm91bmRzICovXFxuYnV0dG9uLnVpLWJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXI6IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgLyogcmVzZXQgZXh0cmEgcGFkZGluZyBpbiBGaXJlZm94ICovIH1cXG5cXG4vKiogRmx1aWQgKiovXFxuLnVpLWZsdWlkIC51aS1idXR0b24ge1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4udWktZmx1aWQgLnVpLWJ1dHRvbi10ZXh0LWljb24tbGVmdCAudWktYnV0dG9uLXRleHQsXFxuLnVpLWZsdWlkIC51aS1idXR0b24tdGV4dC1pY29uLXJpZ2h0IC51aS1idXR0b24tdGV4dCB7XFxuICBwYWRkaW5nLWxlZnQ6IDFlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDFlbTsgfVxcblxcbi8qKiBCdXR0b25TZXQgKiovXFxuLnVpLWZsdWlkIC51aS1idXR0b25zZXQge1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4udWktZmx1aWQgLnVpLWJ1dHRvbnNldC51aS1idXR0b25zZXQtMSAudWktYnV0dG9uIHtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTIgLnVpLWJ1dHRvbiB7XFxuICB3aWR0aDogNTAlOyB9XFxuXFxuLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTMgLnVpLWJ1dHRvbiB7XFxuICB3aWR0aDogMzMuMyU7IH1cXG5cXG4udWktZmx1aWQgLnVpLWJ1dHRvbnNldC51aS1idXR0b25zZXQtNCAudWktYnV0dG9uIHtcXG4gIHdpZHRoOiAyNSU7IH1cXG5cXG4udWktZmx1aWQgLnVpLWJ1dHRvbnNldC51aS1idXR0b25zZXQtNSAudWktYnV0dG9uIHtcXG4gIHdpZHRoOiAyMCU7IH1cXG5cXG4udWktZmx1aWQgLnVpLWJ1dHRvbnNldC51aS1idXR0b25zZXQtNiAudWktYnV0dG9uIHtcXG4gIHdpZHRoOiAxNi42JTsgfVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2NDBweCkge1xcbiAgLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTEgLnVpLWJ1dHRvbixcXG4gIC51aS1mbHVpZCAudWktYnV0dG9uc2V0LnVpLWJ1dHRvbnNldC0yIC51aS1idXR0b24sXFxuICAudWktZmx1aWQgLnVpLWJ1dHRvbnNldC51aS1idXR0b25zZXQtMyAudWktYnV0dG9uLFxcbiAgLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTQgLnVpLWJ1dHRvbixcXG4gIC51aS1mbHVpZCAudWktYnV0dG9uc2V0LnVpLWJ1dHRvbnNldC01IC51aS1idXR0b24sXFxuICAudWktZmx1aWQgLnVpLWJ1dHRvbnNldC51aS1idXR0b25zZXQtNiAudWktYnV0dG9uIHtcXG4gICAgd2lkdGg6IDEwMCU7IH0gfVxcblxcbmNlLWNoZWNrYm94IHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cXG5cXG5jZS1sYWJlbCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIG1hcmdpbi1sZWZ0OiA4cHg7IH1cXG5cXG5jZS1hY2NvcmRpb24taGVhZGluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrOyB9XFxuXFxuY2UtYWNjb3JkaW9uLWhlYWRpbmcgKyBjZS1hY2NvcmRpb24taGVhZGluZyB7XFxuICBib3JkZXItdG9wOiBub25lOyB9XFxuXFxuY2UtYWNjb3JkaW9uLWhlYWRpbmdbZXhwYW5kZWRdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTsgfVxcblxcbmNlLWFjY29yZGlvbi1wYW5lbCB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5OyB9XFxuXFxuY2UtdGFiIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgcGFkZGluZzogMjBweDsgfVxcblxcbmNlLXRhYi1wYW5lbCB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5OyB9XFxuXFxuY2UtdGFiW3NlbGVjdGVkXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7IH1cXG5cXG5jZS10YWJzOm5vdCg6ZGVmaW5lZCksXFxuY2UtdGFiOm5vdCg6ZGVmaW5lZCksXFxuY2UtdGFiLXBhbmVsOm5vdCg6ZGVmaW5lZCkge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5jZS10b2dnbGUtYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XFxuICBwYWRkaW5nOiAzcHg7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4ycyBlYXNlOyB9XFxuXFxuY2UtdG9nZ2xlLWJ1dHRvbltwcmVzc2VkXSxcXG5jZS10b2dnbGUtYnV0dG9uOm5vdChbZGlzYWJsZWRdKTphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTsgfVxcblxcbmNlLXRvZ2dsZS1idXR0b25bZGlzYWJsZWRdIHtcXG4gIG9wYWNpdHk6IDAuMzU7IH1cXG5cXG5odG1sLCBib2R5IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7IH1cXG4gIGh0bWwgKiwgYm9keSAqIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblxcbi51aS1kZW1vIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuICAudWktZGVtbyAuc2lkZW5hdiB7XFxuICAgIGZsZXgtYmFzaXM6IDMwMHB4O1xcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMyk7IH1cXG4gIC51aS1kZW1vIC5jb250ZW50IHtcXG4gICAgZmxleDogMTtcXG4gICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAyMHB4OyB9XFxuXFxudWktcm91dGVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4udWktZWxlbWVudHMge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7IH1cXG4gIC51aS1lbGVtZW50c19faXRlbSB7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xcbiAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC4zcyBsaW5lYXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgICAudWktZWxlbWVudHNfX2l0ZW0gYSB7XFxuICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICB3aWR0aDogMTAwJTsgfVxcbiAgICAudWktZWxlbWVudHNfX2l0ZW06aG92ZXIge1xcbiAgICAgIGJveC1zaGFkb3c6IDBweCAxcHggOHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmZjsgfVxcbiAgICAgIC51aS1lbGVtZW50c19faXRlbTpob3ZlcjpiZWZvcmUge1xcbiAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDA7XFxuICAgICAgICBib3R0b206IDA7XFxuICAgICAgICBsZWZ0OiAwO1xcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgd2lkdGg6IDVweDtcXG4gICAgICAgIGJhY2tncm91bmQ6ICMyZjYyYTM7IH1cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi51aS1pbnB1dHN3aXRjaCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogM2VtO1xcbiAgaGVpZ2h0OiAxLjc1ZW07IH1cXG5cXG4udWktaW5wdXRzd2l0Y2gtc2xpZGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLjNzO1xcbiAgdHJhbnNpdGlvbjogLjNzO1xcbiAgYm9yZGVyLXJhZGl1czogMzBweDsgfVxcblxcbi51aS1pbnB1dHN3aXRjaC1zbGlkZXI6YmVmb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgaGVpZ2h0OiAxLjI1MGVtO1xcbiAgd2lkdGg6IDEuMjUwZW07XFxuICBsZWZ0OiAuMjVlbTtcXG4gIGJvdHRvbTogLjI1ZW07XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC4zcztcXG4gIHRyYW5zaXRpb246IC4zczsgfVxcblxcbi51aS1pbnB1dHN3aXRjaC1jaGVja2VkIC51aS1pbnB1dHN3aXRjaC1zbGlkZXI6YmVmb3JlIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEuMjVlbSk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEuMjVlbSk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMS4yNWVtKTsgfVxcblxcbi51aS1pbnB1dHN3aXRjaC51aS1zdGF0ZS1kaXNhYmxlZCAudWktaW5wdXRzd2l0Y2gtc2xpZGVyLFxcbi51aS1pbnB1dHN3aXRjaC1yZWFkb25seSAudWktaW5wdXRzd2l0Y2gtc2xpZGVyIHtcXG4gIGN1cnNvcjogZGVmYXVsdDsgfVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiW2NlLXRyZWVdIHtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsgfVxcblxcblthcmlhLWV4cGFuZGVkPVxcXCJ0cnVlXFxcIl0gPiBbY2UtdHJlZV0ge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5bYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiXSA+IFtjZS10cmVlXSB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmNlLXRyZWUtZm9sZGVyID4gLmNlLXRyZWUtaWNvbjpub3QoW2RhdGEtdHlwZT1cXFwiZmlsZVxcXCJdKSB7XFxuICBoZWlnaHQ6IDA7XFxuICB3aWR0aDogMDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDVweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgIzMzMztcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjFzIGVhc2UtaW4tb3V0OyB9XFxuXFxuLmNlLXRyZWUtZm9sZGVyW2FyaWEtZXhwYW5kZWQ9XFxcInRydWVcXFwiXSA+IC5jZS10cmVlLWljb24ge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogMjUlIDUwJTsgfVxcblxcbi5jZS10cmVlLWZpbGUgPiAuY2UtdHJlZS1pY29uLCAuY2UtdHJlZS1mb2xkZXIuY2UtdHJlZS1maWxlW2FyaWEtZXhwYW5kZWQ9XFxcInRydWVcXFwiXSA+IC5jZS10cmVlLWljb24sIC5jZS10cmVlLWZvbGRlci5jZS10cmVlLWZpbGVbYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiXSA+IC5jZS10cmVlLWljb24ge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5jZS10cmVlLWZpbGUsXFxuLmNlLXRyZWUtZm9sZGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLmNlLXRyZWUtZmlsZTo6YmVmb3JlLFxcbiAgLmNlLXRyZWUtZm9sZGVyOjpiZWZvcmUge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogOXB4O1xcbiAgICBsZWZ0OiAtMTRweDtcXG4gICAgd2lkdGg6IDEzcHg7XFxuICAgIGhlaWdodDogMDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IGRvdHRlZCAjNjdiMmRkO1xcbiAgICB6LWluZGV4OiAxOyB9XFxuXFxuLmNlLXRyZWUtY29udGVudCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nLWxlZnQ6IDE2cHg7IH1cXG4gIC5jZS10cmVlLWNvbnRlbnQ6OmJlZm9yZSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgei1pbmRleDogMTtcXG4gICAgdG9wOiAtOXB4O1xcbiAgICBib3R0b206IDE2cHg7XFxuICAgIGxlZnQ6IDJweDtcXG4gICAgYm9yZGVyOiAxcHggZG90dGVkICM2N2IyZGQ7XFxuICAgIGJvcmRlci13aWR0aDogMCAwIDAgMXB4O1xcbiAgICBoZWlnaHQ6IDEwMCU7IH1cXG5cXG4uY2UtdHJlZS1jb250ZW50OmZpcnN0LWNoaWxkOjpiZWZvcmUge1xcbiAgYm9yZGVyOiBub25lOyB9XFxuXFxuLmNlLXRyZWUtY29udGVudDpmaXJzdC1jaGlsZCA+IC5jZS10cmVlLWZvbGRlcjpmaXJzdC1jaGlsZCB7XFxuICBib3JkZXI6IG5vbmU7IH1cXG5cXG4uc291cmNlLXZpZXcgW2NsYXNzXj1cXFwiY29sLW1kLVxcXCJdIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcXG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAxMzBweCk7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxMzBweCk7IH1cXG4gIC5zb3VyY2UtdmlldyBbY2xhc3NePVxcXCJjb2wtbWQtXFxcIl0gcHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0ge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgIGJvcmRlcjogbm9uZTsgfVxcblxcbi5zb3VyY2UtdmlldyBbY2xhc3NePVxcXCJjb2wtbWQtXFxcIl0gKyBbY2xhc3NePVxcXCJjb2wtbWQtXFxcIl0ge1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7IH1cXG5cXG4uc291cmNlLXRyZWUsXFxuLnNvdXJjZS1zbmlwcGV0cyB7XFxuICBvdmVyZmxvdzogYXV0bzsgfVxcblwiLCBcIlwiXSk7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiAnQG1lZGlhICcgKyBpdGVtWzJdICsgJ3snICsgY29udGVudCArICd9JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSAnKCcgKyBpdGVtWzJdICsgJykgYW5kICgnICsgbWVkaWFRdWVyeSArICcpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJztcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcbiAgcmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsLCBuZWVkUXVvdGVzKSB7XG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB1cmw7XG4gIH0gLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSB8fCBuZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuICdcIicgKyB1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSArICdcIic7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250YXdlc29tZS13ZWJmb250LjY3NGY1MGQyODdhOGM0OGRjMTliLmVvdFwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRhd2Vzb21lLXdlYmZvbnQuNjc0ZjUwZDI4N2E4YzQ4ZGMxOWIuZW90XCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udGF3ZXNvbWUtd2ViZm9udC45MTJlYzY2ZDc1NzJmZjgyMTc0OS5zdmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250YXdlc29tZS13ZWJmb250LmIwNjg3MWYyODFmZWU2YjI0MWQ2LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRhd2Vzb21lLXdlYmZvbnQuYWY3YWU1MDVhOWVlZDUwM2Y4Yjgud29mZjJcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250YXdlc29tZS13ZWJmb250LmZlZTY2ZTcxMmE4YTA4ZWVmNTgwLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJwcmltZWljb25zLmI4ZWNjYjEwNTllYTVmYWFmNmQ4LmVvdFwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInByaW1laWNvbnMuMzhkNzc1NTJiMDM1MzY4NGEyMDguc3ZnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwicHJpbWVpY29ucy40NzNlMmE3NDZkM2MxNTFkN2RjYS50dGZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJwcmltZWljb25zLjcxYmIzZDc5ZGNmMThiNDVhZTg0LndvZmZcIjsiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJcbmNvbnN0IEFDQ09SRElPTl9IRUFERVIgPSAnY2UtYWNjb3JkaW9uLWhlYWRpbmcnO1xuY29uc3QgQUNDT1JESU9OX1BBTkVMID0gJ2NlLWFjY29yZGlvbi1wYW5lbCc7XG5cbmNvbnN0IEtFWUNPREUgPSB7XG4gIERPV046IDQwLFxuICBMRUZUOiAzNyxcbiAgUklHSFQ6IDM5LFxuICBVUDogMzgsXG4gIEhPTUU6IDM2LFxuICBFTkQ6IDM1LFxufTtcblxuY29uc3QgYWNjb3JkaW9uVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuYWNjb3JkaW9uVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICB9XG4gICAgOjpzbG90dGVkKC5hbmltYXRpbmcpIHtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0O1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlQWNjb3JkaW9uIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChhY2NvcmRpb25UZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5fb25DaGFuZ2UpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZChBQ0NPUkRJT05fSEVBREVSKSxcbiAgICAgIGN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKEFDQ09SRElPTl9QQU5FTCksXG4gICAgXSlcbiAgICAgIC50aGVuKF8gPT4ge1xuXG4gICAgICAgIGNvbnN0IGhlYWRpbmdzID0gdGhpcy5fYWxsSGVhZGluZ3MoKTtcblxuICAgICAgICBoZWFkaW5ncy5mb3JFYWNoKGhlYWRpbmcgPT4ge1xuICAgICAgICAgIGhlYWRpbmcuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKTtcblxuICAgICAgICAgIGhlYWRpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgcGFuZWwuaWQpO1xuICAgICAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgaGVhZGluZy5pZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhlYWRpbmdzWzBdLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcblxuICAgICAgICBoZWFkaW5nc1xuICAgICAgICAgIC5mb3JFYWNoKGhlYWRpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLl9wYW5lbEZvckhlYWRpbmcoaGVhZGluZyk7XG4gICAgICAgICAgICBpZiAoIWhlYWRpbmcuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fY29sbGFwc2VIZWFkaW5nKGhlYWRpbmcpO1xuICAgICAgICAgICAgICB0aGlzLl9jb2xsYXBzZVBhbmVsKHBhbmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2V4cGFuZEhlYWRpbmcoaGVhZGluZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2V4cGFuZFBhbmVsKHBhbmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZSk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgfVxuXG4gIF9pc0hlYWRpbmcoZWxlbSkge1xuICAgIHJldHVybiBlbGVtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gQUNDT1JESU9OX0hFQURFUjtcbiAgfVxuXG4gIF9vbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMuX2FuaW1hdGVQYW5lbEZvckhlYWRpbmcoZXZlbnQudGFyZ2V0LCBldmVudC5kZXRhaWwuaXNFeHBhbmRlZE5vdyk7XG4gIH1cblxuICBfYW5pbWF0ZVBhbmVsRm9ySGVhZGluZyhoZWFkaW5nLCBleHBhbmQpIHtcbiBcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW1hdGluZycpKSByZXR1cm47XG5cbiAgICBjb25zdCBwYW5lbCA9IHRoaXMuX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKTtcbiAgICBpZiAoZXhwYW5kKSB7XG4gICAgICB0aGlzLl9leHBhbmRQYW5lbChwYW5lbCk7XG4gICAgICB0aGlzLl9hbmltYXRlSW4ocGFuZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hbmltYXRlT3V0KHBhbmVsKVxuICAgICAgICAudGhlbihfID0+IHRoaXMuX2NvbGxhcHNlUGFuZWwocGFuZWwpKTtcbiAgICB9XG4gIH1cblxuICBfb25LZXlEb3duKGV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudEhlYWRpbmcgPSBldmVudC50YXJnZXQ7XG5cbiAgICBpZiAoIXRoaXMuX2lzSGVhZGluZyhjdXJyZW50SGVhZGluZykpIHJldHVybjtcblxuICAgIGlmIChldmVudC5hbHRLZXkpIHJldHVybjtcblxuICAgIGxldCBuZXdIZWFkaW5nO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLkxFRlQ6XG4gICAgICBjYXNlIEtFWUNPREUuVVA6XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9wcmV2SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLlJJR0hUOlxuICAgICAgY2FzZSBLRVlDT0RFLkRPV046XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9uZXh0SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkhPTUU6XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9maXJzdEhlYWRpbmcoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5FTkQ6XG4gICAgICAgIG5ld0hlYWRpbmcgPSB0aGlzLl9sYXN0SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY3VycmVudEhlYWRpbmcuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICBuZXdIZWFkaW5nLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICBuZXdIZWFkaW5nLmZvY3VzKCk7XG4gIH1cblxuICBfYWxsUGFuZWxzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbChBQ0NPUkRJT05fUEFORUwpKTtcbiAgfVxuXG4gIF9hbGxIZWFkaW5ncygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoQUNDT1JESU9OX0hFQURFUikpO1xuICB9XG5cbiAgX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKSB7XG4gICAgY29uc3QgbmV4dCA9IGhlYWRpbmcubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIGlmIChuZXh0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gQUNDT1JESU9OX1BBTkVMKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdTaWJsaW5nIGVsZW1lbnQgdG8gYSBoZWFkaW5nIG5lZWQgdG8gYmUgYSBwYW5lbC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICBfcHJldkhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuXG4gICAgbGV0IG5ld0lkeCA9IGhlYWRpbmdzLmZpbmRJbmRleChoZWFkaW5ncyA9PiBcbiAgICAgICAgaGVhZGluZ3MgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIC0gMTtcblxuICAgIHJldHVybiBoZWFkaW5nc1sobmV3SWR4ICsgaGVhZGluZ3MubGVuZ3RoKSAlIGhlYWRpbmdzLmxlbmd0aF07XG4gIH1cblxuICBfbmV4dEhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuICAgIGxldCBuZXdJZHggPSBoZWFkaW5ncy5maW5kSW5kZXgoaGVhZGluZyA9PlxuICAgICAgICBoZWFkaW5nID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSArIDE7XG5cbiAgICByZXR1cm4gaGVhZGluZ3NbbmV3SWR4ICUgaGVhZGluZ3MubGVuZ3RoXTtcbiAgfVxuXG4gIF9maXJzdEhlYWRpbmcoKSB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuICAgIHJldHVybiBoZWFkaW5nc1swXTtcbiAgfVxuXG4gIF9sYXN0SGVhZGluZygpIHtcbiAgICBjb25zdCBoZWFkaW5ncyA9IHRoaXMuX2FsbEhlYWRpbmdzKCk7XG4gICAgcmV0dXJuIGhlYWRpbmdzW2hlYWRpbmdzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgX2V4cGFuZFBhbmVsKHBhbmVsKSB7XG4gICAgcGFuZWwuZXhwYW5kZWQgPSB0cnVlO1xuICB9XG5cbiAgX2NvbGxhcHNlUGFuZWwocGFuZWwpIHtcbiAgICBwYW5lbC5leHBhbmRlZCA9IGZhbHNlO1xuICB9XG5cbiAgX2V4cGFuZEhlYWRpbmcoaGVhZGluZykge1xuICAgIGhlYWRpbmcuZXhwYW5kZWQgPSB0cnVlO1xuICB9XG5cbiAgX2NvbGxhcHNlSGVhZGluZyhoZWFkaW5nKSB7XG4gICAgaGVhZGluZy5leHBhbmRlZCA9IGZhbHNlO1xuICB9XG5cbiAgX2FuaW1hdGVJbihwYW5lbCkge1xuICAgIGNvbnN0IGhlaWdodCA9IHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZShwYW5lbCwgLWhlaWdodCwgMCk7XG4gIH1cblxuICBfYW5pbWF0ZU91dChwYW5lbCkge1xuICAgIGNvbnN0IGhlaWdodCA9IHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZShwYW5lbCwgMCwgLWhlaWdodCk7XG4gIH1cblxuICBfYW5pbWF0ZShwYW5lbCwgc3RhcnRPZmZzZXQsIGVuZE9mZnNldCkge1xuXG4gICAgaWYgKHN0YXJ0T2Zmc2V0ID09PSBlbmRPZmZzZXQpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGluZycpO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pO1xuXG4gICAgY29uc3QgaWR4ID0gY2hpbGRyZW4uaW5kZXhPZihwYW5lbCk7XG5cbiAgICBjb25zdCBhbmltYXRlZENoaWxkcmVuID0gY2hpbGRyZW4uc2xpY2UoaWR4KTtcbiAgICB0aGlzLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGNoaWxkLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgIGNoaWxkLnN0eWxlLnpJbmRleCA9IDI7XG4gICAgfSk7XG5cbiAgICBhbmltYXRlZENoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgY2hpbGQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgY2hpbGQuc3R5bGUuekluZGV4ID0gMTtcbiAgICAgIGNoaWxkLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7c3RhcnRPZmZzZXR9cHgpYDtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcm9taXNlKClcbiAgICAgIC50aGVuKF8gPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJvbWlzZSgpKVxuICAgICAgLnRoZW4oXyA9PiB7XG4gICAgICAgIGFuaW1hdGVkQ2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgY2hpbGQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtlbmRPZmZzZXR9cHgpYDtcbiAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKCdhbmltYXRpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25FbmRQcm9taXNlKHBhbmVsKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihfID0+IHtcbiAgICAgICAgYW5pbWF0ZWRDaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICBjaGlsZC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpbmcnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgIGNoaWxkLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgICAgICAgY2hpbGQuc3R5bGUuekluZGV4ID0gJyc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW5nJyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5sZXQgaGVhZGluZ0lkQ291bnRlciA9IDA7XG5cbmNvbnN0IGFjY29yZGlvbkhlYWRpbmdUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5hY2NvcmRpb25IZWFkaW5nVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgY29udGFpbjogY29udGVudDtcbiAgICB9XG4gICAgYnV0dG9uIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogaW5pdGlhbDtcbiAgICAgIGJvcmRlcjogaW5pdGlhbDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgcGFkZGluZzogMTBweDsgXG4gICAgfVxuICA8L3N0eWxlPlxuICA8YnV0dG9uPjxzbG90Pjwvc2xvdD48L2J1dHRvbj5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZUFjY29yZGlvbkhlYWRpbmcgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2V4cGFuZGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fb25DbGljayA9IHRoaXMuX29uQ2xpY2suYmluZCh0aGlzKTtcblxuICAgIHRoaXMuYXR0YWNoU2hhZG93KHtcbiAgICAgIG1vZGU6ICdvcGVuJyxcbiAgICAgIGRlbGVnYXRlc0ZvY3VzOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChcbiAgICAgIGFjY29yZGlvbkhlYWRpbmdUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxuICAgICk7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdoZWFkaW5nJyk7XG4gICAgICBcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYCR7QUNDT1JESU9OX0hFQURFUn0tZ2VuZXJhdGVkLSR7aGVhZGluZ0lkQ291bnRlcisrfWA7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ2V4cGFuZGVkJyk7XG4gICAgdGhpcy5fc2hhZG93QnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHZhbHVlKTtcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2V4cGFuZGVkJyk7XG4gIH1cblxuICBzZXQgZXhwYW5kZWQodmFsdWUpIHtcbiAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmICh2YWx1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdleHBhbmRlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZXhwYW5kZWQnKTtcbiAgfVxuXG4gIF9vbkNsaWNrKCkge1xuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHtcbiAgICAgICAgZGV0YWlsOiB7IGlzRXhwYW5kZWROb3c6IHRoaXMuZXhwYW5kZWQgfSxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBhY2NvcmRpb25QYW5lbFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbmFjY29yZGlvblBhbmVsVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3QoOm5vdChbZXhwYW5kZWRdKSkge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmxldCBwYW5lbElkQ291bnRlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDZUFjY29yZGlvblBhbmVsIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChcbiAgICAgIGFjY29yZGlvblBhbmVsVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcbiAgICApO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYCR7QUNDT1JESU9OX1BBTkVMfS1nZW5lcmF0ZWQtJHtwYW5lbElkQ291bnRlcisrfWA7XG4gIH1cblxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdleHBhbmRlZCcpO1xuICB9XG5cbiAgc2V0IGV4cGFuZGVkKHZhbCkge1xuICAgIGNvbnN0IHZhbHVlID0gQm9vbGVhbih2YWwpO1xuICAgIGlmICh2YWx1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdleHBhbmRlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZXhwYW5kZWQnKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25FbmRQcm9taXNlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIGYoKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2UoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNvbHZlKSk7XG59IiwiXG5cbmNvbnN0IGNsYXNzTWFwID0gKGNsYXNzT2JqKSA9PiB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhjbGFzc09iaikuZmlsdGVyKGNseiA9PiBjbGFzc09ialtjbHpdKS5qb2luKCcgJyk7XG59XG5cbmNvbnN0IHN0eWxlTWFwID0gKHN0eWxlT2JqKSA9PiB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZU9iaikuZmlsdGVyKHN0eWxlID0+IHN0eWxlT2JqW3N0eWxlXSkuam9pbignICcpO1xufVxuXG5leHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgaXMgKCkge1xuICAgIHJldHVybiAnY2UtYnV0dG9uJztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzICgpIHtcbiAgICByZXR1cm4gWydkaXNhYmxlZCcsICdpY29uLXBvcycsICdpY29uJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2F0dHJpYnV0ZVNldHVwKCk7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBfYXR0cmlidXRlU2V0dXAoKSB7XG4gICAgdGhpcy5faWNvblBvcyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdpY29uLXBvcycpIHx8ICdsZWZ0JztcbiAgICB0aGlzLl9pY29uQ2xhc3MgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaWNvbicpO1xuICAgIHRoaXMuX2lzRGlzYWJsZWQgPSB0aGlzLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB0aGlzLl9pc0ljb25Pbmx5ID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ2ljb24tb25seScpO1xuICAgIHRoaXMuX3N0eWxlcyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgIHRoaXMuX3N0eWxlQ2xhc3MgPSB0aGlzLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgfVxuXG4gIF9yZW5kZXIoKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBgXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7Y2xhc3NNYXAoe1xuICAgICAgICAndWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOnRydWUsXG4gICAgICAgICd1aS1idXR0b24tdGV4dC1pY29uLWxlZnQnOiAodGhpcy5faWNvblBvcyA9PT0gJ2xlZnQnKSwgXG4gICAgICAgICd1aS1idXR0b24tdGV4dC1pY29uLXJpZ2h0JzogKHRoaXMuX2ljb25Qb3MgPT09ICdyaWdodCcpLFxuICAgICAgICAndWktYnV0dG9uLWljb24tb25seSc6IHRoaXMuX2lzSWNvbk9ubHksXG4gICAgICAgICd1aS1zdGF0ZS1kaXNhYmxlZCc6IHRoaXMuX2lzRGlzYWJsZWRcbiAgICAgIH0pfVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIiR7Y2xhc3NNYXAoe1xuICAgICAgICAgICdqcy1pY29uLXR5cGUnOiB0cnVlLFxuICAgICAgICAgICd1aS1jbGlja2FibGUnOiB0cnVlLFxuICAgICAgICAgICd1aS1idXR0b24taWNvbi1sZWZ0JzogKHRoaXMuX2ljb25Qb3MgPT09ICdsZWZ0JyksIFxuICAgICAgICAgICd1aS1idXR0b24taWNvbi1yaWdodCc6ICh0aGlzLl9pY29uUG9zID09PSAncmlnaHQnKVxuICAgICAgICB9KX1cIj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWJ1dHRvbi10ZXh0IHVpLWNsaWNrYWJsZVwiPiR7dGhpcy50ZXh0Q29udGVudCB8fCAndWktYnRuJ308L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICBgO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuXG4gICAgdGhpcy4kaWNvbiA9IHRoaXMucXVlcnlTZWxlY3RvcignLmpzLWljb24tdHlwZScpO1xuICAgIHRoaXMuJGJ1dHRvbiA9IHRoaXMucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG5cbiAgICBpZih0aGlzLl9pY29uQ2xhc3MpIHtcbiAgICAgIHRoaXMuJGljb24uY2xhc3NOYW1lICs9ICcgJyArIHRoaXMuX2ljb25DbGFzcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kaWNvbi5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuJGljb24pO1xuICAgIH1cblxuICAgIGlmKHRoaXMuX3N0eWxlQ2xhc3MpIHtcbiAgICAgIHRoaXMuJGJ1dHRvbi5jbGFzc05hbWUgKz0gJyAnICsgdGhpcy5fc3R5bGVDbGFzcztcbiAgICB9XG5cbiAgICBpZih0aGlzLl9zdHlsZXMpIHtcbiAgICAgIHRoaXMuJGJ1dHRvbi5zdHlsZSA9IHRoaXMuX3N0eWxlcztcbiAgICB9XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgKGF0dHJOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZihhdHRyTmFtZSAmJiBvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX2F0dHJpYnV0ZVNldHVwKCk7XG4gICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEJ1dHRvbi5pcywgQnV0dG9uKTsiLCJcbmltcG9ydCB7IGNsYXNzTWFwLCB0b0NhbWVsQ2FzZSB9IGZyb20gJy4uL3V0aWxzL2RvbS11dGlscyc7XG5pbXBvcnQgeyBDRUVsZW1lbnQgfSBmcm9tICcuLi9jZS1lbGVtZW50JztcblxuZXhwb3J0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgQ0VFbGVtZW50IHtcblxuICBzdGF0aWMgZ2V0IGlzKCkge1xuICAgIHJldHVybiAnY2UtY2hlY2tib3gnO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICd2YWx1ZScsICduYW1lJywgJ2Rpc2FibGVkJywgJ2NoZWNrZWQnLCAnYmluYXJ5JywgJ2xhYmVsJywgJ3RhYmluZGV4JyxcbiAgICAgICdpbnB1dGlkJywgJ3N0eWxlJywgJ3N0eWxlLWNsYXNzJywgJ2xhYmVsLXN0eWxlLWNsYXNzJ1xuICAgIF07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy4kY2hlY2tib3hXcHIgPSAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqLyBudWxsO1xuICAgIHRoaXMuJGNoZWNrYm94Qm94ID0gLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gbnVsbDtcbiAgICB0aGlzLiRjaGVja2JveExhYmVsID0gLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gbnVsbDtcbiAgICB0aGlzLiRjaGVja2JveElucHV0ID0gLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gbnVsbDtcbiAgfVxuXG4gIF9yZW5kZXIoKSB7XG4gICAgc3VwZXIuX3JlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgc3VwZXIuX2NvcHlPYnNlcnZlZEF0dHJpYnV0ZXMoKTtcbiAgICBjb25zb2xlLmxvZygnY2hlY2tlZDogJW8sIGRpc2FibGVkOiAlbywgZm9jdXNlZDogJW8nLCB0aGlzLmNoZWNrZWQsIHRoaXMuZGlzYWJsZWQsIHRoaXMuZm9jdXNlZCk7XG5cbiAgICB0aGlzLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgJGNoZWNrYm94LXdwciBjbGFzcz1cInVpLWNoa2JveCB1aS13aWRnZXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgIDxpbnB1dCAkY2hlY2tib3gtaW5wdXQgdHlwZT1cImNoZWNrYm94XCIgXG4gICAgICAgICAgICBpZD1cIiR7dGhpcy5pbnB1dGlkfVwiIFxuICAgICAgICAgICAgbmFtZT1cIiR7dGhpcy5uYW1lfVwiIFxuICAgICAgICAgICAgdmFsdWU9XCIke3RoaXMudmFsdWV9XCIgXG4gICAgICAgICAgICB0YWJpbmRleD1cIiR7dGhpcy50YWJpbmRleCB8fCAxfVwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7dGhpcy5mb2N1c2VkID8gJ3VpLXN0YXRlLWZvY3VzJzonJ31cIlxuICAgICAgICAgICAgQGNsaWNrPVwiX2hhbmRsZUNsaWNrRXZlbnRcIiBcbiAgICAgICAgICAgIEBmb2N1cz1cIl9oYW5kbGVGb2N1c0V2ZW50XCIgXG4gICAgICAgICAgICBAYmx1cj1cIl9oYW5kbGVCbHVyRXZlbnRcIlxuICAgICAgICAgICAgQGNoYW5nZT1cIl9oYW5kbGVDaGFuZ2VFdmVudFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAkY2hlY2tib3gtYm94IGNsYXNzPVwiJHtjbGFzc01hcCh7XG4gICAgICAgICAgJ3VpLWNoa2JveC1ib3ggdWktd2lkZ2V0Jzp0cnVlLFxuICAgICAgICAgICd1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHQnOiB0cnVlLFxuICAgICAgICAgICd1aS1zdGF0ZS1hY3RpdmUnOiB0aGlzLmNoZWNrZWQsXG4gICAgICAgICAgJ3VpLXN0YXRlLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgICAndWktc3RhdGUtZm9jdXMnOiB0aGlzLmZvY3VzZWRcbiAgICAgICAgfSl9XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCIke2NsYXNzTWFwKHtcbiAgICAgICAgICAgICd1aS1jaGtib3gtaWNvbiAnOiB0cnVlLFxuICAgICAgICAgICAgJ3VpLWNsaWNrYWJsZSc6IHRydWUsXG4gICAgICAgICAgICAncGkgcGktY2hlY2snOiB0aGlzLmNoZWNrZWRcbiAgICAgICAgICB9KX1cIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bGFiZWwgJGNoZWNrYm94LWxhYmVsIFxuICAgICAgICBAY2xpY2s9XCJfaGFuZGxlQ2xpY2tFdmVudFwiIFxuICAgICAgICBjbGFzcz1cIiR7Y2xhc3NNYXAoe1xuICAgICAgICAgICd1aS1jaGtib3gtbGFiZWwnOiB0cnVlLCBcbiAgICAgICAgICAndWktbGFiZWwtYWN0aXZlJzogdGhpcy5jaGVja2VkLCBcbiAgICAgICAgICAndWktbGFiZWwtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLCBcbiAgICAgICAgICAndWktbGFiZWwtZm9jdXMnOiB0aGlzLmZvY3VzZWRcbiAgICAgICAgfSl9XCIgZm9yPVwiJHt0aGlzLmlucHV0aWR9XCI+JHt0aGlzLmxhYmVsfVxuICAgICAgPC9sYWJlbD5cbiAgICBgO1xuXG4gICAgc3VwZXIuX2F0dGFjaEVsZW1lbnRSZWZzKCk7XG4gICAgc3VwZXIuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICBzdXBlci5zdXBwbGllZEF0dHJpYnVlcy5mb3JFYWNoKGF0dHJOYW1lID0+IHtcbiAgICAgIGNvbnN0IGNhbWVsaXplZE5hbWUgPSB0b0NhbWVsQ2FzZShhdHRyTmFtZSk7XG4gICAgICB0aGlzLl9tYXBBdHRyaWJ1dGUoY2FtZWxpemVkTmFtZSwgdGhpc1tjYW1lbGl6ZWROYW1lXSk7XG4gICAgfSlcbiAgfVxuXG4gIF9oYW5kbGVDbGlja0V2ZW50KGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICBpZih0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy4kY2hlY2tib3hJbnB1dC5mb2N1cygpO1xuICB9XG5cbiAgX2hhbmRsZUZvY3VzRXZlbnQoZSkge1xuICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBfaGFuZGxlQmx1ckV2ZW50KGUpIHtcbiAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIF9oYW5kbGVDaGFuZ2VFdmVudChldnQpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSBldnQudGFyZ2V0LmNoZWNrZWQ7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ck5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChhdHRyTmFtZSAmJiBvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXNbdG9DYW1lbENhc2UoYXR0ck5hbWUpXSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICB0aGlzLl9tYXBBdHRyaWJ1dGUoYXR0ck5hbWUsIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBfbWFwQXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcblxuICAgIHN3aXRjaCAoYXR0ck5hbWUpIHtcbiAgICAgIGNhc2UgJ3N0eWxlJzoge1xuICAgICAgICBjb25zb2xlLmxvZygnZ290ICcsIGF0dHJOYW1lKTtcbiAgICAgICAgdGhpcy4kY2hlY2tib3hXcHIuc3R5bGUgPSBhdHRyVmFsdWU7XG4gICAgICB9OyBicmVhaztcblxuICAgICAgY2FzZSAnc3R5bGUtY2xhc3MnOiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnb3QgJywgYXR0ck5hbWUpO1xuICAgICAgICB0aGlzLiRjaGVja2JveFdwci5jbGFzc0xpc3QuYWRkKGF0dHJWYWx1ZSk7XG4gICAgICB9OyBicmVhaztcblxuICAgICAgY2FzZSAnbGFiZWwtc3R5bGUtY2xhc3MnOiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnb3QgJywgYXR0ck5hbWUpO1xuICAgICAgICB0aGlzLiRjaGVja2JveExhYmVsLmNsYXNzTGlzdC5hZGQoYXR0clZhbHVlKTtcbiAgICAgIH07IGJyZWFrO1xuXG4gICAgICBjYXNlICdjaGVja2VkJzoge1xuICAgICAgICBjb25zb2xlLmxvZygnZ290ICcsIGF0dHJOYW1lKVxuICAgICAgICB0aGlzLiRjaGVja2JveElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICcnKTtcbiAgICAgIH07IGJyZWFrO1xuXG4gICAgICBjYXNlICdkaXNhYmxlZCc6IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvdCAnLCBhdHRyTmFtZSlcbiAgICAgICAgdGhpcy4kY2hlY2tib3hJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICAgICAgfTsgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDaGVja2JveC5pcywgQ2hlY2tib3gpOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9jaGVja2JveC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9jaGVja2JveC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vY2hlY2tib3guc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIlxuaW1wb3J0IHsgdG9DYW1lbENhc2UgfSBmcm9tICcuL3V0aWxzL2RvbS11dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBDRUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgZ2V0IHN1cHBsaWVkQXR0cmlidWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9zdXBwbGllZEF0dHJpYnVlcztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZWxlbWVudEV2ZW50UXVldWUgPSBbXTtcbiAgICB0aGlzLl9zdXBwbGllZEF0dHJpYnVlcyA9IFtdO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLl9yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgX2NvcHlPYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSByZXR1cm47XG5cbiAgICBBcnJheS5mcm9tKHRoaXMuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcbiAgICAgIHRoaXNbdG9DYW1lbENhc2UoYXR0ci5uYW1lKV0gPSBhdHRyLnZhbHVlIHx8IHRydWU7XG4gICAgICB0aGlzLl9zdXBwbGllZEF0dHJpYnVlcy5wdXNoKGF0dHIubmFtZSk7XG4gICAgfSlcblxuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIF9hdHRhY2hFbGVtZW50UmVmcygpIHtcbiAgICB0aGlzLl9mb3JFYWNoRWxlbWVudCgvXlxcJC8sIChlbCwgYXR0cikgPT4ge1xuICAgICAgdGhpc1t0b0NhbWVsQ2FzZShhdHRyLm5hbWUpXSA9IGVsO1xuICAgIH0pXG4gIH1cblxuICBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fZm9yRWFjaEVsZW1lbnQoL15ALywgKGVsLCBhdHRyKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRGbiA9IGV2YWwodGhpc1thdHRyLnZhbHVlXSk7XG4gICAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyLm5hbWUucmVwbGFjZSgvXkAvLCAnJyk7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGFyZ2V0Rm4uYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLl9lbGVtZW50RXZlbnRRdWV1ZS5wdXNoKHsgZWwsIGV2ZW50TmFtZSwgdGFyZ2V0Rm4gfSk7XG4gICAgfSlcbiAgfVxuXG4gIF9yZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9lbGVtZW50RXZlbnRRdWV1ZS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICBvYmouZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihvYmouZXZlbnROYW1lLCBvYmoudGFyZ2V0Rm4pO1xuICAgIH0pXG4gIH1cblxuICBfZm9yRWFjaEVsZW1lbnQoUkVHRVgsIGNhbGxiYWNrRm4pIHtcbiAgICBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbCgnKicpKVxuICAgICAgLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgLmZpbHRlcihhdHRyID0+IFJFR0VYLnRlc3QoYXR0ci5uYW1lKSlcbiAgICAgICAgICAuZm9yRWFjaChhdHRyID0+IGNhbGxiYWNrRm4oZWwsIGF0dHIpKVxuICAgICAgfSlcbiAgfVxufVxuIiwiXG4vLyBjb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL2NlLWNoZWNrYm94LnNjc3MnKTtcblxuY29uc3QgS0VZQ09ERSA9IHtcbiAgU1BBQ0U6IDMyLFxufTtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoJ2Fzc2V0cy9jaGVja2JveC91bmNoZWNrZWQtY2hlY2tib3guc3ZnJykgbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICB9XG4gICAgICA6aG9zdChbaGlkZGVuXSkge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuICAgICAgOmhvc3QoW2NoZWNrZWRdKSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgnYXNzZXRzL2NoZWNrYm94L2NoZWNrZWQtY2hlY2tib3guc3ZnJykgbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICB9XG4gICAgICA6aG9zdChbZGlzYWJsZWRdKSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgnYXNzZXRzL2NoZWNrYm94L3VuY2hlY2tlZC1jaGVja2JveC1kaXNhYmxlZC5zdmcnKSBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgIH1cbiAgICAgIDpob3N0KFtjaGVja2VkXVtkaXNhYmxlZF0pIHtcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKCdhc3NldHMvY2hlY2tib3gvY2hlY2tlZC1jaGVja2JveC1kaXNhYmxlZC5zdmcnKSBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgIH0gICAgICBcbiAgICA8L3N0eWxlPlxuICBgO1xuXG4vLyBISURFXG4vLyBTaGFkeUNTUyB3aWxsIHJlbmFtZSBjbGFzc2VzIGFzIG5lZWRlZCB0byBlbnN1cmUgc3R5bGUgc2NvcGluZy5cbi8vIFNoYWR5Q1NTLnByZXBhcmVUZW1wbGF0ZSh0ZW1wbGF0ZSwgJ2hvd3RvLWNoZWNrYm94Jyk7XG4vLyAvSElERVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZUNoZWNrYm94IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydjaGVja2VkJywgJ2Rpc2FibGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2NoZWNrYm94Jyk7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuXG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdjaGVja2VkJyk7XG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdkaXNhYmxlZCcpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX29uS2V5VXApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIF91cGdyYWRlUHJvcGVydHkocHJvcCkge1xuICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzW3Byb3BdO1xuICAgICAgZGVsZXRlIHRoaXNbcHJvcF07XG4gICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX29uS2V5VXApO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIHNldCBjaGVja2VkKHZhbHVlKSB7XG4gICAgY29uc3QgaXNDaGVja2VkID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKGlzQ2hlY2tlZClcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gIH1cblxuICBnZXQgY2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgfVxuXG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBCb29sZWFuKHZhbHVlKTtcbiAgICBpZiAoaXNEaXNhYmxlZClcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgY29uc3QgaGFzVmFsdWUgPSBuZXdWYWx1ZSAhPT0gbnVsbDtcbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ2NoZWNrZWQnOlxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1jaGVja2VkJywgaGFzVmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBoYXNWYWx1ZSk7XG5cbiAgICAgICAgaWYgKGhhc1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBfb25LZXlVcChldmVudCkge1xuXG4gICAgaWYgKGV2ZW50LmFsdEtleSkgcmV0dXJuO1xuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIEtFWUNPREUuU1BBQ0U6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUNoZWNrZWQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgX29uQ2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLl90b2dnbGVDaGVja2VkKCk7XG4gIH1cblxuICBfdG9nZ2xlQ2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZClcbiAgICAgIHJldHVybjtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBjaGVja2VkOiB0aGlzLmNoZWNrZWQsXG4gICAgICB9LFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICB9KSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENFRWxlbWVudCB9IGZyb20gXCIuLi9jZS1lbGVtZW50XCI7XG5pbXBvcnQgeyBjbGFzc01hcCwgcmVwZWF0LCBLZXlDb2RlIH0gZnJvbSBcIi4uL3V0aWxzL2RvbS11dGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2hpcHMgZXh0ZW5kcyBDRUVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgaXMgKCkge1xuICAgIHJldHVybiAnY2UtY2hpcHMnO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMgKCkge1xuICAgIHJldHVybiBbJ2Rpc2FibGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdHlsZSAgICAgICAgICAgID0gLyoqIEB0eXBlIHtBdHRyaWJ1dGV9ICovICcnO1xuICAgIHRoaXMuc3R5bGVDbGFzcyAgICAgICA9IC8qKiBAdHlwZSB7QXR0cmlidXRlfSAqLyAnJztcbiAgICB0aGlzLmRpc2FibGVkICAgICAgICAgPSAvKiogQHR5cGUge0F0dHJpYnV0ZX0gKi8gZmFsc2U7XG4gICAgdGhpcy5maWVsZCAgICAgICAgICAgID0gLyoqIEB0eXBlIHtBdHRyaWJ1dGV9ICovICcnO1xuICAgIHRoaXMucGxhY2Vob2xkZXIgICAgICA9IC8qKiBAdHlwZSB7QXR0cmlidXRlfSAqLyAnU2VsZWN0Li4uJztcbiAgICB0aGlzLm1heCAgICAgICAgICAgICAgPSAvKiogQHR5cGUge0F0dHJpYnV0ZX0gKi8gMztcbiAgICB0aGlzLnRhYmluZGV4ICAgICAgICAgPSAvKiogQHR5cGUge0F0dHJpYnV0ZX0gKi8gMDtcbiAgICB0aGlzLmlucHV0SWQgICAgICAgICAgPSAvKiogQHR5cGUge0F0dHJpYnV0ZX0gKi8gJyc7XG4gICAgdGhpcy5hbGxvd0R1cGxpY2F0ZSAgID0gLyoqIEB0eXBlIHtBdHRyaWJ1dGV9ICovIHRydWU7XG4gICAgdGhpcy5pbnB1dFN0eWxlICAgICAgID0gLyoqIEB0eXBlIHtBdHRyaWJ1dGV9ICovICcnO1xuICAgIHRoaXMuaW5wdXRTdHlsZUNsYXNzICA9IC8qKiBAdHlwZSB7QXR0cmlidXRlfSAqLyAnJztcbiAgICB0aGlzLmFkZE9uVGFiICAgICAgICAgPSAvKiogQHR5cGUge0F0dHJpYnV0ZX0gKi8gZmFsc2U7XG4gICAgdGhpcy5hZGRPbkJsdXIgICAgICAgID0gLyoqIEB0eXBlIHtBdHRyaWJ1dGV9ICovIGZhbHNlO1xuXG4gICAgdGhpcy4kaW5wdXRUZXh0ICAgICAgID0gLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gbnVsbDtcblxuICAgIHRoaXMudmFsdWUgPSBbMSwyLDNdO1xuICB9XG5cbiAgX3JlbmRlcigpIHtcbiAgICBzdXBlci5fcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBzdXBlci5fY29weU9ic2VydmVkQXR0cmlidXRlcygpO1xuXG4gICAgdGhpcy5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiJHtjbGFzc01hcCh7XG4gICAgICAgICAgJ3VpLWNoaXBzIHVpLXdpZGdldCc6IHRydWVcbiAgICAgICAgfSl9XCIgXG4gICAgICAgIEBjbGljaz1cIl9oYW5kbGVDbGlja0V2ZW50XCI+XG4gICAgICAgIDx1bCBjbGFzcz1cIiR7Y2xhc3NNYXAoe1xuICAgICAgICAgICAgJ3VpLWlucHV0dGV4dCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOiB0cnVlLFxuICAgICAgICAgICAgJ3VpLXN0YXRlLWZvY3VzJzogdGhpcy5mb2N1cyxcbiAgICAgICAgICAgICd1aS1zdGF0ZS1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWRcbiAgICAgICAgICB9KX1cIj5cblxuICAgICAgICAgICR7cmVwZWF0KHRoaXMudmFsdWUsIChpdGVtLCBpKSA9PiAoYFxuICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktY2hpcHMtdG9rZW4gdWktc3RhdGUtaGlnaGxpZ2h0IHVpLWNvcm5lci1hbGxcIiBcbiAgICAgICAgICAgICAgaXRlbT1cIiR7aXRlbX1cIiBpdGVtLWluZGV4PVwiJHtpfVwiIFxuICAgICAgICAgICAgICBAY2xpY2s9XCJfaGFuZGxlSXRlbUNsaWNrXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGlwcy10b2tlbi1pY29uIHBpIHBpLWZ3IHBpLXRpbWVzXCIgXG4gICAgICAgICAgICAgICAgICBAY2xpY2s9XCJfaGFuZGxlSXRlbVJlbW92ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoaXBzLXRva2VuLWxhYmVsXCI+JHtpdGVtfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgYCkpfVxuICAgICAgICAgIFxuICAgICAgICAgIDxsaSBjbGFzcz1cInVpLWNoaXBzLWlucHV0LXRva2VuXCI+XG4gICAgICAgICAgICA8aW5wdXQgJGlucHV0LXRleHQgdHlwZT1cInRleHRcIiBpZD1cIiR7dGhpcy5pbnB1dGlkfVwiIFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiR7dGhpcy5wbGFjZWhvbGRlcn1cIiBcbiAgICAgICAgICAgICAgdGFiaW5kZXg9XCIke3RoaXMudGFiaW5kZXh9XCIgXG4gICAgICAgICAgICAgIEBrZXlkb3duPVwiX2hhbmRsZUtleWRvd25FdmVudFwiIFxuICAgICAgICAgICAgICBAZm9jdXM9XCJfaGFuZGxlSW5wdXRGb2N1c0V2ZW50XCIgXG4gICAgICAgICAgICAgIEBibHVyPVwiX2hhbmRsZUlucHV0Qmx1ckV2ZW50XCI+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgXG4gICAgc3VwZXIuX2F0dGFjaEVsZW1lbnRSZWZzKCk7XG4gICAgc3VwZXIuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuXG4gIGNvbm5lY3RlZENhbGxiYWNrICgpIHtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIF9oYW5kbGVDbGlja0V2ZW50KGV2dCkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICB0aGlzLiRpbnB1dFRleHQuZm9jdXMoKTtcbiAgfVxuXG4gIF9oYW5kbGVLZXlkb3duRXZlbnQoZXZ0KSB7XG4gICAgc3dpdGNoKGV2dC53aGljaCkge1xuICAgICAgY2FzZSBLZXlDb2RlLkJBQ0tTUEFDRTogdGhpcy5faGFuZGxlSXRlbVJlbW92ZShldnQpOyBicmVhaztcbiAgICAgIGNhc2UgS2V5Q29kZS5FTlRFUjogdGhpcy5fYWRkSXRlbShldnQsIHRoaXMuJGlucHV0VGV4dC52YWx1ZSk7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogJ2hhbmRsZSBtYXggdmFsdWUnOyBicmVhaztcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlSW5wdXRGb2N1c0V2ZW50KGV2dCkge1xuICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xuICB9XG5cbiAgX2hhbmRsZUlucHV0Qmx1ckV2ZW50KGV2dCkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICBpZiAoIHRoaXMuJGlucHV0VGV4dC52YWx1ZSApIHtcbiAgICAgIHRoaXMuX2FkZEl0ZW0oZXZ0LCB0aGlzLiRpbnB1dFRleHQudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVJdGVtUmVtb3ZlKGV2dCkge1xuICAgIGlmKCB0aGlzLmRpc2FibGVkICkgcmV0dXJuO1xuXG4gICAgaWYodGhpcy4kaW5wdXRUZXh0LnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuXG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZXZ0LnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnIFxuICAgICAgICA/IGV2dC50YXJnZXQucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG4gICAgICAgIDogZXZ0LnRhcmdldC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICBjb25zdCBpbmRleCA9IE51bWJlcih0YXJnZXRFbGVtZW50LmdldEF0dHJpYnV0ZSgnaXRlbS1pbmRleCcpKTtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcigodmFsLCBpKSA9PiBpICE9IGluZGV4KTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hpcHM6cmVtb3ZlZCcsIHtcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlW2luZGV4XVxuICAgICAgfSkpO1xuICBcbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF8gPT4gdGhpcy4kaW5wdXRUZXh0LmZvY3VzKCkpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVJdGVtQ2xpY2soZXZ0KSB7XG4gICAgY29uc3QgY3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2NoaXBzOmNsaWNrJywge1xuICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICB2YWx1ZTogZXZ0LnRhcmdldFxuICAgIH0pXG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3VzdG9tRXZlbnQpO1xuICB9XG5cbiAgX2FkZEl0ZW0oZXZlbnQsIGl0ZW0pIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSB8fCBbXTtcbiAgICBpZiAoaXRlbSAmJiBpdGVtLnRyaW0oKS5sZW5ndGgpIHtcbiAgICAgIGlmICghdGhpcy52YWx1ZS5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWUsIGl0ZW1dO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoaXBzOmFkZGVkJywge1xuICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgIHZhbHVlOiBpdGVtXG4gICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICAgICAgdGhpcy4kaW5wdXRUZXh0LnZhbHVlID0gJyc7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfID0+IHRoaXMuJGlucHV0VGV4dC5mb2N1cygpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgKGF0dHJOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBcbiAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDaGlwcy5pcywgQ2hpcHMpOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9jaGlwcy5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9jaGlwcy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vY2hpcHMuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIlxuXG5leHBvcnQgY2xhc3MgVWlFdmVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5uYW1lID0gJ1Jhamtlc2h3YXInO1xuICAgIHRoaXMuY2l0eSA9ICdIeWRlcmFiYWQnO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF8gPT4ge1xuICAgICAgdGhpcy5pbm5lckhUTUwgPSB0aGlzLl9yZW5kZXIoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdDb25zdHJ1Y3RvciBnZXRzIGNhbGxlZCcpO1xuICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcbiAgfVxuICBcbiAgX3JlbmRlciAoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJwYXJlbnRcIj5cbiAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93TmFtZVwiPlNob3cgTmFtZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIEBjbGljaz1cInNob3dOYW1lXCI+RXZlbnQsIE5hbWU8L2J1dHRvbj5cbiAgICAgICAgPHNwYW4+JHt0aGlzLm5hbWV9PC9zcGFuPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxidXR0b24gQGNsaWNrPVwic2hvd0NpdHlcIj5TaG93IENpdHk8L2J1dHRvbj5cbiAgICAgICAgPGgzPiR7dGhpcy5jaXR5fTwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc2hvd05hbWUgKGV2dCkge1xuICAgIGNvbnNvbGUubG9nKCdzaG93TmFtZTogJywgZXZ0KTtcbiAgICB0aGlzLm5hbWUgPSBldnQudGFyZ2V0O1xuICB9XG5cbiAgc2hvd0NpdHkoZXZ0KSB7XG4gICAgY29uc29sZS5sb2coJ3Nob3dDaXR5OiAnLCBldnQudGFyZ2V0KTtcbiAgICB0aGlzLmNpdHkgPSBldnQudGFyZ2V0O1xuICB9XG5cbiAgX2FkZEV2ZW50TGlzdGVuZXJzICgpIHtcbiAgICBjb25zb2xlLmxvZygnZXZlbnQgbGlzdGVuZXJzIGNhbGxlZCcpO1xuICAgIHRoaXMucXVlcnlTZWxlY3RvckFsbCgnKicpXG4gICAgICAuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIEFycmF5LmZyb20oZWwuYXR0cmlidXRlcylcbiAgICAgICAgICAuZmlsdGVyKGF0dHIgPT4gL15ALy50ZXN0KGF0dHIubmFtZSkpXG4gICAgICAgICAgLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRGbiA9IGV2YWwodGhpc1thdHRyLnZhbHVlXSk7XG4gICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyLm5hbWUucmVwbGFjZSgvXkAvLCAnJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXZlbnROYW1lOiAnLCBldmVudE5hbWUsIHRhcmdldEZuKTtcblxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2dCA9PiB7XG4gICAgICAgICAgICAgIHRhcmdldEZuLmFwcGx5KGVsLCBbZXZ0XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgfVxuXG4gIF9iaW5kRXZlbnRzICgpIHtcbiAgICBjb25zb2xlLmxvZyhhdHRyLm5hbWUsIGF0dHIudmFsdWUpXG4gICAgY29uc3QgZnVuY3Rpb25BbmRQYXJhbXMgPSAvXihbYS16QS1aXSspXFwoKC4qKVxcKS8uZXhlYyhhdHRyLnZhbHVlKTtcbiAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyLm5hbWUucmVwbGFjZSgvXkAvLCAnJyk7XG4gICAgY29uc3QgdGFyZ2V0Rm4gPSBldmFsKHRoaXNbZnVuY3Rpb25BbmRQYXJhbXNbMV1dKTtcbiAgICBjb25zdCBwYXJhbXMgPSBmdW5jdGlvbkFuZFBhcmFtc1syXS5zcGxpdCgvLC8pO1xuXG4gICAgY29uc29sZS5sb2coJ2hlbGxvLi4uLi4nLCBldmVudE5hbWUsIHRhcmdldEZuLCBwYXJhbXMpO1xuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChldnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdSdW5uaW5nIGNoYW5nZSBkZXRlY3Rpb24nKTtcbiAgICAgIGlmKHBhcmFtc1swXSA9PT0gJyRldmVudCcpIHtcbiAgICAgICAgdGFyZ2V0Rm4uYXBwbHkoZWwsIFtldnQsIC4uLnBhcmFtc10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0Rm4uYXBwbHkoZWwsIFsxLCAyXSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdVaVJvdXRlciByb2NrcyBub3cnKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdhdHRhY2hlZENhbGxiYWNrIGNhbGxlZCcpO1xuICB9XG5cbn1cblxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd1aS1ldmVudCcsIFVpRXZlbnQpOyIsIi8qXG4gKiBAQXV0aG9yOiBSYWprZXNod2FyIFByYXNhZChyYWprZXNod2FyLnBkQGdtYWlsLmNvbSkgXG4gKiBARGF0ZTogMjAxOS0wMi0yMyAyMzozMDoxMSBcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiBSYWprZXNod2FyIFByYXNhZFxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxOS0wMy0wMiAxOToyOTo0MlxuICovXG5cbndpbmRvdy5vbmxvYWQgPSBiaW5kTGlua3M7XG5cblxuZnVuY3Rpb24gYmluZExpbmtzKCkge1xuICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tocmVmXScpO1xuICBsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpamFja0xpbmtzKSkgXG59XG5cbmZ1bmN0aW9uIGhpamFja0xpbmtzKGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgcGFnZSA9IGV2dC50YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cbiAgX2xvYWRWaWV3KHBhZ2UpO1xufVxuXG5mdW5jdGlvbiBfbG9hZFZpZXcgKHBhZ2VVcmwpIHtcblxuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICB4aHIub25sb2FkID0gZXZ0ID0+IHtcbiAgICBjb25zdCBuZXdEb2MgPSBldnQudGFyZ2V0LnJlc3BvbnNlO1xuICAgIGNvbnN0IHJvdXRlclNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1aS1yb3V0ZXInKTtcblxuICAgIHJvdXRlclNsb3QuaW5uZXJIVE1MID0gbmV3RG9jO1xuICAgIFxuICB9O1xuICB4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuICB4aHIub3BlbignR0VUJywgYGFwcC8ke3BhZ2VVcmx9L2RlbW8uaHRtbGApO1xuICB4aHIuc2VuZCgpO1xufSIsIlxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBzdGF0aWMgZ2V0IGlzICgpIHtcbiAgICByZXR1cm4gJ2NlLW1lc3NhZ2UnO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMgKCkge1xuICAgIHJldHVybiBbJ2Rpc2FibGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5faWNvbnMgPSB7XG4gICAgICAnc3VjY2VzcycgOiAncGkgcGktY2hlY2snLFxuICAgICAgJ2luZm8nICAgIDogJ3BpIHBpLWluZm8tY2lyY2xlJyxcbiAgICAgICdlcnJvcicgICA6ICdwaSBwaS10aW1lcycsXG4gICAgICAnd2FybicgICAgOiAncGkgcGktZXhjbGFtYXRpb24tdHJpYW5nbGUnLFxuICAgICAgJ2RlZmF1bHQnIDogJ3BpIHBpLWluZm8tY2lyY2xlJ1xuICAgIH1cblxuICAgIHRoaXMuc2V2ZXJpdHkgPSAvKiogQHR5cGUge0F0dHJpYnV0ZX0gKi8gJ2luZm8nO1xuICAgIHRoaXMudGV4dCAgICAgPSAvKiogQHR5cGUge0F0dHJpYnV0ZX0gKi8gJyc7XG4gIH1cblxuICBfcmVuZGVyKCkge1xuICAgIHRoaXMuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBhcmlhLWxpdmU9XCJwb2xpdGVcIiBjbGFzcz1cInVpLW1lc3NhZ2UgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICBjbGFzcz1cInVpLW1lc3NhZ2UtJHt0aGlzLnNldmVyaXR5fVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lc3NhZ2UtaWNvbiAke3RoaXMuX2ljb25zW3RoaXMuc2V2ZXJpdHldfVwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZXNzYWdlLXRleHRcIj4ke3RoaXMudGV4dH08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIChhdHRyTmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgXG4gIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTWVzc2FnZS5pcywgTWVzc2FnZSk7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL21lc3NhZ2Uuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vbWVzc2FnZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vbWVzc2FnZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiY29uc3QgS0VZQ09ERSA9IHtcbiAgRE9XTjogNDAsXG4gIExFRlQ6IDM3LFxuICBSSUdIVDogMzksXG4gIFNQQUNFOiAzMixcbiAgVVA6IDM4LFxuICBIT01FOiAzNixcbiAgRU5EOiAzNSxcbn07XG5cbmNvbnN0IHJhZGlvQnV0dG9uVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xucmFkaW9CdXR0b25UZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgfVxuICBcbiAgICA6aG9zdCg6Zm9jdXMpIHtcbiAgICAgIG91dGxpbmU6IDA7XG4gICAgfVxuICBcbiAgICA6aG9zdCg6Zm9jdXMpOjpiZWZvcmUge1xuICAgICAgYm94LXNoYWRvdzogMCAwIDFweCAycHggIzVCOUREOTtcbiAgICB9XG4gIFxuICAgIDpob3N0OjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiAtMThweDtcbiAgICAgIHRvcDogM3B4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIH1cbiAgXG4gICAgOmhvc3QoW2FyaWEtY2hlY2tlZD1cInRydWVcIl0pOjpiZWZvcmUge1xuICAgICAgYmFja2dyb3VuZDogcmVkO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlUmFkaW9CdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChyYWRpb0J1dHRvblRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncmFkaW8nKTtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICB9XG59XG5cbmNvbnN0IHJhZGlvR3JvdXBUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5yYWRpb0dyb3VwVGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIHBhZGRpbmctbGVmdDogMjBweDtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZVJhZGlvR3JvdXAgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChyYWRpb0dyb3VwVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdyYWRpb2dyb3VwJyk7XG5cbiAgICBsZXQgZmlyc3RDaGVja2VkQnV0dG9uID0gdGhpcy5jaGVja2VkUmFkaW9CdXR0b247XG4gICAgaWYgKGZpcnN0Q2hlY2tlZEJ1dHRvbikge1xuICAgICAgdGhpcy5fdW5jaGVja0FsbCgpO1xuICAgICAgdGhpcy5fY2hlY2tOb2RlKGZpcnN0Q2hlY2tlZEJ1dHRvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhhc1JvbGVSYWRpbyA9IHRoaXMucXVlcnlTZWxlY3RvcignW3JvbGU9XCJyYWRpb1wiXScpO1xuICAgICAgaWYoaGFzUm9sZVJhZGlvKSBcbiAgICAgICAgaGFzUm9sZVJhZGlvLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgX29uS2V5RG93bihlKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZQ09ERS5VUDpcbiAgICAgIGNhc2UgS0VZQ09ERS5MRUZUOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3NldENoZWNrZWRUb1ByZXZCdXR0b24oKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5ET1dOOlxuICAgICAgY2FzZSBLRVlDT0RFLlJJR0hUOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3NldENoZWNrZWRUb05leHRCdXR0b24oKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5IT01FOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3NldENoZWNrZWQodGhpcy5maXJzdFJhZGlvQnV0dG9uKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5FTkQ6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLmxhc3RSYWRpb0J1dHRvbik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuU1BBQ0U6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2hvd3RvLXJhZGlvLWJ1dHRvbicpXG4gICAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZChlLnRhcmdldCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBnZXQgY2hlY2tlZFJhZGlvQnV0dG9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNoZWNrZWQ9XCJ0cnVlXCJdJyk7XG4gIH1cblxuICBnZXQgZmlyc3RSYWRpb0J1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInJhZGlvXCJdOmZpcnN0LW9mLXR5cGUnKTtcbiAgfVxuXG4gIGdldCBsYXN0UmFkaW9CdXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW3JvbGU9XCJyYWRpb1wiXTpsYXN0LW9mLXR5cGUnKTtcbiAgfVxuXG4gIF9wcmV2UmFkaW9CdXR0b24obm9kZSkge1xuICAgIGxldCBwcmV2ID0gbm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIHdoaWxlIChwcmV2KSB7XG4gICAgICBpZiAocHJldi5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3JhZGlvJykge1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH1cbiAgICAgIHByZXYgPSBwcmV2LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgX25leHRSYWRpb0J1dHRvbihub2RlKSB7XG4gICAgbGV0IG5leHQgPSBub2RlLm5leHRFbGVtZW50U2libGluZztcbiAgICB3aGlsZSAobmV4dCkge1xuICAgICAgaWYgKG5leHQuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICdyYWRpbycpIHtcbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9XG4gICAgICBuZXh0ID0gbmV4dC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgX3NldENoZWNrZWRUb1ByZXZCdXR0b24oKSB7XG4gICAgbGV0IGNoZWNrZWRCdXR0b24gPSB0aGlzLmNoZWNrZWRSYWRpb0J1dHRvbiB8fCB0aGlzLmZpcnN0UmFkaW9CdXR0b247XG4gICAgaWYgKGNoZWNrZWRCdXR0b24gPT09IHRoaXMuZmlyc3RSYWRpb0J1dHRvbikge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLmxhc3RSYWRpb0J1dHRvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldENoZWNrZWQodGhpcy5fcHJldlJhZGlvQnV0dG9uKGNoZWNrZWRCdXR0b24pKTtcbiAgICB9XG4gIH1cblxuICBfc2V0Q2hlY2tlZFRvTmV4dEJ1dHRvbigpIHtcbiAgICBsZXQgY2hlY2tlZEJ1dHRvbiA9IHRoaXMuY2hlY2tlZFJhZGlvQnV0dG9uIHx8IHRoaXMuZmlyc3RSYWRpb0J1dHRvbjtcbiAgICBpZiAoY2hlY2tlZEJ1dHRvbiA9PT0gdGhpcy5sYXN0UmFkaW9CdXR0b24pIHtcbiAgICAgIHRoaXMuX3NldENoZWNrZWQodGhpcy5maXJzdFJhZGlvQnV0dG9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLl9uZXh0UmFkaW9CdXR0b24oY2hlY2tlZEJ1dHRvbikpO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRDaGVja2VkKG5vZGUpIHtcbiAgICB0aGlzLl91bmNoZWNrQWxsKCk7XG4gICAgdGhpcy5fY2hlY2tOb2RlKG5vZGUpO1xuICAgIHRoaXMuX2ZvY3VzTm9kZShub2RlKTtcbiAgfVxuXG4gIF91bmNoZWNrQWxsKCkge1xuICAgIGNvbnN0IHJhZGlvQnV0dG9ucyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJyYWRpb1wiXScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFkaW9CdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnRuID0gcmFkaW9CdXR0b25zW2ldO1xuICAgICAgYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1jaGVja2VkJywgJ2ZhbHNlJyk7XG4gICAgICBidG4udGFiSW5kZXggPSAtMTtcbiAgICB9XG4gIH1cblxuICBfY2hlY2tOb2RlKG5vZGUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1jaGVja2VkJywgJ3RydWUnKTtcbiAgICBub2RlLnRhYkluZGV4ID0gMDtcbiAgfVxuXG4gIF9mb2N1c05vZGUobm9kZSkge1xuICAgIG5vZGUuZm9jdXMoKTtcbiAgfVxuXG4gIF9vbkNsaWNrKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICdyYWRpbycpIHtcbiAgICAgIHRoaXMuX3NldENoZWNrZWQoZS50YXJnZXQpO1xuICAgIH1cbiAgfVxufVxuIiwiXG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9zbGlkZXIuc2Nzcyc7XG5cbmV4cG9ydCBjbGFzcyBDZVNsaWRlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBzdGF0aWMgZ2V0IGlzKCkge1xuICAgIHJldHVybiAnY2Utc2xpZGVyJztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2Rpc2FibGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zbGlkZUN1cnJlbnQgPSAwO1xuICAgIHRoaXMuc2xpZGVzVG90YWwgPSAwO1xuICAgIHRoaXMuaW50ZXJ2YWxBY3RpdmUgPSBmYWxzZTtcblxuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIHN0YXJ0OiAwLFxuICAgICAgYXhpczogXCJ4XCIsXG4gICAgICBidXR0b25zOiB0cnVlLFxuICAgICAgYnVsbGV0czogdHJ1ZSxcbiAgICAgIGludGVydmFsOiB0cnVlLFxuICAgICAgaW50ZXJ2YWxUaW1lOiAzMDAwLFxuICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgYW5pbWF0aW9uVGltZTogMzAwLFxuICAgICAgaW5maW5pdGU6IHRydWVcbiAgICB9O1xuXG4gICAgdGhpcy5pbm5lckhUTUwgPSBgXG4gICAgICA8c3R5bGU+JHtzdHlsZX08L3N0eWxlPlxuICAgICAgPGRpdiBpZD1cInNsaWRlck5ld1wiPlxuICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbnMgcHJldlwiIGhyZWY9XCIjXCI+JiM2MDs8L2E+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3cG9ydFwiPlxuICAgICAgICAgIDx1bCBjbGFzcz1cIm92ZXJ2aWV3XCI+XG4gICAgICAgICAgICA8bGk+PGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL3BpY3R1cmUxLmpwZ1wiIC8+PC9saT5cbiAgICAgICAgICAgIDxsaT48aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvcGljdHVyZTIuanBnXCIgLz48L2xpPlxuICAgICAgICAgICAgPGxpPjxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9waWN0dXJlMy5qcGdcIiAvPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL3BpY3R1cmU0LmpwZ1wiIC8+PC9saT5cbiAgICAgICAgICAgIDxsaT48aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvcGljdHVyZTUuanBnXCIgLz48L2xpPlxuICAgICAgICAgICAgPGxpPjxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9waWN0dXJlNi5qcGdcIiAvPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxhIGNsYXNzPVwiYnV0dG9ucyBuZXh0XCIgaHJlZj1cIiNcIj4mIzYyOzwvYT5cbiAgICAgICAgPHVsIGNsYXNzPVwiYnVsbGV0c1wiPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnVsbGV0IGFjdGl2ZVwiIGRhdGEtc2xpZGU9XCIwXCI+MTwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnVsbGV0XCIgZGF0YS1zbGlkZT1cIjFcIj4yPC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidWxsZXRcIiBkYXRhLXNsaWRlPVwiMlwiPjM8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ1bGxldFwiIGRhdGEtc2xpZGU9XCIzXCI+NDwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnVsbGV0XCIgZGF0YS1zbGlkZT1cIjRcIj41PC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidWxsZXRcIiBkYXRhLXNsaWRlPVwiNVwiPjY8L2E+PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy4kY29udGFpbmVyID0gJCgnI3NsaWRlck5ldycpO1xuICAgIHRoaXMuJHZpZXdwb3J0ID0gdGhpcy4kY29udGFpbmVyLmZpbmQoXCIudmlld3BvcnQ6Zmlyc3RcIik7XG4gICAgdGhpcy4kb3ZlcnZpZXcgPSB0aGlzLiRjb250YWluZXIuZmluZChcIi5vdmVydmlldzpmaXJzdFwiKTtcbiAgICB0aGlzLiRuZXh0ID0gdGhpcy4kY29udGFpbmVyLmZpbmQoXCIubmV4dDpmaXJzdFwiKTtcbiAgICB0aGlzLiRwcmV2ID0gdGhpcy4kY29udGFpbmVyLmZpbmQoXCIucHJldjpmaXJzdFwiKTtcbiAgICB0aGlzLiRidWxsZXRzID0gdGhpcy4kY29udGFpbmVyLmZpbmQoXCIuYnVsbGV0XCIpO1xuXG4gICAgdGhpcy4kc2xpZGVzID0gbnVsbDtcbiAgICB0aGlzLnZpZXdwb3J0U2l6ZSA9IDA7XG4gICAgdGhpcy5jb250ZW50U3R5bGUgPSB7fTtcbiAgICB0aGlzLnNsaWRlc1Zpc2libGUgPSAwO1xuICAgIHRoaXMuc2xpZGVTaXplID0gMDtcbiAgICB0aGlzLnNsaWRlSW5kZXggPSAwO1xuICAgIHRoaXMuaXNIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICB0aGlzLnNpemVMYWJlbCA9IHRoaXMuaXNIb3Jpem9udGFsID8gXCJXaWR0aFwiIDogXCJIZWlnaHRcIjtcbiAgICB0aGlzLnBvc2lMYWJlbCA9IHRoaXMuaXNIb3Jpem9udGFsID8gXCJsZWZ0XCIgOiBcInRvcFwiO1xuICAgIHRoaXMuaW50ZXJ2YWxUaW1lciA9IG51bGw7XG5cbiAgICB0aGlzLl9pbml0aWFsaXplKCk7XG4gIH1cblxuICBfaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICB0aGlzLl9tb3ZlKHRoaXMuc2xpZGVDdXJyZW50KTtcbiAgICB0aGlzLl9zZXRFdmVudHMoKTtcbiAgfVxuXG4gIF91cGRhdGUoKSB7XG4gICAgdGhpcy4kb3ZlcnZpZXcuZmluZChcIi5taXJyb3JlZFwiKS5yZW1vdmUoKTtcblxuICAgIHRoaXMuJHNsaWRlcyA9IHRoaXMuJG92ZXJ2aWV3LmNoaWxkcmVuKCk7XG4gICAgY29uc3Qgdmlld3BvcnRTaXplID0gdGhpcy4kdmlld3BvcnRbMF1bXCJvZmZzZXRcIiArIHRoaXMuc2l6ZUxhYmVsXTtcbiAgICB0aGlzLnNsaWRlU2l6ZSA9IHRoaXMuJHNsaWRlcy5maXJzdCgpW1wib3V0ZXJcIiArIHRoaXMuc2l6ZUxhYmVsXSh0cnVlKTtcbiAgICB0aGlzLnNsaWRlc1RvdGFsID0gdGhpcy4kc2xpZGVzLmxlbmd0aDtcbiAgICB0aGlzLnNsaWRlQ3VycmVudCA9IHRoaXMub3B0aW9ucy5zdGFydCB8fCAwO1xuICAgIGNvbnN0IHNsaWRlc1Zpc2libGUgPSBNYXRoLmNlaWwodmlld3BvcnRTaXplIC8gdGhpcy5zbGlkZVNpemUpO1xuXG4gICAgdGhpcy4kb3ZlcnZpZXcuYXBwZW5kKHRoaXMuJHNsaWRlcy5zbGljZSgwLCBzbGlkZXNWaXNpYmxlKS5jbG9uZSgpLmFkZENsYXNzKFwibWlycm9yZWRcIikpO1xuICAgIHRoaXMuJG92ZXJ2aWV3LmNzcyh0aGlzLnNpemVMYWJlbC50b0xvd2VyQ2FzZSgpLCB0aGlzLnNsaWRlU2l6ZSAqICh0aGlzLnNsaWRlc1RvdGFsICsgc2xpZGVzVmlzaWJsZSkpO1xuXG4gICAgdGhpcy5fc2V0QnV0dG9ucygpO1xuICB9XG5cbiAgX21vdmUoaW5kZXgpIHtcbiAgICBsZXQgc2xpZGVJbmRleCA9IGlzTmFOKGluZGV4KSA/IHRoaXMuc2xpZGVDdXJyZW50IDogaW5kZXg7XG4gICAgdGhpcy5zbGlkZUN1cnJlbnQgPSBzbGlkZUluZGV4ICUgdGhpcy5zbGlkZXNUb3RhbDtcblxuICAgIGlmIChzbGlkZUluZGV4IDwgMCkge1xuICAgICAgdGhpcy5zbGlkZUN1cnJlbnQgPSBzbGlkZUluZGV4ID0gdGhpcy5zbGlkZXNUb3RhbCAtIDE7XG4gICAgICB0aGlzLiRvdmVydmlldy5jc3ModGhpcy5wb3NpTGFiZWwsIC0odGhpcy5zbGlkZXNUb3RhbCkgKiB0aGlzLnNsaWRlU2l6ZSk7XG4gICAgfVxuXG4gICAgaWYgKHNsaWRlSW5kZXggPiB0aGlzLnNsaWRlc1RvdGFsKSB7XG4gICAgICB0aGlzLnNsaWRlQ3VycmVudCA9IHNsaWRlSW5kZXggPSAxO1xuICAgICAgdGhpcy4kb3ZlcnZpZXcuY3NzKHRoaXMucG9zaUxhYmVsLCAwKTtcbiAgICB9XG4gICAgdGhpcy5jb250ZW50U3R5bGVbdGhpcy5wb3NpTGFiZWxdID0gLXNsaWRlSW5kZXggKiB0aGlzLnNsaWRlU2l6ZTtcblxuICAgIHRoaXMuJG92ZXJ2aWV3LmFuaW1hdGUodGhpcy5jb250ZW50U3R5bGUsIHtcbiAgICAgIHF1ZXVlOiBmYWxzZSxcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgYWx3YXlzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci50cmlnZ2VyKFwibW92ZVwiLCBbdGhpcy4kc2xpZGVzW3RoaXMuc2xpZGVDdXJyZW50XSwgdGhpcy5zbGlkZUN1cnJlbnRdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX3NldEJ1dHRvbnMoKTtcbiAgICB0aGlzLl9zdGFydCgpO1xuICB9XG5cbiAgX3NldEV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmJ1dHRvbnMpIHtcbiAgICAgIHRoaXMuJHByZXYuY2xpY2soXyA9PiB7XG4gICAgICAgIHRoaXMuX21vdmUoLS10aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy4kbmV4dC5jbGljayhfID0+IHtcbiAgICAgICAgdGhpcy5fbW92ZSgrK3RoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICQod2luZG93KS5yZXNpemUodGhpcy5fdXBkYXRlKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYnVsbGV0cykge1xuICAgICAgY29uc3QgX19zZWxmID0gdGhpcztcbiAgICAgIHRoaXMuJGNvbnRhaW5lci5vbihcImNsaWNrXCIsIFwiLmJ1bGxldFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhdHRyaWJ1dGU6ICcsICQodGhpcykuYXR0cihcImRhdGEtc2xpZGVcIikpXG4gICAgICAgIF9fc2VsZi5fbW92ZShfX3NlbGYuc2xpZGVJbmRleCA9ICskKHRoaXMpLmF0dHIoXCJkYXRhLXNsaWRlXCIpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgX3N0YXJ0KCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsVGltZXIpO1xuXG4gICAgICB0aGlzLmludGVydmFsQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgdGhpcy5pbnRlcnZhbFRpbWVyID0gc2V0VGltZW91dChfID0+IHtcbiAgICAgICAgdGhpcy5fbW92ZSgrK3RoaXMuc2xpZGVJbmRleCk7XG4gICAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWxUaW1lKTtcbiAgICB9XG4gIH1cblxuICBfc3RvcCgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5pbnRlcnZhbFRpbWVyKTtcbiAgICB0aGlzLmludGVydmFsQWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBfc2V0QnV0dG9ucygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmJ1dHRvbnMgJiYgIXRoaXMub3B0aW9ucy5pbmZpbml0ZSkge1xuICAgICAgdGhpcy4kcHJldi50b2dnbGVDbGFzcyhcImRpc2FibGVcIiwgdGhpcy5zbGlkZUN1cnJlbnQgPD0gMCk7XG4gICAgICB0aGlzLiRuZXh0LnRvZ2dsZUNsYXNzKFwiZGlzYWJsZVwiLCB0aGlzLnNsaWRlQ3VycmVudCA+PSB0aGlzLnNsaWRlc1RvdGFsIC0gdGhpcy5zbGlkZXNWaXNpYmxlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmJ1bGxldHMpIHtcbiAgICAgIHRoaXMuJGJ1bGxldHMucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAkKHRoaXMuJGJ1bGxldHNbdGhpcy5zbGlkZUN1cnJlbnRdKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcblxuICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKENlU2xpZGVyLmlzLCBDZVNsaWRlcik7IiwiY29uc3Qgc2V0dGluZ3MgPSB7XG4gIGl0ZW06IDMsXG4gIGF1dG9XaWR0aDogZmFsc2UsXG4gIHNsaWRlTW92ZTogMSxcbiAgc2xpZGVNYXJnaW46IDEwLFxuICBhZGRDbGFzczogJycsXG4gIG1vZGU6ICdzbGlkZScsXG4gIHVzZUNTUzogdHJ1ZSxcbiAgY3NzRWFzaW5nOiAnZWFzZScsIC8vJ2N1YmljLWJlemllcigwLjI1LCAwLCAwLjI1LCAxKScsXG4gIGVhc2luZzogJ2xpbmVhcicsIC8vJ2ZvciBqcXVlcnkgYW5pbWF0aW9uJywvL1xuICBzcGVlZDogNDAwLCAvL21zJ1xuICBhdXRvOiBmYWxzZSxcbiAgcGF1c2VPbkhvdmVyOiBmYWxzZSxcbiAgbG9vcDogZmFsc2UsXG4gIHNsaWRlRW5kQW5pbWF0aW9uOiB0cnVlLFxuICBwYXVzZTogMjAwMCxcbiAga2V5UHJlc3M6IGZhbHNlLFxuICBjb250cm9sczogdHJ1ZSxcbiAgcHJldkh0bWw6ICcnLFxuICBuZXh0SHRtbDogJycsXG4gIHJ0bDogZmFsc2UsXG4gIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcbiAgdmVydGljYWw6IGZhbHNlLFxuICB2ZXJ0aWNhbEhlaWdodDogNTAwLFxuICB2VGh1bWJXaWR0aDogMTAwLFxuICB0aHVtYkl0ZW06IDEwLFxuICBwYWdlcjogdHJ1ZSxcbiAgZ2FsbGVyeTogZmFsc2UsXG4gIGdhbGxlcnlNYXJnaW46IDUsXG4gIHRodW1iTWFyZ2luOiA1LFxuICBjdXJyZW50UGFnZXJQb3NpdGlvbjogJ21pZGRsZScsXG4gIGVuYWJsZVRvdWNoOiB0cnVlLFxuICBlbmFibGVEcmFnOiB0cnVlLFxuICBmcmVlTW92ZTogdHJ1ZSxcbiAgc3dpcGVUaHJlc2hvbGQ6IDQwLFxuICByZXNwb25zaXZlOiBbXSxcbiAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICBvbkJlZm9yZVN0YXJ0OiBmdW5jdGlvbiAoJGVsKSB7IH0sXG4gIG9uU2xpZGVyTG9hZDogZnVuY3Rpb24gKCRlbCkgeyB9LFxuICBvbkJlZm9yZVNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkgeyB9LFxuICBvbkFmdGVyU2xpZGU6IGZ1bmN0aW9uICgkZWwsIHNjZW5lKSB7IH0sXG4gIG9uQmVmb3JlTmV4dFNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkgeyB9LFxuICBvbkJlZm9yZVByZXZTbGlkZTogZnVuY3Rpb24gKCRlbCwgc2NlbmUpIHsgfVxuICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBzZXR0aW5nczsiLCJcbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuL3NsaWRlci1kZWZhdWx0cyc7XG5cbmV4cG9ydCBjbGFzcyBJbWFnZVNsaWRlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBzdGF0aWMgZ2V0IGlzKCkge1xuICAgIHJldHVybiAnaW1hZ2Utc2xpZGVyJztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2Rpc2FibGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIC8vIHRoaXMuaW5uZXJIVE1MID0gdGhpcy5yZW5kZXIoKTtcblxuICAgIHRoaXMud2luZG93VyA9IHdpbmRvdy5vdXRlcldpZHRoO1xuICAgIHRoaXMuYnJlYWtwb2ludCA9IG51bGw7XG4gICAgdGhpcy5yZXNwb3NpdmVPYmogPSBudWxsO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLncgPSAwO1xuICAgIHRoaXMub24gPSBmYWxzZTtcbiAgICB0aGlzLmVsU2l6ZSA9IDA7XG4gICAgdGhpcy4kc2xpZGUgPSAnJztcbiAgICB0aGlzLnNjZW5lID0gMDtcbiAgICB0aGlzLnByb3BlcnR5ID0gKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB0aGlzLmd1dHRlciA9IChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgPyAnbWFyZ2luLWJvdHRvbScgOiAnbWFyZ2luLXJpZ2h0JztcbiAgICB0aGlzLnNsaWRlVmFsdWUgPSAwO1xuICAgIHRoaXMucGFnZXJXaWR0aCA9IDA7XG4gICAgdGhpcy5zbGlkZVdpZHRoID0gMDtcbiAgICB0aGlzLnRodW1iV2lkdGggPSAwO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xuICAgIHRoaXMuaXNUb3VjaCA9ICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuXG4gICAgdGhpcy5sU1NsaWRlT3V0ZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5sU1NsaWRlT3V0ZXInKTtcbiAgICB0aGlzLmxTU2xpZGVXcmFwcGVyID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubFNTbGlkZVdyYXBwZXInKTtcbiAgICB0aGlzLiRlbCA9IHRoaXMucXVlcnlTZWxlY3RvcignI2NvbnRlbnQtc2xpZGVyMicpO1xuICAgIHRoaXMubFNQYWdlciA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxTUGFnZXInKTtcbiAgICAvLyB0aGlzLiRjaGlsZHJlbiA9IHRoaXMuJGVsLmNoaWxkTm9kZXM7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKGBcbiAgICAgIDxkaXYgY2xhc3M9XCJsU1NsaWRlT3V0ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxTU2xpZGVXcmFwcGVyIHVzaW5nQ3NzXCIgc3R5bGU9XCJ0cmFuc2l0aW9uLWR1cmF0aW9uOiAwbXM7XCI+XG4gICAgICAgICAgPHVsIGlkPVwiY29udGVudC1zbGlkZXIyXCIgY2xhc3M9XCJjb250ZW50LXNsaWRlciBsaWdodFNsaWRlciBsU1NsaWRlIGxzR3JhYmJpbmdcIlxuICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTYyMHB4OyBoZWlnaHQ6IDE2MnB4OyBwYWRkaW5nLWJvdHRvbTogMCU7IHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJsc2xpZGUgYWN0aXZlXCIgc3R5bGU9XCJ3aWR0aDogMjYwcHg7IG1hcmdpbi1yaWdodDogMTBweDtcIj5cbiAgICAgICAgICAgICAgPGgzPjE8L2gzPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cImxzbGlkZVwiIHN0eWxlPVwid2lkdGg6IDI2MHB4OyBtYXJnaW4tcmlnaHQ6IDEwcHg7XCI+XG4gICAgICAgICAgICAgIDxoMz4yPC9oMz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJsc2xpZGVcIiBzdHlsZT1cIndpZHRoOiAyNjBweDsgbWFyZ2luLXJpZ2h0OiAxMHB4O1wiPlxuICAgICAgICAgICAgICA8aDM+MzwvaDM+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxTQWN0aW9uXCI+PGEgY2xhc3M9XCJsU1ByZXZcIj48L2E+PGEgY2xhc3M9XCJsU05leHRcIj48L2E+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8dWwgY2xhc3M9XCJsU1BhZ2VyIGxTcGdcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDVweDtcIj5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJhY3RpdmVcIj48YSBocmVmPVwiI1wiPjE8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj4yPC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+MzwvYT48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgYCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAkKFwiI2NvbnRlbnQtc2xpZGVyXCIpLmxpZ2h0U2xpZGVyKHtcbiAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAga2V5UHJlc3M6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ck5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXG4gIH1cblxuICBfaW5saW5lU3R5bGUoKSB7XG5cbiAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnKSB7XG4gICAgICBzZXR0aW5ncy5hdXRvV2lkdGggPSBmYWxzZTtcbiAgICAgIHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzZXR0aW5ncy5hdXRvKSB7XG4gICAgICBzZXR0aW5ncy5zbGlkZUVuZEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICBzZXR0aW5ncy5zbGlkZU1vdmUgPSAxO1xuICAgICAgc2V0dGluZ3MuaXRlbSA9IDE7XG4gICAgfVxuICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XG4gICAgICBzZXR0aW5ncy5zbGlkZU1vdmUgPSAxO1xuICAgICAgc2V0dGluZ3MuZnJlZU1vdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2V0dGluZ3MudmVydGljYWwpIHtcbiAgICAgIHRoaXMubFNTbGlkZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgndmVydGljYWwnKTtcbiAgICAgIHRoaXMuZWxTaXplID0gc2V0dGluZ3MudmVydGljYWxIZWlnaHQ7XG4gICAgICB0aGlzLmxTU2xpZGVXcmFwcGVyLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuZWxTaXplfXB4YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbFNpemUgPSB0aGlzLiRlbC5vdXRlcldpZHRoO1xuICAgIH1cblxuICAgIHRoaXMuJGVsLmNoaWxkTm9kZXMuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QuYWRkKCdsc2xpZGUnKSk7XG4gICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgLy8gbmVlZCB0byBoYW5kbGVcbiAgICB9XG4gICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgIC8vIHJlZnJlc2guY2FsU1coKTtcbiAgICAgIHRoaXMuX3JlZnJlc2hjYWxTVygpO1xuXG4gICAgICAvLyByZWZyZXNoLnNTVygpO1xuICAgICAgdGhpcy5fcmVmcmVzaHNTVygpO1xuXG4gICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnNsaWRlVmFsdWUgPSB0aGlzLl9zbGlkZVZhbHVlKCk7XG4gICAgICAgIHRoaXMubW92ZSgkZWwsIHNsaWRlVmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnNldEhlaWdodCgkZWwsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEhlaWdodCgkZWwsIHRydWUpO1xuICAgICAgJGVsLmFkZENsYXNzKCdsU0ZhZGUnKTtcbiAgICAgIGlmICghdGhpcy5kb0NzcygpKSB7XG4gICAgICAgICRjaGlsZHJlbi5mYWRlT3V0KDApO1xuICAgICAgICAkY2hpbGRyZW4uZXEoc2NlbmUpLmZhZGVJbigwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgJGNoaWxkcmVuLmVxKHNjZW5lKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRjaGlsZHJlbi5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9XG5cbiAgfVxuXG4gIF9tb3ZlKG9iLCB2KSB7XG4gICAgaWYgKHNldHRpbmdzLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgdiA9IC12O1xuICAgIH1cbiAgICBpZiAodGhpcy5fZG9Dc3MoKSkge1xuICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgIG9iLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgwcHgsIC0ke3Z9cHgsIDBweClgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2Iuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKDBweCwgLSR7dn1weCwgMHB4LCAwcHgpYDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgIG9iLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKS5hbmltYXRlKHtcbiAgICAgICAgICB0b3A6IC12ICsgJ3B4J1xuICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCwgc2V0dGluZ3MuZWFzaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKS5hbmltYXRlKHtcbiAgICAgICAgICBsZWZ0OiAtdiArICdweCdcbiAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQsIHNldHRpbmdzLmVhc2luZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciAkdGh1bWIgPSAkc2xpZGUucGFyZW50KCkuZmluZCgnLmxTUGFnZXInKS5maW5kKCdsaScpO1xuICAgIHRoaXMuYWN0aXZlKCR0aHVtYiwgdHJ1ZSk7XG4gIH1cblxuICBfc2xpZGVWYWx1ZSgpIHtcbiAgICBsZXQgX3NWID0gMDtcbiAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgX3NWID0gdGhpcy5zY2VuZSAqICgodGhpcy5zbGlkZVdpZHRoICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pICogc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3NWID0gMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2VuZTsgaSsrKSB7XG4gICAgICAgIF9zViArPSBwYXJzZUludCh0aGlzLiRlbC5jaGlsZE5vZGVzW2ldLndpZHRoICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX3NWO1xuICB9XG5cbiAgX3JlZnJlc2hzU1cgKCkge1xuXG4gICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgIC8vICRjaGlsZHJlbi5jc3MocHJvcGVydHksIHNsaWRlV2lkdGggKyAncHgnKTtcbiAgICAgIHRoaXMuJGVsLmNoaWxkTm9kZXMuZm9yRWFjaChlbCA9PiBlbC5zdHlsZVt0aGlzLnByb3BlcnR5XSA9IGAke3RoaXMuc2xpZGVXaWR0aH1weGApO1xuICAgIH1cbiAgICAvLyAkY2hpbGRyZW4uY3NzKGd1dHRlciwgc2V0dGluZ3Muc2xpZGVNYXJnaW4gKyAncHgnKTtcbiAgICB0aGlzLiRlbC5jaGlsZE5vZGVzLmZvckVhY2goZWwgPT4gZWwuc3R5bGVbdGhpcy5ndXR0ZXJdID0gYCR7c2V0dGluZ3Muc2xpZGVNYXJnaW59cHhgKTtcblxuICAgIHcgPSB0aGlzLl9jYWxXaWR0aChmYWxzZSk7XG4gICAgLy8gJGVsLmNzcyhwcm9wZXJ0eSwgdyArICdweCcpO1xuICAgIHRoaXMuJGVsLnN0eWxlW3Byb3BlcnR5XSA9IGAke3d9cHhgO1xuICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgIGlmICh0aGlzLm9uID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnNjZW5lID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmNsb25lLmxlZnQnKS5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RvQ3NzKCkpIHtcbiAgICAgIHRoaXMubFNTbGlkZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgndXNpbmdDc3MnKTtcbiAgICB9XG4gIH1cblxuICBfcmVmcmVzaGNhbFNXICgpIHtcbiAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5zbGlkZVdpZHRoID0gKHRoaXMuZWxTaXplIC0gKChzZXR0aW5ncy5pdGVtICogKHNldHRpbmdzLnNsaWRlTWFyZ2luKSkgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbikpIC8gc2V0dGluZ3MuaXRlbTtcbiAgICB9XG4gIH1cblxuICBfZG9Dc3MoKSB7XG4gICAgY29uc3Qgc3VwcG9ydCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSBbJ3RyYW5zaXRpb24nLCAnTW96VHJhbnNpdGlvbicsICdXZWJraXRUcmFuc2l0aW9uJywgJ09UcmFuc2l0aW9uJywgJ21zVHJhbnNpdGlvbicsICdLaHRtbFRyYW5zaXRpb24nXTtcbiAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYW5zaXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25baV0gaW4gcm9vdC5zdHlsZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzZXR0aW5ncy51c2VDU1MgJiYgc3VwcG9ydCgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuICBfY2FsV2lkdGggKGNsbikge1xuICAgIHZhciBsbiA9IGNsbiA9PT0gdHJ1ZSA/ICRzbGlkZS5maW5kKCcubHNsaWRlJykubGVuZ3RoIDogJGNoaWxkcmVuLmxlbmd0aDtcbiAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgdyA9IGxuICogKHNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHcgPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsbjsgaSsrKSB7XG4gICAgICAgIHcgKz0gKHBhcnNlSW50KCRjaGlsZHJlbi5lcShpKS53aWR0aCgpKSArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHc7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEltYWdlU2xpZGVyLmlzLCBJbWFnZVNsaWRlcik7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3NsaWRlci5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9zbGlkZXIuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3NsaWRlci5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3N0eWxlcy5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9zdHlsZXMuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3N0eWxlcy5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IHsgY2xhc3NNYXAgfSBmcm9tIFwiLi4vdXRpbHMvZG9tLXV0aWxzXCI7XG5pbXBvcnQgeyBDRUVsZW1lbnQgfSBmcm9tIFwiLi4vY2UtZWxlbWVudFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBTd2l0Y2ggZXh0ZW5kcyBDRUVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgaXMgKCkge1xuICAgIHJldHVybiAnY2Utc3dpdGNoJztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzICgpIHtcbiAgICByZXR1cm4gWydkaXNhYmxlZCddO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3R5bGUgICAgICA9IC8qKiBAdHlwZSB7QXR0cmlidXRlfSAqLyAnJztcbiAgICB0aGlzLnN0eWxlQ2xhc3MgPSAvKiogQHR5cGUge0F0dHJpYnV0ZX0gKi8gJyc7XG4gICAgdGhpcy50YWJpbmRleCAgID0gLyoqIEB0eXBlIHtBdHRyaWJ1dGV9ICovIDA7XG4gICAgdGhpcy5pbnB1dElkICAgID0gLyoqIEB0eXBlIHtBdHRyaWJ1dGV9ICovICcnO1xuICAgIHRoaXMubmFtZSAgICAgICA9IC8qKiBAdHlwZSB7QXR0cmlidXRlfSAqLyAnJztcbiAgICB0aGlzLmRpc2FibGVkICAgPSAvKiogQHR5cGUge0F0dHJpYnV0ZX0gKi8gZmFsc2U7XG4gICAgdGhpcy5yZWFkb25seSAgID0gLyoqIEB0eXBlIHtBdHRyaWJ1dGV9ICovIGZhbHNlO1xuXG4gICAgdGhpcy4kaW5wdXRDaGVja2JveCA9IC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovIG51bGw7XG5cbiAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcblxuICB9XG5cbiAgX3JlbmRlcigpIHtcbiAgICBzdXBlci5fcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBzdXBlci5fY29weU9ic2VydmVkQXR0cmlidXRlcygpO1xuXG4gICAgdGhpcy5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiJHtjbGFzc01hcCh7XG4gICAgICAgICAgJ3VpLWlucHV0c3dpdGNoIHVpLXdpZGdldCc6IHRydWUsIFxuICAgICAgICAgICd1aS1pbnB1dHN3aXRjaC1jaGVja2VkJzogdGhpcy5jaGVja2VkLCBcbiAgICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLCBcbiAgICAgICAgICAndWktaW5wdXRzd2l0Y2gtcmVhZG9ubHknOiB0aGlzLnJlYWRvbmx5LCBcbiAgICAgICAgICAndWktaW5wdXRzd2l0Y2gtZm9jdXMnOiB0aGlzLmZvY3VzZWRcbiAgICAgICAgfSl9XCIgXG4gICAgICAgIEBjbGljaz1cIl9oYW5kbGVDbGlja0V2ZW50XCIgXG4gICAgICAgIHJvbGU9XCJjaGVja2JveFwiIGFyaWEtY2hlY2tlZD1cIiR7dGhpcy5jaGVja2VkfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgPGlucHV0ICRpbnB1dC1jaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7dGhpcy5pbnB1dElkfVwiIFxuICAgICAgICAgICAgbmFtZT1cIiR7dGhpcy5uYW1lfVwiIHRhYmluZGV4PVwidGFiaW5kZXhcIiBjaGVja2VkPVwiJHt0aGlzLmNoZWNrZWR9XCIgXG4gICAgICAgICAgICBAY2hhbmdlPVwiX2hhbmRsZUlucHV0Q2hhbmdlXCJcbiAgICAgICAgICAgIEBmb2N1cz1cIl9oYW5kbGVGb2N1c0V2ZW50XCIgXG4gICAgICAgICAgICBAYmx1cj1cIl9oYW5kbGVCbHVyRXZlbnRcIiBcbiAgICAgICAgICAgIGRpc2FibGVkPVwiJHt0aGlzLmRpc2FibGVkfVwiLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidWktaW5wdXRzd2l0Y2gtc2xpZGVyXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHN1cGVyLl9hdHRhY2hFbGVtZW50UmVmcygpO1xuICAgIHN1cGVyLl9hZGRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgX2hhbmRsZUNsaWNrRXZlbnQoZXZ0KSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7ICBcbiAgICAgIHRoaXMuX3RvZ2dsZShldmVudCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUlucHV0Q2hhbmdlKGV2dCkge1xuICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgdGhpcy5fdG9nZ2xlKGV2dCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUZvY3VzRXZlbnQoZXZ0KSB7XG4gICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gIH1cblxuICBfaGFuZGxlQmx1ckV2ZW50KGV2dCkge1xuICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgfVxuXG4gIF90b2dnbGUoZXZlbnQpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3N3aXRjaDp0b2dnbGUnLCB7XG4gICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgIGNoZWNrZWQ6IHRoaXMuY2hlY2tlZFxuICAgIH0pKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB0aGlzLiRpbnB1dENoZWNrYm94LmZvY3VzKCk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgKGF0dHJOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBcbiAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTd2l0Y2guaXMsIFN3aXRjaCk7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3N3aXRjaC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi9zd2l0Y2guc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3N3aXRjaC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG5jb25zdCBLRVlDT0RFID0ge1xuICBET1dOOiA0MCxcbiAgTEVGVDogMzcsXG4gIFJJR0hUOiAzOSxcbiAgVVA6IDM4LFxuICBIT01FOiAzNixcbiAgRU5EOiAzNSxcbn07XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgfVxuICAgIDo6c2xvdHRlZChjZS10YWItcGFuZWwpIHtcbiAgICAgIGZsZXgtYmFzaXM6IDEwMCU7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdCBuYW1lPVwidGFiXCI+PC9zbG90PlxuICA8c2xvdCBuYW1lPVwicGFuZWxcIj48L3Nsb3Q+XG5gO1xuXG5leHBvcnQgY2xhc3MgQ2VUYWJzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fb25TbG90Q2hhbmdlID0gdGhpcy5fb25TbG90Q2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgIHRoaXMuX3RhYlNsb3QgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc2xvdFtuYW1lPXRhYl0nKTtcbiAgICB0aGlzLl9wYW5lbFNsb3QgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc2xvdFtuYW1lPXBhbmVsXScpO1xuXG4gICAgdGhpcy5fdGFiU2xvdC5hZGRFdmVudExpc3RlbmVyKCdzbG90Y2hhbmdlJywgdGhpcy5fb25TbG90Q2hhbmdlKTtcbiAgICB0aGlzLl9wYW5lbFNsb3QuYWRkRXZlbnRMaXN0ZW5lcignc2xvdGNoYW5nZScsIHRoaXMuX29uU2xvdENoYW5nZSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgncm9sZScpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFibGlzdCcpO1xuXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgY3VzdG9tRWxlbWVudHMud2hlbkRlZmluZWQoJ2NlLXRhYicpLFxuICAgICAgY3VzdG9tRWxlbWVudHMud2hlbkRlZmluZWQoJ2NlLXRhYi1wYW5lbCcpLFxuICAgIF0pXG4gICAgLnRoZW4oXyA9PiB0aGlzLl9saW5rUGFuZWxzKCkpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBfb25TbG90Q2hhbmdlKCkge1xuICAgIHRoaXMuX2xpbmtQYW5lbHMoKTtcbiAgfVxuXG4gIF9saW5rUGFuZWxzKCkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLl9hbGxUYWJzKCk7XG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICBjb25zdCBwYW5lbCA9IHRhYi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBpZiAocGFuZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnY2UtdGFiLXBhbmVsJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBUYWIgIyR7dGFiLmlkfSBpcyBub3QgYSBzaWJsaW5nIG9mIGEgPGNlLXRhYi1wYW5lbD5gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgcGFuZWwuaWQpO1xuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCB0YWIuaWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRUYWIgPSB0YWJzLmZpbmQodGFiID0+IHRhYi5zZWxlY3RlZCkgfHwgdGFic1swXTtcblxuICAgIHRoaXMuX3NlbGVjdFRhYihzZWxlY3RlZFRhYik7XG4gIH1cblxuICBfYWxsUGFuZWxzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbCgnY2UtdGFiLXBhbmVsJykpO1xuICB9XG5cbiAgX2FsbFRhYnMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdjZS10YWInKSk7XG4gIH1cblxuICBfcGFuZWxGb3JUYWIodGFiKSB7XG4gICAgY29uc3QgcGFuZWxJZCA9IHRhYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKGAjJHtwYW5lbElkfWApO1xuICB9XG5cbiAgX3ByZXZUYWIoKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuX2FsbFRhYnMoKTtcbiAgICBsZXQgbmV3SWR4ID0gdGFicy5maW5kSW5kZXgodGFiID0+IHRhYi5zZWxlY3RlZCkgLSAxO1xuICAgIHJldHVybiB0YWJzWyhuZXdJZHggKyB0YWJzLmxlbmd0aCkgJSB0YWJzLmxlbmd0aF07XG4gIH1cblxuICBfZmlyc3RUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbFRhYnMoKVswXTtcbiAgfVxuXG4gIF9sYXN0VGFiKCkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLl9hbGxUYWJzKCk7XG4gICAgcmV0dXJuIHRhYnNbdGFicy5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIF9uZXh0VGFiKCkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLl9hbGxUYWJzKCk7XG4gICAgbGV0IG5ld0lkeCA9IHRhYnMuZmluZEluZGV4KHRhYiA9PiB0YWIuc2VsZWN0ZWQpICsgMTtcbiAgICByZXR1cm4gdGFic1tuZXdJZHggJSB0YWJzLmxlbmd0aF07XG4gIH1cblxuICByZXNldCgpIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy5fYWxsVGFicygpO1xuICAgIGNvbnN0IHBhbmVscyA9IHRoaXMuX2FsbFBhbmVscygpO1xuXG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuc2VsZWN0ZWQgPSBmYWxzZSk7XG4gICAgcGFuZWxzLmZvckVhY2gocGFuZWwgPT4gcGFuZWwuaGlkZGVuID0gdHJ1ZSk7XG4gIH1cblxuICBfc2VsZWN0VGFiKG5ld1RhYikge1xuXG4gICAgdGhpcy5yZXNldCgpO1xuXG4gICAgY29uc3QgbmV3UGFuZWwgPSB0aGlzLl9wYW5lbEZvclRhYihuZXdUYWIpO1xuXG4gICAgaWYgKCFuZXdQYW5lbClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gcGFuZWwgd2l0aCBpZCAke25ld1BhbmVsSWR9YCk7XG4gICAgbmV3VGFiLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICBuZXdQYW5lbC5oaWRkZW4gPSBmYWxzZTtcbiAgICBuZXdUYWIuZm9jdXMoKTtcbiAgfVxuXG4gIF9vbktleURvd24oZXZlbnQpIHtcblxuICAgIGlmIChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdyb2xlJykgIT09ICd0YWInKSByZXR1cm47XG4gICAgaWYgKGV2ZW50LmFsdEtleSkgcmV0dXJuO1xuXG4gICAgbGV0IG5ld1RhYjtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZQ09ERS5MRUZUOlxuICAgICAgY2FzZSBLRVlDT0RFLlVQOlxuICAgICAgICBuZXdUYWIgPSB0aGlzLl9wcmV2VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuUklHSFQ6XG4gICAgICBjYXNlIEtFWUNPREUuRE9XTjpcbiAgICAgICAgbmV3VGFiID0gdGhpcy5fbmV4dFRhYigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkhPTUU6XG4gICAgICAgIG5ld1RhYiA9IHRoaXMuX2ZpcnN0VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuRU5EOlxuICAgICAgICBuZXdUYWIgPSB0aGlzLl9sYXN0VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMuX3NlbGVjdFRhYihuZXdUYWIpO1xuICB9XG5cbiAgX29uQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgncm9sZScpICE9PSAndGFiJykgcmV0dXJuO1xuICAgIHRoaXMuX3NlbGVjdFRhYihldmVudC50YXJnZXQpO1xuICB9XG59XG5cbmxldCBjZVRhYkNvdW50ZXIgPSAwO1xuXG5leHBvcnQgY2xhc3MgQ2VUYWIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3NlbGVjdGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgaWYgKCF0aGlzLmlkKVxuICAgICAgdGhpcy5pZCA9IGBjZS10YWItZ2VuZXJhdGVkLSR7Y2VUYWJDb3VudGVyKyt9YDtcblxuICAgIC8vIFNldCBhIHdlbGwtZGVmaW5lZCBpbml0aWFsIHN0YXRlLlxuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgIHRoaXMuX3VwZ3JhZGVQcm9wZXJ0eSgnc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIF91cGdyYWRlUHJvcGVydHkocHJvcCkge1xuICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzW3Byb3BdO1xuICAgICAgZGVsZXRlIHRoaXNbcHJvcF07XG4gICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCB2YWx1ZSk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgdmFsdWUgPyAwIDogLTEpO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkKHZhbHVlKSB7XG4gICAgdmFsdWUgPSBCb29sZWFuKHZhbHVlKTtcbiAgICBpZiAodmFsdWUpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICB9XG59XG5cbmxldCBjZVBhbmVsQ291bnRlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDZVRhYlBhbmVsIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYGNlLXBhbmVsLWdlbmVyYXRlZC0ke2NlUGFuZWxDb3VudGVyKyt9YDtcbiAgfVxufSIsIlxuY29uc3QgS0VZQ09ERSA9IHtcbiAgU1BBQ0U6IDMyLFxuICBFTlRFUjogMTMsXG59O1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIDpob3N0KFtoaWRkZW5dKSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlVG9nZ2xlQnV0dG9uIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydwcmVzc2VkJywgJ2Rpc2FibGVkJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsICdmYWxzZScpO1xuXG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdwcmVzc2VkJyk7XG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdkaXNhYmxlZCcpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBfdXBncmFkZVByb3BlcnR5KHByb3ApIHtcbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgbGV0IHZhbHVlID0gdGhpc1twcm9wXTtcbiAgICAgIGRlbGV0ZSB0aGlzW3Byb3BdO1xuICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgc2V0IHByZXNzZWQodmFsdWUpIHtcbiAgICBjb25zdCBpc1ByZXNzZWQgPSBCb29sZWFuKHZhbHVlKTtcbiAgICBpZiAoaXNQcmVzc2VkKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3ByZXNzZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3ByZXNzZWQnKTtcbiAgfVxuXG4gIGdldCBwcmVzc2VkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgncHJlc3NlZCcpO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmIChpc0Rpc2FibGVkKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBjb25zdCBoYXNWYWx1ZSA9IG5ld1ZhbHVlICE9PSBudWxsO1xuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAncHJlc3NlZCc6XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCBoYXNWYWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIGhhc1ZhbHVlKTtcbiAgICAgICAgaWYgKGhhc1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBfb25LZXlEb3duKGV2ZW50KSB7XG5cbiAgICBpZiAoZXZlbnQuYWx0S2V5KSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZQ09ERS5TUEFDRTpcbiAgICAgIGNhc2UgS0VZQ09ERS5FTlRFUjpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlUHJlc3NlZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIF9vbkNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5fdG9nZ2xlUHJlc3NlZCgpO1xuICB9XG5cbiAgX3RvZ2dsZVByZXNzZWQoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICB0aGlzLnByZXNzZWQgPSAhdGhpcy5wcmVzc2VkO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBwcmVzc2VkOiB0aGlzLnByZXNzZWQsXG4gICAgICB9LFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICB9KSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDZVRvb2x0aXAgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zaG93ID0gdGhpcy5fc2hvdy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hpZGUgPSB0aGlzLl9oaWRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICd0b29sdGlwJyk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuXG4gICAgdGhpcy5faGlkZSgpO1xuXG4gICAgdGhpcy5fdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtZGVzY3JpYmVkYnk9JyArIHRoaXMuaWQgKyAnXScpO1xuXG4gICAgaWYgKCF0aGlzLl90YXJnZXQpIHJldHVybjtcblxuICAgIHRoaXMuX3RhcmdldC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX3Nob3cpO1xuICAgIHRoaXMuX3RhcmdldC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5faGlkZSk7XG4gICAgdGhpcy5fdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9zaG93KTtcbiAgICB0aGlzLl90YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX2hpZGUpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuX3RhcmdldCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fc2hvdyk7XG4gICAgdGhpcy5fdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9oaWRlKTtcbiAgICB0aGlzLl90YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX3Nob3cpO1xuICAgIHRoaXMuX3RhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5faGlkZSk7XG4gICAgdGhpcy5fdGFyZ2V0ID0gbnVsbDtcbiAgfVxuXG4gIF9zaG93KCkge1xuICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gIH1cblxuICBfaGlkZSgpIHtcbiAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gIH1cbn1cbiIsIlxuXG5jb25zdCBUcmVlRGF0YSA9IHtcbiAgXCJwYXRoXCI6IFwiLi9kb2NzXCIsXG4gIFwibmFtZVwiOiBcImRvY3NcIixcbiAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9hbmd1bGFyXCIsXG4gICAgICBcIm5hbWVcIjogXCJhbmd1bGFyXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2FuZ3VsYXIvYnJvYWRjYXN0ZXIubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJicm9hZGNhc3Rlci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2FuZ3VsYXIvZGVib3VuY2UubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJkZWJvdW5jZS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2FuZ3VsYXIvaHR0cC1pbnRlcmNlcHRvci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImh0dHAtaW50ZXJjZXB0b3IubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NsYXNzLm1kXCIsXG4gICAgICBcIm5hbWVcIjogXCJjbGFzcy5tZFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzXCIsXG4gICAgICBcIm5hbWVcIjogXCJjc3MzLWNvbXBvbmVudHNcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzL2Fycm93Lm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiYXJyb3cubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvYm94LXNoYWRvdy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImJveC1zaGFkb3cubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvY2hlY2tib3gubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJjaGVja2JveC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9tYXQtYm94LXNoYWRvdy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcIm1hdC1ib3gtc2hhZG93Lm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzL21vZGFsLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwibW9kYWwubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvcmFuZ2Utc2VsZWN0b3IubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJyYW5nZS1zZWxlY3Rvci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9yZXNwb25zaXZlLW1lbnUubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJyZXNwb25zaXZlLW1lbnUubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvc3RlcC1wcm9ncmVzcy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInN0ZXAtcHJvZ3Jlc3MubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvdG9nZ2xlLXN3aXRjaC5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInRvZ2dsZS1zd2l0Y2gubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvdmVydGljYWwtbm90aWZpY2F0aW9uLWJhci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInZlcnRpY2FsLW5vdGlmaWNhdGlvbi1iYXIubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2RvbVwiLFxuICAgICAgXCJuYW1lXCI6IFwiZG9tXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2RvbS9kb20taGFuZGxlci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImRvbS1oYW5kbGVyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tL2RvbS1vcGVyYXRpb25zLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZG9tLW9wZXJhdGlvbnMubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kb20vZG9tLXV0aWxzLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZG9tLXV0aWxzLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tL3Njcm9sbC10YWJsZS1jb2x1bW4ubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJzY3JvbGwtdGFibGUtY29sdW1uLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tL3Njcm9sbGFibGUtc2lkZWJhci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInNjcm9sbGFibGUtc2lkZWJhci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvZHNcIixcbiAgICAgIFwibmFtZVwiOiBcImRzXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2RzL2xpbmtlZC1saXN0Lm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwibGlua2VkLWxpc3QubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2ZpbGUtMy5tZFwiLFxuICAgICAgXCJuYW1lXCI6IFwiZmlsZS0zLm1kXCIsXG4gICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9mb2xkZXItMVwiLFxuICAgICAgXCJuYW1lXCI6IFwiZm9sZGVyLTFcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZm9sZGVyLTEvZmlsZS0xLjEubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJmaWxlLTEuMS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2ZvbGRlci0xL2ZpbGUtMS4yLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZmlsZS0xLjIubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2xpbnV4XCIsXG4gICAgICBcIm5hbWVcIjogXCJsaW51eFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9saW51eC9zc2gubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJzc2gubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21pc2NcIixcbiAgICAgIFwibmFtZVwiOiBcIm1pc2NcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvbWlzYy9jb3Jwb3JhdGUtcHJveHkubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJjb3Jwb3JhdGUtcHJveHkubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9taXNjL2dpdC1jb21tYW5kcy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImdpdC1jb21tYW5kcy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21pc2MvamVreWxsLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiamVreWxsLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvbWlzYy9qaXJhLWlzc3VlLWZpbHRlci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImppcmEtaXNzdWUtZmlsdGVyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9tb2JpbGVcIixcbiAgICAgIFwibmFtZVwiOiBcIm1vYmlsZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9tb2JpbGUvcmVhY3QtbmF0aXZlLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwicmVhY3QtbmF0aXZlLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9waHBcIixcbiAgICAgIFwibmFtZVwiOiBcInBocFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9waHAvY29tcG9zZXIubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJjb21wb3Nlci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvcmVhY3QtbmF0aXZlXCIsXG4gICAgICBcIm5hbWVcIjogXCJyZWFjdC1uYXRpdmVcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvcmVhY3QtbmF0aXZlL2Jhc2ljLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiYmFzaWMubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3JlZ2V4XCIsXG4gICAgICBcIm5hbWVcIjogXCJyZWdleFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9yZWdleC9jYW1lbGNhc2UubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJjYW1lbGNhc2UubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3JvaGl0Lm1kXCIsXG4gICAgICBcIm5hbWVcIjogXCJyb2hpdC5tZFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3Mvc2Nzc1wiLFxuICAgICAgXCJuYW1lXCI6IFwic2Nzc1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9zY3NzL2JveC1zaGFkb3cubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJib3gtc2hhZG93Lm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy92ZW5rYXQubWRcIixcbiAgICAgIFwibmFtZVwiOiBcInZlbmthdC5tZFwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgfVxuICBdXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJlZURhdGE7IiwiXG5cbmltcG9ydCBzdHlsZSBmcm9tICcuL3RyZWUuc2Nzcyc7XG5pbXBvcnQgVHJlZURhdGEgZnJvbSAnLi90cmVlLWRhdGEnO1xuXG5leHBvcnQgY2xhc3MgVHJlZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBzdGF0aWMgZ2V0IGlzICgpIHtcbiAgICByZXR1cm4gJ2NlLXRyZWUtdmlldyc7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcyAoKSB7XG4gICAgcmV0dXJuIFsnZGlzYWJsZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gYFxuICAgICAgPHN0eWxlPiR7c3R5bGV9PC9zdHlsZT5cbiAgICAgICR7dGhpcy5fcmVuZGVyVHJlZShbVHJlZURhdGFdKX1cbiAgICBgO1xuICB9XG5cbiAgX3JlbmRlclRyZWUgKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5idWlsZE5vZGUoZGF0YSk7XG4gIH1cblxuICBidWlsZE5vZGUgKGRhdGEpIHsgXG4gICAgcmV0dXJuIChgXG4gICAgICA8dWwgY2xhc3M9XCJjZS10cmVlLWNvbnRlbnRcIiBjZS10cmVlPVwiXCI+XG4gICAgICAgICR7ZGF0YS5yZWR1Y2UoKHQsIGQpID0+IHtcbiAgICAgICAgICB0ICs9IChgXG4gICAgICAgICAgICA8bGkgY2UtZm9sZGVyIGNsYXNzPVwiY2UtdHJlZS1mb2xkZXJcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJjZS10cmVlLWljb25cIiBkYXRhLXR5cGU9XCIke2QudHlwZX1cIj48L2k+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2UtdHJlZS1pdGVtLW5hbWVcIj4ke2QubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICR7ZC5jaGlsZHJlbiA/IHRoaXMuYnVpbGROb2RlKGQuY2hpbGRyZW4pIDogJyd9XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGApO1xuICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICB9LCAnJyl9XG4gICAgICA8L3VsPlxuICAgIGApO1xuICB9IFxuXG4gIGNvbm5lY3RlZENhbGxiYWNrICgpIHtcbiAgICBjb25zdCBmb2xkZXJzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbY2UtZm9sZGVyXScpO1xuICAgIEFycmF5LmZyb20oZm9sZGVycykuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB0aGlzLmhhbmRsZUNsaWNrKGV2dCwgZWwpKVxuICAgIH0pO1xuXG4gICAgLy8gRXhwYW5kIHRoZSB2ZXJ5IGZpcnN0IGZvbGRlclxuICAgIGZvbGRlcnNbMF0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gIH1cblxuICBoYW5kbGVDbGljayhldnQsIGVsKSB7XG4gICAgbGV0IGlzRXhwYW5kZWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICBpZihpc0V4cGFuZGVkID09PSAndHJ1ZScpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgfVxuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrICgpIHtcbiAgICBjb25zdCBmb2xkZXJzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbY2UtZm9sZGVyXScpO1xuICAgIEFycmF5LmZyb20oZm9sZGVycykuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB0aGlzLmhhbmRsZUNsaWNrKGV2dCwgZWwpKVxuICAgIH0pO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShUcmVlLmlzLCBUcmVlKTtcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS00LTIhLi90cmVlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3RyZWUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3RyZWUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8qXG4gKiBAQXV0aG9yOiBSYWprZXNod2FyIFByYXNhZChyYWprZXNod2FyLnBkQGdtYWlsLmNvbSkgXG4gKiBARGF0ZTogMjAxOS0wMi0yMyAyMzowMDo0MiBcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiBSYWprZXNod2FyIFByYXNhZFxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxOS0wMy0xOCAxOTo0MDozOFxuICovXG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPjwvc3R5bGU+XG4gIDxzbG90Pjwvc2xvdD5cbmA7XG5cbmV4cG9ydCBjbGFzcyBVaVJvdXRlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG4gIFxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnVWlSb3V0ZXIgcm9ja3Mgbm93Jyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYXR0YWNoZWRDYWxsYmFjayBjYWxsZWQnKTtcbiAgfVxuXG59XG5cblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgneHVpLXJvdXRlcicsIFVpUm91dGVyKTsiLCJcblxuZXhwb3J0IGNvbnN0IHJlcGVhdCA9IChsaXN0LCB0cGwpID0+IHtcbiAgcmV0dXJuIGxpc3QucmVkdWNlKCh0LCBpdCwgaSkgPT4gdCArIHRwbChpdCwgaSksICcnKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNsYXNzTWFwID0gKGNsYXNzT2JqKSA9PiB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhjbGFzc09iaikuZmlsdGVyKGNseiA9PiBjbGFzc09ialtjbHpdIHx8ICcnKS5qb2luKCcgJyk7XG59XG5cbmV4cG9ydCBjb25zdCBzdHlsZU1hcCA9IChzdHlsZU9iaikgPT4ge1xuICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGVPYmopLmZpbHRlcihzdHlsZSA9PiBzdHlsZU9ialtzdHlsZV0pLmpvaW4oJyAnKTtcbn1cblxuZXhwb3J0IGNvbnN0IHRvQ2FtZWxDYXNlID0gKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLygtW2Etel0pL2csIHQgPT4gdFsxXS50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IGNvbnN0IHRvU25ha2VDYXNlID0gKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1tBLVpdL2csIHQgPT4gJy0nICsgdC50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IGNvbnN0IEtleUNvZGUgPSB7XG4gIEJBQ0tTUEFDRTogOCxcbiAgVEFCOiA5LFxuICBDTEVBUjogMTIsXG4gIEVOVEVSOiAxMyxcbiAgU0hJRlQ6IDE2LFxuICBDT05UUk9MOiAxNyxcbiAgQUxUOiAxOCxcbiAgQ0FQU19MT0NLOiAyMCxcbiAgRVNDQVBFOiAyNyxcbiAgU1BBQ0VCQVI6IDMyLFxuICBQQUdFX1VQOiAzMyxcbiAgUEFHRV9ET1dOOiAzNCxcbiAgRU5EOiAzNSxcbiAgSE9NRTogMzYsXG4gIExFRlQ6IDM3LFxuICBVUDogMzgsXG4gIFJJR0hUOiAzOSxcbiAgRE9XTjogNDAsXG4gIElOU0VSVDogNDUsXG4gIERFTEVURTogNDYsXG4gIEhFTFA6IDQ3LFxuICBOVU1fTE9DSzogMTQ0XG59O1xuIiwiXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9lcy1zZXR0aW5ncyc7XG5cbmxldCBzZXR0aW5ncyA9IGRlZmF1bHRzO1xuXG5leHBvcnQgY2xhc3MgU2xpZGVyUmVmcmVzaCB7XG5cbiAgY29uc3RydWN0b3IoJGNoaWxkcmVuKSB7XG4gICAgdGhpcy5zbGlkZVZhbHVlID0gMDtcbiAgICB0aGlzLnBhZ2VyV2lkdGggPSAwO1xuICAgIHRoaXMuc2xpZGVXaWR0aCA9IDA7XG4gICAgdGhpcy50aHVtYldpZHRoID0gMDtcbiAgICB0aGlzLncgICAgICAgICAgPSAwO1xuICAgIHRoaXMuJGNoaWxkcmVuID0gJGNoaWxkcmVuO1xuICB9XG5cbiAgY2FsU1coKSB7XG4gICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuc2xpZGVXaWR0aCA9ICh0aGlzLmVsU2l6ZSAtICgoc2V0dGluZ3MuaXRlbSAqIChzZXR0aW5ncy5zbGlkZU1hcmdpbikpIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pKSAvIHNldHRpbmdzLml0ZW07XG4gICAgfVxuICB9XG5cbiAgY2FsV2lkdGgoY2xuKSB7XG4gICAgdmFyIGxuID0gY2xuID09PSB0cnVlID8gdGhpcy4kc2xpZGUuZmluZCgnLmxzbGlkZScpLmxlbmd0aCA6IHRoaXMuJGNoaWxkcmVuLmxlbmd0aDtcbiAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgdGhpcy53ID0gbG4gKiAodGhpcy5zbGlkZVdpZHRoICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLncgPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsbjsgaSsrKSB7XG4gICAgICAgIHRoaXMudyArPSAocGFyc2VJbnQodGhpcy4kY2hpbGRyZW4uZXEoaSkud2lkdGgoKSkgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnc7XG4gIH1cblxuICBjaGJyZWFrcG9pbnQoKSB7XG4gICAgbGV0IHdpbmRvd1cgPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICB0aGlzLndpbmRvd1cgPSB3aW5kb3dXO1xuXG4gICAgaWYgKHNldHRpbmdzLnJlc3BvbnNpdmUubGVuZ3RoKSB7XG4gICAgICB2YXIgaXRlbTtcbiAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgIGl0ZW0gPSBzZXR0aW5ncy5pdGVtO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvd1cgPCBzZXR0aW5ncy5yZXNwb25zaXZlWzBdLmJyZWFrcG9pbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXR0aW5ncy5yZXNwb25zaXZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHdpbmRvd1cgPCBzZXR0aW5ncy5yZXNwb25zaXZlW2ldLmJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgIGJyZWFrcG9pbnQgPSBzZXR0aW5ncy5yZXNwb25zaXZlW2ldLmJyZWFrcG9pbnQ7XG4gICAgICAgICAgICByZXNwb3NpdmVPYmogPSBzZXR0aW5ncy5yZXNwb25zaXZlW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiByZXNwb3NpdmVPYmogIT09ICd1bmRlZmluZWQnICYmIHJlc3Bvc2l2ZU9iaiAhPT0gbnVsbCkge1xuICAgICAgICBmb3IgKHZhciBqIGluIHJlc3Bvc2l2ZU9iai5zZXR0aW5ncykge1xuICAgICAgICAgIGlmIChyZXNwb3NpdmVPYmouc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoaikpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3NUZW1wW2pdID09PSAndW5kZWZpbmVkJyB8fCBzZXR0aW5nc1RlbXBbal0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgc2V0dGluZ3NUZW1wW2pdID0gc2V0dGluZ3Nbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXR0aW5nc1tqXSA9IHJlc3Bvc2l2ZU9iai5zZXR0aW5nc1tqXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KHNldHRpbmdzVGVtcCkgJiYgd2luZG93VyA+IHNldHRpbmdzLnJlc3BvbnNpdmVbMF0uYnJlYWtwb2ludCkge1xuICAgICAgICBmb3IgKHZhciBrIGluIHNldHRpbmdzVGVtcCkge1xuICAgICAgICAgIGlmIChzZXR0aW5nc1RlbXAuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgIHNldHRpbmdzW2tdID0gc2V0dGluZ3NUZW1wW2tdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHNsaWRlVmFsdWUgPiAwICYmIHRoaXMuc2xpZGVXaWR0aCA+IDApIHtcbiAgICAgICAgICBpZiAoaXRlbSAhPT0gc2V0dGluZ3MuaXRlbSkge1xuICAgICAgICAgICAgc2NlbmUgPSBNYXRoLnJvdW5kKHNsaWRlVmFsdWUgLyAoKHRoaXMuc2xpZGVXaWR0aCArIHNldHRpbmdzLnNsaWRlTWFyZ2luKSAqIHNldHRpbmdzLnNsaWRlTW92ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgaXRlbTogMyxcbiAgYXV0b1dpZHRoOiBmYWxzZSxcbiAgc2xpZGVNb3ZlOiAxLFxuICBzbGlkZU1hcmdpbjogMTAsXG4gIGFkZENsYXNzOiAnJyxcbiAgbW9kZTogJ3NsaWRlJyxcbiAgdXNlQ1NTOiB0cnVlLFxuICBjc3NFYXNpbmc6ICdlYXNlJywgLy8nY3ViaWMtYmV6aWVyKDAuMjUsIDAsIDAuMjUsIDEpJyxcbiAgZWFzaW5nOiAnbGluZWFyJywgLy8nZm9yIGpxdWVyeSBhbmltYXRpb24nLC8vXG4gIHNwZWVkOiA0MDAsIC8vbXMnXG4gIGF1dG86IGZhbHNlLFxuICBwYXVzZU9uSG92ZXI6IGZhbHNlLFxuICBsb29wOiBmYWxzZSxcbiAgc2xpZGVFbmRBbmltYXRpb246IHRydWUsXG4gIHBhdXNlOiAyMDAwLFxuICBrZXlQcmVzczogZmFsc2UsXG4gIGNvbnRyb2xzOiB0cnVlLFxuICBwcmV2SHRtbDogJycsXG4gIG5leHRIdG1sOiAnJyxcbiAgcnRsOiBmYWxzZSxcbiAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICB2ZXJ0aWNhbDogZmFsc2UsXG4gIHZlcnRpY2FsSGVpZ2h0OiA1MDAsXG4gIHZUaHVtYldpZHRoOiAxMDAsXG4gIHRodW1iSXRlbTogMTAsXG4gIHBhZ2VyOiB0cnVlLFxuICBnYWxsZXJ5OiBmYWxzZSxcbiAgZ2FsbGVyeU1hcmdpbjogNSxcbiAgdGh1bWJNYXJnaW46IDUsXG4gIGN1cnJlbnRQYWdlclBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgZW5hYmxlVG91Y2g6IHRydWUsXG4gIGVuYWJsZURyYWc6IHRydWUsXG4gIGZyZWVNb3ZlOiB0cnVlLFxuICBzd2lwZVRocmVzaG9sZDogNDAsXG4gIHJlc3BvbnNpdmU6IFtdLFxuICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gIG9uQmVmb3JlU3RhcnQ6IGZ1bmN0aW9uICgkZWwpIHsgfSxcbiAgb25TbGlkZXJMb2FkOiBmdW5jdGlvbiAoJGVsKSB7IH0sXG4gIG9uQmVmb3JlU2xpZGU6IGZ1bmN0aW9uICgkZWwsIHNjZW5lKSB7IH0sXG4gIG9uQWZ0ZXJTbGlkZTogZnVuY3Rpb24gKCRlbCwgc2NlbmUpIHsgfSxcbiAgb25CZWZvcmVOZXh0U2xpZGU6IGZ1bmN0aW9uICgkZWwsIHNjZW5lKSB7IH0sXG4gIG9uQmVmb3JlUHJldlNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkgeyB9XG4gIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0czsiLCJcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2VzLXNldHRpbmdzJztcbmltcG9ydCB7IFNsaWRlclJlZnJlc2ggfSBmcm9tICcuL2VzLXJlZnJlc2gnO1xuXG4oZnVuY3Rpb24gKCQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG4gIFxuICAkLmZuLmxpZ2h0U2xpZGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5saWdodFNsaWRlcihvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIHBsdWdpbiA9IHt9LFxuICAgICAgc2V0dGluZ3MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMpLFxuICAgICAgc2V0dGluZ3NUZW1wID0ge30sXG4gICAgICAkZWwgPSB0aGlzO1xuICAgICAgcGx1Z2luLiRlbCA9IHRoaXM7XG5cbiAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnKSB7XG4gICAgICBzZXR0aW5ncy52ZXJ0aWNhbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCd0aGlzJywgdGhpcy5jaGlsZHJlbigpKTtcblxuICAgIHZhciAkY2hpbGRyZW4gPSAkZWwuY2hpbGRyZW4oKSxcbiAgICAgIHdpbmRvd1cgPSAkKHdpbmRvdykud2lkdGgoKSxcbiAgICAgIGJyZWFrcG9pbnQgPSBudWxsLFxuICAgICAgcmVzcG9zaXZlT2JqID0gbnVsbCxcbiAgICAgIGxlbmd0aCA9IDAsXG4gICAgICB3ID0gMCxcbiAgICAgIG9uID0gZmFsc2UsXG4gICAgICBlbFNpemUgPSAwLFxuICAgICAgJHNsaWRlID0gJycsXG4gICAgICBzY2VuZSA9IDAsXG4gICAgICBwcm9wZXJ0eSA9IChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgPyAnaGVpZ2h0JyA6ICd3aWR0aCcsXG4gICAgICBndXR0ZXIgPSAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpID8gJ21hcmdpbi1ib3R0b20nIDogJ21hcmdpbi1yaWdodCcsXG4gICAgICBzbGlkZVZhbHVlID0gMCxcbiAgICAgIHBhZ2VyV2lkdGggPSAwLFxuICAgICAgc2xpZGVXaWR0aCA9IDAsXG4gICAgICB0aHVtYldpZHRoID0gMCxcbiAgICAgIGludGVydmFsID0gbnVsbCxcbiAgICAgIGlzVG91Y2ggPSAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcblxuICAgIHZhciByZWZyZXNoID0gbmV3IFNsaWRlclJlZnJlc2goJGNoaWxkcmVuKTtcblxuICAgIHBsdWdpbiA9IHtcbiAgICAgIGRvQ3NzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdXBwb3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB0cmFuc2l0aW9uID0gWyd0cmFuc2l0aW9uJywgJ01velRyYW5zaXRpb24nLCAnV2Via2l0VHJhbnNpdGlvbicsICdPVHJhbnNpdGlvbicsICdtc1RyYW5zaXRpb24nLCAnS2h0bWxUcmFuc2l0aW9uJ107XG4gICAgICAgICAgdmFyIHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc2l0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbltpXSBpbiByb290LnN0eWxlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHNldHRpbmdzLnVzZUNTUyAmJiBzdXBwb3J0KCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAga2V5UHJlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmtleVByZXNzKSB7XG4gICAgICAgICAgJChkb2N1bWVudCkub24oJ2tleXVwLmxpZ2h0c2xpZGVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghJCgnOmZvY3VzJykuaXMoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzNykge1xuICAgICAgICAgICAgICAgICRlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICAgICAgICAgICRlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5jb250cm9scykge1xuICAgICAgICAgICRlbC5hZnRlcignPGRpdiBjbGFzcz1cImxTQWN0aW9uXCI+PGEgY2xhc3M9XCJsU1ByZXZcIj4nICsgc2V0dGluZ3MucHJldkh0bWwgKyAnPC9hPjxhIGNsYXNzPVwibFNOZXh0XCI+JyArIHNldHRpbmdzLm5leHRIdG1sICsgJzwvYT48L2Rpdj4nKTtcbiAgICAgICAgICBpZiAoIXNldHRpbmdzLmF1dG9XaWR0aCkge1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA8PSBzZXR0aW5ncy5pdGVtKSB7XG4gICAgICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24nKS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChyZWZyZXNoLmNhbFdpZHRoKGZhbHNlKSA8IGVsU2l6ZSkge1xuICAgICAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uJykuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQodGhpcykuYXR0cignY2xhc3MnKSA9PT0gJ2xTUHJldicpIHtcbiAgICAgICAgICAgICAgJGVsLmdvVG9QcmV2U2xpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbml0aWFsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJykge1xuICAgICAgICAgIHNldHRpbmdzLmF1dG9XaWR0aCA9IGZhbHNlO1xuICAgICAgICAgIHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNldHRpbmdzLmF1dG8pIHtcbiAgICAgICAgICBzZXR0aW5ncy5zbGlkZUVuZEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGgpIHtcbiAgICAgICAgICBzZXR0aW5ncy5zbGlkZU1vdmUgPSAxO1xuICAgICAgICAgIHNldHRpbmdzLml0ZW0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XG4gICAgICAgICAgc2V0dGluZ3Muc2xpZGVNb3ZlID0gMTtcbiAgICAgICAgICBzZXR0aW5ncy5mcmVlTW92ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNldHRpbmdzLm9uQmVmb3JlU3RhcnQuY2FsbCh0aGlzLCAkZWwpO1xuICAgICAgICByZWZyZXNoLmNoYnJlYWtwb2ludCgpO1xuICAgICAgICAkZWwuYWRkQ2xhc3MoJ2xpZ2h0U2xpZGVyJykud3JhcCgnPGRpdiBjbGFzcz1cImxTU2xpZGVPdXRlciAnICsgc2V0dGluZ3MuYWRkQ2xhc3MgKyAnXCI+PGRpdiBjbGFzcz1cImxTU2xpZGVXcmFwcGVyXCI+PC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICRzbGlkZSA9ICRlbC5wYXJlbnQoJy5sU1NsaWRlV3JhcHBlcicpO1xuICAgICAgICBpZiAoc2V0dGluZ3MucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgJHNsaWRlLnBhcmVudCgpLmFkZENsYXNzKCdsU3J0bCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCkge1xuICAgICAgICAgICRzbGlkZS5wYXJlbnQoKS5hZGRDbGFzcygndmVydGljYWwnKTtcbiAgICAgICAgICBlbFNpemUgPSBzZXR0aW5ncy52ZXJ0aWNhbEhlaWdodDtcbiAgICAgICAgICAkc2xpZGUuY3NzKCdoZWlnaHQnLCBlbFNpemUgKyAncHgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbFNpemUgPSAkZWwub3V0ZXJXaWR0aCgpO1xuICAgICAgICB9XG4gICAgICAgICRjaGlsZHJlbi5hZGRDbGFzcygnbHNsaWRlJyk7XG4gICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICByZWZyZXNoLmNhbFNXKCk7XG4gICAgICAgICAgcmVmcmVzaC5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChyZWZyZXNoLmNhbFdpZHRoKHRydWUpID4gZWxTaXplKSB7XG4gICAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgICAgdmFyIHRXciA9IDAsXG4gICAgICAgICAgICAgICAgdEkgPSAwO1xuICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8ICRjaGlsZHJlbi5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIHRXciArPSAocGFyc2VJbnQoJGVsLmZpbmQoJy5sc2xpZGUnKS5lcShrKS53aWR0aCgpKSArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICAgICAgICAgICAgICB0SSsrO1xuICAgICAgICAgICAgICAgIGlmICh0V3IgPj0gKGVsU2l6ZSArIHNldHRpbmdzLnNsaWRlTWFyZ2luKSkge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciB0SXRlbSA9IHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gdHJ1ZSA/IHRJIDogc2V0dGluZ3MuaXRlbTtcblxuICAgICAgICAgICAgICAvKiovXG4gICAgICAgICAgICAgIGlmICh0SXRlbSA8ICRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoIC0gdEl0ZW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgJGNoaWxkcmVuLmVxKGkpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodEl0ZW0gPCAkZWwuZmluZCgnLmNsb25lLnJpZ2h0JykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9ICRjaGlsZHJlbi5sZW5ndGggLSAxOyBqID4gKCRjaGlsZHJlbi5sZW5ndGggLSAxIC0gJGVsLmZpbmQoJy5jbG9uZS5yaWdodCcpLmxlbmd0aCk7IGotLSkge1xuICAgICAgICAgICAgICAgICAgc2NlbmUtLTtcbiAgICAgICAgICAgICAgICAgICRjaGlsZHJlbi5lcShqKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLyoqL1xuICAgICAgICAgICAgICBmb3IgKHZhciBuID0gJGVsLmZpbmQoJy5jbG9uZS5yaWdodCcpLmxlbmd0aDsgbiA8IHRJdGVtOyBuKyspIHtcbiAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmxzbGlkZScpLmVxKG4pLmNsb25lKCkucmVtb3ZlQ2xhc3MoJ2xzbGlkZScpLmFkZENsYXNzKCdjbG9uZSByaWdodCcpLmFwcGVuZFRvKCRlbCk7XG4gICAgICAgICAgICAgICAgc2NlbmUrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IgKHZhciBtID0gJGVsLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGggLSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGg7IG0gPiAoJGVsLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGggLSB0SXRlbSk7IG0tLSkge1xuICAgICAgICAgICAgICAgICRlbC5maW5kKCcubHNsaWRlJykuZXEobSAtIDEpLmNsb25lKCkucmVtb3ZlQ2xhc3MoJ2xzbGlkZScpLmFkZENsYXNzKCdjbG9uZSBsZWZ0JykucHJlcGVuZFRvKCRlbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJGNoaWxkcmVuID0gJGVsLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoJGNoaWxkcmVuLmhhc0NsYXNzKCdjbG9uZScpKSB7XG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5jbG9uZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICR0aGlzLm1vdmUoJGVsLCAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVmcmVzaC5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2guc1NXID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxlbmd0aCA9ICRjaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLnJ0bCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGd1dHRlciA9ICdtYXJnaW4tbGVmdCc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAkY2hpbGRyZW4uY3NzKHByb3BlcnR5LCBzbGlkZVdpZHRoICsgJ3B4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgICRjaGlsZHJlbi5jc3MoZ3V0dGVyLCBzZXR0aW5ncy5zbGlkZU1hcmdpbiArICdweCcpO1xuICAgICAgICAgIHcgPSByZWZyZXNoLmNhbFdpZHRoKGZhbHNlKTtcbiAgICAgICAgICAkZWwuY3NzKHByb3BlcnR5LCB3ICsgJ3B4Jyk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgaWYgKG9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzY2VuZSA9ICRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlZnJlc2guY2FsTCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkY2hpbGRyZW4gPSAkZWwuY2hpbGRyZW4oKTtcbiAgICAgICAgICBsZW5ndGggPSAkY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kb0NzcygpKSB7XG4gICAgICAgICAgJHNsaWRlLmFkZENsYXNzKCd1c2luZ0NzcycpO1xuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2guY2FsTCgpO1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgIHJlZnJlc2guY2FsU1coKTtcbiAgICAgICAgICByZWZyZXNoLnNTVygpO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzbGlkZVZhbHVlID0gJHRoaXMuc2xpZGVWYWx1ZSgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlKCRlbCwgc2xpZGVWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SGVpZ2h0KCRlbCwgZmFsc2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0SGVpZ2h0KCRlbCwgdHJ1ZSk7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKCdsU0ZhZGUnKTtcbiAgICAgICAgICBpZiAoIXRoaXMuZG9Dc3MoKSkge1xuICAgICAgICAgICAgJGNoaWxkcmVuLmZhZGVPdXQoMCk7XG4gICAgICAgICAgICAkY2hpbGRyZW4uZXEoc2NlbmUpLmZhZGVJbigwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICRjaGlsZHJlbi5lcShzY2VuZSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRjaGlsZHJlbi5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBhZ2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgIHJlZnJlc2guY3JlYXRlUGFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGh1bWJXaWR0aCA9IChlbFNpemUgLSAoKHNldHRpbmdzLnRodW1iSXRlbSAqIChzZXR0aW5ncy50aHVtYk1hcmdpbikpIC0gc2V0dGluZ3MudGh1bWJNYXJnaW4pKSAvIHNldHRpbmdzLnRodW1iSXRlbTtcbiAgICAgICAgICB2YXIgJGNoaWxkcmVuID0gJHNsaWRlLmZpbmQoJy5sc2xpZGUnKTtcbiAgICAgICAgICB2YXIgbGVuZ3RoID0gJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGg7XG4gICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgcGFnZXJzID0gJycsXG4gICAgICAgICAgICB2ID0gMDtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBzY2VuZSAqIHNsaWRlIHZhbHVlXG4gICAgICAgICAgICAgIGlmICghc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdiA9IGkgKiAoKHNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHYgKz0gKChwYXJzZUludCgkY2hpbGRyZW4uZXEoaSkud2lkdGgoKSkgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGh1bWIgPSAkY2hpbGRyZW4uZXEoaSAqIHNldHRpbmdzLnNsaWRlTW92ZSkuYXR0cignZGF0YS10aHVtYicpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcGFnZXJzICs9ICc8bGkgc3R5bGU9XCJ3aWR0aDoxMDAlOycgKyBwcm9wZXJ0eSArICc6JyArIHRodW1iV2lkdGggKyAncHg7JyArIGd1dHRlciArICc6JyArIHNldHRpbmdzLnRodW1iTWFyZ2luICsgJ3B4XCI+PGEgaHJlZj1cIiNcIj48aW1nIHNyYz1cIicgKyB0aHVtYiArICdcIiAvPjwvYT48L2xpPic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYWdlcnMgKz0gJzxsaT48YSBocmVmPVwiI1wiPicgKyAoaSArIDEpICsgJzwvYT48L2xpPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICBpZiAoKHYpID49IHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbikge1xuICAgICAgICAgICAgICAgIGkgPSBpICsgMTtcbiAgICAgICAgICAgICAgICB2YXIgbWluUGdyID0gMjtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICBwYWdlcnMgKz0gJzxsaT48YSBocmVmPVwiI1wiPicgKyAoaSArIDEpICsgJzwvYT48L2xpPic7XG4gICAgICAgICAgICAgICAgICBtaW5QZ3IgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA8IG1pblBncikge1xuICAgICAgICAgICAgICAgICAgcGFnZXJzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICRzbGlkZS5wYXJlbnQoKS5hZGRDbGFzcygnbm9QYWdlcicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkc2xpZGUucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ25vUGFnZXInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyICRjU291dGVyID0gJHNsaWRlLnBhcmVudCgpO1xuICAgICAgICAgICRjU291dGVyLmZpbmQoJy5sU1BhZ2VyJykuaHRtbChwYWdlcnMpO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgLy8gc2V0IEdhbGxlcnkgdGh1bWJuYWlsIHdpZHRoXG4gICAgICAgICAgICAgICRjU291dGVyLmZpbmQoJy5sU1BhZ2VyJykuY3NzKCd3aWR0aCcsIHNldHRpbmdzLnZUaHVtYldpZHRoICsgJ3B4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWdlcldpZHRoID0gKGkgKiAoc2V0dGluZ3MudGh1bWJNYXJnaW4gKyB0aHVtYldpZHRoKSkgKyAwLjU7XG4gICAgICAgICAgICAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmNzcyh7XG4gICAgICAgICAgICAgIHByb3BlcnR5OiBwYWdlcldpZHRoICsgJ3B4JyxcbiAgICAgICAgICAgICAgJ3RyYW5zaXRpb24tZHVyYXRpb24nOiBzZXR0aW5ncy5zcGVlZCArICdtcydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICRzbGlkZS5wYXJlbnQoKS5jc3MoJ3BhZGRpbmctcmlnaHQnLCAoc2V0dGluZ3MudlRodW1iV2lkdGggKyBzZXR0aW5ncy5nYWxsZXJ5TWFyZ2luKSArICdweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGNTb3V0ZXIuZmluZCgnLmxTUGFnZXInKS5jc3MocHJvcGVydHksIHBhZ2VyV2lkdGggKyAncHgnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyICRwYWdlciA9ICRjU291dGVyLmZpbmQoJy5sU1BhZ2VyJykuZmluZCgnbGknKTtcbiAgICAgICAgICAkcGFnZXIuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJHBhZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgc2NlbmUgPSBzY2VuZSArICgkcGFnZXIuaW5kZXgodGhpcykgLSAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmZpbmQoJ2xpLmFjdGl2ZScpLmluZGV4KCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2NlbmUgPSAkcGFnZXIuaW5kZXgodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAkdGhpcy5zbGlkZVRodW1iKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzZXR0aW5ncy5wYWdlcikge1xuICAgICAgICAgIHZhciBjbCA9ICdsU3BnJztcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSkge1xuICAgICAgICAgICAgY2wgPSAnbFNHYWxsZXJ5JztcbiAgICAgICAgICB9XG4gICAgICAgICAgJHNsaWRlLmFmdGVyKCc8dWwgY2xhc3M9XCJsU1BhZ2VyICcgKyBjbCArICdcIj48L3VsPicpO1xuICAgICAgICAgIHZhciBnTWFyZ2luID0gKHNldHRpbmdzLnZlcnRpY2FsKSA/ICdtYXJnaW4tbGVmdCcgOiAnbWFyZ2luLXRvcCc7XG4gICAgICAgICAgJHNsaWRlLnBhcmVudCgpLmZpbmQoJy5sU1BhZ2VyJykuY3NzKGdNYXJnaW4sIHNldHRpbmdzLmdhbGxlcnlNYXJnaW4gKyAncHgnKTtcbiAgICAgICAgICByZWZyZXNoLmNyZWF0ZVBhZ2VyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZWZyZXNoLmluaXQoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9LFxuICAgICAgc2V0SGVpZ2h0OiBmdW5jdGlvbiAob2IsIGZhZGUpIHtcbiAgICAgICAgdmFyIG9iaiA9IG51bGwsXG4gICAgICAgICAgJHRoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCkge1xuICAgICAgICAgIG9iaiA9IG9iLmNoaWxkcmVuKCcubHNsaWRlICcpLmZpcnN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqID0gb2IuY2hpbGRyZW4oKS5maXJzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZXRDc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHRIID0gb2JqLm91dGVySGVpZ2h0KCksXG4gICAgICAgICAgICB0UCA9IDAsXG4gICAgICAgICAgICB0SFQgPSB0SDtcbiAgICAgICAgICBpZiAoZmFkZSkge1xuICAgICAgICAgICAgdEggPSAwO1xuICAgICAgICAgICAgdFAgPSAoKHRIVCkgKiAxMDApIC8gZWxTaXplO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvYi5jc3Moe1xuICAgICAgICAgICAgJ2hlaWdodCc6IHRIICsgJ3B4JyxcbiAgICAgICAgICAgICdwYWRkaW5nLWJvdHRvbSc6IHRQICsgJyUnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHNldENzcygpO1xuICAgICAgICBpZiAob2JqLmZpbmQoJ2ltZycpLmxlbmd0aCkge1xuICAgICAgICAgIGlmIChvYmouZmluZCgnaW1nJylbMF0uY29tcGxldGUpIHtcbiAgICAgICAgICAgIHNldENzcygpO1xuICAgICAgICAgICAgaWYgKCFpbnRlcnZhbCkge1xuICAgICAgICAgICAgICAkdGhpcy5hdXRvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iai5maW5kKCdpbWcnKS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0Q3NzKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWludGVydmFsKSB7XG4gICAgICAgICAgICAkdGhpcy5hdXRvKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWN0aXZlOiBmdW5jdGlvbiAob2IsIHQpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9Dc3MoKSAmJiBzZXR0aW5ncy5tb2RlID09PSAnZmFkZScpIHtcbiAgICAgICAgICAkc2xpZGUuYWRkQ2xhc3MoJ29uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNjID0gMDtcbiAgICAgICAgaWYgKHNjZW5lICogc2V0dGluZ3Muc2xpZGVNb3ZlIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgb2IucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgIGlmICghdGhpcy5kb0NzcygpICYmIHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJyAmJiB0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgb2IuZmFkZU91dChzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzYyA9IHNjZW5lO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzYyA9IHNjZW5lICogc2V0dGluZ3Muc2xpZGVNb3ZlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL3QgPT09IHRydWUgPyBzYyA9IHNjZW5lIDogc2MgPSBzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZTtcbiAgICAgICAgICB2YXIgbCwgbmw7XG4gICAgICAgICAgaWYgKHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGwgPSBvYi5sZW5ndGg7XG4gICAgICAgICAgICBubCA9IGwgLSAxO1xuICAgICAgICAgICAgaWYgKHNjICsgMSA+PSBsKSB7XG4gICAgICAgICAgICAgIHNjID0gbmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgIC8vdCA9PT0gdHJ1ZSA/IHNjID0gc2NlbmUgLSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGggOiBzYyA9IHNjZW5lICogc2V0dGluZ3Muc2xpZGVNb3ZlO1xuICAgICAgICAgICAgaWYgKHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgc2MgPSBzY2VuZSAtICRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNjID0gc2NlbmUgKiBzZXR0aW5ncy5zbGlkZU1vdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBsID0gb2IubGVuZ3RoO1xuICAgICAgICAgICAgICBubCA9IGwgLSAxO1xuICAgICAgICAgICAgICBpZiAoc2MgKyAxID09PSBsKSB7XG4gICAgICAgICAgICAgICAgc2MgPSBubDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChzYyArIDEgPiBsKSB7XG4gICAgICAgICAgICAgICAgc2MgPSAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCF0aGlzLmRvQ3NzKCkgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnICYmIHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBvYi5lcShzYykuZmFkZUluKHNldHRpbmdzLnNwZWVkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2IuZXEoc2MpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgb2IuZXEob2IubGVuZ3RoIC0gMSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgIGlmICghdGhpcy5kb0NzcygpICYmIHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJyAmJiB0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgb2IuZmFkZU91dChzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgICBvYi5lcShzYykuZmFkZUluKHNldHRpbmdzLnNwZWVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtb3ZlOiBmdW5jdGlvbiAob2IsIHYpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHYgPSAtdjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kb0NzcygpKSB7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBvYi5jc3Moe1xuICAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDBweCwgJyArICgtdikgKyAncHgsIDBweCknLFxuICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoMHB4LCAnICsgKC12KSArICdweCwgMHB4KSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYi5jc3Moe1xuICAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyAoLXYpICsgJ3B4LCAwcHgsIDBweCknLFxuICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyArICgtdikgKyAncHgsIDBweCwgMHB4KScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBvYi5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHRvcDogLXYgKyAncHgnXG4gICAgICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCwgc2V0dGluZ3MuZWFzaW5nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2IuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAtdiArICdweCdcbiAgICAgICAgICAgIH0sIHNldHRpbmdzLnNwZWVkLCBzZXR0aW5ncy5lYXNpbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgJHRodW1iID0gJHNsaWRlLnBhcmVudCgpLmZpbmQoJy5sU1BhZ2VyJykuZmluZCgnbGknKTtcbiAgICAgICAgdGhpcy5hY3RpdmUoJHRodW1iLCB0cnVlKTtcbiAgICAgIH0sXG4gICAgICBmYWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlKCRjaGlsZHJlbiwgZmFsc2UpO1xuICAgICAgICB2YXIgJHRodW1iID0gJHNsaWRlLnBhcmVudCgpLmZpbmQoJy5sU1BhZ2VyJykuZmluZCgnbGknKTtcbiAgICAgICAgdGhpcy5hY3RpdmUoJHRodW1iLCB0cnVlKTtcbiAgICAgIH0sXG4gICAgICBzbGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICByZWZyZXNoLmNhbFNsaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh3ID4gZWxTaXplKSB7XG4gICAgICAgICAgICBzbGlkZVZhbHVlID0gJHRoaXMuc2xpZGVWYWx1ZSgpO1xuICAgICAgICAgICAgJHRoaXMuYWN0aXZlKCRjaGlsZHJlbiwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKChzbGlkZVZhbHVlKSA+IHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbikge1xuICAgICAgICAgICAgICBzbGlkZVZhbHVlID0gdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzbGlkZVZhbHVlIDwgMCkge1xuICAgICAgICAgICAgICBzbGlkZVZhbHVlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICR0aGlzLm1vdmUoJGVsLCBzbGlkZVZhbHVlKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgaWYgKHNjZW5lID49IChsZW5ndGggLSAoJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoIC8gc2V0dGluZ3Muc2xpZGVNb3ZlKSkpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5yZXNldFNsaWRlKCRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHNjZW5lID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucmVzZXRTbGlkZSgkc2xpZGUuZmluZCgnLmxzbGlkZScpLmxlbmd0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlZnJlc2guY2FsU2xpZGUoKTtcbiAgICAgIH0sXG4gICAgICByZXNldFNsaWRlOiBmdW5jdGlvbiAocykge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uIGEnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2NlbmUgPSBzO1xuICAgICAgICAgICRzbGlkZS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCAnMG1zJyk7XG4gICAgICAgICAgc2xpZGVWYWx1ZSA9ICR0aGlzLnNsaWRlVmFsdWUoKTtcbiAgICAgICAgICAkdGhpcy5hY3RpdmUoJGNoaWxkcmVuLCBmYWxzZSk7XG4gICAgICAgICAgcGx1Z2luLm1vdmUoJGVsLCBzbGlkZVZhbHVlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzbGlkZS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBzZXR0aW5ncy5zcGVlZCArICdtcycpO1xuICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbiBhJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgfSwgNTApO1xuICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCArIDEwMCk7XG4gICAgICB9LFxuICAgICAgc2xpZGVWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3NWID0gMDtcbiAgICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBfc1YgPSBzY2VuZSAqICgoc2xpZGVXaWR0aCArIHNldHRpbmdzLnNsaWRlTWFyZ2luKSAqIHNldHRpbmdzLnNsaWRlTW92ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3NWID0gMDtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjZW5lOyBpKyspIHtcbiAgICAgICAgICAgIF9zViArPSAocGFyc2VJbnQoJGNoaWxkcmVuLmVxKGkpLndpZHRoKCkpICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3NWO1xuICAgICAgfSxcbiAgICAgIHNsaWRlVGh1bWI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBvc2l0aW9uO1xuICAgICAgICBzd2l0Y2ggKHNldHRpbmdzLmN1cnJlbnRQYWdlclBvc2l0aW9uKSB7XG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBwb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaWRkbGUnOlxuICAgICAgICAgICAgcG9zaXRpb24gPSAoZWxTaXplIC8gMikgLSAodGh1bWJXaWR0aCAvIDIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgcG9zaXRpb24gPSBlbFNpemUgLSB0aHVtYldpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzYyA9IHNjZW5lIC0gJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoO1xuICAgICAgICB2YXIgJHBhZ2VyID0gJHNsaWRlLnBhcmVudCgpLmZpbmQoJy5sU1BhZ2VyJyk7XG4gICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnICYmIHNldHRpbmdzLmxvb3AgPT09IHRydWUpIHtcbiAgICAgICAgICBpZiAoc2MgPj0gJHBhZ2VyLmNoaWxkcmVuKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBzYyA9IDA7XG4gICAgICAgICAgfSBlbHNlIGlmIChzYyA8IDApIHtcbiAgICAgICAgICAgIHNjID0gJHBhZ2VyLmNoaWxkcmVuKCkubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdGh1bWJTbGlkZSA9IHNjICogKCh0aHVtYldpZHRoICsgc2V0dGluZ3MudGh1bWJNYXJnaW4pKSAtIChwb3NpdGlvbik7XG4gICAgICAgIGlmICgodGh1bWJTbGlkZSArIGVsU2l6ZSkgPiBwYWdlcldpZHRoKSB7XG4gICAgICAgICAgdGh1bWJTbGlkZSA9IHBhZ2VyV2lkdGggLSBlbFNpemUgLSBzZXR0aW5ncy50aHVtYk1hcmdpbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGh1bWJTbGlkZSA8IDApIHtcbiAgICAgICAgICB0aHVtYlNsaWRlID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vdmUoJHBhZ2VyLCB0aHVtYlNsaWRlKTtcbiAgICAgIH0sXG4gICAgICBhdXRvOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5hdXRvKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZWwuZ29Ub05leHRTbGlkZSgpO1xuICAgICAgICAgIH0sIHNldHRpbmdzLnBhdXNlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBhdXNlT25Ib3ZlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoc2V0dGluZ3MuYXV0byAmJiBzZXR0aW5ncy5wYXVzZU9uSG92ZXIpIHtcbiAgICAgICAgICAkc2xpZGUub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdscy1ob3ZlcicpO1xuICAgICAgICAgICAgJGVsLnBhdXNlKCk7XG4gICAgICAgICAgICBzZXR0aW5ncy5hdXRvID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkc2xpZGUub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdscy1ob3ZlcicpO1xuICAgICAgICAgICAgaWYgKCEkc2xpZGUuZmluZCgnLmxpZ2h0U2xpZGVyJykuaGFzQ2xhc3MoJ2xzR3JhYmJpbmcnKSkge1xuICAgICAgICAgICAgICAkdGhpcy5hdXRvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3VjaE1vdmU6IGZ1bmN0aW9uIChlbmRDb29yZHMsIHN0YXJ0Q29vcmRzKSB7XG4gICAgICAgICRzbGlkZS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCAnMG1zJyk7XG4gICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgdmFyIGRpc3RhbmNlID0gZW5kQ29vcmRzIC0gc3RhcnRDb29yZHM7XG4gICAgICAgICAgdmFyIHN3aXBlVmFsID0gc2xpZGVWYWx1ZSAtIGRpc3RhbmNlO1xuICAgICAgICAgIGlmICgoc3dpcGVWYWwpID49IHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbikge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmZyZWVNb3ZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzd2lwZVZhbCA9IHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBzd2lwZVZhbFQgPSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW47XG4gICAgICAgICAgICAgIHN3aXBlVmFsID0gc3dpcGVWYWxUICsgKChzd2lwZVZhbCAtIHN3aXBlVmFsVCkgLyA1KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoc3dpcGVWYWwgPCAwKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuZnJlZU1vdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHN3aXBlVmFsID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN3aXBlVmFsID0gc3dpcGVWYWwgLyA1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmUoJGVsLCBzd2lwZVZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIHRvdWNoRW5kOiBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcbiAgICAgICAgJHNsaWRlLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHNldHRpbmdzLnNwZWVkICsgJ21zJyk7XG4gICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgdmFyIG14VmFsID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9uZXh0ID0gdHJ1ZTtcbiAgICAgICAgICBzbGlkZVZhbHVlID0gc2xpZGVWYWx1ZSAtIGRpc3RhbmNlO1xuICAgICAgICAgIGlmICgoc2xpZGVWYWx1ZSkgPiB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgIHNsaWRlVmFsdWUgPSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW47XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBteFZhbCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChzbGlkZVZhbHVlIDwgMCkge1xuICAgICAgICAgICAgc2xpZGVWYWx1ZSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBnQyA9IGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgICAgICB2YXIgYWQgPSAwO1xuICAgICAgICAgICAgaWYgKCFteFZhbCkge1xuICAgICAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgICAgIGFkID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzZXR0aW5ncy5hdXRvV2lkdGgpIHtcbiAgICAgICAgICAgICAgdmFyIG51bSA9IHNsaWRlVmFsdWUgLyAoKHNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgICAgICAgICAgICBzY2VuZSA9IHBhcnNlSW50KG51bSkgKyBhZDtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlVmFsdWUgPj0gKHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbikpIHtcbiAgICAgICAgICAgICAgICBpZiAobnVtICUgMSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgc2NlbmUrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciB0VyA9IDA7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdFcgKz0gKHBhcnNlSW50KCRjaGlsZHJlbi5lcShpKS53aWR0aCgpKSArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICAgICAgICAgICAgICBzY2VuZSA9IGkgKyBhZDtcbiAgICAgICAgICAgICAgICBpZiAodFcgPj0gc2xpZGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoZGlzdGFuY2UgPj0gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGdDKGZhbHNlKTtcbiAgICAgICAgICAgIF9uZXh0ID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChkaXN0YW5jZSA8PSAtc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGdDKHRydWUpO1xuICAgICAgICAgICAgX25leHQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJGVsLm1vZGUoX25leHQpO1xuICAgICAgICAgIHRoaXMuc2xpZGVUaHVtYigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChkaXN0YW5jZSA+PSBzZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgJGVsLmdvVG9QcmV2U2xpZGUoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpc3RhbmNlIDw9IC1zZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgJGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cblxuXG4gICAgICBlbmFibGVEcmFnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghaXNUb3VjaCkge1xuICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IDAsXG4gICAgICAgICAgICBlbmRDb29yZHMgPSAwLFxuICAgICAgICAgICAgaXNEcmFnaW5nID0gZmFsc2U7XG4gICAgICAgICAgJHNsaWRlLmZpbmQoJy5saWdodFNsaWRlcicpLmFkZENsYXNzKCdsc0dyYWInKTtcbiAgICAgICAgICAkc2xpZGUub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodyA8IGVsU2l6ZSkge1xuICAgICAgICAgICAgICBpZiAodyAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmF0dHIoJ2NsYXNzJykgIT09ICgnbFNQcmV2JykgJiYgJChlLnRhcmdldCkuYXR0cignY2xhc3MnKSAhPT0gKCdsU05leHQnKSkge1xuICAgICAgICAgICAgICBzdGFydENvb3JkcyA9IChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgPyBlLnBhZ2VZIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgaXNEcmFnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vICoqIEZpeCBmb3Igd2Via2l0IGN1cnNvciBpc3N1ZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjY3MjNcbiAgICAgICAgICAgICAgJHNsaWRlLnNjcm9sbExlZnQgKz0gMTtcbiAgICAgICAgICAgICAgJHNsaWRlLnNjcm9sbExlZnQgLT0gMTtcbiAgICAgICAgICAgICAgLy8gKlxuICAgICAgICAgICAgICAkc2xpZGUuZmluZCgnLmxpZ2h0U2xpZGVyJykucmVtb3ZlQ2xhc3MoJ2xzR3JhYicpLmFkZENsYXNzKCdsc0dyYWJiaW5nJyk7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgICQod2luZG93KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChpc0RyYWdpbmcpIHtcbiAgICAgICAgICAgICAgZW5kQ29vcmRzID0gKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSA/IGUucGFnZVkgOiBlLnBhZ2VYO1xuICAgICAgICAgICAgICAkdGhpcy50b3VjaE1vdmUoZW5kQ29vcmRzLCBzdGFydENvb3Jkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJCh3aW5kb3cpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChpc0RyYWdpbmcpIHtcbiAgICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5saWdodFNsaWRlcicpLnJlbW92ZUNsYXNzKCdsc0dyYWJiaW5nJykuYWRkQ2xhc3MoJ2xzR3JhYicpO1xuICAgICAgICAgICAgICBpc0RyYWdpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgZW5kQ29vcmRzID0gKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSA/IGUucGFnZVkgOiBlLnBhZ2VYO1xuICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBlbmRDb29yZHMgLSBzdGFydENvb3JkcztcbiAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlKSA+PSBzZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICQod2luZG93KS5vbignY2xpY2subHMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAkKHdpbmRvdykub2ZmKCdjbGljay5scycpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgJHRoaXMudG91Y2hFbmQoZGlzdGFuY2UpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cblxuXG5cbiAgICAgIGVuYWJsZVRvdWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgICAgdmFyIHN0YXJ0Q29vcmRzID0ge30sXG4gICAgICAgICAgICBlbmRDb29yZHMgPSB7fTtcbiAgICAgICAgICAkc2xpZGUub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZW5kQ29vcmRzID0gZS5vcmlnaW5hbEV2ZW50LnRhcmdldFRvdWNoZXNbMF07XG4gICAgICAgICAgICBzdGFydENvb3Jkcy5wYWdlWCA9IGUub3JpZ2luYWxFdmVudC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICAgICAgc3RhcnRDb29yZHMucGFnZVkgPSBlLm9yaWdpbmFsRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgICRzbGlkZS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICh3IDwgZWxTaXplKSB7XG4gICAgICAgICAgICAgIGlmICh3ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3JpZyA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIGVuZENvb3JkcyA9IG9yaWcudGFyZ2V0VG91Y2hlc1swXTtcbiAgICAgICAgICAgIHZhciB4TW92ZW1lbnQgPSBNYXRoLmFicyhlbmRDb29yZHMucGFnZVggLSBzdGFydENvb3Jkcy5wYWdlWCk7XG4gICAgICAgICAgICB2YXIgeU1vdmVtZW50ID0gTWF0aC5hYnMoZW5kQ29vcmRzLnBhZ2VZIC0gc3RhcnRDb29yZHMucGFnZVkpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGlmICgoeU1vdmVtZW50ICogMykgPiB4TW92ZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMudG91Y2hNb3ZlKGVuZENvb3Jkcy5wYWdlWSwgc3RhcnRDb29yZHMucGFnZVkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCh4TW92ZW1lbnQgKiAzKSA+IHlNb3ZlbWVudCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkdGhpcy50b3VjaE1vdmUoZW5kQ29vcmRzLnBhZ2VYLCBzdGFydENvb3Jkcy5wYWdlWCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkc2xpZGUub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHcgPCBlbFNpemUpIHtcbiAgICAgICAgICAgICAgaWYgKHcgIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBkaXN0YW5jZSA9IGVuZENvb3Jkcy5wYWdlWSAtIHN0YXJ0Q29vcmRzLnBhZ2VZO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGlzdGFuY2UgPSBlbmRDb29yZHMucGFnZVggLSBzdGFydENvb3Jkcy5wYWdlWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICR0aGlzLnRvdWNoRW5kKGRpc3RhbmNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgICR0aGlzLmluaXRpYWxTdHlsZSgpO1xuICAgICAgICBpZiAodGhpcy5kb0NzcygpKSB7XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZW5hYmxlVG91Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICAgICR0aGlzLmVuYWJsZVRvdWNoKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZXR0aW5ncy5lbmFibGVEcmFnID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkdGhpcy5lbmFibGVEcmFnKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdmb2N1cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkdGhpcy5hdXRvKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQod2luZG93KS5vbignYmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHRoaXMucGFnZXIoKTtcbiAgICAgICAgJHRoaXMucGF1c2VPbkhvdmVyKCk7XG4gICAgICAgICR0aGlzLmNvbnRyb2xzKCk7XG4gICAgICAgICR0aGlzLmtleVByZXNzKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBwbHVnaW4uYnVpbGQoKTtcbiAgICByZWZyZXNoLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZWZyZXNoLmNoYnJlYWtwb2ludCgpO1xuICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5pdGVtID4gMSkge1xuICAgICAgICAgIGVsU2l6ZSA9IHNldHRpbmdzLnZlcnRpY2FsSGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsU2l6ZSA9ICRjaGlsZHJlbi5vdXRlckhlaWdodCgpO1xuICAgICAgICB9XG4gICAgICAgICRzbGlkZS5jc3MoJ2hlaWdodCcsIGVsU2l6ZSArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxTaXplID0gJHNsaWRlLm91dGVyV2lkdGgoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgcmVmcmVzaC5jbG9uZSgpO1xuICAgICAgfVxuICAgICAgcmVmcmVzaC5jYWxMKCk7XG4gICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2xTU2xpZGUnKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgIHJlZnJlc2guY2FsU1coKTtcbiAgICAgICAgcmVmcmVzaC5zU1coKTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICRlbC5hZGRDbGFzcygnbFNTbGlkZScpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICAgIGlmIChzZXR0aW5ncy5wYWdlcikge1xuICAgICAgICByZWZyZXNoLmNyZWF0ZVBhZ2VyKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUgJiYgc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICRlbC5jc3MoJ2hlaWdodCcsICRjaGlsZHJlbi5lcShzY2VuZSkub3V0ZXJIZWlnaHQodHJ1ZSkpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0ID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHBsdWdpbi5zZXRIZWlnaHQoJGVsLCBmYWxzZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsdWdpbi5hdXRvKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsdWdpbi5zZXRIZWlnaHQoJGVsLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgcGx1Z2luLnNsaWRlVGh1bWIoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgIHBsdWdpbi5zbGlkZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCRjaGlsZHJlbi5sZW5ndGggPD0gc2V0dGluZ3MuaXRlbSkge1xuICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24nKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbicpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKChyZWZyZXNoLmNhbFdpZHRoKGZhbHNlKSA8IGVsU2l6ZSkgJiYgKHcgIT09IDApKSB7XG4gICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbicpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uJykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAkZWwuZ29Ub1ByZXZTbGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzY2VuZSA+IDApIHtcbiAgICAgICAgc2V0dGluZ3Mub25CZWZvcmVQcmV2U2xpZGUuY2FsbCh0aGlzLCAkZWwsIHNjZW5lKTtcbiAgICAgICAgc2NlbmUtLTtcbiAgICAgICAgJGVsLm1vZGUoZmFsc2UpO1xuICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHBsdWdpbi5zbGlkZVRodW1iKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlKSB7XG4gICAgICAgICAgc2V0dGluZ3Mub25CZWZvcmVQcmV2U2xpZGUuY2FsbCh0aGlzLCAkZWwsIHNjZW5lKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnKSB7XG4gICAgICAgICAgICB2YXIgbCA9IChsZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHNjZW5lID0gcGFyc2VJbnQobCAvIHNldHRpbmdzLnNsaWRlTW92ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICRlbC5tb2RlKGZhbHNlKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcGx1Z2luLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2xlZnRFbmQnKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnbGVmdEVuZCcpO1xuICAgICAgICAgIH0sIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgICRlbC5nb1RvTmV4dFNsaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5leHRJID0gdHJ1ZTtcbiAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgIHZhciBfc2xpZGVWYWx1ZSA9IHBsdWdpbi5zbGlkZVZhbHVlKCk7XG4gICAgICAgIG5leHRJID0gX3NsaWRlVmFsdWUgPCB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW47XG4gICAgICB9XG4gICAgICBpZiAoKChzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZSkgPCBsZW5ndGggLSBzZXR0aW5ncy5zbGlkZU1vdmUpICYmIG5leHRJKSB7XG4gICAgICAgIHNldHRpbmdzLm9uQmVmb3JlTmV4dFNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgIHNjZW5lKys7XG4gICAgICAgICRlbC5tb2RlKGZhbHNlKTtcbiAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICBwbHVnaW4uc2xpZGVUaHVtYigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNldHRpbmdzLm9uQmVmb3JlTmV4dFNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgICAgc2NlbmUgPSAwO1xuICAgICAgICAgICRlbC5tb2RlKGZhbHNlKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcGx1Z2luLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ3JpZ2h0RW5kJyk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ3JpZ2h0RW5kJyk7XG4gICAgICAgICAgfSwgNDAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgJGVsLm1vZGUgPSBmdW5jdGlvbiAoX3RvdWNoKSB7XG4gICAgICBpZiAoc2V0dGluZ3MuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUgJiYgc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICRlbC5jc3MoJ2hlaWdodCcsICRjaGlsZHJlbi5lcShzY2VuZSkub3V0ZXJIZWlnaHQodHJ1ZSkpO1xuICAgICAgfVxuICAgICAgaWYgKG9uID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgIGlmIChwbHVnaW4uZG9Dc3MoKSkge1xuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdsU1NsaWRlJyk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3Muc3BlZWQgIT09ICcnKSB7XG4gICAgICAgICAgICAgICRzbGlkZS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBzZXR0aW5ncy5zcGVlZCArICdtcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmNzc0Vhc2luZyAhPT0gJycpIHtcbiAgICAgICAgICAgICAgJHNsaWRlLmNzcygndHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nLCBzZXR0aW5ncy5jc3NFYXNpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocGx1Z2luLmRvQ3NzKCkpIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5zcGVlZCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgJGVsLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHNldHRpbmdzLnNwZWVkICsgJ21zJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuY3NzRWFzaW5nICE9PSAnJykge1xuICAgICAgICAgICAgICAkZWwuY3NzKCd0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbicsIHNldHRpbmdzLmNzc0Vhc2luZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIV90b3VjaCkge1xuICAgICAgICBzZXR0aW5ncy5vbkJlZm9yZVNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICBwbHVnaW4uc2xpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBsdWdpbi5mYWRlKCk7XG4gICAgICB9XG4gICAgICBpZiAoISRzbGlkZS5oYXNDbGFzcygnbHMtaG92ZXInKSkge1xuICAgICAgICBwbHVnaW4uYXV0bygpO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghX3RvdWNoKSB7XG4gICAgICAgICAgc2V0dGluZ3Mub25BZnRlclNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHNldHRpbmdzLnNwZWVkKTtcbiAgICAgIG9uID0gdHJ1ZTtcbiAgICB9O1xuICAgICRlbC5wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgIHNldHRpbmdzLmF1dG8gPSB0cnVlO1xuICAgICAgcGx1Z2luLmF1dG8oKTtcbiAgICB9O1xuICAgICRlbC5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldHRpbmdzLmF1dG8gPSBmYWxzZTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH07XG4gICAgJGVsLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZWZyZXNoLmluaXQoKTtcbiAgICB9O1xuICAgICRlbC5nZXRDdXJyZW50U2xpZGVDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzYyA9IHNjZW5lO1xuICAgICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcbiAgICAgICAgdmFyIGxuID0gJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGgsXG4gICAgICAgICAgY2wgPSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGg7XG4gICAgICAgIGlmIChzY2VuZSA8PSBjbCAtIDEpIHtcbiAgICAgICAgICBzYyA9IGxuICsgKHNjZW5lIC0gY2wpO1xuICAgICAgICB9IGVsc2UgaWYgKHNjZW5lID49IChsbiArIGNsKSkge1xuICAgICAgICAgIHNjID0gc2NlbmUgLSBsbiAtIGNsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjID0gc2NlbmUgLSBjbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNjICsgMTtcbiAgICB9O1xuICAgICRlbC5nZXRUb3RhbFNsaWRlQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGg7XG4gICAgfTtcbiAgICAkZWwuZ29Ub1NsaWRlID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XG4gICAgICAgIHNjZW5lID0gKHMgKyAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGggLSAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjZW5lID0gcztcbiAgICAgIH1cbiAgICAgICRlbC5tb2RlKGZhbHNlKTtcbiAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgIHBsdWdpbi5zbGlkZVRodW1iKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICAkZWwuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkZWwubGlnaHRTbGlkZXIpIHtcbiAgICAgICAgJGVsLmdvVG9QcmV2U2xpZGUgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5nb1RvTmV4dFNsaWRlID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAkZWwubW9kZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgJGVsLnBsYXkgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5wYXVzZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgJGVsLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5nZXRDdXJyZW50U2xpZGVDb3VudCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgJGVsLmdldFRvdGFsU2xpZGVDb3VudCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgJGVsLmdvVG9TbGlkZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgJGVsLmxpZ2h0U2xpZGVyID0gbnVsbDtcbiAgICAgICAgcmVmcmVzaCA9IHtcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7IH1cbiAgICAgICAgfTtcbiAgICAgICAgJGVsLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5sU0FjdGlvbiwgLmxTUGFnZXInKS5yZW1vdmUoKTtcbiAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdsaWdodFNsaWRlciBsU0ZhZGUgbFNTbGlkZSBsc0dyYWIgbHNHcmFiYmluZyBsZWZ0RW5kIHJpZ2h0JykucmVtb3ZlQXR0cignc3R5bGUnKS51bndyYXAoKS51bndyYXAoKTtcbiAgICAgICAgJGVsLmNoaWxkcmVuKCkucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgJGNoaWxkcmVuLnJlbW92ZUNsYXNzKCdsc2xpZGUgYWN0aXZlJyk7XG4gICAgICAgICRlbC5maW5kKCcuY2xvbmUnKS5yZW1vdmUoKTtcbiAgICAgICAgJGNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgaW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICBvbiA9IGZhbHNlO1xuICAgICAgICBzY2VuZSA9IDA7XG4gICAgICB9XG5cbiAgICB9O1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2V0dGluZ3Mub25TbGlkZXJMb2FkLmNhbGwodGhpcywgJGVsKTtcbiAgICB9LCAxMCk7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoLmluaXQoKTtcbiAgICAgIH0sIDIwMCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG59KGpRdWVyeSkpOyIsIi8qXG4gKiBAQXV0aG9yOiBSYWprZXNod2FyIFByYXNhZChyYWprZXNod2FyLnBkQGdtYWlsLmNvbSkgXG4gKiBARGF0ZTogMjAxOS0wMi0yMyAyMjoyNDozMiBcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiBSYWprZXNod2FyIFByYXNhZFxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxOS0wMy0zMSAxNjozODo0MlxuICovXG5cbnJlcXVpcmUoJy4vYXBwL3N0eWxlcy5zY3NzJyk7XG5yZXF1aXJlKCcuL2FwcC9zbGlkZXIvc2xpZGVyLnNjc3MnKTtcbnJlcXVpcmUoJy4vYXBwL2NlLWNoZWNrYm94L2NoZWNrYm94LnNjc3MnKTtcbnJlcXVpcmUoJy4vYXBwL2NoaXBzL2NoaXBzLnNjc3MnKTtcbnJlcXVpcmUoJy4vYXBwL3N3aXRjaC9zd2l0Y2guc2NzcycpO1xucmVxdWlyZSgnLi9hcHAvbWVzc2FnZS9tZXNzYWdlLnNjc3MnKTtcbnJlcXVpcmUoJy4vYXNzZXRzL2VzLXNsaWRlcicpO1xuXG5yZXF1aXJlKCcuL2FwcC9jZS1lbGVtZW50Jyk7XG5cbmltcG9ydCBDZUNoZWNrYm94IGZyb20gJy4vYXBwL2NoZWNrYm94L2NlLWNoZWNrYm94JztcbmltcG9ydCB7IFxuICBDZUFjY29yZGlvbiwgQ2VBY2NvcmRpb25IZWFkaW5nLCBDZUFjY29yZGlvblBhbmVsIFxufSBmcm9tICcuL2FwcC9hY2NvcmRpb24vY2UtYWNjb3JkaW9uJztcblxuaW1wb3J0IHsgQ2VUYWIsIENlVGFicywgQ2VUYWJQYW5lbCB9IGZyb20gJy4vYXBwL3RhYnMvY2UtdGFiJztcbmltcG9ydCB7IENlVG9nZ2xlQnV0dG9uIH0gZnJvbSAnLi9hcHAvdG9nZ2xlL2NlLXRvZ2dsZSc7XG5pbXBvcnQgeyBDZVRvb2x0aXAgfSBmcm9tICcuL2FwcC90b29sdGlwL2NlLXRvb2x0aXAnO1xuaW1wb3J0IHsgQ2VSYWRpb0J1dHRvbiwgQ2VSYWRpb0dyb3VwIH0gZnJvbSAnLi9hcHAvcmFkaW9ncm91cC9jZS1yYWRpb2dyb3VwJztcblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2ViLWNoZWNrYm94JywgQ2VDaGVja2JveCk7IFxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1hY2NvcmRpb24nLCBDZUFjY29yZGlvbik7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1hY2NvcmRpb24taGVhZGluZycsIENlQWNjb3JkaW9uSGVhZGluZyk7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1hY2NvcmRpb24tcGFuZWwnLCBDZUFjY29yZGlvblBhbmVsKTtcblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtdGFiJywgQ2VUYWIpO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtdGFicycsIENlVGFicyk7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS10YWItcGFuZWwnLCBDZVRhYlBhbmVsKTsgXG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRvZ2dsZS1idXR0b24nLCBDZVRvZ2dsZUJ1dHRvbik7XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRvb2x0aXAnLCBDZVRvb2x0aXApO1xuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1yYWRpby1idXR0b24nLCBDZVJhZGlvQnV0dG9uKTtcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXJhZGlvLWdyb3VwJywgQ2VSYWRpb0dyb3VwKTtcblxuXG5yZXF1aXJlKCcuL2FwcC91aS1yb3V0ZXInKTtcbnJlcXVpcmUoJy4vYXBwL2xpbmtzJyk7XG5yZXF1aXJlKCcuL2FwcC9ldmVudC9ldmVudCcpO1xuXG5yZXF1aXJlKCcuL2FwcC9idXR0b24vYnV0dG9uJyk7XG5yZXF1aXJlKCcuL2FwcC90cmVlL3RyZWUnKTtcbnJlcXVpcmUoJy4vYXBwL3NsaWRlci9zbGlkZXInKTtcbnJlcXVpcmUoJy4vYXBwL3NsaWRlci9jZS1zbGlkZXInKTtcbnJlcXVpcmUoJy4vYXBwL2NlLWNoZWNrYm94L2NoZWNrYm94Jyk7XG5yZXF1aXJlKCcuL2FwcC9jaGlwcy9jaGlwcycpO1xucmVxdWlyZSgnLi9hcHAvc3dpdGNoL3N3aXRjaCcpO1xucmVxdWlyZSgnLi9hcHAvbWVzc2FnZS9tZXNzYWdlJyk7XG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9