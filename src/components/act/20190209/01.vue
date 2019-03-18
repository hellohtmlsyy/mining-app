<template>
	<div class="act020901" :style="{backgroundImage: 'url(' + bgurl + ')' }">
    <div class="revert" @click="back">
			<i class="icon iconfont icon-jiantou-copy color_f"></i>
		</div>
		<div>
			<img src="../../../../static/img/act/20190209/1-btn.png" alt="" class="btn" :style="{bottom: bot}" @click="goSignUp" />
		</div>
	</div>
</template>
<script>
	import {
    wxShare,
    lastPage
	} from '@/assets/commonjs/util.js';
	export default {
		data() {
			return {
				url: window.location.href,
				bgurl: this.$root.urlPath.MCM + '/static/img/act/20190209/bg-1.jpg',
				bot: '0.82rem',
				invitationCode: this.$route.query.invitationCode,
			}
		},
		methods: {
			goSignUp() {
				if( this.invitationCode && this.invitationCode != '' && this.invitationCode != 'undefined' && this.invitationCode != 'null' ){
					window.location.href = this.$root.urlPath.MCM+ '/act/act2019020902?invitationCode=' + this.invitationCode + '&newpage=newpage';
				}else{
					window.location.href = this.$root.urlPath.MCM + '/act/act2019020902?newpage=newpage'
				}
      },
      back() {
				lastPage()
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
		mounted() {
			var winHeight = $(window).height(); //获取当前页面高度
			if (winHeight > 600) {
				this.bgurl = this.$root.urlPath.MCM + '/static/img/act/20190209/bg-1-1.jpg';
				this.bot = '1.9rem';
			}
			$('.act020901').css('height', winHeight + 'px');
    },
	}
</script>
<style scoped>
	.act020901 {
		background-size: 100% 100%;
		height: 100%;
		width: 100%;
	}

	.act020901 .btn {
		width: 2.64rem;
		position: absolute;
		left: 50%;
		margin-left: -1.32rem;
	}
</style>
