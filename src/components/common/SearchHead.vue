<template>
  <div class="searchHead">
    <flexbox orient="vertical">
      <div class="search">
        <div class="sea_box">
          <i class="iconfont icon-zuojiantou color_f" @click="revert()"></i>
          <input type="text" placeholder="搜索" v-model="text" ref="sea_inp">
          <i class="iconfont icon-cuowu" @click="empty()"></i>
        <a href="javascript:;" class="sea_text color_f" @click="search2()">搜索</a>
       </div>
      </div>
    </flexbox>
  </div>
</template>
<script>
    import { AlertModule } from 'vux';
    export default {
        methods: {
            gohome() {
            	window.location.href=this.$root.urlPath.MCM + "/home?newpage=newpage";
            },
            empty(){
              this.text=[];
            },
            revert(){
              this.$router.go(-1);
            },
            search2(){              
              if(!this.$refs.sea_inp.value){
                AlertModule.show({
                  title: '提示',
                  content:"请输入搜索关键字",
                })
              }else{

              }
            }
        },
        data() {
            return {
                text:[],
            }
        },
    }
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import url("../../static/css/searchHead.css");
</style>
