//all image process function come here
import { receiveProcessedImage } from './getImage'
import { grayscale } from './imageProcess/grayscale'

export const PROCESSES = new Object({
  GRAYSCALE: 'GRAYSCALE',
  BINARIZATION: 'BINARIZATION',
})

export function process(methodName, option) {
  return (dispatch, getState) => {
    const imageData = getState().image.processedImage || getState().image.originImage
    let processedImage = null
    switch (methodName) {
      case PROCESSES.GRAYSCALE:
        processedImage = grayscale(imageData, option)
        break;
      default:
        break;
    }
    dispatch(receiveProcessedImage(processedImage))
  }
}
