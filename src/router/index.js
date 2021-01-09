import Vue from 'vue'
import Router from 'vue-router'

// 自由组件，无需嵌套上下及左右边框
import Login from "@/views/login";
import Reg from "@/views/Reg";

// 公共组件
import Total from "@/views/common/total";
import Body from "@/views/common/body";

// 文章列表页面
import Newest from "@/views/pages/newest";
import Hot from "@/views/pages/hot";
import Follow from "@/views/pages/follow";

// 文章详情页面
import Question from "@/views/question/question";

// 搜索页面
import Search from "@/views/search/search";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',      // 没有配置的路径
      redirect: '/'   // 默认跳转首页
    },
    // 登录与注册页无需嵌套外部边框
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    // 主页嵌套路由
    {
      path: '/',
      name: "Home",
      component: Total,
      children: [
        {
          path: "/",
          name: "Body",
          component: Body,
          children: [
            {
              path: "/",
              name: "Newest",
              component: Newest,
            },
            {
              path: "/hot",
              name: "Hot",
              component: Hot,
            },
            {
              path: "/follow",
              name: "Follow",
              component: Follow,
            },
          ]
        },
        {
          path: "/search",
          name: "Search",
          component: Search,
          props: (route) => ({ query: route.query.keyword }),
        },
        {
          path: "/question/:id",
          name: "Question",
          component: Question,
          props: (route) => ({ id: parseInt(route.params.id) }),
        }
      ]
    },
  ],
  mode: 'history', // 去掉路径中的 '#'
})

