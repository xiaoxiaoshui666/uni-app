<template>
	<view class="search_input">
		<!-- open-type="navigate" 跳转到非tabtar页面 -->
		<navigator url="/pages/search/index" open-type="navigate">搜索</navigator>
	</view>
</template>

<script>
</script>

<style lang="scss">
.search_input {
	padding: 10rpx;
	height: 60rpx;
	background-color: $shop-color;
	navigator {
		display: flex;
		height: 100%;
		justify-content: center;    // 水平居中
		align-items: center;		// 垂直居中
		background-color: #fff;
		border-radius: 15rpx;
		color: #666;
	}
}
</style>