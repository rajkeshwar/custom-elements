

export const GestureEventListeners = dedupingMixin(

  (superClass) => {

    class GestureEventListeners extends superClass {

      _addEventListenerToNode(node, eventName, handler) {
        if (!addListener(node, eventName, handler)) {
          super._addEventListenerToNode(node, eventName, handler);
        }
      }

      _removeEventListenerFromNode(node, eventName, handler) {
        if (!removeListener(node, eventName, handler)) {
          super._removeEventListenerFromNode(node, eventName, handler);
        }
      }
    }

    return GestureEventListeners;
  });