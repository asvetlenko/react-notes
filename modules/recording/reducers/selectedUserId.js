import { handleActions, combineActions } from 'redux-actions'

import {
  onSetSelectedUserId,
  serverRecordingState,
  onRecordingStarting,
  onRecordingStopped,
  onRecordingPaused
} from '../actions'
// import { LocalRecordingStatus, ServerRecordingStatus } from '../../../Enums'

const defaultValue = ''

export default handleActions({
  [onSetSelectedUserId] (state, {payload}) {
    return payload
  },
  [combineActions(serverRecordingState, onRecordingStarting, onRecordingPaused)] (state, {payload}) {
    return typeof payload.selectedUserId !== 'undefined' ? payload.selectedUserId : state
  },
  [combineActions(onRecordingStopped)] (state, {payload}) {
    return ''
  }
}, defaultValue)
