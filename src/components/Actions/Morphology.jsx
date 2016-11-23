import React, { Component, PropTypes }   from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const TYPE = {
  CONNECTED_COMPONENT: 'CONNECTED_COMPONENT', // 提取联通分量
  CONVEX_HULL:         'CONVEX_HULL', // 凸壳
  THINNING:            'THINNING',  // 细化
  ROUGHENING:          'ROUGHENING', // 粗化
  EXTRACT_SKELETON:    'EXTRACT_SKELETON', // 提取骨架
}
class Morphology extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:   TYPE.CONNECTED_COMPONENT,
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
        type: TYPE.CONNECTED_COMPONENT,
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
      <p>（仅支持二值图）</p>
        <RadioButtonGroup
          name="Morphology"
          defaultSelected={this.state.type}
          onChange={this.onTypeChange}
        >
          <RadioButton
            value={TYPE.CONNECTED_COMPONENT}
            label="提取联通分量"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.CONVEX_HULL}
            label="凸壳"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.THINNING}
            label="细化"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.ROUGHENING}
            label="粗化"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={TYPE.EXTRACT_SKELETON}
            label="提取骨架"
            disabled={this.props.disabled}
            style={{ marginBottom: 16 }}
          />
        </RadioButtonGroup>
      </div>
    )
  }
}
Morphology.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  disabled:           PropTypes.bool.isRequired,
    /*eslint-disable*/
    image:      PropTypes.shape({
      width:  PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
    /*eslint-enable*/
}
export default Morphology
