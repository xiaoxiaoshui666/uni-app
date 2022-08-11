<template>
	<view class="home">
		<!-- 搜索 -->
		<view>
			<search-input></search-input>
		</view>
		<!-- 轮播图 -->
		<!-- 一般用于左右滑动或上下滑动，比如banner轮播图 -->
		<!-- indicator-dots面板指示点   circular衔接滑动   autoplay自动切换时间间隔   interval切换时长默认5000-->
		<swiper indicator-dots circular autoplay interval="2000">
			<swiper-item v-for="item in swipers" :key="item.goods_id">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 导航栏 -->
		<view class="index_cate">
			<navigator class="navigator_cate" v-for="item in catesList" :key="item.name">
				<image class="img_cate" mode="widthFix" :src="item.image_src"></image>
			</navigator>
		</view>
		<!-- 楼层 -->
		<view class="index_floor" v-for="floorItem in floorList" :key="floorItem.floor_title.name">
			<view class="floor_group">
				<!-- 标题 -->
				<view class="floor_title">  
					<image :src="floorItem.floor_title.image_src" mode="widthFix"></image>
				</view>
				<!-- 内容 -->
				<view class="floor_list" v-for="(listItem,i) in floorItem.product_list" :key="listItem.name">
					<navigator url="">
						<!-- 如果是第一张图 就 宽不变高度自适应，否则图片宽高完全拉伸至填满标签 -->
						<image :src="listItem.image_src" :mode="i === 0 ? 'widthFix': 'scaleToFill'"></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SearchInput from '../../components/SearchInput.vue'
	export default {
		data() {
			return {
				swipers: [], // 轮播图
				catesList: [], // 导航栏
				floorList: [] // 楼层数据
			}
		},
		components: {
			"search-input": SearchInput
		},
		onLoad() {
			this.getSwipers()
			this.getCatesList()
			this.getfloorList()
		},
		methods: {
			/* getSwipers() {
				console.log('发起轮播图的请求');
				uni.request({
					url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
					success: (res) => {
						if(res.data.meta.status !== 200) {
							return uni.showToast({  // 显示消息提示框
								title:'获取数据失败'
							})
						}
						this.swipers = res.data.message
					}
				})
			} */
			// 获取轮播图
			async getSwipers() {
				const res = await this.$myRequest({ // 请求数据之间调用封装的接口
					url: '/home/swiperdata'
				})
				this.swipers = res.data.message
			},
			// 获取导航栏
			async getCatesList() {
				const res = await this.$myRequest({ // 请求数据之间调用封装的接口
					url: '/home/catitems'
				})
				this.catesList = res.data.message
			},
			// 获取楼层数据
			async getfloorList() {
				const res = await this.$myRequest({ // 请求数据之间调用封装的接口
					url: '/home/floordata'
				})
				this.floorList = res.data.message
			}
		},
	}
</script>

<style lang="scss">
	// 轮播图
	swiper {
		width: 750rpx;
		height: 380rpx;

		image {
			height: 100%;
			width: 100%
		}
	}

	// 导航栏
	.index_cate {
		display: flex;
		navigator {
			display: flex;
			flex: 1;
			image {
				width: 100%
			}
		}
	}
	// 楼层
	.index_floor {
		margin-top: 20rpx;
		.floor_group {
			.floor_title {
				image {
					width: 100%;
				}
			}
			.floor_list {
				navigator {
					image {
						float: left;
						width: 32vw;
						border-left: 10rpx solid #fff;
						&:nth-last-child(-n+4) {
							height: calc(32vw * 386 / 232 / 2);
							border-bottom: 5rpx solid #fff;
						}
					}
					
				}
			}
		}
	}
</style>
