<template>
  <el-row class="container">
    <el-col :span="6" class="userC-left">
      <div class="user-avatar my_text_center">
        <img class="avatar-pic" src="../../static/imgs/user-avatar.png" alt="">
      </div>
      <div :class="{active:isMsg}" class="change-msg-btn" @click="changeMsg()">
        <span>修改个人资料</span>
        <img class="change-msg-btn-arr" :src="redarrow" alt="">
      </div>
      <div :class="{active:isPwd}" class="change-msg-btn" @click="changePwd()">
        <span>修改密码</span>
        <img class="change-msg-btn-arr" :src="grayarrow" alt="">
      </div>
    </el-col>
    <el-col :span="18" class="userC-right" v-show="isClickMsg">
      <div class="userC-right-title">
        <span class="title-line"></span>
        <span class="title-text">个人账户</span>
      </div>
      <div class="userC-right-subTitle">
        <p>用户名：{{this.$route.params.userId}}</p>
      </div>
      <div class="userC-right-inputs">
        <div class="input-lists">
          <img class="input-icon" src="../assets/imgs/nicheng-icon.png" alt="">
          <span class="input-title">昵称：</span>
          <input class="input-input" type="text" placeholder="请输入中文、英文、数字" v-model.lazy="niChengVal" @change="niChengChange">
          <span v-show="isNiChengFalse" class="warning">昵称格式错误，请重新输入</span>
        </div>
        <div class="input-lists">
          <img class="input-icon" src="../assets/imgs/qq-icon.png" alt="">
          <span class="input-title">QQ：</span>&nbsp;
          <input class="input-input" type="text" v-model.lazy="QQVal" @change="QQChange">
          <span v-show="isQQFalse" class="warning">QQ格式错误，请重新输入</span>
        </div>
      </div>
      <div class="userC-right-submit">
        <button class="submit-btn" @click="changeUserMessageFuc">保存</button>
        <span v-show="isChangeUserMsgSucc" class="warning">修改个人资料成功</span>
      </div>
    </el-col>
    <el-col :span="18" class="userC-right" v-show="isClickPwd">
      <div class="userC-right-title">
        <span class="title-line"></span>
        <span class="title-text">修改密码</span>
      </div>
      <div class="userC-right-subTitle change-pwd-borderbottom">
      </div>
      <div class="userC-right-inputs">
        <div class="input-lists">
          <span class="input-title">原密码：</span>
          <input class="input-input" type="text" v-model.lazy="oldPwd" @change="oldPwdInput">
          <span v-show="isOldPwdFalse" class="warning">原密码错误，请重新输入</span>
        </div>
        <div class="input-lists">
          <span class="input-title">新密码：</span>
          <input class="input-input" type="text" placeholder="请输入6-16字母与数字的组合" v-model.lazy="newPwd" @change="newPwdInput">
          <span v-show="isNewPwdFalse" class="warning" v-text="newPwdWarnText"></span>
        </div>
        <div class="input-lists new-pwd-again">
          <span class="input-title">再次输入新密码：</span>
          <input class="input-input" type="text" v-model.lazy="newPwdAgain" @change="newPwdAgainInput">
          <span v-show="isNewPwdAgainFalse" class="warning">新密码与确认密码不一致，请重新输入</span>
        </div>
      </div>
      <div class="userC-right-submit">
        <button class="submit-btn" @click="changeUserPwdFuc">修改</button>
        <span v-show="isChangeUserPwdSucc" class="warning">修改密码成功</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import RedArrow from "../assets/imgs/arrow-right-red.png";
import GrayArrow from "../assets/imgs/userC-arrow-right-gray.png";

export default {
  data() {
    return {
      redarrow: RedArrow,
      grayarrow: GrayArrow,
      isMsg: false,
      isPwd: false,
      isClickMsg: true,
      isClickPwd: false,
      niChengVal: "",
      QQVal: "",
      isNiChengFalse: false,
      isQQFalse: false,
      oldPwd: "",
      newPwd: "",
      isOldPwdFalse: false,
      isNewPwdFalse: false,
      newPwdWarnText: "",
      newPwdAgain: "",
      isNewPwdAgainFalse: false,
      isChangeUserMsgSucc: false,
      isChangeUserPwdSucc: false
    };
  },
  methods: {
    changeMsg() {
      this.isMsg = true;
      this.redarrow = RedArrow;
      this.isPwd = false;
      this.grayarrow = GrayArrow;
      this.isClickMsg = true;
      this.isClickPwd = false;
    },
    changePwd() {
      this.isMsg = false;
      this.redarrow = GrayArrow;
      this.isPwd = true;
      this.grayarrow = RedArrow;
      this.isClickMsg = false;
      this.isClickPwd = true;
    },
    niChengChange() {
      let reg = /^([A-Za-z0-9_\-\u4e00-\u9fa5]{1,20})$/gi;
      this.isNiChengFalse = !reg.test(this.niChengVal);
    },
    QQChange() {
      let reg = /^[1-9]([0-9]{4,11})$/gi;
      this.isQQFalse = !reg.test(this.QQVal);
    },
    oldPwdInput() {
      if (this.oldPwd) {
        this.axios
          .post("../../static/data/change_userPwd.json", {
            uid: this.$route.params.userId,
            userOldPwd: this.oldPwd
          })
          .then(res => {
            if (!res.data.status) {
              this.isOldPwdFalse = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    newPwdInput() {
      if (this.newPwd === this.oldPwd) {
        this.isNewPwdFalse = true;
        this.newPwdWarnText = "新密码与原密码一致，请重新设置";
      } else {
        let reg = /^([A-Za-z0-9]{6,16})$/gi;
        let bool = reg.test(this.newPwd);
        if (bool) {
          this.isNewPwdFalse = false;
        } else {
          this.isNewPwdFalse = true;
          this.newPwdWarnText = "新密码需为6-16位数字和字母的组合";
        }
      }
    },
    newPwdAgainInput() {
      this.isNewPwdAgainFalse = !(this.newPwdAgain === this.newPwd);
    },
    changeUserMessageFuc() {
      if (this.QQVal && this.niChengVal) {
        this.axios
          .post("../../static/data/change_userMsg.json", {
            uid: this.$route.params.userId,
            QQ: this.QQVal,
            niCheng: this.niChengVal
          })
          .then(res => {
            if (res.data.status) {
              this.isChangeUserMsgSucc = true;
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            } else {
              console.log(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changeUserPwdFuc() {
      if (this.newPwd) {
        this.axios
          .post("../../static/data/change_userPwd.json", {
            uid: this.$route.params.userId,
            uPwd: this.newPwd
          })
          .then(res => {
            if (res.data.status) {
              this.isChangeUserPwdSucc = true;
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            }else{
              console.log(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.isMsg = true;
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/user-center.less);
</style>

