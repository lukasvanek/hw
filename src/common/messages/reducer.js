// import * as types from '../app/ActionTypes';
import { Record } from '../_tools/transit';
import { Map } from 'immutable';

const InitialState = Record({
  map: Map(),
}, 'messages');

export default function messagesReducer(state = new InitialState, action) {
  switch (action.type) {
    case 'SHOW_MESSAGE': {
      // action.mObject = {text: 'some text', autohide: true}
      return state.setIn(['map', action.mType], action.mObject);
    }

    case 'HIDE_MESSAGE':
      return state.setIn(['map', action.mType], null);

    default:
      return state;
  }
}
