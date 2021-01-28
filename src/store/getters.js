const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userId: state => state.user.userId,
  userCode: state => state.user.userCode,
  userName: state => state.user.userName,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  regions: state => state.region.regions
}
export default getters
