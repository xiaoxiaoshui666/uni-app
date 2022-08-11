<template>
	<view class="cates">
		<!-- 搜索框 -->
		<view>
			<search-input></search-input>
		</view>
		<view class="cates_container">
			<!-- 左侧菜单 -->
			<scroll-view scroll-y class="left_menu">
				<view 
				:class="[ 'menu_item', i === currentIndex ? 'active' : '']" 
				v-for="(item, i) in leftMenuList" 
				:key="i"
				@click="handleItemTap(i)">
				{{item}}
				</view>
			</scroll-view>
			<!-- 右侧商品内容 -->
			<!--  scroll-top 设置竖向滚动条位置          scroll-y 允许纵向滚动   -->
			<scroll-view  scroll-y class="right_content" :scroll-top="scrollTop">
				<view class="goods_group" v-for="itemTitle in rightContent" :key="itemTitle.cat_id">
					<!-- 商品标题 -->
					<view class="goods_title">
						<text class="delimiter">/</text>
						<text class="title">{{itemTitle.cat_name}}</text>
						<text class="delimiter">/</text>
					</view>
					<!-- 商品列表 -->
					<view class="goods_list">
						<!-- 1. 跳转路由并携带当前的query参数 cid=当前的cat_id -->
						<navigator v-for="item in itemTitle.children" :key="item.cat_id" :url="`/pages/goods_list/index?cid=${item.cat_id}`">
							<image :src="item.cat_icon" mode="widthFix"></image>
							<view class="goods_name">{{item.cat_name}}</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import SearchInput from '../../components/SearchInput.vue'
	export default {
		name:'category',
		data() {
			return {
				Cates: [],    	       //返回的接口数据
				leftMenuList: [],      // 左侧的菜单选项
				currentIndex: 0,       // 被点击的菜单
				scrollTop:0,		   // 左侧内容的滚动条距顶部的距离
				rightContent: []       // 右侧对应的商品数据
			}
		},
		onLoad() {
			// 本地存储 （缓存技术） 1. 先判断一下本地存储中有没有旧的数据 2.没有旧数据直接发新请求 3. 有旧数据 同时旧数据没有过期就使用本地存储中的旧数据
			const Cates = uni.getStorageSync('cates')   // 获取本地缓存
			if(!Cates) {             // 如果本地中不存在 则调用接口获取数据
				this.getCates()      
			} else {                 // 有本地缓存时  
				if(Date.now() - Cates.time > 1000 * 10) {  // 如果在10秒外数据过期  
					this.getCates()
				} else {                                   // 缓存数据没有过期，可用
					this.Cates = Cates.data               // Cates就为缓存中data 的值
					this.leftMenuList = this.Cates.map( i => i.cat_name)
					this.rightContent = this.Cates[0].children  
				}
			}
			  
		},
		methods: {
			async getCates() {
				const res = await this.$myRequest({  // 获取接口数据 
					url:'/categories'
				})
				this.Cates = res.data.message 
				// 同步缓存数据 将数据存储在本地缓存中指定的key中
				uni.setStorageSync("cates", {time:Date.now(), data: this.Cates})
				
				this.leftMenuList = this.Cates.map( i => i.cat_name)
				 // rightContent菜单列表 为 当前 菜单选项leftMenuList索引 对应的总数据索引 的 children
				this.rightContent = this.Cates[0].children  
			},
			handleItemTap(i) {   // 点击左侧菜单 传入当前菜单选项的索引
				this.currentIndex = i    // 使当前点击的左侧菜单选项增加 active 样式
				this.rightContent = this.Cates[i].children    // 当前点击的左侧对应的索引改变右侧菜单列表
				this.scrollTop = -1      // 重新设置右侧内容的croll-view标签的距离顶部的距离为0
			}
		},
		components: {
			"search-input": SearchInput
		},
	}
</script>

<style lang="scss">
	.cates {
		height: 100%;
		.cates_container{
			display: flex;
			height: calc(100vh - 90rpx);
			.left_menu {   // 左边菜单
				flex: 2;
				.menu_item {
					height: 80rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30rpx;
				}
				.active {    // 点击菜单
					color: $shop-color;
					border-left: 5rpx solid currentColor;
				}
			}
			.right_content {  // 右边商品分类
				flex: 5;  
				.goods_group {
					text-align: center;
					.goods_title {    // 商品标题
						height: 80rpx;
						line-height: 80rpx;
						font-size: 40rpx;
						.delimiter {
							color: #ccc;
							padding: 0 10rpx;
						}
					}
					.goods_list {     // 商品列表
						display: flex;
						flex-wrap: wrap;
						navigator {
							width: 33.33%;
							image{}
							.goods_name{}
						}
					}
				}
			}
		}
	}
</style>