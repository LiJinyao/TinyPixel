import { fileToImageData } from './getImage'
export const RECEIVE_FILE = 'RECEIVE_FILE'
export function receiveFile(file) {
  return {
    type: RECEIVE_FILE,
    file,
  }
}
export function setImageFile(file) {
  return dispatch => {
    dispatch(fileToImageData(file))
    dispatch(receiveFile(file))
  }
}
