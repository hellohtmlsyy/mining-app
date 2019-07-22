<template>
	<div class="home">
		<section>
			<!--banner-->
			<open-app @closeOpenApp="openAppShoHid"></open-app>
			<div :class="bannerPadding">
				<Mheader :class="headColoB ? 'headerCss1' : 'headerCss2'" v-if="showHeader" ></Mheader>
				<div class="fixed-swiper dis-fl text-center">
					<swiper :list="bannerImg" :duration="1000" :show-dots="true" dots-class="custom-bottom" dots-position="center" height="3.6rem" auto>
					</swiper>
				</div>
		</div>
			<!--认证-->
			<section  @click="goCert">
				<img class="va-t" src="../../../static/img/bg/bg-cert.jpg" width='100%'
    height='100%'/>
			</section>
			<!--nav-->
			<nav class="nav clearfix">
				<ul>
					<li>
						<a href="http://trade.miningcircle.com/purchase?newpage=newpage">
							<img src="../../../static/img/nav3.png" />
							<p>求购大厅 </p>
							<span class="new"></span>
						</a>
					</li>
					<li @click='toMall'>
						<img src="../../../static/img/nav4.png" />
						<p>商城</p>
					</li>
					<li @click="toMineral">
						<img src="../../../static/img/nav2.png" style="font-size:0.24rem">
						<p>矿权交易</p>
					</li>
					<li @click="toExhibition">
						<img src="../../../static/img/nav1.png" />
						<p>行业会展</p>
					</li>
					<li @click="toNews">

						<img src="../../../static/img/nav5.png" />
						<p>新闻</p>
					</li>
				</ul>
			</nav>
			<!--最新报价-->
			<div class="fixed-swiper dis-fl text-center info bgcolor newsPrice">
				<div class="info_box1">
					<span class="info_title"></span>
					<b>|</b>
				</div>
				<swiper auto height="72px" direction="vertical" :interval=2000 class="text-scroll newsPrice" :show-dots="false">
					<swiper-item v-for="(item,index) in newPriceList" :key="index" @click.native="toPurDetail(item.purchaseId)">
						<p>{{item.title}}的求购单刚刚收到了一个报价</p>
					</swiper-item>
				</swiper>
			</div>
      <!-- 紧急求购 -->
      <section class="urgPurchase bgcolor_f">
        <div class="common_top clearfix">
					<span class="title">紧急求购</span>
          <span class="lab">快人一步，抢占先机</span>
					<span class="more">
            <span @click="toPur" class="more">更多<span>&gt;</span>
					</span>
					</span>
				</div>
        <ul>
          <li v-for="(item,i) in urgPurchase" :key="i" :style="{background:item.bgColor}" @click="toPurDetail(item.id)">
            <h1>{{item.title}}</h1>
            <img :src="item.img" />
          </li>
        </ul>
      </section>
			<!--全球数据库-->
			<!--<div class="data-base" @click="goDataBaseList">
				<img src="../../../static/img/data-base.png" />
			</div>-->
			<!--行情-->
			<!--<div class="market">
				<div class="common_top clearfix">
					<span class="title">矿业行情</span>
					<span class="more">
                	<span @click="toMarketList" class="more">更多<span>&gt;</span>
					</span>
					</span>
				</div>
				<x-table :cell-bordered="false" style="background-color:#fff;">
					<tbody>
						<tr v-for="(item,index) in marketList" :key="index" @click="toMarketDetails">
							<td>{{item.name}}</td>
							<td class="dissFont">{{item.price}}</td>
							<td class="dissFont">{{item.riratio}}</td>
						</tr>
					</tbody>
				</x-table>
			</div>-->
			<!--精品好货-->
			<div class="good_stuff">
				<div class="topA">
					<span class="title" style="font-size: 0.28rem;color:#FF393F;font-weight: bold;">精品好货</span>
				</div>
				<div class="swiper-container swiper1" id="swiper1">
					<div class="swiper-wrapper">

						<div class="swiper-slide" v-for="(item,index) in topMallList" :key="index" @click="toMallDetails(item.res_id,item.cat_id)">
							<div class="good_stuff_conBox">

								<img :src="item.img ? item.img : item.image" style="display:block" />
								<div class="textBox">
									<p class="title clamp">{{item.title}}</p>
									<p class="title2" v-if="item.price && item.price !==0">{{item.price  | converAmount(2)}}</p>
									<p class="title2" v-else>面议</p>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
			<!--新闻快讯-->
			<div class="newws">
				<div class="topA">
					<span class="titleText">新闻快讯</span>
					<span class="more fr">
                	<label @click="toNews" class="more">更多<span>&gt;</span>
					</label>
					</span>
				</div>
				<div class="bottomA clearfix" v-for="(item,index) in newsList" :key="index" @click="toNewsDetails(item.id)">
					<div class="fl" v-show="item.img">
						<img :src="item.img">
					</div>
					<div class="content fl">
						<div class="title">
							<p class="clamp2">{{item.title}}</p>
						</div>
						<div class="label clearfix">

							<span class="type fl">{{item.specification}}</span>
							<span class="fl">{{item.vfrom}}</span>
							<span class="fl">{{item.insert_time}}</span>

						</div>
					</div>
				</div>
			</div>
			<!--会展中心与矿权交易同一个样式-->
			<div class="mineTrade">
				<div class="common_top clearfix">
					<span class="title huizhanTitle">行业会展</span>
					<span class="more">
                	<span @click="toExhibition" class="more">更多<span>&gt;</span>
					</span>
					</span>
				</div>
				<div class="swiper-container swiper3">
					<div class="swiper-wrapper">
						<div class="swiper-slide swiperBox2" v-for="(item,index) in meetList" :key="index" @click="toMeetDetails(item.res_id)">
							<img :src="item.img ? item.img :item.image" />
							<div class="textBox">
								<div class="text1 clearfix">
									<p class="title1 comtitlefontsize26 clamp">{{item.title}}</p>
									<span class="stage fl comsmalltitlefontsize20 clamp">{{item.address}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--商品贸易-->
			<div class="ware bgcolor_f">
				<div class="common_top clearfix">
					<span class="title">商品贸易</span>
					<span class="more">
                	<span @click="toMall" class="more">更多<span>&gt;</span>
					</span>
					</span>
				</div>
				<div class="ware_bottom">
					<ul>
						<li @click="toMallType1List">
							<img src="../../../static/img/img5.png" />
						</li>
						<li class="same_css" @click="toMallType2List">
							<img src="../../../static/img/img4.png" />
						</li>

						<li class="same_css" @click="toMallType3List">
							<a href="#">
								<img src="../../../static/img/img2.png" />
							</a>
						</li>
						<li class="same_css" @click="toMallType4List">
							<a href="#">
								<img src="../../../static/img/img3.png" />
							</a>
						</li>
						<li class="same_css" @click="toMallType5List">
							<a href="#">
								<img src="../../../static/img/img7.png" />
							</a>
						</li>

						<li class="same_css" @click="toMallType6List">
							<a href="#">
								<img src="../../../static/img/img6.png" />
							</a>
						</li>
						<li class="same_css" @click="toMallType7List">
							<a href="#">
								<img src="../../../static/img/img1.png" />
							</a>
						</li>
						<li class="same_css" @click="toMallType8List">
							<a href="#">
								<img src="../../../static/img/img8.png" />
							</a>
						</li>
						<div style="clear:both"></div>
					</ul>
				</div>
			</div>

			<!--广告-->
			<!-- <div class="exclusive" style="margin: 0.15rem 0;
		position: relative;">
				<div class="fixed-swiper dis-fl text-center" v-show="showSwiper">
					<span class="close" @click="closeSwiper"></span>
					<swiper :list="advertList" :duration="1000" :show-dots="false" dots-class="custom-bottom" dots-position="center" height="2.4rem" :auto="true" style="width:100%">
					</swiper>
				</div>
			</div> -->
			<!--矿权交易-->
			<div class="mineTrade">
				<div class="common_top clearfix">
					<span class="title kuangquanTitle">矿权交易</span>
					<span class="more">
                	<span @click="toMineral" class="more">更多<span>&gt;</span>
					</span>
					</span>
				</div>
				<div class="swiper-container swiper2">
					<div class="swiper-wrapper">
						<div class="swiper-slide swiperBox2" v-for="(item,index) in projectList" :key="index" @click="toMineralDetails(item.res_id)">
							<img :src="item.img ? item.img :item.image" />
							<div class="textBox">
								<div class="text1">
									<p class="title1 comtitlefontsize26 clamp">{{item.title}}</p>
									<p class="stage comsmalltitlefontsize20">阶段：{{item.jd}}</p>
								</div>
							</div>
							<label :class="{smPag:smPag,smPag1:smPag1,smPag2:smPag2,smPag3:smPag3}"></label>
						</div>
					</div>
				</div>
			</div>
			<!--为您推荐-->
			<div class="groom" style="padding-top:0;position:relative;">
				<div class="top common_top titlemp  bgcolor_f clearfix">
					<div class="fl">
						<span class="title">新品推荐</span>
					</div>
					<div class="icoliebiao fr">
						<label @click="toMall" class="more groomMore">更多<span>&gt;</span></label>
						<i class='icon iconfont' :class="shohid ? 'icon-liebiao' : 'icon-liebiao1'" @click="switchS"></i>
					</div>
				</div>
				<div ref="listSection" id="scrop">
					<Malllist :shohid="shohid" :list="mallList"></Malllist>
				</div>
				<load-more :tip="loadingCon" :show-loading="loading" v-show="loading"></load-more>
				<divider v-show="droploadDowm">已加载所有数据</divider>
			</div>
		</section>
		<section>
			<span class="btn-backtop" v-show="showBackTop" @click="goBackTop"></span>
		</section>

		<footer-m>

		</footer-m>
	</div>
</template>

<script>
	import { Swiper, SwiperItem, cookie, XTable} from 'vux';
	import Mheader from '@/components/common/header/Mheader';
	import { getTime, isDevice, appLogin } from '@/assets/commonjs/util.js';
	import swiper2 from '@/static/js/swiper.min.js';
	import axios from 'axios'
	import Malllist from '@/components/common/Mall-list'
	import openApp from '@/components/base/openApp'
	import footerM from '@/components/base/footerM'

	const loginUrl = 'http://member.miningcircle.com/login?where=mcVue';
	const baseList = [{
		img: '../../../static/img/banner.jpg'
	}, {
		img: '../../../static/img/banner2.jpg'
	}]

	const imgExclusiveList = [{
		img: '../../../static/img/01_banner-b.png',
	}, {
		img: '../../../static/img/01_banner-b.png',
	}]

	const navbgExclusiveList = [{
		img: '../../../static/img/03_项目交易.png',
		name: '热门项目'
	}, {
		img: '../../../static/img/03_明星旗舰.png',
		name: '明星旗舰'
	}, {
		img: '../../../static/img/03_近期会展.png',
		name: '近期会展'
	}]


	const imgList = [
"http://www.miningcircle.com:8082/img/new2.0/home/banner/banner1.jpg",
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]
	export default {
		components: {
			Mheader,
			Swiper,
			SwiperItem,
			Malllist,
			XTable,
			openApp,
			footerM
		},
		data() {
			return {
				showHeader: true,
				img_list: baseList,
				info_list: [{
					img: '../../../static/img/nav1.png',
					name: '求购大厅'
				}, {
					img: '../../../static/img/nav2.png',
					name: '商城'
				}],
				img_exclusive_list: imgExclusiveList,
				navbg_exclusive_list: navbgExclusiveList,
				shohid: false, //第一种不显示
				showSwiper: true,
				bannerImg: [],
				pageNum: 1,
				numPerPage: 10,
				mallList: [],
				projectList: [],
				advertList: [],
				newsList: [],
				newPriceList: [],
				isscroll: true,
				droploadDowm: false,
				smPag: '',
				smPag1: '', //小标签
				smPag2: '',
				smPag3: '',
				off_on: false, //节流：数据加载完后加载下一页
				pages: '',
				totalCount: '',
				meetList: '',
				loading: false,
				topMallList: [],
				loadingCon: '正在加载',
				bannerPadding: {
					bannerPadding1: true,
					bannerPadding2: false
				},
				marketList: [],
				demo04_list: imgList,
				scrollTop:0.,
				showBackTop:false,
        headColoB:false,
        urgPurchase:[{
          title:'金精矿',
          img:'../../../static/img/data/1.jpg',
          bgColor:'#a84200',
          id:'1004788324885336064'
        },{
          title:'金矿石',
          img:'../../../static/img/data/2.jpg',
          bgColor:"#d56c29",
          id:'1000088482963525632'
        },{
          title:'银精矿',
          img:'../../../static/img/data/3.jpg',
          bgColor:"#898989",
          id:'1004788324885336064'
        },{
          title:'铅锌矿石',
          img:'../../../static/img/data/4.jpg',
          bgColor:"#5f52a0",
          id:'1000088033413828608'
        },{
          title:'铜 铅 锡 锌混物料',
          img:'../../../static/img/data/5.jpg',
          bgColor:"#565076",
          id:'1002310319357300736'
        },{
          title:'金粉 铅锌混合粉',
          img:'../../../static/img/data/6.jpg',
          bgColor:"#6d624a",
          id:'1001282279940558848'
        },{
          title:'钯 催化剂',
          img:'../../../static/img/data/7.jpg',
          bgColor:"#535a57",
          id:'1000286584047669248'
        },{
          title:'钌 催化剂',
          img:'../../../static/img/data/8.jpg',
          bgColor:"#72787c",
          id:'1000286584047669248'
        },{
          title:'铂 催化剂',
          img:'../../../static/img/data/9.jpg',
          bgColor:"#72787c",
          id:'1000286584047669248'
        },]
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll);

			if(isDevice() == 'ios') {
				if(!this.$route.query.newpage) {
					this.showHeader = false
				} else {
					this.showHeader = true
				}
			}

//			if(isDevice() == 'ios') {
//				this.bannerPadding.bannerPadding2 = false
//				this.bannerPadding.bannerPadding1 = false
//			} else if(isDevice() == 'adr') {
//				this.bannerPadding.bannerPadding2 = true
//				this.bannerPadding.bannerPadding1 = false
//			}

			this.scrollValue();

			this.getBanner()

			this.getNewPrice()

			this.getTopMallList()

			this.getNewsList()

			this.getAdvert()

			this.getProject()

			this.getMallList()

			this.getMeetList()

			//			this.getMarketList()
		},
		computed: {
			headeColo(){
				if(this.headColoB){
					return '#000'
				}else{
					return '#0094e800'
				}
			}
		},
		methods: {
			switchS(){
				this.shohid = !this.shohid
			},
			goCert(){
				if(cookie.get('MC_UID')) {
          window.location.href = this.$root.urlPath.MCM + '/vip?newpage=newpage';
					// this.$axios.get(this.$root.urlPath.MCT + '/wap/company/comInfo')
					// .then(res => {
					// 	var data = res.data
					// 	if(data.status == 2){//已经认证了
					// 		window.location.href=this.$root.urlPath.MCM+"/users/entcenter?newpage=newpage"
					// 	}else if(data.status == 0 || data.status == 3){//没认证
					// 		window.location.href = this.$root.urlPath.MCMHALL + '/cert?newpage=newpage';
					// 	}else if(data.status == 1){
					// 		this.$vux.toast.text('您的企业正在申请中<br/>客服：400-819-6985', 'center');
					// 	}else if(data.status == 4){
					// 		this.$vux.toast.text('您的企业已冻结<br/>客服：400-819-6985', 'center');
					// 	}else if(res.data.errCode = '001002140'){
					// 		window.location.href = this.$root.urlPath.MCMHALL + '/cert?newpage=newpage';
					// 	}
					// })
					// .catch(function(error) {
					// 	alert('账户异常' + error)
					// });
				} else {
					appLogin()
				}
			},
			getCert(){

			},
			handleScroll(){
				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

				if(this.scrollTop > 5) {
					this.headColoB = true
				} else {
					this.headColoB = false
				}

				if(this.scrollTop > 700){
					this.showBackTop = true
				}else{
					this.showBackTop = false
				}

			},
			goBackTop(){
				window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0
			},
			goTest1(){
				window.location.href = 'http://t.miningcircle.com:8085';
			},
			goTest(){
				window.location.href = this.$root.urlPath.MCM + "/test?newpage=newpage";
			},
			goDataBaseList() {
				window.location.href = this.$root.urlPath.MCM + "/database/list?newpage=newpage";
			},
			getMarketList() {
				this.$axios.get(this.$root.urlPath.MC + '/wap/home.do?marketList', {
					params: {
						pageNum: 1,
						numPerPage: 3,
					}
				}).then(res => {

					if(res.data.success) {
						let data = res.data.data
						this.marketList = data.list
					}
				}).catch(function(error) {
					console.log(error)
				});
			},
			toMarketList() {
				window.location.href = this.$root.urlPath.MCM + "/market?newpage=newpage";
			},
			toMarketDetails() {
				window.location.href = this.$root.urlPath.MCM + "/market/details?newpage=newpage";
			},
			openAppShoHid(showHide) {
				if(isDevice() == 'ios' || isDevice() == 'ios') return

//				if(showHide) {
//					this.bannerPadding.bannerPadding1 = true
//					this.bannerPadding.bannerPadding2 = false
//				} else {
//					this.bannerPadding.bannerPadding2 = true
//
//					this.bannerPadding.bannerPadding1 = false
//
//				}

			},
			toPurDetail(id) {
				if(cookie.get('MC_UID')) {
					window.location.href = this.$root.urlPath.MCMHALL + '/detail?id=' + id + '&newpage=newpage';
				} else {
					appLogin()
				}
      },
      toPur(){
        window.location.href = this.$root.urlPath.MCMHALL + '/purchase?newpage=newpage'
      },
			initSwiper() {
				var mySwiper1 = new swiper2('.swiper2', {
					slidesPerView: 'auto',
					//					spaceBetween: 15,
				})
			},
			toMeetDetails(id) {
				window.location.href = this.$root.urlPath.MCM + '/exhibition/details?id=' + id + '&newpage=newpage';
			},
			toMallType1List() {
				window.location.href = this.$root.urlPath.MCM + "/mall?newpage=newpage&type=7";

			},
			toMallType2List() {
				window.location.href = this.$root.urlPath.MCM + "/mall?newpage=newpage&type=1";
			},
			toMallType3List() {
				window.location.href = this.$root.urlPath.MCM + "/mall?newpage=newpage&type=8";

			},
			toMallType4List() {
				window.location.href = this.$root.urlPath.MCM + "/mall?newpage=newpage&type=3";
			},
			toMallType5List() {
				window.location.href = this.$root.urlPath.MCM + "/mall?newpage=newpage&type=5";
			},
			toMallType6List() {
				window.location.href = this.$root.urlPath.MCM + "/mall?newpage=newpage&type=4";
			},
			toMallType7List() {
				window.location.href = this.$root.urlPath.MCM + "/mall?newpage=newpage&type=6";
			},
			toMallType8List() {
				window.location.href = this.$root.urlPath.MCM + "/mall?newpage=newpage&type=2";
			},
			toNewsDetails(id) {
				window.location.href = this.$root.urlPath.MCM + "/news/details?newpage=newpage&id=" + id;
			},
			toMallDetails(id, type) {
				type = type.toString()
				type = type.substring(0, 2);
				if(type == 32) {
					window.location.href = this.$root.urlPath.MCM + "/mall/details?id=" + id + '&newpage=newpage';
				} else if(type == 83) {
					window.location.href = this.$root.urlPath.MCM + "/mallCom/details?id=" + id + '&newpage=newpage';
				}
			},
			toMineralDetails(id) {

				if(cookie.get('MC_UID')) {
					window.location.href = this.$root.urlPath.MCM + "/mineral/projectDetails?newpage=newpage&id=" + id;
				} else {
					appLogin()
				}
			},
			toNews() {

				window.location.href = this.$root.urlPath.MCM + "/news?newpage=newpage";
			},
			toExhibition() {
				window.location.href = this.$root.urlPath.MCM + "/exhibition?newpage=newpage";
			},
			toMineral() {

				window.location.href = this.$root.urlPath.MCM + "/mineral?newpage=newpage";

			},
			toMall() {
				window.location.href = this.$root.urlPath.MCM + "/mall?newpage=newpage";
			},
			closeSwiper() {
				this.showSwiper = false
			},
			getBanner() {
				axios.get(this.$root.urlPath.MC + '/wap/home.do?banner').then(res => {

						if(res.data.success) {
							this.bannerImg = res.data.data
						} else {

						}
					})
					.catch(function(error) {

					});
			},
			getNewPrice() {
				axios.get('http://tradeapi.miningcircle.com/wap/purchase/getPurchaseByOffer').then(res => {

						if(res.data.success) {
							this.newPriceList = res.data.data

						} else {

						}
					})
					.catch(function(error) {

					});
			},
			getTopMallList() {
				axios.get(this.$root.urlPath.MC + '/wap/home.do?topMall').then(res => {

						if(res.data.success) {
							this.topMallList = res.data.data
							this.$nextTick(() => {

								var mySwiper = new swiper2('#swiper1', {
									slidesPerView: 3,
									loop : true,

									//									slidesPerGroup: 1,
									//									loop: true
								})
							})

						} else {

						}
					})
					.catch(function(error) {

					});
			},
			getNewsList() {
				axios.get(this.$root.urlPath.MC + '/wap/home.do?news').then(res => {

						if(res.data.success) {
							this.newsList = res.data.data
							for(var i in this.newsList) {
								this.newsList[i].insert_time = getTime(this.newsList[i].insert_time)
							}
						} else {

						}
					})
					.catch(function(error) {

					});
			},
			getAdvert() {
				axios.get(this.$root.urlPath.MC + '/wap/home.do?other').then(res => {

						if(res.data.success) {
							this.advertList = res.data.data

						} else {

						}
					})
					.catch(function(error) {

					});
			},
			getProject() {
				axios.get(this.$root.urlPath.MC + '/wap/home.do?yi').then(res => {

						if(res.data.success) {
							this.projectList = res.data.data
							if(this.projectList.status == 20) {
								this.smPag = true
							} else if(this.projectList.status == 30) {
								this.smPag2 = true
							} else if(this.projectList.status == 90) {
								this.smPag3 = true
							} else if(this.projectList.status == 100) {
								this.smPag1 = true
							}
							this.$nextTick(() => {
								var mySwiper1 = new swiper2('.swiper2', {
									slidesPerView: 'auto',
									//					spaceBetween: 15,
								})
							})

						} else {

						}
					})
					.catch(function(error) {

					});
			},
			getMallList() {
				this.loading = true
				axios.get(this.$root.urlPath.MC + '/wap/home.do?mallList', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						var data = res.data.data
						if(res.data.success) {

							this.loading = false
							this.off_on = true

							for(var i in data.list) {
								this.mallList.push(data.list[i])

							}

							var reg = /^(.*\.)[^.]+$/;
							for(var i = (this.pageNum - 1) * 10; i < this.mallList.length; i++) {
								this.$set(this.mallList[i], "imgS", this.mallList[i].img.replace(reg, "$1") + 's.jpg')
								this.$set(this.mallList[i], "imgM", this.mallList[i].img.replace(reg, "$1") + 'm.jpg')
							}

							this.pages = Math.ceil(data.totalCount / this.numPerPage)

							this.totalCount = data.totalCount
						} else {
							this.totalCount = res.data.data.totalCount || 0
							this.$vux.alert.show({
								title: '提示',
								content: "加载数据失败",
							})
						}
					})
					.catch(function(error) {

					});
			},
			scrollValue() {
				var that = this;
				window.addEventListener('scroll', function() {
					//获取滚动条当前的位置
					let scrollTop1 = 0;
					if(document.documentElement && document.documentElement.scrollTop) {
						scrollTop1 = document.documentElement.scrollTop;
					} else if(document.body) {
						scrollTop1 = document.body.scrollTop;
					}
					//获取当前可视范围的高度
					let clientHeight1 = 0;
					document.documentElement.scrollTop || document.body.scrollTop
					if(document.body.clientHeight && document.documentElement.clientHeight) {
						clientHeight1 = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
					} else {
						clientHeight1 = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
					}
					//获取文档完整的高度
					let goodsConHeight = document.getElementById('scrop');
					let scrollHeight1 = goodsConHeight.scrollHeight;
					//滚动事件触发
					$(window).bind('scroll', function() {
						if(scrollTop1 + clientHeight1 >= scrollHeight1 + 100) {

							if(that.off_on) {
								that.off_on = false;
								that.pageNum++;
								that.getMallList()
							}
						}
					})

					if(that.pageNum == that.pages && that.mallList.length == that.totalCount) {
						that.off_on = false;
						that.droploadDowm = true;
					}
				})
			},
			getMeetList() {
				axios.get(this.$root.urlPath.MC + '/wap/home.do?meet')
					.then(res => {
						var data = res.data.data
						if(res.data.success) {
							this.meetList = data
							this.$nextTick(() => {
								var mySwiper1 = new swiper2('.swiper3', {
									slidesPerView: 'auto',
									//					spaceBetween: 15,
								})
							})

						} else {
							//							this.$vux.alert.show({
							//								title: '提示',
							//								content: "加载数据失败",
							//							})
						}
					})
					.catch(function(error) {

					});
			}
		}

	}
</script>

<style>
	@import url("../../../static/css/swiper.min.css");
	@import url("../../static/css/certify.css");
  @import url("../../static/css/market.css");

	.home .headerCss2{
		position: absolute;
		z-index: 999;
		background: #0094e800;
	}
	.home .headerCss1{
		position: fixed;
		top: 0;
		z-index: 999;
		background: #0094E8;
	}
	/*返回顶部*/
	.home .btn-backtop{
		background: url(../../../static/img/btn/btn-backtop.png) no-repeat;
		width: 0.8rem;
		height: 0.8rem;
		display: inline-block;
		background-size: 0.8rem 0.8rem;
		position: fixed;
		bottom: 4.5rem;
    	right: 0.09rem;
    	z-index: 999;
	}
	/*全球数据库*/

	.home .data-base {
		margin-top: 0.15rem;
	}

	.home .data-base img {
		width: 100%;
		height: 1.36rem;
	}
	/*行情*/

	.home .market {
		background: #fff;
		padding: 0.26rem 0.2rem;
		margin-top: 0.15rem;
	}


	section .fixed-swiper,
	.nav,
	.exclusive {
		background-color: #fff;
	}
	/*banner*/

	.home .bannerPadding1 {
		/*padding-top: 1.95rem;*/
	}

	.home .bannerPadding2 {
		/*padding-top: 1rem;*/
	}

	section .nav {
		width: 100%;
		font-size: 0.24rem;
	}

	section .nav ul li {
		width: 20%;
		float: left;
		text-align: center;
		padding: 0.25rem 0;
		position: relative;
	}

	section .nav ul li img {
		width: 0.8rem;
		height: 0.8rem;
	}

	section .nav .new {
		position: absolute;
		z-index: 998;
		right: 0.25rem;
		top: 0.25rem;
		background: url('../../../static/img/HOT.png') center center no-repeat;
		width: 0.3rem;
		height: 0.3rem;
		background-size: 0.3rem 0.3rem
	}

	section .nav ul li p {
		text-align: center;
		margin-top: 0.05rem;
	}

	section .newsPrice .info_box1 span {
		display: inline-block;
	}

	section .info {
		width: 100%;
		height: 0.75rem;
		border-top: 1px solid rgba(229,229,229,1);
		line-height: 0.75rem;
		font-size: 0.3rem;
	}

	section .info .info_box1 {
		float: left;
	}

	section .info .info_title {
		margin: 0 0.05rem 0 0.2rem;
		background: url(../../../static/img/img.png) no-repeat center center;
		background-size: 100% 100%;
		width: 1.02rem;
		height: 0.25rem;
	}

	section .info b {
		color: rgba(210,210,210,1);
		font-weight: normal;
	}

	section .info .text-scroll p {
		color: rgb(80, 80, 80);
		margin-left: 0.1rem;
		font-size: 0.24rem;
		text-align: left;
		line-height: 0.72rem;
	}

	.common_top {
		margin-bottom: 0.24rem;
	}

	.common_top .title {
		font-size: 0.28rem;
		color: #2E2E2E;
		float: left;
		font-weight: 500;
	}

	.common_top .more {
		font-size: 0.2rem;
		color: rgb(114, 114, 114);
		float: right;
		line-height: 0.34rem;
	}

	.newsPrice .vux-swiper {
		height: 0.72rem !important;
	}

	<!--精品好货-->
	.good_stuff .topA .title {
		color: #fff
	}

	.good_stuff .swiper-container {
		padding: 0.4rem 0;
		margin-bottom: 0.2rem;
	}


	.good_stuff .swiper-slide {
		border-radius: 0.05rem;
	}

	.good_stuff img {
		width: 2.34rem;
		height: 1.23rem;
		border-radius: 0.03rem 0.03rem 0 0;
	}

	.good_stuff .textBox {
		width: 2.04rem;
		padding: 0.15rem;
		background-color: #fff;
		border-radius: 0 0 0.1rem 0.1rem;
	}

	.good_stuff .good_stuff_conBox {
		border-radius: 0.03rem;
		box-shadow:8px 0px 12px rgba(178,178,178,0.6);
		border: 0.02rem solid #E6E6E6;
	}
	.good_stuff .swiper-slide-next .textBox .title{
		font-size: 0.21rem;
	}
	.good_stuff .swiper-slide-next .textBox .title2{
		font-size: 0.17rem;
	}
	.good_stuff .textBox .title {
		font-size: 0.22rem;
	}

	.good_stuff .textBox .title2 {
		font-size: 0.18rem;
		color:red;
		margin-top: 0.03rem;
	}

	.good_stuff .swiper-slide-next {
		transform: scale(1.3) !important;
		z-index: 999;
	}

	.good_stuff .page {
		position: relative;
	}

	.good_stuff .page ul {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.good_stuff .page li {
		width: 1rem;
		height: 0.04rem;
		background-color: rgba(51, 53, 53, .7);
	}

	.good_stuff .page .cur {
		background-color: #fff;
	}

	.good_stuff {
		padding: 0.2rem 0.2rem 0.01rem 0.2rem;
		margin: 0.15rem 0;
	}

	.common_top .more a {
		color: rgb(114, 114, 114);
	}

	.newws {
		background-color: #fff
	}

	.newws .topA {
		padding: 0.2rem 0.2rem 0 0.2rem;
	}

	.newws .topA .titleText {
		font-size: 0.28rem;
		color: #EF8700;
		font-weight:500;
	}

	.newws .topA .more {
		font-size: 0.2rem;
		color: rgb(146, 146, 146);
		line-height: 0.37rem;
	}

	.newws .bottomA {
		padding: 0.2rem;
		border-bottom: 0.01rem solid rgb(230, 230, 230)
	}

	.newws .bottomA img {
		width: 2rem;
		height: 1.3rem;
	}

	.newws .bottomA .content {
		margin-left: 0.2rem
	}

	.newws .bottomA .content .title {
		margin-bottom: 0.3rem;
	}

	.newws .bottomA .content .title p {
		font-size: 0.26rem;
		width: 4.68rem;
		height: 0.7rem;
	}

	.newws .bottomA .content .label {
		font-size: 0.2rem;
		line-height: 0.26667rem;
		height: 0.26667rem;
	}

	.newws .bottomA .content .label span {
		margin-right: 0.2rem;
		color: rgb(125, 125, 125)
	}

	.newws .bottomA .content .label .type {
		color: rgb(0, 165, 247)
	}

	.newws .bottomA:nth-child(3) {
		border-bottom: 0
  }
  /* 紧急求购 */
  .home .urgPurchase .common_top .title{
    color: #ff393f;
  }
  .home .urgPurchase .lab{
    color:#fff;
    font-size:0.22rem;
    background-color: #ff393f;
    padding:0.06rem 0.12rem;
    border-radius: 0.17rem;
    margin-left:0.3rem;
    line-height: 0.39rem;
  }
.home .urgPurchase  ul{
  display: flex;
  flex-wrap:wrap;
  justify-content: space-between;
}
.home .urgPurchase  ul h1{
  color:#fff;
  font-size: 0.26rem;
}
.home .urgPurchase  ul li{
  border-radius: 0.05rem;
  width: 2.26rem;
  height: 2.27rem;
  text-align: center;
  margin-bottom:0.15rem;
  line-height: 0.52rem;
}
.home .urgPurchase  ul li:nth-last-child(2), .urgPurchase  ul li:last-child, .urgPurchase  ul li:nth-last-child(3){
  margin-bottom:0;
}
.home .urgPurchase img{
  width: 2rem;
  height: 1.6rem;
  border-radius: 0.1rem;
}
	/*<!--商品贸易-->.ware .ware_bottom ul {}*/
	.ware li img{
		border-radius: 0.07rem;
	}

	.ware .title{
		color: #FF393F;
		font-weight:bold;
	}
	.ware .ware_bottom{
		line-height: 0;
	}
	.ware .ware_bottom ul .same_css {
		float: left;
	}

	.ware .ware_bottom ul img {
		width: 2.26rem;
		height: 2.26rem;
	}

	.ware .ware_bottom ul li:nth-child(1) {
		margin-right: 0.15rem;
		float: left;
	}

	.ware .ware_bottom ul li:nth-child(3) {
		margin: 0.15rem 0
	}

	.ware .ware_bottom ul li:nth-child(4) {
		margin: 0.15rem
	}

	.ware .ware_bottom ul li:nth-child(5) {
		margin: 0.15rem 0 0.15rem 0
	}

	.ware .ware_bottom ul li:nth-child(7) {
		margin: 0 0.15rem
	}

	.ware .ware_bottom ul li:nth-child(1) {
		margin-right: 0.15rem;
		float: left;
	}

	.ware .ware_bottom ul li:nth-child(1) img {
		width: 4.66rem;
		height: 2.26rem;
	}

	<!--广告-->.exclusive {
		margin: 0.2rem 0;
		position: relative;
	}

	.exclusive .fixed-swiper .close {
		position: absolute;
		z-index: 998;
		right: 0px;
		top: 0px;
		width: 30px;
		height: 30px;
		background: url('../../../static/img/close.png') center center no-repeat
	}

	.exclusive .other {
		padding-left: 20px;
		padding-right: 20px
	}

	.exclusive .nav {
		width: 100%;
		height: 1.8rem;
	}

	.exclusive .nav ul li {
		width: 33%;
		height: 1.45rem;
		float: left;
		text-align: center;
	}

	.exclusive .nav ul li:nth-child(2) {
		border-left: 1px solid rgb(228, 228, 228);
		border-right: 1px solid rgb(228, 228, 228);
	}

	.exclusive .nav ul li img {
		width: 0.6rem;
		height: 0.6rem;
	}

	.exclusive .nav ul li p {
		font-size: 0.26rem;
	}

	.exclusive .nav ul li .cname1 {
		color: rgb(253, 162, 71);
	}

	.exclusive .nav ul li .cname2 {
		color: rgb(255, 150, 251);
	}

	.exclusive .nav ul li .cname3 {
		color: rgb(220, 186, 247);
	}
	/*矿权交易*/
	/*热门*/
	.mineTrade .kuangquanTitle{
		color: #008C73;
	}
	.mineTrade{
		padding: 0.2rem;
    	margin-top: 0.15rem;
	}
	.mineTrade .swiperBox2 {
		margin-right: 0.15rem;
	}

	.mineTrade .swiper2 img {
		position: relative;
	}

	.mineTrade .swiper2 .swiperBox2 label {
		display: block;
		background-size: 0.6rem 0.6rem;
		width: 0.6rem;
		height: 0.6rem;
		position: absolute;
		left: 0;
		top: 0;
	}

	.smPag {
		background: url(../../../static/img/img9.png) no-repeat;
	}
	/*过期*/

	.smPag1 {
		background: url(../../../static/img/img10.png) no-repeat;
	}
	/*推荐*/

	.smPag2 {
		background: url(../../../static/img/img11.png) no-repeat;
	}
	/*完成*/

	.smPag3 {
		background: url(../../../static/img/img12.png) no-repeat;
	}

	.mineTrade .swiperBox2 {
		width: 3rem !important;
		border: 1px solid rgb(229, 229, 229);
		border-radius: 0.05rem;
	}

	.mineTrade img {
		width: 3rem;
		height: 1.6rem;
	}

	.mineTrade .text1 {
		padding: 0.1rem 0.2rem;
	}
	.mineTrade .huizhanTitle{
		color:#6540FF;
	}
	.mineTrade .title {
		line-height: 0.34rem !important;
		font-weight:bold;
	}

	.mineTrade .stage {
		line-height: 0.38rem;
	}

	/*为您推荐*/
	.groom{
		padding-bottom:1rem
	}
	.groom .groomMore{
		float:none;
		display: inline-block;
    	vertical-align: top;
    	margin:0.03rem 0.3rem 0 0;
	}
	.groom .top {
		margin-bottom: 0;
		position: relative;
	}

	.groom .firstNews img {
		width: 1.65rem;
		height: 1.65rem;
	}

	.groom .firstNews .contentItem:nth-child(1) {
		border-top: 1px solid rgb(230, 230, 230);
	}

	.groom .titlemp {
		margin-bottom: 0;
		height: 0.4rem;
	}

	.groom .icon-liebiao {
		font-size: 0.35rem;
	}

	.groom .icon-liebiao1 {
		font-size: 0.35rem;
	}

	.groom .topM {
		height: 1.1rem;
	}
</style>
