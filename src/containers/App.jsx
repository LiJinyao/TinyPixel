import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import Index                           from '../components/App'

class App extends Component {
  componentDidMount() {
    // check file
    // if file not exists, ask user upload one.
  }
  render() {
    const { file, dispatch, processing, originImage, processedImage } = this.props
    return (
      <Index
        file={file}
        dispatch={dispatch}
        processing={processing}
        originImage={originImage}
        processedImage={processedImage}
        processed={!(processedImage === null)}
      />)
  }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    file:       state.fileRepo.file,
    processing: state.image.processing,
    originImage: state.image.originImage,
    processedImage: state.image.processedImage,
})
export default connect(mapStateToProps)(App)
