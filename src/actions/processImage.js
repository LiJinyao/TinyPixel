//all image process function come here
import { receiveProcessedImage } from './getImage'
import { grayscale }             from './imageProcess/grayscale'
import { scale } from './imageProcess/scale'
import { copyImageData }         from './imageProcess/util'

export const PROCESS_START = 'PROCESS_START'
export function processStart() {
  return {
    type: PROCESS_START,
  }
}

export const PROCESSES = new Object({
  GRAYSCALE: 'GRAYSCALE',
  SCALE: 'SCALE',
})
/**
 * process imageData
 * @param  {String} methodName a process method name definded in PROCESSES
 * @param  {Object} option     an option for process actions. the target indicate
 *                             iamge source ORIGIN, PROCESSED
 * @return {funtcion}          redux thunk function.
 */
export function process(methodName, option) {
  return (dispatch, getState) => {
    // if processedImage exists, use processed image for multiple opreation.
    dispatch(processStart(methodName))
    let temp = null
    if(option.target === 'ORIGIN') {
      temp = getState().image.originImage
    } else {
      temp = getState().image.processedImage || getState().image.originImage
    }
    // deep copy imagedata because it is hold in reducers.
    const imageData = copyImageData(temp)
    let processFunc = null
    // use different process function according to methodName.
    switch (methodName) {
      case PROCESSES.GRAYSCALE:
        processFunc = grayscale
        //processedImage = grayscale(imageData, option)
        break;
      case PROCESSES.SCALE:
        processFunc = scale
        //processedImage = scale(imageData, option)
        break;
      default:
      // do nothing.
        break;
    }
    const imageProcess = new Promise(function(resolve, reject) {
      const image = processFunc(imageData, option)
      resolve(image)
    })
    imageProcess.then(image => dispatch(receiveProcessedImage(image)))

  }
}
