import React, { PropTypes } from 'react'
import { connect }          from 'react-redux'
import Board                from '../components/MainViewer'

const MainViewer = (props) => {
  const { processedImage, originImage } = props
  if (processedImage || originImage) {
    return (<Board imageData={processedImage || originImage} />)
  }
  return (<h1>Please open an image.</h1>)
}
MainViewer.propTypes = {
  /*eslint-disable*/
  processedImage:  PropTypes.shape({
    width:  PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  originImage: PropTypes.shape({
    width:  PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  /*eslint-enable*/
}
const mapStateToProps = state => ({
  originImage:    state.image.originImage,
  processedImage: state.image.processedImage,
})
export default connect(mapStateToProps)(MainViewer)
