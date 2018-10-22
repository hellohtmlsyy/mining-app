<template>
	<footer class="footerM" v-if="!isApp">
		<div class="lump" @click="goHome(0)">
			<span class="icoM icoMH" :class="{icoMHL:cur==0}"></span>
			<span>首页</span>
		</div>
		<div class="lump" @click="goClassify(1)">
			<span class="icoM icoMC" :class="{icoMCL:cur==1}"></span>
			<span>分类</span>
		</div>
		<div class="lump" @click="goAdd(2)">
			<span class="icoM icoMA"></span>
			<span>发布</span>
		</div>
		<div class="lump" @click="goNews(3)">
			<span class="icoM icoMN"  :class="{icoMNL:cur==3}"></span>
			<span>消息</span>
		</div>
		<div class="lump" @click="goMe(4)">
			<span class="icoM icoMM"  :class="{icoMML:cur==4}"></span>
			<span>我的</span>
		</div>
	</footer>
</template>

<script>
	import {appLogin,isDevice} from '@/assets/commonjs/util.js';
	
	export default{
		data(){
			return {
				cur:0,
				isApp:false
			}
		},
		props:['curFath'],
		mounted(){
			if(this.curFath){
				this.cur = this.curFath
			}
			
			if(isDevice() == 'adr' || isDevice() == 'ios'){
				this.isApp = true
			}
		},
		methods:{
			goHome(idx){
				this.cur = idx
				this.$router.push({path:'home'})
			},
			goClassify(idx){
				this.cur = idx
				this.$router.push({path:'classify'})
			},
			goAdd(idx){
				this.cur = idx
				if(cookie.get('MC_UID')) {
					window.location.href = this.$root.urlPath.MCM + "/sell?newpage=newpage";
				} else {
					appLogin()
				}
			},
			goNews(idx){
				this.cur = idx
				this.$router.push({path:'follow'})
			},
			goMe(idx){
				this.cur = idx
				this.$router.push({path:'users/center'})
			}
		}
	}
</script>

<style scoped>
	.footerM{
		font-size:0.2rem;
		color:rgba(112,112,112,1);
		background:rgba(247,247,247,1);
		height: 1rem;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
	}
	.footerM .lump{
		width: 20%;
		padding: 0.15rem 0.5rem;
    	box-sizing: border-box;
	}
	.footerM .icoM{
		display: block;
    	width: 0.45rem;
    	height: 0.45rem;
	}
	   
	.footerM .icoMH{
		background:url('../../../static/img/btn/btn-home.png');
		background-size:0.45rem;
	}
	.footerM .icoMHL{
		background:url('../../../static/img/btn/btn-home-light.png');
		background-size:0.45rem;
	}
	.footerM .icoMC{
		background:url('../../../static/img/btn/btn2.png');
		background-size:0.45rem;
	}
	.footerM .icoMCL{
		background:url('../../../static/img/btn/btn2-light.png');
		background-size:0.45rem;
	}
	.footerM .icoMA{
		background:url('../../../static/img/btn/btn-add-light.png');
		background-size:0.45rem;
	}
	.footerM .icoMN{
		background:url('../../../static/img/btn/btn-news.png');
		background-size:0.45rem;
	}
	.footerM .icoMNL{
		background:url('../../../static/img/btn/btn-news-light.png');
		background-size:0.45rem;
	}
	.footerM .icoMM{
		background:url('../../../static/img/btn/btn-me.png');
		background-size:0.45rem;
	}
	.footerM .icoMML{
		background:url('../../../static/img/btn/btn-me-light.png');
		background-size:0.45rem;
	}
</style>