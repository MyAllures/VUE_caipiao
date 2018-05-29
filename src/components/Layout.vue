<template>
  <div>
    <div class="public-header">
      <div class="container">
        <el-row class="logo-slogan">
          <el-col :span="12">
            <img class="logo header-logo" :src="logoUrl" alt="logo">
          </el-col>
          <el-col :span="12" class="my_text_right">
            <img class="slogan" :src="sologanUrl" alt="slogan">
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="public-nav">
        <HeaderTabs :headerTabs = parentHeaderTabs></HeaderTabs>
    </div>
    <div class="public-content">
      <div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div class="public-footer">
      <div class="footer-top">
        <div class="container">
          <el-row>
            <el-col :span="4">
              <img class="footer-slogan" :src="logoUrl" alt="页面底部slogan">
            </el-col>
            <el-col :span="5" v-for="(item,index) in footerDet" :key="index">
              <div class="top-text-title">
                <span>{{item.title}}</span>
              </div>
              <div class="top-text-line"></div>
              <div class="top-text-content">
                <ul>
                  <li v-for="(item,index) in item.lists" :key="index">{{item}}</li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footer-bottom my_text_center">
        <p>{{copyRight}}</p>
      </div>
    </div>
  </div>

</template>

<script>
import HeaderTabs from "./HeaderTabs";
import TabsHoverSection from "../components/TabsHoverSection";

export default {
  components: {
    HeaderTabs,
    TabsHoverSection
  },
  data(){
    return {
      logoSloganTabsFooter:null,
      logoUrl:'',
      sologanUrl:'',
      parentHeaderTabs:[],
      footerDet:[],
      copyRight:'',
      isShowHoverBox:false
    }
  },
  mounted(){
    this.axios.get('/static/data/logo_slogan_tabs_footer.json').then(res=>{
      if(res.data.status){
        this.logoSloganTabsFooter = res.data.data;
        this.logoUrl = this.logoSloganTabsFooter.logo;
        this.sologanUrl = this.logoSloganTabsFooter.slogan;
        this.parentHeaderTabs = this.logoSloganTabsFooter.tabs;
        this.footerDet = this.logoSloganTabsFooter.footer;
        this.copyRight = this.logoSloganTabsFooter.copyright;
      }else{
        console.log(res.data.message);
      }
    }).catch(err=>{
      console.log(err);
    });
  },
};
</script>

<style lang="less">
@import url(../assets/css/public.less);
@import url(../assets/css/layout.less);
</style>


