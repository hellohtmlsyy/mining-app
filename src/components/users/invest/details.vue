<template>
	<div class="investDet">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">
				预约详情
			</div>
		</com-header>
		
		<div class="content">
			<div class="titleBox">
				<h1 class="title">{{info.title}}</h1>
				<time class="timeM">{{info.issueTime | fomatDate('yyyy-MM-dd hh:mm:ss')}}</time>
			</div>
			<div class="info">
				<div class="rowM">
					<span class="labelM">投资人</span>{{info.name}}
				</div>
				<div class="rowM">
					<span class="labelM">投资金额</span><strong class="strongM">{{info.price | smallN(2)}}</strong>
					<span>{{info.unit}}</span>
				</div>
				<div class="intro">
					<h2 class="labelM introLab">详细描述</h2>
					<p class="text">{{info.depict}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import comHeader from '@/components/base/comHeader'
	export default {
		components: {
			comHeader
		},
		data(){
			return{
				info:'',
				id:'123456789'
			}
		},
		mounted(){
			this.getData()
		},
		methods:{
			getData(){
				this.$axios.get(this.$root.urlPath.MC + '/wap/enterpriseCenter.do?reservatInfo',{
					params:{
						id:this.id
					}
				})
					.then(res => {
						var data = res.data
						console.log(data)
						if(data.success) {
							this.info = data.data
						}
					})
					.catch(function(error) {
						alert('服务异常' + error)
					});
			}
		}
	}
</script>

<style scoped>
	.investDet .content{
		margin-top: 1rem;
		background: #fff;
	}
	.investDet .content .titleBox{
		height: 1rem;
		padding: 0.37rem 0.3rem;
		border-bottom: 1px solid rgba(229,229,229,1);
		display: flex;
		align-items: center;
		
	}
	.investDet .content .title{
		font-size:0.28rem;
		color:rgba(51,51,51,1);
		display: inline-block;
		width: 4.5rem;
	}
	.investDet .content .timeM{
		font-size:0.2rem;
		font-weight:500;
		color:rgba(117,117,117,1);
	}
	.investDet .content .info{
		padding: 0.35rem 0.3rem;
		font-size: 0.26rem;
	}
	.investDet .content .labelM{
		color:#757575;
		display: inline-block;
		width: 1.25rem;
	}
	.investDet .content .strongM{
		color: #ff7522;
		width: 3.5rem;
		display: inline-block;
	}
	.investDet .content  .rowM{
		margin-bottom: 0.2rem;
	}
	.investDet .content .intro .text{
		line-height: 0.5rem;
	}
	.investDet .content .intro .introLab{
		margin-bottom: 0.1rem;
	}
</style>