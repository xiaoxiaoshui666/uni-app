<template>
	<view class="">
		123
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			const {goods_id } = options
			this.getGoodsDetail()
			console.log(goods_id);
		},
		methods:{
			async getGoodsDetail() {
				const res = await this.$myRequest({
					url:'/goods/detail',
					data:this.goods_id
				})
				console.log(res);
			}
			
		}
	}
</script>

<style>
</style>