import * as types from '../ActionTypes';
import Image from './Image';
import { Map } from 'immutable';
import { Record } from '../_tools/transit';
import { MapMerge, AddToMap } from '../_tools/reducerTools';

const InitialState = Record({
  map: Map(),
}, 'images');

export default function imagesReducer(state = new InitialState(), action) {
  switch (action.type) {
    case types.FETCH_IMAGES_SUCCESS: {
      return MapMerge(action.images, Image, '_id', state);
    }
    case types.FAV_IMAGE: {
      return state
        .setIn(['map', action.imageId, 'fav'], true);
    }
    case types.UNFAV_IMAGE: {
      return state
        .setIn(['map', action.imageId, 'fav'], false);
    }
    case types.RM_IMAGE: {
      return state
        .deleteIn(['map', action.imageId]);
    }
  }
  return state;
}
