// hold the origin image
export const REVEIVE_ORIGIN_IMAGE = 'REVEIVE_ORIGIN_IMAGE'
export function showImage(image) {
  return {
    type: REVEIVE_ORIGIN_IMAGE,
    image,
  }
}
