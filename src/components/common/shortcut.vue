<template>
	<div class="shortcut">
	<div class="shortcutBox" v-show="show">
		<ul>
			<li v-for="(item,index) in list" :key="index" @click="clickLi(index)">
				<img :src="item.ico" />
				<span v-html="item.text"></span>
			</li>
		</ul>
	</div>
	<div class="mc" v-show="show" @click="showShortcut"></div>
	</div>
</template>

<script>
	const loginUrl = 'http://member.miningcircle.com/login?where=mineral';
	import { getAppShare, isDevice,appLogin} from '@/assets/commonjs/util.js';
	import {cookie} from 'vux';
	
	export default{
		props:['show',"list"],
		mounted(){
			
		},
		methods:{
			clickLi(index){
				this.$emit("clickLi",index)
			},
			showShortcut(){
				this.$emit("showHideShortcut",this.show)
			}
		}
	}
</script>

<style>
	.shortcut .mc{
		position: fixed;
    	left: 0;
    	top: 0;
    	width: 100%;
   	 	height: 100%;
    	opacity: .8;
    	z-index: 100;
	}
	.shortcutBox {
		position: absolute;
		top: 0.9rem;
		right: 10px;
		font-size: 0.3rem;
		width: 3.48rem;
		background: #fff;
		z-index: 101;
		color: #333333;
		width: 3rem;
	}
	.shortcutBox img {
		font-size: 0.3rem;
		margin: 0 0.2rem;
		border-radius: 0.05rem;
		width: 0.4rem;
		height: 0.4rem;
		vertical-align: middle;
	}
	
	.shortcutBox .icon-tubiao212 {
		color: black;
	}
	
	.shortcutBox ul li {
		height: 0.7rem;
		line-height: 0.7rem;
	}
</style>