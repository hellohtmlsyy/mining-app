<template>
	<div class="mineral">
		<Oheader :title="title"></Oheader>
		<div class="mineral-nav channelBTab clearfix">
			<sticky scrollBox="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="fl" style="width: 83.9%;overflow:scroll;-webkit-overflow-scrolling:touch;">
					<tab ref="tabBox" style="background-color: #f2f4f5;font-size: 0.28rem" :bar-active-color="investorSH ? '#fff' : 'rgb(225, 158, 36)'" :active-color="investorSH ? '' : 'rgb(225, 158, 36)'" :line-width="3" :style="{width: tabWidth + 'px',fontWeight:0}">
						<tab-item v-for="(item,index) in column" :key="index" @on-item-click="tabClick(item, index)" :selected="index===0" :style="{'font-weight': investorSH ? 'normal' : ''}">{{item}}
						</tab-item>
					</tab>
				</div>
				<div class="icoliebiao fr" :style="{'color':investorSH ? 'red' : ''}" @click="investorClick">
					<label>投资人</label>
				</div>
			</sticky>
		</div>
		<Minerallist :investorSH="investorSH" :list="projectList" @scrollValue="scrollValue"></Minerallist>
		<load-more :tip="loadingCon" :show-loading="loading" v-show="loading"></load-more>
		<divider v-show="droploadDowm">已加载所有数据</divider>
		<flexbox>
			<flexbox-item>
				<div class="flex-demo droploadDowm" v-show="noData">
					暂无数据
				</div>
			</flexbox-item>
		</flexbox>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem, Swiper, SwiperItem, XHeader, XInput, Tab, TabItem, Sticky, Group, Icon, PopupRadio } from 'vux'
	import { iosTest } from '@/assets/commonjs/util.js';
	import axios from 'axios'
	import Minerallist from '@/components/common/Mineral-list'
	import Oheader from '@/components/common/header/Oheader'
	const baseList = [{
		img: '../../../static/img/banner1.jpg'
	}, {
		img: '../../../static/img/banner2.jpg'
	}]
	export default {
		components: {
			Swiper,
			Minerallist,
			Oheader,
			XHeader,
			XInput,
			Tab,
			TabItem,
			Sticky,
			Group,
			Icon,
			PopupRadio,
			Flexbox,
			FlexboxItem
		},
		data() {
			return {
				img_list: baseList,
				title: "矿权交易",
				column: ["全部", "金属矿产", "有色金属", "黑色金属", "能源矿产", "稀有金属", "非金属"],
				selected: "全部",
				index: 0,
				tabWidth: document.body.clientWidth,
				projectList: [],
				//				investorList:[],
				investorSH: false,
				minera: '',
				pageNum: 1,
				numPerPage: 10,
				droploadDowm: false,
				isscroll: true,
				jieliu: true, //节流：数据加载完后加载下一页
				noData: false,
				loading: false,
				loadingCon:'正在加载'
			}
		},
		mounted() {
			this.getProjectList()
		},
		methods: {
			getProjectList() {
				this.loading = true
				this.jieliu = true
				axios.get(this.$root.urlPath.MC + '/wap/yitrade.do?yiTradeList', {
						params: {
							minera: this.minera,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						if(res.data.success) {
							this.loading = false
							this.jieliu = false
							var data = res.data.data.resList

							if(data.total == 0) {
								this.noData = true
							}
							for(var i in data) {
								this.projectList.push(data[i])
							}

							this.total = Math.ceil(res.data.data.total / this.numPerPage)

						} else {

						}
					})
					.catch(function(error) {

					});
			},
			getInvestorList() {
				this.loading = true
				this.jieliu = true
				axios.get(this.$root.urlPath.MC + '/wap/yiinvest.do?yiInvestList', {
						params: {
							minera: 1,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {

						if(res.data.success) {
							this.loading = false
							this.jieliu = false
							var data = res.data.data.investList

							for(var i in data) {
								this.projectList.push(data[i])
							}
							this.total = Math.ceil(res.data.data.total / this.numPerPage)

						} else {

						}
					})
					.catch(function(error) {

					});
			},

			investorClick() {
				this.projectList = []
				this.pageNum = 1
				this.investorSH = true
				this.getInvestorList()
			},
			tabClick(index) {
				this.noData = false
				this.droploadDowm = false
				this.pageNum = 1
				this.investorSH = false
				switch(index) {
					case '金属矿产':
						this.minera = 1
						break;
					case '有色金属':
						this.minera = 2
						break;
					case '黑色金属':
						this.minera = 4
						break;
					case '能源矿产':
						this.minera = 8
						break;
					case '稀有金属':
						this.minera = 16
						break;
					case '非金属':
						this.minera = 32
						break;
				}
				axios.get(this.$root.urlPath.MC + '/wap/yitrade.do?yiTradeList', {
						params: {
							minera: this.minera,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {

						if(res.data.success) {
							var data = res.data.data.resList
							if(res.data.data.total == 0) {
								this.noData = true
							}
							this.projectList = data
						} else {
							this.isscroll = false
						}
					})
					.catch(function(error) {

					});
			},
			scrollValue(value) {
				var viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

				if(value.scrollTop / (value.height - viewH) >= 0.6 && this.jieliu == false) {

					//					页数超过总页数或者没有更多数据时，不在进行加页和获取数据
					if(this.pageNum >= this.total || !this.isscroll) {
						//						若内容高度-视口高度-滚动高度 <=25，显示已加载所有列表

						if(value.height - viewH - value.scrollTop <= 25) {
							this.droploadDowm = true
						}
						return
					}

					this.pageNum++

						if(this.investorSH) {
							this.getInvestorList()
						} else {
							this.getProjectList(this.minera)
						}
				}
			},

		}
	}
</script>

<style>
	@import url("../../static/css/oheader.css");
	/*tab*/
	
	::-webkit-scrollbar {
		width: 0px;
		display: none;
		background-color: #fff;
	}
	
	.mineral .oHeader .centerA {
		width: 4.1rem
	}
	
	.mineral {
		background-color: rgb(238, 238, 238);
	}
	
	.mineral .icoliebiao label {
		width: 1.18rem;
		display: block;
		font-size: 0.28rem;
		text-align: center;
	}
	
	/*nav*/
	
	.mineral .mineral_nav {
		position: relative;
	}
	.mineral .mineral-nav{
		position: fixed;
		left: 0;
		top: 1rem;
		z-index: 999;
	}
	/*列表*/
	.mineral .mineralList{
		margin-top: 1.94rem;
	}
	
	.mineral .options {
		position: absolute;
		right: 0;
		top: 0
	}
	
	.mineral .options .vux-no-group-title {
		border-left: 1px solid #ccc;
		box-shadow: -1px 0px 2px #333333;
		margin-top: 0;
		height: 44px;
	}
	
	.mineral .weui-cell__ft .vux-cell-value {
		display: none;
	}
	
	.mineral .weui-cell_access .weui-cell__ft:after {
		display: none !important
	}
</style>