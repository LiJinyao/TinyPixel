import { getPixelPosition, getCoordinate, getPositionFromIndex } from './util'

// 8领域
// const steps = [
//     // 四邻接
//     [-1, 0], [1, 0], [0, -1], [0, 1],
//     // 对角邻接
//     [-1, -1], [1, 1], [-1, 1], [1, -1],
// ]
const steps = [
    // 快速细化算法的顺序P2~P9
    [0, -1], [1, -1], [1, 0], [1, 1],
    [0, 1], [-1, 1], [-1, 0], [-1, -1],
]
// 只接受灰度图
function traverse8Neighbor(x, y, width, height) {
  const neighbor = function* neb() {
    for (let i = 0; i < 8; ++i) {
      const tx = x + steps[i][0]
      const ty = y + steps[i][1]
      if (tx >= 0 && ty >= 0 && tx < width && ty < height) {
        yield [tx, ty]
      }
    }
  }
  neighbor[Symbol.iterator] = neighbor
  return neighbor
}

function getData(data, coor, width, height) {
  return (x, y, offset = 0) => {
    if (x >= 0 && y >= 0 && x < width && y < height) {
      return data[coor(x, y) + offset]
    }
    return 0
  }
}

// x, y 种子点
function connectedComponent(x, y, data, width, height) {
  const dData = new Uint8ClampedArray(width * height)
  // 直接BFS数组下标
  function bfs() {
    const coor = getCoordinate(width, 1)
    const visit = new Array(width * height)
    const getCoor = getPositionFromIndex(width)
    visit.fill(false)
    visit[coor(x, y)] = true
    const Q = [coor(x, y)]
    if (data[coor(x, y)] === 255) {
      dData[coor(x, y)] = 255
    }
    while (Q.length > 0) {
      const cur = Q.pop()
      dData[cur] = 255
      // 构造8领域遍历
      const co = getCoor(cur)
      const nei = traverse8Neighbor(co.x, co.y, width, height)
      // 膨胀，遍历8领域
      for (const [tx, ty] of nei()) {
        const next = coor(tx, ty)
        if (data[next] === 255 && !visit[next]) {
          Q.push(next)
          visit[next] = true
        }
      }
    }
  }
  bfs()
  return dData
}

function convexHull(data, width, height) {
  const corrosions = [
    // left
    [[-1, -1], [-1, 0], [-1, 1]],
    // up
    [[-1, -1], [0, -1], [1, -1]],
    // right
    [[1, -1], [1, 0], [1, 1]],
    // bottom
    [[-1, 1], [0, 1], [1, 1]],
  ]
  const coor = getCoordinate(width, 1)
  // dir: 0~3 in corrosions
  function getCorrosionPosition(x, y, dir) {
    const corr = function* c() {
      const step = corrosions[dir]
      for (let i = 0; i < 3; ++i) {
        yield [step[i][0] + x, step[i][1] + y]
      }
    }
    corr[Symbol.iterator] = corr
    return corr
  }
// 腐蚀函数
  function corrosion(generator, image) {
    const getPixel = getData(image, coor, width, height)
    for (const [x, y] of generator()) {
      // 只要有一个像素点为0，那么tag就为0，通过tag判断能否腐蚀
      if (getPixel(x, y) === 0) {
        return 0
      }
    }
    return 255
  }

// 四个方向分别腐蚀的图像
  const corrosionImages = [data.slice(), data.slice(), data.slice(), data.slice()]
  let temp = data.slice()
  const position = getPixelPosition(width, height, 1)
  for (let t = 0; t < 4; ++t) {
    console.log(`进度：${t + 1}/4。`)
    let changed = true
    const corrosionImage = corrosionImages[t]
    while (changed) {
      temp = corrosionImage.slice()
      changed = false
      for (const [x, y, index] of position()) {
        const dir = getCorrosionPosition(x, y, t) // 0 = left
        // 只对值为 0 的点做操作。避免在内部重复腐蚀无法正确更新changed
        if (corrosionImage[index] === 0) {
          if (corrosion(dir, temp) === 255) {
            changed = true
            corrosionImage[index] = 255
          }
        }
      }
    }
  }
  // mix the 4 images
  for (let t = 0; t < 4; ++t) {
    for (let i = 0; i < data.length; ++i) {
      corrosionImages[0][i] +=
        (corrosionImages[1][i]
        + corrosionImages[2][i]
        + corrosionImages[3][i])
    }
  }
  return corrosionImages[0]
}

// 快速细化算法
// A fast parallel algorithm for thinning digital patterns

function thinning(data, width, height) {
  const dData = data.slice()
  const coor = getCoordinate(width, 1)
  const position = getPixelPosition(width, height, 1)
  // 前景 255
  // 背景 0
  // 返回 true 标记删除
  const check1 = function c1(x, y, image) {
    const nei = traverse8Neighbor(x, y, width, height)
    let np = 0
    let sp = 0
    let p246 = 0
    let p468 = 0
    const neighbour = []
    for (const [tx, ty] of nei()) {
      neighbour.push(image[coor(tx, ty)] === 0 ? 0 : 1)
    }
    // 只遍历前7个，最后一个单独看，方便统计sp
    for (let i = 0; i < 7; ++i) {
      np += neighbour[i]
      if (neighbour[i] === 0 && neighbour[i + 1] === 1) {
        sp += 1
      }
    }
    np += neighbour[7]

    p246 = neighbour[0] * neighbour[2] * neighbour[4]
    p468 = neighbour[2] * neighbour[4] * neighbour[6]

    if (np >= 2 && np <= 6) {
      if (sp === 1 && p246 === 0 && p468 === 0) {
        return true
      }
      return false
    }
    return false
  }

  const check2 = function c2(x, y, image) {
    const nei = traverse8Neighbor(x, y, width, height)
    let np = 0
    let sp = 0
    let p248 = 0
    let p268 = 0
    const neighbour = []
    for (const [tx, ty] of nei()) {
      neighbour.push(image[coor(tx, ty)] === 0 ? 0 : 1)
    }
    // 只遍历前7个，最后一个单独看，方便统计sp
    for (let i = 0; i < 7; ++i) {
      np += neighbour[i]
      if (neighbour[i] === 0 && neighbour[i + 1] === 1) {
        sp += 1
      }
    }
    np += neighbour[7]

    p248 = neighbour[0] * neighbour[2] * neighbour[6]
    p268 = neighbour[0] * neighbour[4] * neighbour[6]

    if (np >= 2 && np <= 6) {
      if (sp === 1 && p248 === 0 && p268 === 0) {
        return true
      }
      return false
    }
    return false
  }

  const deletePixel = function d(image, checkMap) {
    checkMap.forEach((val, index) => {
      if (val) {
        // console.log("delete");
        image[index] = 0
      }
    })
  }

  const check = new Array(width * height)
  check.fill(false)

  let changed = true
  while (changed) {
    changed = false
    // check 1
    check.fill(false)
    for (const [x, y, i] of position()) {
      if (dData[i] === 255) {
        if (check1(x, y, dData)) {
          check[i] = true
          changed = true
        }
      }
    }
    deletePixel(dData, check)
    // check 2
    check.fill(false)
    for (const [x, y, i] of position()) {
      if (dData[i] === 255) {
        if (check2(x, y, dData)) {
          check[i] = true
          changed = true
        }
      }
    }
    deletePixel(dData, check)
  }
  return dData
}

export default function morphology(imageData, { type = 'CONNECTED_COMPONENT' } = {}) {
  const { data, width, height } = imageData
  let BW = new Uint8ClampedArray(width * height)
  const bwPo = getPixelPosition(width, height, 1)
  const oCoor = getCoordinate(width)
  for (const [x, y, index] of bwPo()) {
    // 粗暴二值一波
    BW[index] = data[oCoor(x, y)] > 127 ? 255 : 0
  }
  switch (type) {
    case 'CONNECTED_COMPONENT':
      BW = connectedComponent(100, 100, BW, width, height)
      break
    case 'CONVEX_HULL':
      BW = convexHull(BW, width, height)
      break
    case 'THINNING':
      BW = thinning(BW, width, height)
      break
    default:
  }

  // back to rgba
  const dData = new Uint8ClampedArray(4 * width * height)
  const dPo = getPixelPosition(width, height)
  const dCoor = getCoordinate(width, 1)
  for (const [x, y, index] of dPo()) {
    dData[index] = BW[dCoor(x, y)]
    dData[index + 1] = BW[dCoor(x, y)]
    dData[index + 2] = BW[dCoor(x, y)]
    dData[index + 3] = 255
  }
  return {
    data: dData,
    width,
    height,
  }
}
