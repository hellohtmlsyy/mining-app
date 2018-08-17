<template>
	<div class="flagshop">
		<div :class="{headerBg:!isFixed}">
			<div class="searchHeader" :class="isFixed ? 'headerBgColor' : 'headerColor_F'" ref="searchHeader">
				<div @click="back">
					<i class="icon iconfont icon-jiantou-copy"></i>
				</div>
				<div class="searchBox" @click="search" :class="isFixed ? 'searchHeaderBgColorFixed' : 'searchHeaderBgColor'">
					<icon type="search" class="searchIco" :class="isFixed ? 'headerColor' :'searchIcoColor'"></icon>
					<input type="text" placeholder="请输入关键字" class="myInput" :class="isFixed ? 'searchHeaderBgColorFixed' : 'searchHeaderBgColor'" />
				</div>
				<div class="moreBox" @click="showShortcut = !showShortcut" ref="shortcut">
					<i class="icon iconfont icon-morevert"></i>
					<Shortcut :list="shorcutList" :show="showShortcut" @clickLi="clickLi"></Shortcut>

				</div>
			</div>
			<div class="compony">
				<div class="logoBox">
					<img :src="componyInfo.logo" />
				</div>
				<div class="nameBox">
					<p>{{componyInfo.name}}</p>
				</div>
				<div class="followBtnBox">
					<div class="followBox bgColor" v-show="!shopFollow" @click="follow">
						<i class="icon iconfont icon-iconfontadd"></i>
						<span class="follow">关注</span>
					</div>
					<div class="followedBox bgColored" v-show="shopFollow" @click="followed">
						<span class="followed">已关注</span>
					</div>
				</div>
			</div>
		</div>

		<div class="nav" :class="{navFixed:isFixed}">
			<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<tab :line-width=3 active-color="#ff4f54">
					<tab-item :selected="curNav === item" v-for="(item, index) in navList" @click="curNav = item" :key="index" @on-item-click="tabClick(item, index)">{{item}}</tab-item>
				</tab>
			</sticky>
		</div>

		<div class="list" ref="list">
			<div class="introBox listItem" v-show="curHome && newMallList.length == 0 && projectList.length == 0 && meetingList.length == 0 && homeIntro">
				<div class="titleBox">
					<span class="titleBg titleBgUrl1"></span>
				</div>
				<p>{{homeIntro}}</p>
			</div>
			<div class="mallBox listItem" v-show="showMall && newMallList.length !== 0">
				<div class="titleBox" v-show="curHome">
					<span class="titleBg titleBgUrl2"></span>
				</div>
				<Malllist :shohid="hideSecond" :list="newMallList" :imgShow="true" keep-alive></Malllist>
			</div>
			<div class="mineralBox listItem" v-show="showProject && projectList.length !== 0">
				<div class="titleBox" v-show="curHome">
					<span class="titleBg titleBgUrl3"></span>
				</div>
				<Minerallist :shohid="!hideSecond" :investorSH="investorSH" :list="projectList" keep-alive></Minerallist>
			</div>
			<div class="meetingBox listItem" v-show="showMeet && meetingList.length !== 0">
				<div class="titleBox" v-show="curHome">
					<span class="titleBg titleBgUrl4"></span>
				</div>
				<ExhibitionList :shohid="hideSecond" :list="meetingList" keep-alive></ExhibitionList>
			</div>
			<load-more :tip="loadingCon" v-show="loading"></load-more>
			<divider v-show="droploadDowm">已加载所有数据</divider>
			<divider v-show="showNoDataText">暂时没有已发布的{{noDataText}}</divider>
		</div>

		<div class="footer">
			<div class="componyIntroBtn" :class="showTypeFooter ? 'btnWidthPf' : 'btnWidth'" @click="goComponyIntro">
				公司介绍
			</div>
			<!--<div class="typeBtn" v-show="showTypeFooter">
				分类
			</div>-->
			<div class="leaveSpeakeBtn" @click="goLeaveSpeak">
				留言
			</div>
		</div>
	</div>
</template>

<script>
	const loginUrl = 'http://member.miningcircle.com/login?where=mineral';

	import { getAppShare, isDevice, lastPage, appLogin,goHomeApp} from '@/assets/commonjs/util.js';
	import { Sticky, Tab, TabItem, cookie } from 'vux'
	import axios from 'axios'
	import Malllist from '@/components/common/Mall-list'
	import Shortcut from '@/components/common/shortcut'
	import Minerallist from '@/components/common/Mineral-list'
	import ExhibitionList from '@/components/common/Exhibition-list'

	export default {
		components: {
			Sticky,
			Tab,
			TabItem,
			Malllist,
			Minerallist,
			ExhibitionList,
			Shortcut
		},
		data() {
			return {
				showShortcut: false,
				navList: ['首页', '商品', '项目', '会展'],
				curNav: '首页',
				isFixed: false,
				hideSecond: false,
				showProject: true,
				showMeet: true,
				showMall: true,
				curHome: true,
				showTypeFooter: false,
				componyInfo: [],
				homeIntro: '',
				shopFollow: '',
				newMallList: [],
				investorSH: false,
				meetingList: [],
				projectList: [],
				pageNum: 1,
				numPerPage: 10,
				homeSlip: 10,
				shopId: this.$route.query.shopId,
				jieliu: false,
				droploadDowm: false,
				loadingCon: '正在加载',
				loading: false,
				showNoDataText: false,
				noDataText: '',
				shorcutList: [{
					text: '店铺名片',
					ico: '../../../static/img/flagship/QRcode.png'
				}, {
					text: '分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享',
					ico: '../../../static/img/flagship/share.png'
				}, {
					text: '留&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言',
					ico: '../../../static/img/flagship/message.png'
				}, {
					text: '首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页',
					ico: '../../../static/img/flagship/home.png'
				}]
			}
		},
		mounted() {
			document.addEventListener("click", (e) => {
				if(!!this.$refs.shortcut.contains(e.target)) return
				this.showShortcut = false
			})

			window.addEventListener("scroll", this.handleScroll)
			let params = {
				numPerPage: 0,
				pageNum: 0,
				limitNum: this.homeSlip,
				mineralId: 0,
				cId: this.shopId
			}
			this.getProject(params)
			this.getMeeting({
				'numPerPage': this.homeSlip,
				'meetingLatest': '',
				id: this.shopId
			})
			this.getComponyInfo()
			this.getNewMallList({
				'id': this.shopId
			})

			//			if(newMallList.length == 0 && projectList.length == 0 && meetingList.length == 0){
			this.getHomeIntro()
			//			}
		},
		methods: {
			clickLi(index) {
				if(index == 0) {
					window.location.href = this.$root.urlPath.MCM + "/shopCart?shopId=" + this.shopId + "&shopName=" + this.componyInfo.name + "&newpage=newpage"
				} else if(index == 1) {
					if(isDevice() == '其他浏览器') {
						//						this.show1 = true
					} else if(isDevice() == 'adr' || isDevice() == 'ios') {
						if(this.homeIntro == 'undefined') {
							this.homeIntro = ''
						}
						getAppShare(window.location.href, this.componyInfo.name, this.componyInfo.logo, this.homeIntro, "")
					}
				} else if(index == 2) {
					this.goLeaveSpeak()
				}else if(index == 3){
					goHomeApp()
				}
			},
			back() {
				lastPage()
			},

			search() {
				var codeHomeIntro = encodeURI(this.homeIntro)
				window.location.href = this.$root.urlPath.MCM + "/flagship/search?shopId=" + this.shopId + "&shareName=" + this.componyInfo.name + "&shareImg=" + this.componyInfo.logo + "&shareIntro=" + codeHomeIntro +
					"&newpage=newpage"
			},

			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var offsetTop = this.$refs.searchHeader.offsetHeight
				//滚动距离如果大于元素到顶部的距离时,就固定定位
				if(scrollTop > offsetTop) {
					this.isFixed = true
				} else {
					this.isFixed = false
				}
				if(!this.curHome) {
					var height = this.$refs.list.offsetHeight
					var viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

					if(scrollTop / (height - viewH) >= 0.6 && !this.loading) {

						//页数超过总页数或者没有更多数据时，不在进行加页和获取数据
						if(this.pageNum >= this.total) {
							//若内容高度-视口高度-滚动高度 <=25，显示已加载所有列表
							//						if(height - viewH - scrollTop <= 25) {
							this.droploadDowm = true
							//						}
							return
						}

						this.pageNum = this.pageNum + 1
						if(this.showMall) {
							let params = {
								'id': this.shopId,
								'pageNum': this.pageNum,
								'numPerPage': this.numPerPage
							}
							this.getMallList(params)
						} else if(this.showProject) {
							let params = {
								numPerPage: this.numPerPage,
								pageNum: this.pageNum,
								limitNum: 0,
								mineralId: 0,
								cId: this.shopId
							}
							this.getProject(params)
						} else if(this.showMeet) {

							this.getMeeting({
								'numPerPage': this.numPerPage,
								pageNum: this.pageNum,
								'meetingLatest': '',
								id: this.shopId
							})
						}
					}
				}
			},
			follow() {
				if(!cookie.get('MC_UID')) {
					appLogin()
					return
				}
				axios.get(this.$root.urlPath.MC + '/wap/store.do?storeAttention', {
						params: {
							storeId: this.shopId,
						}
					})
					.then(res => {
						if(res.data.success) {
							this.shopFollow = true
						} else {
							//							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			followed() {
				if(!cookie.get('MC_UID')) {
					appLogin()
					return
				}

				axios.get(this.$root.urlPath.MC + '/wap/store.do?storeCancelAttention', {
						params: {
							storeId: this.shopId,
						}
					})
					.then(res => {
						if(res.data.success) {
							this.shopFollow = false
						} else {
							//							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			tabClick(item, index) {
				if(item == '项目') {
					this.projectList = []
					this.pageNum = 1
					this.droploadDowm = false
					this.showProject = true
					this.showMeet = false
					this.showMall = false
					this.curHome = false
					this.showTypeFooter = false
					this.showNoDataText = false
					let params = {
						numPerPage: this.numPerPage,
						pageNum: this.pageNum,
						limitNum: 0,
						mineralId: 0,
						cId: this.shopId
					}

					this.getProject(params)

				} else if(item == '会展') {
					this.meetingList = []
					this.pageNum = 1
					this.droploadDowm = false
					this.showMeet = true
					this.showProject = false
					this.showMall = false
					this.curHome = false
					this.showTypeFooter = false
					this.showNoDataText = false

					this.getMeeting({
						'numPerPage': this.numPerPage,
						pageNum: this.pageNum,
						'meetingLatest': '',
						id: this.shopId
					})
				} else if(item == '商品') {
					this.newMallList = []
					this.pageNum = 1
					this.droploadDowm = false
					this.showMall = true
					this.showMeet = false
					this.showProject = false
					this.curHome = false
					//					this.showTypeFooter = true   有用，显示底部分类用
					this.showNoDataText = false

					this.getMallList({
						'id': this.shopId,
						'pageNum': this.pageNum,
						'numPerPage': this.numPerPage
					})
				} else if(item == '首页') {
					this.newMallList = []
					this.meetingList = []
					this.projectList = []

					this.droploadDowm = false
					this.curHome = true
					this.showProject = true
					this.showMeet = true
					this.showMall = true
					this.showTypeFooter = false
					this.showNoDataText = false

					let params = {
						numPerPage: 0,
						pageNum: 0,
						limitNum: this.homeSlip,
						mineralId: 0,
						cId: this.shopId
					}
					this.getProject(params)
					this.getMeeting({
						'numPerPage': this.homeSlip,
						'meetingLatest': '',
						id: this.shopId
					})
					this.getComponyInfo()
					this.getNewMallList({
						'id': this.shopId
					})
				}

			},
			getProject(params) {
				this.loading = true
				axios.get(this.$root.urlPath.MC + '/wap/store.do?yiLaList', {
						params
					})
					.then(res => {
						this.loading = false
						var data = res.data

						if(data.success) {
							for(var i in data.data.yiList) {
								this.projectList.push(data.data.yiList[i])
							}

							this.total = Math.ceil(data.data.total / this.numPerPage)
							//							console.log(this.projectList)
						} else {

							if(data.errMsg == '暂无数据' && !this.curHome) {
								this.showNoDataText = true
								this.noDataText = '项目'
							} else {
								this.showNoDataText = false
							}
							//							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			getMeeting(params) {
				this.loading = true
				axios.get(this.$root.urlPath.MC + '/wap/store.do', {
						params
					})
					.then(res => {
						this.loading = false
						if(res.data.success) {
							var data = res.data.data
							for(var i in data.list) {
								this.meetingList.push(data.list[i])
							}

							this.total = Math.ceil(data.totalCount / this.numPerPage)
							if(data.list.length == 0 && !this.curHome) {
								this.showNoDataText = true
								this.noDataText = '会展'
							} else {
								this.showNoDataText = false
							}

						} else {

							//							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			getComponyInfo() {
				axios.get(this.$root.urlPath.MC + '/wap/store.do?storeInfo', {
						params: {
							id: this.shopId
						}
					})
					.then(res => {

						if(res.data.success) {
							var data = res.data.data
							this.componyInfo = data.data
							this.shopFollow = data.isAttention

						} else {
							//							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			getNewMallList(params) {
				this.loading = true
				axios.get(this.$root.urlPath.MC + '/wap/store.do?mallLatest', {
						params
					})
					.then(res => {
						this.loading = false
						if(res.data.success) {
							var data = res.data.data
							this.newMallList = data

							var reg = /^(.*\.)[^.]+$/;
							for(var i = (this.pageNum - 1) * 10; i < this.newMallList.length; i++) {
								this.$set(this.newMallList[i], "imgS", this.newMallList[i].img.replace(reg, "$1") + 's.jpg')
								this.$set(this.newMallList[i], "imgM", this.newMallList[i].img.replace(reg, "$1") + 'm.jpg')
							}

						} else {
							//							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			getMallList(params) {
				this.loading = true

				axios.get(this.$root.urlPath.MC + '/wap/store.do?mallList', {
						params
					})
					.then(res => {
						this.loading = false

						if(res.data.success) {
							var data = res.data.data
							for(var i in data.list) {
								this.newMallList.push(data.list[i])
							}
							this.total = Math.ceil(data.totalCount / this.numPerPage)

							var reg = /^(.*\.)[^.]+$/;
							for(var i = (this.pageNum - 1) * 10; i < this.newMallList.length; i++) {
								this.$set(this.newMallList[i], "imgS", this.newMallList[i].img.replace(reg, "$1") + 's.jpg')
								this.$set(this.newMallList[i], "imgM", this.newMallList[i].img.replace(reg, "$1") + 'm.jpg')
							}

						} else {
							if(res.data.errMsg == '暂无数据' && !this.curHome) {
								this.showNoDataText = true
								this.noDataText = '商品'
							} else {
								this.showNoDataText = false
							}
							//							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						//						alert(error)
					});
			},
			getHomeIntro() {
				axios.get(this.$root.urlPath.MC + '/wap/store.do?briefIntroduction', {
						params: {
							storeId: this.shopId,
						}
					})
					.then(res => {
						var data = JSON.parse(res.data)
						if(data.success) {
							this.homeIntro = data.data.introduction
						} else {
							//							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			goComponyIntro() {

				window.location.href = this.$root.urlPath.MCM + "/componyIntro?shopId=" + this.shopId + "&newpage=newpage"

			},
			goLeaveSpeak() {
				if(!cookie.get('MC_UID')) {
					appLogin()
					return
				}
				window.location.href = this.$root.urlPath.MCM + "/leaveSpeak?&shopId=" + this.shopId + "newpage=newpage"
			},
		}
	}
</script>

<style scoped>
	.flagshop .headerBg {
		background: url(../../../static/img/flagship/bg.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.flagshop .searchHeader {
		display: flex;
		padding: 0 0.2rem;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 998;
	}
	
	.flagshop .headerColor_F {
		color: #fff;
	}
	
	.flagshop .headerBgColor {
		background: #EEEEEE;
		color: #333333;
	}
	
	.flagshop .headerColor {
		color: #333333 !important;
	}
	
	.flagshop .searchHeader .weui-icon-search {
		color: #fff;
	}
	
	.flagshop .searchIcoColor {
		color: #fff;
	}
	
	.flagshop .searchHeaderBgColor {
		background-color: rgba(106, 106, 106, 0.25);
	}
	
	.flagshop .searchHeaderBgColorFixed {
		background: #fff;
	}
	
	.flagshop .searchHeader .icon-jiantou-copy {
		font-size: 0.5rem;
		line-height: 1rem;
	}
	
	.flagshop .searchHeader .searchBox {
		width: 5.5rem;
		height: 0.58rem;
		border-radius: 0.29rem;
		margin: 0.2rem;
		line-height: 0.58rem
	}
	
	.flagshop .searchHeader .searchBox .searchIco {
		font-size: 0.3rem;
		padding-left: 0.28rem;
	}
	
	.flagshop .searchHeader input {
		background: rgba(106, 106, 106, 0);
	}
	
	.flagshop .myInput::-webkit-input-placeholder {
		font-size: 0.24rem;
		color: #fff;
	}
	
	.flagshop .searchHeaderBgColorFixed::-webkit-input-placeholder {
		color: #333333;
	}
	
	.flagshop .searchHeader .searchBox input {
		border: none;
		height: 0.58rem;
		line-height: 0.58rem;
		padding-top: 0.04rem;
		box-sizing: border-box;
	}
	
	.flagshop .FixedBg {
		background: #fff;
	}
	
	.flagshop .searchHeader .moreBox .icon-morevert {
		font-size: 0.5rem;
		line-height: 1rem;
	}
	
	.flagshop .compony {
		display: flex;
		padding: 0.2rem;
		padding-top: 1rem;
	}
	
	.flagshop .compony .logoBox img {
		width: 0.8rem;
		height: 0.8rem;
		margin-right: 0.2rem;
	}
	
	.flagshop .compony .nameBox {
		font-size: 0.28rem;
		color: #fff;
		width: 4.9rem;
	}
	
	.flagshop .compony .followBtnBox {
		/*padding: 0.1rem 0.2rem*/
	}
	
	.flagshop .compony .followBtnBox .followBox,
	.flagshop .compony .followBtnBox .followedBox {
		border-radius: 0.2rem;
		padding: 0.05rem 0.15rem
	}
	
	.flagshop .compony .followBtnBox .bgColor {
		background: rgb(255, 79, 84);
	}
	
	.flagshop .compony .followBtnBox .bgColored {
		background: #fff;
	}
	
	.flagshop .compony .followBtnBox {
		font-size: 0.24rem;
	}
	
	.flagshop .compony .followBtnBox .icon-iconfontadd {
		color: #Fff;
		vertical-align: top;
		line-height: 0.32rem;
		font-size: 0.16rem;
	}
	
	.flagshop .compony .followBtnBox .follow {
		color: #fff;
	}
	
	.flagshop .compony .followBtnBox .followed {
		color: #F35163;
	}
	
	.navFixed {
		position: fixed;
		top: 1rem;
		left: 0;
		width: 100%;
		z-index: 997;
	}
	/*.nav-enter-active,
	.nav-leave-active {
		transition: all .5s;
		transform: translate3d(0, -79%, 0)
	}
	
	.nav-enter,
	.nav-leave-to
	/* .fade-leave-active below version 2.1.8 */
	/*{
		transform: translate3d(0, 0, 0)
	}*/
	
	.flagshop .list {
		padding-bottom: 0.73rem;
	}
	
	.flagshop .list .introBox {
		position: relative;
		background: #fff;
	}
	
	.flagshop .list .introBox p {
		font-size: 0.26rem;
		padding: 0.38rem 0.2rem 0.2rem 0.2rem;
	}
	
	.flagshop .list .vux-divider {
		padding-bottom: 0.5rem;
	}
	
	.mineralList {}
	
	.flagshop .footer {
		display: flex;
		font-size: 0.28rem;
		text-align: center;
		border-top: 0.01rem solid #e5e5e5;
		height: 0.94rem;
		align-items: center;
		background: #fff;
		position: fixed;
		bottom: 0;
	}
	
	.flagshop .footer .componyIntroBtn {
		border-right: 0.01rem solid #e5e5e5;
		height: 0.94rem;
		line-height: 0.94rem;
	}
	
	.flagshop .footer .typeBtn {
		flex: 1;
		border-right: 0.01rem solid #e5e5e5;
		height: 0.94rem;
		line-height: 0.94rem;
	}
	
	.flagshop .footer .btnWidthPf {
		flex: 1;
	}
	
	.flagshop .footer .btnWidth {
		flex: 2;
	}
	
	.flagshop .footer .leaveSpeakeBtn {
		flex: 1
	}
	
	.flagshop .list .titleBox {
		background: #Fff;
		width: 7.5rem;
		height: 0.6rem;
	}
	
	.titleBg {
		width: 3.7rem;
		height: 0.63rem;
		position: absolute;
		transform: translateX(50%);
		margin-top: -0.1rem;
	}
	
	.titleBgUrl1 {
		background: url(../../../static/img/flagship/title1.png) no-repeat center center;
		background-size: 3.7rem 0.63rem;
	}
	
	.titleBgUrl2 {
		background: url(../../../static/img/flagship/title2.png) no-repeat center center;
		background-size: 3.7rem 0.63rem;
	}
	
	.titleBgUrl3 {
		background: url(../../../static/img/flagship/title3.png) no-repeat center center;
		background-size: 3.7rem 0.63rem;
	}
	
	.titleBgUrl4 {
		background: url(../../../static/img/flagship/title4.png) no-repeat center center;
		background-size: 3.7rem 0.63rem;
	}
	
	.flagshop .listItem {
		margin: 0.22rem 0 0 0;
	}
	
	.flagshop .list .mallBox {
		position: relative;
	}
	
	.flagshop .list .mallBox .mallList {}
</style>