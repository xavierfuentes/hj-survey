// actions
const NEXT_STEP = 'SURVEY/NEXT_STEP';
const PREVIOUS_STEP = 'SURVEY/PREVIOUS_STEP';
const VALIDATE_FORM = 'SURVEY/VALIDATE_FORM';

// initial state
export function getInitialState() {
  return {
    step: 1,
    isFinished: false,
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
          address: { required: false, value: '' },
          euresident: { required: false, value: null },
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
}

// reducer
export default function survey(state = getInitialState(), action) {
  console.log('action dispatched ->', action);

  switch (action.type) {
    case NEXT_STEP: {
      // Special condition for skipping step 2 and going straight to step 3
      const increment = state.step === 1 && state.steps[1].fields.type.value === 'individual' ? 2 : 1;

      return Object.assign({}, state, {
        step: state.steps[state.step].isValid ? state.step + increment : state.step,
        shouldRender: true,
      });
    }

    case PREVIOUS_STEP: {
      // Special condition for skipping step 2 and going straight to step 1
      const decrement = state.step === 3 && state.steps[1].fields.type.value === 'individual' ? 2 : 1;

      return Object.assign({}, state, {
        step: state.step - decrement,
        shouldRender: true,
      });
    }

    case VALIDATE_FORM: {
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

// action creators
export function setNextStep() { return { type: NEXT_STEP }; }
export function setPrevStep() { return { type: PREVIOUS_STEP }; }
export function validateForm(payload) { return { type: VALIDATE_FORM, payload }; }
