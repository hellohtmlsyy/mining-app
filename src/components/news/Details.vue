<template>
	<div class="newsDetails comDetails">
		<div class="fixedHeader">
		<open-app @closeOpenApp="openAppShoHid"></open-app>
		<div class="oHeader clearfix noFixedHeader">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>新闻资讯</span>
			</div>
			<div class="rightA fr">
				<i class="icon iconfont icon-tubiao212" @click="share"></i>
			</div>
		</div>
		</div>
		<div class="content" :class="contentMargin">
			<div>
				<h1>{{newsDetailsList.title}}</h1>
				<div class="smh1">
					<i class="icon iconfont icon-tanhao-"></i>
					<span>{{newsDetailsList.vfrom}}</span>
					<i class="icon iconfont icon-combinedshapecopy2"></i>
					<span>{{newsDetailsList.author}}</span>
					<i class="icon iconfont icon-yanjing"></i>
					<span>{{newsDetailsList.view_times}}</span>
					<span class="fr">{{newsDetailsList.insert_time}}</span>
				</div>
			</div>
			<div v-html="newsDetailsList.vtext" class="vtext">

			</div>
		</div>
		<div class="bottom">
			<div class="likeBox clearfix">
				<div class="fl" :class="landOrNo ? 'color_r' :'color_h'" @click="likeClick(310)">
					<i class="icon iconfont icon-dianzan" ></i>
					<span class="laud">{{landCount}}</span>
				</div>
				<div class="fl" :class="likeOrNo ? 'color_r' :'color_h'" @click="likeClick(320)">
					<i class="icon iconfont icon-xin" :class="likeOrNo ? 'color_r' :'color_h'" ></i><span>{{likeCount}}</span>
				</div>
			</div>

			<div class="shareBox clearfix">
				<label class="fl">分享到：</label>

				<div class="fl">
					<span @click="shareWX">
						<i class="iconfont icon-wechat" ></i><span>微信</span>
					</span>
					<span @click="sharePYQ">
						<i class="iconfont icon-pengyouquan1"></i><span>朋友圈</span>
					</span>
					<span @click="shareWB">
						<i class="iconfont icon-weibo1"></i><span>微博</span>
					</span>
				</div>
				<div class="shareMC" :style="{display:shareMC}" @click="shareMCClick"></div>
				<actionsheet v-model="show1" :menus="shareType" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')" @on-click-menu-type1="shareWX" @on-click-menu-type2="sharePYQ" @on-click-menu-type3="shareWB" @on-click-menu-type4="shareQQKJ"></actionsheet>
			</div>
		</div>
	</div>
</template>

<script src="http://connect.qq.com/widget/loader/loader.js" widget="shareqq" charset="utf-8"></script>
<script>
	const loginUrl = 'http://member.miningcircle.com/login?where=mcVue'
	import { cookie, Alert } from 'vux'
	import axios from 'axios'
	import Oheader from '@/components/common/header/Oheader'
	import { getTime1, getAppShare, isDevice, ShareTip,appLogin} from '@/assets/commonjs/util.js';
	import openApp from '@/components/base/openApp'


	export default {
		components: {
			Oheader,
			Alert,
			openApp
		},
		data() {
			return {
				show1: false,
				shareType: {
					type1: '分享到微信',
					type2: '分享到朋友圈',
					type3: '分享到微博',
					type4: '分享到qq空间'
				},
				shareMC: 'none', //分享蒙层显示隐藏
				title: '新闻资讯',
				newsDetailsList: [],
				landorno: 1,
				likeCount: '',
				landCount: '', //0是没有点赞   1是点赞
				likeOrNo: '',
				landOrNo: '',
				haveMarginContent:true,
				contentMargin:{
					contentMargin1:true,
					contentMargin2:false
				}
			}
		},
		mounted() {
			if(isDevice() == 'ios' || isDevice() == 'adr'){
				this.haveMarginContent = false
			}else{
				this.haveMarginContent = true
			}
			
			this.getNewsDetailsList()
		},
		methods: {
			openAppShoHid(showHide){
				if(showHide){
					this.contentMargin.contentMargin1 = true
					this.contentMargin.contentMargin2 = false
				}else{
					this.contentMargin.contentMargin2 = true
					this.contentMargin.contentMargin1 = false
				}
				
			},
			console() {

			},
			shareMCClick() {
				this.shareMC = 'none'
			},
			getNewsDetailsList() {
				axios.get(this.$root.urlPath.MC + '/wap/news.do?newsDetail', {
						params: {
							newsId: this.$route.query.id
						}
					})
					.then(res => {
						if(res.data.success) {
							
							this.newsDetailsList = res.data.data.res
							this.likeCount = res.data.data.ucolle
							this.landCount = res.data.data.ulike
							this.likeOrNo = res.data.data.uco
							this.landOrNo = res.data.data.ul

							this.newsDetailsList.insert_time = getTime1(this.newsDetailsList.insert_time)
						} else {}
					})
					.catch(function(error) {

					});
			},
			likeClick(type) {
				if(cookie.get('MC_UID')) {
					this.getLand(type)
				} else {
					appLogin()
				}
			},
			getLand(type) {

				if(type == 320) {
					axios.get(this.$root.urlPath.MC + '/wap/news.do?like', {
							params: {
								newsId: this.$route.query.id,
								type: type,
								action: this.likeOrNo ? 1 : 0
							}
						})
						.then(res => {
							if(res.data.success) {
								this.likeCount = res.data.data.count
								if(this.likeOrNo == 0) {
									this.likeOrNo = 1
								} else {
									this.likeOrNo = 0
								}
							} else {
								this.$vux.alert.show({
									title: '提示',
									content: res.errMsg,
								})
							}
						})
						.catch(function(error) {});

				} else {
					axios.get(this.$root.urlPath.MC + '/wap/news.do?like', {
							params: {
								newsId: this.$route.query.id,
								type: type,
								action: this.landOrNo ? 1 : 0
							}
						})
						.then(res => {
							if(res.data.success) {
								this.landCount = res.data.data.count
								if(this.landOrNo == 0) {
									this.landOrNo = 1
								} else {
									this.landOrNo = 0
								}
							} else {}
						})
						.catch(function(error) {});
				}

			},
			share() {
				if(isDevice() == '其他浏览器') {
					this.show1 = true
				} else if(isDevice() == 'adr' || isDevice() == 'ios') {
					getAppShare(window.location.href, this.newsDetailsList.title, this.newsDetailsList.img, this.newsDetailsList.vdesc, "")
				}

			},
			shareWX() {
				if(isDevice() == '其他浏览器') {
					
					this.shareMC = 'block'
				} else if(isDevice() == 'adr' || isDevice() == 'ios') {
					getAppShare(window.location.href, this.newsDetailsList.title, this.newsDetailsList.img, this.newsDetailsList.vdesc, "WEIXIN")
				}

			},
			sharePYQ() {
				if(isDevice() == '其他浏览器') {
					this.shareMC = 'block'
				} else if(isDevice() == 'adr' || isDevice() == 'ios') {
					getAppShare(window.location.href, this.newsDetailsList.title, this.newsDetailsList.img, this.newsDetailsList.vdesc, "WEIXIN_CIRCLE")
				}

			},
			shareWB() {

				if(isDevice() == '其他浏览器') {
					var share1 = new ShareTip();
					share1.sharetosina(
						this.newsDetailsList.title,
						window.location.href,
						this.newsDetailsList.img,

					);
				} else if(isDevice() == 'adr' || isDevice() == 'ios') {
					getAppShare(window.location.href, this.newsDetailsList.title, this.newsDetailsList.img, this.newsDetailsList.vdesc, "SINA")
				}

			},
			shareQQKJ() {
				var share1 = new ShareTip();
					share1.sharetoqqzone(
						this.newsDetailsList.title,
						window.location.href,
						this.newsDetailsList.img,
						this.newsDetailsList.vdesc
				);
			},
			back() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
					this.$router.go(-1);
				}

			}

		}
	}
</script>

<style>
	.newsDetails .oHeader{
		width: 7.5rem;
	}
	.newsDetails .fixedHeader{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.newsDetails .noFixedHeader{
		position: static;
	}
	.newsDetails .content{
		margin-top: 1rem;
	}
	.newsDetails .contentMargin1{
		margin-top: 1.95rem;
	}
	.newsDetails .contentMargin2{
		margin-top: 1rem;
	}
	.newsDetails .content p img {
		width: 100% !important;
		height: auto !important;
	}
	
	.newsDetails .color_r {
		color: red
	}
	
	.newsDetails .color_h {
		color: #ccc;
	}
	
	.newsDetails {
		background-color: #fff;
	}
	
	.newsDetails .oHeader .rightA .icon-tubiao212 {
		font-size: 0.36rem;
	}
	
	.newsDetails .content {
		padding: 0.38rem 0.2rem;
	}
	
	.newsDetails .content h1 {
		font-size: 0.36rem;
		margin-bottom: 0.3rem;
	}
	
	.newsDetails .content .smh1 {
		font-size: 0.24rem;
		color: rgb(117, 117, 117);
		margin-bottom: 0.2rem;
	}
	
	.newsDetails .content .smh1 i {
		font-size: 0.24rem;
	}
	
	.newsDetails .content .smh1 span {
		margin-right: 0.2rem;
	}
	.newsDetails .content .vtext img{
		box-sizing: border-box
	}
	.newsDetails .content .smh1 span:last-child {
		margin-right: 0;
	}
	
	.newsDetails .bottom {
		position: relative;
	}
	
	.newsDetails .bottom .likeBox {
		text-align: center;
		/*color: #EF4871;*/
		font-size: 0.28rem;
		color: #Ccc;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.newsDetails .bottom .likeBox i {
		font-size: 0.32rem;
		margin-right: 0.1rem;
	}
	
	.newsDetails .bottom .likeBox span {
		margin-right: 0.2rem;
	}
	
	.newsDetails .bottom .likeBox .laud {
		margin-right: 0.95rem;
	}
	
	.newsDetails .bottom .shareBox {
		font-size: 0.28rem;
		padding: 0.65rem;
		padding-left: 0.9rem;
	}
	
	.newsDetails .bottom .shareBox i {
		vertical-align: middle;
		font-size: 0.4rem;
	}
	
	.newsDetails .bottom .shareBox label {
		margin-right: 0.35rem;
	}
	
	.newsDetails .bottom .shareBox span {
		margin-right: 0.1rem;
	}
	
	.newsDetails .icon-wechat {
		color: #39B42E;
	}
	
	.newsDetails .icon-pengyouquan1 {
		color: #EE8817;
	}
	
	.newsDetails .icon-weibo1 {
		color: #F95465;
	}
	
	
</style>