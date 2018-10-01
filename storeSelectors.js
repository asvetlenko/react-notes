const selector = {
  getApiUrl: (state) => state.appConfigState.apiUrl,
  getAccessToken: (state) => state.sessionState.accessToken,
  getContent: (state) => state.contentState,
  getUsers: (state) => state.users,
  getDrawing: (state) => state.playerToolbar.drawing,
  getSelectedGalleryItemId: (state) => state.gallery.galleryState.selectedGalleryItemId,
  getGalleryList: (state) => state.gallery.galleryList,
  getConnectionState: (state) => state.presentation.connection
}

export default selector
