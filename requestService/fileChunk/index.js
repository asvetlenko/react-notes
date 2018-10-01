import { eventChannel, END } from 'redux-saga'
import _ from 'lodash'

import requestService from '../index'
import dataMethods from '../dataMethods'

const addZero = function (number, length) {
  let result = _.toString(number)

  while (result.length < length) {
    result = '0' + result
  }

  return result
}

const fileChunk = (file, hostName) => {
  const fileSize = file.size

  const chunkSize = fileSize > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : Math.min(1024 * 512, fileSize) // bytes
  const fileReader = new FileReader() // eslint-disable-line
  const createSassBlock = dataMethods['createSassBlock']
  const blockIds = []
  let offset = 0

  const chunkReaderBlock = (offset, length, file, emitter) => {
    const blob = file.slice(offset, length + offset)
    const blockId = `block-${addZero(_.size(blockIds), 6)}`
    blockIds.push(btoa(blockId)) // eslint-disable-line

    fileReader.onload = (e) => readEventHandler(e, emitter)
    fileReader.readAsArrayBuffer(blob)
  }

  const readEventHandler = (evt, emitter) => {
    if (evt.target.error == null) {
      offset += evt.loaded
    } else {
      console.log(`Read error: ${evt.target.error}`)
      emitter(END)
      return
    }

    requestService({
      hostName,
      data: createSassBlock({
        blockId: _.last(blockIds),
        data: new Uint8Array(evt.target.result)
      })
    }).then(function (response) {
      emitter({
        fileName: file.name,
        progress: (offset * 100 / file.size).toFixed(2),
        blockIds
      })

      if (offset >= fileSize) {
        emitter(END)
        return
      }

      chunkReaderBlock(offset, chunkSize, file, emitter)
    }).catch((error) => {
      fileReader.abort()
      emitter({
        fileName: file.name,
        progress: (offset * 100 / file.size).toFixed(2),
        blockIds: null,
        error
      })
      emitter(END)
    })
  }

  return eventChannel(emitter => {
    chunkReaderBlock(offset, chunkSize, file, emitter)

    return () => {
      fileReader.abort()
    }
  })
}

export default fileChunk
