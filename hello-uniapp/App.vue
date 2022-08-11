<script>
	export default {
		// 应用的生命周期
		// 应用生命周期仅可在App.vue中监听，在其它页面监听无效
		onLaunch() {   // 初始化完成时触发（全局只触发一次）
			console.log('App Launch')
		},
		onShow() {     // 启动，或从后台进入前台显示
			console.log('App Show')
		},
		onHide() {     // 从前台进入后台
			console.log('App Hide')
		}, 
		onError() {    // 报错时触发
			console.log('onError')
		}
	}
</script>

<style>
	@import 'static/font/iconfont.css'
	/*每个页面公共css */
	text {
		color: aquamarine;
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
</style>
