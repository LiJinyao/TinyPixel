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

function image(state = {
  originImage: null,
  processedImage: null,
}, action) {
  switch (action.type) {
    case RECEIVE_ORIGIN_IMAGE:
      return Object.assign({}, state, { originImage: action.image, processedImage: null })
    case RECEIVE_PROCESSED_IMAGE:
    console.log("reveice processed image");
      return Object.assign({}, state, { processedImage: action.image })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  fileRepo,
  image,
  // processedImage,
});

export default rootReducer
