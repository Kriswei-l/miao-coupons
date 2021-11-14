<template>
	<view class="contentpage">
		<uni-notice-bar scrollable="true" single="true" background-color="#eee" showIcon="true" :speed=70 :text="title"></uni-notice-bar>
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
				<view v-for="(tab,index) in tabs" :key="tab.tabId" class="uni-tab-item" :id="tab.tabId" :data-current="index" @click="ontabtap">
					<image :src="tab.icon" class="btnicon" mode="widthFix" />
					<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.text}}</text>
				</view>
			</scroll-view>
			<view class="line-h"></view>
			<view class="coupon" ref="coupon">
				<view class="itemc" v-for="(v, i) in couponList" @click="toCoupon(i)" :key="i">
					<view class="topc">
						<view class="leftc">
							<view class="contentc">
								<image :src="v.icon" class="iconc" mode="widthFix" />
								<view class="namec">{{ v.name }}</view>
							</view>
							<view class="textc" v-if="v.type == 1">天天可领</view>
							<view class="textc" v-else-if="v.type == 2">限时秒杀</view>
						</view>
						<!-- <view class="right">免费领取</view> -->
					</view>
					<view class="bottomc"><image :src="v.bannerPic" mode="widthFix" /></view>
				</view>
			</view>
			
		</view>
 </view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				tabs:[],
				couponList:[],
				coupons:[],
				scrollInto: "",
				tabIndex: -1,
			}
		},
		onLoad() {
			this.title = this.$store.state.msgNotice
			this.getTabs()
		},
		methods: {
			async getTabs(){
				let data = await this.$req({url: getApp().globalData.api.home})
				console.log("标题按钮：", data.data)
				let d = data.data
				this.tabs = d.tabs
				this.coupons = d.coupons
				
				this.switchTab(0)
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			switchTab(index) {
				// console.log('当前选中的项：' + index);
				if (this.tabIndex === index) {
					return;
				}
				this.couponList = []
				uni.showLoading({
					title: '获取优惠中'
				});
				this.tabIndex = index;
				this.scrollInto = "T_"+this.tabs[index].tabId;
				if(index == 0){
					this.couponList = this.coupons
				}else{
					for(let i in this.coupons){
						if(this.coupons[i].tabId == this.tabs[index].tabId){
							this.couponList.push(this.coupons[i])
						}
					}
				}
				//#ifdef H5
				this.$nextTick(() => {
					// this.$refs.coupon.scrollTop= 0;
				})
				//#endif
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			},
			toCoupon(i){
				console.log(this.couponList[i])
				//h5
				//#ifdef H5
				window.location.href = this.couponList[i].url
				//#endif
				//微信小程序
				//#ifdef MP-WEIXIN
				if(this.couponList[i].minapp){
					wx.navigateToMiniProgram({
					  appId: this.couponList[i].minapp.appid,
					  path: this.couponList[i].minapp.path,
					  success(res) {
						// 打开成功
					  }
					})
				}
				//#endif
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #e9e9ef;
	}
	.contentpage {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		// background-color: #e9e9ef;
	}
	.tabs {
	    flex: 1;
	    flex-direction: column;
	    overflow: hidden;
	    background-color: #ffffff;
	    /* #ifndef APP-PLUS */
	    // height: 100vh;
	    /* #endif */
	}
	.scroll-h {
		width: 750rpx;
		/* #ifdef H5 */
		width:100%;
		/* #endif */
		height: 80rpx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		// flex-wrap: nowrap;
		// border-color: #cccccc;
		// border-bottom-style: solid;
		// border-bottom-width: 1px;
		// background-color: #cccccc;
	}
	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 24rpx;
		padding-right: 24rpx;
	}
	
	.uni-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}
	
	.uni-tab-item-title-active {
		color: #007AFF;
	}
	.swiper-box {
		flex: 1;
	}
	
	.swiper-item {
		flex: 1;
		flex-direction: row;
	}
	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
	}
	
	.loading-more-text {
		font-size: 28rpx;
		color: #999;
	}
	.btnicon {
		width: 25rpx;
		height: 25rpx;
		margin-right: 5rpx;
	}
	.line-h {
		height: 1rpx;
		background-color: #cccccc;
	}
	.coupon {
		padding-top: 0rpx;
		padding-bottom: 10rpx;
		.itemc {
			background-color: #e6e6e6;
			margin: 30rpx;
			border-radius: 10rpx;
			padding: 0 30rpx 30rpx 30rpx;
			.topc {
				height: 116rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.leftc {
					height: 116rpx;
					width: 400rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.contentc {
						width: 100%;
					}
					.iconc {
						display: inline-block;
						vertical-align: bottom;
						width: 52rpx;
						height: auto;
					}
					.namec {
						text-align: left;
						display: inline-block;
						vertical-align: bottom;
						font-size: 34rpx;
						color: #000;
						line-height: 50rpx;
						font-weight: bold;
						margin-left: 15rpx;
					}
					.textc {
						width: 150rpx;
						height: 38rpx;
						line-height: 38rpx;
						text-align: center;
						font-size: 24rpx;
						color: #61300e;
						background: linear-gradient(90deg, #f9db8d, #f8d98a);
						border-radius: 6rpx;
					}
				}
	
				.rightc {
					width: 170rpx;
					height: 60rpx;
					border-radius: 30rpx;
					background: linear-gradient(90deg, #ec6f43, #ea4a36);
					color: #fff;
					font-size: 28rpx;
					line-height: 60rpx;
					text-align: center;
				}
			}
	
			.bottomc {
				height: auto;
				width: 100%;
				image {
					display: block;
					width: 100%;
					height: auto;
				}
			}
		}
	}
	
</style>
