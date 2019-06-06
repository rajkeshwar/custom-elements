

export class Message extends HTMLElement {

  static get is () {
    return 'ce-message';
  }

  static get observedAttributes () {
    return ['disabled'];
  }

  constructor() {
    super();

    this._icons = {
      'success' : 'pi pi-check',
      'info'    : 'pi pi-info-circle',
      'error'   : 'pi pi-times',
      'warn'    : 'pi pi-exclamation-triangle',
      'default' : 'pi pi-info-circle'
    }

    this.severity = /** @type {Attribute} */ 'info';
    this.text     = /** @type {Attribute} */ '';
  }

  _render() {
    this.innerHTML = `
      <div aria-live="polite" class="ui-message ui-widget ui-corner-all"
        class="ui-message-${this.severity}">
        <span class="ui-message-icon ${this._icons[this.severity]}"></span>
        <span class="ui-message-text">${this.text}</span>
      </div>
    `;
  }

  connectedCallback () {
    this._render();
  }

  attributeChangedCallback (attrName, oldValue, newValue) {
    
  }

}

customElements.define(Message.is, Message);