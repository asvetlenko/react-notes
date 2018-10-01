const customVideoRequests = {
  getConcatenatedVideoRequest: (data) => ({
    url: `api/videoconcat/CreateVideo`,
    method: 'post',
    data
  }),
  getNotLoadedPagesRequest: (pageIds) => ({
    url: `api/pages/getnotloadedpages`,
    method: 'post',
    data: {
      PageIds: pageIds
    }
  })
}

export default customVideoRequests
