<template>
  <div class="container">
    <type-message></type-message>
    <history-plan-analyze :hisPlanAnaLists="sscHisLists"></history-plan-analyze>
    <div class="live-area">
      <div class="live-area-title">
        <img class="zhibo-icon" src="../../assets/imgs/kaijiangzhibo-icon.png" alt="">
        <span class="zhobo-title-text">开奖直播</span>
      </div>
      <div class="live-area-video">
        <img src="../../assets/imgs/zhibo-area-pic.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import TypeMessage from "./components/TypeMessage";
import HistoryPlanAnalyze from "./components/HistoryPlanAnalyze";

export default {
  data(){
    return {
      sscHisLists:null
    }
  },
  components: {
    TypeMessage,
    HistoryPlanAnalyze
  },
  mounted(){
    this.axios.get('/static/data/cqssc_history_plan_analyze.json').then(res=>{
      if(res.data.status){
        this.sscHisLists = res.data.data
      }else{
        console.log(res.data.message);
      }
    }).catch(err=>{console.log(err)});
  }
};
</script>

<style lang="less" scoped>
@import url(../../assets/css/live.less);
</style>
