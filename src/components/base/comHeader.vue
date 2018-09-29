<template>
	<div class="comHeader" :style="{backgroundColor:bgcolor ? bgcolor : '#333333',color:colorM ? colorM : '#fff'}">
		<div class="leftA" @click="goBack">
			<i class="icon iconfont icon-jiantou-copy"></i>
			<span>{{title}}</span>
		</div>
		<div>
			<slot name="centerA"></slot>
		</div>
		<div class="rightA">
			<slot name="rightA"></slot>
		</div>
	</div>
</template>

<script>
	import {lastPage} from '@/assets/commonjs/util.js';
	
	export default{
		props:["title",'bgcolor','colorM'],
		methods:{
			goBack(){
				lastPage()
			}
		}
	}
</script>

<style>
	.comHeader{
		color: #fff;
		padding: 0.2rem;
		font-size: 0.36rem;
		height: 1rem;
		line-height: 0.6rem;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		box-sizing: border-box;
		justify-content: flex-start;
		z-index: 99;
		
	}
	.leftA, .centerA, .rightA{
		flex: 1;
	}
	.comHeader .icon-jiantou-copy{
		font-size: 0.36rem;
	}
	.comHeader .rightA{
		display: flex;
    	/*flex-grow: 1;*/
    	justify-content: flex-end;
	}
</style>