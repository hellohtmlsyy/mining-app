<template>
	<div class="exhibtion">
		<Oheader :title="title"></Oheader>
		<div class="exhibtion-nav channelBTab clearfix">
			<sticky scrollBox="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="fl" style="width: 6.413rem;overflow:scroll;-webkit-overflow-scrolling:touch;">
					<tab ref="tabBox" style="background-color: #f2f4f5;font-size: 0.28rem" active-color="rgb(225, 158, 36)" :line-width="3" :style="{width: tabWidth + 'px'}">
						<tab-item v-for="(item,index) in column" :key="index" @on-item-click="tabClick(item, index)" :selected="index===0">{{item}}
						</tab-item>
					</tab>
				</div>
				<div class="icoliebiao fr">
					<i class='icon iconfont icon-liebiao' @click="switchFirst" :style="{'color':shohid ? '#343434' : '#A8A8A8'}"></i>
					<i class='icon iconfont icon-liebiao1' @click="switchSecond" :style="{'color':shohid ? '#A8A8A8' : '#343434'}"></i>
				</div>
			</sticky>
		</div>
		<ExhibitionList :shohid="shohid" :list="meetingList" @scrollValue="scrollValue"></ExhibitionList>
		<load-more :tip="loadingCon" :show-loading="loading" v-show="loading"></load-more>
		<divider v-show="droploadDowm">已加载所有数据</divider>
	</div>
</template>

<script>
	import { Swiper, SwiperItem, XHeader, Tab, TabItem, Sticky, Group, Icon, PopupRadio, Flexbox, FlexboxItem } from 'vux'
	import { getTime2} from '@/assets/commonjs/util.js';
	import ExhibitionList from '@/components/common/Exhibition-list'
	import Oheader from '@/components/common/header/Oheader'
	import axios from 'axios'
	const baseList = [{
		img: '../../../static/img/banner1.jpg'
	}, {
		img: '../../../static/img/banner2.jpg'
	}]
	export default {
		components: {
			Swiper,
			ExhibitionList,
			Oheader,
			XHeader,
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
				title: '行业会展',
				img_list: baseList,
				column: ["全部", "国内会展", "国外会展"],
				selected: "全部",
				index: 0,
				meetingList: [],
				optionType: '',
				shohid: true,
				droploadDowm: false,
				tabWidth: document.body.clientWidth,
				pageNum: 1,
				numPerPage: 10,
				isscroll: true,
				loading:false,
				loadingCon:'正在加载'
			}
		},
		mounted() {
			this.getMeetingList()
		},
		methods: {
			getMeetingList() {
				this.loading = true
				axios.get(this.$root.urlPath.MC + '/wap/meeting.do?meetingList', {
						params: {
							from: this.optionType,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {

						if(res.data.success) {
							this.loading = false
							
							var data = res.data.data.meetingList
							for(var i in data) {
								this.meetingList.push(data[i])
							}

							this.total = Math.ceil(res.data.data.totalCount / this.numPerPage)
							
							if(res.data.data.totalCount == 0){
								this.droploadDowm = true
							}
						} else {
							this.isscroll = false

						}
					})
					.catch(function(error) {

					});
			},
			tabClick(index) {
				this.pageNum = 1
				switch(index) {
					case '全部':
						this.optionType = ''
						break;
					case '国内会展':
						this.optionType = 1
						break;
					case '国外会展':
						this.optionType = 2
						break;
				}
				axios.get(this.$root.urlPath.MC + '/wap/meeting.do?meetingList', {
						params: {
							from: this.optionType,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {

						if(res.data.success) {
							var data = res.data.data.meetingList
							this.meetingList = data
							if(res.data.data.totalCount == 0){
								this.droploadDowm = true
							}
						} else {
							this.isscroll = false

						}
					})
					.catch(function(error) {

					});
			},
			scrollValue(value) {

				var viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				if(value.scrollTop / (value.height - viewH) >= 0.6) {
					//					页数超过总页数或者没有更多数据时，不在进行加页和获取数据
					if(this.pageNum >= this.total || !this.isscroll) {
						//						若内容高度-视口高度-滚动高度 <=25，显示已加载所有列表
						if(value.height - viewH - value.scrollTop <= 25) {
							this.droploadDowm = true
						}
						return
					}
					this.pageNum++
						this.getMeetingList()
				}
			},
			switchFirst() {
				this.shohid = true
			},
			switchSecond() {
				this.shohid = false
			},
		}
	}
</script>

<style>
	/*tab*/
	
	::-webkit-scrollbar {
		width: 0px;
		display: none;
		background-color: #fff;
	}
	
	.exhibtion .oHeader .centerA {
		width: 4rem
	}
	
	.exhibtion {
		background-color: rgb(238, 238, 238);
	}
	
	.exhibtion .lefttext {
		color: #fff;
	}
	
	/*nav*/
	
	.exhibtion .exhibtion_nav {
		position: relative;
	}
	.exhibtion .exhibtion-nav{
		position: fixed;
		left: 0;
		top: 1rem;
	}
	/*list*/
	.exhibtion .meetingList{
		margin-top: 1.94rem;
	}
	
	.exhibtion .options {
		position: absolute;
		right: 0;
		top: 0
	}
	
	.exhibtion .options .vux-no-group-title {
		border-left: 1px solid #ccc;
		box-shadow: -1px 0px 2px #333333;
		margin-top: 0;
		height: 44px;
	}
	
	.exhibtion .weui-cell__ft .vux-cell-value {
		display: none;
	}
	
	.exhibtion .weui-cell_access .weui-cell__ft:after {
		display: none !important
	}
</style>