import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import ActionList                      from '../components/ActionList'

class ActionListContainer extends Component {
    componentDidMount() {
      // Do some init work
    }
    render() {
      const { dispatch, image, processing } = this.props
      return (<ActionList dispatch={dispatch} hasImage={image? true: false} processing={processing} image={image}/>)
    }
}
ActionListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
  image: state.image.originImage,
  processing: state.image.processing,
})
export default connect(mapStateToProps)(ActionListContainer)
