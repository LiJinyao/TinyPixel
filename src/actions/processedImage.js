// hold processed image
export const RECEIVE_PROCESSED_IMAGE = 'RECEIVE_PROCESSED_IMAGE'
export function receiveProcessedImage(image) {
  return {
    type: RECEIVE_PROCESSED_IMAGE,
    image,
  }
}
