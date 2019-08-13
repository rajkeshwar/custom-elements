

import style from './doc-tree.scss';
import TreeData from './tree-data';

export class DocTree extends HTMLElement {

  static get is () {
    return 'ce-doc-tree';
  }

  static get observedAttributes () {
    return ['disabled'];
  }

  constructor () {
    super();
    this.innerHTML = `
      <style>${style}</style>
      ${this._renderTree([TreeData])}
    `;
  }

  _renderTree (data) {
    return this.buildNode(data);
  }

  buildNode (data) { 
    return (`
      <ul class="ce-tree-content" ce-tree="">
        ${data.reduce((t, d) => {
          t += (`
            <li ce-folder class="ce-tree-folder" aria-expanded="false">
              <i class="ce-tree-icon" data-type="${d.type}"></i>
              <span class="ce-tree-item-name">${d.name}</span>
              ${d.children ? this.buildNode(d.children) : ''}
            </li>
          `);
          return t;
        }, '')}
      </ul>
    `);
  } 

  connectedCallback () {
    const folders = this.querySelectorAll('[ce-folder]');
    Array.from(folders).forEach(el => {
      el.addEventListener('click', evt => this.handleClick(evt, el))
    });

    // Expand the very first folder
    folders[0].setAttribute('aria-expanded', true);
    this.activeElement = folders[0].querySelector('.ce-tree-item-name');
  }

  handleClick(evt, el) {
    let isExpanded = el.getAttribute('aria-expanded');
    if(isExpanded === 'true') {
      el.setAttribute('aria-expanded', false);
    } else {
      el.setAttribute('aria-expanded', true);
    }

    this.activeElement.classList.remove('active');
    this.activeElement = el.querySelector('.ce-tree-item-name');
    this.activeElement.classList.add('active');

    evt.stopPropagation();
  }

  disconnectedCallback () {
    const folders = this.querySelectorAll('[ce-folder]');
    Array.from(folders).forEach(el => {
      el.removeEventListener('click', evt => this.handleClick(evt, el))
    });
  }
}

customElements.define(DocTree.is, DocTree);
