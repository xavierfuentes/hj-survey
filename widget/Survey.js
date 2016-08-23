import { v4 } from 'uuid';
import * as surveyACtions from './reducer';

class Survey {
  constructor(store) {
    this.id = v4();
    this.template = `
      <div id="survey-dialog-${this.id}">
        <form id="survey-form-${this.id}">
          <div id="survey-header-${this.id}">
            <div id="survey-title-${this.id}">One fine survey</div>
          </div>
          <div id="survey-body-${this.id}"></div>
          <div id="survey-footer-${this.id}">
            <button data-action="next-step" type="submit">Next step</button>
            <button data-action="prev-step">Previous step</button>
          </div>
        </form>
      </div>`;
    this.styleRules = `
    #survey-${this.id}, #survey-dialog-${this.id} {
      margin: auto;
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
    }
    #survey-${this.id} {
      width: 100%; height: 100%;
      font-family: "Myriad Pro", Myriad, "Liberation Sans", "Nimbus Sans L", "Helvetica Neue", Helvetica, Arial, sans-serif;
      // font-family: "Myriad Pro", "Gill Sans", "Gill Sans MT", Calibri, sans-serif;
      font-size: 15px;
      line-height: 120%;
      color: #313034;
      font-weight: 300;
    }
    #survey-dialog-${this.id} {
      width: 25.333em; height: 36.667em;
      text-align: center;
      box-shadow: 0 .067em .267em 0 rgba(0, 0, 0, 0.3);
      background-color: #ffffff;
    }
    #survey-form-${this.id} {
      width: 100%; height: 100%;
      padding: 2em;
    }
    #survey-header-${this.id} {
      margin-top: 5em;
      margin-bottom: 3em;
    }
    #survey-title-${this.id} {
      font-size: 1.867em;
      line-height: 150%;
      font-weight: 800;
    }
    #survey-form-${this.id} > #survey-body-${this.id} > .input-container {
      margin-top: 1em;
      margin-bottom: 1em;
    }
    #survey-form-${this.id} > #survey-body-${this.id} > .input-container,
    #survey-form-${this.id} > #survey-footer-${this.id} > button[data-action="next-step"] {
      height: 3.333em;
      width: 100%;
      border-radius: .267em;
    }
    #survey-form-${this.id} > #survey-body-${this.id} > .input-container > input,
    #survey-form-${this.id} > #survey-body-${this.id} > .check-container,
    #survey-form-${this.id} > #survey-body-${this.id} > .radio-container,
    #survey-form-${this.id} > #survey-body-${this.id} > .input-container > select {
      width: 100%;
      background-color: #ffffff;
      color: rgba(146, 144, 150, 1);
      border: .067em solid #e1e1e1;
      line-height: 100%;
      padding: .933em;
      outline: none;
    }
    #survey-form-${this.id} > #survey-body-${this.id} > .input-container > input {
      transition: all .3s ease-out;
      box-shadow: none;
    }
    #survey-form-${this.id} > #survey-body-${this.id} > .input-container > input:focus {
      box-shadow: inset 0 0 0 2px #ea3448;
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
    #survey-form-${this.id} > #survey-footer-${this.id} > button[data-action="prev-step"],
    #survey-form-${this.id} > #survey-footer-${this.id} > button[data-action="next-step"] {
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
      background-color: #ea3448;
      box-shadow: 0 .067em .267em 0 rgba(0, 0, 0, 0.3);
      color: #ffffff;
      min-height: 2.777em;
      height: 2.777em;
    }
    #survey-form-${this.id} > #survey-footer-${this.id} > button[data-action="prev-step"] {
      color: #ea3448;
      margin-top: 1em;
    }
    `;
    this.store = store;
    this.$el = this.build('div', this.template, `survey-${this.id}`);
    this.$style = this.build('style', this.styleRules);

    this.store.subscribe(this.update.bind(this));
  }

  build(el, content, id) {
    const _f = document.createElement(el);
    _f.innerHTML = content;
    _f.id = id;
    return _f;
  }

  render() {
    // sets the events up
    this.$el.addEventListener('click', this.handleClick.bind(this));
    this.$el.addEventListener('change', this.handleChange.bind(this));
    this.$el.addEventListener('keyup', this.handleChange.bind(this));
    this.$el.addEventListener('submit', this.handleSubmit.bind(this));

    this.update();

    document.head.appendChild(this.$style);
    document.body.appendChild(this.$el);

    return this;
  }

  update() {
    const state = this.store.getState();
    const $title = this.$el.querySelector(`#survey-title-${this.id}`);
    const $step = this.$el.querySelector(`#survey-body-${this.id}`);
    const $prevButton = this.$el.querySelector('[data-action="prev-step"]');
    const $nextButton = this.$el.querySelector('[data-action="next-step"]');
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
            <input name="euresident" type="radio" value="1"
              ${state.steps[3].fields.euresident.value === '1' && 'checked'}>
            <span>Yes</span>
          </label>
          <label>
            <input name="euresident" type="radio" value="0"
              ${state.steps[3].fields.euresident.value === '0' && 'checked'}>
            <span>No</span>
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
            <input type="checkbox" value="red" name="colors.red"
              ${state.steps[4].fields['colors.red'].value === 'red' ? 'checked' : ''}>
            <span>Red</span>
          </label>
          <label>
            <input type="checkbox" value="green" name="colors.green"
              ${state.steps[4].fields['colors.green'].value === 'green' ? 'checked' : ''}>
            <span>Green</span>
          </label>
          <label>
            <input type="checkbox" value="blue" name="colors.blue"
              ${state.steps[4].fields['colors.blue'].value === 'blue' ? 'checked' : ''}>
            <span>Blue</span>
          </label>
        </div>
        `,
    };
    const maxSteps = Object.keys(stepTemplates).length;

    // update title
    $title.innerHTML = state.isFinished ? 'Congratulations' : state.steps[state.step].title;

    // update step
    if (state.shouldRender && state.step <= maxSteps) {
      $step.innerHTML = stepTemplates[state.step];
    }
    if (state.step > maxSteps) {
      $step.innerHTML = `
      <div id="survey-thanks-${this.id}">
        Thanks for your help!
      </div>`;
    }

    // update footer
    $prevButton.style.display = state.step === 1 ? 'none' : 'initial';
    if (state.isFinished) {
      $prevButton.style.display = 'none';
      $nextButton.style.display = 'none';
    }
    $nextButton.innerText = state.step === maxSteps ? 'Send Results' : 'Next step';
  }

  handleClick(e) {
    const state = this.store.getState();

    switch (e.target.getAttribute('data-action')) {
      case 'prev-step': this.store.dispatch(surveyACtions.setPrevStep()); break;
      case 'next-step': {
        if (state.step === 4) this.submit(state.steps);
        this.store.dispatch(surveyACtions.setNextStep());
        break;
      }
      default: return true;
    }
  }

  handleChange(e) {
    if (e.target.name) {
      this.store.dispatch(surveyACtions.validateForm({
        field: e.target.name,
        value: e.target.value,
        isValid: e.target.validity.valid,
      }));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

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
