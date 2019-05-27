<!--
	作者: zhaojia
	时间: 2017-12-28
	描述: 
-->
<template>
	<div class="row">
		<el-col class="breadCrumb ace-save-state">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-location"></i>首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/organization?name=all' }">北京通-养老助残卡投诉处理工单</el-breadcrumb-item>
				<el-breadcrumb-item>工单详情</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>

		<div class="detail-inner">
			<div class="detail-container">
				<h1><i class="el-icon-tickets" style="margin-right: 10px;"></i>工单详情</h1>
				<ul class="detail-ul">
					<li> <label>工单ID: </label> {{ticket.field_num}} </li>
					<li> <label>标题: </label>{{ticket.subject}} </li>
					<li class="detail-div-long"> <label>内容: </label><span v-html="ticket.content"></span> </li>
 
					<li v-if="isShowCustom_fields"> <label>客户名称: </label> {{ticket.custom_fields.TextField_34683}} </li>
					<li v-if="isShowCustom_fields"> <label>客户邮箱: </label> {{ticket.user_email}} </li>
					<li v-if="isShowCustom_fields"> <label>客户手机: </label> {{ticket.custom_fields.TextField_34687}} </li>

					<li> <label>受理客服名称: </label> {{ticket.assignee_name}} </li>
					<li v-if="isShowCustom_fields"> <label>工单模板: </label>{{workOrderId[ticket.template_id]}} </li>
					<li v-if="isShowCustom_fields"> <label>工单优先级: </label> {{ticket.Priority}} </li>
					<li v-if="isShowCustom_fields"> <label>工单状态: </label> {{ticket.status}} </li>
					<li v-if="isShowCustom_fields"> <label>满意度: </label> {{ticket.satisfaction}} </li>
					<li v-if="isShowCustom_fields"> <label>申请人姓名: </label> {{ticket.textField_34567}} </li>
					<li v-if="isShowCustom_fields"> <label>身份证号码: </label> {{ticket.custom_fields.TextField_34570}} </li>
					<li v-if="isShowCustom_fields"> <label>手机号: </label> {{ticket.textField_34579}} </li>
					<li v-if="isShowCustom_fields"> <label>银行卡卡号: </label> {{ticket.textField_34682}} </li>
					<li v-if="isShowCustom_fields"> <label>业务归属: </label> {{ticket.selectField_18159}} </li>
					<li v-if="isShowCustom_fields"> <label>标签: </label> {{ticket.tags}} </li>
					<li> <label>创建时间: </label> {{ticket.created_at | formatDate}} </li>
					<!--<li> <label>更新时间: </label> {{ticket.updated_at}} </li>-->
				</ul>
				<h4>回复内容:</h4>
				<ul class="detail-div" v-for="replies in replies" :key="replies.id">
					<li> <label>角色: </label> {{replies.author.user_type}} </li>
					<li> <label>名称: </label> {{replies.author.nick_name}} </li>
					<li class="detail-div-long"> <label>内容: </label> {{replies.content}} </li>
					<li> <label>消息发送时间: </label> {{replies.created_at | formatDate}} </li>
					<li> <label>邮箱: </label> {{replies.author.email}} </li>
				</ul>
			</div>
		</div>
	</div>
	</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				ticket: {
					field_num: '',
					Subject: '',
					content: '',
					user_name: '',
					user_email: '',
					user_cellphone: '',
					assignee_name: '',
					template_id: '',
					Priority: '',

					status: '',
					satisfaction: '',
					textField_34567: '',
					textField_34570: '',
					textField_34579: '',
					textField_34682: '',
					selectField_18159: '',
					//				 	              0: 养老卡制卡       ,
					//				 	              1: 养老补贴        ,
					//				 	              2: 养老卡延期       ,
					//				 	              3: 养老卡补办卡      ,
					//				 	              4: 捡卡处理        ,
					//				 	              5: 临时卡配发       ,
					//				 	              6: 预申请登记表      ,
					tags: '标签',
					created_at: '创建时间',
					updated_at: '更新时间',
				},
				replies: [{
					content: '内容',
					reated_at: '消息发送时间',
					author: {
						id: '客服id',
						user_type: '客服',
						Email: '客服邮箱',
						nick_name: '客服名称',
					}
					
				}],
				workOrderId: {
					59779: '养老助残卡申请登记表',
					59990: '养老补贴账户查询登记表',
					59991: '延期登记表',
					59992: '补卡登记表',
					59993: '捡卡处理登记表',
					59994: '临时卡配发登记表',
					59995: '预申请登记表'
				},
				isShowCustom_fields:false
			}
		},
		created() {
			this.getTableDtails(this.$route.query.id);
			this.getResponse(this.$route.query.id);
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
		methods: {

			//获取工单详情
			getTableDtails(id) {
				let _this = this;
				let workURL = "http://kafuwuzhongxin.udesk.cn/open_api_v1/tickets/detail?email=240575052@qq.com&timestamp=1548663936&sign=14735d36fcc255e93ed7e347380a5b4331a61299"
				let workID = "&id=" + id;

				$.get(workURL + workID, function(response) {

					if(response.code === 1000) {
						//						console.log(response.ticket, 8888)
						_this.ticket = response.ticket
						_this.isShowCustom_fields = JSON.stringify(_this.ticket.custom_fields) != "{}";
					} else {
						alert("注册人员身份分布数据获取失败")
					}
				});
			},
			//获取工单中回复内容
			getResponse(id) {
				let _this = this;
				let workURL = "http://kafuwuzhongxin.udesk.cn/open_api_v1/tickets/" + id + "/replies?email=240575052@qq.com&timestamp=1548663936&sign=14735d36fcc255e93ed7e347380a5b4331a61299"

				$.get(workURL, function(response) {
					if(response.code === 1000) {
						_this.replies = response.replies
						console.log(response)

					} else {
						alert("注册人员身份分布数据获取失败")
					}
				});
			},

		}
	}
</script>

<style>
	ul,
	li {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.detail-container {
		background: #fff;
	    padding: 0 15px 30px 15px;
	    border-radius: 2px;
	    box-shadow: 0px 2px 2px rgba(14, 14, 14, 0.1);
	    border: 1px solid #f5f5f5;
	}
	.detail-container h1{
	    margin-bottom: 20px;
	}
	.detail-inner .detail-container .detail-ul {
		width: 100%;
		background: rgba(84, 134, 199, 0.1);
		overflow: hidden;
		padding: 10px 0;
	}
	
	.detail-inner .detail-container .detail-div {
		width: 100%;
		background: rgba(84, 134, 199, 0.1);
		overflow: hidden;
		margin-bottom: 10px;
		padding: 10px 0;
	}
	
	.detail-inner .detail-container .detail-ul li,
	.detail-inner .detail-container .detail-div li {
		float: left;
		width: 30%;
		line-height: 35px;
		padding: 0 10px;
	}
	
	.detail-inner .detail-container .detail-ul li label,
	.detail-inner .detail-container .detail-div li label {
		margin-right: 10px;
		min-width: 80px;
	}
	
	.detail-div-long {
		width: 100% !important;
	}
</style>