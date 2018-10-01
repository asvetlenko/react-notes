import { handleActions } from 'redux-actions'

import {
  onRecordingStarting,
  onSetElapsedTime
} from '../actions'

const defaultValue = 0

export default handleActions({
  [onSetElapsedTime] (state, {payload}) {
    return payload
  },
  [onRecordingStarting] (state, {payload}) {
    return 0
  }
}, defaultValue)
