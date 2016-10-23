import React, { Component, PropTypes }   from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const TYPE = {
  ROBERTS:  'ROBERTS',
  PREWITT:  'PREWITT',
  SOBEL:    'SOBEL',
  LAPACIAN: 'LAPACIAN',
  CANNY:    'CANNY',
}
class Sharpen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:   TYPE.ROBERTS,
      target: 'ORIGIN',
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
        type: TYPE.ROBERTS,
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
          name="shearDirection"
          defaultSelected={this.state.type}
          onChange={this.onTypeChange}
        >
          <RadioButton
            value={TYPE.ROBERTS}
            label="Roberts"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.PREWITT}
            label="Prewitt"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.SOBEL}
            label="Sobel"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.LAPACIAN}
            label="Lapacian"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.CANNY}
            label="Canny(未完成)"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
        </RadioButtonGroup>
      </div>
    )
  }
}
Sharpen.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
    /*eslint-disable*/
    image:      PropTypes.shape({
      width:  PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
    /*eslint-enable*/
}
export default Sharpen
