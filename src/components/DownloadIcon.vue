<template>
    <div>
        <div class="download-icon-box my_text_center">
            <div class="pc-icon" @mouseover="PCChoosed" @mouseout="PCNotChoosed">
                <img class="icon-pic" :src='pcnot' alt="">
                <div class="icon-text">
                    <span :class="{active:isPCChoosed}">PC版下载</span>
                </div>
            </div>
            <div class="android-icon" @mouseover="AndroidChoosed" @mouseout="AndroidNotChoosed">
                <img class="icon-pic" :src='androidnot' alt="">
                <div class="icon-text">
                    <span :class="{active:isAndroidChoosed}">安卓版下载</span>
                </div>
            </div>
            <div class="ios-icon" @mouseover="IOSChoosed" @mouseout="IOSNotChoosed">
                <img class="icon-pic" :src='iosnot' alt="">
                <div class="icon-text">
                    <span :class="{active:isIOSChoosed}">IOS版下载</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PCNot from "../assets/imgs/pc-not-choosed.png";
import AndroidNot from "../assets/imgs/android-no-choosed.png";
import IOSNot from "../assets/imgs/ios-no-choosed.png";
import PCChoosed from "../assets/imgs/pc-choosed.png";
import AndroidChoosed from "../assets/imgs/android-choosed.png";
import IOSChoosed from "../assets/imgs/ios-choosed.png";

export default {
    data(){
        return {
            pcnot:PCChoosed,
            androidnot:AndroidNot,
            iosnot:IOSNot,
            isPCChoosed:true,
            isAndroidChoosed:false,
            isIOSChoosed:false
        }
    },
    methods:{
        PCChoosed(){
            this.pcnot = PCChoosed;
            this.isPCChoosed = true;
        },
        PCNotChoosed(){
            this.pcnot = PCNot;
            this.isPCChoosed = false;
        },
        AndroidChoosed(){
            this.androidnot = AndroidChoosed;
            this.isAndroidChoosed = true;
            this.pcnot = PCNot;
            this.isPCChoosed = false;
        },
        AndroidNotChoosed(){
            this.androidnot = AndroidNot;
            this.isAndroidChoosed = false;
        },
        IOSChoosed(){
            this.iosnot = IOSChoosed;
            this.isIOSChoosed = true;
            this.pcnot = PCNot;
            this.isPCChoosed = false;
        },
        IOSNotChoosed(){
            this.iosnot = IOSNot;
            this.isIOSChoosed = false;
        }        
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/downloadIcon.less);
</style>


