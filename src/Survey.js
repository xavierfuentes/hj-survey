import { createStore } from 'redux';

// initial state
const initialState = {
  step: 1,
};

// actions
const setNextStep = () => { return { type: 'NEXT_STEP' }; };
const setPrevStep = () => { return { type: 'PREVIOUS_STEP' }; };

// reducer
function survey(state = initialState, action) {
  console.log('survey', action);

  switch (action.type) {
    case 'NEXT_STEP':
      return Object.assign({}, state, { step: state.step + 1 });

    case 'PREVIOUS_STEP':
      return Object.assign({}, state, { step: state.step - 1 });

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
          <div id="survey-header">
            <h1 id="survey-title">One fine survey</h1>
          </div>
          <div id="survey-body"></div>
          <div id="survey-footer">
            <button data-action="prev-step">Previous</button>
            <button data-action="next-step">Next</button>
          </div>
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

    this.update();

    document.body.appendChild(this.$el);
  }

  update() {
    const state = store.getState();
    const $title = this.$el.querySelector('#survey-title');
    const $step = this.$el.querySelector('#survey-body');
    const $prevButton = this.$el.querySelector('[data-action="prev-step"]');
    const $nextButton = this.$el.querySelector('[data-action="next-step"]');

    this.$el.querySelector('#survey-body').innerHTML = state.step;
  }

  handleClick(e) {
    const action = e.target.getAttribute('data-action');

    switch (action) {
      case 'prev-step': this.prevStep(); break;
      case 'next-step': this.nextStep(); break;
      default: throw new Error(`There is no action defined as ${action}`);
    }
  }

  nextStep() {
    store.dispatch(setNextStep());
  }

  prevStep() {
    store.dispatch(setPrevStep());
  }
}

export default Survey;
