<template>
    <div>
    	<div class="top">北京市养老助残卡服务中心服务大数据展示平台 </div>
	 	<div class="col-md-12">
			<router-view ></router-view>
	 	</div> 
    </div>
</template> 
 
<style>
	body{background: #fff;font-family:"Microsoft YaHei"}
	.maincontainer:before {
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
		background: #fff;
	}
	.breadCrumb{
		position: relative;
    	z-index: auto;
    	border-bottom: 1px solid #E5E5E5;
    	background-color: #F5F5F5;
     	height: 30px;
     	padding: 8px 10px;
	}
</style>