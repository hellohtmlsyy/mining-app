<template>
	<div class="news">
		<Oheader :title="title" v-if="showHeader"></Oheader>
		<!--nav-->
		<div class="news_nav clearfix" :class="iosmargintop ? 'iosposiabsole' : 'posiabsole'">

			<sticky scrollBox="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="fl" style="width: 83.8%;overflow:scroll;-webkit-overflow-scrolling:touch;">
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
		
		<div class="listA" :class="iosmargintop ? 'iosmargintop' : 'margintop'">
			<Newslist :shohid="shohid" :list="newsList" @scrollValue="scrollValue"></Newslist>
			<div class="clearfix"></div>
			<load-more :tip="loadingCon" :show-loading="loading" v-show="loading"></load-more>
			<divider v-show="droploadDowm">已加载所有数据</divider>
		</div>
	</div>
</template>

<script>
	import { Tab, TabItem, Sticky, Icon, Group, PopupRadio, XHeader, XInput, Flexbox, FlexboxItem, Swiper, SwiperItem } from 'vux'
	import { getTime1,isDevice} from '@/assets/commonjs/util.js';
	import Newslist from '@/components/common/News-list'
	import Oheader from '@/components/common/header/Oheader'
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
			Oheader
		},
		data() {
			return {
				showHeader:true,
				column: ["全部", "金属矿产", "有色金属", "黑色金属", "能源矿产", "稀有金属", "非金属", "矿用设备", "耗材药剂", "专业服务", "全球投资", '矿业圈动态'],
				selected: "全部",
				index: 0,
				disabledValue: 'hello',
				pageNum: 1,
				numPerPage: 10,
				newsList: [],
				catId: 9211,
				total: 0,
				isscroll: true,
				droploadDowm: false,
				img_list: baseList,
				shohid: true, //显示方式
				showSwiper: true,
				title: '新闻',
				tabWidth: document.body.clientWidth,
				jieliu: true, //节流：数据加载完后加载下一页
				loading:false,
				loadingCon:'正在加载',
				iosmargintop:''  //在底部进入时区别nav有无margin-top样式
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
			getNewsList(type) {
				this.loading = true
				this.jieliu = true
				axios.get(this.$root.urlPath.MC + '/wap/news.do?newsList', {
						params: {
							catId: type,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						if(res.data.success) {
							this.loading = false
							this.jieliu = false
							var data = res.data.data.newsList
							for(var i in data) {

								this.newsList.push(data[i])
							}
							this.fbtime(res.data.data.newsList)
							this.total = Math.ceil(res.data.data.totalCount / this.numPerPage)
console.log(data)
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
						this.catId = ''
						break;
					case '金属矿产':
						this.catId = 9211
						break;
					case '有色金属':
						this.catId = 9212
						break;
					case '黑色金属':
						this.catId = 9213
						break;
					case '能源矿产':
						this.catId = 9214
						break;
					case '稀有金属':
						this.catId = 9215
						break;
					case '非金属':
						this.catId = 9216
						break;
					case '矿用设备':
						this.catId = 9217
						break;
					case '耗材药剂':
						this.catId = 9218
						break;
					case '专业服务':
						this.catId = 9219
						break;
					case '全球投资':
						this.catId = 9280
						break;
					case '矿业圈动态':
						this.catId = 9299
						break;

				}
				axios.get(this.$root.urlPath.MC + '/wap/news.do?newsList', {
						params: {
							catId: this.catId,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {

						if(res.data.success) {

							var data = res.data.data.newsList

							this.newsList = data
							this.fbtime()
							this.total = Math.ceil(res.data.data.totalCount / this.numPerPage)
						} else {
							this.isscroll = false
						}
					})
					.catch(function(error) {});
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
					this.getNewsList(this.catId)
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