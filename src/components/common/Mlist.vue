<template>
	<div class="mList" ref="listSection">
		<div class="firstNews" v-show="shohid">
			<div class="contentFirst">
				<div class="newsItem contentItem clearfix" v-for="(item,index) in list" :key="index" @click="toDetails(item.id)">
					<div class="image fl">
						<a href="javascript:;">
							<img :src="item.img" />
						</a>
					</div>
					<!--新闻的rightA-->
					<div class="textBox fl" v-show="showNews">
						<div>
							<div class="title">
								<p class="comtitlefontsize26">{{item.title}}</p>
							</div>
							<div class="intro comsmalltitlefontsize20">
								<p class="">{{item.vdesc}}</p>
							</div>
						</div>
						<div class="bottom comsmalltitlefontsize20">
							<div class="fl">
								<i class="icon iconfont icon-yanjing"></i>{{item.no}}
							</div>
							<div class="fr">
								<span class="date">
									{{item.newtime}}
								</span>
							</div>
						</div>
					</div>

					<!--会展中心的rightA-->
					<div class="textBox fl" v-show="showMeeting">
						<div>
							<div class="title">
								<p class="comtitlefontsize26">{{item.title}}</p>
							</div>
							<div class="intro comsmalltitlefontsize20">
								<p>{{item.begin_time}}至{{item.end_time}}</p>
								<p>{{item.address}}</p>
							</div>
						</div>
						<div class="price">
							￥0.00
						</div>
					</div>
					<!--商城的text-->
					<div class="textBox fl" v-show="showMall">
						<div>
							<div class="title">
								<p class="comtitlefontsize26">{{item.title}}</p>
							</div>
						</div>
						<div class="price">
							<!--￥{{item.price | converAmount}}-->
						</div>
					</div>
					<!--矿权交易项目rightA-->
					<div class="textBox fl" v-show="showMineral && !investorSH">
							<div>
								<div class="title">
									<p class="comtitlefontsize26">{{item.title}}</p>
								</div>
								<div class="intro comsmalltitlefontsize20">
									阶段：{{item.jd}}
								</div>
							</div>
							<div class="bottom comsmalltitlefontsize20">
								<div class="fl">
									<i class="icon iconfont icon-yanjing"></i>{{item.view_times}}
								</div>
								<div class="fr">
									<span class="date">
										{{item.insert_time}}
									</span>
								</div>
							</div>
					</div>
					<!--矿权交易投资人rightA-->
					<div class="textBox fl" v-show="showMineral && investorSH">
						<div>
							<div class="title">
								<p class="comtitlefontsize26">djlsakjflaksjf</p>
							</div>
							<div class="intro comsmalltitlefontsize20">
								投资需求：
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="secondNews clearfix" ref="listSection" v-show="!shohid">
			<div class="newsItem fl" v-for="(item,index) in list" :key="index">
				<flexbox>
					<div class="flex-demo image">
						<img :src="item.img" />
					</div>
				</flexbox>
				<!--新闻的text-->
				<div class="bgcolor textt" v-show="showNews">
					<flexbox>
						<flexbox-item>
							<div class="flex-demo title comtitlefontsize26">
								{{item.title}}

							</div>
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo intro comsmalltitlefontsize20">
								{{item.vdesc}}
							</div>
						</flexbox-item>
					</flexbox>
					<flexbox class="bottom comsmalltitlefontsize20 color_h">
						<flexbox-item>
							<div class="flex-demo look">
								<i class="icon iconfont icon-yanjing"></i> {{item.no}}

							</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo date comsmalltitlefontsize20">
								2天前
							</div>
						</flexbox-item>
					</flexbox>
				</div>
				<!--会展中心的text-->
				<div class="bgcolor textt" v-show="showMeeting">
					<flexbox>
						<flexbox-item>
							<div class="flex-demo title comtitlefontsize26">
								{{item.title}}

							</div>
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo intro comsmalltitlefontsize20">
								{{item.begin_time}}
							</div>
						</flexbox-item>
					</flexbox>
					<flexbox class="comsmalltitlefontsize20 color_h">
						<flexbox-item>
							<div class="address flex-demo look">
								{{item.address}}
							</div>
						</flexbox-item>
					</flexbox>
					<flexbox class="bottom comsmalltitlefontsize20 color_h">
						<flexbox-item>
							<div class="price flex-demo look">
								￥0.00
							</div>
						</flexbox-item>
					</flexbox>
				</div>

				<!--商城的text-->
				<div class="bgcolor textt" v-show="showMall">
					<flexbox>
						<flexbox-item>
							<div class="flex-demo title comtitlefontsize26">
								{{item.title}}
							</div>
						</flexbox-item>
					</flexbox>
					<flexbox class="bottom comsmalltitlefontsize20 color_h">
						<flexbox-item>
							<div class="price flex-demo look">
								￥{{item.price}}
							</div>
						</flexbox-item>
					</flexbox>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem } from 'vux'
	export default {
		components: {
			Flexbox,
			FlexboxItem,
		},
		props: ['shohid', 'list','title','investorSH'],
		data() {
			return {
				showMeeting: false,
				showNews: false,
				showMall:false,
				showMineral:false
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
			if(this.title == '会展中心') {
				this.showMeeting = true
			} else if(this.title == '新闻') {
				this.showNews = true
			}else if(this.title == '商城') {
				this.showMall = true
			}else if(this.title == "矿权交易"){
				this.showMineral = true
			}
		},
		methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var height = this.$refs.listSection.offsetHeight
				this.$emit("scrollValue", {
					"scrollTop": scrollTop,
					"height": height
				})
			},
			toDetails(id) {
				if(this.showMeeting) {
					window.location.href=this.$root.urlPath.MCM + "/exhibition/details?newpage=newpage&id=" + id;


				} else if(this.showNews) {
					window.location.href=this.$root.urlPath.MCM + "/news/details?newpage=newpage&id=" + id;
				}else if(this.showMall){
					window.location.href=this.$root.urlPath.MCM + "/mall/details?newpage=newpage&id=" + id;
				}else if(this.showMineral){
					window.location.href=this.$root.urlPath.MCM + "/mineral/projectDetails?newpage=newpage&id=" + id;
				}
			}
		}
	}
</script>

<style>
	.second .text {
		width: 3.26rem;
		padding: 0.05rem 0 0.05rem 0
	}
	
	.second .text .title {
		font-size: 0.26rem;
		line-height: 0.38rem;
		height: 0.8rem
	}
	
	.price {
		line-height: 0.45rem;
		font-size: 0.28rem;
		color: rgb(255, 79, 84);
	}
	
	.haha {
		width: 3.26rem;
		margin: 0 0.15rem 0.15rem 0;
		float: left;
		padding: 0.2rem;
		background: #fff;
	}
	
	.second .contentItem {
		width: 3.26rem;
		float: left;
		padding: 0.2rem;
		background: #fff;
	}
	
	.second .contentItem:nth-child(1) {
		margin: 0 0.15rem 0.15rem 0;
	}
	
	.second .contentItem:nth-child(2) {
		margin: 0 0 0.15rem 0;
	}
	
	.second .contentItem:nth-child(2n+1) {
		margin: 0 0.15rem 0.15rem 0;
	}
	
	.second .contentItem:nth-child(4n) {
		margin: 0 0 0.15rem 0;
	}
	/*第一种显示方式*/
	
	.contentFirst .contentItem {
		padding: 0.2rem;
		background-color: #fff;
		border-bottom: 1px solid rgb(230, 230, 230);
	}
	
	.contentFirst .contentItem:last-child {
		border-bottom: 0
	}
	
	.contentFirst .newsItem .image {
		line-height: 1.35rem;
	}
	
	.contentFirst img {
		width: 1.8rem;
		height: 1.36rem;
		margin-right: 0.2rem;
		line-height: 1.35rem;
		vertical-align: middle;
		display: inline-block;
	}
	
	.contentFirst .textBox {
		width: 5rem;
	}
	
	.contentFirst .title {}
	
	.contentFirst .intro {
		color: rgb(127, 127, 127);
		margin: 0.06rem 0
	}
	
	.contentFirst .bottom {
		color: rgb(127, 127, 127)
	}
	
	.mList .price {
		color: rgb(255, 81, 82);
		font-size: 0.28rem;
	}
	/*第二种显示方式*/
	
	.secondNews .newsItem {
		margin: 0 0.15rem 0.15rem 0;
		padding: 0.2rem;
		background-color: #fff;
		border-radius: 0.05rem;
	}
	
	.secondNews .newsItem:nth-child(2n) {
		margin: 0
	}
	
	.secondNews .newsItem .image img {
		width: 3.27rem;
		height: 1.86rem
	}
	
	.secondNews .newsItem .textt {
		width: 3.27rem;
		/*		height:3.5rem;*/
	}
	
	.secondNews .newsItem .title {
		margin: 0.05rem 0;
	}
	
	.secondNews .newsItem .intro,
	.color_h {
		color: #878787
	}
	
	.icon-yanjing {
		font-size: 0.2rem;
		margin-right: 0.06rem;
	}
	
	
	.bottom {
		margin-top: 0.13rem;
	}
	
	.secondNews .date {
		text-align: right;
	}
	
	.droploadDowm {
		text-align: center;
	}
	
</style>