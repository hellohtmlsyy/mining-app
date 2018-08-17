<template>
	<div class="openApp" v-show="showOpenApp">
		<span class="close" @click="close"></span>
		<img src="../../static/img/download.jpg" @click="toOpen" />
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
				}

			}
		},
		mounted() {
			window.addEventListener("scroll", this.handleScroll)
			if(isDevice() == 'adr' || isDevice() == 'ios') {
				this.showOpenApp = false
			} else{
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
					if(scrollTop > 5) {
						this.showOpenApp = false
					} else {
						this.showOpenApp = true
					}
				}

			},
			toOpen() {
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
			},
			close(){
				this.showOpenApp = false
				
			}
		},
		watch:{
			showOpenApp(showHide){
				this.$emit("closeOpenApp",showHide)
			}
		}
	}
</script>

<style scoped>
	.openApp .close {
		position: absolute;
		z-index: 99999;
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
</style>