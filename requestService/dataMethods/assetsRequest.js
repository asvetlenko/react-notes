
const assetsRequests = {
  getAssetsByContentIdRequest: ({ contentId }) => ({
    url: `api/asset/getAssetsByContentId/${contentId}`,
    method: 'get',
    params: {
      contentId: contentId
    }
  })
}

export default assetsRequests
