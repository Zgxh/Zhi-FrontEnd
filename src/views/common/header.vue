<template>
  <el-header class="nav">
    <div class="nav-body">
      <el-menu
        :default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#409EFF"
        text-color="#ffffff"
        active-text-color="#ffd04b"
      >
        <!-- 首页 -->
        <el-menu-item index="1" style="margin-left: 100px">
          <a href="/"> 首页 </a>
        </el-menu-item>

        <!-- 等你来答 -->
        <el-menu-item index="2">
          <a href="https://www.ele.me" target="_blank"> 等你来答 </a>
        </el-menu-item>

        <!-- 会员中心 -->
        <el-menu-item index="5"> 会员中心 </el-menu-item>

        <!-- 搜索框 -->
        <el-menu-item style="margin-left: 300px; width: 300px">
          <el-input
            placeholder="输入你想要搜索的内容"
            suffix-icon="el-icon-search"
            v-model="keyword"
            @keyup.enter.native="search"
            size="medium"
          >
          </el-input>
        </el-menu-item>

        <!-- 用户信息展示 + 下拉菜单 -->
        <el-submenu
          index="3"
          style="float: right; margin-right: 20px"
          v-if="isLogin"
        >
          <template slot="title">
            <!-- 展示用户名 + 头像 -->
            <el-avatar :src="userInfo.avatar"> </el-avatar>
            &nbsp; {{ userInfo.username }}
          </template>
          <!-- 下拉菜单 -->
          <el-menu-item index="3-1">
            <i class="el-icon-user-solid"></i> 我的信息
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-question"></i> 我的文章
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-s-opportunity"></i> 我的回答
          </el-menu-item>
          <el-menu-item index="3-4">
            <i class="el-icon-error"></i> 退出登录
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          index="1"
          v-if="!isLogin"
          style="float: right"
          @click="turnToLogin()"
        >
          请登录
        </el-menu-item>

        <!-- 消息中心 + 下拉菜单 -->
        <el-submenu
          index="4"
          style="float: right"
          popper-class=""
          :disabled="!isLogin"
        >
          <template slot="title">
            <i class="el-icon-message"></i> 消息中心
          </template>
          <el-menu-item index="4-1">
            最新评论
            <el-badge
              class="mark"
              :value="messageInfo.newCommentsCount"
              :max="9"
              v-if="messageInfo.newCommentsCount > 0"
            />
          </el-menu-item>
          <el-menu-item index="4-2">
            最新回答
            <el-badge
              class="mark"
              :value="messageInfo.newAnswersCount"
              :max="9"
              v-if="messageInfo.newAnswersCount > 0"
            />
          </el-menu-item>
          <el-menu-item index="4-3">
            新的关注
            <el-badge
              class="mark"
              :value="messageInfo.newFollowersCount"
              :max="9"
              v-if="messageInfo.newFollowersCount > 0"
            />
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      // 保存用户信息
      userInfo: {
        username: "未知用户",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      },
      // 保存消息中心的有关信息
      messageInfo: {
        newCommentsCount: 0,
        newAnswersCount: 0,
        newFollowersCount: 0,
      },
      isLogin: true, // 标识用户是否登录
      keyword: "", // 搜索的内容
    };
  },
  created() {
    this.getUserInfo();
    this.getMessageCenter();
  },
  computed: {},
  methods: {
    // 导航栏某项选中后的操作
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
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
    // 获取新的评论数、回复数、关注数
    getMessageCenter() {
      // 发送获取内容的请求
    },
    // 打开新的检索页面，并传递 keyword 参数，由检索页面自行发起检索请求
    search() {
      let { href } = this.$router.resolve({
        path: "/search?keyword=" + this.keyword,
      });
      window.open(href, "_blank");
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.nav {
  padding: 0 0;
  width: 100%;
  overflow: hidden;
  background-color: #409eff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.nav-body {
  width: auto;
  min-width: 1300px;
  max-width: 1600px;
  margin: 0 auto;
}
</style>