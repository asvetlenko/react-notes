import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Timer from '../components/Timer/index'
import {getTimeString} from '../services/helpers'

class TimerContainer extends Component {
  render () {
    const props = {
      isShowTimer: this.props.isRecordingActive,
      time: getTimeString(this.props.elapsedTime),
      isOnSmallScreen: !!this.props.isOnSmallScreen
    }

    return (
      <Timer {...props} />
    )
  }
}

function mapStateToProps ({recording}) {
  return {
    elapsedTime: recording.elapsedTime,
    isRecordingActive: recording.isRecordingActive
  }
}

TimerContainer.propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  isRecordingActive: PropTypes.bool.isRequired,
  isOnSmallScreen: PropTypes.bool
}

export default connect(mapStateToProps)(TimerContainer)
