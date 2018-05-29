<template>
  <!-- `checked` 为 true 或 false -->
  <el-checkbox v-model="checked" @change="choosedCheckBox">我已年满18岁,已阅读并接受
    <span class="redColor">《服务协议》</span>
  </el-checkbox>
</template>
<script>
export default {
  data() {
    return {
      checked: false
    };
  },
  methods:{
    choosedCheckBox(){
      if(this.checked){
        this.$emit('checkBoxChecked');
      }
    }
  }
};
</script>

<style lang="less">
@import url(../assets/css/checkbox.less);
</style>
