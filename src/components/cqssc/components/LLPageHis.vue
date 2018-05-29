<template>
  <div class="lotterylobby-main-content">
    <div class="ll-main-content-title">
      <div class="query-area-line"></div>
      <span class="query-area-input-outbox">统计
        <input v-model="queryNum" type="text" placeholder="30" class="query-area-input my_text_center">&nbsp;期</span>
      <button class="query-area-btn" @click="llQueryData">查询</button>
    </div>
    <div class="ll-content-numstatistics">
      <div class="numstatistics-title-area">
        <span class="numstatistics-title-text">今日双面统计</span>
      </div>
      <div class="numstatistics-result-show">
        <div class="numstatistics-result-no">
          <his-num-table :tableData="numberStatisLists"></his-num-table>
        </div>
        <div class="numstatistics-result-ball">
          <his-ball-table :hisBallDataVar="parentHisBallData"></his-ball-table>
        </div>
      </div>
    </div>
    <div v-show="isChangLongLianKaiShow" class="ll-content-changlongliankai">
      <div class="changlongliankai-title-area">
        <span class="changlongliankai-title-text">{{lianKaiTiXingDataVar.title}}</span>
      </div>
      <div class="changlongliankai-result-show">
        <span class="changlongliankai-result-content" v-for="(item,index) in lianKaiTiXingDataVar.content" :key="index">{{item}}</span>
      </div>
    </div>
    <div v-show="isNumAnalyzeShow" class="ll-content-numanalyze">
      <div class="check-ball-number">
        <div class="numanalyze-title-area">
          <span class="numanalyze-title-text">{{numDataVar.title}}</span>
        </div>
        <div class="ball-number-lists">
          <span v-for="(item,index) in numDataVar.content" :key="index" @click="chooseBallNumFuc(index)" :class="{active:item.status}">{{item.content}}</span>
        </div>
      </div>
      <div class="check-bigsm-oddev">
        <div class="numanalyze-title-area">
          <span class="numanalyze-title-text">{{bigSmallEvenOddDataVar.title}}</span>
        </div>
        <div class="ball-number-lists bigsm-oddev-lists">
          <span v-for="(item,index) in bigSmallEvenOddDataVar.content" :key="index" :class="{active:item.status}" @click="chooseBigSmallEvenOddFuc(index)">{{item.content}}</span>
          <span class="special-span">还原</span>
        </div>
      </div>
    </div>
    <div class="ll-content-bottomTale">
      <his-page-bottom-table :hisBottomTableTotalData=LLBottomTableTotalData>
      </his-page-bottom-table>
    </div>
  </div>
</template>
<script>
import HisNumTable from "./HisNumTable";
import HisBallTable from "./HisBallTable";
import HisPageBottomTable from "./HisPageBottomTable";

export default {
  components: {
    HisNumTable,
    HisBallTable,
    HisPageBottomTable
  },
  props: {
    caizhongID: {
      type: Number
    },
    hisClickIndex: {
      type: Number
    }
  },
  mounted() {
    this.axios
      .all([
        this.getNumStatisList(),
        this.getHisBallData(),
        this.getHisBottomTableData()
      ])
      .then(
        this.axios.spread((numstatislist, hisballlist, hisbottomtable) => {
          if (
            numstatislist.data.status &&
            hisballlist.data.status &&
            hisbottomtable.data.status
          ) {
            this.numberStatisLists = numstatislist.data.data;
            this.parentHisBallData = hisballlist.data.data;
            this.LLBottomTableTotalData = hisbottomtable.data.data;
          } else {
            console.log(
              numstatislist.data.message,
              hisballlist.data.message,
              hisbottomtable.data.message
            );
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      queryNum: 30,
      numberStatisLists: [],
      isChangLongLianKaiShow: false,
      isNumAnalyzeShow: false,
      lianKaiTiXingDataVar: [],
      numBigSmallEvenOddDataVar: [],
      numDataVar: {},
      bigSmallEvenOddDataVar: {},
      parentHisBallData: [],
      LLBottomTableTotalData: []
    };
  },
  methods: {
    getNumStatisList() {
      return this.axios.get(
        "/static/data/cqssc_history_numstatistics.json",
        { params: { caizhongID: this.caizhongID } }
      );
    },
    getHisBallData() {
      return this.axios.get("/static/data/cqssc_history_balltable.json", {
        params: { caizhongID: this.caizhongID }
      });
    },
    getHisBottomTableData() {
      return this.axios.get("/static/data/llpage_bottom_table.json", {
        params: { caizhongID: this.caizhongID }
      });
    },
    llQueryData() {},
    chooseBallNumFuc(index){
      this.numDataVar.content.forEach((el,i)=>{
        if(index == i){
          el.status = 1;
        }
      });
      this.bigSmallEvenOddDataVar.content.forEach(el=>{
        el.status = 0;
      });
    },
    chooseBigSmallEvenOddFuc(index){
      this.bigSmallEvenOddDataVar.content.forEach((el,i)=>{
        if(index == i){
          el.status = 1;
        }else{
          el.status = 0;
        }
      });
      this.numDataVar.content.forEach(el=>{
        el.status = 0;
      });
    }
  },
  watch: {
    hisClickIndex() {
      if (this.hisClickIndex == 1) {
        this.isNumAnalyzeShow = true;
        this.axios
          .get("/static/data/cqssc_num_big_small_double.json", {
            params: {
              caizhongID: this.caizhongID
            }
          })
          .then(res => {
            if (res.data.status) {
              this.lianKaiTiXingDataVar = res.data.data;
            } else {
              console.log(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.hisClickIndex == 2) {
        this.isChangLongLianKaiShow = true;
        this.axios
          .get("/static/data/cqssc_liankai.json", {
            params: {
              caizhongID: this.caizhongID
            }
          })
          .then(res => {
            if (res.data.status) {
              this.numBigSmallEvenOddDataVar = res.data.data;
              this.numDataVar = this.numBigSmallEvenOddDataVar[0];
              this.bigSmallEvenOddDataVar = this.numBigSmallEvenOddDataVar[1];
            } else {
              console.log(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

