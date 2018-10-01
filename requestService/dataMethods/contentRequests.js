const contentRequests = {
  renameContentRequest: ({ contentId, name, folderId }) => ({
    url: `api/contents/${contentId}`,
    method: 'put',
    data: {
      description: name,
      folderId
    }
  }),
  getContentRequest: ({ contentId, ownerId, currentUserId }) => ({
    url: `api/contents/getpartialcontent/${contentId}`,
    method: 'get',
    params: {
      contentId: contentId,
      contentOwnerId: ownerId,
      currentUserId: currentUserId
    }
  }),
  reloadContentRequest: ({ contentId, ownerId, currentUserId }) => ({
    url: `api/contents/getpartialcontent/${contentId}`,
    method: 'get',
    params: {
      contentId: contentId,
      contentOwnerId: ownerId,
      currentUserId: currentUserId
    }
  }),
}

export default contentRequests
