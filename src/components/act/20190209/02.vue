<template>
	<div class="act020902">
    <div class="revert" @click="back">
			<i class="icon iconfont icon-jiantou-copy color_f"></i>
		</div>
		<div style="position: relative;">
			<img src="../../../../static/img/act/20190209/2-1.png" alt="" style="width: 100%;" />
      <div class="ky">
			<div class="video ky-video">
        <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=f030488fl0w" allowFullScreen="true" scrolling="no"
        width="100%" height="100%" ></iframe>
      </div>
			<span class="v_text">矿业圈视频</span>
      </div>
      <div class="xz">
        <div class="video xz-video">
				  <iframe frameborder="0" width="100%" height="100%" src="https://v.qq.com/iframe/player.html?vid=n0545zct46r&tiny=0&auto=0"
				 allowfullscreen ></iframe>
			  </div>
			  <span class="v_text">小镇视频</span>
      </div>
		</div>
		<a href="http://f.amap.com/pYfR_0605gGE" target="_blank"><img class="xz-amap" src="../../../../static/img/act/20190209/2-2.jpg" alt=""
			 style="width: 6.59rem;
    height: 2.02rem;"></a>
		<img src="../../../../static/img/act/20190209/2-btn.png" alt="" class="btn" :style="{bottom: bot}" @click="goSignUp" />
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
				bot: '0.3rem',
				invitationCode: this.$route.query.invitationCode,
			}
		},
		methods: {
			goSignUp() {
				if (this.invitationCode && this.invitationCode != '' && this.invitationCode != 'undefined' && this.invitationCode !=
					'null') {
					window.location.href = this.$root.urlPath.MCM + '/act/act2019020903?invitationCode=' + this.invitationCode + '&newpage=newpage';
				} else {
					window.location.href = this.$root.urlPath.MCM + '/act/act2019020903?newpage=newpage'
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
	}
</script>
<style scoped>
.act020902 .xz-video{
  position: absolute;
  bottom: 4.2rem;
  left: 50%;
  margin-left: -2.8rem;
}
.act020902 .xz-amap{
  position: absolute;
  bottom: 4rem;
  left: 50%;
  margin-left: -3.3rem;
}
	.act020902 {
		height: 100%;
		width: 100%;
		background-color: #a40000;
		position: relative;
		padding: 0.18rem 0.23rem 0;
    text-align: center;
    box-sizing: border-box;
	}

	.act020902 .video {
		width: 5.4rem;
    height:3.05rem;
		display: inline-block;
	}
  .ky-video{
    position: absolute;
		top: 5.25rem;
		left: 50%;
		margin-left: -2.7rem;
  }
	.act020902 .v_text {
		width: 1.57rem;
		height: 0.38rem;
		line-height: 0.38rem;
		background-color: #c30006;
		border-radius: 0.1rem;
		color: #fff;
		font-size: 0.24rem;
	}
  .ky .v_text{
    position: absolute;
		top: 8.12rem;
		left: 50%;
		margin-left: -0.8rem;
		z-index: 10000;
  }
  .xz .v_text{
    position: absolute;
		bottom: 4rem;
		left: 50%;
		margin-left: -0.8rem;
		z-index: 10000;
  }
	.act020902 .btn {
		width: 2.64rem;
		margin: 0.6rem 0 0.9rem;
	}
</style>
