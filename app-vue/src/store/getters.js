const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  userName: (state) => {
    const { userInfo } = state.micro.microInfo
    return userInfo?.username || '小红'
  },
  userInfo: state => state.micro.microInfo.userInfo
}
export default getters
