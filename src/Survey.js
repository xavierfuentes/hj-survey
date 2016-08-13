/**
 * @class Survey
 */
class Survey {

  /**
   * @param {Object} [settings]
   */
  constructor() {
    // Create options by extending defaults with the passed in settings
    this.settings = {};

    this.show = this._render.bind(this);
  }

  _render() {
    const content = '<p>Hello world!</p>';
    const contentHolder = document.createElement('div');
    const docFrag = document.createDocumentFragment();

    contentHolder.innerHTML = content;
    docFrag.appendChild(contentHolder);
    document.body.appendChild(docFrag);
  }
}

export default Survey;
