<template>
	<div class="exhibtion">
		<Oheader :title="title"></Oheader>
		<div class="exhibtion-nav channelBTab clearfix">
			<sticky  scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="fl" style="width: 6.39rem;overflow:scroll;-webkit-overflow-scrolling:touch;">
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
		<my-scroll ref="scroll" @loadmore='getMeetingList' :isTab="isTab" :total="total" >
			<ExhibitionList :shohid="shohid" :list="meetingList" ></ExhibitionList>
		</my-scroll>
	</div>
</template>

<script>
	import { Swiper, SwiperItem, XHeader, Tab, TabItem, Sticky, Group, Icon, PopupRadio, Flexbox, FlexboxItem } from 'vux'
	import { getTime2} from '@/assets/commonjs/util.js';
	import ExhibitionList from '@/components/common/Exhibition-list'
	import Oheader from '@/components/common/header/Oheader'
	import myScroll from '@/components/base/myScroll'
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
			FlexboxItem,
			myScroll
		},
		data() {
			return {
				title: '行业会展',
				img_list: baseList,
				column: [{name:"全部",value:''},
				{name:"国内会展",value:1},
				{name:"国外会展",value:2}],
				curTab:'',
				meetingList: [],
				optionType: '',
				shohid: true,
				tabWidth: document.body.clientWidth,
				pageNum: 1,
				numPerPage: 10,
				total:0,
				isTab:false
			}
		},
		mounted() {
			this.getMeetingList()
		},
		methods: {
			getMeetingList() {
				axios.get(this.$root.urlPath.MC + '/wap/meeting.do?meetingList', {
						params: {
							from: this.curTab,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						if(res.data.success) {
							this.isTab = false
							this.$refs.scroll.loaded()
							
							var data = res.data.data.meetingList
							this.meetingList = this.meetingList.concat(data)
							this.total = res.data.data.totalCount
					
							if(this.total == this.meetingList.length && this.total !== 0){
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
			tabClick(value) {
				this.$refs.scroll.init()
				this.pageNum = 1
				this.meetingList = []
				this.curTab = value
				
				this.isTab = true
				this.getMeetingList()
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
	.exhibtion .exhibtion-nav{
		position: fixed;
		left: 0;
		top: 1rem;
		width: 100%;
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