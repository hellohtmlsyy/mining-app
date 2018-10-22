<template>
	<div class="myNewsdetail">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">{{newsInfo.type == '010'? '系统消息':(newsInfo.type == '430'? '商品约谈':(newsInfo.type == '230'? '项目约谈':(newsInfo.type == '260'? '投资约谈':(newsInfo.type == '530'? '店铺留言':'系统消息'))))}}</div>
		</com-header>
		<div class="tips" :class="{pd : newsInfo.type != 530}">{{newsInfo.msg_title? newsInfo.msg_title:newsInfo.title}}</div>
		<div class="det">
			<div class="pl-15">
				<div><span class="fs-20 col-75"><span class="fs-28 col-33 mr-15">{{newsInfo.userName? newsInfo.userName : ''}}</span>{{newsInfo.create_time?newsInfo.create_time:newsInfo.insert_time | fomatDate('yyyy-MM-dd hh:mm:ss')}}</span></div>
				<!--<div class="fs-22 col-75 mt-15">发至 我</div>-->
			</div>
			<div class="con">
				{{newsInfo.msg_content?newsInfo.msg_content:newsInfo.msg}}
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
	.fs-20{ font-size: 0.2rem; }
	.fs-22{	font-size: 0.22rem; }
	.fs-28{	font-size: 0.28rem;	}
	.col-33{ color: #333; }
	.col-75{ color: #757575; }
	.mt-15{ margin-top: 0.15rem; }
	.mr-15{ margin-right: 0.15rem; }
	.pl-15{ padding-left: 0.15rem; }
	.pd{
		padding: 0.1rem 0.2rem 0.26rem 0.2rem;
	}
</style>