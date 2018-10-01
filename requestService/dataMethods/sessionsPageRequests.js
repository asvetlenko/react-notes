const sessionsPageRequests = {
  createSessionRequest: ({data, needPermission}) => ({
    url: `api/contents/createcontent`,
    method: 'post',
    data
  }),
  createDocumentRequest: (data) => ({
    url: `api/documents`,
    method: 'post',
    data
  }),
  createPageRequest: (data) => ({
    url: `api/pages`,
    method: 'post',
    data
  }),
  getContentsRequest: (contentId) => ({
    url: `api/contents?id=${contentId}`,
    method: 'get'
  }),
  loadContentsRequest: () => ({
    url: `api/contents`,
    method: 'get'
  }),
  deleteSessionRequest: (contentId) => ({
    url: `api/contents/${contentId}`,
    method: 'delete'
  }),
  leaveSessionRequest: (contentId) => ({
    url: `api/contents/${contentId}/leave`,
    method: 'post'
  }),
  activateSessionRequest: ({contentId, needPermission}) => ({
    url: `api/contents/${contentId}/activate`,
    method: 'post'
  }),
  createFolderRequest: (data) => ({
    url: `api/folders`,
    method: 'post',
    data
  }),
  getFoldersRequest: () => ({
    url: `api/folders`,
    method: 'get'
  }),
  deleteFolderRequest: (folderId) => ({
    url: `api/folders/${folderId}`,
    method: 'delete'
  }),
  updateContentRequest: (data) => ({
    url: `api/contents`,
    method: 'put',
    data
  }),
  getContentsByFolderIdRequest: (folderId) => ({
    url: `api/contents?folderId=${folderId}`,
    method: 'get'
  }),
  getDeletedSessionsRequest: () => ({
    url: `api/contents?isDeleted=true`,
    method: 'get'
  }),
  getDeletedFoldersRequest: () => ({
    url: `api/folders/deleted`,
    method: 'get'
  }),
  updateFolderRequest: (data) => ({
    url: `api/folders`,
    method: 'put',
    data
  }),
  getFolderRequest: (folderId) => ({
    url: `api/folders/${folderId}`,
    method: 'get'
  }),
  addContentToFolderRequest: (data) => ({
    url: `api/contentfolder/addcontenttofolder`,
    method: 'post',
    data
  }),
  deleteContentFromFolderRequest: ({folderId, contentId}) => ({
    url: `api/contentfolder/deleteContentFromFolder/${folderId}/${contentId}`,
    method: 'delete'
  }),
}

export default sessionsPageRequests
