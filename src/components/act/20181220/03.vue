<template>
	<div>
		<div class="act03">
			<div class="imgbox"><img src="../../../../static/img/act/20181220/3-1.png" class="img" /></div>
			<div class="con">
				<div class="btn btn-back mb-28" @click="share()">分享</div>
				<div class="btn btn-close" @click="index()">返回活动首页</div>
			</div>
			<div class="share" @click="share()" v-show="shareLay">
				<img src="../../../../static/img/act/20181220/3-2.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {
		setCookie,
		getCookie,
		wxShare
	} from '@/assets/commonjs/util.js';
	import qs from 'qs';
	var time = null;
	export default {
		data() {
			return {
				shareLay: false,
				url: window.location.href,
			}
		},
		methods: {
			index() {
				window.location.href = this.$root.urlPath.MCM + '/act/act2018122001';
			},
			share() {
				this.shareLay = !this.shareLay;
			},
		},
		created() {
			//是否登录
			if (getCookie("MC_UID")) {
				//是否报名
				this.$axios.get(this.$root.urlPath.MCT + '/wap/activity/actAlready', {
						params: {
							activityNo: '20181228'
						},
						headers: {
							MC_UID: getCookie('MC_UID')
						}
					})
					.then(res => {
						if (res.data.data) {
							//已报名
						} else {
							//未报名
							this.$axios.get(this.$root.urlPath.MCT + '/wap/company/comInfo')
								.then(res => {
									if (res.data.success && res.data.errCode == '001002139') {
										const params2 = {
											'activityNo': '20181228',
											'activityDesc': '矿业圈入驻推广',
											'spread': 'true'
										};
										this.$axios.post(this.$root.urlPath.MCT + '/wap/activity/activitySubmit',
												qs.stringify(params2), {
													headers: {
														'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
														'MC_UID': getCookie('MC_UID'),
													}
												}
											)
											.then(res => {
												if (res.data.success) {
													//已报名
												} else {
													this.$vux.toast.text(res.data.errMsg, 'center');
												}
											})
											.catch(err => {
												console.log(err)
											})
									} else {
										window.location.href = this.$root.urlPath.MCMHALL + '/cert?newpage=newpage&spread=true';
									}
								})
								.catch(err => {})
						}
					})
					.catch(err => {
						console.log(err)
					})
			} else {
				//未登录
				window.location.href = this.$root.urlPath.MCM + '/act/act2018122002';
			}
			//wx-share
			var title = '矿业圈让你挥别寒冷的2018，走进温暖的2019';
			var imgUrl = 'http://www.miningcircle.com/img/20181228spread.jpg';
			var desc = '凛冬骤降，矿业圈新年礼包等你来，点击开启你的三亚免费之旅';
			var golink = window.location.href;
			wxShare(this.$root.urlPath.MCT + '/wx/share', this.url, title, imgUrl, desc, golink);
		},
		mounted() {
			var winHeight = $(window).height(); //获取当前页面高度  
			$('.act03').css('height', winHeight + 'px');
		},
	}
</script>
<style scoped="scoped">
	@import url('../../../static/css/act.css');

	.act03 {
		padding: 0.9rem 0.51rem;
		background-image: linear-gradient(0deg,
			#0030ff 0%,
			#6463f8 100%),
			linear-gradient(#ffffff,
			#ffffff);
		background-blend-mode: normal,
			normal;
		opacity: 0.9;
	}

	.act03 .imgbox {
		padding: 0 0.35rem;
	}

	.act03 .img {
		width: 100%;
		margin-bottom: 0.83rem;
	}

	.act03 .share {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .85);
		text-align: center;
		z-index: 100000;
	}

	.act03 .share img {
		width: 75%;
		margin: 0.5rem 0 0 0.5rem;
	}

	.act03 .con {
		width: 100%;
	}

	.act03 .con .btn {
		width: 100%;
		height: 0.7rem;
		line-height: 0.7rem;
		background-blend-mode: normal,
			normal;
		border-radius: 4px;
		font-size: 0.3rem;
		color: #fff;
		text-align: center;
	}

	.act03 .con .btn-back {
		background-image: linear-gradient(0deg,
			#fe5a4c 0%,
			#f9ce25 100%),
			linear-gradient(#fba533,
			#fba533);
	}

	.act03 .con .btn-close {
		background-color: #fff;
		color: #eb6100;
	}
</style>
