import React, { Component } from 'react'
import AppBar               from 'material-ui/AppBar'
import FlatButton           from 'material-ui/FlatButton'
import OpenFileIcon         from 'material-ui/svg-icons/action/open-in-browser'
import { setImageFile }     from '../actions'
import MainViewer           from '../containers/MainViewer'
import ActionList           from '../containers/ActionList'
class App extends Component {
  onFileChoose(event) {
    const dispatch = this.props.dispatch;
    dispatch(setImageFile(event.target.files[0]));
  }
  render() {
    const style = {
      position: 'fixed',
      top: 0,
    }
    return (
      <div>
        <AppBar
        style={style}
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
        <MainViewer/>
        <ActionList/>
      </div>
    )
  }
}

export default App
