/**
 * 偏移变换
 * https://zh.wikipedia.org/wiki/仿射变换
 * offset是偏转方向与偏转轴的夹角。范围[-PI/2, PI/2]
 * 由于图片的原点在左上角，所以当夹角为负角时需要补偿对应坐标。
 */


import { getPixelPosition, getCoordinate } from './util'

// 两个方向
const DIRC = {
  HORIZONTAL: 'HORIZONTAL', // 水平
  VERTICAL:   'VERTICAL', // 垂直
}

function horizontal(dX, dY, tanθ, angleOffset) {
  /**
   * 水平偏移
   * v = x - tanθ * y
   * w = y
   */
   // 负角时需要坐标补偿 + angleOffset
  const v = Math.round(dX - (tanθ * dY) - angleOffset)
    // 当偏转角为负时需要坐标补偿
  const w = dY
  return { v, w }
}


function vertical(dX, dY, tanθ, angleOffset) {
  /**
   * 垂直偏移
   * v = x
   * w = y - tanθ * x
   */
  const v = dX
  const w = Math.round(dY - (tanθ * dX) - angleOffset)
  return { v, w }
}

export default function shear(imageData, { direction = DIRC.HORIZONTAL, offset = 0 } = {}) {
  if (offset === 0) {
    return imageData
  }
  const tanθ = Math.tan(offset * (Math.PI / 180))

  const { width, height, data } = imageData
  // 原始图像的data下标
  const oCoor = getCoordinate(width)
  // // 原始图像的坐标
  // const oPosition = getPixelPosition(width, height)
  // 目标图像的宽高
  // 水平方向变换是宽度改变，多出来的宽度为tanθ * height
  const dWidth = direction === DIRC.HORIZONTAL ? Math.round(width + Math.abs(tanθ * height)) : width
  // 垂直方向变换是高度改变，多出来的高度为tanθ * width
  const dHeight = direction === DIRC.VERTICAL ? Math.round(height + Math.abs(tanθ * width)) : height
  const dData = new Uint8ClampedArray(4 * dWidth * dHeight)
  // 目标图像的坐标
  const dPosition = getPixelPosition(dWidth, dHeight)
  /**
   * 反向映射
   * 水平偏移
   * v = x - tanθ * y
   * w = y
   * 垂直偏移
   * v = x
   * w = y - tanθ * x
   */
  let transtionFunc = null
  let angleOffset = 0
  switch (direction) {
    case DIRC.HORIZONTAL:
      transtionFunc = horizontal
      if (tanθ < 0) {
        angleOffset = Math.abs(tanθ * height)
      }
      break
    default:
      if (tanθ < 0) {
        angleOffset = Math.abs(tanθ * width)
      }
      transtionFunc = vertical
  }
  for (const [dX, dY, dIndex] of dPosition()) {
    const { v, w } = transtionFunc(dX, dY, tanθ, angleOffset)
    if (v < width && w < height && v >= 0 && w >= 0) {
      const index = oCoor(v, w)
      dData[dIndex] = data[index]         // red
      dData[dIndex + 1] = data[index + 1] // green
      dData[dIndex + 2] = data[index + 2] // blue
      dData[dIndex + 3] = data[index + 3] // alpha
    }
  }
  return {
    width:  dWidth,
    height: dHeight,
    data:   dData,
  }
}
