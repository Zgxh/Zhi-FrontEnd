import Vue from 'vue'
import store from '@/store'
import router from '@/router'

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

/**
 * 点赞问题
 */
export function thumbsUpQuestion(item) {
    let id = item.id;
    Vue.prototype.$http({
        url: Vue.prototype.$http.adornUrl("http://zhizhi.com/blog/question/thumbsUp"),
        method: "post",
        params: {
            id: id,
        },
    }).then(({ data }) => {
        if (data && data.code === 200) {
            // 成功弹窗提醒
            Vue.prototype.$message({ message: "点赞成功", type: "success" });
            // 点赞数加1
            item.thumbsUpCount += 1;
        } else {
            Vue.prototype.$message.error(data.msg);
        }
    });
}

/**
 * 获取一个问题的所有评论
 */
export function getQuestionComments(item) {
    let qid = item.id;
    Vue.prototype.$http({
        url: Vue.prototype.$http.adornUrl("http://zhizhi.com/blog/questioncomment/question/comments"),
        method: "get",
        params: {
            qid: qid,
        },
    }).then(({ data }) => {
        if (data && data.code === 200) {
            // 保存所有评论
            item.comments['content'] = data.comments;
        } else {
            Vue.prototype.$message.error(data.msg);
        }
    });
}

/**
 * 对某个问题发布新的评论
 */
export function postQuestionComment(newComment, item, uid) {
    newComment["qid"] = item.id;
    newComment["quid"] = item.uid;
    newComment["uid"] = uid;
    Vue.prototype.$http({
        url: Vue.prototype.$http.adornUrl("http://zhizhi.com/blog/questioncomment/save"),
        method: "post",
        data: Vue.prototype.$http.adornData(newComment, false, "json"),
    }).then(({ data }) => {
        if (data && data.code === 200) {
            // 成功弹窗提醒
            Vue.prototype.$message({ message: "评论成功", type: "success" });
            item.commentsCount++;
        } else {
            Vue.prototype.$message.error(data.msg);
        }
    });
}