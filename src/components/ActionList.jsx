/**
 * all image process action shows in this component.
 * OptionPanel is an component which shows options according to current image process action.
 */
import RaisedButton                    from 'material-ui/RaisedButton'
import CircularProgress                from 'material-ui/CircularProgress'
import React, { Component, PropTypes } from 'react'
import Paper                           from 'material-ui/Paper'
import DropDownMenu                    from 'material-ui/DropDownMenu'
import MenuItem                        from 'material-ui/MenuItem'
import PROCESSES                       from '../actions/imageProcess/processName'
import { process }                     from '../actions/'
import OptionPanel                     from './Actions/'
// map process name to a humanfridendly name
const processName = new Map([
  [PROCESSES.GRAYSCALE, '灰度化'],
  [PROCESSES.SCALE, '缩放'],
  [PROCESSES.ROTATE, '旋转'],
  [PROCESSES.TRANSLATE, '平移'],
  [PROCESSES.SHEAR, '偏移变换'],
  [PROCESSES.SHARPEN, '锐化'],
  [PROCESSES.WAVEFILTERING, '频率域滤波'],
  [PROCESSES.NOISE, '噪声'],
])

// supported process name list.
const pros = Object.keys(PROCESSES)

const items = []
pros.forEach((pro, i) =>
items.push(<MenuItem key={i + 1} value={i + 1} primaryText={processName.get(pro)} />))

class ActionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actionValue: 1,
      applyAction: false,
      option:      { target: 'PROCESSED' }, // target:ORIGIN, PROCESSED 操作的图像源，可以是原图也可以是处理过后的图
    }
    this.onActionChange = this.handleActionChange.bind(this)
    this.onApplyAction = this.handleApplyAction.bind(this)
    this.onOptionChange = this.handleOptionChange.bind(this)
  }
  componentDidMount() {
    // Do some init work
  }
  handleActionChange(event, index, value) {
    this.setState({
      actionValue: value,
      // reset option.
      option:      {},
    })
  }
  handleApplyAction() {
    this.props.dispatch(process(pros[this.state.actionValue - 1], this.state.option))
  }
  handleOptionChange(opt) {
    this.setState({ option: Object.assign(this.state.option, opt) })
  }
  render() {
    const { hasImage, processing, image } = this.props
    const disable = (!hasImage || processing)
    return (
      <Paper
        className="action-list-panel"
        zDepth={2}
      >
        <div>
          {!processing &&
            <p className="choose-action">选择操作</p>
          }

          {processing &&
            <div>
              <p className="choose-action">正在处理</p>
              <CircularProgress size={0.5} style={{ verticalAlign: 'middle' }} />
            </div>
          }
        </div>
        <DropDownMenu
          style={{ width: 182 }}
          value={this.state.actionValue}
          onChange={this.onActionChange}
          autoWidth
          disabled={disable}
        >
          {items}
        </DropDownMenu>
        <RaisedButton
          disabled={disable}
          secondary
          label="应用"
          onClick={this.onApplyAction}
        />
        <OptionPanel
          type={pros[this.state.actionValue - 1]}
          handleOptionChange={this.onOptionChange}
          disabled={disable}
          image={image}
        />
      </Paper>
    )
  }
}
ActionList.propTypes = {
  dispatch:   PropTypes.func.isRequired,
  hasImage:   PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  /*eslint-disable*/
  image:      PropTypes.shape({
    width:  PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  /*eslint-enable*/
}

export default ActionList
