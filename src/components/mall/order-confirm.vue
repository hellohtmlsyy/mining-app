<template>
	<div class="orderConfirm">
		<!--头-->
		<!--<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>确认订单</span>
			</div>
		</div>-->
		<orderBalance :title="title"></orderBalance>
	</div>
</template>

<script>
	import { Cell } from 'vux'
	import orderBalance from '@/components/mall/orderCom-balance'
	
	export default {
		components: {
			Cell,
			orderBalance
		},
		data(){
			return {
				title:'确认订单'
			}
		},
		methods:{
			back(){
				
			}
		}
	}
</script>

<style>
	
</style>