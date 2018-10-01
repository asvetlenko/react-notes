const formStatisticsPageRequests = {
  getFormRequest: (formId) => ({
    url: `api/forms/${formId}`,
    method: 'get'
  }),
  getOpenedFormAnswersRequest: (formId) => ({
    url: `api/formanswers/getanswerusersbyformid/${formId}`,
    method: 'get'
  }),
  getOpenedFormSessionsRequest: (formId) => ({
    url: `api/contentform/getsessionsbyformid/${formId}`,
    method: 'get'
  }),
  getAnswerUsersByFormIdRequest: (formId) => ({
    url: `api/formanswers/getanswerusersbyformid/${formId}`,
    method: 'get'
  }),
  getAnswersHistoryInfoRequest: ({contentFormId, userId}) => ({
    url: `api/formanswers/getanswershistoryinfo/${contentFormId}/${userId}`,
    method: 'get'
  }),
  getAnswersHistoryForUserRequest: ({contentFormId, userId}) => ({
    url: `api/formanswers/getanswershistoryforuser?contentFormId=${contentFormId}&userId=${userId}`,
    method: 'get'
  }),
  getAnswersByFormIdRequest: ({contentFormId, userId}) => ({
    url: `api/formanswers/getanswersbyformId/${contentFormId}/${userId}`,
    method: 'get'
  }),
  getAnswersByTabIdRequest: ({contentFormId, formTabs, userId}) => ({
    url: `api/formanswers/getAnswersByTabId?contentFormId=${contentFormId}&userId=${userId}${formTabs}`,
    method: 'get'
  })
}

export default formStatisticsPageRequests
