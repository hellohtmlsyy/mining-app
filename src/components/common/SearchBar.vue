<template>
  <div>
    <div class="bar">
      <ul class="clearfix">
          <li v-for="(item,index) in navlist" :key="item.id" @click="tab(index)" :class="{active:index == num}">
              <router-link :to="item.route">{{item.name}}</router-link>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
    export default {
        methods: {
            tab(index) {
              this.num = index;
            },
        },
        data() {
            return {
                num:0,
                results: [],
                navlist:[
                {
                  name:'商城',id:1,route:{name:'search.list',params:{category:1,key:'金'}}
                },{
                  name:'矿权交易',id:2,route:{name:'search.list',params:{category:2,val:'金'}}
                },{
                  name:'旗舰店',id:3,route:{name:'search.list',params:{category:3,key:'金'}}
                },{
                  name:'会展中心',id:4,route:{name:'search.list',params:{category:4,key:'金'}}
                },{
                  name:'新闻',id:5,route:{name:'search.list',params:{category:5,key:'金'}}
                }],
            }
        },
    }
</script>

<style lang="less">
    @import '~vux/src/styles/1px.less';
    /* bar */
    .bar {
        padding: 0.3rem 0.15rem;
        background: #fff;
        border-bottom: 0.15rem solid #ececec;
    }
    .bar li {
        font-size: 0.1rem;
        width: 17%;
        text-align: center;
        font-size:0.24rem;
        float:left;
        padding:0.08rem 0;
    }
    .active{
        background: #333;
        border-radius: 0.08rem;
        border: none;
        color:#fff;
    }
</style>
