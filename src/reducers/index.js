import { combineReducers } from 'redux'
import {
  RECEIVE_FILE,
  REVEIVE_ORIGIN_IMAGE,
  RECEIVE_PROCESSED_IMAGE,
} from '../actions'

function fileRepo(state = {
  file: null,
}, action) {
  switch (action.type) {
    case RECEIVE_FILE:
      // TODO: save file in redcers.
      return Object.assign({}, state, { file: action.file })
    default:
    return state
  }
}

function originImage(state = {
  image: null,
}, action) {
  switch (action.type) {
    case REVEIVE_ORIGIN_IMAGE:
      return Object.assign({}, state, { image: action.image })
    default:
      return state
  }
}

function processedImage(state = {
  image: null,
}, action) {
  switch (action.type) {
    case RECEIVE_PROCESSED_IMAGE:
      return Object.assign({}, state, { image: action.image })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  fileRepo,
  originImage,
  processedImage,
});

export default rootReducer
