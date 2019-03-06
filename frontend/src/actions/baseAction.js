import fetch from 'cross-fetch'
import {fetchImages} from './imagesAction'

export const RECEIVE_BASES = 'RECEIVE_BASES'
function receiveBases(json) {
  return {
    type: RECEIVE_BASES,
    bases: json,
  }
}

export const BASES_HAS_ERRORED = 'BASES_HAS_ERRORED'
export function erroredBases() {
    return {
        type: BASES_HAS_ERRORED,
    };
}

export const BASES_IS_LOADING = 'BASES_IS_LOADING'
export function loadingBases(bool) {
    return {
        type: BASES_IS_LOADING,
    };
}

export function fetchBases() {
  return (dispatch) => {
    dispatch(loadingBases());
    fetch('/base/')
      .then(
        response => {
          if (response.status >= 400) {
            dispatch(erroredBases())
            throw new Error("Bad response from server");
          }
          return response.json()
        }
      )
      .then(json =>
        dispatch(receiveBases(json))
      )
      .catch(err => console.error(err));
  }
}

export const SELECT_BASE = 'SELECT_BASE';
export function selectBase(baseId) {
  return {
    type: SELECT_BASE,
    selectedBase: baseId
  }
}


export function clickBase(base) {
    return (dispatch) => {
    dispatch(fetchImages(base.id));
    dispatch(selectBase(base));
  }
}