<template>
  <div style="margin: 0 auto; width: 100%">
    <el-main style="padding: 0 0">
      <div class="title-wrapper">
        <div class="title-box">
          <div class="title-content">
            <a href=""><h1 v-text="question.title"></h1></a>
          </div>
          <div class="content-box">
            <span v-text="question.content"></span>
          </div>
          <div class="page-view-box">
            <h3 style="color: #c0c0c0; line-height: 70px">
              浏览量：{{ question.viewCount }}
            </h3>
          </div>
          <div class="title-footer-tool">
            <el-button type="primary" @click="openDialog">
              <i class="el-icon-edit"></i>
              写回答
            </el-button>
            <el-button type="text" style="margin-left: 30px; color: #c0c0c0">
              <i class="el-icon-chat-dot-round"></i>
              {{ question.commentsCount }} 条评论
            </el-button>
          </div>
        </div>
      </div>
      <div class="main-body">
        <el-row>
          <el-col :span="16">
            <div class="main-left">
              <!-- 展示该提问对应的所有回答 -->
              <ul>
                <!-- 回答数组为空时，展示 -->
                <li v-if="answers.length == 0">
                  <div class="content-wrapper">
                    <div class="li-content">
                      <!-- 回答内容 -->
                      <div class="content-text">
                        <span> 该问题暂没有回答 </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li v-for="item in answers" :key="item.id">
                  <div class="content-wrapper">
                    <!-- 作者简介 -->
                    <div class="li-author-info-box">
                      <!-- 头像 -->
                      <div class="author-avatar">
                        <el-avatar
                          shape="square"
                          :size="48"
                          :src="avatar"
                        ></el-avatar>
                      </div>
                      <!-- 昵称 + 个性签名 -->
                      <div class="author-content">
                        <div class="author-content-name">
                          <a href="">未知作者</a>
                        </div>
                        <div class="author-content-des">
                          <span>未知个签</span>
                        </div>
                      </div>
                    </div>
                    <div class="li-content">
                      <!-- 回答内容 -->
                      <div class="content-text">
                        <span v-text="item.content"></span>
                      </div>
                      <div class="content-footer">
                        <el-button type="primary">
                          <i class="el-icon-caret-top"></i>
                          {{ item.thumbsUpCount }} 个赞
                        </el-button>
                        <el-button type="text" class="footer-button">
                          <i class="el-icon-chat-dot-round"></i>
                          {{ item.commentsCount }} 条评论
                        </el-button>
                        <span class="text-time">
                          最后修改时间：
                          {{ item.lastModifyTime.substring(0, 10) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="main-right">
              <div class="question-author-box">
                <h2>关于作者</h2>
                <!-- 作者简介 -->
                <div class="li-question-author-info-box">
                  <!-- 头像 -->
                  <div class="question-author-avatar">
                    <el-avatar
                      shape="square"
                      :size="78"
                      :src="avatar"
                    ></el-avatar>
                  </div>
                  <!-- 昵称 + 个性签名 -->
                  <div class="question-author-content">
                    <div class="question-author-content-name">
                      <a
                        href=""
                        v-text="
                          author.nickname == null
                            ? author.username
                            : author.nickname
                        "
                      ></a>
                    </div>
                    <div class="question-author-content-des">
                      <span
                        v-text="
                          author.sign == null
                            ? '这个人很懒，什么都没留下！'
                            : author.sign
                        "
                      ></span>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <!-- 回答问题的弹窗 -->
    <new-answer-dialog
      :createAnswerDialogVisiable="dialogVisiable"
      :qid="qid"
      :quid="quid"
    ></new-answer-dialog>
  </div>
</template>

<script>
import newAnswerDialog from "@/views/component/newAnswerDialog";
export default {
  components: { newAnswerDialog },
  name: "Question",
  data() {
    return {
      question: {},
      answers: [],
      author: {},
      avatar:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      dialogVisiable: false,
      // 用于传递信息
      qid: 0,
      quid: 0,
    };
  },
  created() {
    // 获取整个页面信息
    this.getPage();
  },
  computed: {},
  methods: {
    // 获取整个页面信息，因为有先后顺序，所以放在了同一个函数里
    getPage() {
      // 路由传递过来的参数：问题id
      let qid = this.$attrs.id;
      // 发送请求获取问题
      this.$http({
        url: this.$http.adornUrl(
          "http://zhizhi.com/blog/question/info?qid=" + qid
        ),
        method: "get",
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.question = data.question;
          this.getAuthor();
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 获取问题所属的作者信息
    getAuthor() {
      // 如果问题对应的键存在，说明问题已获取成功
      if (this.question.hasOwnProperty("uid")) {
        let uid = this.question.uid;
        // 发送请求获取作者信息
        this.$http({
          url: this.$http.adornUrl(
            "http://member.zhizhi.com/member/info?uid=" + uid
          ),
          method: "get",
        }).then(({ data }) => {
          if (data && data.code === 200) {
            this.author = data.member;
            this.getAnswers();
          } else {
            this.$message.error(data.msg);
          }
        });
      }
    },
    // 获取问题的所有回答
    getAnswers() {
      if (this.question.hasOwnProperty("id")) {
        let qid = this.question.id;
        // 发送请求获取作者信息
        this.$http({
          url: this.$http.adornUrl(
            "http://zhizhi.com/blog/answer/all?qid=" + qid
          ),
          method: "get",
        }).then(({ data }) => {
          if (data && data.code === 200) {
            this.answers = data.answers;
          } else {
            this.$message.error(data.msg);
          }
        });
      }
    },
    // 打开回答问题的弹窗
    openDialog() {
      this.dialogVisiable = true;
      this.qid = this.question.id;
      this.quid = this.question.uid;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.title-wrapper {
  margin-top: 60px;
  background-color: #ffffff;
  margin-bottom: 20px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
}
.title-box {
  margin: 0 auto;
  width: 1600px;
  padding: 20px 60px;
}
.title-content {
  width: 946.66px;
  margin-bottom: 10px;
  display: inline-block;
}
.content-box {
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 30px;
}
.page-view-box {
  display: inline-block;
  float: right;
}
.main-body {
  width: 1600px;
  margin: 0 auto;
  background-color: #f8f8f8;
  margin-top: 20px;
}
.main-left {
  padding: 0 20px;
}
ul {
  list-style: none;
}
.content-wrapper {
  padding: 20px;
  background-color: #ffffff;
  margin-bottom: 5px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
}
.li-author-info-box {
  height: 50px;
  margin: 5px 20px;
}
.author-avatar {
  height: 50px;
  width: 50px;
  float: left;
}
.author-content {
  margin-left: 10px;
  height: 50px;
  width: 200px;
  float: left;
}
.author-content-name {
  font-size: 15px;
  font-weight: 600;
}
.author-content-des {
  margin-top: 10px;
}
.li-content {
  font-size: 15px;
  margin: 0 20px;
  margin-top: 20px;
}
.content-img {
  position: relative;
  float: left;
  width: 320px;
  height: 180px;
  margin-right: 20px;
}
.content-text {
  font-size: 20px;
  line-height: 30px;
  min-height: 180px;
}
.content-footer {
  padding: 10px 20px;
  height: 60px;
}
.content-footer .footer-button {
  margin-left: 30px;
  color: #c0c0c0;
}
.text-time {
  float: right;
  color: #c0c0c0;
  line-height: 40px;
}
.main-right {
  width: 507.78px;
}
.question-author-box {
  padding: 20px 50px;
  background-color: #ffffff;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
}
.li-question-author-info-box {
  height: 80px;
  margin-top: 30px;
}
.question-author-avatar {
  height: 80px;
  width: 80px;
  float: left;
}
.question-author-content {
  margin-left: 15px;
  height: 80px;
  float: left;
}
.question-author-content-name {
  font-size: 25px;
  font-weight: 600;
}
.question-author-content-des {
  font-size: 15px;
  margin-top: 25px;
}
</style>