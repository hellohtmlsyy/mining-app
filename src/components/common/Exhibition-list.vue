<template>
	<div>
		<div class="meetingList" ref="listSection">
			<div class="firstNews" v-show="shohid">
				<div class="contentItem clearfix" v-for="(item,index) in list" :key="index" @click="toDetails(item.id)">
					<div class="image fl">
						<a href="javascript:;">
							<img :src="item.img" />
						</a>
					</div>

					<div class="textBox fl">
						<div>
							<div class="title">
								<p class="comtitlefontsize26 clamp">{{item.title}}</p>
							</div>
							<div class="intro comsmalltitlefontsize20">
								<p class="clamp">{{item.address}}</p>
								<div class="address">
									<p class="clamp">{{item.begin_time|convertTime}}至{{item.end_time|convertTime}}</p>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>

			<div class="secondNews clearfix" ref="listSection" v-show="!shohid">
				<div class="newsItem contentItem fl" v-for="(item,index) in list" :key="index" @click="toDetails(item.id)">
					<flexbox>
						<div class="flex-demo image">
							<img :src="item.img" />
						</div>
					</flexbox>

					<div class="bgcolor textt">
						<flexbox>
							<flexbox-item>
								<div class="flex-demo title comtitlefontsize26">
									<p class="clamp">{{item.title}}</p>
								</div>
							</flexbox-item>
						</flexbox>
						<flexbox class="comsmalltitlefontsize20 color_h">
							<flexbox-item>
								<div class="address flex-demo look">
									<p class="clamp">{{item.address}}</p>
								</div>
							</flexbox-item>
						</flexbox>
						<flexbox>
							<flexbox-item>
								<div class="flex-demo intro comsmalltitlefontsize20">
									<p class="clamp">{{item.begin_time|convertTime}}至{{item.end_time|convertTime}}</p>

								</div>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import showNodata from '@/components/base/showNodata';
	export default {
		components: {
			showNodata
		},
		props: ['shohid', 'list','loading'],
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			toDetails(id) {
				window.location.href = this.$root.urlPath.MCM + "/exhibition/details?id=" + id + '&newpage=newpage';
			}
		}
	}
</script>

<style>
	.meetingList .secondNews .textt {
		height: 1.092rem
	}
</style>
