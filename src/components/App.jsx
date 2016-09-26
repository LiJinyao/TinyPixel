import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import OpenFile from 'material-ui/svg-icons/action/open-in-browser'
const App = () => (
    <AppBar
    title="TinyPixel"
    showMenuIconButton={false}
    iconElementRight={<FlatButton label="Open file" icon={<OpenFile/>}/>}
    />
)
export default App
