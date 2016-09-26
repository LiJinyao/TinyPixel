import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import OpenFileIcon from 'material-ui/svg-icons/action/open-in-browser'
import { receiveFile } from '../actions'
class App extends Component {
  onFileChoose(event) {
    const dispatch = this.props.dispatch;
    dispatch(receiveFile(event.target.files[0]));
    console.log(event.target.files[0]);
  }
  render() {
    return (
        <AppBar
        title="TinyPixel"
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Open File" icon={<OpenFileIcon/>}>
          <input
          type="file"
          className="appbar-fileinput"
          id="appbar-fileinput"
          accept="image/*"
          onChange={this.onFileChoose.bind(this)}/>
          </FlatButton>}
        />
    )
  }
}

export default App
