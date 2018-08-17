<template>
	<div class="componyIntro">
		<!--头部-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>公司介绍</span>
			</div>
			<div class="rightA fr" @click="goShopCart">
				<i class="icon iconfont icon-erweima1"></i>
			</div>
		</div>
		<div class="wrap">
			<div class="main1 main">
			<div class="rowM">
				<span class="title">公司名称：</span>
				{{componyIntro.name}}
				<span v-if="!componyIntro.name" class="empty">未填写</span>
			</div>
			<div class="rowM">
				<span class="title">企业类型：</span>
				{{componyIntro.type}}
				<span v-if="!componyIntro.type" class="empty">未填写</span>
			</div>
			<div class="rowM">
				<span class="title">经营范围：</span>
				{{componyIntro.manageBusiness}}
				<span v-if="!componyIntro.manageBusiness" class="empty">未填写</span>
			</div>
			<div class="rowM">
				<span class="title">主营产品：</span>
				{{componyIntro.mainProduct}}
				<span v-if="!componyIntro.mainProduct" class="empty">未填写</span>
			</div>
			<div class="rowM">
				<span class="title">企业简介：</span>
				{{componyIntro.introduction}}
				<span v-if="!componyIntro.introduction" class="empty">未填写</span>
			</div>
			</div>
			<div class="main2 main">
				<div class="rowM">
					<span class="title">联系人：</span>
					{{componyIntro.contactName}}
					<span v-if="!componyIntro.contactName" class="empty">未填写</span>
				</div>
				<div class="rowM">
					<span class="title">拨打电话：</span>
					{{componyIntro.mobile}}
					<span v-if="!componyIntro.mobile" class="empty">未填写</span>
				</div>
				<div class="rowM">
					<span class="title">联系地址：</span>
					{{componyIntro.address}}
					<span v-if="!componyIntro.address" class="empty">未填写</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	
	import {lastPage} from '@/assets/commonjs/util.js'
	export default{
		components:{
			
		},
		data(){
			return {
				componyIntro:'',
				
			}
		},
		mounted(){
			this.getComponyIntro()
		},
		methods:{
			back(){
				lastPage()
			},
			goShopCart(){
				window.location.href = this.$root.urlPath.MCM + "/shopCart?shopId="+this.$route.query.shopId+"&newpage=newpage"
		
			},
			getComponyIntro(){
				axios.get(this.$root.urlPath.MC + '/wap/store.do?introduction', {
						params:{
							storeId:this.$route.query.shopId,
						}
					})
					.then(res => {
						
						var data = JSON.parse(res.data)
						if(data.success) {
							this.componyIntro = data.data
							console.log(this.componyIntro)
						} else {
//							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			}
		}
	}
</script>

<style>
	.componyIntro .wrap{
		font-size:0.28rem;
		color: #333333;
		margin-top: 1rem;
	}
	.componyIntro .wrap .main{
		margin-bottom: 0.15rem;
		background-color: #fff;
	}
	.componyIntro .wrap .title,.componyIntro .wrap .empty{
		color: #757575;
	}
	.componyIntro .wrap .rowM{
		border-bottom: 0.01rem solid #e5e5e5;
		padding: 0.2rem;
	}
</style>