import Vue from 'vue'
import Vuex from 'Vuex'
import user from "./modules/user"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
    },
    mutations: {
        // 重置 vuex 本地存储
        resetStore(state) {
            state.user.userId = 0
            state.user.name = "未登录用户"
        }
    }
})