// import * as types from '../app/ActionTypes';
import { Record } from '../_tools/transit';

const InitialState = Record({
  modalType: null,
  modalProps: {}
}, 'modals');

export default function modalsReducer(state = new InitialState, action) {
  switch (action.type) {

    case 'SHOW_MODAL':
      state = state.update('modalType', () => action.modalType);
      return state.update('modalProps', () => action.modalProps);

    case 'HIDE_MODAL':
      state = state.update('modalType', () => null);
      return state.update('modalProps', () => {});

  }
  return state;
}
