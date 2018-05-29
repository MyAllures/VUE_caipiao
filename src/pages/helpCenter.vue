<template>
  <el-row class="container">
    <el-col :span="6" class="left-menu">
      <ul class="one-level-menu">
        <li v-for="(item,index) in menuLists" :key="index" @click="showTwoLeverMenu(index)" :class="{active:index==nowIndex}" class="one-level-list">
          <div class="one-menu-title">
            <span>{{item.title}}</span>
            <img :src='item.status?arrowBottom:arrowRight' alt="向右箭头">
          </div>
          <div v-if="item.status" class="two-lever-menu">
            <ul>
              <li v-for="(item,i) in item.content" :key="i" @click.stop="showTwoLeverContent(i,index)" :class="{active:item.status}" class="two-menu-content">{{item.title}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </el-col>
    <el-col :span="18">
      <div v-html="rightContent" class="right-content"></div>
    </el-col>
  </el-row>
</template>

<script>
import Grayarrowright from "../assets/imgs/arrow-left-gray.png";
import Redarrowred from "../assets/imgs/arrow-bottom-red.png";

export default {
  data() {
    return {
      arrowRight: Grayarrowright,
      arrowBottom: Redarrowred,
      isActive: true,
      menuLists: [],
      nowIndex: 0,
      twoNowIndex: 0,
      rightContent: ""
    };
  },
  mounted() {
    this.axios.get("../../static/data/helppage.json")
    .then(res => {
      if (res.data.status == 1) {
        this.menuLists = res.data.data;
        this.rightContent = this.menuLists[0].content[0].content;
      } else {
        console.log(res.data.message);
      }
    })
    .catch(err=>{
      console.log(error)
    });
  },
  methods: {
    showTwoLeverMenu(index) {
      this.nowIndex = index;
      this.change2levelStatus(index, this.menuLists);
      //以下是一级列表无排他效果的代码
      // this.menuLists[index].status = !this.menuLists[index].status
      this.arrowState = Redarrowred;
    },
    showTwoLeverContent(i, index) {
      this.change2levelStatus(i, this.menuLists[index].content);
      this.rightContent = this.menuLists[index].content[i].content;
    },
    change2levelStatus(index, arrLists) {
      let state;
      arrLists.forEach((item, key) => {
        state = item.status;
        if (index === key) {
          item.status = !state;
        } else {
          item.status = false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/helpCenter.less);
</style>