// all image process function come here

import ProcessWorker             from 'worker-loader?inline!./imageProcess/worker'
import { receiveProcessedImage } from './getImage'
import { getImageInfo }          from './getImageInfo'

export const PROCESS_START = 'PROCESS_START'
export function processStart() {
  return {
    type: PROCESS_START,
  }
}

// deep copy an ImageData object
const ctx = document.createElement('canvas').getContext('2d')
export function copyImageData(src, width = src.width, height = src.height, data = src.data) {
  const dst = ctx.createImageData(width, height)
  dst.data.set(data)
  return dst
}
const worker = new ProcessWorker()
/**
 * process imageData
 * @param  {String} methodName a process method name definded in processName.js
 * @param  {Object} option     an option for process actions. the target indicate
 *                             iamge source ORIGIN, PROCESSED
 * @return {funtcion}          redux thunk function.
 */
export function process(methodName, option) {
  return (dispatch, getState) => {
    // if processedImage exists, use processed image for multiple opreation.
    dispatch(processStart(methodName))
    let temp = null
    if (option.target === 'ORIGIN') {
      temp = getState().image.originImage
    } else {
      temp = getState().image.processedImage || getState().image.originImage
    }
    // deep copy imagedata because it is hold in reducers.
    const imageData = copyImageData(temp)
    // use different process function according to methodName.
    worker.postMessage({
      opName: methodName,
      imageData,
      option,
    })

    worker.onmessage = (({ data: { width, height, data } }) => {
      const resultImage = copyImageData(null, width, height, data)
      dispatch(receiveProcessedImage(resultImage))
      dispatch(getImageInfo())
    })
  }
}

export function resetImage() {
  return (dispatch) => {
    dispatch(receiveProcessedImage(null))
    dispatch(getImageInfo())
  }
}
