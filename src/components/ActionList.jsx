/**
 * all image process action shows in this component.
 * OptionPanel is an component which shows options according to current image process action.
 */
import React, { Component, PropTypes } from 'react'
import Paper                           from 'material-ui/Paper';
import DropDownMenu                    from 'material-ui/DropDownMenu';
import MenuItem                        from 'material-ui/MenuItem';
import { PROCESSES, process }          from '../actions/'
import RaisedButton                    from 'material-ui/RaisedButton'
import OptionPanel from './Actions/'
// map process name to a humanfridendly name
const processName = new Map([
  [PROCESSES.GRAYSCALE, '灰度'],
  [PROCESSES.SCALE, '缩放'],
])

// supported process name list.
const pros = Object.keys(PROCESSES)

const items = []
pros.forEach((pro, i) => items.push(<MenuItem key={i+1} value={i+1} primaryText={processName.get(pro)} />))

class ActionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actionValue: 1,
      applyAction: false,
      option: {target: 'PROCESSED'}, // target:ORIGIN, PROCESSED 操作的图像源，可以是原图也可以是处理过后的图
    }
  }
  componentDidMount() {
    // Do some init work
  }
  handleActionChange(event, index, value) {
    this.setState({
      actionValue: value,
      // reset option.
      option: {},
    })
    // if you want to emmit action immediately after option chagne, call this.handleApplyAction() here.
    // this.handleApplyAction()
  }
  handleApplyAction() {
    this.props.dispatch(process(pros[this.state.actionValue - 1], this.state.option))
  }
  handleOptionChange(opt) {
    console.log({ option: Object.assign(this.state.option, opt) });
    this.setState({ option: Object.assign(this.state.option, opt) })
  }
  render() {
    const { hasImage } = this.props
    return (
      <Paper
      className="action-list-panel"
      zDepth={2}
      >
      <p>选择操作</p>
      <DropDownMenu
      style={{width: 182}}
      value={this.state.actionValue}
      onChange={this.handleActionChange.bind(this)}
      autoWidth
      disabled={!hasImage}
      >
      {items}
      </DropDownMenu>
      <RaisedButton disabled={!hasImage} secondary label="应用" onClick={this.handleApplyAction.bind(this)}/>
      <OptionPanel
      type={pros[this.state.actionValue - 1]}
      handleOptionChange={this.handleOptionChange.bind(this)}
      disabled={!hasImage }
      />
      </Paper>
    )
  }
}
ActionList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    hasImage: PropTypes.bool.isRequired,
}

export default ActionList
