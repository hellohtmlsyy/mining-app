<template>
	<div class="mynews">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">我的消息</div>
			<div slot="rightA">
				<a slot="right" @click="adm()" v-show="!isMan">管理</a>
				<a slot="right" @click="checkAll()" v-show="isMan">{{all}}<input type="checkbox" class="checkbox" id="all"/></a>
			</div>
		</com-header>
		<div class="category clearfix">
			<div class="state item"><span @click="system()">系统通知</span></div>
			<div class="item "><span>类型</span><i class="iconfont icon-jiantou-copy-copy" v-show="!arrow" @click="toggleArrow(1)"></i><i class="iconfont icon-jiantou-copy-copy-copy" v-show="arrow" @click="toggleArrow(2)"></i></div>
		</div>
		<my-scroll ref="scroll" @loadmore='getlist' :isTab="isTab" :total="total" :class="{ pb_94: isMan }">
			<div class="mynewsCon" >
				<div class="conItem clearfix" v-for="(item,index) in noteVOS" :key="index" @click="goDet(item.id,item.type)">
					<span class="checkBM fl" v-show="isMan">
	   					<input type="checkbox" class="checkbox" :id="item.id" v-model="item.checked" name="sub" @click="radio()"/>
	   					<label :for="item.id"></label>
					</span>
					<div class="conItemL fl">
						<div class="tit"><span class="circle" v-show="item.status==0"></span><span class="text" id="form">{{item.userName != '' && item.userName != null ? item.userName : '矿业圈'}}</span></div>
						<div class="info">{{item.title|subStr(16)}}</div>
						<div class="monitor">{{item.content|subStr(18)}}</div>
					</div>
					<div class="conItemR fr"><span class="time">{{item.createdTime | fomatDate('yyyy-MM-dd')}}</span></div>
				</div>
			</div>
		</my-scroll>
		<footer class="readFooter clearfix" v-show="isMan">
			<div class="marked_read item fl" @click="read('noteClick')">标为已读</div>
			<div class="fl item" @click="read('noteDelete')">删除</div>
		</footer>
		<!--type-->
	    <div class="type" v-show="arrow">
	    	<div class="mask" @click="toggleArrow(2)"></div>
	    	<ul class="skin">
	    		<li v-for="(item,index) in type" :key="index" @click="gotypeList(item.recordType)">{{item.name}}</li>
	    	</ul>
	    </div>
	    
	    <confirm v-model="showAuth" @on-cancel="onCancel" @on-confirm="toAuth" @on-show="onShow" @on-hide="onHide">
			<p style="text-align:center;">您的账户未认证企业！是否现在前去认证？</p>
		</confirm>
	</div>
	
</template>

<script>
	import { TransferDom, Actionsheet, Group, XSwitch, Toast, cookie } from 'vux';
	import {appLogin} from '@/assets/commonjs/util.js';
	import myScroll from '@/components/base/myScroll';
	export default{
		components: {
		    Actionsheet,
		    Group,
		    XSwitch,
		    Toast,
		    myScroll
		},
		directives: {
			TransferDom
		},
		data(){
			return{
				isTab:false,
				isMan:false, //当前为管理
				arrow: false,
				showAuth: false,
				form: '矿业圈',
				type: [
					{name:'商品约谈',recordType:'430'},
					{name:'项目约谈',recordType:'230'},
					{name:'投资约谈',recordType:'001'},
					{name:'店铺留言',recordType:'002'},
				],
				noteVOS: [],
				pageNum: 1,
				numPerPage: 10,
				cat: 0,
				total: 0,
				function: 'noteClick',
				all: '全选',
			}
		},
		methods: {
			adm(){
				this.isMan = !this.isMan
			},
			goDet(id,type){
				if(this.isMan) return
				this.$axios.get(this.$root.urlPath.MCT+'/wapNote/wapNoteOperate', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
					params: {
						function: 'noteClick',
						status: 0,
						ids: id,
					}
				})
				.then(res => {
					this.noteVOS.forEach(ele=>{
						if(ele.id == id){
							ele.status = 1;
						}
					})
					location.href = this.$root.urlPath.MCM + '/users/newsDetail?id=' + id + '&type=' + type +'&newpage=newpage';
				}).catch(err => console.log('个人账户异常', err));	
			},
			toggleArrow(num){
				if(num==1){
					this.arrow = true;
				}else{
					this.arrow = false;
				}
			},
			gotypeList(recordType){
				this.$refs.scroll.init()
				this.noteVOS = []
				this.pageNum = 1
				this.arrow = false;
				this.isTab = true;
				this.$axios.get(this.$root.urlPath.MCT+'/wap/company/comInfo', {
						headers:{
							'MC_UID': cookie.get('MC_UID')
						},
					})
					.then(res => {
						let mstatus = res.data.status;
						if(mstatus==1){
							this.showAuth=false;
							this.$vux.toast.text('您的企业正在申请中<br/>客服：400-819-6985', 'center');
							return;
						}else if(mstatus==0||mstatus==3){
							this.showAuth=true;					
						}else if(mstatus==2){
							this.showAuth=false;
							if(recordType == '430' || recordType == '230'){
								this.$axios.get(this.$root.urlPath.MCT+'/wapNote/wapInterviewNoteList', {
									headers:{
										'MC_UID': cookie.get('MC_UID')
									},
									params: {
										pageNum: 1,
										numPerPage: 10,
										cat: this.cat,
										status: recordType,
									}
								})
								.then(res => {
									if(res.data.success){
										this.isTab = false;
										this.$refs.scroll.loaded();
										var data = res.data;
										this.noteVOS = this.noteVOS.concat(data.data.wapNoteAndUserVOS);
										this.total = data.data.totalCount;
										this.noteVOS.forEach(ele=>{
											this.$set(ele,'checked',false);
										})
										//加载下一页
										if(this.total == this.noteVOS.length && this.total !== 0){
											this.$refs.scroll.complete()
										}else{
											this.pageNum++
										}
									}
								})
								.catch(err => console.log('个人账户异常',err));
							}else if(recordType == '001'){
								//投资约谈
								this.$axios.get(this.$root.urlPath.MCT+'/wapNote/wapInvestorInterviewNoteList', {
									headers:{
										'MC_UID': cookie.get('MC_UID')
									},
									params: {
										pageNum: 1,
										numPerPage: 10,
									}
								})
								.then(res => {
									if(res.data.success){
										this.isTab = false;
										this.$refs.scroll.loaded();
										var data = res.data;
										this.noteVOS = this.noteVOS.concat(data.data.wapNoteAndUserVOS);
										this.total = data.data.totalCount;
										this.noteVOS.forEach(ele=>{
											this.$set(ele,'checked',false);
										})
										//加载下一页
										if(this.total == this.noteVOS.length && this.total !== 0){
											this.$refs.scroll.complete()
										}else{
											this.pageNum++
										}
									}
								})
							}else if(recordType == '002'){
								//店铺留言
								this.$axios.get(this.$root.urlPath.MCT+'/wapNote/wapStoreMessageList', {
									headers:{
										'MC_UID': cookie.get('MC_UID')
									},
									params: {
										pageNum: 1,
										numPerPage: 10,
									}
								})
								.then(res => {
									if(res.data.success){
										this.isTab = false;
										this.$refs.scroll.loaded();
										var data = res.data;
										this.noteVOS = this.noteVOS.concat(data.data.wapNoteAndUserVOS);
										this.total = data.data.totalCount;
										this.noteVOS.forEach(ele=>{
											this.$set(ele,'checked',false);
										})
										//加载下一页
										if(this.total == this.noteVOS.length && this.total !== 0){
											this.$refs.scroll.complete()
										}else{
											this.pageNum++
										}
									}
								})
								.catch(err => console.log('个人账户异常',err));
							}
						}else if(mstatus==4){
							this.showAuth=false;
							this.$vux.toast.text('您的企业已冻结<br/>客服：400-819-6985', 'center');
							return;
						}
				}).catch(err => console.log('个人账户异常', err));	
			},
			onCancel(){},
			onShow(){},
			onHide(){},
			toAuth(){
				location.href = 'http://trade.miningcircle.com/cert?newpage=newpage';
			},
			getlist(){
				this.$axios.get(this.$root.urlPath.MCT+'/wapNote/wapNoteList', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
					params: {
						pageNum: this.pageNum,
						numPerPage: this.numPerPage,
						cat: this.cat,
					}
				})
				.then(res => {
					if(res.data.success){
						this.isTab = false;
						this.$refs.scroll.loaded();
						var data = res.data;
						this.noteVOS = this.noteVOS.concat(data.data.noteVOS);
						this.total = data.data.totalCount;
					
						this.noteVOS.forEach(ele=>{
							this.$set(ele,'checked',false);
						})
						//加载下一页
						if(this.total == this.noteVOS.length && this.total !== 0){
							this.$refs.scroll.complete()
						}else{
							this.pageNum++
						}
					}
				})
				.catch(err => console.log('个人账户异常',err));
			},
			system(){
				this.noteVOS = [];
				this.pageNum = 1;
				this.getlist();
			},
			read(fun){
				var ids = '',resultCheckOrderId = '',content = '',idx = [];
				content = fun == 'noteClick'? '您确定要将此消息标为已读吗？':'您确定要删除此消息吗？'
				var $subs = $("input[name='sub']");
				if( ($subs.filter(":checked").length) <= 0){
					this.$vux.toast.text('请选择要取消的内容', 'center');
					return
				}else{
					this.noteVOS.forEach(function(ele,index){
						if(ele.checked){
							ids += ele.id + ',';
							idx.push(index);
							resultCheckOrderId = ids.slice(0, ids.length - 1);
						}
					})
				}
				var _this = this;
				
				this.$vux.confirm.show({
				    title: '操作提示',
				    content: content,
				    onShow () {},
				    onHide () {},
				    onCancel () {},
				    onConfirm () {
				    	var allVal = $("#all")[0].checked;
		    			if(allVal){
		    				$(".mynews .vux-divider")[0].style.display = 'none';
		    			}
		    			var form = $('#form')[0].innerHTML
		    			if(form == '矿业圈'){
					    	_this.$axios.get(_this.$root.urlPath.MCT+'/wapNote/wapNoteOperate?', {
					    		headers:{
					    			'MC_UID': cookie.get('MC_UID')
					    		},
					    		params: {
					    			ids: resultCheckOrderId,
					    			status: 0,
					    			function: fun,
					    		}
					    	})
					    	.then(res => {
					    		if(res.data.success){
					    			_this.isMan = false;
					    			if(fun == 'noteDelete'){
					    				_this.$vux.toast.text('删除消息成功', 'center')
					    			}else{
	//				    				_this.$vux.toast.text('消息标为已读成功', 'center')
					    			}
					    			_this.$refs.scroll.init()
					    			_this.noteVOS = [];
					    			_this.pageNum = 1;
					    			_this.getlist()
					    		}else{
					    			if(fun == 'noteDelete'){
					    				_this.$vux.toast.text('删除消息失败', 'center')
					    			}else{
					    				_this.$vux.toast.text('消息标为已读失败', 'center')
					    			}
					    		}
					    	}).catch(err => console.log('个人账户异常', err));	
		    			}else{
		    				_this.$axios.get(_this.$root.urlPath.MCT+'/wapNote/wapDelMessage', {
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
					    			if(fun == 'noteDelete'){
					    				_this.$vux.toast.text('删除消息成功', 'center')
					    			}else{
	//				    				_this.$vux.toast.text('消息标为已读成功', 'center')
					    			}
					    			_this.$refs.scroll.init()
					    			_this.noteVOS = [];
					    			_this.pageNum = 1;
					    			_this.getlist()
					    		}else{
					    			if(fun == 'noteDelete'){
					    				_this.$vux.toast.text('删除消息失败', 'center')
					    			}else{
					    				_this.$vux.toast.text('消息标为已读失败', 'center')
					    			}
					    		}
					    	}).catch(err => console.log('个人账户异常', err));	
		    			}
				    }
			    })
			},
			checkAll(){
				var allVal = $("#all")[0].checked
				console.log(allVal)
				this.noteVOS.forEach(ele => {
					ele.checked = allVal;
				})
				if(allVal){
					this.all = '取消';
				}else{
					this.all = '全选';
					this.isMan = !this.isMan;
				}
			},
			radio(){
				var $subs = $("input[name='sub']");
				$("#all").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
			}
		},
		mounted(){
			if(cookie.get('MC_UID')) {
				this.noteVOS = []
				this.getlist()
			}else{
				appLogin()
			}
		}
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");	
	@import url("../../../static/css/allCheckFoot.css");
	@import url("../../../static/css/checkBox.css");
	.mynews #all{
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		right: 0.3rem;
		top: 0.3rem;
		opacity: 0;
	}
	.checkBM .checkbox:checked+label{
		background-color: #11A9FC;
	}
	.pb_94{
		padding-bottom: 0.94rem;
	}
	.mynews .type .mask{
	    position: fixed;
	    z-index: 10;
	    top: 0;
	    right: 0;
	    left: 0;
	    bottom: 0;
        background: rgba(0, 0, 0, 0);
	}
	.mynews .type .skin{
		width: 50%;
		background-color: #fff;
		position: fixed;
		top: 2rem;
		right: 0;
		box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
		z-index: 100;
	}
	.mynews .type .skin li{
		padding: 13px 24px;
	    font-size: 0.28rem;
	    border-bottom: 1px solid #D9D9D9;
	    color: #333;
	}
	.mynews .type .skin li:last-child{
		border-bottom: none;
	}
</style>