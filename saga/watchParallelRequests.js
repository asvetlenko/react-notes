import { call, put, takeEvery, select, all } from 'redux-saga/effects'
import _ from 'lodash'

import storeSelectors from '../storeSelectors'
import requestService from '../requestService'

function * callAPI (action) {
  const apiHostName = yield select(storeSelectors.getApiUrl)
  const accessToken = yield select(storeSelectors.getAccessToken)

  try {
    const response = yield all(_.map(action.payload, (item) => call(requestService, { data: item, hostName: apiHostName, accessToken })))

    const newType = action.type.replace('_PARALLEL_REQUESTS', '_PARALLEL_SUCCESS')
    yield put({type: newType, response, payload: action.payload})
  } catch (e) {
    const errorModel = {
      type: action.type.replace('_PARALLEL_REQUESTS', '_PARALLEL_FAILED'),
      payload: action.payload,
      message: e.statusText,
      status: e.status,
      response: e.response
    }
    console.error(errorModel)
    yield put(errorModel)
  }
}

export default function * watchRequest () {
  yield takeEvery((action) => /^.*_PARALLEL_REQUESTS$/.test(action.type), callAPI)
}
