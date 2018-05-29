<template>
  <div class="container">
    <type-message></type-message>
    <history-plan-analyze :hisPlanAnaLists="sscHisLists" @sendIndexToParentLotteryHis="showHisTabsContent" @sendIndexToParentForecastPlan="getPlanClickObj" @sendIndexToParentAnalyze="showAnalyzeTableContent"></history-plan-analyze>
    <router-view :caizhongID="this.$route.params.caizhongID" :hisClickIndex="LLPageHisIndex" :planClickIndex="LLPagePlanIndex" :analyzeClickIndex="LLPageAnalyzeIndex"></router-view>
  </div>
</template>

<script>
import TypeMessage from "./components/TypeMessage";
import HistoryPlanAnalyze from "./components/HistoryPlanAnalyze";

export default {
  components: {
    TypeMessage,
    HistoryPlanAnalyze
  },
  data() {
    return {
      sscHisLists: [],
      LLPageHisIndex: null,
      LLPagePlanIndex: null,
      LLPageAnalyzeIndex: null
    };
  },
  mounted() {
    this.axios
      .all([this.getHisPAnalyze()])
      .then(
        this.axios.spread(hispalist => {
          if (hispalist.data.status) {
            this.sscHisLists = hispalist.data.data;
          } else {
            console.log(hispalist.data.message);
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getHisPAnalyze() {
      return this.axios.get(
        "/static/data/cqssc_history_plan_analyze.json?caizhongID=1"
      );
    },
    showHisTabsContent(data) {
      this.LLPageHisIndex = data;
      this.$router.push("/lotterylobby/1");
    },
    getPlanClickObj(data) {
      this.LLPagePlanIndex = data;
      this.$router.push("/lotterylobby/1/forecastplan");
    },
    showAnalyzeTableContent(data) {
      this.LLPageAnalyzeIndex = data;
      this.$router.push(`/lotterylobby/1/analyze/${data[0]}`);
    }
  }
};
</script>

<style lang="less">
@import url(../../assets/css/lotterylobby.less);
</style>

