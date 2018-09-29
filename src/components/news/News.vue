<template>
	<div class="news">
		<Oheader :title="title" v-if="showHeader" ref="myHeader"></Oheader>
		<!--nav-->
		<div class="news_nav clearfix" :class="iosmargintop ? 'iosposiabsole' : 'posiabsole'" ref="myNav">

			<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="fl" style="width: 83.8%;overflow:scroll;-webkit-overflow-scrolling:touch;">
					<tab ref="tabBox" style="background-color: #f2f4f5;font-size: 0.28rem" active-color="rgb(225, 158, 36)" :line-width="3" :style="{width: tabWidth + 'px'}">
						<tab-item v-for="(item,index) in column" :key="index" @on-item-click="tabClick(item.value)" :selected="index===0">{{item.name}}
						</tab-item>
					</tab>
				</div>
				<div class="icoliebiao fr">
					<i class='icon iconfont icon-liebiao' @click="shohid = true" :style="{'color':shohid ? '#343434' : '#A8A8A8'}"></i>
					<i class='icon iconfont icon-liebiao1' @click="shohid = false" :style="{'color':shohid ? '#A8A8A8' : '#343434'}"></i>
				</div>
			</sticky>
		</div>
		
		<div class="listA" :class="iosmargintop ? 'iosmargintop' : 'margintop'">
			<my-scroll ref="scroll" @loadmore='getNewsList' :isTab="isTab" :total="total" >
				<Newslist :shohid="shohid" :list="newsList" ></Newslist>
			</my-scroll>
			<div class="clearfix"></div>
		</div>
	</div>
</template>

<script>
	import { Tab, TabItem, Sticky, Icon, Group, PopupRadio, XHeader, XInput, Flexbox, FlexboxItem, Swiper, SwiperItem } from 'vux'
	import { getTime1,isDevice} from '@/assets/commonjs/util.js';
	import Newslist from '@/components/common/News-list'
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
			Icon,
			Tab,
			TabItem,
			Sticky,
			Group,
			PopupRadio,
			Newslist,
			XHeader,
			XInput,
			Flexbox,
			FlexboxItem,
			Swiper,
			SwiperItem,
			Oheader,
			myScroll
		},
		data() {
			return {
				showHeader:true,
				column: [{name:"全部",value:''},
				{name:"金属矿产",value:9211},
				{name:"有色金属",value:9212},
				{name:"黑色金属",value:9213},
				{name:"能源矿产",value:9214},
				{name:"稀有金属",value:9215},
				{name:"非金属",value:9216},
				{name:"矿用设备",value:9217},
				{name:"耗材药剂",value:9218},
				{name:"专业服务",value:9219},
				{name:"全球投资",value:9280},
				{name:'矿业圈动态',value:9299}],
				selected: "全部",
				index: 0,
				pageNum: 1,
				numPerPage: 10,
				newsList: [],
				catId: '',
				total: 0,
				img_list: baseList,
				shohid: true, //显示方式
				showSwiper: true,
				title: '新闻',
				tabWidth: document.body.clientWidth,
				iosmargintop:'',  //在底部进入时区别nav有无margin-top样式
				isTab:false
			}
		},
		mounted() {
			this.getNewsList()
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
			
		},
		methods: {
			fbtime() {
				//				从当前页-1后乘以10得到数组中未转换的开始时间开始转换
				for(var i = (this.pageNum - 1) * 10; i < this.newsList.length; i++) {
					if(!this.newsList[i].newtime) return
					var s1 = this.newsList[i].newtime
					s1 = new Date(s1.replace(/-/g, "/"));
					var s2 = new Date();
					var days = s2.getTime() - s1.getTime();

					if(parseInt(days / (1000 * 60 * 60 * 24 * 30)) <= 0) {
						this.newsList[i].newtime = parseInt(days / (1000 * 60 * 60 * 24)) + '天前';
					} else if(parseInt(days / (1000 * 60 * 60 * 24)) <= 0) {
						this.newsList[i].newtime = parseInt(days / (1000 * 60 * 60)) + '小时前';
					} else {
						this.newsList[i].newtime = parseInt(days / (1000 * 60 * 60 * 24 * 30)) + '个月前';
					}
				}
			},
			getNewsList() {
				
				axios.get(this.$root.urlPath.MC + '/wap/news.do?newsList', {
						params: {
							catId: this.catId,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						if(res.data.success) {
							this.isTab = false
							this.$refs.scroll.loaded()
							var data = res.data.data.newsList
							
							this.newsList = this.newsList.concat(data)
							this.fbtime(res.data.data.newsList)
							this.total = res.data.data.totalCount
							
							if(this.total == this.newsList.length && this.total !== 0){
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
			tabClick(val) {
				this.$refs.scroll.init()
				this.pageNum = 1
				this.newsList = []
				this.catId = val
				
				this.isTab = true
				this.getNewsList()
			},
		}
	}
</script>

<style>
	@import url("../../static/css/oheader.css");
	/*tab部分*/
	/*头部*/
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸,在这里设置滚动条宽度为0px*/
	
	 ::-webkit-scrollbar {
		width: 0px;
		display: none;
		background-color: #fff;
	}
	
	.news .icoliebiao {
		line-height: 0.8rem;
		background-color: #fff;
		height: 0.8rem;
		box-shadow: -2px 0 0 rgb(203, 203, 203);
		max-width: 1.188rem;
	}
	
	.news .icon-liebiao {
		font-size: 0.35rem;
		margin-right: 0.1rem;
		padding-left: 0.15rem;
	}
	
	.news .icon-liebiao1 {
		font-size: 0.35rem;
		margin-right: 0.15rem;
	}
	
	.news {
		background: #EEEEEE
	}
	.news .news_nav .vux-tab .vux-tab-item {
		background: none
	}
	
	.news .oHeader .centerA {
		width: 4.8rem
	}
	
	.newsHeader {
		padding: 0.2rem;
		font-size: 0.36rem;
		background-color: #333333;
		color: #fff
	}
	
	.news .leftA {
		margin-right: 0.36rem;
	}
	
	.news .icon-jiantou-copy {
		font-size: 0.36rem;
	}
	
	.news .centerA {
		width: 4.8rem;
		border-radius: 0.3rem;
		background-color: #fff;
		line-height: 0.52rem;
		margin-right: 0.3rem;
	}
	
	.news .searchText {
		font-size: 0.28rem;
		color: rgb(108, 108, 108);
	}
	
	.news .rightA {}
	
	.news .icon-fensuijipinpaidaquan {
		font-size: 0.45rem;
	}
	/*nav*/
	
	.news .news_nav {
		margin-bottom: 0.15rem;
		background-color: #fff;
		position: fixed;
		left: 0;
		z-index: 999;
	}
	.news .iosposiabsole{
		top: 0;
	}
	.news .posiabsole{
		top: 0.98rem;
	}
	
	/*list*/
	.news .margintop{
		margin-top: 1.94rem;
	}
	.news .iosmargintop{
		margin-top: 1rem;
	}
	
	
	.news .news_nav .vux-tab-wrap {
		width: 6.6rem;
	}
	
	.droploadDowm {
		text-align: center;
	}
</style>