<template>
	<div class="myNewsdetail">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">系统消息</div>
		</com-header>
		<div class="tips" >
      <div class="det">
        <div class="time">{{newsInfo.create_time?newsInfo.create_time:newsInfo.insert_time | fomatDate('yyyy-MM-dd hh:mm:ss')}}</div>
        <div class="tit">矿业圈温馨提示</div>
        <div class="con">
          {{newsInfo.msg_content?newsInfo.msg_content:newsInfo.msg}}
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
				title: '',
				content: '',
				id: '',
				time: 0,
				name: '',
				newsInfo: [],
			}
		},
		methods:{
			getDetail(){
				this.$axios.get(this.$root.urlPath.MC + '/wap/messageCenter.do?noteInfo', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
					params: {
						id: this.$route.query.id
					}
				})
				.then(res => {
					if(res.success){}
					this.newsInfo = res.data.data;
				}).catch(err => console.log('个人账户异常', err));
			},
			getDetail2(){
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapInterviewInfo', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
					params: {
						id: this.$route.query.id
					}
				})
				.then(res => {
					if(res.success){}
					this.newsInfo = res.data.data;
				}).catch(err => console.log('个人账户异常', err));
			},
			getDetail3(){
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapStoreMessageInfo', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
					params: {
						id: this.$route.query.id
					}
				})
				.then(res => {
					if(res.success){}
					this.newsInfo = res.data.data;
				}).catch(err => console.log('个人账户异常', err));
			},
		},
		mounted(){
			if(this.$route.query.type == '010'){
				this.getDetail()
			}else if(this.$route.query.type == '530'){
				this.getDetail3()
			}else{
				this.getDetail2()
			}
		}
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");
</style>
