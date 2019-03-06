import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faFolder, faTrash, faSpinner, faSave, faPlusSquare, faHome, faInfoCircle, faTrashRestore} from '@fortawesome/free-solid-svg-icons'
library.add( faChevronLeft, faFolder, faTrash, faSpinner, faSave, faPlusSquare, faHome, faInfoCircle, faTrashRestore)


import reducer from './reducers/reducer'
//import baseReducer from './reducers/baseReducer'
import imagesReducer from './reducers/imagesReducer'
import imageEditorReducer from './reducers/imageEditorReducer'
import {fetchBases} from './actions/baseAction.js'
import ImgStoreApp from './components/ImgStoreApp'

const rootReducer = combineReducers({
  main: reducer,
  images: imagesReducer,
  editor: imageEditorReducer,

})

const store = createStore(
  rootReducer,
  applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    ));
store.dispatch(fetchBases())

ReactDOM.render(
  <Provider store={store}>
    <ImgStoreApp/>
  </Provider>,
  document.getElementById('app'),
);
