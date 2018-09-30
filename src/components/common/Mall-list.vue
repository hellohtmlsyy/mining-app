<template>
	<div class="mallList" ref="listSection">
		<div>
		<div class="firstNews" v-show="shohid">
				<div class="contentItem clearfix" v-for="(item,index) in list" :key="index" @click="toDetails(item.id,item.cat_id)">
					<div class="image fl">
						<a href="javascript:;">
							<img :src="item.imgS" v-show="imgShow"/>
							<img :src="item.img" v-show="!imgShow" />
						</a>
					</div>

					<!--商城的text-->
					<div class="textBox fl">
						<div class="topM">
							<div class="title">
								<p class="comtitlefontsize26 clamp">{{item.title}}</p>
							</div>
							<div class="intro">
							<p class="clamp">{{item.title2?item.title2:item.vdesc}}</p>
							</div>
						</div>
						
						<div class="price" v-if="item.price!='0.0'">
							{{item.price|converAmount(2)}}
						</div>
						<div class="price" v-if="item.price=='0.0'"">
							面议
						</div>
					</div>
				</div>
		</div>

		<div class="secondNews clearfix" ref="listSection" v-show="!shohid">
			<div class="newsItem contentItem fl" v-for="(item,index) in list" :key="index" @click="toDetails(item.id,item.cat_id)">
				
				<flexbox>
					<div class="flex-demo image">
						<img :src="item.imgM" v-show="imgShow"/>
						<img :src="item.img" v-show="!imgShow" />
					</div>
				</flexbox>

				<!--商城的text-->
				<div class="bgcolor textt">
					<flexbox>
						<flexbox-item>
							<div class="flex-demo title comtitlefontsize26 clamp">
								{{item.title}}
							</div>
							<div class="intro">
							<p class="clamp">{{item.title2?item.title2:item.vdesc}}</p>
							</div>
						</flexbox-item>
					</flexbox>
					<flexbox class="bottom comsmalltitlefontsize20 color_h">
						<flexbox-item>
							<div class="price flex-demo look" v-if="item.price!='0.0'">
								{{item.price | converAmount(2)}}
							</div>
							<div class="price flex-demo look" v-if="item.price=='0.0'"">
							面议
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
	import showNodata from '@/components/base/showNodata';
	export default {
		components: {
			showNodata
		},
		props: ['shohid', 'list','imgShow','loading'],
		data() {
			return {
			}
		},
		mounted() {
			
		},
		methods: {
			toDetails(id,type) {
				type = type.toString()
				type = type.substring(0,2);
				if(typeof(Storage)!=="undefined")
				{
					var shop = {mallId:id}
					shop = JSON.stringify(shop)
				      localStorage.setItem('shop', shop);
				} else {
					alert("抱歉! 您的浏览器不支持 web 存储。")
				}
//				type区分32大宗和83普通商品
				if(type == 32){
				window.location.href=this.$root.urlPath.MCM + "/mall/details?id=" + id + '&newpage=newpage';

				}else if(type == 83){
					window.location.href = this.$root.urlPath.MCM + "/mallCom/details?id="+id + '&newpage=newpage';

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

	.contentItem {
		padding: 0.2rem;
		background-color: #fff;
		border-bottom: 0.01rem solid rgb(230, 230, 230);
	}

	.contentItem:last-child {
		border-bottom: 0
	}

	.contentItem .image {
		line-height: 1.35rem;
	}
	
	.mall .contentItem img {
		width: 1.65rem;
		height: 1.65rem;
		margin-right: 0.2rem;
		line-height: 1.35rem;
		vertical-align: middle;
		display: inline-block;
	}

	.contentItem .textBox {
		width: 5rem;
	}

	.contentItem .intro {
		color: rgb(127, 127, 127);
		font-size: 0.24rem;
	}

	.contentItem .bottom {
		color: rgb(127, 127, 127)
	}

	.mallList .price {
		color: rgb(255, 81, 82);
		font-size: 0.28rem;
		margin-top: 0.1rem;
	}
	.mall .contentItem .textBox .topM{
		height: 0.9rem;
	}
	/*第二种显示方式*/

	.secondNews .contentItem {
		margin: 0 0.15rem 0.15rem 0;
		padding: 0.2rem;
		background-color: #fff;
		border-radius: 0.05rem;
	}

	.secondNews .contentItem:nth-child(2n) {
		margin: 0
	}

	.secondNews .contentItem .image img {
		margin-right: 0;
	}

	.secondNews .contentItem .textt {
		width: 3.27rem;
	}

	.secondNews .contentItem .title {
		margin: 0.05rem 0;
	}

	.secondNews .contentItem .intro,
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
	.mall .firstNews .contentFirst img {
		width: 1.65rem;
		height: 1.65rem;
	}
	.mallList .secondNews .newsItem .image img{
		width: 3.27rem;
		height: 1.95rem;
	}
</style>
