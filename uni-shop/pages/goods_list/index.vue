<template>
	<view class="">
		<search-input></search-input>
		<!-- tabsItemChange自定义事件 -->
		<Tabs :tabs="tabs" @tabsItemChange="tabsItemChange">
			<!-- 综合插槽 -->
			<block v-if="tabs[0].isActive">
				<view class="first_tab">
					<navigator
					class="goods_item" 
					v-for="goodsItem in goodsList" 
					:key="goodsItem.goods_id"
					:url="`/pages/goods_detail/index?goods_id=${goodsItem.goods_id}`">
						<!-- 左侧 图片容器 -->
						<view class="goods_img_wrap">
							<!-- 没有数据的图片用此链接图片代替 -->
							<image :src="goodsItem.goods_small_logo? goodsItem.goods_small_logo :'http://image1.suning.cn/uimg/b2c/newcatentries/0070163444-000000000621676862_1_800x800.jpg'" mode="widthFix"></image>
						</view>
						<!-- 右侧 商品容器 -->
						<view class="goods_info_wrap">
							<view class="goods_name">{{goodsItem.goods_name}}</view>
							<view class="goods_price">￥{{goodsItem.goods_price}}</view>
						</view>
					</navigator>
				</view>
			</block>
			<!-- 销量插槽 -->
			<block v-else-if="tabs[1].isActive">2</block>
			<!-- 价格插槽 -->
			<block v-else-if="tabs[2].isActive">3</block>
		</Tabs>
	</view>
</template>

<script>
	import SearchInput from '@/components/SearchInput.vue'
	import Tabs from '@/components/Tabs.vue'
	export default {
		data() {
			return {
				tabs:[
					{
						id: 0,
						value: '综合',
						isActive: true
					},
					{
						id: 1,
						value: '销量',
						isActive: false
					},
					{
						id: 2,
						value: '价格',
						isActive: false
					},
				],
				QueryParams:{        // 需要请求的参数
					query:'',        // 关键字
					cid:'',          // 分类id
					pagenum:1,       // 当前页数
					pagesize:10,	 // 页容量  一页可以显示多少条数据
				},
				goodsList: '',       // 商品列表接口数据
				totalPages:1         // 该列表总页数 默认是1
			}
		},
		components:{
			'search-input': SearchInput,
			Tabs
		},
		onLoad(options) {                    // 页面首次加载
			this.QueryParams.cid = options.cid                 //、 2.用通过点击商品路由来传参数 传当前点击的商品分类的商品列表cid
			this.getGoodsList()
		},
		onReachBottom() {                 // 页面滚动到底部的事件，用于下拉下一页数据
			// 用户上滑触底触发事件 然后 判断是否有下一页 （当前页数是否大于等于总页数 ）没有就提示触底了，有就加载数据     
			if(this.QueryParams.pagenum >= this.totalPages) {
				uni.showToast({title:'我是有底线的'})
			} else {
				// 还有下一页数据 先当前页码++，重新发送请求 ，新数据与旧数据拼接
				this.QueryParams.pagenum++,
				this.getGoodsList()
			}
		},
		onPullDownRefresh() {    // 下拉刷新
			// 先在pages.json里配置开启下拉刷新，在钩子下拉刷新函数中重置数据和页数 ，在发请求   若请求成功需要在请求内手动关闭刷新的动画
			this.goodsList = []     // 重置数据
			this.QueryParams.pagenum = 1
			this.getGoodsList()
		},
		methods:{
			tabsItemChange(itemID) {          // 标题点击 自定义事件  遍历每个列表，若索引与传来的被点击的索引一致 则为true其他为false
				this.tabs.forEach((v, i) => i === itemID ? v.isActive = true : v.isActive = false)
			},
			async getGoodsList() {
				const res = await this.$myRequest({
					url:'/goods/search',
					data: this.QueryParams                      // 3. 匹配路由参数 cid  得到对应cid的数据
				}) 
				// this.goodsList = res.data.message.goods
				const total = res.data.message.total     // 获取总条数
				this.totalPages = Math.ceil(total / this.QueryParams.pagesize)    // 总页数等于 总条数 除以 页容量 在向上取1
				this.goodsList = [...this.goodsList, ...res.data.message.goods]     // ...把数组依次解构成出来拼接到原数组中
				uni.stopPullDownRefresh()      // 请求成功就关闭刷新 ，没刷新不会触发此函数
			}
		}
	}
</script>

<style lang="scss">
	.first_tab {
		.goods_item {
			display: flex;
			border-bottom: 3rpx solid #ccc;
			.goods_img_wrap {   // 左侧图片
				flex: 2;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 70%;
				}
			};
			.goods_info_wrap {   // 右侧商品信息
				flex: 3;
				display: flex;
				flex-direction: column;  //主轴方向 :列
				justify-content: space-around;  // 空白环绕
				.goods_name {
					display: -webkit-box;    // 这四行表示第二行多余的文字用省略号表示
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				};
				.goods_price {
					color: $shop-color;
					font-size: 32rpx
				}
			}
		}
	}
</style>