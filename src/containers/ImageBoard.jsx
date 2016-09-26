import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import Board                      from '../components/ImageBoard'

class ImageBoard extends Component {
  render() {
    console.log("render originImage.");
    const { image } = this.props
    if (image) {
      return (<Board image={image}/>)
    }
    return (<h1>Please open an image.</h1>)
  }
}
const mapStateToProps = state => ({
  image: state.originImage.image,
})
export default connect(mapStateToProps)(ImageBoard)
