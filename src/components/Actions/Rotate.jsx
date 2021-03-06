import React, { Component, PropTypes }   from 'react'
import Slider                            from 'material-ui/Slider'


class Rotate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      angle:  0,
      target: 'ORIGIN',
    }
    this.onAngleChange = this.handleAngleChange.bind(this)
  }
  componentDidMount() {
    // init option.
    this.props.handleOptionChange(this.state)
  }
  handleAngleChange(event, val) {
    const angle = Math.floor(val * 360)
    this.setState({ angle })
    this.props.handleOptionChange({ angle })
  }

  render() {
    return (
      <div>
        <span>{`旋转角度：${this.state.angle}`}</span>
        <Slider
          defaultValue={0}
          onChange={this.onAngleChange}
          disabled={this.props.disabled}
        />
      </div>

    )
  }
}
Rotate.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
}
export default Rotate
