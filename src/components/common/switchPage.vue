<template>
	<div class="selectPage bgcolor">
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>频道管理</span>
			</div>
		</div>
		<div class="list">
			<grid :show-lr-borders="true" :show-vertical-dividers="true">
		      <grid-item label="首页" href="http://m.miningcircle.com/home?newpage=newpage">
		        <img slot="icon" src="../../../static/img/ico16.png">
		      </grid-item>
		      <grid-item label="商城" href="http://m.miningcircle.com/mall?newpage=newpage">
		        <img slot="icon" src="../../../static/img/ico15.png">
		      </grid-item>
		     
		      <grid-item label="求购大厅" href="http://trade.miningcircle.com/purchase?newpage=newpage">
		        	<img slot="icon" src="../../../static/img/ico14.png">
		      </grid-item>
		      <!--</a>-->
		      <grid-item label="矿权交易" href="http://m.miningcircle.com/mineral?newpage=newpage">
		        <img slot="icon" src="../../../static/img/ico13.png">
		      </grid-item>
		    </grid>
		    <grid :show-lr-borders="true" :show-vertical-dividers="true" link="/component/cell">
		      <grid-item label="新闻" href="http://m.miningcircle.com/news?newpage=newpage">
		        <img slot="icon" src="../../../static/img/ico17.png">
		      </grid-item>
		      <grid-item label="行业会展" href="http://m.miningcircle.com/exhibition?newpage=newpage">
		        <img slot="icon" src="../../../static/img/ico12.png">
		      </grid-item>
		      <grid-item label="全球数据库">
		        <img slot="icon" src="../../../static/img/ico24.png">
		      </grid-item>
		    </grid>
	    </div>
    </div>
</template>

<script>
	import {getAppShare,isDevice,ShareTip} from '@/assets/commonjs/util.js';
	
	export default {
		components: {
			
		},
		methods:{
			back(){
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
					this.$router.go(-1)
				}
			},
			toPurchase(){
				window.location.href = 'http://trade.miningcircle.com/purchase'
			}
		}
	}
</script>

<style>
	.selectPage .list{
		margin-top: 1rem;
	}
</style>