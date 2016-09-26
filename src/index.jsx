import React                from 'react'
import { render }           from 'react-dom'
import { Provider }         from 'react-redux'
import App                 from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider'
import style from './styles/index.styl'
injectTapEventPlugin()
render(<MuiThemeProvider><App/></MuiThemeProvider>, document.getElementById('root'))
