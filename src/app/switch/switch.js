import { classMap } from "../utils/dom-utils";
import { CEElement } from "../ce-element";


export class Switch extends CEElement {

  static get is () {
    return 'ce-switch';
  }

  static get observedAttributes () {
    return ['disabled'];
  }

  constructor() {
    super();

    this.style      = /** @type {Attribute} */ '';
    this.styleClass = /** @type {Attribute} */ '';
    this.tabindex   = /** @type {Attribute} */ 0;
    this.inputId    = /** @type {Attribute} */ '';
    this.name       = /** @type {Attribute} */ '';
    this.disabled   = /** @type {Attribute} */ false;
    this.readonly   = /** @type {Attribute} */ false;

    this.$inputCheckbox = /** @type {HTMLElement} */ null;

    this.checked = false;
    this.focused = false;

  }

  _render() {
    super._removeEventListeners();
    super._copyObservedAttributes();

    this.innerHTML = `
      <div class="${classMap({
          'ui-inputswitch ui-widget': true, 
          'ui-inputswitch-checked': this.checked, 
          'ui-state-disabled': this.disabled, 
          'ui-inputswitch-readonly': this.readonly, 
          'ui-inputswitch-focus': this.focused
        })}" 
        @click="_handleClickEvent" 
        role="checkbox" aria-checked="${this.checked}">
        <div class="ui-helper-hidden-accessible">
          <input $input-checkbox type="checkbox" id="${this.inputId}" 
            name="${this.name}" tabindex="tabindex" checked="${this.checked}" 
            @change="_handleInputChange"
            @focus="_handleFocusEvent" 
            @blur="_handleBlurEvent" 
            disabled="${this.disabled}"/>
        </div>
        <span class="ui-inputswitch-slider"></span>
      </div>
    `;

    super._attachElementRefs();
    super._addEventListeners();
  }

  connectedCallback () {
    this._render();
  }

  _handleClickEvent(evt) {
    if (!this.disabled && !this.readonly) {  
      this._toggle(event);
    }
  }

  _handleInputChange(evt) {
    if (!this.readonly) {
      this._toggle(evt);
    }
  }

  _handleFocusEvent(evt) {
    this.focus = true;
  }

  _handleBlurEvent(evt) {
    this.focus = false;
  }

  _toggle(event) {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('switch:toggle', {
      originalEvent: event,
      checked: this.checked
    }));
    this._render();
    this.$inputCheckbox.focus();
  }

  attributeChangedCallback (attrName, oldValue, newValue) {
    
  }

}

customElements.define(Switch.is, Switch);