import React, { Component, PropTypes }   from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { supportTypes }                  from '../../actions/imageProcess/grayscale'
const typeName = new Map([
  [supportTypes.AVERAGE, '平均值'],
  [supportTypes.WEIGHTED_AVERAGE, '加权平均值'],
  [supportTypes.MAX, '最大值'],
  [supportTypes.MIN, '最小值'],
])

class GrayScale extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: supportTypes.AVERAGE,
    }
  }
  handleTypeChange(event, val) {
    this.setState({ type: val })
    this.props.handleOptionChange({type: val})
  }

  render() {
    const radios = Object.keys(supportTypes).map((type, i) => (<RadioButton
      key={i}
      value={type}
      label={typeName.get(type)}
      disabled={this.props.disabled}
      style={{marginBottom: 16}}
      />))
    return (
      <RadioButtonGroup
      style={{marginTop: 16}}
      name="shipSpeed"
      defaultSelected={this.state.type}
      onChange={this.handleTypeChange.bind(this)}>
        {radios}
      </RadioButtonGroup>
    )
  }
}
GrayScale.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
}
export default GrayScale
