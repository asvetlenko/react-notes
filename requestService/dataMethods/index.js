import contentRequests from './contentRequests'
import galleryRequests from './galleryRequests'
import recordingRequests from './recordingRequests'
import formsRequests from './formsRequests'
import uploadRequests from './uploadRequests'
import rotatePageRequests from './rotatePageRequests'
import customVideoRequests from './customVideoRequests'
import usersRequests from './usersRequests'
import sessionsPageRequests from './sessionsPageRequests'
import formsPageRequests from './formsPageRequests'
import formStatisticsPageRequests from './formStatisticsPageRequests'
import activitiesRequests from './activitiesRequests'
import answerHistoryPageRequests from './answerHistoryPageRequests'
import createFormPageRequests from './createFormPageRequests'
import geosearchRequests from './geosearchRequests'
import chatMessagesRequests from './chatMessagesRequests'
import assetsRequests from './assetsRequest'
import annotationRequests from './annotationRequests'

const API = {
  ...contentRequests,
  ...galleryRequests,
  ...recordingRequests,
  ...formsRequests,
  ...uploadRequests,
  ...rotatePageRequests,
  ...customVideoRequests,
  ...usersRequests,
  ...sessionsPageRequests,
  ...formsPageRequests,
  ...activitiesRequests,
  ...formStatisticsPageRequests,
  ...answerHistoryPageRequests,
  ...createFormPageRequests,
  ...geosearchRequests,
  ...chatMessagesRequests,
  ...assetsRequests,
  ...annotationRequests
}

export default API
