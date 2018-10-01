import { handleActions, combineActions } from 'redux-actions'

import {
  onSetServerRecordingStatus,
  serverRecordingState,
  onRecordingStarted,
  onRecordingStopped,
  onRecordingPaused,
  onSetErrorState
} from '../actions'
import { ServerRecordingStatus } from '../../../Enums'

const defaultValue = ServerRecordingStatus.none

export default handleActions({
  [onSetServerRecordingStatus] (state, {payload}) {
    return payload
  },
  [combineActions(serverRecordingState, onRecordingStarted, onRecordingStopped, onRecordingPaused, onSetErrorState)] (state, {payload}) {
    return typeof payload.serverRecordingStatus !== 'undefined' ? payload.serverRecordingStatus : state
  }
}, defaultValue)
