<template>
	<div class="mineralList">
		<div  ref="listSection" v-if="list.length !== 0">
			
			<div class="firstNews" v-show="!shohid">
				<div class="contentItem" v-for="(item,index) in list" :key="index" @click="toDetails(item)">
					<div class="clearfix" v-show="!investorSH">
						<div class="image fl">
							<img :src="item.img" />
							<div>
								<label :class="{smPag:smPag,smPag1:smPag1,smPag2:smPag2,smPag3:smPag3}"></label>
							</div>
						</div>

						<!--矿权交易项目rightA-->

						<div class="textBox fl">
							<div>
								<div class="title">
									<p class="comtitlefontsize26 clamp">{{item.title}}</p>
								</div>
								<div class="intro comsmalltitlefontsize20">
									阶段：{{item.jd?item.jd:item.keyword}}
								</div>
							</div>
							<div class="bottom comsmalltitlefontsize20">
								<div class="fl">
									<i class="icon iconfont icon-yanjing"></i>{{item.view_times}}
								</div>
								<div class="fr">
									<span class="date">
										{{item.insert_time|convertTime}}
									</span>
								</div>
							</div>
						</div>
					</div>
					<!--矿权交易投资人rightA-->
					<div v-show="investorSH" class="clearfix">
						<div class="image fl">

							<img :src="item.logo" />

							<div>
								<label :class="{smPag:smPag,smPag1:smPag1,smPag2:smPag2,smPag3:smPag3}"></label>
							</div>
						</div>
						<div class="textBox fl">
							<div>
								<div class="title">
									<p class="comtitlefontsize26 clamp">{{item.name}}</p>
								</div>
								<div class="intro comsmalltitlefontsize20 clamp">
									投资需求：{{item.requirement}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="secondNews clearfix" ref="listSection" v-show="shohid">
				<div class="newsItem contentItem fl" v-for="(item,index) in list" :key="index" @click="toDetails(item)">
					<flexbox>
						<div class="flex-demo image">
							<img :src="item.img" />
						</div>
					</flexbox>

					<!--矿权交易的text-->
					<div class="bgcolor textt">
						<div class="titleAndintro">
							<flexbox>
								<flexbox-item>
									<div class="flex-demo title comtitlefontsize26 clamp">
										{{item.title}}

									</div>
								</flexbox-item>
							</flexbox>
							<flexbox>
								<flexbox-item>
									<div class="flex-demo intro comsmalltitlefontsize20 clamp">
										阶段：{{item.jd?item.jd:item.keyword}}
									</div>
								</flexbox-item>
							</flexbox>
						</div>
						<flexbox class="bottom comsmalltitlefontsize20 color_h">
							<flexbox-item>
								<div class="flex-demo look">
									<i class="icon iconfont icon-yanjing"></i> {{item.view_times}}

								</div>
							</flexbox-item>
							<flexbox-item>
								<div class="flex-demo date comsmalltitlefontsize20">
									{{item.insert_time|convertTime}}
								</div>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	const loginUrl = 'http://member.miningcircle.com/login?where=mineral';
	import { cookie } from 'vux';
	import { appLogin } from '@/assets/commonjs/util.js'
	import showNodata from '@/components/base/showNodata';
	
	export default {
		components: {
			showNodata
		},
		props: ['list', 'investorSH', 'shohid','loading'],
		data() {
			return {
				smPag: '',
				smPag1: '', //小标签
				smPag2: '',
				smPag3: '',
			}
		},
		mounted() {
			this.smPage()
		},
		methods: {
			smPage() {
				if(this.list.status == 20) {
					this.smPag = true
				} else if(this.list.status == 30) {
					this.smPag2 = true
				} else if(this.list.status == 90) {
					this.smPag3 = true
				} else if(this.list.status == 100) {
					this.smPag1 = true
				}
			},
			toDetails(item) {
				if(cookie.get('MC_UID')) {
					if(this.investorSH) {
						window.location.href = this.$root.urlPath.MCM + "/mineral/investorDetails?id=" + item.companyId + '&newpage=newpage';
					} else {
						window.location.href = this.$root.urlPath.MCM + "/mineral/projectDetails?id=" + item.id + '&newpage=newpage';
					}
				} else {
					appLogin()
				}
			}
		}
	}
</script>

<style>
	.mineralList .contentItem .image {
		line-height: 1.35rem;
		position: relative;
	}
	
	.mineralList .contentItem .image label {
		display: block;
		background-size: 0.6rem 0.6rem;
		width: 0.6rem;
		height: 0.6rem;
		position: absolute;
		left: 0;
		top: 0;
	}
	/*热门*/
	
	.smPag {
		background: url(../../../static/img/img9.png) no-repeat;
	}
	/*过期*/
	
	.smPag1 {
		background: url(../../../static/img/img10.png) no-repeat;
	}
	/*推荐*/
	
	.smPag2 {
		background: url(../../../static/img/img11.png) no-repeat;
	}
	/*完成*/
	
	.smPag3 {
		background: url(../../../static/img/img12.png) no-repeat;
	}
</style>