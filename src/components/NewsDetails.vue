<template>
    <div>
        <div class="news-top-title news-goback" @click="gobackNewsTabs">
            <img class="news-top-icon" src="../assets/imgs/news-goback-icon.png" alt="">
            <span class="news-top-text">返回</span>
        </div>
        <div class="news-detais-content">
            <div class="news-details-title my_text_center">
                <p>{{newsContent.title}}</p>
            </div>
            <div class="news-details-time my_text_center">
                <span>{{newsContent.origin}}</span>
                <span>浏览次数：{{newsContent.count}}</span>
                <span>{{newsContent.time}}</span>
            </div>
            <div class="news-details-details">
                <p v-html="newsContent.content"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
    if (this.newsDetails) {
      this.newsContent = this.newsDetails;
    } else {
      this.newsDetailsID = this.$route.params.newsID;
      this.axios
        .get("../../static/data/news_details.json", {
          params: {
            ID: this.newsDetailsID
          }
        })
        .then(res => {
          if (res.data.status) {
            this.newsContent = res.data.data;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  props: {
    newsDetails: {
      type: Object
    }
  },
  data() {
    return {
      newsContent: {title:'',
        origin:'',
        content:''},
      newsDetailsID: null
    };
  },
  methods: {
    gobackNewsTabs() {}
  }
};
</script>

