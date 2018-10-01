import { handleActions, combineActions } from 'redux-actions'

import {
  onSetRecordingStartData,
  serverRecordingState,
  onRecordingStarting,
  onRecordingStarted
} from '../actions'

const defaultValue = 0

export default handleActions({
  [onSetRecordingStartData] (state, {payload}) {
    return payload
  },
  [combineActions(serverRecordingState, onRecordingStarted)] (state, {payload: {startDate}}) {
    return typeof startDate !== 'undefined' ? startDate : state
  },
  [onRecordingStarting] (state, {payload}) {
    return 0
  }
}, defaultValue)
