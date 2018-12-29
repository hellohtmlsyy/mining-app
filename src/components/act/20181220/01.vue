<template>
	<div>
		<div class="act01">
			<div class="mb-20"><img src="../../../../static/img/act/20181220/1-1.png" alt="" class="img"></div>
			<div class="imgbox mb-30"><img src="../../../../static/img/act/20181220/1-2.png" alt="" class="img"></div>
			<div class="reward mb-24">
				<div class="con">
					<div class="fs-26 col-1e47ff fw-6">注册矿业圈--生成旗舰店--分享朋友圈</div>
					<div class="prize">完成以上三步，即可有机会获得<br><span class="fw-6 col-f398 fs-28">免费一日小镇豪华别墅住宿+免费精美早餐一份</span></div>
					<div><span class="partake" @click="luckdraw()">参与活动</span></div>
				</div>
			</div>
			<div class="imgbox text mb-50">
				<p>1. 奖项可转赠亲友使用，每栋别墅最多可入住6人</p>
				<p>2. 活动时间：2018年12月28日-2018年1月6日</p>
				<p>3. 活动咨询请致电：400-819-6985（9:00-18:00）<br><span style="text-indent: 0.26rem;display: inline-block;">活动邮箱：dyh@qlfg.com</span></p>
				<p>4. 本活动最终解释权归清蓝矿业圈所有</p>
			</div>
			<div class="imgbox mb-30">
				<a href="http://f.amap.com/pYfR_0605gGE" target="_blank">
					<img src="../../../../static/img/act/20181220/1-4.png" alt="" class="img">
				</a>
			</div>
			<div class="imgbox mb-40">
				<a href="http://m.apftown.com/act/act2018103101" target="_blank">
					<img src="../../../../static/img/act/20181220/1-5.png" alt="" class="img">
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		wxShare,
		setCookie,
		getCookie,
	} from '@/assets/commonjs/util.js';
	export default {
		data() {
			return {
				url: window.location.href,
			}
		},
		methods: {
			luckdraw(data) {
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
								this.$vux.toast.text('您已报名，不能重复报名!', 'center');
								var self = this;
								window.setTimeout(function() {
									window.location.href = self.$root.urlPath.MCM + '/act/act2018122003';
								}, 2000)
							} else {
								//未报名
								this.$axios.get(this.$root.urlPath.MCT + '/wap/company/comInfo')
									.then(res => {
										if (res.data.success || res.data.companyId || (!res.data.success && res.data.errCode == '001002139')) {
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
														//报名成功
														window.location.href = this.$root.urlPath.MCM + '/act/act2018122003';
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
			},
		},
		created() {
			//wx-share
			var title = '矿业圈让你挥别寒冷的2018，走进温暖的2019';
			var imgUrl = 'http://www.miningcircle.com/img/20181228spread.jpg';
			var desc = '凛冬骤降，矿业圈新年礼包等你来，点击开启你的三亚免费之旅';
			var golink = window.location.href;
			wxShare(this.$root.urlPath.MCT + '/wx/share', this.url, title, imgUrl, desc, golink);
		},
	}
</script>
<style scoped>
	@import url('../../../static/css/act.css');

	.fw-6 {
		font-weight: 600;
	}

	.fs-26 {
		font-size: 0.26rem;
	}

	.fs-28 {
		font-size: 0.28rem;
	}

	.col-f398 {
		color: #f39800;
	}

	.col-1e47ff {
		color: #1e47ff;
	}

	.act01 {
		height: 100%;
		background-image: linear-gradient(0deg,
			#0030ff 0%,
			#6463f8 100%),
			linear-gradient(#ffffff,
			#ffffff);
		background-blend-mode: normal,
			normal;
		opacity: 0.9;
		padding: 0.2rem 0.22rem;
	}

	.act01 .imgbox {
		position: relative;
		padding: 0 0.3rem;
	}

	.act01 .img {
		width: 100%;
	}

	.act01 .reward {
		width: 100%;
		padding: 0 0.3rem;
	}

	.act01 .reward .con {
		text-align: center;
		background-color: #fff;
		border-radius: 0.1rem;
		border: solid 1px #00b7ee;
		padding: 0.24rem 0;
	}

	.act01 .reward .prize {
		font-size: 0.24rem;
		color: #1e47ff;
		margin-top: 0.26rem;
		line-height: 0.48rem;
	}

	.act01 .reward .partake {
		display: inline-block;
		width: 2rem;
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.3rem;
		color: #fff;
		background-image: linear-gradient(0deg,
			#eb6100 0%,
			#ffb94f 100%),
			linear-gradient(0deg,
			#2a4dfe 0%,
			#00b7ee 100%);
		background-blend-mode: normal,
			normal;
		border-radius: 0.1rem;
		margin-top: 0.2rem;
	}

	.act01 .text {
		font-size: 0.26rem;
		line-height: 0.48rem;
		color: #fff;
	}

	.act01 .btn {
		width: 0.32rem;
		position: absolute;
		right: 0.3rem;
	}
</style>
