import Vue from 'vue'
import store from '@/store'

/**
 * 生成随机数，用于获取和校验验证码信息
 */
export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
    Vue.cookie.delete('Authorization')
    store.commit('resetStore')
    // router.options.isAddDynamicMenuRoutes = false
}