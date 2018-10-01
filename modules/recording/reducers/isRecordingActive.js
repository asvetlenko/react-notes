import { handleActions, combineActions } from 'redux-actions'

import {
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

const defaultValue = false

export default handleActions({
  [combineActions(serverRecordingState, onRecordingStarted, onRecordingPausing, onSetErrorState)] (state, {payload}) {
    if (typeof payload.localRecordingStatus === 'undefined') {
      return state
    }

    return [LocalRecordingStatus.started, LocalRecordingStatus.pausing].includes(payload.localRecordingStatus)
  },
  [combineActions(onRecordingStopping, onRecordingStopped, onRecordingPaused, onRecordingStarting)] (state, {payload}) {
    return false
  }
}, defaultValue)
