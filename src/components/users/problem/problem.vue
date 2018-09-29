<template>
	<div class="problem">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">常见问题</div>
		</com-header>
		<ul class="problemCon">
			<li v-for="(item,index) in textList" :key="index" @click="toDetail(item.index)"><span class="text">{{item.info}}</span><i class="iconfont icon-jiantou5"></i></li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				textList: [
					{info:'收不到短信验证码怎么登录？',index: 1},
					{info:'怎么查看自己的店铺或认证企业店铺？',index: 2},
					{info:'怎么发布产品？',index: 3},
					{info:'为什么要认证企业？',index: 4},
					{info:'怎么注销账号？',index: 5},
				],
			}
		},
		methods: {
			toDetail(index){
				location.href = this.$root.urlPath.MCM + "/problem/detail?info=" + index + '&newpage=newpage';
			},
		},
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");	
</style>