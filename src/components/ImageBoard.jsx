import React, { Component } from 'react'
import ReactDOM       from 'react-dom'
class ImageBoard extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.onWindowResize()
    this.draw()
    this.resize = () => {
      this.onWindowResize()
    }
     window.addEventListener('resize', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  componentDidUpdate() {
    this.draw()
  }
  // draw imagedata into the canvas.
  draw() {
    // draw in middle
    const imageData = this.props.imageData
    const { width, height } = this.canvas
    const dx = width / 2 - imageData.width / 2
    const dy = height / 2 - imageData.height / 2
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    // convert to ImageBitmap for zooming
    // TODO: support zooming. see: void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // BUG convert to ImageBitmap will blur the image
    createImageBitmap(imageData).then(image => ctx.drawImage(image, dx, dy))
    // ctx.putImageData(imageData, dx, dy)
  }
  onWindowResize() {
    const c = this.canvas
    const { width, height } = this.canvasWarp.getBoundingClientRect()
    console.log(this.canvasWarp.getBoundingClientRect())
    c.width = width
    c.height = height
    this.draw()
  }
  render() {
    const imageData = this.props.imageData
    return (
      <div className="image-board" ref={c => this.canvasWarp = c}>
      <canvas className="image-board-canvas" ref={c => this.canvas = c}></canvas>
      </div>
    )
  }
}
export default ImageBoard
