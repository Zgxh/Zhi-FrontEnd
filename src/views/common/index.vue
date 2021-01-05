<template>
  <div style="width: 100%">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#0099CC"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="4"
            ><a href="https://www.ele.me" target="_blank"
              >订单管理</a
            ></el-menu-item>
          <el-submenu index="2" style="float: right" v-if="isLogin">
            <template slot="title">{{ username }}</template>
            <el-menu-item index="2-1">我的信息</el-menu-item>
            <el-menu-item index="2-2">我的文章</el-menu-item>
            <el-menu-item index="2-3">我的回答</el-menu-item>
            <el-menu-item index="2-4">退出登录</el-menu-item>
          </el-submenu>
          <el-menu-item index="1" v-if="!isLogin" style="float: right" @click="turnToLogin()">请登录</el-menu-item>
          <el-menu-item index="3" style="float: right">消息中心</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      username: "zgxh",
      isLogin: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    turnToLogin() {
      this.$router.push({name: "Login"});
    }
  },
};
</script>

<style>
</style>