import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import Index                           from '../components/App'

class App extends Component {
  componentDidMount() {
    // check file
    // if file not exists, ask user upload one.
  }
  render() {
    const { dispatch, processing, processedImage } = this.props
    return (
      <Index
        dispatch={dispatch}
        processing={processing}
        processedImage={processedImage}
        processed={!(processedImage === null)}
      />)
  }
}
App.propTypes = {
  dispatch:       PropTypes.func.isRequired,
  processing:     PropTypes.bool.isRequired,
  /*eslint-disable*/
  processedImage:  PropTypes.shape({
    width:  PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  /*eslint-enable*/
}
const mapStateToProps = state => ({
  file:           state.fileRepo.file,
  processing:     state.image.processing,
  originImage:    state.image.originImage,
  processedImage: state.image.processedImage,
})
export default connect(mapStateToProps)(App)
