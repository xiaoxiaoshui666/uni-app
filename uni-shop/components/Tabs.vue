<template>
	<view class="tabs">
		<view class="tabs_title">
			<view 
			v-for="(item,i) in tabs" 
			:key="item.id" 
			:class="['title_item', item.isActive? 'active' : '' ]"
			@click="handleItemTap(i)">
			{{item.value}}
			</view>
		</view>
		<view class="tabs_content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props:['tabs'],
		methods:{
			handleItemTap(i) {
				this.$emit('tabsItemChange',i)   // 触发自定义事件 传入当前点击的索引
			}
		}
	}
</script>

<style lang="scss">
	.tabs {
		.tabs_title {
			display: flex;
			.title_item {
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 1;
				padding: 15rpx 0;
			};
			.active {
				color: $shop-color;
				border-bottom: 5rpx solid currentColor;
			}
		}
	}
</style>