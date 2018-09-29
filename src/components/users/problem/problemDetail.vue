<template>
	<div class="problemDetail">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">
				{{ info == 1?'收不到短信验证码怎么登录？': 
				( info == 2? '怎么查看自己的店铺或认证企业店铺？':
				( info == 3? '怎么发布产品？':
				( info == 4? '为什么要认证企业？':'怎么注销账号？'))) }}
			</div>
		</com-header>
		<div>
			<div class="tit">
				{{ info == 1?'收不到短信验证码怎么登录？': 
				( info == 2? '怎么查看自己的店铺或认证企业店铺？':
				( info == 3? '怎么发布产品？':
				( info == 4? '为什么要认证企业？':'怎么注销账号？'))) }}
			</div>
			<div class="con">
				{{ info == 1?'手机App端通过短信验证码注册或者找回密码，连续发送3~6次验证码且未被使用，则当日无法再获取验证码，可次日再尝试获取。': 
				( info == 2? '首先在手机上注册和登录矿业圈账号，在用户中心点击“切换企业中心”的按钮。如果您已经认证了企业店铺就会跳转到您的旗舰店，如果您未认证企业店铺则会提示您认证企业。':
				( info == 3? '目前手机端不支持发布功能，您可登录电脑版进行发布商品、会展、项目、新闻等操作。电脑版地址：http://www.miningcircle.com':
				( info == 4? '矿业圈网站只有会展是个人用户可购买的，如要发布商品，发布会展，发布项目，发布新闻，购买商品，投资项目，转让项目是需要先认证为企业用户才能进行相关的操作。':'暂不支持注销账号，如果有什么需要帮助的请联系我们的客服人员。客服电话：400-819-6985'))) }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				info: this.$route.query.info,
			}
		},
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");	
</style>