/*
 * @Author: Rajkeshwar Prasad(rajkeshwar.pd@gmail.com) 
 * @Date: 2019-02-23 23:30:11 
 * @Last Modified by: Rajkeshwar Prasad
 * @Last Modified time: 2019-03-02 19:29:42
 */

window.onload = bindLinks;


function bindLinks() {
  const links = document.querySelectorAll('[href]');
  links.forEach(link => link.addEventListener('click', hijackLinks)) 
}

function hijackLinks(evt) {
  evt.preventDefault();
  const page = evt.target.getAttribute('href');

  _loadView(page);
}

function _loadView (pageUrl) {

  const xhr = new XMLHttpRequest();

  xhr.onload = evt => {
    const newDoc = evt.target.response;
    const routerSlot = document.querySelector('ui-router');

    routerSlot.innerHTML = newDoc;
    
  };
  xhr.responseType = 'text';
  xhr.open('GET', `app/${pageUrl}/demo.html`);
  xhr.send();
}