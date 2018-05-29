<template>
  <div class="outerbox">
    <el-row class="container">
      <el-col :span="24">
        <div class="goBackIndex my_text_right">
          <router-link to="/" class="font-color">返回首页</router-link>
        </div>
        <div class="inner-opacity-box">
          <div class="inner-content-box">
            <div class="content-title my_text_center">
              <span>账号注册</span>
            </div>
            <div class="content-login my_text_center">
              <p>已是xx彩票用户？
                <router-link to="/" class="loginnow">立即登录</router-link>
              </p>
            </div>
            <div class="content-register-lists">
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-phone-icon.png" alt="">
                </span>
                <input class="right-input" type="text" placeholder="请输入你的手机号/用户名" v-model.lazy="telNum" @change="telNumInput">
                <img v-show="isTel" class="ok-pic" src="../assets/imgs/register-ok-pic.png" alt="">
                <span v-text="isTelErr" class="warning"></span>
              </div>
              <!-- <div class="my-lists-items">
                <input class="left-input" type="text" placeholder="请输入验证码" v-model.lazy="verifiCode" @change="verigicodeInput">
                <span v-text="verificodeTips" class="right-text my_text_center getCode" @click="getVerificode"></span>
                <img v-show="isVerificode" class="ok-pic" src="../assets/imgs/register-ok-pic.png" alt="">
                <span v-show="isSendverificode" class="warning">验证码已发送</span>
                <span v-show="isVerificodeErr" class="warning">验证码错误，请重新输入</span>
              </div> -->
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-pwd-icon.png" alt="">
                </span>
                <input class="right-input" type="text" placeholder="请输入你的密码" v-model.lazy="userPwd" @change="userPwdInput">
                <img v-show="isPwd" class="ok-pic" src="../assets/imgs/register-ok-pic.png" alt="">
                <span v-show="isPwdErr" class="warning">密码格式错误，请重新输入</span>
              </div>
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-pwd-icon.png" alt="">
                </span>
                <input class="right-input" type="text" placeholder="请再次输入密码" v-model.lazy="pwdAgain" @change="pwdAgainInput">
                <img v-show="isPwdAgain" class="ok-pic" src="../assets/imgs/register-ok-pic.png" alt="">
                <span v-show="isPwdAgainErr" class="warning">两次输入密码不一致，请重新输入</span>
              </div>
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-question-icon.png" alt="">
                </span>
                <selection class="right-input" @pwdQuestionChange="pwdQuestionChoose"></selection>
                <img v-show="isPwdQuestion" class="ok-pic" src="../assets/imgs/register-ok-pic.png" alt="">
                <span class="question-intro">方便找回密码</span>
              </div>
              <div class="my-lists-items">
                <span class="left-icon my_text_center">
                  <img class="left-icon-pic" src="../assets/imgs/register-question-icon.png" alt="">
                </span>
                <input class="right-input" type="text" placeholder="请填写20字以内的答案" v-model.lazy="pwdAnswer" @change="pwdAnswerInput">
                <img v-show="isPwdAnswer" class="ok-pic" src="../assets/imgs/register-ok-pic.png" alt="">
                <span v-show="isPwdAnswerErr" class="warning">答案格式不正确，请重新输入</span>
              </div>
              <div class="my-lists-items">
                <CheckBox @checkBoxChecked="parentChecked"></CheckBox>
              </div>
              <div class="my-lists-items">
                <button class="register-btn" @click="userRegisterSubmit">注册</button>
                <span v-show="isRegisterSucc" class="warning">注册成功</span>
              </div>
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
      isTel: false,
      telNum: "",
      isTelErr: "",
      // isVerificode: false,
      // verifiCode: "",
      // verificodeTips: "获取验证码",
      // intervalTag: true,
      // isSendverificode: false,
      // isVerificodeErr: false,
      isPwd: false,
      userPwd: "",
      isPwdErr: false,
      isPwdAgain: false,
      pwdAgain: "",
      isPwdQuestion: false,
      pwdQuestionVar: null,
      isPwdAgainErr: false,
      isPwdAnswer: false,
      pwdAnswer: "",
      // pwdQustions: [],
      isPwdAnswerErr: false,
      isCheckedBox: false,
      isRegisterSucc:false
    };
  },
  components: {
    Selection,
    CheckBox
  },
  mounted() {
    // this.axios
    //   .get("../../static/data/pwd_questions.json")
    //   .then(res => {
    //     if (res.data.status) {
    //       this.pwdQustions = res.data.data;
    //     } else {
    //       console.log(res.data.message);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
      // this.axios.get(`${this.GLOBAL.BASE_URL}user/getObtainUserAnswerList`).then(res=>{
      //   console.log(res);
      // }).catch()
  },
  methods: {
    telNumInput() {
      let regTel = /^0?(13|14|15|18)[0-9]{9}$/gi;
      let regUserName = /^([A-Za-z0-9]{1,20})$/gi;
      let resTel = regTel.test(this.telNum);
      let resUserName = regUserName.test(this.telNum);
      if (resTel && resUserName) {
        this.isTel = true;
        this.isTelErr = "";
      } else {
        this.isTel = false;
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
        this.isPwdAnswer = true;
        this.isPwdAnswerErr = false;
      } else {
        this.isPwdAnswer = false;
        this.isPwdAnswerErr = true;
      }
    },
    pwdQuestionChoose(data) {
      if (data) {
        this.isPwdQuestion = true;
      }
      this.pwdQuestionVar = data;
    },
    parentChecked() {
      this.isCheckedBox = true;
    },
    userRegisterSubmit() {
      if (this.isCheckedBox && this.telNum && this.userPwd && this.pwdQuestionVar && this.pwdAnswer) {
        this.axios
          .post("../../static/data/register.json", {
            phone: this.telNum,
            uPwd: this.userPwd,
            pwdQuestion: this.pwdQuestionVar,
            pwdAnswer: this.pwdAnswer,
            checkBox:this.isCheckedBox
          })
          .then(res => {
            if (res.data.status) {
              this.isRegisterSucc = true;
              setTimeout(()=>{
                this.$router.push('/');
              },1000);
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


