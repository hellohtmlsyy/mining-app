<template>
	<div class="act020903">
    <div class="revert" @click="back">
			<i class="icon iconfont icon-jiantou-copy color_f"></i>
		</div>
		<div style="position: relative;">
			<img src="../../../../static/img/act/20190209/3-1.png" alt="" style="width: 100%;" />
			<a href="tel:18600548248" class="tel">186 0054 8248</a>
		</div>
		<div class="signUp">
			<img src="../../../../static/img/act/20190209/3-btn.png" alt="" class="btn" @click="goSignUp()" />
		</div>
	</div>
</template>
<script>
	import {
		wxShare,
		setCookie,
    getCookie,
    lastPage
	} from '@/assets/commonjs/util.js';
	export default {
		data() {
			return {
				url: window.location.href,
				invitationCode: this.$route.query.invitationCode,
			}
		},
		methods: {
      back() {
				lastPage()
		  },
			goSignUp() {
        //是否登录
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
								this.$vux.toast.text('您已预定，不能重复预定!', 'center');
							  this.invitationCode = res.data.data;
                var self = this;
                window.setTimeout(function() {
                  window.location.href = self.$root.urlPath.MCM + '/act/act2019020906?invitationCode=' + self.invitationCode + '&newpage=newpage';
                }, 2000)
							} else {
								//未报名
								if (this.invitationCode && this.invitationCode != '' && this.invitationCode != 'undefined' && this.invitationCode !=
											'null') {
                    window.location.href = this.$root.urlPath.MCM + '/act/act2019020905?invitationCode=' + this.invitationCode + '&newpage=newpage';
                } else {
                  window.location.href = this.$root.urlPath.MCM + '/act/act2019020905?newpage=newpage';
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
            window.location.href = this.$root.urlPath.MCM + '/act/act2019020904?invitationCode=' + this.invitationCode + '&newpage=newpage';
          } else {
            window.location.href = this.$root.urlPath.MCM + '/act/act2019020904?newpage=newpage';
          }
				}
			},
		},
		created() {
			//wx-share
			var title = '正月初五迎财神，矿业圈邀你三亚逛庙会';
			var desc = '参加2月9日小镇财神节庙会，获得888元游园大礼包，尽享美味BBQ，还有新年烟花热情篝火';
			var imgUrl = this.$root.urlPath.MCM +'/static/img/act/20190209/wx_share.jpg';
			var golink = window.location.href;
			wxShare(this.$root.urlPath.MCT + '/wx/share', this.url, title, imgUrl, desc, golink);
		},
	}
</script>
<style scoped>
	.act020903 {
		height: 100%;
		width: 100%;
		background-color: #a40000;
		position: relative;
		padding: 0.18rem 0.23rem 0;
    text-align: center;
    box-sizing: border-box
	}

	.act020903 .btn {
		width: 2.64rem;
		margin: 0.6rem 0 0.9rem;
	}

	.act020903 .tel {
		position: absolute;
		bottom: 0.85rem;
		font-size: 0.13rem;
		left: 1.1rem;
		opacity: 0;
	}
</style>
