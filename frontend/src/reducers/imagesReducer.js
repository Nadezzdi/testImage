import {
  RECEIVE_IMAGES,
  IMAGES_HAS_ERRORED,
  IMAGES_IS_LOADING,
  SELECT_IMAGE,
} from '../actions/imagesAction.js'

const defaultState = {
  selectedBaseImages: [],
  imagesHasError: false,
  imagesIsLoading: false,
  selectedImageId: 0,
}


export default function something(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_IMAGES:
      return {
        ...state,
        selectedBaseImages: action.selectedBaseImages,
        imagesIsLoading: false
      };
    case IMAGES_HAS_ERRORED:
      return{
        ...state,
        imagesHasError: true,
        imagesIsLoading: false
      };
    case IMAGES_IS_LOADING:
      return{
        ...state,
        imagesIsLoading: true,
        imagesHasError: false,
      };
    case SELECT_IMAGE:
      return{
        ...state,
        selectedImageId: action.selectedImageId,
      };
    default:
      return state
  }
}
