/**
 * 计算直方图信息
 */
function histogram(imageData) {
  /**
   * r,g,b数组长度为255，从0～255保存了每一个通道值出现的次数
   */
  const r = new Array(256)
  r.fill(0)
  const g = new Array(256)
  g.fill(0)
  const b = new Array(256)
  b.fill(0)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    r[data[i]] += 1
    g[data[i + 1]] += 1
    b[data[i + 2]] += 1
    // skip alpha.
  }
  // 结果保存在一个对象中
  const rgbInfo = {
    width:       imageData.width,
    height:      imageData.height,
    pixelNumber: imageData.data.length / 4,
    r,
    g,
    b,
  }
  return rgbInfo
}
self.onmessage = ({ data }) => {
  const result = histogram(data)
  postMessage(result)
}
