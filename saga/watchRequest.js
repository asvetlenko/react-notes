import { call, put, takeEvery, select } from 'redux-saga/effects'
import _ from 'lodash'

import storeSelectors from '../storeSelectors'
import dataMethods from '../requestService/dataMethods'
import requestService from '../requestService'

function * callAPI (action) {
  const apiHostName = yield select(storeSelectors.getApiUrl)
  const accessToken = yield select(storeSelectors.getAccessToken)
  const data = dataMethods[_.camelCase(action.type)](action.payload)
  try {
    const response = yield call(requestService, {
      hostName: apiHostName,
      accessToken,
      data
    })

    const newType = action.type.replace('_REQUEST', '_SUCCESS')
    yield put({type: newType, response, payload: action.payload})
  } catch (e) {
    const errorModel = {
      type: action.type.replace('_REQUEST', '_FAILED'),
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
  yield takeEvery((action) => /^.*_REQUEST$/.test(action.type), callAPI)
}
