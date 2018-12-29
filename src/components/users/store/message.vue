<template>
	<div class="storemsg">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">店铺留言</div>
		</com-header>
		<my-scroll ref="scroll" @loadmore='getlist' :isTab="isTab" :total="total">
			<div class="storemsgCon">
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
												<div class="info fl">留言通知</div>
												<span class="time fr">{{item.createdTime | fomatDate('yyyy-MM-dd')}}</span>
											</div>
											<div class="monitor">您的店铺收到1条留言消息，快去看看吧。</div>
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
				noteVOS: [],
				pageNum: 1,
				numPerPage: 10,
				total: 0,
				conLogo: this.$root.urlPath.MCM + '/static/img/user2.0/enterprise/goods-logo.png',
			}
		},
		methods: {
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
			handleEvents(type) {
				console.log('event: ', type)
			},
			goDet(id, type) {
				location.href = this.$root.urlPath.MCM + '/users/storeMsgDetail?id=' + id + '&type=' + type + '&newpage=newpage';
			},
			getlist() {
				//店铺留言
				this.$axios.get(this.$root.urlPath.MCT + '/wapNote/wapStoreMessageList', {
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
		},
		mounted() {
			if (cookie.get('MC_UID')) {
				this.noteVOS = []
				this.getlist()
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
</style>
