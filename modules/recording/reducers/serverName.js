import { handleActions, combineActions } from 'redux-actions'

import {
  onSetServerRecordingName,
  serverRecordingState,
  onRecordingStarted,
  onRecordingStopped,
  onRecordingPaused
} from '../actions'
// import { LocalRecordingStatus, ServerRecordingStatus } from '../../../Enums'

const defaultValue = ''

export default handleActions({
  [onSetServerRecordingName] (state, {payload}) {
    return payload
  },
  [combineActions(serverRecordingState, onRecordingStarted, onRecordingPaused)] (state, {payload}) {
    return typeof payload.serverName !== 'undefined' ? payload.serverName : state
  },
  [combineActions(onRecordingStopped)] (state, {payload}) {
    return ''
  }
}, defaultValue)
