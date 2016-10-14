import React, { Component, PropTypes } from 'react'

class Histogram extends Component {
  constructor(props) {
    super(props)
    this.style = {
      height: 250,
      width:  380,
    }
  }
  componentDidMount() {
    // this.drawHistogram()
  }
  componentDidUpdate() {
    this.drawHistogram()
  }
  drawHistogram() {
    const { r, g, b, pixelNumber } = this.props.info
    const canvas = this.canvas
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, this.style.width, this.style.height)
    const maxR = Math.max(...r)
    const maxG = Math.max(...g)
    const maxB = Math.max(...b)
    // 求出所有通道中像素数的最大值
    const maxChannel = Math.max(maxR, maxG, maxB)
    // 通过像素数的最大值确定高度比例，最大值的高度应该是canvas的高度，其它值按照这个比例确定在canvas中的高度
    const channelRatio = this.style.height / maxChannel
    // 像素值是0～255，为了适应canvas宽度同样需要一个比例。通过这个比例求出每个像素值对应在canvas中的横向位置
    const widthRatio = 255 / this.style.width
    const channelColor = ['rgba(255, 80, 80, 0.9)', 'rgba(80, 255, 80, 0.9)', 'rgba(80, 80, 255, 0.9)']
    const chanel = [r, g, b]
    for (let t = 0; t < 3; ++t) {
      ctx.strokeStyle = channelColor[t]
      ctx.beginPath()
      for (let i = 0; i <= this.style.width; ++i) {
        const x = Math.round(widthRatio * i)
        ctx.moveTo(i, this.style.height)
        ctx.lineTo(i, Math.ceil(this.style.height - (chanel[t][x] * channelRatio)))
      }
      ctx.closePath()
      ctx.stroke()
    }
  }
  render() {
    return (
      <canvas {...this.style} ref={(c) => { this.canvas = c }} />
    )
  }
}
Histogram.propTypes = {
  info: PropTypes.shape({
    r: PropTypes.array,
    g: PropTypes.array,
    b: PropTypes.array,
  }),
}
export default Histogram
