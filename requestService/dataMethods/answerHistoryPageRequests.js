const answerHistoryPageRequests = {
  getAnswersHistoryInfoRequest: ({contentFormId, userId}) => ({
    url: `api/formanswers/getanswershistoryinfo/${contentFormId}/${userId}`,
    method: 'get'
  }),
  getAnswersHistoryForUserRequest: ({contentFormId, formTabs, userId}) => ({
    url: `api/formanswers/getanswershistoryforuser?contentFormId=${contentFormId}${formTabs}&userId=${userId}`,
    method: 'get'
  }),
  getAnswersByOrderRequest: ({contentFormId, formTabs, order, userId}) => ({
    url: `api/formanswers/getanswersbyorder?contentFormId=${contentFormId}&formTabs=${formTabs}&order=${order}&userId=${userId}`,
    method: 'get'
  })
}

export default answerHistoryPageRequests
