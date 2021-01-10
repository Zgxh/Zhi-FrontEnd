<template>
  <el-main style="padding: 0 0">
    <div class="title-wrapper">
      <div class="title-box">
        <div class="title-content">
          <a href=""><h1 v-text="question.title"></h1></a>
        </div>
        <div class="page-view-box">
          <h3 style="color: #c0c0c0; line-height: 70px">
            浏览量：{{ question.viewCount }}
          </h3>
        </div>
        <div class="title-footer-tool">
          <el-button type="primary">
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
              <li v-for="item in answers" :key="item">
                <div class="content-wrapper">
                  <!-- 作者简介 -->
                  <div class="li-author-info-box">
                    <!-- 头像 -->
                    <div class="author-avatar">
                      <el-avatar
                        shape="square"
                        :size="48"
                        :src="item.author.avatar"
                      ></el-avatar>
                    </div>
                    <!-- 昵称 + 个性签名 -->
                    <div class="author-content">
                      <div class="author-content-name">
                        <a href="" v-text="item.author.nickName"></a>
                      </div>
                      <div class="author-content-des">
                        <span v-text="item.author.description"></span>
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
                        最后修改时间： {{ item.lastEditTime }}
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
                    :src="question.author.avatar"
                  ></el-avatar>
                </div>
                <!-- 昵称 + 个性签名 -->
                <div class="question-author-content">
                  <div class="question-author-content-name">
                    <a href="" v-text="question.author.nickName"></a>
                  </div>
                  <div class="question-author-content-des">
                    <span v-text="question.author.description"></span>
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
</template>

<script>
export default {
  name: "Question",
  data() {
    return {
      qid: 1,
      question: {},
      answers: [],
    };
  },
  created() {
    this.getQuestion();
    this.getAnswers();
  },
  computed: {},
  methods: {
    getQuestion() {
      this.qid = this.$attrs.id;
      // 发送请求获取问题
      this.question = {
        title: "推特永久停用特朗普账号",
        thumbsUpCount: 10,
        viewCount: 100,
        commentsCount: 200,
        author: {
          id: 1,
          avatar:
            "https://pic2.zhimg.com/80/v2-a781a0f9c3bddd77ea9c679c23cdfedc_720w.jpg?source=1940ef5c",
          nickName: "zgxh",
          description: "心之所愿，无所不成",
        },
      };
    },
    getAnswers() {
      // 发送请求获取所有的回答
      this.answers = [
        {
          id: 1,
          author: {
            avatar:
              "https://pic2.zhimg.com/80/v2-a781a0f9c3bddd77ea9c679c23cdfedc_720w.jpg?source=1940ef5c",
            nickName: "zgxh",
            description: "心之所愿，无所不成",
          },
          content:
            "Day1晚上10点，你和我说很困，要早点睡，于是我们互道了晚安，但睡不着的我发现你微信运动步数增加了832步，那个距离大概你宿舍到学校门口的单程距离。呵，男人，背着我深夜偷吃外卖。咒你长胖。但很快，我发现了问题。微信步数没有增加，你没回宿舍。咋的啦？手机掉外卖里了？很快，晚上11点，你的运动步数增加了107步，之后就再也没有增加。这说明你一宿没回学校。",
          lastEditTime: "2020-1-1",
          thumbsUpCount: 100,
          commentsCount: 200,
        },
        {
          id: 2,
          author: {
            avatar:
              "https://pic2.zhimg.com/80/v2-a781a0f9c3bddd77ea9c679c23cdfedc_720w.jpg?source=1940ef5c",
            nickName: "zgxh",
            description: "心之所愿，无所不成",
          },
          content:
            "Day2我一夜没睡着，过半个小时拿起手机再看看，屏幕上的数字明晃晃地躺在那里，一动不动，我觉得非常刺眼。挨到早上7点，我给你发了消息：“早呀亲爱的，你睡了9个小时了。”你没回我。我的头发丝开始绿了。8点左右，你的微信步数变成了1568步。你还是没回我消息。我的脸开始绿了。我打开手机相册，找到你的课表，发现你早上第一节有课。教学楼的位置和微信步数的变化能对得上。9点多，你终于回我消息了。“对不起宝宝，昨天太累了，差点睡过头，赶着上早课就没回你哦。",
          lastEditTime: "2020-1-1",
          thumbsUpCount: 100,
          commentsCount: 200,
        },
      ];
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
  margin-bottom: 50px;
  display: inline-block;
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