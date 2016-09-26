import React, { Component } from 'react'
class ImageBoard extends Component {
  constructor(props) {
    super(props)
  }
  _attachCanvas(c, imageData) {
    if (c) {
        const ctx = c.getContext('2d')
        c.width = imageData.width
        c.height = imageData.height
        ctx.putImageData(imageData, 0, 0)
    }
  }
  render() {
    const imageData = this.props.imageData
    return (
      <div className="image-board">
      <canvas className="image-board-canvas" ref={c => this._attachCanvas(c, imageData)}></canvas>
      </div>
    )
  }
}
export default ImageBoard
