import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import Button from '../components/Button/index'
import * as recordingActions from '../actions'

import { LocalRecordingStatus } from '../../../Enums'

class PauseButtonContainer extends Component {
  handleButtonAction = () => {
    if (!this.isEnableButton()) {
      return
    }

    const {actions} = this.props
    actions.onRecordingPausing()
  }

  isEnableButton () {
    const {
      localRecordingStatus,
      isCallStarted
    } = this.props

    return localRecordingStatus === LocalRecordingStatus.started && isCallStarted
  }

  render () {
    const props = {
      isShowButton: [LocalRecordingStatus.starting, LocalRecordingStatus.started].includes(this.props.localRecordingStatus),
      isEnableButton: this.isEnableButton(),
      handleClickAction: this.handleButtonAction.bind(this)
    }

    return (
      <Button {...props} buttonType={'pause'} />
    )
  }
}

PauseButtonContainer.propTypes = {
  localRecordingStatus: PropTypes.string.isRequired,
  isCallStarted: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    onRecordingPausing: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(PauseButtonContainer)
