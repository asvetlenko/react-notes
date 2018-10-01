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
  [combineActions(serverRecordingState, onRecordingStarting, onRecordingStarted, onRecordingPausing, onRecordingPaused, onSetErrorState)] (state, {payload}) {
    if (typeof payload.localRecordingStatus === 'undefined') {
      return state
    }

    return ![LocalRecordingStatus.stopped, LocalRecordingStatus.stopping].includes(payload.localRecordingStatus)
  },
  [combineActions(onRecordingStopping, onRecordingStopped)] (state, {payload}) {
    return false
  }
}, defaultValue)
