<template>
	<div class="investorDetails">
		<open-app></open-app>
		<div class="channelDetalImage_box">
			<img :src="investorDetailsList.logo" />
			<div class="revert" @click="back">
				<i class="icon iconfont icon-jiantou3"></i>
			</div>
			<div class="info" @click="share" v-if="!wxDevice">
				<i class="icon iconfont icon-tubiao212"></i>
			</div>
		</div>
		<div class="channelDetailText">
			<div>
				<span class="title">{{investorDetailsList.name}}</span>
			</div>
			<div class="small_content">
				<div class="clearfix row">
					<label class="fl">企业类型</label>
					<span>
						{{type}}
					</span>
				</div>
				<div class="clearfix row">
					<label class="fl">投资方式</label>
					<span v-if="investorDetailsList.mode !== undefined">
						{{investorDetailsList.mode}}
					</span>
					<span v-else>
						暂未填写
					</span>
				</div>
				<div class="clearfix row">
					<label class="fl">联系人</label>
					<span>
						{{investorDetailsList.contactName}}
					</span>
				</div>
				<div class="row">
					<label class="spanBox fl">联系方式</label>
					<span>{{investorDetailsList.mobile}}</span>
				</div>
			</div>
		</div>
		<div class="channelSec">
			<div class="title">投资需求</div>
			<div class="content" :class="{'clamp3' : moreTF}">
				{{investorDetailsList.requirement}}
			</div>
			<fieldset>
				<legend align="center">
					<div>
						<span @click="moreClick" :class="moreTF ? 'icox' : 'icos'"></span>
					</div>
				</legend>
			</fieldset>
		</div>
		<div class="channelTab componyDetails" v-if="investorDetailsList.introduction">
			<div class="topA">
				<div class="titleBox">
					公司详情
				</div>
				<div class="line"></div>
			</div>
			<div class="content" v-html="investorDetailsList.introduction">

			</div>
		</div>
		<footer class="detailsFooter">
			<div class="followBox colM" :class="follow == '关注' ? '' : 'color_r'" @click="followClick(follow)">
				<i class="icon iconfont" :class="follow == '关注' ? 'icon-guanzhu' : 'icon-xin'"></i>
				<span :class="follow == '关注' ? '' : 'color_r'">{{follow}}</span>
			</div>
			<div class="speakBox colM"  @click="speakClick">
				<i class="iconfont icon-xinxi"></i>
				<span>约谈</span>
			</div>
		</footer>
		<!--约谈弹出框-->
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
			<toast v-model="showTost">约谈成功</toast>
		</div>
		<div class="shareMC" :style="{display:shareMC}" @click="shareMCClick"></div>
		<actionsheet v-model="show1" :menus="shareType" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')" @on-click-menu-type1="shareWX" @on-click-menu-type2="sharePYQ" @on-click-menu-type3="shareWB" @on-click-menu-type4="shareQQKJ"></actionsheet>
	</div>
</template>

<script>
	import axios from 'axios'
	import Detailsimage from '@/components/common/Detailsimage';
	import { getTime1, getAppShare,isDevice,ShareTip,wxShare} from '@/assets/commonjs/util.js';
	import openApp from '@/components/base/openApp'

	export default {
		components: {
			Detailsimage,
			openApp
		},
		data() {
			return {
				show2Text: '',
				show2: false,
				show1: false,
				shareType: {
					type1: '分享到微信',
					type2: '分享到朋友圈',
					type3: '分享到微博',
					type4: '分享到qq空间',
				},
				shareMC: 'none', //分享蒙层显示隐藏
				moreTF: true,
				investorDetailsList: [],
				showToast: false, //约谈弹框
				speakText: '',
				follow: '',
				type: '',
				showDiaLog: false,
        showTost: false,
        wxDevice:false,
        url:window.location.href
			}
    },
    created(){
      if(isDevice() == '微信浏览器'){
        this.wxDevice = true
      }
      this.getInvestorDetailsList()
    },
		methods: {
			console() {

			},
			shareMCClick(){
				this.shareMC = 'none'
			},
			shareWX(){
				this.shareMC = 'block'
			},
			sharePYQ(){
				this.shareMC = 'block'
			},
			shareWB(){
				var share1 = new ShareTip();
					share1.sharetosina(
						this.investorDetailsList.name,
						window.location.href,
						this.investorDetailsList.logo,

					);
			},
			shareQQKJ(){
				var share1 = new ShareTip();
					share1.sharetoqqzone(
						this.investorDetailsList.name,
						window.location.href,
						this.investorDetailsList.logo,
						this.investorDetailsList.requirement
				);
			},
			share() {
				if(isDevice() == "其他浏览器") {
					this.show1 = true
				}else{
					getAppShare(this.url, this.investorDetailsList.name, this.investorDetailsList.logo, this.investorDetailsList.requirement, "")
				}
			},
			followClick(type) {
				if(type == '关注') {
					//关注接口
					axios.get(this.$root.urlPath.MC + '/wap/yiinvest.do?yiInvestAttention', {
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
					axios.get(this.$root.urlPath.MC + '/wap/yiinvest.do?yiInvestCancelAttention', {
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
			back() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
					this.$router.go(-1)
				}

			},
			moreClick() {
				this.moreTF = !this.moreTF
			},
			getInvestorDetailsList() {
				axios.get(this.$root.urlPath.MC + '/wap/yiinvest.do?yiInvestInfo', {
						params: {
							id: this.$route.query.id
						}
					})
					.then(res => {
						if(res.data.success) {
							this.investorDetailsList = res.data.data.investInfo[0]
							if(this.investorDetailsList.type !== undefined) {
								var arr = ['生产加工', "贸易经销", '工贸一体', '服务机构', '厂矿企业']
								this.type = arr[this.investorDetailsList.type]
							} else {
								this.type = '机构投资者'
							}

							if(res.data.data.userInterestList == 0) {
								this.follow = "关注"
							} else {
								this.follow = "取消关注"
							}

						} else {

						}
          })
          .then(()=>{
              wxShare(this.$root.urlPath.MCT + '/wx/share', this.url, this.investorDetailsList.name, this.investorDetailsList.logo, this.investorDetailsList.requirement, this.url);
          })
					.catch(function(error) {

					});
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
				axios.get(this.$root.urlPath.MC + '/wap/yiinvest.do?yiInvestInterView', {
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
		}
	}
</script>

<style>
	.investorDetails .componyDetails{
		margin-bottom: 1rem;
	}
	.investorDetails .channelDetailText .small_content label{
		display: inline-block;
		width: 1.2rem;
	}
</style>
