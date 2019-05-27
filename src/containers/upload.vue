<template>
	<el-row class="center">
		<el-col :span="24" class="inner upload">
			<el-upload
			  class="upload-demo"
			  ref="upload"
			  :action="fileURL"
			  accept=".xls,.xlsx"
			
			  :file-list="fileList"
			  :auto-upload="false"
			  drag multiple>
			   <i class="el-icon-upload"></i>
			   <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
			  <div slot="tip" class="el-upload__tip">只能上传.xls/.xlsx文件，且不超过500kb</div>
			</el-upload>
		</el-col>
		<el-button style="margin-top: 20px;" size="small" type="success" @click="submitUpload">上传文件</el-button>

	</el-row>
</template>

<script type="text/javascript">
	
	export default {
		data() {
			return {
				fileURL: "http://192.168.0.130/job/addJobs",
			 	fileList: []
      
			}
		},
		created(){
//			this.getOrderTable();
		},
		methods: {
		 	submitUpload() {
		        this.$refs.upload.submit();
	      	},
//	      	handleRemove(file, fileList) {
//		        console.log(file, fileList);
//    		},
//	      	handlePreview(file) {
//		        console.log(file);
//	      	},
			onSuccess(response, file, fileList) {
			 	//文件上传成功时的钩子	
			 	this.$notify({
		          title: '上传成功',
//		          message: '这是一条成功的提示消息',
		          type: 'success'
		        });
			 	console.log(response, file, fileList)
			},
			onError(err, file, fileList) {
				this.$notify.error({
		          title: '上传失败',
		          message: err,
		        });
				console.log(err, file, fileList)
			}, 
			 
		},

	}
</script>
<style type="text/css">
	.upload .el-upload__input{
		display: none !important;
	}
	.upload .upload-demo{text-align: center;}
	.upload .el-upload-dragger{
	    width: 480px;
	    margin-left: calc(50% - 240px);
    	margin-top: 50px;
	} 
</style>
 