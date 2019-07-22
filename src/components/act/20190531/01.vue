<!--  -->
<template>
  <div class='act20190531'>
    <div class="revert" @click="back">
			<i class="icon iconfont icon-jiantou-copy color_f"></i>
		</div>
    <div class="info" @click="share" v-if="!wxDevice">
      <i class="icon iconfont icon-tubiao212 color_f"></i>
    </div>
    <div class="img-box" >
      <img src="../../../../static/img/act/20190531/mob-1-1.png" alt="">
    </div>
    <div class="sign">
        <span class="btn">
            <a href="http://m.miningcircle.com/exhibition/details?id=eb150011752740cab616b17770c9ec2a&newpage=newpage">点击报名</a>
        </span>
    </div>
    <!-- <actionsheet v-model="show1" :menus="shareType" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')" @on-click-menu-type1="shareWX" @on-click-menu-type2="sharePYQ" @on-click-menu-type3="shareWB" @on-click-menu-type4="shareQQKJ"></actionsheet> -->
  </div>
</template>

<script>
import {
    wxShare,
    lastPage,
    isDevice,
    getAppShare,

} from '@/assets/commonjs/util.js';
export default {
  components: {},
  data() {
    return {
      show1:false,
      url:window.location.href,
      wxDevice:false
    };
  },
  created() {
    let title = '2019第二届中国国际矿业交易大会'
    let desc = '矿业盘整多年，新年迎来新的机遇，矿业投融资和大宗贸易日趋活跃。如何融资，如何构建股权融资、抵押贷款、信用贷款、融资租赁、保理授信等渠道，参与第二届国际矿业交易大会为您找到合适的解决方案。'
    wxShare(this.$root.urlPath.MCT + '/wx/share', this.url, title, '', desc, '');
    if(isDevice() == '微信浏览器'){
      this.wxDevice = true
    }
  },
  computed: {

  },
  watch: {},
  methods: {
    back() {
				lastPage()
    },
    share() {
      if(isDevice() == "其他浏览器") {
        // this.show1 = true
      }else{
        getAppShare(this.url,'2019第二届中国国际矿业交易大会', '', '矿业盘整多年，新年迎来新的机遇，矿业投融资和大宗贸易日趋活跃。如何融资，如何构建股权融资、抵押贷款、信用贷款、融资租赁、保理授信等渠道，参与第二届国际矿业交易大会为您找到合适的解决方案。', "")
      }
    },
  },
}
</script>

<style lang='' scoped>
	.act20190531 {
		position: relative;
	}
  .act20190531 img{
    width: 100%;
  }
  .act20190531 .revert{
    top: 0.66rem;
  }
	.act20190531 .info {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0.6rem;
		background-color: rgba(119, 110, 93, .6);
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0.66rem;
    right: 0.2rem;
	}
  .act20190531 .icon-tubiao212{
    font-size: 0.3rem;
  }
  .act20190531 .sign .btn{
    color: #00001c;
    font-size: 0.24rem;
    padding: 0.16rem 1.36rem;
    background-color: #00ffff;
    border-radius: 0.27rem;
    display: inline-block;

  }
  .act20190531 .sign{
			width: 100%;
      text-align: center;
      position: absolute;
      bottom: 1rem;
  }
  .act20190531 .img-box{
    line-height: 0;
  }
</style>
