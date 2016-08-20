import { createStore } from 'redux';

// initial state
const initialState = {
  step: 1,
  totalSteps: 5,
  shouldRender: true,
  isValid: false,
  steps: {
    step1: {
      name: { value: '', isValid: false },
      email: { value: '', isValid: false },
      type: { value: '', isValid: false },
    },
  },
};

// actions
const setNextStep = () => ({ type: 'NEXT_STEP' });
const setPrevStep = () => ({ type: 'PREVIOUS_STEP' });
const validateForm = (payload) => ({ type: 'VALIDATE_FORM', payload });

// reducer
function survey(state = initialState, action) {
  console.log('survey', action);

  switch (action.type) {
    case 'NEXT_STEP': {
      // add a special condition in which we skip a step
      const increment = state.step === 1 && state.steps.step1.type.value === '' ? 1 : 2;

      return Object.assign({}, state, {
        step: state.step + increment,
        shouldRender: true,
        isValid: false,
      });
    }

    case 'PREVIOUS_STEP': return Object.assign({}, state, { step: state.step - 1 });

    case 'VALIDATE_FORM': {
      const newState = Object.assign({}, state);
      const formStep = state.steps[`step${state.step}`];
      let stepScore = 0;

      // assign the value to its model
      newState.steps[`step${state.step}`][action.payload.field].value = action.payload.value;
      newState.steps[`step${state.step}`][action.payload.field].isValid = action.payload.isValid;

      stepScore = Object.keys(formStep)
        .map(field => formStep[field].isValid)
        .reduce((score = 0, value) => score + value);
      newState.isValid = stepScore === Object.keys(formStep);

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
      </div>
    `;
    this.$el = this.build(this.template);

    store.subscribe(this.update.bind(this));
  }

  build(content) {
    const _f = document.createElement('div');

    _f.innerHTML = content;

    return _f;
  }

  render() {
    this.$el.addEventListener('click', this.handleClick.bind(this));
    this.$el.addEventListener('change', this.handleChange.bind(this));
    this.$el.addEventListener('keyup', this.handleChange.bind(this));

    this.update();

    document.body.appendChild(this.$el);

    return this;
  }

  update() {
    const state = store.getState();
    const $step = this.$el.querySelector('#survey-body');
    const $prevButton = this.$el.querySelector('[data-action="prev-step"]');
    const $nextButton = this.$el.querySelector('[data-action="next-step"]');
    const stepTemplates = {
      1: `
        <input name="name" type="text" placeholder="Name" required
          value="${state.steps.step1.name.value}">
        <input name="email" type="email" placeholder="Email" required
          value="${state.steps.step1.email.value}">
        <select name="type" required>
          <option value="" selected disabled>Select an option</option>
          <option value="business"
            ${state.steps.step1.type.value === 'business' && 'selected'}>Business</option>
          <option value="individual"
            ${state.steps.step1.type.value === 'individual' && 'selected'}>Individual</option>
        </select>
      `,
      2: 'step 2',
      3: 'step 3',
      4: 'step 4',
      5: 'step 5',
    };

    // update step
    if (state.shouldRender) $step.innerHTML = stepTemplates[state.step];

    // update footer
    $prevButton.style.display = state.step === 1 ? 'none' : '';
    $nextButton.style.display = state.step === state.totalSteps ? 'none' : '';
  }

  handleClick(e) {
    e.preventDefault();

    switch (e.target.getAttribute('data-action')) {
      case 'prev-step': {
        store.dispatch(setPrevStep());
        break;
      }
      case 'next-step': store.dispatch(setNextStep()); break;
      default: return true;
    }

    return this;
  }

  handleChange(e) {
    e.preventDefault();

    store.dispatch(validateForm({
      field: e.target.name,
      value: e.target.value,
      isValid: e.target.validity.valid,
    }));
  }
}

export default Survey;
