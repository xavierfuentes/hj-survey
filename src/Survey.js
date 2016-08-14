import uuid from 'uuid';

const _factory = document.createElement('div');
const _templates = {
  container: '<div></div>',
  dialog: '<div id="survey-dialog"></div>',
  content: '<div id="survey-content"></div>',
  header: '<div id="survey-header"></div>',
  step: '<div id="survey-step"></div>',
  footer: '<div id="survey-footer"></div>',
};
const _initialState = {
  initialStep: 1,
  activeStep: 1,
  maxStep: 4,
};

/**
 * Builds an HTML node from a string
 * @param  {String} content The HTML to render
 * @return {Object}         DOM node
 */
function buildNode(content) {
  _factory.innerHTML = '';
  _factory.innerHTML = content;

  return _factory.childNodes[0];
}

/**
 * @class Survey
 */
class Survey {
  constructor() {
    this.id = uuid.v4();
    this.state = Object.assign({}, _initialState);

    this._html = {};
    this._templates = Object.assign({}, _templates);

    this._render();
  }

  show() {
    const html = this._html;
    console.log(html);
    document.body.appendChild(html.container);
  }

  _render() {
    const html = this._html;
    const tpls = this._templates;

    html.container = buildNode(tpls.container);
    html.dialog = buildNode(tpls.dialog);
    html.content = buildNode(tpls.content);
    html.header = buildNode(tpls.header);
    html.step = buildNode(tpls.step);
    html.footer = buildNode(tpls.footer);

    // sets a unique id for the container
    html.container.id = this.id;

    this._renderHeader();
    this._renderSteps();
    this._renderFooter();

    html.dialog.appendChild(html.content);
    html.container.appendChild(html.dialog);

    return this;
  }

  _renderHeader() {
    const html = this._html;

    html.header.innerHTML = '<div id="survey-title">One fine survey</div>';
    html.content.appendChild(html.header);
  }

  _renderSteps() {
    const html = this._html;

    html.step.innerHTML = `
      <div id="survey-step-1">step #1</div>
      <div id="survey-step-2">step #2</div>
      <div id="survey-step-3">step #3</div>
      <div id="survey-step-4">step #4</div>
    `;
    html.content.appendChild(html.step);
  }

  _renderFooter() {
    const html = this._html;

    html.footer.innerHTML = `
      <button>Previous</button>
      <button>Next</button>
    `;
    html.content.appendChild(html.footer);
  }
}

export default Survey;
