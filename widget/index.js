import Survey from './Survey';
import store from './store';

// check if the survey has been already completed
// if not create an instance and render it after 2s.
const timeoutID = window.setTimeout(() => {
  window.xjs = new Survey(store);
  window.xjs.render();
  clearTimeout(timeoutID);
}, 2000);
