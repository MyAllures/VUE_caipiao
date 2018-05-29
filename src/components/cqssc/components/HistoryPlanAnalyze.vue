<template>
  <el-row>
    <el-col :span="24">
      <ul class="one-level-ul">
        <li class="one-level-li" v-for="(item,index) in hisPlanAnaLists" :key="index" >
          <div class="hispa-his">
            <div class="hispa-icon-title">
              <img class="hispa-icon" :src="item.url" alt="">
              <span class="hispa-title">{{item.type}}</span>
              <div class="hispa-caidai my_text_center">
                <span>{{item.precision}}</span>
              </div>
            </div>
            <div class="hispa-lists my_text_center">
              <ul>
                <li :class="{active:eve.status}" v-for="(eve,i) in item.tablists" :key="i" @click="showData(index,i,eve.title)">{{eve.title}}</li>
              </ul>
            </div>
            <div class="cutting-line"></div>
          </div>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    hisPlanAnaLists: {
      type: Array
    }
  },
  data() {
    return {
      isActive:false,
      planIndex:0,
      analyzeIndex:0,
      historyIndex:0,
    };
  },
  // 在页面加载时改变第一个tab的状态
  watch:{
    hisPlanAnaLists(){
      this.hisPlanAnaLists[0].tablists[0].status = 1;
    }
  },
  methods: {
    showData(index, i,text) {
      switch (index) {
        case 0:
          this.hisPlanAnaLists[0].tablists.forEach((item,key)=>{
            if(key === i){
              item.status = 1;
            }
          })
          this.hisPlanAnaLists[1].tablists.forEach(item=>{
            item.status = 0;
          })
          this.hisPlanAnaLists[2].tablists.forEach(item=>{
            item.status = 0;
          })
          this.$emit('sendIndexToParentLotteryHis',i);
          break;
        case 1:
          this.hisPlanAnaLists[1].tablists.forEach((item,key)=>{
            if(key === i){
              item.status = 1;
            }else{
              item.status = 0;
            }
          })
          this.$emit('sendIndexToParentAnalyze',[i,text]);
          this.hisPlanAnaLists[0].tablists.forEach(item=>{
            item.status = 0;
          })
          this.hisPlanAnaLists[2].tablists.forEach(item=>{
            item.status = 0;
          })
          break;
        case 2:
          this.hisPlanAnaLists[2].tablists.forEach((item,key)=>{
            if(key === i){
              item.status = 1;
            }else{
              item.status = 0;
            }
          })
          this.hisPlanAnaLists[0].tablists.forEach(item=>{
            item.status = 0;
          })
          this.hisPlanAnaLists[1].tablists.forEach(item=>{
            item.status = 0;
          })
          this.$emit('sendIndexToParentForecastPlan',[i,text]);
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../../../assets/css/historyplananalyze.less);
</style>


