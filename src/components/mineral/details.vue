<template>
	<div class="mineralDetails">
		<div>
			<detailsimage></detailsimage>
			<div class="channelDetailText">
				<div>
					<span class="title">等哈来看风景了看法</span>
				</div>
				<div class="small_content">
					<div class="clearfix row">
							<label>矿种</label>
							<span>
								金属，金，金矿石
							</span>
					</div>
					<div class="clearfix row">
							<label>阶段</label>
							<span>
								开发
							</span>
					</div>
					<div class="clearfix row">
							<label>地区</label>
							<span>
								非洲东非乌干达
							</span>
					</div>
					<div class="row">
						<label class="spanBox">资源储量</label>
						<span>24吨</span>
					</div>
					<div class="row">
						<label class="spanBox">原矿品位</label>
						<span>平均品位19.5 g/t</span>
					</div>
					<!--<div>
						<button>立即报名</button>
					</div>-->
				</div>
			</div>
			<div class="channelSec">
				<div class="title">项目亮点</div>
				<div class="content" :class="{'more' : moreTF}">
					矿权：勘探面积505平方公里，有效期到勘探面积505平方公里，有效期到勘探面积505平方公里，有效期到勘探面积505平方公里，有效期到勘探面积505平方公里，有效期到勘探面积505平方公里，有效期到勘探面积505平方公里，有效期到勘探面积505平方公里，有效期到勘探面积505平方公里，有效期到勘探面积505平方公里，有效期到
				</div>
				<fieldset>
					<legend align="center">
						<div>
							<span @click="moreClick" :class="moreTF ? 'icox' : 'icos'"></span>
						</div>
					</legend>
				</fieldset>
				
			</div>
			<div class="textBox">
				<div class="mrow clearfix">
					<div class="mcol fl">
						<label class="akey">转让价格(万元)</label>
						<span>500万美金</span>
					</div>
					<div class="mcol fl">
						<label class="akey">转让股比</label>
						<span>20%</span>
					</div>
				</div>
				<div class="mrow clearfix">
					<div class="mcol fl">
						<label>发布日期</label>
						<span>2017-04-18</span>
					</div>
					<div class="mcol fl">
						<label>浏览量</label>
						<span>46190次</span>
					</div>
				</div>
			</div>
			<!--<div class="detail_text">
				<flexbox>
			      <flexbox-item :span="11">
			      	<div class="flex-demo commonfont28">新疆托里县哈什克木巴依金矿</div>
			      </flexbox-item>
			      <flexbox-item :span="1">
			      	<div class="flex-demo"><i class="iconfont icon-dalou color_f "></i><br/><span class="shareText commonfonts2">分享</span></div>
			      </flexbox-item>
			   </flexbox>
				<div class="small_detail">
					<flexbox>
				      <flexbox-item>
				      	<div class="flex-demo commonfonts2">
				      		<span>转让价格：</span>
				      		<span class="color_r">面议</span>
				      	</div>
				      </flexbox-item>
				      <flexbox-item>
				      	<div class="flex-demo commonfonts2">
				      		<span>转让股比：</span>
				      		<span class="color_r">面议</span>
				      	</div>
				      </flexbox-item>
				    </flexbox>
				    <br />
				    <flexbox>
				      <flexbox-item>
				      	<div class="flex-demo commonfonts2">
				      		<span>发布日期：</span>
				      		<span>2017-03-30</span>
				      	</div>
				      </flexbox-item>
				      <flexbox-item>
				      	<div class="flex-demo commonfonts2">
				      		<span>浏览量：</span>
				      		<span>10000</span>
				      	</div>
				      </flexbox-item>
				    </flexbox>
				</div>
			</div>-->
		</div>
		<div class="project_details">
			<div class="nav1">
			<sticky scrollBox="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<tab :line-width=4 active-color="#FBA879"  custom-bar-width="1.1rem" v-model="index">
					<tab-item :selected="selected === item" v-for="(item, index) in column" @click="selected = item" :key="index" @on-item-click="toClick(index)">
						{{item}}
					</tab-item>
				</tab>
				<div class="swiperr" v-show="!toShow">
				<swiper v-model="index" :show-dots="false">
			        <swiper-item>
			          <div class="tab-swiper vux-center commonfonts2">
			          	<div class="title_box">
			          		<p>展会信息</p>
			          	</div>
			          	<br />
			          	<flexbox>
					      <flexbox-item :span="2">
					      	<div class="flex-demo">
					      		<span>矿&nbsp;&nbsp;种:</span>
					      	</div>
					      </flexbox-item>
					      <flexbox-item :span="10">
					      	<div class="flex-demo">
					      		<p>金属，金，银...</p>
					      	</div>
					      </flexbox-item>
						</flexbox>
						<br />
						<flexbox>
					      <flexbox-item :span="2">
					      	<div class="flex-demo">
					      		<span>阶&nbsp;&nbsp;段:</span>
					      	</div>
					      </flexbox-item>
					      <flexbox-item :span="10">
					      	<div class="flex-demo">
					      		<p>勘&nbsp;&nbsp;探</p>
					      	</div>
					      </flexbox-item>
						</flexbox>
			          	<!--<div>
			          		<div class="item1"><p>矿种：金属，金，银...</p></div>
			          		<div class="item2"><p>阶段：勘探</p></div>
			          	</div>-->
			          </div>
			        </swiper-item>
			        <swiper-item>
			          <div class="tab-swiper vux-center">
			          	<div>
			          		<p>评论</p>
			          	</div>
			          	<div>
			          		<div>时间：2018年7月24-26日</div>
			          		<div>地点：国家会议中心</div>
			          	</div>
			          </div>
			        </swiper-item>
			     </swiper>
			    </div>
			</sticky>
			</div>
		</div>
		<div class="bottom">
			<flexbox>
			    <flexbox-item style="margin-left:0;">
			      	<div class="flex-demo">
			      		<i class="iconfont icon-zuojiantou"></i><br />
			      		<span class="commonfonts2">关注</span>
			      	</div>
			    </flexbox-item>
			    <flexbox-item style="margin-left:0;border-left:1px solid #Ccc;border-right:1px solid #Ccc;">
			      	<div class="flex-demo">
			      		<i class="iconfont icon-xinxi color"></i><br />
			      		<span class="commonfonts2">约谈</span>
			      	</div>
			    </flexbox-item>
			    <flexbox-item style="margin-left:0;">
			      	<div class="flex-demo btn2">
			      		<span class="commonfont28 color_f">立即投资</span>
			      	</div>
			    </flexbox-item>
		    </flexbox>
		</div>
	</div>
</template>

<script>
	import { Flexbox, FlexboxItem,Tab, TabItem,Sticky,Swiper,SwiperItem} from 'vux'
	import Detailsimage from '@/components/common/Detailsimage';
	export default {
		components: {
			Flexbox, 
			FlexboxItem,
			Detailsimage,
			Tab,
			TabItem,
			Sticky,
			Swiper,
			SwiperItem
		},
		data() {
			return {
				column:["项目详情","公司详情","转让详情"],
				selected:"项目参数",
				childColumn:['项目详情','公司详情','转让详情','评论'],
				childSelected:'项目详情',
				index:0,
				childIndex:0,
				toShow:false,
				moreTF:true
			}
		},
		methods:{
			toClick(index){
				if(index == 2){
					this.toShow = true
				}else{
					this.toShow = false
				}
			},
			moreClick(){
				this.moreTF = !this.moreTF
			}
		}
	}
</script>

<style>
	/*.vux-tab-ink-bar{
		width:100px
	}*/
	.mineralDetails .textBox{
		margin-top: 0.15rem;
		padding: 0.2rem;
		font-size:0.24rem;
		background:#fff
	}
	.mineralDetails .textBox .mrow{
		line-height: 0.45rem;
	}
	.mineralDetails .textBox .mcol{
		width:3.54rem;
	}
	.mineralDetails .textBox label{
		width:1.8rem;
		display: inline-block;
		color:#7B7B7B;
	}
	.mineralDetails .textBox .akey{
		color:#EF852C
	}
	.channelDetailText .small_content label{
		display: inline-block;
		width: 1.2rem;
	}
	.mineralDetails .detail_text {
		padding: 0.2rem;
		background-color: #fff;
	}
	
	/*.mineralDetails .detail_text .title {
		font-size: 0.26rem
	}
	
	.mineralDetails .detail_text .share {
		float: right;
		margin-top: -0.14rem;
	}*/
	
	.mineralDetails .detail_text .icon-dalou {
		color: red;
		font-size: 0.4rem;
	}
	
	/*.mineralDetails .detail_text .share_text {
		font-size: 0.2rem;
	}*/
	/*.mineralDetails .detail_text .small_detail{
		font-size:0.22rem;
	}*/
	
	
	/*.mineralDetails .project_details .nav1 .vux-tab-item:nth-child(3):after{
		content:'﹀'
	}*/
	/*.mineralDetails .vux-tab-item{
		font-size:0.24rem !important;
	}*/
	.mineralDetails .project_details{
		padding:0.15rem 0;		
	}
	/*.mineralDetails .swiperr{
		background-color:#fff
	}
	.mineralDetails .nav1 .swiperr{
		padding:0.2rem;
	}*/
	/*.mineralDetails .nav1 .vux-tab-wrap{
		height:0.8rem;
		padding:0
	}*/
	/*.mineralDetails .nav1 .vux-tab-wrap .vux-tab-container{
		height:0.8rem;
	}
	.mineralDetails .nav1 .vux-tab-wrap .vux-tab-container .vux-tab{
		height:0.8rem;
	}
	.mineralDetails .nav1 .vux-tab-wrap .vux-tab-container .vux-tab .vux-tab-item{
		line-height:0.8rem;
	}*/
	/*.mineralDetails .nav2 .vux-tab-wrap{
		height:0.8rem;
		padding:0
	}*/
	/*.mineralDetails .nav2 .vux-tab-wrap .vux-tab-container{
		height:0.8rem;
	}
	.mineralDetails .nav2 .vux-tab-wrap .vux-tab-container .vux-tab{
		height:0.8rem;
	}
	.mineralDetails .nav2 .vux-tab-wrap .vux-tab-container .vux-tab .vux-tab-item{
		line-height:0.8rem;
	}*/
	/*.mineralDetails .nav1 .title_box{
		font-size:0.28rem;
		line-height:0.5rem;
	}
	.mineralDetails .nav1 .item1,.item2{
		line-height:0.38rem;
	}
	.mineralDetails .nav2 .vux-tab{
		background-color:rgb(242,242,242)
	}
	.mineralDetails .bottom{
		background-color:#fff
	}
	.mineralDetails .center{
		 text-align: center;
	}
	.mineralDetails .color{
		color:rgb(0,161,236)
	}
	.mineralDetails .invest{
		color:#fff;
		background-color:rgb(255,79,85);
		line-height:0.7rem;
	}*/
	
</style>