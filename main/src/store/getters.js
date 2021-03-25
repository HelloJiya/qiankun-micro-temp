const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  organList: state => state.app.organList,
  currentOrganID: state => state.app.currentOrganID
}
export default getters
