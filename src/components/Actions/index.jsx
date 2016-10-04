import React , { PropTypes }  from 'react'
import { PROCESSES, process } from '../../actions/'
import GrayScale              from './GrayScale'
import Scale                  from './Scale'
import Rotate from './Rotate'
/**
 * show action options according to action name.
 */
const OptionPanel = (props) => {
  let OptionComp = null
  switch (props.type) {
    case PROCESSES.GRAYSCALE:
      OptionComp = GrayScale
      break;
      // return (<GrayScale {...props}/>)
    case PROCESSES.SCALE:
      OptionComp = Scale
      break;
      // return (<Scale {...props}/>)
    case PROCESSES.ROTATE:
      OptionComp = Rotate
      break;
      // return (<Rotate {...props}/>)
    default:
      return (<h1>no option</h1>)
  }
  return (
    <div className="option-panel">
      <OptionComp {...props}/>
    </div>
  )
}

OptionPanel.propTypes = {
  // type is one of PROCESSES.
  type:               PropTypes.string.isRequired,
  // function to tell ActionList our option has chagned.
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
}

export default OptionPanel
