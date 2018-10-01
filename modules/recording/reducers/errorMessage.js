import { handleActions, combineActions } from 'redux-actions'

import {
  onSetServerRecordingErrorMessage,
  serverRecordingState,
  onRecordingStarted,
  onRecordingStopped,
  onRecordingPaused,
  onSetErrorState
} from '../actions'

const defaultValue = ''

export default handleActions({
  [onSetServerRecordingErrorMessage] (state, {payload}) {
    return payload
  },
  [combineActions(serverRecordingState, onRecordingStarted, onRecordingStopped, onRecordingPaused, onSetErrorState)] (state, {payload}) {
    return typeof payload.errorMessage !== 'undefined' ? payload.errorMessage : state
  }
}, defaultValue)
