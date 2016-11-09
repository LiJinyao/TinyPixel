import React, { Component, PropTypes }   from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Slider                            from 'material-ui/Slider'

const TYPE = {
  LOW_PASS_FILTER:              'LOW_PASS_FILTER',
  HIGH_PASS_FILTER:             'HIGH_PASS_FILTER',
  GAUSS_LOW_PASS_FILTER:        'GAUSS_LOW_PASS_FILTER',
  GAUSS_HIGH_PASS_FILTER:       'GAUSS_HIGH_PASS_FILTER',
  GAUSS_FILTER:                 'GAUSS_FILTER',
  BUTTER_WORTH_LOW_PASS_FILTER: 'BUTTER_WORTH_LOW_PASS_FILTER',
}
class WaveFiltering extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:   TYPE.LOW_PASS_FILTER,
      target: 'ORIGIN',
      d:      20,
    }
    this.onTypeChange = this.handleTypeChange.bind(this)
    this.onDchange = this.handleDChange.bind(this)
  }
  componentDidMount() {
    // init option.
    this.props.handleOptionChange(this.state)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.setState({
        type: TYPE.LOW_PASS_FILTER,
      })
      this.props.handleOptionChange(this.state)
    }
  }
  handleTypeChange(event, val) {
    const type = val
    this.setState({ type })
    this.props.handleOptionChange({ type })
  }
  handleDChange(event, val) {
    this.setState({ d: val }, () => {
      this.props.handleOptionChange(this.state)
    })
  }
  render() {
    return (
      <div>
        <RadioButtonGroup
          name="shearDirection"
          defaultSelected={this.state.type}
          onChange={this.onTypeChange}
        >
          <RadioButton
            value={TYPE.LOW_PASS_FILTER}
            label="低通滤波"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.HIGH_PASS_FILTER}
            label="高通滤波"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.GAUSS_LOW_PASS_FILTER}
            label="高斯低通滤波"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.GAUSS_HIGH_PASS_FILTER}
            label="高斯高通滤波"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.GAUSS_FILTER}
            label="空间域高斯滤波"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.BUTTER_WORTH_LOW_PASS_FILTER}
            label="ButterWorth低通滤波器"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
        </RadioButtonGroup>
        <span>{`D0： ${this.state.d}`}</span>
        <Slider
          max={200}
          min={1}
          defaultValue={20}
          step={1}
          value={this.state.d}
          onChange={this.onDchange}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}
WaveFiltering.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
    /*eslint-disable*/
    image:      PropTypes.shape({
      width:  PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
    /*eslint-enable*/
}
export default WaveFiltering
