import * as surveyACtions from './reducer';

class Survey {
  constructor(store) {
    this.template = `
      <div id="survey">
        <div id="survey-dialog">
          <form name="survey-form">
            <div id="survey-header">
              <h1 id="survey-title">One fine survey</h1>
            </div>
            <div id="survey-body"></div>
            <div id="survey-footer">
              <button data-action="prev-step">Previous</button>
              <button data-action="next-step" type="submit">Next</button>
            </div>
          </form>
        </div>
      </div>`;
    this.store = store;
    this.$el = this.build(this.template);

    this.store.subscribe(this.update.bind(this));
  }

  build(content) {
    const _f = document.createElement('div');
    _f.innerHTML = content;
    return _f;
  }

  render() {
    // sets the events up
    this.$el.addEventListener('click', this.handleClick.bind(this));
    this.$el.addEventListener('change', this.handleChange.bind(this));
    this.$el.addEventListener('keyup', this.handleChange.bind(this));
    this.$el.addEventListener('submit', this.handleSubmit.bind(this));

    this.update();

    document.body.appendChild(this.$el);

    return this;
  }

  update() {
    const state = this.store.getState();
    const $title = this.$el.querySelector('#survey-title');
    const $step = this.$el.querySelector('#survey-body');
    const $prevButton = this.$el.querySelector('[data-action="prev-step"]');
    const $nextButton = this.$el.querySelector('[data-action="next-step"]');
    const stepTemplates = {
      1: `
        <div class="input-container">
          <label>Your Name</label>
          <input name="name" type="text" placeholder="First and Last" required autofocus
            value="${state.steps[1].fields.name.value}">
        </div>
        <div class="input-container">
          <label>Email Address</label>
          <input name="email" type="email" placeholder="example@domain.com" required
            value="${state.steps[1].fields.email.value}">
        </div>
        <div class="input-container">
          <label>User Type</label>
          <select name="type" required>
            <option value="" selected disabled>Select One</option>
            <option value="business"
              ${state.steps[1].fields.type.value === 'business' && 'selected'}>Business</option>
            <option value="individual"
              ${state.steps[1].fields.type.value === 'individual' && 'selected'}>Individual</option>
          </select>
        </div>`,
      2: `
        <div class="input-container">
          <label>Business Name:</label>
          <input name="business.name" type="text" required autofocus
            value="${state.steps[2].fields['business.name'].value}">
        </div>
        <div class="input-container">
          <label>Number of Employees:</label>
          <select name="business.size" required>
            <option value="" selected disabled>Select One</option>
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
          <label>Address:</label>
          <input name="address" type="text" placeholder="Building Number, Street, City, County/State, Country" required autofocus
            value="${state.steps[3].fields.address.value}">
        </div>
        <div class="input-container">
          <span>Residing in the EU?</span>
          <label>
            <input name="euresident" type="radio" value="1" required
              ${state.steps[3].fields.euresident.value === '1' && 'checked'}>
            <span>Yes</span>
          </label>
          <label>
            <input name="euresident" type="radio" value="0" required
              ${state.steps[3].fields.euresident.value === '0' && 'checked'}>
            <span>No</span>
          </label>
        </div>`,
      4: `
        <div class="input-container">
          <label>Favourite Book:</label>
          <input name="book" type="text" autofocus required
            value="${state.steps[4].fields.book.value}">
        </div>
        <div class="input-container">
          <span>Favourite Colors (Tick all that apply):</span>
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
      5: `
        <div id="survey-result">
          <h2>Thanks for your help!</h2>
        </div>
        `,
    };

    // update title
    $title.innerHTML = state.steps[state.step].title;

    // update step
    if (state.shouldRender) $step.innerHTML = stepTemplates[state.step];

    // update footer
    $prevButton.style.display = state.step === 1 ? 'none' : '';
    $nextButton.style.display = state.step === Object.keys(stepTemplates).length ? 'none' : '';
  }

  handleClick(e) {
    switch (e.target.getAttribute('data-action')) {
      case 'prev-step': this.store.dispatch(surveyACtions.setPrevStep()); break;
      case 'next-step': this.store.dispatch(surveyACtions.setNextStep()); break;
      default: return true;
    }
  }

  handleChange(e) {
    this.store.dispatch(surveyACtions.validateForm({
      field: e.target.name,
      value: e.target.value,
      isValid: e.target.validity.valid,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
  }
}

export default Survey;
