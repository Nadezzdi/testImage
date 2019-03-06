import fetch from 'cross-fetch'

export const RECEIVE_IMAGE_DETAILS = 'RECEIVE_IMAGE_DETAILS'
function receiveImageDetails(json) {
  return {
    type: RECEIVE_IMAGE_DETAILS,
    imageDetails: json,
  }
}

export const IMAGE_DETAILS_HAS_ERRORED = 'IMAGE_DETAILS_HAS_ERRORED'
export function erroredImageDetails() {
  return {
    type: IMAGE_DETAILS_HAS_ERRORED,
  };
}

export const IMAGE_DETAILS_IS_LOADING = 'IMAGE_DETAILS_IS_LOADING'
export function loadingImageDetails() {
  return {
    type: IMAGE_DETAILS_IS_LOADING,
  };
}

export function fetchImageDetails (imageId) {
  return (dispatch) => {
    dispatch(loadingImageDetails());
    fetch(`/image/${imageId}/`, {method: 'GET'})
      .then(
        response => {
          if (response.status >= 400) {
            dispatch(erroredImageDetails())
            throw new Error("Bad response from server");
          }
          return response.json()
        }
      )
      .then(json =>
        dispatch(receiveImageDetails(json))
      )
      .catch(err => console.error(err));
  }
}

/* user input new parameters for new rect, but not submit it */
export const UPDATE_TMP_RECT = 'UPDATE_TMP_RECT'
export function updateTmpRect(tmpRect) {
  return {
    type: UPDATE_TMP_RECT,
    tmpRect: tmpRect,
  }
}

export const ADD_TMP_RECT = 'ADD_TMP_RECT'
export function addTmpRect() {
  return {
    type: ADD_TMP_RECT,
  }
}

export const SET_ACTIVE_RECT = 'SET_ACTIVE_RECT'
export function setActiveRect(index) {
  return {
    type: SET_ACTIVE_RECT,
    index: index
  }
}

export const REMOVE_RECT = 'REMOVE_RECT'
export function removeRect(index) {
  return {
    type: REMOVE_RECT,
    index: index
  }
}

export const RESTORE_RECT = 'RESTORE_RECT'
export function restoreRect(index) {
  return {
    type: RESTORE_RECT,
    index: index
  }
}

export const SAVE_RECTS = 'SAVE_RECTS'
export function saveRects(imageId, rects) {
  return (dispatch) => {
    dispatch(loadingImageDetails());
    fetch(`/image/${imageId}/`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: JSON.stringify({"rects" :rects.filter(rect => !rect.deleted)})
    })
    .then (
      response => {
        if (response.status >= 400) {
          dispatch(erroredImageDetails())
          throw new Error("Bad response from server");
        }
        return response.json()
      }
    )
    .then (json =>
      dispatch(receiveImageDetails(json))
      )
    .catch(err => console.error(err));
  }
}
