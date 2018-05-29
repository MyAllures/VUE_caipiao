<template>
  <el-carousel height="432px">
    <el-carousel-item v-for="(item,index) in slidePics" :key="index" @click.native="toNewsDetails(index)">
      <img :src="item.url" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props:{
    slidePics:{
      type:Array
    }
  },
  data(){
    return {
      toNewsId:null
    }
  },
  methods:{
    toNewsDetails(index){
      this.toNewsId = this.slidePics[index].id;
      this.$router.push(`/news/${this.toNewsId}`);      
    }
  }
}
</script>

<style lang="less">
@import url(../assets/css/slide.less);
</style>
