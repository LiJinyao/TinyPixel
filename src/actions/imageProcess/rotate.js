/**
 * rotate image.
 * option: rotate angle 0~360
 */
import { getPixelPosition, getCoordinate } from './util'

function bilinear(dPosition, oCoor, width, height, dWidth, dHeight, data, dData, cosθ, sinθ, cX, cY) {
  //f(i+u,j+v) = (1-u)(1-v)f(i,j) + (1-u)vf(i,j+1) + u(1-v)f(i+1,j) + uvf(i+1,j+1)
  for(const [dX, dY, dIndex] of dPosition()) {
    const tx = (dX) * cosθ + (dY) * sinθ + cX // v是目标图像x坐标变换到原图的x坐标的值
    const ty = -(dX) * sinθ + (dY) * cosθ + cY // w是目标图像y坐标变换到原图的y坐标的值
    const tv = Math.round(tx)
    const tw = Math.round(ty)
    const i = Math.floor(tx)
    const j = Math.floor(ty)
    const u = tx - i
    const v = ty - j
    const a = (1 - u) * (1 - v)
    const b = (1 - u) * v
    const c = u * (1 - v)
    const d = u * v
    if (tv < width + 12 && tw < height + 12 && tv > -12 && tw > -12) {
      // r, g, b, a
      for(let s = 0; s <= 3; ++s) {
        dData[dIndex + s] = a * data[oCoor(i, j) + s]
        + b * data[oCoor(i, j + 1) + s]
        + c * data[oCoor(i + 1, j) + s]
        + d * data[oCoor(i + 1, j + 1) + s]
      }
    }
  }
}




export default function rotate(imageData, { angle = 0 } = {}) {
  const radians = angle * Math.PI / 180
  const sinθ = Math.sin(radians)
  const cosθ = Math.cos(radians)
  console.log(angle)
  if (angle === 0) {
    return imageData
  }
  const { width, height, data } = imageData
  // 原始图像的data下标
  const oCoor = getCoordinate(width)
  // 原始图像的坐标
  const oPosition = getPixelPosition(width, height)
  //  计算目标图像的宽高
  const dWidth = Math.round(Math.abs(sinθ * height) + Math.abs(cosθ * width))
  const dHeight = Math.round(Math.abs(cosθ * height) + Math.abs(sinθ * width))
  // 旋转中心偏移
  const cX = Math.round( -0.5 * dWidth * cosθ - 0.5 * dHeight * sinθ + 0.5 * width)
  const cY = Math.round(  0.5 * dWidth * sinθ - 0.5 * dHeight * cosθ + 0.5 * height)
  const dData = new Uint8ClampedArray(4 * dWidth * dHeight)
  // 目标图像的坐标
  const dPosition = getPixelPosition(dWidth, dHeight)
  /**
   * 反向映射
   * v = xcosθ + ysinθ
   * w = -xsinθ + ycosθ
   */

  for(const [dX, dY, dIndex] of dPosition()) {
    const v = Math.round((dX) * cosθ + (dY) * sinθ) + cX // v是目标图像x坐标变换到原图的x坐标的值
    const w = Math.round(-(dX) * sinθ + (dY) * cosθ) + cY // w是目标图像y坐标变换到原图的y坐标的值
    // 按图像中心旋转，要做坐标变换
    // 只在对应区域进行变换
    if (v < width && w < height && v > 0 && w > 0) {
      const index = oCoor(v, w)
      dData[dIndex] = data[index]         // red
      dData[dIndex + 1] = data[index + 1] // green
      dData[dIndex + 2] = data[index + 2] // blue
      dData[dIndex + 3] = data[index + 3] // alpha
    }
  }
  return {
    data: dData,
    width: dWidth,
    height: dHeight,
  }
}
