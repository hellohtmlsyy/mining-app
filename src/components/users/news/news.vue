<template>
	<div class="mynews">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">未读消息({{newsNum}})</div>
			<div slot="rightA">
				<a slot="right" @click="adm()" v-show="!isMan">管理</a>
				<a slot="right" @click="adm()" v-show="isMan">取消</a>
			</div>
		</com-header>
		<my-scroll ref="scroll" @loadmore='getlist' :isTab="isTab" :total="total" :class="{ pb_94: isMan }">
			<div class="mynewsCon">
				<div class="conItem" v-for="(item,index) in noteVOS" :key="index" @click="goDet(item.id,item.type)">
					<div style="padding-bottom:0.32rem;border-bottom: 1px solid #e5e5e5;" class="clearfix">
						<span class="checkBM fl" v-show="isMan">
							<input type="checkbox" class="checkbox" :id="item.id" v-model="item.checked" name="sub" @click="radio()" />
							<label :for="item.id"></label>
						</span>
						<div class="news-logo">
							<img src="../../../../static/img/user2.0/personal/news-logo.png" alt="" style="width: 0.9rem;">
							<span class="circle" v-show="item.status==0"></span>
						</div>
						<div class="conItemL fl">
							<div class="info">矿业圈温馨提示</div>
							<div class="monitor" :class="{active2: (item.status==0)}">{{item.content|subStr(15)}}</div>
						</div>
						<div class="conItemR fr"><span class="time">{{item.createdTime | fomatDate('yyyy-MM-dd')}}</span></div>
					</div>
				</div>
			</div>
		</my-scroll>

		<footer class="footer allCheckFoot" v-show="isMan">
			<div class="checkBox">
				<span class="checkBM">
					<input type="checkbox" class="checkbox" id="all" @click="checkAll()" />
					<label for="all"></label>
					<span class="allCheck">全选</span>
				</span>
			</div>
			<span class="read" @click="read('noteClick')">标为已读</span>
			<span class="del" @click="read('noteDelete')">删除</span>
		</footer>
	</div>

</template>

<script>
	import {
		TransferDom,
		Actionsheet,
		Group,
		XSwitch,
		Toast,
		cookie
	} from 'vux';
	import {
		appLogin
	} from '@/assets/commonjs/util.js';
	import myScroll from '@/components/base/myScroll';
	export default {
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
		data() {
			return {
				isTab: false,
				isMan: false, //当前为管理
				noteVOS: [],
				pageNum: 1,
				numPerPage: 10,
				cat: 0,
				total: 0,
				function: 'noteClick',
				newsNum: 0,
			}
		},
		methods: {
			adm() {
				this.isMan = !this.isMan;
				$("#all")[0].checked = false;
				this.noteVOS.forEach(ele => {
					ele.checked = false;
				})
			},
			goDet(id, type) {
				if (this.isMan) return
				this.getnewsNum();
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapNoteOperate', {
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
						params: {
							function: 'noteClick',
							status: 0,
							ids: id,
						}
					})
					.then(res => {
						this.noteVOS.forEach(ele => {
							if (ele.id == id) {
								ele.status = 1;
							}
						})
						location.href = this.$root.urlPath.MCM + '/users/newsDetail?id=' + id + '&type=' + type + '&newpage=newpage';
					}).catch(err => console.log('账户异常', err));
			},
			getlist() {
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapNoteList', {
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
							cat: this.cat,
						}
					})
					.then(res => {
						if (res.data.success) {
							this.isTab = false;
							this.$refs.scroll.loaded();
							var data = res.data;
							this.noteVOS = this.noteVOS.concat(data.data.noteVOS);
							this.total = data.data.totalCount;

							this.noteVOS.forEach(ele => {
								this.$set(ele, 'checked', false);
							})
							//加载下一页
							if (this.total == this.noteVOS.length && this.total !== 0) {
								this.$refs.scroll.complete()
							} else {
								this.pageNum++
							}
						}
					})
					.catch(err => console.log('个人账户异常', err));
			},
			read(fun) {
				var ids = '',
					resultCheckOrderId = '',
					content = '',
					idx = [];
				content = fun == 'noteClick' ? '您确定要将此消息标为已读吗？' : '您确定要删除此消息吗？'
				var $subs = $("input[name='sub']");
				if (($subs.filter(":checked").length) <= 0) {
					this.$vux.toast.text('请选择要取消的内容', 'center');
					return
				} else {
					this.noteVOS.forEach(function(ele, index) {
						if (ele.checked) {
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
					onShow() {},
					onHide() {},
					onCancel() {},
					onConfirm() {
						var allVal = $("#all")[0].checked;
						if (allVal) {
							$(".mynews .vux-divider")[0].style.display = 'none';
						}
						_this.$axios.get(_this.$root.urlPath.MCT + '/wapNote/wapNoteOperate?', {
								headers: {
									'MC_UID': cookie.get('MC_UID')
								},
								params: {
									ids: resultCheckOrderId,
									status: 0,
									function: fun,
								}
							})
							.then(res => {
								if (res.data.success) {
									if (fun == 'noteDelete') {
										_this.$vux.toast.text('消息删除成功', 'center');
									}
									_this.getnewsNum();
									_this.isMan = false;
									_this.$refs.scroll.init()
									_this.noteVOS = [];
									_this.pageNum = 1;
									_this.getlist()
								} else {
									if (fun == 'noteDelete') {
										_this.$vux.toast.text('消息删除失败', 'center');
									} else {
										_this.$vux.toast.text('消息标为已读失败', 'center');
									}
								}
							}).catch(err => console.log('个人账户异常', err));
					}
				})
			},
			checkAll() {
				var allVal = $("#all")[0].checked
				this.noteVOS.forEach(ele => {
					ele.checked = allVal;
				})
			},
			radio() {
				var $subs = $("input[name='sub']");
				$("#all").prop("checked", $subs.length == $subs.filter(":checked").length ? true : false);
			},
			getnewsNum() {
				this.$axios.get(this.$root.urlPath.MCT + '/wap/user/userInfo', {
					headers: {
						'MC_UID': cookie.get('MC_UID')
					},
				})
				.then(res => {
					var userId = res.data.userId;
					this.$axios.get(this.$root.urlPath.MC + '/api.do?noteNoReadNum', {
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
						params: {
							userId: userId,
						}
					})
					.then(res => {
						this.newsNum = res.data.data;
					}).catch(err => console.log('账户异常', err));
				}).catch(err => console.log('账户异常', err));
			}
		},
		mounted() {
			if (cookie.get('MC_UID')) {
				this.noteVOS = [];
				this.getnewsNum();
				this.getlist();
			} else {
				appLogin();
			}
		}
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");
	@import url("../../../static/css/allCheckFoot.css");
	@import url("../../../static/css/checkBox.css");

	.mynews .footer {
		height: 1.4rem;
		background: rgba(255, 255, 255, 1);
		border-top: 1px solid rgba(210, 210, 210, 1);
		box-shadow: -1px 3px 20px 0px rgba(49, 49, 49, 0.3);
	}

	.mynews .checkBM .checkbox:checked+label {
		background-color: #11A9FC;
	}

	.mynews .allCheckFoot .checkBM {
		margin-left: 0.28rem;
	}

	.pb_94 {
		padding-bottom: 1.4rem;
	}

	.mynews .type .mask {
		position: fixed;
		z-index: 10;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0);
	}

	.mynews .type .skin {
		width: 50%;
		background-color: #fff;
		position: fixed;
		top: 2rem;
		right: 0;
		box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.mynews .type .skin li {
		padding: 13px 24px;
		font-size: 0.28rem;
		border-bottom: 1px solid #D9D9D9;
		color: #333;
	}

	.mynews .type .skin li:last-child {
		border-bottom: none;
	}
</style>
