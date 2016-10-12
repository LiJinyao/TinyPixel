import ImageInfoWorker from 'worker-loader?inline!./imageProcess/imageInfo'

export const RECEIVE_IMAGE_INFO = 'RECEIVE_IMAGE_INFO'
export function receiveImageInfo(info) {
  return {
    type: RECEIVE_IMAGE_INFO,
    info,
  }
}
const worker = new ImageInfoWorker()
export function getImageInfo() {
  return (dispatch, getState) => {
    const image = getState().image.processedImage || getState().image.originImage
    worker.postMessage(image)
    worker.onmessage = ({ data }) => {
      dispatch(receiveImageInfo(data))
    }
  }
}
