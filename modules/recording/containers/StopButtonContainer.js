import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import Button from '../components/Button/index'
import * as recordingActions from '../actions'
import { LocalRecordingStatus } from '../../../Enums'

class StopButtonContainer extends Component {
  handleButtonAction = () => {
    if (!this.isEnableButton()) {
      return
    }

    const {actions} = this.props
    actions.onRecordingStopping()
  }

  isEnableButton = () => {
    const {
      localRecordingStatus,
      isCallStarted
    } = this.props

    return [LocalRecordingStatus.started, LocalRecordingStatus.paused].includes(localRecordingStatus) && isCallStarted
  }

  render () {
    const props = {
      isShowButton: ![LocalRecordingStatus.stopping, LocalRecordingStatus.stopped].includes(this.props.localRecordingStatus),
      isEnableButton: this.isEnableButton(),
      handleClickAction: this.handleButtonAction.bind(this)
    }
    return (
      <Button {...props} buttonType={'stop'} />
    )
  }
}

StopButtonContainer.propTypes = {
  localRecordingStatus: PropTypes.string.isRequired,
  isCallStarted: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    onRecordingStopping: PropTypes.func.isRequired
  }).isRequired
}

function mapStateToProps ({recording, presentation, users, contentState}) {
  return {
    localRecordingStatus: recording.localRecordingStatus,
    isCallStarted: presentation.connection.isCallStarted
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(recordingActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(StopButtonContainer)
