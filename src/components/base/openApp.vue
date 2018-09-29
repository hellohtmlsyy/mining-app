<template>
	<div>
		<div class="openApp" v-show="showOpenApp">
			<span class="close" @click="close"></span>
			<img src="../../static/img/download.jpg" @click="toOpen" />
		</div>
		<div class="tip" :style="{display:shareMC}" @click="clickMC">
			<img src="../../../static/img/mc-guide.png" />
			<div class="box-text">
				<p class="text">点击右上角</p>
				<p class="text">用其他浏览器打开</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { isDevice, isBrowser } from '@/assets/commonjs/util.js';

	export default {
		data() {
			return {
				showOpenApp: true,
				config: {
					downloadUrl: 'http://www.miningcircle.com/app',
					adrScheme: 'miningcircle://main',
					iosScheme: 'miningcircle://'
				},
				shareMC: 'none'
				
			}
		},
		mounted() {
			window.addEventListener("scroll", this.handleScroll)
			if(isDevice() == 'adr' || isDevice() == 'ios') {
				this.showOpenApp = false
			} else {
				this.showOpenApp = true
			}
		},
		methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(isDevice() == 'adr' || isDevice() == 'ios') {
					return
				}
				if(isBrowser() == 'iosBS' || isBrowser() == "adrBS") {
					if(scrollTop > 4) {
						this.showOpenApp = false
					} else {
						this.showOpenApp = true
					}
				}

			},
			toOpen() {
				//微信浏览器：直接用浏览器打开
				//不是微信浏览器，是安卓还是苹果
				if(isDevice() == '微信浏览器') {
					this.shareMC = 'block'
					return
				}else if(isDevice() !== '微信浏览器'){
					
					if(isBrowser() == "iosBS") {
						window.location.href = this.config.iosScheme
						setTimeout(() => {
							window.location.href = this.config.downloadUrl
						}, 2000)
					} else if(isBrowser() == "adrBS") {
						window.location.href = this.config.adrScheme
						setTimeout(() => {
							window.location.href = this.config.downloadUrl
						}, 2000)
					} 
				}
			},
			close() {
				this.showOpenApp = false

			},
			clickMC(){
				this.shareMC = 'none'
			}
		},
		watch: {
			showOpenApp(showHide) {
				this.$emit("closeOpenApp", showHide)
			}
		}
	}
</script>

<style scoped>
	.openApp .close {
		position: absolute;
		z-index: 999;
		right: 0px;
		top: 0px;
		width: 30px;
		height: 30px;
		background: url('../../../static/img/close.png') center center no-repeat;
	}
	
	.openApp img {
		display: block;
		width: 7.5rem;
		height: 0.95rem;
	}
	
	.tip{
		z-index: 10001;
		position: fixed;
		left: 0px;
		top: 0px;
		background-color:#E0E0E0 ;
		width: 100%;
		height: 100%;
		display: flex;		
	}
	.tip img{
		width: 4.08rem;
		height: 5.01rem;
		padding: 0.4rem 0 0 3rem;
	}
	.tip .box-text{
		margin-top: 0.4rem;
	}
	.tip .text{
		text-align: center;
		font-size: 0.24rem;
		line-height: 0.4rem;
	}
</style>