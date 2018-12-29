<template>
	<div class="databaseList">
		<com-header title="全球数据库">
			<div slot="rightA" class="searchBox" @click="goSearch">
				<icon type="search" class="searchIco"></icon>
				<input type="text" placeholder="请输入关键字" readonly class="myInput" v-model="keyWord" />
			</div>
		</com-header>
		<div>
		<x-table class="table" :cell-bordered="false">
			<thead>
				<tr>
					<th>名称</th>
					<th>交易所</th>
					<th>股票代码</th>
				</tr>
			</thead>
			<tbody ref="list">
				<tr @click="toDetails(item.id)" v-for="(item,index) in databaseList" :key="index">
					<td>{{item.NAME}}</td>
					<td class="dissFont">{{item.market_exchange}}</td>
					<td class="dissFont">{{item.symbol }}
					</td>
				</tr>
			</tbody>
		</x-table>
		</div>
		<load-more :tip="loadingCon" :show-loading="jieliu" v-show="jieliu"></load-more>
		<divider v-show="droploadDowm">已加载所有数据</divider>
	</div>
</template>

<script>
	import comHeader from '@/components/base/comHeader'
	import { XTable, cookie } from 'vux';
	import { appLogin } from '@/assets/commonjs/util.js';

	export default {
		components: {
			comHeader,
			XTable
		},
		data() {
			return {
				databaseList: [],
				pageNum: 1,
				numPerPage: 20,
				total: '',
				jieliu: false,
				loadingCon: '正在加载',
				droploadDowm: false,
				keyWord: '',
				isVip: ''
			}
		},
		mounted() {
			window.addEventListener("scroll", this.handleScroll)
			if(this.$route.query.keyWord) {
				this.keyWord = decodeURIComponent(this.$route.query.keyWord)

			}

			if(this.keyWord && this.keyWord !== "全部") {
				this.getSearchList()
			} else {
				this.getDatabaseList()
			}

		},
		methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var height = this.$refs.list.offsetHeight
				var viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				if(scrollTop + viewH >= height && this.databaseList.length < this.total && this.jieliu == false) {
					this.pageNum++

						if(this.keyWord && this.keyWord !== "全部") {
							this.getSearchList()
						} else {
							this.getDatabaseList()
						}
				}
			},
			goSearch() {
				if(this.keyWord == undefined) {
					this.keyWord = ""
				}
				window.location.href = this.$root.urlPath.MCM + "/database/searchList?keyWord=" + this.keyWord + "&newpage=newpage";
			},
			toDetails(id) {
				//第一步登录
				if(!cookie.get('MC_UID')) {
					appLogin()
					return
				}
				//第二步认证会员
				this.getIsVip(id)

			},
			getDatabaseList() {
				this.jieliu = true
				this.$axios.get(this.$root.urlPath.MC + '/wap/globalDb.do?globalDb', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						this.jieliu = false
						var data = res.data

						if(data.success) {
							this.databaseList = this.databaseList.concat(data.data.list)
							this.total = data.data.totalCount

							if(this.total == this.databaseList.length) {
								this.droploadDowm = true
							}
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			getSearchList() {
				this.jieliu = true
				//@exchange：按交易所筛选时为1，否则为空
				var exchange = this.$route.query.exchange
				if(exchange == "undefined") {
					exchange = ''
				}

				this.$axios.get(this.$root.urlPath.MC + '/wap/globalDb.do?search', {
						params: {
							keyWord: this.keyWord,
							exchange: exchange,
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					}).then(res => {
						this.jieliu = false
						var data = res.data
						if(data.success) {
							this.databaseList = this.databaseList.concat(data.data.list)
							this.total = data.data.totalCount

							if(this.total == this.databaseList.length) {

								this.droploadDowm = true
							}
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			getIsVip(id) {
				this.$axios.get(this.$root.urlPath.MC + '/wap/globalDb.do?vip').then(res => {
						var data = res.data
						if(data.success) {
							this.isVip = data.data
							if(!data.data) {
								this.$vux.confirm.show({
									title: 'VIP专享服务',
									content: '全球数据库仅供VIP会员查看。VIP会员可查看千条付费数据、终生享受矿业圈组织的投资融资论坛~',
									onCancel() {

									},
									onConfirm() {
										window.location.href = "//www.miningcircle.com/act.do?act20170810="
									}
								})
							} else {
								window.location.href = this.$root.urlPath.MCM + "/database/details?id=" + id + "&newpage=newpage";
							}
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			clear() {
				this.keyWord = ''
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/searchInput.css");
	.databaseList .table {
		margin-top: 1rem;
		background: #fff;
	}
	.databaseList .searchBox {
		width: 4.3rem;
	}

</style>
