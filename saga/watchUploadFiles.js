import {call, put, take, takeEvery, select} from 'redux-saga/effects'
import _ from 'lodash'

import storeSelectors from '../storeSelectors'
import dataMethods from '../requestService/dataMethods'
import fileChunk from '../requestService/fileChunk'
import requestService from '../requestService'

function * uploadFiles (action) {
  const {files = []} = action.payload

  const apiHostName = yield select(storeSelectors.getApiUrl)

  let blockIds
  let sasResponse
  let successPayload = []
  let failedPayload = []
  let error

  const createSassContainer = dataMethods['createSassContainer']
  const setMapOfSassBlocks = dataMethods['setMapOfSassBlocks']

  const progressType = action.type.replace('_UPLOAD_FILES', '_UPLOAD_FILES_PROGRESS')
  const successType = action.type.replace('_UPLOAD_FILES', '_UPLOAD_FILES_SUCCESS')
  const failedType = action.type.replace('_UPLOAD_FILES', '_UPLOAD_FILES_FAILED')

  for (let file of files) {
    blockIds = null

    try {
      sasResponse = yield call(requestService, {
        hostName: apiHostName,
        data: createSassContainer({fileName: file.name})
      })
      const chan = yield call(fileChunk, file, sasResponse.data.url)

      while (true) {
        // take(END) will cause the saga to terminate by jumping to the finally block
        let chunkedData = yield take(chan)
        blockIds = chunkedData.blockIds
        error = chunkedData.error

        yield put({type: progressType, payload: _.pick(chunkedData, ['progress', 'fileName', 'error'])})
      }
    } finally {
      if (error) {
        failedPayload.push({file, url: sasResponse.data.url, error})
      } else {
        successPayload.push({file, url: sasResponse.data.url})
        yield call(requestSerivse, {
            hostName: sasResponse.data.url,
            data: setMapOfSassBlocks({fileType: file.type, blockIds})
        })
      }
      continue // eslint-disable-line
    }
  }

  const actions = []

  if (successPayload.length) {
    actions.push(put({type: successType, payload: successPayload}))
  }

  if (failedPayload.length) {
    actions.push(put({type: failedType, payload: failedPayload}))
  }

  yield actions
}

export default function * watchUploadFiles () {
  yield takeEvery((action) => /^.*_UPLOAD_FILES$/.test(action.type), uploadFiles)
}
