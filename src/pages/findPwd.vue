<template>
  <div class="outerbox">
    <el-row class="container">
      <el-col :span="24">
        <div class="goBackIndex my_text_right">
          <router-link to="/" class="font-color">返回首页</router-link>
        </div>
        <div class="inner-opacity-box">
          <div v-show="isNotShowFindPwdLastPage" class="inner-content-box">
            <div class="content-title my_text_center">
              <span>找回密码</span>
            </div>
            <div class="content-login my_text_center">
              <p>已是xx彩票用户？
                <router-link to="/" class="loginnow">立即登录</router-link>
              </p>
            </div>
            <!-- <div v-show="isClickNext" class="question-tel">
              <div class="question-tel-text" @click="questionClick">
                <span :class="{active:questionActive}">通过密保问题找回</span>
                <span v-show="questionActive" class="bottom-line"></span>
              </div>
              <div class="parting-line"></div>
              <div class="question-tel-text" @click="telClick">
                <span :class="{active:telActive}">通过手机号找回</span>
                <span v-show="telActive" class="bottom-line"></span>
              </div>
            </div> -->
            <div v-show="isClickNext" class="content-register-lists">
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-phone-icon.png" alt="">
                </span>
                <input class="right-input" type="text" placeholder="请输入你的手机号/用户名" v-model.lazy="telNum" @change="telNumInput">
                <span v-text="isTelErr" class="warning"></span>
              </div>
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-question-icon.png" alt="">
                </span>
                <selection class="right-input" @pwdQuestionChange="pwdQuestionChoose"></selection>
              </div>
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-question-icon.png" alt="">
                </span>
                <input class="right-input" type="text" placeholder="请填写20字以内的答案" v-model.lazy="pwdAnswer" @change="pwdAnswerInput">
                <span v-show="isPwdAnswerErr" class="warning">答案格式不正确，请重新输入</span>
              </div>
              <div class="my-lists-items">
                <button class="register-btn findPwd-next-btn" @click="clickRedNext">下一步</button>
              </div>
            </div>
            <!-- <div v-show="isClickTel" class="content-register-lists">
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-phone-icon.png" alt="">
                </span>
                <input class="right-input" type="text" placeholder="请输入你的手机号" v-model.lazy="telNum" @change="telNumInput">
                <span v-text="isTelErr" class="warning"></span>
              </div>
              <div class="my-lists-items">
                <input class="left-input" type="text" placeholder="请输入验证码" v-model.lazy="verifiCode" @change="verigicodeInput">
                <span v-text="verificodeTips" class="right-text my_text_center getCode" @click="getVerificode"></span>
                <span v-show="isSendverificode" class="warning">验证码已发送</span>
                <span v-show="isVerificodeErr" class="warning">验证码错误，请重新输入</span>
              </div>
              <div class="my-lists-items">
                <button class="register-btn findPwd-next-btn" @click="clickRedNext">下一步</button>
              </div>
            </div> -->
            <div v-show="isClickNextTep" class="content-register-lists">
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-pwd-icon.png" alt="">
                </span>
                <input class="right-input" type="text" placeholder="请重新设置你的密码" v-model.lazy="userPwd" @change="userPwdInput">
                <span v-show="isPwdErr" class="warning">密码格式错误，请重新输入</span>
              </div>
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-pwd-icon.png" alt="">
                </span>
                <input class="right-input" type="text" placeholder="请再次输入密码" v-model.lazy="pwdAgain" @change="pwdAgainInput">
                <span v-show="isPwdAgainErr" class="warning">两次输入密码不一致，请重新输入</span>
              </div>
              <div class="my-lists-items">
                <button class="register-btn findPwd-next-btn" @click="lastStepSubmit">提交</button>
              </div>
            </div>
          </div>
          <div v-show="isShowFindPwdLastPage" class="inner-content-box my_text_center">
            <div class="content-title my_text_center">
              <span>找回密码</span>
            </div>
            <div class="findPwd-last-pic">
              <img src="../assets/imgs/findPwd-lastPage-icon.png" alt="">
            </div>
            <div class="findPwd-last-text">
              <p class="text-title">密码修改成功</p>
              <p class="text-sub-title">页面三秒后自动跳转到首页</p>
            </div>
            <div class="findPwd-last-btn">
              <router-link to="/" class="asBtn">手动前往首页</router-link>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Selection from "../components/Selection";
import CheckBox from "../components/CheckBox";

export default {
  data() {
    return {
      telNum: "",
      isTelErr: "",
      // verifiCode: "",
      // verificodeTips: "获取验证码",
      // intervalTag: true,
      // isSendverificode: false,
      // isVerificodeErr: false,
      userPwd: "",
      isPwdErr: false,
      pwdAgain: "",
      isPwdQuestion: false,
      isPwdAgainErr: false,
      pwdAnswer: "",
      // pwdQustions: [],
      isPwdAnswerErr: false,
      // questionActive: true,
      // telActive: false,
      // isClickQuestion: true,
      // isClickTel: false,
      isClickNext: true,
      isClickNextTep: false,
      isNotShowFindPwdLastPage: true,
      isShowFindPwdLastPage: false,
      pwdQuestionVar: null,
      userID: null
    };
  },
  components: {
    Selection,
    CheckBox
  },
  // mounted() {
  //   this.axios
  //     .get("../../static/data/pwd_questions.json")
  //     .then(res => {
  //       if (res.data.status) {
  //         this.pwdQustions = res.data.data;
  //       } else {
  //         console.log(res.data.message);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // },
  methods: {
    // questionClick() {
    //   this.questionActive = true;
    //   this.telActive = false;
    //   this.isClickQuestion = true;
    //   this.isClickTel = false;
    // },
    // telClick() {
    //   this.isClickTel = true;
    //   this.questionActive = false;
    //   this.telActive = true;
    //   this.isClickQuestion = false;
    // },
    telNumInput() {
      let regTel = /^0?(13|14|15|18)[0-9]{9}$/gi;
      let regUserName = /^([A-Za-z0-9]{1,20})$/gi;
      let resTel = regTel.test(this.telNum);
      let resUserName = regUserName.test(this.telNum);
      if (resTel && resUserName) {
        this.isTelErr = "";
      } else {
        this.isTelErr = "手机号码或用户名格式不正确，请重新输入";
      }
    },
    // getVerificode() {
    //   if (this.intervalTag) {
    //     this.intervalTag = false;
    //     let secondNum = 60;
    //     let tips = this.verificodeTips;
    //     this.verificodeTips = secondNum;
    //     let t = setInterval(() => {
    //       secondNum--;
    //       if (secondNum == 0) {
    //         this.verificodeTips = "重新发送";
    //         clearInterval(t);
    //         this.intervalTag = true;
    //         this.isSendverificode = false;
    //       } else {
    //         this.verificodeTips = secondNum;
    //         this.isSendverificode = true;
    //       }
    //     }, 1000);
    //   }
    // },
    // verigicodeInput() {
    //   let reg = /^[0-9]{6}$/gi;
    //   let res = reg.test(this.verifiCode);
    //   if (res) {
    //     this.isVerificode = true;
    //     this.isVerificodeErr = false;
    //   } else {
    //     this.isVerificode = false;
    //     this.isVerificodeErr = true;
    //   }
    // },
    userPwdInput() {
      let reg = /^([A-Za-z0-9]{6,16})$/gi;
      let res = reg.test(this.userPwd);
      if (res) {
        this.isPwd = true;
        this.isPwdErr = false;
      } else {
        this.isPwd = false;
        this.isPwdErr = true;
      }
    },
    pwdAgainInput() {
      if (this.pwdAgain === this.userPwd) {
        this.isPwdAgain = true;
        this.isPwdAgainErr = false;
      } else {
        this.isPwdAgain = false;
        this.isPwdAgainErr = true;
      }
    },
    pwdAnswerInput() {
      let reg = /^[0-9_-\u4e00-\u9fa5]{1,20}$/gi;
      let res = reg.test(this.pwdAnswer);
      if (res) {
        this.isPwdAnswerErr = false;
      } else {
        this.isPwdAnswerErr = true;
      }
    },
    pwdQuestionChoose(data) {
      this.pwdQuestionVar = data;
    },
    clickRedNext() {
      if (this.telNum && this.pwdQuestionVar && this.pwdAnswer) {
        this.axios
          .post("../../static/data/findPwd_click_next.json", {
            phone: this.telNum,
            pwdQuestion: this.pwdQuestionVar,
            pwdAnswer: this.pwdAnswer
          })
          .then(res => {
            if (res.data.status) {
              this.isClickNext = false;
              this.isClickNextTep = true;
              this.userID = res.data.data.id;
            } else {
              console.log(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    lastStepSubmit() {
      if (this.userPwd) {
        this.axios
          .post("../../static/data/findPwd_click_submit.json", {
            uPwd: this.userPwd,
            uID: this.userID
          })
          .then(res => {
            if (res.data.status) {
              this.isNotShowFindPwdLastPage = false;
              this.isShowFindPwdLastPage = true;
              setTimeout(() => {
                this.$router.push('/');
              }, 4000);
            } else {
              console.log(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/registerCenter.less);
</style>


