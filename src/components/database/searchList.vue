<template>
	<div class="searchList">
		<com-header>
			<div slot="centerA" class="searchBox">
				<icon type="search" class="searchIco"></icon>
				<input type="text" placeholder="搜索名称" class="myInput" v-model="query" />
				<span class="clear" @click.stop="clear" v-show="query"><i class="icon iconfont icon-cuohao"></i></span>
			</div>
			<div slot="rightA" @click="goSearch(query)">搜索</div>
		</com-header>

		<div class="type">
			<group>
				<cell-box is-link @click.native="goSearch('全部')">
					全部
				</cell-box>
			</group>
			<div class="typeList">
				<cell-box is-link @click.native="goSearch(item,1)" v-for="(item,index) in type" :key="index">
					{{item}}
				</cell-box>
			</div>
		</div>

	</div>
</template>

<script>
	import comHeader from '@/components/base/comHeader'
	import { AlertModule } from 'vux';

	export default {
		components: {
			comHeader,
		},
		data() {
			return {
				type: ["澳交所", "多伦多主板", "多伦多创业板", "伦敦主板", "伦敦创业板", "纽约交易所", "约翰内斯堡"],
				query: ""

			}
		},
		mounted() {
			if(this.$route.query.keyWord) {
				this.query = decodeURIComponent(this.$route.query.keyWord)
			}

		},
		methods: {
			clear() {
				this.query = ""
			},

			goSearch(query, exchange) {
				
				this.query = this.query.trim()
				if(!this.query && exchange !== 1 && query !== "全部") {
					this.$vux.toast.text('请输入搜索关键字', 'center');
					return
				}
				//@exchange为按交易所搜索
				window.location.href = this.$root.urlPath.MCM + "/database/list?keyWord=" + query + "&exchange=" + exchange + "&newpage=newpage";
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/searchInput.css");
	.searchList .clear i {
		margin-left: 0.02rem;
		vertical-align: middle;
	}
	
	.searchList .type .typeList {
		background-color: #fff;
		margin-top: 0.15rem;
	}
	
	.searchList .type {
		margin-top: 1.15rem;
	}
	
	.searchList .type .vux-no-group-title {
		margin-top: 0.2rem;
	}
	
	.searchList .type .weui-cell_access {
		height: 0.9rem;
		font-size: 0.28rem;
	}
	
	.searchList .type .weui-cell_access.vux-cell-box:after {
		width: 0.12rem;
		height: 0.12rem;
	}
	
	.searchList .searchBox {
		width: 5.6rem;
	}
</style>