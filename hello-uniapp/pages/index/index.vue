<template>
	<view>
		<image src="/static/favicon.ico"></image>
		<view>
			<text>{{title}}</text>
			<button size='mini' @click="pullDown">点击下拉刷新</button>
			<hr>
			<view class="bottomView">
				拉到底
			</view>
			<text>test</text>
			<hr>
			<button  size="mini"  @click="getView">发送网络请求</button>
			<hr>
			<button  size="mini" type="primary" @click="msgStorage">本地缓存异步</button>
			<button  size="mini" type="primary" @click="getStorage">获取缓存异步</button>
			<button  size="mini" type="primary" @click="removeStorage">移除缓存异步</button>
			<button  size="mini" type="primary" @click="msgStorageSync">本地缓存同步</button>
			<button  size="mini" type="primary" @click="getStorageSync">获取缓存同步</button>
			<button  size="mini" type="primary" @click="removeStorageSync">移除缓存同步</button>
			<hr>
			<img v-for="(item,i) in imgSrc" :key="i" :src="item"  @click="previewImg(item)">
			<button  size="mini" @click="chooseImg">上传图片</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				imgSrc:[]
			}
		},
		methods: {
			pullDown() {
				uni.startPullDownRefresh()  // 开启下拉刷新，调用后触发下拉，效果与配置pages.json下拉刷新一致
			},
			// 网络请求
			getView() {  
				uni.request({
					url:"http://localhost:5002/person",
					success(res) {   // 收到服务器成功返回的回调函数
						console.log(res)
						console.log(res.data)   //数据
					},
					fail() {  // 接口调用失败的回调函数
						console.log('ERR');
					}
				})
			},
			// 数据缓存
			msgStorage() {       
				uni.setStorage({  // 将数据存储在本地缓存中指定的key中，这是异步接口
					key:'id',      // 指定的 key
					data: JSON.stringify({name:'小明',age:123}),     // 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
					success() {    // 接口调用成功的回调函数
						console.log('储存成功')
					},
					fail() {     // 失败的回调
					}
				})
			},
			getStorage() {
				uni.getStorage({   // 异步获取指定 key 对应的内容
					key:'id',
					success(res) {  // 接口调用的回调函数，res = {data: key对应的内容}
						console.log('获取成功',res.data);
					}
				})
			},
			removeStorage() {
				uni.removeStorage({
					key:'id',
					success() {
						console.log('删除成功');
					}
				})
			},
			// sync同步
			msgStorageSync() {
				uni.setStorageSync('id1',100)
				console.log('缓存同步成功');
			},
			getStorageSync() {
				console.log(uni.getStorageSync('id1'));
			},
			removeStorageSync() {
				uni.removeStorageSync('id1')
				console.log('移除同步成功');
			},
			// 上传图片
			chooseImg() {
				uni.chooseImage({  // 从本地相册选择图片或使用相机拍照。
					count:3,   // 最多可以选择的图片张数，默认9
					success:res => {    // 成功则返回图片的本地文件路径列表  res.tempFilePaths
						console.log(res.tempFilePaths);
						this.imgSrc = res.tempFilePaths
					}
				})
			}, 
			// 预览图片
			previewImg(current) {
				uni.previewImage({
					current,   // 为当前显示图片的链接/索引值, 获取该图片的路径
					urls:this.imgSrc   // 需要预览的图片链接列表
				})
			}
		},
		// 页面生命周期
		// tabbar 的页面展现过一次后就保留在内存中，再次切换 tabbar 页面，只会触发每个页面的onShow，不会再触发onLoad
		onLoad(options) {   // 监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
			// 路由传参
			console.log(options);
			//	条件注释
			// #ifdef H5 
			console.log('H5页面被加载')   // H5中的输出
			// #endif
			// #ifdef MP-WEIXIN
			console.log('微信小程序页面被加载')   // 微信小程序中的输出
			// #endif
		},		
		onShow() {   // 监听页面显示。每次出现都触发，包括从下级页面点返回露出当前页面	
			console.log('页面显示了')
		},		
		onReady() {   // 监听页面初次渲染完成   只触发一次
			console.log('初次渲染完')
		},	
		onHide() {   // 监听页面隐藏
			console.log('被隐藏了')
		},   
		onPullDownRefresh() {   // 监听下拉刷新，可在配置项中配置下拉刷新
			console.log(this)
			console.log(uni)
			setTimeout(() => {
				this.title = '欢迎光临'
				uni.stopPullDownRefresh()    // 停止下拉刷新
			},2000)
		},
		onReachBottom() {      // 监听触底，可在配置项中配置页面触底
			console.log('页面触底了')
		}
	}
</script>

<style>
	image {
		width: 2rem;
		height: 2rem;
	}
	.bottomView {
		height: 600px;
	}
</style>
