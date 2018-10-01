const usersRequests = {
  kickUserRequest: ({ contentId, userId }) => ({
    url: `api/contents/${contentId}/${userId}/removeUser`,
    method: 'post'
  }),
  searchUserRequest: (searchText) => ({
    url: `api/Users?search=${encodeURIComponent(searchText)}`,
    method: 'get'
  })
}

export default usersRequests
