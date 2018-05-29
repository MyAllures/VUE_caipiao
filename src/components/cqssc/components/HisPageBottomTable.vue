<template>
  <table class="his-bottom-table-table">
    <thead class="his-bottom-table-thead">
      <tr class="bottom-table-thead-tr">
        <th>{{theadDataVar.time}}</th>
        <th>{{theadDataVar.periods}}</th>
        <th class="thead-tr-choose-th">
          <span class="choose-th-content" v-for="(item,index) in theadDataVar.opration" :key="index" :class="{active:item.status}" @click="changeChooseTd(index)">{{item.text}}</span>
        </th>
        <th class="thead-tr-zonghe-th">{{theadDataVar.total}}</th>
        <th class="table-thead-tr-th-five">{{theadDataVar.longhu}}</th>
      </tr>
    </thead>
    <tbody class="his-bottom-table-tbody">
      <tr class="bottom-table-tbody-tr" v-for="(item,index) in tbodyDataVar" :key="index">
        <td class="table-tbody-tr-col-one">{{item.time}}</td>
        <td class="table-tbody-tr-col-two">{{item.periods}}</td>
        <td class="table-tbody-tr-col-three">
          <span class="choose-tbody-td-content" v-for="(item,index) in item.opration[chooseIndex]" :key="index" :class="{text:changeTextBgc(item),specialBg:changeSpecialBgc(item)}">{{item}}</span>
        </td>
        <td class="table-tbody-tr-col-four">
          <span class="zonghe-tbody-td-content" v-for="(item,index) in item.total" :key="index">{{item}}</span>
        </td>
        <td>{{item.longhu}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    hisBottomTableTotalData: {
      type: Array
    }
  },
  data() {
    return {
      theadDataVar: {},
      tbodyDataVar: [],
      chooseIndex: 0,
      text: null
    };
  },
  watch: {
    hisBottomTableTotalData() {
      this.theadDataVar = this.hisBottomTableTotalData[0];
      this.tbodyDataVar = this.hisBottomTableTotalData[1];
    }
  },
  methods: {
    changeChooseTd(index) {
      this.theadDataVar.opration.forEach((element, i) => {
        if (index == i) {
          element.status = 1;
          this.chooseIndex = i;
        } else {
          element.status = 0;
          this.isChooseContentText = false;
        }
      });
    },

    changeTextBgc(text) {
      if (Number.isInteger(Number(text))) {
        return false;
      }else{
        return true
      }
    },

    changeSpecialBgc(text) {
      if (!Number.isInteger(Number(text))) {
        console.log(text);
        switch (text) {
          case "大":
            return true
          case "小":
            return false;
          case "单":
            return false;
          case "双":
            return true;
          default:
            return false;
        }
      }
    }
  }
};
</script>

<style lang="less">
@import url(../../../assets/css/hispagebottomtable.less);
</style>


