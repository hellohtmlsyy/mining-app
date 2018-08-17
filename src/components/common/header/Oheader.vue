<template>
	<div class="OHeader">
		<div class="titleBox" @click="back">
			<i class="icon iconfont icon-jiantou-copy" v-show="!$route.query.back"></i>
			<span>{{title}}</span>
		</div>
		<div class="searchBox" @click="toJump" v-show="title !== '新闻资讯'">
			<icon type="search"></icon>
			<span>
				搜索
			</span>
		</div>
		<div class="rightBox">
			<i class="icon iconfont icon-liebiao2" @click="switchPage" v-show="title !== '新闻资讯'"></i>
			<i class="icon iconfont icon-tubiao212" v-show="title == '新闻资讯'" @click="share"></i>
		</div>
	</div>
</template>

<script>
	import { Icon } from 'vux'
	import {isDevice} from '@/assets/commonjs/util.js'
	export default {
		components: {
			Icon
		},
		props: ["title"],
		data() {
			return {

			}
		},
		methods:{
			switchPage(){
				window.location.href=this.$root.urlPath.MCM + "/switchPage?newpage=newpage";

			},
			back(){
				if(this.title == '商城'&& this.$route.query.back){
					return 
				}
				if(this.title == '新闻资讯'){
					window.location.href=this.$root.urlPath.MCM + "/news?newpage=newpage";
				}else{
					if(isDevice() == 'adr'){
						adwebkit.callApp("BACK", '');
					}else if(isDevice() == 'ios'){
						oswebkit.callApp("BACK", '');
					}else{
						window.location.href=this.$root.urlPath.MCM + "/home?newpage=newpage";
					}
				}
			},
			toJump(){
				window.location.href=this.$root.urlPath.MCM + "/search?newpage=newpage";
    		},
    		share(){
    	
    		}
		}
	}
</script>

<style>
	.OHeader{
		display: flex;
		background-color: #333333;
		color: #fff;
		font-size:0.36rem ;
		padding: 0.2rem;
		line-height: 0.6rem;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		z-index: 999;
	}
	.OHeader .titleBox .icon-jiantou-copy,.OHeader .rightBox i{
		font-size: 0.36rem;
	}
	.OHeader .searchBox{
		margin: 0 0.2rem;
		flex: 2;
		background: #fff;
		border-radius: 2.5rem;
		color: #000;
		padding-left: 0.2rem;
		font-size: 0.3rem;
	}
	.OHeader .searchBox .weui-icon-search{
		font-size: 0.36rem;
	}
	
</style>