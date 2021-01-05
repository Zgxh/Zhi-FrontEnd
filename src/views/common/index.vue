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
          <el-menu-item index="2"
            ><a href="https://www.ele.me" target="_blank"
              >订单管理</a
            ></el-menu-item
          >
          <el-submenu index="3" style="float: right" v-if="isLogin">
            <template slot="title">{{ username }}</template>
            <el-menu-item index="3-1">我的信息</el-menu-item>
            <el-menu-item index="3-2">我的文章</el-menu-item>
            <el-menu-item index="3-3">我的回答</el-menu-item>
            <el-menu-item index="3-4">退出登录</el-menu-item>
          </el-submenu>
          <el-menu-item
            index="1"
            v-if="!isLogin"
            style="float: right"
            @click="turnToLogin()"
            >请登录</el-menu-item
          >
          <!-- <el-menu-item index="3" style="float: right">消息中心</el-menu-item> -->
          <el-submenu index="2" style="float: right">
            <template slot="title">消息中心</template>
            <el-menu-item index="2-1">
              最新评论
              <!-- <el-badge class="mark" :value="12" :max="9" /> -->
            </el-menu-item>
            <el-menu-item index="2-2">
              最新回复
              <!-- <el-badge class="mark" :value="12" :max="9" /> -->
            </el-menu-item>
            <el-menu-item index="2-3">
              新的关注
              <!-- <el-badge class="mark" :value="12" :max="9" /> -->
            </el-menu-item>
          </el-submenu>
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
      username: "",
      isLogin: true,
      articles: [],
    };
  },
  created() {
    this.getUserInfo();
    this.pullNewestArticles();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 跳转登录页面
    turnToLogin() {
      this.$router.push({ name: "Login" });
    },
    // 获取用户信息
    getUserInfo() {
      this.$http({
        url: this.$http.adornUrl("http://获取用户信息的api"),
        method: "get",
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.username = data.username;
          this.isLogin = true;
        } else {
          this.isLogin = false;
          // this.$message.error(data.msg);
        }
      });
    },
    // 获取最新的文章列表
    pullNewestArticles() {
      this.getPageArticles(1);
    },
    getPageArticles(pageIndex) {
      this.$http({
        url: this.$http.adornUrl("http://zhizhi.com/blog/questions/get/all"),
        method: "get",
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.articles = data.data;
          this.isLogin = true;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>