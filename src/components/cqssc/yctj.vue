<template>
  <div :style="'background-image:url('+bgUrl+')'" class="bgBox">
    <div class="container">
      <div class="forecom-top-header my_text_center">
        <div class="header-title">
          <div class="header-left-title">
            <p>距离048期开奖剩余</p>
          </div>
          <div class="header-right-title">
            <p>20180401-047期开奖号码</p>
          </div>
        </div>
        <div class="header-content">
          <div class="header-content-innerBox">
            <div class="header-left-content">
              <div class="left-content-text">
                <p>已推荐：
                  <span>47</span>期 | 今日剩余：
                  <span>73</span>期</p>
              </div>
              <CountDown></CountDown>
            </div>
            <div class="header-right-content">
              <span class="right-content-line"></span>
              <div class="right-content-winnum">
                <ul class="content-winnum-ul">
                  <li class="content-winnum-li">1</li>
                  <li class="content-winnum-li">2</li>
                  <li class="content-winnum-li">3</li>
                  <li class="content-winnum-li">4</li>
                  <li class="content-winnum-li">5</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="forecom-bottom-details">
        <div class="bottom-query-area">
          <div class="query-area-line"></div>
          <span class="query-area-input-outbox">统计
            <input v-model="queryNum" type="text" placeholder="30" class="query-area-input my_text_center">&nbsp;期</span>
          <button class="query-area-btn" @click="queryData">查询</button>
        </div>
        <div class="forecast-plan-title">
          <img class="forep-title-icon" :src="forePIcon" alt="">
          <span class="forep-title-title">{{forePText}}</span>
          <ul class="forep-title-ul">
            <li :class="{active:item.status}" class="forep-title-li my_text_center" v-for="(item,index) in forePTabList" :key="index" @click="tabsListChange(index)">{{item.title}}</li>
          </ul>
        </div>
        <div class="forecast-plan-line">
          <div class="line-innerBox"></div>
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
  </div>
</template>

<script>
import CountDown from "./components/CountDown";
import PlanTable from "./components/PlanTable";

export default {
  components: {
    CountDown,
    PlanTable
  },
  data() {
    return {
      bgUrl: "",
      parentTableLists: [],
      forePLists: [],
      forePIcon:'',
      forePText:'',
      forePTabList:[],
      queryNum:30,
    };
  },
  mounted() {
    this.axios
      .all([this.getBgImg(), this.getForePList(), this.getForePTableList()])
      .then(
        this.axios.spread((bgres, foreplistres, tablelistres) => {
          if (
            bgres.data.status &&
            foreplistres.data.status &&
            tablelistres.data.status
          ) {
            this.bgUrl = bgres.data.data.url;
            this.forePLists = foreplistres.data.data[2];
            this.parentTableLists = tablelistres.data.data;
            this.forePIcon = this.forePLists.url;
            this.forePText = this.forePLists.type;
            this.forePTabList = this.forePLists.tablists;
            this.forePTabList[0].status=1;
          }else{
            console.log(bgres.data.message,foreplistres.data.message,tablelistres.data.message)
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getBgImg() {
      return this.axios.get("/static/data/forecom_bg.json?caizhongID=1");
    },
    getForePList() {
      return this.axios.get(
        "/static/data/cqssc_history_plan_analyze.json?caizhongID=1"
      );
    },
    getForePTableList() {
      return this.axios.get("/static/data/cqssc_plan.json?caizhongID=1");
    },
    tabsListChange(index){
      this.forePTabList.forEach((item,key)=>{
            if(key === index){
              item.status = 1;
            }else{
              item.status = 0;
            }
          })
    },
    queryData(){
      this.axios.get("/static/data/cqssc_forecom_query.json?queryNum="+this.queryNum).then(res=>{
        if(res.data.status){
          this.parentTableLists = res.data.data;
        }else{
          console.log(res.data.message)
        }
      }).catch(err=>{console.log(err)});
    }
  }
};
</script>
<style lang="less">
@import url(../../assets/css/forecastrecommend.less);
</style>


