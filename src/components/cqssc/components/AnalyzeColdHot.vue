<template>
  <div class="container">
    <div class="analyze-main-content">
      <div class="ll-main-content-title">
        <img class="cold-hot-icon" src="../../../../static/imgs/analyze-cold-hot-icon.png" alt="">
        <span class="cold-hot-text">冷热分析</span>
      </div>
      <div class="analyze-cold-hot-table-area">
        <div class="cold-hot-table-area-title">
          <input type="checkbox" id="1" class="input-checkbox" v-model="isChecked" @change="clickCheckbox">
          <label for="1" class="checkbox-label">显示号码出现次数</label>
        </div>
        <div class="cold-hot-table-area-intro">
          <p>近20期内 热码：出现频繁、活跃的号码；冷码：出现频率低甚至没有出现的号码；温码：介于冷热之间的号码。</p>
        </div>
        <div class="cold-hot-table-area-table">
          <table>
            <thead>
              <tr>
                <td>{{coldHotTheadTotalListsVar.title}}</td>
                <td class="cold-hot-table-thead-td-other" v-for="(item,index) in coldHotTheadTotalListsVar.type" :key="index">{{item}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in coldHotTbodyTotalListsVar" :key="index">
                <td class="cold-hot-table-tbody-td-one">{{item.ballnum}}</td>
                <td class="cold-hot-table-tbody-td-other" v-for="(item,index) in item.result" :key="index">
                  <div class="cold-hot-num-outerbox" v-for="(e,i) in item" :key="i">
                    <span class="cold-hot-num">{{e.resnum}}</span>
                    <span v-show="isCheckedBox" class="cold-hot-badge">{{e.badge}}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coldHotTheadTotalListsVar: {},
      coldHotTbodyTotalListsVar: [],
      isCheckedBox:false,
      isChecked:false,
    };
  },
  mounted() {
    this.axios
      .get("/static/data/analyze_cold_hot.json", {
        params: { caizhongID: this.$route.params.caizhongID, label: 1 }
      })
      .then(res => {
        if (res.data.status) {
          this.coldHotTheadTotalListsVar = res.data.data[0];
          this.coldHotTbodyTotalListsVar = res.data.data[1];
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods:{
    clickCheckbox(){
      if(this.isChecked){
        this.isCheckedBox = true;
      }else{
        this.isCheckedBox = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../../../assets/css/analyzecoldhot.less);
</style>


