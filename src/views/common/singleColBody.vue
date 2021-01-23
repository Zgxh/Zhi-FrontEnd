<template>
  <!-- 单栏 body 外框 -->
  <el-main>
    <div class="single-main-body">
      <el-row>
        <div class="main-box">
          <router-view />
        </div>
      </el-row>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "SingleColBody",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.single-main-body {
  width: 1026.66px;
  margin: 0 auto;
  background-color: #f8f8f8;
  margin-top: 60px;
}
.main-box {
  padding: 0 20px;
}
</style>