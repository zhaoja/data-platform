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
				<el-breadcrumb-item>IM即时对话量</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div class="my-table">
			<div class="my-table-title">
				<i class="el-icon-tickets"></i>IM即时对话量
			</div>
			<div class="my-table-content">
				
				<div class="table-seach">
					<!--<el-date-picker 
						v-model="timeValue" 
						value-format="yyyy-MM-dd"
						type="daterange" 
						align="right" 
						unlink-panels range-separator="至" 
						start-placeholder="开始日期" end-placeholder="结束日期" 
						:picker-options="pickerOptions">
					</el-date-picker>-->
					 <el-date-picker
				      v-model="timeValue"
				      type="datetimerange"
				      align="right"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      value-format="yyyy-MM-dd hh:mm:ss"
				      :default-time="['00:00:00', '00:00:00']">
				    </el-date-picker>
					<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
				</div>
				
				<el-table :data="tableData"  v-loading="loading">
					<el-table-column :prop="thead.name" :label="thead.label" v-for="thead in tHeadData" :key="thead.label">
					</el-table-column>
					 <!--<el-table-column
				      prop="survey_vote_id"
				      label="满意度"
				      column-key="survey_vote_id"
				      :filters="[
				      {text: '超级满意', value: '10283889'},
				      {text: '一般', value: '10292823'},
				      {text: '不满意', value: '10297557'}]"
				      :filter-method="filterHandler">
				    </el-table-column>-->
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
	export default {
		data() {
			return {
				timeValue:[],
 
				page_size: [10, 15, 20, 50, 100],
				pagination: {
					pageNo: 1,
					pageSize: 10,
					totalCount: 0,
				},
			 
				tHeadData:[
					{label:'客户姓名',name:'customer_name'}, 
					{label:'客服名称',name:'customer_name'}, 
					{label:'开始时间',name:'created_at'}, 
					{label:'关闭时间',name:'closed_at'}, 
//					{label:'满意度',name:'survey_vote_id'}, 
					{label:'来源',name:'source'}
				],
				tableData: [],
				param:{
				    start_time : "",
					end_time : "",
					page : 1,
					page_size : 100,
					sign : "c3bb36a0c8ab00cdc2e254345b267930"
				},
				loading: true
			}
		},
		created(){
			
			var URLName = this.$route.query.endTime;
			if (URLName=="all") {
				
				this.getOrderTable();
			} else{
				
				var endTime = this.$route.query.endTime;
				var startTime = this.$route.query.startTime;
				
				let endDate = this.formatDate(new Date(endTime), "yyyy-MM-dd hh:mm:ss");
				let startDate = this.formatDate(new Date(startTime), "yyyy-MM-dd hh:mm:ss");
				this.timeValue = [startDate,endDate]
				this.param.end_time = endDate;
				this.param.start_time = startDate;
								
				this.getOrderTable();	
			}
 		 	
		},
		methods: {
			formatDate(date, fmt) {
				if(/(y+)/.test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
				}
				let o = {
					'M+': date.getMonth() + 1,
					'd+': date.getDate(),
					'h+': date.getHours(),
					'm+': date.getMinutes(),
					's+': date.getSeconds()
				}
				for(let k in o) {
					if(new RegExp(`(${k})`).test(fmt)) {
						let str = o[k] + ''
						fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
					}
				}
				return fmt
			},
			handleSizeChange(val) {
				//console.log(`每页 ${val} 条`);
				this.param.page_size = val;
				this.getOrderTable();
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.param.page = val;
				this.getOrderTable();
			},
 	
			search() {
				
				this.param.start_time = this.timeValue[0];
				this.param.end_time =  this.timeValue[1]; 
				
				this.getOrderTable();
			},
			filterHandler(value, row) {
		        return row.survey_vote_id == value;
		    },
			//查询工单
			getOrderTable(){ 
				let _this = this
				
				let start_time = _this.param.start_time;
				let end_time = _this.param.end_time;
				let page = _this.param.page;
				let page_size = _this.param.page_size;
				
//				console.log(start_time,end_time,page,page_size,11111)
				let URLmd5 = $.md5('start_time='+ start_time +'&end_time='+ end_time +'&page='+page+'&page_size='+page_size+'&04c4fc9614fe3ab1281290b239e4a04b');
				let myURL ="http://kafuwuzhongxin.udesk.cn/api/v2/im/session?start_time="+start_time+"&end_time="+end_time+"&page="+page+"&page_size="+page_size+"&sign="+URLmd5;
				setTimeout(function(){
					$.get({ url: myURL })
					.then(data => {
//		            	
		              	if (data.message == "成功") {
		              		_this.loading = false;
		              		_this.tableData = data.item ;
		              		_this.pagination = {
								pageNo: _this.param.pageNo,
								pageSize: data.size,
								totalCount: data.total,
							}
		              	}else{
	            			console.log("数据获取失败")
		              	}
		            }).catch(function (error) {
		            	alert("后台访问失败，请5秒后重新刷新")
					    console.log(error);
			  		});						
				},2000)
				
			}
		}

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
 	.el-table__empty-text{
 		color: #ccc;
 	}
</style>