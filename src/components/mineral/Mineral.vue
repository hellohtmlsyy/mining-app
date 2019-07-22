<template>
	<div class="mineral">
		<Oheader :title="title"></Oheader>
		<div class="mineral-nav channelBTab clearfix">
			<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="fl" style="width: 83.9%;overflow:scroll;-webkit-overflow-scrolling:touch;">
					<tab ref="tabBox" style="background-color: #f2f4f5;font-size: 0.28rem" :bar-active-color="investorSH ? '#fff' : 'rgb(225, 158, 36)'" :active-color="investorSH ? '' : 'rgb(225, 158, 36)'" :line-width="3" :style="{width: tabWidth + 'px',fontWeight:0}">
						<tab-item v-for="(item,index) in column" :key="index" @on-item-click="tabClick(item.value)" :selected="item.value == curTab" :style="{'font-weight': investorSH ? 'normal' : ''}">{{item.name}}
						</tab-item>
					</tab>
				</div>
				<div class="icoliebiao fr" :style="{'color':investorSH ? 'red' : ''}" @click="investorClick">
					<label>投资人</label>
				</div>
			</sticky>
		</div>
		<my-scroll ref="scroll" @loadmore='loadmore' :isTab="isTab" :total="total" >
			<Minerallist :investorSH="investorSH" :list="projectList"></Minerallist>
		</my-scroll>

	</div>
</template>

<script>
	import { Flexbox, FlexboxItem, Swiper, SwiperItem, XHeader, XInput, Tab, TabItem, Sticky, Group, Icon, PopupRadio } from 'vux'
	import { iosTest } from '@/assets/commonjs/util.js';
	import axios from 'axios'
	import Minerallist from '@/components/common/Mineral-list'
	import Oheader from '@/components/common/header/Oheader'
	import myScroll from '@/components/base/myScroll'

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
			FlexboxItem,
			myScroll
		},
		data() {
			return {
				img_list: baseList,
				title: "矿权交易",
				column: [
				{'name':"全部",value:''},
				{'name': "金属矿产",value:1},
				{'name' :"有色金属",value:2},
				{'name': "黑色金属",value:4},
				{'name':"能源矿产",value:8},
				{'name': "稀有金属",value:16},
				{'name': "非金属",value:32}
				],
				curTab:'',
				tabWidth: document.body.clientWidth,
				projectList: [],
				investorSH: false,
				minera: '',
				pageNum: 1,
				numPerPage: 10,
				total:0,
				isTab:false
			}
		},
		mounted() {
			this.getProjectList()
		},
		computed:{

		},
		methods: {
			loadmore(){
				if(!this.investorSH){
					this.getProjectList()
				}else{
					this.getInvestorList()
				}
			},
			getProjectList() {
				axios.get(this.$root.urlPath.MC + '/wap/yitrade.do?yiTradeList', {
						params: {
							minera: this.curTab,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						if(res.data.success) {
							this.$refs.scroll.loaded()
							this.isTab = false

							var data = res.data.data.resList
							this.projectList = this.projectList.concat(data)
							this.total = res.data.data.total

							if(this.total == this.projectList.length && this.total !== 0){
								this.$refs.scroll.complete()
							}else{
								this.pageNum++
							}
						}
					})
					.catch(function(error) {
						console.log(error)
					});
			},
			getInvestorList() {

				axios.get(this.$root.urlPath.MC + '/wap/yiinvest.do?yiInvestList', {
						params: {
							minera: 1,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {

						if(res.data.success) {
							this.isTab = false
							this.$refs.scroll.loaded()
							var data = res.data.data.investList
							this.total = res.data.data.total
							this.projectList = this.projectList.concat(data)

							if(this.total == this.projectList.length && this.total !== 0){
								this.$refs.scroll.complete()
							}else{
								this.pageNum++
							}
						}
					})
					.catch(function(error) {
						console.log(error)
					});
			},

			investorClick() {
				this.$refs.scroll.init()
				this.projectList = []
				this.pageNum = 1
				this.investorSH = true
				this.getInvestorList()
			},
			tabClick(value) {
				this.$refs.scroll.init()
				this.pageNum = 1
				this.projectList = []
				this.curTab = value
				this.isTab = true
				this.investorSH = false
				this.getProjectList()

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
