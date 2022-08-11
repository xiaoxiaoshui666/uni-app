<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
	  font-family: "iconfont"; /* Project id 3539877 */
	  src: url('~@/static/font/iconfont.woff2?t=1658461787275') format('woff2'),
	       url('~@/static/font/iconfont.woff?t=1658461787275') format('woff'),
	       url('~@/static/font/iconfont.ttf?t=1658461787275') format('truetype');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-gouwuchekong:before {
	  content: "\e600";
	}
	image {
		width: 100%;
	}
</style>
