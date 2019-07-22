<!--  -->
<template>
  <div class='act20190510'>
    <div class="revert" @click="back">
			<i class="icon iconfont icon-jiantou-copy color_f"></i>
		</div>
    <div class="info" @click="share" v-if="!wxDevice">
      <i class="icon iconfont icon-tubiao212 color_f"></i>
    </div>
    <div class="img-box" >
      <div class="banner mb-40"><img src="../../../../static/img/act/20190510/banner-wap.jpg" alt=""></div>
      <div class="inv mb-40">
        <span class="">亲爱的矿业圈会员们</span><br>
        曾记否，2017我们游武夷山、踏甘肃张掖，2018三亚浪漫天涯<br>
        2019年7月，让我们携手而行，前往丝绸之路的新疆<br>
        <span class="col-ff7200">观“乌鲁木齐大巴扎、天池美景、达坂城姑娘、吐鲁番葡萄、哈密矿业项目”之美景</span><br>
        品地方美食，观览西部大美风景同时考察矿业圈合作项目
      </div>
      <div class="inv invt mb-40">
        <span class="tit">新疆丝路矿业合作论坛新疆国际矿业与装备博览会</span><br>
        <p><span>一、举办时间与地点</span><br>2019新疆丝路矿业合作论坛新疆国际矿业与装备博览会 7月18-20日  乌鲁木齐·新疆国际会展中心</p>
        <p><span>二、主题</span><br>凝聚丝路智慧   筑梦矿业未来</p>
        <p>
          <span>三、组织机构</span><br>
          （一）批准单位： 商务部<br>
          （二）特别协办：国家三〇五项目办公室<br>
          （三）协办单位：中国有色金属工业协会地质矿产分会、中国地质学会矿山地质专业委员会、中国有色金属学会地质学术委员会、中国恩菲工程技术有限公司
          （四）支持单位: 江西省核工业地质局、广西地质矿产勘查开发局、新疆维吾尔自治区矿业联合会、安徽省矿业商会、安徽省工程爆破协会、吉尔吉斯斯坦国家工业、能源与矿产资源委员会、乌兹别克斯坦共和国矿产资源委员会、塔吉克斯坦共和国地质总局、哈萨克斯坦共和国能源和矿产部、哈萨克斯坦国家科学院、俄罗斯联邦国家科学院乌拉尔分院
        </p>
      </div>
      <div class="con mb-40">
        <img src="../../../../static/img/act/20190510/schedule.png" alt="">
        <div class="telphone">
						<a href="tel:4008196985" class="tel">4008196985&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
						<a href="tel:13701158561" class="tel">13701158561</a>
					</div>
      </div>
    </div>
    <div class="sign">
        <span class="btn">
            <a href="http://m.miningcircle.com/exhibition/details?id=55118bd18b8b4790a6bab761f21e002f&newpage=newpage">点击报名</a>
        </span>
    </div>
  </div>
</template>

<script>
import {
    wxShare,
    lastPage,
    isDevice,
    getAppShare,

} from '@/assets/commonjs/util.js';
export default {
  components: {},
  data() {
    return {
      show1:false,
      url:window.location.href,
      wxDevice:false
    };
  },
  created() {
    let title = '2019矿业圈新疆考察之旅'
    let desc = '曾记否，2017我们游武夷山、踏甘肃张掖，2018三亚浪漫天涯，2019年7月，让我们携手而行，前往丝绸之路的新疆'
    wxShare(this.$root.urlPath.MCT + '/wx/share', this.url, title, '', desc, '');
    if(isDevice() == '微信浏览器'){
      this.wxDevice = true
    }
  },
  computed: {

  },
  watch: {},
  methods: {
    back() {
				lastPage()
    },
    share() {
      if(isDevice() == "其他浏览器") {
        // this.show1 = true
      }else{
        getAppShare(this.url,'2019矿业圈新疆考察之旅', '', '曾记否，2017我们游武夷山、踏甘肃张掖，2018三亚浪漫天涯，2019年7月，让我们携手而行，前往丝绸之路的新疆')
      }
    },
  },
}
</script>

<style lang='' scoped>

  .act20190510 .mb-40 {
    margin-bottom: .3rem;
  }

  .act20190510 .col-ff7200 {
    color: #ff7200;
  }

  .act20190510 {
    background-image: linear-gradient(0deg, #bae9ff 0%, #fff5e2 100%);
    padding-bottom: 2rem;
    position: relative;
  }

  .act20190510 .inv {
      color: #000;
      font-size: .16rem;
      line-height: .42rem;
      text-align: center;
      padding: 0 .26rem;
  }

  .act20190510 .inv span {
    font-size: .26rem;
    font-weight: 700;
  }

  .act20190510 .invt {
    font-size: .28rem;
    line-height: .46rem;
  }

  .act20190510 .invt .tit {
    font-size: .3rem;
    color: red;
    display: inline-block;
    margin: .2rem 0;
  }

  .act20190510 .con {
    position: relative;
  }

  .act20190510 .con .telphone {
    position: absolute;
    font-size: .16rem;
    left: 50%;
    bottom: .52rem;
    opacity: 0;
    margin-left: -1.6rem;
  }

  .act20190510 img{
    width: 100%;
  }

  .act20190510 .revert{
    top: 0.66rem;
  }

  .act20190510 .info {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.6rem;
    background-color: rgba(119, 110, 93, .6);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0.66rem;
    right: 0.2rem;
  }

  .act20190510 .icon-tubiao212{
    font-size: 0.3rem;
  }

  .act20190510 .sign .btn{
    color: #fff;
    font-size: 0.26rem;
    padding: 0.2rem 1.36rem;
    background-color: #632500;
    border-radius: 0.35rem;
    display: inline-block;
  }

  .act20190510 .sign{
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 1rem;
  }

  .act20190510 .img-box{
    line-height: 0;
  }
</style>
