import Survey from './Survey';

const settings = {
  delay: 0,
};

const timeoutID = window.setTimeout(showSurvey, settings.delay);

function showSurvey() {
  const survey = new Survey();

  survey.render();
}
