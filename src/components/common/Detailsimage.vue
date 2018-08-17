<template>
	<div>
		<div class="details_image_box">
			<img src="../../../static/img/groom.png" />
			<div class="revert">
				<i class="icon iconfont icon-jiantou3"></i>
			</div>
			<div class="info">
				<i class="icon iconfont icon-tubiao212"></i>
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
		},
		methods:{
				
		}
	}
</script>

<style>
	.details_image_box img {
		width: 7.5rem;
		height: 4.2rem;
		position: relative;
	}
	
	.details_image_box .revert,
	.details_image_box .info {
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
	.details_image_box .icon-jiantou3,.icon-tubiao212 {
		font-size: 0.3rem;
		color: #fff
	}
	.details_image_box .revert {
		left: 0.2rem;
	}
	
	.details_image_box .info {
		right: 0.2rem;
	}
	
	.details_image_box .icon-tubiao212 {
		font-size: 0.3rem;
	}
</style>