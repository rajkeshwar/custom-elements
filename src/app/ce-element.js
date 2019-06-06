
import { toCamelCase } from './utils/dom-utils';

export class CEElement extends HTMLElement {

  get suppliedAttribues() {
    return this._suppliedAttribues;
  }

  constructor() {
    super();
    this._elementEventQueue = [];
    this._suppliedAttribues = [];
    this._initialized = false;
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _copyObservedAttributes() {
    if (this._initialized) return;

    Array.from(this.attributes).forEach(attr => {
      this[toCamelCase(attr.name)] = attr.value || true;
      this._suppliedAttribues.push(attr.name);
    })

    this._initialized = true;
  }

  _attachElementRefs() {
    this._forEachElement(/^\$/, (el, attr) => {
      this[toCamelCase(attr.name)] = el;
    })
  }

  _addEventListeners() {
    this._forEachElement(/^@/, (el, attr) => {
      const targetFn = eval(this[attr.value]);
      const eventName = attr.name.replace(/^@/, '');
      el.addEventListener(eventName, targetFn.bind(this));
      this._elementEventQueue.push({ el, eventName, targetFn });
    })
  }

  _removeEventListeners() {
    this._elementEventQueue.forEach(obj => {
      obj.el.removeEventListener(obj.eventName, obj.targetFn);
    })
  }

  _forEachElement(REGEX, callbackFn) {
    Array.from(this.querySelectorAll('*'))
      .forEach(el => {
        Array.from(el.attributes)
          .filter(attr => REGEX.test(attr.name))
          .forEach(attr => callbackFn(el, attr))
      })
  }
}
