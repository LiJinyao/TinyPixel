import React , { PropTypes }  from 'react'
import { PROCESSES, process } from '../../actions/'
import GrayScale              from './GrayScale'
import Scale                  from './Scale'
/**
 * show action options according to action name.
 */
const OptionPanel = (props) => {
  switch (props.type) {
    case PROCESSES.GRAYSCALE:
      return (<GrayScale {...props}/>)
    case PROCESSES.SCALE:
      return (<Scale {...props}/>)
    default:
      return (<h1>no option</h1>)

  }
}

OptionPanel.propTypes = {
  // type is one of PROCESSES.
  type:               PropTypes.string.isRequired,
  // function to tell ActionList our option has chagned.
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
}

export default OptionPanel
