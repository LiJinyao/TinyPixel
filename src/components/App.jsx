import React, { Component, PropTypes }         from 'react'
import AppBar                                  from 'material-ui/AppBar'
import IconButton                              from 'material-ui/IconButton'
import IconMenu                                from 'material-ui/IconMenu'
import MenuItem                                from 'material-ui/MenuItem'
import MoreVertIcon                            from 'material-ui/svg-icons/navigation/more-vert'
import OpenFileIcon                            from 'material-ui/svg-icons/file/file-upload'
import ResetIcon                               from 'material-ui/svg-icons/action/restore'
import Download                                from 'material-ui/svg-icons/file/file-download'
import { setImageFile, receiveProcessedImage } from '../actions'
import MainViewer                              from '../containers/MainViewer'
import ActionList                              from '../containers/ActionList'

class App extends Component {
  constructor(props) {
    super(props)
    this.onMenuChange = this.handleMenuChange.bind(this)
    this.onFileChoose = this.handleFileChoose.bind(this)
  }
  handleFileSvae() {
    const image = this.props.processedImage
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.setAttribute('width', image.width)
    canvas.setAttribute('height', image.height)
    ctx.putImageData(image, 0, 0)
    const a = document.createElement('a')
    a.setAttribute('download', 'tinyPixel.png')
    a.setAttribute('href', canvas.toDataURL('image/png'))
    a.setAttribute('style', 'position: fixed; width: 0; height: 0; display: none;')
    const link = document.body.appendChild(a)
    link.click()
    document.body.removeChild(link)
  }
  handleFileChoose(event) {
    const dispatch = this.props.dispatch
    dispatch(setImageFile(event.target.files[0]))
  }
  handleMenuChange(event, value) {
    switch (value) {
      case 'OPEN':
        this.input.click()
        break
      case 'SAVE':
        this.handleFileSvae()
        break
      case 'RESET':
        this.props.dispatch(receiveProcessedImage(null))
        break
      default:
    }
  }
  render() {
    const style = {
      position: 'fixed',
      top:      0,
    }
    return (
      <div>
        <AppBar
          style={style}
          title="TinyPixel"
          showMenuIconButton={false}
          iconElementRight={
            <IconMenu
              onChange={this.onMenuChange}
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem value="OPEN" primaryText="打开" leftIcon={<OpenFileIcon />} />
              <MenuItem
                value="SAVE"
                primaryText="保存"
                leftIcon={<Download />}
                disabled={!this.props.processed}
              />
              <MenuItem
                value="RESET"
                primaryText="重置"
                leftIcon={<ResetIcon />}
                disabled={!this.props.processed}
              />
            </IconMenu>
            }
        />
        <MainViewer />
        <ActionList />
        <input
          type="file"
          className="appbar-fileinput"
          id="appbar-fileinput"
          accept="image/*"
          ref={(input) => { this.input = input }}
          onChange={this.onFileChoose}
        />
      </div>
    )
  }
}
App.propTypes = {
  processed: PropTypes.bool.isRequired,
  dispatch:  PropTypes.func.isRequired,

}
export default App
