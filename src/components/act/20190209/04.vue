<template>
	<div>
		<div class="act02">
      <div class="revert" @click="back">
			<i class="icon iconfont icon-jiantou-copy color_f"></i>
		  </div>
			<div class="imgbox"><img src="../../../../static/img/act/20190209/bg-4.jpg" class="img" /></div>
      <div class="revert" @click="back">
				<i class="icon iconfont icon-jiantou-copy color_f"></i>
			</div>
			<div class="con" :style="{bottom: bot}">
				<input type="text" placeholder="请输入手机号" class="mb-20" v-model.trim="userinfo.tel" />
				<div class="dis-fl clearfix">
					<input class="fl" type="tel" placeholder="请输入验证码" v-model.trim="userinfo.msgCode">
					<button class="fr right" @click="mobileCheck()" v-show="show_time">验证码</button>
					<button class="fr right" v-show="!show_time">{{count}}秒重新获取</button>
				</div>
				<div class="btn" @click="signUp()" :disabled="disable">提交</div>
			</div>
			<div class="captcha" v-show="show_captcha">
				<div class="content">
					<div class="tit">请填写图形验证码</div>
					<div class="dis-fl text clearfix">
						<input type="text" v-model="userinfo.code" class="fl"><img :src="this.code_url" alt="" @click="reset_code()"
						 class="fl">
					</div>
					<div class="choice">
						<span class="cancel" @click="cancel()">取消</span>
						<span class="confirm" @click="confirm()">确定</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {
		setCookie,
		getCookie,
    wxShare,
    lastPage
	} from '@/assets/commonjs/util.js';
	import qs from 'qs';
	var time = null;
	export default {
		data() {
			return {
				url: window.location.href,
				userinfo: {
					tel: '',
					msgCode: '',
					code: '',
				},
				disable: false,
				telError: false, //手机号错误
				msg_codeError: false, //短信验证码
				codeError: false, //图形验证码
				mobileIsEixt: false,
				count: 60,
				show_time: true,
				activityNo: '20190209', //活动编号
				code_url: '',
				show_captcha: false,
        enroll: false, //是否报名
        bot: '0.96rem',
        invitationCode: this.$route.query.invitationCode,
			}
		},
		watch: {
			['userinfo.tel']() {
				this.mobileIsEixt = false;
				var mobile = /^1[34578]\d{9}$/;
				this.telError = this.userinfo.tel.length == 11 && mobile.test(this.userinfo.tel) ? false : true;
			},
		},
		methods: {
      back() {
				lastPage()
		  },
			signUp() {
        localStorage.tel = this.userinfo.tel


				console.log(this.enroll)
				this.msg_codeError = this.userinfo.msgCode.length > 0 ? false : true;
				if (this.msg_codeError) {
					this.$vux.toast.text('请输入正确的验证码', 'center');
				}
				this.telError = this.userinfo.tel.length == 11 && /^1[34578]\d{9}$/.test(this.userinfo.tel) ? false : true;
				if (this.telError) {
					this.$vux.toast.text('请输入正确的手机号', 'center');
				}
				if (!this.telError && !this.msg_codeError && !this.mobileIsEixt) {
					this.disable = true;
					const params = {
						account: this.userinfo.tel,
						msgCode: this.userinfo.msgCode,
						MC_SMS: getCookie('MC_SMS'),
					}
					this.$axios.post(this.$root.urlPath.MCT + '/quickLogin',
							qs.stringify(params), {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
									'MC_SMS': getCookie('MC_SMS'),
								}
							}
						)
						.then(res => {
							if (res.data.success) {
								setCookie('MC_UID', res.data.data);
								//是否报名
								this.$axios.get(this.$root.urlPath.MCT + '/wap/activity/actAlready', {
										params: {
                      activityNo: '20190209',
                      MC_UID: getCookie('MC_UID')
										},
										headers: {
											MC_UID: getCookie('MC_UID')
										}
									})
									.then(res => {
										if (res.data.data) {
                      this.invitationCode = res.data.data;
											this.$vux.toast.text('您已预定，不能重复预定!', 'center');
											var self = this;
											window.setTimeout(function() {
												window.location.href = self.$root.urlPath.MCM + '/act/act2019020906?newpage=newpage';
											}, 2000)
										} else {
                      //未报名
                      if (this.invitationCode && this.invitationCode != '' && this.invitationCode != 'undefined' && this.invitationCode !=
												'null') {
												window.location.href = this.$root.urlPath.MCM + '/act/act2019020905?invitationCode=' + this.invitationCode;
											} else {
												window.location.href = this.$root.urlPath.MCM + '/act/act2019020905';
											}
										}
									})
									.catch(err => {
										console.log(err)
									})
							} else {
								this.$vux.toast.text(res.data.errMsg, 'center');
							}
						})
						.catch(err => {
							console.log(err)
						})
				}
			},
			mobileCheck() {
				var mobile = /^1[34578]\d{9}$/;
				this.telError = this.userinfo.tel.length == 11 && mobile.test(this.userinfo.tel) ? false : true;
				if (!this.userinfo.tel || this.telError) {
					this.$vux.toast.text('请输入正确的手机号', 'center')
					return false;
				}
				this.show_captcha = true;
			},
			getCaptcha() {
				this.$axios.get(this.$root.urlPath.MCT + '/common/getCaptchaPre?type=1')
					.then(res => {
						this.MC_CAPTCHA = res.data.data;
						this.$axios.get(this.$root.urlPath.MCT + '/common/captcha?type=1', {
								params: {
									MC_CAPTCHA: this.MC_CAPTCHA,
								}
							})
							.then(res => {
								this.code_url = this.$root.urlPath.MCT + '/common/captcha?type=1&MC_CAPTCHA=' + this.MC_CAPTCHA;
							})
							.catch(err => {
								console.log(err)
							})
					})
					.catch(err => {
						console.log(err)
					})
			},
			cancel() {
				this.show_captcha = !this.show_captcha;
			},
			confirm() {
				this.codeError = this.userinfo.code.length > 0 ? false : true;
				if (!this.codeError) {
					var self = this;
					if (time) {
						window.clearInterval(time);
						this.count = 60;
					}
					var count = this.count;
					this.$axios.get(this.$root.urlPath.MCT + '/common/getSmsPre?type=1')
						.then(res => {
							if (res.data.success) {
								setCookie('MC_SMS', res.data.data);
								const params = {
									mobile: this.userinfo.tel,
									MC_SMS: getCookie('MC_SMS'),
									code: this.userinfo.code,
									MC_CAPTCHA: this.MC_CAPTCHA
								};
								this.$axios.post(this.$root.urlPath.MCT + '/common/sms?type=1&code2=1',
										qs.stringify(params), {
											headers: {
												'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
												'MC_SMS': getCookie('MC_SMS'),
											}
										}
									)
									.then(res => {
										if (!res.data.data) {
											this.$vux.toast.text('您输入的图形验证码不正确', 'center');
											this.getCaptcha()
											return;
										} else {
											this.show_captcha = false;
											this.show_time = false;
										}
									})
							} else {
								this.$vux.toast.text('您输入的账户或者验证码不正确', 'center');
							}
						})
						.catch(err => {
							this.disable = false;
						})

					time = setInterval(function() {
						self.time = count;
						Vue.set([self.time], 'time', count)
						count--
						if (count < 1) {
							count = 5;
							self.show_time = true;
							clearInterval(time);
						}
						self.count = count;
					}, 1000)
				} else {
					this.$vux.toast.text('请输入图形验证码', 'center')
				}
			},
			reset_code() { //刷新验证码
				this.getCaptcha()
			},
		},
		created() {
			//图形验证码
			this.getCaptcha();
			//是否登录
			if (getCookie("MC_UID")) {
				//是否报名
				this.$axios.get(this.$root.urlPath.MCT + '/wap/activity/actAlready', {
						params: {
              activityNo: '20190209',
              MC_UID: getCookie('MC_UID')
						},
						headers: {
							MC_UID: getCookie('MC_UID')
						}
					})
					.then(res => {
						console.log(res.data.data)
						if (res.data.data) {
            this.invitationCode = res.data.data;
							this.enroll = true;
							this.$vux.toast.text('您已报名，不能重复报名!', 'center');
							var self = this;
							window.setTimeout(function() {
								window.location.href = self.$root.urlPath.MCM + '/act/act2019020906?newpage=newpage';
							}, 2000)
						} else {
              if (this.invitationCode && this.invitationCode != '' && this.invitationCode != 'undefined' && this.invitationCode !=
										'null') {
									window.location.href = this.$root.urlPath.MCM + '/act/act2019020905?invitationCode=' + this.invitationCode;
              } else {
                window.location.href = this.$root.urlPath.MCM + '/act/act2019020905';
              }
						}
					})
					.catch(err => {
						console.log(err)
					})
			} else {
				//未登录
			}

			//wx-share
			var title = '正月初五迎财神，矿业圈邀你三亚逛庙会';
			var desc = '参加2月9日小镇财神节庙会，获得888元游园大礼包，尽享美味BBQ，还有新年烟花热情篝火';
			var imgUrl = this.$root.urlPath.MCM +'/static/img/act/20190209/wx_share.jpg';
			var golink = window.location.href;
			wxShare(this.$root.urlPath.MCT + '/wx/share', this.url, title, imgUrl, desc, golink);
		},
		mounted() {
			var winHeight = $(window).height(); //获取当前页面高度
			$('.act02').css('height', winHeight + 'px');
		},
	}
</script>
<style scoped="scoped">
	@import url('../../../static/css/act.css');
  .act02 .imgbox{
    height: 100%;
  }
  .act02 .imgbox img{
    height: 100%;
  }
  .act02 .revert{
    position: absolute;
    top: 20px;
    left: 20px;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.6rem;
    background-color: rgba(119, 110, 93, .6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
	.act02 {
		height: 100%;
		background-blend-mode: normal,
			normal;
		opacity: 0.9;
		position: relative;
	}

	.act02 .img {
		width: 100%;
	}

	.act02 .con {
		width: 100%;
		position: absolute;
		/* bottom: 1.7rem; */
		left: 0;
		padding: 0 0.3rem;
	}

	.act02 .con .dis-fl .right {
		width: 36%;
		text-align: center;
		height: 0.7rem;
		line-height: 0.7rem;
		border: none;
		color: #fff;
		font-size: 0.28rem;
		background-image: linear-gradient(0deg,
			#ff7b00 0%,
			#f39700 100%),
			linear-gradient(#6bbe21,
			#6bbe21);
		background-blend-mode: normal,
			normal;
		border-radius: 4px;
	}

	.act02 .con input[type="text"],
	.act02 .con input[type="tel"],
	.act02 .con .btn {
		width: 100%;
		height: 0.7rem;
		line-height: 0.7rem;
		border: solid 1px #707070;
		color: #333;
		font-size: 0.28rem;
		margin-bottom: 0.3rem;
		padding: 0 0.28rem;
		background-image: linear-gradient(#ffffff,
			#ffffff),
			linear-gradient(#0099ff,
			#0099ff);
		background-blend-mode: normal,
			normal;
		border-radius: 4px;
	}

	input::-webkit-input-placeholder {
		color: #7d7d7d;
	}

	.act02 .con input[type="tel"] {
		width: 61%;
		background-color: #ffffff;
		border-radius: 4px;
		margin-right: 0.16rem;
	}

	.act02 .con .btn {
    border: none;
		font-size: 0.3rem;
		text-align: center;
		color: #fff;
		padding: 0;
		border-radius: 4px;
		background-image: linear-gradient(0deg,
			#c11916 0%,
			#ff7b00 100%),
			linear-gradient(#ffffff,
			#ffffff);
		background-blend-mode: normal,
			normal;
	}

	.act02 .captcha {
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		bottom: 1rem;
		padding: 0 0.1rem;
	}

	.act02 .captcha .content {
		width: 100%;
		background: rgba(242, 242, 242, 1);
		border-radius: 4px;
		padding: 0.25rem 0.3rem;
	}

	.act02 .content .tit {
		font-size: 0.36rem;
		color: #000;
		margin: 0.2rem 0 0.4rem 0;
	}

	.act02 .content .text {
		background: #FFF;
		width: 100%;
		height: 0.7rem;
	}

	.act02 .content input[type="text"] {
		height: 100%;
		border: none;
		padding: 0 0.25rem;
		font-size: 0.3rem;
		width: 66%;
	}

	.act02 .text img {
		width: 34%;
		cursor: pointer;
	}

	.act02 .choice {
		width: 100%;
		margin-top: 0.5rem;
		padding: 0.2rem 0;
	}

	.act02 .choice span {
		width: 49%;
		text-align: center;
		font-size: 0.3rem;
		display: inline-block;
		cursor: pointer;
	}

	.act02 .choice .cancel {
		color: #666;
	}

	.act02 .choice .confirm {
		color: #1094ff;
	}
</style>
