<template>
	<div>
		<!--头部-->
		<div class="fix">
			<div class="oHeader clearfix">
				<div class="leftA fl" @click="back">
					<i class="icon iconfont icon-jiantou-copy"></i>
					<span>我的采购</span>
				</div>				
			</div>
		</div>
		<div class="goodsCon">
			<div class="goodTab">
				<ul class="clearfix">
					<li>
						<router-link :to="{path:'/user/purordlist'}">大宗商品</router-link>
					</li>
					<li class="active">
						<router-link :to="{path:'/user/purcommordlist'}">普通商品</router-link>
					</li>
				</ul>
			</div>			
			<divider v-show="blshow">暂无数据</divider>
		</div>
	</div>
</template>

<script>
	import Oheader from '@/components/common/header/Oheader';
	import { cookie } from 'vux'
	export default {
		components: {
			Oheader
		},
		data() {
			return {				
				blshow: true,
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
				equi:navigator.userAgent,
			}
		},
		methods: {
			back() {
				if(this.isInapp){				
					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {
						adwebkit.callApp("BACK", '');
					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						oswebkit.callApp("BACK", '');
					}					
				}else{
					this.$router.go(-1);
					return;
				}			
			},			
		},		
	}
</script>

<style>
@import url("../../static/css/ordlist.css");
</style>