<template>
	<div class="flagshipSearchList">
		<div class="searchHeader">
			<div @click="goSearch">
				<i class="icon iconfont icon-jiantou-copy"></i>
			</div>
			<div class="searchBox" @click="goSearch">
				<icon type="search" class="searchIco"></icon>
				<input type="text" class="myInput" v-model="searchText" disabled="disabled" placeholder="请输入关键字" />
			</div>
			<div class="moreBox" @click="showShortcut = !showShortcut" ref="shortcut">
				<i class="icon iconfont icon-morevert"></i>
				<Shortcut :list="shorcutList" :show="showShortcut" @clickLi="clickLi"></Shortcut>
			</div>
		</div>

		<div class="result">
			<Malllist :shohid="hideSecond" :list="mallList" :imgShow="false"></Malllist>
			<load-more :tip="loadText" v-show="showLoading"></load-more>
			<divider v-show="showEnd">{{endText}}</divider>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { lastPage, isDevice,appLogin,goHomeApp} from '@/assets/commonjs/util.js'
	import Shortcut from '@/components/common/shortcut'
	import Malllist from '@/components/common/Mall-list'
	import {cookie } from 'vux'

	export default {
		components: {
			Shortcut,
			Malllist,
		},
		data() {
			return {
				showShortcut: false,
				hideSecond: false,
				mallList: [],
				searchText: '',
				loadText: '正在加载',
				endText: '已加载所有数据',
				showLoading: false,
				showEnd: false,
				shopId: this.$route.query.shopId,
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
				}],
				componyName: decodeURIComponent(this.$route.query.shareName),

			}
		},
		mounted() {
			if(decodeURIComponent(this.$route.query.key) !== 'undefined') {
				this.searchText = decodeURIComponent(this.$route.query.key)
			}
			this.getSearchResult()

		},
		methods: {
			clickLi(index) {
				if(index == 0) {
					window.location.href = this.$root.urlPath.MCM + "/shopCart?shopId=" + this.shopId + "&shopName=" + this.componyName + "&newpage=newpage"
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
					if(!cookie.get('MC_UID')) {
						appLogin()
						return
					}
					window.location.href = this.$root.urlPath.MCM + "/leaveSpeak?&shopId=" + this.shopId + "newpage=newpage"

				} else if(index == 3) {
					goHomeApp()
				}
			},
			goSearch() {
				lastPage()
			},
			getSearchResult() {
				this.showLoading = true

				axios.get(this.$root.urlPath.MC + '/wap/store.do?storeSearch', {
						params: {
							storeId: this.shopId,
							key: this.searchText
						}
					})
					.then(res => {

						this.showLoading = false
						if(res.data.success) {
							var data = res.data.data
							this.mallList = data
							this.showEnd = true
						} else {
							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						//alert(error)
					});
			}
		}
	}
</script>

<style>
	.flagshipSearchList .searchHeader {
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	
	.flagshipSearchList .searchHeader .weui-icon-search {
		color: #333333;
	}
	
	.flagshipSearchList .searchHeader .searchBox,
	.flagshipSearchList .searchHeader .searchBox input {
		background: #eeeeee;
	}
	
	.flagshipSearchList .myInput::-webkit-input-placeholder {
		color: #757575;
	}
	
	.flagshipSearchList .searchBox {
		width: 5.5rem;
	}
	
	.flagshipSearchList .result {
		margin-top: 1.2rem;
	}
</style>