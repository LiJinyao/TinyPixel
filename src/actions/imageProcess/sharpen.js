import { getCoordinate, getPixelPosition } from './util'
import grayscale                           from './grayscale'
// 输入坐标返回数据，如果坐标越界，返回0
function getData(data, coor, width, height) {
  return (x, y, offset = 0) => {
    if (x >= 0 && y >= 0 && x < width && y < height) {
      return data[coor(x, y) + offset]
    }
    return 0
  }
}

// 先转为灰度图，然后高斯平滑
function grayscaleAndGaussianSmoothing(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  const grayData = grayscale({ data, width, height }, { type: 'WEIGHTED_AVERAGE' }).data
  const coor = getCoordinate(width)
  const position = getPixelPosition(width, height)
  const autoData = getData(grayData, coor, width, height)
  for (const [x, y, index] of position()) {
      // 每次计算只涉及两个点，矩阵算法可以被简化
    dData[index] = Math.round((autoData(x - 1, y - 1)
                       + (2 * autoData(x, y - 1))
                       + autoData(x + 1, y - 1)
                       + (2 * autoData(x - 1, y))
                       + (4 * autoData(x, y))
                       + (2 * autoData(x + 1, y))
                       + autoData(x - 1, y + 1)
                       + (2 * autoData(x, y + 1))
                       + autoData(x + 1, y + 1)) / 16)
    dData[index + 1] = dData[index]
    dData[index + 2] = dData[index]
    // alpha
    dData[index + 3] = 255
  }
  return dData
}

function canny(data, width, height) {
  return grayscaleAndGaussianSmoothing(data, width, height)
}

function roberts(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  // const operatorX = [0, 0, 0, 0, 1, 0, 0, 0, -1]
  // const operatorY = [0, 0, 0, 0, 0, 1, 0, -1, 0]
  const coor = getCoordinate(width)
  const autoData = getData(data, coor, width, height)
  const position = getPixelPosition(width, height)
  for (const [x, y, index] of position()) {
    for (let i = 0; i < 3; ++i) {
      // 每次计算只涉及两个点，矩阵算法可以被简化
      dData[index + i] = Math.abs(autoData(x + 1, y + 1, i) - autoData(x, y, i))
                      + Math.abs(autoData(x + 1, y, i) - autoData(x, y + 1, i))
    }
    // alpha
    dData[index + 3] = 255
  }
  return dData
}

function prewitt(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  const coor = getCoordinate(width)
  const autoData = getData(data, coor, width, height)
  // const operatorX = [-1, 0, 1,
  //                    -1, 0, 1,
  //                    -1, 0, 1]
  // const operatorY = [-1, -1, -1,
  //                     0, 0, 0,
  //                     1, 1, 1]
  const position = getPixelPosition(width, height)
  for (const [x, y, index] of position()) {
    for (let i = 0; i < 3; ++i) {
      const GX = Math.abs(((autoData(x - 1, y - 1, i)
                          + autoData(x - 1, y, i)
                          + autoData(x - 1, y + 1, i))
                          - (autoData(x + 1, y - 1, i)
                          + autoData(x, y - 1, i)
                          + autoData(x + 1, y + 1, i))))

      const GY = Math.abs(((autoData(x - 1, y - 1, i)
                          + autoData(x, y - 1, i)
                          + autoData(x + 1, y - 1, i))
                          - (autoData(x - 1, y + 1, i)
                          + autoData(x, y + 1, i)
                          + autoData(x + 1, y + 1, i))))

      dData[index + i] = GX + GY
    }
    // alpha
    dData[index + 3] = 255
  }
  return dData
}

function sobel(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  const coor = getCoordinate(width)
  const autoData = getData(data, coor, width, height)
  // const operatorX = [-2, -2, -1,
  //                     0, 0, 0,
  //                     1, 2, 1]
  // const operatorY = [-1, 0, 1,
  //                     -2, 0, 2,
  //                     -1, 0, 1]
  const position = getPixelPosition(width, height)
  for (const [x, y, index] of position()) {
    for (let i = 0; i < 3; ++i) {
      const GX = Math.abs(((autoData(x - 1, y - 1, i)
                          + (2 * autoData(x - 1, y, i))
                          + autoData(x - 1, y + 1, i))
                          - (autoData(x + 1, y - 1, i)
                          + (2 * autoData(x, y - 1, i))
                          + autoData(x + 1, y + 1, i))))

      const GY = Math.abs(((autoData(x - 1, y - 1, i)
                          + (2 * autoData(x, y - 1, i))
                          + autoData(x + 1, y - 1, i))
                          - (autoData(x - 1, y + 1, i)
                          + (2 * autoData(x, y + 1, i))
                          + autoData(x + 1, y + 1, i))))

      dData[index + i] = GX + GY
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
  const autoData = getData(data, coor, width, height)
  const position = getPixelPosition(width, height)
  for (const [x, y, index] of position()) {
    for (let i = 0; i < 3; ++i) {
      // 矩阵算法可以被简化
      // 第一个系数
      const op1 = autoData(x + 1, y, i)
                  + autoData(x - 1, y, i)
                  + autoData(x, y + 1, i)
                  + autoData(x, y - 1, i)
                  - (4 * autoData(x, y, i))
      dData[index + i] = autoData(x, y, i) - op1
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
    case 'CANNY':
      dData = canny(data, width, height)
      break
    default:
  }
  return {
    data: dData,
    width,
    height,
  }
}
