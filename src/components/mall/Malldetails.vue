<template>
	<div class="malldetails">
		<div>
			<open-app></open-app>
			<div class="carousel">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,index) in imgs" :key="index">
							<img :src="item" />
						</div>
					</div>
				</div>
				<div class="swiper-pagination"></div>
				<div class="revert" @click="back">
					<i class="icon iconfont icon-jiantou-copy color_f"></i>
				</div>
				<div class="info" @click="share">
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
								<p class="">{{mallDetailsList.vdesc}}</p>
							</div>
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo priceBox clearfix">
								<div class="fl" v-show="mallDetailsList.price && mallDetailsList.price !== 0">

									<span class="money">{{mallDetailsList.price | converAmount(2)}}</span>
								</div>
								<div class="fl" v-show="!mallDetailsList.price || mallDetailsList.price == 0">
									<span class="money">{{price}}</span>
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
		<div class="channelTab canshu">
			<div class="topA">
				<div class="titleBox">
					商品参数
				</div>
				<div class="line"></div>
			</div>
			<div class="bottomA">
				<div>
					<label>规&nbsp;&nbsp;&nbsp;格</label>
					<span class="spanText">{{mallDetailsList.specification}}</span>
				</div>
				<div>
					<label>销&nbsp;&nbsp;&nbsp;量</label>
					<span class="spanText">{{mallDetailsList.sold_quantity}}{{mallDetailsList.length}}</span>
				</div>
				<div>
					<label>起订量</label>
					<span class="spanText">{{mallDetailsList.min_quantity}}{{mallDetailsList.length}}</span>
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
			<div class="speakBox colM" @click="speakClick">
				<i class="iconfont icon-xinxi"></i>
				<span>约谈</span>
			</div>
			<div class="btnBuyBox btnBox" @click="buy">
				立即订购
			</div>

			<!--选择商品数量弹出框-->
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
									<span class="price fl" v-show="mallDetailsList.price && mallDetailsList.price !== 0">{{mallDetailsList.price | converAmount(2)}}</span>
									<span class="money price" v-show="!mallDetailsList.price || mallDetailsList.price == 0">{{price}}</span>
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
								<span class="purity">{{mallDetailsList.specification}}</span>
								<inline-x-number width="50px" :min="mallDetailsList.min_quantity" v-model="count" :max="mallDetailsList.total_quantity"></inline-x-number>

							</div>
							<div class="stock fr">
								<label>库存:</label><span>{{mallDetailsList.total_quantity}}{{mallDetailsList.length}}</span>
							</div>
						</div>
						<div class="allPrice clearfix">
							<span class="label label1 fl">本商品{{mallDetailsList.min_quantity}}{{mallDetailsList.length}}起订</span>
							<span class="label">共{{count}}{{mallDetailsList.length}}</span>

							<span class="money price" v-show="!mallDetailsList.price || mallDetailsList.price == 0">{{price}}</span>
							<span class="price" v-show="mallDetailsList.price && mallDetailsList.price !== 0">{{count * mallDetailsList.price | converAmount(2)}}</span>

						</div>
						<div>
							<div class="btn" @click="addCart(mallDetailsList.id)">确定</div>
						</div>
					</div>
				</div>
			</transition>
		</footer>
		<div>
			<toast v-model="showaddCart" text="订单成功,可到'我-企业服务'中查看"  @on-hide="onHide" width="40%"></toast>
		</div>
		<!--约谈弹出框-->
		<div class="comSpeakDial">
			<x-dialog v-model="showDiaLog" class="dialog-demo">
				<div class="dialogHeader">
					<span class="fl">约谈详细</span>
					<i class="icon iconfont icon-cuohao fr" @click="showDiaLog = false"></i>
				</div>
				<div class="bd">
					<div>
						<p class="p1">尊敬的客户：</p>
						<p class="p2">感谢您对矿业圈的支持，请留下您期待的约谈时间和约谈方式，矿业圈的工作人员将在两个工作日内给您回复并安排您和项目方对接!</p>
					</div>
					<div class="textM">
						<textarea v-model="speakText" style="width: 5.6rem;height:1.8rem"></textarea>
					</div>
					<button @click="speakSubmit">提交</button>
				</div>
			</x-dialog>
			<toast v-model="showTost">约谈成功</toast>
			<!--购买弹窗-->
			<x-dialog v-model="showToast" class="dialog-demo">
				<div>建档立卡市解放路会计师打两份</div>
			</x-dialog>
		</div>

		<transition name="mack" >
			<div class="dialogMack" v-show="showOptionCount" @click="showOptionCount = !showOptionCount"></div>
		</transition>


		<div class="shareMC" :style="{display:shareMC}" @click="shareMCClick"></div>
		<actionsheet v-model="show2" :menus="shareType" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')" @on-click-menu-type1="shareWX" @on-click-menu-type2="sharePYQ" @on-click-menu-type3="shareWB" @on-click-menu-type4="shareQQKJ"></actionsheet>
	</div>
</template>

<script>
	import swiper2 from '@/static/js/swiper.min.js';
	import axios from 'axios'
	import { Flexbox, FlexboxItem, Group, PopupRadio, Tab, TabItem, Sticky, Swiper, SwiperItem, Actionsheet, InlineXNumber } from 'vux';
	import { getAppShare, isDevice, ShareTip,appLogin} from '@/assets/commonjs/util.js';
	import { cookie } from 'vux';
	import openApp from '@/components/base/openApp'


	const loginUrl = 'http://member.miningcircle.com/login?where=mcVue'
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
			Actionsheet,
			InlineXNumber,
			openApp
		},
		data() {
			return {
				show1: false,
				show2: false,
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
				showToast: false,
				price: '',
				count: 1,
				showaddCart: false,
				showOptionCount: false
			}
		},
		mounted: function() {
			this.getMallDetailsList()

		},
		methods: {

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
			share() {
				if(isDevice() == "其他浏览器") {
					this.show2 = true
				} else {
					getAppShare(window.location.href, this.mallDetailsList.title, this.imgs[0], this.mallDetailsList.vdesc, "")
				}

			},
			buy() {
				if(cookie.get("MC_UID")) {
					this.showOptionCount = true
				} else {
					 appLogin()
				}

			},
			addCart() {
				axios.get(this.$root.urlPath.MC + '/wap/mall.do?addCart', {
						params: {
							id: this.mallDetailsList.id,
							quantity: this.count,

						},
					}).then(res => {

						if(res.data.success) {
							this.showaddCart = true
							this.showOptionCount = false
						} else {
							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
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
									this.follow = '取消关注'
								} else {
									console.log(res.data.errMsg)
								}
							})
							.catch(function(error) {
								alert(error)
							});
					} else {
						axios.get(this.$root.urlPath.MC + '/wap/mall.do?cancelAttention', {
								params: {
									id: this.mallDetailsList.id
								}
							})
							.then(res => {

								if(res.data.success) {
									this.follow = '关注'
								} else {
									console.log(res.data.errMsg)
								}
							})
							.catch(function(error) {
								alert(error)
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
							if(res.data.data.cardList) {
								this.cardList = res.data.data.cardList
							}
							if(!this.mallDetailsList.price || this.mallDetailsList.price == 0) {
								this.price = '面议'
							}

							this.companyInfo = res.data.data.companyInfo
							this.imgs = res.data.data.imgs

							if(res.data.data.isAttention) {
								this.follow = '取消关注'
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
					.catch(function(error) {
						alert(error)
					});
			},
			speakClick() {
				if(cookie.get("MC_UID")) {
					this.showDiaLog = true
				} else {
					appLogin()
				}

			},
			speakSubmit() {
        if(this.speakText == ''){
          this.$vux.toast.show({
 								text: '不能为空',
 								type:'cancel'
          })
          return
        }
				axios.get(this.$root.urlPath.MC + '/wap/mall.do?interview', {
						params: {
							id: this.mallDetailsList.id,
							msg: this.speakText
						}
					})
					.then(res => {

						if(res.data.success) {
							this.showDiaLog = false
							this.showTost = true
						} else {

						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			goShop(){

				window.location.href = this.$root.urlPath.MCM + "/flagship?newpage=newpage&shopId=" + this.companyInfo.id;
			},
			console() {

			},
			onHide() {

			},
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

	.malldetails .huanrao {
		word-break: break-all;
	}

	.malldetails .malldetails_nav {
		margin: 0.15rem 0
	}

	.malldetails .optionCount .countInfo .comNumb {
		text-align: left;
	}

	.malldetails .optionCount .countInfo .purity {
		font-size: 0.24rem;
		line-height: 0.46rem;
	}

	.optionCount .allPrice .label1 {
		padding-left: 0.2rem;
	}
</style>
