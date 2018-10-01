const formsPageRequests = {
  getAllFormsRequest: () => ({
    url: `api/forms`,
    method: 'get'
  }),
  deleteFormRequest: (formId) => ({
    url: `api/forms/${formId}`,
    method: 'delete'
  }),
  copyFormRequest: (formId) => ({
    url: `api/forms/copy/${formId}`,
    method: 'post'
  }),
  editFormRequest: (form) => ({
    url: `api/forms`,
    method: 'put',
    data: form
  }),
  updateFormPublishedFlagRequest: ({formId, isPublished}) => ({
    url: `api/forms/ispublished/${formId}/${isPublished}`,
    method: 'post'
  })
}

export default formsPageRequests
