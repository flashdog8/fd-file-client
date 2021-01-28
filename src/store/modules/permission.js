import { constantRoutes } from '@/router'

// import Layout from '@/layout'

// const loadView = (view) => {
//   return (resolve) => require([`@/views${view}`], resolve)
// }

/**
 * According menus generate routes
 * @param meuns
 */
export function generateAsyncRoutes(meuns) {
  const res = []
  console.log(meuns)

  // meuns.forEach(menu => {
  //   const tmp = {
  //     path: menu.path,
  //     component: Layout,
  //     name: menu.resourceCode,
  //     hidden: menu.status === 0,
  //     meta: {
  //       title: menu.name,
  //       icon: menu.icon
  //     }
  //   }
  //   if (menu.memo) {
  //     tmp.component = loadView(menu.memo)
  //   }
  //   if (menu.children) {
  //     tmp.children = generateAsyncRoutes(menu.children)
  //     let child
  //     for (child in tmp.children) {
  //       if (!child.hidden) {
  //         tmp.redirect = child.path
  //         break
  //       }
  //     }
  //   }
  //   res.push(tmp)
  // })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      let accessedRoutes = null
      accessedRoutes = generateAsyncRoutes(menus)
      accessedRoutes.push({
        path: '*',
        redirect: '/404',
        hidden: true
      })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
