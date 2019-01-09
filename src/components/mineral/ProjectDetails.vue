<template>
	<div class="projectDetails">
		<div>
			<open-app></open-app>
			<div class="channelDetalImage_box">
				<img :src="projectInfoList.img" />
				<div class="revert" @click="back">
					<i class="icon iconfont icon-jiantou3"></i>
				</div>
				<div class="info" @click="share" v-if="!wxDevice">
					<i class="icon iconfont icon-tubiao212"></i>
				</div>
			</div>
			<div class="channelDetailText">
				<div>
					<span class="title">{{projectInfoList.title}}</span>
				</div>
				<div class="small_content">
					<div class="clearfix row ">
						<label class="fl">矿种</label>

						<span class="typeWidth fl" :class="{'clamp' : moreType}" style="margin-left:0.05rem">
									{{mapAttrib.mineral}}
							</span>
						<i class="icon iconfont" :class="moreType ? 'icon-iconfontjiantou' : 'icon-jiantou-copy-copy-copy'" @click="moreTypeClick"></i>

					</div>
					<div class="clearfix row">
						<label>阶段</label>
						<span>
								{{mapAttrib.stage}}
							</span>
					</div>
					<div class="clearfix row">
						<label>地区</label>
						<span>
							{{mapAttrib.Region}}
						</span>
					</div>
					<div class="row">
						<label class="spanBox">资源储量</label>
						<span>{{mapAttrib.reserve}}</span>
					</div>
					<div class="row">
						<label class="spanBox">原矿品位</label>
						<span>{{mapAttrib.grade}}</span>
					</div>
				</div>
			</div>
			<div class="channelSec">
				<div class="title">项目亮点</div>
				<div class="content" :class="{'clamp3' : moreTF}">
					{{mapAttrib.productvdesc}}
				</div>
				<div class="download" v-show="mapAttrib.projectspdf">
					<a :href="showConfigPay ? '' : mapAttrib.projectspdf" download="">
						<span>
							下载项目资料
						</span>
					</a>

				</div>
				<fieldset>
					<legend align="center">
						<div>
							<span @click="moreClick" :class="moreTF ? 'icox' : 'icos'"></span>
						</div>
					</legend>
				</fieldset>
			</div>
			<div class="textBox">
				<div class="mrow clearfix">
					<div class="mcol fl">
						<label class="akey">转让价格(万元)</label>
						<span v-show="mapAttrib.tfprice">{{mapAttrib.tfprice}}</span>
						<span v-show="mapAttrib.tfprice == '' || mapAttrib.tfprice == 0 ||mapAttrib.tfprice == undefined">面议</span>
					</div>
					<div class="mcol fl">
						<label class="akey">转让股比</label>
						<span>{{mapAttrib.Tfshares}}</span>
					</div>
				</div>
				<div class="mrow clearfix">
					<div class="mcol fl">
						<label>发布日期</label>
						<span>{{projectInfoList.insert_time}}</span>
					</div>
					<div class="mcol fl">
						<label>浏览量</label>
						<span>{{projectInfoList.view_times}}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="project_details">
			<div class="nav1">
				<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
					<tab :line-width=4 active-color="#FBA879" custom-bar-width="1.1rem" v-model="index">
						<tab-item :selected="selected === item" v-for="(item, index) in column" @click="selected = item" :key="index" @on-item-click="toClick(index)">
							{{item}}
						</tab-item>
					</tab>
					<div class="tab-content">
						<div v-show="index == 0" v-html="projectInfoList.vtext">

						</div>
						<div v-show="index == 1" v-html="ykym.introduction">

						</div>
						<div v-show="index == 2" v-html="mapAttrib.Tfdemands">

						</div>
					</div>
				</sticky>
			</div>
		</div>
		<footer class="detailsFooter">
			<div class="followBox colM" :class="follow == '关注' ? '' : 'color_r'" @click="followClick(follow)">
				<i class="icon iconfont" :class="follow == '关注' ? 'icon-guanzhu' : 'icon-xin'"></i>
				<span :class="follow == '关注' ? '' : 'color_r'">{{follow}}</span>
			</div>
			<div class="speakBox colM" @click="speakClick">
				<i class="iconfont icon-xinxi"></i>
				<span>约谈</span>
			</div>
			<div class="btnBox btnInvestBtn" @click="invest">
				预约投资
			</div>
		</footer>
		<!--弹框-->
		<div class="comSpeakDial">
			<x-dialog v-model="showDiaLog" class="dialog-demo">
				<div class="dialogHeader">
					<span class="fl">约谈详细</span>
					<i class="icon iconfont icon-cuohao fr" @click="showDiaLog = false"></i>
				</div>
				<div class="bd">
					<div>
						<p class="p1">尊敬的投资人：</p>
						<p class="p2">感谢您对矿业圈的支持，请留下您期待的约谈时间和约谈方式，矿业圈的工作人员将在两个工作日内给您回复并安排您和项目方对接!</p>
					</div>
					<div class="textM">
						<textarea v-model="speakText" style="width: 5.6rem;height:1.8rem"></textarea>
					</div>
					<button @click="speakSubmit">提交</button>
				</div>

			</x-dialog>

		</div>
		<toast v-model="showTost">约谈成功</toast>
		<confirm v-model="showConfigPay" @on-cancel="onCancel" @on-confirm="toBalance" @on-show="onShow" @on-hide="onHide">
			<p style="text-align:center;">此项目为热门项目，是否下载全部资料并享受矿业圈提供的1对1对接服务？</p>
		</confirm>
		<confirm v-model="showAuth" @on-cancel="onCancel" @on-confirm="toAuth" @on-show="onShow" @on-hide="onHide">
			<p style="text-align:center;">请先认证企业，再认证投资人，才能进行投资！是否现在前去认证！</p>
		</confirm>
		<confirm v-model="showAuthInvest" @on-cancel="onCancel" @on-confirm="toBalance" @on-show="onShow" @on-hide="onHide">
			<p style="text-align:center;">前去认证投资</p>
		</confirm>
		<div class="shareMC" :style="{display:shareMC}" @click="shareMCClick"></div>
		<actionsheet v-model="show1" :menus="shareType" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')" @on-click-menu-type1="shareWX" @on-click-menu-type2="sharePYQ" @on-click-menu-type3="shareWB" @on-click-menu-type4="shareQQKJ"></actionsheet>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem, Tab, TabItem, Sticky, Swiper, SwiperItem, cookie } from 'vux'
	import { getTime1, getAppShare, isDevice, ShareTip,wxShare } from '@/assets/commonjs/util.js';
	import Detailsimage from '@/components/common/Detailsimage';
	import openApp from '@/components/base/openApp'
	import axios from 'axios'
	export default {
		components: {
			Flexbox,
			FlexboxItem,
			Detailsimage,
			Tab,
			TabItem,
			Sticky,
			Swiper,
			SwiperItem,
			openApp
		},
		data() {
			return {
				show1: false,
				show2: false,
				show2Text: '',
				downloadTF: '#',
				shareType: {
					type1: '分享到微信',
					type2: '分享到朋友圈',
					type3: '分享到微博',
					type4: '分享到qq空间',
				},
				shareMC: 'none', //分享蒙层显示隐藏
				column: ["项目详情", "公司详情", "转让详情"],
				selected: "项目参数",
				childColumn: ['项目详情', '公司详情', '转让详情', '评论'],
				childSelected: '项目详情',
				index: 0,
				childIndex: 0,
				moreTF: true,
				projectInfoList: [],
				projectDetailsList: [],
				mapAttrib: '',
				ykym: '',
				follow: '',
				showToast: false,
				speakText: '',
				showTost: false,
				showConfigPay: false,
				showDiaLog: false,
				moreType: true,
				showAuth: false,
				showAuthInvest: false,
				payUrl: "http://www.miningcircle.com/yi/project/order.do?orderDetail&yiId=" + this.$route.query.id,
				minMovingDistance:100,
        test:2000,
        wxDevice:false,
        url:window.location.href

			}
    },
    created(){
       if(isDevice() == '微信浏览器'){
        this.wxDevice = true
      }
      this.getProjectDetailsList()
    },
		methods: {
			share() {
				if(isDevice() == "其他浏览器") {
					this.show1 = true
				} else {
					getAppShare(window.location.href, this.projectInfoList.title, this.projectInfoList.img, this.mapAttrib.productvdesc, "")
				}
			},
			console() {

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
					this.projectInfoList.title,
					window.location.href,
					this.projectInfoList.img,

				);
			},
			shareQQKJ() {
				var share1 = new ShareTip();
				share1.sharetoqqzone(
					this.projectInfoList.title,
					window.location.href,
					this.projectInfoList.img,
					this.mapAttrib.productvdesc
				);
			},
			toBalance() {
				window.location.href = 'http://www.miningcircle.com/yi/project/order.do?orderDetail&yiId=' + this.$route.query.id
			},
			//			矿种更多
			moreTypeClick() {
				this.moreType = !this.moreType
			},
			onHide() {

			},
			onShow() {

			},
			onCancel() {

			},
			onConfirm() {
				window.location.href = 'http://www.miningcircle.com/yi/project/order.do?orderDetail&yiId=' + this.projectDetailsList.id
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
			toClick(index) {

			},
			moreClick() {

				this.moreTF = !this.moreTF

			},
			getProjectDetailsList() {
				axios.get(this.$root.urlPath.MC + '/wap/yitrade.do?yiTradeInfo', {
						params: {
							id: this.$route.query.id
						},
						headers: {
							'MC_UID': cookie.get('MC_UID')
						}
					})
					.then(res => {

						if(res.data.success) {
							this.projectDetailsList = res.data.data
							this.projectInfoList = res.data.data.prd
							this.ykym = res.data.data.ykym
							this.mapAttrib = res.data.data.prd.mapAttrib
							if(this.projectDetailsList.userAttentionList == 1) {

								this.follow = '取消关注'
							} else {

								this.follow = '关注'
							}
							//							ispay是免费
							if(this.projectDetailsList.isCharge == "noPay") {
								this.showConfigPay = true
							} else {
								this.showConfigPay = false
							}

							this.projectDetailsList.prd.insert_time = getTime1(this.projectDetailsList.prd.insert_time)

						}
          })
          .then(()=>{
              wxShare(this.$root.urlPath.MCT + '/wx/share', this.url,this.projectInfoList.title, this.projectInfoList.img, this.mapAttrib.productvdesc, this.url);
          })
					.catch(function(error) {
              console.log(error)
					});
			},
			followClick(type) {
				if(type == '关注') {
					//关注接口
					axios.get(this.$root.urlPath.MC + '/wap/yitrade.do?attention', {
							params: {
								id: this.$route.query.id
							}
						})
						.then(res => {

							if(res.data.success) {
								this.follow = '取消关注'
							} else {

							}
						})
						.catch(function(error) {

						});
				} else {
					//取消关注接口
					axios.get(this.$root.urlPath.MC + '/wap/yitrade.do?cancelAttention', {
							params: {
								id: this.$route.query.id
							}
						})
						.then(res => {

							if(res.data.success) {
								this.follow = '关注'
							} else {

							}
						})
						.catch(function(error) {

						});
				}

			},
			speakClick() {
				this.showDiaLog = true
			},
			speakSubmit() {
        if(this.speakText == ''){
          this.$vux.toast.show({
 								text: '不能为空',
 								type:'cancel'
          })
          return
        }
				axios.get(this.$root.urlPath.MC + '/wap/yitrade.do?interView', {
						params: {
							id: this.$route.query.id,
							resContext: this.speakText
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

					});
			},
			invest() {

				if(cookie.get('MC_UID')) {
					if(!this.projectDetailsList.isOrNotCompany) {
						//						个人用户提示去认证企业
						this.showAuth = true
					} else if(!this.projectDetailsList.isOrNotInvest) {
						//						企业用户提示去认证投资

						this.showAuthInvest = true
						window.location.href = this.$root.urlPath.MCM + "/mineral/projectDetails/auth-form?newpage=newpage&id=" + this.$route.query.id;

					} else if(this.projectDetailsList.isOrNotInvest) {
						//						都认证完毕,弹出投资表单
						window.location.href = this.$root.urlPath.MCM + "/mineral/projectDetails/form?newpage=newpage&id=" + this.$route.query.id;

					}
				}
				//				'
			},
			toAuth() {
				window.location.href = 'http://trade.miningcircle.com/cert?where=mcVue'
			}
		}
	}
</script>

<style>
	.projectDetails .tab-content{
		padding: 0.1rem;
		background-color: #fff;
	}
	.projectDetails .tab-content img{
		width: 100%;
	}
	.projectDetails .butt {
		width: 100%;
		height: 5rem;
	}

	.projectDetails .download {
		text-align: right;
	}

	.projectDetails .download span {
		font-size: 0.2rem;
		margin-right: 0.2rem;
		border: 1px solid #EF852C;
		border-radius: 0.05rem;
		padding: 0.03rem 0.2rem;
	}

	.projectDetails .nav1 .swiper1 .vux-swiper {
		min-height: 1.8rem !important;
	}

	.projectDetails .textBox {
		margin-top: 0.15rem;
		padding: 0.2rem;
		font-size: 0.24rem;
		background: #fff
	}
	.projectDetails .channelDetailText .small_content label{
		display: inline-block;
		width: 1.2rem;
	}

	.projectDetails .small_content .typeWidth {
		width: 5.6rem;
	}

	.projectDetails .small_content i {
		font-size: 0.25rem;
		color: #ccc;
		position: absolute;
		right: 0.2rem;
		margin-left: 0.4rem;
	}

	.projectDetails .textBox .mrow {
		line-height: 0.45rem;
	}

	.projectDetails .textBox .mcol {
		width: 3.54rem;
	}

	.projectDetails .textBox label {
		width: 1.8rem;
		display: inline-block;
		color: #7B7B7B;
	}

	.projectDetails .textBox .akey {
		color: #EF852C
	}


	.projectDetails .detail_text {
		padding: 0.2rem;
		background-color: #fff;
	}

	.projectDetails .nav1 .vux-swiper img {
		width: 100%;
	}

	.projectDetails .detail_text .icon-dalou {
		color: red;
		font-size: 0.4rem;
	}

	.projectDetails .project_details {
		padding-top: 0.15rem;
		margin-bottom: 1rem;
	}

	.projectDetails .icon-xin {
		color: red;
	}

	.projectDetails .vux-swiper-item {
		padding: 0.1rem;
		box-sizing: border-box;
	}
</style>
