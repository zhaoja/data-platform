<!--
	作者：zhaojia
	时间：2017-12-28
	描述：
-->
<template>
	<div class="row">
		<el-col class="breadCrumb ace-save-state" >
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-location"></i>首页</el-breadcrumb-item>
				<el-breadcrumb-item>12345电子派单表</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div class="my-table">
			<div class="my-table-title">
				<i class="el-icon-tickets"></i>12345电子派单表
			</div>
			<div class="my-table-content">
				<div class="table-seach">
						<el-select v-model="param.area" clearable placeholder="请输入所属区">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  	</el-select>
						<el-button type="primary" icon="el-icon-search" @click="search(param.area)">搜索</el-button>
					</div>
				<!--<div class="table-seach">
					<el-date-picker v-model="timeValue" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
					</el-date-picker>
					<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
				</div>-->
				<el-table :data="tableData">
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
					<el-table-column :prop="thead.name" :label="thead.label" width="180" v-for="thead in tHeadData" :key="thead.label">
					</el-table-column>
				</el-table>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
					:current-page="pagination.pageNo" 
					:page-sizes="page_size" 
					:page-size="pagination.pageSize" 
					layout="total, sizes, prev, pager, next, jumper" 
					:total="pagination.totalCount">
				</el-pagination>
			</div>
	 	</div>
 	</div>
 </template>
  
<script type="text/javascript">
	const URL = "http://192.168.0.130"
	export default {
		data() {
			return {
				page_size: [10, 15, 20, 50, 100],
				pagination: {
					pageNo: 1,
					pageSize: 10,
					totalCount: 0,
				},
				options: [ 
					{value: '东城  ', label: ' 东城     ' },
					{value: '西城  ', label: ' 西城     ' },
					{value: '朝阳  ', label: ' 朝阳     ' },
					{value: '丰台  ', label: ' 丰台     ' },
					{value: '石景山 ', label: ' 石景山    ' },
					{value: '海淀  ', label: ' 海淀     ' },
					{value: '顺义  ', label: ' 顺义     ' },
					{value: '通州  ', label: ' 通州     ' },
					{value: '大兴  ', label: ' 大兴     ' },
					{value: '房山  ', label: ' 房山     ' },
					{value: '门头沟 ', label: ' 门头沟    ' },
					{value: '昌平  ', label: ' 昌平     ' },
					{value: '平谷  ', label: ' 平谷     ' },
					{value: '密云  ', label: ' 密云     ' },
					{value: '怀柔  ', label: ' 怀柔     ' },
					{value: '延庆区 ', label: ' 延庆区    '}
				],
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
				    "pageSize": 10,
				    "area":""
				},
			
			}
		},
		created(){
			var URLName = this.$route.query.name;
			if (URLName=="all") {
				this.getOrderTable();
			} else{
				this.param.area = URLName;
				this.getOrderTable();	
			}
 		 	
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
			search(val){
				this.param.area = val;
				this.getOrderTable();
			},
			//查询工单
			getOrderTable(){ 
				var _this = this
				$.post({ 
					url: "http://39.104.161.46/web/job/getJobs", 
                    headers:{'Content-Type':'application/json'},
					data:JSON.stringify({
						param: this.param
					} ),
					 
				})
	            .then(data => {
//	            	console.log(data.data)
//	            	var item = data.data;
//	            	var pagination = item.data.pageData
//	              	if (item.meta.code === 1) {	
//	              		console.log(item)
	              		_this.tableData = data.data.list;
	              		_this.pagination = data.data.pageData; 
//	              	}else{
//            			console.log(item.meta.code)
//	              	}
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
	.table-seach{
		float: right;
	}
</style>