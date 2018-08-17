<template>
	<div class="Mtable">
		<div class="content_item">
			<div class="image">
				<img src="../../../static/img/05_为您推荐.png" />
			</div>
			<div class="info">
				<div class="type">粗黄金</div>
				<!--<div class="depict">国外黄金产地哥伦比亚和加纳</div>-->
				<div class="locate">
					<span>中国</span>
					<span>北京</span>
					<span>国家会议中心</span>
				</div>
				<!--<div class="price">面议</div>-->
				<div class="bottom">
					<!--<div class="page_view">
					<i class="fa fa-camera-retro fa-lg"></i>
					<span style="padding-left:0.3rem;">39396</span>
				</div>-->
					<div class="date">
						<span>6-15</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		}
	}
</script>

<style>
	.Mtable{
		padding:0.15rem
	}
	
	.Mtable .content .content_item {
		width: 3.5rem;
		margin: 0 0.1rem 0.1rem 0;
		float: left;
	}
	
	.Mtable .content .content_item .image {
		width: 3.5rem;
		height: 3.5rem;
	}
	
	.Mtable img {
		width: 3.5rem;
		height: 3.5rem;
	}
	
	.Mtable .info {
		width: 3.3rem;
		padding: 0.1rem;
		padding-top: 0;
		background: #fff;
	}
	
	.Mtable .info .type {
		font-size: 0.24rem;
		line-height: 0.68rem;
	}
	
	.Mtable .info .depict {
		font-size: 0.22rem;
		line-height: 0.22rem;
		color: rgb(134, 134, 134);
	}
	
	.Mtable .info .price {
		line-height: 0.6rem;
		font-size: 0.24rem;
		color: rgb(238, 117, 122);
	}
	
	.Mtable .info .bottom {
		width: 3.5rem;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	
	.Mtable .info .locate {
		font-size: 0.2rem;
		color: rgb(125, 125, 125);
		line-height: 0.22rem
	}
	
	.Mtable .info .page_view,
	.date {
		/*width:2.6rem;*/
		float: left;
		color: rgb(121, 121, 121);
	}
	
	.Mtable .info .page_view span,
	.date {
		font-size: 0.2rem;
	}
	
	.Mtable .info .date {
		width: 0.9rem;
		float: left;
	}
</style>