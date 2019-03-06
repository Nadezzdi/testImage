import {
  SELECT_PAGE,
} from '../actions/action.js'


import {
  RECEIVE_BASES,
  BASES_HAS_ERRORED,
  BASES_IS_LOADING,
  SELECT_BASE,
} from '../actions/baseAction.js'


const defaultState = {
    page: 1,
    bases: [],
    basesHasError: false,
    basesIsLoading: false,
    selectedBase: {},
    selectedBaseImages: [],
}


export default function something(state = defaultState, action) {
  //console.log(action.type);
  switch (action.type) {
    case SELECT_PAGE:
      return {
        ...state,
        page: action.page
      };
    case RECEIVE_BASES:
      return {
        ...defaultState,
        bases: action.bases,
      };
    case BASES_HAS_ERRORED:
      return{
        ...defaultState,
        basesHasError: true,
      };
    case BASES_IS_LOADING:
      return{
        ...defaultState,
        basesIsLoading: true,
      };
    case SELECT_BASE:
      return {
        ...state,
        selectedBase: action.selectedBase,
        selectedBaseImages: [],
        page: 2
      };
    default:
      return state
  }
}
