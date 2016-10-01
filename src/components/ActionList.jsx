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
  [PROCESSES.BINARIZATION, '二值化'],
])

// process name list.
const pros = Object.keys(PROCESSES)

const items = []
pros.forEach((pro, i) => items.push(<MenuItem key={i+1} value={i+1} primaryText={processName.get(pro)} />))


class ActionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actionValue: 1,
      applyAction: false,
      option: {},
    }
  }
  componentDidMount() {
    // Do some init work
  }
  handleActionChange(event, index, value) {
    this.setState({
      actionValue: value,
    })
    // //dispatch image process action
    //
    // this.props.dispatch(process(PROCESSES.GRAYSCALE))
  }
  handleApplyAction() {
    this.props.dispatch(process(pros[this.state.actionValue - 1], this.state.option))
  }
  handleOptionChange(opt) {
    console.log(opt);
    this.setState({ option: opt })
  }
  render() {
    const { hasImage } = this.props
    // let optionPanel = null
    // switch (pros[this.state.actionValue - 1]) {
    //   case PROCESSES.GRAYSCALE:
    //     optionPanel = (<GrayScale disabled={!hasImage}/>)
    //     break;
    //   default:
    //     break;
    // }
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
