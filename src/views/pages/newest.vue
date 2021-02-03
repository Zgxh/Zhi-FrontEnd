<template>
  <div>
    <ul>
      <li v-for="item in articles" :key="item.id">
        <div class="content-wrapper">
          <!-- 标题部分 -->
          <h2 class="li-title">
            <a :href="getHref(item)" v-text="item.title + item.id"></a>
          </h2>
          <!-- 内容 -->
          <div class="li-content">
            <!-- 内容主体 -->
            <div>
              <!-- 封面图片 -->
              <div class="content-img" v-if="item.coverImg">
                <el-image
                  fit="cover"
                  class="content-img"
                  :src="item.coverImg"
                ></el-image>
              </div>
              <!-- 文章内容部分 -->
              <div class="content-text">
                <!-- 根据展开状态决定显示的内容 -->
                <span v-text="getText(item)"></span>
                <!-- 查看全部/收起词条的文字按钮 -->
                <el-button
                  type="text"
                  @click="changeQuestionContentFoldStatus(item)"
                  v-if="item.questionContentIsfold"
                >
                  <i class="el-icon-caret-bottom"></i>
                  查看全部</el-button
                >
                <el-button
                  type="text"
                  @click="changeQuestionContentFoldStatus(item)"
                  v-else
                >
                  <i class="el-icon-caret-top"></i>
                  收起词条</el-button
                >
              </div>
            </div>
            <!-- 内容下方的操作栏 -->
            <div class="content-footer">
              <el-button type="primary" @click="thumbsUpQuestion(item)">
                <i class="el-icon-caret-top"></i>
                {{ item.thumbsUpCount }} 个赞
              </el-button>
              <el-button
                type="text"
                class="footer-button"
                @click="getQuestionComments(item)"
              >
                <i class="el-icon-chat-dot-round"></i>
                {{ item.commentsCount }} 条评论
              </el-button>
              <span class="text-time">
                问题创建于 {{ item.createTime.substring(0, 10) }}
              </span>
            </div>
          </div>
          <!-- 问题评论区卡片 -->
          <el-card class="box-card" v-if="!item.commentIsfold">
            <div slot="header" class="clearfix">
              <span style="color: #c0c0c0">
                共 {{ item.comments.content.length }} 条评论
              </span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="changeCommentsFoldStatus(item)"
                >收起评论</el-button
              >
            </div>
            <div>
              <div
                v-for="comment in getCurCommentPage(item.comments)"
                :key="comment.id"
                style="margin: 10px 10px"
              >
                <div style="font-weight: 700">用户 {{ comment.uid }} ：</div>
                <div style="margin: 5px 10px">{{ comment.content }}</div>
                <div style="float: right; color: #c0c0c0; margin-bottom: 10px">
                  评论于 {{ comment.createTime.substring(0, 10) }}
                </div>
              </div>
              <el-pagination
                layout="prev, pager, next"
                :page-size="commentPageSize"
                :total="item.comments.content.length"
                :current-page="item.comments.curPage"
                @current-change="changeCommentsPage($event, item.comments)"
              >
              </el-pagination>
            </div>
            <!-- 新建评论发布区 -->
            <el-form
              :inline="true"
              :model="newQuestionComment"
              :rules="newQuestionCommentRules"
              ref="newQuestionComment"
              style="margin-top: 30px"
            >
              <el-form-item>
                <el-input
                  v-model="newQuestionComment.content"
                  placeholder="在此写下你的评论"
                  style="width: 850px"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="postQuestionComment(item)"
                  >发布</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </li>
    </ul>
    <!-- 内容加载/是否还有更多内容提示模块 -->
    <div class="content-wrapper">
      <div class="li-content">
        <div class="content-text" style="min-height: 0px; text-align: center">
          <el-button type="text" v-if="!loading && !noMore" @click="load"
            >加载更多</el-button
          >
          <p v-if="loading && !noMore">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  thumbsUpQuestion,
  getQuestionComments,
  postQuestionComment,
} from "@/utils/util";

export default {
  name: "Newest",
  data() {
    return {
      articles: [], // 存放文章列表
      page: 1, // 当前文章列表的页标
      commentPageSize: 5, // 评论页的页容量
      loading: false,
      noMore: false,
      // 新建问题评论的表单
      newQuestionComment: {
        content: "",
      },
      // 新建问题评论的表单的验证规则
      newQuestionCommentRules: {
        content: [
          { required: true, message: "请填写评论内容", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getNewestArticles();
  },
  computed: {
    // 根据展开状态决定显示的内容
    getText() {
      return (item) => {
        return item.questionContentIsfold
          ? item.content.substring(0, 100)
          : item.content;
      };
    },
    // 根据 item 获取对应的 url
    getHref() {
      return (item) => {
        return "/question/" + item.id;
      };
    },
    // 当前登录的用户id
    uid: {
      get() {
        return this.$store.state.user.userId;
      },
    },
    // 评论区显示当前页内容
    getCurCommentPage() {
      return (comments) => {
        return comments.content.slice(
          (comments.curPage - 1) * this.commentPageSize,
          comments.curPage * this.commentPageSize
        );
      };
    },
  },
  methods: {
    // 改变问题内容区域的折叠状态
    changeQuestionContentFoldStatus(item) {
      item["questionContentIsfold"] = !item["questionContentIsfold"];
    },
    // 改变问题评论区的折叠状态
    changeCommentsFoldStatus(item) {
      item["commentIsfold"] = !item["commentIsfold"];
    },
    // 改变当前评论页的内容
    changeCommentsPage(page, comments) {
      comments.curPage = page;
    },
    // 获取新的文章列表
    getNewestArticles() {
      this.$http({
        url: this.$http.adornUrl("http://zhizhi.com/blog/question/list"),
        method: "get",
        params: {
          page: this.page,
          limit: 10,
        },
      }).then(({ data }) => {
        if (data && data.code === 200) {
          data.page.list.forEach((item) => {
            item["questionContentIsfold"] = true;
            item["commentIsfold"] = true;
            item["comments"] = {};
            item.comments["curPage"] = 1;
            item.comments["content"] = [];
            this.articles.push(item);
          });
          this.page++;
        } else {
          this.noMore = true;
          this.$message.error(data.msg);
        }
      });
    },
    // 继续加载
    load() {
      this.loading = true;
      this.getNewestArticles();
      this.loading = false;
    },
    // 点赞
    thumbsUpQuestion(item) {
      thumbsUpQuestion(item);
    },
    // 获取某问题的所有评论，并展开评论区
    getQuestionComments(item) {
      this.changeCommentsFoldStatus(item);
      getQuestionComments(item);
    },
    // 对某个问题发表新的评论
    postQuestionComment(item) {
      this.$refs["newQuestionComment"][0].validate((valid) => {
        if (valid) { // 首先过表单验证
          postQuestionComment(this.newQuestionComment, item, this.uid);
          this.changeCommentsFoldStatus(item);
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
ul {
  list-style: none;
}
.content-wrapper {
  padding: 20px;
  background-color: #ffffff;
  margin-bottom: 5px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
}
.li-title {
  height: 40px;
  line-height: 40px;
  font-size: 25px;
  font-weight: 600;
  margin: 5px 20px;
}
.li-content {
  font-size: 15px;
  margin: 0 20px;
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
</style>