<template>
	<view>
		<!-- 路由与页面跳转 -->
		<!-- open-type跳转方式  默认为navigator普通页面的跳转  -->
		<navigator url="/pages/list/list?id=110&age=19">跳转到普通list页面</navigator>
		<!-- redirect，会把当前页面先关闭在跳转 （不能退后） -->
		<navigator url="/pages/list/list" open-type="redirect">跳转到list页面</navigator>
		<!-- switchTab是tabBar页面的跳转 会关闭其他页面 -->
		<navigator url="/pages/index/index" open-type="switchTab">跳转到tabBar类型的index页面</navigator>
		<!-- 编程式导航 -->
		<!-- 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面 -->
		<button size="mini" @click="goIndex">点击跳转list页面</button>
		<!-- 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 -->
		<button size="mini" @click="goDetail">点击跳转detail页面</button>
	</view>
</template>

<script>
	export default {
		methods: {
			//路由页面跳转
			goIndex() {
				uni.navigateTo({
					url:'/pages/list/list',
				})
			},
			goDetail() {
				uni.switchTab({
					url:'/pages/detail/detail'
				})
			}
		},
		onUnload() {  // 当页面被卸载时调用
			console.log('navigator页面被卸载了');
		}
	}
</script>	

<style>

</style>
