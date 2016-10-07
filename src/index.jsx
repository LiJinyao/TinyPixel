import 'babel-polyfill'
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
import {AppContainer} from 'react-hot-loader'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
injectTapEventPlugin()
const rootEl = document.getElementById('root')
render(
  <Provider store={store}>
    <MuiThemeProvider>
    <App/>
    </MuiThemeProvider>
  </Provider>
, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./containers/App').default;
    render(
      <AppContainer>
            <Provider store={store}>
              <MuiThemeProvider>
              <NextApp/>
              </MuiThemeProvider>
            </Provider>
      </AppContainer>
,
      document.getElementById('root')
    );
  });
}
