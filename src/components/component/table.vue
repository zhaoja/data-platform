<!--
	作者：offline
	时间：2017-12-26
	描述：Table组件
-->
<template>
	<div>
		<h3>{{tableData.tTitle}}</h3>
		<el-input
		  placeholder="请输入查询内容"
		  v-model="input10"
		   @change="seachTable"
		  style="width: 200px;">
		  <i class="el-icon-edit el-input__icon"  slot="suffix"></i>
		</el-input>

	    <el-table  :data="tableData.tData" style="width: 100%;">
	        <el-table-column v-for="th in tableData.tHead"  v-bind:prop="th.name" v-bind:label="th.cname">
	        </el-table-column>
	        <el-table-column
		      fixed="right"
		      label="操作"
		      width="120">
		      <template slot-scope="scope">
		        <el-button v-for="eb in tableData.editBtn" @click="handClick(scope.row,eb.act)" type="text" size="small">{{eb.name}}</el-button>
		 
		      </template>
		    </el-table-column>
	    </el-table>
 
		
	</div>
</template>

<script>
	import { mapState } from 'vuex'
    export default {
       	props:['tableData'],   //props以数组的形式定义属性           
       	components: {
	         
	      },
       	data(){
       		return{
       			input10:"" ,
       		 
       		}
       	},
       	methods:{
       		seachTable(value){
       			console.log(value)
       		},
       		handClick(a,b){
       			console.log(a,b)
       		}
       	}
    }
</script>

<style scoped="">
	 
</style>