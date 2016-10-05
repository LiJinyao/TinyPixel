/**
 * 偏移变换
 */
// 两个方向
const DIRC = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
}
import { getPixelPosition, getCoordinate } from './util'
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
   * v = x - xOffset
   * w = y - yOffset
   */
  for(const [dX, dY, dIndex] of dPosition()) {
    const v = dX - xOffset
    const w = dY - yOffset
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
