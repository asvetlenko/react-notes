import { handleActions, combineActions } from 'redux-actions'

import {
  onSetRecordingStopData,
  serverRecordingState,
  onRecordingStarting,
  onRecordingStarted,
  onRecordingStopped,
  onRecordingPaused,
  onSetErrorState
} from '../actions'

const defaultValue = 0

export default handleActions({
  [onSetRecordingStopData] (state, {payload}) {
    return payload
  },
  [combineActions(serverRecordingState, onRecordingPaused, onRecordingStopped, onSetErrorState)] (state, {payload}) {
    return typeof payload.stopDate !== 'undefined' ? payload.stopDate : state
  },
  [combineActions(onRecordingStarting, onRecordingStarted)] (state, {payload}) {
    return 0
  }
}, defaultValue)
