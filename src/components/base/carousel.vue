<!--  -->
<template>
  <div class='carousel'>
    <div class="swiper-container" id="swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiperBox2" @click="goDetails">
          <img width="100%" height="100%" class="va-t" :src="imgUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from '@/static/js/swiper.min.js';

export default {
  components: {},
  props:['imgUrl'],
  data() {
    return {

    };
  },
  created() {

  },
  mounted(){
    this.$nextTick(() => {
				var mySwiper1 = new swiper('#swiper1', {
					slidesPerView: 'auto',
				})
		})
  },
  computed: {

  },
  watch: {},
  methods: {
    goDetails(){
      this.$emit('goDetails')
    }
  },
}
</script>

<style  scoped>
 @import url("../../../static/css/swiper.min.css");
.carousel img{
  width: 100%
}
</style>
