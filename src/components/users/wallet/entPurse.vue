<template>
	<div class="entPurse">
		<div class="entPurse_top">
			<div align="left">
				<i class="iconfont icon-jiantou-copy" @click="goBack()">&nbsp;我的钱包</i>
			</div>
			<div class="money">
				<div class="available">可用余额（元）</div>
				<span class="m">{{availableBalance}}</span>
				<div class="total">总金额  <span>{{availableBalance}}</span> 元</div>
			</div>
		</div>	
		<tab v-model="index01" prevent-default @on-before-index-change="switchTabItem" active-color="#D29500">
			<tab-item selected>全部</tab-item>
			<tab-item>收入</tab-item>
			<tab-item>支出</tab-item>
	    </tab>
		<ul class="purseCon">
			<my-scroll ref="scroll" @loadmore='getAccount' :isTab="isTab" :total="total" >
		    	<li v-for="(item,index) in accountDataVOS" :key="index">
		    		<div class="use clearfix">
		    			<span class="fl">
		    				{{item.cat == 69?'收入':(item.cat == 75?'支出':(item.cat == 0?'充值':(item.cat ==5?'订单充值':(item.cat ==11?'提现': '支出'))))}}
		    			</span>
		    			<span class="fr"><span>{{item.cat == 69?'+':(item.cat == 75?'-':(item.cat == 0?' ':(item.cat ==5?'-':(item.cat ==11?' ': '-'))))}}</span>{{item.optAmount}}</span>
		    		</div>
		    		<div class="time clearfix">
		    			<span class="fl">{{item.createdTime | fomatDate('yyyy-MM-dd hh:mm:ss') }}</span>
		    		</div>
		    	</li>
	    	</my-scroll>
		</ul>
		<!--<div class="operation clearfix">
			<div class="put_forward">提现</div>
			<div class="recharge">充值</div>
		</div>-->
	</div>
</template>

<script>
	import { cookie } from 'vux';
	import myScroll from '@/components/base/myScroll';
	import {lastPage,appLogin} from '@/assets/commonjs/util.js';
	export default{
		components: {
		    myScroll
		},
		data(){
			return{
				isTab: false,
				total: 0,
				index01: 0,
				index: 0,
				freezingBalance: "0.00 ",//总资产
				availableBalance: "0.00 ",//可用余额
				pageNum: 1,
				numPerPage: 10,
				status: 1,
				type: 99,
				accountDataVOS: [],
			}
		},
		methods: {
			goBack() {					
				lastPage()
			},	
			switchTabItem (index) {
//				this.$vux.loading.show({
//					text: 'loading'
//				})
//				setTimeout(() => {
//					this.$vux.loading.hide()
					this.index01 = index
//				}, 1000)
				this.$refs.scroll.init()
				this.pageNum = 1
				this.isTab = true;
				index ==0 ? this.type = 99 : (index ==1? this.type = 4 :(index == 2 ? this.type = 3: this.type =99))
				this.accountDataVOS = [];
				this.getAccount()
		    },
		    getAccount(){
		    	this.$axios.get(this.$root.urlPath.MCT+'/account/accountList', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
					params: {
						transactionType: this.type,
						status: this.status,
						pageNum: this.pageNum,
						numPerPage: this.numPerPage
					}
				})
				.then(res => {
					if(res.data.success){
						this.isTab = false;
						this.$refs.scroll.loaded();
						this.total = res.data.data.totalCount;
						if(res.data.data.accountDataVOS != null && res.data.data.accountDataVOS != ''){
							this.accountDataVOS = this.accountDataVOS.concat(res.data.data.accountDataVOS);
						}
						//加载下一页
						if(this.total == this.accountDataVOS.length && this.total !== 0){
							this.$refs.scroll.complete()
						}else{
							this.pageNum++
						}
					}
				})
				.catch(err => console.log('个人账户异常',err));
		   	},
		   	getAssets(){
		   		this.$axios.get(this.$root.urlPath.MCT+'/account/account?', {
					params: {
						status: 1
					},
					headers: {
						'MC_UID': cookie.get('MC_UID')
					},
				})
				.then(res => {
					if(res.data.success) {
						let data = res.data.data;	
						this.freezingBalance = data.freezingBalance;
						this.availableBalance = data.availableBalance;
					}
				}).catch(err => console.log('个人账户异常', err));
		    },
		},
		mounted(){
			if(cookie.get('MC_UID')) {
				this.getAccount()
				this.getAssets()
			}else{
				appLogin()
			}
		}
	}
</script>

<style scoped>
	@import url("../../../static/css/user2.0.css");
</style>