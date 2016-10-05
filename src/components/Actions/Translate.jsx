import React, { Component, PropTypes }   from 'react'
import Slider                            from 'material-ui/Slider';


class Translate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xOffset: 0,
      yOffset: 0,
      target: 'ORIGIN',
    }
    this.width = props.image.width
    this.height = props.image.height
  }
  componentDidMount() {
    // init option.
    this.props.handleOptionChange(this.state)
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
    return (
      <div>
        <span>{`x轴偏移：${this.state.xOffset}px`}</span>
        <Slider
        defaultValue={0}
        min={0}
        max={this.width}
        step={1}
        value={this.state.xOffset}
        onChange={this.handleXOffsetChange.bind(this)}
        disabled={this.props.disabled}/>
        <span>{`y轴偏移：${this.state.yOffset}px`}</span>
        <Slider
        defaultValue={0}
        min={0}
        max={this.height}
        step={1}
        value={this.state.yOffset}
        onChange={this.handleYOffsetChange.bind(this)}
        disabled={this.props.disabled}/>
      </div>

    )
  }
}
Translate.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
}
export default Translate
