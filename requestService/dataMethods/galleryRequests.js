const galleryRequests = {
  getGalleryItemRequest: ({ pageId }) => ({
    url: `api/pages/${pageId}`,
    method: 'get'
  }),
  renameGalleryItemRequest: ({ pageId, name }) => ({
    url: `api/pages/${pageId}`,
    method: 'put',
    data: {
      id: pageId,
      name
    }
  }),
  deleteGalleryItemRequest: ({ pageId }) => ({
    url: `api/pages/${pageId}`,
    method: 'delete'
  }),
  uploadGalleryVideoByUrlRequest: (data) => ({
    url: `api/pages`,
    method: 'post',
    data
  }),
  addDrawingPageRequest: (data) => ({
    url: `api/pages`,
    method: 'post',
    data
  }),
  addGalleryImageUploadRequest: (data) => ({
    url: `api/pages`,
    method: 'post',
    data
  }),
  addGalleryPdfDocumentRequest: ({ contentId, insertionIndex, url, timeZoneOffset }) => ({
    url: `api/contents/${contentId}/pdf?index=${insertionIndex}&pdfUrl=${url}&timeZoneOffset=${timeZoneOffset}`,
    method: 'post'
  }),
  addGalleryVideoUploadRequest: (data) => ({
    url: `api/pages`,
    method: 'post',
    data
  }),
  exportGalleryImagesRequest: ({ contentId }) => ({
    url: `api/contents/content/${contentId}`,
    method: 'get'
  }),
  getGalleryImageBlob: ({ url, assetName }) => ({
    url,
    method: 'get',
    headers: {
      Authorization: null,
      'Content-Type': 'image'
    },
    responseType: 'blob',
    assetName: assetName
  }),
  getGalleryImageWithAnnotations: ({ pageId, assetName }) => ({
    url: `api/pages/${pageId}/poster?name=${assetName}`,
    method: 'get',
    headers: {
      Authorization: null
    },
    responseType: 'arraybuffer'
  }),
  getGalleryAsPdfUrlRequest: ({ contentId }) => ({
    url: `api/contents/${contentId}/pdf`,
    method: 'get'
  }),
  getGalleryAsPdfBlobRequest: ({ url }) => ({
    url,
    method: 'get',
    headers: {
      Authorization: null,
      'Content-Type': 'application/pdf'
    },
    responseType: 'blob'
  }),
  exportImagesArchiveToFtpRequest: (data) => ({
    url: `api/contents/exportImagesArchiveToFtp`,
    method: 'post',
    data
  }),
}

export default galleryRequests
