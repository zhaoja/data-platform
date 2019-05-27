<template>
	<el-row>
		<el-col :span="24" class="inner">
			<h1>工单</h1>
			<div>
				<el-button type="primary" class="pull-right" @click="upload()">上传工单</el-button>
			</div>
			<el-table :data="tableData" style="width: 100%">
			    <el-table-column type="expand">
			      	<template slot-scope="props">
				        <el-form label-position="left" inline class="demo-table-expand inner-text">
				        	<label>客户要求：</label>
				        	<div>{{ props.row.requirements }}</div>
				        	<label>回复内容：</label>
				        	<div>{{ props.row.reply }}</div>
				        </el-form>
				    </template>
			    </el-table-column>
				<el-table-column
			      	type="index"
     			 	width="50">
 			 	</el-table-column>
				<el-table-column :prop="thead.name" :label="thead.label" width="180" v-for="thead,index in tHeadData" :key="index">
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
				:current-page="pagination.pageNo" 
				:page-sizes="[100, 200, 300, 400]" 
				:page-size="pagination.pageSize" 
				layout="total, sizes, prev, pager, next, jumper" 
				:total="pagination.totalCount">
			</el-pagination>
		</el-col>
	</el-row>

</template>
<script type="text/javascript">
//	const URL = "http://192.168.0.130"
	export default {
		data() {
			return {
				pagination: {
					pageNo: 1,
					pageSize: 10,
					totalCount: 0,
				},
				tHeadData:[
				{label:'编号',name:'jobNo'}, 
				{label:'主题词',name:'theme'}, 
				{label:'业务分类',name:'businessType'}, 
				{label:'所属区',name:'area'}, 
				{label:'客户性别',name:'sex'}, 
//				{label:'客户要求',name:'requirements'}, 
//				{label:'回复内容',name:'reply'}, 
				{label:'登记时间',name:'registrationTime'}, 
				{label:'来电号码',name:'callNumber'}, 
				{label:'来电时间',name:'callTime'}, 
				{label:'登记坐席工号',name:'registrationNumber'}, 
				{label:'提交方式',name:'submission'}, 
				{label:'咨询单来源',name:'consultationSource'}, 
				{label:'咨询单状态',name:'consultationStatus'}, 
				{label:'处理人工号',name:'dealNo'}, 
				{label:'处理时间',name:'dealTime'}, 
				{label:'处理过程',name:'dealProcess'}
				],
				tableData: [],
				param:{
				    "pageNo": 1,
				    "pageSize": 10
				}
			}
		},
		created(){
			this.getOrderTable();
		},
		methods: {
			handleSizeChange(val) {
				//console.log(`每页 ${val} 条`);
				this.param.pageSize = val;
				this.getOrderTable();
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.param.pageNo = val;
				this.getOrderTable();
			},
			upload() {
				this.$router.push('/upload')
			},
			//查询工单
			getOrderTable(){ 
				var param ={
				  	"param": this.param
				}
				this.$http({ method: 'post', url: URL+'/job/getJobs', data: param })
	            .then(data => {
	            	var item = data.data;
	            	var pagination = item.data.pageData
	              	if (item.meta.code === 1) {	
	              		this.tableData = item.data.list;
	              		this.pagination = pagination;
	              	}else{
              			console.log(item.meta.code)
	              	}
	            }).catch(function (error) {
				    console.log(error);
		  		});		
			}
		},

	}
</script>
<style>
	.el-pagination {
		margin-top: 30px;
	}
	.inner-text div{
		margin-bottom: 15px;
	}
</style>