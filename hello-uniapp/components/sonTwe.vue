<template>
	<div>
		我是二儿我要接受数据：{{num}}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				num:0
			}
		},
		mounted() {
			uni.$on('SendNum', (num) => {
				this.num += num
			})
		}
	}
</script>

<style>
</style>