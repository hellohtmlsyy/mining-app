<template>
	<div class="ExhibitionDetails">
		<div class="top">
			<open-app></open-app>
			<div class="image_box">
				<img :src="meetingDetailsList.img" />
				<div class="revert" @click='back'>
					<i class="icon iconfont icon-jiantou3"></i>
				</div>
				<div class="info" @click="share">
					<i class="icon iconfont icon-tubiao212"></i>
				</div>
			</div>
			<div class="channelDetailText">
				<div>
					<span class="title">{{meetingDetailsList.title}}</span>
				</div>
				<div class="small_content">
					<div class="row">
						<div class="fl">
							<label>时间</label>
						</div>
						<div class="dateBox">
							<span>
								{{meetingDetailsList.begin_time}}至{{meetingDetailsList.end_time}}({{meetingDetailsList.begin_time}}报名截止)
							</span>
						</div>
					</div>
					<div class="clearfix row">
						<label>地点</label>
						<span>
								{{meetingDetailsList.location}}{{meetingDetailsList.province}}{{attrib}}
							</span>
					</div>
					<div class="clearfix row">
						<label>规模</label>
						<span>
								{{meetingDetailsList.length}}人
							</span>
					</div>
					<div class="row">
						<label class="spanBox">售价</label>
						<span class="price_span colorr" style="color:red">{{ticketlist[checkTicket-1] && ticketlist[checkTicket-1].ticket_money | converAmount(2)}}</span>
						<!--<span v-show="item.ticket_name == '免费'">免费</span>-->
					</div>
					<div class="row clearfix">
						<label class="spanBox fl">票种</label>
						<!--<span class="ticket" :class="item.ticket_name == '免费' ? 'ticketM' : 'ticketS'" v-for="item in ticketlist">{{item.ticket_name}}{{item.ticket_money}}</span>-->
						<div class="fl">
							<checker v-model="checkTicket" default-item-class="demo5-item" selected-item-class="demo5-item-selected" >
								<checker-item v-for="i in indexTicketType" :key="i" :value="i">{{ticketType[i-1]}}<span class="priceColor">{{ticketlist[checkTicket-1].ticket_money | converAmount(2)}}</span></checker-item>
							</checker>
						</div>

						<!--<div class="signUpBtn fr" v-show="false">报名截止</div>-->
					</div>
					<div class="row clearfix">
						<div class="signUpBtn fr" :style="{'background-color':type=='现在报名' ? '#ff4f54' : '#D2D2D2'}" @click="singUp">{{type}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="channelTab" v-for="(item,index) in mcardlist" :key="index">
			<div class="topA">
				<div class="titleBox">
					会议通知
				</div>
				<div class="line"></div>
			</div>
			<div class="bottomA content" v-html="item.content">
			</div>
		</div>
		<div class="flagshipS" @click="goShop">
			<div class="topA clearfix">
				<div class="fl">
					<img :src="companyInfo.logo" />
				</div>
				<div class="companyBox fl">
					<div class="company">
						<p class="name clamp">{{companyInfo.name}}</p>
					</div>
					<div class="componyIntro">
						<p class="clamp">{{companyInfo.introduction}}</p>
					</div>
				</div>
				<div class="btnEnter fr">
					进店看看
				</div>
			</div>
		</div>
		<div class="shareMC" :style="{display:shareMC}" @click="shareMCClick"></div>
		<actionsheet v-model="show1" :menus="shareType" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')" @on-click-menu-type1="shareWX" @on-click-menu-type2="sharePYQ" @on-click-menu-type3="shareWB" @on-click-menu-type4="shareQQKJ"></actionsheet>
	</div>
</template>

<script>
	const loginUrl = 'http://member.miningcircle.com/login?where=mineral';

	import { Tab, TabItem, Sticky, Swiper, SwiperItem, cookie, Checker, CheckerItem } from 'vux'
	import axios from 'axios'
	import { getTime2, getAppShare ,isDevice,ShareTip,appLogin} from '@/assets/commonjs/util.js'
	import openApp from '@/components/base/openApp'

	export default {
		components: {
			Tab,
			TabItem,
			Sticky,
			Swiper,
			SwiperItem,
			Checker,
			CheckerItem,
			openApp
		},
		data() {
			return {
				show1:false,
				shareMC: 'none', //分享蒙层显示隐藏
				shareType: {
					type1: '分享到微信',
					type2: '分享到朋友圈',
					type3: '分享到微博',
					type4: '分享到qq空间'
				},
				column: ['会展详情', '评论'],
				selected: "会展详情",
				index: 0,
				meetingDetailsList: [],
				haha: '',
				type: '',
				ticketlist: '',
				mcardlist: '',
				companyInfo: '',
				attrib: '',
				priceRange: '',
				
				ticketType: [],
				indexTicketType: [],
				checkTicket: 1,
				ticketNum:''
			}
		},
		mounted() {
			this.getMeetingDetailsList()
		},
		methods: {
			console() {

			},
			share() {
				if(isDevice() == "其他浏览器") {
					this.show1 = true
					
				}else{
					getAppShare(window.location.href, this.meetingDetailsList.title, this.meetingDetailsList.img, this.meetingDetailsList.begin_time, "")
				}
				
			},
			shareMCClick(){
				this.shareMC = 'none'
			},
			shareWX(){
				this.shareMC = 'block'
			},
			sharePYQ(){
				this.shareMC = 'block'
			},
			shareWB(){
				var share1 = new ShareTip();
					share1.sharetosina(
						this.meetingDetailsList.title,
						window.location.href,
						this.meetingDetailsList.img,

					);
			},
			shareQQKJ(){
				var share1 = new ShareTip();
					share1.sharetoqqzone(
						this.meetingDetailsList.title,
						window.location.href,
						this.meetingDetailsList.img,
						this.meetingDetailsList.begin_time
				);
			},
			singUp() {
				if(this.type !== '现在报名') {
					return
				}
				if(this.checkTicket.length == 0){
					this.$vux.alert.show({
						title: '提示',
						content: "请选择票种",
					})
					return
				}
				if(this.ticketlist[this.checkTicket - 1].ticket_money == 0 || this.ticketType[this.checkTicket - 1] == '免费'){
					var status = '免费'
				}
				
				if(cookie.get('MC_UID')) {
					this.$axios.get(this.$root.urlPath.MC + '/meeting.do?isticket', {
						params: {
							tid: this.ticketlist[this.checkTicket - 1].id
						}
					})
					.then(res => {
						var data = res.data
						if(data.success) {
							this.ticketNum = data.obj
							if(this.ticketNum == 0){
								this.$vux.alert.show({
								  title: '提示',
								  content: '没有剩余票数了',
								  onShow () {
								   
								  },
								  onHide () {
								    
								  }
								})
							}else{
								if(typeof(Storage) !== "undefined") {
									var singUp = {
										meetTitle: this.meetingDetailsList.title,
										pid: this.ticketlist[this.checkTicket - 1].id,
										status: status,
									}
									singUp = JSON.stringify(singUp)
									localStorage.setItem('singUp', singUp);
								} else {
									alert("抱歉! 您的浏览器不支持 web 存储。")
								}
								window.location.href = this.$root.urlPath.MCM + "/exhibition/exlist?newpage=newpage&id=" + this.$route.query.id;
							}
						}
					})
					.catch(function(error) {
						console.log('异常' + error)
					});

				} else {
					appLogin()
				}
			},
			back() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
					this.$router.go(-1)
				}
			},
			getMeetingDetailsList() {
				axios.get(this.$root.urlPath.MC + '/wap/meeting.do?meetingDetail', {
						params: {
							meetingId: this.$route.query.id
						}
					})
					.then(res => {
						var data = res.data

						if(data.success) {
							this.meetingDetailsList = data.data.meet
							this.ticketlist = data.data.ticketlist

							this.mcardlist = data.data.mcardlist
							this.companyInfo = data.data.companyInfo
							this.attrib = data.data.meet.attrib[0].value

							//计算售价区间
							let priceArr = []
							for(var i in this.ticketlist) {
								priceArr.push(this.ticketlist[i].ticket_money)
								this.ticketType.push(this.ticketlist[i].ticket_name)
							}
							for(var i in this.ticketType) {
								this.indexTicketType.push(Number(i) + 1)
							}

							priceArr.sort((a, b) => {
								return a - b
							})
//							如果不止一种票且价格不为0,售价显示区间;如果为0显示免费；如果只有一种票,售价显示一种的票价，若为0显示 免费

//							if(this.ticketlist.length > 1) {
//								if(priceArr[0] == 0 && priceArr[priceArr.length - 1] == 0) {
//									this.priceRange = '免费'
//
//								} else {
//									this.priceRange = priceArr[0] + '到' + priceArr[priceArr.length - 1] + '之间'
//								}
//							} else {
//								
//								
////								if(this.ticketlist[0].ticket_money) {
//									this.priceRange = this.ticketlist[0].ticket_money
////								}
//							}

							var jztime = new Date(this.meetingDetailsList.begin_time.replace(/-/g, "/"));
							if(new Date().getTime() < jztime) {
								this.type = '现在报名'
							} else {
								this.type = '报名截止'
							}

						} else {

						}
					})
					.catch(function(error) {

					});
			},
			goShop(){
				window.location.href = this.$root.urlPath.MCM + "/flagship?newpage=newpage&shopId=" + this.companyInfo.companyId;
			}
	},
	}
</script>

<style>
	.content p {
		margin-left: 0 !important;
	}
	
	.ExhibitionDetails .content table{
		width: 100% !important;
	}
	.ExhibitionDetails .image_box {
		 position: relative;
	}
	.channelTab img {
		width: 100% !important;
		height: auto;
	}
	
	.ExhibitionDetails .top .image_box img {
		width: 7.5rem;
		height: 4.2rem;
		position: relative;
	}
	
	.ExhibitionDetails .top .revert,
	.ExhibitionDetails .info {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0.6rem;
		background-color: rgba(119, 110, 93, .6);
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0.2rem;
	}
	
	.ExhibitionDetails .top .revert {
		left: 0.2rem;
	}
	
	.ExhibitionDetails .top .icon-jiantou3,
	.icon-tubiao212 {
		font-size: 0.3rem;
		color: #fff
	}
	
	.ExhibitionDetails .top .info {
		right: 0.2rem;
	}
	
	.ExhibitionDetails .top .detail_text {
		padding: 0.2rem;
		background-color: #fff;
		font-size: 0.24rem;
	}
	
	.ExhibitionDetails .small_content .priceColor {
		color: red;
	}
	
	.ExhibitionDetails .channelDetailText label {
		margin-right: 0.2rem;
	}
	
	.ExhibitionDetails .channelDetailText .dateBox {
		margin-left: 0.77rem;
	}
	
	.ExhibitionDetails .channelDetailText .colorr {
		color: red;
		line-height: 0.5rem
	}
	
	.ExhibitionDetails .channelDetailText .ticket {
		width: 0.65rem;
		height: 0.48rem;
		line-height: 0.48rem;
		text-align: center;
		margin-top: 0.08rem;
	}
	
	.ExhibitionDetails .channelDetailText .ticketS {
		background: url(../../../static/img/ico2.png) no-repeat center center;
		background-size: 0.65rem 0.48rem;
		margin-right: 0.2rem;
	}
	
	.ExhibitionDetails .channelDetailText .ticketM {
		background: url(../../../static/img/ico1.png) no-repeat center center;
		background-size: 0.65rem 0.48rem;
	}
	
	.ExhibitionDetails .channelDetailText .signUpBtn {
		font-size: 0.32rem;
		color: #fff;
		line-height: 0.7rem;
		padding: 0 0.2rem;
		border-radius: 0.05rem;
	}
	/*vux里checklist样式*/
	
	.box {
		padding: 0 15px;
	}
	
	.demo1-item {
		border: 1px solid #ececec;
		padding: 5px 15px;
	}
	
	.demo1-item-selected {
		border: 1px solid green;
	}
	
	.demo2-item {
		width: 40px;
		height: 40px;
		border: 1px solid #ccc;
		display: inline-block;
		border-radius: 50%;
		line-height: 40px;
		text-align: center;
	}
	
	.demo2-item-selected {
		border-color: green;
	}
	
	.demo3-item {
		padding: 5px 5px;
		font-size: 0;
	}
	
	.demo3-item-selected {
		outline: 1px solid #8B8AEE;
	}
	
	.demo4-item {
		background-color: #ddd;
		color: #222;
		font-size: 14px;
		padding: 5px 10px;
		margin-right: 10px;
		line-height: 18px;
		border-radius: 0.15rem;
	}
	
	.demo4-item-selected {
		background-color: #FF3B3B;
		color: #fff;
	}
	
	.demo4-item-disabled {
		color: #999;
	}
	
	.demo5-item {
		/*width: 100px;*/
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		border-radius: 3px;
		border: 1px solid #ccc;
		background-color: #fff;
		margin-right: 0.2rem;
		padding: 0 0.2rem;
	}
	
	.demo5-item-selected {
		background: #ffffff url(../../../static/img/ico10.png) no-repeat right bottom;
		border-color: #ff4a00;
	}
</style>