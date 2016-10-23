import { getCoordinate, getPixelPosition, getSubRangePixelPosition } from './util'

function roberts(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  // const operatorX = [0, 0, 0, 0, 1, 0, 0, 0, -1]
  // const operatorY = [0, 0, 0, 0, 0, 1, 0, -1, 0]
  const coor = getCoordinate(width)
  const position = getPixelPosition(width, height)
  for (const [x, y, index] of position()) {
    for (let i = 0; i < 3; ++i) {
      // 每次计算只涉及两个点，矩阵算法可以被简化
      dData[index + i] = Math.abs(data[coor(x + 1, y + 1) + i] - data[coor(x, y) + i])
                      + Math.abs(data[coor(x + 1, y) + i] - data[coor(x, y + 1) + i])
    }
    // alpha
    dData[index + 3] = 255
  }
  return dData
}

function prewitt(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  const operatorX = [-1, 0, 1,
                     -1, 0, 1,
                     -1, 0, 1]
  const operatorY = [-1, -1, -1,
                      0, 0, 0,
                      1, 1, 1]
  const position = getPixelPosition(width, height)
  for (const [x, y, index] of position()) {
    const subPosition = getSubRangePixelPosition({ x, y }, width)
    let dx = 0
    let dy = 0
    let opIndex = 0
    for (let i = 0; i < 3; ++i) {
      dx = 0
      dy = 0
      opIndex = 0
      for (const [oX, oY, oIndex] of subPosition) {
        if (oX >= 0 && oY >= 0 && oX < width && oY < height) {
          dx += data[oIndex + i] * operatorX[opIndex]
          dy += data[oIndex + i] * operatorY[opIndex]
        }
        opIndex += 1
      }
      dData[index + i] = Math.round(Math.sqrt(((dx * dx) + (dy * dy))))
    }
    // alpha
    dData[index + 3] = 255
  }
  return dData
}

function sobel(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  const operatorX = [-2, -2, -1,
                      0, 0, 0,
                      1, 2, 1]
  const operatorY = [-1, 0, 1,
                      -2, 0, 2,
                      -1, 0, 1]
  const position = getPixelPosition(width, height)
  for (const [x, y, index] of position()) {
    const subPosition = getSubRangePixelPosition({ x, y }, width)
    let dx = 0
    let dy = 0
    let opIndex = 0
    for (let i = 0; i < 3; ++i) {
      dx = 0
      dy = 0
      opIndex = 0
      for (const [oX, oY, oIndex] of subPosition) {
        if (oX >= 0 && oY >= 0 && oX < width && oY < height) {
          dx += data[oIndex + i] * operatorX[opIndex]
          dy += data[oIndex + i] * operatorY[opIndex]
        }
        opIndex += 1
      }
      dData[index + i] = Math.round(Math.sqrt(((dx * dx) + (dy * dy))))
    }
    // alpha
    dData[index + 3] = 255
  }
  return dData
}

function lapacian(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  // const operatorX = [0, 0, 0, 0, 1, 0, 0, 0, -1]
  // const operatorY = [0, 0, 0, 0, 0, 1, 0, -1, 0]
  const coor = getCoordinate(width)
  const position = getPixelPosition(width, height)
  for (const [x, y, index] of position()) {
    for (let i = 0; i < 3; ++i) {
      // 矩阵算法可以被简化
      // 第一个系数
      const op1 = data[coor(x + 1, y) + i]
                  + data[coor(x - 1, y) + i]
                  + data[coor(x, y + 1) + i]
                  + data[coor(x, y - 1) + i]
                  - (4 * data[coor(x, y) + i])
      dData[index + i] = data[coor(x, y) + i] - op1
    }
    // alpha
    dData[index + 3] = 255
  }
  return dData
}

export default function sharpen(imageData, { type = 'ROBERTS' } = {}) {
  const { data, width, height } = imageData
  let dData = null
  switch (type) {
    case 'ROBERTS':
      dData = roberts(data, width, height)
      break
    case 'PREWITT':
      dData = prewitt(data, width, height)
      break
    case 'SOBEL':
      dData = sobel(data, width, height)
      break
    case 'LAPACIAN':
      dData = lapacian(data, width, height)
      break
    default:
  }
  return {
    data: dData,
    width,
    height,
  }
}
