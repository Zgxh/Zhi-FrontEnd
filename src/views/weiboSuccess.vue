<template>
  <div style="height: 200px; width: 200px; margin: 100px auto">
      <h2>正在跳转，请稍等...</h2>
  </div>
</template>

<script>
export default {
  name: "WeiboSuccess",
  data() {
    return {};
  },
  created() {
    this.getJWT();
  },
  methods: {
    getJWT() {
      let code = this.$route.query.code;
      this.$http({
        url: this.$http.adornUrl(
          "http://auth.zhizhi.com/auth/oauth2/weibo/success?code=" + code
        ),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          // 登录成功，设置token
          this.$cookie.set("Authorization", "Bearer " + data.data.token);
            this.$router.replace({ name: "Newest" });
        } else {
          if (data.msg) {
            this.$message.error(data.msg);
          } else if (data.message) {
            this.$message.error(data.message);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>