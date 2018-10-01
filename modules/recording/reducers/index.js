import { combineReducers } from 'redux'

import recordId from './recordId'
import serverName from './serverName'
import selectedUserId from './selectedUserId'
import errorMessage from './errorMessage'
import errorCode from './errorCode'
import serverRecordingStatus from './serverRecordingStatus'
import localRecordingStatus from './localRecordingStatus'
import isRecordingOn from './isRecordingOn'
import isRecordingActive from './isRecordingActive'
import startDate from './startDate'
import stopData from './stopData'

import elapsedTime from './elapsedTime'

export default combineReducers({
  recordId,
  serverName,
  selectedUserId,
  errorMessage,
  errorCode,
  serverRecordingStatus,
  localRecordingStatus,
  isRecordingOn,
  isRecordingActive,
  startDate,
  stopData,
  elapsedTime
})
