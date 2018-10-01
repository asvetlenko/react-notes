const rotatePageRequests = {
  onRotatePageRequest: (data) => ({
    url: 'api/pages/rotate',
    method: 'post',
    data: data
  })
}

export default rotatePageRequests
