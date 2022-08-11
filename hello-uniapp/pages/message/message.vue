<template>
	<view>
		<view>
			<!-- text  文本组件      （如果使用 <span> 组件编译时会被转换为 <text>） -->
			<!-- selectable 文本是否可选 -->
			<text selectable>你好哇小吴</text> 
		</view>
		<view>
			<!-- space 显示连续空格  三个参数  ensp 空格一半大小   emsp 空格大小   nbsp 根据字体设置的空格大小 -->
			<text space="emsp">你好哇        小吴</text>
		</view>
		<view>
			<!--可解码 &nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp;。 -->
			<text>&amp;</text>
		</view>
		
		<!-- hover-class 指定按下去的样式类 -->
		<!-- hover-stop-propagation   布尔值    指是否阻止本节点的祖先节点出现点击态 就是冒泡 -->
		<!-- hover-start-time  number  按住后多久出现点击态，单位毫秒 -->
		<!-- hover-stay-time  number  手指松开后点击态保留时间 单位毫秒 -->
		<view class="box" hover-class="box-active">
			我是一个大盒子
		</view>
		
		<!-- size  按钮的大小 mini参数为小尺寸  -->
		<!-- type 按钮的样式类型  primary默认色  default白色  warn红色 -->
		<button size="mini" type="primary">点击</button>
		<!-- plain  按钮是否镂空，背景色透明- 默认为false -->
		<button plain >点击</button>
		<!-- disabled  	是否禁用  默认为false -->
		<button disabled >点击</button>
		<!-- loading  	名称前是否带 loading 图标 正在加载的图标  默认为false -->
		<button loading >点击</button>
		
		<!-- 在 uni-app 中不能使用 * 选择器 -->
		<!-- 微信小程序自定义组件中仅支持 class 选择器 -->
		<!-- page 相当于 body 节点 -->
		<view class="box1">
			box1
		</view>
		
		<!-- 小程序不支持在 css 中使用本地文件，包括本地的背景图和字体文件。需以 base64 方式方可使用 -->
		<!-- 本地背景图片的引用路径推荐使用以 ~@ 开头的绝对路径 如'~@/static/logo.png' -->
		<image src="" mode=""></image>
		
		<view class="iconfont">&#xe783</view>
	</view>
</template>

<script>
</script>

<style>
	/* @import 后跟需要导入的外联样式表的相对路径，用;表示语句结束 */
@import './message.css';
.box {
	width: 100px;
	height: 100px;
	background-color: darkgrey;
}
.box-active {
	background-color: powderblue;
}

.box1 {
	/* rpx 根据屏幕宽度自适应的动态单位 */
	width: 375rpx;
	height: 375rpx;
	font-size: 2rem ;
	/* App.vue 中的样式为全局样式，在 pages下的vue文件为局部样式  局部会覆盖全局*/
	color: red;
	background-color: aqua;
}
view {
	color: orange;
}

</style>