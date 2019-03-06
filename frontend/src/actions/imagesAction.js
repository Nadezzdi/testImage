import fetch from 'cross-fetch'
import {fetchImageDetails} from './editorAction'
import {selectPage} from './action'

export const RECEIVE_IMAGES = 'RECEIVE_IMAGES'
function receiveImages(json) {
  return {
    type: RECEIVE_IMAGES,
    selectedBaseImages: json,
  }
}

export const IMAGES_HAS_ERRORED = 'IMAGES_HAS_ERRORED'
export function erroredImages() {
    return {
        type: IMAGES_HAS_ERRORED,
    };
}

export const IMAGES_IS_LOADING = 'IMAGES_IS_LOADING'
export function loadingImages() {
    return {
        type: IMAGES_IS_LOADING,
    };
}


export function fetchImages(baseId) {
  return (dispatch) => {
    dispatch(loadingImages(true));
    fetch(`/base/${baseId}/`)
      .then(
        response => {
          if (response.status >= 400) {
            dispatch(erroredImages());
            throw new Error("Bad response from server");
          }
          return response.json()
        })
      .then(json =>
        dispatch(receiveImages(json))
      )
      .catch(err => {
        console.error(err)
      });
  }
}

export const SELECT_IMAGE = 'SELECT_IMAGE';
export function selectImage(imageId) {
  return {
      type: SELECT_IMAGE,
      selectedImageId: imageId,
  }
}

export function clickImage(imageId) {
  return (dispatch) => {
    dispatch(fetchImageDetails(imageId));
    dispatch(selectImage(imageId));
    dispatch(selectPage(3));
  }
}
