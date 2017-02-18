import config from '../config/reducer';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { updateStateOnStorageLoad } from './configureStorage';

export default function configureReducer(initialState, platformReducers) {
  let reducer = combineReducers({
    ...platformReducers,
    config,
    routing,
  });
  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = updateStateOnStorageLoad(reducer);
  return reducer;
}
