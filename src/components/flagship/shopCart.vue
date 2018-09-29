<template>
	<div class="shopCart">
		<!--头部-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>店铺二维码</span>
			</div>
		</div>
		<div id="qrcode">
			<div class="name">
				{{shopName}}
			</div>
			<vue-qr :logoSrc="config.logo" :text="config.value" :size="500" :margin="0" ></vue-qr>
			<div class="text">
				邀请好友来扫一扫分享店铺给TA
			</div>
		</div>
		<div class="footer">
			<!--<div class="block1" @click="download">
				<a :href="imgUrl" download="">下载二维码</a>
			</div>-->
			<div class="block2" @click="share">
				分享二维码
			</div>
		</div>
	</div>
</template>

<script>
	import VueQr from 'vue-qr'
	import {lastPage,getAppShare,isDevice} from '@/assets/commonjs/util.js'
	
	export default{
		components:{
			VueQr
		},
		data(){
			return {
				config:{
					value:'http://m.miningcircle.com/flagship?newpage=newpage&shopId=' + this.$route.query.shopId,
					logo:'../../../static/img/flagship/erweimaLogo.jpg',
				},
//				imgUrl:'',
				shopName:decodeURIComponent(this.$route.query.shopName)
			}
		},
		mounted(){
			
		},
		methods:{
			back(){
				lastPage()
			},
//			download(){
//				this.imgUrl = document.querySelector('#qrcode img').src
//				alert(document.querySelector('#qrcode img').src)
//				let url = document.querySelector('#qrcode img').src
//				
//				let a = document.createElement('a') 
//				let  event = new MouseEvent('click')
//				a.download = "矿业圈旗舰店铺二维码"
//				a.href = url
//				a.dispatchEvent(event)
//			},
			share(){
				let url = document.querySelector('#qrcode img').src
				if(isDevice() == '其他浏览器') {
//					this.show1 = true
				} else if(isDevice() == 'adr' || isDevice() == 'ios') {
					getAppShare(window.location.href,"旗舰店二维码","","","")
				}
			}
		}
	}
</script>

<style>
	#qrcode{
		margin: 1.2rem 0.2rem 1.016rem 0.2rem;
		background: #fff;
		text-align: center;
		padding: 1.14rem 0
	}
	#qrcode img{
		width: 5rem;
		height: 5rem;
	}
	#qrcode .name{
		font-size: 0.36rem;
		margin-bottom: 0.5rem;
	}
	#qrcode .text{
		color: #757575;
		font-size: 0.28rem;
		margin-top: 0.5rem;
	}
 	.shopCart .footer{
		display: flex;
		font-size: 0.28rem;
		text-align: center;
		line-height: 0.816rem;
		height: 0.816rem;
	}
	.shopCart .footer .block1{
		background: #fff;
		flex: 1;
	}
	.shopCart .footer .block2{
		background: #ff4f54;
		flex: 1;
		color: #fff;
		
	}
	
</style>