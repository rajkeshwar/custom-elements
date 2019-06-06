

export class UiEvent extends HTMLElement {

  constructor() {
    super();

    this.name = 'Rajkeshwar';
    this.city = 'Hyderabad';

    requestAnimationFrame(_ => {
      this.innerHTML = this._render();
      console.log('Constructor gets called');
      this._addEventListeners();
    });
  }
  
  _render () {
    return `
      <div class="parent">
        <button @click="showName">Show Name</button>
        <button @click="showName">Event, Name</button>
        <span>${this.name}</span>
        <br>
        <button @click="showCity">Show City</button>
        <h3>${this.city}</h3>
      </div>
    `;
  }

  showName (evt) {
    console.log('showName: ', evt);
    this.name = evt.target;
  }

  showCity(evt) {
    console.log('showCity: ', evt.target);
    this.city = evt.target;
  }

  _addEventListeners () {
    console.log('event listeners called');
    this.querySelectorAll('*')
      .forEach(el => {
        Array.from(el.attributes)
          .filter(attr => /^@/.test(attr.name))
          .forEach(attr => {
            const targetFn = eval(this[attr.value]);
            const eventName = attr.name.replace(/^@/, '');
            console.log('eventName: ', eventName, targetFn);

            el.addEventListener(eventName, evt => {
              targetFn.apply(el, [evt]);
            });
          })
      })
  }

  _bindEvents () {
    console.log(attr.name, attr.value)
    const functionAndParams = /^([a-zA-Z]+)\((.*)\)/.exec(attr.value);
    const eventName = attr.name.replace(/^@/, '');
    const targetFn = eval(this[functionAndParams[1]]);
    const params = functionAndParams[2].split(/,/);

    console.log('hello.....', eventName, targetFn, params);

    el.addEventListener(eventName, (evt) => {
      console.log('Running change detection');
      if(params[0] === '$event') {
        targetFn.apply(el, [evt, ...params]);
      } else {
        targetFn.apply(el, [1, 2]);
      }
    })
  }

  connectedCallback() {
    // console.log('UiRouter rocks now');
  }

  disconnectedCallback() {
    // console.log('attachedCallback called');
  }

}


window.customElements.define('ui-event', UiEvent);