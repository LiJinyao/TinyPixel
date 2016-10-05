/**
 * image process helpers.
 */

// return coordinate in imageData.data according to position x, y
export function getCoordinate(width) {
  return (x, y) => x * 4 + y * width * 4
}

// return a generator iterates all pixel position
export function getPixelPosition(width, height) {
  const positions = function* pos() {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        yield [x, y, x * 4 + y * width * 4]
      }
    }
  }
  positions[Symbol.iterator] = positions
  return positions
}

export function matrixMultiplication(a, b) {
  return a.map(row => {
    return row.map((_, i) => {
      return row.reduce((sum, cell, j) => {
        return sum + cell * b[j][i]
      }, 0)
    })
  })
}

/**
 * 计算两点间的欧几里得距离
 * @param  {array} p,q 包含三个元素的数组，第一个是x坐标，第二个是y坐标，第三个是z坐标。
 * @return {number}   两个点的欧几里得距离
 */
function euclideanMetric(p, q) {
  const [x1, y1, z1] = p
  const [x2, y2, z2] = q
  // 公式：sqrt( (x1-x2)^2+(y1-y2)^2 )
  const op = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2))
  return op
}


// 预置的测试数据
const dMTestImage = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
const dMTestStart = [1, 3]
const dMTestEnd = [1, 7]
/**
 * 计算dM距离
 * @param  {array[array]} image 要搜索的图像
 * @param  {array} start 长度为2的数组，表示起始点
 * @param  {array} end   长度为2的数组，表示终止
 * @return {number|null}       如果可达，返回距离，如果不可达，返回null。
 */
function dM(image, start, end) {
  const steps = [
    // 四邻接
    [-1, 0], [1, 0], [0, -1], [0, 1],
    // 对角邻接
    [-1, -1], [1, 1], [-1, 1], [1, -1]
  ]
  // BFS像素矩阵，先匹配d4，再匹配dD，即可实现dM计算
  /**
   * 记录一个点有没有被访问过
   * 0: 未访问过
   * 1: 已访问过
   */
  const visit = new Array(image.length)
  for (let i = 0; i < image.length; ++i) {
    visit[i] = new Array(image[0].length)
    // 初始化为0
    visit[i].fill(0)
  }
  /**
   * BFS路径。搜索策略为：
   * 先搜索四领域，在搜索对角领域，一旦搜索到一个可达的领域就立即加入队列并停止当前层次的搜索，进入下一层次。
   */
  let dis = 0
  const Q = [] // BFS队列
  Q.push(start) // 从起点开始搜索
  visit[start[0]][start[1]] = 1 // 标记记录过的点
  while (Q.length != 0) {
    const t = Q.pop()
    if (t[0] === end[0] && t[1] === end[1]) {
      // 找到了终点
      return dis
    }
    for (let i = 0; i < 8; ++i) {
      const [ox, oy] = steps[i]
      let [x, y] = t
      x += ox
      y += oy
      /**
       * m邻接的搜索顺序是：
       * 先判断四邻接，再判断对角邻接
       * 没有走过并且像素值为1的点才是合法的点
       */
      if (x >= 0 && x < image.length && y >= 0 && y < image[0].length
        && visit[x][y] === 0 && image[x][y] === 1
      ) {
        visit[x][y] = 1
        Q.push([x, y])
        break
      }
    }
    dis++
  }
  // return null if can't find
  return null
}
