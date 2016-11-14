import React, { Component, PropTypes }   from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const TYPE = {
  GAUSS_NOISE:                  'GAUSS_NOISE',
  SALT_AND_PEPPER_NOISE:        'SALT_AND_PEPPER_NOISE',
  ARITHMETIC_MEAN_FILTER:       'ARITHMETIC_MEAN_FILTER',  // 算数均值
  GEOMETRIC_MEAN_FILTER:        'GEOMETRIC_MEAN_FILTER', // 几何均值
  HARMONISCHE_MEAN_FILTER:      'HARMONISCHE_MEAN_FILTER', // 谐波均值
  ANTI_HARMONISCHE_MEAN_FILTER: 'ANTI_HARMONISCHE_MEAN_FILTER', // 逆谐波均值
}
class Noise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:   TYPE.GAUSS_NOISE,
      target: 'ORIGIN',
      d:      20,
    }
    this.onTypeChange = this.handleTypeChange.bind(this)
  }
  componentDidMount() {
    // init option.
    this.props.handleOptionChange(this.state)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.setState({
        type: TYPE.GAUSS_NOISE,
      })
      this.props.handleOptionChange(this.state)
    }
  }
  handleTypeChange(event, val) {
    const type = val
    this.setState({ type })
    this.props.handleOptionChange({ type })
  }
  render() {
    return (
      <div>
        <RadioButtonGroup
          name="Noise"
          defaultSelected={this.state.type}
          onChange={this.onTypeChange}
        >
          <RadioButton
            value={TYPE.GAUSS_NOISE}
            label="高斯噪声"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.SALT_AND_PEPPER_NOISE}
            label="椒盐噪声"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.ARITHMETIC_MEAN_FILTER}
            label="算数均值滤波"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.GEOMETRIC_MEAN_FILTER}
            label="几何均值滤波"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.HARMONISCHE_MEAN_FILTER}
            label="谐波均值滤波"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.ANTI_HARMONISCHE_MEAN_FILTER}
            label="逆谐波均值滤波"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
        </RadioButtonGroup>
      </div>
    )
  }
}
Noise.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
    /*eslint-disable*/
    image:      PropTypes.shape({
      width:  PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
    /*eslint-enable*/
}
export default Noise
