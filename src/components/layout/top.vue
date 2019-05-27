<template>
	<div class="top">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#438EB9" text-color="#fff" active-text-color="#ffd04b">
			<el-col :span="24" class="logo">
				<div>北京市养老助残卡服务中心服务大数据展示平台 </div>
			</el-col>
		 
			 
		</el-menu>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				activeIndex: '1',
				index: '',
			}
		},
		computed: {
			...mapState({
				
			})
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath)
			},
			logout(){
				document.cookie = "";
				this.$router.push({ path: 'login' });
			}
		}
	}
</script>
<style scoped="scoped">
	.top {
		position: relative;
		z-index: 1;
	}
	
	.top .logo div {
		float: left;
		color: #fff;
		line-height: 60px;
		font-size: 20px;
		margin-left: 10px;
		font-weight: 600;
		letter-spacing: 3px;
	}
	
	.top .el-dropdown {
		color: #fff !important;
	}
	
	.top .el-dropdown .el-icon-caret-bottom {
		color: #fff !important;
	}
	
	.top i {
		color: #fff !important;
	}
	
	.top .user-info{
		top: 15px;
	}
	.pointer-none{
		pointer-events: none;
	}

</style>