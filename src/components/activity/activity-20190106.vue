<!--  -->
<template>
<!-- 注意：活动已经下掉，此代码暂时没有用了 -->
  <div class='activity'>
    <div class="content">
      <!-- <img src="../../../static/img/data/active.jpg" alt=""> -->
      <div class="revert" @click="back">
				<i class="icon iconfont icon-jiantou-copy color_f"></i>
			</div>
      <button class="btn" @click="goDetials">立即报名</button>
    </div>
  </div>
</template>

<script>
import { lastPage } from '@/assets/commonjs/util.js';

export default {
  components: {},
  data() {
    return {

    };
  },
  created() {

  },
  computed: {

  },
  watch: {},
  methods: {
    goDetials(){
      window.location.href = this.$root.urlPath.MCM + '/exhibition/details?id=30f2073b3dfa493ab98defb115bd9067&newpage=newpage'
    },
    back() {
				lastPage()
		},
  },
}
</script>

<style scoped>
  .activity .content{
    position: relative;
  }
  .activity .content img{
    width: 100%
  }
  .activity .revert{
    position: fixed;
    top: 20px;
    left: 20px;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.6rem;
    background-color: rgba(119, 110, 93, .6);
    display: flex;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    z-index: 999;
  }
  .activity .content .btn{
    position: absolute;
    padding: 0.15rem 0.4rem;
    font-size: 0.28rem;
    background: #0094E8;
    color: #fff;
    bottom: 1.9rem;
    left: 50%;
    transform: translate(-45%, -50%);
    border-radius:0.5rem;
  }
</style>
