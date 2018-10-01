const createFormPageRequests = {
  getFormIconUrlRequest: (file) => ({
    url: `api/blobs/sas`,
    method: 'post',
    data: {FileName: file.name}
  }),
  createFormRequest: (form) => ({
    url: `api/forms`,
    method: 'post',
    data: form
  }),
  updateFormRequest: (form) => ({
    url: `api/forms`,
    method: 'put',
    data: form
  }),
  updateFormControlsRequest: (form) => ({
    url: `api/forms/updateformcontrols`,
    method: 'put',
    data: form
  }),
  updateFormTabsRequest: (form) => ({
    url: `api/forms/updateformtabs`,
    method: 'put',
    data: form
  })
}

export default createFormPageRequests
