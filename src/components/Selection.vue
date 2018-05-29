<template>
  <el-select v-model="value" placeholder="选择一个密码找回问题" @change="optionChange">
    <el-option v-for="item in optionLists" :key="item.id" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  // props:{
  //   optionLists:{
  //     type:Array
  //   }
  // },
  data() {
    return {
      value: "",
      optionLists:[]
    };
  },
  methods:{
    optionChange(val){
      let valID;
      this.optionLists.forEach((el,i)=>{
        if(el.value === val){
          valID = el.id;
        }
      });
      this.$emit('pwdQuestionChange',valID);
    }
  },
  mounted(){
    this.axios
      .get("../../static/data/pwd_questions.json")
      .then(res => {
        if (res.data.status) {
          this.optionLists = res.data.data;
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less">
@import url(../assets/css/selection.less);
</style>
