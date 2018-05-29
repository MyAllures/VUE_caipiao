<template>
  <div>
    <span class="countdown-num">{{minute}}</span>
    <span class="countdown-text">分</span>
    <span class="countdown-num">{{second}}</span>
    <span class="countdown-text">秒</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      minute:null,
      second:null
    };
  },
  props: {
    endTime: {
      type: String,
      default: ""
    },
    nowTime:{
       type : String,
       default:''
    },
    // callback: {
    //   type: Function,
    //   default: ""
    // }
  },
  mounted() {
    this.countdowm(this.endTime);
  },
  methods: {
    countdowm(timestamp) {
      let self = this;
      let timer = setInterval(function() {
        let nowTime = new Date();
        let endTime = new Date(timestamp * 1000);
        let t = endTime.getTime() - nowTime.getTime();
        if (t > 0) {
          // let day = Math.floor(t / 86400000);
          // let hour = Math.floor((t / 3600000) % 24);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          // hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          // let format = "";
          // if (day > 0) {
          //   format = `${day}天${hour}小时${min}分${sec}秒`;
          // }
          // if (day <= 0 && hour > 0) {
          //   format = `${hour}小时${min}分${sec}秒`;
          // }
          // if (day <= 0 && hour <= 0) {
          //   format = `${min}分${sec}秒`;
          // }
          // self.content = format;
          self.minute = min;
          self.second = sec;
        } else {
          clearInterval(timer);
          // self.content = self.endText;
          // self._callback();
          console.log(111);
        }
      }, 1000);
    },
    // _callback() {
    //   if (this.callback && this.callback instanceof Function) {
    //     this.callback(...this);
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
@import url(../../../assets/css/countdown.less);
</style>


