import { handleActions, combineActions } from 'redux-actions'

import {
  onSetLocalRecordingStatus,
  serverRecordingState,
  onRecordingStarting,
  onRecordingStarted,
  onRecordingStopping,
  onRecordingStopped,
  onRecordingPausing,
  onRecordingPaused,
  onSetErrorState
} from '../actions'
import { LocalRecordingStatus } from '../../../Enums'

const defaultValue = LocalRecordingStatus.stopped

export default handleActions({
  [onSetLocalRecordingStatus] (state, {payload}) {
    return payload
  },
  [combineActions(serverRecordingState, onRecordingStarting, onRecordingStarted, onRecordingStopping, onRecordingStopped, onRecordingPausing, onRecordingPaused, onSetErrorState)] (state, {payload}) {
    return typeof payload.localRecordingStatus !== 'undefined' ? payload.localRecordingStatus : state
  }
}, defaultValue)
