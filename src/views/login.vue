<template>
  <div class="site-wrapper site-page--login">
    <div class="login-main">
      <h3 class="login-title">用户登录</h3>
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        status-icon
      >
        <el-form-item prop="userName">
          <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="dataForm.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model="dataForm.captcha" placeholder="验证码">
              </el-input>
            </el-col>
            <el-col :span="10" class="login-captcha">
              <img :src="captchaPath" @click="getCaptcha()" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn-submit" @click="turnToReg()"
            >注册</el-button
          >
          <el-button
            class="login-btn-submit"
            type="primary"
            @click="dataFormSubmit()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <h4 class="third-login-text">从第三方登录：</h4>
      <div>
        <!-- 微博第三方登录链接 -->
        <!-- 如果用户同意授权，则重定向到指定页面，并携带code值向服务端发起请求 -->
        <el-link
          href="https://api.weibo.com/oauth2/authorize?client_id=4222624238&response_type=code&redirect_uri=my.zhizhi.com/weibo/success"
        >
          <img
            src="http://img.t.sinajs.cn/t4/appstyle/open/images/website/loginbtn/loginbtn_06.png"
            alt=""
          />
        </el-link>
        <!-- <el-link href="https://api.weibo.com/oauth2/authorize?client_id=4222624238&response_type=code&redirect_uri=auth.zhizhi.com/auth/oauth2/weibo/success">
          <img src="" alt="">
        </el-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getUUID } from "@/utils/util";
export default {
  name: "Login",
  data() {
    return {
      dataForm: {
        userName: "",
        password: "",
        uuid: "",
        captcha: "",
      },
      dataRule: {
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
      captchaPath: "",
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    // 跳转注册页面
    turnToReg() {
      this.$router.push({ name: "Reg" });
    },
    // 提交登录表单
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("http://auth.zhizhi.com/auth/oauth/token"),
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }, // 表单提交
            data: this.$http.adornData(
              {
                grant_type: "password",
                client_id: "client-app",
                client_secret: "123456",
                username: this.dataForm.userName,
                password: this.dataForm.password,
                uuid: this.dataForm.uuid,
                captcha: this.dataForm.captcha,
              },
              false,
              "form"
            ),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              // 登录成功，设置token
              this.$cookie.set("Authorization", "Bearer " + data.data.token);
              this.$router.replace({ name: "Newest" });
            } else {
              this.getCaptcha();
              if (data.msg) {
                this.$message.error(data.msg);
              } else if (data.message) {
                this.$message.error(data.message);
              }
            }
          });
        }
      });
    },
    // 获取验证码图片
    getCaptcha() {
      this.dataForm.uuid = getUUID();
      this.captchaPath = this.$http.adornUrl(
        `http://auth.zhizhi.com/auth/login/captcha.jpg?uuid=${this.dataForm.uuid}`
      );
    },
  },
};
</script>

<style lang="scss">
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/img/login_bg.png);
    background-size: cover;
  }
  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }
  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }
  .brand-info {
    margin: 220px 100px 0 90px;
    color: #fff;
  }
  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: 0.6;
  }
  .login-main {
    padding: 150px 60px 180px;
    width: 470px;
    margin: 50px auto;
    background-color: rgb(255, 255, 255);
  }
  .login-title {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .login-captcha {
    overflow: hidden;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .login-btn-submit {
    width: 45%;
    margin-top: 20px;
  }
  .third-login-text {
    font-size: 13px;
    margin-bottom: 10px;
  }
}
</style>