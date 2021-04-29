import Vue from 'vue'
import Router from 'vue-router'

// 自由组件，无需嵌套上下及左右边框
import Login from "@/views/login";
import Reg from "@/views/Reg";
import WeiboSuccess from "@/views/WeiboSuccess";

// 公共组件
import Total from "@/views/common/total";
import DoubleColBody from "@/views/common/doubleColBody";
import SingleColBody from "@/views/common/singleColBody";

// vip 组件
import Vip from "@/views/vip/vip";
import OrderConfirm from "@/views/vip/orderConfirm";
import PaySuccess from "@/views/vip/paySuccess";
import Pay from "@/views/vip/pay";

// 文章列表页面
import Newest from "@/views/pages/newest";
import Hot from "@/views/pages/hot";
import Follow from "@/views/pages/follow";
import Zero from "@/views/pages/zeroAnswerQuestions";
import MyQuestions from "@/views/pages/myQuestions";

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
      path: '/pay',
      name: 'Pay',
      component: Pay,
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/weibo/success',
      name: 'WeiboSuccess',
      component: WeiboSuccess,
    },
    // 主页嵌套路由
    {
      path: '/',
      name: "Home",
      component: Total,
      children: [
        {
          path: "/",
          name: "DoubleColBody",
          component: DoubleColBody,
          children: [
            {
              path: "/",
              name: "Newest",
              component: Newest,
            },
            {
              path: "hot",
              name: "Hot",
              component: Hot,
            },
            {
              path: "follow",
              name: "Follow",
              component: Follow,
            },
          ]
        },
        {
          path: 'vip',
          component: SingleColBody,
          children: [
            {
              path: 'index',
              name: 'VipIndex',
              component: Vip,
            },
            {
              path: 'order',
              name: 'VipOrder',
              component: OrderConfirm,
            },
            {
              path: 'pay/success',
              name: 'PaySuccess',
              component: PaySuccess,
            }
          ]
        },
        {
          path: "single",
          name: "SingleColBody",
          component: SingleColBody,
          children: [
            {
              path: "zero",
              name: "Zero",
              component: Zero,
            },
            {
              path: "my/:uid",
              name: "MyQuestions",
              component: MyQuestions,
              props: (route) => ({ uid: parseInt(route.params.uid) }),
            }
          ]
        },
        {
          path: "search",
          name: "Search",
          component: Search,
          props: (route) => ({ query: route.query.keyword }),
        },
        {
          path: "question/:id",
          name: "Question",
          component: Question,
          props: (route) => ({ id: parseInt(route.params.id) }),
        }
      ]
    },
  ],
  mode: 'history', // 去掉路径中的 '#'
})

