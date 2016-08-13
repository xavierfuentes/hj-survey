import stepsTemplate from './steps.html';
import surveyTemplate from './survey.html';

/**
 * @class Survey
 */
class Survey {

  constructor() {
    // Create options by extending defaults with the passed in settings
    this.state = {
      activeStep: 1,
      maxStep: 4,
    };

    this.show = this._renderSurvey.bind(this);

    this._stepsHTML = this._buildFragment(stepsTemplate);
    this._surveyHTML = this._buildFragment(surveyTemplate);
  }

  _renderSurvey() {
    // 2. get the current step (from LS?)
    // 3. remove the previous step
    // 4. build the current step
    const step = this._getStep(this.state.activeStep);
    // 5. append the current step to the survey
    this._surveyHTML.getElementById('steps-wrapper').appendChild(step);
    // 6. render the survey
    document.body.appendChild(this._surveyHTML);
  }

  /**
   * Selects the step based on its ID
   * @param  {Number} [step=1] The number of the step
   * @return {Object}          The selected node
   */
  _getStep(step = 1) {
    return this._stepsHTML.getElementById(`step${step}`);
  }

  /**
   * Builds a document fragment from an HTML string
   * @param  {String} content The HTML to render
   * @return {Object}         Document fragment
   */
  _buildFragment(content) {
    const contentHolder = document.createElement('div');
    const docFrag = document.createDocumentFragment();

    contentHolder.innerHTML = content;
    docFrag.appendChild(contentHolder);

    return docFrag;
  }
}

export default Survey;
