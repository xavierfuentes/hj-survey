import * as surveyACtions from './reducer';

class Survey {
  constructor(store) {
    this.store = store;
    this.id = this.guid();

    // Global template
    this.template = `
      <div id="survey-dialog-${this.id}">
        <form id="survey-form-${this.id}">
          <div id="survey-header-${this.id}">
            <div id="survey-title-${this.id}">One fine title</div>
            <div id="survey-subtitle-${this.id}">One fine subtitle</div>
          </div>
          <div id="survey-body-${this.id}"></div>
          <div id="survey-footer-${this.id}">
            <button data-action="next-step" type="submit">Next step</button>
            <button data-action="prev-step">Previous step</button>
          </div>
        </form>
      </div>
      <div id="survey-overlay-${this.id}"></div>`;

    // Global styles for the Survey (namespaced with the ID)
    this.styleRules = `
      #survey-${this.id} *,
      #survey-${this.id} *:before,
      #survey-${this.id} *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      #survey-${this.id},
      #survey-dialog-${this.id} {
        margin: auto;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
      }
      #survey-${this.id} {
        width: 100%; height: 100%;
        font-family: "Myriad Pro", Myriad, "Liberation Sans", "Nimbus Sans L", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 15px;
        line-height: 120%;
        font-weight: 300;
      }
      #survey-dialog-${this.id} {
        width: 25.333em; height: 36.667em;
        text-align: center;
        box-shadow: 0 .067em .267em 0 rgba(0, 0, 0, 0.3);
        background-color: #ffffff;
        z-index: 1;
      }
      #survey-form-${this.id} {
        width: 100%; height: 100%;
        padding: 2em;
      }
      #survey-header-${this.id} {
        margin-top: 4em;
        margin-bottom: 3em;
      }
      #survey-title-${this.id} {
        font-size: 1.867em;
        line-height: 150%;
        font-weight: 800;
      }
      #survey-subtitle-${this.id} {
        color: #313034;
        font-size: 1.400em;
        font-weight: 300;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container {
        margin-top: 1em;
        margin-bottom: 1em;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container,
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container > input,
      #survey-form-${this.id} > #survey-body-${this.id} > .check-container,
      #survey-form-${this.id} > #survey-body-${this.id} > .radio-container,
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container > select,
      #survey-form-${this.id} > #survey-footer-${this.id} > button[data-action="next-step"] {
        height: 3.333em;
        width: 100%;
        border-radius: .267em;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container > input,
      #survey-form-${this.id} > #survey-body-${this.id} > .check-container,
      #survey-form-${this.id} > #survey-body-${this.id} > .radio-container,
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container > select {
        background-color: #ffffff;
        color: rgba(146, 144, 150, 1);
        border: .067em solid #e1e1e1;
        line-height: 100%;
        padding: .933em;
        outline: none;
        transition: all .3s ease-out;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container > input {
        box-shadow: none;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container > input:focus,
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container > select:focus {
        border: .067em solid #f4364c;
        box-shadow: inset 0 0 0 1px #f4364c;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container > input::-webkit-input-placeholder {
        opacity: 1;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .input-container > select {
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .check-container,
      #survey-form-${this.id} > #survey-body-${this.id} > .radio-container {
        text-align: left;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .check-container > label,
      #survey-form-${this.id} > #survey-body-${this.id} > .radio-container > label {
        float: right;
        margin-left: .5em;
      }
      #survey-form-${this.id} > #survey-body-${this.id} > .check-container > label > input,
      #survey-form-${this.id} > #survey-body-${this.id} > .radio-container > label > input {
        margin-right: .266em;
      }
      #survey-form-${this.id} > #survey-footer-${this.id} {
        margin-top: 2em;
      }
      #survey-form-${this.id} > #survey-footer-${this.id} > button {
        cursor: pointer;
        outline: none;
        display: block;
        padding: 0;
        font-size: 1.2em;
        font-weight: 800;
        border: none;
        background-color: transparent;
      }
      #survey-form-${this.id} > #survey-footer-${this.id} > button[data-action="next-step"] {
        background-color: #f4364c;
        box-shadow: 0 .067em .267em 0 rgba(0, 0, 0, 0.3);
        color: #ffffff;
        min-height: 2.777em;
        height: 2.777em;
        transition: all .3s ease-out;
      }
      #survey-form-${this.id} > #survey-footer-${this.id} > button[data-action="next-step"]:hover {
        box-shadow: 0 .067em .467em .133em rgba(0, 0, 0, 0.3);
      }
      #survey-form-${this.id} > #survey-footer-${this.id} > button[data-action="prev-step"] {
        color: #f4364c;
        margin-top: 1em;
      }
      #survey-form-${this.id} > #survey-footer-${this.id} > img {
        width: 60%;
        margin-top: 6em;
        opacity: .5;
      }
      #survey-overlay-${this.id} {
        position: absolute;
        width: 100%; heigth: 100%;
        top: 0; bottom: 0; left: 0; right: 0;
        background: #ffffff;
        opacity: .6;
      }`;

    // Container for all the survey
    this.$el = this.build('div', this.template, `survey-${this.id}`);
    // Style tag that will be injected in the HEAD
    this.$style = this.build('style', this.styleRules);

    // subscribe the method "update" to any change in the store
    this.store.subscribe(this.update.bind(this));
  }

  /**
   * Generates a random unique id
   * @return String AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA
   */
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  /**
   * Generates a DOM node
   * @param el String Tag of the new node
   * @param content String content of the new node
   * @param id String optional. Id of the node
   * @return the new DOM node
   */
  build(el, content = '', id = null) {
    const _f = document.createElement(el);
    _f.innerHTML = content;
    if (id) _f.id = id;
    return _f;
  }

  /**
   * Main public event:
   * - Add listeners for all the events that must be tracked
   * - Check if the Survey should be rendered (if it's not finished in LS)
   * - Renders the step necessary
   * - Appends the main Container to the body and the Style to the head
   */
  render() {
    const state = this.store.getState();
    // sets the events up
    this.$el.addEventListener('click', this.handleClick.bind(this));
    this.$el.addEventListener('change', this.handleChange.bind(this));
    this.$el.addEventListener('keyup', this.handleChange.bind(this));
    this.$el.addEventListener('submit', this.handleSubmit.bind(this));

    if (state.isCompleted) return true;

    this.update();

    document.head.appendChild(this.$style);
    document.body.appendChild(this.$el);

    return this;
  }

  /**
   * Update the template based on the current state of the Survey
   */
  update() {
    const state = this.store.getState();
    const $title = this.$el.querySelector(`#survey-title-${this.id}`);
    const $subtitle = this.$el.querySelector(`#survey-subtitle-${this.id}`);
    const $step = this.$el.querySelector(`#survey-body-${this.id}`);
    const $prevButton = this.$el.querySelector('[data-action="prev-step"]');
    const $nextButton = this.$el.querySelector('[data-action="next-step"]');
    const $footer = this.$el.querySelector(`#survey-footer-${this.id}`);
    const headerTexts = {
      1: { title: 'Personal Details', subtitle: 'Tell us about yourself' },
      2: { title: 'Business Details', subtitle: 'Tell us about your business' },
      3: { title: 'Location Details', subtitle: 'Where do you live?' },
      4: { title: 'Hobbies', subtitle: 'What are your interests?' },
      5: { title: 'Congratulations', subtitle: 'Thanks for your help!' },
    };
    const stepTemplates = {
      1: `
        <div class="input-container">
          <input autocomplete="off" name="name" type="text" placeholder="Your Name" required autofocus
            value="${state.steps[1].fields.name.value}">
        </div>
        <div class="input-container">
          <input autocomplete="off" name="email" type="email" placeholder="Email Address" required
            value="${state.steps[1].fields.email.value}">
        </div>
        <div class="input-container">
          <select name="type" required>
            <option value="" selected disabled>User Type</option>
            <option value="business"
              ${state.steps[1].fields.type.value === 'business' && 'selected'}>Business</option>
            <option value="individual"
              ${state.steps[1].fields.type.value === 'individual' && 'selected'}>Individual</option>
          </select>
        </div>`,
      2: `
        <div class="input-container">
          <input autocomplete="off" name="business.name" type="text" placeholder="Business Name" required autofocus
            value="${state.steps[2].fields['business.name'].value}">
        </div>
        <div class="input-container">
          <select name="business.size" required>
            <option value="" selected disabled>Number of Employees</option>
            <option value="1-10"
              ${state.steps[2].fields['business.size'].value === '1-10' && 'selected'}>1-10</option>
            <option value="11-25"
              ${state.steps[2].fields['business.size'].value === '11-25' && 'selected'}>11-25</option>
            <option value="26-50"
              ${state.steps[2].fields['business.size'].value === '26-50' && 'selected'}>26-50</option>
            <option value="51-100"
              ${state.steps[2].fields['business.size'].value === '51-100' && 'selected'}>51-100</option>
            <option value="+100"
              ${state.steps[2].fields['business.size'].value === '+100' && 'selected'}>+100</option>
          </select>
        </div>`,
      3: `
        <div class="input-container">
          <input autocomplete="off" name="address" type="text" placeholder="Address" autofocus
            value="${state.steps[3].fields.address.value}">
        </div>
        <div class="input-container radio-container">
          <span>Residing in the EU</span>
          <label>
            <input name="euresident" type="radio" value="0"
              ${state.steps[3].fields.euresident.value === '0' && 'checked'}>
            <span>No</span>
          </label>
          <label>
            <input name="euresident" type="radio" value="1"
              ${state.steps[3].fields.euresident.value === '1' && 'checked'}>
            <span>Yes</span>
          </label>
        </div>`,
      4: `
        <div class="input-container">
          <input autocomplete="off" placeholder="Favourite Book" name="book" type="text" autofocus
            value="${state.steps[4].fields.book.value}">
        </div>
        <div class="input-container check-container">
          <span>Favourite Colors</span>
          <label>
            <input type="checkbox" value="1" name="colors.red"
              ${state.steps[4].fields['colors.red'].value === '1' ? 'checked' : ''}>
            <span>Red</span>
          </label>
          <label>
            <input type="checkbox" value="1" name="colors.green"
              ${state.steps[4].fields['colors.green'].value === '1' ? 'checked' : ''}>
            <span>Green</span>
          </label>
          <label>
            <input type="checkbox" value="1" name="colors.blue"
              ${state.steps[4].fields['colors.blue'].value === '1' ? 'checked' : ''}>
            <span>Blue</span>
          </label>
        </div>
        `,
    };

    this.maxSteps = Object.keys(stepTemplates).length;

    // update title
    $title.innerHTML = headerTexts[state.step].title;
    $subtitle.innerHTML = headerTexts[state.step].subtitle;

    // update step
    if (state.shouldRender && state.step <= this.maxSteps) {
      $step.innerHTML = stepTemplates[state.step];
    }
    if (state.step > this.maxSteps) {
      $step.innerHTML = null;
    }

    // update footer
    if (state.isCompleted) {
      // final step Hotjar logo and hide the buttons in the last "screen"
      $footer.innerHTML = '<img src="//davidpottrell.co.uk/blog/wp-content/uploads/2015/10/hotjar-XL.png">';
    } else {
      // hide the "previous step" in the first step
      $prevButton.style.display = state.step === 1 ? 'none' : 'initial';
      // Change the copy of the button for the last step, before saving it.
      $nextButton.innerText = state.step === this.maxSteps ? 'Send Results' : 'Next step';
    }
  }

  handleClick(e) {
    const state = this.store.getState();

    // Use "event delegation" to check what element has received the event.
    switch (e.target.getAttribute('data-action')) {
      // todo: create a "close" action that hides the survey
      case 'prev-step': this.store.dispatch(surveyACtions.setPrevStep()); break;
      case 'next-step': {
        // Submit the form when the last step is reached
        if (state.step === this.maxSteps) this.submit(state.steps);
        // go to the next step otherwise
        this.store.dispatch(surveyACtions.setNextStep());
        break;
      }
      default: return true;
    }
  }

  // Gets triggered every time a "keyup" or "select" events are triggered
  handleChange(e) {
    // Check "name" to make sure it's a form element who triggers the action
    if (e.target.name) {
      this.store.dispatch(surveyACtions.validateForm({
        field: e.target.name,
        value: e.target.value,
        isValid: e.target.validity.valid, // HTML5 validation API
      }));
    }
  }

  // Callback when the form is submitted
  handleSubmit(e) {
    // this is just to prevent submitting the form automatically.
    e.preventDefault();
  }

  // Build the proper object based on the state and submit the results.
  submit(steps) {
    const form = Object.keys(steps)
      // { fields: { ... }, ... }
      .map((stepKey) => {
        if (steps[stepKey].fields) return steps[stepKey].fields;
      })
      // [ { name: { value: '', ... }, ... }, ... ]
      .reduce((obj, fields) => {
        return Object.assign(
          {}, obj, Object.keys(fields).reduce((o, k) => { o[k] = fields[k].value; return o; }, {})
        );
      }, {});

    // { name: '', ... }
    this.store.dispatch(surveyACtions.saveSurvey({ form }));
  }
}

export default Survey;
