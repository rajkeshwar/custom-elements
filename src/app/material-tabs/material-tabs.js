


export class MaterialTabs extends HTMLElement {

  static get is () {
    return 'mtl-tabs';
  }

  static get observedAttributes () {
    return ['disabled'];
  }

  connectedCallback () {
    
  }

  disconnectedCallback () {

  }

  attributeChangedCallback (attrName, oldValue, newValue) {
    
  }

  _render() {
    return (`
      <div class="material-tabs">
        
      </div>
    `)
  }
}

customElements.define(MaterialTabs.is, MaterialTabs);