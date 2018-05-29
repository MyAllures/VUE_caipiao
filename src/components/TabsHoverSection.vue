<template>
  <section class="hover-box-out">
    <div class="container">
      <div class="hover-box-inner">
        <div class="hot-area area-public-style">
          <div class="hot-lottery-title title-public">
            <div class="title-icon">
              <img :src="hotArr.url" alt="">
            </div>
            <div class="title-content">{{hotArr.title}}</div>
          </div>
          <div class="list-item-public">
            <ul class="content-ul-public">
              <li class="content-li-public" v-for="(elem,i) in hotArr.details" :key="i">
                <img :src="elem.src" alt="">
                <span @click="chooseCaizhong(elem.id)">{{elem.name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="hover-box-line"></div>
        <div class="high-area area-public-style">
          <div class="high-lottery-title title-public">
            <div class="title-icon">
              <img :src="highArr.url" alt="">
            </div>
            <div class="title-content">{{highArr.title}}</div>
          </div>
          <div class="list-item-public">
            <ul class="content-ul-public">
              <li class="content-li-public high-low-li" v-for="(elem,i) in highArr.details" :key="i">
                <span @click="chooseCaizhong(elem.id)">{{elem.name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="hover-box-line"></div>
        <div class="low-area area-public-style">
          <div class="low-lottery-title title-public">
            <div class="title-icon">
              <img :src="lowArr.url" alt="">
            </div>
            <div class="title-content">{{lowArr.title}}</div>
          </div>
          <div class="list-item-public">
            <ul class="content-ul-public">
              <li class="content-li-public high-low-li" v-for="(elem,i) in lowArr.details" :key="i">
                <span @click="chooseCaizhong(elem.id)">{{elem.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      hotArr: {},
      highArr: {},
      lowArr: {},
    };
  },
  mounted() {
    this.axios
      .get("/static/data/hover_box_lottery.json")
      .then(res => {
        if (res.data.status) {
          this.hotArr = res.data.data[0];
          this.highArr = res.data.data[1];
          this.lowArr = res.data.data[2];
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods:{
    chooseCaizhong(czID){
      this.$emit("chooseLotteryFuc",czID);
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/tabshoversection.less);
</style>


