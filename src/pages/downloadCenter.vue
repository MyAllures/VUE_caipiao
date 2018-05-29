<template>
  <div class="outer-box">
    <div class="container">
      <div class="downloadC-title my_text_center">
        <p>专注彩票&nbsp;&nbsp;服务彩民</p>
      </div>
      <div class="downloadC-clickbtn">
        <div class="clickbtn-ios" @click="clickIOS('ios')">
          <img class="clickbtn-icon" src="../assets/imgs/download-ios-icon.png" alt="">
          <span class="clickbtn-text">iPhone下载</span>
        </div>
        <div class="clickbtn-android" @click="clickAndroid('android')">
          <img class="clickbtn-icon" src="../assets/imgs/download-android-icon.png" alt="">
          <span class="clickbtn-text">Android下载</span>
        </div>
        <div class="clickbtn-pc" @click="clickPC('pc')">
          <img class="clickbtn-icon" src="../assets/imgs/download-pc-icon.png" alt="">
          <span class="clickbtn-text">客户端下载</span>
        </div>
      </div>
      <div class="downloadC-erweima">
        <div class="erweima-bg my_text_center">
          <img class="erweima" :src='erweimaUrl' alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      erweimaUrl: "",
      erweimaArr: []
    };
  },
  mounted() {
    this.axios
      .get("../../static/data/download_erweima.json")
      .then(res => {
        if (res.data.status) {
          this.erweimaArr = res.data.data;
          this.erweimaUrl = this.erweimaArr.ios;
        }else{
          console.log(res.data.message);
        }
        // console.log(this.erweimaUrl);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    clickErweima(type) {
      this.erweimaUrl = this.erweimaArr[type];
    },
    clickIOS(ios) {
      this.clickErweima(ios);
    },
    clickAndroid(android) {
      this.clickErweima(android);
    },
    clickPC(pc) {
      this.clickErweima(pc);
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/downloadcenter.less);
</style>


