import { take, call, all, race, put, cancelled } from 'redux-saga/effects'
import RestApi from '../request/restApi'
import GlobalState from '../stateApi'

function* authorize(user, password) {
    try {
        const [token, stats] = yield all([ //effects will get executed in parallel
            call(RestApi.authorize, user, password),
            call(RestApi.statistics, user)
        ])

        yield put({type: 'LOGIN_SUCCESS', token})
        yield call(GlobalState.storeItem, {token})
        return token
    } catch(error) {
        yield put({type: 'LOGIN_ERROR', error})
    } finally {
        if (yield cancelled()) {// put special cancellation handling code here
            const {notifyCount, timeout, stopNotifyAll} = yield race({
                notifyCount: call(RestApi.notifyAll, 'HelloMessage'),
                timeout: call(delay, 1000),
                stopNotifyAll: take('STOP_REQUEST_NOTIFY_ALL')
            })

            if (notifyCount){
                put({type: 'COUT_MESSAGE_WERE_DELIVERED', notifyCount})
            } else {
                put({type: 'TOO_COMPLECATED_REQUEST'})
            }

        }
    }
}

function* loginFlow() {
    while (true) {
        const {user, password} = yield take('LOGIN_REQUEST')

        const task = yield fork(authorize, user, password) // fork return a Task object
        const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
        if (action.type === 'LOGOUT') yield cancel(task)
        yield call(GlobalState.clearItem, 'token')
    }
}