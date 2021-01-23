<template>
  <div>
    <ul>
      <li v-for="(item, index) in articles" :key="item.id">
        <div class="content-wrapper">
          <!-- 标题部分 -->
          <h2 class="li-title">
            <a :href="getHref(item)" v-text="item.title + item.id"></a>
          </h2>
          <div class="li-content">
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
                <span v-text="getText(index, item)"></span>
                <!-- 查看全部/收起词条的文字按钮 -->
                <el-button
                  type="text"
                  @click="changeToTrue(index)"
                  v-if="!articlesIsUnfold[index]"
                >
                  <i class="el-icon-caret-bottom"></i>
                  查看全部</el-button
                >
                <el-button type="text" @click="changeToFalse(index)" v-else>
                  <i class="el-icon-caret-top"></i>
                  收起词条</el-button
                >
              </div>
            </div>
            <div class="content-footer">
              <span type="text" class="footer-button">
                <i class="el-icon-caret-top"></i>
                {{ item.thumbsUpCount }} 个 赞
              </span>
              <el-button type="text" class="footer-button">
                <i class="el-icon-edit"></i>
                {{ item.answersCount }} 个回答
              </el-button>
              <el-button type="text" class="footer-button">
                <i class="el-icon-chat-dot-round"></i>
                {{ item.commentsCount }} 条评论
              </el-button>
              <el-button
                type="text"
                @click="deleteQuestion(item.id)"
                style="margin-left: 300px"
              >
                删 除
              </el-button>
              <span class="text-time">
                问题创建于 {{ item.createTime.substring(0, 10) }}
              </span>
            </div>
          </div>
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
export default {
  name: "MyQuestions",
  data() {
    return {
      articles: [], // 存放文章列表
      page: 1,
      articlesIsUnfold: [],
      loading: false,
      noMore: false,
      dialogVisiable: false,
    };
  },
  created() {
    this.getMyQuestions();
  },
  computed: {
    // 根据展开状态决定显示的内容
    getText() {
      return (index, item) => {
        return this.articlesIsUnfold[index]
          ? item.content
          : item.content.substring(0, 100);
      };
    },
    // 根据 item 获取对应的 url
    getHref() {
      return (item) => {
        return "/question/" + item.id;
      };
    },
  },
  methods: {
    // 调整文章折叠状态
    changeToTrue(index) {
      this.$set(this.articlesIsUnfold, index, true);
    },
    changeToFalse(index) {
      this.$set(this.articlesIsUnfold, index, false);
    },
    // 获取新的文章列表
    getMyQuestions() {
      let uid = this.$attrs.uid;
      this.$http({
        url: this.$http.adornUrl("http://zhizhi.com/blog/question/list/user"),
        method: "get",
        params: {
          uid: uid,
          page: this.page,
          limit: 10,
        },
      }).then(({ data }) => {
        if (data && data.code === 200) {
          data.page.list.forEach((item) => {
            this.articles.push(item);
            this.articlesIsUnfold.push(false);
          });
          this.page++;
        } else {
          this.noMore = true;
          this.$message.error(data.msg);
        }
      });
    },
    deleteQuestion(id) {
      this.$confirm("此操作将删除该问题, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("http://zhizhi.com/blog/question/delete"),
            method: "delete",
            params: {
                id: id,
            },
          }).then(({ data }) => {
            if (data && data.code === 200) {
              // 成功弹窗提醒
              this.$message({ message: "问题删除成功", type: "success" });
              // 刷新页面
              this.$router.go(0);
            } else {
              this.$message.error(data.msg);
            }
          });
        });
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消删除",
        //   });
        // });
    },
    // 继续加载
    load() {
      this.loading = true;
      this.getMyQuestions();
      this.loading = false;
    },
    openDialog(item) {
      this.dialogVisiable = true;
      this.qid = item.id;
      this.quid = item.uid;
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