//all image process function come here
import { receiveProcessedImage } from './getImage'
import { grayscale } from './imageProcess/grayscale'
// export const GRAYSCALE_START = 'GRAYSCALE_START'
// export function grayscaleStart() {
//   return {
//     type: GRAYSCALE_START
//   }
// }
//
// export const GRAYSCALE_DONE = 'GRAYSCALE_DONE'
// export function grayscaleDone() {
//   return {
//     type: GRAYSCALE_START
//   }
// }
export const PROCESSES = {
  GRAYSCALE: 'GRAYSCALE'
}
export function process(methodName) {
  return (dispatch, getState) => {
    const imageData = getState().image.image
    let processedImage = null
    switch (methodName) {
      case PROCESSES.GRAYSCALE:
        processedImage = grayscale(imageData)
        break;
      default:
        break;
    }
    dispatch(receiveProcessedImage(processedImage))
  }
}
