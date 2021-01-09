<template>
  <ul>
    <li v-for="(item, index) in articles" :key="item">
      <div class="content-wrapper">
        <!-- 标题部分 -->
        <h2 class="li-title">
          <a :href="getHref(item)" v-text="item.title"></a>
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
            <span class="text-time"> 问题创建于 {{ item.createTime }} </span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Hot",
  data() {
    return {
      articles: [], // 存放文章列表
      articlesIsUnfold: [],
    };
  },
  created() {
    this.getHotArticles();
  },
  computed: {
    // 根据展开状态决定显示的内容
    getText() {
      return (index, item) => {
        return this.articlesIsUnfold[index]
          ? item.description
          : item.description.substring(0, 100);
      };
    },
    // 根据 item 获取对应的 url
    getHref() {
      return (item) => {
        return "/article/" + item.id;
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
    // 获取最新的文章列表
    getHotArticles() {
      this.articles = [
        {
          title: "任岩的秘密",
          description:
            "1月8日，河北省政府新闻办召开河北省新冠肺炎疫情防控工作新闻发布会。河北省副省长徐建培通报最新疫情情况。从1月2日至8日10时，河北省共有本土确诊病例127例，其中石家庄118例，邢台9例。尚在医学观察的无症状感染者183例，其中石家庄177例，邢台6例。来源 北京日报客户端| 记者 李如意",
          coverImg:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE3KO7TRL7fGdcgjtFRjwRuNk7I63N8kpq9g&usqp=CAU",
          thumbsUpCount: 0,
          commentsCount: 0,
          createTime: "2020-1",
        },
        {
          title: "renyan!",
          description:
            "renyan shi handan ren.renyan shi handan ren. renyan shi handan ren. renyan shi handan ren. renyan shi handan ren. renyan shi handan ren.",
          coverImg: "",
          thumbsUpCount: 0,
          commentsCount: 0,
          createTime: "2020-1",
        },
        {
          title: "renyan!",
          description:
            "renyan shi handan ren.renyan shi handan ren. renyan shi handan ren. renyan shi handan ren. renyan shi handan ren. renyan shi handan ren.",
          coverImg:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE3KO7TRL7fGdcgjtFRjwRuNk7I63N8kpq9g&usqp=CAU",
          thumbsUpCount: 0,
          commentsCount: 0,
          createTime: "2020-1",
        },
        {
          title: "renyan!",
          description:
            "renyan shi handan ren.renyan shi handan ren. renyan shi handan ren. renyan shi handan ren. renyan shi handan ren. renyan shi handan ren.",
          coverImg:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE3KO7TRL7fGdcgjtFRjwRuNk7I63N8kpq9g&usqp=CAU",
          thumbsUpCount: 0,
          commentsCount: 0,
          createTime: "2020-1",
        },
      ];
      // this.getPageArticles(1); // 获取第一页最新的文章
      for (var i = 0; i < this.articles.length; i++) {
        this.articlesIsUnfold.push(false);
      }
    },
    // 按页获取文章
    getPageArticles(pageIndex) {
      this.$http({
        url: this.$http.adornUrl("http://zhizhi.com/blog/questions/get/all"),
        method: "get",
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.articles = data.data;
          this.isLogin = true;
        } else {
          this.$message.error(data.msg);
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
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1)
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