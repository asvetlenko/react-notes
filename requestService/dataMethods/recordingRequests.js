const recordingRequests = {
  recordingPrepareRequest: (data) => _recordingRequest('prepareRecording', data),
  recordingStartRequest: (data) => _recordingRequest('startRecording', data),
  recordingPauseRequest: (data) => _recordingRequest('pauseRecording', data),
  recordingContinueRequest: (data) => _recordingRequest('continueRecording', data),
  recordingStopRequest: (data) => _recordingRequest('stopRecording', data),
  recordingStatusRequest: (data) => _recordingRequest('statusRecording', data)
}

export default recordingRequests

function _recordingRequest (action, data) {
  return {
    url: `api/recording/${action}`,
    method: 'post',
    data: data
  }
}
