<template>
  <div class="container">
    <div class="plan-details-outerbox">
      <div class="plan-details-header">
        <div class="header-icon-title">
          <img class="header-icon" :src="planTitleLists.url" alt="">
          <span class="header-title">{{clickLabel}}</span>
        </div>
        <div class="header-right-sunheading">
          <p>
            <span>{{planTitleLists.phasenum}}</span>&nbsp;期&nbsp;{{clickLabel}}&nbsp;【
            <span>{{planTitleLists.numrecommend}}</span>】&nbsp;第&nbsp;
            <span>{{planTitleLists.nowphasenum}}</span>&nbsp;期&nbsp;等待&nbsp;
            <span>{{planTitleLists.waitphasenum}}</span>&nbsp;期</p>
        </div>
      </div>
      <div class="plan-details-table">
        <div class="plan-details-intro">
          <p>说明：我们
            <span>3期一个计划</span>，计划中奖则更新计划，3期不中也更新计划；网页自动更新计划，用户无需手动刷新。</p>
        </div>
        <PlanTable :tableLists="parentTableLists"></PlanTable>
      </div>
    </div>
  </div>
</template>

<script>
import PlanTable from "./PlanTable";

export default {
  components: {
    PlanTable
  },
  props:{
    caizhongID:{
      type:Number
    },
    planClickIndex:{
      type:Array
    }
  },
  data() {
    return {
      sscHisLists: [],
      clickLabel: "个位计划",
      parentTableLists: [],
      planTitleLists:{},
      labelID:null,
    };
  },
  mounted() {
    this.axios
      .all([ this.getPlanDefault()])
      .then(
        this.axios.spread((planLists) => {
          if (planLists.data.status) {
            this.planTitleLists = planLists.data;
            this.parentTableLists = planLists.data.data;
          } else {
            console.log(planLists.data.message);
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
  },
  watch:{
    planClickIndex(){
      this.labelID = this.planClickIndex[0];
      this.clickLabel = this.planClickIndex[1];
      this.axios
        .get("/static/data/cqssc_plan.json", {
          params: {
            caizhongID: this.caizhongID,
            labelID: this.labelID
          }
        })
        .then(res => {
          if (res.data.status) {
            this.parentTableLists = res.data.data;
            this.planTitleLists = res.data;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    getPlanDefault() {
      return this.axios.get("/static/data/cqssc_plan.json",{ params: { caizhongID: this.caizhongID,labelID:0 } });//labelID是用户具体点击的哪个标签的ID
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../../../assets/css/forecastplan.less);
</style>

