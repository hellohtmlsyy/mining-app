<template>
	<div class="mall">
		<Oheader :title="title" v-if="showHeader"></Oheader>
		<div class="mall-nav channelBTab clearfix " :class="iosmargintop ? 'iosposiabsole' : 'posiabsole'">
			<sticky scrollBox="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="fl" style="width: 6.416rem;overflow:scroll;-webkit-overflow-scrolling:touch;">
					<tab ref="tabBox" style="background-color: #f2f4f5;font-size: 0.28rem" active-color="rgb(225, 158, 36)" :line-width="3" :style="{width: tabWidth + 'px'}">
						<tab-item v-for="(item,index) in column" :key="index" @on-item-click="tabClick(item, index)" :selected="selected == item">{{item}}
						</tab-item>
					</tab>
				</div>
				<div class="icoliebiao fr">
					<i class='icon iconfont icon-liebiao' @click="switchFirst" :style="{'color':shohid ? '#343434' : '#A8A8A8'}"></i>
					<i class='icon iconfont icon-liebiao1' @click="switchSecond" :style="{'color':shohid ? '#A8A8A8' : '#343434'}"></i>
				</div>
			</sticky>
		</div>
		<div ref="listSection" :class="iosmargintop ? 'iosmargintop' : 'margintop'">
			<Malllist :shohid="shohid" :list="mallList" :imgShow="imgShow"></Malllist>
		</div>
		<load-more :tip="loadingCon" :show-loading="loading" v-show="loading"></load-more>
		<divider v-show="droploadDowm">已加载所有数据</divider>
	</div>
</template>

<script>
	import axios from 'axios'
	import {isDevice} from '@/assets/commonjs/util.js';
	import {Tab, TabItem,Sticky,Flexbox, FlexboxItem } from 'vux'
	import Oheader from '@/components/common/header/Oheader'
	import Malllist from '@/components/common/Mall-list'
	
	export default {
		components: {
			Sticky,
			Oheader,
			Malllist,
			Tab, TabItem,
			Flexbox, FlexboxItem
		},
		data() {
			return {
				showHeader:true,
				title: '商城',
				shohid: true,
				column: ["全部", "金属矿产", "有色金属", "黑色金属", "能源矿产", "稀土分散", "非金属", "矿用设备", "耗材药剂"],
				selected: '全部',
				mallList:[],
				pageNum:1,
				numPerPage:10,
				mineralId:0,
				tabWidth: document.body.clientWidth,
				droploadDowm:false,
				total: 0,
				isscroll: true,
				jieliu:true,   //节流：数据加载完后加载下一页
				loading:false,
				loadingCon:'正在加载',
				iosmargintop:'',
				imgShow:true,
			}
		},
		mounted() {
			if(isDevice() == 'ios'){
				if(!this.$route.query.newpage){
					this.showHeader = false
					this.iosmargintop = true
				}else{
					this.showHeader = true
					this.iosmargintop = false
				}	
			}else if(isDevice() == 'adr'){
				this.iosmargintop = false
			}else{
				this.iosmargintop = false
			}
			

			this.tabClick(decodeURIComponent(this.$route.query.type))
			this.selected = decodeURIComponent(this.$route.query.type)
			window.addEventListener('scroll', this.scrollValue)
		},
		methods:{
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

				var height = this.$refs.listSection.offsetHeight
				this.$emit("scrollValue", {
					"scrollTop": scrollTop,
					"height": height
				})
			},
			tabClick(index){
				this.pageNum = 1
				switch(index) {
					case '全部':
						this.mineralId = 0
						break;
					case '金属矿产':
						this.mineralId = 1
						break;
					case '有色金属':
						this.mineralId = 2
						break;
					case '黑色金属':
						this.mineralId = 3
						break;
					case '能源矿产':
						this.mineralId = 4
						break;
					case '稀土分散':
						this.mineralId = 5
						break;
					case '非金属':
						this.mineralId = 6
						break;
					case '矿用设备':
						this.mineralId = 7
						break;
					case '耗材药剂':
						this.mineralId = 8
						break;
				}
				var self = this
				this.jieliu = true
				axios.get(this.$root.urlPath.MC + '/wap/mall.do?mallList', {
						params: {
							mineralId: this.mineralId,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						
						if(res.data.success) {
							this.jieliu = false
							var data = res.data.data.list
							this.mallList = []
							this.mallList = data
							
							var reg = /^(.*\.)[^.]+$/;
							for(var i = (this.pageNum - 1) * 10; i < this.mallList.length; i++){
								this.$set(this.mallList[i], "imgS", this.mallList[i].img.replace(reg, "$1") + 's.jpg')
								this.$set(this.mallList[i], "imgM", this.mallList[i].img.replace(reg, "$1") + 'm.jpg')
							}
							
							this.total = Math.ceil(res.data.data.totalCount / this.numPerPage)
							
						} else {
							this.isscroll = false
							alert("加载数据失败")
						}
					})
					.catch(function(error) {
						console.log(error)
					});
			},
			getMallList(index) {
				this.loading = true
				this.jieliu = true
				axios.get(this.$root.urlPath.MC + '/wap/mall.do?mallList', {
						params: {
							mineralId: index,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						
						if(res.data.success) {
							this.loading = false
							this.jieliu = false
							var data = res.data.data.list
							
							for(var i in data){
								this.mallList.push(data[i])
							}
							
							var reg = /^(.*\.)[^.]+$/;
							for(var i = (this.pageNum - 1) * 10; i < this.mallList.length; i++){
								this.$set(this.mallList[i], "imgS", this.mallList[i].img.replace(reg, "$1") + 's.jpg')
								this.$set(this.mallList[i], "imgM", this.mallList[i].img.replace(reg, "$1") + 'm.jpg')
							}
							
							this.total = Math.ceil(res.data.data.totalCount / this.numPerPage)
							
						} else {
							this.isscroll = false
							alert("加载数据失败")
						}
					})
					.catch(function(error) {
						console.log(error)
					});
			},
			switchFirst() {
				this.shohid = true
			},
			switchSecond() {
				this.shohid = false
			},
			scrollValue(value){
				
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

				var height = this.$refs.listSection.offsetHeight
				var viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				
				if(scrollTop / (height - viewH) >= 0.6 && this.jieliu == false) {
					
					//页数超过总页数或者没有更多数据时，不在进行加页和获取数据
					if(this.pageNum >= this.total || !this.isscroll) {
						//若内容高度-视口高度-滚动高度 <=25，显示已加载所有列表
						if(height - viewH - scrollTop <= 25) {
							this.droploadDowm = true
						}
						return
					}
					this.pageNum = this.pageNum+1
					this.getMallList(this.mineralId)
				}
			}
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
	.mall{
		background: #EEEEEE;
	}
	/*nav*/
	.mall .mall-nav{
		position: fixed;
    	left: 0;
	}
	.mall .iosposiabsole{
		top: 0;
	}
	.mall .posiabsole{
		top: 1rem;
	}
	
	/*商品详情*/
	.malldetails .channelTab .bottom{
	    font-size: 0.24rem;
	    color: rgb(51,51,51);
	}
	.malldetails .channelTab .bottom p{
    	line-height: 0.37rem;
	}
	
	/*列表*/
	.mall .margintop{
		margin-top: 1.94rem;
	}
	.mall .iosmargintop{
		margin-top: 1rem;
	}
</style>