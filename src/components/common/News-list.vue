<template>
	<div class="newslist newsListOnly" ref="listSection">
		<div class="firstNews" v-show="shohid">
				<div class="contentItem clearfix" v-for="(item,index) in list" :key="index" @click="toDetails(item.id)">
					<div class="image fl">
						<a href="javascript:;">
							<img :src="item.img ? item.img : zhanweitu" :class="item.img ? 'imgWidth' : 'zhanweitu'"/>
						</a>
					</div>

					<!--新闻的rightA-->
					<div class="textBox fl">
						<div>
							<div class="title">
								<p class="comtitlefontsize26 clamp">{{item.title}}</p>
							</div>
							<div class="intro comsmalltitlefontsize20">
								<p class="clamp">{{item.vdesc}}</p>
							</div>
						</div>
						<div class="bottom comsmalltitlefontsize20">
							<div class="fl">
								<i class="icon iconfont icon-yanjing"></i>{{item.view_times}}
							</div>
							<div class="fr">
								<span class="date">
									{{item.newtime}}
								</span>
							</div>
						</div>
					</div>
				</div>
		</div>

		<div class="secondNews clearfix" ref="listSection" v-show="!shohid">
			<div class="newsItem contentItem fl" v-for="(item,index) in list" :key="index" @click="toDetails(item.id)">
				<flexbox>
					<div class="flex-demo image">
						<img :src="item.img ? item.img : zhanweitu" :class="item.img ? 'imgWidth' : 'zhanweitu'" />
					</div>
				</flexbox>

				<!--新闻的text-->
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
								{{item.vdesc}}
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
								{{item.newtime}}
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
	export default {
		props: ['shohid', 'list'],
		data() {
			return {
				zhanweitu:'../../../static/img/zhanwei.png'
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
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
				window.location.href=this.$root.urlPath.MCM + "/news/details?id=" + id + '&newpage=newpage';
			}
		}
	}
</script>

<style>
	.newslist .titleAndintro{
    	min-height: 0.83rem;
	}
	
	.newsListOnly .firstNews .image{
		background:#f2f2f2;
		width: 1.8rem;
   	 	height: 1.36rem;
   	 	text-align: center;
   	 	margin-right: 0.2rem;
	}
	
	.newsListOnly img{
		margin-right: 0;
	}
	.newsListOnly .imgWidth{
		width: 1.8rem;
   	 	height: 1.36rem;
	}
	.newsListOnly .firstNews .zhanweitu{
		width: 0.8rem;
   	 	height: 0.8rem;
	}
	.newsListOnly .secondNews .image{
		width: 3.27rem;
   	 	height: 1.86rem;
   	 	text-align: center;
	}
	.newsListOnly .secondNews .contentItem .image .zhanweitu{
		width: 1.3rem;
   	 	height: 1.2rem;
	}
</style>
