<template>
	<div class="market">
		<com-header :title="headerTitle">
			<div slot="rightA" class="rightA" ref="shorcut">
				<div @click="clickShortcut">
					<span>{{shorcutList[curTypeIndex].text}}</span>
					<i :class="showShortcut ? 'icon iconfont icon-jiantou-copy-copy-copy' : 'icon iconfont icon-iconfontjiantou'"></i>
				</div>
				<short-cut :list="shorcutList" :show="showShortcut" @clickLi="clickLi" @showHideShortcut="showHideShortcut">
				</short-cut>
			</div>
		</com-header>
		<x-table class="table" :cell-bordered="false" v-show="marketList.length !== 0">
			<thead>
				<tr>
					<th>资源名称</th>
					<th>最新价</th>
					<th>涨跌幅</th>
				</tr>
			</thead>
			<tbody ref="list">
				<tr v-for="(item,index) in sortMarketList" :key="index" @click="toDetails">
					<td>{{item.name}}</td>
					<td class="dissFont">{{item.price}}</td>
					<td class="dissFont">{{item.riratio | filterRiratio}}</td>
				</tr>
			</tbody>
		</x-table>
		<load-more :tip="loadingCon" :show-loading="jieliu" v-show="jieliu"></load-more>
		<divider v-show="droploadDowm">已加载所有数据</divider>
	</div>
</template>

<script>
	import comHeader from '@/components/base/comHeader'
	import shortCut from '@/components/common/shortcut'
	import { XTable } from 'vux';

	export default {
		components: {
			comHeader,
			shortCut,
			XTable
		},
		data() {
			return {
				shorcutList: [{
					text: '全部矿种',
					ico: '../../../static/img/market/ico5.png',
				}, {
					text: '金属矿种',
					ico: '../../../static/img/market/ico3.png',
					floor: 1
				}, {
					text: '有色金属',
					ico: '../../../static/img/market/ico7.png',
					floor: 2
				}, {
					text: '黑色金属',
					ico: '../../../static/img/market/ico2.png',
					floor: 3
				}, {
					text: '能源矿产',
					ico: '../../../static/img/market/ico4.png',
					floor: 4
				}, {
					text: '稀有金属',
					ico: '../../../static/img/market/ico6.png',
					floor: 5
				}, {
					text: '非金属',
					ico: '../../../static/img/market/ico1.png',
					floor: 6
				}],
				showShortcut: false,
				headerTitle: '涨跌榜',
				pageNum: 1,
				numPerPage: 20,
				curTypeIndex: 0,
				marketList: [],
				total: '',
				jieliu: false,
				loadingCon: '正在加载',
				droploadDowm: false
			}
		},
		mounted() {
			//			document.addEventListener("click", (e) => {
			//				if(!!this.$refs.shortcut.contains(e.target)) return
			//				this.showShortcut = false
			//			})
			window.addEventListener("scroll", this.handleScroll)
			this.getMarketList()
		},
		computed: {
			sortMarketList(){
				return this.sortNumber(this.marketList,"riratio")
			}
		},
		filters: {
			filterRiratio(value) {
				 if (!value) return ''
				return (value * 100).toFixed(2) + '%'
			}
		},
		methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var height = this.$refs.list.offsetHeight
				var viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				//				console.log(scrollTop,viewH,height)
				if(scrollTop + viewH >= height && this.marketList.length < this.total && this.jieliu == false) {
					this.pageNum++
						this.getMarketList()
				}
			},
			clickShortcut() {
				this.showShortcut = !this.showShortcut
			},
			clickLi(index) {
				this.curTypeIndex = index
				this.showShortcut = !this.showShortcut
				this.marketList = []
				this.pageNum = 1
				this.droploadDowm = false
				this.getMarketList()
			},
			showHideShortcut(show) {
				this.showShortcut = !show
			},
			getMarketList() {
				this.jieliu = true
				this.$axios.get('http://192.168.1.243:8082/wap/home.do?marketList', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
							floor: this.shorcutList[this.curTypeIndex].floor,
						}
					})
					.then(res => {
						this.jieliu = false

						if(res.data.success) {
							let data = res.data.data
							for(let i in data.list) {
								this.marketList.push(data.list[i])
							}

							this.total = data.totalCount

							if(this.total == this.marketList.length) {
								this.droploadDowm = true
							}
						}
					})
					.catch(function(error) {
						console.log(error)
					});
			},
			toDetails() {
				//				window.location.href = this.$root.urlPath.MCM + "/market/details?newpage=newpage"
			},
			sortNumber(array,key){
				return array.sort((a,b)=>{
					var x = a[key]
					var y = b[key]
					return ((x<y)? -1 :(x>y)? 1 :0)
				})
			},
		}
	}
</script>

<style scoped>
	@import url("../../static/css/market.css");
	.market .table {
		margin-top: 1rem;
		background: #fff;
		font-size: 0.24rem;
	}
</style>
