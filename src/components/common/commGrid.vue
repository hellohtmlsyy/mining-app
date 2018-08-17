<template>
	<div>
		<div class="comm-grid">
			<grid :show-lr-borders="false" :show-vertical-dividers="false">
				<grid-item link="/home" :label="grid_label.home">
					<img slot="icon" :src=imgs.homeImg>
				</grid-item>
				<grid-item link="/home" :label="grid_label.purchase">
					<img slot="icon" :src=imgs.purchaseImg>
				</grid-item>
				<grid-item link="/news" :label="grid_label.news">
					<img slot="icon" :src=imgs.newsImg>
				</grid-item>
				<grid-item link="/mall" :label="grid_label.mall">
					<img slot="icon" :src=imgs.mallImg>
				</grid-item>
				<grid-item link="/login" :label="grid_label.user">
					<img slot="icon" :src=imgs.loginImg>
				</grid-item>
			</grid>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				grid_label: {
					home: "首页",
					purchase: "求购大厅",
					news: "新闻",
					mall: "商城",
					user: "我的"
				},
				imgs: {
					homeImg: '../../../static/img/user/home.png',
					purchaseImg: '../../../static/img/user/purchase.png',
					newsImg: '../../../static/img/user/news.png',
					mallImg: '../../../static/img/user/mall.png',
					loginImg: '../../../static/img/user/user.png',
				}
			}
		},
		created() {
			let url = this.$route.name;			
			if(url=='peraccount'||'entaccount'||'login'){
				this.imgs.loginImg='../../../static/img/user/user-.png';
			}
			switch(url) {
				case 'home':
					this.imgs.homeImg = '../../../static/img/user/home-.png';
					break;
				case 'news':
					this.imgs.newsImg = '../../../static/img/user/news-.png';
					break;
				case 'mall':
					this.imgs.mallImg = '../../../static/img/user/mallImg-.png';
					break;
				default:
					break;
			}
		},
	}
</script>
<style>
	/* 底部九宫格 */
	
	.comm-grid {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	
	.comm-grid .weui-grids {
		background: #f2f2f2;
	}
	
	.comm-grid .weui-grid {
		padding: 6px 8px;
	}
	
	.comm-grid .weui-grid__label {
		color: #555;
		font-size: 0.2rem;
	}
	
	.comm-grid .weui-grid__icon {
		width: 25px;
		height: 25px;
	}
</style>