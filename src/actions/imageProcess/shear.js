/**
 * 偏移变换
 */
// 两个方向
const DIRC = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
}
import { getPixelPosition, getCoordinate } from './util'

function horizontal(dX, dY, offset) {
  /**
   * 垂直偏移
   * v = x - offset * y
   * w = y
   */
    const v = Math.round(dX - offset * dY)
    const w = dY
    return { v, w }
}

function vertical(dX, dY, offset) {
  /**
   * 水平偏移
   * v = x
   * w = y - offset * x
   */
    const v = dX
    const w = Math.round(dY - offset * dX)
    return { v, w }
}

export default function shear(imageData, {direction = DIRC.HORIZONTAL, offset = 0} = {}) {
  if(offset === 0) {
    return imageData
  }
  const { width, height, data } = imageData
  // 原始图像的data下标
  const oCoor = getCoordinate(width)
  // 原始图像的坐标
  const oPosition = getPixelPosition(width, height)
  // 目标图像的宽高
  const dData = new Uint8ClampedArray(4 * width * height)
  dData.fill(123)
  // 目标图像的坐标
  const dPosition = getPixelPosition(width, height)
  /**
   * 反向映射
   * 垂直偏移
   * v = x - offset * y
   * w = y
   * 水平偏移
   * v = x
   * w = y - offset * x
   */
  let transtionFunc = null
  switch (direction) {
    case DIRC.HORIZONTAL:
      transtionFunc = horizontal
      break;
    default:
      transtionFunc = vertical
  }
  for(const [dX, dY, dIndex] of dPosition()) {
    const { v, w } = transtionFunc(dX, dY, offset)
    if (v < width && w < height && v >= 0 && w >= 0) {
      const index = oCoor(v, w)
      dData[dIndex] = data[index]         // red
      dData[dIndex + 1] = data[index + 1] // green
      dData[dIndex + 2] = data[index + 2] // blue
      dData[dIndex + 3] = data[index + 3] // alpha
    }
  }
  return {
    width,
    height,
    data: dData,
  }
}
