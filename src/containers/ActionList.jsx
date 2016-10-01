import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import ActionList                      from '../components/ActionList'

class ActionListContainer extends Component {
    componentDidMount() {
      // Do some init work
    }
    render() {
      const { dispatch, image } = this.props
      return (<ActionList dispatch={dispatch} hasImage={image? true: false}/>)
    }
}
ActionListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  image: state.image.originImage,
})
export default connect(mapStateToProps)(ActionListContainer)
