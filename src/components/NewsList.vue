<template>
    <div>
        <div class="news-top-title">
            <img class="news-top-icon" src="../assets/imgs/news-top-icon.png" alt="">
            <span class="news-top-text">彩票咨询</span>
        </div>
        <div class="news-bottom-content">
            <div class="news-list-tabs">
                <el-menu class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1" class="my_text_center" v-for="(item,index) in tabsLists" :key="index">
                        <span :class="{active:item.status}" class="menu-itme-text" @click="changeTabs(index)">{{item.tabs}}</span>
                        <span class="menu-itme-line"></span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="news-list-title-intro">
                <ul>
                    <li v-for="(item,index) in detailsLists" :key="index">
                        <div class="news-list-title">
                            <p>{{item.title}}</p>
                        </div>
                        <div class="news-list-time">
                            <p>
                                <span>{{item.origin}}</span>
                                <span>浏览次数：{{item.count}}</span>
                                <span>{{item.time}}</span>
                            </p>
                        </div>
                        <div class="news-list-intro">
                            <p v-html="item.content"></p>
                        </div>
                        <div class="news-list-all-btn my_text_right" @click="readAll(index)">
                            <span class="my_text_center">阅读全文</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="page-num my_text_center">
                <el-pagination background layout="prev, pager, next" :total="totalPage" prev-text="上一页" next-text="下一页" @current-change="currentChange" :page-size='5'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import DownloadIcon from "../components/DownloadIcon";

export default {
  components: {
    DownloadIcon
  },
  data() {
    return {
      tabsLists: {},
      detailsLists: [],
      currentPage: 1,
      totalPage: 10,
      tabsIndex: 0,
    };
  },
  mounted() {
    this.axios
      .all([this.getNews()])
      .then(
        this.axios.spread((newsData) => {
          if (newsData.data.status) {
            this.tabsLists = newsData.data.data;
            this.detailsLists = this.tabsLists[0].details;
          } else {
            console.log(newsData.data.message);
          }
        })
      )
      .catch(err => {
        console.log(error);
      });
  },
  methods: {
    changeTabs(index) {
      this.tabsIndex = index;
      this.tabsLists.forEach((ele, i) => {
        if (i === index) {
          ele.status = 1;
        } else {
          ele.status = 0;
        }
      });
      this.detailsLists = this.tabsLists[index].details;
    },
    readAll(index) {
    this.$emit('showContentFuc',this.detailsLists[index]);
    },
    currentChange(currentPage) {
      // this.axios
      //   .get("/user", {
      //     params: {
      //       currentPage: currentPage,
      //  tabsIndex:this.tabsIndex
      //     }
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    getNews() {
      return this.axios.get("../../static/data/news.json");
    },
  }
};
</script>


