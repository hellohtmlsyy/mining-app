<template>
	<div class="myNewsdetail">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">系统消息</div>
		</com-header>
		<div class="tips">{{title}}</div>
		<div class="det">
			<div class="pl-15">
				<div><span class="fs-28 col-33 mr-15">{{name}}</span><span class="fs-20 col-75">{{time | fomatDate('yyyy-MM-dd')}}</span></div>
				<div class="fs-22 col-75 mt-15">发至 我</div>
			</div>
			<div class="con">
				{{content}}
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
			}
		},
		mounted(){
			var obj = this.$route.query;
			this.content = decodeURIComponent(obj.content)
			this.title = decodeURIComponent(obj.title)
			this.time = parseInt(decodeURIComponent(obj.time))
			this.id = decodeURIComponent(obj.id)
			this.name = decodeURIComponent(obj.name)
			this.$axios.get(this.$root.urlPath.MCT+'/wapNote/wapNoteOperate', {
				headers:{
					'MC_UID': cookie.get('MC_UID')
				},
				params: {
					function: 'noteClick',
					status: 0,
					ids: this.id,
				}
			})
			.then(res => {
				console.log(res)
			}).catch(err => console.log('个人账户异常', err));		
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
</style>