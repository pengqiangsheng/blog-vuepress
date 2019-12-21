<template>
    <span @click="copy">
			<slot></slot>
			<span class="test" >
				2222222222222222
			</span>
		</span>
</template>
<script>
import Clipboard from 'clipboard';
export default {
	data() {
		return {
			content: `1111`
		}
	},
	props: {
		className: {
			type: String,
			default: 'd'
		}
	},
	methods: {
		copy() {  
			const clipboard = new Clipboard(`.test`)  
			clipboard.on('success', e => {  
					console.log('复制成功')
					// 释放内存  
					clipboard.destroy()  
				})  
				clipboard.on('error', e => {  
					// 不支持复制  
					console.log('该浏览器不支持自动复制')  
					// 释放内存  
					clipboard.destroy()  
				})    
			}
	}
}
</script>