<template>
	<div class="vip">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">
				会员特权服务
			</div>
		</com-header>
		<div class="content">
			<h1>矿业圈VIP会员全新上线</h1>
			<div class="list">
				<ul>
					<li :class="{borderCss:index == cur}" v-for="(item,index) in classify" :key="index" @click="cur = index">
						<span class="lab">{{item.name}}</span>
						<div class="text">
							<span class="month">12个月</span>
							<span class="priceB">
								<span class="price-logo">￥</span>
								<span class="price">{{item.price}}</span>
							</span>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="wrap">


		<div class="content2">
			<div class="introB">
				<h2>白银会员权益</h2>
				<div class="intro">
					<p>1. 开设旗舰店后，成为矿业圈明星旗舰店，店内产品成为明星产品，旗舰店在首页及所属相关行业首页位置推荐，产品和需求在商城和求购大厅置顶推荐
					</p>
					<p>2. 矿业圈PC端网站、移动端APP 的Banner展示广告服务每季度一次，4次/年，每次一周（7天）可以公司简介，也可是产品推荐
					</p>
					<p>3. 确保公司宣传或产品简介能到达2万个行业用户，精准发送邮件（中文及免费翻译成英文）给全球相关客户1万封，短信定向推送1万个，确保公司旗舰店和产品点击率不低于1万次
					</p>
					<p>
						4. 全年举办4次交易大会，北京及全国各地，免费参加并享有展台一个、论坛10分钟路演
					</p>
					<p>
						5. 企业名称及产品的关键词收入矿业圈百度、360、搜狗搜索
					</p>
					<p>
						6. 下游客户：免费查看下游客户信息，并可咨询矿业圈服务专员所需信息上游供应：免费查上游供应商，并可咨询矿业圈服务专员相关信息季度免费获取矿业圈同行销售数据一份
					</p>
					<p>
						7. 清蓝矿业圈3万粉丝头条每月一次广告服务（公司推广及产品推荐）
					</p>
					<p>
						8. 求购大厅：买方角色发布，发布的求购信息在首页及相关频道页优先排序卖方角色报价，第一时间发给买方，并有专员提供一对一服务
					</p>
					<p>
						10. 商城频道:产品优先作为推荐产品，并能够查阅所有卖家、买家联系方式
					</p>
				</div>
			</div>

			<div class="introB">
				<h2>黄金会员会员权益</h2>
				<div class="intro">
					<p>1. 开设旗舰店后，成为矿业圈明星旗舰店融资方：成为全球投资频道的明星项目，在矿业圈页推荐，在融资项目置顶推荐投资方：为全球投资频道的明星投资，在矿业圈首页推荐，在投资人列表置顶推荐
					</p>
					<p>2. 矿业圈PC端网站、移动端APP 的首页Banner展示广告服务每季度一次，4次/年，每次一周（7天）投资方或项目方可以展示一个月
					</p>
					<p>3. 项目方确保能达到1000个潜在投资人，推广矿权发送邮件1万封，短信定向推送1万个投资方确保能达到1000个项目方，推广投资方发送中英文邮件（国内外，海外免费翻译成英文）1万封，短信定向推送1万个
					</p>
					<p>
						4. 投资方：免费查看全球数据库、优质矿权项目等收费内容融资方：免费查看所有投资方详细信息，并可直接联系投资方或委托矿业圈约谈与投资方见面
					</p>
					<p>
						5. 融资方对接：确保项目能将融资项目送达1千个潜在投资人，并约见30位潜在投资客户投资方对接：确保每年收到拟投方向的精准100个项目，并约见30位潜在融资项目方代表
					</p>
				</div>
			</div>

			<div class="introB">
				<h2>钻石会员权益</h2>
				<div class="intro">
					<p>1. 开设旗舰店后，成为矿业圈战略合作伙伴，享有VIP会员和黄金会员的所有权益，并作为战略合作伙伴旗舰店在线上和线下优先推荐在矿业圈首页作为合作伙伴置顶推荐
					</p>
					<p>2. PC端网站、移动端APP 的首页Banner展示广告服务每月一次，12次/年，每次一周（7天）
					</p>
					<p>3. 享受VIP会员及黄金会员的所有权益并享有定制广告推广服务：基于矿业圈多年行业积累和推广经验，带领专家团队现场拜访客户的企业进行走访及收集资料，为客户量身定做推广整体解决方案
					</p>
					<p>
						4. 享有VIP会员及黄金会员的所有权益，并独享由客户提出的定制数据服务,推送服务
					</p>
					<p>
						5. 大宗撮合：享有VIP会员及黄金会员的所有权益，并独享由客户提出的定制对接服务矿业圈多年积累了全球大量的全产业链企业，为会员为企业寻找上下游核心合作伙伴，提供国内外供求信息
					</p>
					<p>
						6. 降本增效解决方案：全方位矿山服务方案，享受矿业圈专家组的诊断服务，根据客户要求，
带领专业顶级专家团队走访企业，并形成解决方案提交企业，确保企业开源节流并争取让企业效益增加5%以上
					</p>
				</div>
			</div>
		</div>
		</div>
		<footer>
			<div class="left">
				<div class="priceBox">
					<label class="lab">总计:</label>&nbsp;&nbsp;
					<span class="price-logo">￥</span>
					<span class="price">{{classify[cur].price}}</span>
				</div>
				<div class="text">
					您已选择{{cur== 0 ? '白银' : (cur== 1 ? '黄金' : (cur == 2 ? '钻石' : ''))}}VIP会员,12个月套餐
				</div>
			</div>
			<button class="btn" @click="pay">
				确认支付
			</button>
		</footer>
	</div>
</template>

<script>
	import comHeader from '@/components/base/comHeader'
	import {isDevice,appLogin} from '@/assets/commonjs/util.js'
	import {cookie} from 'vux';

	export default {
		components: {
			comHeader
		},
		data(){
			return {
				classify:[{
					name:'白银会员',
					id:'USER-LEVEL-SILVER',
					price:'9800',
				},{
					name:'黄金会员',
					id:'USER-LEVEL-GOLD',
					price:'19800',
				},{
					name:'钻石会员',
					id:'USER-LEVEL-DIAMOND',
					price:'49800',
				}],
				cur:0,
				orderId:''
			}
		},
		methods:{
			pay(){
				if(cookie.get("MC_UID")) {
					this.addCart()
				} else {
					appLogin()
				}

			},
			addCart() {
				this.addCartApi(() => {
					this.getCartList(() => {
						window.location.href = this.$root.urlPath.MCM + "/mall/orderCom_balance?newpage=newpage";
					})
				})
			},
			addCartApi(callback) {
				this.$axios.get(this.$root.urlPath.MC + '/wap/mall.do?addCart', {
						params: {
							id: this.classify[this.cur].id,
							quantity: 1,

						},
					}).then(res => {

						if(res.data.success) {

							callback()

						} else {
							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			getCartList(callback) {
				this.$axios.get(this.$root.urlPath.MC + '/wap/trade.do?normalPurchaseCartList')
					.then(res => {

						if(res.data.success) {
							var data = res.data.data
							for(var i in data) {
								if(data[i].id == this.classify[this.cur].id) {
									this.orderId = data[i].oid
								}
							}

							if(typeof(Storage) !== "undefined") {
								var shop = {
									orderId: this.orderId
								}
								shop = JSON.stringify(shop)
								localStorage.setItem('shop', shop);
							} else {
								alert("抱歉! 您的浏览器不支持 web 存储。")
							}

							callback()
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
		}
	}
</script>

<style scoped>
	.vip .wrap{
		margin-bottom:1rem ;
	}
	.vip .content{
		margin-top: 1rem;
		background: #fff;
		padding: 0.2rem;
	}
	.vip .content h1{
		font-size: 0.3rem;
		margin-bottom: 0.2rem;
	}
	.vip .content .list ul{
		display: flex;
		justify-content: space-between;
	}
	.vip .content .list ul .borderCss{
		border: 0.03rem solid #F6E9CB;
		background: #f9efd8;
	}
	.vip .content .list ul li{
		width: 2rem;
		height: 2.4rem;
		border:0.03rem solid #F3F2F3;
		border-radius: 0.05rem;
		position: relative;
	}
	.vip .content .list ul li .text{
		text-align: center;
		margin-top: 0.62rem;

	}
	.vip .content .list ul li .lab{
		background: #373737;
		color: #DEC594;
		font-size: 0.25rem;
		padding: 0.05rem 0.1rem;
		border-radius: 0.1rem;
		border-top-left-radius:0 0.05rem;
		position: absolute;
		top: -0.1rem;
	}
	.vip .content .list ul li .month{
		font-size: 0.38rem;
		color: #636260;
	}
	.vip .content .list ul li .priceB{
		display: inherit;
		color:#AD7250;
	}
	.vip .content .list ul li .price-logo{
		font-size: 0.2rem;
	}
	.vip .content .list ul li .price{
		font-size: 0.4rem;
		font-weight: bold;
		color: #ad7250;
	}
	.vip .content2{
		margin-top: 0.15rem ;
		background: #fff;
		padding: 0.3rem;
	}
	.vip .content2 h2{
		font-size: 0.3rem;
		margin-bottom: 0.2rem;

	}
	.vip .content2 .introB{
		margin-bottom: 0.2rem;
	}
	.vip .content2 .intro{
		font-size: 0.24rem;
		line-height: 0.4rem;
		margin-left: 0.2rem;
	}

	.vip footer{
		height: 1.2rem;
		display: flex;
		justify-content: space-between;
		background: #fff;
		border-top: 1px solid #F3F2F3;
		position: fixed;
		bottom: 0;
		width: 100%;
		align-items: center
	}
	.vip footer .left{
		margin-left: 0.25rem;
	}
	.vip footer .priceBox{
		margin-bottom: 0.06rem;
	}
	.vip footer .priceBox .lab{
		font-size: 0.26rem;
	}
	.vip footer .priceBox .price{
		font-size: 0.4rem;
		font-weight: bolder;
		color:#AD7250;
	}
	.vip footer .priceBox .price-logo{
		font-size: 0.26rem;
		color:#AD7250;
	}
	.vip footer .text{
		font-size:0.23rem;
		color: #494949;
	}
	.vip footer .btn{
		background: linear-gradient(90deg,#f0c284 0%,#c6985a 100%);
		margin: 0;
		padding: 0;
		border: 1px solid transparent;
		outline: none;
		padding: 0.38rem 0.56rem;
		font-size: 0.34rem;
		color: #75502D;
		font-weight: 600;
		border: none;
	}
</style>
