<!--
	作者：zhaojia
	时间：2017-12-28
	描述：北京通-养老助残卡投诉处理工单
-->
<template>
	<div class="row">
		<el-col class="breadCrumb ace-save-state">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-location"></i>首页</el-breadcrumb-item>
				<el-breadcrumb-item>北京通-养老助残卡投诉处理工单</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div class="my-table">
			<div class="my-table-title">
				<i class="el-icon-tickets"></i>北京通-养老助残卡投诉处理工单表
			</div>
			<div class="my-table-content">
				<el-tabs v-model="activeName" @tab-click="handleClickTabPane">
					<el-tab-pane :label="t.label" :name="t.name" v-for="t in tabPane" :key="t.label"></el-tab-pane>
				</el-tabs>
				<div>
					<div class="table-seach">
						<el-date-picker v-model="timeValue" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
						</el-date-picker>
						<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
					</div>

					<el-table :data="tableData">
						<el-table-column :prop="th.field" :label="th.title" v-for="th in tableHead" key="th.field" v-if="th.field!='created_at'">
						</el-table-column>
						 <el-table-column
						      prop="created_at"
						      label="创建时间">
						      <template slot-scope="scope">
						        {{scope.row.created_at.substring(0, 10)}} {{scope.row.created_at.substring(11, 19)}}
						      </template>
						    </el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="page_size" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
					</el-pagination>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: "743060",
				title: '',
				page_size: [10, 15, 20, 50, 100],
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				timeValue: '',

				tableHead: [{
						field: 'field_num',
						title: '工单ID'
					},
					{
						field: 'subject',
						title: '标题'
					},
					{
						field: 'user_name',
						title: '客户名称'
					},
					{
						field: 'user_cellphone',
						title: '客户手机'
					},
					{
						field: 'assignee_name',
						title: '受理客服名称'
					},
					//{field:'template_id', title:'工单模板'},
					{
						field: 'priority',
						title: '工单优先级'
					},
					{
						field: 'status',
						title: '工单状态'
					},{
						field: 'selectField_18159',
						title: '业务归属'
					},
					//               0：养老卡制卡
					//               1：养老补贴
					//               2：养老卡延期
					//               3：养老卡补办卡
					//               4：捡卡处理
					//               5：临时卡配发
					//               6：预申请登记表   
					//							{field:'Tags', title:'标签'},
					{
						field: 'created_at',
						title: '创建时间'
					}
				],
				tableData: [],
				pagination: {
					currentPage: 1,
					pageSize: 10,
					total: 10
				},
				tabPane: [{
						label: '已办结工单',
						name: '743060'
					},
					{
						label: '再次反馈工单',
						name: '743061'
					},
					{
						label: '处理中工单',
						name: '743062'
					},
					{
						label: '已派出工单',
						name: '743063'
					},
					{
						label: '待处理工单',
						name: '743432'
					},
				],
				param: {
					"endDate": "",
					"pageNo": 1,
					"filter_id": 0,
					"pageSize": 10,
					"startDate": ""
				}
			}
		},
		filters: {
			formatDate: (val) => {
				let date = new Date(val);
				let fmt = "yyyy-MM-dd hh:mm:ss";
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
			}
		},
		created() {

			var URLName = this.$route.query.name;
			this.title = URLName;

			if(URLName == "all") {
				this.getTableData(this.activeName);

			} else if(URLName == "已办结工单") {

				this.activeName = '743060';
				this.getTableData(743060);
			} else if(URLName == "再次反馈工单") {

				this.activeName = '743061';
				this.getTableData(743061);
			} else if(URLName == "处理中工单") {

				this.activeName = '743062';
				this.getTableData(743062);
			} else if(URLName == "已派出工单") {

				this.activeName = '743063';
				this.getTableData(743063);
			} else if(URLName == "待处理工单") {

				this.activeName = '743432';
				this.getTableData(743432);
			}
		},
		methods: {
			dateTime(val){
				var newDate = val.substring(0, 9)
				
			},
			handleClickTabPane(tab, event) {
				this.getTableData(tab.name);
			},
			
			handleClick(row) {
				this.$router.push({
					path: 'details',
					query: {
						id: row.id
					}
				})
			},
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
			search() {
				var _this = this;
				var dataValue = this.timeValue;
				let startDate = this.formatDate(new Date(dataValue[0]), "yyyy-MM-dd hh:mm:ss");
				let endDate = this.formatDate(new Date(dataValue[1]), "yyyy-MM-dd hh:mm:ss");

				this.param = {
					"endDate": endDate,
					"pageNo": this.param.pageNo,
					"pageSize": this.param.pageSize,
					"startDate": startDate
				}
				this.getTableData(this.activeName)
			},
			handleSizeChange(size) {
				this.param = {
					"endDate": this.param.endDate,
					"pageNo": this.param.pageNo,
					"pageSize": size,
					"startDate": this.param.startDate
				}
				this.getTableData(this.activeName)
			},
			handleCurrentChange(p) {
			 
				this.param = {
					"endDate": this.param.endDate,
					"pageNo": p,
					"pageSize": this.param.pageSize,
					"startDate": this.param.startDate
				}
				this.getTableData(this.activeName)
			},
			//获取工单列表
			getTableData(filter_id) {
				var _this = this

				_this.param = {
					"endDate": _this.param.endDate,
					"pageNo": _this.param.pageNo,
					"filter_id": filter_id,
					"pageSize": _this.param.pageSize,
					"startDate": _this.param.startDate,
				}
				$.post({
						url: "http://39.104.161.46/web/job/getJobTicket",
						headers: {
							'Content-Type': 'application/json'
						},
						data: JSON.stringify({
							param: _this.param
						})
					})
					.then(data => {
						//	              	if (item.meta.code === 1) {	
						_this.tableData = data.data.list;
						console.log(_this.tableData )
						_this.pagination.currentPage = data.data.pageData.pageNo;
						
						_this.pagination.pageSize = data.data.pageData.pageSize;
						_this.pagination.total = data.data.pageData.totalCount;

						//	              	}else{
						//            			console.log(item.meta.code)
						//	              	}
					}).catch(function(error) {
						console.log(error);
					});

			},
		}
	}
</script>