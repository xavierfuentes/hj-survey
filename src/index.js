import Survey from './Survey';
import store from './store';

const settings = {
  delay: 0,
};

const timeoutID = window.setTimeout(showSurvey, settings.delay);

function showSurvey() {
  const survey = new Survey(store);

  survey.render();

  clearTimeout(timeoutID);
}
