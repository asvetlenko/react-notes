const chatMessagesRequests = {
  getChatMessagesByContentIdRequest: ({ contentId, messagesSkip, messagesTake }) => ({
    url: `api/chatMessage/getChatMessagesByContentId/${contentId}`,
    method: 'get',
    params: {
      contentId: contentId,
      messagesSkip: messagesSkip,
      messagesTake: messagesTake
    }
  }),
  sendChatMessageRequest: (data) => ({
    url: `api/chatMessage`,
    method: 'post',
    data
  }),
}

export default chatMessagesRequests
