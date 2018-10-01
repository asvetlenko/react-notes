import { createAction } from 'redux-actions'

import { LocalRecordingStatus } from '../../../Enums'

export const recordingPrepareRequest = createAction('RECORDING_PREPARE_REQUEST')
export const recordingPrepareSuccess = createAction('RECORDING_PREPARE_SUCCESS')
export const recordingPrepareFailed = createAction('RECORDING_PREPARE_FAILED')

export const recordingStartRequest = createAction('RECORDING_START_REQUEST')
export const recordingStartSuccess = createAction('RECORDING_START_SUCCESS')
export const recordingStartFailed = createAction('RECORDING_START_FAILED')

export const recordingPauseRequest = createAction('RECORDING_PAUSE_REQUEST')
export const recordingPauseSuccess = createAction('RECORDING_PAUSE_SUCCESS')
export const recordingPauseFailed = createAction('RECORDING_PAUSE_FAILED')

export const recordingContinueRequest = createAction('RECORDING_CONTINUE_REQUEST')
export const recordingContinueSuccess = createAction('RECORDING_CONTINUE_SUCCESS')
export const recordingContinueFailed = createAction('RECORDING_CONTINUE_FAILED')

export const recordingStopRequest = createAction('RECORDING_STOP_REQUEST')
export const recordingStopSuccess = createAction('RECORDING_STOP_SUCCESS')
export const recordingStopFailed = createAction('RECORDING_STOP_FAILED')

export const recordingStatusRequest = createAction('RECORDING_STATUS_REQUEST')
export const recordingStatusSuccess = createAction('RECORDING_STATUS_SUCCESS')
export const recordingStatusFailed = createAction('RECORDING_STATUS_FAILED')
export const checkRecordingStatus = createAction('CHECK_RECORDING_STATUS')
export const serverRecordingState = createAction('SERVER_RECORDING_STATE')
export const updateState = createAction('UPDATE_STATE')

export const onRecordingVideoAttached = createAction('ON_RECORDING_VIDEO_ATTACHED')

export const onRecordingStarting = createAction('ON_RECORDING_STARTING',
  (selectedUserId) => {
    return {
      selectedUserId: selectedUserId,
      localRecordingStatus: LocalRecordingStatus.starting
    }
  })

export const onRecordingStarted = createAction('ON_RECORDING_STARTED',
  (paramsObj) => {
    return {...paramsObj, localRecordingStatus: LocalRecordingStatus.started}
  })

export const onRecordingStopping = createAction('ON_RECORDING_STOPPING',
  () => {
    return {
      localRecordingStatus: LocalRecordingStatus.stopping
    }
  })

export const onRecordingStopped = createAction('ON_RECORDING_STOPPED',
  (paramsObj) => {
    return {...paramsObj, localRecordingStatus: LocalRecordingStatus.stopped}
  })

export const onRecordingPausing = createAction('ON_RECORDING_PAUSING',
  () => {
    return {
      localRecordingStatus: LocalRecordingStatus.pausing
    }
  })

export const onRecordingPaused = createAction('ON_RECORDING_PAUSED',
  (paramsObj) => {
    return {...paramsObj, localRecordingStatus: LocalRecordingStatus.paused}
  })

export const lockActivity = createAction('LOCK_ACTIVITY',
    (activityId, lock) => {
        return {activityId, lock}
    })

export const onSetSelectedUserId = createAction('SET_SELECTED_USER_ID')
export const onSetRecordId = createAction('SET_RECORD_ID')
export const onSetLocalRecordingStatus = createAction('SET_LOCAL_RECORDING_STATUS')
export const onSetServerRecordingStatus = createAction('SET_SERVER_RECORDING_STATUS')
export const onSetServerRecordingName = createAction('SET_SERVER_RECORDING_NAME')
export const onSetServerRecordingErrorMessage = createAction('SET_SERVER_RECORDING_ERROR_MESSAGE')
export const onSetServerRecordingErrorCode = createAction('SET_SERVER_RECORDING_ERROR_CODE')
export const onSetRecordingStartData = createAction('SET_RECORDING_START_DATA')
export const onSetRecordingStopData = createAction('SET_RECORDING_STOP_DATA')
export const onStopRecordingForUser = createAction('STOP_RECORDING_FOR_USER')
export const onSetElapsedTime = createAction('SET_ELAPSED_TIME')
export const onSetErrorState = createAction('SET_ERROR_STATE',
  (paramsObj) => {
    return {...paramsObj, localRecordingStatus: LocalRecordingStatus.stopped}
  })
