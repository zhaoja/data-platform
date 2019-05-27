<template>
	<el-col  :span="4" class="sidebar">
		<!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
		  <el-radio-button :label="false">展开</el-radio-button>
		  <el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>-->
		<el-menu default-active="2" 
			class="el-menu-vertical-demo" 
			:default-active="this.$route.path" 
			:collapse="isCollapse" :router="true" 
			:unique-opened="true" 
			background-color="#fff" text-color="#555" active-text-color="#438eb9" 
			@open="handleOpen" 
			@close="handleClose" 
			@select="handleSelect">
			<div v-for="nav in menu" :key='nav.path'>
				<el-submenu v-bind:index="nav.path">

					<template slot="title" v-if="!nav.groups">
						<el-menu-item v-bind:index="nav.path">
							<i v-bind:class="nav.icon"></i>
							<span slot="title">{{nav.nav}}</span>
						</el-menu-item>
					</template>

					<template slot="title" v-if="nav.groups">
						<i v-bind:class="nav.icon"></i>
						<span slot="title">{{nav.nav}}</span>
					</template>
					<div v-for="group in nav.groups" :key='group.title'>
						<el-menu-item-group>
							<span slot="title">{{group.title}}</span>
							<span v-for="option in group.options" :key='option.path'>
                                <el-menu-item v-bind:index="option.path">{{option.title}}</el-menu-item>
                            </span>
						</el-menu-item-group>
					</div>
				</el-submenu>
			</div>
		</el-menu>
	</el-col>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				isCollapse: false
			}
		},
		computed: {
			...mapState({
				menuLabel: state => state.layout.left.menuLabel,
				menu: state => state.layout.left.menu,
			})
		},
		created() {
			this.$store.dispatch('showMenu');
			a()
		},
		methods: {
			open: function(bool) {
				bool ? bool = false : bool = true
				this.$store.dispatch('showLeft', bool)
			},
			handleOpen(key, keyPath) {
				this.$store.dispatch('showBreadcrumb', key)
			},
			handleClose(key, keyPath) {
				this.$store.dispatch('showBreadcrumb', key)
			},
			handleSelect(key, keyPath) {
				this.$store.dispatch('showBreadcrumb', key)
			}

		}
	};
	function a() {
		setTimeout(function() {
			var aa = $(".sidebar .el-menu-vertical-demo").children().children().children("ul");
			for(var i = 0; i <= aa.length - 1; i++) {
				if(aa[i].childNodes.length === 0) {
					aa[i].parentNode.children[0].children[1].remove()
//					console.log(aa[i].parentNode.children[0].children[1])
				}
			}
		}, 500)

	}
</script>
<style scoped="scoped">
	.sidebar {
    width: 16.66667% !important;
    }
 	.sidebar:before {
		content: "";
		display: block;
		/*width: inherit;*/
		top: 0px;
		bottom: 0;
		z-index: -1;
		background-color: inherit;
		border-style: inherit;
		border-color: inherit;
		border-width: inherit;
		box-shadow: 2px 0px 19px #ccc;
		background: #fff;
	}
	
	.sidebar .el-submenu__title li {
		padding: 0px !important;
	}
	
	.sidebar .el-menu-item-group>ul {
		margin-left: -10px;
		margin-top: -12px;
	}
	
	.sidebar .el-submenu__title {
		padding: 0 !important;
	}

	.el-menu-item {
		background-color: rgba(255, 255, 255, 0)!important;
		width: 100%;
	}
	/*.sidebar .el-submenu__title:hover{
		background: #f8f8f8 !important;
	}
	.sidebar .el-menu-item:hover{
			background: #f8f8f8 !important;
	}*/
</style>