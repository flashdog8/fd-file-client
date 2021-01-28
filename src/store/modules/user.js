import { login, logout } from '@/api/auth'
import { getInfo } from '@/api/uc/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: null,
    userCode: '',
    userName: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_USER_CODE: (state, userCode) => {
    state.userCode = userCode
  },
  SET_USER_NAME: (state, userName) => {
    state.userName = userName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captchaId, captchaCode } = userInfo
    return new Promise((resolve, reject) => {
      login({ userCode: username.trim(), password: password, captchaId: captchaId, captchaCode: captchaCode }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('登录验证失败, 请尝试重新登录。')
        }
        // console.log(data)
        const { userId, userCode, userName, avatar, roles } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('注册用户尚未被授权，请联系系统管理员！')
        }

        commit('SET_ROLES', roles)
        commit('SET_USER_ID', userId)
        commit('SET_USER_CODE', userCode)
        commit('SET_USER_NAME', userName)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

