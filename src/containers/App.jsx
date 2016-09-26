import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import Index                           from '../components/App'

class App extends Component {
  componentDidMount() {
    // check file
    // if file not exists, ask user upload one.
  }
  render() {
    const { file, dispatch} = this.props
    return (<Index file={file} dispatch={dispatch}/>)
  }
}
App.PropTypes = {
    dispatch: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    file: state.fileRepo.file,
})
export default connect(mapStateToProps)(App)
