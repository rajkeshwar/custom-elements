
import { classMap, toCamelCase } from '../utils/dom-utils';
import { CEElement } from '../ce-element';

export class Checkbox extends CEElement {

  static get is() {
    return 'ce-checkbox';
  }

  static get observedAttributes() {
    return [
      'value', 'name', 'disabled', 'checked', 'binary', 'label', 'tabindex',
      'inputid', 'style', 'style-class', 'label-style-class'
    ];
  }

  constructor() {
    super();

    this.$checkboxWpr = /** @type {HTMLElement} */ null;
    this.$checkboxBox = /** @type {HTMLElement} */ null;
    this.$checkboxLabel = /** @type {HTMLElement} */ null;
    this.$checkboxInput = /** @type {HTMLElement} */ null;
  }

  _render() {
    super._removeEventListeners();
    super._copyObservedAttributes();
    console.log('checked: %o, disabled: %o, focused: %o', this.checked, this.disabled, this.focused);

    this.innerHTML = `
      <div $checkbox-wpr class="ui-chkbox ui-widget">
        <div class="ui-helper-hidden-accessible">
          <input $checkbox-input type="checkbox" 
            id="${this.inputid}" 
            name="${this.name}" 
            value="${this.value}" 
            tabindex="${this.tabindex || 1}"
            class="${this.focused ? 'ui-state-focus':''}"
            @click="_handleClickEvent" 
            @focus="_handleFocusEvent" 
            @blur="_handleBlurEvent"
            @change="_handleChangeEvent">
        </div>
        <div $checkbox-box class="${classMap({
          'ui-chkbox-box ui-widget':true,
          'ui-corner-all ui-state-default': true,
          'ui-state-active': this.checked,
          'ui-state-disabled': this.disabled,
          'ui-state-focus': this.focused
        })}">
          <span class="${classMap({
            'ui-chkbox-icon ': true,
            'ui-clickable': true,
            'pi pi-check': this.checked
          })}"></span>
        </div>
      </div>
      <label $checkbox-label 
        @click="_handleClickEvent" 
        class="${classMap({
          'ui-chkbox-label': true, 
          'ui-label-active': this.checked, 
          'ui-label-disabled': this.disabled, 
          'ui-label-focus': this.focused
        })}" for="${this.inputid}">${this.label}
      </label>
    `;

    super._attachElementRefs();
    super._addEventListeners();
  }

  connectedCallback() {
    this._render();
    super.suppliedAttribues.forEach(attrName => {
      const camelizedName = toCamelCase(attrName);
      this._mapAttribute(camelizedName, this[camelizedName]);
    })
  }

  _handleClickEvent(evt) {
    evt.preventDefault();
        
    if(this.disabled) {
      return;
    }
    
    this.checked = !this.checked;
    this.$checkboxInput.focus();
  }

  _handleFocusEvent(e) {
    this.focused = true;
    this._render();
  }

  _handleBlurEvent(e) {
    this.focused = false;
    this._render();
  }

  _handleChangeEvent(evt) {
    this.checked = evt.target.checked;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName && oldValue !== newValue) {
      this[toCamelCase(attrName)] = newValue;
      this._render();
      this._mapAttribute(attrName, newValue);
    }
  }

  _mapAttribute(attrName, attrValue) {

    switch (attrName) {
      case 'style': {
        console.log('got ', attrName);
        this.$checkboxWpr.style = attrValue;
      }; break;

      case 'style-class': {
        console.log('got ', attrName);
        this.$checkboxWpr.classList.add(attrValue);
      }; break;

      case 'label-style-class': {
        console.log('got ', attrName);
        this.$checkboxLabel.classList.add(attrValue);
      }; break;

      case 'checked': {
        console.log('got ', attrName)
        this.$checkboxInput.setAttribute('checked', '');
      }; break;

      case 'disabled': {
        console.log('got ', attrName)
        this.$checkboxInput.setAttribute('disabled', '');
      }; break;
    }
  }
}

customElements.define(Checkbox.is, Checkbox);