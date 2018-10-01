const geosearchRequests = {
  getGeosearchPagesRequest: ({paginationNo, paginationSize}) => {
    return {
      url: `api/pages/geosearch/${paginationNo}/${paginationSize}`,
      method: 'get'
    }
  },
  getGeosearchContentsRequest: (data) => ({
    url: `api/contents/geosearch`,
    method: 'get'
  })
}

export default geosearchRequests
