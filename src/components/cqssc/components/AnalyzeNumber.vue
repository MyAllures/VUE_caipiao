<template>
  <div class="container">
    <div class="analyze-main-content">
      <div class="ll-main-content-title">
        <div class="title-left">
          <img class="num-icon" src="../../../../static/imgs/analyze-num-icon.png" alt="">
          <span>号码统计</span>
        </div>
        <div class="title-right">
          <span class="query-area-input-outbox">统计
            <input v-model="queryNum" type="text" placeholder="30" class="query-area-input my_text_center">&nbsp;期</span>
          <button class="query-area-btn" @click="llQueryData">查询</button>
        </div>
      </div>
      <div class="analyze-number-table">
        <table>
          <thead>
            <tr class="thead-one-tr">
              <th rowspan="2" class="one-tr-one-th">{{theadListsVar.title}}</th>
              <th colspan="2" v-for="(item,index) in theadLableListsVar" :key="index">{{item}}</th>
            </tr>
            <tr class="thead-two-tr">
              <th v-for="(item,index) in theadTypeListsVar" :key="index">{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tbodyListsVar" :key="index">
              <td v-for="(item,index) in item" :key="index">{{item}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    analyzeClickIndex:{
      
    }
  },
  data() {
    return {
      queryNum: 30,
      theadListsVar: {},
      tbodyListsVar: {},
      theadLableListsVar: [],
      theadTypeListsVar: []
    };
  },
  mounted() {
    this.axios
      .get("/static/data/analyze_number.json", {
        params: { caizhongID: Number(this.$route.params.caizhongID),label:0 }
      })
      .then(res => {
        if (res.data.status) {
          this.theadListsVar = res.data.data[0];
          this.tbodyListsVar = res.data.data[1];
          this.theadListsVar.content.forEach(elem => {
            this.theadLableListsVar.push(elem.label);
            elem.type.forEach(el => {
              this.theadTypeListsVar.push(el);
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
    llQueryData() {}
  }
};
</script>

<style lang="less" scoped>
@import url(../../../assets/css/analyzenumber.less);
</style>


