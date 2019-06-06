import { CEElement } from "../ce-element";
import { classMap, repeat, KeyCode } from "../utils/dom-utils";

export class Chips extends CEElement {

  static get is () {
    return 'ce-chips';
  }

  static get observedAttributes () {
    return ['disabled'];
  }

  constructor() {
    super();

    this.style            = /** @type {Attribute} */ '';
    this.styleClass       = /** @type {Attribute} */ '';
    this.disabled         = /** @type {Attribute} */ false;
    this.field            = /** @type {Attribute} */ '';
    this.placeholder      = /** @type {Attribute} */ 'Select...';
    this.max              = /** @type {Attribute} */ 3;
    this.tabindex         = /** @type {Attribute} */ 0;
    this.inputId          = /** @type {Attribute} */ '';
    this.allowDuplicate   = /** @type {Attribute} */ true;
    this.inputStyle       = /** @type {Attribute} */ '';
    this.inputStyleClass  = /** @type {Attribute} */ '';
    this.addOnTab         = /** @type {Attribute} */ false;
    this.addOnBlur        = /** @type {Attribute} */ false;

    this.$inputText       = /** @type {HTMLElement} */ null;

    this.value = [1,2,3];
  }

  _render() {
    super._removeEventListeners();
    super._copyObservedAttributes();

    this.innerHTML = `
      <div class="${classMap({
          'ui-chips ui-widget': true
        })}" 
        @click="_handleClickEvent">
        <ul class="${classMap({
            'ui-inputtext ui-state-default ui-corner-all': true,
            'ui-state-focus': this.focus,
            'ui-state-disabled': this.disabled
          })}">

          ${repeat(this.value, (item, i) => (`
            <li class="ui-chips-token ui-state-highlight ui-corner-all" 
              item="${item}" item-index="${i}" 
              @click="_handleItemClick">
                <span class="ui-chips-token-icon pi pi-fw pi-times" 
                  @click="_handleItemRemove"></span>
                <span class="ui-chips-token-label">${item}</span>
            </li>
          `))}
          
          <li class="ui-chips-input-token">
            <input $input-text type="text" id="${this.inputid}" 
              placeholder="${this.placeholder}" 
              tabindex="${this.tabindex}" 
              @keydown="_handleKeydownEvent" 
              @focus="_handleInputFocusEvent" 
              @blur="_handleInputBlurEvent">
          </li>
        </ul>
      </div>
    `;
    
    super._attachElementRefs();
    super._addEventListeners();
  }


  connectedCallback () {
    this._render();
  }

  _handleClickEvent(evt) {
    evt.stopPropagation();
    this.focus = true;
    this.$inputText.focus();
  }

  _handleKeydownEvent(evt) {
    switch(evt.which) {
      case KeyCode.BACKSPACE: this._handleItemRemove(evt); break;
      case KeyCode.ENTER: this._addItem(evt, this.$inputText.value); break;
      default: 'handle max value'; break;
    }
  }

  _handleInputFocusEvent(evt) {
    this.focus = true;
  }

  _handleInputBlurEvent(evt) {
    evt.stopPropagation();

    this.focus = false;
    if ( this.$inputText.value ) {
      this._addItem(evt, this.$inputText.value);
    }
  }

  _handleItemRemove(evt) {
    if( this.disabled ) return;

    if(this.$inputText.value.length === 0) {

      const targetElement = evt.target.tagName === 'INPUT' 
        ? evt.target.parentElement.previousElementSibling
        : evt.target.parentElement;

      const index = Number(targetElement.getAttribute('item-index'));
      this.value = this.value.filter((val, i) => i != index);

      this.dispatchEvent(new CustomEvent('chips:removed', {
        originalEvent: event,
        value: this.value[index]
      }));
  
      this._render();
      requestAnimationFrame(_ => this.$inputText.focus());
    }
  }

  _handleItemClick(evt) {
    const customEvent = new CustomEvent('chips:click', {
      originalEvent: event,
      value: evt.target
    })

    this.dispatchEvent(customEvent);
  }

  _addItem(event, item) {
    this.value = this.value || [];
    if (item && item.trim().length) {
      if (!this.value.includes(item)) {
        this.value = [...this.value, item];

        this.dispatchEvent(new CustomEvent('chips:added', {
          originalEvent: event,
          value: item
        }));

        this._render();
        this.$inputText.value = '';
        requestAnimationFrame(_ => this.$inputText.focus());
      }
    }
  }

  attributeChangedCallback (attrName, oldValue, newValue) {
    
  }

}

customElements.define(Chips.is, Chips);