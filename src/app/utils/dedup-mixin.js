

let dedupeId = 0;


function MixinFunction(){}

MixinFunction.prototype.__mixinApplications;

MixinFunction.prototype.__mixinSet;

export const dedupingMixin = function(mixin) {
  let mixinApplications = (mixin).__mixinApplications;
  if (!mixinApplications) {
    mixinApplications = new WeakMap();
    (mixin).__mixinApplications = mixinApplications;
  }
  // maintain a unique id for each mixin
  let mixinDedupeId = dedupeId++;
  function dedupingMixin(base) {
    let baseSet = (base).__mixinSet;
    if (baseSet && baseSet[mixinDedupeId]) {
      return base;
    }
    let map = mixinApplications;
    let extended = map.get(base);
    if (!extended) {
      extended = /** @type {!Function} */(mixin)(base);
      map.set(base, extended);
    }
    // copy inherited mixin set from the extended class, or the base class
    // NOTE: we avoid use of Set here because some browser (IE11)
    // cannot extend a base Set via the constructor.
    let mixinSet = Object.create(/** @type {!MixinFunction} */(extended).__mixinSet || baseSet || null);
    mixinSet[mixinDedupeId] = true;
    (extended).__mixinSet = mixinSet;
    return extended;
  }

  return dedupingMixin;
};