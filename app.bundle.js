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
/******/ 	var hotCurrentHash = "8cc1f73e23744ab9fe50";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ByaW1laWNvbnMvcHJpbWVpY29ucy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zbGlkZXIvc2xpZGVyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RyZWUvdHJlZS5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3VybC1lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9mb250cy9mb250YXdlc29tZS13ZWJmb250LmVvdCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9udC1hd2Vzb21lL2ZvbnRzL2ZvbnRhd2Vzb21lLXdlYmZvbnQuZW90P2E1NDgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9mb250cy9mb250YXdlc29tZS13ZWJmb250LnN2ZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9udC1hd2Vzb21lL2ZvbnRzL2ZvbnRhd2Vzb21lLXdlYmZvbnQudHRmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb250LWF3ZXNvbWUvZm9udHMvZm9udGF3ZXNvbWUtd2ViZm9udC53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9udC1hd2Vzb21lL2ZvbnRzL2ZvbnRhd2Vzb21lLXdlYmZvbnQud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpbWVpY29ucy9mb250cy9wcmltZWljb25zLmVvdCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpbWVpY29ucy9mb250cy9wcmltZWljb25zLnN2ZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpbWVpY29ucy9mb250cy9wcmltZWljb25zLnR0ZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpbWVpY29ucy9mb250cy9wcmltZWljb25zLndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hY2NvcmRpb24vY2UtYWNjb3JkaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYnV0dG9uL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NoZWNrYm94L2NlLWNoZWNrYm94LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvZXZlbnQvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9saW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3JhZGlvZ3JvdXAvY2UtcmFkaW9ncm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3NsaWRlci9jZS1zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zbGlkZXIvc2xpZGVyLWRlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2xpZGVyL3NsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3NsaWRlci9zbGlkZXIuc2Nzcz83ZDhiIiwid2VicGFjazovLy8uL3NyYy9hcHAvc3R5bGVzLnNjc3M/NmJhZSIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RhYnMvY2UtdGFiLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdG9nZ2xlL2NlLXRvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3Rvb2x0aXAvY2UtdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RyZWUvdHJlZS1kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdHJlZS90cmVlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdHJlZS90cmVlLnNjc3M/OGJlZSIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3VpLXJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2VzLXJlZnJlc2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9lcy1zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2VzLXNsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQUNDT1JESU9OX0hFQURFUiIsIkFDQ09SRElPTl9QQU5FTCIsIktFWUNPREUiLCJET1dOIiwiTEVGVCIsIlJJR0hUIiwiVVAiLCJIT01FIiwiRU5EIiwiYWNjb3JkaW9uVGVtcGxhdGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJDZUFjY29yZGlvbiIsImF0dGFjaFNoYWRvdyIsIm1vZGUiLCJzaGFkb3dSb290IiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vbkNoYW5nZSIsIl9vbktleURvd24iLCJQcm9taXNlIiwiYWxsIiwiY3VzdG9tRWxlbWVudHMiLCJ3aGVuRGVmaW5lZCIsInRoZW4iLCJfIiwiaGVhZGluZ3MiLCJfYWxsSGVhZGluZ3MiLCJmb3JFYWNoIiwiaGVhZGluZyIsInNldEF0dHJpYnV0ZSIsInBhbmVsIiwiX3BhbmVsRm9ySGVhZGluZyIsImlkIiwiZXhwYW5kZWQiLCJfY29sbGFwc2VIZWFkaW5nIiwiX2NvbGxhcHNlUGFuZWwiLCJfZXhwYW5kSGVhZGluZyIsIl9leHBhbmRQYW5lbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbGVtIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiZXZlbnQiLCJfYW5pbWF0ZVBhbmVsRm9ySGVhZGluZyIsInRhcmdldCIsImRldGFpbCIsImlzRXhwYW5kZWROb3ciLCJleHBhbmQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIl9hbmltYXRlSW4iLCJfYW5pbWF0ZU91dCIsImN1cnJlbnRIZWFkaW5nIiwiX2lzSGVhZGluZyIsImFsdEtleSIsIm5ld0hlYWRpbmciLCJrZXlDb2RlIiwiX3ByZXZIZWFkaW5nIiwiX25leHRIZWFkaW5nIiwiX2ZpcnN0SGVhZGluZyIsIl9sYXN0SGVhZGluZyIsInByZXZlbnREZWZhdWx0IiwiZm9jdXMiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwibmV4dCIsIm5leHRFbGVtZW50U2libGluZyIsImNvbnNvbGUiLCJlcnJvciIsIm5ld0lkeCIsImZpbmRJbmRleCIsImFjdGl2ZUVsZW1lbnQiLCJsZW5ndGgiLCJoZWlnaHQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJfYW5pbWF0ZSIsInN0YXJ0T2Zmc2V0IiwiZW5kT2Zmc2V0IiwicmVzb2x2ZSIsImFkZCIsImNoaWxkcmVuIiwiaWR4IiwiaW5kZXhPZiIsImFuaW1hdGVkQ2hpbGRyZW4iLCJzbGljZSIsInN0eWxlIiwib3ZlcmZsb3ciLCJjaGlsZCIsInBvc2l0aW9uIiwiekluZGV4IiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJvbWlzZSIsInRyYW5zaXRpb25FbmRQcm9taXNlIiwicmVtb3ZlIiwiSFRNTEVsZW1lbnQiLCJoZWFkaW5nSWRDb3VudGVyIiwiYWNjb3JkaW9uSGVhZGluZ1RlbXBsYXRlIiwiQ2VBY2NvcmRpb25IZWFkaW5nIiwiX29uQ2xpY2siLCJiaW5kIiwiZGVsZWdhdGVzRm9jdXMiLCJfc2hhZG93QnV0dG9uIiwicXVlcnlTZWxlY3RvciIsImhhc0F0dHJpYnV0ZSIsIm5hbWUiLCJ2YWx1ZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJCb29sZWFuIiwicmVtb3ZlQXR0cmlidXRlIiwiYWNjb3JkaW9uUGFuZWxUZW1wbGF0ZSIsInBhbmVsSWRDb3VudGVyIiwiQ2VBY2NvcmRpb25QYW5lbCIsInZhbCIsImVsZW1lbnQiLCJmIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xhc3NNYXAiLCJjbGFzc09iaiIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJjbHoiLCJqb2luIiwic3R5bGVNYXAiLCJzdHlsZU9iaiIsIkJ1dHRvbiIsIl9hdHRyaWJ1dGVTZXR1cCIsIl9yZW5kZXIiLCJfaWNvblBvcyIsImdldEF0dHJpYnV0ZSIsIl9pY29uQ2xhc3MiLCJfaXNEaXNhYmxlZCIsIl9pc0ljb25Pbmx5IiwiX3N0eWxlcyIsIl9zdHlsZUNsYXNzIiwidGV4dENvbnRlbnQiLCIkaWNvbiIsIiRidXR0b24iLCJjbGFzc05hbWUiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJhdHRyTmFtZSIsIm9sZFZhbHVlIiwibmV3VmFsdWUiLCJkZWZpbmUiLCJpcyIsIlNQQUNFIiwidGVtcGxhdGUiLCJDZUNoZWNrYm94IiwiX3VwZ3JhZGVQcm9wZXJ0eSIsIl9vbktleVVwIiwicHJvcCIsImhhc093blByb3BlcnR5IiwiaGFzVmFsdWUiLCJibHVyIiwiX3RvZ2dsZUNoZWNrZWQiLCJkaXNhYmxlZCIsImNoZWNrZWQiLCJpc0NoZWNrZWQiLCJpc0Rpc2FibGVkIiwiVWlFdmVudCIsImNpdHkiLCJsb2ciLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJldnQiLCJlbCIsImF0dHJpYnV0ZXMiLCJhdHRyIiwidGVzdCIsInRhcmdldEZuIiwiZXZhbCIsImV2ZW50TmFtZSIsInJlcGxhY2UiLCJhcHBseSIsImZ1bmN0aW9uQW5kUGFyYW1zIiwiZXhlYyIsInBhcmFtcyIsInNwbGl0Iiwid2luZG93Iiwib25sb2FkIiwiYmluZExpbmtzIiwibGlua3MiLCJsaW5rIiwiaGlqYWNrTGlua3MiLCJwYWdlIiwiX2xvYWRWaWV3IiwicGFnZVVybCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwibmV3RG9jIiwicmVzcG9uc2UiLCJyb3V0ZXJTbG90IiwicmVzcG9uc2VUeXBlIiwib3BlbiIsInNlbmQiLCJyYWRpb0J1dHRvblRlbXBsYXRlIiwiQ2VSYWRpb0J1dHRvbiIsInJhZGlvR3JvdXBUZW1wbGF0ZSIsIkNlUmFkaW9Hcm91cCIsImZpcnN0Q2hlY2tlZEJ1dHRvbiIsImNoZWNrZWRSYWRpb0J1dHRvbiIsIl91bmNoZWNrQWxsIiwiX2NoZWNrTm9kZSIsImhhc1JvbGVSYWRpbyIsImUiLCJfc2V0Q2hlY2tlZFRvUHJldkJ1dHRvbiIsIl9zZXRDaGVja2VkVG9OZXh0QnV0dG9uIiwiX3NldENoZWNrZWQiLCJmaXJzdFJhZGlvQnV0dG9uIiwibGFzdFJhZGlvQnV0dG9uIiwibm9kZSIsInByZXYiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiY2hlY2tlZEJ1dHRvbiIsIl9wcmV2UmFkaW9CdXR0b24iLCJfbmV4dFJhZGlvQnV0dG9uIiwiX2ZvY3VzTm9kZSIsInJhZGlvQnV0dG9ucyIsImkiLCJidG4iLCJ0YWJJbmRleCIsIkNlU2xpZGVyIiwic2xpZGVDdXJyZW50Iiwic2xpZGVzVG90YWwiLCJpbnRlcnZhbEFjdGl2ZSIsIm9wdGlvbnMiLCJzdGFydCIsImF4aXMiLCJidXR0b25zIiwiYnVsbGV0cyIsImludGVydmFsIiwiaW50ZXJ2YWxUaW1lIiwiYW5pbWF0aW9uIiwiYW5pbWF0aW9uVGltZSIsImluZmluaXRlIiwiJGNvbnRhaW5lciIsIiQiLCIkdmlld3BvcnQiLCJmaW5kIiwiJG92ZXJ2aWV3IiwiJG5leHQiLCIkcHJldiIsIiRidWxsZXRzIiwiJHNsaWRlcyIsInZpZXdwb3J0U2l6ZSIsImNvbnRlbnRTdHlsZSIsInNsaWRlc1Zpc2libGUiLCJzbGlkZVNpemUiLCJzbGlkZUluZGV4IiwiaXNIb3Jpem9udGFsIiwic2l6ZUxhYmVsIiwicG9zaUxhYmVsIiwiaW50ZXJ2YWxUaW1lciIsIl9pbml0aWFsaXplIiwiX3VwZGF0ZSIsIl9tb3ZlIiwiX3NldEV2ZW50cyIsImZpcnN0IiwiTWF0aCIsImNlaWwiLCJhcHBlbmQiLCJjbG9uZSIsImFkZENsYXNzIiwiY3NzIiwiX3NldEJ1dHRvbnMiLCJpbmRleCIsImlzTmFOIiwiYW5pbWF0ZSIsInF1ZXVlIiwiZHVyYXRpb24iLCJhbHdheXMiLCJ0cmlnZ2VyIiwiX3N0YXJ0IiwiY2xpY2siLCJyZXNpemUiLCJfX3NlbGYiLCJvbiIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ0b2dnbGVDbGFzcyIsInJlbW92ZUNsYXNzIiwic2V0dGluZ3MiLCJpdGVtIiwiYXV0b1dpZHRoIiwic2xpZGVNb3ZlIiwic2xpZGVNYXJnaW4iLCJ1c2VDU1MiLCJjc3NFYXNpbmciLCJlYXNpbmciLCJzcGVlZCIsImF1dG8iLCJwYXVzZU9uSG92ZXIiLCJsb29wIiwic2xpZGVFbmRBbmltYXRpb24iLCJwYXVzZSIsImtleVByZXNzIiwiY29udHJvbHMiLCJwcmV2SHRtbCIsIm5leHRIdG1sIiwicnRsIiwiYWRhcHRpdmVIZWlnaHQiLCJ2ZXJ0aWNhbCIsInZlcnRpY2FsSGVpZ2h0IiwidlRodW1iV2lkdGgiLCJ0aHVtYkl0ZW0iLCJwYWdlciIsImdhbGxlcnkiLCJnYWxsZXJ5TWFyZ2luIiwidGh1bWJNYXJnaW4iLCJjdXJyZW50UGFnZXJQb3NpdGlvbiIsImVuYWJsZVRvdWNoIiwiZW5hYmxlRHJhZyIsImZyZWVNb3ZlIiwic3dpcGVUaHJlc2hvbGQiLCJyZXNwb25zaXZlIiwib25CZWZvcmVTdGFydCIsIiRlbCIsIm9uU2xpZGVyTG9hZCIsIm9uQmVmb3JlU2xpZGUiLCJzY2VuZSIsIm9uQWZ0ZXJTbGlkZSIsIm9uQmVmb3JlTmV4dFNsaWRlIiwib25CZWZvcmVQcmV2U2xpZGUiLCJJbWFnZVNsaWRlciIsIndpbmRvd1ciLCJvdXRlcldpZHRoIiwiYnJlYWtwb2ludCIsInJlc3Bvc2l2ZU9iaiIsInciLCJlbFNpemUiLCIkc2xpZGUiLCJwcm9wZXJ0eSIsImd1dHRlciIsInNsaWRlVmFsdWUiLCJwYWdlcldpZHRoIiwic2xpZGVXaWR0aCIsInRodW1iV2lkdGgiLCJpc1RvdWNoIiwiZG9jdW1lbnRFbGVtZW50IiwibFNTbGlkZU91dGVyIiwibFNTbGlkZVdyYXBwZXIiLCJsU1BhZ2VyIiwibGlnaHRTbGlkZXIiLCJjaGlsZE5vZGVzIiwiX3JlZnJlc2hjYWxTVyIsIl9yZWZyZXNoc1NXIiwiX3NsaWRlVmFsdWUiLCJtb3ZlIiwic2V0SGVpZ2h0IiwiZG9Dc3MiLCIkY2hpbGRyZW4iLCJmYWRlT3V0IiwiZXEiLCJmYWRlSW4iLCJvYiIsInYiLCJfZG9Dc3MiLCJ0b3AiLCJsZWZ0IiwiJHRodW1iIiwicGFyZW50IiwiYWN0aXZlIiwiX3NWIiwicGFyc2VJbnQiLCJ3aWR0aCIsIl9jYWxXaWR0aCIsInN1cHBvcnQiLCJ0cmFuc2l0aW9uIiwicm9vdCIsImNsbiIsImxuIiwiQ2VUYWJzIiwiX29uU2xvdENoYW5nZSIsIl90YWJTbG90IiwiX3BhbmVsU2xvdCIsIl9saW5rUGFuZWxzIiwidGFicyIsIl9hbGxUYWJzIiwidGFiIiwic2VsZWN0ZWRUYWIiLCJzZWxlY3RlZCIsIl9zZWxlY3RUYWIiLCJwYW5lbElkIiwicGFuZWxzIiwiX2FsbFBhbmVscyIsImhpZGRlbiIsIm5ld1RhYiIsInJlc2V0IiwibmV3UGFuZWwiLCJfcGFuZWxGb3JUYWIiLCJFcnJvciIsIm5ld1BhbmVsSWQiLCJfcHJldlRhYiIsIl9uZXh0VGFiIiwiX2ZpcnN0VGFiIiwiX2xhc3RUYWIiLCJjZVRhYkNvdW50ZXIiLCJDZVRhYiIsImNlUGFuZWxDb3VudGVyIiwiQ2VUYWJQYW5lbCIsIkVOVEVSIiwiQ2VUb2dnbGVCdXR0b24iLCJfdG9nZ2xlUHJlc3NlZCIsInByZXNzZWQiLCJpc1ByZXNzZWQiLCJDZVRvb2x0aXAiLCJfc2hvdyIsIl9oaWRlIiwiX3RhcmdldCIsIlRyZWVEYXRhIiwiVHJlZSIsIl9yZW5kZXJUcmVlIiwiZGF0YSIsImJ1aWxkTm9kZSIsInJlZHVjZSIsInQiLCJkIiwidHlwZSIsImZvbGRlcnMiLCJoYW5kbGVDbGljayIsImlzRXhwYW5kZWQiLCJzdG9wUHJvcGFnYXRpb24iLCJVaVJvdXRlciIsImRlZmF1bHRzIiwiU2xpZGVyUmVmcmVzaCIsImoiLCJzZXR0aW5nc1RlbXAiLCJpc0VtcHR5T2JqZWN0IiwiayIsInJvdW5kIiwidW5kZWZpbmVkIiwiZm4iLCJlYWNoIiwicGx1Z2luIiwiZXh0ZW5kIiwicmVmcmVzaCIsInJldHVyblZhbHVlIiwiZ29Ub1ByZXZTbGlkZSIsImdvVG9OZXh0U2xpZGUiLCJhZnRlciIsImhpZGUiLCJjYWxXaWR0aCIsImluaXRpYWxTdHlsZSIsIiR0aGlzIiwiY2FsbCIsImNoYnJlYWtwb2ludCIsIndyYXAiLCJjYWxTVyIsInRXciIsInRJIiwidEl0ZW0iLCJuIiwiYXBwZW5kVG8iLCJtIiwicHJlcGVuZFRvIiwiaGFzQ2xhc3MiLCJzU1ciLCJjYWxMIiwiY3JlYXRlUGFnZXIiLCJwYWdlcnMiLCJ0aHVtYiIsIm1pblBnciIsIiRjU291dGVyIiwiaHRtbCIsIiRwYWdlciIsInNsaWRlVGh1bWIiLCJjbCIsImdNYXJnaW4iLCJpbml0IiwiZmFkZSIsIm9iaiIsInNldENzcyIsInRIIiwib3V0ZXJIZWlnaHQiLCJ0UCIsInRIVCIsImNvbXBsZXRlIiwic2MiLCJsIiwibmwiLCJzbGlkZSIsImNhbFNsaWRlIiwicmVzZXRTbGlkZSIsInMiLCJ0aHVtYlNsaWRlIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwidG91Y2hNb3ZlIiwiZW5kQ29vcmRzIiwic3RhcnRDb29yZHMiLCJkaXN0YW5jZSIsInN3aXBlVmFsIiwic3dpcGVWYWxUIiwidG91Y2hFbmQiLCJteFZhbCIsIl9uZXh0IiwiZ0MiLCJhZCIsIm51bSIsInRXIiwiaXNEcmFnaW5nIiwicGFnZVkiLCJwYWdlWCIsInNjcm9sbExlZnQiLCJhYnMiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJvZmYiLCJvcmlnaW5hbEV2ZW50IiwidGFyZ2V0VG91Y2hlcyIsIm9yaWciLCJ4TW92ZW1lbnQiLCJ5TW92ZW1lbnQiLCJidWlsZCIsInNob3ciLCJuZXh0SSIsIl90b3VjaCIsInBsYXkiLCJnZXRDdXJyZW50U2xpZGVDb3VudCIsImdldFRvdGFsU2xpZGVDb3VudCIsImdvVG9TbGlkZSIsImRlc3Ryb3kiLCJyZW1vdmVBdHRyIiwidW53cmFwIiwialF1ZXJ5IiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHVDQUF1QztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBYyx3Q0FBd0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0EsOENBQXNDLHVCQUF1Qjs7O0FBRzdEO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3J4QkEsMkJBQTJCLG1CQUFPLENBQUMsMkZBQXNDO0FBQ3pFO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMseUdBQTZDO0FBQ3JFLHlDQUF5QyxtQkFBTyxDQUFDLG1IQUEwQztBQUMzRix5Q0FBeUMsbUJBQU8sQ0FBQyxtR0FBa0M7QUFDbkYseUNBQXlDLG1CQUFPLENBQUMsdUhBQTRDO0FBQzdGLHlDQUF5QyxtQkFBTyxDQUFDLHFIQUEyQztBQUM1Rix5Q0FBeUMsbUJBQU8sQ0FBQyxtSEFBMEM7QUFDM0YseUNBQXlDLG1CQUFPLENBQUMsbUhBQTBDOztBQUUzRjtBQUNBLGNBQWMsUUFBUyxzTEFBc0wsMEJBQTBCLDBDQUEwQyw4UkFBOFIsbUJBQW1CLGtCQUFrQixJQUFJLHFCQUFxQiw2Q0FBNkMsa0JBQWtCLG9CQUFvQixtQ0FBbUMsa0NBQWtDLE9BQU8sdUJBQXVCLGtCQUFrQixvQkFBb0IsT0FBTyxjQUFjLE9BQU8sY0FBYyxPQUFPLGNBQWMsT0FBTyxjQUFjLE9BQU8sbUJBQW1CLGtCQUFrQixPQUFPLGVBQWUseUJBQXlCLHFCQUFxQixVQUFVLGtCQUFrQixPQUFPLGtCQUFrQixtQkFBbUIsbUJBQW1CLGdCQUFnQixrQkFBa0IsYUFBYSxtQkFBbUIsV0FBVyx5QkFBeUIsd0JBQXdCLG1CQUFtQixjQUFjLFdBQVcsZUFBZSxZQUFZLGlCQUFpQixrQkFBa0Isa0JBQWtCLGlCQUFpQixZQUFZLFlBQVksV0FBVyxXQUFXLGNBQWMsa0JBQWtCLGVBQWUsaUJBQWlCLFNBQVMsNkNBQTZDLHFDQUFxQyxVQUFVLCtDQUErQyx1Q0FBdUMsMkJBQTJCLEdBQUcsK0JBQStCLHVCQUF1QixLQUFLLGlDQUFpQywwQkFBMEIsbUJBQW1CLEdBQUcsK0JBQStCLHVCQUF1QixLQUFLLGlDQUFpQywwQkFBMEIsY0FBYyx3RUFBd0UsZ0NBQWdDLDRCQUE0Qix3QkFBd0IsZUFBZSx3RUFBd0UsaUNBQWlDLDZCQUE2Qix5QkFBeUIsZUFBZSx3RUFBd0UsaUNBQWlDLDZCQUE2Qix5QkFBeUIsb0JBQW9CLGtGQUFrRiwrQkFBK0IsMkJBQTJCLHVCQUF1QixrQkFBa0Isa0ZBQWtGLCtCQUErQiwyQkFBMkIsdUJBQXVCLGdIQUFnSCxZQUFZLFVBQVUsa0JBQWtCLHFCQUFxQixVQUFVLFdBQVcsZ0JBQWdCLHNCQUFzQiwwQkFBMEIsa0JBQWtCLE9BQU8sV0FBVyxrQkFBa0IsYUFBYSxvQkFBb0IsYUFBYSxjQUFjLFlBQVksV0FBVyxpQkFBaUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsa0JBQWtCLG1CQUFtQixzQkFBc0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGNBQWMsbUJBQW1CLG1CQUFtQixtQkFBbUIsaUJBQWlCLG1CQUFtQixvREFBb0QsbUJBQW1CLHVCQUF1QixtQkFBbUIsd0JBQXdCLG1CQUFtQixxQkFBcUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsK0JBQStCLG1CQUFtQixtQkFBbUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsa0JBQWtCLG1CQUFtQixtQkFBbUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsb0JBQW9CLG1CQUFtQiwrQkFBK0IsbUJBQW1CLDZCQUE2QixtQkFBbUIsaUJBQWlCLG1CQUFtQix5QkFBeUIsbUJBQW1CLDBDQUEwQyxtQkFBbUIsbUJBQW1CLG1CQUFtQixvQkFBb0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsdUJBQXVCLG1CQUFtQixxQkFBcUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsbUJBQW1CLG1CQUFtQixlQUFlLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsb0JBQW9CLG1CQUFtQixpQkFBaUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsdUJBQXVCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsd0JBQXdCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHlCQUF5QixtQkFBbUIsZ0JBQWdCLG1CQUFtQixxQ0FBcUMsbUJBQW1CLGtCQUFrQixtQkFBbUIsd0JBQXdCLG1CQUFtQix1REFBdUQsbUJBQW1CLGtCQUFrQixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsMkNBQTJDLG1CQUFtQiwwQkFBMEIsbUJBQW1CLDBCQUEwQixtQkFBbUIsa0JBQWtCLG1CQUFtQix5QkFBeUIsbUJBQW1CLHlCQUF5QixtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixtQkFBbUIsbUJBQW1CLHdCQUF3QixtQkFBbUIsd0JBQXdCLG1CQUFtQixpQkFBaUIsbUJBQW1CLHdCQUF3QixtQkFBbUIseUJBQXlCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHdCQUF3QixtQkFBbUIsd0JBQXdCLG1CQUFtQix3QkFBd0IsbUJBQW1CLDJCQUEyQixtQkFBbUIsdUJBQXVCLG1CQUFtQixzQkFBc0IsbUJBQW1CLDBCQUEwQixtQkFBbUIsMEJBQTBCLG1CQUFtQixlQUFlLG1CQUFtQixzQkFBc0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsb0JBQW9CLG1CQUFtQixzQkFBc0IsbUJBQW1CLHlDQUF5QyxtQkFBbUIsa0JBQWtCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsaUJBQWlCLG1CQUFtQixvQkFBb0IsbUJBQW1CLDhCQUE4QixtQkFBbUIsZ0JBQWdCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsZUFBZSxtQkFBbUIscUJBQXFCLG1CQUFtQixtREFBbUQsbUJBQW1CLGlCQUFpQixtQkFBbUIsb0JBQW9CLG1CQUFtQixrQkFBa0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHdCQUF3QixtQkFBbUIsbUJBQW1CLG1CQUFtQix5QkFBeUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsdUJBQXVCLG1CQUFtQixvQkFBb0IsbUJBQW1CLG9CQUFvQixtQkFBbUIsNENBQTRDLG1CQUFtQiwwQkFBMEIsbUJBQW1CLDJCQUEyQixtQkFBbUIsd0JBQXdCLG1CQUFtQixlQUFlLG1CQUFtQixpQ0FBaUMsbUJBQW1CLG9CQUFvQixtQkFBbUIsdUJBQXVCLG1CQUFtQix5QkFBeUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsbUJBQW1CLG1CQUFtQixvQkFBb0IsbUJBQW1CLDJCQUEyQixtQkFBbUIsc0JBQXNCLG1CQUFtQix5QkFBeUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCLG1CQUFtQix5QkFBeUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsbUJBQW1CLG1CQUFtQixpQkFBaUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0JBQXNCLG1CQUFtQix3QkFBd0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsMENBQTBDLG1CQUFtQixrQkFBa0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsdUJBQXVCLG1CQUFtQiwrQkFBK0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsd0JBQXdCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsdUJBQXVCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLDhCQUE4QixtQkFBbUIsMkJBQTJCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLGlCQUFpQixtQkFBbUIsa0JBQWtCLG1CQUFtQixpQkFBaUIsbUJBQW1CLGtCQUFrQixtQkFBbUIscUJBQXFCLG1CQUFtQixzQkFBc0IsbUJBQW1CLGtDQUFrQyxtQkFBbUIsaUNBQWlDLG1CQUFtQixpQkFBaUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsbUNBQW1DLG1CQUFtQixtQ0FBbUMsbUJBQW1CLHFCQUFxQixtQkFBbUIsb0NBQW9DLG1CQUFtQixrQkFBa0IsbUJBQW1CLHNEQUFzRCxtQkFBbUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsbUJBQW1CLHlCQUF5QixtQkFBbUIscUJBQXFCLG1CQUFtQixpQkFBaUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsaUJBQWlCLG1CQUFtQixxQkFBcUIsbUJBQW1CLDRCQUE0QixtQkFBbUIsOEJBQThCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsc0JBQXNCLG1CQUFtQixvQkFBb0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsdUJBQXVCLG1CQUFtQixtQkFBbUIsbUJBQW1CLG9DQUFvQyxtQkFBbUIsMENBQTBDLG1CQUFtQix1Q0FBdUMsbUJBQW1CLG9CQUFvQixtQkFBbUIsb0JBQW9CLG1CQUFtQix1Q0FBdUMsbUJBQW1CLGtDQUFrQyxtQkFBbUIsMkNBQTJDLG1CQUFtQixxQkFBcUIsbUJBQW1CLHNCQUFzQixtQkFBbUIsaUNBQWlDLG1CQUFtQixtQkFBbUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0NBQXNDLG1CQUFtQix1QkFBdUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsMEJBQTBCLG1CQUFtQix3QkFBd0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsdUJBQXVCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQixtQkFBbUIsbUJBQW1CLHVCQUF1QixtQkFBbUIsc0JBQXNCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsa0JBQWtCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsb0JBQW9CLG1CQUFtQix1QkFBdUIsbUJBQW1CLDZCQUE2QixtQkFBbUIsOEJBQThCLG1CQUFtQiwyQkFBMkIsbUJBQW1CLDZCQUE2QixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0JBQXNCLG1CQUFtQixtQkFBbUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQiwwQ0FBMEMsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCLG1CQUFtQix1Q0FBdUMsbUJBQW1CLHNCQUFzQixtQkFBbUIsb0JBQW9CLG1CQUFtQix5QkFBeUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsbUJBQW1CLG1CQUFtQixpQkFBaUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLDBCQUEwQixtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLCtDQUErQyxtQkFBbUIsNEVBQTRFLG1CQUFtQiwwQkFBMEIsbUJBQW1CLGdCQUFnQixtQkFBbUIscUJBQXFCLG1CQUFtQiwwQ0FBMEMsbUJBQW1CLG9CQUFvQixtQkFBbUIsZ0JBQWdCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHVCQUF1QixtQkFBbUIscUJBQXFCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHdCQUF3QixtQkFBbUIsc0JBQXNCLG1CQUFtQiw0QkFBNEIsbUJBQW1CLGtCQUFrQixtQkFBbUIsc0JBQXNCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQiwrQkFBK0IsbUJBQW1CLGdDQUFnQyxtQkFBbUIsNkJBQTZCLG1CQUFtQiwrQkFBK0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsb0JBQW9CLG1CQUFtQixzQkFBc0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsd0JBQXdCLG1CQUFtQiwwQkFBMEIsbUJBQW1CLG9CQUFvQixtQkFBbUIsc0JBQXNCLG1CQUFtQix3QkFBd0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsZ0NBQWdDLG1CQUFtQix3QkFBd0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsc0RBQXNELG1CQUFtQixrREFBa0QsbUJBQW1CLHdEQUF3RCxtQkFBbUIsK0JBQStCLG1CQUFtQixlQUFlLG1CQUFtQixpQ0FBaUMsbUJBQW1CLGdDQUFnQyxtQkFBbUIsNERBQTRELG1CQUFtQixrREFBa0QsbUJBQW1CLDhCQUE4QixtQkFBbUIsa0NBQWtDLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsMEJBQTBCLG1CQUFtQiwyQkFBMkIsbUJBQW1CLDJCQUEyQixtQkFBbUIsNEJBQTRCLG1CQUFtQiw0QkFBNEIsbUJBQW1CLDZCQUE2QixtQkFBbUIscUJBQXFCLG1CQUFtQix1QkFBdUIsbUJBQW1CLDBCQUEwQixtQkFBbUIsbUJBQW1CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsd0JBQXdCLG1CQUFtQixtQkFBbUIsbUJBQW1CLDBCQUEwQixtQkFBbUIscUJBQXFCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGVBQWUsbUJBQW1CLHFCQUFxQixtQkFBbUIsNEJBQTRCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsMkJBQTJCLG1CQUFtQix5QkFBeUIsbUJBQW1CLDJCQUEyQixtQkFBbUIsNEJBQTRCLG1CQUFtQixpQkFBaUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsbUJBQW1CLG1CQUFtQixpQkFBaUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsaUJBQWlCLG1CQUFtQixzQkFBc0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHNDQUFzQyxtQkFBbUIsaUJBQWlCLG1CQUFtQixrQkFBa0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsZUFBZSxtQkFBbUIsY0FBYyxtQkFBbUIsaUJBQWlCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsMEJBQTBCLG1CQUFtQixnQ0FBZ0MsbUJBQW1CLCtCQUErQixtQkFBbUIsc0RBQXNELG1CQUFtQix3QkFBd0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsd0JBQXdCLG1CQUFtQix1Q0FBdUMsbUJBQW1CLHlCQUF5QixtQkFBbUIseUJBQXlCLG1CQUFtQixpQkFBaUIsbUJBQW1CLDJCQUEyQixtQkFBbUIscUJBQXFCLG1CQUFtQixrQkFBa0IsbUJBQW1CLDZEQUE2RCxtQkFBbUIsa0RBQWtELG1CQUFtQixpQkFBaUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQix5QkFBeUIsbUJBQW1CLDhCQUE4QixtQkFBbUIsdUJBQXVCLG1CQUFtQixxQkFBcUIsbUJBQW1CLGdCQUFnQixtQkFBbUIseUJBQXlCLG1CQUFtQiwwQkFBMEIsbUJBQW1CLGtCQUFrQixtQkFBbUIsa0JBQWtCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGVBQWUsbUJBQW1CLG9CQUFvQixtQkFBbUIsaUJBQWlCLG1CQUFtQixlQUFlLG1CQUFtQixpQkFBaUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsaUJBQWlCLG1CQUFtQixtQkFBbUIsbUJBQW1CLDBCQUEwQixtQkFBbUIsaUJBQWlCLG1CQUFtQix3QkFBd0IsbUJBQW1CLG1CQUFtQixtQkFBbUIscUNBQXFDLG1CQUFtQiwrQkFBK0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsbUJBQW1CLG1CQUFtQixzQkFBc0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsb0JBQW9CLG1CQUFtQixzQkFBc0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsd0JBQXdCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLDBFQUEwRSxtQkFBbUIsZ0RBQWdELG1CQUFtQixnREFBZ0QsbUJBQW1CLGdEQUFnRCxtQkFBbUIsdUJBQXVCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsb0JBQW9CLG1CQUFtQix3R0FBd0csbUJBQW1CLDBCQUEwQixtQkFBbUIscURBQXFELG1CQUFtQixnQ0FBZ0MsbUJBQW1CLHNCQUFzQixtQkFBbUIsZUFBZSxtQkFBbUIsMkVBQTJFLG1CQUFtQix5QkFBeUIsbUJBQW1CLGNBQWMsbUJBQW1CLG9DQUFvQyxtQkFBbUIsdUNBQXVDLG1CQUFtQiwyQ0FBMkMsbUJBQW1CLG1CQUFtQixtQkFBbUIsdUJBQXVCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLDRCQUE0QixtQkFBbUIsZ0JBQWdCLG1CQUFtQiw2Q0FBNkMsbUJBQW1CLGVBQWUsbUJBQW1CLHNCQUFzQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixzQkFBc0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsZ0JBQWdCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGdCQUFnQixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsbUJBQW1CLG1CQUFtQix5QkFBeUIsbUJBQW1CLHVCQUF1QixtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsc0JBQXNCLG1CQUFtQix3QkFBd0IsbUJBQW1CLGlCQUFpQixtQkFBbUIscUJBQXFCLG1CQUFtQixjQUFjLG1CQUFtQixzQkFBc0IsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsc0JBQXNCLG1CQUFtQixxQkFBcUIsbUJBQW1CLG1CQUFtQixtQkFBbUIsZUFBZSxtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLGNBQWMsbUJBQW1CLG1EQUFtRCxtQkFBbUIsb0JBQW9CLG1CQUFtQixzQkFBc0IsbUJBQW1CLDBCQUEwQixtQkFBbUIsb0JBQW9CLG1CQUFtQixvQkFBb0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCLG1CQUFtQix3QkFBd0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsb0JBQW9CLG1CQUFtQixxQkFBcUIsbUJBQW1CLDJCQUEyQixtQkFBbUIsbUJBQW1CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsaUJBQWlCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsMkNBQTJDLG1CQUFtQiwyQkFBMkIsbUJBQW1CLHdCQUF3QixtQkFBbUIsdUJBQXVCLG1CQUFtQixzQkFBc0IsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQix5QkFBeUIsbUJBQW1CLGtCQUFrQixtQkFBbUIsc0JBQXNCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLHVCQUF1QixtQkFBbUIsb0JBQW9CLG1CQUFtQixrQkFBa0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsc0JBQXNCLG1CQUFtQixnQ0FBZ0MsbUJBQW1CLG1CQUFtQixtQkFBbUIsaUJBQWlCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsc0NBQXNDLG1CQUFtQix5QkFBeUIsbUJBQW1CLG9CQUFvQixtQkFBbUIsd0JBQXdCLG1CQUFtQixnRUFBZ0UsbUJBQW1CLHVEQUF1RCxtQkFBbUIsNkNBQTZDLG1CQUFtQixnREFBZ0QsbUJBQW1CLDhDQUE4QyxtQkFBbUIseUJBQXlCLG1CQUFtQixvQkFBb0IsbUJBQW1CLHdCQUF3QixtQkFBbUIsMEJBQTBCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHlCQUF5QixtQkFBbUIsa0JBQWtCLG1CQUFtQiwwQkFBMEIsbUJBQW1CLGlCQUFpQixtQkFBbUIseUJBQXlCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGtEQUFrRCxtQkFBbUIsaURBQWlELG1CQUFtQixnREFBZ0QsbUJBQW1CLHFCQUFxQixtQkFBbUIsOENBQThDLG1CQUFtQiwrQ0FBK0MsbUJBQW1CLDJCQUEyQixtQkFBbUIseUJBQXlCLG1CQUFtQix3QkFBd0IsbUJBQW1CLDBCQUEwQixtQkFBbUIsd0JBQXdCLG1CQUFtQixxQkFBcUIsbUJBQW1CLHNCQUFzQixtQkFBbUIsNEJBQTRCLG1CQUFtQixjQUFjLG1CQUFtQixxQkFBcUIsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQixnQ0FBZ0MsbUJBQW1CLHNCQUFzQixtQkFBbUIsdUJBQXVCLG1CQUFtQixrQkFBa0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsbUJBQW1CLG1CQUFtQixpQkFBaUIsbUJBQW1CLDZCQUE2QixtQkFBbUIsb0NBQW9DLG1CQUFtQixrQkFBa0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsa0JBQWtCLG1CQUFtQiwyQkFBMkIsbUJBQW1CLDRCQUE0QixtQkFBbUIsNEJBQTRCLG1CQUFtQiw0QkFBNEIsbUJBQW1CLG9CQUFvQixtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLGlCQUFpQixtQkFBbUIsZUFBZSxtQkFBbUIsc0JBQXNCLG1CQUFtQix3QkFBd0IsbUJBQW1CLGlCQUFpQixtQkFBbUIsaUJBQWlCLG1CQUFtQixxQkFBcUIsbUJBQW1CLHFCQUFxQixtQkFBbUIsd0JBQXdCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLDJCQUEyQixtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLHdCQUF3QixtQkFBbUIsZUFBZSxtQkFBbUIsd0JBQXdCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGtCQUFrQixtQkFBbUIsd0JBQXdCLG1CQUFtQiwwQkFBMEIsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQix3QkFBd0IsbUJBQW1CLDJCQUEyQixtQkFBbUIsbUJBQW1CLG1CQUFtQixxQkFBcUIsbUJBQW1CLHVCQUF1QixtQkFBbUIsbUJBQW1CLG1CQUFtQixrQkFBa0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsbUJBQW1CLG1CQUFtQixrQkFBa0IsbUJBQW1CLDRCQUE0QixtQkFBbUIsMEJBQTBCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLGlCQUFpQixtQkFBbUIsNkJBQTZCLG1CQUFtQixnQ0FBZ0MsbUJBQW1CLG1CQUFtQixtQkFBbUIsdUNBQXVDLG1CQUFtQiwyRUFBMkUsbUJBQW1CLCtEQUErRCxtQkFBbUIsaUJBQWlCLG1CQUFtQixtQkFBbUIsbUJBQW1CLDRDQUE0QyxtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLHlCQUF5QixtQkFBbUIsb0JBQW9CLG1CQUFtQiwwQkFBMEIsbUJBQW1CLDJCQUEyQixtQkFBbUIsc0JBQXNCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGlCQUFpQixtQkFBbUIscUJBQXFCLG1CQUFtQiw4REFBOEQsbUJBQW1CLHNDQUFzQyxtQkFBbUIsdUJBQXVCLG1CQUFtQix5QkFBeUIsbUJBQW1CLDJCQUEyQixtQkFBbUIsa0JBQWtCLG1CQUFtQix3QkFBd0IsbUJBQW1CLDBCQUEwQixtQkFBbUIseUNBQXlDLG1CQUFtQiw2Q0FBNkMsbUJBQW1CLHVCQUF1QixtQkFBbUIseUJBQXlCLG1CQUFtQixrQkFBa0IsbUJBQW1CLG9CQUFvQixtQkFBbUIsOENBQThDLG1CQUFtQixrREFBa0QsbUJBQW1CLGlCQUFpQixtQkFBbUIsMEJBQTBCLG1CQUFtQixvQkFBb0IsbUJBQW1CLDRFQUE0RSxtQkFBbUIsK0RBQStELG1CQUFtQixxREFBcUQsbUJBQW1CLHdEQUF3RCxtQkFBbUIsc0RBQXNELG1CQUFtQixrQkFBa0IsbUJBQW1CLGtEQUFrRCxtQkFBbUIsbUJBQW1CLG1CQUFtQiwyQkFBMkIsbUJBQW1CLDJCQUEyQixtQkFBbUIsMEJBQTBCLG1CQUFtQixtREFBbUQsbUJBQW1CLHVEQUF1RCxtQkFBbUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsbUJBQW1CLGdCQUFnQixtQkFBbUIsZ0JBQWdCLG1CQUFtQixtQkFBbUIsbUJBQW1CLG1CQUFtQixtQkFBbUIscUJBQXFCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHVCQUF1QixtQkFBbUIsc0JBQXNCLG1CQUFtQixrQkFBa0IsbUJBQW1CLFNBQVMsa0JBQWtCLFVBQVUsV0FBVyxVQUFVLFlBQVksZ0JBQWdCLHNCQUFzQixTQUFTLG1EQUFtRCxnQkFBZ0IsV0FBVyxZQUFZLFNBQVMsaUJBQWlCLFVBQVU7Ozs7Ozs7Ozs7Ozs7QUNYOXNnQywyQkFBMkIsbUJBQU8sQ0FBQyx3RkFBbUM7QUFDdEU7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxzR0FBMEM7QUFDbEUseUNBQXlDLG1CQUFPLENBQUMsOEVBQXdCO0FBQ3pFLHlDQUF5QyxtQkFBTyxDQUFDLDhFQUF3QjtBQUN6RSx5Q0FBeUMsbUJBQU8sQ0FBQyw4RUFBd0I7QUFDekUseUNBQXlDLG1CQUFPLENBQUMsZ0ZBQXlCO0FBQzFFLHlDQUF5QyxtQkFBTyxDQUFDLDhFQUF3Qjs7QUFFekU7QUFDQSxjQUFjLFFBQVMsZUFBZSxnQ0FBZ0MsaURBQWlELGtQQUFrUCwwQkFBMEIseUJBQXlCLEdBQUcsU0FBUyxnQ0FBZ0Msa0JBQWtCLHlCQUF5QiwwQkFBMEIsMkJBQTJCLDJCQUEyQixxQkFBcUIsNEJBQTRCLDBDQUEwQyx5Q0FBeUMsR0FBRyxZQUFZLDBCQUEwQix5QkFBeUIsR0FBRyxjQUFjLG9EQUFvRCw0Q0FBNEMsR0FBRyxnQ0FBZ0MsVUFBVSwwQ0FBMEMsa0NBQWtDLE9BQU8sWUFBWSw0Q0FBNEMsb0NBQW9DLE9BQU8sR0FBRyx3QkFBd0IsVUFBVSwwQ0FBMEMsa0NBQWtDLE9BQU8sWUFBWSw0Q0FBNEMsb0NBQW9DLE9BQU8sR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcsdUJBQXVCLDBCQUEwQixHQUFHLG9CQUFvQiwwQkFBMEIsR0FBRyw4QkFBOEIsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLHdCQUF3QiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLDBCQUEwQiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLDRCQUE0QiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLHNCQUFzQiwwQkFBMEIsR0FBRywyQkFBMkIsMEJBQTBCLEdBQUcsdUJBQXVCLDBCQUEwQixHQUFHLHNCQUFzQiwwQkFBMEIsR0FBRyx3QkFBd0IsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyx3QkFBd0IsMEJBQTBCLEdBQUcsMEJBQTBCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcsMEJBQTBCLDBCQUEwQixHQUFHLHNCQUFzQiwwQkFBMEIsR0FBRywyQkFBMkIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLDBCQUEwQiwwQkFBMEIsR0FBRyxvQkFBb0IsMEJBQTBCLEdBQUcsNEJBQTRCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLG9CQUFvQiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLGdDQUFnQywwQkFBMEIsR0FBRyx5QkFBeUIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsK0JBQStCLDBCQUEwQixHQUFHLCtCQUErQiwwQkFBMEIsR0FBRyw4QkFBOEIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDJCQUEyQiwwQkFBMEIsR0FBRyx5QkFBeUIsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLDRCQUE0QiwwQkFBMEIsR0FBRywyQkFBMkIsMEJBQTBCLEdBQUcsNkJBQTZCLDBCQUEwQixHQUFHLDhCQUE4QiwwQkFBMEIsR0FBRyxvQkFBb0IsMEJBQTBCLEdBQUcsK0JBQStCLDBCQUEwQixHQUFHLDZCQUE2QiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsdUJBQXVCLDBCQUEwQixHQUFHLHNCQUFzQiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDBCQUEwQiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsOEJBQThCLDBCQUEwQixHQUFHLGdDQUFnQywwQkFBMEIsR0FBRyxnQ0FBZ0MsMEJBQTBCLEdBQUcsd0JBQXdCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyxxQ0FBcUMsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLG9DQUFvQywwQkFBMEIsR0FBRyxvQ0FBb0MsMEJBQTBCLEdBQUcscUNBQXFDLDBCQUEwQixHQUFHLGtDQUFrQywwQkFBMEIsR0FBRyxrQ0FBa0MsMEJBQTBCLEdBQUcsa0NBQWtDLDBCQUEwQixHQUFHLG1DQUFtQywwQkFBMEIsR0FBRyxnQ0FBZ0MsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDJCQUEyQiwwQkFBMEIsR0FBRyw0QkFBNEIsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyx5QkFBeUIsMEJBQTBCLEdBQUcsb0JBQW9CLDBCQUEwQixHQUFHLHVCQUF1QiwwQkFBMEIsR0FBRyxxQkFBcUIsMEJBQTBCLEdBQUcsNkJBQTZCLDBCQUEwQixHQUFHLDhCQUE4QiwwQkFBMEIsR0FBRyw2QkFBNkIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDJCQUEyQiwwQkFBMEIsR0FBRyw0QkFBNEIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLHlCQUF5QiwwQkFBMEIsR0FBRyx1QkFBdUIsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLDZCQUE2QiwwQkFBMEIsR0FBRyxzQkFBc0IsMEJBQTBCLEdBQUcsNkJBQTZCLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyw0QkFBNEIsMEJBQTBCLEdBQUcsc0JBQXNCLDBCQUEwQixHQUFHLDZCQUE2QiwwQkFBMEIsR0FBRywwQkFBMEIsMEJBQTBCLEdBQUcsMkJBQTJCLDBCQUEwQixHQUFHLDBCQUEwQiwwQkFBMEIsR0FBRyx3QkFBd0IsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLDhCQUE4QiwwQkFBMEIsR0FBRyw2QkFBNkIsMEJBQTBCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLDJCQUEyQiwwQkFBMEIsR0FBRywyQkFBMkIsMEJBQTBCLEdBQUcsNEJBQTRCLDBCQUEwQixHQUFHLHlCQUF5QiwwQkFBMEIsR0FBRyxxQkFBcUIsMEJBQTBCLEdBQUcsa0NBQWtDLDBCQUEwQixHQUFHLGtDQUFrQywwQkFBMEIsR0FBRyxtQ0FBbUMsMEJBQTBCLEdBQUcsZ0NBQWdDLDBCQUEwQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRyw0QkFBNEIsMEJBQTBCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLHdCQUF3QiwwQkFBMEIsR0FBRzs7Ozs7Ozs7Ozs7OztBQ1Z0NVEsMkJBQTJCLG1CQUFPLENBQUMsMkdBQXNEO0FBQ3pGO0FBQ0EsY0FBYyxRQUFTLHdIQUF3SCw0RUFBNEUscUJBQXFCLGdDQUFnQyw4QkFBOEIsNkJBQTZCLDJCQUEyQiwwQkFBMEIsc0JBQXNCLEVBQUUsOENBQThDLG1CQUFtQixtQkFBbUIsRUFBRSxrQkFBa0IscUJBQXFCLGNBQWMsRUFBRSxxQkFBcUIsb0JBQW9CLHFCQUFxQix1QkFBdUIsRUFBRSwwQ0FBMEMsZ0JBQWdCLEVBQUUsOEJBQThCLDJDQUEyQyx1Q0FBdUMsbUNBQW1DLCtCQUErQiwyREFBMkQscURBQXFELDJDQUEyQyxvREFBb0QsNENBQTRDLDJEQUEyRCxtREFBbUQsRUFBRSw2QkFBNkIsdUJBQXVCLEVBQUUsaUNBQWlDLGtDQUFrQyxXQUFXLFlBQVksZUFBZSxvQkFBb0IsZ0JBQWdCLEVBQUUsMENBQTBDLGVBQWUsaUNBQWlDLHlCQUF5QixvREFBb0QsNENBQTRDLHlDQUF5QyxpQ0FBaUMsMkRBQTJELG1EQUFtRCxFQUFFLHdDQUF3QyxnQkFBZ0IsRUFBRSxpREFBaUQsZUFBZSxFQUFFLGdHQUFnRyxxQkFBcUIsZUFBZSx1QkFBdUIsRUFBRSxzQ0FBc0Msb0JBQW9CLDBCQUEwQixtQkFBbUIsRUFBRSx3Q0FBd0MsOEJBQThCLHdCQUF3QiwwQkFBMEIsZ0JBQWdCLHFCQUFxQix3QkFBd0IsZUFBZSx1QkFBdUIsZ0JBQWdCLDJDQUEyQyxtQ0FBbUMsRUFBRSwwRkFBMEYsOEJBQThCLEVBQUUsMEJBQTBCLGlCQUFpQixFQUFFLGlDQUFpQyxlQUFlLEVBQUUsMEVBQTBFLGtDQUFrQyxvQkFBb0IsY0FBYyxxQkFBcUIsMENBQTBDLCtDQUErQyw4Q0FBOEMsa0RBQWtELDZDQUE2QyxtREFBbUQsNkNBQTZDLGdDQUFnQyw4QkFBOEIsNkJBQTZCLDJCQUEyQiwwQkFBMEIsc0JBQXNCLEVBQUUseUNBQXlDLHFCQUFxQixzRUFBc0UsOERBQThELEVBQUUsNEZBQTRGLHVCQUF1QixFQUFFLDBDQUEwQyxtQkFBbUIsaUJBQWlCLG9CQUFvQixFQUFFLHNGQUFzRixtQkFBbUIsbUJBQW1CLEVBQUUsNENBQTRDLGdCQUFnQixFQUFFLDhEQUE4RCxnQkFBZ0IsbUJBQW1CLGFBQWEsaUJBQWlCLG9EQUFvRCxvQkFBb0IsdUJBQXVCLGdCQUFnQixzQkFBc0IsaUJBQWlCLGdEQUFnRCx3Q0FBd0MsRUFBRSx5QkFBeUIsZUFBZSxFQUFFLHlCQUF5Qiw2QkFBNkIsZUFBZSxFQUFFLHlCQUF5QixpQ0FBaUMsZ0JBQWdCLEVBQUUsNEJBQTRCLHlCQUF5QixFQUFFLGdCQUFnQixnQkFBZ0IsZUFBZSw2QkFBNkIscUJBQXFCLEVBQUUsNENBQTRDLHVCQUF1QixFQUFFLG9DQUFvQyxrQ0FBa0MsRUFBRSx1Q0FBdUMsa0NBQWtDLGFBQWEsV0FBVyxFQUFFLDZDQUE2QywyQkFBMkIsK0JBQStCLEVBQUUsb0VBQW9FLGNBQWMsdUJBQXVCLGtCQUFrQixFQUFFLGdEQUFnRCxvQ0FBb0MsaUJBQWlCLGNBQWMsRUFBRSxnREFBZ0QsaUNBQWlDLGlCQUFpQixjQUFjLEVBQUUsb0RBQW9ELG1CQUFtQixFQUFFLHlEQUF5RCxvQkFBb0Isa0NBQWtDLEVBQUUscUVBQXFFLHFCQUFxQixFQUFFLGtFQUFrRSxnQkFBZ0IsRUFBRSw4RUFBOEUsNEJBQTRCLEVBQUUsNENBQTRDLFFBQVEsY0FBYyxFQUFFLFNBQVMsa0JBQWtCLEVBQUUsVUFBVSxjQUFjLEVBQUUsRUFBRSx5QkFBeUIsUUFBUSxjQUFjLEVBQUUsU0FBUyxrQkFBa0IsRUFBRSxVQUFVLGNBQWMsRUFBRSxFQUFFLCtCQUErQixRQUFRLGFBQWEsRUFBRSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsYUFBYSxFQUFFLEVBQUUsdUJBQXVCLFFBQVEsYUFBYSxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsVUFBVSxhQUFhLEVBQUUsRUFBRSxnQ0FBZ0MsUUFBUSxjQUFjLEVBQUUsU0FBUyxpQkFBaUIsRUFBRSxVQUFVLGNBQWMsRUFBRSxFQUFFLHdCQUF3QixRQUFRLGNBQWMsRUFBRSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsY0FBYyxFQUFFLEVBQUUsa0NBQWtDLFFBQVEsZ0JBQWdCLEVBQUUsU0FBUyxvQkFBb0IsRUFBRSxVQUFVLGdCQUFnQixFQUFFLEVBQUUsMEJBQTBCLFFBQVEsZ0JBQWdCLEVBQUUsU0FBUyxvQkFBb0IsRUFBRSxVQUFVLGdCQUFnQixFQUFFLEVBQUUsNkJBQTZCLHFDQUFxQyw2QkFBNkIsdUJBQXVCLEVBQUUsNEJBQTRCLG9DQUFvQyw0QkFBNEIsdUJBQXVCLEVBQUUsc0NBQXNDLG1DQUFtQywyQkFBMkIsdUJBQXVCLEVBQUUscUNBQXFDLHNDQUFzQyw4QkFBOEIsdUJBQXVCLEVBQUUsbUNBQW1DLG9DQUFvQyw0QkFBNEIsdUJBQXVCLEVBQUUsa0NBQWtDLHFDQUFxQyw2QkFBNkIsdUJBQXVCLEVBQUUsa0RBQWtELHlCQUF5QixzQkFBc0Isb0JBQW9CLHFCQUFxQixpQkFBaUIsRUFBRSxpQ0FBaUMsaUJBQWlCLDZCQUE2QiwwQkFBMEIsd0JBQXdCLHlCQUF5QixxQkFBcUIsRUFBRSxzREFBc0QscUJBQXFCLEVBQUUsMEJBQTBCLGlCQUFpQixrQkFBa0IsZ0JBQWdCLHFCQUFxQix1QkFBdUIsRUFBRSx5QkFBeUIscUJBQXFCLHFCQUFxQixnQkFBZ0IsdUJBQXVCLEVBQUUsNEJBQTRCLGdCQUFnQixFQUFFLHdCQUF3QiwyQkFBMkIsMEJBQTBCLHVCQUF1QixpQkFBaUIsbUJBQW1CLG9CQUFvQixzQkFBc0IsbUJBQW1CLEVBQUUsK0JBQStCLGdCQUFnQiw4QkFBOEIsRUFBRSx5QkFBeUIsd0JBQXdCLHdCQUF3QixtQkFBbUIsMEJBQTBCLGdCQUFnQixnQkFBZ0IsaUJBQWlCLHVCQUF1QixnQkFBZ0Isc0JBQXNCLHVCQUF1QixzQkFBc0IsMEJBQTBCLG9CQUFvQixFQUFFLHNCQUFzQiwwQkFBMEIsRUFBRSwrQkFBK0IsbUJBQW1CLHFCQUFxQixFQUFFLHlCQUF5Qix1QkFBdUIsRUFBRSwwQkFBMEIscUJBQXFCLHVCQUF1QixpQkFBaUIsWUFBWSxXQUFXLEVBQUUsNkJBQTZCLGdCQUFnQix1QkFBdUIsaUJBQWlCLGtCQUFrQiw4QkFBOEIsaUJBQWlCLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUNGNWhTLDJCQUEyQixtQkFBTyxDQUFDLHdHQUFtRDtBQUN0RjtBQUNBLFVBQVUsbUJBQU8sQ0FBQyw2SkFBdUU7QUFDekYsVUFBVSxtQkFBTyxDQUFDLHFMQUFtRjs7QUFFckc7QUFDQSxjQUFjLFFBQVMsd0hBQXdILDRFQUE0RSxxQkFBcUIsZ0NBQWdDLDhCQUE4Qiw2QkFBNkIsMkJBQTJCLDBCQUEwQixzQkFBc0IsRUFBRSw4Q0FBOEMsbUJBQW1CLG1CQUFtQixFQUFFLGtCQUFrQixxQkFBcUIsY0FBYyxFQUFFLHFCQUFxQixvQkFBb0IscUJBQXFCLHVCQUF1QixFQUFFLDBDQUEwQyxnQkFBZ0IsRUFBRSw4QkFBOEIsMkNBQTJDLHVDQUF1QyxtQ0FBbUMsK0JBQStCLDJEQUEyRCxxREFBcUQsMkNBQTJDLG9EQUFvRCw0Q0FBNEMsMkRBQTJELG1EQUFtRCxFQUFFLDZCQUE2Qix1QkFBdUIsRUFBRSxpQ0FBaUMsa0NBQWtDLFdBQVcsWUFBWSxlQUFlLG9CQUFvQixnQkFBZ0IsRUFBRSwwQ0FBMEMsZUFBZSxpQ0FBaUMseUJBQXlCLG9EQUFvRCw0Q0FBNEMseUNBQXlDLGlDQUFpQywyREFBMkQsbURBQW1ELEVBQUUsd0NBQXdDLGdCQUFnQixFQUFFLGlEQUFpRCxlQUFlLEVBQUUsZ0dBQWdHLHFCQUFxQixlQUFlLHVCQUF1QixFQUFFLHNDQUFzQyxvQkFBb0IsMEJBQTBCLG1CQUFtQixFQUFFLHdDQUF3Qyw4QkFBOEIsd0JBQXdCLDBCQUEwQixnQkFBZ0IscUJBQXFCLHdCQUF3QixlQUFlLHVCQUF1QixnQkFBZ0IsMkNBQTJDLG1DQUFtQyxFQUFFLDBGQUEwRiw4QkFBOEIsRUFBRSwwQkFBMEIsaUJBQWlCLEVBQUUsaUNBQWlDLGVBQWUsRUFBRSwwRUFBMEUsa0NBQWtDLG9CQUFvQixjQUFjLHFCQUFxQiwwQ0FBMEMsK0NBQStDLDhDQUE4QyxrREFBa0QsNkNBQTZDLG1EQUFtRCw2Q0FBNkMsZ0NBQWdDLDhCQUE4Qiw2QkFBNkIsMkJBQTJCLDBCQUEwQixzQkFBc0IsRUFBRSx5Q0FBeUMscUJBQXFCLHNFQUFzRSw4REFBOEQsRUFBRSw0RkFBNEYsdUJBQXVCLEVBQUUsMENBQTBDLG1CQUFtQixpQkFBaUIsb0JBQW9CLEVBQUUsc0ZBQXNGLG1CQUFtQixtQkFBbUIsRUFBRSw0Q0FBNEMsZ0JBQWdCLEVBQUUsOERBQThELGdCQUFnQixtQkFBbUIsYUFBYSxpQkFBaUIsb0RBQW9ELG9CQUFvQix1QkFBdUIsZ0JBQWdCLHNCQUFzQixpQkFBaUIsZ0RBQWdELHdDQUF3QyxFQUFFLHlCQUF5QixlQUFlLEVBQUUseUJBQXlCLDZCQUE2QixlQUFlLEVBQUUseUJBQXlCLGlDQUFpQyxnQkFBZ0IsRUFBRSw0QkFBNEIseUJBQXlCLEVBQUUsZ0JBQWdCLGdCQUFnQixlQUFlLDZCQUE2QixxQkFBcUIsRUFBRSw0Q0FBNEMsdUJBQXVCLEVBQUUsb0NBQW9DLGtDQUFrQyxFQUFFLHVDQUF1QyxrQ0FBa0MsYUFBYSxXQUFXLEVBQUUsNkNBQTZDLDJCQUEyQiwrQkFBK0IsRUFBRSxvRUFBb0UsY0FBYyx1QkFBdUIsa0JBQWtCLEVBQUUsZ0RBQWdELG9DQUFvQyxpQkFBaUIsY0FBYyxFQUFFLGdEQUFnRCxpQ0FBaUMsaUJBQWlCLGNBQWMsRUFBRSxvREFBb0QsbUJBQW1CLEVBQUUseURBQXlELG9CQUFvQixrQ0FBa0MsRUFBRSxxRUFBcUUscUJBQXFCLEVBQUUsa0VBQWtFLGdCQUFnQixFQUFFLDhFQUE4RSw0QkFBNEIsRUFBRSw0Q0FBNEMsUUFBUSxjQUFjLEVBQUUsU0FBUyxrQkFBa0IsRUFBRSxVQUFVLGNBQWMsRUFBRSxFQUFFLHlCQUF5QixRQUFRLGNBQWMsRUFBRSxTQUFTLGtCQUFrQixFQUFFLFVBQVUsY0FBYyxFQUFFLEVBQUUsK0JBQStCLFFBQVEsYUFBYSxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsVUFBVSxhQUFhLEVBQUUsRUFBRSx1QkFBdUIsUUFBUSxhQUFhLEVBQUUsU0FBUyxpQkFBaUIsRUFBRSxVQUFVLGFBQWEsRUFBRSxFQUFFLGdDQUFnQyxRQUFRLGNBQWMsRUFBRSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsY0FBYyxFQUFFLEVBQUUsd0JBQXdCLFFBQVEsY0FBYyxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsVUFBVSxjQUFjLEVBQUUsRUFBRSxrQ0FBa0MsUUFBUSxnQkFBZ0IsRUFBRSxTQUFTLG9CQUFvQixFQUFFLFVBQVUsZ0JBQWdCLEVBQUUsRUFBRSwwQkFBMEIsUUFBUSxnQkFBZ0IsRUFBRSxTQUFTLG9CQUFvQixFQUFFLFVBQVUsZ0JBQWdCLEVBQUUsRUFBRSw2QkFBNkIscUNBQXFDLDZCQUE2Qix1QkFBdUIsRUFBRSw0QkFBNEIsb0NBQW9DLDRCQUE0Qix1QkFBdUIsRUFBRSxzQ0FBc0MsbUNBQW1DLDJCQUEyQix1QkFBdUIsRUFBRSxxQ0FBcUMsc0NBQXNDLDhCQUE4Qix1QkFBdUIsRUFBRSxtQ0FBbUMsb0NBQW9DLDRCQUE0Qix1QkFBdUIsRUFBRSxrQ0FBa0MscUNBQXFDLDZCQUE2Qix1QkFBdUIsRUFBRSxrREFBa0QseUJBQXlCLHNCQUFzQixvQkFBb0IscUJBQXFCLGlCQUFpQixFQUFFLGlDQUFpQyxpQkFBaUIsNkJBQTZCLDBCQUEwQix3QkFBd0IseUJBQXlCLHFCQUFxQixFQUFFLHNEQUFzRCxxQkFBcUIsRUFBRSwwQkFBMEIsaUJBQWlCLGtCQUFrQixnQkFBZ0IscUJBQXFCLHVCQUF1QixFQUFFLHlCQUF5QixxQkFBcUIscUJBQXFCLGdCQUFnQix1QkFBdUIsRUFBRSw0QkFBNEIsZ0JBQWdCLEVBQUUsd0JBQXdCLDJCQUEyQiwwQkFBMEIsdUJBQXVCLGlCQUFpQixtQkFBbUIsb0JBQW9CLHNCQUFzQixtQkFBbUIsRUFBRSwrQkFBK0IsZ0JBQWdCLDhCQUE4QixFQUFFLHlCQUF5Qix3QkFBd0Isd0JBQXdCLG1CQUFtQiwwQkFBMEIsZ0JBQWdCLGdCQUFnQixpQkFBaUIsdUJBQXVCLGdCQUFnQixzQkFBc0IsdUJBQXVCLHNCQUFzQiwwQkFBMEIsb0JBQW9CLEVBQUUsc0JBQXNCLDBCQUEwQixFQUFFLCtCQUErQixtQkFBbUIscUJBQXFCLEVBQUUseUJBQXlCLHVCQUF1QixFQUFFLDBCQUEwQixxQkFBcUIsdUJBQXVCLGlCQUFpQixZQUFZLFdBQVcsRUFBRSw2QkFBNkIsZ0JBQWdCLHVCQUF1QixpQkFBaUIsa0JBQWtCLDhCQUE4QixpQkFBaUIsRUFBRSw4QkFBOEIsMkJBQTJCLEVBQUUsdUJBQXVCLDZCQUE2QixFQUFFLGtDQUFrQyxjQUFjLHdCQUF3QixnQkFBZ0IsaUJBQWlCLHFCQUFxQixlQUFlLHVCQUF1QixlQUFlLEVBQUUsOEVBQThFLHdCQUF3QixFQUFFLHNCQUFzQixjQUFjLGVBQWUsY0FBYyxlQUFlLHFCQUFxQiwwQkFBMEIsb0JBQW9CLHFCQUFxQixFQUFFLDhEQUE4RCxrQkFBa0IsbUJBQW1CLEVBQUUsZ0NBQWdDLGdCQUFnQixFQUFFLHlCQUF5QixZQUFZLEVBQUUscUJBQXFCLGdCQUFnQixpQkFBaUIsV0FBVyxZQUFZLHVCQUF1QixlQUFlLDZCQUE2QixFQUFFLHdCQUF3QiwrQkFBK0IsRUFBRSwwQkFBMEIsK0JBQStCLEVBQUUsY0FBYyxtQkFBbUIsMEJBQTBCLHFCQUFxQixpQ0FBaUMsRUFBRSx3QkFBd0IsdUJBQXVCLFdBQVcsWUFBWSxnQkFBZ0IsaUJBQWlCLEVBQUUsbUJBQW1CLHVCQUF1QixFQUFFLDBCQUEwQix1QkFBdUIscUJBQXFCLG1CQUFtQixFQUFFLCtGQUErRixrQkFBa0IsRUFBRSxxQkFBcUIscUJBQXFCLGdCQUFnQixnQkFBZ0IsY0FBYyxZQUFZLEVBQUUscUJBQXFCLHFCQUFxQixnQkFBZ0IsZ0JBQWdCLGlCQUFpQixZQUFZLEVBQUUscUJBQXFCLHFCQUFxQixlQUFlLGdCQUFnQixXQUFXLGlCQUFpQixFQUFFLHFCQUFxQixxQkFBcUIsZUFBZSxlQUFlLFdBQVcsaUJBQWlCLEVBQUUsc0JBQXNCLHNCQUFzQixnQkFBZ0IsaUJBQWlCLGVBQWUsZ0JBQWdCLEVBQUUsc0JBQXNCLHNCQUFzQixlQUFlLGdCQUFnQixlQUFlLGlCQUFpQixFQUFFLHNCQUFzQixzQkFBc0IsZUFBZSxnQkFBZ0IsZUFBZSxjQUFjLEVBQUUsc0JBQXNCLHNCQUFzQixlQUFlLGdCQUFnQixnQkFBZ0IsY0FBYyxFQUFFLGdCQUFnQiwyREFBMkQsd0RBQXdELG1EQUFtRCxFQUFFLDJCQUEyQiw4QkFBOEIsNkJBQTZCLDJCQUEyQix5QkFBeUIsc0JBQXNCLEVBQUUsMkJBQTJCLGlCQUFpQixrQkFBa0IscUJBQXFCLHVCQUF1QixpQkFBaUIsRUFBRSx5QkFBeUIscUJBQXFCLEVBQUUsaUNBQWlDLGdEQUFnRCxFQUFFLHVCQUF1QixvREFBb0QsZUFBZSxFQUFFLHdCQUF3QixnREFBZ0QsZUFBZSxFQUFFLDRCQUE0QixvREFBb0QsRUFBRSw2QkFBNkIsMkNBQTJDLEVBQUUscUJBQXFCLG1CQUFtQixFQUFFLHlJQUF5SSwwQkFBMEIsNkJBQTZCLHFCQUFxQixFQUFFLDhCQUE4QiwyQkFBMkIsRUFBRSx1QkFBdUIsNkJBQTZCLEVBQUUsa0NBQWtDLGNBQWMsd0JBQXdCLGdCQUFnQixpQkFBaUIscUJBQXFCLGVBQWUsdUJBQXVCLGVBQWUsRUFBRSw4RUFBOEUsd0JBQXdCLEVBQUUsc0JBQXNCLGNBQWMsZUFBZSxjQUFjLGVBQWUscUJBQXFCLDBCQUEwQixvQkFBb0IscUJBQXFCLEVBQUUsOERBQThELGtCQUFrQixtQkFBbUIsRUFBRSxnQ0FBZ0MsZ0JBQWdCLEVBQUUseUJBQXlCLFlBQVksRUFBRSxxQkFBcUIsZ0JBQWdCLGlCQUFpQixXQUFXLFlBQVksdUJBQXVCLGVBQWUsNkJBQTZCLEVBQUUsd0JBQXdCLCtCQUErQixFQUFFLDBCQUEwQiwrQkFBK0IsRUFBRSxjQUFjLG1CQUFtQiwwQkFBMEIscUJBQXFCLGlDQUFpQyxFQUFFLHdCQUF3Qix1QkFBdUIsV0FBVyxZQUFZLGdCQUFnQixpQkFBaUIsRUFBRSxtQkFBbUIsdUJBQXVCLEVBQUUsMEJBQTBCLHVCQUF1QixxQkFBcUIsbUJBQW1CLEVBQUUsK0ZBQStGLGtCQUFrQixFQUFFLHFCQUFxQixxQkFBcUIsZ0JBQWdCLGdCQUFnQixjQUFjLFlBQVksRUFBRSxxQkFBcUIscUJBQXFCLGdCQUFnQixnQkFBZ0IsaUJBQWlCLFlBQVksRUFBRSxxQkFBcUIscUJBQXFCLGVBQWUsZ0JBQWdCLFdBQVcsaUJBQWlCLEVBQUUscUJBQXFCLHFCQUFxQixlQUFlLGVBQWUsV0FBVyxpQkFBaUIsRUFBRSxzQkFBc0Isc0JBQXNCLGdCQUFnQixpQkFBaUIsZUFBZSxnQkFBZ0IsRUFBRSxzQkFBc0Isc0JBQXNCLGVBQWUsZ0JBQWdCLGVBQWUsaUJBQWlCLEVBQUUsc0JBQXNCLHNCQUFzQixlQUFlLGdCQUFnQixlQUFlLGNBQWMsRUFBRSxzQkFBc0Isc0JBQXNCLGVBQWUsZ0JBQWdCLGdCQUFnQixjQUFjLEVBQUUsZ0JBQWdCLDJEQUEyRCx3REFBd0QsbURBQW1ELEVBQUUsMkJBQTJCLDhCQUE4Qiw2QkFBNkIsMkJBQTJCLHlCQUF5QixzQkFBc0IsRUFBRSwyQkFBMkIsaUJBQWlCLGtCQUFrQixxQkFBcUIsdUJBQXVCLGlCQUFpQixFQUFFLHlCQUF5QixxQkFBcUIsRUFBRSxpQ0FBaUMsZ0RBQWdELEVBQUUsdUJBQXVCLG9EQUFvRCxlQUFlLEVBQUUsd0JBQXdCLGdEQUFnRCxlQUFlLEVBQUUsNEJBQTRCLG9EQUFvRCxFQUFFLDZCQUE2QiwyQ0FBMkMsRUFBRSxxQkFBcUIsbUJBQW1CLEVBQUUseUlBQXlJLDBCQUEwQiw2QkFBNkIscUJBQXFCLEVBQUUsOEJBQThCLDBCQUEwQix1QkFBdUIsZUFBZSxxQ0FBcUMsb0JBQW9CLHVCQUF1QixZQUFZLHNCQUFzQiwyREFBMkQsY0FBYywwQkFBMEIsRUFBRSwwREFBMEQsbUJBQW1CLHdCQUF3QixFQUFFLDBDQUEwQyx1QkFBdUIsRUFBRSxrRkFBa0YsbUJBQW1CLDRCQUE0QixFQUFFLCtDQUErQyxtQ0FBbUMsRUFBRSxnREFBZ0QsbUNBQW1DLEVBQUUsZ0xBQWdMLHVCQUF1QixhQUFhLHNCQUFzQixnQkFBZ0IsRUFBRSwrQ0FBK0MsYUFBYSxjQUFjLHNCQUFzQix1QkFBdUIsZUFBZSxnQkFBZ0IsRUFBRSwwQkFBMEIsZUFBZSxFQUFFLDJCQUEyQixnQkFBZ0IsRUFBRSwrQ0FBK0MsbUJBQW1CLG9CQUFvQixFQUFFLDJEQUEyRCxjQUFjLGVBQWUsMENBQTBDLHlDQUF5QyxnQkFBZ0IsRUFBRSxnSEFBZ0gsc0JBQXNCLHVCQUF1QixFQUFFLGdEQUFnRCxnQkFBZ0IsRUFBRSx1REFBdUQsZ0JBQWdCLEVBQUUsdURBQXVELGVBQWUsRUFBRSx1REFBdUQsaUJBQWlCLEVBQUUsdURBQXVELGVBQWUsRUFBRSx1REFBdUQsZUFBZSxFQUFFLHVEQUF1RCxpQkFBaUIsRUFBRSwrQkFBK0IscVVBQXFVLGtCQUFrQixFQUFFLEVBQUUsaUJBQWlCLDJCQUEyQixFQUFFLGNBQWMsMkJBQTJCLDBCQUEwQixzQkFBc0IsNEJBQTRCLG9CQUFvQixxQkFBcUIsRUFBRSwwQkFBMEIsNEJBQTRCLDRCQUE0QixFQUFFLGlEQUFpRCxxQkFBcUIsRUFBRSxvQ0FBb0MsNkJBQTZCLEVBQUUsd0JBQXdCLGtCQUFrQixnQ0FBZ0MsRUFBRSxZQUFZLDRCQUE0QixrQkFBa0IsRUFBRSxrQkFBa0Isa0JBQWtCLGdDQUFnQyxFQUFFLHNCQUFzQiw2QkFBNkIsRUFBRSwrRUFBK0UsbUJBQW1CLEVBQUUsc0JBQXNCLDJCQUEyQixpQkFBaUIsb0JBQW9CLHNCQUFzQiwyQkFBMkIsdUJBQXVCLDBDQUEwQyxFQUFFLHlFQUF5RSwyQkFBMkIsRUFBRSxnQ0FBZ0Msa0JBQWtCLEVBQUUsZ0JBQWdCLGVBQWUsY0FBYyxFQUFFLG9CQUFvQiw2QkFBNkIsRUFBRSxjQUFjLGtCQUFrQixpQkFBaUIsc0JBQXNCLGdCQUFnQixFQUFFLHVCQUF1Qix3QkFBd0IsaURBQWlELEVBQUUsdUJBQXVCLGNBQWMsd0JBQXdCLG9CQUFvQiwwQkFBMEIsOEJBQThCLG9CQUFvQixFQUFFLGVBQWUsbUJBQW1CLGdCQUFnQixFQUFFLGtCQUFrQixlQUFlLGNBQWMsMEJBQTBCLHdCQUF3QixFQUFFLHdCQUF3QixvQ0FBb0Msd0NBQXdDLHlCQUF5Qiw2QkFBNkIsRUFBRSw0QkFBNEIsMkJBQTJCLDhCQUE4QixvQkFBb0IsRUFBRSxnQ0FBZ0MsbURBQW1ELHNDQUFzQyxFQUFFLHlDQUF5QyxzQkFBc0IsNkJBQTZCLGlCQUFpQixvQkFBb0Isa0JBQWtCLHVCQUF1QixxQkFBcUIsOEJBQThCLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUNOeHZwQiwyQkFBMkIsbUJBQU8sQ0FBQywyR0FBc0Q7QUFDekY7QUFDQSxjQUFjLFFBQVMsY0FBYywwQkFBMEIsRUFBRSwwQ0FBMEMsbUJBQW1CLEVBQUUsMkNBQTJDLGtCQUFrQixFQUFFLCtEQUErRCxjQUFjLGFBQWEsd0JBQXdCLHNCQUFzQiwwQkFBMEIsMkRBQTJELDJDQUEyQyxFQUFFLDZEQUE2RCw2QkFBNkIsOEJBQThCLEVBQUUsZ0xBQWdMLGtCQUFrQixFQUFFLHFDQUFxQyx1QkFBdUIsRUFBRSx1REFBdUQsNEJBQTRCLG9CQUFvQix5QkFBeUIsZUFBZSxrQkFBa0Isa0JBQWtCLGdCQUFnQixxQ0FBcUMsaUJBQWlCLEVBQUUsc0JBQXNCLHVCQUF1Qix1QkFBdUIsRUFBRSw4QkFBOEIsNEJBQTRCLG9CQUFvQix5QkFBeUIsaUJBQWlCLGdCQUFnQixtQkFBbUIsZ0JBQWdCLGlDQUFpQyw4QkFBOEIsbUJBQW1CLEVBQUUsMENBQTBDLGlCQUFpQixFQUFFLGdFQUFnRSxpQkFBaUIsRUFBRSx1Q0FBdUMsb0JBQW9CLHFCQUFxQiwyQkFBMkIsd0JBQXdCLG9DQUFvQyxnQ0FBZ0MsRUFBRSxpRUFBaUUsZ0JBQWdCLHVCQUF1QixtQkFBbUIsRUFBRSw4REFBOEQsc0JBQXNCLEVBQUUscUNBQXFDLG1CQUFtQixFQUFFOzs7Ozs7Ozs7Ozs7OztBQ0Y5OUQ7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsZ0JBQWdCO0FBQ3ZELE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxvQkFBb0I7QUFDbkMsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxjQUFjO0FBQ25FO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDbkJBLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsb0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsbUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIseUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIseUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIseUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsMEM7Ozs7Ozs7Ozs7O0FDQXhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxtQkFBTyxDQUFDLHVEQUFROztBQUU5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0EsbUJBQW1CLDJCQUEyQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTs7QUFFQSxRQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQSxLQUFLLEtBQXdDLEVBQUUsRUFFN0M7O0FBRUYsUUFBUSxzQkFBaUI7QUFDekI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7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QUFNLENBQUNoSyxjQUFQLENBQXNCOEgsTUFBdEIsQ0FBNkIsc0JBQTdCLEVBQXFEakQsOEVBQXJEO0FBQ0FtRixNQUFNLENBQUNoSyxjQUFQLENBQXNCOEgsTUFBdEIsQ0FBNkIsb0JBQTdCLEVBQW1EakMsNEVBQW5EO0FBRUFtRSxNQUFNLENBQUNoSyxjQUFQLENBQXNCOEgsTUFBdEIsQ0FBNkIsUUFBN0IsRUFBdUM2UCxzREFBdkM7QUFDQTNOLE1BQU0sQ0FBQ2hLLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixTQUE3QixFQUF3Q21PLHVEQUF4QztBQUNBak0sTUFBTSxDQUFDaEssY0FBUCxDQUFzQjhILE1BQXRCLENBQTZCLGNBQTdCLEVBQTZDK1AsMkRBQTdDO0FBRUE3TixNQUFNLENBQUNoSyxjQUFQLENBQXNCOEgsTUFBdEIsQ0FBNkIsa0JBQTdCLEVBQWlEaVEsb0VBQWpEO0FBRUEvTixNQUFNLENBQUNoSyxjQUFQLENBQXNCOEgsTUFBdEIsQ0FBNkIsWUFBN0IsRUFBMkNxUSxpRUFBM0M7QUFFQW5PLE1BQU0sQ0FBQ2hLLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixpQkFBN0IsRUFBZ0RvRCwyRUFBaEQ7QUFDQWxCLE1BQU0sQ0FBQ2hLLGNBQVAsQ0FBc0I4SCxNQUF0QixDQUE2QixnQkFBN0IsRUFBK0NzRCwwRUFBL0M7O0FBR0FzVSxtQkFBTyxDQUFDLCtDQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsdUNBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxtREFBRCxDQUFQOztBQUVBQSxtQkFBTyxDQUFDLHVEQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsK0NBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyx1REFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLDZEQUFELENBQVAsQyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiOGNjMWY3M2UyMzc0NGFiOWZlNTBcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIEltcG9ydHNcbnZhciB1cmxFc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvdXJsLWVzY2FwZS5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzBfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4uL2ZvbnRzL2ZvbnRhd2Vzb21lLXdlYmZvbnQuZW90P3Y9NC43LjBcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMV9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi4vZm9udHMvZm9udGF3ZXNvbWUtd2ViZm9udC5lb3RcIikgKyBcIj8jaWVmaXgmdj00LjcuMFwiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzJfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4uL2ZvbnRzL2ZvbnRhd2Vzb21lLXdlYmZvbnQud29mZjI/dj00LjcuMFwiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18zX19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuLi9mb250cy9mb250YXdlc29tZS13ZWJmb250LndvZmY/dj00LjcuMFwiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX180X19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuLi9mb250cy9mb250YXdlc29tZS13ZWJmb250LnR0Zj92PTQuNy4wXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzVfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4uL2ZvbnRzL2ZvbnRhd2Vzb21lLXdlYmZvbnQuc3ZnP3Y9NC43LjBcIikgKyBcIiNmb250YXdlc29tZXJlZ3VsYXJcIik7XG5cbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyohXFxuICogIEZvbnQgQXdlc29tZSA0LjcuMCBieSBAZGF2ZWdhbmR5IC0gaHR0cDovL2ZvbnRhd2Vzb21lLmlvIC0gQGZvbnRhd2Vzb21lXFxuICogIExpY2Vuc2UgLSBodHRwOi8vZm9udGF3ZXNvbWUuaW8vbGljZW5zZSAoRm9udDogU0lMIE9GTCAxLjEsIENTUzogTUlUIExpY2Vuc2UpXFxuICovQGZvbnQtZmFjZXtmb250LWZhbWlseTonRm9udEF3ZXNvbWUnO3NyYzp1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzBfX18gKyBcIik7c3JjOnVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMV9fXyArIFwiKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18yX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSx1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzNfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyksdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX180X19fICsgXCIpIGZvcm1hdCgndHJ1ZXR5cGUnKSx1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzVfX18gKyBcIikgZm9ybWF0KCdzdmcnKTtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHlsZTpub3JtYWx9LmZhe2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQ6bm9ybWFsIG5vcm1hbCBub3JtYWwgMTRweC8xIEZvbnRBd2Vzb21lO2ZvbnQtc2l6ZTppbmhlcml0O3RleHQtcmVuZGVyaW5nOmF1dG87LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGV9LmZhLWxne2ZvbnQtc2l6ZToxLjMzMzMzMzMzZW07bGluZS1oZWlnaHQ6Ljc1ZW07dmVydGljYWwtYWxpZ246LTE1JX0uZmEtMnh7Zm9udC1zaXplOjJlbX0uZmEtM3h7Zm9udC1zaXplOjNlbX0uZmEtNHh7Zm9udC1zaXplOjRlbX0uZmEtNXh7Zm9udC1zaXplOjVlbX0uZmEtZnd7d2lkdGg6MS4yODU3MTQyOWVtO3RleHQtYWxpZ246Y2VudGVyfS5mYS11bHtwYWRkaW5nLWxlZnQ6MDttYXJnaW4tbGVmdDoyLjE0Mjg1NzE0ZW07bGlzdC1zdHlsZS10eXBlOm5vbmV9LmZhLXVsPmxpe3Bvc2l0aW9uOnJlbGF0aXZlfS5mYS1saXtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi0yLjE0Mjg1NzE0ZW07d2lkdGg6Mi4xNDI4NTcxNGVtO3RvcDouMTQyODU3MTRlbTt0ZXh0LWFsaWduOmNlbnRlcn0uZmEtbGkuZmEtbGd7bGVmdDotMS44NTcxNDI4NmVtfS5mYS1ib3JkZXJ7cGFkZGluZzouMmVtIC4yNWVtIC4xNWVtO2JvcmRlcjpzb2xpZCAuMDhlbSAjZWVlO2JvcmRlci1yYWRpdXM6LjFlbX0uZmEtcHVsbC1sZWZ0e2Zsb2F0OmxlZnR9LmZhLXB1bGwtcmlnaHR7ZmxvYXQ6cmlnaHR9LmZhLmZhLXB1bGwtbGVmdHttYXJnaW4tcmlnaHQ6LjNlbX0uZmEuZmEtcHVsbC1yaWdodHttYXJnaW4tbGVmdDouM2VtfS5wdWxsLXJpZ2h0e2Zsb2F0OnJpZ2h0fS5wdWxsLWxlZnR7ZmxvYXQ6bGVmdH0uZmEucHVsbC1sZWZ0e21hcmdpbi1yaWdodDouM2VtfS5mYS5wdWxsLXJpZ2h0e21hcmdpbi1sZWZ0Oi4zZW19LmZhLXNwaW57LXdlYmtpdC1hbmltYXRpb246ZmEtc3BpbiAycyBpbmZpbml0ZSBsaW5lYXI7YW5pbWF0aW9uOmZhLXNwaW4gMnMgaW5maW5pdGUgbGluZWFyfS5mYS1wdWxzZXstd2Via2l0LWFuaW1hdGlvbjpmYS1zcGluIDFzIGluZmluaXRlIHN0ZXBzKDgpO2FuaW1hdGlvbjpmYS1zcGluIDFzIGluZmluaXRlIHN0ZXBzKDgpfUAtd2Via2l0LWtleWZyYW1lcyBmYS1zcGluezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDBkZWcpfTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM1OWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNTlkZWcpfX1Aa2V5ZnJhbWVzIGZhLXNwaW57MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMGRlZyl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzU5ZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM1OWRlZyl9fS5mYS1yb3RhdGUtOTB7LW1zLWZpbHRlcjpcXFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJhc2ljSW1hZ2Uocm90YXRpb249MSlcXFwiOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg5MGRlZyk7LW1zLXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoOTBkZWcpfS5mYS1yb3RhdGUtMTgwey1tcy1maWx0ZXI6XFxcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CYXNpY0ltYWdlKHJvdGF0aW9uPTIpXFxcIjstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKTstbXMtdHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKX0uZmEtcm90YXRlLTI3MHstbXMtZmlsdGVyOlxcXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQmFzaWNJbWFnZShyb3RhdGlvbj0zKVxcXCI7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDI3MGRlZyk7LW1zLXRyYW5zZm9ybTpyb3RhdGUoMjcwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDI3MGRlZyl9LmZhLWZsaXAtaG9yaXpvbnRhbHstbXMtZmlsdGVyOlxcXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQmFzaWNJbWFnZShyb3RhdGlvbj0wLCBtaXJyb3I9MSlcXFwiOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC0xLCAxKTstbXMtdHJhbnNmb3JtOnNjYWxlKC0xLCAxKTt0cmFuc2Zvcm06c2NhbGUoLTEsIDEpfS5mYS1mbGlwLXZlcnRpY2Fsey1tcy1maWx0ZXI6XFxcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CYXNpY0ltYWdlKHJvdGF0aW9uPTIsIG1pcnJvcj0xKVxcXCI7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSwgLTEpOy1tcy10cmFuc2Zvcm06c2NhbGUoMSwgLTEpO3RyYW5zZm9ybTpzY2FsZSgxLCAtMSl9OnJvb3QgLmZhLXJvdGF0ZS05MCw6cm9vdCAuZmEtcm90YXRlLTE4MCw6cm9vdCAuZmEtcm90YXRlLTI3MCw6cm9vdCAuZmEtZmxpcC1ob3Jpem9udGFsLDpyb290IC5mYS1mbGlwLXZlcnRpY2Fse2ZpbHRlcjpub25lfS5mYS1zdGFja3twb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoyZW07aGVpZ2h0OjJlbTtsaW5lLWhlaWdodDoyZW07dmVydGljYWwtYWxpZ246bWlkZGxlfS5mYS1zdGFjay0xeCwuZmEtc3RhY2stMnh7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXJ9LmZhLXN0YWNrLTF4e2xpbmUtaGVpZ2h0OmluaGVyaXR9LmZhLXN0YWNrLTJ4e2ZvbnQtc2l6ZToyZW19LmZhLWludmVyc2V7Y29sb3I6I2ZmZn0uZmEtZ2xhc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDAwXFxcIn0uZmEtbXVzaWM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDAxXFxcIn0uZmEtc2VhcmNoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwMlxcXCJ9LmZhLWVudmVsb3BlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDAzXFxcIn0uZmEtaGVhcnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDA0XFxcIn0uZmEtc3RhcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMDVcXFwifS5mYS1zdGFyLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDA2XFxcIn0uZmEtdXNlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMDdcXFwifS5mYS1maWxtOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwOFxcXCJ9LmZhLXRoLWxhcmdlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwOVxcXCJ9LmZhLXRoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAwYVxcXCJ9LmZhLXRoLWxpc3Q6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDBiXFxcIn0uZmEtY2hlY2s6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDBjXFxcIn0uZmEtcmVtb3ZlOmJlZm9yZSwuZmEtY2xvc2U6YmVmb3JlLC5mYS10aW1lczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMGRcXFwifS5mYS1zZWFyY2gtcGx1czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMGVcXFwifS5mYS1zZWFyY2gtbWludXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDEwXFxcIn0uZmEtcG93ZXItb2ZmOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxMVxcXCJ9LmZhLXNpZ25hbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMTJcXFwifS5mYS1nZWFyOmJlZm9yZSwuZmEtY29nOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxM1xcXCJ9LmZhLXRyYXNoLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDE0XFxcIn0uZmEtaG9tZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMTVcXFwifS5mYS1maWxlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDE2XFxcIn0uZmEtY2xvY2stbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMTdcXFwifS5mYS1yb2FkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxOFxcXCJ9LmZhLWRvd25sb2FkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAxOVxcXCJ9LmZhLWFycm93LWNpcmNsZS1vLWRvd246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDFhXFxcIn0uZmEtYXJyb3ctY2lyY2xlLW8tdXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDFiXFxcIn0uZmEtaW5ib3g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDFjXFxcIn0uZmEtcGxheS1jaXJjbGUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMWRcXFwifS5mYS1yb3RhdGUtcmlnaHQ6YmVmb3JlLC5mYS1yZXBlYXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDFlXFxcIn0uZmEtcmVmcmVzaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMjFcXFwifS5mYS1saXN0LWFsdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMjJcXFwifS5mYS1sb2NrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAyM1xcXCJ9LmZhLWZsYWc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDI0XFxcIn0uZmEtaGVhZHBob25lczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMjVcXFwifS5mYS12b2x1bWUtb2ZmOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAyNlxcXCJ9LmZhLXZvbHVtZS1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAyN1xcXCJ9LmZhLXZvbHVtZS11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMjhcXFwifS5mYS1xcmNvZGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDI5XFxcIn0uZmEtYmFyY29kZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMmFcXFwifS5mYS10YWc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDJiXFxcIn0uZmEtdGFnczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMmNcXFwifS5mYS1ib29rOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAyZFxcXCJ9LmZhLWJvb2ttYXJrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAyZVxcXCJ9LmZhLXByaW50OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAyZlxcXCJ9LmZhLWNhbWVyYTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMzBcXFwifS5mYS1mb250OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzMVxcXCJ9LmZhLWJvbGQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDMyXFxcIn0uZmEtaXRhbGljOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzM1xcXCJ9LmZhLXRleHQtaGVpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzNFxcXCJ9LmZhLXRleHQtd2lkdGg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDM1XFxcIn0uZmEtYWxpZ24tbGVmdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMzZcXFwifS5mYS1hbGlnbi1jZW50ZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDM3XFxcIn0uZmEtYWxpZ24tcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDM4XFxcIn0uZmEtYWxpZ24tanVzdGlmeTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwMzlcXFwifS5mYS1saXN0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzYVxcXCJ9LmZhLWRlZGVudDpiZWZvcmUsLmZhLW91dGRlbnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDNiXFxcIn0uZmEtaW5kZW50OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzY1xcXCJ9LmZhLXZpZGVvLWNhbWVyYTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwM2RcXFwifS5mYS1waG90bzpiZWZvcmUsLmZhLWltYWdlOmJlZm9yZSwuZmEtcGljdHVyZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjAzZVxcXCJ9LmZhLXBlbmNpbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNDBcXFwifS5mYS1tYXAtbWFya2VyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0MVxcXCJ9LmZhLWFkanVzdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNDJcXFwifS5mYS10aW50OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0M1xcXCJ9LmZhLWVkaXQ6YmVmb3JlLC5mYS1wZW5jaWwtc3F1YXJlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDQ0XFxcIn0uZmEtc2hhcmUtc3F1YXJlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDQ1XFxcIn0uZmEtY2hlY2stc3F1YXJlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDQ2XFxcIn0uZmEtYXJyb3dzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0N1xcXCJ9LmZhLXN0ZXAtYmFja3dhcmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDQ4XFxcIn0uZmEtZmFzdC1iYWNrd2FyZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNDlcXFwifS5mYS1iYWNrd2FyZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNGFcXFwifS5mYS1wbGF5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0YlxcXCJ9LmZhLXBhdXNlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA0Y1xcXCJ9LmZhLXN0b3A6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDRkXFxcIn0uZmEtZm9yd2FyZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNGVcXFwifS5mYS1mYXN0LWZvcndhcmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDUwXFxcIn0uZmEtc3RlcC1mb3J3YXJkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1MVxcXCJ9LmZhLWVqZWN0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1MlxcXCJ9LmZhLWNoZXZyb24tbGVmdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNTNcXFwifS5mYS1jaGV2cm9uLXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1NFxcXCJ9LmZhLXBsdXMtY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1NVxcXCJ9LmZhLW1pbnVzLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNTZcXFwifS5mYS10aW1lcy1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDU3XFxcIn0uZmEtY2hlY2stY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1OFxcXCJ9LmZhLXF1ZXN0aW9uLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNTlcXFwifS5mYS1pbmZvLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNWFcXFwifS5mYS1jcm9zc2hhaXJzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1YlxcXCJ9LmZhLXRpbWVzLWNpcmNsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1Y1xcXCJ9LmZhLWNoZWNrLWNpcmNsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA1ZFxcXCJ9LmZhLWJhbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNWVcXFwifS5mYS1hcnJvdy1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2MFxcXCJ9LmZhLWFycm93LXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2MVxcXCJ9LmZhLWFycm93LXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2MlxcXCJ9LmZhLWFycm93LWRvd246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDYzXFxcIn0uZmEtbWFpbC1mb3J3YXJkOmJlZm9yZSwuZmEtc2hhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDY0XFxcIn0uZmEtZXhwYW5kOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2NVxcXCJ9LmZhLWNvbXByZXNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2NlxcXCJ9LmZhLXBsdXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDY3XFxcIn0uZmEtbWludXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDY4XFxcIn0uZmEtYXN0ZXJpc2s6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDY5XFxcIn0uZmEtZXhjbGFtYXRpb24tY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2YVxcXCJ9LmZhLWdpZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDZiXFxcIn0uZmEtbGVhZjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNmNcXFwifS5mYS1maXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA2ZFxcXCJ9LmZhLWV5ZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNmVcXFwifS5mYS1leWUtc2xhc2g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDcwXFxcIn0uZmEtd2FybmluZzpiZWZvcmUsLmZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3MVxcXCJ9LmZhLXBsYW5lOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3MlxcXCJ9LmZhLWNhbGVuZGFyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3M1xcXCJ9LmZhLXJhbmRvbTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNzRcXFwifS5mYS1jb21tZW50OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3NVxcXCJ9LmZhLW1hZ25ldDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNzZcXFwifS5mYS1jaGV2cm9uLXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3N1xcXCJ9LmZhLWNoZXZyb24tZG93bjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwNzhcXFwifS5mYS1yZXR3ZWV0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3OVxcXCJ9LmZhLXNob3BwaW5nLWNhcnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDdhXFxcIn0uZmEtZm9sZGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3YlxcXCJ9LmZhLWZvbGRlci1vcGVuOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3Y1xcXCJ9LmZhLWFycm93cy12OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3ZFxcXCJ9LmZhLWFycm93cy1oOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA3ZVxcXCJ9LmZhLWJhci1jaGFydC1vOmJlZm9yZSwuZmEtYmFyLWNoYXJ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA4MFxcXCJ9LmZhLXR3aXR0ZXItc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA4MVxcXCJ9LmZhLWZhY2Vib29rLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwODJcXFwifS5mYS1jYW1lcmEtcmV0cm86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDgzXFxcIn0uZmEta2V5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA4NFxcXCJ9LmZhLWdlYXJzOmJlZm9yZSwuZmEtY29nczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwODVcXFwifS5mYS1jb21tZW50czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwODZcXFwifS5mYS10aHVtYnMtby11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwODdcXFwifS5mYS10aHVtYnMtby1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA4OFxcXCJ9LmZhLXN0YXItaGFsZjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwODlcXFwifS5mYS1oZWFydC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA4YVxcXCJ9LmZhLXNpZ24tb3V0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA4YlxcXCJ9LmZhLWxpbmtlZGluLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOGNcXFwifS5mYS10aHVtYi10YWNrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA4ZFxcXCJ9LmZhLWV4dGVybmFsLWxpbms6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDhlXFxcIn0uZmEtc2lnbi1pbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOTBcXFwifS5mYS10cm9waHk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDkxXFxcIn0uZmEtZ2l0aHViLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOTJcXFwifS5mYS11cGxvYWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDkzXFxcIn0uZmEtbGVtb24tbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOTRcXFwifS5mYS1waG9uZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOTVcXFwifS5mYS1zcXVhcmUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOTZcXFwifS5mYS1ib29rbWFyay1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA5N1xcXCJ9LmZhLXBob25lLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOThcXFwifS5mYS10d2l0dGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA5OVxcXCJ9LmZhLWZhY2Vib29rLWY6YmVmb3JlLC5mYS1mYWNlYm9vazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwOWFcXFwifS5mYS1naXRodWI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDliXFxcIn0uZmEtdW5sb2NrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA5Y1xcXCJ9LmZhLWNyZWRpdC1jYXJkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjA5ZFxcXCJ9LmZhLWZlZWQ6YmVmb3JlLC5mYS1yc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMDllXFxcIn0uZmEtaGRkLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGEwXFxcIn0uZmEtYnVsbGhvcm46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGExXFxcIn0uZmEtYmVsbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZjNcXFwifS5mYS1jZXJ0aWZpY2F0ZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYTNcXFwifS5mYS1oYW5kLW8tcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGE0XFxcIn0uZmEtaGFuZC1vLWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGE1XFxcIn0uZmEtaGFuZC1vLXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhNlxcXCJ9LmZhLWhhbmQtby1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhN1xcXCJ9LmZhLWFycm93LWNpcmNsZS1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhOFxcXCJ9LmZhLWFycm93LWNpcmNsZS1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYTlcXFwifS5mYS1hcnJvdy1jaXJjbGUtdXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGFhXFxcIn0uZmEtYXJyb3ctY2lyY2xlLWRvd246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGFiXFxcIn0uZmEtZ2xvYmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGFjXFxcIn0uZmEtd3JlbmNoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhZFxcXCJ9LmZhLXRhc2tzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBhZVxcXCJ9LmZhLWZpbHRlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYjBcXFwifS5mYS1icmllZmNhc2U6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGIxXFxcIn0uZmEtYXJyb3dzLWFsdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYjJcXFwifS5mYS1ncm91cDpiZWZvcmUsLmZhLXVzZXJzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBjMFxcXCJ9LmZhLWNoYWluOmJlZm9yZSwuZmEtbGluazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYzFcXFwifS5mYS1jbG91ZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYzJcXFwifS5mYS1mbGFzazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYzNcXFwifS5mYS1jdXQ6YmVmb3JlLC5mYS1zY2lzc29yczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYzRcXFwifS5mYS1jb3B5OmJlZm9yZSwuZmEtZmlsZXMtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYzVcXFwifS5mYS1wYXBlcmNsaXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGM2XFxcIn0uZmEtc2F2ZTpiZWZvcmUsLmZhLWZsb3BweS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBjN1xcXCJ9LmZhLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYzhcXFwifS5mYS1uYXZpY29uOmJlZm9yZSwuZmEtcmVvcmRlcjpiZWZvcmUsLmZhLWJhcnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGM5XFxcIn0uZmEtbGlzdC11bDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwY2FcXFwifS5mYS1saXN0LW9sOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBjYlxcXCJ9LmZhLXN0cmlrZXRocm91Z2g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGNjXFxcIn0uZmEtdW5kZXJsaW5lOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBjZFxcXCJ9LmZhLXRhYmxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBjZVxcXCJ9LmZhLW1hZ2ljOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBkMFxcXCJ9LmZhLXRydWNrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBkMVxcXCJ9LmZhLXBpbnRlcmVzdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZDJcXFwifS5mYS1waW50ZXJlc3Qtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBkM1xcXCJ9LmZhLWdvb2dsZS1wbHVzLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZDRcXFwifS5mYS1nb29nbGUtcGx1czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZDVcXFwifS5mYS1tb25leTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZDZcXFwifS5mYS1jYXJldC1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBkN1xcXCJ9LmZhLWNhcmV0LXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBkOFxcXCJ9LmZhLWNhcmV0LWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGQ5XFxcIn0uZmEtY2FyZXQtcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGRhXFxcIn0uZmEtY29sdW1uczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZGJcXFwifS5mYS11bnNvcnRlZDpiZWZvcmUsLmZhLXNvcnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGRjXFxcIn0uZmEtc29ydC1kb3duOmJlZm9yZSwuZmEtc29ydC1kZXNjOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBkZFxcXCJ9LmZhLXNvcnQtdXA6YmVmb3JlLC5mYS1zb3J0LWFzYzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZGVcXFwifS5mYS1lbnZlbG9wZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZTBcXFwifS5mYS1saW5rZWRpbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZTFcXFwifS5mYS1yb3RhdGUtbGVmdDpiZWZvcmUsLmZhLXVuZG86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGUyXFxcIn0uZmEtbGVnYWw6YmVmb3JlLC5mYS1nYXZlbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZTNcXFwifS5mYS1kYXNoYm9hcmQ6YmVmb3JlLC5mYS10YWNob21ldGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBlNFxcXCJ9LmZhLWNvbW1lbnQtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZTVcXFwifS5mYS1jb21tZW50cy1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBlNlxcXCJ9LmZhLWZsYXNoOmJlZm9yZSwuZmEtYm9sdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZTdcXFwifS5mYS1zaXRlbWFwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBlOFxcXCJ9LmZhLXVtYnJlbGxhOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBlOVxcXCJ9LmZhLXBhc3RlOmJlZm9yZSwuZmEtY2xpcGJvYXJkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBlYVxcXCJ9LmZhLWxpZ2h0YnVsYi1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBlYlxcXCJ9LmZhLWV4Y2hhbmdlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBlY1xcXCJ9LmZhLWNsb3VkLWRvd25sb2FkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBlZFxcXCJ9LmZhLWNsb3VkLXVwbG9hZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZWVcXFwifS5mYS11c2VyLW1kOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmMFxcXCJ9LmZhLXN0ZXRob3Njb3BlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmMVxcXCJ9LmZhLXN1aXRjYXNlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmMlxcXCJ9LmZhLWJlbGwtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwYTJcXFwifS5mYS1jb2ZmZWU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGY0XFxcIn0uZmEtY3V0bGVyeTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZjVcXFwifS5mYS1maWxlLXRleHQtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZjZcXFwifS5mYS1idWlsZGluZy1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmN1xcXCJ9LmZhLWhvc3BpdGFsLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMGY4XFxcIn0uZmEtYW1idWxhbmNlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmOVxcXCJ9LmZhLW1lZGtpdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZmFcXFwifS5mYS1maWdodGVyLWpldDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYwZmJcXFwifS5mYS1iZWVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmY1xcXCJ9LmZhLWgtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmZFxcXCJ9LmZhLXBsdXMtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjBmZVxcXCJ9LmZhLWFuZ2xlLWRvdWJsZS1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEwMFxcXCJ9LmZhLWFuZ2xlLWRvdWJsZS1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMDFcXFwifS5mYS1hbmdsZS1kb3VibGUtdXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTAyXFxcIn0uZmEtYW5nbGUtZG91YmxlLWRvd246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTAzXFxcIn0uZmEtYW5nbGUtbGVmdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMDRcXFwifS5mYS1hbmdsZS1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMDVcXFwifS5mYS1hbmdsZS11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMDZcXFwifS5mYS1hbmdsZS1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEwN1xcXCJ9LmZhLWRlc2t0b3A6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTA4XFxcIn0uZmEtbGFwdG9wOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEwOVxcXCJ9LmZhLXRhYmxldDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMGFcXFwifS5mYS1tb2JpbGUtcGhvbmU6YmVmb3JlLC5mYS1tb2JpbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTBiXFxcIn0uZmEtY2lyY2xlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTBjXFxcIn0uZmEtcXVvdGUtbGVmdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMGRcXFwifS5mYS1xdW90ZS1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMGVcXFwifS5mYS1zcGlubmVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjExMFxcXCJ9LmZhLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMTFcXFwifS5mYS1tYWlsLXJlcGx5OmJlZm9yZSwuZmEtcmVwbHk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTEyXFxcIn0uZmEtZ2l0aHViLWFsdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMTNcXFwifS5mYS1mb2xkZXItbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMTRcXFwifS5mYS1mb2xkZXItb3Blbi1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjExNVxcXCJ9LmZhLXNtaWxlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTE4XFxcIn0uZmEtZnJvd24tbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMTlcXFwifS5mYS1tZWgtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMWFcXFwifS5mYS1nYW1lcGFkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjExYlxcXCJ9LmZhLWtleWJvYXJkLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTFjXFxcIn0uZmEtZmxhZy1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjExZFxcXCJ9LmZhLWZsYWctY2hlY2tlcmVkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjExZVxcXCJ9LmZhLXRlcm1pbmFsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEyMFxcXCJ9LmZhLWNvZGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTIxXFxcIn0uZmEtbWFpbC1yZXBseS1hbGw6YmVmb3JlLC5mYS1yZXBseS1hbGw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTIyXFxcIn0uZmEtc3Rhci1oYWxmLWVtcHR5OmJlZm9yZSwuZmEtc3Rhci1oYWxmLWZ1bGw6YmVmb3JlLC5mYS1zdGFyLWhhbGYtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMjNcXFwifS5mYS1sb2NhdGlvbi1hcnJvdzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMjRcXFwifS5mYS1jcm9wOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEyNVxcXCJ9LmZhLWNvZGUtZm9yazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMjZcXFwifS5mYS11bmxpbms6YmVmb3JlLC5mYS1jaGFpbi1icm9rZW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTI3XFxcIn0uZmEtcXVlc3Rpb246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTI4XFxcIn0uZmEtaW5mbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMjlcXFwifS5mYS1leGNsYW1hdGlvbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMmFcXFwifS5mYS1zdXBlcnNjcmlwdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMmJcXFwifS5mYS1zdWJzY3JpcHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTJjXFxcIn0uZmEtZXJhc2VyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEyZFxcXCJ9LmZhLXB1enpsZS1waWVjZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMmVcXFwifS5mYS1taWNyb3Bob25lOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzMFxcXCJ9LmZhLW1pY3JvcGhvbmUtc2xhc2g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTMxXFxcIn0uZmEtc2hpZWxkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzMlxcXCJ9LmZhLWNhbGVuZGFyLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTMzXFxcIn0uZmEtZmlyZS1leHRpbmd1aXNoZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTM0XFxcIn0uZmEtcm9ja2V0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzNVxcXCJ9LmZhLW1heGNkbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxMzZcXFwifS5mYS1jaGV2cm9uLWNpcmNsZS1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzN1xcXCJ9LmZhLWNoZXZyb24tY2lyY2xlLXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzOFxcXCJ9LmZhLWNoZXZyb24tY2lyY2xlLXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjEzOVxcXCJ9LmZhLWNoZXZyb24tY2lyY2xlLWRvd246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTNhXFxcIn0uZmEtaHRtbDU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTNiXFxcIn0uZmEtY3NzMzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxM2NcXFwifS5mYS1hbmNob3I6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTNkXFxcIn0uZmEtdW5sb2NrLWFsdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxM2VcXFwifS5mYS1idWxsc2V5ZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNDBcXFwifS5mYS1lbGxpcHNpcy1oOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0MVxcXCJ9LmZhLWVsbGlwc2lzLXY6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTQyXFxcIn0uZmEtcnNzLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNDNcXFwifS5mYS1wbGF5LWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNDRcXFwifS5mYS10aWNrZXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTQ1XFxcIn0uZmEtbWludXMtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0NlxcXCJ9LmZhLW1pbnVzLXNxdWFyZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0N1xcXCJ9LmZhLWxldmVsLXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0OFxcXCJ9LmZhLWxldmVsLWRvd246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTQ5XFxcIn0uZmEtY2hlY2stc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0YVxcXCJ9LmZhLXBlbmNpbC1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTRiXFxcIn0uZmEtZXh0ZXJuYWwtbGluay1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTRjXFxcIn0uZmEtc2hhcmUtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE0ZFxcXCJ9LmZhLWNvbXBhc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTRlXFxcIn0uZmEtdG9nZ2xlLWRvd246YmVmb3JlLC5mYS1jYXJldC1zcXVhcmUtby1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1MFxcXCJ9LmZhLXRvZ2dsZS11cDpiZWZvcmUsLmZhLWNhcmV0LXNxdWFyZS1vLXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1MVxcXCJ9LmZhLXRvZ2dsZS1yaWdodDpiZWZvcmUsLmZhLWNhcmV0LXNxdWFyZS1vLXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1MlxcXCJ9LmZhLWV1cm86YmVmb3JlLC5mYS1ldXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTUzXFxcIn0uZmEtZ2JwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1NFxcXCJ9LmZhLWRvbGxhcjpiZWZvcmUsLmZhLXVzZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNTVcXFwifS5mYS1ydXBlZTpiZWZvcmUsLmZhLWlucjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNTZcXFwifS5mYS1jbnk6YmVmb3JlLC5mYS1ybWI6YmVmb3JlLC5mYS15ZW46YmVmb3JlLC5mYS1qcHk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTU3XFxcIn0uZmEtcnVibGU6YmVmb3JlLC5mYS1yb3VibGU6YmVmb3JlLC5mYS1ydWI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTU4XFxcIn0uZmEtd29uOmJlZm9yZSwuZmEta3J3OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1OVxcXCJ9LmZhLWJpdGNvaW46YmVmb3JlLC5mYS1idGM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTVhXFxcIn0uZmEtZmlsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNWJcXFwifS5mYS1maWxlLXRleHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTVjXFxcIn0uZmEtc29ydC1hbHBoYS1hc2M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTVkXFxcIn0uZmEtc29ydC1hbHBoYS1kZXNjOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE1ZVxcXCJ9LmZhLXNvcnQtYW1vdW50LWFzYzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNjBcXFwifS5mYS1zb3J0LWFtb3VudC1kZXNjOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2MVxcXCJ9LmZhLXNvcnQtbnVtZXJpYy1hc2M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTYyXFxcIn0uZmEtc29ydC1udW1lcmljLWRlc2M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTYzXFxcIn0uZmEtdGh1bWJzLXVwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2NFxcXCJ9LmZhLXRodW1icy1kb3duOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2NVxcXCJ9LmZhLXlvdXR1YmUtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2NlxcXCJ9LmZhLXlvdXR1YmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTY3XFxcIn0uZmEteGluZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNjhcXFwifS5mYS14aW5nLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNjlcXFwifS5mYS15b3V0dWJlLXBsYXk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTZhXFxcIn0uZmEtZHJvcGJveDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNmJcXFwifS5mYS1zdGFjay1vdmVyZmxvdzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNmNcXFwifS5mYS1pbnN0YWdyYW06YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTZkXFxcIn0uZmEtZmxpY2tyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE2ZVxcXCJ9LmZhLWFkbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNzBcXFwifS5mYS1iaXRidWNrZXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTcxXFxcIn0uZmEtYml0YnVja2V0LXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNzJcXFwifS5mYS10dW1ibHI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTczXFxcIn0uZmEtdHVtYmxyLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNzRcXFwifS5mYS1sb25nLWFycm93LWRvd246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTc1XFxcIn0uZmEtbG9uZy1hcnJvdy11cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNzZcXFwifS5mYS1sb25nLWFycm93LWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTc3XFxcIn0uZmEtbG9uZy1hcnJvdy1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNzhcXFwifS5mYS1hcHBsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxNzlcXFwifS5mYS13aW5kb3dzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE3YVxcXCJ9LmZhLWFuZHJvaWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTdiXFxcIn0uZmEtbGludXg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTdjXFxcIn0uZmEtZHJpYmJibGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTdkXFxcIn0uZmEtc2t5cGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTdlXFxcIn0uZmEtZm91cnNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxODBcXFwifS5mYS10cmVsbG86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTgxXFxcIn0uZmEtZmVtYWxlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4MlxcXCJ9LmZhLW1hbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTgzXFxcIn0uZmEtZ2l0dGlwOmJlZm9yZSwuZmEtZ3JhdGlwYXk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTg0XFxcIn0uZmEtc3VuLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTg1XFxcIn0uZmEtbW9vbi1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4NlxcXCJ9LmZhLWFyY2hpdmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTg3XFxcIn0uZmEtYnVnOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4OFxcXCJ9LmZhLXZrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4OVxcXCJ9LmZhLXdlaWJvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE4YVxcXCJ9LmZhLXJlbnJlbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOGJcXFwifS5mYS1wYWdlbGluZXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMThjXFxcIn0uZmEtc3RhY2stZXhjaGFuZ2U6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMThkXFxcIn0uZmEtYXJyb3ctY2lyY2xlLW8tcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMThlXFxcIn0uZmEtYXJyb3ctY2lyY2xlLW8tbGVmdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOTBcXFwifS5mYS10b2dnbGUtbGVmdDpiZWZvcmUsLmZhLWNhcmV0LXNxdWFyZS1vLWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTkxXFxcIn0uZmEtZG90LWNpcmNsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE5MlxcXCJ9LmZhLXdoZWVsY2hhaXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTkzXFxcIn0uZmEtdmltZW8tc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE5NFxcXCJ9LmZhLXR1cmtpc2gtbGlyYTpiZWZvcmUsLmZhLXRyeTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOTVcXFwifS5mYS1wbHVzLXNxdWFyZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE5NlxcXCJ9LmZhLXNwYWNlLXNodXR0bGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTk3XFxcIn0uZmEtc2xhY2s6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTk4XFxcIn0uZmEtZW52ZWxvcGUtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjE5OVxcXCJ9LmZhLXdvcmRwcmVzczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOWFcXFwifS5mYS1vcGVuaWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMTliXFxcIn0uZmEtaW5zdGl0dXRpb246YmVmb3JlLC5mYS1iYW5rOmJlZm9yZSwuZmEtdW5pdmVyc2l0eTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOWNcXFwifS5mYS1tb3J0YXItYm9hcmQ6YmVmb3JlLC5mYS1ncmFkdWF0aW9uLWNhcDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOWRcXFwifS5mYS15YWhvbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxOWVcXFwifS5mYS1nb29nbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWEwXFxcIn0uZmEtcmVkZGl0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhMVxcXCJ9LmZhLXJlZGRpdC1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWEyXFxcIn0uZmEtc3R1bWJsZXVwb24tY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhM1xcXCJ9LmZhLXN0dW1ibGV1cG9uOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhNFxcXCJ9LmZhLWRlbGljaW91czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYTVcXFwifS5mYS1kaWdnOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhNlxcXCJ9LmZhLXBpZWQtcGlwZXItcHA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWE3XFxcIn0uZmEtcGllZC1waXBlci1hbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWE4XFxcIn0uZmEtZHJ1cGFsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFhOVxcXCJ9LmZhLWpvb21sYTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYWFcXFwifS5mYS1sYW5ndWFnZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYWJcXFwifS5mYS1mYXg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWFjXFxcIn0uZmEtYnVpbGRpbmc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWFkXFxcIn0uZmEtY2hpbGQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWFlXFxcIn0uZmEtcGF3OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFiMFxcXCJ9LmZhLXNwb29uOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFiMVxcXCJ9LmZhLWN1YmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWIyXFxcIn0uZmEtY3ViZXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWIzXFxcIn0uZmEtYmVoYW5jZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYjRcXFwifS5mYS1iZWhhbmNlLXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYjVcXFwifS5mYS1zdGVhbTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYjZcXFwifS5mYS1zdGVhbS1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWI3XFxcIn0uZmEtcmVjeWNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYjhcXFwifS5mYS1hdXRvbW9iaWxlOmJlZm9yZSwuZmEtY2FyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFiOVxcXCJ9LmZhLWNhYjpiZWZvcmUsLmZhLXRheGk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWJhXFxcIn0uZmEtdHJlZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYmJcXFwifS5mYS1zcG90aWZ5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFiY1xcXCJ9LmZhLWRldmlhbnRhcnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWJkXFxcIn0uZmEtc291bmRjbG91ZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYmVcXFwifS5mYS1kYXRhYmFzZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYzBcXFwifS5mYS1maWxlLXBkZi1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFjMVxcXCJ9LmZhLWZpbGUtd29yZC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFjMlxcXCJ9LmZhLWZpbGUtZXhjZWwtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYzNcXFwifS5mYS1maWxlLXBvd2VycG9pbnQtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYzRcXFwifS5mYS1maWxlLXBob3RvLW86YmVmb3JlLC5mYS1maWxlLXBpY3R1cmUtbzpiZWZvcmUsLmZhLWZpbGUtaW1hZ2UtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYzVcXFwifS5mYS1maWxlLXppcC1vOmJlZm9yZSwuZmEtZmlsZS1hcmNoaXZlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWM2XFxcIn0uZmEtZmlsZS1zb3VuZC1vOmJlZm9yZSwuZmEtZmlsZS1hdWRpby1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFjN1xcXCJ9LmZhLWZpbGUtbW92aWUtbzpiZWZvcmUsLmZhLWZpbGUtdmlkZW8tbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYzhcXFwifS5mYS1maWxlLWNvZGUtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxYzlcXFwifS5mYS12aW5lOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFjYVxcXCJ9LmZhLWNvZGVwZW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWNiXFxcIn0uZmEtanNmaWRkbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWNjXFxcIn0uZmEtbGlmZS1ib3V5OmJlZm9yZSwuZmEtbGlmZS1idW95OmJlZm9yZSwuZmEtbGlmZS1zYXZlcjpiZWZvcmUsLmZhLXN1cHBvcnQ6YmVmb3JlLC5mYS1saWZlLXJpbmc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWNkXFxcIn0uZmEtY2lyY2xlLW8tbm90Y2g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWNlXFxcIn0uZmEtcmE6YmVmb3JlLC5mYS1yZXNpc3RhbmNlOmJlZm9yZSwuZmEtcmViZWw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWQwXFxcIn0uZmEtZ2U6YmVmb3JlLC5mYS1lbXBpcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWQxXFxcIn0uZmEtZ2l0LXNxdWFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZDJcXFwifS5mYS1naXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWQzXFxcIn0uZmEteS1jb21iaW5hdG9yLXNxdWFyZTpiZWZvcmUsLmZhLXljLXNxdWFyZTpiZWZvcmUsLmZhLWhhY2tlci1uZXdzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkNFxcXCJ9LmZhLXRlbmNlbnQtd2VpYm86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWQ1XFxcIn0uZmEtcXE6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWQ2XFxcIn0uZmEtd2VjaGF0OmJlZm9yZSwuZmEtd2VpeGluOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkN1xcXCJ9LmZhLXNlbmQ6YmVmb3JlLC5mYS1wYXBlci1wbGFuZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZDhcXFwifS5mYS1zZW5kLW86YmVmb3JlLC5mYS1wYXBlci1wbGFuZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkOVxcXCJ9LmZhLWhpc3Rvcnk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWRhXFxcIn0uZmEtY2lyY2xlLXRoaW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWRiXFxcIn0uZmEtaGVhZGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkY1xcXCJ9LmZhLXBhcmFncmFwaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZGRcXFwifS5mYS1zbGlkZXJzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFkZVxcXCJ9LmZhLXNoYXJlLWFsdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZTBcXFwifS5mYS1zaGFyZS1hbHQtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlMVxcXCJ9LmZhLWJvbWI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWUyXFxcIn0uZmEtc29jY2VyLWJhbGwtbzpiZWZvcmUsLmZhLWZ1dGJvbC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlM1xcXCJ9LmZhLXR0eTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZTRcXFwifS5mYS1iaW5vY3VsYXJzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlNVxcXCJ9LmZhLXBsdWc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWU2XFxcIn0uZmEtc2xpZGVzaGFyZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZTdcXFwifS5mYS10d2l0Y2g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWU4XFxcIn0uZmEteWVscDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZTlcXFwifS5mYS1uZXdzcGFwZXItbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZWFcXFwifS5mYS13aWZpOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlYlxcXCJ9LmZhLWNhbGN1bGF0b3I6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWVjXFxcIn0uZmEtcGF5cGFsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFlZFxcXCJ9LmZhLWdvb2dsZS13YWxsZXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWVlXFxcIn0uZmEtY2MtdmlzYTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZjBcXFwifS5mYS1jYy1tYXN0ZXJjYXJkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFmMVxcXCJ9LmZhLWNjLWRpc2NvdmVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFmMlxcXCJ9LmZhLWNjLWFtZXg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWYzXFxcIn0uZmEtY2MtcGF5cGFsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFmNFxcXCJ9LmZhLWNjLXN0cmlwZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZjVcXFwifS5mYS1iZWxsLXNsYXNoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFmNlxcXCJ9LmZhLWJlbGwtc2xhc2gtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZjdcXFwifS5mYS10cmFzaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZjhcXFwifS5mYS1jb3B5cmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWY5XFxcIn0uZmEtYXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWZhXFxcIn0uZmEtZXllZHJvcHBlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZmJcXFwifS5mYS1wYWludC1icnVzaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYxZmNcXFwifS5mYS1iaXJ0aGRheS1jYWtlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjFmZFxcXCJ9LmZhLWFyZWEtY2hhcnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMWZlXFxcIn0uZmEtcGllLWNoYXJ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwMFxcXCJ9LmZhLWxpbmUtY2hhcnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjAxXFxcIn0uZmEtbGFzdGZtOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwMlxcXCJ9LmZhLWxhc3RmbS1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjAzXFxcIn0uZmEtdG9nZ2xlLW9mZjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMDRcXFwifS5mYS10b2dnbGUtb246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjA1XFxcIn0uZmEtYmljeWNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMDZcXFwifS5mYS1idXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjA3XFxcIn0uZmEtaW94aG9zdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMDhcXFwifS5mYS1hbmdlbGxpc3Q6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjA5XFxcIn0uZmEtY2M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjBhXFxcIn0uZmEtc2hla2VsOmJlZm9yZSwuZmEtc2hlcWVsOmJlZm9yZSwuZmEtaWxzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwYlxcXCJ9LmZhLW1lYW5wYXRoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIwY1xcXCJ9LmZhLWJ1eXNlbGxhZHM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjBkXFxcIn0uZmEtY29ubmVjdGRldmVsb3A6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjBlXFxcIn0uZmEtZGFzaGN1YmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjEwXFxcIn0uZmEtZm9ydW1iZWU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjExXFxcIn0uZmEtbGVhbnB1YjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMTJcXFwifS5mYS1zZWxsc3k6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjEzXFxcIn0uZmEtc2hpcnRzaW5idWxrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxNFxcXCJ9LmZhLXNpbXBseWJ1aWx0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxNVxcXCJ9LmZhLXNreWF0bGFzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxNlxcXCJ9LmZhLWNhcnQtcGx1czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMTdcXFwifS5mYS1jYXJ0LWFycm93LWRvd246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjE4XFxcIn0uZmEtZGlhbW9uZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMTlcXFwifS5mYS1zaGlwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxYVxcXCJ9LmZhLXVzZXItc2VjcmV0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxYlxcXCJ9LmZhLW1vdG9yY3ljbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjFjXFxcIn0uZmEtc3RyZWV0LXZpZXc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjFkXFxcIn0uZmEtaGVhcnRiZWF0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIxZVxcXCJ9LmZhLXZlbnVzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIyMVxcXCJ9LmZhLW1hcnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjIyXFxcIn0uZmEtbWVyY3VyeTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMjNcXFwifS5mYS1pbnRlcnNleDpiZWZvcmUsLmZhLXRyYW5zZ2VuZGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIyNFxcXCJ9LmZhLXRyYW5zZ2VuZGVyLWFsdDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMjVcXFwifS5mYS12ZW51cy1kb3VibGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjI2XFxcIn0uZmEtbWFycy1kb3VibGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjI3XFxcIn0uZmEtdmVudXMtbWFyczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMjhcXFwifS5mYS1tYXJzLXN0cm9rZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMjlcXFwifS5mYS1tYXJzLXN0cm9rZS12OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIyYVxcXCJ9LmZhLW1hcnMtc3Ryb2tlLWg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjJiXFxcIn0uZmEtbmV1dGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIyY1xcXCJ9LmZhLWdlbmRlcmxlc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjJkXFxcIn0uZmEtZmFjZWJvb2stb2ZmaWNpYWw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjMwXFxcIn0uZmEtcGludGVyZXN0LXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjMxXFxcIn0uZmEtd2hhdHNhcHA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjMyXFxcIn0uZmEtc2VydmVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzM1xcXCJ9LmZhLXVzZXItcGx1czpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyMzRcXFwifS5mYS11c2VyLXRpbWVzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzNVxcXCJ9LmZhLWhvdGVsOmJlZm9yZSwuZmEtYmVkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzNlxcXCJ9LmZhLXZpYWNvaW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjM3XFxcIn0uZmEtdHJhaW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjM4XFxcIn0uZmEtc3Vid2F5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzOVxcXCJ9LmZhLW1lZGl1bTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyM2FcXFwifS5mYS15YzpiZWZvcmUsLmZhLXktY29tYmluYXRvcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyM2JcXFwifS5mYS1vcHRpbi1tb25zdGVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzY1xcXCJ9LmZhLW9wZW5jYXJ0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjIzZFxcXCJ9LmZhLWV4cGVkaXRlZHNzbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyM2VcXFwifS5mYS1iYXR0ZXJ5LTQ6YmVmb3JlLC5mYS1iYXR0ZXJ5OmJlZm9yZSwuZmEtYmF0dGVyeS1mdWxsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0MFxcXCJ9LmZhLWJhdHRlcnktMzpiZWZvcmUsLmZhLWJhdHRlcnktdGhyZWUtcXVhcnRlcnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjQxXFxcIn0uZmEtYmF0dGVyeS0yOmJlZm9yZSwuZmEtYmF0dGVyeS1oYWxmOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0MlxcXCJ9LmZhLWJhdHRlcnktMTpiZWZvcmUsLmZhLWJhdHRlcnktcXVhcnRlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNDNcXFwifS5mYS1iYXR0ZXJ5LTA6YmVmb3JlLC5mYS1iYXR0ZXJ5LWVtcHR5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0NFxcXCJ9LmZhLW1vdXNlLXBvaW50ZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjQ1XFxcIn0uZmEtaS1jdXJzb3I6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjQ2XFxcIn0uZmEtb2JqZWN0LWdyb3VwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0N1xcXCJ9LmZhLW9iamVjdC11bmdyb3VwOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0OFxcXCJ9LmZhLXN0aWNreS1ub3RlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0OVxcXCJ9LmZhLXN0aWNreS1ub3RlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjRhXFxcIn0uZmEtY2MtamNiOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0YlxcXCJ9LmZhLWNjLWRpbmVycy1jbHViOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0Y1xcXCJ9LmZhLWNsb25lOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI0ZFxcXCJ9LmZhLWJhbGFuY2Utc2NhbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjRlXFxcIn0uZmEtaG91cmdsYXNzLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjUwXFxcIn0uZmEtaG91cmdsYXNzLTE6YmVmb3JlLC5mYS1ob3VyZ2xhc3Mtc3RhcnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjUxXFxcIn0uZmEtaG91cmdsYXNzLTI6YmVmb3JlLC5mYS1ob3VyZ2xhc3MtaGFsZjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNTJcXFwifS5mYS1ob3VyZ2xhc3MtMzpiZWZvcmUsLmZhLWhvdXJnbGFzcy1lbmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjUzXFxcIn0uZmEtaG91cmdsYXNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1NFxcXCJ9LmZhLWhhbmQtZ3JhYi1vOmJlZm9yZSwuZmEtaGFuZC1yb2NrLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjU1XFxcIn0uZmEtaGFuZC1zdG9wLW86YmVmb3JlLC5mYS1oYW5kLXBhcGVyLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjU2XFxcIn0uZmEtaGFuZC1zY2lzc29ycy1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1N1xcXCJ9LmZhLWhhbmQtbGl6YXJkLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjU4XFxcIn0uZmEtaGFuZC1zcG9jay1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1OVxcXCJ9LmZhLWhhbmQtcG9pbnRlci1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1YVxcXCJ9LmZhLWhhbmQtcGVhY2UtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNWJcXFwifS5mYS10cmFkZW1hcms6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjVjXFxcIn0uZmEtcmVnaXN0ZXJlZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNWRcXFwifS5mYS1jcmVhdGl2ZS1jb21tb25zOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI1ZVxcXCJ9LmZhLWdnOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2MFxcXCJ9LmZhLWdnLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNjFcXFwifS5mYS10cmlwYWR2aXNvcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNjJcXFwifS5mYS1vZG5va2xhc3NuaWtpOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2M1xcXCJ9LmZhLW9kbm9rbGFzc25pa2ktc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2NFxcXCJ9LmZhLWdldC1wb2NrZXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjY1XFxcIn0uZmEtd2lraXBlZGlhLXc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjY2XFxcIn0uZmEtc2FmYXJpOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2N1xcXCJ9LmZhLWNocm9tZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNjhcXFwifS5mYS1maXJlZm94OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2OVxcXCJ9LmZhLW9wZXJhOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2YVxcXCJ9LmZhLWludGVybmV0LWV4cGxvcmVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI2YlxcXCJ9LmZhLXR2OmJlZm9yZSwuZmEtdGVsZXZpc2lvbjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNmNcXFwifS5mYS1jb250YW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjZkXFxcIn0uZmEtNTAwcHg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjZlXFxcIn0uZmEtYW1hem9uOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI3MFxcXCJ9LmZhLWNhbGVuZGFyLXBsdXMtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNzFcXFwifS5mYS1jYWxlbmRhci1taW51cy1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI3MlxcXCJ9LmZhLWNhbGVuZGFyLXRpbWVzLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjczXFxcIn0uZmEtY2FsZW5kYXItY2hlY2stbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNzRcXFwifS5mYS1pbmR1c3RyeTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNzVcXFwifS5mYS1tYXAtcGluOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI3NlxcXCJ9LmZhLW1hcC1zaWduczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNzdcXFwifS5mYS1tYXAtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyNzhcXFwifS5mYS1tYXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjc5XFxcIn0uZmEtY29tbWVudGluZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyN2FcXFwifS5mYS1jb21tZW50aW5nLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjdiXFxcIn0uZmEtaG91eno6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjdjXFxcIn0uZmEtdmltZW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjdkXFxcIn0uZmEtYmxhY2stdGllOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI3ZVxcXCJ9LmZhLWZvbnRpY29uczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyODBcXFwifS5mYS1yZWRkaXQtYWxpZW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjgxXFxcIn0uZmEtZWRnZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyODJcXFwifS5mYS1jcmVkaXQtY2FyZC1hbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjgzXFxcIn0uZmEtY29kaWVwaWU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjg0XFxcIn0uZmEtbW9keDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyODVcXFwifS5mYS1mb3J0LWF3ZXNvbWU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjg2XFxcIn0uZmEtdXNiOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4N1xcXCJ9LmZhLXByb2R1Y3QtaHVudDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyODhcXFwifS5mYS1taXhjbG91ZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyODlcXFwifS5mYS1zY3JpYmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjhhXFxcIn0uZmEtcGF1c2UtY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4YlxcXCJ9LmZhLXBhdXNlLWNpcmNsZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4Y1xcXCJ9LmZhLXN0b3AtY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI4ZFxcXCJ9LmZhLXN0b3AtY2lyY2xlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjhlXFxcIn0uZmEtc2hvcHBpbmctYmFnOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5MFxcXCJ9LmZhLXNob3BwaW5nLWJhc2tldDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOTFcXFwifS5mYS1oYXNodGFnOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5MlxcXCJ9LmZhLWJsdWV0b290aDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOTNcXFwifS5mYS1ibHVldG9vdGgtYjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOTRcXFwifS5mYS1wZXJjZW50OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5NVxcXCJ9LmZhLWdpdGxhYjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyOTZcXFwifS5mYS13cGJlZ2lubmVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5N1xcXCJ9LmZhLXdwZm9ybXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjk4XFxcIn0uZmEtZW52aXJhOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjI5OVxcXCJ9LmZhLXVuaXZlcnNhbC1hY2Nlc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjlhXFxcIn0uZmEtd2hlZWxjaGFpci1hbHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjliXFxcIn0uZmEtcXVlc3Rpb24tY2lyY2xlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjljXFxcIn0uZmEtYmxpbmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjlkXFxcIn0uZmEtYXVkaW8tZGVzY3JpcHRpb246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMjllXFxcIn0uZmEtdm9sdW1lLWNvbnRyb2wtcGhvbmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmEwXFxcIn0uZmEtYnJhaWxsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYTFcXFwifS5mYS1hc3Npc3RpdmUtbGlzdGVuaW5nLXN5c3RlbXM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmEyXFxcIn0uZmEtYXNsLWludGVycHJldGluZzpiZWZvcmUsLmZhLWFtZXJpY2FuLXNpZ24tbGFuZ3VhZ2UtaW50ZXJwcmV0aW5nOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhM1xcXCJ9LmZhLWRlYWZuZXNzOmJlZm9yZSwuZmEtaGFyZC1vZi1oZWFyaW5nOmJlZm9yZSwuZmEtZGVhZjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYTRcXFwifS5mYS1nbGlkZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYTVcXFwifS5mYS1nbGlkZS1nOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhNlxcXCJ9LmZhLXNpZ25pbmc6YmVmb3JlLC5mYS1zaWduLWxhbmd1YWdlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhN1xcXCJ9LmZhLWxvdy12aXNpb246YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmE4XFxcIn0uZmEtdmlhZGVvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhOVxcXCJ9LmZhLXZpYWRlby1zcXVhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmFhXFxcIn0uZmEtc25hcGNoYXQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmFiXFxcIn0uZmEtc25hcGNoYXQtZ2hvc3Q6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmFjXFxcIn0uZmEtc25hcGNoYXQtc3F1YXJlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJhZFxcXCJ9LmZhLXBpZWQtcGlwZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmFlXFxcIn0uZmEtZmlyc3Qtb3JkZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmIwXFxcIn0uZmEteW9hc3Q6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmIxXFxcIn0uZmEtdGhlbWVpc2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiMlxcXCJ9LmZhLWdvb2dsZS1wbHVzLWNpcmNsZTpiZWZvcmUsLmZhLWdvb2dsZS1wbHVzLW9mZmljaWFsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiM1xcXCJ9LmZhLWZhOmJlZm9yZSwuZmEtZm9udC1hd2Vzb21lOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiNFxcXCJ9LmZhLWhhbmRzaGFrZS1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiNVxcXCJ9LmZhLWVudmVsb3BlLW9wZW46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmI2XFxcIn0uZmEtZW52ZWxvcGUtb3Blbi1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiN1xcXCJ9LmZhLWxpbm9kZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYjhcXFwifS5mYS1hZGRyZXNzLWJvb2s6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmI5XFxcIn0uZmEtYWRkcmVzcy1ib29rLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmJhXFxcIn0uZmEtdmNhcmQ6YmVmb3JlLC5mYS1hZGRyZXNzLWNhcmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmJiXFxcIn0uZmEtdmNhcmQtbzpiZWZvcmUsLmZhLWFkZHJlc3MtY2FyZC1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiY1xcXCJ9LmZhLXVzZXItY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJiZFxcXCJ9LmZhLXVzZXItY2lyY2xlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmJlXFxcIn0uZmEtdXNlci1vOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjMFxcXCJ9LmZhLWlkLWJhZGdlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjMVxcXCJ9LmZhLWRyaXZlcnMtbGljZW5zZTpiZWZvcmUsLmZhLWlkLWNhcmQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmMyXFxcIn0uZmEtZHJpdmVycy1saWNlbnNlLW86YmVmb3JlLC5mYS1pZC1jYXJkLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmMzXFxcIn0uZmEtcXVvcmE6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmM0XFxcIn0uZmEtZnJlZS1jb2RlLWNhbXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmM1XFxcIn0uZmEtdGVsZWdyYW06YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmM2XFxcIn0uZmEtdGhlcm1vbWV0ZXItNDpiZWZvcmUsLmZhLXRoZXJtb21ldGVyOmJlZm9yZSwuZmEtdGhlcm1vbWV0ZXItZnVsbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyYzdcXFwifS5mYS10aGVybW9tZXRlci0zOmJlZm9yZSwuZmEtdGhlcm1vbWV0ZXItdGhyZWUtcXVhcnRlcnM6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmM4XFxcIn0uZmEtdGhlcm1vbWV0ZXItMjpiZWZvcmUsLmZhLXRoZXJtb21ldGVyLWhhbGY6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmM5XFxcIn0uZmEtdGhlcm1vbWV0ZXItMTpiZWZvcmUsLmZhLXRoZXJtb21ldGVyLXF1YXJ0ZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmNhXFxcIn0uZmEtdGhlcm1vbWV0ZXItMDpiZWZvcmUsLmZhLXRoZXJtb21ldGVyLWVtcHR5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjYlxcXCJ9LmZhLXNob3dlcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyY2NcXFwifS5mYS1iYXRodHViOmJlZm9yZSwuZmEtczE1OmJlZm9yZSwuZmEtYmF0aDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyY2RcXFwifS5mYS1wb2RjYXN0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJjZVxcXCJ9LmZhLXdpbmRvdy1tYXhpbWl6ZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZDBcXFwifS5mYS13aW5kb3ctbWluaW1pemU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmQxXFxcIn0uZmEtd2luZG93LXJlc3RvcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmQyXFxcIn0uZmEtdGltZXMtcmVjdGFuZ2xlOmJlZm9yZSwuZmEtd2luZG93LWNsb3NlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJkM1xcXCJ9LmZhLXRpbWVzLXJlY3RhbmdsZS1vOmJlZm9yZSwuZmEtd2luZG93LWNsb3NlLW86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmQ0XFxcIn0uZmEtYmFuZGNhbXA6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmQ1XFxcIn0uZmEtZ3JhdjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZDZcXFwifS5mYS1ldHN5OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJkN1xcXCJ9LmZhLWltZGI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxmMmQ4XFxcIn0uZmEtcmF2ZWxyeTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZDlcXFwifS5mYS1lZXJjYXN0OmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJkYVxcXCJ9LmZhLW1pY3JvY2hpcDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZGJcXFwifS5mYS1zbm93Zmxha2UtbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZGNcXFwifS5mYS1zdXBlcnBvd2VyczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZGRcXFwifS5mYS13cGV4cGxvcmVyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcZjJkZVxcXCJ9LmZhLW1lZXR1cDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXGYyZTBcXFwifS5zci1vbmx5e3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweDtoZWlnaHQ6MXB4O3BhZGRpbmc6MDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDAsIDAsIDAsIDApO2JvcmRlcjowfS5zci1vbmx5LWZvY3VzYWJsZTphY3RpdmUsLnNyLW9ubHktZm9jdXNhYmxlOmZvY3Vze3Bvc2l0aW9uOnN0YXRpYzt3aWR0aDphdXRvO2hlaWdodDphdXRvO21hcmdpbjowO292ZXJmbG93OnZpc2libGU7Y2xpcDphdXRvfVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gSW1wb3J0c1xudmFyIHVybEVzY2FwZSA9IHJlcXVpcmUoXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS91cmwtZXNjYXBlLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMF9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9mb250cy9wcmltZWljb25zLmVvdFwiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18xX19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL3ByaW1laWNvbnMuZW90XCIpICsgXCI/I2llZml4XCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMl9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9mb250cy9wcmltZWljb25zLnR0ZlwiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18zX19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL3ByaW1laWNvbnMud29mZlwiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX180X19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuL2ZvbnRzL3ByaW1laWNvbnMuc3ZnXCIpICsgXCI/I3ByaW1laWNvbnNcIik7XG5cbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnUHJpbWVJY29ucyc7XFxuICAgIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18wX19fICsgXCIpO1xcbiAgICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMV9fXyArIFwiKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMl9fXyArIFwiKSBmb3JtYXQoJ3RydWV0eXBlJyksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fM19fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKSwgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX180X19fICsgXCIpIGZvcm1hdCgnc3ZnJyk7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuLnBpIHtcXG4gICAgZm9udC1mYW1pbHk6ICdwcmltZWljb25zJztcXG4gICAgc3BlYWs6IG5vbmU7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZm9udC12YXJpYW50OiBub3JtYWw7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgICBsaW5lLWhlaWdodDogMTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gICAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG59XFxuXFxuLnBpLWZ3IHtcXG4gICAgd2lkdGg6IDEuMjg1NzE0MjllbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ucGktc3BpbiB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYS1zcGluIDJzIGluZmluaXRlIGxpbmVhcjtcXG4gICAgYW5pbWF0aW9uOiBmYS1zcGluIDJzIGluZmluaXRlIGxpbmVhcjtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGZhLXNwaW4ge1xcbiAgICAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgZmEtc3BpbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7XFxuICAgIH1cXG59XFxuXFxuLnBpLW1vYmlsZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5ODJcXFwiO1xcbn1cXG5cXG4ucGktdGFibGV0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk4M1xcXCI7XFxufVxcblxcbi5waS1rZXk6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTgxXFxcIjtcXG59XFxuXFxuLnBpLXNob3BwaW5nLWNhcnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTgwXFxcIjtcXG59XFxuXFxuLnBpLWNvbW1lbnRzOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3ZVxcXCI7XFxufVxcblxcbi5waS1jb21tZW50OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3ZlxcXCI7XFxufVxcblxcbi5waS1icmllZmNhc2U6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTdkXFxcIjtcXG59XFxuXFxuLnBpLWJlbGw6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTdjXFxcIjtcXG59XFxuXFxuLnBpLXBhcGVyY2xpcDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5N2JcXFwiO1xcbn1cXG5cXG4ucGktc2hhcmUtYWx0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3YVxcXCI7XFxufVxcblxcbi5waS1lbnZlbG9wZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NzlcXFwiO1xcbn1cXG5cXG4ucGktdm9sdW1lLWRvd246YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTc2XFxcIjtcXG59XFxuXFxuLnBpLXZvbHVtZS11cDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NzdcXFwiO1xcbn1cXG5cXG4ucGktdm9sdW1lLW9mZjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NzhcXFwiO1xcbn1cXG5cXG4ucGktZWplY3Q6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTc1XFxcIjtcXG59XFxuXFxuLnBpLW1vbmV5LWJpbGw6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTc0XFxcIjtcXG59XFxuXFxuLnBpLWltYWdlczpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NzNcXFwiO1xcbn1cXG5cXG4ucGktaW1hZ2U6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTcyXFxcIjtcXG59XFxuXFxuLnBpLXNpZ24taW46YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTcwXFxcIjtcXG59XFxuXFxuLnBpLXNpZ24tb3V0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk3MVxcXCI7XFxufVxcblxcbi5waS13aWZpOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2ZlxcXCI7XFxufVxcblxcbi5waS1zaXRlbWFwOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2ZVxcXCI7XFxufVxcblxcbi5waS1jaGFydC1iYXI6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTZkXFxcIjtcXG59XFxuXFxuLnBpLWNhbWVyYTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NmNcXFwiO1xcbn1cXG5cXG4ucGktZG9sbGFyOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2YlxcXCI7XFxufVxcblxcbi5waS1sb2NrLW9wZW46YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTZhXFxcIjtcXG59XFxuXFxuLnBpLXRhYmxlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2OVxcXCI7XFxufVxcblxcbi5waS1tYXAtbWFya2VyOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2OFxcXCI7XFxufVxcblxcbi5waS1saXN0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2N1xcXCI7XFxufVxcblxcbi5waS1leWUtc2xhc2g6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTY1XFxcIjtcXG59XFxuXFxuLnBpLWV5ZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NjZcXFwiO1xcbn1cXG5cXG4ucGktZm9sZGVyLW9wZW46YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTY0XFxcIjtcXG59XFxuXFxuLnBpLWZvbGRlcjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NjNcXFwiO1xcbn1cXG5cXG4ucGktdmlkZW86YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTYyXFxcIjtcXG59XFxuXFxuLnBpLWluYm94OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk2MVxcXCI7XFxufVxcblxcbi5waS1sb2NrOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1ZlxcXCI7XFxufVxcblxcbi5waS11bmxvY2s6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTYwXFxcIjtcXG59XFxuXFxuLnBpLXRhZ3M6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTVkXFxcIjtcXG59XFxuXFxuLnBpLXRhZzpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NWVcXFwiO1xcbn1cXG5cXG4ucGktcG93ZXItb2ZmOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1Y1xcXCI7XFxufVxcblxcbi5waS1zYXZlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1YlxcXCI7XFxufVxcblxcbi5waS1xdWVzdGlvbi1jaXJjbGU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTU5XFxcIjtcXG59XFxuXFxuLnBpLXF1ZXN0aW9uOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1YVxcXCI7XFxufVxcblxcbi5waS1jb3B5OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1N1xcXCI7XFxufVxcblxcbi5waS1maWxlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1OFxcXCI7XFxufVxcblxcbi5waS1jbG9uZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NTVcXFwiO1xcbn1cXG5cXG4ucGktY2FsZW5kYXItdGltZXM6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTUyXFxcIjtcXG59XFxuXFxuLnBpLWNhbGVuZGFyLW1pbnVzOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1M1xcXCI7XFxufVxcblxcbi5waS1jYWxlbmRhci1wbHVzOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1NFxcXCI7XFxufVxcblxcbi5waS1lbGxpcHNpcy12OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1MFxcXCI7XFxufVxcblxcbi5waS1lbGxpcHNpcy1oOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk1MVxcXCI7XFxufVxcblxcbi5waS1ib29rbWFyazpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NGVcXFwiO1xcbn1cXG5cXG4ucGktZ2xvYmU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTRmXFxcIjtcXG59XFxuXFxuLnBpLXJlcGxheTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NGRcXFwiO1xcbn1cXG5cXG4ucGktZmlsdGVyOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk0Y1xcXCI7XFxufVxcblxcbi5waS1wcmludDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NGJcXFwiO1xcbn1cXG5cXG4ucGktYWxpZ24tcmlnaHQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTQ2XFxcIjtcXG59XFxuXFxuLnBpLWFsaWduLWxlZnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTQ3XFxcIjtcXG59XFxuXFxuLnBpLWFsaWduLWNlbnRlcjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NDhcXFwiO1xcbn1cXG5cXG4ucGktYWxpZ24tanVzdGlmeTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NDlcXFwiO1xcbn1cXG5cXG4ucGktY29nOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk0YVxcXCI7XFxufVxcblxcbi5waS1jbG91ZC1kb3dubG9hZDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NDNcXFwiO1xcbn1cXG5cXG4ucGktY2xvdWQtdXBsb2FkOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk0NFxcXCI7XFxufVxcblxcbi5waS1jbG91ZDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NDVcXFwiO1xcbn1cXG5cXG4ucGktcGVuY2lsOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTk0MlxcXCI7XFxufVxcblxcbi5waS11c2VyczpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5NDFcXFwiO1xcbn1cXG5cXG4ucGktY2xvY2s6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTQwXFxcIjtcXG59XFxuXFxuLnBpLXVzZXItbWludXM6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTNlXFxcIjtcXG59XFxuXFxuLnBpLXVzZXItcGx1czpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5M2ZcXFwiO1xcbn1cXG5cXG4ucGktdHJhc2g6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTNkXFxcIjtcXG59XFxuXFxuLnBpLWV4dGVybmFsLWxpbms6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTNjXFxcIjtcXG59XFxuXFxuLnBpLXdpbmRvdy1tYXhpbWl6ZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5M2JcXFwiO1xcbn1cXG5cXG4ucGktd2luZG93LW1pbmltaXplOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzYVxcXCI7XFxufVxcblxcbi5waS1yZWZyZXNoOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzOFxcXCI7XFxufVxcbiAgXFxuLnBpLXVzZXI6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTM5XFxcIjtcXG59XFxuXFxuLnBpLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkyMlxcXCI7XFxufVxcblxcbi5waS1jYWxlbmRhcjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjdcXFwiO1xcbn1cXG5cXG4ucGktY2hldnJvbi1jaXJjbGUtbGVmdDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjhcXFwiO1xcbn1cXG5cXG4ucGktY2hldnJvbi1jaXJjbGUtZG93bjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjlcXFwiO1xcbn1cXG5cXG4ucGktY2hldnJvbi1jaXJjbGUtcmlnaHQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTJhXFxcIjtcXG59XFxuXFxuLnBpLWNoZXZyb24tY2lyY2xlLXVwOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkyYlxcXCI7XFxufVxcblxcbi5waS1hbmdsZS1kb3VibGUtZG93bjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MmNcXFwiO1xcbn1cXG5cXG4ucGktYW5nbGUtZG91YmxlLWxlZnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTJkXFxcIjtcXG59XFxuXFxuLnBpLWFuZ2xlLWRvdWJsZS1yaWdodDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MmVcXFwiO1xcbn1cXG5cXG4ucGktYW5nbGUtZG91YmxlLXVwOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkyZlxcXCI7XFxufVxcblxcbi5waS1hbmdsZS1kb3duOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzMFxcXCI7XFxufVxcblxcbi5waS1hbmdsZS1sZWZ0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzMVxcXCI7XFxufVxcblxcbi5waS1hbmdsZS1yaWdodDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MzJcXFwiO1xcbn1cXG5cXG4ucGktYW5nbGUtdXA6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTMzXFxcIjtcXG59XFxuXFxuLnBpLXVwbG9hZDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MzRcXFwiO1xcbn1cXG5cXG4ucGktZG93bmxvYWQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTU2XFxcIjtcXG59XFxuXFxuLnBpLWJhbjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MzVcXFwiO1xcbn1cXG5cXG4ucGktc3Rhci1vOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzNlxcXCI7XFxufVxcblxcbi5waS1zdGFyOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkzN1xcXCI7XFxufVxcblxcbi5waS1jaGV2cm9uLWxlZnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTAwXFxcIjtcXG59XFxuXFxuLnBpLWNoZXZyb24tcmlnaHQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTAxXFxcIjtcXG59XFxuXFxuLnBpLWNoZXZyb24tZG93bjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MDJcXFwiO1xcbn1cXG5cXG4ucGktY2hldnJvbi11cDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MDNcXFwiO1xcbn1cXG5cXG4ucGktY2FyZXQtbGVmdDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MDRcXFwiO1xcbn1cXG5cXG4ucGktY2FyZXQtcmlnaHQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTA1XFxcIjtcXG59XFxuXFxuLnBpLWNhcmV0LWRvd246YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTA2XFxcIjtcXG59XFxuXFxuLnBpLWNhcmV0LXVwOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwN1xcXCI7XFxufVxcblxcbi5waS1zZWFyY2g6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTA4XFxcIjtcXG59XFxuXFxuLnBpLWNoZWNrOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwOVxcXCI7XFxufVxcblxcbi5waS1jaGVjay1jaXJjbGU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTBhXFxcIjtcXG59XFxuXFxuLnBpLXRpbWVzOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwYlxcXCI7XFxufVxcblxcbi5waS10aW1lcy1jaXJjbGU6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTBjXFxcIjtcXG59XFxuXFxuLnBpLXBsdXM6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTBkXFxcIjtcXG59XFxuXFxuLnBpLXBsdXMtY2lyY2xlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkwZVxcXCI7XFxufVxcblxcbi5waS1taW51czpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MGZcXFwiO1xcbn1cXG5cXG4ucGktbWludXMtY2lyY2xlOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkxMFxcXCI7XFxufVxcblxcbi5waS1jaXJjbGUtb246YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTExXFxcIjtcXG59XFxuXFxuLnBpLWNpcmNsZS1vZmY6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTEyXFxcIjtcXG59XFxuXFxuLnBpLXNvcnQtZG93bjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MTNcXFwiO1xcbn1cXG5cXG4ucGktc29ydC11cDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MTRcXFwiO1xcbn1cXG5cXG4ucGktc29ydDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MTVcXFwiO1xcbn1cXG5cXG4ucGktc3RlcC1iYWNrd2FyZDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MTZcXFwiO1xcbn1cXG5cXG4ucGktc3RlcC1mb3J3YXJkOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkxN1xcXCI7XFxufVxcblxcbi5waS10aC1sYXJnZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MThcXFwiO1xcbn1cXG5cXG4ucGktYXJyb3ctZG93bjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MTlcXFwiO1xcbn1cXG5cXG4ucGktYXJyb3ctbGVmdDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MWFcXFwiO1xcbn1cXG5cXG4ucGktYXJyb3ctcmlnaHQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTFiXFxcIjtcXG59XFxuXFxuLnBpLWFycm93LXVwOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkxY1xcXCI7XFxufVxcblxcbi5waS1iYXJzOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkxZFxcXCI7XFxufVxcblxcbi5waS1hcnJvdy1jaXJjbGUtZG93bjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MWVcXFwiO1xcbn1cXG5cXG4ucGktYXJyb3ctY2lyY2xlLWxlZnQ6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFxlOTFmXFxcIjtcXG59XFxuXFxuLnBpLWFycm93LWNpcmNsZS1yaWdodDpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjBcXFwiO1xcbn1cXG5cXG4ucGktYXJyb3ctY2lyY2xlLXVwOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkyMVxcXCI7XFxufVxcblxcbi5waS1pbmZvOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFxcZTkyM1xcXCI7XFxufVxcblxcbi5waS1pbmZvLWNpcmNsZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjRcXFwiO1xcbn1cXG5cXG4ucGktaG9tZTpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjVcXFwiO1xcbn1cXG5cXG4ucGktc3Bpbm5lcjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcXGU5MjZcXFwiO1xcbn1cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qISBsaWdodHNsaWRlciAtIHYxLjEuMyAtIDIwMTUtMDQtMTRcXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9zYWNoaW5jaG9vbHVyL2xpZ2h0c2xpZGVyXFxuKiBDb3B5cmlnaHQgKGMpIDIwMTUgU2FjaGluIE47IExpY2Vuc2VkIE1JVCAqL1xcbi8qKiAvISEhIGNvcmUgY3NzIFNob3VsZCBub3QgZWRpdCAhISEvKiovXFxuLmxTU2xpZGVPdXRlciB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcblxcbi5saWdodFNsaWRlcjpiZWZvcmUsXFxuLmxpZ2h0U2xpZGVyOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlOyB9XFxuXFxuLmxpZ2h0U2xpZGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDA7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciA+IC5saWdodFNsaWRlcjphZnRlciB7XFxuICBjbGVhcjogYm90aDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciAubFNTbGlkZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAxcztcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogLXdlYmtpdC10cmFuc2Zvcm0sIGhlaWdodDtcXG4gIC1tb3otdHJhbnNpdGlvbi1wcm9wZXJ0eTogLW1vei10cmFuc2Zvcm0sIGhlaWdodDtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zZm9ybSwgaGVpZ2h0O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50OyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU0ZhZGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIC5sU0ZhZGUgPiAqIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDk7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi5sU1NsaWRlV3JhcHBlci51c2luZ0NzcyAubFNGYWRlID4gKiB7XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OiAwcztcXG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IG9wYWNpdHk7XFxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciAubFNGYWRlID4gKi5hY3RpdmUge1xcbiAgei1pbmRleDogMTA7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIudXNpbmdDc3MgLmxTRmFkZSA+ICouYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG4vKiogLyEhISBFbmQgb2YgY29yZSBjc3MgU2hvdWxkIG5vdCBlZGl0ICEhIS8qKi9cXG4vKiBQYWdlciAqL1xcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyB7XFxuICBtYXJnaW46IDEwcHggMCAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyA+IGxpIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmc6IDAgNXB4OyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGkgYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyMjIyO1xcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGhlaWdodDogOHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRleHQtaW5kZW50OiAtOTk5ZW07XFxuICB3aWR0aDogOHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogOTk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjVzIGxpbmVhciAwcztcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGxpbmVhciAwczsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyA+IGxpOmhvdmVyIGEsXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU3BnID4gbGkuYWN0aXZlIGEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyOGJjYTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLm1lZGlhIHtcXG4gIG9wYWNpdHk6IDAuODsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLm1lZGlhLmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuLyogRW5kIG9mIHBhZ2VyICovXFxuLyoqIEdhbGxlcnkgKi9cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeSB7XFxuICBsaXN0LXN0eWxlOiBub25lIG91dHNpZGUgbm9uZTtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIG1hcmdpbjogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XFxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OiAtd2Via2l0LXRyYW5zZm9ybTtcXG4gIC1tb3otdHJhbnNpdGlvbi1wcm9wZXJ0eTogLW1vei10cmFuc2Zvcm07XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgbGkge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYm9yZGVyLXJhZGl1cyAwLjEycyBsaW5lYXIgMHMgMC4zNXMgbGluZWFyIDBzO1xcbiAgdHJhbnNpdGlvbjogYm9yZGVyLXJhZGl1cyAwLjEycyBsaW5lYXIgMHMgMC4zNXMgbGluZWFyIDBzOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkgbGkuYWN0aXZlLFxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IGxpOmhvdmVyIHtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IGltZyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogYXV0bztcXG4gIG1heC13aWR0aDogMTAwJTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5OmJlZm9yZSxcXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICBkaXNwbGF5OiB0YWJsZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5OmFmdGVyIHtcXG4gIGNsZWFyOiBib3RoOyB9XFxuXFxuLyogRW5kIG9mIEdhbGxlcnkqL1xcbi8qIHNsaWRlciBhY3Rpb25zICovXFxuLmxTQWN0aW9uID4gYSB7XFxuICB3aWR0aDogMzJweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdG9wOiA1MCU7XFxuICBoZWlnaHQ6IDMycHg7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi9hc3NldHMvY29udHJvbHMucG5nXFxcIik7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiA5OTtcXG4gIG1hcmdpbi10b3A6IC0xNnB4O1xcbiAgb3BhY2l0eTogMC41O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMzVzIGxpbmVhciAwcztcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zNXMgbGluZWFyIDBzOyB9XFxuXFxuLmxTQWN0aW9uID4gYTpob3ZlciB7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuLmxTQWN0aW9uID4gLmxTUHJldiB7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICBsZWZ0OiAxMHB4OyB9XFxuXFxuLmxTQWN0aW9uID4gLmxTTmV4dCB7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMzJweCAwO1xcbiAgcmlnaHQ6IDEwcHg7IH1cXG5cXG4ubFNBY3Rpb24gPiBhLmRpc2FibGVkIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XFxuXFxuLmNTLWhpZGRlbiB7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG9wYWNpdHk6IDA7XFxuICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9MCk7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLyogdmVydGljYWwgKi9cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwubm9QYWdlciB7XFxuICBwYWRkaW5nLXJpZ2h0OiAwcHggIWltcG9ydGFudDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxTR2FsbGVyeSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubGlnaHRTbGlkZXIgPiAqIHtcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxuICBtYXgtd2lkdGg6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi8qIHZlcnRpY2FsIGNvbnRyb2xscyAqL1xcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxTQWN0aW9uID4gYSB7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogLTE0cHg7XFxuICBtYXJnaW4tdG9wOiAwOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubFNBY3Rpb24gPiAubFNOZXh0IHtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDMxcHggLTMxcHg7XFxuICBib3R0b206IDEwcHg7XFxuICB0b3A6IGF1dG87IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sU0FjdGlvbiA+IC5sU1ByZXYge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAtMzFweDtcXG4gIGJvdHRvbTogYXV0bztcXG4gIHRvcDogMTBweDsgfVxcblxcbi8qIHZlcnRpY2FsICovXFxuLyogUnRsICovXFxuLmxTU2xpZGVPdXRlci5sU3J0bCB7XFxuICBkaXJlY3Rpb246IHJ0bDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxpZ2h0U2xpZGVyLFxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZSBvdXRzaWRlIG5vbmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5saWdodFNsaWRlcixcXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5sU1BhZ2VyIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5saWdodFNsaWRlciA+ICosXFxuLmxTU2xpZGVPdXRlciAubFNHYWxsZXJ5IGxpIHtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuLmxTU2xpZGVPdXRlci5sU3J0bCAubGlnaHRTbGlkZXIgPiAqLFxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxTR2FsbGVyeSBsaSB7XFxuICBmbG9hdDogcmlnaHQgIWltcG9ydGFudDsgfVxcblxcbi8qIFJ0bCAqL1xcbkAtd2Via2l0LWtleWZyYW1lcyByaWdodEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyByaWdodEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMDsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHRvcEVuZCB7XFxuICAwJSB7XFxuICAgIHRvcDogMDsgfVxcbiAgNTAlIHtcXG4gICAgdG9wOiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIHRvcDogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyB0b3BFbmQge1xcbiAgMCUge1xcbiAgICB0b3A6IDA7IH1cXG4gIDUwJSB7XFxuICAgIHRvcDogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICB0b3A6IDA7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBsZWZ0RW5kIHtcXG4gIDAlIHtcXG4gICAgbGVmdDogMDsgfVxcbiAgNTAlIHtcXG4gICAgbGVmdDogMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGxlZnQ6IDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgbGVmdEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IDE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAwOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYm90dG9tRW5kIHtcXG4gIDAlIHtcXG4gICAgYm90dG9tOiAwOyB9XFxuICA1MCUge1xcbiAgICBib3R0b206IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgYm90dG9tOiAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGJvdHRvbUVuZCB7XFxuICAwJSB7XFxuICAgIGJvdHRvbTogMDsgfVxcbiAgNTAlIHtcXG4gICAgYm90dG9tOiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGJvdHRvbTogMDsgfSB9XFxuXFxuLmxTU2xpZGVPdXRlciAucmlnaHRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IHJpZ2h0RW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sZWZ0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBsZWZ0RW5kIDAuM3M7XFxuICBhbmltYXRpb246IGxlZnRFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLnJpZ2h0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiB0b3BFbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogdG9wRW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sZWZ0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBib3R0b21FbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogYm90dG9tRW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5yaWdodEVuZCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogbGVmdEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiBsZWZ0RW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5sZWZ0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiByaWdodEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiByaWdodEVuZCAwLjNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLyovICBHUmFiIGN1cnNvciAqL1xcbi5saWdodFNsaWRlci5sc0dyYWIgPiAqIHtcXG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiO1xcbiAgY3Vyc29yOiAtbW96LWdyYWI7XFxuICBjdXJzb3I6IC1vLWdyYWI7XFxuICBjdXJzb3I6IC1tcy1ncmFiO1xcbiAgY3Vyc29yOiBncmFiOyB9XFxuXFxuLmxpZ2h0U2xpZGVyLmxzR3JhYmJpbmcgPiAqIHtcXG4gIGN1cnNvcjogbW92ZTtcXG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiYmluZztcXG4gIGN1cnNvcjogLW1vei1ncmFiYmluZztcXG4gIGN1cnNvcjogLW8tZ3JhYmJpbmc7XFxuICBjdXJzb3I6IC1tcy1ncmFiYmluZztcXG4gIGN1cnNvcjogZ3JhYmJpbmc7IH1cXG5cXG4vKiBUaW55IENhcm91c2VsICovXFxuLyogc2xpZGVyTmV3ICovXFxuI3NsaWRlck5ldyB7XFxuICBtYXJnaW46IDAgMCAyMHB4OyB9XFxuXFxuI3NsaWRlck5ldyAudmlld3BvcnQge1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgaGVpZ2h0OiAxMjVweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldHMge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBjbGVhcjogYm90aDtcXG4gIG1hcmdpbjogMCAwIDAgNDVweDsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldHMgbGkge1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4jc2xpZGVyTmV3IC5idWxsZXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGNvbG9yOiAjNTU1NTU1O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1bGxldC5hY3RpdmUge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1NTU1OyB9XFxuXFxuI3NsaWRlck5ldyAuYnV0dG9ucyB7XFxuICBiYWNrZ3JvdW5kOiAjQzAxMzEzO1xcbiAgYm9yZGVyLXJhZGl1czogMzVweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiAzMHB4IDEwcHggMCAwO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMzVweDtcXG4gIGhlaWdodDogMzVweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsaW5lLWhlaWdodDogMzVweDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMjJweDsgfVxcblxcbiNzbGlkZXJOZXcgLm5leHQge1xcbiAgbWFyZ2luOiAzMHB4IDAgMCAxMHB4OyB9XFxuXFxuI3NsaWRlck5ldyAuYnV0dG9uczpob3ZlciB7XFxuICBjb2xvcjogI0MwMTMxMztcXG4gIGJhY2tncm91bmQ6ICNmZmY7IH1cXG5cXG4jc2xpZGVyTmV3IC5kaXNhYmxlIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjsgfVxcblxcbiNzbGlkZXJOZXcgLm92ZXJ2aWV3IHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMjQwcHg7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuI3NsaWRlck5ldyAub3ZlcnZpZXcgbGkge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW46IDAgMjBweCAwIDA7XFxuICBwYWRkaW5nOiAxcHg7XFxuICBoZWlnaHQ6IDEyMXB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNkYztcXG4gIHdpZHRoOiAyMzZweDsgfVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIEltcG9ydHNcbmV4cG9ydHMuaShyZXF1aXJlKFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyFwcmltZWljb25zL3ByaW1laWNvbnMuY3NzXCIpLCBcIlwiKTtcbmV4cG9ydHMuaShyZXF1aXJlKFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyFmb250LWF3ZXNvbWUvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXCIpLCBcIlwiKTtcblxuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbGlnaHRzbGlkZXIgLSB2MS4xLjMgLSAyMDE1LTA0LTE0XFxuKiBodHRwczovL2dpdGh1Yi5jb20vc2FjaGluY2hvb2x1ci9saWdodHNsaWRlclxcbiogQ29weXJpZ2h0IChjKSAyMDE1IFNhY2hpbiBOOyBMaWNlbnNlZCBNSVQgKi9cXG4vKiogLyEhISBjb3JlIGNzcyBTaG91bGQgbm90IGVkaXQgISEhLyoqL1xcbi5sU1NsaWRlT3V0ZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cXG5cXG4ubGlnaHRTbGlkZXI6YmVmb3JlLFxcbi5saWdodFNsaWRlcjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICBkaXNwbGF5OiB0YWJsZTsgfVxcblxcbi5saWdodFNsaWRlciB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbWFyZ2luOiAwOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIgPiAubGlnaHRTbGlkZXI6YWZ0ZXIge1xcbiAgY2xlYXI6IGJvdGg7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIgLmxTU2xpZGUge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMXM7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IC13ZWJraXQtdHJhbnNmb3JtLCBoZWlnaHQ7XFxuICAtbW96LXRyYW5zaXRpb24tcHJvcGVydHk6IC1tb3otdHJhbnNmb3JtLCBoZWlnaHQ7XFxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm0sIGhlaWdodDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciAubFNGYWRlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5sU1NsaWRlV3JhcHBlciAubFNGYWRlID4gKiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB6LWluZGV4OiA5O1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIudXNpbmdDc3MgLmxTRmFkZSA+ICoge1xcbiAgb3BhY2l0eTogMDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTogMHM7XFxuICB0cmFuc2l0aW9uLWRlbGF5OiAwcztcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5O1xcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogb3BhY2l0eTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7IH1cXG5cXG4ubFNTbGlkZVdyYXBwZXIgLmxTRmFkZSA+ICouYWN0aXZlIHtcXG4gIHotaW5kZXg6IDEwOyB9XFxuXFxuLmxTU2xpZGVXcmFwcGVyLnVzaW5nQ3NzIC5sU0ZhZGUgPiAqLmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuLyoqIC8hISEgRW5kIG9mIGNvcmUgY3NzIFNob3VsZCBub3QgZWRpdCAhISEvKiovXFxuLyogUGFnZXIgKi9cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTcGcge1xcbiAgbWFyZ2luOiAxMHB4IDAgMDtcXG4gIHBhZGRpbmc6IDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTcGcgPiBsaSB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nOiAwIDVweDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyA+IGxpIGEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjIyMjtcXG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBoZWlnaHQ6IDhweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LWluZGVudDogLTk5OWVtO1xcbiAgd2lkdGg6IDhweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDk5O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC41cyBsaW5lYXIgMHM7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBsaW5lYXIgMHM7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTcGcgPiBsaTpob3ZlciBhLFxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNwZyA+IGxpLmFjdGl2ZSBhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MjhiY2E7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5tZWRpYSB7XFxuICBvcGFjaXR5OiAwLjg7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5tZWRpYS5hY3RpdmUge1xcbiAgb3BhY2l0eTogMTsgfVxcblxcbi8qIEVuZCBvZiBwYWdlciAqL1xcbi8qKiBHYWxsZXJ5ICovXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnkge1xcbiAgbGlzdC1zdHlsZTogbm9uZSBvdXRzaWRlIG5vbmU7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBtYXJnaW46IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcXG4gIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogLXdlYmtpdC10cmFuc2Zvcm07XFxuICAtbW96LXRyYW5zaXRpb24tcHJvcGVydHk6IC1tb3otdHJhbnNmb3JtO1xcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IGxpIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGJvcmRlci1yYWRpdXMgMC4xMnMgbGluZWFyIDBzIDAuMzVzIGxpbmVhciAwcztcXG4gIHRyYW5zaXRpb246IGJvcmRlci1yYWRpdXMgMC4xMnMgbGluZWFyIDBzIDAuMzVzIGxpbmVhciAwczsgfVxcblxcbi5sU1NsaWRlT3V0ZXIgLmxTUGFnZXIubFNHYWxsZXJ5IGxpLmFjdGl2ZSxcXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeSBsaTpob3ZlciB7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeSBpbWcge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBtYXgtd2lkdGg6IDEwMCU7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeTpiZWZvcmUsXFxuLmxTU2xpZGVPdXRlciAubFNQYWdlci5sU0dhbGxlcnk6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgZGlzcGxheTogdGFibGU7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyLmxTR2FsbGVyeTphZnRlciB7XFxuICBjbGVhcjogYm90aDsgfVxcblxcbi8qIEVuZCBvZiBHYWxsZXJ5Ki9cXG4vKiBzbGlkZXIgYWN0aW9ucyAqL1xcbi5sU0FjdGlvbiA+IGEge1xcbiAgd2lkdGg6IDMycHg7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHRvcDogNTAlO1xcbiAgaGVpZ2h0OiAzMnB4O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIvYXNzZXRzL2NvbnRyb2xzLnBuZ1xcXCIpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogOTk7XFxuICBtYXJnaW4tdG9wOiAtMTZweDtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjM1cyBsaW5lYXIgMHM7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMzVzIGxpbmVhciAwczsgfVxcblxcbi5sU0FjdGlvbiA+IGE6aG92ZXIge1xcbiAgb3BhY2l0eTogMTsgfVxcblxcbi5sU0FjdGlvbiA+IC5sU1ByZXYge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgbGVmdDogMTBweDsgfVxcblxcbi5sU0FjdGlvbiA+IC5sU05leHQge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTMycHggMDtcXG4gIHJpZ2h0OiAxMHB4OyB9XFxuXFxuLmxTQWN0aW9uID4gYS5kaXNhYmxlZCB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTsgfVxcblxcbi5jUy1oaWRkZW4ge1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBvcGFjaXR5OiAwO1xcbiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTApO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblxcbi8qIHZlcnRpY2FsICovXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsLm5vUGFnZXIge1xcbiAgcGFkZGluZy1yaWdodDogMHB4ICFpbXBvcnRhbnQ7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sU0dhbGxlcnkge1xcbiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxpZ2h0U2xpZGVyID4gKiB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbiAgbWF4LXdpZHRoOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4vKiB2ZXJ0aWNhbCBjb250cm9sbHMgKi9cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5sU0FjdGlvbiA+IGEge1xcbiAgbGVmdDogNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IC0xNHB4O1xcbiAgbWFyZ2luLXRvcDogMDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIudmVydGljYWwgLmxTQWN0aW9uID4gLmxTTmV4dCB7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAzMXB4IC0zMXB4O1xcbiAgYm90dG9tOiAxMHB4O1xcbiAgdG9wOiBhdXRvOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubFNBY3Rpb24gPiAubFNQcmV2IHtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgLTMxcHg7XFxuICBib3R0b206IGF1dG87XFxuICB0b3A6IDEwcHg7IH1cXG5cXG4vKiB2ZXJ0aWNhbCAqL1xcbi8qIFJ0bCAqL1xcbi5sU1NsaWRlT3V0ZXIubFNydGwge1xcbiAgZGlyZWN0aW9uOiBydGw7IH1cXG5cXG4ubFNTbGlkZU91dGVyIC5saWdodFNsaWRlcixcXG4ubFNTbGlkZU91dGVyIC5sU1BhZ2VyIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmUgb3V0c2lkZSBub25lOyB9XFxuXFxuLmxTU2xpZGVPdXRlci5sU3J0bCAubGlnaHRTbGlkZXIsXFxuLmxTU2xpZGVPdXRlci5sU3J0bCAubFNQYWdlciB7XFxuICBwYWRkaW5nLXJpZ2h0OiAwOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubGlnaHRTbGlkZXIgPiAqLFxcbi5sU1NsaWRlT3V0ZXIgLmxTR2FsbGVyeSBsaSB7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbi5sU1NsaWRlT3V0ZXIubFNydGwgLmxpZ2h0U2xpZGVyID4gKixcXG4ubFNTbGlkZU91dGVyLmxTcnRsIC5sU0dhbGxlcnkgbGkge1xcbiAgZmxvYXQ6IHJpZ2h0ICFpbXBvcnRhbnQ7IH1cXG5cXG4vKiBSdGwgKi9cXG5ALXdlYmtpdC1rZXlmcmFtZXMgcmlnaHRFbmQge1xcbiAgMCUge1xcbiAgICBsZWZ0OiAwOyB9XFxuICA1MCUge1xcbiAgICBsZWZ0OiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGxlZnQ6IDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgcmlnaHRFbmQge1xcbiAgMCUge1xcbiAgICBsZWZ0OiAwOyB9XFxuICA1MCUge1xcbiAgICBsZWZ0OiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGxlZnQ6IDA7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyB0b3BFbmQge1xcbiAgMCUge1xcbiAgICB0b3A6IDA7IH1cXG4gIDUwJSB7XFxuICAgIHRvcDogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICB0b3A6IDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgdG9wRW5kIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAwOyB9XFxuICA1MCUge1xcbiAgICB0b3A6IC0xNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiAwOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbGVmdEVuZCB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IDA7IH1cXG4gIDUwJSB7XFxuICAgIGxlZnQ6IDE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGxlZnRFbmQge1xcbiAgMCUge1xcbiAgICBsZWZ0OiAwOyB9XFxuICA1MCUge1xcbiAgICBsZWZ0OiAxNXB4OyB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMDsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGJvdHRvbUVuZCB7XFxuICAwJSB7XFxuICAgIGJvdHRvbTogMDsgfVxcbiAgNTAlIHtcXG4gICAgYm90dG9tOiAtMTVweDsgfVxcbiAgMTAwJSB7XFxuICAgIGJvdHRvbTogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBib3R0b21FbmQge1xcbiAgMCUge1xcbiAgICBib3R0b206IDA7IH1cXG4gIDUwJSB7XFxuICAgIGJvdHRvbTogLTE1cHg7IH1cXG4gIDEwMCUge1xcbiAgICBib3R0b206IDA7IH0gfVxcblxcbi5sU1NsaWRlT3V0ZXIgLnJpZ2h0RW5kIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiByaWdodEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiByaWdodEVuZCAwLjNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVPdXRlciAubGVmdEVuZCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogbGVmdEVuZCAwLjNzO1xcbiAgYW5pbWF0aW9uOiBsZWZ0RW5kIDAuM3M7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubFNTbGlkZU91dGVyLnZlcnRpY2FsIC5yaWdodEVuZCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogdG9wRW5kIDAuM3M7XFxuICBhbmltYXRpb246IHRvcEVuZCAwLjNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVPdXRlci52ZXJ0aWNhbCAubGVmdEVuZCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogYm90dG9tRW5kIDAuM3M7XFxuICBhbmltYXRpb246IGJvdHRvbUVuZCAwLjNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVPdXRlci5sU3J0bCAucmlnaHRFbmQge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGxlZnRFbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogbGVmdEVuZCAwLjNzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmxTU2xpZGVPdXRlci5sU3J0bCAubGVmdEVuZCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogcmlnaHRFbmQgMC4zcztcXG4gIGFuaW1hdGlvbjogcmlnaHRFbmQgMC4zcztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi8qLyAgR1JhYiBjdXJzb3IgKi9cXG4ubGlnaHRTbGlkZXIubHNHcmFiID4gKiB7XFxuICBjdXJzb3I6IC13ZWJraXQtZ3JhYjtcXG4gIGN1cnNvcjogLW1vei1ncmFiO1xcbiAgY3Vyc29yOiAtby1ncmFiO1xcbiAgY3Vyc29yOiAtbXMtZ3JhYjtcXG4gIGN1cnNvcjogZ3JhYjsgfVxcblxcbi5saWdodFNsaWRlci5sc0dyYWJiaW5nID4gKiB7XFxuICBjdXJzb3I6IG1vdmU7XFxuICBjdXJzb3I6IC13ZWJraXQtZ3JhYmJpbmc7XFxuICBjdXJzb3I6IC1tb3otZ3JhYmJpbmc7XFxuICBjdXJzb3I6IC1vLWdyYWJiaW5nO1xcbiAgY3Vyc29yOiAtbXMtZ3JhYmJpbmc7XFxuICBjdXJzb3I6IGdyYWJiaW5nOyB9XFxuXFxuLyogVGlueSBDYXJvdXNlbCAqL1xcbi8qIHNsaWRlck5ldyAqL1xcbiNzbGlkZXJOZXcge1xcbiAgbWFyZ2luOiAwIDAgMjBweDsgfVxcblxcbiNzbGlkZXJOZXcgLnZpZXdwb3J0IHtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIGhlaWdodDogMTI1cHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4jc2xpZGVyTmV3IC5idWxsZXRzIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgY2xlYXI6IGJvdGg7XFxuICBtYXJnaW46IDAgMCAwIDQ1cHg7IH1cXG5cXG4jc2xpZGVyTmV3IC5idWxsZXRzIGxpIHtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuI3NsaWRlck5ldyAuYnVsbGV0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBjb2xvcjogIzU1NTU1NTtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG4jc2xpZGVyTmV3IC5idWxsZXQuYWN0aXZlIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTU1NTsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1dHRvbnMge1xcbiAgYmFja2dyb3VuZDogI0MwMTMxMztcXG4gIGJvcmRlci1yYWRpdXM6IDM1cHg7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogMzBweCAxMHB4IDAgMDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDM1cHg7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBmb250LXNpemU6IDIycHg7IH1cXG5cXG4jc2xpZGVyTmV3IC5uZXh0IHtcXG4gIG1hcmdpbjogMzBweCAwIDAgMTBweDsgfVxcblxcbiNzbGlkZXJOZXcgLmJ1dHRvbnM6aG92ZXIge1xcbiAgY29sb3I6ICNDMDEzMTM7XFxuICBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuXFxuI3NsaWRlck5ldyAuZGlzYWJsZSB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47IH1cXG5cXG4jc2xpZGVyTmV3IC5vdmVydmlldyB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDsgfVxcblxcbiNzbGlkZXJOZXcgLm92ZXJ2aWV3IGxpIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWFyZ2luOiAwIDIwcHggMCAwO1xcbiAgcGFkZGluZzogMXB4O1xcbiAgaGVpZ2h0OiAxMjFweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZGM7XFxuICB3aWR0aDogMjM2cHg7IH1cXG5cXG4udWktd2lkZ2V0LCAudWktd2lkZ2V0ICoge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblxcbi51aS1oZWxwZXItaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi51aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGUge1xcbiAgYm9yZGVyOiAwO1xcbiAgY2xpcDogcmVjdCgwIDAgMCAwKTtcXG4gIGhlaWdodDogMXB4O1xcbiAgbWFyZ2luOiAtMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmc6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMXB4OyB9XFxuXFxuLnVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZSBpbnB1dCxcXG4udWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlIHNlbGVjdCB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XFxuXFxuLnVpLWhlbHBlci1yZXNldCB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgb3V0bGluZTogMDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjM7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBsaXN0LXN0eWxlOiBub25lOyB9XFxuXFxuLnVpLWhlbHBlci1jbGVhcmZpeDo6YmVmb3JlLFxcbi51aS1oZWxwZXItY2xlYXJmaXg6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgZGlzcGxheTogdGFibGU7IH1cXG5cXG4udWktaGVscGVyLWNsZWFyZml4OjphZnRlciB7XFxuICBjbGVhcjogYm90aDsgfVxcblxcbi51aS1oZWxwZXItY2xlYXJmaXgge1xcbiAgem9vbTogMTsgfVxcblxcbi51aS1oZWxwZXItemZpeCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBvcGFjaXR5OiAwO1xcbiAgZmlsdGVyOiBBbHBoYShPcGFjaXR5PTApOyB9XFxuXFxuLnVpLXN0YXRlLWRpc2FibGVkIHtcXG4gIGN1cnNvcjogZGVmYXVsdCAhaW1wb3J0YW50OyB9XFxuXFxuLnVpLXN0YXRlLWRpc2FibGVkIGEge1xcbiAgY3Vyc29yOiBkZWZhdWx0ICFpbXBvcnRhbnQ7IH1cXG5cXG4udWktaWNvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHRleHQtaW5kZW50OiAtOTk5OTlweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyB9XFxuXFxuLnVpLXdpZGdldC1vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTsgfVxcblxcbi51aS1yZXNpemFibGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1oYW5kbGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZm9udC1zaXplOiAwLjFweDtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1kaXNhYmxlZCAudWktcmVzaXphYmxlLWhhbmRsZSxcXG4udWktcmVzaXphYmxlLWF1dG9oaWRlIC51aS1yZXNpemFibGUtaGFuZGxlIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4udWktcmVzaXphYmxlLW4ge1xcbiAgY3Vyc29yOiBuLXJlc2l6ZTtcXG4gIGhlaWdodDogN3B4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0b3A6IC01cHg7XFxuICBsZWZ0OiAwOyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1zIHtcXG4gIGN1cnNvcjogcy1yZXNpemU7XFxuICBoZWlnaHQ6IDdweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm90dG9tOiAtNXB4O1xcbiAgbGVmdDogMDsgfVxcblxcbi51aS1yZXNpemFibGUtZSB7XFxuICBjdXJzb3I6IGUtcmVzaXplO1xcbiAgd2lkdGg6IDdweDtcXG4gIHJpZ2h0OiAtNXB4O1xcbiAgdG9wOiAwO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLnVpLXJlc2l6YWJsZS13IHtcXG4gIGN1cnNvcjogdy1yZXNpemU7XFxuICB3aWR0aDogN3B4O1xcbiAgbGVmdDogLTVweDtcXG4gIHRvcDogMDtcXG4gIGhlaWdodDogMTAwJTsgfVxcblxcbi51aS1yZXNpemFibGUtc2Uge1xcbiAgY3Vyc29yOiBzZS1yZXNpemU7XFxuICB3aWR0aDogMTJweDtcXG4gIGhlaWdodDogMTJweDtcXG4gIHJpZ2h0OiAxcHg7XFxuICBib3R0b206IDFweDsgfVxcblxcbi51aS1yZXNpemFibGUtc3cge1xcbiAgY3Vyc29yOiBzdy1yZXNpemU7XFxuICB3aWR0aDogOXB4O1xcbiAgaGVpZ2h0OiA5cHg7XFxuICBsZWZ0OiAtNXB4O1xcbiAgYm90dG9tOiAtNXB4OyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1udyB7XFxuICBjdXJzb3I6IG53LXJlc2l6ZTtcXG4gIHdpZHRoOiA5cHg7XFxuICBoZWlnaHQ6IDlweDtcXG4gIGxlZnQ6IC01cHg7XFxuICB0b3A6IC01cHg7IH1cXG5cXG4udWktcmVzaXphYmxlLW5lIHtcXG4gIGN1cnNvcjogbmUtcmVzaXplO1xcbiAgd2lkdGg6IDlweDtcXG4gIGhlaWdodDogOXB4O1xcbiAgcmlnaHQ6IC01cHg7XFxuICB0b3A6IC01cHg7IH1cXG5cXG4udWktc2hhZG93IHtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDFweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIC1tb3otYm94LXNoYWRvdzogMHB4IDFweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIGJveC1zaGFkb3c6IDBweCAxcHggM3B4IDBweCByZ2JhKDAsIDAsIDAsIDAuMyk7IH1cXG5cXG4udWktdW5zZWxlY3RhYmxlLXRleHQge1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtby11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuLnVpLXNjcm9sbGJhci1tZWFzdXJlIHtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogMTAwcHg7XFxuICBvdmVyZmxvdzogc2Nyb2xsO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAtOTk5OXB4OyB9XFxuXFxuLnVpLW92ZXJmbG93LWhpZGRlbiB7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIC8qIFdlYktpdCwgQmxpbmssIEVkZ2UgKi9cXG4gIGNvbG9yOiAjODk4OTg5OyB9XFxuXFxuOi1tb3otcGxhY2Vob2xkZXIge1xcbiAgLyogTW96aWxsYSBGaXJlZm94IDQgdG8gMTggKi9cXG4gIGNvbG9yOiAjODk4OTg5O1xcbiAgb3BhY2l0eTogMTsgfVxcblxcbjo6LW1vei1wbGFjZWhvbGRlciB7XFxuICAvKiBNb3ppbGxhIEZpcmVmb3ggMTkrICovXFxuICBjb2xvcjogIzg5ODk4OTtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG46LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIC8qIEludGVybmV0IEV4cGxvcmVyIDEwLTExICovXFxuICBjb2xvcjogIzg5ODk4OTsgfVxcblxcbjo6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIC8qIE1pY3Jvc29mdCBFZGdlICovXFxuICBjb2xvcjogIzg5ODk4OTsgfVxcblxcbi51aS1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogIzg5ODk4OTsgfVxcblxcbmlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcbmlucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdLFxcbmlucHV0W3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuaW5wdXRbdHlwZT1cXFwiZmlsZVxcXCJdOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbixcXG5idXR0b24ge1xcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAwO1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwO1xcbiAgYm9yZGVyLXJhZGl1czogMDsgfVxcblxcbi51aS13aWRnZXQsIC51aS13aWRnZXQgKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuLnVpLWhlbHBlci1oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZSB7XFxuICBib3JkZXI6IDA7XFxuICBjbGlwOiByZWN0KDAgMCAwIDApO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBtYXJnaW46IC0xcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxcHg7IH1cXG5cXG4udWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlIGlucHV0LFxcbi51aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGUgc2VsZWN0IHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cXG5cXG4udWktaGVscGVyLXJlc2V0IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBvdXRsaW5lOiAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuMztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG4udWktaGVscGVyLWNsZWFyZml4OjpiZWZvcmUsXFxuLnVpLWhlbHBlci1jbGVhcmZpeDo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBkaXNwbGF5OiB0YWJsZTsgfVxcblxcbi51aS1oZWxwZXItY2xlYXJmaXg6OmFmdGVyIHtcXG4gIGNsZWFyOiBib3RoOyB9XFxuXFxuLnVpLWhlbHBlci1jbGVhcmZpeCB7XFxuICB6b29tOiAxOyB9XFxuXFxuLnVpLWhlbHBlci16Zml4IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG9wYWNpdHk6IDA7XFxuICBmaWx0ZXI6IEFscGhhKE9wYWNpdHk9MCk7IH1cXG5cXG4udWktc3RhdGUtZGlzYWJsZWQge1xcbiAgY3Vyc29yOiBkZWZhdWx0ICFpbXBvcnRhbnQ7IH1cXG5cXG4udWktc3RhdGUtZGlzYWJsZWQgYSB7XFxuICBjdXJzb3I6IGRlZmF1bHQgIWltcG9ydGFudDsgfVxcblxcbi51aS1pY29uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdGV4dC1pbmRlbnQ6IC05OTk5OXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IH1cXG5cXG4udWktd2lkZ2V0LW92ZXJsYXkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLnVpLXJlc2l6YWJsZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4udWktcmVzaXphYmxlLWhhbmRsZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBmb250LXNpemU6IDAuMXB4O1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG4udWktcmVzaXphYmxlLWRpc2FibGVkIC51aS1yZXNpemFibGUtaGFuZGxlLFxcbi51aS1yZXNpemFibGUtYXV0b2hpZGUgLnVpLXJlc2l6YWJsZS1oYW5kbGUge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi51aS1yZXNpemFibGUtbiB7XFxuICBjdXJzb3I6IG4tcmVzaXplO1xcbiAgaGVpZ2h0OiA3cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRvcDogLTVweDtcXG4gIGxlZnQ6IDA7IH1cXG5cXG4udWktcmVzaXphYmxlLXMge1xcbiAgY3Vyc29yOiBzLXJlc2l6ZTtcXG4gIGhlaWdodDogN3B4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3R0b206IC01cHg7XFxuICBsZWZ0OiAwOyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1lIHtcXG4gIGN1cnNvcjogZS1yZXNpemU7XFxuICB3aWR0aDogN3B4O1xcbiAgcmlnaHQ6IC01cHg7XFxuICB0b3A6IDA7XFxuICBoZWlnaHQ6IDEwMCU7IH1cXG5cXG4udWktcmVzaXphYmxlLXcge1xcbiAgY3Vyc29yOiB3LXJlc2l6ZTtcXG4gIHdpZHRoOiA3cHg7XFxuICBsZWZ0OiAtNXB4O1xcbiAgdG9wOiAwO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1zZSB7XFxuICBjdXJzb3I6IHNlLXJlc2l6ZTtcXG4gIHdpZHRoOiAxMnB4O1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgcmlnaHQ6IDFweDtcXG4gIGJvdHRvbTogMXB4OyB9XFxuXFxuLnVpLXJlc2l6YWJsZS1zdyB7XFxuICBjdXJzb3I6IHN3LXJlc2l6ZTtcXG4gIHdpZHRoOiA5cHg7XFxuICBoZWlnaHQ6IDlweDtcXG4gIGxlZnQ6IC01cHg7XFxuICBib3R0b206IC01cHg7IH1cXG5cXG4udWktcmVzaXphYmxlLW53IHtcXG4gIGN1cnNvcjogbnctcmVzaXplO1xcbiAgd2lkdGg6IDlweDtcXG4gIGhlaWdodDogOXB4O1xcbiAgbGVmdDogLTVweDtcXG4gIHRvcDogLTVweDsgfVxcblxcbi51aS1yZXNpemFibGUtbmUge1xcbiAgY3Vyc29yOiBuZS1yZXNpemU7XFxuICB3aWR0aDogOXB4O1xcbiAgaGVpZ2h0OiA5cHg7XFxuICByaWdodDogLTVweDtcXG4gIHRvcDogLTVweDsgfVxcblxcbi51aS1zaGFkb3cge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMXB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgLW1vei1ib3gtc2hhZG93OiAwcHggMXB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4zKTsgfVxcblxcbi51aS11bnNlbGVjdGFibGUtdGV4dCB7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1vLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cXG5cXG4udWktc2Nyb2xsYmFyLW1lYXN1cmUge1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIG92ZXJmbG93OiBzY3JvbGw7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IC05OTk5cHg7IH1cXG5cXG4udWktb3ZlcmZsb3ctaGlkZGVuIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogV2ViS2l0LCBCbGluaywgRWRnZSAqL1xcbiAgY29sb3I6ICM4OTg5ODk7IH1cXG5cXG46LW1vei1wbGFjZWhvbGRlciB7XFxuICAvKiBNb3ppbGxhIEZpcmVmb3ggNCB0byAxOCAqL1xcbiAgY29sb3I6ICM4OTg5ODk7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuOjotbW96LXBsYWNlaG9sZGVyIHtcXG4gIC8qIE1vemlsbGEgRmlyZWZveCAxOSsgKi9cXG4gIGNvbG9yOiAjODk4OTg5O1xcbiAgb3BhY2l0eTogMTsgfVxcblxcbjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTAtMTEgKi9cXG4gIGNvbG9yOiAjODk4OTg5OyB9XFxuXFxuOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogTWljcm9zb2Z0IEVkZ2UgKi9cXG4gIGNvbG9yOiAjODk4OTg5OyB9XFxuXFxuLnVpLXBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjODk4OTg5OyB9XFxuXFxuaW5wdXRbdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuaW5wdXRbdHlwZT1cXFwic3VibWl0XFxcIl0sXFxuaW5wdXRbdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5pbnB1dFt0eXBlPVxcXCJmaWxlXFxcIl06Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uLFxcbmJ1dHRvbiB7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDA7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDA7XFxuICBib3JkZXItcmFkaXVzOiAwOyB9XFxuXFxuLyogQnV0dG9uICovXFxuLnVpLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nOiAwO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB6b29tOiAxO1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICAvKiB0aGUgb3ZlcmZsb3cgcHJvcGVydHkgcmVtb3ZlcyBleHRyYSB3aWR0aCBpbiBJRSAqLyB9XFxuXFxucC1idXR0b24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuXFxuLypidXR0b24gdGV4dCBlbGVtZW50ICovXFxuLnVpLWJ1dHRvbiAudWktYnV0dG9uLXRleHQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBsaW5lLWhlaWdodDogbm9ybWFsOyB9XFxuXFxuLnVpLWJ1dHRvbi10ZXh0LW9ubHkgLnVpLWJ1dHRvbi10ZXh0IHtcXG4gIHBhZGRpbmc6IC4yNWVtIDFlbTsgfVxcblxcbi51aS1idXR0b24taWNvbi1vbmx5IC51aS1idXR0b24tdGV4dCxcXG4udWktYnV0dG9uLXRleHQtZW1wdHkgLnVpLWJ1dHRvbi10ZXh0IHtcXG4gIHBhZGRpbmc6IC4yNWVtO1xcbiAgdGV4dC1pbmRlbnQ6IC05OTk5OTk5cHg7IH1cXG5cXG4udWktYnV0dG9uLXRleHQtaWNvbi1sZWZ0IC51aS1idXR0b24tdGV4dCB7XFxuICBwYWRkaW5nOiAuMjVlbSAxZW0gLjI1ZW0gMi4xZW07IH1cXG5cXG4udWktYnV0dG9uLXRleHQtaWNvbi1yaWdodCAudWktYnV0dG9uLXRleHQge1xcbiAgcGFkZGluZzogLjI1ZW0gMi4xZW0gLjI1ZW0gMWVtOyB9XFxuXFxuLypidXR0b24gaWNvbiBlbGVtZW50KHMpICovXFxuLnVpLWJ1dHRvbi1pY29uLW9ubHkgLnVpLWJ1dHRvbi1pY29uLWxlZnQsXFxuLnVpLWJ1dHRvbi10ZXh0LWljb24tbGVmdCAudWktYnV0dG9uLWljb24tbGVmdCxcXG4udWktYnV0dG9uLXRleHQtaWNvbi1yaWdodCAudWktYnV0dG9uLWljb24tcmlnaHQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBtYXJnaW4tdG9wOiAtLjVlbTtcXG4gIGhlaWdodDogMWVtOyB9XFxuXFxuLnVpLWJ1dHRvbi1pY29uLW9ubHkgLnVpLWJ1dHRvbi1pY29uLWxlZnQge1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tdG9wOiAtLjVlbTtcXG4gIG1hcmdpbi1sZWZ0OiAtLjVlbTtcXG4gIHdpZHRoOiAxZW07XFxuICBoZWlnaHQ6IDFlbTsgfVxcblxcbi51aS1idXR0b24taWNvbi1sZWZ0IHtcXG4gIGxlZnQ6IC41ZW07IH1cXG5cXG4udWktYnV0dG9uLWljb24tcmlnaHQge1xcbiAgcmlnaHQ6IC41ZW07IH1cXG5cXG4vKmJ1dHRvbiBzZXRzKi9cXG4udWktYnV0dG9uc2V0IC51aS1idXR0b24ge1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxuICBtYXJnaW4tcmlnaHQ6IDA7IH1cXG5cXG4vKiB3b3JrYXJvdW5kcyAqL1xcbmJ1dHRvbi51aS1idXR0b246Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIC8qIHJlc2V0IGV4dHJhIHBhZGRpbmcgaW4gRmlyZWZveCAqLyB9XFxuXFxuLyoqIEZsdWlkICoqL1xcbi51aS1mbHVpZCAudWktYnV0dG9uIHtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnVpLWZsdWlkIC51aS1idXR0b24tdGV4dC1pY29uLWxlZnQgLnVpLWJ1dHRvbi10ZXh0LFxcbi51aS1mbHVpZCAudWktYnV0dG9uLXRleHQtaWNvbi1yaWdodCAudWktYnV0dG9uLXRleHQge1xcbiAgcGFkZGluZy1sZWZ0OiAxZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAxZW07IH1cXG5cXG4vKiogQnV0dG9uU2V0ICoqL1xcbi51aS1mbHVpZCAudWktYnV0dG9uc2V0IHtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTEgLnVpLWJ1dHRvbiB7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi51aS1mbHVpZCAudWktYnV0dG9uc2V0LnVpLWJ1dHRvbnNldC0yIC51aS1idXR0b24ge1xcbiAgd2lkdGg6IDUwJTsgfVxcblxcbi51aS1mbHVpZCAudWktYnV0dG9uc2V0LnVpLWJ1dHRvbnNldC0zIC51aS1idXR0b24ge1xcbiAgd2lkdGg6IDMzLjMlOyB9XFxuXFxuLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTQgLnVpLWJ1dHRvbiB7XFxuICB3aWR0aDogMjUlOyB9XFxuXFxuLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTUgLnVpLWJ1dHRvbiB7XFxuICB3aWR0aDogMjAlOyB9XFxuXFxuLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTYgLnVpLWJ1dHRvbiB7XFxuICB3aWR0aDogMTYuNiU7IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjQwcHgpIHtcXG4gIC51aS1mbHVpZCAudWktYnV0dG9uc2V0LnVpLWJ1dHRvbnNldC0xIC51aS1idXR0b24sXFxuICAudWktZmx1aWQgLnVpLWJ1dHRvbnNldC51aS1idXR0b25zZXQtMiAudWktYnV0dG9uLFxcbiAgLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTMgLnVpLWJ1dHRvbixcXG4gIC51aS1mbHVpZCAudWktYnV0dG9uc2V0LnVpLWJ1dHRvbnNldC00IC51aS1idXR0b24sXFxuICAudWktZmx1aWQgLnVpLWJ1dHRvbnNldC51aS1idXR0b25zZXQtNSAudWktYnV0dG9uLFxcbiAgLnVpLWZsdWlkIC51aS1idXR0b25zZXQudWktYnV0dG9uc2V0LTYgLnVpLWJ1dHRvbiB7XFxuICAgIHdpZHRoOiAxMDAlOyB9IH1cXG5cXG5jZS1jaGVja2JveCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxuXFxuY2UtbGFiZWwge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBtYXJnaW4tbGVmdDogOHB4OyB9XFxuXFxuY2UtYWNjb3JkaW9uLWhlYWRpbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjazsgfVxcblxcbmNlLWFjY29yZGlvbi1oZWFkaW5nICsgY2UtYWNjb3JkaW9uLWhlYWRpbmcge1xcbiAgYm9yZGVyLXRvcDogbm9uZTsgfVxcblxcbmNlLWFjY29yZGlvbi1oZWFkaW5nW2V4cGFuZGVkXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7IH1cXG5cXG5jZS1hY2NvcmRpb24tcGFuZWwge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTsgfVxcblxcbmNlLXRhYiB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIHBhZGRpbmc6IDIwcHg7IH1cXG5cXG5jZS10YWItcGFuZWwge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTsgfVxcblxcbmNlLXRhYltzZWxlY3RlZF0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlOyB9XFxuXFxuY2UtdGFiczpub3QoOmRlZmluZWQpLFxcbmNlLXRhYjpub3QoOmRlZmluZWQpLFxcbmNlLXRhYi1wYW5lbDpub3QoOmRlZmluZWQpIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuY2UtdG9nZ2xlLWJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcbiAgcGFkZGluZzogM3B4O1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMzMzO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuMnMgZWFzZTsgfVxcblxcbmNlLXRvZ2dsZS1idXR0b25bcHJlc3NlZF0sXFxuY2UtdG9nZ2xlLWJ1dHRvbjpub3QoW2Rpc2FibGVkXSk6YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5OTk7IH1cXG5cXG5jZS10b2dnbGUtYnV0dG9uW2Rpc2FibGVkXSB7XFxuICBvcGFjaXR5OiAwLjM1OyB9XFxuXFxuaHRtbCwgYm9keSB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwOyB9XFxuICBodG1sICosIGJvZHkgKiB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG4udWktZGVtbyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwJTsgfVxcbiAgLnVpLWRlbW8gLnNpZGVuYXYge1xcbiAgICBmbGV4LWJhc2lzOiAzMDBweDtcXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpOyB9XFxuICAudWktZGVtbyAuY29udGVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMjBweDsgfVxcblxcbnVpLXJvdXRlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnVpLWVsZW1lbnRzIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuICBiYWNrZ3JvdW5kOiAjZmFmYWZhOyB9XFxuICAudWktZWxlbWVudHNfX2l0ZW0ge1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcXG4gICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAuM3MgbGluZWFyO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gICAgLnVpLWVsZW1lbnRzX19pdGVtIGEge1xcbiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgd2lkdGg6IDEwMCU7IH1cXG4gICAgLnVpLWVsZW1lbnRzX19pdGVtOmhvdmVyIHtcXG4gICAgICBib3gtc2hhZG93OiAwcHggMXB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmY7IH1cXG4gICAgICAudWktZWxlbWVudHNfX2l0ZW06aG92ZXI6YmVmb3JlIHtcXG4gICAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgYm90dG9tOiAwO1xcbiAgICAgICAgbGVmdDogMDtcXG4gICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgIHdpZHRoOiA1cHg7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjMmY2MmEzOyB9XFxuXCIsIFwiXCJdKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJbY2UtdHJlZV0ge1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lOyB9XFxuXFxuW2FyaWEtZXhwYW5kZWQ9XFxcInRydWVcXFwiXSA+IFtjZS10cmVlXSB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcblthcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCJdID4gW2NlLXRyZWVdIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uY2UtdHJlZS1mb2xkZXIgPiAuY2UtdHJlZS1pY29uOm5vdChbZGF0YS10eXBlPVxcXCJmaWxlXFxcIl0pIHtcXG4gIGhlaWdodDogMDtcXG4gIHdpZHRoOiAwO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci13aWR0aDogNXB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjMzMzO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMXMgZWFzZS1pbi1vdXQ7IH1cXG5cXG4uY2UtdHJlZS1mb2xkZXJbYXJpYS1leHBhbmRlZD1cXFwidHJ1ZVxcXCJdID4gLmNlLXRyZWUtaWNvbiB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiAyNSUgNTAlOyB9XFxuXFxuLmNlLXRyZWUtZmlsZSA+IC5jZS10cmVlLWljb24sIC5jZS10cmVlLWZvbGRlci5jZS10cmVlLWZpbGVbYXJpYS1leHBhbmRlZD1cXFwidHJ1ZVxcXCJdID4gLmNlLXRyZWUtaWNvbiwgLmNlLXRyZWUtZm9sZGVyLmNlLXRyZWUtZmlsZVthcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCJdID4gLmNlLXRyZWUtaWNvbiB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmNlLXRyZWUtZmlsZSxcXG4uY2UtdHJlZS1mb2xkZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAuY2UtdHJlZS1maWxlOjpiZWZvcmUsXFxuICAuY2UtdHJlZS1mb2xkZXI6OmJlZm9yZSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA5cHg7XFxuICAgIGxlZnQ6IC0xNHB4O1xcbiAgICB3aWR0aDogMTNweDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICBib3JkZXItdG9wOiAxcHggZG90dGVkICM2N2IyZGQ7XFxuICAgIHotaW5kZXg6IDE7IH1cXG5cXG4uY2UtdHJlZS1jb250ZW50IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmctbGVmdDogMTZweDsgfVxcbiAgLmNlLXRyZWUtY29udGVudDo6YmVmb3JlIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICB0b3A6IC05cHg7XFxuICAgIGJvdHRvbTogMTZweDtcXG4gICAgbGVmdDogMnB4O1xcbiAgICBib3JkZXI6IDFweCBkb3R0ZWQgIzY3YjJkZDtcXG4gICAgYm9yZGVyLXdpZHRoOiAwIDAgMCAxcHg7XFxuICAgIGhlaWdodDogMTAwJTsgfVxcblxcbi5jZS10cmVlLWNvbnRlbnQ6Zmlyc3QtY2hpbGQ6OmJlZm9yZSB7XFxuICBib3JkZXI6IG5vbmU7IH1cXG5cXG4uY2UtdHJlZS1jb250ZW50OmZpcnN0LWNoaWxkID4gLmNlLXRyZWUtZm9sZGVyOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlcjogbm9uZTsgfVxcblxcbi5zb3VyY2UtdmlldyBbY2xhc3NePVxcXCJjb2wtbWQtXFxcIl0ge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgcGFkZGluZy1yaWdodDogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDEzMHB4KTtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDEzMHB4KTsgfVxcbiAgLnNvdXJjZS12aWV3IFtjbGFzc149XFxcImNvbC1tZC1cXFwiXSBwcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgYm9yZGVyOiBub25lOyB9XFxuXFxuLnNvdXJjZS12aWV3IFtjbGFzc149XFxcImNvbC1tZC1cXFwiXSArIFtjbGFzc149XFxcImNvbC1tZC1cXFwiXSB7XFxuICBib3JkZXItbGVmdDogbm9uZTsgfVxcblxcbi5zb3VyY2UtdHJlZSxcXG4uc291cmNlLXNuaXBwZXRzIHtcXG4gIG92ZXJmbG93OiBhdXRvOyB9XFxuXCIsIFwiXCJdKTtcblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuICdAbWVkaWEgJyArIGl0ZW1bMl0gKyAneycgKyBjb250ZW50ICsgJ30nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICB9XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG1vZHVsZXNbaV07IC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG4gICAgICAvLyB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG4gICAgICAvLyBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cbiAgICAgIGlmIChpdGVtWzBdID09IG51bGwgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgICAgaXRlbVsyXSA9ICcoJyArIGl0ZW1bMl0gKyAnKSBhbmQgKCcgKyBtZWRpYVF1ZXJ5ICsgJyknO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuICByZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVzY2FwZSh1cmwsIG5lZWRRdW90ZXMpIHtcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfSAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXS8udGVzdCh1cmwpIHx8IG5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRhd2Vzb21lLXdlYmZvbnQuNjc0ZjUwZDI4N2E4YzQ4ZGMxOWIuZW90XCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udGF3ZXNvbWUtd2ViZm9udC42NzRmNTBkMjg3YThjNDhkYzE5Yi5lb3RcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250YXdlc29tZS13ZWJmb250LjkxMmVjNjZkNzU3MmZmODIxNzQ5LnN2Z1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRhd2Vzb21lLXdlYmZvbnQuYjA2ODcxZjI4MWZlZTZiMjQxZDYudHRmXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udGF3ZXNvbWUtd2ViZm9udC5hZjdhZTUwNWE5ZWVkNTAzZjhiOC53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRhd2Vzb21lLXdlYmZvbnQuZmVlNjZlNzEyYThhMDhlZWY1ODAud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInByaW1laWNvbnMuYjhlY2NiMTA1OWVhNWZhYWY2ZDguZW90XCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwicHJpbWVpY29ucy4zOGQ3NzU1MmIwMzUzNjg0YTIwOC5zdmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJwcmltZWljb25zLjQ3M2UyYTc0NmQzYzE1MWQ3ZGNhLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInByaW1laWNvbnMuNzFiYjNkNzlkY2YxOGI0NWFlODQud29mZlwiOyIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCl7XG4gICAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbn07XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQsIHBhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0LCBwYXJlbnQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEF0LmJlZm9yZSwgdGFyZ2V0KTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRpZihvcHRpb25zLmF0dHJzLm5vbmNlID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuXHRcdGlmIChub25jZSkge1xuXHRcdFx0b3B0aW9ucy5hdHRycy5ub25jZSA9IG5vbmNlO1xuXHRcdH1cblx0fVxuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGdldE5vbmNlKCkge1xuXHRpZiAodHlwZW9mIF9fd2VicGFja19ub25jZV9fID09PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIF9fd2VicGFja19ub25jZV9fO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCA/IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpIFxuXHRcdCA6IG9wdGlvbnMudHJhbnNmb3JtLmRlZmF1bHQob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsIlxuY29uc3QgQUNDT1JESU9OX0hFQURFUiA9ICdjZS1hY2NvcmRpb24taGVhZGluZyc7XG5jb25zdCBBQ0NPUkRJT05fUEFORUwgPSAnY2UtYWNjb3JkaW9uLXBhbmVsJztcblxuY29uc3QgS0VZQ09ERSA9IHtcbiAgRE9XTjogNDAsXG4gIExFRlQ6IDM3LFxuICBSSUdIVDogMzksXG4gIFVQOiAzOCxcbiAgSE9NRTogMzYsXG4gIEVORDogMzUsXG59O1xuXG5jb25zdCBhY2NvcmRpb25UZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5hY2NvcmRpb25UZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgIH1cbiAgICA6OnNsb3R0ZWQoLmFuaW1hdGluZykge1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdD48L3Nsb3Q+XG5gO1xuXG5leHBvcnQgY2xhc3MgQ2VBY2NvcmRpb24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKGFjY29yZGlvblRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIGN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKEFDQ09SRElPTl9IRUFERVIpLFxuICAgICAgY3VzdG9tRWxlbWVudHMud2hlbkRlZmluZWQoQUNDT1JESU9OX1BBTkVMKSxcbiAgICBdKVxuICAgICAgLnRoZW4oXyA9PiB7XG5cbiAgICAgICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLl9hbGxIZWFkaW5ncygpO1xuXG4gICAgICAgIGhlYWRpbmdzLmZvckVhY2goaGVhZGluZyA9PiB7XG4gICAgICAgICAgaGVhZGluZy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5fcGFuZWxGb3JIZWFkaW5nKGhlYWRpbmcpO1xuXG4gICAgICAgICAgaGVhZGluZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBwYW5lbC5pZCk7XG4gICAgICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCBoZWFkaW5nLmlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaGVhZGluZ3NbMF0uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuXG4gICAgICAgIGhlYWRpbmdzXG4gICAgICAgICAgLmZvckVhY2goaGVhZGluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuX3BhbmVsRm9ySGVhZGluZyhoZWFkaW5nKTtcbiAgICAgICAgICAgIGlmICghaGVhZGluZy5leHBhbmRlZCkge1xuICAgICAgICAgICAgICB0aGlzLl9jb2xsYXBzZUhlYWRpbmcoaGVhZGluZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbGxhcHNlUGFuZWwocGFuZWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fZXhwYW5kSGVhZGluZyhoZWFkaW5nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZXhwYW5kUGFuZWwocGFuZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX29uQ2hhbmdlKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICB9XG5cbiAgX2lzSGVhZGluZyhlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBBQ0NPUkRJT05fSEVBREVSO1xuICB9XG5cbiAgX29uQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy5fYW5pbWF0ZVBhbmVsRm9ySGVhZGluZyhldmVudC50YXJnZXQsIGV2ZW50LmRldGFpbC5pc0V4cGFuZGVkTm93KTtcbiAgfVxuXG4gIF9hbmltYXRlUGFuZWxGb3JIZWFkaW5nKGhlYWRpbmcsIGV4cGFuZCkge1xuIFxuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYW5pbWF0aW5nJykpIHJldHVybjtcblxuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5fcGFuZWxGb3JIZWFkaW5nKGhlYWRpbmcpO1xuICAgIGlmIChleHBhbmQpIHtcbiAgICAgIHRoaXMuX2V4cGFuZFBhbmVsKHBhbmVsKTtcbiAgICAgIHRoaXMuX2FuaW1hdGVJbihwYW5lbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FuaW1hdGVPdXQocGFuZWwpXG4gICAgICAgIC50aGVuKF8gPT4gdGhpcy5fY29sbGFwc2VQYW5lbChwYW5lbCkpO1xuICAgIH1cbiAgfVxuXG4gIF9vbktleURvd24oZXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50SGVhZGluZyA9IGV2ZW50LnRhcmdldDtcblxuICAgIGlmICghdGhpcy5faXNIZWFkaW5nKGN1cnJlbnRIZWFkaW5nKSkgcmV0dXJuO1xuXG4gICAgaWYgKGV2ZW50LmFsdEtleSkgcmV0dXJuO1xuXG4gICAgbGV0IG5ld0hlYWRpbmc7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIEtFWUNPREUuTEVGVDpcbiAgICAgIGNhc2UgS0VZQ09ERS5VUDpcbiAgICAgICAgbmV3SGVhZGluZyA9IHRoaXMuX3ByZXZIZWFkaW5nKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuUklHSFQ6XG4gICAgICBjYXNlIEtFWUNPREUuRE9XTjpcbiAgICAgICAgbmV3SGVhZGluZyA9IHRoaXMuX25leHRIZWFkaW5nKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuSE9NRTpcbiAgICAgICAgbmV3SGVhZGluZyA9IHRoaXMuX2ZpcnN0SGVhZGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkVORDpcbiAgICAgICAgbmV3SGVhZGluZyA9IHRoaXMuX2xhc3RIZWFkaW5nKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjdXJyZW50SGVhZGluZy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgIG5ld0hlYWRpbmcuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgIG5ld0hlYWRpbmcuZm9jdXMoKTtcbiAgfVxuXG4gIF9hbGxQYW5lbHMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5xdWVyeVNlbGVjdG9yQWxsKEFDQ09SRElPTl9QQU5FTCkpO1xuICB9XG5cbiAgX2FsbEhlYWRpbmdzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbChBQ0NPUkRJT05fSEVBREVSKSk7XG4gIH1cblxuICBfcGFuZWxGb3JIZWFkaW5nKGhlYWRpbmcpIHtcbiAgICBjb25zdCBuZXh0ID0gaGVhZGluZy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgaWYgKG5leHQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSBBQ0NPUkRJT05fUEFORUwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1NpYmxpbmcgZWxlbWVudCB0byBhIGhlYWRpbmcgbmVlZCB0byBiZSBhIHBhbmVsLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuXG4gIF9wcmV2SGVhZGluZygpIHtcbiAgICBjb25zdCBoZWFkaW5ncyA9IHRoaXMuX2FsbEhlYWRpbmdzKCk7XG5cbiAgICBsZXQgbmV3SWR4ID0gaGVhZGluZ3MuZmluZEluZGV4KGhlYWRpbmdzID0+IFxuICAgICAgICBoZWFkaW5ncyA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgLSAxO1xuXG4gICAgcmV0dXJuIGhlYWRpbmdzWyhuZXdJZHggKyBoZWFkaW5ncy5sZW5ndGgpICUgaGVhZGluZ3MubGVuZ3RoXTtcbiAgfVxuXG4gIF9uZXh0SGVhZGluZygpIHtcbiAgICBjb25zdCBoZWFkaW5ncyA9IHRoaXMuX2FsbEhlYWRpbmdzKCk7XG4gICAgbGV0IG5ld0lkeCA9IGhlYWRpbmdzLmZpbmRJbmRleChoZWFkaW5nID0+XG4gICAgICAgIGhlYWRpbmcgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICsgMTtcblxuICAgIHJldHVybiBoZWFkaW5nc1tuZXdJZHggJSBoZWFkaW5ncy5sZW5ndGhdO1xuICB9XG5cbiAgX2ZpcnN0SGVhZGluZygpIHtcbiAgICBjb25zdCBoZWFkaW5ncyA9IHRoaXMuX2FsbEhlYWRpbmdzKCk7XG4gICAgcmV0dXJuIGhlYWRpbmdzWzBdO1xuICB9XG5cbiAgX2xhc3RIZWFkaW5nKCkge1xuICAgIGNvbnN0IGhlYWRpbmdzID0gdGhpcy5fYWxsSGVhZGluZ3MoKTtcbiAgICByZXR1cm4gaGVhZGluZ3NbaGVhZGluZ3MubGVuZ3RoIC0gMV07XG4gIH1cblxuICBfZXhwYW5kUGFuZWwocGFuZWwpIHtcbiAgICBwYW5lbC5leHBhbmRlZCA9IHRydWU7XG4gIH1cblxuICBfY29sbGFwc2VQYW5lbChwYW5lbCkge1xuICAgIHBhbmVsLmV4cGFuZGVkID0gZmFsc2U7XG4gIH1cblxuICBfZXhwYW5kSGVhZGluZyhoZWFkaW5nKSB7XG4gICAgaGVhZGluZy5leHBhbmRlZCA9IHRydWU7XG4gIH1cblxuICBfY29sbGFwc2VIZWFkaW5nKGhlYWRpbmcpIHtcbiAgICBoZWFkaW5nLmV4cGFuZGVkID0gZmFsc2U7XG4gIH1cblxuICBfYW5pbWF0ZUluKHBhbmVsKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRlKHBhbmVsLCAtaGVpZ2h0LCAwKTtcbiAgfVxuXG4gIF9hbmltYXRlT3V0KHBhbmVsKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRlKHBhbmVsLCAwLCAtaGVpZ2h0KTtcbiAgfVxuXG4gIF9hbmltYXRlKHBhbmVsLCBzdGFydE9mZnNldCwgZW5kT2Zmc2V0KSB7XG5cbiAgICBpZiAoc3RhcnRPZmZzZXQgPT09IGVuZE9mZnNldClcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW5nJyk7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IEFycmF5LmZyb20odGhpcy5jaGlsZHJlbik7XG5cbiAgICBjb25zdCBpZHggPSBjaGlsZHJlbi5pbmRleE9mKHBhbmVsKTtcblxuICAgIGNvbnN0IGFuaW1hdGVkQ2hpbGRyZW4gPSBjaGlsZHJlbi5zbGljZShpZHgpO1xuICAgIHRoaXMuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgY2hpbGQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgY2hpbGQuc3R5bGUuekluZGV4ID0gMjtcbiAgICB9KTtcblxuICAgIGFuaW1hdGVkQ2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBjaGlsZC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICBjaGlsZC5zdHlsZS56SW5kZXggPSAxO1xuICAgICAgY2hpbGQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtzdGFydE9mZnNldH1weClgO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZVByb21pc2UoKVxuICAgICAgLnRoZW4oXyA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQcm9taXNlKCkpXG4gICAgICAudGhlbihfID0+IHtcbiAgICAgICAgYW5pbWF0ZWRDaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICBjaGlsZC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke2VuZE9mZnNldH1weClgO1xuICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGluZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHJhbnNpdGlvbkVuZFByb21pc2UocGFuZWwpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKF8gPT4ge1xuICAgICAgICBhbmltYXRlZENoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgIGNoaWxkLnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xuICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGluZycpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgY2hpbGQuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgICAgICAgICBjaGlsZC5zdHlsZS56SW5kZXggPSAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpbmcnKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmxldCBoZWFkaW5nSWRDb3VudGVyID0gMDtcblxuY29uc3QgYWNjb3JkaW9uSGVhZGluZ1RlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbmFjY29yZGlvbkhlYWRpbmdUZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCB7XG4gICAgICBjb250YWluOiBjb250ZW50O1xuICAgIH1cbiAgICBidXR0b24ge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbml0aWFsO1xuICAgICAgYm9yZGVyOiBpbml0aWFsO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBwYWRkaW5nOiAxMHB4OyBcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxidXR0b24+PHNsb3Q+PC9zbG90PjwvYnV0dG9uPlxuYDtcblxuZXhwb3J0IGNsYXNzIENlQWNjb3JkaW9uSGVhZGluZyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnZXhwYW5kZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9vbkNsaWNrID0gdGhpcy5fb25DbGljay5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe1xuICAgICAgbW9kZTogJ29wZW4nLFxuICAgICAgZGVsZWdhdGVzRm9jdXM6IHRydWUsXG4gICAgfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKFxuICAgICAgYWNjb3JkaW9uSGVhZGluZ1RlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXG4gICAgKTtcbiAgICB0aGlzLl9zaGFkb3dCdXR0b24gPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2hlYWRpbmcnKTtcbiAgICAgIFxuICAgIGlmICghdGhpcy5pZClcbiAgICAgIHRoaXMuaWQgPSBgJHtBQ0NPUkRJT05fSEVBREVSfS1nZW5lcmF0ZWQtJHtoZWFkaW5nSWRDb3VudGVyKyt9YDtcbiAgICB0aGlzLl9zaGFkb3dCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgICB0aGlzLl9zaGFkb3dCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLl9zaGFkb3dCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmhhc0F0dHJpYnV0ZSgnZXhwYW5kZWQnKTtcbiAgICB0aGlzLl9zaGFkb3dCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdmFsdWUpO1xuICB9XG5cbiAgZ2V0IGV4cGFuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnZXhwYW5kZWQnKTtcbiAgfVxuXG4gIHNldCBleHBhbmRlZCh2YWx1ZSkge1xuICAgIHZhbHVlID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKHZhbHVlKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2V4cGFuZGVkJywgJycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdleHBhbmRlZCcpO1xuICB9XG5cbiAgX29uQ2xpY2soKSB7XG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywge1xuICAgICAgICBkZXRhaWw6IHsgaXNFeHBhbmRlZE5vdzogdGhpcy5leHBhbmRlZCB9LFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG5cbmNvbnN0IGFjY29yZGlvblBhbmVsVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuYWNjb3JkaW9uUGFuZWxUZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCg6bm90KFtleHBhbmRlZF0pKSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxubGV0IHBhbmVsSWRDb3VudGVyID0gMDtcblxuZXhwb3J0IGNsYXNzIENlQWNjb3JkaW9uUGFuZWwgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKFxuICAgICAgYWNjb3JkaW9uUGFuZWxUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxuICAgICk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3JlZ2lvbicpO1xuICAgIGlmICghdGhpcy5pZClcbiAgICAgIHRoaXMuaWQgPSBgJHtBQ0NPUkRJT05fUEFORUx9LWdlbmVyYXRlZC0ke3BhbmVsSWRDb3VudGVyKyt9YDtcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2V4cGFuZGVkJyk7XG4gIH1cblxuICBzZXQgZXhwYW5kZWQodmFsKSB7XG4gICAgY29uc3QgdmFsdWUgPSBCb29sZWFuKHZhbCk7XG4gICAgaWYgKHZhbHVlKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2V4cGFuZGVkJywgJycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdleHBhbmRlZCcpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gdHJhbnNpdGlvbkVuZFByb21pc2UoZWxlbWVudCkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gZigpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGYpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVxdWVzdEFuaW1hdGlvbkZyYW1lUHJvbWlzZSgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmUpKTtcbn0iLCJcblxuY29uc3QgY2xhc3NNYXAgPSAoY2xhc3NPYmopID0+IHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGNsYXNzT2JqKS5maWx0ZXIoY2x6ID0+IGNsYXNzT2JqW2Nsel0pLmpvaW4oJyAnKTtcbn1cblxuY29uc3Qgc3R5bGVNYXAgPSAoc3R5bGVPYmopID0+IHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHN0eWxlT2JqKS5maWx0ZXIoc3R5bGUgPT4gc3R5bGVPYmpbc3R5bGVdKS5qb2luKCcgJyk7XG59XG5cbmV4cG9ydCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgc3RhdGljIGdldCBpcyAoKSB7XG4gICAgcmV0dXJuICdjZS1idXR0b24nO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMgKCkge1xuICAgIHJldHVybiBbJ2Rpc2FibGVkJywgJ2ljb24tcG9zJywgJ2ljb24nXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYXR0cmlidXRlU2V0dXAoKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIF9hdHRyaWJ1dGVTZXR1cCgpIHtcbiAgICB0aGlzLl9pY29uUG9zID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ljb24tcG9zJykgfHwgJ2xlZnQnO1xuICAgIHRoaXMuX2ljb25DbGFzcyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdpY29uJyk7XG4gICAgdGhpcy5faXNEaXNhYmxlZCA9IHRoaXMuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIHRoaXMuX2lzSWNvbk9ubHkgPSB0aGlzLmhhc0F0dHJpYnV0ZSgnaWNvbi1vbmx5Jyk7XG4gICAgdGhpcy5fc3R5bGVzID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgdGhpcy5fc3R5bGVDbGFzcyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xuICB9XG5cbiAgX3JlbmRlcigpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IGBcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtjbGFzc01hcCh7XG4gICAgICAgICd1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6dHJ1ZSxcbiAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWljb24tbGVmdCc6ICh0aGlzLl9pY29uUG9zID09PSAnbGVmdCcpLCBcbiAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWljb24tcmlnaHQnOiAodGhpcy5faWNvblBvcyA9PT0gJ3JpZ2h0JyksXG4gICAgICAgICd1aS1idXR0b24taWNvbi1vbmx5JzogdGhpcy5faXNJY29uT25seSxcbiAgICAgICAgJ3VpLXN0YXRlLWRpc2FibGVkJzogdGhpcy5faXNEaXNhYmxlZFxuICAgICAgfSl9XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiJHtjbGFzc01hcCh7XG4gICAgICAgICAgJ2pzLWljb24tdHlwZSc6IHRydWUsXG4gICAgICAgICAgJ3VpLWNsaWNrYWJsZSc6IHRydWUsXG4gICAgICAgICAgJ3VpLWJ1dHRvbi1pY29uLWxlZnQnOiAodGhpcy5faWNvblBvcyA9PT0gJ2xlZnQnKSwgXG4gICAgICAgICAgJ3VpLWJ1dHRvbi1pY29uLXJpZ2h0JzogKHRoaXMuX2ljb25Qb3MgPT09ICdyaWdodCcpXG4gICAgICAgIH0pfVwiPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidWktYnV0dG9uLXRleHQgdWktY2xpY2thYmxlXCI+JHt0aGlzLnRleHRDb250ZW50IHx8ICd1aS1idG4nfTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIGA7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjayAoKSB7XG5cbiAgICB0aGlzLiRpY29uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuanMtaWNvbi10eXBlJyk7XG4gICAgdGhpcy4kYnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcblxuICAgIGlmKHRoaXMuX2ljb25DbGFzcykge1xuICAgICAgdGhpcy4kaWNvbi5jbGFzc05hbWUgKz0gJyAnICsgdGhpcy5faWNvbkNsYXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRpY29uLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy4kaWNvbik7XG4gICAgfVxuXG4gICAgaWYodGhpcy5fc3R5bGVDbGFzcykge1xuICAgICAgdGhpcy4kYnV0dG9uLmNsYXNzTmFtZSArPSAnICcgKyB0aGlzLl9zdHlsZUNsYXNzO1xuICAgIH1cblxuICAgIGlmKHRoaXMuX3N0eWxlcykge1xuICAgICAgdGhpcy4kYnV0dG9uLnN0eWxlID0gdGhpcy5fc3R5bGVzO1xuICAgIH1cbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayAoYXR0ck5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmKGF0dHJOYW1lICYmIG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fYXR0cmlidXRlU2V0dXAoKTtcbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQnV0dG9uLmlzLCBCdXR0b24pOyIsIlxuLy8gY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi9jZS1jaGVja2JveC5zY3NzJyk7XG5cbmNvbnN0IEtFWUNPREUgPSB7XG4gIFNQQUNFOiAzMixcbn07XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgICA8c3R5bGU+XG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKCdhc3NldHMvY2hlY2tib3gvdW5jaGVja2VkLWNoZWNrYm94LnN2ZycpIG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgfVxuICAgICAgOmhvc3QoW2hpZGRlbl0pIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICAgIDpob3N0KFtjaGVja2VkXSkge1xuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoJ2Fzc2V0cy9jaGVja2JveC9jaGVja2VkLWNoZWNrYm94LnN2ZycpIG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgfVxuICAgICAgOmhvc3QoW2Rpc2FibGVkXSkge1xuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoJ2Fzc2V0cy9jaGVja2JveC91bmNoZWNrZWQtY2hlY2tib3gtZGlzYWJsZWQuc3ZnJykgbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICB9XG4gICAgICA6aG9zdChbY2hlY2tlZF1bZGlzYWJsZWRdKSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgnYXNzZXRzL2NoZWNrYm94L2NoZWNrZWQtY2hlY2tib3gtZGlzYWJsZWQuc3ZnJykgbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICB9ICAgICAgXG4gICAgPC9zdHlsZT5cbiAgYDtcblxuLy8gSElERVxuLy8gU2hhZHlDU1Mgd2lsbCByZW5hbWUgY2xhc3NlcyBhcyBuZWVkZWQgdG8gZW5zdXJlIHN0eWxlIHNjb3BpbmcuXG4vLyBTaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGUodGVtcGxhdGUsICdob3d0by1jaGVja2JveCcpO1xuLy8gL0hJREVcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VDaGVja2JveCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnY2hlY2tlZCcsICdkaXNhYmxlZCddO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdjaGVja2JveCcpO1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcblxuICAgIHRoaXMuX3VwZ3JhZGVQcm9wZXJ0eSgnY2hlY2tlZCcpO1xuICAgIHRoaXMuX3VwZ3JhZGVQcm9wZXJ0eSgnZGlzYWJsZWQnKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9vbktleVVwKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBfdXBncmFkZVByb3BlcnR5KHByb3ApIHtcbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgbGV0IHZhbHVlID0gdGhpc1twcm9wXTtcbiAgICAgIGRlbGV0ZSB0aGlzW3Byb3BdO1xuICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9vbktleVVwKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBzZXQgY2hlY2tlZCh2YWx1ZSkge1xuICAgIGNvbnN0IGlzQ2hlY2tlZCA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmIChpc0NoZWNrZWQpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICB9XG5cbiAgZ2V0IGNoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKGlzRGlzYWJsZWQpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGNvbnN0IGhhc1ZhbHVlID0gbmV3VmFsdWUgIT09IG51bGw7XG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdjaGVja2VkJzpcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtY2hlY2tlZCcsIGhhc1ZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgaGFzVmFsdWUpO1xuXG4gICAgICAgIGlmIChoYXNWYWx1ZSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgX29uS2V5VXAoZXZlbnQpIHtcblxuICAgIGlmIChldmVudC5hbHRLZXkpIHJldHVybjtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLlNQQUNFOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl90b2dnbGVDaGVja2VkKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIF9vbkNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5fdG9nZ2xlQ2hlY2tlZCgpO1xuICB9XG5cbiAgX3RvZ2dsZUNoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpXG4gICAgICByZXR1cm47XG4gICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjaGFuZ2UnLCB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgY2hlY2tlZDogdGhpcy5jaGVja2VkLFxuICAgICAgfSxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgfSkpO1xuICB9XG59XG4iLCJcblxuZXhwb3J0IGNsYXNzIFVpRXZlbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubmFtZSA9ICdSYWprZXNod2FyJztcbiAgICB0aGlzLmNpdHkgPSAnSHlkZXJhYmFkJztcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfID0+IHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gdGhpcy5fcmVuZGVyKCk7XG4gICAgICBjb25zb2xlLmxvZygnQ29uc3RydWN0b3IgZ2V0cyBjYWxsZWQnKTtcbiAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIF9yZW5kZXIgKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicGFyZW50XCI+XG4gICAgICAgIDxidXR0b24gQGNsaWNrPVwic2hvd05hbWVcIj5TaG93IE5hbWU8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93TmFtZVwiPkV2ZW50LCBOYW1lPC9idXR0b24+XG4gICAgICAgIDxzcGFuPiR7dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8YnV0dG9uIEBjbGljaz1cInNob3dDaXR5XCI+U2hvdyBDaXR5PC9idXR0b24+XG4gICAgICAgIDxoMz4ke3RoaXMuY2l0eX08L2gzPlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIHNob3dOYW1lIChldnQpIHtcbiAgICBjb25zb2xlLmxvZygnc2hvd05hbWU6ICcsIGV2dCk7XG4gICAgdGhpcy5uYW1lID0gZXZ0LnRhcmdldDtcbiAgfVxuXG4gIHNob3dDaXR5KGV2dCkge1xuICAgIGNvbnNvbGUubG9nKCdzaG93Q2l0eTogJywgZXZ0LnRhcmdldCk7XG4gICAgdGhpcy5jaXR5ID0gZXZ0LnRhcmdldDtcbiAgfVxuXG4gIF9hZGRFdmVudExpc3RlbmVycyAoKSB7XG4gICAgY29uc29sZS5sb2coJ2V2ZW50IGxpc3RlbmVycyBjYWxsZWQnKTtcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJyonKVxuICAgICAgLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgLmZpbHRlcihhdHRyID0+IC9eQC8udGVzdChhdHRyLm5hbWUpKVxuICAgICAgICAgIC5mb3JFYWNoKGF0dHIgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Rm4gPSBldmFsKHRoaXNbYXR0ci52YWx1ZV0pO1xuICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gYXR0ci5uYW1lLnJlcGxhY2UoL15ALywgJycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50TmFtZTogJywgZXZlbnROYW1lLCB0YXJnZXRGbik7XG5cbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldnQgPT4ge1xuICAgICAgICAgICAgICB0YXJnZXRGbi5hcHBseShlbCwgW2V2dF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gIH1cblxuICBfYmluZEV2ZW50cyAoKSB7XG4gICAgY29uc29sZS5sb2coYXR0ci5uYW1lLCBhdHRyLnZhbHVlKVxuICAgIGNvbnN0IGZ1bmN0aW9uQW5kUGFyYW1zID0gL14oW2EtekEtWl0rKVxcKCguKilcXCkvLmV4ZWMoYXR0ci52YWx1ZSk7XG4gICAgY29uc3QgZXZlbnROYW1lID0gYXR0ci5uYW1lLnJlcGxhY2UoL15ALywgJycpO1xuICAgIGNvbnN0IHRhcmdldEZuID0gZXZhbCh0aGlzW2Z1bmN0aW9uQW5kUGFyYW1zWzFdXSk7XG4gICAgY29uc3QgcGFyYW1zID0gZnVuY3Rpb25BbmRQYXJhbXNbMl0uc3BsaXQoLywvKTtcblxuICAgIGNvbnNvbGUubG9nKCdoZWxsby4uLi4uJywgZXZlbnROYW1lLCB0YXJnZXRGbiwgcGFyYW1zKTtcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnUnVubmluZyBjaGFuZ2UgZGV0ZWN0aW9uJyk7XG4gICAgICBpZihwYXJhbXNbMF0gPT09ICckZXZlbnQnKSB7XG4gICAgICAgIHRhcmdldEZuLmFwcGx5KGVsLCBbZXZ0LCAuLi5wYXJhbXNdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldEZuLmFwcGx5KGVsLCBbMSwgMl0pO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnVWlSb3V0ZXIgcm9ja3Mgbm93Jyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYXR0YWNoZWRDYWxsYmFjayBjYWxsZWQnKTtcbiAgfVxuXG59XG5cblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndWktZXZlbnQnLCBVaUV2ZW50KTsiLCIvKlxuICogQEF1dGhvcjogUmFqa2VzaHdhciBQcmFzYWQocmFqa2VzaHdhci5wZEBnbWFpbC5jb20pIFxuICogQERhdGU6IDIwMTktMDItMjMgMjM6MzA6MTEgXG4gKiBATGFzdCBNb2RpZmllZCBieTogUmFqa2VzaHdhciBQcmFzYWRcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTktMDMtMDIgMTk6Mjk6NDJcbiAqL1xuXG53aW5kb3cub25sb2FkID0gYmluZExpbmtzO1xuXG5cbmZ1bmN0aW9uIGJpbmRMaW5rcygpIHtcbiAgY29uc3QgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaHJlZl0nKTtcbiAgbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWphY2tMaW5rcykpIFxufVxuXG5mdW5jdGlvbiBoaWphY2tMaW5rcyhldnQpIHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHBhZ2UgPSBldnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gIF9sb2FkVmlldyhwYWdlKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRWaWV3IChwYWdlVXJsKSB7XG5cbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgeGhyLm9ubG9hZCA9IGV2dCA9PiB7XG4gICAgY29uc3QgbmV3RG9jID0gZXZ0LnRhcmdldC5yZXNwb25zZTtcbiAgICBjb25zdCByb3V0ZXJTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndWktcm91dGVyJyk7XG5cbiAgICByb3V0ZXJTbG90LmlubmVySFRNTCA9IG5ld0RvYztcbiAgICBcbiAgfTtcbiAgeGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgeGhyLm9wZW4oJ0dFVCcsIGBhcHAvJHtwYWdlVXJsfS9kZW1vLmh0bWxgKTtcbiAgeGhyLnNlbmQoKTtcbn0iLCJjb25zdCBLRVlDT0RFID0ge1xuICBET1dOOiA0MCxcbiAgTEVGVDogMzcsXG4gIFJJR0hUOiAzOSxcbiAgU1BBQ0U6IDMyLFxuICBVUDogMzgsXG4gIEhPTUU6IDM2LFxuICBFTkQ6IDM1LFxufTtcblxuY29uc3QgcmFkaW9CdXR0b25UZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5yYWRpb0J1dHRvblRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICB9XG4gIFxuICAgIDpob3N0KDpmb2N1cykge1xuICAgICAgb3V0bGluZTogMDtcbiAgICB9XG4gIFxuICAgIDpob3N0KDpmb2N1cyk6OmJlZm9yZSB7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMXB4IDJweCAjNUI5REQ5O1xuICAgIH1cbiAgXG4gICAgOmhvc3Q6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgd2lkdGg6IDEwcHg7XG4gICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGxlZnQ6IC0xOHB4O1xuICAgICAgdG9wOiAzcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgfVxuICBcbiAgICA6aG9zdChbYXJpYS1jaGVja2VkPVwidHJ1ZVwiXSk6OmJlZm9yZSB7XG4gICAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdD48L3Nsb3Q+XG5gO1xuXG5leHBvcnQgY2xhc3MgQ2VSYWRpb0J1dHRvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHJhZGlvQnV0dG9uVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdyYWRpbycpO1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gIH1cbn1cblxuY29uc3QgcmFkaW9Hcm91cFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnJhZGlvR3JvdXBUZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIENlUmFkaW9Hcm91cCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHJhZGlvR3JvdXBUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3JhZGlvZ3JvdXAnKTtcblxuICAgIGxldCBmaXJzdENoZWNrZWRCdXR0b24gPSB0aGlzLmNoZWNrZWRSYWRpb0J1dHRvbjtcbiAgICBpZiAoZmlyc3RDaGVja2VkQnV0dG9uKSB7XG4gICAgICB0aGlzLl91bmNoZWNrQWxsKCk7XG4gICAgICB0aGlzLl9jaGVja05vZGUoZmlyc3RDaGVja2VkQnV0dG9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGFzUm9sZVJhZGlvID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInJhZGlvXCJdJyk7XG4gICAgICBpZihoYXNSb2xlUmFkaW8pIFxuICAgICAgICBoYXNSb2xlUmFkaW8uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgIH1cblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBfb25LZXlEb3duKGUpIHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLlVQOlxuICAgICAgY2FzZSBLRVlDT0RFLkxFRlQ6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZFRvUHJldkJ1dHRvbigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkRPV046XG4gICAgICBjYXNlIEtFWUNPREUuUklHSFQ6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZFRvTmV4dEJ1dHRvbigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkhPTUU6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLmZpcnN0UmFkaW9CdXR0b24pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBLRVlDT0RFLkVORDpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9zZXRDaGVja2VkKHRoaXMubGFzdFJhZGlvQnV0dG9uKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5TUEFDRTpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaG93dG8tcmFkaW8tYnV0dG9uJylcbiAgICAgICAgICB0aGlzLl9zZXRDaGVja2VkKGUudGFyZ2V0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaGVja2VkUmFkaW9CdXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW2FyaWEtY2hlY2tlZD1cInRydWVcIl0nKTtcbiAgfVxuXG4gIGdldCBmaXJzdFJhZGlvQnV0dG9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwicmFkaW9cIl06Zmlyc3Qtb2YtdHlwZScpO1xuICB9XG5cbiAgZ2V0IGxhc3RSYWRpb0J1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInJhZGlvXCJdOmxhc3Qtb2YtdHlwZScpO1xuICB9XG5cbiAgX3ByZXZSYWRpb0J1dHRvbihub2RlKSB7XG4gICAgbGV0IHByZXYgPSBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgd2hpbGUgKHByZXYpIHtcbiAgICAgIGlmIChwcmV2LmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAncmFkaW8nKSB7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfVxuICAgICAgcHJldiA9IHByZXYucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBfbmV4dFJhZGlvQnV0dG9uKG5vZGUpIHtcbiAgICBsZXQgbmV4dCA9IG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBpZiAobmV4dC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3JhZGlvJykge1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH1cbiAgICAgIG5leHQgPSBuZXh0Lm5leHRFbGVtZW50U2libGluZztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBfc2V0Q2hlY2tlZFRvUHJldkJ1dHRvbigpIHtcbiAgICBsZXQgY2hlY2tlZEJ1dHRvbiA9IHRoaXMuY2hlY2tlZFJhZGlvQnV0dG9uIHx8IHRoaXMuZmlyc3RSYWRpb0J1dHRvbjtcbiAgICBpZiAoY2hlY2tlZEJ1dHRvbiA9PT0gdGhpcy5maXJzdFJhZGlvQnV0dG9uKSB7XG4gICAgICB0aGlzLl9zZXRDaGVja2VkKHRoaXMubGFzdFJhZGlvQnV0dG9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLl9wcmV2UmFkaW9CdXR0b24oY2hlY2tlZEJ1dHRvbikpO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRDaGVja2VkVG9OZXh0QnV0dG9uKCkge1xuICAgIGxldCBjaGVja2VkQnV0dG9uID0gdGhpcy5jaGVja2VkUmFkaW9CdXR0b24gfHwgdGhpcy5maXJzdFJhZGlvQnV0dG9uO1xuICAgIGlmIChjaGVja2VkQnV0dG9uID09PSB0aGlzLmxhc3RSYWRpb0J1dHRvbikge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZCh0aGlzLmZpcnN0UmFkaW9CdXR0b24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRDaGVja2VkKHRoaXMuX25leHRSYWRpb0J1dHRvbihjaGVja2VkQnV0dG9uKSk7XG4gICAgfVxuICB9XG5cbiAgX3NldENoZWNrZWQobm9kZSkge1xuICAgIHRoaXMuX3VuY2hlY2tBbGwoKTtcbiAgICB0aGlzLl9jaGVja05vZGUobm9kZSk7XG4gICAgdGhpcy5fZm9jdXNOb2RlKG5vZGUpO1xuICB9XG5cbiAgX3VuY2hlY2tBbGwoKSB7XG4gICAgY29uc3QgcmFkaW9CdXR0b25zID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInJhZGlvXCJdJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWRpb0J1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidG4gPSByYWRpb0J1dHRvbnNbaV07XG4gICAgICBidG4uc2V0QXR0cmlidXRlKCdhcmlhLWNoZWNrZWQnLCAnZmFsc2UnKTtcbiAgICAgIGJ0bi50YWJJbmRleCA9IC0xO1xuICAgIH1cbiAgfVxuXG4gIF9jaGVja05vZGUobm9kZSkge1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWNoZWNrZWQnLCAndHJ1ZScpO1xuICAgIG5vZGUudGFiSW5kZXggPSAwO1xuICB9XG5cbiAgX2ZvY3VzTm9kZShub2RlKSB7XG4gICAgbm9kZS5mb2N1cygpO1xuICB9XG5cbiAgX29uQ2xpY2soZSkge1xuICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3JhZGlvJykge1xuICAgICAgdGhpcy5fc2V0Q2hlY2tlZChlLnRhcmdldCk7XG4gICAgfVxuICB9XG59XG4iLCJcbmltcG9ydCBzdHlsZSBmcm9tICcuL3NsaWRlci5zY3NzJztcblxuZXhwb3J0IGNsYXNzIENlU2xpZGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgaXMoKSB7XG4gICAgcmV0dXJuICdjZS1zbGlkZXInO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnZGlzYWJsZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNsaWRlQ3VycmVudCA9IDA7XG4gICAgdGhpcy5zbGlkZXNUb3RhbCA9IDA7XG4gICAgdGhpcy5pbnRlcnZhbEFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgc3RhcnQ6IDAsXG4gICAgICBheGlzOiBcInhcIixcbiAgICAgIGJ1dHRvbnM6IHRydWUsXG4gICAgICBidWxsZXRzOiB0cnVlLFxuICAgICAgaW50ZXJ2YWw6IHRydWUsXG4gICAgICBpbnRlcnZhbFRpbWU6IDMwMDAsXG4gICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICBhbmltYXRpb25UaW1lOiAzMDAsXG4gICAgICBpbmZpbml0ZTogdHJ1ZVxuICAgIH07XG5cbiAgICB0aGlzLmlubmVySFRNTCA9IGBcbiAgICAgIDxzdHlsZT4ke3N0eWxlfTwvc3R5bGU+XG4gICAgICA8ZGl2IGlkPVwic2xpZGVyTmV3XCI+XG4gICAgICAgIDxhIGNsYXNzPVwiYnV0dG9ucyBwcmV2XCIgaHJlZj1cIiNcIj4mIzYwOzwvYT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdwb3J0XCI+XG4gICAgICAgICAgPHVsIGNsYXNzPVwib3ZlcnZpZXdcIj5cbiAgICAgICAgICAgIDxsaT48aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvcGljdHVyZTEuanBnXCIgLz48L2xpPlxuICAgICAgICAgICAgPGxpPjxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9waWN0dXJlMi5qcGdcIiAvPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL3BpY3R1cmUzLmpwZ1wiIC8+PC9saT5cbiAgICAgICAgICAgIDxsaT48aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvcGljdHVyZTQuanBnXCIgLz48L2xpPlxuICAgICAgICAgICAgPGxpPjxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9waWN0dXJlNS5qcGdcIiAvPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL3BpY3R1cmU2LmpwZ1wiIC8+PC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGEgY2xhc3M9XCJidXR0b25zIG5leHRcIiBocmVmPVwiI1wiPiYjNjI7PC9hPlxuICAgICAgICA8dWwgY2xhc3M9XCJidWxsZXRzXCI+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidWxsZXQgYWN0aXZlXCIgZGF0YS1zbGlkZT1cIjBcIj4xPC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidWxsZXRcIiBkYXRhLXNsaWRlPVwiMVwiPjI8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ1bGxldFwiIGRhdGEtc2xpZGU9XCIyXCI+MzwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnVsbGV0XCIgZGF0YS1zbGlkZT1cIjNcIj40PC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidWxsZXRcIiBkYXRhLXNsaWRlPVwiNFwiPjU8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ1bGxldFwiIGRhdGEtc2xpZGU9XCI1XCI+NjwvYT48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLiRjb250YWluZXIgPSAkKCcjc2xpZGVyTmV3Jyk7XG4gICAgdGhpcy4kdmlld3BvcnQgPSB0aGlzLiRjb250YWluZXIuZmluZChcIi52aWV3cG9ydDpmaXJzdFwiKTtcbiAgICB0aGlzLiRvdmVydmlldyA9IHRoaXMuJGNvbnRhaW5lci5maW5kKFwiLm92ZXJ2aWV3OmZpcnN0XCIpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRjb250YWluZXIuZmluZChcIi5uZXh0OmZpcnN0XCIpO1xuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRjb250YWluZXIuZmluZChcIi5wcmV2OmZpcnN0XCIpO1xuICAgIHRoaXMuJGJ1bGxldHMgPSB0aGlzLiRjb250YWluZXIuZmluZChcIi5idWxsZXRcIik7XG5cbiAgICB0aGlzLiRzbGlkZXMgPSBudWxsO1xuICAgIHRoaXMudmlld3BvcnRTaXplID0gMDtcbiAgICB0aGlzLmNvbnRlbnRTdHlsZSA9IHt9O1xuICAgIHRoaXMuc2xpZGVzVmlzaWJsZSA9IDA7XG4gICAgdGhpcy5zbGlkZVNpemUgPSAwO1xuICAgIHRoaXMuc2xpZGVJbmRleCA9IDA7XG4gICAgdGhpcy5pc0hvcml6b250YWwgPSB0cnVlO1xuICAgIHRoaXMuc2l6ZUxhYmVsID0gdGhpcy5pc0hvcml6b250YWwgPyBcIldpZHRoXCIgOiBcIkhlaWdodFwiO1xuICAgIHRoaXMucG9zaUxhYmVsID0gdGhpcy5pc0hvcml6b250YWwgPyBcImxlZnRcIiA6IFwidG9wXCI7XG4gICAgdGhpcy5pbnRlcnZhbFRpbWVyID0gbnVsbDtcblxuICAgIHRoaXMuX2luaXRpYWxpemUoKTtcbiAgfVxuXG4gIF9pbml0aWFsaXplKCkge1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHRoaXMuX21vdmUodGhpcy5zbGlkZUN1cnJlbnQpO1xuICAgIHRoaXMuX3NldEV2ZW50cygpO1xuICB9XG5cbiAgX3VwZGF0ZSgpIHtcbiAgICB0aGlzLiRvdmVydmlldy5maW5kKFwiLm1pcnJvcmVkXCIpLnJlbW92ZSgpO1xuXG4gICAgdGhpcy4kc2xpZGVzID0gdGhpcy4kb3ZlcnZpZXcuY2hpbGRyZW4oKTtcbiAgICBjb25zdCB2aWV3cG9ydFNpemUgPSB0aGlzLiR2aWV3cG9ydFswXVtcIm9mZnNldFwiICsgdGhpcy5zaXplTGFiZWxdO1xuICAgIHRoaXMuc2xpZGVTaXplID0gdGhpcy4kc2xpZGVzLmZpcnN0KClbXCJvdXRlclwiICsgdGhpcy5zaXplTGFiZWxdKHRydWUpO1xuICAgIHRoaXMuc2xpZGVzVG90YWwgPSB0aGlzLiRzbGlkZXMubGVuZ3RoO1xuICAgIHRoaXMuc2xpZGVDdXJyZW50ID0gdGhpcy5vcHRpb25zLnN0YXJ0IHx8IDA7XG4gICAgY29uc3Qgc2xpZGVzVmlzaWJsZSA9IE1hdGguY2VpbCh2aWV3cG9ydFNpemUgLyB0aGlzLnNsaWRlU2l6ZSk7XG5cbiAgICB0aGlzLiRvdmVydmlldy5hcHBlbmQodGhpcy4kc2xpZGVzLnNsaWNlKDAsIHNsaWRlc1Zpc2libGUpLmNsb25lKCkuYWRkQ2xhc3MoXCJtaXJyb3JlZFwiKSk7XG4gICAgdGhpcy4kb3ZlcnZpZXcuY3NzKHRoaXMuc2l6ZUxhYmVsLnRvTG93ZXJDYXNlKCksIHRoaXMuc2xpZGVTaXplICogKHRoaXMuc2xpZGVzVG90YWwgKyBzbGlkZXNWaXNpYmxlKSk7XG5cbiAgICB0aGlzLl9zZXRCdXR0b25zKCk7XG4gIH1cblxuICBfbW92ZShpbmRleCkge1xuICAgIGxldCBzbGlkZUluZGV4ID0gaXNOYU4oaW5kZXgpID8gdGhpcy5zbGlkZUN1cnJlbnQgOiBpbmRleDtcbiAgICB0aGlzLnNsaWRlQ3VycmVudCA9IHNsaWRlSW5kZXggJSB0aGlzLnNsaWRlc1RvdGFsO1xuXG4gICAgaWYgKHNsaWRlSW5kZXggPCAwKSB7XG4gICAgICB0aGlzLnNsaWRlQ3VycmVudCA9IHNsaWRlSW5kZXggPSB0aGlzLnNsaWRlc1RvdGFsIC0gMTtcbiAgICAgIHRoaXMuJG92ZXJ2aWV3LmNzcyh0aGlzLnBvc2lMYWJlbCwgLSh0aGlzLnNsaWRlc1RvdGFsKSAqIHRoaXMuc2xpZGVTaXplKTtcbiAgICB9XG5cbiAgICBpZiAoc2xpZGVJbmRleCA+IHRoaXMuc2xpZGVzVG90YWwpIHtcbiAgICAgIHRoaXMuc2xpZGVDdXJyZW50ID0gc2xpZGVJbmRleCA9IDE7XG4gICAgICB0aGlzLiRvdmVydmlldy5jc3ModGhpcy5wb3NpTGFiZWwsIDApO1xuICAgIH1cbiAgICB0aGlzLmNvbnRlbnRTdHlsZVt0aGlzLnBvc2lMYWJlbF0gPSAtc2xpZGVJbmRleCAqIHRoaXMuc2xpZGVTaXplO1xuXG4gICAgdGhpcy4kb3ZlcnZpZXcuYW5pbWF0ZSh0aGlzLmNvbnRlbnRTdHlsZSwge1xuICAgICAgcXVldWU6IGZhbHNlLFxuICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICBhbHdheXM6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnRyaWdnZXIoXCJtb3ZlXCIsIFt0aGlzLiRzbGlkZXNbdGhpcy5zbGlkZUN1cnJlbnRdLCB0aGlzLnNsaWRlQ3VycmVudF0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fc2V0QnV0dG9ucygpO1xuICAgIHRoaXMuX3N0YXJ0KCk7XG4gIH1cblxuICBfc2V0RXZlbnRzKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYnV0dG9ucykge1xuICAgICAgdGhpcy4kcHJldi5jbGljayhfID0+IHtcbiAgICAgICAgdGhpcy5fbW92ZSgtLXRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLiRuZXh0LmNsaWNrKF8gPT4ge1xuICAgICAgICB0aGlzLl9tb3ZlKCsrdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJCh3aW5kb3cpLnJlc2l6ZSh0aGlzLl91cGRhdGUpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5idWxsZXRzKSB7XG4gICAgICBjb25zdCBfX3NlbGYgPSB0aGlzO1xuICAgICAgdGhpcy4kY29udGFpbmVyLm9uKFwiY2xpY2tcIiwgXCIuYnVsbGV0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZTogJywgJCh0aGlzKS5hdHRyKFwiZGF0YS1zbGlkZVwiKSlcbiAgICAgICAgX19zZWxmLl9tb3ZlKF9fc2VsZi5zbGlkZUluZGV4ID0gKyQodGhpcykuYXR0cihcImRhdGEtc2xpZGVcIikpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcnZhbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWxUaW1lcik7XG5cbiAgICAgIHRoaXMuaW50ZXJ2YWxBY3RpdmUgPSB0cnVlO1xuXG4gICAgICB0aGlzLmludGVydmFsVGltZXIgPSBzZXRUaW1lb3V0KF8gPT4ge1xuICAgICAgICB0aGlzLl9tb3ZlKCsrdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbFRpbWUpO1xuICAgIH1cbiAgfVxuXG4gIF9zdG9wKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsVGltZXIpO1xuICAgIHRoaXMuaW50ZXJ2YWxBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIF9zZXRCdXR0b25zKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYnV0dG9ucyAmJiAhdGhpcy5vcHRpb25zLmluZmluaXRlKSB7XG4gICAgICB0aGlzLiRwcmV2LnRvZ2dsZUNsYXNzKFwiZGlzYWJsZVwiLCB0aGlzLnNsaWRlQ3VycmVudCA8PSAwKTtcbiAgICAgIHRoaXMuJG5leHQudG9nZ2xlQ2xhc3MoXCJkaXNhYmxlXCIsIHRoaXMuc2xpZGVDdXJyZW50ID49IHRoaXMuc2xpZGVzVG90YWwgLSB0aGlzLnNsaWRlc1Zpc2libGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYnVsbGV0cykge1xuICAgICAgdGhpcy4kYnVsbGV0cy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICQodGhpcy4kYnVsbGV0c1t0aGlzLnNsaWRlQ3VycmVudF0pLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ck5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXG4gIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2VTbGlkZXIuaXMsIENlU2xpZGVyKTsiLCJjb25zdCBzZXR0aW5ncyA9IHtcbiAgaXRlbTogMyxcbiAgYXV0b1dpZHRoOiBmYWxzZSxcbiAgc2xpZGVNb3ZlOiAxLFxuICBzbGlkZU1hcmdpbjogMTAsXG4gIGFkZENsYXNzOiAnJyxcbiAgbW9kZTogJ3NsaWRlJyxcbiAgdXNlQ1NTOiB0cnVlLFxuICBjc3NFYXNpbmc6ICdlYXNlJywgLy8nY3ViaWMtYmV6aWVyKDAuMjUsIDAsIDAuMjUsIDEpJyxcbiAgZWFzaW5nOiAnbGluZWFyJywgLy8nZm9yIGpxdWVyeSBhbmltYXRpb24nLC8vXG4gIHNwZWVkOiA0MDAsIC8vbXMnXG4gIGF1dG86IGZhbHNlLFxuICBwYXVzZU9uSG92ZXI6IGZhbHNlLFxuICBsb29wOiBmYWxzZSxcbiAgc2xpZGVFbmRBbmltYXRpb246IHRydWUsXG4gIHBhdXNlOiAyMDAwLFxuICBrZXlQcmVzczogZmFsc2UsXG4gIGNvbnRyb2xzOiB0cnVlLFxuICBwcmV2SHRtbDogJycsXG4gIG5leHRIdG1sOiAnJyxcbiAgcnRsOiBmYWxzZSxcbiAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICB2ZXJ0aWNhbDogZmFsc2UsXG4gIHZlcnRpY2FsSGVpZ2h0OiA1MDAsXG4gIHZUaHVtYldpZHRoOiAxMDAsXG4gIHRodW1iSXRlbTogMTAsXG4gIHBhZ2VyOiB0cnVlLFxuICBnYWxsZXJ5OiBmYWxzZSxcbiAgZ2FsbGVyeU1hcmdpbjogNSxcbiAgdGh1bWJNYXJnaW46IDUsXG4gIGN1cnJlbnRQYWdlclBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgZW5hYmxlVG91Y2g6IHRydWUsXG4gIGVuYWJsZURyYWc6IHRydWUsXG4gIGZyZWVNb3ZlOiB0cnVlLFxuICBzd2lwZVRocmVzaG9sZDogNDAsXG4gIHJlc3BvbnNpdmU6IFtdLFxuICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gIG9uQmVmb3JlU3RhcnQ6IGZ1bmN0aW9uICgkZWwpIHsgfSxcbiAgb25TbGlkZXJMb2FkOiBmdW5jdGlvbiAoJGVsKSB7IH0sXG4gIG9uQmVmb3JlU2xpZGU6IGZ1bmN0aW9uICgkZWwsIHNjZW5lKSB7IH0sXG4gIG9uQWZ0ZXJTbGlkZTogZnVuY3Rpb24gKCRlbCwgc2NlbmUpIHsgfSxcbiAgb25CZWZvcmVOZXh0U2xpZGU6IGZ1bmN0aW9uICgkZWwsIHNjZW5lKSB7IH0sXG4gIG9uQmVmb3JlUHJldlNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkgeyB9XG4gIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzOyIsIlxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2xpZGVyLWRlZmF1bHRzJztcblxuZXhwb3J0IGNsYXNzIEltYWdlU2xpZGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgaXMoKSB7XG4gICAgcmV0dXJuICdpbWFnZS1zbGlkZXInO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnZGlzYWJsZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gdGhpcy5pbm5lckhUTUwgPSB0aGlzLnJlbmRlcigpO1xuXG4gICAgdGhpcy53aW5kb3dXID0gd2luZG93Lm91dGVyV2lkdGg7XG4gICAgdGhpcy5icmVha3BvaW50ID0gbnVsbDtcbiAgICB0aGlzLnJlc3Bvc2l2ZU9iaiA9IG51bGw7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIHRoaXMudyA9IDA7XG4gICAgdGhpcy5vbiA9IGZhbHNlO1xuICAgIHRoaXMuZWxTaXplID0gMDtcbiAgICB0aGlzLiRzbGlkZSA9ICcnO1xuICAgIHRoaXMuc2NlbmUgPSAwO1xuICAgIHRoaXMucHJvcGVydHkgPSAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICAgIHRoaXMuZ3V0dGVyID0gKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSA/ICdtYXJnaW4tYm90dG9tJyA6ICdtYXJnaW4tcmlnaHQnO1xuICAgIHRoaXMuc2xpZGVWYWx1ZSA9IDA7XG4gICAgdGhpcy5wYWdlcldpZHRoID0gMDtcbiAgICB0aGlzLnNsaWRlV2lkdGggPSAwO1xuICAgIHRoaXMudGh1bWJXaWR0aCA9IDA7XG4gICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XG4gICAgdGhpcy5pc1RvdWNoID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cbiAgICB0aGlzLmxTU2xpZGVPdXRlciA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxTU2xpZGVPdXRlcicpO1xuICAgIHRoaXMubFNTbGlkZVdyYXBwZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5sU1NsaWRlV3JhcHBlcicpO1xuICAgIHRoaXMuJGVsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcjY29udGVudC1zbGlkZXIyJyk7XG4gICAgdGhpcy5sU1BhZ2VyID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubFNQYWdlcicpO1xuICAgIC8vIHRoaXMuJGNoaWxkcmVuID0gdGhpcy4kZWwuY2hpbGROb2RlcztcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoYFxuICAgICAgPGRpdiBjbGFzcz1cImxTU2xpZGVPdXRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibFNTbGlkZVdyYXBwZXIgdXNpbmdDc3NcIiBzdHlsZT1cInRyYW5zaXRpb24tZHVyYXRpb246IDBtcztcIj5cbiAgICAgICAgICA8dWwgaWQ9XCJjb250ZW50LXNsaWRlcjJcIiBjbGFzcz1cImNvbnRlbnQtc2xpZGVyIGxpZ2h0U2xpZGVyIGxTU2xpZGUgbHNHcmFiYmluZ1wiXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNjIwcHg7IGhlaWdodDogMTYycHg7IHBhZGRpbmctYm90dG9tOiAwJTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIj5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cImxzbGlkZSBhY3RpdmVcIiBzdHlsZT1cIndpZHRoOiAyNjBweDsgbWFyZ2luLXJpZ2h0OiAxMHB4O1wiPlxuICAgICAgICAgICAgICA8aDM+MTwvaDM+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwibHNsaWRlXCIgc3R5bGU9XCJ3aWR0aDogMjYwcHg7IG1hcmdpbi1yaWdodDogMTBweDtcIj5cbiAgICAgICAgICAgICAgPGgzPjI8L2gzPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cImxzbGlkZVwiIHN0eWxlPVwid2lkdGg6IDI2MHB4OyBtYXJnaW4tcmlnaHQ6IDEwcHg7XCI+XG4gICAgICAgICAgICAgIDxoMz4zPC9oMz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibFNBY3Rpb25cIj48YSBjbGFzcz1cImxTUHJldlwiPjwvYT48YSBjbGFzcz1cImxTTmV4dFwiPjwvYT48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx1bCBjbGFzcz1cImxTUGFnZXIgbFNwZ1wiIHN0eWxlPVwibWFyZ2luLXRvcDogNXB4O1wiPlxuICAgICAgICAgIDxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjXCI+MTwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPjI8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj4zPC9hPjwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICBgKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICQoXCIjY29udGVudC1zbGlkZXJcIikubGlnaHRTbGlkZXIoe1xuICAgICAgbG9vcDogZmFsc2UsXG4gICAgICBrZXlQcmVzczogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyTmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cbiAgfVxuXG4gIF9pbmxpbmVTdHlsZSgpIHtcblxuICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnZmFkZScpIHtcbiAgICAgIHNldHRpbmdzLmF1dG9XaWR0aCA9IGZhbHNlO1xuICAgICAgc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNldHRpbmdzLmF1dG8pIHtcbiAgICAgIHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGgpIHtcbiAgICAgIHNldHRpbmdzLnNsaWRlTW92ZSA9IDE7XG4gICAgICBzZXR0aW5ncy5pdGVtID0gMTtcbiAgICB9XG4gICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcbiAgICAgIHNldHRpbmdzLnNsaWRlTW92ZSA9IDE7XG4gICAgICBzZXR0aW5ncy5mcmVlTW92ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCkge1xuICAgICAgdGhpcy5sU1NsaWRlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd2ZXJ0aWNhbCcpO1xuICAgICAgdGhpcy5lbFNpemUgPSBzZXR0aW5ncy52ZXJ0aWNhbEhlaWdodDtcbiAgICAgIHRoaXMubFNTbGlkZVdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5lbFNpemV9cHhgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsU2l6ZSA9IHRoaXMuJGVsLm91dGVyV2lkdGg7XG4gICAgfVxuXG4gICAgdGhpcy4kZWwuY2hpbGROb2Rlcy5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5hZGQoJ2xzbGlkZScpKTtcbiAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAvLyBuZWVkIHRvIGhhbmRsZVxuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgLy8gcmVmcmVzaC5jYWxTVygpO1xuICAgICAgdGhpcy5fcmVmcmVzaGNhbFNXKCk7XG5cbiAgICAgIC8vIHJlZnJlc2guc1NXKCk7XG4gICAgICB0aGlzLl9yZWZyZXNoc1NXKCk7XG5cbiAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc2xpZGVWYWx1ZSA9IHRoaXMuX3NsaWRlVmFsdWUoKTtcbiAgICAgICAgdGhpcy5tb3ZlKCRlbCwgc2xpZGVWYWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc2V0SGVpZ2h0KCRlbCwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0SGVpZ2h0KCRlbCwgdHJ1ZSk7XG4gICAgICAkZWwuYWRkQ2xhc3MoJ2xTRmFkZScpO1xuICAgICAgaWYgKCF0aGlzLmRvQ3NzKCkpIHtcbiAgICAgICAgJGNoaWxkcmVuLmZhZGVPdXQoMCk7XG4gICAgICAgICRjaGlsZHJlbi5lcShzY2VuZSkuZmFkZUluKDApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAkY2hpbGRyZW4uZXEoc2NlbmUpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGNoaWxkcmVuLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cblxuICB9XG5cbiAgX21vdmUob2IsIHYpIHtcbiAgICBpZiAoc2V0dGluZ3MucnRsID09PSB0cnVlKSB7XG4gICAgICB2ID0gLXY7XG4gICAgfVxuICAgIGlmICh0aGlzLl9kb0NzcygpKSB7XG4gICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgb2Iuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKDBweCwgLSR7dn1weCwgMHB4KWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYi5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMHB4LCAtJHt2fXB4LCAwcHgsIDBweClgO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgb2IuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpLmFuaW1hdGUoe1xuICAgICAgICAgIHRvcDogLXYgKyAncHgnXG4gICAgICAgIH0sIHNldHRpbmdzLnNwZWVkLCBzZXR0aW5ncy5lYXNpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2IuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpLmFuaW1hdGUoe1xuICAgICAgICAgIGxlZnQ6IC12ICsgJ3B4J1xuICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCwgc2V0dGluZ3MuZWFzaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyICR0aHVtYiA9ICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpLmZpbmQoJ2xpJyk7XG4gICAgdGhpcy5hY3RpdmUoJHRodW1iLCB0cnVlKTtcbiAgfVxuXG4gIF9zbGlkZVZhbHVlKCkge1xuICAgIGxldCBfc1YgPSAwO1xuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICBfc1YgPSB0aGlzLnNjZW5lICogKCh0aGlzLnNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfc1YgPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNjZW5lOyBpKyspIHtcbiAgICAgICAgX3NWICs9IHBhcnNlSW50KHRoaXMuJGVsLmNoaWxkTm9kZXNbaV0ud2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfc1Y7XG4gIH1cblxuICBfcmVmcmVzaHNTVyAoKSB7XG5cbiAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgLy8gJGNoaWxkcmVuLmNzcyhwcm9wZXJ0eSwgc2xpZGVXaWR0aCArICdweCcpO1xuICAgICAgdGhpcy4kZWwuY2hpbGROb2Rlcy5mb3JFYWNoKGVsID0+IGVsLnN0eWxlW3RoaXMucHJvcGVydHldID0gYCR7dGhpcy5zbGlkZVdpZHRofXB4YCk7XG4gICAgfVxuICAgIC8vICRjaGlsZHJlbi5jc3MoZ3V0dGVyLCBzZXR0aW5ncy5zbGlkZU1hcmdpbiArICdweCcpO1xuICAgIHRoaXMuJGVsLmNoaWxkTm9kZXMuZm9yRWFjaChlbCA9PiBlbC5zdHlsZVt0aGlzLmd1dHRlcl0gPSBgJHtzZXR0aW5ncy5zbGlkZU1hcmdpbn1weGApO1xuXG4gICAgdyA9IHRoaXMuX2NhbFdpZHRoKGZhbHNlKTtcbiAgICAvLyAkZWwuY3NzKHByb3BlcnR5LCB3ICsgJ3B4Jyk7XG4gICAgdGhpcy4kZWwuc3R5bGVbcHJvcGVydHldID0gYCR7d31weGA7XG4gICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgaWYgKHRoaXMub24gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuY2xvbmUubGVmdCcpLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZG9Dc3MoKSkge1xuICAgICAgdGhpcy5sU1NsaWRlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd1c2luZ0NzcycpO1xuICAgIH1cbiAgfVxuXG4gIF9yZWZyZXNoY2FsU1cgKCkge1xuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNsaWRlV2lkdGggPSAodGhpcy5lbFNpemUgLSAoKHNldHRpbmdzLml0ZW0gKiAoc2V0dGluZ3Muc2xpZGVNYXJnaW4pKSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luKSkgLyBzZXR0aW5ncy5pdGVtO1xuICAgIH1cbiAgfVxuXG4gIF9kb0NzcygpIHtcbiAgICBjb25zdCBzdXBwb3J0ID0gKCkgPT4ge1xuICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IFsndHJhbnNpdGlvbicsICdNb3pUcmFuc2l0aW9uJywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nLCAnbXNUcmFuc2l0aW9uJywgJ0todG1sVHJhbnNpdGlvbiddO1xuICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhbnNpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHJhbnNpdGlvbltpXSBpbiByb290LnN0eWxlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHNldHRpbmdzLnVzZUNTUyAmJiBzdXBwb3J0KCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG4gIF9jYWxXaWR0aCAoY2xuKSB7XG4gICAgdmFyIGxuID0gY2xuID09PSB0cnVlID8gJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGggOiAkY2hpbGRyZW4ubGVuZ3RoO1xuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICB3ID0gbG4gKiAoc2xpZGVXaWR0aCArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdyA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxuOyBpKyspIHtcbiAgICAgICAgdyArPSAocGFyc2VJbnQoJGNoaWxkcmVuLmVxKGkpLndpZHRoKCkpICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdztcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoSW1hZ2VTbGlkZXIuaXMsIEltYWdlU2xpZGVyKTsiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vc2xpZGVyLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3NsaWRlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vc2xpZGVyLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vc3R5bGVzLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3N0eWxlcy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vc3R5bGVzLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbmNvbnN0IEtFWUNPREUgPSB7XG4gIERPV046IDQwLFxuICBMRUZUOiAzNyxcbiAgUklHSFQ6IDM5LFxuICBVUDogMzgsXG4gIEhPTUU6IDM2LFxuICBFTkQ6IDM1LFxufTtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICB9XG4gICAgOjpzbG90dGVkKGNlLXRhYi1wYW5lbCkge1xuICAgICAgZmxleC1iYXNpczogMTAwJTtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxzbG90IG5hbWU9XCJ0YWJcIj48L3Nsb3Q+XG4gIDxzbG90IG5hbWU9XCJwYW5lbFwiPjwvc2xvdD5cbmA7XG5cbmV4cG9ydCBjbGFzcyBDZVRhYnMgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9vblNsb3RDaGFuZ2UgPSB0aGlzLl9vblNsb3RDaGFuZ2UuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgdGhpcy5fdGFiU2xvdCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdzbG90W25hbWU9dGFiXScpO1xuICAgIHRoaXMuX3BhbmVsU2xvdCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdzbG90W25hbWU9cGFuZWxdJyk7XG5cbiAgICB0aGlzLl90YWJTbG90LmFkZEV2ZW50TGlzdGVuZXIoJ3Nsb3RjaGFuZ2UnLCB0aGlzLl9vblNsb3RDaGFuZ2UpO1xuICAgIHRoaXMuX3BhbmVsU2xvdC5hZGRFdmVudExpc3RlbmVyKCdzbG90Y2hhbmdlJywgdGhpcy5fb25TbG90Q2hhbmdlKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdyb2xlJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJsaXN0Jyk7XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZCgnY2UtdGFiJyksXG4gICAgICBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZCgnY2UtdGFiLXBhbmVsJyksXG4gICAgXSlcbiAgICAudGhlbihfID0+IHRoaXMuX2xpbmtQYW5lbHMoKSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIF9vblNsb3RDaGFuZ2UoKSB7XG4gICAgdGhpcy5fbGlua1BhbmVscygpO1xuICB9XG5cbiAgX2xpbmtQYW5lbHMoKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuX2FsbFRhYnMoKTtcbiAgICB0YWJzLmZvckVhY2godGFiID0+IHtcbiAgICAgIGNvbnN0IHBhbmVsID0gdGFiLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIGlmIChwYW5lbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdjZS10YWItcGFuZWwnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFRhYiAjJHt0YWIuaWR9IGlzIG5vdCBhIHNpYmxpbmcgb2YgYSA8Y2UtdGFiLXBhbmVsPmApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBwYW5lbC5pZCk7XG4gICAgICBwYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIHRhYi5pZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZFRhYiA9IHRhYnMuZmluZCh0YWIgPT4gdGFiLnNlbGVjdGVkKSB8fCB0YWJzWzBdO1xuXG4gICAgdGhpcy5fc2VsZWN0VGFiKHNlbGVjdGVkVGFiKTtcbiAgfVxuXG4gIF9hbGxQYW5lbHMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdjZS10YWItcGFuZWwnKSk7XG4gIH1cblxuICBfYWxsVGFicygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NlLXRhYicpKTtcbiAgfVxuXG4gIF9wYW5lbEZvclRhYih0YWIpIHtcbiAgICBjb25zdCBwYW5lbElkID0gdGFiLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoYCMke3BhbmVsSWR9YCk7XG4gIH1cblxuICBfcHJldlRhYigpIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy5fYWxsVGFicygpO1xuICAgIGxldCBuZXdJZHggPSB0YWJzLmZpbmRJbmRleCh0YWIgPT4gdGFiLnNlbGVjdGVkKSAtIDE7XG4gICAgcmV0dXJuIHRhYnNbKG5ld0lkeCArIHRhYnMubGVuZ3RoKSAlIHRhYnMubGVuZ3RoXTtcbiAgfVxuXG4gIF9maXJzdFRhYigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsVGFicygpWzBdO1xuICB9XG5cbiAgX2xhc3RUYWIoKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuX2FsbFRhYnMoKTtcbiAgICByZXR1cm4gdGFic1t0YWJzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgX25leHRUYWIoKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuX2FsbFRhYnMoKTtcbiAgICBsZXQgbmV3SWR4ID0gdGFicy5maW5kSW5kZXgodGFiID0+IHRhYi5zZWxlY3RlZCkgKyAxO1xuICAgIHJldHVybiB0YWJzW25ld0lkeCAlIHRhYnMubGVuZ3RoXTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLl9hbGxUYWJzKCk7XG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5fYWxsUGFuZWxzKCk7XG5cbiAgICB0YWJzLmZvckVhY2godGFiID0+IHRhYi5zZWxlY3RlZCA9IGZhbHNlKTtcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiBwYW5lbC5oaWRkZW4gPSB0cnVlKTtcbiAgfVxuXG4gIF9zZWxlY3RUYWIobmV3VGFiKSB7XG5cbiAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICBjb25zdCBuZXdQYW5lbCA9IHRoaXMuX3BhbmVsRm9yVGFiKG5ld1RhYik7XG5cbiAgICBpZiAoIW5ld1BhbmVsKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBwYW5lbCB3aXRoIGlkICR7bmV3UGFuZWxJZH1gKTtcbiAgICBuZXdUYWIuc2VsZWN0ZWQgPSB0cnVlO1xuICAgIG5ld1BhbmVsLmhpZGRlbiA9IGZhbHNlO1xuICAgIG5ld1RhYi5mb2N1cygpO1xuICB9XG5cbiAgX29uS2V5RG93bihldmVudCkge1xuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSAhPT0gJ3RhYicpIHJldHVybjtcbiAgICBpZiAoZXZlbnQuYWx0S2V5KSByZXR1cm47XG5cbiAgICBsZXQgbmV3VGFiO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLkxFRlQ6XG4gICAgICBjYXNlIEtFWUNPREUuVVA6XG4gICAgICAgIG5ld1RhYiA9IHRoaXMuX3ByZXZUYWIoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5SSUdIVDpcbiAgICAgIGNhc2UgS0VZQ09ERS5ET1dOOlxuICAgICAgICBuZXdUYWIgPSB0aGlzLl9uZXh0VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtFWUNPREUuSE9NRTpcbiAgICAgICAgbmV3VGFiID0gdGhpcy5fZmlyc3RUYWIoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgS0VZQ09ERS5FTkQ6XG4gICAgICAgIG5ld1RhYiA9IHRoaXMuX2xhc3RUYWIoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5fc2VsZWN0VGFiKG5ld1RhYik7XG4gIH1cblxuICBfb25DbGljayhldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdyb2xlJykgIT09ICd0YWInKSByZXR1cm47XG4gICAgdGhpcy5fc2VsZWN0VGFiKGV2ZW50LnRhcmdldCk7XG4gIH1cbn1cblxubGV0IGNlVGFiQ291bnRlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDZVRhYiBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnc2VsZWN0ZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcbiAgICBpZiAoIXRoaXMuaWQpXG4gICAgICB0aGlzLmlkID0gYGNlLXRhYi1nZW5lcmF0ZWQtJHtjZVRhYkNvdW50ZXIrK31gO1xuXG4gICAgLy8gU2V0IGEgd2VsbC1kZWZpbmVkIGluaXRpYWwgc3RhdGUuXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gICAgdGhpcy5fdXBncmFkZVByb3BlcnR5KCdzZWxlY3RlZCcpO1xuICB9XG5cbiAgX3VwZ3JhZGVQcm9wZXJ0eShwcm9wKSB7XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXNbcHJvcF07XG4gICAgICBkZWxldGUgdGhpc1twcm9wXTtcbiAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHZhbHVlKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCB2YWx1ZSA/IDAgOiAtMSk7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWQodmFsdWUpIHtcbiAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmICh2YWx1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gIH1cbn1cblxubGV0IGNlUGFuZWxDb3VudGVyID0gMDtcblxuZXhwb3J0IGNsYXNzIENlVGFiUGFuZWwgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIGlmICghdGhpcy5pZClcbiAgICAgIHRoaXMuaWQgPSBgY2UtcGFuZWwtZ2VuZXJhdGVkLSR7Y2VQYW5lbENvdW50ZXIrK31gO1xuICB9XG59IiwiXG5jb25zdCBLRVlDT0RFID0ge1xuICBTUEFDRTogMzIsXG4gIEVOVEVSOiAxMyxcbn07XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG4gICAgOmhvc3QoW2hpZGRlbl0pIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2xvdD48L3Nsb3Q+XG5gO1xuXG5leHBvcnQgY2xhc3MgQ2VUb2dnbGVCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3ByZXNzZWQnLCAnZGlzYWJsZWQnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuXG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgJ2ZhbHNlJyk7XG5cbiAgICB0aGlzLl91cGdyYWRlUHJvcGVydHkoJ3ByZXNzZWQnKTtcbiAgICB0aGlzLl91cGdyYWRlUHJvcGVydHkoJ2Rpc2FibGVkJyk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIF91cGdyYWRlUHJvcGVydHkocHJvcCkge1xuICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzW3Byb3BdO1xuICAgICAgZGVsZXRlIHRoaXNbcHJvcF07XG4gICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBzZXQgcHJlc3NlZCh2YWx1ZSkge1xuICAgIGNvbnN0IGlzUHJlc3NlZCA9IEJvb2xlYW4odmFsdWUpO1xuICAgIGlmIChpc1ByZXNzZWQpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncHJlc3NlZCcsICcnKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncHJlc3NlZCcpO1xuICB9XG5cbiAgZ2V0IHByZXNzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdwcmVzc2VkJyk7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKGlzRGlzYWJsZWQpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGNvbnN0IGhhc1ZhbHVlID0gbmV3VmFsdWUgIT09IG51bGw7XG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdwcmVzc2VkJzpcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIGhhc1ZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgaGFzVmFsdWUpO1xuICAgICAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIF9vbktleURvd24oZXZlbnQpIHtcblxuICAgIGlmIChldmVudC5hbHRLZXkpIHJldHVybjtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBLRVlDT0RFLlNQQUNFOlxuICAgICAgY2FzZSBLRVlDT0RFLkVOVEVSOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl90b2dnbGVQcmVzc2VkKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgX29uQ2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLl90b2dnbGVQcmVzc2VkKCk7XG4gIH1cblxuICBfdG9nZ2xlUHJlc3NlZCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgIHRoaXMucHJlc3NlZCA9ICF0aGlzLnByZXNzZWQ7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHByZXNzZWQ6IHRoaXMucHJlc3NlZCxcbiAgICAgIH0sXG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgIH0pKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENlVG9vbHRpcCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3Nob3cgPSB0aGlzLl9zaG93LmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGlkZSA9IHRoaXMuX2hpZGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3Rvb2x0aXAnKTtcblxuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG5cbiAgICB0aGlzLl9oaWRlKCk7XG5cbiAgICB0aGlzLl90YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1kZXNjcmliZWRieT0nICsgdGhpcy5pZCArICddJyk7XG5cbiAgICBpZiAoIXRoaXMuX3RhcmdldCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fc2hvdyk7XG4gICAgdGhpcy5fdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9oaWRlKTtcbiAgICB0aGlzLl90YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX3Nob3cpO1xuICAgIHRoaXMuX3RhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5faGlkZSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcblxuICAgIGlmICghdGhpcy5fdGFyZ2V0KSByZXR1cm47XG5cbiAgICB0aGlzLl90YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9zaG93KTtcbiAgICB0aGlzLl90YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX2hpZGUpO1xuICAgIHRoaXMuX3RhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fc2hvdyk7XG4gICAgdGhpcy5fdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9oaWRlKTtcbiAgICB0aGlzLl90YXJnZXQgPSBudWxsO1xuICB9XG5cbiAgX3Nob3coKSB7XG4gICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgfVxuXG4gIF9oaWRlKCkge1xuICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgfVxufVxuIiwiXG5cbmNvbnN0IFRyZWVEYXRhID0ge1xuICBcInBhdGhcIjogXCIuL2RvY3NcIixcbiAgXCJuYW1lXCI6IFwiZG9jc1wiLFxuICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2FuZ3VsYXJcIixcbiAgICAgIFwibmFtZVwiOiBcImFuZ3VsYXJcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvYW5ndWxhci9icm9hZGNhc3Rlci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImJyb2FkY2FzdGVyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvYW5ndWxhci9kZWJvdW5jZS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImRlYm91bmNlLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvYW5ndWxhci9odHRwLWludGVyY2VwdG9yLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiaHR0cC1pbnRlcmNlcHRvci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvY2xhc3MubWRcIixcbiAgICAgIFwibmFtZVwiOiBcImNsYXNzLm1kXCIsXG4gICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHNcIixcbiAgICAgIFwibmFtZVwiOiBcImNzczMtY29tcG9uZW50c1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvYXJyb3cubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJhcnJvdy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9ib3gtc2hhZG93Lm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiYm94LXNoYWRvdy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9jaGVja2JveC5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImNoZWNrYm94Lm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzL21hdC1ib3gtc2hhZG93Lm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwibWF0LWJveC1zaGFkb3cubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9jc3MzLWNvbXBvbmVudHMvbW9kYWwubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJtb2RhbC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9yYW5nZS1zZWxlY3Rvci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInJhbmdlLXNlbGVjdG9yLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvY3NzMy1jb21wb25lbnRzL3Jlc3BvbnNpdmUtbWVudS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInJlc3BvbnNpdmUtbWVudS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy9zdGVwLXByb2dyZXNzLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwic3RlcC1wcm9ncmVzcy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy90b2dnbGUtc3dpdGNoLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwidG9nZ2xlLXN3aXRjaC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2NzczMtY29tcG9uZW50cy92ZXJ0aWNhbC1ub3RpZmljYXRpb24tYmFyLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwidmVydGljYWwtbm90aWZpY2F0aW9uLWJhci5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tXCIsXG4gICAgICBcIm5hbWVcIjogXCJkb21cIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZG9tL2RvbS1oYW5kbGVyLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZG9tLWhhbmRsZXIubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kb20vZG9tLW9wZXJhdGlvbnMubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJkb20tb3BlcmF0aW9ucy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2RvbS9kb20tdXRpbHMubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJkb20tdXRpbHMubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kb20vc2Nyb2xsLXRhYmxlLWNvbHVtbi5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInNjcm9sbC10YWJsZS1jb2x1bW4ubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kb20vc2Nyb2xsYWJsZS1zaWRlYmFyLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwic2Nyb2xsYWJsZS1zaWRlYmFyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9kc1wiLFxuICAgICAgXCJuYW1lXCI6IFwiZHNcIixcbiAgICAgIFwidHlwZVwiOiBcImZvbGRlclwiLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZHMvbGlua2VkLWxpc3QubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJsaW5rZWQtbGlzdC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvZmlsZS0zLm1kXCIsXG4gICAgICBcIm5hbWVcIjogXCJmaWxlLTMubWRcIixcbiAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2ZvbGRlci0xXCIsXG4gICAgICBcIm5hbWVcIjogXCJmb2xkZXItMVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9mb2xkZXItMS9maWxlLTEuMS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImZpbGUtMS4xLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvZm9sZGVyLTEvZmlsZS0xLjIubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJmaWxlLTEuMi5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvbGludXhcIixcbiAgICAgIFwibmFtZVwiOiBcImxpbnV4XCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL2xpbnV4L3NzaC5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcInNzaC5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvbWlzY1wiLFxuICAgICAgXCJuYW1lXCI6IFwibWlzY1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9taXNjL2NvcnBvcmF0ZS1wcm94eS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImNvcnBvcmF0ZS1wcm94eS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21pc2MvZ2l0LWNvbW1hbmRzLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZ2l0LWNvbW1hbmRzLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhdGhcIjogXCIuL2RvY3MvbWlzYy9qZWt5bGwubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJqZWt5bGwubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9taXNjL2ppcmEtaXNzdWUtZmlsdGVyLm1kXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiamlyYS1pc3N1ZS1maWx0ZXIubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21vYmlsZVwiLFxuICAgICAgXCJuYW1lXCI6IFwibW9iaWxlXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL21vYmlsZS9yZWFjdC1uYXRpdmUubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJyZWFjdC1uYXRpdmUubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3BocFwiLFxuICAgICAgXCJuYW1lXCI6IFwicGhwXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3BocC9jb21wb3Nlci5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImNvbXBvc2VyLm1kXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9yZWFjdC1uYXRpdmVcIixcbiAgICAgIFwibmFtZVwiOiBcInJlYWN0LW5hdGl2ZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9yZWFjdC1uYXRpdmUvYmFzaWMubWRcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJiYXNpYy5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3MvcmVnZXhcIixcbiAgICAgIFwibmFtZVwiOiBcInJlZ2V4XCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3JlZ2V4L2NhbWVsY2FzZS5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImNhbWVsY2FzZS5tZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImZpbGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInBhdGhcIjogXCIuL2RvY3Mvcm9oaXQubWRcIixcbiAgICAgIFwibmFtZVwiOiBcInJvaGl0Lm1kXCIsXG4gICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicGF0aFwiOiBcIi4vZG9jcy9zY3NzXCIsXG4gICAgICBcIm5hbWVcIjogXCJzY3NzXCIsXG4gICAgICBcInR5cGVcIjogXCJmb2xkZXJcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3Njc3MvYm94LXNoYWRvdy5tZFwiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImJveC1zaGFkb3cubWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJwYXRoXCI6IFwiLi9kb2NzL3ZlbmthdC5tZFwiLFxuICAgICAgXCJuYW1lXCI6IFwidmVua2F0Lm1kXCIsXG4gICAgICBcInR5cGVcIjogXCJmaWxlXCJcbiAgICB9XG4gIF1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUcmVlRGF0YTsiLCJcblxuaW1wb3J0IHN0eWxlIGZyb20gJy4vdHJlZS5zY3NzJztcbmltcG9ydCBUcmVlRGF0YSBmcm9tICcuL3RyZWUtZGF0YSc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgaXMgKCkge1xuICAgIHJldHVybiAnY2UtdHJlZS12aWV3JztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzICgpIHtcbiAgICByZXR1cm4gWydkaXNhYmxlZCddO1xuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBgXG4gICAgICA8c3R5bGU+JHtzdHlsZX08L3N0eWxlPlxuICAgICAgJHt0aGlzLl9yZW5kZXJUcmVlKFtUcmVlRGF0YV0pfVxuICAgIGA7XG4gIH1cblxuICBfcmVuZGVyVHJlZSAoZGF0YSkge1xuICAgIHJldHVybiB0aGlzLmJ1aWxkTm9kZShkYXRhKTtcbiAgfVxuXG4gIGJ1aWxkTm9kZSAoZGF0YSkgeyBcbiAgICByZXR1cm4gKGBcbiAgICAgIDx1bCBjbGFzcz1cImNlLXRyZWUtY29udGVudFwiIGNlLXRyZWU9XCJcIj5cbiAgICAgICAgJHtkYXRhLnJlZHVjZSgodCwgZCkgPT4ge1xuICAgICAgICAgIHQgKz0gKGBcbiAgICAgICAgICAgIDxsaSBjZS1mb2xkZXIgY2xhc3M9XCJjZS10cmVlLWZvbGRlclwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImNlLXRyZWUtaWNvblwiIGRhdGEtdHlwZT1cIiR7ZC50eXBlfVwiPjwvaT5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjZS10cmVlLWl0ZW0tbmFtZVwiPiR7ZC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgJHtkLmNoaWxkcmVuID8gdGhpcy5idWlsZE5vZGUoZC5jaGlsZHJlbikgOiAnJ31cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgYCk7XG4gICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgIH0sICcnKX1cbiAgICAgIDwvdWw+XG4gICAgYCk7XG4gIH0gXG5cbiAgY29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuICAgIGNvbnN0IGZvbGRlcnMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjZS1mb2xkZXJdJyk7XG4gICAgQXJyYXkuZnJvbShmb2xkZXJzKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHRoaXMuaGFuZGxlQ2xpY2soZXZ0LCBlbCkpXG4gICAgfSk7XG5cbiAgICAvLyBFeHBhbmQgdGhlIHZlcnkgZmlyc3QgZm9sZGVyXG4gICAgZm9sZGVyc1swXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGV2dCwgZWwpIHtcbiAgICBsZXQgaXNFeHBhbmRlZCA9IGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpO1xuICAgIGlmKGlzRXhwYW5kZWQgPT09ICd0cnVlJykge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcbiAgICB9XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuICAgIGNvbnN0IGZvbGRlcnMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjZS1mb2xkZXJdJyk7XG4gICAgQXJyYXkuZnJvbShmb2xkZXJzKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHRoaXMuaGFuZGxlQ2xpY2soZXZ0LCBlbCkpXG4gICAgfSk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFRyZWUuaXMsIFRyZWUpO1xuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtMiEuL3RyZWUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vdHJlZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC0yIS4vdHJlZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiLypcbiAqIEBBdXRob3I6IFJhamtlc2h3YXIgUHJhc2FkKHJhamtlc2h3YXIucGRAZ21haWwuY29tKSBcbiAqIEBEYXRlOiAyMDE5LTAyLTIzIDIzOjAwOjQyIFxuICogQExhc3QgTW9kaWZpZWQgYnk6IFJhamtlc2h3YXIgUHJhc2FkXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE5LTAzLTE4IDE5OjQwOjM4XG4gKi9cblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+PC9zdHlsZT5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuZXhwb3J0IGNsYXNzIFVpUm91dGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cbiAgXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdVaVJvdXRlciByb2NrcyBub3cnKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdhdHRhY2hlZENhbGxiYWNrIGNhbGxlZCcpO1xuICB9XG5cbn1cblxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd4dWktcm91dGVyJywgVWlSb3V0ZXIpOyIsIlxuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZXMtc2V0dGluZ3MnO1xuXG5sZXQgc2V0dGluZ3MgPSBkZWZhdWx0cztcblxuZXhwb3J0IGNsYXNzIFNsaWRlclJlZnJlc2gge1xuXG4gIGNvbnN0cnVjdG9yKCRjaGlsZHJlbikge1xuICAgIHRoaXMuc2xpZGVWYWx1ZSA9IDA7XG4gICAgdGhpcy5wYWdlcldpZHRoID0gMDtcbiAgICB0aGlzLnNsaWRlV2lkdGggPSAwO1xuICAgIHRoaXMudGh1bWJXaWR0aCA9IDA7XG4gICAgdGhpcy53ICAgICAgICAgID0gMDtcbiAgICB0aGlzLiRjaGlsZHJlbiA9ICRjaGlsZHJlbjtcbiAgfVxuXG4gIGNhbFNXKCkge1xuICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNsaWRlV2lkdGggPSAodGhpcy5lbFNpemUgLSAoKHNldHRpbmdzLml0ZW0gKiAoc2V0dGluZ3Muc2xpZGVNYXJnaW4pKSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luKSkgLyBzZXR0aW5ncy5pdGVtO1xuICAgIH1cbiAgfVxuXG4gIGNhbFdpZHRoKGNsbikge1xuICAgIHZhciBsbiA9IGNsbiA9PT0gdHJ1ZSA/IHRoaXMuJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGggOiB0aGlzLiRjaGlsZHJlbi5sZW5ndGg7XG4gICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudyA9IGxuICogKHRoaXMuc2xpZGVXaWR0aCArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53ID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG47IGkrKykge1xuICAgICAgICB0aGlzLncgKz0gKHBhcnNlSW50KHRoaXMuJGNoaWxkcmVuLmVxKGkpLndpZHRoKCkpICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy53O1xuICB9XG5cbiAgY2hicmVha3BvaW50KCkge1xuICAgIGxldCB3aW5kb3dXID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgdGhpcy53aW5kb3dXID0gd2luZG93VztcblxuICAgIGlmIChzZXR0aW5ncy5yZXNwb25zaXZlLmxlbmd0aCkge1xuICAgICAgdmFyIGl0ZW07XG4gICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgICBpdGVtID0gc2V0dGluZ3MuaXRlbTtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3dXIDwgc2V0dGluZ3MucmVzcG9uc2l2ZVswXS5icmVha3BvaW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0dGluZ3MucmVzcG9uc2l2ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh3aW5kb3dXIDwgc2V0dGluZ3MucmVzcG9uc2l2ZVtpXS5icmVha3BvaW50KSB7XG4gICAgICAgICAgICBicmVha3BvaW50ID0gc2V0dGluZ3MucmVzcG9uc2l2ZVtpXS5icmVha3BvaW50O1xuICAgICAgICAgICAgcmVzcG9zaXZlT2JqID0gc2V0dGluZ3MucmVzcG9uc2l2ZVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcmVzcG9zaXZlT2JqICE9PSAndW5kZWZpbmVkJyAmJiByZXNwb3NpdmVPYmogIT09IG51bGwpIHtcbiAgICAgICAgZm9yICh2YXIgaiBpbiByZXNwb3NpdmVPYmouc2V0dGluZ3MpIHtcbiAgICAgICAgICBpZiAocmVzcG9zaXZlT2JqLnNldHRpbmdzLmhhc093blByb3BlcnR5KGopKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzVGVtcFtqXSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2V0dGluZ3NUZW1wW2pdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHNldHRpbmdzVGVtcFtqXSA9IHNldHRpbmdzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0dGluZ3Nbal0gPSByZXNwb3NpdmVPYmouc2V0dGluZ3Nbal07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChzZXR0aW5nc1RlbXApICYmIHdpbmRvd1cgPiBzZXR0aW5ncy5yZXNwb25zaXZlWzBdLmJyZWFrcG9pbnQpIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBzZXR0aW5nc1RlbXApIHtcbiAgICAgICAgICBpZiAoc2V0dGluZ3NUZW1wLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBzZXR0aW5nc1trXSA9IHNldHRpbmdzVGVtcFtrXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChzbGlkZVZhbHVlID4gMCAmJiB0aGlzLnNsaWRlV2lkdGggPiAwKSB7XG4gICAgICAgICAgaWYgKGl0ZW0gIT09IHNldHRpbmdzLml0ZW0pIHtcbiAgICAgICAgICAgIHNjZW5lID0gTWF0aC5yb3VuZChzbGlkZVZhbHVlIC8gKCh0aGlzLnNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIlxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGl0ZW06IDMsXG4gIGF1dG9XaWR0aDogZmFsc2UsXG4gIHNsaWRlTW92ZTogMSxcbiAgc2xpZGVNYXJnaW46IDEwLFxuICBhZGRDbGFzczogJycsXG4gIG1vZGU6ICdzbGlkZScsXG4gIHVzZUNTUzogdHJ1ZSxcbiAgY3NzRWFzaW5nOiAnZWFzZScsIC8vJ2N1YmljLWJlemllcigwLjI1LCAwLCAwLjI1LCAxKScsXG4gIGVhc2luZzogJ2xpbmVhcicsIC8vJ2ZvciBqcXVlcnkgYW5pbWF0aW9uJywvL1xuICBzcGVlZDogNDAwLCAvL21zJ1xuICBhdXRvOiBmYWxzZSxcbiAgcGF1c2VPbkhvdmVyOiBmYWxzZSxcbiAgbG9vcDogZmFsc2UsXG4gIHNsaWRlRW5kQW5pbWF0aW9uOiB0cnVlLFxuICBwYXVzZTogMjAwMCxcbiAga2V5UHJlc3M6IGZhbHNlLFxuICBjb250cm9sczogdHJ1ZSxcbiAgcHJldkh0bWw6ICcnLFxuICBuZXh0SHRtbDogJycsXG4gIHJ0bDogZmFsc2UsXG4gIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcbiAgdmVydGljYWw6IGZhbHNlLFxuICB2ZXJ0aWNhbEhlaWdodDogNTAwLFxuICB2VGh1bWJXaWR0aDogMTAwLFxuICB0aHVtYkl0ZW06IDEwLFxuICBwYWdlcjogdHJ1ZSxcbiAgZ2FsbGVyeTogZmFsc2UsXG4gIGdhbGxlcnlNYXJnaW46IDUsXG4gIHRodW1iTWFyZ2luOiA1LFxuICBjdXJyZW50UGFnZXJQb3NpdGlvbjogJ21pZGRsZScsXG4gIGVuYWJsZVRvdWNoOiB0cnVlLFxuICBlbmFibGVEcmFnOiB0cnVlLFxuICBmcmVlTW92ZTogdHJ1ZSxcbiAgc3dpcGVUaHJlc2hvbGQ6IDQwLFxuICByZXNwb25zaXZlOiBbXSxcbiAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICBvbkJlZm9yZVN0YXJ0OiBmdW5jdGlvbiAoJGVsKSB7IH0sXG4gIG9uU2xpZGVyTG9hZDogZnVuY3Rpb24gKCRlbCkgeyB9LFxuICBvbkJlZm9yZVNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkgeyB9LFxuICBvbkFmdGVyU2xpZGU6IGZ1bmN0aW9uICgkZWwsIHNjZW5lKSB7IH0sXG4gIG9uQmVmb3JlTmV4dFNsaWRlOiBmdW5jdGlvbiAoJGVsLCBzY2VuZSkgeyB9LFxuICBvbkJlZm9yZVByZXZTbGlkZTogZnVuY3Rpb24gKCRlbCwgc2NlbmUpIHsgfVxuICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7IiwiXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9lcy1zZXR0aW5ncyc7XG5pbXBvcnQgeyBTbGlkZXJSZWZyZXNoIH0gZnJvbSAnLi9lcy1yZWZyZXNoJztcblxuKGZ1bmN0aW9uICgkLCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBcbiAgJC5mbi5saWdodFNsaWRlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykubGlnaHRTbGlkZXIob3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBwbHVnaW4gPSB7fSxcbiAgICAgIHNldHRpbmdzID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBvcHRpb25zKSxcbiAgICAgIHNldHRpbmdzVGVtcCA9IHt9LFxuICAgICAgJGVsID0gdGhpcztcbiAgICAgIHBsdWdpbi4kZWwgPSB0aGlzO1xuXG4gICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJykge1xuICAgICAgc2V0dGluZ3MudmVydGljYWwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygndGhpcycsIHRoaXMuY2hpbGRyZW4oKSk7XG5cbiAgICB2YXIgJGNoaWxkcmVuID0gJGVsLmNoaWxkcmVuKCksXG4gICAgICB3aW5kb3dXID0gJCh3aW5kb3cpLndpZHRoKCksXG4gICAgICBicmVha3BvaW50ID0gbnVsbCxcbiAgICAgIHJlc3Bvc2l2ZU9iaiA9IG51bGwsXG4gICAgICBsZW5ndGggPSAwLFxuICAgICAgdyA9IDAsXG4gICAgICBvbiA9IGZhbHNlLFxuICAgICAgZWxTaXplID0gMCxcbiAgICAgICRzbGlkZSA9ICcnLFxuICAgICAgc2NlbmUgPSAwLFxuICAgICAgcHJvcGVydHkgPSAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpID8gJ2hlaWdodCcgOiAnd2lkdGgnLFxuICAgICAgZ3V0dGVyID0gKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSA/ICdtYXJnaW4tYm90dG9tJyA6ICdtYXJnaW4tcmlnaHQnLFxuICAgICAgc2xpZGVWYWx1ZSA9IDAsXG4gICAgICBwYWdlcldpZHRoID0gMCxcbiAgICAgIHNsaWRlV2lkdGggPSAwLFxuICAgICAgdGh1bWJXaWR0aCA9IDAsXG4gICAgICBpbnRlcnZhbCA9IG51bGwsXG4gICAgICBpc1RvdWNoID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cbiAgICB2YXIgcmVmcmVzaCA9IG5ldyBTbGlkZXJSZWZyZXNoKCRjaGlsZHJlbik7XG5cbiAgICBwbHVnaW4gPSB7XG4gICAgICBkb0NzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3VwcG9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IFsndHJhbnNpdGlvbicsICdNb3pUcmFuc2l0aW9uJywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nLCAnbXNUcmFuc2l0aW9uJywgJ0todG1sVHJhbnNpdGlvbiddO1xuICAgICAgICAgIHZhciByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25baV0gaW4gcm9vdC5zdHlsZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzZXR0aW5ncy51c2VDU1MgJiYgc3VwcG9ydCgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGtleVByZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5rZXlQcmVzcykge1xuICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cC5saWdodHNsaWRlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoISQoJzpmb2N1cycpLmlzKCdpbnB1dCwgdGV4dGFyZWEnKSkge1xuICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgICAgICAgICAgICAkZWwuZ29Ub1ByZXZTbGlkZSgpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICAkZWwuZ29Ub05leHRTbGlkZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb250cm9sczogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2V0dGluZ3MuY29udHJvbHMpIHtcbiAgICAgICAgICAkZWwuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJsU0FjdGlvblwiPjxhIGNsYXNzPVwibFNQcmV2XCI+JyArIHNldHRpbmdzLnByZXZIdG1sICsgJzwvYT48YSBjbGFzcz1cImxTTmV4dFwiPicgKyBzZXR0aW5ncy5uZXh0SHRtbCArICc8L2E+PC9kaXY+Jyk7XG4gICAgICAgICAgaWYgKCFzZXR0aW5ncy5hdXRvV2lkdGgpIHtcbiAgICAgICAgICAgIGlmIChsZW5ndGggPD0gc2V0dGluZ3MuaXRlbSkge1xuICAgICAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uJykuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocmVmcmVzaC5jYWxXaWR0aChmYWxzZSkgPCBlbFNpemUpIHtcbiAgICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbicpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2NsYXNzJykgPT09ICdsU1ByZXYnKSB7XG4gICAgICAgICAgICAgICRlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkZWwuZ29Ub05leHRTbGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5pdGlhbFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChzZXR0aW5ncy5tb2RlID09PSAnZmFkZScpIHtcbiAgICAgICAgICBzZXR0aW5ncy5hdXRvV2lkdGggPSBmYWxzZTtcbiAgICAgICAgICBzZXR0aW5ncy5zbGlkZUVuZEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy5hdXRvKSB7XG4gICAgICAgICAgc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICAgICAgc2V0dGluZ3Muc2xpZGVNb3ZlID0gMTtcbiAgICAgICAgICBzZXR0aW5ncy5pdGVtID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCkge1xuICAgICAgICAgIHNldHRpbmdzLnNsaWRlTW92ZSA9IDE7XG4gICAgICAgICAgc2V0dGluZ3MuZnJlZU1vdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZXR0aW5ncy5vbkJlZm9yZVN0YXJ0LmNhbGwodGhpcywgJGVsKTtcbiAgICAgICAgcmVmcmVzaC5jaGJyZWFrcG9pbnQoKTtcbiAgICAgICAgJGVsLmFkZENsYXNzKCdsaWdodFNsaWRlcicpLndyYXAoJzxkaXYgY2xhc3M9XCJsU1NsaWRlT3V0ZXIgJyArIHNldHRpbmdzLmFkZENsYXNzICsgJ1wiPjxkaXYgY2xhc3M9XCJsU1NsaWRlV3JhcHBlclwiPjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAkc2xpZGUgPSAkZWwucGFyZW50KCcubFNTbGlkZVdyYXBwZXInKTtcbiAgICAgICAgaWYgKHNldHRpbmdzLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICRzbGlkZS5wYXJlbnQoKS5hZGRDbGFzcygnbFNydGwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwpIHtcbiAgICAgICAgICAkc2xpZGUucGFyZW50KCkuYWRkQ2xhc3MoJ3ZlcnRpY2FsJyk7XG4gICAgICAgICAgZWxTaXplID0gc2V0dGluZ3MudmVydGljYWxIZWlnaHQ7XG4gICAgICAgICAgJHNsaWRlLmNzcygnaGVpZ2h0JywgZWxTaXplICsgJ3B4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxTaXplID0gJGVsLm91dGVyV2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgICAkY2hpbGRyZW4uYWRkQ2xhc3MoJ2xzbGlkZScpO1xuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgcmVmcmVzaC5jYWxTVygpO1xuICAgICAgICAgIHJlZnJlc2guY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocmVmcmVzaC5jYWxXaWR0aCh0cnVlKSA+IGVsU2l6ZSkge1xuICAgICAgICAgICAgICAvKiovXG4gICAgICAgICAgICAgIHZhciB0V3IgPSAwLFxuICAgICAgICAgICAgICAgIHRJID0gMDtcbiAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCAkY2hpbGRyZW4ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICB0V3IgKz0gKHBhcnNlSW50KCRlbC5maW5kKCcubHNsaWRlJykuZXEoaykud2lkdGgoKSkgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICAgICAgICAgICAgdEkrKztcbiAgICAgICAgICAgICAgICBpZiAodFdyID49IChlbFNpemUgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikpIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgdEl0ZW0gPSBzZXR0aW5ncy5hdXRvV2lkdGggPT09IHRydWUgPyB0SSA6IHNldHRpbmdzLml0ZW07XG5cbiAgICAgICAgICAgICAgLyoqL1xuICAgICAgICAgICAgICBpZiAodEl0ZW0gPCAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aCAtIHRJdGVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICRjaGlsZHJlbi5lcShpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRJdGVtIDwgJGVsLmZpbmQoJy5jbG9uZS5yaWdodCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAkY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaiA+ICgkY2hpbGRyZW4ubGVuZ3RoIC0gMSAtICRlbC5maW5kKCcuY2xvbmUucmlnaHQnKS5sZW5ndGgpOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgIHNjZW5lLS07XG4gICAgICAgICAgICAgICAgICAkY2hpbGRyZW4uZXEoaikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8qKi9cbiAgICAgICAgICAgICAgZm9yICh2YXIgbiA9ICRlbC5maW5kKCcuY2xvbmUucmlnaHQnKS5sZW5ndGg7IG4gPCB0SXRlbTsgbisrKSB7XG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5sc2xpZGUnKS5lcShuKS5jbG9uZSgpLnJlbW92ZUNsYXNzKCdsc2xpZGUnKS5hZGRDbGFzcygnY2xvbmUgcmlnaHQnKS5hcHBlbmRUbygkZWwpO1xuICAgICAgICAgICAgICAgIHNjZW5lKys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZm9yICh2YXIgbSA9ICRlbC5maW5kKCcubHNsaWRlJykubGVuZ3RoIC0gJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoOyBtID4gKCRlbC5maW5kKCcubHNsaWRlJykubGVuZ3RoIC0gdEl0ZW0pOyBtLS0pIHtcbiAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmxzbGlkZScpLmVxKG0gLSAxKS5jbG9uZSgpLnJlbW92ZUNsYXNzKCdsc2xpZGUnKS5hZGRDbGFzcygnY2xvbmUgbGVmdCcpLnByZXBlbmRUbygkZWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRjaGlsZHJlbiA9ICRlbC5jaGlsZHJlbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCRjaGlsZHJlbi5oYXNDbGFzcygnY2xvbmUnKSkge1xuICAgICAgICAgICAgICAgICRlbC5maW5kKCcuY2xvbmUnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5tb3ZlKCRlbCwgMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlZnJlc2guY2xvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoLnNTVyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsZW5ndGggPSAkY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5ydGwgPT09IHRydWUgJiYgc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBndXR0ZXIgPSAnbWFyZ2luLWxlZnQnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgJGNoaWxkcmVuLmNzcyhwcm9wZXJ0eSwgc2xpZGVXaWR0aCArICdweCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkY2hpbGRyZW4uY3NzKGd1dHRlciwgc2V0dGluZ3Muc2xpZGVNYXJnaW4gKyAncHgnKTtcbiAgICAgICAgICB3ID0gcmVmcmVzaC5jYWxXaWR0aChmYWxzZSk7XG4gICAgICAgICAgJGVsLmNzcyhwcm9wZXJ0eSwgdyArICdweCcpO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgIGlmIChvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc2NlbmUgPSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZWZyZXNoLmNhbEwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJGNoaWxkcmVuID0gJGVsLmNoaWxkcmVuKCk7XG4gICAgICAgICAgbGVuZ3RoID0gJGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZG9Dc3MoKSkge1xuICAgICAgICAgICRzbGlkZS5hZGRDbGFzcygndXNpbmdDc3MnKTtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoLmNhbEwoKTtcbiAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICByZWZyZXNoLmNhbFNXKCk7XG4gICAgICAgICAgcmVmcmVzaC5zU1coKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2xpZGVWYWx1ZSA9ICR0aGlzLnNsaWRlVmFsdWUoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZSgkZWwsIHNsaWRlVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEhlaWdodCgkZWwsIGZhbHNlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEhlaWdodCgkZWwsIHRydWUpO1xuICAgICAgICAgICRlbC5hZGRDbGFzcygnbFNGYWRlJyk7XG4gICAgICAgICAgaWYgKCF0aGlzLmRvQ3NzKCkpIHtcbiAgICAgICAgICAgICRjaGlsZHJlbi5mYWRlT3V0KDApO1xuICAgICAgICAgICAgJGNoaWxkcmVuLmVxKHNjZW5lKS5mYWRlSW4oMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09PSB0cnVlICYmIHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAkY2hpbGRyZW4uZXEoc2NlbmUpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkY2hpbGRyZW4uZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYWdlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICByZWZyZXNoLmNyZWF0ZVBhZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRodW1iV2lkdGggPSAoZWxTaXplIC0gKChzZXR0aW5ncy50aHVtYkl0ZW0gKiAoc2V0dGluZ3MudGh1bWJNYXJnaW4pKSAtIHNldHRpbmdzLnRodW1iTWFyZ2luKSkgLyBzZXR0aW5ncy50aHVtYkl0ZW07XG4gICAgICAgICAgdmFyICRjaGlsZHJlbiA9ICRzbGlkZS5maW5kKCcubHNsaWRlJyk7XG4gICAgICAgICAgdmFyIGxlbmd0aCA9ICRzbGlkZS5maW5kKCcubHNsaWRlJykubGVuZ3RoO1xuICAgICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgIHBhZ2VycyA9ICcnLFxuICAgICAgICAgICAgdiA9IDA7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgc2NlbmUgKiBzbGlkZSB2YWx1ZVxuICAgICAgICAgICAgICBpZiAoIXNldHRpbmdzLmF1dG9XaWR0aCkge1xuICAgICAgICAgICAgICAgIHYgPSBpICogKChzbGlkZVdpZHRoICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pICogc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ICs9ICgocGFyc2VJbnQoJGNoaWxkcmVuLmVxKGkpLndpZHRoKCkpICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pICogc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRodW1iID0gJGNoaWxkcmVuLmVxKGkgKiBzZXR0aW5ncy5zbGlkZU1vdmUpLmF0dHIoJ2RhdGEtdGh1bWInKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHBhZ2VycyArPSAnPGxpIHN0eWxlPVwid2lkdGg6MTAwJTsnICsgcHJvcGVydHkgKyAnOicgKyB0aHVtYldpZHRoICsgJ3B4OycgKyBndXR0ZXIgKyAnOicgKyBzZXR0aW5ncy50aHVtYk1hcmdpbiArICdweFwiPjxhIGhyZWY9XCIjXCI+PGltZyBzcmM9XCInICsgdGh1bWIgKyAnXCIgLz48L2E+PC9saT4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFnZXJzICs9ICc8bGk+PGEgaHJlZj1cIiNcIj4nICsgKGkgKyAxKSArICc8L2E+PC9saT4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgaWYgKCh2KSA+PSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgICAgICBpID0gaSArIDE7XG4gICAgICAgICAgICAgICAgdmFyIG1pblBnciA9IDI7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgcGFnZXJzICs9ICc8bGk+PGEgaHJlZj1cIiNcIj4nICsgKGkgKyAxKSArICc8L2E+PC9saT4nO1xuICAgICAgICAgICAgICAgICAgbWluUGdyID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBtaW5QZ3IpIHtcbiAgICAgICAgICAgICAgICAgIHBhZ2VycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAkc2xpZGUucGFyZW50KCkuYWRkQ2xhc3MoJ25vUGFnZXInKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJHNsaWRlLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdub1BhZ2VyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciAkY1NvdXRlciA9ICRzbGlkZS5wYXJlbnQoKTtcbiAgICAgICAgICAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmh0bWwocGFnZXJzKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIC8vIHNldCBHYWxsZXJ5IHRodW1ibmFpbCB3aWR0aFxuICAgICAgICAgICAgICAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmNzcygnd2lkdGgnLCBzZXR0aW5ncy52VGh1bWJXaWR0aCArICdweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFnZXJXaWR0aCA9IChpICogKHNldHRpbmdzLnRodW1iTWFyZ2luICsgdGh1bWJXaWR0aCkpICsgMC41O1xuICAgICAgICAgICAgJGNTb3V0ZXIuZmluZCgnLmxTUGFnZXInKS5jc3Moe1xuICAgICAgICAgICAgICBwcm9wZXJ0eTogcGFnZXJXaWR0aCArICdweCcsXG4gICAgICAgICAgICAgICd0cmFuc2l0aW9uLWR1cmF0aW9uJzogc2V0dGluZ3Muc3BlZWQgKyAnbXMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAkc2xpZGUucGFyZW50KCkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgKHNldHRpbmdzLnZUaHVtYldpZHRoICsgc2V0dGluZ3MuZ2FsbGVyeU1hcmdpbikgKyAncHgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRjU291dGVyLmZpbmQoJy5sU1BhZ2VyJykuY3NzKHByb3BlcnR5LCBwYWdlcldpZHRoICsgJ3B4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciAkcGFnZXIgPSAkY1NvdXRlci5maW5kKCcubFNQYWdlcicpLmZpbmQoJ2xpJyk7XG4gICAgICAgICAgJHBhZ2VyLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICRwYWdlci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgIHNjZW5lID0gc2NlbmUgKyAoJHBhZ2VyLmluZGV4KHRoaXMpIC0gJGNTb3V0ZXIuZmluZCgnLmxTUGFnZXInKS5maW5kKCdsaS5hY3RpdmUnKS5pbmRleCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNjZW5lID0gJHBhZ2VyLmluZGV4KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGVsLm1vZGUoZmFsc2UpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgJHRoaXMuc2xpZGVUaHVtYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoc2V0dGluZ3MucGFnZXIpIHtcbiAgICAgICAgICB2YXIgY2wgPSAnbFNwZyc7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkpIHtcbiAgICAgICAgICAgIGNsID0gJ2xTR2FsbGVyeSc7XG4gICAgICAgICAgfVxuICAgICAgICAgICRzbGlkZS5hZnRlcignPHVsIGNsYXNzPVwibFNQYWdlciAnICsgY2wgKyAnXCI+PC91bD4nKTtcbiAgICAgICAgICB2YXIgZ01hcmdpbiA9IChzZXR0aW5ncy52ZXJ0aWNhbCkgPyAnbWFyZ2luLWxlZnQnIDogJ21hcmdpbi10b3AnO1xuICAgICAgICAgICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpLmNzcyhnTWFyZ2luLCBzZXR0aW5ncy5nYWxsZXJ5TWFyZ2luICsgJ3B4Jyk7XG4gICAgICAgICAgcmVmcmVzaC5jcmVhdGVQYWdlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVmcmVzaC5pbml0KCk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSxcbiAgICAgIHNldEhlaWdodDogZnVuY3Rpb24gKG9iLCBmYWRlKSB7XG4gICAgICAgIHZhciBvYmogPSBudWxsLFxuICAgICAgICAgICR0aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcbiAgICAgICAgICBvYmogPSBvYi5jaGlsZHJlbignLmxzbGlkZSAnKS5maXJzdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9iaiA9IG9iLmNoaWxkcmVuKCkuZmlyc3QoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2V0Q3NzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB0SCA9IG9iai5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgdFAgPSAwLFxuICAgICAgICAgICAgdEhUID0gdEg7XG4gICAgICAgICAgaWYgKGZhZGUpIHtcbiAgICAgICAgICAgIHRIID0gMDtcbiAgICAgICAgICAgIHRQID0gKCh0SFQpICogMTAwKSAvIGVsU2l6ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2IuY3NzKHtcbiAgICAgICAgICAgICdoZWlnaHQnOiB0SCArICdweCcsXG4gICAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiB0UCArICclJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBzZXRDc3MoKTtcbiAgICAgICAgaWYgKG9iai5maW5kKCdpbWcnKS5sZW5ndGgpIHtcbiAgICAgICAgICBpZiAob2JqLmZpbmQoJ2ltZycpWzBdLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICBzZXRDc3MoKTtcbiAgICAgICAgICAgIGlmICghaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmouZmluZCgnaW1nJykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldENzcygpO1xuICAgICAgICAgICAgICAgIGlmICghaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAgICR0aGlzLmF1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFpbnRlcnZhbCkge1xuICAgICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFjdGl2ZTogZnVuY3Rpb24gKG9iLCB0KSB7XG4gICAgICAgIGlmICh0aGlzLmRvQ3NzKCkgJiYgc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnKSB7XG4gICAgICAgICAgJHNsaWRlLmFkZENsYXNzKCdvbicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzYyA9IDA7XG4gICAgICAgIGlmIChzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZSA8IGxlbmd0aCkge1xuICAgICAgICAgIG9iLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBpZiAoIXRoaXMuZG9Dc3MoKSAmJiBzZXR0aW5ncy5tb2RlID09PSAnZmFkZScgJiYgdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG9iLmZhZGVPdXQoc2V0dGluZ3Muc3BlZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2MgPSBzY2VuZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2MgPSBzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy90ID09PSB0cnVlID8gc2MgPSBzY2VuZSA6IHNjID0gc2NlbmUgKiBzZXR0aW5ncy5zbGlkZU1vdmU7XG4gICAgICAgICAgdmFyIGwsIG5sO1xuICAgICAgICAgIGlmICh0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsID0gb2IubGVuZ3RoO1xuICAgICAgICAgICAgbmwgPSBsIC0gMTtcbiAgICAgICAgICAgIGlmIChzYyArIDEgPj0gbCkge1xuICAgICAgICAgICAgICBzYyA9IG5sO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAvL3QgPT09IHRydWUgPyBzYyA9IHNjZW5lIC0gJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoIDogc2MgPSBzY2VuZSAqIHNldHRpbmdzLnNsaWRlTW92ZTtcbiAgICAgICAgICAgIGlmICh0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHNjID0gc2NlbmUgLSAkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzYyA9IHNjZW5lICogc2V0dGluZ3Muc2xpZGVNb3ZlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgbCA9IG9iLmxlbmd0aDtcbiAgICAgICAgICAgICAgbmwgPSBsIC0gMTtcbiAgICAgICAgICAgICAgaWYgKHNjICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgICAgIHNjID0gbmw7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2MgKyAxID4gbCkge1xuICAgICAgICAgICAgICAgIHNjID0gMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGhpcy5kb0NzcygpICYmIHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJyAmJiB0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgb2IuZXEoc2MpLmZhZGVJbihzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9iLmVxKHNjKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2IucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgIG9iLmVxKG9iLmxlbmd0aCAtIDEpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBpZiAoIXRoaXMuZG9Dc3MoKSAmJiBzZXR0aW5ncy5tb2RlID09PSAnZmFkZScgJiYgdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG9iLmZhZGVPdXQoc2V0dGluZ3Muc3BlZWQpO1xuICAgICAgICAgICAgb2IuZXEoc2MpLmZhZGVJbihzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbW92ZTogZnVuY3Rpb24gKG9iLCB2KSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICB2ID0gLXY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZG9Dc3MoKSkge1xuICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgb2IuY3NzKHtcbiAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgwcHgsICcgKyAoLXYpICsgJ3B4LCAwcHgpJyxcbiAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDBweCwgJyArICgtdikgKyAncHgsIDBweCknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2IuY3NzKHtcbiAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnICsgKC12KSArICdweCwgMHB4LCAwcHgpJyxcbiAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyAoLXYpICsgJ3B4LCAwcHgsIDBweCknLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgb2IuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICB0b3A6IC12ICsgJ3B4J1xuICAgICAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQsIHNldHRpbmdzLmVhc2luZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgbGVmdDogLXYgKyAncHgnXG4gICAgICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCwgc2V0dGluZ3MuZWFzaW5nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyICR0aHVtYiA9ICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpLmZpbmQoJ2xpJyk7XG4gICAgICAgIHRoaXMuYWN0aXZlKCR0aHVtYiwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgZmFkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZSgkY2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgICAgdmFyICR0aHVtYiA9ICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpLmZpbmQoJ2xpJyk7XG4gICAgICAgIHRoaXMuYWN0aXZlKCR0aHVtYiwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgc2xpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgcmVmcmVzaC5jYWxTbGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAodyA+IGVsU2l6ZSkge1xuICAgICAgICAgICAgc2xpZGVWYWx1ZSA9ICR0aGlzLnNsaWRlVmFsdWUoKTtcbiAgICAgICAgICAgICR0aGlzLmFjdGl2ZSgkY2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICgoc2xpZGVWYWx1ZSkgPiB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgICAgc2xpZGVWYWx1ZSA9IHcgLSBlbFNpemUgLSBzZXR0aW5ncy5zbGlkZU1hcmdpbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVWYWx1ZSA8IDApIHtcbiAgICAgICAgICAgICAgc2xpZGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkdGhpcy5tb3ZlKCRlbCwgc2xpZGVWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgIGlmIChzY2VuZSA+PSAobGVuZ3RoIC0gKCRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aCAvIHNldHRpbmdzLnNsaWRlTW92ZSkpKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucmVzZXRTbGlkZSgkZWwuZmluZCgnLmNsb25lLmxlZnQnKS5sZW5ndGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzY2VuZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICR0aGlzLnJlc2V0U2xpZGUoJHNsaWRlLmZpbmQoJy5sc2xpZGUnKS5sZW5ndGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZWZyZXNoLmNhbFNsaWRlKCk7XG4gICAgICB9LFxuICAgICAgcmVzZXRTbGlkZTogZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbiBhJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNjZW5lID0gcztcbiAgICAgICAgICAkc2xpZGUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJzBtcycpO1xuICAgICAgICAgIHNsaWRlVmFsdWUgPSAkdGhpcy5zbGlkZVZhbHVlKCk7XG4gICAgICAgICAgJHRoaXMuYWN0aXZlKCRjaGlsZHJlbiwgZmFsc2UpO1xuICAgICAgICAgIHBsdWdpbi5tb3ZlKCRlbCwgc2xpZGVWYWx1ZSk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2xpZGUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgc2V0dGluZ3Muc3BlZWQgKyAnbXMnKTtcbiAgICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24gYScpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQgKyAxMDApO1xuICAgICAgfSxcbiAgICAgIHNsaWRlVmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9zViA9IDA7XG4gICAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgICAgX3NWID0gc2NlbmUgKiAoKHNsaWRlV2lkdGggKyBzZXR0aW5ncy5zbGlkZU1hcmdpbikgKiBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9zViA9IDA7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY2VuZTsgaSsrKSB7XG4gICAgICAgICAgICBfc1YgKz0gKHBhcnNlSW50KCRjaGlsZHJlbi5lcShpKS53aWR0aCgpKSArIHNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zVjtcbiAgICAgIH0sXG4gICAgICBzbGlkZVRodW1iOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwb3NpdGlvbjtcbiAgICAgICAgc3dpdGNoIChzZXR0aW5ncy5jdXJyZW50UGFnZXJQb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWlkZGxlJzpcbiAgICAgICAgICAgIHBvc2l0aW9uID0gKGVsU2l6ZSAvIDIpIC0gKHRodW1iV2lkdGggLyAyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHBvc2l0aW9uID0gZWxTaXplIC0gdGh1bWJXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2MgPSBzY2VuZSAtICRlbC5maW5kKCcuY2xvbmUubGVmdCcpLmxlbmd0aDtcbiAgICAgICAgdmFyICRwYWdlciA9ICRzbGlkZS5wYXJlbnQoKS5maW5kKCcubFNQYWdlcicpO1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJyAmJiBzZXR0aW5ncy5sb29wID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHNjID49ICRwYWdlci5jaGlsZHJlbigpLmxlbmd0aCkge1xuICAgICAgICAgICAgc2MgPSAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2MgPCAwKSB7XG4gICAgICAgICAgICBzYyA9ICRwYWdlci5jaGlsZHJlbigpLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRodW1iU2xpZGUgPSBzYyAqICgodGh1bWJXaWR0aCArIHNldHRpbmdzLnRodW1iTWFyZ2luKSkgLSAocG9zaXRpb24pO1xuICAgICAgICBpZiAoKHRodW1iU2xpZGUgKyBlbFNpemUpID4gcGFnZXJXaWR0aCkge1xuICAgICAgICAgIHRodW1iU2xpZGUgPSBwYWdlcldpZHRoIC0gZWxTaXplIC0gc2V0dGluZ3MudGh1bWJNYXJnaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRodW1iU2xpZGUgPCAwKSB7XG4gICAgICAgICAgdGh1bWJTbGlkZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb3ZlKCRwYWdlciwgdGh1bWJTbGlkZSk7XG4gICAgICB9LFxuICAgICAgYXV0bzogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2V0dGluZ3MuYXV0bykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgICAgICB9LCBzZXR0aW5ncy5wYXVzZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXVzZU9uSG92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHNldHRpbmdzLmF1dG8gJiYgc2V0dGluZ3MucGF1c2VPbkhvdmVyKSB7XG4gICAgICAgICAgJHNsaWRlLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbHMtaG92ZXInKTtcbiAgICAgICAgICAgICRlbC5wYXVzZSgpO1xuICAgICAgICAgICAgc2V0dGluZ3MuYXV0byA9IHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJHNsaWRlLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbHMtaG92ZXInKTtcbiAgICAgICAgICAgIGlmICghJHNsaWRlLmZpbmQoJy5saWdodFNsaWRlcicpLmhhc0NsYXNzKCdsc0dyYWJiaW5nJykpIHtcbiAgICAgICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG91Y2hNb3ZlOiBmdW5jdGlvbiAoZW5kQ29vcmRzLCBzdGFydENvb3Jkcykge1xuICAgICAgICAkc2xpZGUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJzBtcycpO1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgIHZhciBkaXN0YW5jZSA9IGVuZENvb3JkcyAtIHN0YXJ0Q29vcmRzO1xuICAgICAgICAgIHZhciBzd2lwZVZhbCA9IHNsaWRlVmFsdWUgLSBkaXN0YW5jZTtcbiAgICAgICAgICBpZiAoKHN3aXBlVmFsKSA+PSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5mcmVlTW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc3dpcGVWYWwgPSB3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgc3dpcGVWYWxUID0gdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgICAgICAgICBzd2lwZVZhbCA9IHN3aXBlVmFsVCArICgoc3dpcGVWYWwgLSBzd2lwZVZhbFQpIC8gNSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlVmFsIDwgMCkge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmZyZWVNb3ZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzd2lwZVZhbCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzd2lwZVZhbCA9IHN3aXBlVmFsIC8gNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlKCRlbCwgc3dpcGVWYWwpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICB0b3VjaEVuZDogZnVuY3Rpb24gKGRpc3RhbmNlKSB7XG4gICAgICAgICRzbGlkZS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBzZXR0aW5ncy5zcGVlZCArICdtcycpO1xuICAgICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgIHZhciBteFZhbCA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfbmV4dCA9IHRydWU7XG4gICAgICAgICAgc2xpZGVWYWx1ZSA9IHNsaWRlVmFsdWUgLSBkaXN0YW5jZTtcbiAgICAgICAgICBpZiAoKHNsaWRlVmFsdWUpID4gdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luKSB7XG4gICAgICAgICAgICBzbGlkZVZhbHVlID0gdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgbXhWYWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVWYWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHNsaWRlVmFsdWUgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZ0MgPSBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICAgICAgdmFyIGFkID0gMDtcbiAgICAgICAgICAgIGlmICghbXhWYWwpIHtcbiAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBhZCA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICAgICAgICAgIHZhciBudW0gPSBzbGlkZVZhbHVlIC8gKChzbGlkZVdpZHRoICsgc2V0dGluZ3Muc2xpZGVNYXJnaW4pICogc2V0dGluZ3Muc2xpZGVNb3ZlKTtcbiAgICAgICAgICAgICAgc2NlbmUgPSBwYXJzZUludChudW0pICsgYWQ7XG4gICAgICAgICAgICAgIGlmIChzbGlkZVZhbHVlID49ICh3IC0gZWxTaXplIC0gc2V0dGluZ3Muc2xpZGVNYXJnaW4pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG51bSAlIDEgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgIHNjZW5lKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgdFcgPSAwO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICRjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRXICs9IChwYXJzZUludCgkY2hpbGRyZW4uZXEoaSkud2lkdGgoKSkgKyBzZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICAgICAgICAgICAgc2NlbmUgPSBpICsgYWQ7XG4gICAgICAgICAgICAgICAgaWYgKHRXID49IHNsaWRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGRpc3RhbmNlID49IHNldHRpbmdzLnN3aXBlVGhyZXNob2xkKSB7XG4gICAgICAgICAgICBnQyhmYWxzZSk7XG4gICAgICAgICAgICBfbmV4dCA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdGFuY2UgPD0gLXNldHRpbmdzLnN3aXBlVGhyZXNob2xkKSB7XG4gICAgICAgICAgICBnQyh0cnVlKTtcbiAgICAgICAgICAgIF9uZXh0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgICRlbC5tb2RlKF9uZXh0KTtcbiAgICAgICAgICB0aGlzLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZGlzdGFuY2UgPj0gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICRlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChkaXN0YW5jZSA8PSAtc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICRlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG5cblxuICAgICAgZW5hYmxlRHJhZzogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIWlzVG91Y2gpIHtcbiAgICAgICAgICB2YXIgc3RhcnRDb29yZHMgPSAwLFxuICAgICAgICAgICAgZW5kQ29vcmRzID0gMCxcbiAgICAgICAgICAgIGlzRHJhZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICRzbGlkZS5maW5kKCcubGlnaHRTbGlkZXInKS5hZGRDbGFzcygnbHNHcmFiJyk7XG4gICAgICAgICAgJHNsaWRlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHcgPCBlbFNpemUpIHtcbiAgICAgICAgICAgICAgaWYgKHcgIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5hdHRyKCdjbGFzcycpICE9PSAoJ2xTUHJldicpICYmICQoZS50YXJnZXQpLmF0dHIoJ2NsYXNzJykgIT09ICgnbFNOZXh0JykpIHtcbiAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpID8gZS5wYWdlWSA6IGUucGFnZVg7XG4gICAgICAgICAgICAgIGlzRHJhZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyAqKiBGaXggZm9yIHdlYmtpdCBjdXJzb3IgaXNzdWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI2NzIzXG4gICAgICAgICAgICAgICRzbGlkZS5zY3JvbGxMZWZ0ICs9IDE7XG4gICAgICAgICAgICAgICRzbGlkZS5zY3JvbGxMZWZ0IC09IDE7XG4gICAgICAgICAgICAgIC8vICpcbiAgICAgICAgICAgICAgJHNsaWRlLmZpbmQoJy5saWdodFNsaWRlcicpLnJlbW92ZUNsYXNzKCdsc0dyYWInKS5hZGRDbGFzcygnbHNHcmFiYmluZycpO1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoaXNEcmFnaW5nKSB7XG4gICAgICAgICAgICAgIGVuZENvb3JkcyA9IChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgPyBlLnBhZ2VZIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgJHRoaXMudG91Y2hNb3ZlKGVuZENvb3Jkcywgc3RhcnRDb29yZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgICQod2luZG93KS5vbignbW91c2V1cCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoaXNEcmFnaW5nKSB7XG4gICAgICAgICAgICAgICRzbGlkZS5maW5kKCcubGlnaHRTbGlkZXInKS5yZW1vdmVDbGFzcygnbHNHcmFiYmluZycpLmFkZENsYXNzKCdsc0dyYWInKTtcbiAgICAgICAgICAgICAgaXNEcmFnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIGVuZENvb3JkcyA9IChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkgPyBlLnBhZ2VZIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gZW5kQ29vcmRzIC0gc3RhcnRDb29yZHM7XG4gICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPj0gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ2NsaWNrLmxzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9mZignY2xpY2subHMnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICR0aGlzLnRvdWNoRW5kKGRpc3RhbmNlKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuXG5cblxuXG4gICAgICBlbmFibGVUb3VjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IHt9LFxuICAgICAgICAgICAgZW5kQ29vcmRzID0ge307XG4gICAgICAgICAgJHNsaWRlLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGVuZENvb3JkcyA9IGUub3JpZ2luYWxFdmVudC50YXJnZXRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgc3RhcnRDb29yZHMucGFnZVggPSBlLm9yaWdpbmFsRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgIHN0YXJ0Q29vcmRzLnBhZ2VZID0gZS5vcmlnaW5hbEV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkc2xpZGUub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodyA8IGVsU2l6ZSkge1xuICAgICAgICAgICAgICBpZiAodyAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9yaWcgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgICBlbmRDb29yZHMgPSBvcmlnLnRhcmdldFRvdWNoZXNbMF07XG4gICAgICAgICAgICB2YXIgeE1vdmVtZW50ID0gTWF0aC5hYnMoZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVgpO1xuICAgICAgICAgICAgdmFyIHlNb3ZlbWVudCA9IE1hdGguYWJzKGVuZENvb3Jkcy5wYWdlWSAtIHN0YXJ0Q29vcmRzLnBhZ2VZKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBpZiAoKHlNb3ZlbWVudCAqIDMpID4geE1vdmVtZW50KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLnRvdWNoTW92ZShlbmRDb29yZHMucGFnZVksIHN0YXJ0Q29vcmRzLnBhZ2VZKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICgoeE1vdmVtZW50ICogMykgPiB5TW92ZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMudG91Y2hNb3ZlKGVuZENvb3Jkcy5wYWdlWCwgc3RhcnRDb29yZHMucGFnZVgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJHNsaWRlLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh3IDwgZWxTaXplKSB7XG4gICAgICAgICAgICAgIGlmICh3ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2U7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgZGlzdGFuY2UgPSBlbmRDb29yZHMucGFnZVkgLSBzdGFydENvb3Jkcy5wYWdlWTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpc3RhbmNlID0gZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkdGhpcy50b3VjaEVuZChkaXN0YW5jZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICAkdGhpcy5pbml0aWFsU3R5bGUoKTtcbiAgICAgICAgaWYgKHRoaXMuZG9Dc3MoKSkge1xuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLmVuYWJsZVRvdWNoID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkdGhpcy5lbmFibGVUb3VjaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZW5hYmxlRHJhZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgJHRoaXMuZW5hYmxlRHJhZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQod2luZG93KS5vbignZm9jdXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJHRoaXMuYXV0bygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKHdpbmRvdykub24oJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR0aGlzLnBhZ2VyKCk7XG4gICAgICAgICR0aGlzLnBhdXNlT25Ib3ZlcigpO1xuICAgICAgICAkdGhpcy5jb250cm9scygpO1xuICAgICAgICAkdGhpcy5rZXlQcmVzcygpO1xuICAgICAgfVxuICAgIH07XG4gICAgcGx1Z2luLmJ1aWxkKCk7XG4gICAgcmVmcmVzaC5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVmcmVzaC5jaGJyZWFrcG9pbnQoKTtcbiAgICAgIGlmIChzZXR0aW5ncy52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MuaXRlbSA+IDEpIHtcbiAgICAgICAgICBlbFNpemUgPSBzZXR0aW5ncy52ZXJ0aWNhbEhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbFNpemUgPSAkY2hpbGRyZW4ub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgICAkc2xpZGUuY3NzKCdoZWlnaHQnLCBlbFNpemUgKyAncHgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsU2l6ZSA9ICRzbGlkZS5vdXRlcldpZHRoKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSAmJiBzZXR0aW5ncy5tb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgIHJlZnJlc2guY2xvbmUoKTtcbiAgICAgIH1cbiAgICAgIHJlZnJlc2guY2FsTCgpO1xuICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdsU1NsaWRlJyk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICByZWZyZXNoLmNhbFNXKCk7XG4gICAgICAgIHJlZnJlc2guc1NXKCk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2xTU2xpZGUnKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgICBpZiAoc2V0dGluZ3MucGFnZXIpIHtcbiAgICAgICAgcmVmcmVzaC5jcmVhdGVQYWdlcigpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICYmIHNldHRpbmdzLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAkZWwuY3NzKCdoZWlnaHQnLCAkY2hpbGRyZW4uZXEoc2NlbmUpLm91dGVySGVpZ2h0KHRydWUpKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5hZGFwdGl2ZUhlaWdodCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBwbHVnaW4uc2V0SGVpZ2h0KCRlbCwgZmFsc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW4uYXV0bygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwbHVnaW4uc2V0SGVpZ2h0KCRlbCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgIHBsdWdpbi5zbGlkZVRodW1iKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICBwbHVnaW4uc2xpZGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgIGlmICgkY2hpbGRyZW4ubGVuZ3RoIDw9IHNldHRpbmdzLml0ZW0pIHtcbiAgICAgICAgICAkc2xpZGUuZmluZCgnLmxTQWN0aW9uJykuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24nKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgocmVmcmVzaC5jYWxXaWR0aChmYWxzZSkgPCBlbFNpemUpICYmICh3ICE9PSAwKSkge1xuICAgICAgICAgICRzbGlkZS5maW5kKCcubFNBY3Rpb24nKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNsaWRlLmZpbmQoJy5sU0FjdGlvbicpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgJGVsLmdvVG9QcmV2U2xpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2NlbmUgPiAwKSB7XG4gICAgICAgIHNldHRpbmdzLm9uQmVmb3JlUHJldlNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgIHNjZW5lLS07XG4gICAgICAgICRlbC5tb2RlKGZhbHNlKTtcbiAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICBwbHVnaW4uc2xpZGVUaHVtYigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNldHRpbmdzLm9uQmVmb3JlUHJldlNsaWRlLmNhbGwodGhpcywgJGVsLCBzY2VuZSk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdmYWRlJykge1xuICAgICAgICAgICAgdmFyIGwgPSAobGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBzY2VuZSA9IHBhcnNlSW50KGwgLyBzZXR0aW5ncy5zbGlkZU1vdmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBsdWdpbi5zbGlkZVRodW1iKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKCdsZWZ0RW5kJyk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2xlZnRFbmQnKTtcbiAgICAgICAgICB9LCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAkZWwuZ29Ub05leHRTbGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBuZXh0SSA9IHRydWU7XG4gICAgICBpZiAoc2V0dGluZ3MubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICB2YXIgX3NsaWRlVmFsdWUgPSBwbHVnaW4uc2xpZGVWYWx1ZSgpO1xuICAgICAgICBuZXh0SSA9IF9zbGlkZVZhbHVlIDwgdyAtIGVsU2l6ZSAtIHNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgfVxuICAgICAgaWYgKCgoc2NlbmUgKiBzZXR0aW5ncy5zbGlkZU1vdmUpIDwgbGVuZ3RoIC0gc2V0dGluZ3Muc2xpZGVNb3ZlKSAmJiBuZXh0SSkge1xuICAgICAgICBzZXR0aW5ncy5vbkJlZm9yZU5leHRTbGlkZS5jYWxsKHRoaXMsICRlbCwgc2NlbmUpO1xuICAgICAgICBzY2VuZSsrO1xuICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgIGlmIChzZXR0aW5ncy5nYWxsZXJ5ID09PSB0cnVlKSB7XG4gICAgICAgICAgcGx1Z2luLnNsaWRlVGh1bWIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmxvb3AgPT09IHRydWUpIHtcbiAgICAgICAgICBzZXR0aW5ncy5vbkJlZm9yZU5leHRTbGlkZS5jYWxsKHRoaXMsICRlbCwgc2NlbmUpO1xuICAgICAgICAgIHNjZW5lID0gMDtcbiAgICAgICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmdhbGxlcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBsdWdpbi5zbGlkZVRodW1iKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKCdyaWdodEVuZCcpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdyaWdodEVuZCcpO1xuICAgICAgICAgIH0sIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgICRlbC5tb2RlID0gZnVuY3Rpb24gKF90b3VjaCkge1xuICAgICAgaWYgKHNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICYmIHNldHRpbmdzLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAkZWwuY3NzKCdoZWlnaHQnLCAkY2hpbGRyZW4uZXEoc2NlbmUpLm91dGVySGVpZ2h0KHRydWUpKTtcbiAgICAgIH1cbiAgICAgIGlmIChvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICBpZiAocGx1Z2luLmRvQ3NzKCkpIHtcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygnbFNTbGlkZScpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnNwZWVkICE9PSAnJykge1xuICAgICAgICAgICAgICAkc2xpZGUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgc2V0dGluZ3Muc3BlZWQgKyAnbXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5jc3NFYXNpbmcgIT09ICcnKSB7XG4gICAgICAgICAgICAgICRzbGlkZS5jc3MoJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJywgc2V0dGluZ3MuY3NzRWFzaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHBsdWdpbi5kb0NzcygpKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3Muc3BlZWQgIT09ICcnKSB7XG4gICAgICAgICAgICAgICRlbC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBzZXR0aW5ncy5zcGVlZCArICdtcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmNzc0Vhc2luZyAhPT0gJycpIHtcbiAgICAgICAgICAgICAgJGVsLmNzcygndHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nLCBzZXR0aW5ncy5jc3NFYXNpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFfdG91Y2gpIHtcbiAgICAgICAgc2V0dGluZ3Mub25CZWZvcmVTbGlkZS5jYWxsKHRoaXMsICRlbCwgc2NlbmUpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgcGx1Z2luLnNsaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbHVnaW4uZmFkZSgpO1xuICAgICAgfVxuICAgICAgaWYgKCEkc2xpZGUuaGFzQ2xhc3MoJ2xzLWhvdmVyJykpIHtcbiAgICAgICAgcGx1Z2luLmF1dG8oKTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIV90b3VjaCkge1xuICAgICAgICAgIHNldHRpbmdzLm9uQWZ0ZXJTbGlkZS5jYWxsKHRoaXMsICRlbCwgc2NlbmUpO1xuICAgICAgICB9XG4gICAgICB9LCBzZXR0aW5ncy5zcGVlZCk7XG4gICAgICBvbiA9IHRydWU7XG4gICAgfTtcbiAgICAkZWwucGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICBzZXR0aW5ncy5hdXRvID0gdHJ1ZTtcbiAgICAgIHBsdWdpbi5hdXRvKCk7XG4gICAgfTtcbiAgICAkZWwucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXR0aW5ncy5hdXRvID0gZmFsc2U7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9O1xuICAgICRlbC5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVmcmVzaC5pbml0KCk7XG4gICAgfTtcbiAgICAkZWwuZ2V0Q3VycmVudFNsaWRlQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2MgPSBzY2VuZTtcbiAgICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XG4gICAgICAgIHZhciBsbiA9ICRzbGlkZS5maW5kKCcubHNsaWRlJykubGVuZ3RoLFxuICAgICAgICAgIGNsID0gJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoO1xuICAgICAgICBpZiAoc2NlbmUgPD0gY2wgLSAxKSB7XG4gICAgICAgICAgc2MgPSBsbiArIChzY2VuZSAtIGNsKTtcbiAgICAgICAgfSBlbHNlIGlmIChzY2VuZSA+PSAobG4gKyBjbCkpIHtcbiAgICAgICAgICBzYyA9IHNjZW5lIC0gbG4gLSBjbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzYyA9IHNjZW5lIC0gY2w7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzYyArIDE7XG4gICAgfTtcbiAgICAkZWwuZ2V0VG90YWxTbGlkZUNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICRzbGlkZS5maW5kKCcubHNsaWRlJykubGVuZ3RoO1xuICAgIH07XG4gICAgJGVsLmdvVG9TbGlkZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICBpZiAoc2V0dGluZ3MubG9vcCkge1xuICAgICAgICBzY2VuZSA9IChzICsgJGVsLmZpbmQoJy5jbG9uZS5sZWZ0JykubGVuZ3RoIC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZSA9IHM7XG4gICAgICB9XG4gICAgICAkZWwubW9kZShmYWxzZSk7XG4gICAgICBpZiAoc2V0dGluZ3MuZ2FsbGVyeSA9PT0gdHJ1ZSkge1xuICAgICAgICBwbHVnaW4uc2xpZGVUaHVtYigpO1xuICAgICAgfVxuICAgIH07XG4gICAgJGVsLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJGVsLmxpZ2h0U2xpZGVyKSB7XG4gICAgICAgICRlbC5nb1RvUHJldlNsaWRlID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAkZWwuZ29Ub05leHRTbGlkZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgJGVsLm1vZGUgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5wbGF5ID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAkZWwucGF1c2UgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5yZWZyZXNoID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAkZWwuZ2V0Q3VycmVudFNsaWRlQ291bnQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5nZXRUb3RhbFNsaWRlQ291bnQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5nb1RvU2xpZGUgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICRlbC5saWdodFNsaWRlciA9IG51bGw7XG4gICAgICAgIHJlZnJlc2ggPSB7XG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkgeyB9XG4gICAgICAgIH07XG4gICAgICAgICRlbC5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcubFNBY3Rpb24sIC5sU1BhZ2VyJykucmVtb3ZlKCk7XG4gICAgICAgICRlbC5yZW1vdmVDbGFzcygnbGlnaHRTbGlkZXIgbFNGYWRlIGxTU2xpZGUgbHNHcmFiIGxzR3JhYmJpbmcgbGVmdEVuZCByaWdodCcpLnJlbW92ZUF0dHIoJ3N0eWxlJykudW53cmFwKCkudW53cmFwKCk7XG4gICAgICAgICRlbC5jaGlsZHJlbigpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICRjaGlsZHJlbi5yZW1vdmVDbGFzcygnbHNsaWRlIGFjdGl2ZScpO1xuICAgICAgICAkZWwuZmluZCgnLmNsb25lJykucmVtb3ZlKCk7XG4gICAgICAgICRjaGlsZHJlbiA9IG51bGw7XG4gICAgICAgIGludGVydmFsID0gbnVsbDtcbiAgICAgICAgb24gPSBmYWxzZTtcbiAgICAgICAgc2NlbmUgPSAwO1xuICAgICAgfVxuXG4gICAgfTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldHRpbmdzLm9uU2xpZGVyTG9hZC5jYWxsKHRoaXMsICRlbCk7XG4gICAgfSwgMTApO1xuICAgICQod2luZG93KS5vbigncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaC5pbml0KCk7XG4gICAgICB9LCAyMDApO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xufShqUXVlcnkpKTsiLCIvKlxuICogQEF1dGhvcjogUmFqa2VzaHdhciBQcmFzYWQocmFqa2VzaHdhci5wZEBnbWFpbC5jb20pIFxuICogQERhdGU6IDIwMTktMDItMjMgMjI6MjQ6MzIgXG4gKiBATGFzdCBNb2RpZmllZCBieTogUmFqa2VzaHdhciBQcmFzYWRcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTktMDMtMTkgMjM6MTY6NTBcbiAqL1xuXG5yZXF1aXJlKCcuL2FwcC9zdHlsZXMuc2NzcycpO1xucmVxdWlyZSgnLi9hcHAvc2xpZGVyL3NsaWRlci5zY3NzJyk7XG5yZXF1aXJlKCcuL2Fzc2V0cy9lcy1zbGlkZXInKTtcblxuaW1wb3J0IENlQ2hlY2tib3ggZnJvbSAnLi9hcHAvY2hlY2tib3gvY2UtY2hlY2tib3gnO1xuaW1wb3J0IHsgXG4gIENlQWNjb3JkaW9uLCBDZUFjY29yZGlvbkhlYWRpbmcsIENlQWNjb3JkaW9uUGFuZWwgXG59IGZyb20gJy4vYXBwL2FjY29yZGlvbi9jZS1hY2NvcmRpb24nO1xuXG5pbXBvcnQgeyBDZVRhYiwgQ2VUYWJzLCBDZVRhYlBhbmVsIH0gZnJvbSAnLi9hcHAvdGFicy9jZS10YWInO1xuaW1wb3J0IHsgQ2VUb2dnbGVCdXR0b24gfSBmcm9tICcuL2FwcC90b2dnbGUvY2UtdG9nZ2xlJztcbmltcG9ydCB7IENlVG9vbHRpcCB9IGZyb20gJy4vYXBwL3Rvb2x0aXAvY2UtdG9vbHRpcCc7XG5pbXBvcnQgeyBDZVJhZGlvQnV0dG9uLCBDZVJhZGlvR3JvdXAgfSBmcm9tICcuL2FwcC9yYWRpb2dyb3VwL2NlLXJhZGlvZ3JvdXAnO1xuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1jaGVja2JveCcsIENlQ2hlY2tib3gpOyBcblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtYWNjb3JkaW9uJywgQ2VBY2NvcmRpb24pO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtYWNjb3JkaW9uLWhlYWRpbmcnLCBDZUFjY29yZGlvbkhlYWRpbmcpO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtYWNjb3JkaW9uLXBhbmVsJywgQ2VBY2NvcmRpb25QYW5lbCk7XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRhYicsIENlVGFiKTtcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NlLXRhYnMnLCBDZVRhYnMpO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtdGFiLXBhbmVsJywgQ2VUYWJQYW5lbCk7IFxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS10b2dnbGUtYnV0dG9uJywgQ2VUb2dnbGVCdXR0b24pO1xuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS10b29sdGlwJywgQ2VUb29sdGlwKTtcblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY2UtcmFkaW8tYnV0dG9uJywgQ2VSYWRpb0J1dHRvbik7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjZS1yYWRpby1ncm91cCcsIENlUmFkaW9Hcm91cCk7XG5cblxucmVxdWlyZSgnLi9hcHAvdWktcm91dGVyJyk7XG5yZXF1aXJlKCcuL2FwcC9saW5rcycpO1xucmVxdWlyZSgnLi9hcHAvZXZlbnQvZXZlbnQnKTtcblxucmVxdWlyZSgnLi9hcHAvYnV0dG9uL2J1dHRvbicpO1xucmVxdWlyZSgnLi9hcHAvdHJlZS90cmVlJyk7XG5yZXF1aXJlKCcuL2FwcC9zbGlkZXIvc2xpZGVyJyk7XG5yZXF1aXJlKCcuL2FwcC9zbGlkZXIvY2Utc2xpZGVyJyk7XG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9