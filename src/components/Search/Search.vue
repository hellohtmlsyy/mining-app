<template>
  <div class="searchS">
     <flexbox orient="vertical">
      <div class="search">
        <div class="sea_box">
          <i class="iconfont icon-jiantou-copy color_f" @click="revert()"></i>
          <form action="" style="display: inline;">
          	<input type="text" placeholder="搜索" v-model.trim="key" ref="sea_inp" id="search" autofocus="autofocus">    
					</form>
          <i class="iconfont icon-cuowu" @click="empty()"></i>
        <a href="javascript:;" class="sea_text color_f" @click="search()">搜索</a>
       </div>
      </div>
    </flexbox>
    <div class="bar">
      <ul class="clearfix">
          <li v-for="(item,index) in navlist" :key="item.id" @click="tab(index)" :class="{active:index == num}">
              <a href="javascript:;">{{item.name}}</a>
          </li>
      </ul>
    </div>
    <div class="search_index">
      <div class="his_sear" v-show="his_show">
        <span class="his_tit tit">历史搜索</span><span class="clearfix fr"><i class="iconfont icon-icon7 his_empty" @click="his_empty()"></i></span>
        <ul class="his clearfix">
          <li v-for="(item,index) in historyList" :key="index" v-show="isShow">
              <a href="javascript:;" @click="his_list(item)">{{item}}</a>
          </li>
        </ul>
      </div>
      <div class="hot_sear">
        <span class="hot_tit tit">热门搜索</span>
        <ul class="hot clearfix">
          <li v-for="item in hot_sear" :key="item.id">
            <a href="javascript:;" @click="his_list(item.name)">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
    import {AlertModule} from 'vux';
    import axios from 'axios'
    export default {
        components: {
            AlertModule,
        },
        watch: {
        	['key']() {
        		var rules = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,100}$/;
						this.keyError = this.key.length >0 && rules.test(this.key) ? false : true;
					},
        },
        methods: {			
            empty(){
              this.key = '';
            },
            his_empty(){
              this.his_show=false;
              this.historyList = [];
              localStorage.setItem(this.storageKey, '[]');
            },
            revert(){
              if(this.isInapp){				
								if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {
									adwebkit.callApp("BACK", '');
								} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
									oswebkit.callApp("BACK", '');
								}					
							}else{
								this.$router.go(-1);
								return;
							}			
            },
            his_list(item){
            	var num = this.num+1;
              location.href = '/search/list/'+num+'?newpage=newpage&key=' + encodeURIComponent(item);
            },
            bar_list(item,id){
              location.href = '/search/list/'+id+'?newpage=newpage&key=' + encodeURIComponent(item);
            },
            search(){
              this.jsonString = localStorage.getItem(this.storageKey) || '[]';
              this.historyList = JSON.parse(this.jsonString);             
              if(this.keyError){
                this.$vux.toast.text('请输入正确搜索关键字', 'center');
                return;
              }else{
                var key=this.key;
                var historyList = this.historyList
                $.each(this.historyList, function(i, item) {
                if (item == key) {
                   historyList.splice(i, 1);
                    return false;
                  }
                });
                this.historyList.push(this.key);
                if (this.historyList.length > 10) {
                  this.historyList.splice(0, this.historyList.length - 10);
                }
                localStorage.setItem(this.storageKey, JSON.stringify(this.historyList));
                var num = this.num+1;
                location.href = '/search/list/'+num+'?newpage=newpage&key=' + encodeURIComponent(this.key);
              }
            },
            tab(index) {
              this.num = index;
            },  
            isShow:function(){
              if(this.history_sear.length!=0){
                  this.history_sear.push({name:this.key,id:this.id});
                  return 'true';
              }else{
              }
            }
        },
        data() {
            return {
              key:'',
              keyError: false,
              historyList:[],
              jsonString:[],
              storageKey:'SearchHistoryList',
              historyList:JSON.parse(window.localStorage.getItem("SearchHistoryList")),
              num:0,
              text:[],
              his_show:false,
              navlist:[
              {
                name:'商城',id:1,
              },{
                name:'旗舰店',id:2
              },{
                name:'矿权交易',id:3
              },{
                name:'会展中心',id:4
              },{
                name:'新闻',id:5
              }],
              hot_sear: [{name: '金',id: 1}, {name: '锰',id: 2}, {name: '煤',id: 3}, {name: '钢球',id: 4},{name: '铁',id: 5}],
              isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
              equi:navigator.userAgent,
            }
        },
        mounted(){
            this.$refs.sea_inp.focus();
            var that = this;
						$("#search").on('keypress', function(e) {
							var keycode = e.keyCode;
							if (keycode == '13') {
								e.preventDefault();
								that.search();
							}
						});
        },
        created(){
          if(this.historyList.length!=0){
            this.his_show=true;
          }else{
            this.his_show=false;
          }   
          
          //搜索框val回显
          var inpVal = this.$route.query.key
          if( inpVal && inpVal != '' )
          	this.key = inpVal;
        }
    }
</script>

<style lang="less">
  @import url("../../static/css/searchHead.css");
    .searchS{
      background:#fff;
    }
    .his_sear,
    .hot_sear {
        background: #fff;
        padding: 0.2rem 0.2rem;
    }
    .his_sear {
        border-bottom: 0.02rem solid rgb(238, 238, 238);
    }
    .tit{
        margin-bottom: 0.15rem;
        color: #757575;
        font-size: 0.28rem;
    }
    .his,
    .hot {
        width: 100%;
    }
    .his_empty{
      color:#aaa;
    }
    .his li,
    .hot li {
      float: left;
      background: #eeeeee;
      border-radius: 0.05rem;
      padding: 0.1rem;
      margin-right: 0.15rem;
      color: #333;
      font-size: 0.24rem;
      margin-bottom: 0.1rem;
      word-break: break-all;
    }
    .icon-web-icon-{
      font-size:0.5rem;
      position: absolute;
      right: 0.2rem;
    }
</style>
