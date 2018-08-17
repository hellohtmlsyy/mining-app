<template>
	<div class="marketDetails">
		<com-header :title="headerTitle">
			<div slot="centerA">金</div>
		</com-header>
		<div class="intro">
			<div class="time">更新于2018-07-31 02：04</div>
			<div class="content">
				<div class="data">
					<span>2823.41</span>
					<span>+2.00</span>
					<span>+0.22%</span>
				</div>
				<div>规格详见说明</div>
			</div>
		</div>
		<div id="myChart" ref="myChart" style="width: 750px;height: 750px;"></div>
	</div>
</template>

<script>
	import comHeader from '@/components/base/comHeader'
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/line')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')

	export default {
		components: {
			comHeader,
		},
		mounted() {
			let myChart = echarts.init(document.getElementById('myChart'))
			// 绘制图表
			myChart.setOption({
				title: {
					text: 'ECharts 入门示例'
				},
				tooltip: {},
				xAxis: {
					data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'line',
					data: [5, 20, 36, 10, 10, 20]
				}]
			});
		},
		data() {
			return {
				headerTitle: '',
			}
		}
	}
</script>

<style scoped>
	.marketDetails .intro{
		margin: 1rem 0 0.15rem 0;
		background: #fff;
		box-shadow:5px 0px 5px rgba(170,170,170,0.15);
	}
	.marketDetails .intro .time{
		line-height: 0.78rem;
		text-align: center;
		color: #757575;
		font-size: 0.24rem;
	}
	.marketDetails .intro .content{
		margin:0 .2rem;
		border-top: 0.01rem solid #E5E5E5;
		padding: 0.2rem 0;
		font-size: 0.36rem;
	}
	.marketDetails .intro .content .data{
		margin-bottom: 0.2rem;
	}
	.marketDetails #myChart{
		background: #fff;
	}
</style>