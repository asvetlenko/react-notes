const annotationRequests = {
  addAnnotationRequest: (data) => ({
    url: `api/annotation/addAnnotation`,
    method: 'post',
    data
  }),
  deleteAnnotationRequest: ({annotationId}) => ({
    url: `api/annotation/deleteAnnotation/${annotationId}`,
    method: 'delete'
  }),
  updateAnnotationRequest: (data) => ({
    url: `api/annotation/updateAnnotation`,
    method: 'post',
    data
  }),
  restoreAnnotationRequest: (data) => ({
    url: `api/annotation/restoreAnnotation`,
    method: 'post',
    data
  }),
}

export default annotationRequests
