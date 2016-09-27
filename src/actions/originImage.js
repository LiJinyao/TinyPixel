// hold the origin image
export const RECEIVE_ORIGIN_IMAGE = 'RECEIVE_ORIGIN_IMAGE'
export function receiveOriginImage(image) {
  return {
    type: RECEIVE_ORIGIN_IMAGE,
    image,
  }
}

export function fileToImageData(file) {
  return dispatch => {
      const image = new Image()
      image.src = URL.createObjectURL(file)
      const canvas = document.createElement('canvas')
      image.onload = () => {
        canvas.setAttribute('width', image.width)
        canvas.setAttribute('height', image.height)
        //canvas.width = image.width
        //canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        image.style.display = 'none'
        const imageData = canvas.getContext('2d').getImageData(0, 0, image.width, image.height)
        console.log(imageData)
        console.log(`image width: ${image.width}, height: ${image.height}`)
        dispatch(receiveOriginImage(imageData))
      }
      //document.body.appendChild(canvas)
  }
}
