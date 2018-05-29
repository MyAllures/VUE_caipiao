<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <router-view @showContentFuc="sendContentToDetail" :newsDetails='newsContent'></router-view>
      </el-col>
      <el-col :span="8" class="right-download-icon-ad">
        <download-icon></download-icon>
        <div class="right-bottom-ad">
          <img :src="adUrl" alt="">
        </div>
      </el-col>
    </el-row>
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
      adUrl: "",
      newsContent:null,
    };
  },
  mounted() {
    this.axios
      .all([this.getAD()])
      .then(
        this.axios.spread((newsAD) => {
          if (newsAD.data.status) {
            this.adUrl = newsAD.data.data.url;
          } else {
            console.log(newsAD.data.message);
          }
        })
      )
      .catch(err => {
        console.log(error);
      });
  },
  methods: {
    getAD() {
      return this.axios.get("../../static/data/news_ad.json");
    },
    sendContentToDetail(data) {
      this.$router.push(`/news/${data.id}`);
      this.newsContent = data;
    }
  }
};
</script>

<style lang="less">
@import url(../assets/css/news.less);
</style>


