/**
 * scale iamge.
 * options: { ratio: {float}, interpolation: 'NEAREST_NEIGHBOR' }
 */
import { getPixelPosition, getCoordinate, matrixMultiplication } from './util'

export const INTERPOLATION = {
  NONE: 'NONE', // 不插值
  NEAREST_NEIGHBOR: 'NEAREST_NEIGHBOR', // 最临近插值
  BILINEAR: 'BILINEAR', // 双线性插值
  BICUBIC: 'BICUBIC', // 双三次插值
}

// 不插值，空像素为255 255 255 255
function noInterpolation(oPosition, dCoor, width, height, dWidth, dHeight, data, dData) {
  for(const [oX, oY, oIndex] of oPosition()) {
    const dIndex = dCoor(Math.round(oX * (dWidth / width)), Math.round(oY * (dHeight / height)))
    dData[dIndex] = data[oIndex]         // red
    dData[dIndex + 1] = data[oIndex + 1] // green
    dData[dIndex + 2] = data[oIndex + 2] // blue
    dData[dIndex + 3] = data[oIndex + 3] // alpha
  }
}
// 最临近插值
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
/*
现在假如目标图的象素坐标为（1，1），那么反推得到的对应于源图的坐标是（0.75 , 0.75）,
这其实只是一个概念上的虚拟象素,实际在源图中并不存在这样一个象素,那么目标图的象素（1，1）的取值不能够由这个虚拟象素来决定，
而只能由源图的这四 个象素共同决定：（0，0）（0，1）（1，0）（1，1），
而由于（0.75,0.75）离（1，1）要更近一些，那么（1,1）所起的决定作用更大一 些，
这从公式1中的系数uv=0.75×0.75就可以体现出来，而（0.75,0.75）离（0，0）最远，
所以（0，0）所起的决定作用就要小一些， 公式中系数为(1-u)(1-v)=0.25×0.25也体现出了这一特点；
 */
function bilinear(dPosition, oCoor, width, height, dWidth, dHeight, data, dData) {
  //f(i+u,j+v) = (1-u)(1-v)f(i,j) + (1-u)vf(i,j+1) + u(1-v)f(i+1,j) + uvf(i+1,j+1)
    for(const [dX, dY, dIndex] of dPosition()) {
      const tx = dX * (width / dWidth)
      const ty = dY * (height / dHeight)
      const i = Math.floor(tx)
      const j = Math.floor(ty)
      const u = tx - i
      const v = ty - j
      const a = (1 - u) * (1 - v)
      const b = (1 - u) * v
      const c = u * (1 - v)
      const d = u * v
      // r, g, b, a
      for(let s = 0; s <= 3; ++s) {
        dData[dIndex + s] = a * data[oCoor(i, j) + s]
        + b * data[oCoor(i, j + 1) + s]
        + c * data[oCoor(i + 1, j) + s]
        + d * data[oCoor(i + 1, j + 1) + s]
      }
    }
}

/**
 * 双三次插值（英语：Bicubic interpolation）
 */
function bicubic(dPosition, oCoor, width, height, dWidth, dHeight, data, dData) {
  // S 函数
  function S(x) {
    const absX = Math.abs(x)
    if (0 <= absX && absX < 1) {
      return 1 - 2 * absX * absX + absX * absX * absX
    } else if (1 <= absX && absX < 2) {
      return 4 - 8 * absX + 5 * absX * absX - absX * absX * absX
    }
    // absX >= 2
    return 0
  }

  for(const [dX, dY, dIndex] of dPosition()) {
    const tx = dX * (width / dWidth)
    const ty = dY * (height / dHeight)
    const i = Math.floor(tx)
    const j = Math.floor(ty)
    const u = tx - i
    const v = ty - j
    // A矩阵 1 X 4
    const A = [[S(u + 1), S(u), S(u - 1), S(u - 2)]]
    // C矩阵 4 X 1
    const C = [[S(v + 1)], [S(v)], [S(v - 1)], [S(v - 2)]]

    // r, g, b, a
    for(let s = 0; s <= 3; ++s) {
      // B矩阵 4 X 4
      const B = [
        [data[oCoor(i - 1, j - 1) + s], data[oCoor(i - 1, j) + s], data[oCoor(i - 1, j + 1) + s], data[oCoor(i - 1, j + 2) + s]],
        [data[oCoor(i    , j - 1) + s], data[oCoor(i    , j) + s], data[oCoor(i    , j + 1) + s], data[oCoor(i    , j + 2) + s]],
        [data[oCoor(i + 1, j - 1) + s], data[oCoor(i + 1, j) + s], data[oCoor(i + 1, j + 1) + s], data[oCoor(i + 1, j + 2) + s]],
        [data[oCoor(i + 2, j - 1) + s], data[oCoor(i + 2, j) + s], data[oCoor(i + 2, j + 1) + s], data[oCoor(i + 2, j + 2) + s]],
      ]
      // ABC
      dData[dIndex + s] = matrixMultiplication(matrixMultiplication(A, B), C)[0][0]
    }
  }
}

export default function scale(imageData, { ratio = 1, type = INTERPOLATION.NEAREST_NEIGHBOR } = {}) {
  if (ratio === 1) {
    return imageData
  }
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
  switch (type) {
    case INTERPOLATION.NONE:
      const dCoor = getCoordinate(dWidth)
      noInterpolation(oPosition, dCoor, width, height, dWidth, dHeight, data, dData)
      break;
    case INTERPOLATION.BILINEAR:
      bilinear(dPosition, oCoor, width, height, dWidth, dHeight, data, dData)
      break;
    case INTERPOLATION.BICUBIC:
      bicubic(dPosition, oCoor, width, height, dWidth, dHeight, data, dData)
      break;
    default:
      nearestNeighbor(dPosition, oCoor, width, height, dWidth, dHeight, data, dData)
  }

  // const dImage = copyImageData(imageData, dWidth, dHeight, dData)
  return {
    data: dData,
    width: dWidth,
    height: dHeight,
  }
}
