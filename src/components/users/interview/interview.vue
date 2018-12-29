<template>
	<div class="interview">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">约谈消息</div>
		</com-header>
		<div class="intTab">
			<div class="tab-top"></div>
			<div class="tab-bottom">
				<div class="tabCon clearfix">
					<div class="term" v-for="(item,index) in tabs" :key="index" @click="tab(index)">
						<img :src="item.img" />
						<div class="text">{{item.content}}</div>
					</div>
				</div>
			</div>
		</div>
		<my-scroll ref="scroll" @loadmore='getlist' :isTab="isTab" :total="total">
			<div class="interviewCon">
				<div v-for="(item,index) in noteVOS" :key="index">
					<swipeout>
						<swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
							<div slot="right-menu">
								<swipeout-button @click.native="onButtonClick(item.id,index)" type="warn" :width="100">删除</swipeout-button>
							</div>
							<div slot="content">
								<div class="conItem" @click="goDet(item.id,item.type)">
									<div style="padding-bottom:0.32rem;border-bottom: 1px solid #e5e5e5;" class="clearfix">
										<div class="news-logo">
											<img :src="conLogo" alt="" style="width: 0.9rem;">
										</div>
										<div class="conItemL fl">
											<div class="clearfix">
												<div class="info fl">约谈通知</div>
												<span class="time fr">{{item.createdTime | fomatDate('yyyy-MM-dd')}}</span>
											</div>
											<div class="monitor">您的{{invContent}}【{{item.resName}}】收到了1条约谈消息。</div>
										</div>
									</div>
								</div>
							</div>
						</swipeout-item>
					</swipeout>
				</div>
			</div>
		</my-scroll>
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
				invContent: '商品',
				noteVOS: [],
				pageNum: 1,
				numPerPage: 10,
				cat: 1,
				total: 0,
				function: 'noteClick',
				tabs: [{
						img: this.$root.urlPath.MCM + '/static/img/user2.0/enterprise/goods-tab.png',
						content: '商品约谈',
					},
					{
						img: this.$root.urlPath.MCM + '/static/img/user2.0/enterprise/pro-tab.png',
						content: '项目约谈',
					},
					{
						img: this.$root.urlPath.MCM + '/static/img/user2.0/enterprise/inv-tab.png',
						content: '投资约谈',
					}
				],
				conLogo: this.$root.urlPath.MCM + '/static/img/user2.0/enterprise/goods-logo.png',
			}
		},
		methods: {
			tab(index) {//切换
				this.$refs.scroll.init()
				this.noteVOS = []
				this.pageNum = 1
				this.isTab = true;
				switch (index) {
					case 0:
						this.getlist('430');
						this.conLogo = this.$root.urlPath.MCM + '/static/img/user2.0/enterprise/goods-logo.png';
						this.invContent = '商品';
						break;
					case 1:
						this.getlist('230');
						this.conLogo = this.$root.urlPath.MCM + '/static/img/user2.0/enterprise/pro-logo.png';
						this.invContent = '项目';
						break;
					case 2:
						this.getInvlist();
						this.conLogo = this.$root.urlPath.MCM + '/static/img/user2.0/enterprise/inv-logo.png';
						this.invContent = '投资';
						break;
					default:
						;
				}
			},
			goDet(id, type) {//详情页面
				location.href = this.$root.urlPath.MCM + '/users/interviewDetail?id=' + id + '&type=' + type + '&newpage=newpage';
			},
			onButtonClick(id,index) {//侧滑删除
				var _this = this;
				this.$vux.confirm.show({
					title: '操作提示',
					content: '您确定要删除此消息吗？',
					onShow() {},
					onHide() {},
					onCancel() {},
					onConfirm() {
						_this.$axios.get(_this.$root.urlPath.MCT + '/wapNote/wapDelMessage', {
								headers: {
									'MC_UID': cookie.get('MC_UID')
								},
								params: {
									ids: id,
								}
							})
							.then(res => {
								if (res.data.success) {
									_this.noteVOS.splice(index,1);
									_this.$vux.toast.text('删除消息成功', 'center')
								} else {
									_this.$vux.toast.text('删除消息失败', 'center');
								}
							}).catch(err => console.log('个人账户异常', err));
					}
				})
			},
			handleEvents(type) {//侧滑监听
			},
			getlist(status) { //商品和项目约谈
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapInterviewNoteList', {
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
							cat: this.cat,
							status: status,
						}
					})
					.then(res => {
						if (res.data.success) {
							this.isTab = false;
							this.$refs.scroll.loaded();
							var data = res.data;
							this.noteVOS = this.noteVOS.concat(data.data.wapNoteAndUserVOS);
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
					.catch(err => console.log('账户异常', err));
			},
			getInvlist() { //投资约谈
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapInvestorInterviewNoteList', {
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
						}
					})
					.then(res => {
						if (res.data.success) {
							this.isTab = false;
							this.$refs.scroll.loaded();
							var data = res.data;
							this.noteVOS = this.noteVOS.concat(data.data.wapNoteAndUserVOS);
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
						}else{
							this.$vux.toast.text(res.data.errMsg, 'center')
						}
					})
					.catch(err => console.log('账户异常', err));
			},
		},
		mounted() {
			if (cookie.get('MC_UID')) {
				this.noteVOS = []
				this.getlist('430')
			} else {
				appLogin()
			}
		}
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");
	@import url("../../../static/css/allCheckFoot.css");
	@import url("../../../static/css/checkBox.css");

	.interview .intTab {
		width: 100%;
		position: fixed;
		top: 1rem;
		left: 0;
		z-index: 1;
	}

	.interview .intTab .tab-top {
		height: 1.4rem;
		background-color: #0094e8;
	}

	.interview .intTab .tab-bottom {
		padding: 0 0.38rem;
	}

	.interview .intTab .tabCon {
		width: 100%;
		margin-top: -1.1rem;
		background-color: #fff;
		box-shadow: 12px 5px 20px 0px rgba(68, 68, 68, 0.1);
		border-radius: 0.2rem;
		padding: 0.36rem 0;
	}

	.interview .intTab .tabCon .term {
		float: left;
		width: 33.3333%;
		text-align: center;
	}

	.interview .intTab .tabCon .term img {
		width: 1rem;
	}

	.interview .intTab .tabCon .term .text {
		margin-top: 0.1rem;
		font-size: 0.24rem;
		color: #333;
	}
</style>
