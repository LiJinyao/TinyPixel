import 'babel-polyfill'
import { AppContainer }                 from 'react-hot-loader'
import injectTapEventPlugin             from 'react-tap-event-plugin'
import MuiThemeProvider                 from 'material-ui/styles/MuiThemeProvider'
import React                            from 'react'
import { render }                       from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware                  from 'redux-thunk'
import { Provider }                     from 'react-redux'
import rootReducer                      from './reducers'
import App                              from './containers/App'
import './styles/index.styl'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
injectTapEventPlugin()
const rootEl = document.getElementById('root')
render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>, rootEl)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
     /*eslint-disable*/
    const NextApp = require('./containers/App').default
    /*eslint-enable*/
    render(
      <AppContainer>
        <Provider store={store}>
          <MuiThemeProvider>
            <NextApp />
          </MuiThemeProvider>
        </Provider>
      </AppContainer>, rootEl)
  })
}
