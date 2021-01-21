<template>
  <el-main>
    <!-- 主体 -->
    <div class="main-body">
      <el-row>
        <el-col :span="16">
          <div class="main-left">
            <!-- 左侧内容栏导航 -->
            <div class="left-content-nav-box">
              <!-- 路由无刷新页面链接 -->
              <router-link :to="{ name: 'Newest' }" class="router-link">
                推荐
              </router-link>
              <router-link :to="{ name: 'Hot' }" class="router-link">
                热门
              </router-link>
              <router-link :to="{ name: 'Follow' }" class="router-link">
                关注
              </router-link>
              <!-- 此处展示二级路由：左半部分的主要内容 -->
            </div>
            <router-view />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="main-right">
            <div class="horse-lamp">
              <el-carousel trigger="click" height="150px">
                <!-- 走马灯，限制最多显示4个广告位 -->
                <el-carousel-item
                  v-for="item in lampSrc.length < 5
                    ? lampSrc
                    : lampSrc.slice(0, 4)"
                  :key="item"
                >
                  <el-image fit="cover" :src="item"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="author-tool">
              <el-button
                type="text"
                class="author-tool-left"
                @click="createQuestionDialogVisiable = true"
              >
                <div class="author-tool-button">
                  <i class="el-icon-edit-outline"></i>
                </div>
                <div class="author-tool-text">创建话题</div>
              </el-button>
              <el-button type="text" class="author-tool-left">
                <div class="author-tool-button">
                  <i class="el-icon-edit"></i>
                </div>
                <div class="author-tool-text">回答问题</div>
              </el-button>
              <el-button type="text" class="author-tool-right">
                <div class="author-tool-button">
                  <i class="el-icon-chat-line-square"></i>
                </div>
                <div class="author-tool-text">创建评论</div>
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="新建提问"
      :visible.sync="createQuestionDialogVisiable"
      style="width: 1300px; margin: 0 auto"
    >
      <el-form
        :model="newQuestionForm"
        :rules="newQuestionRules"
        ref="newQuestionForm"
      >
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input
            v-model="newQuestionForm.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="封面图(链接)"
          :label-width="formLabelWidth"
          prop="coverImg"
        >
          <el-input
            v-model="newQuestionForm.coverImg"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6 }"
            v-model="newQuestionForm.content"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createQuestionDialogVisiable = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="createNewQuestion">发 布</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  name: "Body",
  data() {
    return {
      // 走马灯广告
      lampSrc: [],
      // 创建问题的表单弹窗的可见性
      createQuestionDialogVisiable: false,
      // 新建问题表单
      newQuestionForm: {
        title: "",
        content: "",
        coverImg: "",
        uid: this.$store.state.user.userId,
      },
      // 新建问题表单校验规则
      newQuestionRules: {
        title: [{ required: true, message: "标题必须填写", trigger: "blur" }],
        content: [
          { required: true, message: "请填写问题描述", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getLampSrc();
  },
  computed: {},
  methods: {
    // 获取走马灯广告数组
    getLampSrc() {
      this.lampSrc = [
        "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1186896924,2884330479&fm=26&gp=0.jpg",
        "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2744970734,929450527&fm=111&gp=0.jpg",
        "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4042638905,392787251&fm=26&gp=0.jpg",
      ];
    },
    // 发布新的问题
    createNewQuestion() {
      this.$refs["newQuestionForm"].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("http://zhizhi.com/blog/question/save"),
            method: "post",
            data: this.$http.adornData(this.newQuestionForm, false, "json"),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              // 关闭表单对话框
              this.createQuestionDialogVisiable = false;
              // 清空表单内容
              this.newQuestionForm.title = "";
              this.newQuestionForm.content = "";
              this.newQuestionForm.coverImg = "";
              // 成功弹窗提醒
              this.$message({ message: "问题发布成功", type: "success" });
              // 跳转推荐页面，重新查询最新的问题
              if (this.$route.name == 'Newest') {
                this.$router.go(0);
              } else {
                this.$router.push({name: 'Newest'});
              }
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.main-body {
  width: 1600px;
  margin: 0 auto;
  background-color: #f8f8f8;
  margin-top: 60px;
}
.main-left {
  padding: 0 20px;
}
.left-content-nav-box {
  height: 50px;
  background-color: #ffffff;
  margin-bottom: 5px;
  padding: 0 40px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
}
.router-link {
  font-size: 25px;
  font-weight: 500;
  line-height: 50px;
  margin-right: 40px;
}
.router-link-exact-active {
  color: #409eff;
}
.main-right {
  width: 507.78px;
  position: fixed;
}
.horse-lamp {
  background-color: #ffffff;
  padding: 20px 30px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
}
.author-tool {
  background-color: #ffffff;
  margin-top: 5px;
  padding: 20px 30px;
  height: 158px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
}
.author-tool-left {
  width: 80px;
  height: 118px;
  margin-right: 88px;
}
.author-tool-right {
  width: 80px;
  height: 118px;
}
.author-tool-button {
  font-size: 60px;
  line-height: 80px;
}
.author-tool-text {
  font-size: 20px;
}
</style>