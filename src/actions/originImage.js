// hold the origin image
export const RECEIVE_ORIGIN_IMAGE = 'RECEIVE_ORIGIN_IMAGE'
export function receiveOriginImage(image) {
  return {
    type: RECEIVE_ORIGIN_IMAGE,
    image,
  }
}

export function fileToImage(file) {
  return dispatch => {
    console.log("convert file to image.")
      const image = new Image()
      image.src = URL.createObjectURL(file)
      dispatch(receiveOriginImage(image))
  }
}
