import { combineReducers } from 'redux'
import {
  RECEIVE_FILE,
  RECEIVE_ORIGIN_IMAGE,
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
// image is an ImageData object.
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
function originImage(state = {
  image: null,
}, action) {
  switch (action.type) {
    case RECEIVE_ORIGIN_IMAGE:
      return Object.assign({}, state, { image: action.image })
    case RECEIVE_PROCESSED_IMAGE:
      return Object.assign({}, state, { image: action.image })
    default:
      return state
  }
}

// function processedImage(state = {
//   image: null,
// }, action) {
//   switch (action.type) {
//     case RECEIVE_PROCESSED_IMAGE:
//       return Object.assign({}, state, { image: action.image })
//     default:
//       return state
//   }
// }

const rootReducer = combineReducers({
  fileRepo,
  originImage,
  // processedImage,
});

export default rootReducer
