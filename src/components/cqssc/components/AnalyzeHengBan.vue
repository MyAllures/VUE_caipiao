<template>
  <div class="container">
    <div class="analyze-main-content">
      <div class="ll-main-content-title">
        <div class="title-left">
          <img class="hengban-icon" src="../../../../static/imgs/analyze-hengban-icon.png" alt="">
          <span class="omit-text">横板走势</span>
        </div>
        <div class="title-right">
          <span class="query-area-input-outbox">统计
            <input v-model="queryNum" type="text" placeholder="30" class="query-area-input my_text_center">&nbsp;期</span>
          <button class="query-area-btn" @click="llQueryData">查询</button>
        </div>
      </div>
      <div class="hengban-table-area-table">
        <div class="table-tabs-outerbox">
          <span :class="{active:item.status}" class="table-tabs-item my_text_center" @click="changeHengBanBallTabs(index)" v-for="(item,index) in hengbanTotalData" :key="index">{{item.title}}</span>
        </div>
        <div id="myChart" :style="{width:'1100px',height:'400px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");

export default {
  data() {
    return {
      queryNum: 30,
      chartXData: [],
      chartYData: [],
      hengbanTotalData: []
    };
  },
  mounted() {
    this.axios
      .get("/static/data/analyze_hengban.json", {
        params: { caizhongID: this.$route.params.caizhongID, label: 3 }
      })
      .then(res => {
        if (res.data.status) {
          this.hengbanTotalData = res.data.data.trendList;
          this.hengbanTotalData[0].data.forEach(el => {
            this.chartXData.push(el.periods);
            this.chartYData.push(el.number);
          });
          this.drawLine();
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
    drawLine() {
      let chartsContainer = document.getElementById("myChart");
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(chartsContainer);
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          name: "期号",
          nameLocation: "middle",
          nameGap: "40",
          data: this.chartXData,
          axisLabel: {
            textStyle: {
              color: "#686868",
              fontSize: "11"
            },
            rotate: -45
          }
        },
        yAxis: {
          type: "value",
          name: "号\n码",
          nameLocation: "middle",
          nameGap: "40",
          nameRotate: 0,
          axisLabel: {
            interval:0
          },
          axisLabel: {
            textStyle: {
              color: "#686868",
              fontSize: "11"
            }
          },
          min:0,
          max:10,
          splitNumber:10
        },
        series: [
          {
            data: this.chartYData,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3A83D9",
                lineStyle: {
                  color: "#3A83D9"
                }
              }
            }
          }
        ],
        tooltip:{
          show:true,
        }
      });
    },
    changeHengBanBallTabs(index) {
      this.hengbanTotalData.forEach((el, i) => {
        if (i == index) {
          el.status = 1;
        } else {
          el.status = 0;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../../../assets/css/analyzehengban.less);
</style>


