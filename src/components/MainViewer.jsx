import React, { Component, PropTypes } from 'react'
import FlatButton                      from 'material-ui/FlatButton'
import TextField                       from 'material-ui/TextField'


class ImageBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 100, // zoom ratio 100 ~ 0
    }
  }
  componentDidMount() {
    this.onWindowResize()
    this.resize = () => {
      this.onWindowResize()
    }
    window.addEventListener('resize', this.resize)
  }


  componentDidUpdate() {
    this.draw()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }


  onWindowResize() {
    // const c = this.canvas
    // const { width, height } = this.canvasWarp.getBoundingClientRect()
    // //c.width = width
    // //c.height = height
    this.draw()
  }
  onScale(offset) {
    let zoom = this.state.zoom
    zoom += offset
    if (zoom <= 300 && zoom >= 0) {
      this.setState({ zoom })
    }
  }
  // draw imagedata into the canvas.
  draw() {
    // draw in middle
    const imageData = this.props.imageData
    const zoomRatio = this.state.zoom / 100
    const { width: iWidth, height: iHeight } = this.props.imageData
    const dWidth = Math.floor(iWidth * zoomRatio)
    const dHeight = Math.floor(iHeight * zoomRatio)
    this.canvas.width = dWidth
    this.canvas.height = dHeight
    const { width, height } = this.canvas
    const dx = Math.floor((width / 2) - (dWidth / 2))
    const dy = Math.floor((height / 2) - (dHeight / 2))
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    const tempCanvas = document.createElement('canvas')
    tempCanvas.height = imageData.height
    tempCanvas.width = imageData.width
    tempCanvas.getContext('2d').putImageData(imageData, 0, 0)

    ctx.drawImage(tempCanvas, dx, dy, dWidth, dHeight)
  }
  render() {
    return (
      <div className="image-board" ref={(c) => { this.canvasWarp = c }}>
        <div className="image-board-canvas-warp">
          <canvas className="image-board-canvas" ref={(c) => { this.canvas = c }} />
        </div>
        <div className="zoom-panel">
          <FlatButton label="+" style={{ minWidth: 30 }} onClick={() => this.onScale(5)} />
          <TextField
            hintText="Zoom ratio"
            value={`${this.state.zoom}%`}
            style={{ width: 50 }}
            inputStyle={{ textAlign: 'center' }}
          />
          <FlatButton label="-" style={{ minWidth: 30 }} onClick={() => this.onScale(-5)} />
        </div>
      </div>
    )
  }
}
ImageBoard.propTypes = {
  imageData: PropTypes.shape({
    width:  PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),

}
export default ImageBoard
