import {delay} from 'redux-saga'
import {put, takeLatest, select} from 'redux-saga/effects'

import * as recordingActions from '../actions'
import * as notificationActions from '../../notification/actions'
import * as dataConverter from '../../../services/dataConverter'
import {LocalRecordingStatus, ServerRecordingStatus, RecordingErrorCode} from '../../../Enums'
import {emitStopRecordingEvent} from '../services/eventEmitter'
import selector from '../../shared/utils/selector'

const STOP_TIMEOUT = 1500
const CHECK_STATUS_TIMEOUT = 30000
const START_TIMEOUT = 10000

function * onRecordingStarting ({payload}) {
  const {contentId} = yield select(state => state.contentState)
  const {serverName, recordId} = yield select(state => state.recording)
  const recordingModel = {
    contentId: contentId,
    serverName: serverName,
    recordId: recordId,
    selectedUserId: payload.selectedUserId
  }
  yield put(recordingActions.recordingPrepareRequest(recordingModel))
  yield put(notificationActions.onAddInfoNotification({uid: 'RecordingPreparing', autoDismiss: 0, message: 'Recording is preparing.'}))
}

function * onRecordingPausing ({payload}) {
  const {contentId} = yield select(state => state.contentState)
  const {serverName, recordId, selectedUserId} = yield select(state => state.recording)
  const recordingModel = {
    contentId: contentId,
    serverName: serverName,
    recordId: recordId,
    selectedUserId: selectedUserId
  }
  yield put(recordingActions.recordingPauseRequest(recordingModel))
}

function * onRecordingStopping ({payload}) {
  yield delay(STOP_TIMEOUT)
  const {contentId} = yield select(state => state.contentState)
  const {serverName, recordId, selectedUserId} = yield select(state => state.recording)
  const recordingModel = {
    contentId: contentId,
    serverName: serverName,
    recordId: recordId,
    selectedUserId: selectedUserId
  }
  yield put(recordingActions.recordingStopRequest(recordingModel))
  yield put(notificationActions.onAddInfoNotification({message: 'Recording is off.'}))
}

function * onStopRecordingForUser ({payload}) {
  const {selectedUserId, isRecordingOn} = yield select(state => state.recording)
  if (isRecordingOn && selectedUserId === payload) {
    yield put(recordingActions.onRecordingStopping())
  }
}

function * recordingPrepareSuccess ({response}) {
  const convertedData = dataConverter.convertRecordingStatusObject(response.data)
  if (convertedData.serverRecordingStatus === ServerRecordingStatus.error) {
    yield put(recordingActions.onSetErrorState(convertedData))
  } else {
    yield put(recordingActions.serverRecordingState(convertedData))
    yield put(recordingActions.checkRecordingStatus())
  }
}

function * recordingStartSuccess ({response}) {
  const convertedData = dataConverter.convertRecordingStatusObject(response.data)
  if (convertedData.serverRecordingStatus === ServerRecordingStatus.error) {
    yield put(recordingActions.onSetErrorState(convertedData))
  } else {
    yield put(recordingActions.onRecordingStarted(convertedData))
    yield put(recordingActions.checkRecordingStatus())
    yield put(notificationActions.onDismissNotification('RecordingPreparing'))
    yield put(notificationActions.onAddInfoNotification({message: 'Recording has started.'}))
  }
}

function * recordingPauseSuccess ({payload, response}) {
  const convertedData = dataConverter.convertRecordingStatusObject(response.data)
  if (convertedData.serverRecordingStatus === ServerRecordingStatus.error) {
    yield put(recordingActions.onSetErrorState(convertedData))
  } else {
    yield put(recordingActions.onRecordingPaused(convertedData))
    yield put(recordingActions.checkRecordingStatus())
  }
}

function * recordingContinueSuccess ({payload, response}) {
  const convertedData = dataConverter.convertRecordingStatusObject(response.data)
  if (convertedData.serverRecordingStatus === ServerRecordingStatus.error) {
    yield put(recordingActions.onSetErrorState(convertedData))
  } else {
    yield put(recordingActions.onRecordingStarted(convertedData))
    yield put(recordingActions.checkRecordingStatus())
  }
}

function * recordingStopSuccess ({payload, response}) {
  emitStopRecordingEvent(response.data)
  const convertedData = dataConverter.convertRecordingStatusObject(response.data)
  if (convertedData.serverRecordingStatus === ServerRecordingStatus.error) {
    yield put(recordingActions.onSetErrorState(convertedData))
  } else {
    yield put(recordingActions.onRecordingStopped(convertedData))
  }
}

function * recordingStatusSuccess ({payload, response}) {
  const convertedData = dataConverter.convertRecordingStatusObject(response.data)
  if (convertedData.serverRecordingStatus === ServerRecordingStatus.error) {
    yield put(recordingActions.onSetErrorState(convertedData))
  } else {
    yield put(recordingActions.serverRecordingState(convertedData))
    yield put(recordingActions.checkRecordingStatus())
  }
}

function * updateState ({payload}) {
  const convertedData = dataConverter.convertRecordingStatusObject(payload)
  let localRecordingStatus = LocalRecordingStatus.stopped
  switch (convertedData.serverRecordingStatus) {
    case ServerRecordingStatus.pending:
      localRecordingStatus = LocalRecordingStatus.starting
      break
    case ServerRecordingStatus.processing:
      localRecordingStatus = LocalRecordingStatus.started
      yield put(recordingActions.onRecordingStarted(convertedData))
      break
    case ServerRecordingStatus.pause:
      localRecordingStatus = LocalRecordingStatus.paused
      break
    case ServerRecordingStatus.ready:
    case ServerRecordingStatus.error:
      localRecordingStatus = LocalRecordingStatus.stopped
      break
  }

  yield put(recordingActions.serverRecordingState({...convertedData, localRecordingStatus}))
  yield put(recordingActions.checkRecordingStatus())
}

function * checkRecordingStatus () {
  const getCheckRecordingStatus = (localRecordingStatus) =>
    [LocalRecordingStatus.stopped, LocalRecordingStatus.stopping, LocalRecordingStatus.starting,
      LocalRecordingStatus.pausing].includes(localRecordingStatus)

  const recordingState = yield select(state => state.recording)
  if (getCheckRecordingStatus(recordingState.localRecordingStatus)) {
    return
  }

  const delayTimeout = recordingState.serverRecordingStatus === ServerRecordingStatus.pending ? START_TIMEOUT : CHECK_STATUS_TIMEOUT
  yield delay(delayTimeout)

  const {isCallStarted} = yield select(selector.getConnectionState)
  if (!isCallStarted) {
    return
  }

  const {
    serverName,
    recordId,
    selectedUserId,
    localRecordingStatus
  } = yield select(state => state.recording)

  if (getCheckRecordingStatus(localRecordingStatus)) {
    return
  }

  const {contentId} = yield select(state => state.contentState)
  const recordingModel = {
    contentId,
    serverName,
    recordId,
    selectedUserId
  }
  yield put(recordingActions.recordingStatusRequest(recordingModel))
}

function * onRecordingVideoAttached ({payload}) {
  const {
    serverName,
    recordId,
    selectedUserId,
    serverRecordingStatus,
    localRecordingStatus
  } = yield select(state => state.recording)

  if (serverRecordingStatus !== ServerRecordingStatus.pending ||
    [LocalRecordingStatus.stopping, LocalRecordingStatus.stopped].includes(localRecordingStatus)) {
    return
  }

  const users = yield select(state => state.users)
  const {contentId} = yield select(state => state.contentState)
  const recordingModel = {
    contentId,
    serverName,
    recordId,
    selectedUserId
  }

  if (users.users.some(user => user.isOnline && user.id === selectedUserId)) {
    console.info('EMIT "StartRecording" by JITSI Response')
    yield put(recordingActions.recordingStartRequest(recordingModel))
  } else {
    yield put(recordingActions.recordingStopRequest(recordingModel))
  }
}

function * startRecordingTimer ({payload}) {
  let localRecordingStatus = payload.localRecordingStatus
  while (localRecordingStatus === LocalRecordingStatus.started) {
    const recording = yield select(state => state.recording)
    const time = Math.max(Date.now() - recording.startDate, 0)
    yield put(recordingActions.onSetElapsedTime(time))
    yield delay(1000)
    localRecordingStatus = recording.localRecordingStatus
  }
}

function * onErrorHandler (actionObj) {
  const {message} = actionObj
  const errorModel = {
    errorCode: RecordingErrorCode.errorIsUndefined,
    errorMessage: message,
    serverRecordingStatus: ServerRecordingStatus.error
  }
  yield put(recordingActions.onSetErrorState(errorModel))
}

function * onSetErrorState ({payload}) {
  const {
    errorCode
  } = yield select(state => state.recording)

  let message = ''
  switch (errorCode) {
    case RecordingErrorCode.moreThan90Min:
      message = 'Recording was off because time limit has been reached.'
      break
    case RecordingErrorCode.sessionWasNotStarted:
      message = 'Recording was off because selected user left session.'
      break
    case RecordingErrorCode.sessionIsAlreadyRecording:
      message = 'Recording is processing for this session now, please try again in a few minutes.'
      break
    case RecordingErrorCode.recordingPageWasCrashed:
      message = 'Unfortunately, recording has stopped with an error. Please try starting recording again.'
      break
    default:
      message = 'Recording was stopped with error.'
      break
  }
  yield put(notificationActions.onDismissNotification('RecordingPreparing'))
  yield put(notificationActions.onAddErrorNotification({message: message, autoDismiss: 10}))
}

function * recordingSaga () {
  yield [
    takeLatest(recordingActions.onRecordingStarting, onRecordingStarting),
    takeLatest(recordingActions.recordingPrepareSuccess, recordingPrepareSuccess),
    takeLatest(recordingActions.recordingStartSuccess, recordingStartSuccess),
    takeLatest(recordingActions.onRecordingPausing, onRecordingPausing),
    takeLatest(recordingActions.recordingPauseSuccess, recordingPauseSuccess),
    takeLatest(recordingActions.recordingContinueSuccess, recordingContinueSuccess),
    takeLatest(recordingActions.onStopRecordingForUser, onStopRecordingForUser),
    takeLatest(recordingActions.onRecordingStopping, onRecordingStopping),
    takeLatest(recordingActions.recordingStopSuccess, recordingStopSuccess),
    takeLatest(recordingActions.recordingStatusSuccess, recordingStatusSuccess),
    takeLatest(recordingActions.checkRecordingStatus, checkRecordingStatus),
    takeLatest(recordingActions.updateState, updateState),
    takeLatest(recordingActions.onRecordingVideoAttached, onRecordingVideoAttached),
    takeLatest(recordingActions.onRecordingStarted, startRecordingTimer),
    takeLatest(recordingActions.onSetErrorState, onSetErrorState),

    takeLatest([
      recordingActions.recordingPrepareFailed,
      recordingActions.recordingStartFailed,
      recordingActions.recordingPauseFailed,
      recordingActions.recordingContinueFailed,
      recordingActions.recordingStopFailed,
      recordingActions.recordingStatusFailed
    ], onErrorHandler)
  ]
}

export default recordingSaga
