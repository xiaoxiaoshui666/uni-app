<template>
	<view>
		{{ msg }}
		<test :msg="msg" @sendTitle="sendTitle"></test>
		<view>这是子组件传过来的值：{{title}}</view>
		<son-one></son-one>
		<son-twe></son-twe>
	</view>
</template>

<script>
	import test from '../../components/Test.vue'
	import sonOne from '../../components/sonOne.vue'
	import sonTwe from '../../components/sonTwe.vue'
	export default {
		data() {
			return {
				msg: '详情页',
				title:''
			}
		},
		components: {
			test,
			'son-one':sonOne,
			'son-twe':sonTwe
		},
		methods:{
			sendTitle(title) {
				this.title = title
			}
		},
		mounted() {
			// this.$refs.TheTest.$on('sendTitle', (title) => {
			// 	this.title = title
			// }) 
		}
	}
</script>

<style>
</style>