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

		<my-scroll ref="scroll" @loadmore='getList' :total="total" >
		<div class="list" v-if="list.lenght !== 0">
			<ul>
				<li v-for="(item,index) in list">
					<div>
					<span class="checkBM" v-show="isMan">
       					<input type="checkbox" class="checkbox" :value="item.id" :id="index" v-model="check"/>
       					<label :for="index"></label>
					</span>

					<hgroup class="titleB">
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
					</div>
				</li>
			</ul>
		</div>
		</my-scroll>
		<footer class="footer allCheckFoot" v-show="isMan && list.length !== 0">
			
			<div class="checkBox">
				<span class="checkBM">
       				<input type="checkbox" class="checkbox" id="check1" :checked="checkedAll" @click="selectAll"/>
       				<label for="check1"></label>
       				<span class="allCheck">全选</span>
				</span>
			</div>
			<button class="btn" @click="del">删除</button>
		</footer>
	</div>
</template>

<script>
	import comHeader from '@/components/base/comHeader'
	import myScroll from '@/components/base/myScroll'
	
	export default {
		components: {
			comHeader,
			myScroll
		},
		data() {
			return {
				isMan: false, //当前为管理
				pageNum:1,
				numPerPage:10,
				list:[],
				total:0,
				check:[],
				checkedAll:false,
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
						if(data.success) {
							this.check = []
							this.$refs.scroll.loaded()
							if(data.data == '暂无数据'){
								this.total = 0
								this.$refs.scroll.complete()
							}else{
								this.list = this.list.concat(data.data.investmentList)
								this.total = data.data.totalCount
							}
							
							
							
							if(this.total == this.list.length && this.total !== 0){
								this.$refs.scroll.complete()
							}else{
								this.pageNum++
							}
						}
					})
					.catch(function(error) {
						alert('异常' + error)
					});
			},
			del(){
				if(this.check.length == 0 ){
					this.$vux.toast.text('请选择要删除的内容', 'center')
					return
				}
				
				this.list = []
				let ids = this.check.join()
				
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapDelMessage', {
						params: {
							ids:ids
						}
					})
					.then(res => {
						var data = res.data
						if(data.success) {
							this.$vux.toast.text('删除消息成功', 'center')
							this.getList()
						}else{
							this.$vux.toast.text('删除消息失败', 'center')
						}
					})
					.catch(function(error) {
						this.$vux.toast.text('删除消息失败', 'center')
					});
			},
			selectAll(event){
				if(!event.currentTarget.checked) {

					this.check = [];

				} else { //实现全选

					this.check = [];
					this.list.forEach((item, i) => {

						this.check.push(item.id);

					});

				}
			}
		},
		watch: {

			check(curVal) {
				if(curVal.length == this.list.length) {
	
					this.checkedAll = true
	
				} else {
	
					this.checkedAll = false
	
				}
	
			}
	
		},
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
		.invest .list li .titleB{
			display:inline-block
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