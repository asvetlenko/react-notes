import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import Button from '../components/Button/index'
import * as recordingActions from '../actions'
import { LocalRecordingStatus } from '../../../Enums'

class StartButtonContainer extends Component {
  handleButtonAction = () => {
    if (!this.isEnableButton()) {
      return
    }

    const {
      actions,
      recordingModel,
      localRecordingStatus,
      largeVideoUser
    } = this.props

    if (localRecordingStatus === LocalRecordingStatus.stopped && largeVideoUser !== null && largeVideoUser.id) {
      actions.onRecordingStarting(largeVideoUser.id)
      return
    }

    if (localRecordingStatus === LocalRecordingStatus.paused) {
      actions.recordingContinueRequest(recordingModel)
    }
  }

  isEnableButton () {
    const {
      localRecordingStatus,
      isCallStarted
    } = this.props

    return [LocalRecordingStatus.paused, LocalRecordingStatus.stopped].includes(localRecordingStatus) && isCallStarted
  }

  render () {
    const props = {
      isShowButton: ![LocalRecordingStatus.started, LocalRecordingStatus.starting].includes(this.props.localRecordingStatus),
      isEnableButton: this.isEnableButton(),
      handleClickAction: this.handleButtonAction.bind(this)
    }

    return (
      <Button {...props} buttonType={'start'} />
    )
  }
}

StartButtonContainer.propTypes = {
  localRecordingStatus: PropTypes.string.isRequired,
  largeVideoUser: PropTypes.object,
  currentUserId: PropTypes.string,
  isCallStarted: PropTypes.bool.isRequired,
  onlineUsers: PropTypes.array.isRequired,
  recordingModel: PropTypes.shape({
    contentId: PropTypes.string.isRequired,
    serverName: PropTypes.string,
    recordId: PropTypes.number,
    selectedUserId: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    recordingContinueRequest: PropTypes.func.isRequired,
    onRecordingStarting: PropTypes.func.isRequired
  }).isRequired
}

function mapStateToProps ({recording, presentation, users, contentState}) {
  return {
    localRecordingStatus: recording.localRecordingStatus,
    currentUserId: users.currentUserId,
    largeVideoUser: presentation.tracks.largeVideoUser,
    isCallStarted: presentation.connection.isCallStarted,
    onlineUsers: users.users.filter(item => item.isOnline),
    recordingModel: {
      contentId: contentState.contentId,
      serverName: recording.serverName,
      recordId: recording.recordId,
      selectedUserId: recording.selectedUserId
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(recordingActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(StartButtonContainer)
