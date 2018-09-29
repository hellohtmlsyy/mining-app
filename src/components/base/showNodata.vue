<template>
	<div class="show-nodata-com">
		<div class="imgbox">
			<img src="../../../static/img/show/show-nodata.png" />
		</div>
		
		<div class="textbox">暂无数据，去看看别的吧~</div>
	</div>
</template>

<script>
	export default{
		props:[],
		data(){
			return {
				
			}
		},
		mounted(){
			
		},
		computed: {
			
		},
	}
</script>

<style scoped>
	.show-nodata-com {
		background-color:#E9E9E9;
		font-size: 0.26rem;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		justify-content: center;
		padding-top: 1.8rem;
	}
	
	.show-nodata-com .imgbox img {
		width: 3.6rem;
		height: 3.16rem;
	}
	
	.show-nodata-com .textbox {
		text-align: center;
		padding-top: 0.8rem;
		width: 100%
	}
</style>