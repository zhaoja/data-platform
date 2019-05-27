<template>
	<el-row :gutter="20">
		<template>
		  <el-checkbox-group v-model="checkedTasks" @change="handleCheckedChange" class="treecheck">
		    <el-checkbox  label="task1">被安排任务</el-checkbox>
		    <el-checkbox  label="task2">交予他人任务</el-checkbox>
		  </el-checkbox-group>
		</template>
		<el-col :span="12">
			<div class="grid-content bg-purple">
				<el-tree :data="tree" :props="defaultProps" node-key="id" default-expand-all 
					@node-click = "nodeClick"
					:expand-on-click-node="false" 
					highlight-current
					:render-content="renderContent">
				</el-tree>
			</div>
		</el-col>
		<el-col :span="12" v-bind:class="classObject2">
			<div class="grid-content bg-purple">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>{{treeDetail.label}}</span>
						<el-button style="float: right; padding: 3px 0; margin-left: 10px;" type="text" ><i class="el-icon-delete"></i></el-button>
						<el-button style="float: right; padding: 3px 0" type="text" @click="addNode(treeDetail)"><i class="el-icon-edit"></i></el-button>
						<el-button style="float: right; padding: 3px 0" type="text" @click="addNode"><i class="el-icon-plus"></i></el-button>
					</div>
					<div class="text item">
						描述：{{treeDetail.detail}}
					</div>
				</el-card>
				<el-card class="box-card " v-bind:class="classObject">
					<div slot="header" class="clearfix">
						<span>添加子节点</span>
						<el-button style="float: right; padding: 3px 0; margin-left: 20px;" type="text" @click="close()"><i class="el-icon-error"></i></el-button>
						<el-button style="float: right; padding: 3px 0; margin-left: 20px;" type="text" @click="addNewChild(treeDetail,newChild)"><i class="el-icon-success"></i></el-button>
					</div>
					<div class="text item">
						名称：<el-input v-model="newChild.label" placeholder="请输入内容"></el-input>
						描述：<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="newChild.detail">
							</el-input>
					</div>
				</el-card>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import { mapState } from 'vuex'

	let id = 1000;
	export default {
		data() {
			return {
				classObject: {
				    'hide': true
				},
				classObject2:{
					'hide': true
				},
				checkedTasks: [],
				checkAll: true,
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		computed: {
			...mapState({
				tree: state => state.tree.treeData.tree,
				treeDetail: state => state.tree.treeData.treeDetial,
				newChild: state => state.tree.treeData.newChild
			})
		},
		created() {
			this.$store.dispatch('getTreeData');
		},
		mounted() {
			//initCalender()
		},
		methods: {
			handleCheckedChange(val) {
				console.log(val)
				this.$store.dispatch('getTreeData',val);
		     },	      
			addNode(a){
				console.log(a,11111)
				this.$store.dispatch('updataTreeDetail',a);
				this.classObject.hide = false;
				
			},
			nodeClick(a,b,c) {
 				this.$store.dispatch('getTreeDetail',a);
 				this.classObject.hide = true;
			 	this.classObject2.hide = false;
 			},
 			addNewChild(data,a){
 				console.log(data,a)
 				if(data==a){
 					alert(1)
 				}else{
	   				const newChild = {
						id: id++,
						label: a.label,
						detail: a.detail,
						children: []
					};
					if(!data.children) {
						this.$set(data, 'children', []);
					}
					data.children.push(newChild);
 				}

				this.classObject.hide = true;
 			},
 
//			remove(node, data) {
// 				const parent = node.parent;
//				const children = parent.data.children || parent.data;
//				const index = children.findIndex(d => d.id === data.id);
//				children.splice(index, 1);
//			},
			close(){
				this.classObject.hide = true;
			},
			renderContent(h, {node,data,store}) {
				return(
					<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
			            <span>
			              <span>{node.label}</span>
			            </span>
			          </span>);
			}

		}
	}
//	<span>
//    <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }><i class="el-icon-delete"></i></el-button>
//  </span>
</script>

<style scoped="scoped">
	.hide{display: none;}
	.treecheck{    
		background: #438eb921;
	    padding: 2px 27px;
	    margin-bottom: 10px;
    }
</style>