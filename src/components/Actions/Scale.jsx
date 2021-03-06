import Slider                            from 'material-ui/Slider'
import React, { Component, PropTypes }   from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { INTERPOLATION }                 from '../../actions/imageProcess/scale'


const typeName = new Map([
  [INTERPOLATION.NONE, '不插值'],
  [INTERPOLATION.NEAREST_NEIGHBOR, '最临近插值'],
  [INTERPOLATION.BILINEAR, '双线性插值'],
  [INTERPOLATION.BICUBIC, '双三次插值'],
])

class Scale extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:   INTERPOLATION.NEAREST_NEIGHBOR,
      ratio:  1,
      target: 'ORIGIN',
    }
    this.onTypeChange = this.handleTypeChange.bind(this)
    this.onRatioChange = this.handleRatioChange.bind(this)
  }
  componentDidMount() {
    // init option.
    this.props.handleOptionChange(this.state)
  }
  handleTypeChange(event, val) {
    this.setState({ type: val }, () => {
      this.props.handleOptionChange(this.state)
    })
  }
  handleRatioChange(event, val) {
    this.setState({ ratio: val }, () => {
      this.props.handleOptionChange(this.state)
    })
  }
  render() {
    const radios = Object.keys(INTERPOLATION).map((type, i) => (
      <RadioButton
        key={i}
        value={type}
        label={typeName.get(type)}
        disabled={this.props.disabled}
        style={{ marginBottom: 16 }}
      />))

    return (
      <div>
        <RadioButtonGroup
          name="shipSpeed"
          defaultSelected={this.state.type}
          onChange={this.onTypeChange}
        >
          {radios}
        </RadioButtonGroup>
        <span>{`缩放倍数：${this.state.ratio.toFixed(2)}`}</span>
        <Slider
          max={3}
          min={0}
          defaultValue={0.5}
          onChange={this.onRatioChange}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}
Scale.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
}
export default Scale
