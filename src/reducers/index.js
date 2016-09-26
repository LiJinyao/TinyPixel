import { combineReducers } from 'redux'
import { RECEIVE_FILE } from '../actions'

function file(state, action) {
  switch (action.type) {
    case RECEIVE_FILE:
      // TODO: save file in redcers.
      return Object.assign({}, state, { file: action.file })
    default:
    return state
  }
}

const rootReducer = combineReducers({
  file,
});

export default rootReducer
