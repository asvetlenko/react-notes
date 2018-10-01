import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import RecordingProgressBar from '../components/RecordingProgressBar'

class RecordingProgressBarContainer extends Component {
  render () {
    const {
      largeVideoUser,
      recordingUserId,
      isRecordingActive
    } = this.props

    const isShowComponent = isRecordingActive && largeVideoUser !== null && largeVideoUser.id === recordingUserId
    return isShowComponent ? <RecordingProgressBar /> : null
  }
}

RecordingProgressBarContainer.propTypes = {
  largeVideoUser: PropTypes.object,
  recordingUserId: PropTypes.string.isRequired,
  isRecordingActive: PropTypes.bool.isRequired
}

function mapStateToProps ({presentation, users, recording}) {
  return {
    largeVideoUser: presentation.tracks.largeVideoUser,
    recordingUserId: recording.selectedUserId,
    isRecordingActive: recording.isRecordingActive
  }
}

export default connect(mapStateToProps)(RecordingProgressBarContainer)
