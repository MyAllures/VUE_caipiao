<template>
  <div class="my_text_center">
    <div class="table-header-box">
      <div class="table-header-title">{{tableHeaderTitleVar}}</div>
      <ul class="header-outer-ul">
        <li class="header-outer-li" v-for="(item,index) in tableHeaderContentVar" :key="index">
          <div class="header-li-header">{{item.subtitle}}</div>
          <ul class="header-inner-ul">
            <li class="header-inner-li" v-for="(item,index) in item.subcontent" :key="index">{{item}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="table-body-box">
      <div class="table-body-title">{{tableBodyTitleVar}}</div>
      <ul class="header-outer-ul">
        <li class="header-outer-li" v-for="(item,index) in tableBodyContentVar" :key="index">
          <ul class="header-inner-ul">
            <li class="header-inner-li" v-for="(elem,i) in item" :key="i">{{elem}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hisBallDataVar: {
      type: Array
    }
  },
  data() {
    return {
      tableHeaderData: null,
      tableBodyData: null,
      tableHeaderTitleVar:null,
      tableHeaderContentVar:[],
      tableBodyTitleVar:null,
      tableBodyContentVar:[]
    };
  },
  watch:{
    hisBallDataVar(){
      this.tableHeaderData = this.hisBallDataVar[0];
      this.tableBodyData = this.hisBallDataVar[1];
      this.tableHeaderTitleVar = this.tableHeaderData.title;
      this.tableHeaderContentVar = this.tableHeaderData.content;
      this.tableBodyTitleVar = this.tableBodyData.title;
      this.tableBodyContentVar= this.tableBodyData.content;
    }
  },
};
</script>

<style lang="less">
@import url(../../../assets/css/hisballtable.less);
</style>
