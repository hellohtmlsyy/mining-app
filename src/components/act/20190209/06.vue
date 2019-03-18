<template>
	<div>
		<div class="act020906">
			<div class="share">
				<img src="../../../../static/img/act/20190209/6-1.png" alt="" class="img-w100">
				<div class="share_con">
					<span class="share_btn" @click="share()">立即分享</span>
					<div class="text">支持财神节当天使用，及购买小镇餐饮住宿服务分享至朋友圈，邀请10个矿业好友参与本活动可获得一晚小镇别墅（价值1998元）</div>
					<div class="inv">您已成功邀请<span>{{num}}</span>位好友参加此活动</div>
				</div>
			</div>
			<div class="con">
				<div class="btn" @click="goNextpage">返回</div>
			</div>
			<div class="lay" v-show="shareLay" @click="share()">
				<img src="../../../../static/img/act/share.png" alt="" />
			</div>
		</div>
	</div>
</template>
<script>
	import {
		wxShare,
		setCookie,
    getCookie,
    isDevice,
    getAppShare
	} from '@/assets/commonjs/util.js';
	export default {
		data() {
			return {
				shareLay: false,
				url: window.location.href,
				invitationCode: this.$route.query.invitationCode,
        num: 0,
			}
		},
		methods: {
			goNextpage() {
				window.location.href = this.$root.urlPath.MCM + '/act/act2019020901?invitationCode=' + this.invitationCode + '&newpage=newpage';
			},
			share() {
        if(isDevice() == "其他浏览器" || isDevice() == "微信浏览器") {
					this.shareLay = true
				}else{
          var title = '正月初五迎财神，矿业圈邀你三亚逛庙会';
          var desc = '参加2月9日小镇财神节庙会，获得888元游园大礼包，尽享美味BBQ，还有新年烟花热情篝火';
          var imgUrl = this.$root.urlPath.MCM +'/static/img/act/20190209/wx_share.jpg';
          var golink = window.location.href;
					getAppShare(golink,title,imgUrl,desc, "")
				}
			},
		},
		mounted() {
			var winHeight = $(window).height(); //获取当前页面高度
			$('.act020906').css('height', winHeight + 'px');
		},
		created() {
			//wx-share
			var title = '正月初五迎财神，矿业圈邀你三亚逛庙会';
			var desc = '参加2月9日小镇财神节庙会，获得888元游园大礼包，尽享美味BBQ，还有新年烟花热情篝火';
			var imgUrl = this.$root.urlPath.MCM +'/static/img/act/20190209/wx_share.jpg';
      var golink = window.location.href;

			wxShare(this.$root.urlPath.MCT + '/wx/share', this.url, title, imgUrl, desc, golink);
      // 是否登录
     if (getCookie("MC_UID")) {
          //是否报名
					this.$axios.get(this.$root.urlPath.MCT + '/wap/activity/actAlready', {
							params: {
								activityNo: '20190209'
							}
						})
						.then(res => {
							if (res.data.data) {
								//已报名
								if(this.$route.query.invitationCode != res.data.data){
										this.invitationCode = res.data.data;
									}
							} else {
								//未报名
									if (this.invitationCode && this.invitationCode != '' && this.invitationCode != 'undefined' && this.invitationCode !=
										'null') {
										window.location.href = this.$root.urlPath.MCM + '/act/act2019020901?invitationCode=' + this.invitationCode + '&newpage=newpage';
									} else {
										window.location.href = this.$root.urlPath.MCM + '/act/act2019020901?newpage=newpage';
									}
              }
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					//未登录
					if (this.invitationCode && this.invitationCode != '' && this.invitationCode != 'undefined' && this.invitationCode !=
							'null') {
							window.location.href = this.$root.urlPath.MCM + '/act/act2019020901?invitationCode=' + this.invitationCode + '&newpage=newpage';
						} else {
							window.location.href = this.$root.urlPath.MCM + '/act/act2019020901?newpage=newpage';
						}
				}
			//活动报名邀请统计数量
			this.$axios.get(this.$root.urlPath.MCT + '/wap/activity/actInvitationNum', {
					params: {
						activityNo: 20190209,
						MC_UID: getCookie('MC_UID'),
					}
				})
				.then(res => {
					if (res.data.success) {
						this.num = res.data.data
					} else {}
				})
				.catch(err => {
					console.log(err)
				})
		},
	}
</script>
<style scoped>
	.img-w100 {
		width: 100%;
	}

	.act020906 {
		height: 100%;
		width: 100%;
		background-color: #a40000;
		position: relative;
    padding: 0.3rem 0.36rem 0;
    box-sizing: border-box;
	}

	.act020906 .lay {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .8);
		text-align: center;
		z-index: 100000;
	}

	.act020906 .lay img {
		width: 75%;
		margin: 0.5rem 0 0 0.5rem;
	}

	.act020906 .share {
		text-align: center;
		position: relative;
	}

	.act020906 .share .share_con {
		position: absolute;
		bottom: 0.52rem;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 0 0.96rem;
	}

	.act020906 .share_con .share_btn {
		background-image: linear-gradient(0deg,
			#c11916 0%,
			#ff7b00 100%),
			linear-gradient(#ffffff,
			#ffffff);
		border-radius: 6px;
		width: 2.8rem;
		height: 0.8rem;
		line-height: 0.8rem;
		color: #fff;
		font-size: 0.3rem;
    display: inline-block
	}

	.act020906 .share_con .text {
		font-size: 0.24rem;
		line-height: 0.4rem;
		color: #a40000;
		margin: 0.1rem 0;
	}

	.act020906 .share_con .inv {
		background-color: #a40000;
		border-radius: 5px;
		border: solid 1px #c40102;
		color: #fff;
		font-size: 0.24rem;
		width: 4.6rem;
		height: 0.54rem;
		line-height: 0.54rem;
	}

	.act020906 .share_con .inv span {
		font-size: 0.3rem;
		font-weight: 700;
		color: #fff100;
		margin: 0 0.1rem;
	}

	.act020906 .con {
		padding: 0 0.44rem;
		text-align: center;
		margin-top: 0.48rem;
		margin-bottom: 0.3rem;
	}

	.act020906 .con .btn {
		width: 100%;
		height: 0.82rem;
		line-height: 0.82rem;
		background-image: linear-gradient(0deg,
			#c11916 0%,
			#ff7b00 100%),
			linear-gradient(#ffffff,
			#ffffff);
		border-radius: 6px;
		font-size: 0.3rem;
		color: #fff;
	}
</style>
