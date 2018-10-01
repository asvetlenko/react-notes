import watchRequest from './watchRequest'
import watchParallelRequests from './watchParallelRequests'
import watchUploadFiles from './watchUploadFiles'

function * rootSaga () {
  yield [
    watchRequest(),
    watchParallelRequests(),
    watchUploadFiles()
  ]
}

export default rootSaga
