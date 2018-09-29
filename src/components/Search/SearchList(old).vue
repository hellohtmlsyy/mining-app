<template>
	<div class="searchL">
		<flexbox orient="vertical" class="fix">
			<div class="search">
				<div class="sea_box">
					<i class="iconfont icon-jiantou-copy color_f" @click="revert()"></i>
					<form action="" style="display: inline;">
						<input type="text" v-model="val" id="search" @click="toJump()" readonly="readonly">          	
					</form>
					<!--<i class="iconfont icon-cuowu" @click="empty()"></i>-->
					<!--<a href="javascript:;" class="sea_text color_f" @click="search()">搜索</a>-->
				</div>
			</div>
		</flexbox>
		<div style="position: relative;left: 0;top: 0.92rem;" id="scrop">
			<!--<div class="bar">
				<ul class="clearfix" v-model="navlist.index">
					<li v-for="(item,index) in navlist" :key="item.id" @click="tab(index)" :class="{active:index == num}">
						<a href="javascript:;">{{item.name}}</a>
					</li>
				</ul>
			</div>-->
			<div class="num clearfix">
				<span>矿业圈已为您搜索相关结果约{{pages?pages:0}}个</span>
				<div class="icoliebiao" v-show="styShow">
					<i class="icon iconfont icon-liebiao" @click="switchFirst" :style="{'color':shohid ? '#333' : '#aaa'}"></i>
					<i class="icon iconfont icon-liebiao1" @click="switchSecond" :style="{'color':shohid ? '#aaa' : '#333'}"></i>
				</div>
			</div>
			<Malllist :shohid="shohid" :list="list" v-show="Malllist" :imgShow="imgShow" :loading="loading"></Malllist>
			<Flagshiplist :list="list" v-show="Flagshiplist" ></Flagshiplist>
			<Minerallist :shohid="!shohid" :list="list" v-show="Minerallist" :loading="loading"></Minerallist>
			<Exhibitionlist :shohid="shohid" :list="list" v-show="Exhibitionlist" :loading="loading"></Exhibitionlist>
			<Newslist :shohid="shohid" :list="list" v-show="Newslist" :loading="loading"></Newslist>
			<load-more :tip="loadingCon" :show-loading="loading" v-show="loading"></load-more>
			<divider v-show="droploadDowm">已加载所有数据</divider>
		</div>
	</div>
</template>
<script>
	import SearchHead from '@/components/common/SearchHead';
	import Mlist from '@/components/common/Mlist';
	import Minerallist from '@/components/common/Mineral-list';
	import Exhibitionlist from '@/components/common/Exhibition-list';
	import Malllist from '@/components/common/Mall-list';
	import Newslist from '@/components/common/News-list';
	import Flagshiplist from '@/components/common/flagship-list';
	import { Flexbox, Alert, Divider, AlertModule } from 'vux';	
	import axios from 'axios'
	export default {
		data() {
			return {
				styShow:true,
				num: this.$route.params.category - 1,
				navlist: [{
					name: '商城',
					id: 1
				}, {
					name: '旗舰店',
					id: 2
				}, {
					name: '矿权交易',
					id: 3
				}, {
					name: '会展中心',
					id: 4
				}, {
					name: '新闻',
					id: 5
				}],
				text: [],
				list: [],
				imgShow:false,
				val: decodeURI(this.$route.query.key),
				Flagshiplist: false,
				Newslist: false,
				Exhibitionlist: false,
				Minerallist: false,
				Malllist: true,
				shohid: true,
				pages: 0,
				pageNum: 1,
				numPerPage: 10,
				total: 0,
				cateId: this.$route.params.category,
				isscroll: true,
				droploadDowm: false,
				off_on:false,//分页开关
				timers:null,
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
				equi:navigator.userAgent,
				loading:true,
				loadingCon:'正在加载'
			}
		},
		components: {
			Flexbox,
			SearchHead,
			Mlist,
			Alert,
			Divider,
			Minerallist,
			Exhibitionlist,
			Flagshiplist,
			Malllist,
			Newslist,
			AlertModule,
		},
		methods: {
			toJump() {
				location.href = this.$root.urlPath.MCM + "/search";
			},
			empty() {
				this.val = '';
			},
			revert() {
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
			search() {
				let vals=$.trim(this.$refs.sea_inp.value);  
				let index = this.cateId;
				if(!vals) {
					this.$vux.toast.text('请输入搜索关键字', 'center');
					return;
				} else {
					this.list=[];
					
					location.href = this.$root.urlPath.MCM + '/search/list/'+this.cateId+'?&key=' + encodeURIComponent(this.$refs.sea_inp.value);
//					this.$router.push({
//						name:search.list,
//						params:this.cateId
//					}
				}				
			},
			tab(index) {
				this.list=[];
				this.droploadDowm=false;
				this.pageNum = 1;
				if(index==1){
					this.styShow=false;
				}else{
					this.styShow=true;
				}
				switch(index) {
					case 0:
						this.cateId = 1;
						this.Malllist = true;
						this.Flagshiplist=false;
						this.Exhibitionlist = false;
						this.Minerallist = false;
						this.Newlist = false;						
						break;
					case 1:
						this.cateId = 2;
						this.Malllist = false;
						this.Flagshiplist=true;
						this.Minerallist = false;
						this.Exhibitionlist = false;
						this.Newlist = false;
						break;
					case 2:
						this.cateId = 3;
						this.Malllist = false;
						this.Flagshiplist=false;
						this.Minerallist = true;
						this.Exhibitionlist = false;
						this.Newlist = false;
						break;
					case 3:
						this.cateId = 4;
						this.Malllist = false;
						this.Flagshiplist=false;
						this.Exhibitionlist = true;
						this.Minerallist = false;
						this.Newlist = false;
						break;
					case 4:
						this.cateId = 5;
						this.Malllist = false;
						this.Flagshiplist=false;
						this.Exhibitionlist = false;
						this.Minerallist = false;
						this.Newslist = true;
						break;
					default:
						break;
				}
				this.num = index;
				this.$axios.get(this.$root.urlPath.MC + '/wap/search.do?search', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
							category: this.cateId,
							key: this.val
						}
					})
					.then(res => {
						if(res.data.success) {
							let data = res.data.data.list;
							this.list = [];
							this.list = data;
							this.pages = res.data.data.totalCount;
							this.off_on=true;
							for(var i in data){
								data[i].insert_time = parseInt(data[i].insert_time);
								data[i].begin_time=parseInt(data[i].begin_time);
								data[i].end_time=parseInt(data[i].end_time);
							}
						} else {
							this.pages = res.data.data.totalCount || 0;
							this.isscroll = false;
							this.off_on=true;
						}
					})
					.catch(err => console.log('获取数据失败', err))
			},
			scrollValue(){
				var that = this;
				window.addEventListener('scroll', function() {
				//获取滚动条当前的位置
				let scrollTop1 = 0;
				if(document.documentElement && document.documentElement.scrollTop) {
					scrollTop1 = document.documentElement.scrollTop;
				} else if(document.body) {
					scrollTop1 = document.body.scrollTop;
				}
				//获取当前可视范围的高度 
				let clientHeight1 = 0;
				document.documentElement.scrollTop||document.body.scrollTop
				if(document.body.clientHeight && document.documentElement.clientHeight) {
					clientHeight1 = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
				} else {
					clientHeight1 = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
				}
				//获取文档完整的高度 
				let goodsConHeight = document.getElementById('scrop');				
				let scrollHeight1 = goodsConHeight.scrollHeight;
				//滚动事件触发
				$(window).bind('scroll', function() {
					if(scrollTop1 + clientHeight1 >= scrollHeight1 + 10) {
						if(that.off_on) {
							that.off_on = false;
							that.pageNum++;
							let category1 = that.cateId;
							that.loadByCategroyId(category1);							
						}
					}
				})
				let page = Math.ceil(that.pages/that.numPerPage);
				if(that.pageNum == page && that.list.length == that.pages && that.loading == false) {
					that.off_on = false;
					that.droploadDowm = true;
//					$(window).unbind('scroll');
				}				
			});},
			switchFirst() {
				this.shohid = true
			},
			switchSecond() {
				this.shohid = false;
			},
			loadByCategroyId(category) {
				this.loading = true
				this.$axios.get(this.$root.urlPath.MC + '/wap/search.do?search', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
							category: category,
							key: this.val
						}
					})
					.then(res => {
						this.loading = false
						if(res.data.success) {
							
							var data = res.data.data;
							this.pages = data.totalCount;
							for(var i in data.list) {
								this.list.push(data.list[i]);
								data.list[i].insert_time=parseInt(data.list[i].insert_time);
								data.list[i].begin_time=parseInt(data.list[i].begin_time);
								data.list[i].end_time=parseInt(data.list[i].end_time);
							}							
							this.off_on=true;
							this.total = Math.ceil(this.pages / this.numPerPage);
						} else {
							this.pages = data.totalCount || 0;
							this.isscroll = false;
							this.$vux.alert.show({
								title: '提示',
								content: "加载数据失败",
							})
						}
					})
					.catch(err => console.log('获取图片失败', err));
			}
		},
		created() {
			this.val = decodeURI(this.$route.query.key);
			let category = this.$route.params.category;
			this.loadByCategroyId(category);
			this.scrollValue();
		},
		mounted(){            
            var that = this;
			$("#search").on('keypress', function(e) {
				var keycode = e.keyCode;
				if (keycode == '13') {
					e.preventDefault();
					that.search();
				}
			});
			let index = this.$route.params.category;
			if(index==1){
				this.Malllist = true;
				this.Flagshiplist=false;
				this.Exhibitionlist = false;
				this.Minerallist = false;
				this.Newlist = false;	
			}else if(index==2){
				this.Malllist = false;
				this.Flagshiplist=true;
				this.Minerallist = false;
				this.Exhibitionlist = false;
				this.Newlist = false;
			}else if(index==3){
				this.Malllist = false;
				this.Flagshiplist=false;
				this.Minerallist = true;
				this.Exhibitionlist = false;
				this.Newlist = false;
			}else if(index==4){
				this.Malllist = false;
				this.Flagshiplist=false;
				this.Exhibitionlist = true;
				this.Minerallist = false;
				this.Newlist = false;
			}else if(index==5){
				this.Malllist = false;
				this.Flagshiplist=false;
				this.Exhibitionlist = false;
				this.Minerallist = false;
				this.Newslist = true;
			}else{
				return;
			}
        },
	}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import url("../../static/css/searchHead.css");
.fix{
	position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}
 ::-webkit-scrollbar {
	width: 0px;
	display: none;
	background-color: #fff;
}
.droploadDowm {
	font-size: 0.3rem;
	padding: 10px 0 !important;
	color: #333 !important;
}

/* bar */	
.num {
	padding: 0.25rem 0.15rem;
	border-bottom: 0.15rem solid #ececec;
	position: relative;
	background: #fff;
}
.num span {
	color: #ababab;
	font-size: 0.24rem;
}
.num .icoliebiao{
	float: right;
}

.mallList .contentItem img{
	width: 1.65rem;
    height: 1.65rem;
}
</style>