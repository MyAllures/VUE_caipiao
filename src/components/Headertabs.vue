<template>
  <div @mouseleave="hoverboxHide">
    <div class="container">
      <ul class="header-tabs-ul" mode="horizontal">
        <li class="my_text_center header-tabs-li" v-for="(item,i) in headerTabs" :key="i" @mouseenter="hoverboxShow(i)" @click="clickItemFuc(i)" :class="{active:item.status}">
          <router-link :to="item.url" class="header-tabs-li-text">{{item.text}}</router-link>
        </li>
      </ul>
    </div>
    <tabs-hover-section v-show="isShowHoverBox" @chooseLotteryFuc="changeLotteryIDFuc"></tabs-hover-section>
  </div>
</template>
<script>
import TabsHoverSection from "../components/TabsHoverSection";

export default {
  props: {
    headerTabs: {
      type: Array
    }
  },
  components: {
    TabsHoverSection
  },
  data() {
    return {
      isShowHoverBox: false,
      receiveLotteryIDVar: null,
      tabsIndex: null,
      isClickItem: false
    };
  },
  methods: {
    hoverboxShow(i) {
      if (i == 1 || i == 2 || i == 3 || i == 4) {
        this.isShowHoverBox = true;
        this.tabsIndex = i;
      } else {
        this.isShowHoverBox = false;
      }
    },
    hoverboxHide() {
      this.isShowHoverBox = false;
    },
    changeLotteryIDFuc(data) {
      this.receiveLotteryIDVar = data;
      switch (this.tabsIndex) {
        case 1:
          this.$router.push({
            name: "lotterylobby",
            caizhongID: this.receiveLotteryIDVar
          });
          this.isClickItem = true;
          break;
        case 2:
          this.$router.push({
            name: "forecastrecommend",
            caizhongID: this.receiveLotteryIDVar
          });
          break;
        case 3:
          this.$router.push({
            name: "charts",
            caizhongID: this.receiveLotteryIDVar
          });
          break;
        case 4:
          this.$router.push({
            name: "live",
            caizhongID: this.receiveLotteryIDVar
          });
          break;
        default:
          break;
      }
    },
    clickItemFuc(i) {
      this.headerTabs.forEach((el, j) => {
        if (i == j) {
          el.status = 1;
        } else {
          el.status = 0;
        }
      });
    }
  }
};
</script>




