import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Recording from '../components/Recording/index'

class RecordingContainer extends Component {
  render () {
    const {
      largeVideoUser,
      presenterId,
      currentUserId
    } = this.props

    const isAvailableRecording = presenterId === currentUserId

    const componentProps = {
      styles: this.props.styles
    }

    if (largeVideoUser && isAvailableRecording) {
      return (
        <Recording {...componentProps} />
      )
    }

    return null
  }
}

function mapStateToProps ({contentState, presentation, users}, ownProps) {
  return {
    largeVideoUser: presentation.tracks.largeVideoUser !== null,
    presenterId: contentState.presenterId,
    currentUserId: users.currentUserId,
    styles: ownProps.styles
  }
}

RecordingContainer.propTypes = {
  largeVideoUser: PropTypes.bool.isRequired,
  presenterId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string,
  styles: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(RecordingContainer)
