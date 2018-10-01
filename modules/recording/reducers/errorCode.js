import { handleActions, combineActions } from 'redux-actions'

import {
  onSetServerRecordingErrorCode,
  serverRecordingState,
  onRecordingStarted,
  onRecordingStopped,
  onRecordingPaused,
  onSetErrorState
} from '../actions'
import { RecordingErrorCode } from '../../../Enums'

const defaultValue = RecordingErrorCode.none

export default handleActions({
  [onSetServerRecordingErrorCode] (state, {payload}) {
    return payload
  },
  [combineActions(serverRecordingState, onRecordingStarted, onRecordingStopped, onRecordingPaused, onSetErrorState)] (state, {payload}) {
    return typeof payload.errorCode !== 'undefined' ? payload.errorCode : state
  }
}, defaultValue)
