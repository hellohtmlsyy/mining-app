<template>
	<div class="storemsgDet">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">店铺留言</div>
		</com-header>
		<div class="tips" >
      <div class="det">
        <div class="time">{{newsInfo.create_time?newsInfo.create_time:newsInfo.insert_time | fomatDate('yyyy-MM-dd hh:mm:ss')}}</div>
        <div class="tit">{{msg[0]}}</div>
        <div class="con">
          {{msg[2]}}
        </div>
		<div class="contact">
			联系方式：<br>
			{{msg[1]}}
		</div>
      </div>
	  </div>
	</div>
</template>

<script>
	import { cookie } from 'vux';
	export default{
		data(){
			return{
				newsInfo: [],
				msg:[],
			}
		},
		methods:{
			getDetail(){
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapStoreMessageInfo', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
					params: {
						id: this.$route.query.id
					}
				})
				.then(res => {
					if(res.data.success){
						this.newsInfo = res.data.data;
						this.msg = res.data.data.msg.split(',');
					}
				}).catch(err => console.log('账户异常', err));
			},
		},
		mounted(){
			this.getDetail()
		}
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");
	.contact{
		font-size: 0.24rem;
		color: #333;
		line-height: 0.36rem;
		margin-top: 0.3rem;
	}
</style>
