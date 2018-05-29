<template>
  <div>
    <div class="banner">
      <slide :slidePics="parentSlidePics"></slide>
      <div class="login-position-outerbox">
        <div class="login-box" v-show="isLogin">
          <div class="login-top-login">
            <div class="login-title">
              <span>账号登录</span>
            </div>
            <div class="login-input-box">
              <div class="icon-box my_text_center">
                <img src="../assets/imgs/register-phone-icon.png" alt="">
              </div>
              <input v-model.lazy="phoneNum" class="login-input-input" type="text" placeholder="请输入你的手机号/用户名" @change="phoneChange">
            </div>
            <span v-show="phoneErrWarn" class="warning-text">电话号码或用户名格式错误，请重新输入</span>
            <div class="login-input-box">
              <div class="icon-box my_text_center">
                <img src="../assets/imgs/register-pwd-icon.png" alt="">
              </div>
              <input class="login-input-input" type="text" placeholder="请输入你的密码" v-model.lazy="userPwd" @change="pwdChange">
            </div>
            <span v-show="pwdErrWarn" class="warning-text">密码错误，请重新输入</span>
            <div class="login-btn my_text_center" @click="userLogin">
              <span>登录</span>
            </div>
            <span v-show="pwdPhoneErrWarn" class="warning-text">账号或密码错误</span>
          </div>
          <div class="login-bottom-register">
            <router-link to="/registerCenter" class="special-color">免费注册</router-link>
            <router-link to="/findPwd">忘记密码</router-link>
          </div>
        </div>
        <div class="haslogin-box my_text_center" v-show="isHasLogin">
          <div class="avatar-box">
            <img :src="avatarUrl" alt="">
          </div>
          <div class="welcome-text">
            <span>欢迎回来，{{userName}}</span>
          </div>
          <div class="logout-btn" @click="logoutUser">
            <span>退出</span>
          </div>
          <div class="toUserCenter-btn">
            <router-link :to="{ name: 'userCenter', params: {userId: userName}}" class="font-color">个人主页</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="hot-high-low-area">
        <el-row :gutter="3">
          <el-col :span="16">
            <div class="hot-high-low-area-left">
              <div class="hot-high-low-title">
                <div :class="{active:isHotChoosed}" class="hot-low-high-public" @click="hotChoosedFuc">
                  <img class="title-icon" :src="hotIconVar" alt="">
                  <span class="title-text">热门彩</span>
                </div>
                <div :class="{active:isHighChoosed}" class="hot-low-high-public" @click="highChoosedFuc">
                  <img class="title-icon" :src="highIconVar" alt="">
                  <span class="title-text">高频彩</span>
                </div>
                <div :class="{active:isLowChoosed}" class="hot-low-high-public" @click="lowChoosedFuc">
                  <img class="title-icon" :src="lowIconVar" alt="">
                  <span class="title-text">低频彩</span>
                </div>
              </div>
              <div class="hot-high-low-content">
                <ul>
                  <li v-show="isCQsscOne" class="content-list-li">
                    <div class="content-list-li-header">
                      <div class="lottery-his-message">
                        <div class="lottery-msg-icon">
                          <img :src="cqsscForContent.url" alt="">
                        </div>
                        <div class="lottery-msg-detail">
                          <div class="lottery-msg-phasenum">
                            <span>{{cqsscForContent.lotteryName}}</span>
                            <span>{{cqsscForContent.periodsNum}}</span>
                            <span>{{cqsscForContent.time}}</span>
                          </div>
                          <div class="lottery-msg-lucknum">
                            <span class="ssc-lucknum" v-for="item in cqsscForContent.winningNum" :key="item">{{item}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="countdown-live">
                        <span class="countdown-text">开奖倒计：</span>
                        <count-down></count-down>
                        <router-link :to="{ name: 'live', params: { caizhongId: caizhongID}}" class="lottery-to-live my_text_center">开奖直播</router-link>
                      </div>
                    </div>
                    <div class="content-list-li-table my_text_center">
                      <ul class="li-table-out-ul">
                        <li class="li-table-out-li" v-for="(e,i) in cqsscForContent.tableData" :key="i">
                          <div class="li-table-table-header">{{e.title}}</div>
                          <ul class="li-table-inner-ul">
                            <li class="li-table-inner-li" v-for="el in e.details" :key="el">{{el}}</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div class="content-list-li-bottom">
                      <div class="list-li-bottom-line">
                        <div class="bottom-line-one"></div>
                        <div class="bottom-line-two"></div>
                      </div>
                      <div class="list-li-bottom-alink">
                        <span class="alink-btn" v-for="(item,index) in cqsscForContent.toPageUrl" :key="index" :class="{active:item.status}" @click="sschotHighLowToPagesFuc(index)">{{item.name}}</span>
                      </div>
                    </div>
                  </li>
                  <li v-show="isCQsscTwo" class="content-list-li">
                    <div class="content-list-li-header">
                      <div class="lottery-his-message">
                        <div class="lottery-msg-icon">
                          <img :src="cqsscForContent.url" alt="">
                        </div>
                        <div class="lottery-msg-detail">
                          <div class="lottery-msg-phasenum">
                            <span>{{cqsscForContent.lotteryName}}</span>
                            <span>{{cqsscForContent.periodsNum}}</span>
                            <span>{{cqsscForContent.time}}</span>
                          </div>
                          <div class="lottery-msg-lucknum">
                            <span class="ssc-lucknum" v-for="item in cqsscForContent.winningNum" :key="item">{{item}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="countdown-live">
                        <span class="countdown-text">开奖倒计：</span>
                        <count-down></count-down>
                        <router-link :to="{ name: 'live', params: { caizhongId: caizhongID}}" class="lottery-to-live my_text_center">开奖直播</router-link>
                      </div>
                    </div>
                    <div class="content-list-li-table my_text_center">
                      <ul class="li-table-out-ul">
                        <li class="li-table-out-li" v-for="(e,i) in cqsscForContent.tableData" :key="i">
                          <div class="li-table-table-header">{{e.title}}</div>
                          <ul class="li-table-inner-ul">
                            <li class="li-table-inner-li" v-for="el in e.details" :key="el">{{el}}</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div class="content-list-li-bottom">
                      <div class="list-li-bottom-line">
                        <div class="bottom-line-one"></div>
                        <div class="bottom-line-two"></div>
                      </div>
                      <div class="list-li-bottom-alink">
                        <span class="alink-btn" v-for="(item,index) in cqsscForContent.toPageUrl" :key="index" :class="{active:item.status}" @click="sschotHighLowToPagesFuc(index)">{{item.name}}</span>
                      </div>
                    </div>
                  </li>
                  <li v-show="isJiaNaDaOne" class="content-list-li">
                    <div class="content-list-li-header">
                      <div class="lottery-his-message">
                        <div class="lottery-msg-icon">
                          <img :src="jianadaForContent.url" alt="">
                        </div>
                        <div class="lottery-msg-detail">
                          <div class="lottery-msg-phasenum">
                            <span>{{jianadaForContent.lotteryName}}</span>
                            <span>{{jianadaForContent.periodsNum}}</span>
                            <span>{{jianadaForContent.time}}</span>
                          </div>
                          <div class="lottery-msg-lucknum  jianada-msg-lucknum">
                            <span class="lucknum-item">{{jiaNaDaWinningNum1}}</span>
                            <span class="jianada-symbol">+</span>
                            <span class="lucknum-item">{{jiaNaDaWinningNum2}}</span>
                            <span class="jianada-symbol">+</span>
                            <span class="lucknum-item">{{jiaNaDaWinningNum3}}</span>
                            <span class="jianada-symbol">=</span>
                            <span class="lucknum-res">{{jiaNaDaWinningNum4}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="countdown-live">
                        <span class="countdown-text">开奖倒计：</span>
                        <count-down></count-down>
                        <router-link :to="{ name: 'live', params: { caizhongId: caizhongID}}" class="lottery-to-live my_text_center">开奖直播</router-link>
                      </div>
                    </div>
                    <div class="content-list-li-table my_text_center">
                      <ul class="li-table-out-ul">
                        <li class="li-table-out-li" v-for="(e,i) in jianadaForContent.tableData" :key="i">
                          <div class="li-table-table-header">{{e.title}}</div>
                          <ul class="li-table-inner-ul">
                            <li class="li-table-inner-li" v-for="el in e.details" :key="el">{{el}}</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div class="content-list-li-bottom">
                      <div class="list-li-bottom-line">
                        <div class="bottom-line-one"></div>
                        <div class="bottom-line-two"></div>
                      </div>
                      <div class="list-li-bottom-alink">
                        <span class="alink-btn" v-for="(item,index) in jianadaForContent.toPageUrl" :key="index" :class="{active:item.status}" @click="jndhotHighLowToPagesFuc(index)">{{item.name}}</span>
                      </div>
                    </div>
                  </li>
                  <li v-show="isJiaNaDaTwo" class="content-list-li">
                    <div class="content-list-li-header">
                      <div class="lottery-his-message">
                        <div class="lottery-msg-icon">
                          <img :src="jianadaForContent.url" alt="">
                        </div>
                        <div class="lottery-msg-detail">
                          <div class="lottery-msg-phasenum">
                            <span>{{jianadaForContent.lotteryName}}</span>
                            <span>{{jianadaForContent.periodsNum}}</span>
                            <span>{{jianadaForContent.time}}</span>
                          </div>
                          <div class="lottery-msg-lucknum  jianada-msg-lucknum">
                            <span class="lucknum-item">{{jiaNaDaWinningNum1}}</span>
                            <span class="jianada-symbol">+</span>
                            <span class="lucknum-item">{{jiaNaDaWinningNum2}}</span>
                            <span class="jianada-symbol">+</span>
                            <span class="lucknum-item">{{jiaNaDaWinningNum3}}</span>
                            <span class="jianada-symbol">=</span>
                            <span class="lucknum-res">{{jiaNaDaWinningNum4}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="countdown-live">
                        <span class="countdown-text">开奖倒计：</span>
                        <count-down></count-down>
                        <router-link :to="{ name: 'live', params: { caizhongId: caizhongID}}" class="lottery-to-live my_text_center">开奖直播</router-link>
                      </div>
                    </div>
                    <div class="content-list-li-table my_text_center">
                      <ul class="li-table-out-ul">
                        <li class="li-table-out-li" v-for="(e,i) in jianadaForContent.tableData" :key="i">
                          <div class="li-table-table-header">{{e.title}}</div>
                          <ul class="li-table-inner-ul">
                            <li class="li-table-inner-li" v-for="el in e.details" :key="el">{{el}}</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div class="content-list-li-bottom">
                      <div class="list-li-bottom-line">
                        <div class="bottom-line-one"></div>
                        <div class="bottom-line-two"></div>
                      </div>
                      <div class="list-li-bottom-alink">
                        <span class="alink-btn" v-for="(item,index) in jianadaForContent.toPageUrl" :key="index" :class="{active:item.status}" @click="jndhotHighLowToPagesFuc(index)">{{item.name}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="hot-high-low-area-right">
              <download-icon></download-icon>
              <div class="right-news-lists">
                <div class="news-lists-title">
                  <div class="news-lists-title-left">
                    <span class="title-left-bigfont">彩票资讯</span>
                    <span class="title-left-smallfont">/&nbsp;Lottery information</span>
                  </div>
                  <div class="news-lists-title-right my_text_center">
                    <router-link to='/news'><img src="../assets/imgs/arrow-left-small-gray.png" alt=""></router-link>
                  </div>
                </div>
                <div class="news-lists-details">
                  <ul>
                    <li class="lists-details-li" v-for="(item,index) in newsListsArr" :key="index" :class="{active:item.status}" @click="changeNewsListsStatus(item.id,index)">
                      <span class="details-li-title">{{item.title}}</span>
                      <span class="details-li-time">{{item.time}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="plan-forecast-area">
      <div class="container">
        <div class="plan-forecast-title my_text_center">
          <img src="../assets/imgs/index-plan-title.png" alt="">
          <router-link class="more" to='/forecastplan'>更多&nbsp;></router-link>
        </div>
        <div class="plan-forecast-icon-list">
          <div class="icon-out-box" v-for="(item,index) in planForecastIconText" :key="
          index">
            <p class="icon-inner-big-text">{{item.num}}</p>
            <p class="icon-inner-small-text">{{item.text}}</p>
          </div>
        </div>
        <div class="plan-forecast-lottery-list">
          <div :class="{active:item.status}" class="lottery-list-item-outerbox" v-for="(item,index) in planForecastData" :key="index" @mouseover="changeLotteryList(index)">
            <div class="lottery-list-item my_text_center">
              <span>{{item.title}}</span>
            </div>
            <div class="list-item-line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="chart">
        <div class="chart-left">
          <div class="chart-left-title">
            <div class="left-title-item" v-for="(item,index) in chartLotteryTitle" :key="index">
              <div :class="{active:item.status}" class="left-title-text" @click="chartTitleChange(index)">{{item.title}}</div>
              <div class="left-title-line"></div>
            </div>
          </div>
          <div class="left-chart-box">
            <div class="chart-tabs">
              <div class="chart-tabs-left">
                <span v-for="(item,index) in chartTotalData" :key="index" @click="changeChartTabs(index)" :class="{active:item.status}">{{item.title}}</span>
              </div>
              <div class="chart-tabs-right">
                <router-link to="/" class="toDetailsBtn">详情&nbsp;></router-link>
              </div>
            </div>
            <div id="myChart" :style="{width:'800px',height:'260px'}"></div>
          </div>
        </div>
        <div class="chart-right">
          <div class="news-lists-title">
            <div class="news-lists-title-left">
              <span class="title-left-bigfont">玩彩技巧</span>
              <span class="title-left-smallfont">/&nbsp;LOTTERY SKILLS</span>
            </div>
            <div class="news-lists-title-right my_text_center">
              <router-link to='/helpCenter'><img src="../assets/imgs/arrow-left-small-gray.png" alt=""></router-link>
            </div>
          </div>
          <div class="news-lists-details">
            <ul>
              <li class="lists-details-li" v-for="(item,index) in chartSkillList" :key="index" :class="{active:item.status}" @click="changeChartListsStatus(index)">
                <span class="details-li-title">[{{item.title}}]</span>
                <span class="details-li-time">{{item.detail}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slide from "../components/Slide";
import CountDown from "../../src/components/cqssc/components/CountDown";
import DownloadIcon from "../components/DownloadIcon";

import HotIcon from "../assets/imgs/hot-icon.png";
import HighIcon from "../assets/imgs/high-icon.png";
import LowIcon from "../assets/imgs/low-icon.png";
import HotActiveIcon from "../assets/imgs/hot-active-icon.png";
import HighActiveIcon from "../assets/imgs/high-active-icon.png";
import LowActiveIcon from "../assets/imgs/low-active-icon.png";

let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");

export default {
  components: {
    Slide,
    CountDown,
    DownloadIcon
  },
  data() {
    return {
      parentSlidePics: [],
      isLogin: true,
      isHasLogin: false,
      phoneErrWarn: false,
      pwdErrWarn: false,
      phoneNum: null,
      userPwd: null,
      avatarUrl: "",
      userName: "",
      pwdPhoneErrWarn: false,
      hotIconVar: HotActiveIcon,
      lowIconVar: LowIcon,
      highIconVar: HighIcon,
      caizhongID: null,
      newsListsArr: [],
      planForecastData: [],
      planForecastIconText: null,
      chartLotteryTitle: [],
      chartSkillList: [],
      hotHighLowArr: [],
      isHotChoosed: true,
      isHighChoosed: false,
      isLowChoosed: false,
      hotHighLowContentOneArr: null,
      hotHighLowContentTwoArr: null,
      isCQsscOne: false,
      isCQsscTwo: false,
      isJiaNaDaOne: false,
      isJiaNaDaTwo: false,
      cqsscForContent: {},
      jianadaForContent: {},
      hotHighLowTotalContent: null,
      chartTotalData: [],
      chartXData: [],
      chartYData: [],
      jiaNaDaWinningNum1:null,
      jiaNaDaWinningNum2:null,
      jiaNaDaWinningNum3:null,
      jiaNaDaWinningNum4:null,
    };
  },
  mounted() {
    this.axios
      .all([
        this.getSlideUrl(),
        this.getNewsLists(),
        this.getPlanForecast(),
        this.getChartTitle(),
        this.getChartSkill(),
        this.getHotHighLow()
      ])
      .then(
        this.axios.spread(
          (
            slideurl,
            newsLists,
            planForecast,
            chartTitle,
            chartSkill,
            hotHighLow
          ) => {
            if (
              slideurl.data.status &&
              newsLists.data.status &&
              planForecast.data.status &&
              chartTitle.data.status &&
              chartSkill.data.status &&
              hotHighLow.data.status
            ) {
              this.parentSlidePics = slideurl.data.data;
              this.newsListsArr = newsLists.data.data;
              this.planForecastData = planForecast.data.data;
              this.planForecastIconText = this.planForecastData[0].content;
              this.chartLotteryTitle = chartTitle.data.data[0].lottery;
              this.chartSkillList = chartSkill.data.data;
              this.hotHighLowTotalContent = hotHighLow.data.data;
              this.hotHighLowArr = hotHighLow.data.data[0].content;
              this.hotHighLowLiContentFuc(this.hotHighLowArr);
              this.chartTotalData = chartTitle.data.data[1].trendList;
              this.chartTotalData[0].data.forEach(el => {
                this.chartXData.push(el.periods);
                this.chartYData.push(el.number);
              });
              this.drawLine();
            } else {
              console.log(
                slideurl.data.message,
                newsLists.data.message,
                planForecast.data.message,
                chartTitle.data.message,
                chartSkill.data.message
              );
            }
          }
        )
      )
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getSlideUrl() {
      return this.axios.get("/static/data/index_banner_pic.json");
    },
    getNewsLists() {
      return this.axios.get("/static/data/index_news_lists.json");
    },
    getPlanForecast() {
      return this.axios.get("/static/data/index_plan_forecast.json");
    },
    getChartTitle() {
      return this.axios.get("/static/data/index_chart_title_content.json");
    },
    getChartSkill() {
      return this.axios.get("/static/data/index_chart_skill.json");
    },
    getHotHighLow() {
      return this.axios.get(
        "/static/data/index_hot_high_low_section.json"
      );
    },
    logoutUser() {
      this.isLogin = true;
      this.isHasLogin = false;
    },
    phoneChange() {
      let regPhone = /^0?(13|14|15|18)[0-9]{9}$/gi;
      let regUserName = /^([A-Za-z0-9]{1,20})$/gi;
      this.phoneErrWarn = !(
        regPhone.test(this.phoneNum) || regUserName.test(this.phoneNum)
      );
    },
    pwdChange() {
      let reg = /^([A-Za-z0-9]{6,16})$/gi;
      this.pwdErrWarn = !reg.test(this.userPwd);
    },
    userLogin() {
      if (this.phoneNum && this.userPwd) {
        this.axios
          .get("../../static/data/login.json", {
            mobile: this.phoneNum,
            password: this.userPwd
          })
          .then(res => {
            if (res.data.status) {
              this.isLogin = false;
              this.isHasLogin = true;
              this.avatarUrl = res.data.data.avatar;
              this.userName = res.data.data.nickname;
              this.phoneNum = "";
              this.userPwd = "";
            } else {
              this.pwdPhoneErrWarn = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changeNewsListsStatus(newID,index) {
      this.newsListsArr.forEach((elem, i) => {
        if (i === index) {
          elem.status = 1;
        } else {
          elem.status = 0;
        }
      });
      this.$router.push(`/news/${newID}`);
    },
    changeLotteryList(index) {
      this.planForecastData.forEach((elem, i) => {
        if (index === i) {
          elem.status = 1;
          this.planForecastIconText = this.planForecastData[i].content;
        } else {
          elem.status = 0;
        }
      });
    },
    chartTitleChange(index) {
      this.chartLotteryTitle.forEach((elem, i) => {
        if (index == i) {
          elem.status = 1;
        } else {
          elem.status = 0;
        }
      });
    },
    changeChartListsStatus(index) {},
    hotChoosedFuc() {
      this.isHotChoosed = true;
      this.isHighChoosed = false;
      this.isLowChoosed = false;
      this.hotIconVar = HotActiveIcon;
      this.lowIconVar = LowIcon;
      this.highIconVar = HighIcon;
      this.hotHighLowArr = this.hotHighLowTotalContent[0].content;
      this.hotHighLowLiContentFuc(this.hotHighLowArr);
    },
    highChoosedFuc() {
      this.isHotChoosed = false;
      this.isHighChoosed = true;
      this.isLowChoosed = false;
      this.hotIconVar = HotIcon;
      this.lowIconVar = LowIcon;
      this.highIconVar = HighActiveIcon;
      this.hotHighLowArr = this.hotHighLowTotalContent[1].content;
      this.hotHighLowLiContentFuc(this.hotHighLowArr);
    },
    lowChoosedFuc() {
      this.isHotChoosed = false;
      this.isHighChoosed = false;
      this.isLowChoosed = true;
      this.hotIconVar = HotIcon;
      this.lowIconVar = LowActiveIcon;
      this.highIconVar = HighIcon;
      this.hotHighLowArr = this.hotHighLowTotalContent[2].content;
      this.hotHighLowLiContentFuc(this.hotHighLowArr);
    },
    hotHighLowLiContentFuc(elem) {
      if (elem[0].id == 1) {
        this.isCQsscOne = true;
        this.cqsscForContent = elem[0];
      } else {
        this.isJiaNaDaOne = true;
        this.jianadaForContent = elem[1];
        this.jiaNaDaWinningNum1 = this.jianadaForContent.winningNum[0];
        this.jiaNaDaWinningNum2 = this.jianadaForContent.winningNum[1];
        this.jiaNaDaWinningNum3 = this.jianadaForContent.winningNum[2];
        this.jiaNaDaWinningNum4 = this.jianadaForContent.winningNum[3];
      }
      if (elem[1].id == 1) {
        this.isCQsscTwo = true;
        this.cqsscForContent = elem[0];
      } else {
        this.isJiaNaDaTwo = true;
        this.jianadaForContent = elem[1];
        this.jiaNaDaWinningNum1 = this.jianadaForContent.winningNum[0];
        this.jiaNaDaWinningNum2 = this.jianadaForContent.winningNum[1];
        this.jiaNaDaWinningNum3 = this.jianadaForContent.winningNum[2];
        this.jiaNaDaWinningNum4 = this.jianadaForContent.winningNum[3];
      }
    },
    sschotHighLowToPagesFuc(index) {
      this.cqsscForContent.toPageUrl.forEach((elem, i) => {
        if (i == index) {
          elem.status = 1;
          this.$router.push(this.cqsscForContent.toPageUrl[index].url);
          // console.log(this.cqsscForContent.toPageUrl[index].url);
        } else {
          elem.status = 0;
        }
      });      
    },
    jndhotHighLowToPagesFuc(index) {
      this.jianadaForContent.toPageUrl.forEach((elem, i) => {
        if (i == index) {
          elem.status = 1;
        } else {
          elem.status = 0;
        }
      });
      // this.$router.push(this.cqsscForContent.toPageUrl.url);
    },
    drawLine() {
      let chartsContainer = document.getElementById("myChart");
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(chartsContainer);
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          name: "期号",
          nameLocation: "middle",
          nameGap: "40",
          data: this.chartXData,
          axisLabel: {
            textStyle: {
              color: "#686868",
              fontSize: "11"
            },
            rotate: -45
          }
        },
        yAxis: {
          type: "value",
          name: "号\n码",
          nameLocation: "middle",
          nameGap: "40",
          nameRotate:0,
          axisLabel: {
            textStyle: {
              color: "#686868",
              fontSize: "11"
            }
          }
        },
        series: [
          {
            data: this.chartYData,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3A83D9",
                lineStyle: {
                  color: "#3A83D9"
                }
              }
            }
          }
        ]
      });
    },
    changeChartTabs(index) {
      this.chartTotalData.forEach((el, i) => {
        if (index == i) {
          el.status = 1;
        } else {
          el.status = 0;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/index.less);
</style>

