<template>
	<div class="flagshipSearch">
		<div class="searchHeader">
			<div @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
			</div>
			<div class="searchBox">
				<icon type="search" class="searchIco"></icon>
				<input type="text" placeholder="请输入关键字" class="myInput" v-model="searchText" />
				<span class="clear" @click="clear" v-show="searchText"><i class="icon iconfont icon-cuohao"></i></span>
			</div>
			<div class="rightBox" @click="goSearch(searchText)">
				搜本店
			</div>
		</div>
			
		<div class="type" >
			<group>
				<cell-box is-link @click.native="goSearch('')">
        			全部商品
      			</cell-box>
      		</group>
		</div>
	</div>	
</template>

<script>
	import {lastPage} from '@/assets/commonjs/util.js'
	
	export default{
		components: {
			
  		},
  		data(){
  			return {
  				searchText:this.$route.query.key
  			}
  		},
  		mounted(){
  			if(this.$route.query.key){
  				this.searchText = decodeURIComponent(this.$route.query.key)
  			}
  		},
		methods:{
			back(){
				lastPage()	
			},
			
			goSearch(val){
				window.location.href = this.$root.urlPath.MCM + "/flagship/searchList?key=" + val + "&shopId="+ this.$route.query.shopId+"&shareName="+this.$route.query.shareName+"&shareImg="+this.$route.query.shareImg+"&shopUrl="+this.$route.query.shopUrl+"&newpage=newpage"
			},
			
			clear(){
				this.searchText = ''
			}
		}
	}
</script>

<style>
	.flagshipSearch .searchHeader{
		background: #fff;
	}
	.flagshipSearch .searchHeader .weui-icon-search{
		color: #333333;
	}
	.flagshipSearch .searchHeader .searchBox,.flagshipSearch .searchHeader .searchBox input{
		background: #eeeeee;
	}
	.flagshipSearch .myInput::-webkit-input-placeholder{
		color: #757575;
	}
	.flagshipSearch .type .vux-no-group-title{
		margin-top: 0.2rem;
	}
	.flagshipSearch .type .weui-cell_access{
		height: 1rem;
		font-size: 0.28rem;
	}
	.flagshipSearch .type .weui-cell_access.vux-cell-box:after{
		width: 0.12rem;
		height:0.12rem;
	}
	
</style>