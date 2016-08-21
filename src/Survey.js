import { createStore } from 'redux';

// initial state
const initialState = {
  step: 1,
  shouldRender: true,
  steps: {
    1: {
      id: 1,
      title: 'Personal Details',
      isValid: false,
      fields: {
        name: { required: true, value: '' },
        email: { required: true, value: '' },
        type: { required: true, value: '' },
      },
    },
    2: {
      id: 2,
      title: 'Business Details',
      isValid: false,
      fields: {
        'business.name': { required: true, value: '' },
        'business.size': { required: true, value: '' },
      },
    },
    3: {
      id: 3,
      title: 'Location Details',
      isValid: false,
      fields: {
        address: { required: true, value: '' },
        euresident: { required: true, value: null },
      },
    },
    4: {
      id: 4,
      title: 'Hobbies',
      isValid: false,
      fields: {
        book: { required: false, value: '' },
        'colors.red': { required: false, value: null },
        'colors.green': { required: false, value: null },
        'colors.blue': { required: false, value: null },
      },
    },
    5: {
      id: 5,
      title: 'You made it!',
    },
  },
};

// actions
const setNextStep = () => ({ type: 'NEXT_STEP' });
const setPrevStep = () => ({ type: 'PREVIOUS_STEP' });
const validateForm = (payload) => ({ type: 'VALIDATE_FORM', payload });

// reducer
function survey(state = initialState, action) {
  console.log('action dispatched ->', action);

  switch (action.type) {
    case 'NEXT_STEP': {
      // Special condition for skipping step 2 and going straight to step 3
      const increment = state.step === 1 && state.steps[1].fields.type.value === 'individual' ? 2 : 1;

      return Object.assign({}, state, {
        step: state.steps[state.step].isValid ? state.step + increment : state.step,
        shouldRender: true,
      });
    }

    case 'PREVIOUS_STEP': {
      // Special condition for skipping step 2 and going straight to step 1
      const decrement = state.step === 3 && state.steps[1].fields.type.value === 'individual' ? 2 : 1;

      return Object.assign({}, state, {
        step: state.step - decrement,
        shouldRender: true,
      });
    }

    case 'VALIDATE_FORM': {
      const newState = Object.assign({}, state);
      const stepFields = state.steps[state.step].fields;
      let stepScore = 0;
      let neededScore = 0;

      // assign the value to its model
      newState.steps[state.step].fields[action.payload.field].value = action.payload.value;
      newState.steps[state.step].fields[action.payload.field].isValid = action.payload.isValid;

      stepScore = Object.keys(stepFields)
        .map(field => stepFields[field].isValid || false)
        .reduce((score = 0, value) => score + value);

      neededScore = Object.keys(stepFields)
        .filter(field => stepFields[field].required).length;

      newState.steps[state.step].isValid = stepScore >= neededScore;

      newState.shouldRender = false;

      return newState;
    }

    default:
      return state;
  }
}

// create store
const store = createStore(survey);

class Survey {
  constructor() {
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
    this.$el = this.build(this.template);

    store.subscribe(this.update.bind(this));
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
    const state = store.getState();
    const $title = this.$el.querySelector('#survey-title');
    const $step = this.$el.querySelector('#survey-body');
    const $prevButton = this.$el.querySelector('[data-action="prev-step"]');
    const $nextButton = this.$el.querySelector('[data-action="next-step"]');
    const stepTemplates = {
      1: `
        <div class="input-container">
          <label>Name:</label>
          <input name="name" type="text" placeholder="Name" required
            value="${state.steps[1].fields.name.value}">
        </div>
        <div class="input-container">
          <label>Email:</label>
          <input name="email" type="email" placeholder="Email" required
            value="${state.steps[1].fields.email.value}">
        </div>
        <div class="input-container">
          <label>Type:</label>
          <select name="type" required>
            <option value="" selected disabled>Select an option</option>
            <option value="business"
              ${state.steps[1].fields.type.value === 'business' && 'selected'}>Business</option>
            <option value="individual"
              ${state.steps[1].fields.type.value === 'individual' && 'selected'}>Individual</option>
          </select>
        </div>`,
      2: `
        <div class="input-container">
          <label>Business name:</label>
          <input name="business.name" type="text" placeholder="Business name" required
            value="${state.steps[2].fields['business.name'].value}">
        </div>
        <div class="input-container">
          <label>Number of employees:</label>
          <select name="business.size" required>
            <option value="" selected disabled>Select a business size</option>
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
          <input name="address" type="text" placeholder="Address" required
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
          <label>Favourite book:</label>
          <input name="book" type="text" placeholder="Type the name of the book"
            value="${state.steps[4].fields.book.value}">
        </div>
        <div class="input-container">
          <span>Favourite colors:</span>
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
      case 'prev-step': store.dispatch(setPrevStep()); break;
      case 'next-step': store.dispatch(setNextStep()); break;
      default: return true;
    }

    return true;
  }

  handleChange(e) {
    // save the form in LS

    store.dispatch(validateForm({
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
