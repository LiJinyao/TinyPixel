import { connect }          from 'react-redux'
import React, { PropTypes } from 'react'
import Paper                from 'material-ui/Paper'
import Histogram            from './Histogram'

const ImageInfo = ({ info }) => (
  <Paper
    className="image-info-panel"
    zDepth={2}
  >
    <Histogram info={info} />
  </Paper>
)
ImageInfo.propTypes = {
  info: PropTypes.shape({}),
}
const mapStateToProps = state => ({
  info: state.imageInfo.info,
})
export default connect(mapStateToProps)(ImageInfo)
