<template>
	<div class="mall">
		<div class="headerBox">
			<Oheader :class="scrollD ? 'headerSty1' : 'headerSty2'" :title="title" v-if="showHeader" ref="header" :bgColor="bgColor"></Oheader>
			<div class="swiper-container" id="swiper1">
				<div class="swiper-wrapper">
					<div class="swiper-slide swiperBox2" @click="goAddGoods">
						<img src="../../../static/img/data/banner-mall.png" />
					</div>
				</div>
			</div>
		</div>
		<div class="mall-nav channelBTab clearfix " :class="dealNavTop"  ref="nav">
			<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="fl" style="width: 6.72rem;overflow:scroll;-webkit-overflow-scrolling:touch;">
					<tab ref="tabBox" style="background-color: #f2f4f5;font-size: 0.28rem" active-color="rgb(225, 158, 36)" :line-width="3" :style="{width: tabWidth + 'px'}">
						<tab-item v-for="(item,index) in column" :key="index" @on-item-click="tabClick(item.value)" :selected="item.value == curTab">{{item.name}}
						</tab-item>
					</tab>
				</div>
				<div class="icoliebiao fr" @click="shohid = !shohid">
					<i class='icon iconfont ico-way' :class="shohid ? 'icon-liebiao' : 'icon-liebiao1'" ></i>
				</div>
			</sticky>
		</div>
		<div ref="listSection" :class="iosmargintop ? 'iosmargintop' : 'margintop'">
			<my-scroll ref="scroll" @loadmore='goWhere' :isTab="isTab" :total="total" >
				<Malllist :shohid="shohid" :list="mallList" :imgShow="imgShow"></Malllist>
			</my-scroll>
		</div>
		
		<div class="addMall" @click="goAddGoods">
			<span>发布<br>商品</span>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { isDevice,appLogin} from '@/assets/commonjs/util.js';
	import { Tab, TabItem, Sticky, Flexbox, FlexboxItem,cookie} from 'vux'
	import Oheader from '@/components/common/header/Oheader'
	import Malllist from '@/components/common/Mall-list'
	import myScroll from '@/components/base/myScroll'
	import swiper from '@/static/js/swiper.min.js';
	
	export default {
		components: {
			Sticky,
			Oheader,
			Malllist,
			Tab,
			TabItem,
			Flexbox,
			FlexboxItem,
			myScroll
		},
		data() {
			return {
				showHeader: true,
				title: '商城',
				shohid: true,
				column: [{name:"全部",value:0}, 
				{name:"金属矿产",value:1}, 
				{name:"有色金属",value:2},
				{name:"黑色金属",value:3},
				{name:"能源矿产",value:4},
				{name:"稀有金属",value:5},
				{name:"非金属",value:6},
				{name:"矿用设备",value:7},
				{name:"耗材药剂",value:8}],
				curTab:'',
				mallList: [],
				pageNum: 1,
				numPerPage: 10,
				tabWidth: document.body.clientWidth,
				total: 0,
				iosmargintop: '',
				imgShow: true,
				isTab:false,
				classify:this.$route.query.classify,
				scrollD:false
			}
		},
		mounted() {
			
			window.addEventListener('scroll', this.handleScroll);
			
			this.$nextTick(() => {
				var mySwiper1 = new swiper('#swiper1', {
					slidesPerView: 'auto',
					//					spaceBetween: 15,
				})
			})
			
			
			if(this.$route.query.type == undefined){
				this.curTab = 0
			}else{
				this.curTab = this.$route.query.type
			}
			
			if(isDevice() == 'ios') {
				if(!this.$route.query.newpage) {
					this.showHeader = false
//					this.iosmargintop = true
				} else {
					this.showHeader = true
//					this.iosmargintop = false
				}
			} else if(isDevice() == 'adr') {
//				this.iosmargintop = false
			} else {
//				this.iosmargintop = false
			}
			
//			if(this.$route.query.classify){
//				this.getClassify()
//			}else{
//				this.getMallList()	
//			}
			this.goWhere()
		},
		computed:{
			dealNavTop(){
				if(isDevice() == 'ios' && !this.showHeader && this.scrollD){
					return 'topVal2'
				}else if(this.scrollD){
					return 'topVal1'
				}
			},
			
			bgColor(){
				if(this.scrollD){
					return '#0094E8'
				}else{
					return '#0094e800'
				}
			}
		},
		methods: {
			goAddGoods(){
				if(cookie.get('MC_UID')) {
					this.$axios.get(this.$root.urlPath.MCT + '/wap/company/comInfo')
					.then(res => {
						var data = res.data
						
						if(data.status == 2){//已经认证了
							window.location.href = 'http://www.miningcircle.com/user/mg.do?landing7'
						}else if(data.status == 0 || data.status == 3){//没认证
							window.location.href = this.$root.urlPath.MCMHALL + '/cert?newpage=newpage&where=appMC';
						}else if(data.status == 1){
							this.$vux.toast.text('您的企业正在申请中<br/>客服：400-819-6985', 'center');
						}else if(data.status == 4){
							this.$vux.toast.text('您的企业已冻结<br/>客服：400-819-6985', 'center');
						}
					})
					.catch(function(error) {
						alert('账户异常' + error)
					});
				} else {
					appLogin()
				}
			},
			handleScroll(){
				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				
				if(this.scrollTop > 4) {
					this.scrollD = true
				} else {
					this.scrollD = false
				}
			},
			goWhere(){
				if(this.$route.query.classify && !this.isTab){
					this.getClassify()
				}else{
					this.getMallList()	
				}
			},
			getClassify(){
				this.$axios.get(this.$root.urlPath.MC + '/wap/mall.do?category', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
							type:this.classify
						}
					})
					.then(res => {
						var data = res.data
						
						if(data.success){
							this.$refs.scroll.loaded()
							
							this.mallList = this.mallList.concat(data.data.list)
							this.total = data.data.totalCount
							
							var reg = /^(.*\.)[^.]+$/;
							for(var i = (this.pageNum - 1) * 10; i < this.mallList.length; i++) {
								if(this.mallList[i].img){
									this.$set(this.mallList[i], "imgS", this.mallList[i].img.replace(reg, "$1") + 's.jpg')
									this.$set(this.mallList[i], "imgM", this.mallList[i].img.replace(reg, "$1") + 'm.jpg')
								}
								
							}
							
							if(this.total == this.mallList.length && this.total !== 0){
								this.$refs.scroll.complete()
							}else{
								this.pageNum++
							}
						}else{
							if(data.errMsg == '暂无数据'){
								this.total = 0
								this.$refs.scroll.loaded()
							}
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			tabClick(value) {
				this.$refs.scroll.init()
				this.pageNum = 1
				this.mallList = []
				this.curTab = value
				this.isTab = true
				
				this.getMallList()
			},
			getMallList() {
				axios.get(this.$root.urlPath.MC + '/wap/mall.do?mallList', {
						params: {
							mineralId: this.curTab,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						
						if(res.data.success) {
							
							this.$refs.scroll.loaded()
							var data = res.data.data.list
							if(data == 'null'){
								alert("nullmal")
							}
							this.total =res.data.data.totalCount
							this.mallList = this.mallList.concat(data)
							
							var reg = /^(.*\.)[^.]+$/;
							for(var i = (this.pageNum - 1) * 10; i < this.mallList.length; i++) {
								if(this.mallList[i].img){
									this.$set(this.mallList[i], "imgS", this.mallList[i].img.replace(reg, "$1") + 's.jpg')
									this.$set(this.mallList[i], "imgM", this.mallList[i].img.replace(reg, "$1") + 'm.jpg')
								}
								
							}

							if(this.total == this.mallList.length && this.total !== 0){
								this.$refs.scroll.complete()
							}else{
								this.pageNum++
							}
						}else{
							if(data.errMsg == '暂无数据'){
								this.total = 0
								this.$refs.scroll.loaded()
							}
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},		
		}
	}
</script>

<style>
	@import url("../../../static/css/swiper.min.css");
	::-webkit-scrollbar {
		width: 0px;
		display: none;
		background-color: #fff;
	}
	.mall .headerBox{
		line-height: 0;
	}
	.mall .swiper-container img{
		width:100%
	}
	.mall .headerSty1{
		/*background-color:#0094E8 !important;*/
	}
	.mall .headerSty2{
		/*background-color:#0094e800 !important;*/
	}
	.mall .oHeader .centerA {
		width: 4.8rem
	}
	
	.mall {
		background: #EEEEEE;
	}
	/*nav*/
	
	/*.mall .mall-nav {
		position: fixed;
		left: 0;
		width: 100%;
	}*/
	
	.mall .topVal1 {
		top: 1rem;
		position: fixed;
		left: 0;
		width: 100%;
	}
	.mall .topVal2 {
		top: 0;
		position: fixed;
		left: 0;
		width: 100%;
	}
	.mall .ico-way{
		margin: 0 0.2rem;
		padding-left: 0;
	}
	/*商品详情*/
	
	.malldetails .channelTab .bottom {
		font-size: 0.24rem;
		color: rgb(51, 51, 51);
	}
	
	.malldetails .channelTab .bottom p {
		line-height: 0.37rem;
	}
	/*列表*/
	
	
	
	.mall .margintop {
		margin-top: 0.15rem;
	}
	
	.mall .iosmargintop {
		margin-top: 1rem;
	}
	
	/*发布商品*/
	.mall .addMall{
		width:0.9rem;
		height:0.9rem;
		background:rgba(241,44,50,1);
		border-radius:50%;
		box-shadow:0px 0px 0.05rem rgba(213,144,146,0.6);
		color: #fff;
		text-align: center;
		position: fixed;
		bottom: 2.5rem;
		right: 0.2rem;
	}
	.mall .addMall span{
		margin-top: 0.1rem;
		display: inline-block;
		font-size: 0.22rem;
	}
</style>