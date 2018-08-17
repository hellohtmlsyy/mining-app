<template>
	<div>
    <div class="box">
      <span>您要查找的页面不存在&nbsp;&nbsp;</span>
      <a href="javascript:;" @click="home">点我去首页</a>
    </div>
	</div>
</template>
<script>
	export default{
		methods:{
			home(){
				location.href=this.$root.urlPath.MCM+"/home?newpage=newpage"
			}
		}
	}
</script>
<style scoped>
  .box{
    text-align:center;
    margin:0.2rem;
  }
  .box span{
    font-size:0.35rem;
  }
  a{
    font-size:0.2rem;
    color:#00a0e9;
  }
</style>
