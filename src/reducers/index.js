import { combineReducers } from 'redux'
import {
  RECEIVE_FILE,
  RECEIVE_ORIGIN_IMAGE,
  RECEIVE_PROCESSED_IMAGE,
  PROCESS_START,
  RECEIVE_IMAGE_INFO,
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
  originImage:    null,
  processedImage: null,
  processing:     false,
}, action) {
  switch (action.type) {
    case RECEIVE_ORIGIN_IMAGE:
      return Object.assign({}, state, { originImage: action.image, processedImage: null })
    case RECEIVE_PROCESSED_IMAGE:
      return Object.assign({}, state, { processedImage: action.image, processing: false })
    case PROCESS_START:
      return Object.assign({}, state, { processing: true })
    default:
      return state
  }
}

function imageInfo(state = {
  info: null,
}, action) {
  switch (action.type) {
    case RECEIVE_IMAGE_INFO:
      return Object.assign({}, state, { info: action.info })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  fileRepo,
  image,
  imageInfo,
})

export default rootReducer
