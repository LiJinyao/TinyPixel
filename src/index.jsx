import React                            from 'react'
import { render }                       from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware                  from 'redux-thunk'
import { Provider }                     from 'react-redux'
import rootReducer                      from './reducers'
import App                              from './containers/App'
import injectTapEventPlugin             from 'react-tap-event-plugin'
import MuiThemeProvider                 from 'material-ui/styles/MuiThemeProvider'
import style                            from './styles/index.styl'
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
injectTapEventPlugin()
render(
  <Provider store={store}>
    <MuiThemeProvider>
    <App/>
    </MuiThemeProvider>
  </Provider>
, document.getElementById('root'))
