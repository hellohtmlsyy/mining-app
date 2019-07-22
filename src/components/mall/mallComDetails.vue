<template>
	<div class="malldetails">
		<div>
			<open-app></open-app>
			<div class="carousel">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,index) in imgs" :key="index">
							<img width="100%" height="100%"  :src="item" />
						</div>
					</div>
				</div>
				<div class="swiper-pagination"></div>
				<div class="revert" @click="back">
					<i class="icon iconfont icon-jiantou-copy color_f"></i>
				</div>
				<div class="info" @click="share" v-if="!wxDevice">
					<i class="icon iconfont icon-tubiao212 color_f"></i>
				</div>
			</div>
			<div class="details bgcolor">
				<div class="common">
					<div class="title clearfix">
						<div class="priceType huanrao fl">{{mallDetailsList.title2}}</div>
						<div class="namee">{{mallDetailsList.title}}</div>
					</div>
					<flexbox class="contentrow">
						<flexbox-item>
							<div class="flex-demo content">
								<p>{{mallDetailsList.vdesc}}</p>
							</div>
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo priceBox clearfix">
								<div class="fl" v-if="mallDetailsList.price && mallDetailsList.price !==0">
									<span class="money">{{mallDetailsList.price | converAmount(2)}}</span>
								</div>
								<div class="fl" v-else>
									面议
								</div>
								<div class="fl" v-show="mallDetailsList.original_price !== 0 && mallDetailsList.original_price !== '' && mallDetailsList.original_price !== null">
									<label>原价</label>
									<s>￥{{mallDetailsList.original_price}}</s>
								</div>
							</div>
						</flexbox-item>
					</flexbox>
				</div>
			</div>
		</div>
		<!--商品参数-->
		<div class="channelTab">
			<div class="topA">
				<div class="titleBox">
					商品参数
				</div>
				<div class="line"></div>
			</div>
			<div class="bottomA">
				<div>
					<label>销&nbsp;&nbsp;&nbsp;量</label>
					<span class="spanText">{{mallDetailsList.sold_quantity}}{{mallDetailsList.length}}</span>
				</div>
				<div>
					<label>库&nbsp;&nbsp;&nbsp;存</label>
					<span class="spanText">{{mallDetailsList.total_quantity}}{{mallDetailsList.length}}</span>
				</div>
			</div>
		</div>
		<!--商品详情-->
		<div class="channelTab" v-if="cardList">
			<div class="topA">
				<div class="titleBox">
					商品详情
				</div>
				<div class="line"></div>
			</div>
			<div>
				<div class="bottomA" v-html="cardList[0].产品详情">
				</div>
			</div>
		</div>
		<!--旗舰店-->
		<div class="flagshipS shop" @click="goShop">
			<div class="topA clearfix">
				<div class="fl">
					<img :src="companyInfo.logo" />
				</div>
				<div class="companyBox fl">
					<div class="company">
						<p class="name clamp">{{companyInfo.name}}</p>
					</div>
					<div class="componyIntro">
						<p class="clamp">{{companyInfo.introduction}}</p>
					</div>
				</div>
				<div class="btnEnter fr" >
					进店看看
				</div>
			</div>
		</div>
		<!--底部-->
		<footer class="detailsFooter" style="z-index:999">
			<div class="shopBox colM" @click="goShop">
				<i class="icon iconfont icon-shangdian1"></i>
				<span>旗舰店</span>
			</div>
			<div class="followBox colM" :class="follow == '关注' ? '' : 'color_r'" @click="followClick()">
				<i class="icon iconfont" :class="follow == '关注' ? 'icon-guanzhu' : 'icon-xin'"></i>
				<span>{{follow}}</span>
			</div>
			<div class="btnBox" @click="shoppingCart">
				加入购物车
			</div>
			<div class="btnBuyBox btnBox" @click="buy">
				立即购买
			</div>
			<transition name="fold">
				<div class="dialogCount" v-show="showOptionCount" transiton="fold">
					<div class="optionCount">
					<div class="mallInfo clearfix">
						<div class="fl">
							<img :src="imgs[0]" />
						</div>
						<div class="fl">
							<div class="name">
								<p class="clamp2">{{mallDetailsList.title}}</p>
							</div>
							<div class="clearfix">
								<span class="price fl">{{mallDetailsList.price | converAmount(2)}}</span>
								<div class="fl" v-show="mallDetailsList.original_price !== 0 && mallDetailsList.original_price !== '' && mallDetailsList.original_price !== null"><span class="label">原价</span><s>￥{{mallDetailsList.original_price}}</s>
								</div>
							</div>
						</div>
						<div class="close fr" @click="showOptionCount = false">
							<i class="icon iconfont icon-cuohao"></i>
						</div>
					</div>
					<div class="countInfo clearfix">
						<div class="comNumb clearfix">
							<inline-x-number width="50px" :min="1" v-model="count" :max="mallDetailsList.total_quantity"></inline-x-number>

						</div>
						<div class="stock fr">
							<label>库存:</label><span>{{mallDetailsList.total_quantity}}{{mallDetailsList.length}}</span>
						</div>
					</div>
					<div class="allPrice">
						<span class="label">共{{count}}{{mallDetailsList.length}}</span><span class="price">{{count * mallDetailsList.price | converAmount(2)}}</span>
					</div>
					<div>
						<div class="btn" @click="addCart(mallDetailsList.id)">确定</div>
					</div>
				</div>
				</div>
			</transition>
		</footer>
		<transition name="mack" >
			<div class="dialogMack" v-show="showOptionCount" @click="showOptionCount = !showOptionCount"></div>
		</transition>
		<toast v-model="showaddCart" text="加入购物车成功" @on-hide="onHide"></toast>
		<div class="shareMC" :style="{display:shareMC}" @click="shareMCClick"></div>
		<actionsheet v-model="show1" :menus="shareType" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')" @on-click-menu-type1="shareWX" @on-click-menu-type2="sharePYQ" @on-click-menu-type3="shareWB" @on-click-menu-type4="shareQQKJ"></actionsheet>
	</div>
</template>

<script>
	const loginUrl = 'http://member.miningcircle.com/login?where=mcVue'
	import swiper2 from '@/static/js/swiper.min.js';
	import axios from 'axios'
	import { Flexbox, FlexboxItem, Group, PopupRadio, Tab, TabItem, Sticky, Swiper, SwiperItem, InlineXNumber, cookie } from 'vux';
	import { getAppShare, isDevice, ShareTip,appLogin,wxShare} from '@/assets/commonjs/util.js';
	import openApp from '@/components/base/openApp'


	export default {
		components: {
			Flexbox,
			FlexboxItem,
			Group,
			PopupRadio,
			Tab,
			TabItem,
			Sticky,
			Swiper,
			SwiperItem,
			InlineXNumber,
			openApp,
		},
		data() {
			return {
				show1: false,
				shareType: {
					type1: '分享到微信',
					type2: '分享到朋友圈',
					type3: '分享到微博',
					type4: '分享到qq空间',
				},
				shareMC: 'none', //分享蒙层显示隐藏
				farmatOptions: ['纯度87.6%-97%', '纯度80%-90%', '纯度90%-97%'],
				farmatOption: '纯度87.6%-97%',
				column: ["商品参数", "商品详情"],
				selected: "商品参数",
				index: 0,
				mallDetailsList: '',
				cardList: '',
				companyInfo: '',
				imgs: [],
				follow: '',
				showDiaLog: false,
				showTost: false,
				speakText: '',
				showOptionCount: false,
				count: 1,
				showaddCart: false,
				orderId: '',
				type: '', //点击立即购买还是点击加入购物车 1位加购物车，0位立即购买
				notInapp: '',
				test: false,
        show: true,
        wxDevice:false,
        url:window.location.href
			}
    },
    created(){
      if(isDevice() == '微信浏览器'){
        this.wxDevice = true
      }

      this.getMallDetailsList()
    },
		methods: {
			share() {
				if(isDevice() == "其他浏览器") {
					this.show1 = true
				} else {
					getAppShare(this.url, this.mallDetailsList.title, this.imgs[0], this.mallDetailsList.vdesc, "")
				}
			},
			shareMCClick() {
				this.shareMC = 'none'
			},
			shareWX() {
				this.shareMC = 'block'
			},
			sharePYQ() {
				this.shareMC = 'block'
			},
			shareWB() {
				var share1 = new ShareTip();
				share1.sharetosina(
					this.mallDetailsList.title,
					window.location.href,
					this.imgs[0],

				);
			},
			shareQQKJ() {
				var share1 = new ShareTip();
				share1.sharetoqqzone(
					this.mallDetailsList.title,
					window.location.href,
					this.imgs[0],
					this.mallDetailsList.vdesc
				);
			},
			onHide() {
				window.location.href = this.$root.urlPath.MCM + "/mall/orderCom_list?newpage=newpage&id=" + this.$route.query.id;

			},
			addCart(mallId) {
				if(this.type == 1) {
					this.addCartApi(() => {
						this.showaddCart = true
					})
				} else {
					this.addCartApi(() => {
						this.getCartList(() => {
							window.location.href = this.$root.urlPath.MCM + "/mall/orderCom_balance?newpage=newpage&id=" + this.$route.query.id;
							this.showOptionCount = false
						})
					})
				}
			},
			addCartApi(callback) {
				axios.get(this.$root.urlPath.MC + '/wap/mall.do?addCart', {
						params: {
							id: this.mallDetailsList.id,
							quantity: this.count,

						},
					}).then(res => {

						if(res.data.success) {

							callback()

						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			shoppingCart() {
				if(cookie.get("MC_UID")) {
					this.type = 1
					this.showOptionCount = true
				} else {
					appLogin()
				}

			},
			getCartList(callback) {
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?normalPurchaseCartList')
					.then(res => {

						if(res.data.success) {
							var data = res.data.data
							for(var i in data) {
								if(data[i].id == this.mallDetailsList.id) {
									this.orderId = data[i].oid
								}
							}
							if(typeof(Storage) !== "undefined") {
								var shop = {
									orderId: this.orderId
								}
								shop = JSON.stringify(shop)
								localStorage.setItem('shop', shop);
							} else {
								alert("抱歉! 您的浏览器不支持 web 存储。")
							}

							callback()
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						console.log(error)
					});
			},

			buy() {
				if(cookie.get("MC_UID")) {
					this.type = 0
					this.addCart()
				} else {
					appLogin()
				}
			},
			followClick() {
				if(cookie.get('MC_UID')) {
					if(this.follow == '关注') {
						axios.get(this.$root.urlPath.MC + '/wap/mall.do?attention', {
								params: {
									id: this.mallDetailsList.id
								}
							})
							.then(res => {

								if(res.data.success) {
									this.follow = '已关注'
								} else {
									console.log(res.data.errMsg)
								}
							})
							.catch(function(error) {
								console.log(error)
							});
					} else {
						axios.get(this.$root.urlPath.MC + '/wap/mall.do?cancelAttention', {
								params: {
									id: this.mallDetailsList.id
								}
							})
							.then(res => {
								console.log(res)
								if(res.data.success) {
									this.follow = '关注'
								} else {
									console.log(res.data.errMsg)
								}
							})
							.catch(function(error) {
								console.log(error)
							});
					}
				} else {
					appLogin()
				}

			},
			back() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
					this.$router.go(-1)
				}

			},
			getMallDetailsList() {
				axios.get(this.$root.urlPath.MC + '/wap/mall.do?mallInfo', {
						params: {
							id: this.$route.query.id
						}
					})
					.then(res => {

						if(res.data.success) {

							this.mallDetailsList = res.data.data.info
							this.cardList = res.data.data.cardList
							this.companyInfo = res.data.data.companyInfo
							this.imgs = res.data.data.imgs
							if(res.data.data.isAttention) {
								this.follow = '已关注'
							} else {
								this.follow = '关注'
							}
							this.$nextTick(() => {
								var mySwiper = new swiper2('.swiper-container', {
									pagination: {
										el: '.swiper-pagination',
										type: 'fraction'
									}
								})
							})
						} else {
							console.log(res.data.errMsg)
						}
          })
           .then(()=>{
              wxShare(this.$root.urlPath.MCT + '/wx/share', this.url, this.mallDetailsList.title, this.imgs[0], '', this.url);
          })
					.catch(function(error) {
						console.log(error)
					});
			},
			goShop(){

				window.location.href = this.$root.urlPath.MCM + "/flagship?newpage=newpage&shopId=" + this.companyInfo.id;
			}
		}
	}
</script>

<style>
	@import url("../../../static/css/swiper.min.css");


	table,
	tr,
	.bottomA tbody img,
	.bottomA p img {
		width: 100% !important;
	}
</style>
