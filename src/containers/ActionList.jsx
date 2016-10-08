import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import ActionList                      from '../components/ActionList'

class ActionListContainer extends Component {
  componentDidMount() {
    // Do some init work
  }
  render() {
    const { dispatch, image, processing } = this.props
    return (
      <ActionList
        dispatch={dispatch}
        hasImage={image !== null}
        processing={processing}
        image={image}
      />)
  }
}
ActionListContainer.propTypes = {
  dispatch:   PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
  /*eslint-disable*/
  image: PropTypes.shape({
    width:        PropTypes.number.isRequired,
    height:       PropTypes.number.isRequired,
  }),
/*eslint-disable*/
}
const mapStateToProps = state => ({
  image:      state.image.originImage,
  processing: state.image.processing,
})
export default connect(mapStateToProps)(ActionListContainer)
