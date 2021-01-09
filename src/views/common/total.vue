<template>
  <div class="total">
    <el-container>
      <!-- 公共组件:导航栏，除登录与注册页外，所有组件都需要嵌套导航栏 -->
      <app-header />
      <!-- main 实体路由 -->
      <router-view />
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
};
</script>

<style>
.total {
  background-color: #f8f8f8;
}
</style>