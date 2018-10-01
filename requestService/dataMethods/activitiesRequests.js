
const activitiesRequests = {
  getActivitiesByContentIdRequest: ({ contentId, activitiesSkip, activitiesTake, filterOptions }) => ({
    url: `api/annotation/getAnnotationsByContentId`,
    method: 'get',
    params: {
      contentId: contentId,
      activitiesSkip: activitiesSkip,
      activitiesTake: activitiesTake,
      filterOptions: filterOptions
    }
  })
}

export default activitiesRequests
