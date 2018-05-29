<template>
  <el-table :data="tableData" border style="width: 100%" :show-header=false>
    <el-table-column  prop="title" width="190px" align="center">
    </el-table-column>
    <el-table-column align="center">
      <template slot-scope="scope">
        <div class="number-show-outerBox">
        <span v-for="(item,index) in scope.row.content" :key="index" class="number-show">{{item}}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props:{
    tableData:{
      type:Array
    }
  }
};
</script>

<style lang="less">
@import url(../../../assets/css/hisnumtable.less);
</style>
