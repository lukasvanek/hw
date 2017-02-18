import * as types from '../ActionTypes';

import { Get } from '../_tools/network';


export function getImages(resolve, reject) {
  return ({ dispatch, getState }) => {
    Get({ path: 'api/images' })
    .then((images) => {
      dispatch({ type: types.FETCH_IMAGES_SUCCESS, images });
      if (resolve) resolve(images);
    })
    .catch((error) => {
      dispatch({ type: types.FETCH_IMAGES_ERROR, error });
      if (reject) reject(error);
    });
    return { type: types.FETCH_IMAGES_START };
  };
}

export function favImage(image) {
  return {
    type: types.FAV_IMAGE,
    imageId: image._id,
  };
}

export function unfavImage(image) {
  return {
    type: types.UNFAV_IMAGE,
    imageId: image._id,
  };
}

export function toggleFav(image) {
  return ({ dispatch }) => {
    if (image.fav) {
      dispatch(unfavImage(image));
    } else {
      dispatch(favImage(image));
    }
    return {
      type: types.TOGGLE_FAV_IMAGE,
    };
  };
}

export function rmImage(image) {
  return {
    type: types.RM_IMAGE,
    imageId: image._id,
  };
}
