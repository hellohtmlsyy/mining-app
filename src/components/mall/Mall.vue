<template>
	<div class="mall">
		<Oheader :title="title" v-if="showHeader" ref="header"></Oheader>
		<div class="mall-nav channelBTab clearfix " :class="iosmargintop ? 'iosposiabsole' : 'posiabsole'" ref="nav">
			<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="fl" style="width: 6.4rem;overflow:scroll;-webkit-overflow-scrolling:touch;">
					<tab ref="tabBox" style="background-color: #f2f4f5;font-size: 0.28rem" active-color="rgb(225, 158, 36)" :line-width="3" :style="{width: tabWidth + 'px'}">
						<tab-item v-for="(item,index) in column" :key="index" @on-item-click="tabClick(item.value)" :selected="item.value == curTab">{{item.name}}
						</tab-item>
					</tab>
				</div>
				<div class="icoliebiao fr">
					<i class='icon iconfont icon-liebiao' @click="shohid = true" :style="{'color':shohid ? '#343434' : '#A8A8A8'}"></i>
					<i class='icon iconfont icon-liebiao1' @click="shohid = false" :style="{'color':shohid ? '#A8A8A8' : '#343434'}"></i>
				</div>
			</sticky>
		</div>
		<div ref="listSection" :class="iosmargintop ? 'iosmargintop' : 'margintop'">
			<my-scroll ref="scroll" @loadmore='getMallList' :isTab="isTab" :total="total" >
				<Malllist :shohid="shohid" :list="mallList" :imgShow="imgShow"></Malllist>
			</my-scroll>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { isDevice } from '@/assets/commonjs/util.js';
	import { Tab, TabItem, Sticky, Flexbox, FlexboxItem } from 'vux'
	import Oheader from '@/components/common/header/Oheader'
	import Malllist from '@/components/common/Mall-list'
	import myScroll from '@/components/base/myScroll'
	
	export default {
		components: {
			Sticky,
			Oheader,
			Malllist,
			Tab,
			TabItem,
			Flexbox,
			FlexboxItem,
			myScroll
		},
		data() {
			return {
				showHeader: true,
				title: '商城',
				shohid: true,
				column: [{name:"全部",value:0}, 
				{name:"金属矿产",value:1}, 
				{name:"有色金属",value:2},
				{name:"黑色金属",value:3},
				{name:"能源矿产",vaule:4},
				{name:"稀土分散",value:5},
				{name:"非金属",value:6},
				{name:"矿用设备",value:7},
				{name:"耗材药剂",value:8}],
				curTab:'',
				mallList: [],
				pageNum: 1,
				numPerPage: 10,
				tabWidth: document.body.clientWidth,
				total: 0,
				iosmargintop: '',
				imgShow: true,
				isTab:false
			}
		},
		mounted() {
			if(this.$route.query.type == undefined){
				this.curTab = 0
			}else{
				this.curTab = this.$route.query.type
			}
			
			if(isDevice() == 'ios') {
				if(!this.$route.query.newpage) {
					this.showHeader = false
					this.iosmargintop = true
				} else {
					this.showHeader = true
					this.iosmargintop = false
				}
			} else if(isDevice() == 'adr') {
				this.iosmargintop = false
			} else {
				this.iosmargintop = false
			}
			
			this.getMallList()
		},
		methods: {
			tabClick(value) {
				this.$refs.scroll.init()
				this.pageNum = 1
				this.mallList = []
				this.curTab = value
				this.isTab = true
				
				this.getMallList()
			},
			getMallList() {
				axios.get(this.$root.urlPath.MC + '/wap/mall.do?mallList', {
						params: {
							mineralId: this.curTab,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						
						if(res.data.success) {
							this.isTab = false
							this.$refs.scroll.loaded()
							var data = res.data.data.list
							this.total =res.data.data.totalCount
							this.mallList = this.mallList.concat(data)
							
							var reg = /^(.*\.)[^.]+$/;
							for(var i = (this.pageNum - 1) * 10; i < this.mallList.length; i++) {
								if(this.mallList[i].img){
									this.$set(this.mallList[i], "imgS", this.mallList[i].img.replace(reg, "$1") + 's.jpg')
									this.$set(this.mallList[i], "imgM", this.mallList[i].img.replace(reg, "$1") + 'm.jpg')
								}
								
							}

							if(this.total == this.mallList.length && this.total !== 0){
								this.$refs.scroll.complete()
							}else{
								this.pageNum++
							}
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},		
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		width: 0px;
		display: none;
		background-color: #fff;
	}
	
	.mall .oHeader .centerA {
		width: 4.8rem
	}
	
	.mall {
		background: #EEEEEE;
	}
	/*nav*/
	
	.mall .mall-nav {
		position: fixed;
		left: 0;
		width: 100%;
	}
	
	.mall .iosposiabsole {
		top: 0;
	}
	
	.mall .posiabsole {
		top: 1rem;
	}
	/*商品详情*/
	
	.malldetails .channelTab .bottom {
		font-size: 0.24rem;
		color: rgb(51, 51, 51);
	}
	
	.malldetails .channelTab .bottom p {
		line-height: 0.37rem;
	}
	/*列表*/
	
	
	
	.mall .margintop {
		margin-top: 1.94rem;
	}
	
	.mall .iosmargintop {
		margin-top: 1rem;
	}
</style>