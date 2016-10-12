// hold the origin image
import { getImageInfo } from './getImageInfo'

export const RECEIVE_ORIGIN_IMAGE = 'RECEIVE_ORIGIN_IMAGE'
export function receiveOriginImage(image) {
  return {
    type: RECEIVE_ORIGIN_IMAGE,
    image,
  }
}
export function fileToImageData(file) {
  return (dispatch) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    const canvas = document.createElement('canvas')
    image.onload = () => {
      // set convans size
      canvas.setAttribute('width', image.width)
      canvas.setAttribute('height', image.height)
      const ctx = canvas.getContext('2d')
      // draw image into canvas
      ctx.drawImage(image, 0, 0)
      image.style.display = 'none'
      // get imageData
      const imageData = canvas.getContext('2d').getImageData(0, 0, image.width, image.height)
      dispatch(receiveOriginImage(imageData))
      dispatch(getImageInfo())
    }
  }
}

export const RECEIVE_PROCESSED_IMAGE = 'RECEIVE_PROCESSED_IMAGE'
// image is an imageData object.
export function receiveProcessedImage(image) {
  return {
    type: RECEIVE_PROCESSED_IMAGE,
    image,
  }
}
