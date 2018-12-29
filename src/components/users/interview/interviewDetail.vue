<template>
	<div class="interviewDet">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">约谈详情</div>
		</com-header>
		<div class="tips">
			<div class="det">
				<div class="time">{{newsInfo.insert_time | fomatDate('yyyy-MM-dd hh:mm:ss')}}</div>
				<div class="tit">{{newsInfoUser.userName || newsInfoData.name }}</div>
				<div class="con">{{newsInfo.msg}}</div>
				<!-- 商品详情 -->
				<div class="goods int" v-show="(type=='430')">
					<div class="title">约谈商品</div>
					<div class="detail">
						<div class="clearfix">
						<img :src="newsInfoData.img" alt="">
							<div class="r fl">
								<div class="name">{{newsInfoData.title}}</div>
								<div class="fs-24 col-33">售价<span class="col-FF9F00">&nbsp;&nbsp;¥{{newsInfoData.price}}</span></div>
							</div>
							<div class="see" @click="seeDetail('0',newsInfoData.id)">查看</div>
						</div>
						<div class="info">商品简介：{{newsInfoData.vdesc}}</div>
					</div>
				</div>
				<!-- 项目详情 -->
				<div class="pro int" v-show="(type=='230')">
					<div class="title">约谈项目</div>
					<div class="detail">
						<div class="clearfix">
							<img :src="newsInfoData.img" alt="">
							<div class="r fl">
								<div class="name">{{newsInfoData.title}}</div>
								<div class="fs-24 col-33">项目阶段<span class="col-FF9F00">&nbsp;&nbsp;{{newsInfoData.jd}}</span></div>
							</div>
							<div class="see" @click="seeDetail('1',newsInfoData.id)">查看</div>
						</div>
					</div>
				</div>
				<!-- 投资详情 -->
				<div class="inv int" v-show="(type=='260')">
					<div class="title">约谈投资人</div>
					<div class="detail">
						<div class="clearfix">
							<img :src="newsInfoData.logo" alt="">
							<div class="r fl">
								<div class="name">{{ newsInfoData.name}}</div>
							</div>
							<div class="see" @click="seeDetail('2',newsInfoData.id)">查看</div>
						</div>
						<div class="info">投资需求：{{requirement}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		cookie
	} from 'vux';
	export default {
		data() {
			return {
				newsInfo: [],
				newsInfoUser:[],
				newsInfoData:[],
				requirement: '',
				type: this.$route.query.type,
			}
		},
		methods: {
			seeDetail(type,id){
				console.log(type,id)
				if(type==0){//商品
					location.href = this.$root.urlPath.MCM + '/mallCom/details?id=' + id + '&newpage=newpage';
				}else if(type==1){//项目
					location.href = this.$root.urlPath.MCM + '/mineral/projectDetails?id=' + id + '&newpage=newpage';
				}else{//投资
					location.href = this.$root.urlPath.MCM + '/mineral/investorDetails?id=' + id + '&newpage=newpage';
				}
			},
			getDetail() {//项目、商品
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapInterviewInfo', {
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
						params: {
							id: this.$route.query.id
						}
					})
					.then(res => {
						if (res.data.success) {
							this.newsInfo = res.data.data;
							this.newsInfoUser = res.data.data.user;
							this.requirement = res.data.data.investor;
							this.newsInfoData = res.data.data.data || res.data.data.company;
						}
						
					}).catch(err => console.log('账户异常', err));
			},
		},
		mounted() {
			this.getDetail()
		}
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");
	.fs-24{
		font-size: 0.24rem;
	}
	.col-333{
		color: #333;
	}
	.col-FF9F00{
		color: #FF9F00;
	}
	.int{
		margin-top: 0.46rem;
		width: 100;
		border-radius: 0.1rem;
		padding: 0.06rem;
	}
	.goods{
		background-color: #7ECEF4;
	}
	.pro{
		background-color: #ACD598;
	}
	.inv{
		background-color: #FACD89;
	}
	.int .title{
		color: #fff;
		font-size: 0.2rem;
		padding: 0.08rem 0.3rem;
	}
	.int .detail{
		background-color: #fff;
		border-radius: 0.08rem;
		padding: 0.36rem;
		position: relative;
	}
	.inv .detail{
		padding-bottom: 0.9rem;
	}
	.int .detail img{
		border-radius: 0.1rem;
		float: left;
	}
	.goods .detail img,.inv .detail img{
		width: 1rem;
		height: 1rem;
	}
	.pro .detail img{
		width: 1.6rem;
		height: 1.34rem;
	}
	.int .detail .r{
		width: 75%;
		margin-left: 0.3rem;
	}
	.pro .detail .r{
		width: 65%;
	}
	.int .detail .name{
		font-size: 0.3rem;
		color: #333;
		line-height: 0.46rem;
		margin-bottom: 0.1rem;
	}
	.int .detail .see{
		position: absolute;
		right: 0.36rem;
		color: #333;
		font-size: 0.24rem;
		background:rgba(255,255,255,1);
		border:1px solid rgba(160, 160, 160, 1);
		border-radius: 0.1rem;
		padding: 0.08rem 0.16rem;
	}
	.goods .detail .see{
		top: 0.36rem;
	}
	.pro .detail .see,.inv .detail .see{
		bottom: 0.36rem;
	}
	.int .detail .info{
		font-size: 0.2rem;
		color: #707070;
		line-height: 0.36rem;
		margin-top: 0.18rem;
	}
</style>
