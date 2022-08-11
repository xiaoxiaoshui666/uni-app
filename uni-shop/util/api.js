const BASE_URL = 'https://api-hmugo-web.itheima.net/api/public/v1'  // 请求地址公共部分
let ajaxTimes = 0 // 同时发送异步代码的次数
export const myRequest = (options) => {
	ajaxTimes++      // 调用一次加一 ，调完一次减一  防止同时多次调用函数 加载图标多次出现
	uni.showLoading({title:"加载中", mask: true})     // 显示加载的等待图标
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url, 		// 接口地址
			method: options.method || 'GET', 	// 请求类型 ， 不传默认为get请求
			data: options.data || {}, 			// 请求的参数
			success: (res) => { 				// 成功的回调
				if (res.data.meta.status !== 200) {
					return uni.showToast({ 	
						title: '获取数据失败'
					})
				}
				resolve(res)                    // Promise成功的回调， 返回此数据
			},
			fail: (err) => { 					// 失败的回调
				return uni.showToast({
					title: '请求接口失败'
				})
				reject(err)						// Promise失败的回调，返回错误消息
			}, 
			complete: () => {                   // 接口调用结束的回调函数(无论成功还是失败)
				ajaxTimes--
				if(ajaxTimes === 0) {
					uni.hideLoading()           // 关闭加载图标
				}
			}
		})
	})
}
