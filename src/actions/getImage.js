// hold the origin image
const canvas = document.createElement('canvas')
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
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        image.style.display = 'none'
        const imageData = canvas.getContext('2d').getImageData(0, 0, image.width, image.height)
        console.log(imageData)
        console.log(`image width: ${image.width}, height: ${image.height}`)
        dispatch(receiveOriginImage(imageData))
      }
  }
}

export const RECEIVE_PROCESSED_IMAGE = 'RECEIVE_PROCESSED_IMAGE'
// image is an imageData object.
export function receiveProcessedImage(image) {
  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, image.width, image.height)
  const newImage = copyImageData(ctx, image)
  return {
    type: RECEIVE_PROCESSED_IMAGE,
    image: newImage,
  }
}
// deep copy an imageData object
function copyImageData(ctx, src)
{
    var dst = ctx.createImageData(src.width, src.height);
    dst.data.set(src.data);
    return dst;
}
