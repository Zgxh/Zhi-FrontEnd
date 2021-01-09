<template>
  <el-main>
    <div class="main-body">
      <el-row>
        <el-col :span="16">
          <div class="main-left">
            <!-- 展示本次检索的关键词 -->
            <div class="search-header">
              <span style="font-weight: 600"> 关键词： </span>
              <span v-text="keyword"></span>
            </div>
            <!-- 展示检索到的文章列表 -->
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
                        <el-button
                          type="text"
                          @click="changeToFalse(index)"
                          v-else
                        >
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
                        问题创建于 {{ item.createTime }}
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
            <div class="hot-search-box">
              <div class="hot-search-header">
                <h2>用户热门搜索</h2>
              </div>
              <ul>
                <li
                  v-for="item in hotSearchArticles"
                  :key="item"
                  class="hot-list"
                >
                  <a
                    :href="getHref(item)"
                    target="_blank"
                    v-text="item.title"
                  ></a>
                </li>
              </ul>
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
      articles: [], // 存放文章列表
      articlesIsUnfold: [],
      hotSearchArticles: [], // 存放热门搜索文章，最多十项
      keyword: "", // 从上层路由传递过来的搜索关键词
    };
  },
  created() {
    this.getSearchArticles();
    this.getHotSearchArticles();
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
    getSearchArticles() {
      this.keyword = this.$attrs.query;
      // 向后台发起模糊检索请求，关键词为 keyword
      this.articles = [
        {
          title: "任岩的秘密",
          description:
            "你可能无法想象，在这一年，美国的科技巨头到底有多“膨胀”。至少从苹果来看，2020年年初的时候，恐怕没人想象到今天。回想2019年末，苹果无法生产5G手机这一点，一度为人所“诟病”。这可能也是2019年年末之时，无论是行业从业者，还是果粉，讨论最多的话题。与之相对比的是，国产手机动作频频，利空苹果，包括2020年2月份OPPO宣布“马里亚纳”的自研芯片计划、小米10开售1分钟销售额就突破2亿元等等。另外，新冠肺炎疫情突然来袭，武汉进行封城。而在当时，苹果供应链中近50%的生产据点都在中国境内，而武汉又恰巧是苹果产业链中关键的一环。当时，苹果就下调了2020年第一季度iPhone的出货量，下调额大约为10%，换句话说，苹果2020年第一季度iPhone出货量将仅为3600万～4000万部。实际结果，苹果第一季度的出货量也确实如此。另外，苹果2020年年被各种官司缠身，负面新闻不止。6月16日，欧盟委员会宣布对苹果公司旗下的苹果应用商店和苹果支付展开反垄断调查；7月29日，苹果CEO库克、亚马逊CEO贝佐斯、Facebook CEO扎克伯格和谷歌CEO皮查伊参加国会听证会，在此之前，美国国会也发起反垄断调查，看看这些公司是否利用市场地位控制网络市场。而苹果同其他个体公司之间的纠纷，也从未停止。比如，2020年年3月的时候，乐天Kobo电子书就曾经向欧盟委员会投诉，苹果在Kobo在苹果App Store上发生的电子书交易抽成30%；8月13日，美国电子游戏公司EPIC向苹果公司发了一封律师函，并声称苹果在App Store上将《堡垒之夜》这款游戏非法屏蔽，还责令EPIC公司删除“向EPIC直接付款”功能，所以控诉苹果涉嫌反垄断。直到10月14日，2020年的新款苹果手机iPhone 12才姗姗来迟。不同于国产智能手机的低价，iPhone 12起步价都在6299元，至于所谓更低价的iPhone 12 mini，鲜有人问津。而更关键的问题在于，即使这款“补票”5G技术的iPhone更换了高通的基带，信号差的问题似乎仍然没有解决。兴冲冲抢了iPhone 12的消费者小杜对笔者吐槽表示：“本以为这次换了新基带，我就再也不用被手机信号差的问题所困扰，没成想，有的时候，还是得重启手机。”在这种情况下，iPhone 12发售不久，国内部分手机销售代理商的价格已经低于苹果的官方价格。然而，与这种不堪现况相对比的却是，截止到2020年，苹果公司年度涨幅达到82.31%，总市值接近2.3万亿美元，市盈率达到近41倍。而要知道的是，苹果在2019年之时股价年度涨幅也超过80%。不仅仅是苹果，其他美国科技公司同样涨幅巨大，亚马逊年涨76.25%，谷歌母公司Alphabet年涨30.85%，Facebook年涨33.09%，微软公司年涨42.53%。同样，微软、亚马逊和Alphabet市值都站上了万亿美元市值，分别达到了1.68万亿美元、1.63万亿美元和1.19万亿美元，而Facebook也达到了7780.4亿美元。更加让人瞠目结舌的是特斯拉，年内股价涨超730%。美国金融数据机构S3 Partners给出的数据显示，该股卖空者年内遭受的亏损超过380亿美元。特斯拉目前已经成为全球做空额最大的股票，排在第二的则就是苹果。可以回忆的是，在2020年上半年，浑水的一篇做空报告就可以让瑞幸咖啡一夜之间股价一度跌超26%，即使那是事实。但这么大的空头，却无法让美国科技巨头特斯拉和苹果倒下，这只能说明其背后的多头资本同样雄厚。那么，2021年美国科技股还能继续吗？",
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
    getHotSearchArticles() {
      // 发起请求，得到最热搜索的前十条记录
      this.hotSearchArticles = [
        { title: "推特永久停用特朗普账号", id: 1 },
        { title: "推特永久停用特朗普账号", id: 2 },
        { title: "推特永久停用特朗普账号", id: 3 },
        { title: "推特永久停用特朗普账号", id: 4 },
        { title: "推特永久停用特朗普账号", id: 5 },
        { title: "推特永久停用特朗普账号", id: 6 },
        { title: "推特永久停用特朗普账号", id: 7 },
        { title: "推特永久停用特朗普账号", id: 8 },
        { title: "推特永久停用特朗普账号", id: 9 },
        { title: "推特永久停用特朗普账号", id: 10 },
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
.main-body {
  width: 1600px;
  margin: 0 auto;
  background-color: #f8f8f8;
  margin-top: 60px;
}
.main-left {
  padding: 0 20px;
}
.search-header {
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  padding: 0 40px;
  font-size: 20px;
  line-height: 50px;
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
.main-right {
  width: 507.78px;
  position: fixed;
}
.hot-search-box {
  background-color: #ffffff;
  padding: 20px 50px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
}
.hot-search-header {
  height: 50px;
  line-height: 50px;
}
.hot-list {
  line-height: 30px;
  font-size: 17px;
}
</style>