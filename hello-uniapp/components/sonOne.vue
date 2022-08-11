<template>
	<div>
		<button size='mini' @click="sendNum">我是大儿我要给二儿传数据</button>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				num:2
			}
		},
		methods:{
			sendNum() {
				uni.$emit('SendNum',this.num)
			}
		}
	}
</script>

<style>
</style>