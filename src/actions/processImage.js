//all image process function come here
import { receiveProcessedImage } from './getImage'
import { grayscale }             from './imageProcess/grayscale'
import { scale } from './imageProcess/scale'
import { copyImageData }         from './imageProcess/util'
// canvas for deep copy a imageData.


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
    let temp = null
    if(option.target === 'ORIGIN') {
      temp = getState().image.originImage
      console.log("origin");
      console.log(temp);
    } else {
      temp = getState().image.processedImage || getState().image.originImage
    }
    console.log('target: ' + option.target)
    // deep copy imagedata because it is hold in reducers.
    const imageData = copyImageData(temp)
    // use different process function according to methodName.
    let processedImage = null
    switch (methodName) {
      case PROCESSES.GRAYSCALE:
        processedImage = grayscale(imageData, option)
        break;
      case PROCESSES.SCALE:
        processedImage = scale(imageData, option)
        break;
      default:
      // do nothing.
        break;
    }
    console.log("processed");
    console.log(processedImage);
    dispatch(receiveProcessedImage(processedImage))
  }
}
