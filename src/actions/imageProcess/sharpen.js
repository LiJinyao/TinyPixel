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
const steps = [
    // 四邻接
    [-1, 0], [1, 0], [0, -1], [0, 1],
    // 对角邻接
    [-1, -1], [1, 1], [-1, 1], [1, -1],
]

function traceEdge(autoData, x, y, th2, coor, visit) {
  //console.log(`traceEdge start ${x}, ${y}`);
  const Q = []
  Q.push([x, y])
  visit[coor(x, y)] = 1
  while (Q.length !== 0) {
    const t = Q.pop()
    let findEntry = false // 表示是否在8领域中找>th2的点
    const tx = t[0]
    const ty = t[1]
    for (let i = 0; i < 8; ++i) {
      const step = steps[i]
      if (autoData(tx + step[0], ty + step[1]) > th2
      && visit[coor(tx + step[0], ty + step[1])] === 0) {
        findEntry = true
        visit[coor(tx + step[0], ty + step[1])] = 1
        Q.push([tx + step[0], tx + step[1]])
        break
      }
    }
    if (!findEntry) {
      // console.log(`traceEdge find entry ${tx}, ${ty}`);
      return [tx, ty]
    }
  }
}
// 先转为灰度图，然后高斯平滑
function grayscaleAndGaussianSmoothing(data, width, height) {
  const dData = new Uint8ClampedArray(width * height)
  const grayData = grayscale({ data, width, height }, { type: 'WEIGHTED_AVERAGE' }).data
  const coor = getCoordinate(width)
  const position = getPixelPosition(width, height)
  const gaussianPosition = getPixelPosition(5, 5, 1)
  const gaussianMatrix = [2, 4, 5, 4, 2,
                          4, 9, 12, 9, 4,
                          5, 12, 15, 12, 5,
                          4, 9, 12, 9, 4,
                          2, 4, 5, 4, 2]
  const autoData = getData(grayData, coor, width, height)
  let dIndex = 0
  for (const [x, y] of position()) {
    let mask = 0
    for (const [gx, gy, index] of gaussianPosition()) {
      mask += autoData(x - 2 + gx, y - 2 + gy) * gaussianMatrix[index]
    }
    dData[dIndex] = mask / 115
    dIndex += 1
  }
  return dData
}
// 查找亮度梯度
function findIntensityGradient(data, width, height) {
  const dData = new Uint8ClampedArray(width * height)
  const direction = new Array(width * height)
  const coor = getCoordinate(width, 1)
  const autoData = getData(data, coor, width, height)
  const position = getPixelPosition(width, height, 1)
  const pi18 = Math.PI / 8
  const pi78 = 7 * Math.PI / 8
  const pi38 = 3 * Math.PI / 8
  const pi58 = 5 * Math.PI / 8
  const pi14 = Math.PI / 4
  const pi12 = Math.PI / 2
  const pi34 = 3 * Math.PI / 4
  for (const [x, y, index] of position()) {
    // const GX = Math.abs(autoData(x + 1, y + 1) - autoData(x, y))
    // const GY = Math.abs(autoData(x + 1, y) - autoData(x, y + 1))
    const GX = -autoData(x - 1, y - 1)
              - (2 * autoData(x - 1, y))
              - autoData(x - 1, y + 1)
              + autoData(x + 1, y - 1)
              + (2 * autoData(x + 1, y))
              + autoData(x + 1, y + 1)

    const GY = autoData(x - 1, y - 1)
                + (2 * autoData(x, y - 1))
                + autoData(x + 1, y - 1)
                - autoData(x - 1, y + 1)
                - (2 * autoData(x, y + 1))
                - autoData(x + 1, y + 1)
    // const GX = -autoData(x, y) - autoData(x + 1, y) + autoData(x, y + 1) + autoData(x + 1, y + 1)
    // const GY = autoData(x, y) - autoData(x + 1, y) + autoData(x, y + 1) - autoData(x + 1, y + 1)
    dData[index] = Math.round(Math.sqrt((GX * GX) + (GY * GY)))
    /**
     * 0: -pi/8, pi/8
     * 45: 4/pi ~ pi/2
     * 90:
     */
    let angle = Math.atan2(GY, GX) * 180 / Math.PI

    if (((angle < 22.5) && (angle > -22.5)) || (angle > 157.5) || (angle < -157.5)) {
      angle = 0
    } else if (((angle > 22.5) && (angle < 67.5)) || ((angle < -112.5) && (angle > -157.5))) {
      angle = 45
    } else if (((angle > 67.5) && (angle < 112.5)) || ((angle < -67.5) && (angle > -112.5))) {
      angle = 90
    } else if (((angle > 112.5) && (angle < 157.5)) || ((angle < -22.5) && (angle > -67.5))) {
      angle = 135
    }

    direction[index] = angle
  }
  return { dData, direction }
}
// 非极大值抑制
function nonMaximumSuppression(data, direction, width, height) {
  const dData = new Uint8ClampedArray(width * height)
  const coor = getCoordinate(width, 1)
  const autoData = getData(data, coor, width, height)
  const position = getPixelPosition(width, height, 1)
  for (const [x, y, index] of position()) {
    const dir = direction[coor(x, y)]
    const center = autoData(x, y)
    switch (dir) {
      case 0:
        if (center > autoData(x + 1, y) && center > autoData(x - 1, y)) {
          dData[index] = center
        } else {
          dData[index] = 0
        }
        break
      case 45:
        if (center > autoData(x + 1, y - 1) && center > autoData(x - 1, y + 1)) {
          dData[index] = center
        } else {
          dData[index] = 0
        }
        break
      case 90:
        if (center > autoData(x, y - 1) && center > autoData(x, y + 1)) {
          dData[index] = center
        } else {
          dData[index] = 0
        }
        break
      case 135:
        if (center > autoData(x - 1, y - 1) && center > autoData(x + 1, y + 1)) {
          dData[index] = center
        } else {
          dData[index] = 0
        }
        break
      default:
        dData[index] = 0
    }
  }
  return dData
}
// 双阈值算法检测和边缘连接
function doubleThreshold(data, width, height) {
  // 两张图像
  const p1 = new Uint8ClampedArray(width * height)
  const p2 = new Uint8ClampedArray(width * height)
  const th2 = 110
  const th1 = Math.round(0.2 * th2)
  const coor = getCoordinate(width, 1)
  const autoData = getData(data, coor, width, height)
  const position = getPixelPosition(width, height, 1)

  for (const [x, y, index] of position()) {
    const sample = autoData(x, y)
    // p1
    if (sample < th1) {
      p1[index] = 0
    } else {
      p1[index] = sample
    }
    // p2
    if (sample < th2) {
      p2[index] = 0
    } else {
      p2[index] = sample
    }
  }
  // 以图二为基础，以图一为补充来连接边缘
  const autoP1 = getData(p1, coor, width, height)
  const autoP2 = getData(p2, coor, width, height)
  const visit = new Array(width * height)
  visit.fill(0)
  let px = 0
  let py = 0
  for (const [x, y] of position()) {
    // 遇到非零像素
    if (autoP2(x, y) > 0 && visit[coor(x, y)] === 0) {
      // 找出一条p2中的通路
      [px, py] = traceEdge(autoP2, x, y, 0, coor, visit)
      // 到p1的8领域中寻找非零像素，并插入到p2中
      let isFound = false
      while (!isFound) {
        for (let i = 0; i < 8; ++i) {
          if (autoP1(px + steps[i][0], py + steps[i][1]) > 0
          && visit[coor(px + steps[i][0], py + steps[i][1])] === 0) {
            px += steps[i][0]
            py += steps[i][1]
            p2[coor(px, py)] = autoP1(px, py)
            isFound = true
            break
          }
        }
        if (!isFound) {
          break
        }
        if (isFound) {
          isFound = false;
          [px, py] = traceEdge(autoP2, px, py, 0, coor, visit)
        }
      }
    }
  }
  for (const [x, y, index] of position()) {
    if (p2[index] > 0) {
      p2[index] = 255
    }
  }
  return p2
}

function canny(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  // step1
  const gaussianData = grayscaleAndGaussianSmoothing(data, width, height)
  // step2 查找亮度梯度
  const { dData: gradient, direction } = findIntensityGradient(gaussianData, width, height)
  // step3 非极大值抑制
  const suppresionData = nonMaximumSuppression(gradient, direction, width, height)
  // step4
  const result = doubleThreshold(suppresionData, width, height)
  result.forEach((p, i) => {
    const index = i * 4
    dData[index] = p
    dData[index + 1] = p
    dData[index + 2] = p
    dData[index + 3] = 255
  })
  return dData
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
      const GX = Math.abs(autoData(x + 1, y + 1, i) - autoData(x, y, i))
      const GY = Math.abs(autoData(x + 1, y, i) - autoData(x, y + 1, i))
      dData[index + i] = autoData(x, y, i) + Math.sqrt((GX * GX) + (GY * GY))
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

      dData[index + i] = autoData(x, y, i) + Math.sqrt((GX * GX) + (GY * GY))
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

      dData[index + i] = autoData(x, y, i) + Math.sqrt((GX * GX) + (GY * GY))
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
