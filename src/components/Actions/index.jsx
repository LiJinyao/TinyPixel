import React, { PropTypes } from 'react'
import GrayScale            from './GrayScale'
import Scale                from './Scale'
import Shear                from './Shear'
import Translate            from './Translate'
import Rotate               from './Rotate'
import Sharpen              from './Sharpen'
import WaveFiltering        from './WaveFiltering'
import Noise                from './Noise'
import PROCESSES            from '../../actions/imageProcess/processName'

/**
 * show action options according to action name.
 */
const OptionPanel = (props) => {
  let OptionComp = null
  switch (props.type) {
    case PROCESSES.GRAYSCALE:
      OptionComp = GrayScale
      break
      // return (<GrayScale {...props}/>)
    case PROCESSES.SCALE:
      OptionComp = Scale
      break
      // return (<Scale {...props}/>)
    case PROCESSES.ROTATE:
      OptionComp = Rotate
      break
    case PROCESSES.TRANSLATE:
      OptionComp = Translate
      break
    case PROCESSES.SHEAR:
      OptionComp = Shear
      break
    case PROCESSES.SHARPEN:
      OptionComp = Sharpen
      break
    case PROCESSES.WAVEFILTERING:
      OptionComp = WaveFiltering
      break
    case PROCESSES.NOISE:
      OptionComp = Noise
      break
    default:
      return (<h1>no option</h1>)
  }
  return (
    <div className="option-panel">
      <OptionComp {...props} />
    </div>
  )
}
/**
 * no-unused-prop-types sometimes fails to detect props in functions on stateless components
 * https://github.com/yannickcr/eslint-plugin-react/issues/885
 */
/* eslint-disable */
OptionPanel.propTypes = {
  // type is one of PROCESSES.
  type:               PropTypes.string.isRequired,
  // function to tell ActionList our option has chagned.
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
}
/* eslint-enable */
export default OptionPanel
