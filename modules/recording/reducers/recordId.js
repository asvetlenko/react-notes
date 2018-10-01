import { handleActions, combineActions } from 'redux-actions'

import {
  onSetRecordId,
  serverRecordingState,
  onRecordingStarted,
  onRecordingStopped,
  onRecordingPaused
} from '../actions'

// import { LocalRecordingStatus, ServerRecordingStatus } from '../../../Enums'

const defaultValue = 0

export default handleActions({
  [onSetRecordId] (state, {payload}) {
    return payload
  },
  [combineActions(serverRecordingState, onRecordingStarted, onRecordingPaused)] (state, {payload}) {
    return typeof payload.recordId !== 'undefined' ? payload.recordId : state
  },
  [combineActions(onRecordingStopped)] (state, {payload}) {
    return 0
  }
}, defaultValue)
