<template>
  <div
    class="total"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
  >
    <el-container style="min-height: 1200px">
      <!-- 公共组件:导航栏，除登录与注册页外，所有组件都需要嵌套导航栏 -->
      <app-header />
      <!-- main 实体路由 -->
      <router-view />
      <!-- 回到顶部组件 -->
      <el-backtop></el-backtop>
    </el-container>
  </div>
</template>

<script>
import AppHeader from "@/views/common/header";
export default {
  name: "Total",
  components: {
    AppHeader,
  },
  data() {
    return {
      loading: true, // loading状态是为了保证用户信息的刷新在得到用户信息之后
    };
  },
  computed: {
    userId: {
      get() {
        return this.$store.state.user.userId;
      },
      set(val) {
        this.$store.commit("user/updateId", val);
      },
    },
    name: {
      get() {
        return this.$store.state.user.name;
      },
      set(val) {
        this.$store.commit("user/updateName", val);
      },
    },
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 获取当前登录的用户信息
    getUserInfo() {
      this.$http({
        url: this.$http.adornUrl("http://member.zhizhi.com/member/curUser"),
        method: "get",
      }).then(({ data }) => {
        if (data && data.code === 200) {
          // 获取成功后，在本地存储信息
          this.userId = data.data.id;
          this.name = data.data.username;
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style>
.total {
  background-color: #f8f8f8;
}
</style>