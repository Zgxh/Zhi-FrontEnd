export default {
    namespaced: true,
    state: {
        // 用户登录后在本地保存用户信息
        userId: 0,
        name: "未登录用户", // 这里不能是 username 否则会失败
    },
    mutations: {
        updateId(state, userId) {
            state.userId = userId;
        },
        updateName(state, name) {
            state.name = name;
        }
    }
}