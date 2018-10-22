<template>
	<div ref="scroll" class="my-scroll-wrap" @touchstart="touchStart($event)" @touchmove="touchMove($event)">
		<div class="my-scroll-content">
			<slot></slot>
		</div>
		<load-more :tip="loadingText" :show-loading="isLoading" v-show="isLoading"></load-more>
		<divider v-show="isComplete && total !== 0">{{completeText}}</divider>
		<show-nodata v-if="total == 0 && !isLoading"></show-nodata>
	</div>
</template>

<script>
	import showNodata from '@/components/base/showNodata';
	export default {
		props:{
//			距离底部多远加载
			distance:{
				type:Number,
				default:300,
			},
//			滚动时的一些提示
			loadingText:{
				type:String,
				default:'加载中...'
			},
			completeText:{
				type:String,
				default:'已加载所有数据'
			},
			total:{
				type:Number,
				default:''
			},
			isTab:{
				type:Boolean,
				default:false
			}
		},
		components: {
			showNodata
		},
		data() {
			return {
				isComplete:false,
				isLoading:true,
				scrollWrap:null, //滚动容器
				scrollContent:null, //正文容器
				startY:0
			}
		},
		mounted() {
			this.$nextTick(()=>{
//				window.addEventListener('scroll', this.scrollEvent)
			})
		},
		methods: {
			touchStart(e){
				this.startY = e.targetTouches[0].pageY
			},
			touchMove(e){
				if(e.targetTouches[0].pageY < this.startY){
					this.scrollEvent()
				}
			},
			scrollEvent() {
				if(this.total == 0) return
				
				if(this.isComplete) return
//				滚动距离
//				可见高度
//				文档高度

				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				let viewHeight = window.innerHeight;
				let docHeight = this.$refs.scroll.childNodes[0].offsetHeight
				
//				如果滚动距离加浏览器窗口高度,就说明到底部了,若大于等于内容高度,就加载
				if(scrollTop + viewHeight >= docHeight - this.distance){
					this.isLoading = true
				}
				
			},
//			请求完
			loaded(){
				this.isLoading = false
			},
//			当点击tab时需要将次东西至空
			init(){
				this.isComplete = false
			},
//			加载完成
			complete(){
				this.isLoading = false
				this.isComplete = true
			}
		},
		watch:{
			isLoading(val){
				if(val){
					this.$emit('loadmore')
				}
			},
		}
	}
</script>

<style scoped>
	
	
	
	
<style>