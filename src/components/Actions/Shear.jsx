import React, { Component, PropTypes }   from 'react'
import Slider                            from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup}   from 'material-ui/RadioButton';
const DIRC = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
}
class Shear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: DIRC.HORIZONTAL,
      offset: 0,
      target: 'ORIGIN',
    }
  }
  componentDidMount() {
    // init option.
    this.props.handleOptionChange(this.state)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.image !== this.props.image) {
      this.setState({
        direction: DIRC.HORIZONTAL,
        offset: 0,
      })
      this.props.handleOptionChange(this.state)
    }
  }
  handleDirectionChange(event, val) {
    const direction = val
    this.setState({ direction })
    this.props.handleOptionChange({ direction })
  }
  handleOffsetChange(event, val) {
    const offset = Math.round(val)
    this.setState({ offset })
    this.props.handleOptionChange({ offset })
  }

  render() {
    const { width, height } = this.props.image
    return (
      <div>
        <RadioButtonGroup
        name="shearDirection"
        defaultSelected={this.state.direction}
        onChange={this.handleDirectionChange.bind(this)}
        >
          <RadioButton
            value={DIRC.HORIZONTAL}
            label="水平"
            disabled={this.props.disabled}
            style={{marginBottom: 16}}
            />
          <RadioButton
            value={DIRC.VERTICAL}
            label="竖直"
            disabled={this.props.disabled}
            style={{marginBottom: 16}}
            />
        </RadioButtonGroup>
        <span>{`偏移量：${this.state.offset}`}</span>
        <Slider
        defaultValue={0}
        min={0}
        max={10}
        step={1}
        value={this.state.offset}
        onChange={this.handleOffsetChange.bind(this)}
        disabled={this.props.disabled}/>
      </div>

    )
  }
}
Shear.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
}
export default Shear
