import Slider                            from 'material-ui/Slider'
import React, { Component, PropTypes }   from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const DIRC = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL:   'VERTICAL',
}
class Shear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: DIRC.HORIZONTAL,
      offset:    0,
      target:    'ORIGIN',
    }
    this.onOffsetChange = this.handleOffsetChange.bind(this)
    this.onDirectionChange = this.handleDirectionChange.bind(this)
  }
  componentDidMount() {
    // init option.
    this.props.handleOptionChange(this.state)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.setState({
        direction: DIRC.HORIZONTAL,
        offset:    0,
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
    return (
      <div>
        <RadioButtonGroup
          name="shearDirection"
          defaultSelected={this.state.direction}
          onChange={this.onDirectionChange}
        >
          <RadioButton
            value={DIRC.HORIZONTAL}
            label="水平"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={DIRC.VERTICAL}
            label="垂直"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
        </RadioButtonGroup>
        <span>{`偏移角：${this.state.offset}°`}</span>
        <Slider
          defaultValue={0}
          min={-89}
          max={89}
          step={1}
          value={this.state.offset}
          onChange={this.onOffsetChange}
          disabled={this.props.disabled}
        />
      </div>

    )
  }
}
Shear.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
}
export default Shear
