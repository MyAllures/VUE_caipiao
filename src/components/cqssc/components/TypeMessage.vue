<template>
  <el-row class="out-el-row">
    <el-col :span="19">
      <div class="typemsg-left">
        <el-row>
          <el-col :span="3">
            <img class="shishicai-icon" src="../../../assets/imgs/shishicai-icon.png" alt="">
          </el-col>
          <el-col :span="10">
            <div class="typemsg-name-lucynum">
              <div class="typemsg-type-name">
                <p>
                  <span class="type-name">重庆时时彩</span>
                  <span class="
                red-color">23</span>期&nbsp;&nbsp;每日&nbsp;
                  <span class="
                red-color">120</span>期&nbsp;&nbsp;今日剩余&nbsp;
                  <span class="
                red-color">97</span>期</p>
              </div>
              <div class="typemsg-luck-num my_text_center">
                <ul>
                  <li>5</li>
                  <li>5</li>
                  <li>5</li>
                  <li>5</li>
                  <li>5</li>
                </ul>
              </div>
              <div class="typemsg-help">
                <img class="email-icon" src="../../../assets/imgs/email.png" alt="">
                <span class="help-text">新手必看：
                  <router-link to="/helpCenter" class="how-play red-color">怎么玩？</router-link>
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="cutting-line"></div>
          </el-col>
          <el-col :span="10">
            <div class="count-down">
              <div class="count-down-text">
                <p>距&nbsp;
                  <span class="
                red-color">24</span>&nbsp;期开奖剩</p>
              </div>
              <count-down></count-down>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="typemsg-right">
        <div class="zhibo-bg-pic" @mouseover.stop="showPlay" @mouseout.stop="hiddenPlay">
          <router-link :to="{ name: 'live', params: { caizhongId: 1}}">
            <img v-show="isInPic" class="zhibo-play-pic" src="../../../assets/imgs/play-icon.png" alt="" @mouseover.stop="showPlay" @mouseout.stop="hiddenPlay">
          </router-link>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountDown from "./CountDown";

export default {
  components: {
    CountDown
  },
  data() {
    return {
      isInPic: false
    };
  },
  methods: {
    showPlay() {
      this.isInPic = true;
    },
    hiddenPlay() {
      this.isInPic = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../../../assets/css/typemessage.less);
</style>


