<template>
	<div class="follow">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">我的关注(<span>{{total}}</span>)</div>
			<div slot="rightA">
				<a slot="right" @click="adm" v-show="!isMan">管理</a>
				<a slot="right" @click="adm" v-show="isMan">取消</a>
			</div>
		</com-header>
		<div class="category clearfix">
			<div class="state item"><span @click="gotypeList('000')">全部</span></div>
			<div class="item "><span>类型</span><i class="iconfont icon-jiantou-copy-copy" v-show="!style" @click="toggleStyle(1)"></i><i class="iconfont icon-jiantou-copy-copy-copy" v-show="style" @click="toggleStyle(2)"></i></div>
		</div>
		<my-scroll ref="scroll" @loadmore='getlist' :isTab="isTab" :total="total" >
			<div class="followCon" :class="{ pb_94: isMan }">
				<div class="conItem clearfix" v-for="(item,index) in attlst" :key="index" @click="gofollowDet(item.type,item.id)">
					<span class="checkBM fl" v-show="isMan">
	   					<input type="checkbox" class="checkbox" :id="item.id" v-model="item.checked" name="sub" @click="radio()"/>
	   					<label :for="item.id"></label>
					</span>
					<div class="conItemL fl">
						<div class="type">
							<span class="text" :class="{invalid:item.status != '2'}">
								{{item.type==510?'旗舰店':(item.type==410?'商品':(item.type==240?'项目交易':(item.type==610?'会展':'投资方')))}}
							</span>
						</div>
						<div class="name">{{item.name?item.name:item.title}}</div>
						<div class="time">{{item.timesUp | fomatDate('yyyy-MM-dd')}}</div>
					</div>
					<div class="conItemR fr"><span class="det" :class="{invalid:item.status != '2'}">{{item.status==2?'详情':'失效'}}</span></div>
				</div>
			</div>
		</my-scroll>
		<footer class="footer allCheckFoot" v-show="isMan">
			<div class="checkBox">
				<span class="checkBM">
       				<input type="checkbox" class="checkbox" id="all" @click="checkAll()"/>
       				<label for="all"></label>
       				<span class="allCheck">全选</span>
				</span>
			</div>
			<button class="btn" @click="unfollow()">取消关注</button>
		</footer>
		
		<!--type  state-->
		<div class="type" v-show="style">
	    	<div class="mask" @click="toggleStyle(2)"></div>
	    	<ul class="skin">
	    		<li v-for="(item,index) in type" :key="index" @click="gotypeList(item.recordType)">{{item.name}}</li>
	    	</ul>
	    </div>
	    
	</div>
	
</template>

<script>
	import { cookie } from 'vux';
	import myScroll from '@/components/base/myScroll'
	export default{
		components: {
			myScroll
		},
		data(){
			return{
				total: 0,
				isTab:false,
				isMan:false, //当前为管理
				check: false,
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
				style: false,
				attlst: [],
				type: [ 
					{name:'商品',recordType:'410'},
					{name:'会展',recordType:'610'},
					{name:'旗舰店',recordType:'510'},
					{name:'投资方',recordType:'250'},
					{name:'项目交易',recordType:'240'},
				],
				pageNum: 1,
				numPerPage: 10,
				recordType: '000',
			}
		},
		methods: {
			adm(){
				this.isMan = !this.isMan;
				$("#all")[0].checked = false;
			},
			all(){},
			toggleStyle(num){
				if(num==1){
					this.style = true;
				}else{
					this.style = false;
				}
			},
			gofollowDet(type,id){
				if(this.isMan) return
				var channel = type==510?'/flagship?shopId=':(type==410?'/mall/details?id=':(type==240?'/mineral/projectDetails?id=':(type==610?'/exhibition/details?id=':'/mineral/investorDetails?id=')))
				location.href = this.$root.urlPath.MCM + channel + id + '&newpage=newpage';
			},
			gotypeList(recordType){
				$("#all")[0].checked = false;
				this.$refs.scroll.init()
				this.attlst = []
				this.pageNum = 1
				this.style = false;
				this.recordType = recordType;
				this.isTab = true;
				this.getlist();
			},
			getlist(){
				this.$axios.get(this.$root.urlPath.MCT+'/wapAttentionCenter/wapAttention', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
					params: {
						pageNum: this.pageNum,
						numPerPage: this.numPerPage,
						recordType: this.recordType,
					}
				})
				.then(res => {
					this.isTab = false;
					this.$refs.scroll.loaded()
					var data = res.data;
					this.total = data.data.totalCount;
					this.attlst = this.attlst.concat(data.data.attlst);
					
					this.attlst.forEach(ele => {
						this.$set(ele, 'checked', false); 						
					});
					if(this.total == this.attlst.length && this.total !== 0){
						this.$refs.scroll.complete()
					}else{
						this.pageNum++
					}
				}).catch(err => console.log('个人账户异常', err));		
			},
			unfollow(){
				var ids = '',resultCheckOrderId = '';
				var $subs = $("input[name='sub']");
				if( ($subs.filter(":checked").length) <= 0){
					this.$vux.toast.text('请选择要取消的内容', 'center');
					return
				}else{
					this.attlst.forEach(ele => {
						if(ele.checked){
							ids += ele.id + ',';
							resultCheckOrderId = ids.slice(0, ids.length - 1);
						}
					})
				}
				var _this = this;
			    this.$vux.confirm.show({
				    title: '操作提示',
				    content: '您确定要取消关注吗？',
				    onShow () {},
				    onHide () {},
				    onCancel () {},
				    onConfirm () {
				    	var allVal = $("#all")[0].checked;
		    			if(allVal){
		    				$(".follow .vux-divider")[0].style.display = 'none';
		    			}
				    	_this.$axios.get(_this.$root.urlPath.MCT+'/wapAttentionCenter/wapCancelAttention', {
				    		headers:{
				    			'MC_UID': cookie.get('MC_UID')
				    		},
				    		params: {
				    			ids: resultCheckOrderId,
				    		}
				    	})
				    	.then(res => {
				    		if(res.data.success){
				    			_this.isMan = false;
				    			_this.$vux.toast.text('取消关注成功', 'center')
				    			_this.attlst = []
				    			_this.getlist()
				    		}else{
				    			_this.$vux.toast.text('取消失败，请重新取消', 'center');
				    		}
				    	}).catch(err => {
				    		_this.$vux.toast.text(err, 'center');
				    	});
				    }
			    })
			},
			checkAll(){
				var allVal = $("#all")[0].checked
				this.attlst.forEach(ele => {
					ele.checked = allVal;
				})
			},
			radio(){
				var $subs = $("input[name='sub']");
				$("#all").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
			}
		},
		mounted(){
			this.getlist()
		}
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");	
	@import url("../../../static/css/allCheckFoot.css");
	@import url("../../../static/css/checkBox.css");
	.pb_94{
		padding-bottom: 0.94rem;
	}
	.follow .vux-header .vux-header-right a{
		font-size: 0.3rem;
		color: #fff;
	}
	
	.follow .weui-mask_transparent{
		opacity: 0;
	}
	
	.follow .type .mask, .follow .state .mask{
	    position: fixed;
	    z-index: 10;
	    top: 0;
	    right: 0;
	    left: 0;
	    bottom: 0;
        background: rgba(0, 0, 0, 0);
	}
	.follow .type .skin,.follow .state .skin{
		width: 50%;
		background-color: #fff;
		position: fixed;
		box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
		z-index: 100;
	}
	.follow .type .skin{
		top: 2rem;
		right: 0;
	}
	.follow .state .skin{
		top: 2rem;
		left: 0;
	}
	.follow .type .skin li,.follow .state .skin li{
		padding: 13px 24px;
	    font-size: 0.28rem;
	    border-bottom: 1px solid #D9D9D9;
	    color: #333;
	}
	.follow .type .skin li:last-child,.follow .stage .skin li:last-child{
		border-bottom: none;
	}
</style>