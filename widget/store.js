import { createStore } from 'redux';
import survey, { getInitialState } from './reducer';

const NAMESPACE = 'hotjar/survey';

const persistedState = localStorage.getItem(NAMESPACE)
  ? JSON.parse(localStorage.getItem(NAMESPACE))
  : getInitialState();

// loads the state from LS (if any)
const store = createStore(survey, persistedState);

store.subscribe(() => {
  localStorage.setItem(NAMESPACE, JSON.stringify(store.getState()));
});

export default store;
