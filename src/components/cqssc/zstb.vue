<template>
    <div class="container">
        <type-message></type-message>
        <div class="zoushitu-tabs-area">
            <div class="zoushitu-icon-title">
                <img src="../../assets/imgs/chartspage-zoushitu-icon.png" class="zoushitu-icon" alt="">
                <span class="zoushitu-title">彩种走势图</span>
            </div>
            <div class="zoushitu-tabs my_text_center">
                <span :class="{active:item.status}" v-for="(item,a) in zoushituDataVar" :key="a" @click="changeZouShiTuTabsFuc(a)">{{item.title}}</span>
            </div>
        </div>
        <div class="zoushifenxi-table-area">
            <div class="zoushifenxi-table-checkbox-query">
                <div class="title-left-icon-title">
                    <img class="zoushifenxi-icon" src="../../assets/imgs/chartspage-wuxingzoushi-icon.png" alt="">
                    <span class="zoushifenxi-text">{{tabName}}走势分析</span>
                    <div class="checkbox-group">
                        <div class="checkbox-item" v-for="(item,index) in checkboxGroupVar" :key="index" @change="clickCheckbox(index)">
                            <input type="checkbox" :id="index" class="input-checkbox" v-model="item.status">
                            <label :for="index" class="checkbox-label">{{item.title}}</label>
                        </div>
                    </div>
                </div>
                <div class="title-right">
                    <span class="query-area-input-outbox">统计
                        <input v-model="queryNum" type="text" placeholder="30" class="query-area-input my_text_center">&nbsp;期</span>
                    <button class="query-area-btn" @click="llQueryData">查询</button>
                </div>
            </div>
            <div class="zoushifenxi-table-box">
                <table>
                    <thead>
                        <tr class="thead-one-row">
                            <td rowspan="2" class="one-row-one-td">{{theadOneRowOneTdData}}</td>
                            <td rowspan="2" class="one-row-tow-td">{{theadOneRowTwoTdData}}</td>
                            <td v-for="elem in theadOneRowOtherTdData" :key="elem">{{elem}}</td>
                        </tr>
                        <tr class="thead-two-row">
                            <td class="tow-row-outer-td" v-for="(ele,i) in theadTwoRowData" :key="i">
                                <tr>
                                    <td v-for="(e,j) in ele" :key="j">{{e}}</td>
                                </tr>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="{fuzhuxian:isFuZhuXianChecked}" v-for="(item,index) in tbodyData" :key="index" class="tbody-out-tr">
                            <td class="tbody-tr-outer-td">{{item[0].period}}</td>
                            <td class="tbody-tr-outer-td">{{item[1].luckNumTotal}}</td>
                            <td class="tbody-tr-outer-td">
                                <tr>
                                    <td v-for="(el,i) in item[2].count" :key="i">
                                        <span :class="{red:el.lucyNum,blue:(el.numTemp==2 && isNumberTempChecked),orange:(el.numTemp==1 && isNumberTempChecked)}" v-show="!el.omitCount">{{el.name}}</span>
                                        <span :class="{omitbg:(isYiLouTiaoChecked && el.omitCount),omit:isOmitChecked}">{{el.omitCount}}</span>
                                    </td>
                                </tr>
                            </td>
                            <td class="tbody-tr-outer-td">
                                <tr>
                                    <td v-for="(el,i) in item[3].count" :key="i">
                                        <span :class="{red:el.lucyNum,blue:(el.numTemp==2 && isNumberTempChecked),orange:(el.numTemp==1 && isNumberTempChecked)}" v-show="!el.omitCount">{{el.name}}</span>
                                        <span :class="{omitbg:(isYiLouTiaoChecked && el.omitCount),omit:isOmitChecked}">{{el.omitCount}}</span>
                                    </td>
                                </tr>
                            </td>
                            <td class="tbody-tr-outer-td">
                                <tr>
                                    <td v-for="(el,i) in item[4].count" :key="i">
                                        <span :class="{red:el.lucyNum,blue:(el.numTemp==2 && isNumberTempChecked),orange:(el.numTemp==1 && isNumberTempChecked)}" v-show="!el.omitCount">{{el.name}}</span>
                                        <span :class="{omitbg:(isYiLouTiaoChecked && el.omitCount),omit:isOmitChecked}">{{el.omitCount}}</span>
                                    </td>
                                </tr>
                            </td>
                            <td class="tbody-tr-outer-td">
                                <tr>
                                    <td v-for="(el,i) in item[5].count" :key="i">
                                        <span :class="{red:el.lucyNum,blue:(el.numTemp==2 && isNumberTempChecked),orange:(el.numTemp==1 && isNumberTempChecked)}" v-show="!el.omitCount">{{el.name}}</span>
                                        <span :class="{omitbg:(isYiLouTiaoChecked && el.omitCount),omit:isOmitChecked}">{{el.omitCount}}</span>
                                    </td>
                                </tr>
                            </td>
                            <td class="tbody-tr-outer-td">
                                <tr>
                                    <td v-for="(el,i) in item[6].count" :key="i">
                                        <span :class="{red:el.lucyNum,blue:(el.numTemp==2 && isNumberTempChecked),orange:(el.numTemp==1 && isNumberTempChecked)}" v-show="!el.omitCount">{{el.name}}</span>
                                        <span :class="{omitbg:(isYiLouTiaoChecked && el.omitCount),omit:isOmitChecked}">{{el.omitCount}}</span>
                                    </td>
                                </tr>
                            </td>
                            <td class="tbody-tr-outer-td tbody-tr-haomafenbu">
                                <tr>
                                    <td v-for="(el,i) in item[7].count" :key="i">
                                        <span :class="{green:el.lucyNum,purple:el.repeation}">{{el.name}}</span>
                                    </td>
                                </tr>
                            </td>
                            <td class="tbody-tr-outer-td">
                                <tr>
                                    <td v-for="(e,i) in item[8].count" :key="i">
                                        <span :class="{textred:e.lucyNum}">{{e.name}}</span>
                                    </td>
                                </tr>
                            </td>
                        </tr>
                        <tr class="tbody-second-last-row">
                            <td class="tbody-tr-outer-td tbody-second-last-row-one-td">{{tbodySecondLastRowFirstTdData}}</td>
                            <td class="tbody-tr-outer-td"></td>
                            <td class="tbody-tr-outer-td" v-for="(el,i) in tbodySecondLastRowOtherTdData" :key="i">
                                <tr>
                                    <td v-for="e in el" :key="e">
                                        <span>{{e}}</span>
                                    </td>
                                </tr>
                            </td>
                        </tr>
                        <tr class="tbody-last-row">
                            <td class="tbody-tr-outer-td tbody-tr-one-td tbody-last-row-one-td">{{tbodyLastRowFirstTdData}}</td>
                            <td class="tbody-tr-outer-td"></td>
                            <td class="tbody-tr-outer-td" v-for="(el,i) in tbodyLastRowOtherTdData" :key="i">
                                <tr>
                                    <td v-for="e in el" :key="e">
                                        <span>{{e}}</span>
                                    </td>
                                </tr>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="tfoot-one-row">
                            <td rowspan="2" class="one-row-one-td">{{tfootOneRowOneTdData}}</td>
                            <td rowspan="2" class="one-row-tow-td">{{tfootOneRowTwoTdData}}</td>
                            <td class="tow-row-outer-td" v-for="(item,index) in tfootOneRowOtherTdData" :key="index">
                                <tr>
                                    <td v-for="(e,i) in item" :key="i">{{e}}</td>
                                </tr>
                            </td>
                        </tr>
                        <tr class="tfoot-two-row">
                            <td v-for="(item,index) in tfootTwoRowData" :key="index">{{item}}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
import TypeMessage from "./components/TypeMessage";

export default {
  components: {
    TypeMessage
  },
  data() {
    return {
      zoushituDataVar: null,
      queryNum: 30,
      checkboxGroupVar: [],
      isChecked: false,
      tabName: "",
      tableTotalData: [],
      theadData: [],
      theadOneRowData: [],
      theadOneRowOneTdData: "",
      theadOneRowTwoTdData: "",
      theadOneRowOtherTdData: [],
      theadTwoRowData: [],
      tbodyData: [],
      tbodySecondLastRowData: [],
      tbodySecondLastRowFirstTdData: "",
      tbodySecondLastRowOtherTdData: [],
      tbodyLastRowData: [],
      tbodyLastRowFirstTdData: "",
      tbodyLastRowOtherTdData: [],
      tfootData: [],
      tfootOneRowData: [],
      tfootTwoRowData: [],
      tfootOneRowOneTdData: "",
      tfootOneRowTwoTdData: "",
      tfootOneRowOtherTdData: [],
      isFuZhuXianChecked: true,
      isYiLouTiaoChecked: false,
      isOmitChecked: false,
      isNumberTempChecked: false
    };
  },
  mounted() {
    this.axios
      .all([this.getChartsPageInitDataFuc()])
      .then(
        this.axios.spread(pageInitData => {
          if (pageInitData.data.status) {
            this.zoushituDataVar = pageInitData.data.data[0];
            this.checkboxGroupVar = pageInitData.data.data[1];
            this.tabName = this.zoushituDataVar[0].title;
            this.tableTotalData = pageInitData.data.data[2];
            this.theadData = this.tableTotalData[0].content;
            this.theadOneRowData = this.theadData[0];
            this.theadTwoRowData = this.theadData[1];
            this.theadOneRowOneTdData = this.theadOneRowData[0];
            this.theadOneRowTwoTdData = this.theadOneRowData[1];
            this.theadOneRowData.forEach((el, i) => {
              if (i !== 0 && i !== 1) {
                this.theadOneRowOtherTdData.push(el);
              }
            });
            this.tbodyData = this.tableTotalData[1].content;
            this.tbodySecondLastRowData = this.tableTotalData[2];
            this.tbodySecondLastRowFirstTdData = this.tbodySecondLastRowData.showcount;
            this.tbodySecondLastRowOtherTdData = this.tbodySecondLastRowData.content;
            this.tbodyLastRowData = this.tableTotalData[3];
            this.tbodyLastRowFirstTdData = this.tbodyLastRowData.showcount;
            this.tbodyLastRowOtherTdData = this.tbodyLastRowData.content;
            this.tfootData = this.tableTotalData[4].content;
            this.tfootOneRowData = this.tfootData[0];
            this.tfootTwoRowData = this.tfootData[1];
            this.tfootOneRowOneTdData = this.tfootOneRowData[0];
            this.tfootOneRowTwoTdData = this.tfootOneRowData[1];
            this.tfootOneRowData.forEach((el, i) => {
              if (i !== 0 && i !== 1) {
                this.tfootOneRowOtherTdData.push(el);
              }
            });
            this.isFuZhuXianChecked = true;
          } else {
            console.log(pageInitData.data.message);
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getChartsPageInitDataFuc() {
      return this.axios.get("/static/data/chartspage_mounted.json");
    },
    changeZouShiTuTabsFuc(index) {
      this.zoushituDataVar.forEach((el, i) => {
        if (index == i) {
          el.status = 1;
          this.tabName = el.title;
        } else {
          el.status = 0;
        }
      });
    },
    clickCheckbox(index) {
      switch (index) {
        case 0:
          this.isFuZhuXianChecked = true;
          break;
        case 1:
          this.isOmitChecked = true;
          break;
        case 2:
          this.isYiLouTiaoChecked = true;
        case 3:
          console.log(1);
        case 4:
          this.isNumberTempChecked = true;
        default:
          break;
      }
    },
    llQueryData() {}
  }
};
</script>

<style lang="less">
@import url(../../assets/css/chartspage.less);
</style>