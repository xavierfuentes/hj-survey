import Survey from './Survey';
import store from './store';

// check if the survey has been already completed
// if not create an instance and render it after 2s.
const timeoutID = window.setTimeout(() => {
  // get the global object and reassign it to the Survey
  window.xjs = new Survey(store);
  // pretty obvious
  window.xjs.render();
  // delete the timeout for cleaning a bit of memory
  clearTimeout(timeoutID);
}, 2000);
