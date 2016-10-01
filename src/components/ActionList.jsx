import React, { Component, PropTypes } from 'react'
import Paper                           from 'material-ui/Paper';
import DropDownMenu                    from 'material-ui/DropDownMenu';
import MenuItem                        from 'material-ui/MenuItem';
import { PROCESSES, process }          from '../actions/'
class ActionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actionValue: 1,
    }
  }
  componentDidMount() {
    // Do some init work
  }
  handleActionChange(event, index, value) {
    this.setState({
      actionValue: value,
    })
    //dispatch image process action
    this.props.dispatch(process(PROCESSES.GRAYSCALE))
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
      style={{width: "100%"}}
      value={this.state.actionValue}
      onChange={this.handleActionChange.bind(this)}
      autoWidth
      >
      <MenuItem value={1} primaryText="转为灰度" />
      <MenuItem value={2} primaryText="Every Night" />
      </DropDownMenu>
      </Paper>
    )
  }
}
ActionList.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    hasImage: PropTypes.bool.isRequired,
}

export default ActionList
