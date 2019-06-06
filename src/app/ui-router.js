/*
 * @Author: Rajkeshwar Prasad(rajkeshwar.pd@gmail.com) 
 * @Date: 2019-02-23 23:00:42 
 * @Last Modified by: Rajkeshwar Prasad
 * @Last Modified time: 2019-03-18 19:40:38
 */

const template = document.createElement('template');
template.innerHTML = `
  <style></style>
  <slot></slot>
`;

export class UiRouter extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  
  connectedCallback() {
    // console.log('UiRouter rocks now');
  }

  disconnectedCallback() {
    // console.log('attachedCallback called');
  }

}


window.customElements.define('xui-router', UiRouter);