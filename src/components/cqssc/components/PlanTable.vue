<template>
  <el-table
    :data="tableLists"
    border
    style="width: 100%">
    <el-table-column
      prop="phasenum"
      label="期数"
      width='147px'
      align="center">
    </el-table-column>
    <el-table-column
      prop="numrecommend"
      label="号码推荐"
      width='199px'
      align="center">
    </el-table-column>
    <el-table-column
      label="验证结果"
      width='139px'
      align="center">
      <template slot-scope="scope" >
        <span :class="{veriresactive:scope.row.verifyresult==='中'}">{{scope.row.verifyresult}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="winningphasenum"
      label="中奖期数"
      width='139px'
      align="center">
    </el-table-column>
    <el-table-column label="开奖号码" align="center" width='347px'>
      <template slot-scope="scope" >
        <ul class="winNumUl">
          <li class="winNumLi" v-for="(item,index) in scope.row.winningnum" :key="index" :class="{winNumActive:item.status}">{{item.winno}}</li>
        </ul>
      </template>
    </el-table-column>
        <el-table-column
      prop="sortnum"
      label="排序"
      align="center">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data(){
      return{
        zhongJiangNum:[],
        verifyRes:""
      }
    },
    props:{
      tableLists:{
        type:Array
      }
    },
    created(){
      this.zhongJiangNum = this.tableLists;
    },
    methods:{
      filterHandler(value,row,column){
        this.verifyRes = row[column['property']]
        console.log(this.verifyRes);
      }
    }
  }
</script>

<style lang="less">
@import url(../../../assets/css/plantable.less);
</style>
