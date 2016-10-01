import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import Board                      from '../components/MainViewer'

class MainViewer extends Component {
  render() {
    const { processedImage, originImage } = this.props
    if (processedImage || originImage) {
      return (<Board imageData={processedImage || originImage}/>)
    }
    return (<h1>Please open an image.</h1>)
  }
}
const mapStateToProps = state => ({
  originImage: state.image.originImage,
  processedImage: state.image.processedImage,
})
export default connect(mapStateToProps)(MainViewer)
