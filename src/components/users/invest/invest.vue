<template>
	<div class="invest">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">
				预约投资
			</div>
			<div slot="rightA" @click="man">
				{{isMan ? '完成' : '管理' }}
			</div>
		</com-header>
		
		<!--<my-scroll ref="scroll" @loadmore='getMallList' :isTab="isTab" :total="total" >-->
		<div class="list">
			<ul>
				<li v-for="(item,index) in list">
					<span class="checkBM" v-show="isMan">
       					<input type="checkbox" class="checkbox" id="check"/>
       					<label for="check"></label>
					</span>

					<hgroup class="titleB" @click="goDetails">
						<div class="rowM1">
							<h1>{{item.title}}</h1>
							<time>{{item.insert_time  | fomatDate('yyyy-MM-dd hh:mm:ss')}}</time>
						</div>
						<div>
							<div class="price">
								<h2>投资金额</h2><strong>{{item.invest_money | smallN(2)}}</strong></div>
							<span class="unit">{{item.currency}}</span>
						</div>
					</hgroup>

				</li>
			</ul>
		</div>
		<!--</my-scroll>-->
		<footer class="footer allCheckFoot" v-show="isMan">
			
			<div class="checkBox">
				<span class="checkBM">
       				<input type="checkbox" class="checkbox" id="check1"/>
       				<label for="check1"></label>
       				<span class="allCheck">全选</span>
				</span>
			</div>
			<button class="btn">删除</button>
		</footer>
	</div>
</template>

<script>
	import comHeader from '@/components/base/comHeader'
	export default {
		components: {
			comHeader
		},
		data() {
			return {
				isMan: false, //当前为管理
				pageNum:1,
				numPerPage:10,
				list:[],
			}
		},
		mounted(){
			this.getList()
		},
		
		methods: {
			goDetails() {
				if(this.isMan) return
				window.location.href = this.$root.urlPath.MCM + "/invest/details?newpage=newpage"
			},
			man() {
				this.isMan = !this.isMan
			},
			getList(){
			
				this.$axios.get(this.$root.urlPath.MC + '/wap/enterpriseCenter.do?reservationInvestment', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage
						}
					})
					.then(res => {
						var data = res.data
						this.list = this.list.concat(data.data)
						
						console.log(this.list)
//						if(data.success) {
//							this.databaseList = this.databaseList.concat(data.data.list)
//							this.total = data.data.totalCount
//
//							if(this.total == this.databaseList.length) {
//								this.droploadDowm = true
//							}
//						}
					})
					.catch(function(error) {
						alert('服务异常' + error)
					});
			}
		}
	}
</script>

<style scoped>
		@import url("../../../static/css/allCheckFoot.css");
		@import url("../../../static/css/checkBox.css");
		.invest .list .checkBM{
			margin-right: 0.6rem;
		}
		.invest .list .checkBM .checkbox+label{
			margin-top: 0.2rem;
		}
		.invest .list {
			margin-top: 1.16rem;
		}
		.invest .list li {
			margin: 0.16rem 0;
			background: #fff;
			padding: 0.46rem 0.2rem;
			display: flex;
		}
		.invest .list li .rowM1 {
			margin-bottom: 0.17rem;
		}
		.invest .list li h1 {
			display: inline-block;
			width: 4.1rem;
			font-size: 0.28rem;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 0.36rem;
		}
		.invest .list li time {
			font-size: 0.22rem;
			color: rgba(117, 117, 117, 1);
		}
		.invest .list li h2 {
			display: inline-block;
			font-size: 0.22rem;
			color: rgba(117, 117, 117, 1);
		}
		.invest .list li .price {
			width: 4.1rem;
			display: inline-block;
		}
		.invest .list li strong {
			font-size: 0.26rem;
			color: #ff7522;
			margin-left: 0.2rem;
		}
		.invest .list li .unit {
			font-size: 0.25rem;
		}
</style>