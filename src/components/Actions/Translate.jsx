import React, { Component, PropTypes }   from 'react'
import Slider                            from 'material-ui/Slider'

class Translate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xOffset: 0,
      yOffset: 0,
      target:  'ORIGIN',
    }
    this.onXOffsetChange = this.handleXOffsetChange.bind(this)
    this.onYOffsetChange = this.handleYOffsetChange.bind(this)
  }
  componentDidMount() {
    // init option.
    this.props.handleOptionChange(this.state)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.setState({
        xOffset: 0,
        yOffset: 0,
      })
      this.props.handleOptionChange(this.state)
    }
  }
  handleXOffsetChange(event, val) {
    const xOffset = Math.round(val)
    this.setState({ xOffset })
    this.props.handleOptionChange({ xOffset })
  }
  handleYOffsetChange(event, val) {
    const yOffset = Math.round(val)
    this.setState({ yOffset })
    this.props.handleOptionChange({ yOffset })
  }

  render() {
    const { width, height } = this.props.image
    return (
      <div>
        <span>{`x轴偏移：${this.state.xOffset}px`}</span>
        <Slider
          defaultValue={0}
          min={-width}
          max={width}
          step={1}
          value={this.state.xOffset}
          onChange={this.onXOffsetChange}
          disabled={this.props.disabled}
        />
        <span>{`y轴偏移：${this.state.yOffset}px`}</span>
        <Slider
          defaultValue={0}
          min={-height}
          max={height}
          step={1}
          value={this.state.yOffset}
          onChange={this.onYOffsetChange}
          disabled={this.props.disabled}
        />
      </div>

    )
  }
}
Translate.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
  image:              PropTypes.shape({
    width:  PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
}
export default Translate
