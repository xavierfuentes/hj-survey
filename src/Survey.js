import uuid from 'uuid';

const _factory = document.createElement('div');
const _templates = {
  container: '<div></div>',
  dialog: '<div id="survey-dialog"></div>',
  content: '<div id="survey-content"></div>',
  header: '<div id="survey-header"></div>',
  body: '<div id="survey-body"></div>',
  footer: '<div id="survey-footer"></div>',
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
    this.element = null;

    this._templates = Object.assign({}, _templates);
    this._html = {};
    this._handlers = {};

    this._render()._setEvents()._setStep(1);
  }

  show() {
    const html = this._html;

    document.body.appendChild(html.container);
  }

  _render() {
    const html = this._html;
    const tpls = this._templates;

    html.container = buildNode(tpls.container);
    html.dialog = buildNode(tpls.dialog);
    html.content = buildNode(tpls.content);
    html.header = buildNode(tpls.header);
    html.body = buildNode(tpls.body);
    html.footer = buildNode(tpls.footer);

    // sets a unique id for the container
    html.container.id = this.id;

    this._renderHeader();
    this._renderBody();
    this._renderFooter();

    this.element = html.container;

    html.dialog.appendChild(html.content);
    html.container.appendChild(html.dialog);

    return this;
  }

  _renderHeader() {
    const html = this._html;

    html.header.innerHTML = '<div id="survey-title">One fine survey</div>';
    html.content.appendChild(html.header);
  }

  _renderBody() {
    const html = this._html;

    html.content.appendChild(html.body);
  }

  _renderFooter() {
    const html = this._html;

    html.footer.innerHTML = `
      <button data-action="previous-step">Previous</button>
      <button data-action="next-step">Next</button>
    `;
    html.content.appendChild(html.footer);
  }

  _setStep(step = 1) {
    const body = this.element.querySelector('#survey-body');

    body.innerHTML = `<p>step #${step}</p>`;
  }

  _setEvents() {
    const html = this._html;

    this._handlers.clickHandler = e => this._handleClickEvent(e);
    html.container.addEventListener('click', this._handlers.clickHandler);

    return this;
  }

  _handleClickEvent(e) {
    console.log(e.target.getAttribute('data-action'));

    return true;
  }
}

export default Survey;
