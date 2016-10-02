/**
 * scale iamge.
 * options: { ratio: {float}, interpolation: 'NEAREST_NEIGHBOR' }
 */
import { getPixelPosition, getCoordinate, copyImageData } from './util'

export const INTERPOLATION = {
  NEAREST_NEIGHBOR: 'NEAREST_NEIGHBOR', // 临近插值
  BILINEAR: 'BILINEAR', // 双线性插值
}
function nearestNeighbor(dPosition, oCoor, width, height, dWidth, dHeight, data, dData) {
    for(const [dX, dY, dIndex] of dPosition()) {
      const index = oCoor(Math.round(dX * (width / dWidth)), Math.round(dY * (height / dHeight)))
      dData[dIndex] = data[index]         // red
      dData[dIndex + 1] = data[index + 1] // green
      dData[dIndex + 2] = data[index + 2] // blue
      dData[dIndex + 3] = data[index + 3] // alpha
    }
}
// 双线性插值
// i是整数部分，u是小数部分
// 　　f(i+u,j+v) = (1-u)(1-v)f(i,j) + (1-u)vf(i,j+1) + u(1-v)f(i+1,j) + uvf(i+1,j+1)
function bilinear(dPosition, oCoor, width, height, dWidth, dHeight, data, dData) {
    for(const [dX, dY, dIndex] of dPosition()) {

      const index = oCoor(Math.round(dX * (width / dWidth)), Math.round(dY * (height / dHeight)))
      dData[dIndex] = data[index]         // red
      dData[dIndex + 1] = data[index + 1] // green
      dData[dIndex + 2] = data[index + 2] // blue
      dData[dIndex + 3] = data[index + 3] // alpha
    }
}
export function scale(imageData, { ratio = 1, interpolation = INTERPOLATION.NEAREST_NEIGHBOR } = {}) {
  console.log(ratio);
  if (ratio === 1) {
    return imageData
  }
  // 最邻近插值法
  const { width, height, data } = imageData
  // 原始图像的data下标
  const oCoor = getCoordinate(width)
  // 原始图像的坐标
  const oPosition = getPixelPosition(width, height)
  // 目标图像的宽高
  const dWidth = Math.floor(width * ratio)
  const dHeight = Math.floor(height * ratio)
  const dData = new Uint8ClampedArray(4 * dWidth * dHeight)
  // 目标图像的坐标
  const dPosition = getPixelPosition(dWidth, dHeight)
  // 遍历目标图像的坐标，找出对应原图像的像素坐标
  switch (interpolation) {
    case INTERPOLATION.NEAREST_NEIGHBOR:
      nearestNeighbor(dPosition, oCoor, width, height, dWidth, dHeight, data, dData)
      break;
    case INTERPOLATION.BILINEAR:
      bilinear(dPosition, oCoor, width, height, dWidth, dHeight, data, dData)
      break;
    default:
      nearestNeighbor(dPosition, oCoor, width, height, dWidth, dHeight, data, dData)
  }
  // for(const [dX, dY, dIndex] of dPosition()) {
  //   const index = oCoor(Math.round(dX * (width / dWidth)), Math.round(dY * (height / dHeight)))
  //   dData[dIndex] = data[index]         // red
  //   dData[dIndex + 1] = data[index + 1] // green
  //   dData[dIndex + 2] = data[index + 2] // blue
  //   dData[dIndex + 3] = data[index + 3] // alpha
  // }
  const dImage = copyImageData(imageData, dWidth, dHeight, dData)
  return dImage
}
