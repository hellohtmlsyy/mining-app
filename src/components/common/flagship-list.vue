<template>
	<div class="flagshipList">
		<div class="flagList"  ref="listSection">
			<div class="list" v-for="(item,index) in list" :key="index">
				<div class="topA clearfix">
					<div class="fl">
						<img :src="item.img" />
					</div>
					<div class="companyBox fl">
						<div class="company">
							<span class="name">{{item.title}}</span>
							<div class="fr">
								<label>荐</label>
								<label>设备</label>
							</div>
						</div>
						<div class="componyIntro">
							<span>{{ item.vdesc|subStr(20) }}</span>
						</div>
					</div>
					<div class="btnEnter fr" @click="goShop(item)">
						进店
					</div>
				</div>
				<div class="bottomA clearfix">
					<div class="item fl" v-for="(item1,index) in item.items" :key="index">
						<div>
							<img :src="item1.img" />
						</div>
						<div class="textBox">
							<p class="price">&yen;{{item1.price=='0'?'面议':item1.price}}</p>
							<p class="commodityName">{{item1.title|subStr(6)}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: [ 'list'],
		data() {
			return {
				title: "旗舰店",
				index: 0,
			}
		},
		methods:{
			goShop(item){
				window.location.href = this.$root.urlPath.MCM + "/flagship?newpage=newpage&shopId=" + item.id;
			}
		}
	}
</script>

<style>
	/*列表*/
	
	.flagshipList .list {
		margin-bottom: 0.15rem;
		background-color: #fff;
		padding: 0.2rem 0.4rem;
	}
	
	.flagshipList .list img {
		width: 0.75rem;
		height: 0.75rem;
	}
	
	.flagshipList .list .topA .companyBox {
		margin: 0 0.3rem;
		width: 4.6rem
	}
	
	.flagshipList .list .topA .companyBox .name {
		font-size: 0.28rem;
		font-weight: bold;
	}
	
	.flagshipList .list .topA .companyBox label {
		font-size: 0.18rem;
		color: #fff;
		background-color: rgb(241, 145, 73);
		border-radius: 0.05rem;
		padding: 0 0.05rem;
		line-height: 0.37rem;
	}
	
	.flagshipList .list .topA .companyBox label:nth-child(2) {
		background-color: rgb(0, 183, 238);
		margin-left: 0.15rem;
	}
	
	.flagshipList .list .topA .companyBox .componyIntro span {
		font-size: 0.24rem;
		color: rgb(125, 125, 125);
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 0.45rem;
	}
	
	.flagshipList .list .topA .btnEnter {
		font-size: 0.2rem;
		color: rgb(212, 17, 32);
		border: 1px solid rgb(212, 17, 32);
		border-radius: 0.15rem;
		padding: 0.01rem 0.1rem;
	}
	
	.flagshipList .list .bottomA .item {
		border-radius: 0.05rem;
		border: 1px solid rgb(210, 210, 210);
		margin: 0.34rem 0.2rem 0.15rem 0;
	}
	
	.flagshipList .list .bottomA .item:last-child {
		margin-right: 0;
	}
	
	.flagshipList .list .bottomA img {
		width: 2rem;
		height: 1.3rem;
	}
	
	.flagshipList .list .bottomA .textBox {
		padding: 0.1rem;
		background-color: rgb(239, 240, 239);
	}
	
	.flagshipList .list .bottomA .price {
		font-size: 0.2rem;
		color: rgb(214, 33, 47);
		font-weight: 600;
	}
	
	.flagshipList .list .bottomA .commodityName {
		font-size: 0.2rem;
		color: rgb(143, 143, 143);
		line-height: 0.3rem;
	}
</style>