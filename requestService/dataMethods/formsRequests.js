const formsRequests = {
  getContentFormsRequest: ({ contentId }) => ({
    url: `api/contentform/getcontentformsbycontentId/${contentId}`,
    method: 'get'
  }),
  getFormControlsRequest: ({ contentFormId }) => ({
    url: `api/contentform/getformbycontentformid/${contentFormId}`,
    method: 'get'
  }),
  getTabsAnswersRequest: ({ currentFormId, selectedUserId, formTabs }) => ({
    url: `api/formanswers/getAnswersByTabId?contentFormId=${currentFormId}&userId=${selectedUserId}${formTabs}`,
    method: 'get'
  }),
  getLatestTabsAnswersRequest: ({ currentFormId, formTabs }) => ({
    url: `api/formanswers/getLatestAnswersByTabId?contentFormId=${currentFormId}${formTabs}`,
    method: 'get'
  }),
  getFormAnswersRequest: ({ contentFormId, userId }) => ({
    url: `api/formanswers/getanswersbyformId/${contentFormId}/${userId}`,
    method: 'get'
  }),
  getLatestFormAnswersRequest: ({ contentFormId }) => ({
    url: `api/formanswers/getlatestanswerbyformId/${contentFormId}`,
    method: 'get'
  }),
  getAvailableFormsRequest: ({ userId }) => ({
    url: `api/forms/availableForms/${userId}`,
    method: 'get'
  }),
  sendFormAnswerRequest: (data) => ({
    url: `api/formanswers`,
    method: 'post',
    data
  }),
  sendFormAnswerInRecordingRequest: (data) => ({
    url: `api/formrecording`,
    method: 'post',
    data
  }),
  attachFormRequest: (data) => ({
    url: `api/contentform/attachformtocontent`,
    method: 'post',
    data
  }),
  detachFormRequest: ({ formId }) => ({
    url: `api/contentform/detachFormFromContent/${formId}`,
    method: 'delete'
  }),
  exportFormAnswersRequest: ({ pageId }) => ({
    url: `api/pages/${pageId}/formcsv`,
    method: 'get'
  }),
  clearFormAnswerRequest: (data) => ({
    url: `api/formanswers/clearanswers`,
    method: 'post',
    data
  }),
  updateAnswerStatusRequest: (data) => ({
    url: `api/formanswers/setformanswerstatus`,
    method: 'put',
    data
  }),
  getAnswersStatusesCountRequest: ({contentFormId}) => ({
    url: `api/contentform/getanswersstatusescountbycontentformid/${contentFormId}`,
    method: 'get'
  }),
  getAnnotationForAnswerRequest: ({answerId}) => ({
    url: `api/formanswers/getannotationbyanswer/${answerId}`,
    method: 'get'
  }),
  getContentFormRequest: ({ ContentId, FormId }) => ({
    url: `api/contentform/getcontentform?contentId=${ContentId}&formId=${FormId}`,
    method: 'get'
  })
}

export default formsRequests
