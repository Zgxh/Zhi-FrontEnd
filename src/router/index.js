import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/common/login";
import Reg from "@/views/common/Reg";
import Index from "@/views/common/index";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    }
  ]
})
