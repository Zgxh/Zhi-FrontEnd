<template>
  <div class="site-wrapper site-page--login">
    <div class="login-main">
      <h3 class="login-title">用户注册</h3>
      <el-form
        :model="dataForm"
        :rules="rules"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        status-icon
      >
        <el-form-item prop="userName">
          <el-input
            v-model="dataForm.userName"
            placeholder="用户名，长度在 4~10 之间"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="dataForm.password"
            type="password"
            placeholder="密码，长度在 6~16 之间"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input
            type="password"
            v-model="dataForm.checkPassword"
            autocomplete="off"
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input v-model="dataForm.tel" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="dataForm.code"
            placeholder="验证码"
            style="width: 180px"
          ></el-input>
          <el-button
            @click.prevent="sendCode()"
            style="float: right; width: 150px; text-align: center"
            type="primary"
            plain
            :disabled="disabled"
            v-text="codeText"
          ></el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn-submit" @click="turnToLogin()"
            >登录</el-button
          >
          <el-button
            class="login-btn-submit"
            type="primary"
            @click="dataFormSubmit()"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isMobile } from "@/utils/validate";
export default {
  name: "Reg",
  data() {
    // 用户名校验器
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名！"));
      } else if (value.length < 4 || value.length > 10) {
        callback(new Error("用户名长度必须为 4~10 个字符！"));
      } else {
        callback();
      }
    };
    // 密码校验器
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("密码长度必须为 6~16 个字符！"));
      } else {
        if (this.dataForm.checkPassword !== "") {
          this.$refs.dataForm.validateField("checkPassword");
        }
        callback();
      }
    };
    // 再次输入密码的密码校验器
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.dataForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 手机号校验器
    var validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码!"));
      } else if (!isMobile(value)) {
        callback(new Error("手机号码格式错误!"));
      } else {
        callback();
      }
    };
    return {
      // 有关验证码按钮的相关数据
      codeText: "发送验证码",
      disabled: false,
      time: 60,
      // 表单绑定的数据
      dataForm: {
        username: "",
        password: "",
        checkPassword: "",
        tel: "",
        code: "",
      },
      // 表单数据项校验规则
      rules: {
        userName: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
        tel: [{ validator: validateTel, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    sendCode() {
      // 如果不在倒计时，则发送验证码
      if (!this.disabled) {
        // 1. 改变按钮显示：xx秒后重试，并禁用按钮
        this.changeCodeButton();
        // 2. 发送验证码
        this.$http({
          url: this.$http.adornUrl(
            "http://auth.zhizhi.com/auth/reg/code?tel=" + this.dataForm.tel
          ),
          method: "get",
        }).then(({ data }) => {
          if (data && data.code === 200) {
            // 发送成功
            this.$message({
                message: "验证码发送成功，验证码：" + data.data.code,
                type: "success",
                center: true,
              });
          } else {
            // 获取新验证码失败
            this.$message.error(data.msg);
          }
        });
      } else {
        // 此时正在倒计时，什么也不能干
      }
    },
    // 改变发送验证码的按钮风格：如果正在发送，
    changeCodeButton() {
      this.disabled = true;
      if (this.time === 0) {
        this.codeText = "发送验证码";
        this.time = 60;
        this.disabled = false;
      } else {
        var str = this.time + " 秒后重试";
        this.codeText = str;
        // 设置定时事件：每过一秒 time--
        setTimeout(() => {
          this.time--;
          this.changeCodeButton();
        }, 1000);
      }
    },
    // 跳转登录页面
    turnToLogin() {
      this.$router.push({ name: "Login" });
    },
    // 提交注册表单
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        // 首先进行表单验证
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("http://auth.zhizhi.com/auth/reg/"),
            method: "post",
            data: this.$http.adornData({
              username: this.dataForm.userName,
              password: this.dataForm.password,
              tel: this.dataForm.tel,
              code: this.dataForm.code,
            }),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              // 注册成功后，返回登录页面
              this.$router.replace({ name: "Login" });
              // 注册成功，弹出消息
              this.$message({
                message: "注册成功，请登录！",
                type: "success",
                center: true,
              });
            } else {
              // 注册失败，弹出消息
              this.$message.error(data.msg);
            }
          });
        }
      });
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
  }
  .login-captcha {
    overflow: hidden;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .login-btn-submit {
    // width: 100%;
    width: 45%;
    margin-top: 38px;
  }
}
</style>