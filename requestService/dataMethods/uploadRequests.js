const uploadRequests = {
  createSassContainer: ({ fileName }) => ({
    url: 'api/blobs/sas',
    method: 'post',
    data: {
      fileName
    }
  }),
  createSassBlock: ({ blockId, data }) => ({
    url: `&comp=block&blockid=${blockId}`,
    method: 'put',
    headers: {
      'x-ms-blob-type': 'BlockBlob'
    },
    data
  }),
  setMapOfSassBlocks: ({ fileType, blockIds }) => {
    let data = '<?xml version="1.0" encoding="utf-8"?><BlockList>'
    for (let blockId of blockIds) {
      data += `<Latest>${blockId}</Latest>`
    }
    data += '</BlockList>'

    return {
      url: '&comp=blocklist',
      method: 'put',
      headers: {
        'x-ms-blob-content-type': fileType
      },
      data
    }
  }
}

export default uploadRequests
