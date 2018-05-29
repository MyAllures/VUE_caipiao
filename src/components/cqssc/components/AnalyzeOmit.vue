<template>
  <div class="container">
    <div class="analyze-main-content">
      <div class="ll-main-content-title">
        <div class="title-left">
          <img class="omit-icon" src="../../../../static/imgs/analyze-omit-icon.png" alt="">
          <span class="omit-text">遗漏分析</span>
        </div>
        <div class="title-right">
          <span class="query-area-input-outbox">统计
            <input v-model="queryNum" type="text" placeholder="30" class="query-area-input my_text_center">&nbsp;期</span>
          <button class="query-area-btn" @click="llQueryData">查询</button>
        </div>
      </div>
      <div class="omit-table-area-intro">
        <p>说明：遗漏与长龙是相反的一对属性。连续遗漏N期，指一段时间内，某形态（大、小、单、双、龙、虎）连续N期未出现；遗漏大数据统计号码 大小、单双、龙虎“连续遗漏N期”的出现次数。</p>
      </div>
      <div class="omit-table-area-table">
        <div class="table-tabs-outerbox">
          <span class="table-tabs-item my_text_center" v-for="(item,index) in omitBallNumTabListsVar" :key="index" :class="{active:item.status}" @click="changeOmitBallNum(index)">{{item.ballnum}}</span>
        </div>
        <table>
          <thead>
            <tr class="omit-table-thead-one-tr">
              <td colspan="2" v-for="(item,index) in omitTheadOneRowArr" :key="index">{{item}}</td>
            </tr>
            <tr class="omit-table-thead-two-tr">
              <td v-for="(item,index) in omitTheadTwoRowArr" :key="index">{{item}}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in omitTbodyListsVar" :key="index">
              <td v-for="(e,i) in item" :key="i">{{e}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryNum: 30,
      omitTheadListsVar: {},
      omitTbodyListsVar: [],
      omitBallNumTabListsVar: [],
      omitTheadOneRowArr: [],
      omitTheadTwoRowArr: []
    };
  },
  mounted() {
    this.axios
      .get("/static/data/analyze_omit.json", {
        params: { caizhongID: this.$route.params.caizhongID, label: 2 }
      })
      .then(res => {
        if (res.data.status) {
          this.omitBallNumTabListsVar = res.data.data[0];
          this.omitTheadListsVar = res.data.data[1].content;
          this.omitTbodyListsVar = res.data.data[2];
          this.omitTheadListsVar.forEach(el => {
            this.omitTheadOneRowArr.push(el.label);
            el.type.forEach(e => {
              this.omitTheadTwoRowArr.push(e);
            });
          });
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    llQueryData() {},
    changeOmitBallNum(index) {
      this.omitBallNumTabListsVar.forEach((el, i) => {
        if (index == i) {
          el.status = 1;
          this.axios.get().then().catch(err=>{
            console.log(err);
          });
        } else {
          el.status = 0;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../../../assets/css/analyzeomit.less);
</style>


