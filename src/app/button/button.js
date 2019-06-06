

const classMap = (classObj) => {
  return Object.keys(classObj).filter(clz => classObj[clz]).join(' ');
}

const styleMap = (styleObj) => {
  return Object.keys(styleObj).filter(style => styleObj[style]).join(' ');
}

export class Button extends HTMLElement {

  static get is () {
    return 'ce-button';
  }

  static get observedAttributes () {
    return ['disabled', 'icon-pos', 'icon'];
  }

  constructor() {
    super();
    this._attributeSetup();
    this._render();
  }

  _attributeSetup() {
    this._iconPos = this.getAttribute('icon-pos') || 'left';
    this._iconClass = this.getAttribute('icon');
    this._isDisabled = this.hasAttribute('disabled');
    this._isIconOnly = this.hasAttribute('icon-only');
    this._styles = this.getAttribute('style');
    this._styleClass = this.getAttribute('class');
  }

  _render() {
    this.innerHTML = `
      <button type="button" class="${classMap({
        'ui-button ui-widget ui-state-default ui-corner-all':true,
        'ui-button-text-icon-left': (this._iconPos === 'left'), 
        'ui-button-text-icon-right': (this._iconPos === 'right'),
        'ui-button-icon-only': this._isIconOnly,
        'ui-state-disabled': this._isDisabled
      })}">
        <span class="${classMap({
          'js-icon-type': true,
          'ui-clickable': true,
          'ui-button-icon-left': (this._iconPos === 'left'), 
          'ui-button-icon-right': (this._iconPos === 'right')
        })}">
        </span>
        <span class="ui-button-text ui-clickable">${this.textContent || 'ui-btn'}</span>
      </button>
    `;
  }

  connectedCallback () {

    this.$icon = this.querySelector('.js-icon-type');
    this.$button = this.querySelector('button');

    if(this._iconClass) {
      this.$icon.className += ' ' + this._iconClass;
    } else {
      this.$icon.parentElement.removeChild(this.$icon);
    }

    if(this._styleClass) {
      this.$button.className += ' ' + this._styleClass;
    }

    if(this._styles) {
      this.$button.style = this._styles;
    }
  }

  attributeChangedCallback (attrName, oldValue, newValue) {
    if(attrName && oldValue !== newValue) {
      this._attributeSetup();
      this._render();
    }
  }
}

customElements.define(Button.is, Button);