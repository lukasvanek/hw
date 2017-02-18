import config from '../config/reducer';
import modals from '../modals/reducer';
import messages from '../messages/reducer';


import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { updateStateOnStorageLoad } from './configureStorage';

const resetStateOnSignOut = (reducer, initialState) => (state, action) => {
  // Reset app state on sign out, stackoverflow.com/q/35622588/233902.
  if (action.type === 'LOGOUT_START') {
    // Preserve state without sensitive data.
    state = {
      app: state.app,
      config: initialState.config,
      routing: state.routing, // Routing state has to be reused.
    };
  }
  return reducer(state, action);
};

export default function configureReducer(initialState, platformReducers) {
  let reducer = combineReducers({
    ...platformReducers,
    config,
    routing,
    modals,
    messages,
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOut(reducer, initialState);
  reducer = updateStateOnStorageLoad(reducer);

  return reducer;
}
