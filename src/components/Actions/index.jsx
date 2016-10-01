import React                  from 'react'
import { PROCESSES, process } from '../../actions/'
import GrayScale from './GrayScale'
const Actions = (props) => {
  switch (props.type) {
    case PROCESSES.GRAYSCALE:
      return (<GrayScale {...props}/>)
      break;
    default:
      return (<h1>no option</h1>)

  }
}
export default Actions
