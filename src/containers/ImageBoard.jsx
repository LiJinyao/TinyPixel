import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import ImageBoard                      from '../components/ImageBoard'

class ImageBoard extends Component {
  render() {
    const { image } = this.props
    return (<ImageBoard/>)
  }
}
const mapStateToProps = state => ({
  image:
})
export default connect(mapStateToProps)(ImageBoard)
