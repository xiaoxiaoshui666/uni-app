<template>
	<div>
		<div>{{ title }}</div>
		<div>我是子组件的数据：{{ msg }}</div>
		<button size="mini" @click="getTitle">给父组件传值</button>
		<view>
		    <uni-calendar 
		    :insert="true"
		    :lunar="true" 
		    :start-date="'2019-3-2'"
		    :end-date="'2019-5-20'"
		    @change="change"
		     />
		</view>
	</div>
</template>

<script>
	export default {
		name:'Test',
		data() {
			return {
				title: 'test组件'
			}
		},
		props:['msg'],
		methods:{
			getTitle() {
				this.$emit('sendTitle',this.title)
			}
		}
	}
</script>

<style>
</style>