const defaultEditorState = {
  rects: [],
  tmpRect: { "height" : 0, "width" : 0, "x" : 0, "y" : 0},
  haveChanges: false,
  activeRectIndex: -1,
  source_path : "",
  imageDetailsIsLoading: false,
  imageDetailsHasError: false,
}


import {
  IMAGE_DETAILS_HAS_ERRORED,
  IMAGE_DETAILS_IS_LOADING,
  RECEIVE_IMAGE_DETAILS,
  UPDATE_TMP_RECT,
  ADD_TMP_RECT,
  SET_ACTIVE_RECT,
  REMOVE_RECT,
  RESTORE_RECT,
  SAVE_RECTS
} from '../actions/editorAction.js'


export default function something(state = defaultEditorState, action) {
  switch (action.type) {
    case IMAGE_DETAILS_HAS_ERRORED:
      return{
        ...defaultEditorState,
        imageDetailsIsLoading: false,
        imageDetailsHasError: true,
      };
    case IMAGE_DETAILS_IS_LOADING:
      return{
        ...defaultEditorState,
        imageDetailsIsLoading: true,
        imageDetailsHasError: false,
      };
    case RECEIVE_IMAGE_DETAILS:
      return{
        ...defaultEditorState,
        source_path: action.imageDetails.source_path,
        rects: action.imageDetails.rects.map(rect => {return {...rect, deleted: false, origin: true}}),
      };
    case UPDATE_TMP_RECT:
      return{
        ...state,
        tmpRect: action.tmpRect,
      };
    case ADD_TMP_RECT:
      let newRect = state.tmpRect;
      newRect.deleted = false;
      newRect.origin = false;
      return{
        ...state,
        rects: [...state.rects, newRect],
        haveChanges: true
      };
    case REMOVE_RECT:
      return{
        ...state,
        rects: state.rects.map((item, index) => {
          if (index !== action.index) {
            return item
          }
          return {
            ...item,
            deleted: true,
          }
        }),
        haveChanges: true,
      };
    case RESTORE_RECT:
      return{
        ...state,
        rects: state.rects.map((item, index) => {
          if (index !== action.index) {
            return item
          }
          return {
            ...item,
            deleted: false,
          }
        }),
        haveChanges: true,
      };
    case SET_ACTIVE_RECT:
      return{
        ...state,
        activeRectIndex: action.index
      }
    default:
      return state
  }
}
