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
              <el-button type="primary">
                <i class="el-icon-caret-top"></i>
                {{ item.thumbsUpCount }} 个赞
              </el-button>
              <el-button type="text" class="footer-button">
                <i class="el-icon-chat-dot-round"></i>
                {{ item.commentsCount }} 条评论
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
          <el-button type="text" v-if="!loading && !noMore" @click="load">加载更多</el-button>
          <p v-if="loading && !noMore">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Newest",
  data() {
    return {
      articles: [], // 存放文章列表
      page: 1,
      articlesIsUnfold: [],
      loading: false,
      noMore: false,
    };
  },
  created() {
    this.getNewestArticles();
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
    getNewestArticles() {
      let params = "page=" + this.page + "&limit=" + 10;
      this.$http({
        url: this.$http.adornUrl(
          "http://zhizhi.com/blog/question/list?" + params
        ),
        method: "get",
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
    // 继续加载
    load() {
      this.loading = true;
      this.getNewestArticles();
      this.loading = false;
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