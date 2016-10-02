import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import Index                           from '../components/App'

class App extends Component {
  componentDidMount() {
    // check file
    // if file not exists, ask user upload one.
  }
  render() {
    const { file, dispatch, processing } = this.props
    return (<Index file={file} dispatch={dispatch} processing={processing}/>)
  }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    file:       state.fileRepo.file,
    processing: state.image.processing,
})
export default connect(mapStateToProps)(App)
