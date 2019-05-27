<template>
	<div class="container1 ">
		<div class="row" style="height: 100%;">
			<div class="col-md-6 bd ht-100">
				<div class="col-md-12 bd ht-50">
					<div class="bgmb"></div>
					<div class="inner">
						<div class="inheader">
							<i class="fa fa-pie-chart pull-left"></i> 12345电子派单
							<span class="more" @click="more12345Order()">更多<i class="fa fa-angle-double-right"></i></span>

						</div>
						<div class="inbody">
							<div class="labels"> 
							 
								<div class="num">
									共计：<span>{{total1}}</span>单
								</div>
							</div>
							<div id="hotlineData" class="st-chart"></div>
						</div>
					</div>
				</div>
				<div class="col-md-12 bd ht-50">
					<div class="bgmb"></div>
					<div class="inner">
						<div class="inheader">
							<i class="fa fa-pie-chart pull-left"></i>北京通-养老助残卡投诉处理工单
							<span class="more" @click="moreWorkOrder()">更多<i class="fa fa-angle-double-right"></i></span>
						</div>
						<div class="inbody">
							<div class="labels"> 
								<div class="num">
									共计：<span>{{total2}}</span>单
								</div>
							</div>
							<div id="electronicDispatchList" class="st-chart"></div>
						</div>
					</div>
				</div>
			</div>
		 
			<div class="col-md-6 bd ht-100">
				<div class="col-md-12 bd ht-100">
					<div class="bgmb"></div>
					<div class="inner">
						<div class="inheader">
							<i class="fa fa-line-chart pull-left"></i>IM即时对话量统计（共计 : {{ imTotal }}）
						</div>
						<div class="inbody">
							<!-- <ul class="hot-btn-list">
								<li>12小时</li>
								<li>24小时</li>
								<li>7天</li>
								<li>15天</li>
								<li>30天</li>
							</ul> -->
							<div id="hotlineCall" class="st-chart"></div>
						</div>
					</div>						
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { pie,line,bar,runingLine } from '../utils/charts'
	import echarts from 'echarts'
	export default {
		data() {
			return {
				total1:0,
				total2:0,
				myChart:null,
				option: {
					grid: {
						left: 0,
						top: 70,
						right: 50,
						bottom: 30,
						containLabel: true
					},
					xAxis: {
						type: 'category',
			//	        boundaryGap : false,
						data: [],
						name:"小时",
						axisLine: {
						   lineStyle: {
							   type: 'solid',
							   color:'#dedede',
							   width:'2'
						   }
						},
						axisLabel: {
						   textStyle: {
							   color: '#dedede'
						   },
						   formatter:function(val){
							   let fmt = "hh:mm"
							   let date = new Date(val+":00:00");
							   if (/(y+)/.test(fmt)) {
											  fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
											}
											let o = {
											  'M+': date.getMonth() + 1,
											  'd+': date.getDate(),
											  'h+': date.getHours(),
											  'm+': date.getMinutes(),
											  's+': date.getSeconds()
											}
							   for (let k in o) {
											 if (new RegExp(`(${k})`).test(fmt)) {
											   let str = o[k] + ''
											   fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
											 }
							   }
							   return fmt
						   }
						}
					},
					yAxis: {
						type: 'value',
						name:"总数",
						scale: true,
						axisLine: {
						   lineStyle: {
							   type: 'solid',
							   color:'#dedede',
							   width:'2'
						   }
						},
						axisLabel: {
						   textStyle: {
							   color: '#dedede'
						   }
						},
						splitLine: {
							show: true,
							lineStyle:{
								color: ['#dedede'],
								width: 1,
								type: 'solid'
							}
						}
					},
					
					series: [{ // For shadow
						type: 'bar',
						itemStyle: {
							normal: {
								color: 'rgba(0,0,0,0.05)'
							}
						},
						barGap:'-100%',
						barCategoryGap:'40%',
						data: [],
						animation: false,
						barWidth:20,
						barMinHeight: 2,
					}, {
						name:"24小时",
						type: 'bar',
						barWidth:20,
						barMinHeight: 2,
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#83bff6'},
										{offset: 0.5, color: '#188df0'},
										{offset: 1, color: '#188df0'}
									]
								),
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 14
									}
								}
							},
							emphasis: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#2378f7'},
										{offset: 0.7, color: '#2378f7'},
										{offset: 1, color: '#83bff6'}
									]
								)
							}
						},
						data: [],
					}],
				},
				inter:null,
				imTotal:0,
				updateIntervalCount:2*60*60*1000
			};
		},
		mounted(){
			this.hotlineData();
			this.electronicDispatchList();
//			this.hotlineCall();

			this.initHotLineCall();
			//this.allWorksheetData();
		},
		beforeDestroy(){
			clearInterval(this.inter);
			this.inter=null;
		},
		methods:{
			formatDate (date, fmt) {
				if (/(y+)/.test(fmt)) {
				  fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
				}
				let o = {
				  'M+': date.getMonth() + 1,
				  'd+': date.getDate(),
				  'h+': date.getHours(),
				  'm+': date.getMinutes(),
				  's+': date.getSeconds()
				}
			   for (let k in o) {
				 if (new RegExp(`(${k})`).test(fmt)) {
				   let str = o[k] + ''
				   fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
				 }
			   }
			   return fmt
			},
			sum(arr) {
				return arr.reduce(function(prev, curr, idx, arr){
					return prev + curr;
				});
			},
			initHotLineCall(){
				let curDate = new Date();
				let preDate = new Date(curDate.getTime() - 24*60*60*1000);
 
				let _this = this;
				let startTime = _this.formatDate(preDate,"yyyy-MM-dd hh:mm:ss");
				let timesNew = [];
				_this.myChart = echarts.init(document.getElementById("hotlineCall"));
 
				let param = {
					"end": _this.formatDate(curDate,"yyyy-MM-dd hh:mm:ss"),
					"start": startTime
				} 
				$.post({
					url: "http://39.104.161.46/web/job/getSessionNum",
					headers: {
						'Content-Type': 'application/json'
					},
					data: JSON.stringify({
						param: param
					})
				})
				.then(data => {
					if (data.meta.code === 1) {	
						let axData = data.data.date;
						let yxData = data.data.count;
						/*data.data.count.map((item,index)=>{
							if(item != 0){
								yxData.push(item);
								axData.push(data.data.date[index]);
							}
						})*/
						
						_this.option.xAxis.data = axData;
						_this.option.series[0].data = yxData;
						_this.option.series[1].data = yxData;
						_this.myChart.setOption(_this.option);
						_this.imTotal = _this.sum(data.data.count);
						console.log(data)
					}
				}).catch(function(error) {
					console.log(error);
				});
				
				_this.myChart.on('click', function (params) {
					let startTime = _this.formatDate(new Date(params.name+":00:00"),"yyyy-MM-dd hh:mm:ss");
					let endTime = _this.formatDate(new Date(new Date(startTime).getTime() + 2*60*60*1000),"yyyy-MM-dd hh:mm:ss");
					console.log(startTime,endTime)
					_this.myChart.dispose();
					_this.$router.push({path:"/IMorder",query:{endTime:endTime,startTime:startTime}});
				})
				//_this.updateHotLineCall();
			},
			updateHotLineCall(){
				let _this = this;
				this.inter = setInterval(function(){ 
					let curDate = new Date();
					if(curDate.getMinutes() == 0 && curDate.getSeconds() == 0 && curDate.getHours()%2 == 0){
						let preDate = new Date(curDate.getTime() - _this.updateIntervalCount);

						let start_time = _this.formatDate(preDate,"yyyy-MM-dd hh:mm:ss");
						let timesNew = [];
	 
						let end_time = _this.formatDate(curDate,"yyyy-MM-dd hh:mm:ss");
						
		 
		 
						let url = 'start_time='+ start_time +'&end_time='+ end_time +'&page=1&page_size=100&04c4fc9614fe3ab1281290b239e4a04b';
						$.get('http://kafuwuzhongxin.udesk.cn/api/v2/im/session?'+ 'start_time='+ start_time +'&end_time='+ end_time +'&page=1&page_size=100' + '&sign=' + $.md5(url),function(response){
							if(response.status == 0){ 
								if(_this.option.xAxis.data.length>=12){
									_this.option.xAxis.data.shift();
									_this.option.series[0].data.shift();
									_this.option.series[1].data.shift();
								}
								
								_this.option.xAxis.data.push(curDate);
								
								_this.option.series[0].data.push(response.total);
								_this.option.series[1].data.push(response.total);
								_this.myChart.setOption(_this.option);
							}
						})
					}
				},1000)
			},
			//12345电子派单
			hotlineData() {
				let _this = this;
				$.post("http://39.104.161.46/web/job/getAreaPie", function(response) {
//					console.log(response.data)
					var mydata = response.data;
					_this.total1 = mydata.count
					pie("hotlineData", mydata.list, 2)
		
//					if(response.code == 200) {
//						console.log()
//						mydata = response;
//						pie("identiAp", mydata)
//					} else {
//						alert("注册人员身份分布数据获取失败")
//					}
				});
			},
			electronicDispatchList() {
				let filter_id1 = 743060 ,
					filter_id2 = 743061 ,
					filter_id3 = 743062 ,
					filter_id4 = 743063 ,
					filter_id5 = 743432
				let _this = this;	
		 
				async function test() {
					let filter1 = await _this.getWorkOrderData(filter_id1) 
					let filter2 = await _this.getWorkOrderData(filter_id2) 
					let filter3 = await _this.getWorkOrderData(filter_id3) 
					let filter4 = await _this.getWorkOrderData(filter_id4) 
					let filter5 = await _this.getWorkOrderData(filter_id5) 
					
//					console.log(filter1,11)
					var  mydata = [
						{value:filter1.meta.total_count, name:'已办结工单'},
						{value:filter2.meta.total_count, name:'再次反馈工单'},
						{value:filter3.meta.total_count, name:'处理中工单'},
						{value:filter4.meta.total_count, name:'已派出工单'},
						{value:filter5.meta.total_count, name:'待处理工单'}
					]               
					_this.total2 = mydata[0].value+mydata[1].value+mydata[2].value+mydata[3].value+mydata[4].value;
					
					pie("electronicDispatchList", mydata, 2)
		
				}
				test()
				 
				
			},
				//线上及服务统计
			hotlineCall() {
				var mydata = []
				runingLine("hotlineCall", mydata)
		//		$.post(sUrl + "/userArea", function(response) {
		//			if(response.apicode == 200) {
		//				mydata = response;
		//				pie("identiAp", mydata)
		//			} else {
		//				alert("注册人员身份分布数据获取失败")
		//			}
		//		});
			},
			allWorksheetData() {
				var mydata = []
				bar("allWorksheetData", mydata)
		//		$.post(sUrl + "/userArea", function(response) {
		//			if(response.apicode == 200) {
		//				mydata = response;
		//				bar("allWorksheetData", mydata)
		//			} else {
		//				alert("注册人员身份分布数据获取失败")
		//			}
		//		});
			},
			getWorkOrderData(filter_id){
			   	return new Promise((resolve, reject) => {
				$.get("http://kafuwuzhongxin.udesk.cn/open_api_v1/tickets/tickets_in_filter?email=240575052@qq.com&timestamp=1548663936&sign=14735d36fcc255e93ed7e347380a5b4331a61299&filter_id=" + filter_id ,
					function(response) {
						if(response.code == 1000) {
							var items = response
							resolve(items)
						} else {
							reject();
							alert("网络连接失败")
						}
					});
				});		
			},
			moreWorkOrder(){
				this.$router.push({path:'organization',query:{
					name:"all"
				}})
			},
			more12345Order(){
 
				this.$router.push({path:'wokorder',query:{
					name:"all"
				}})
			}
		}
	}
</script>

<style scoped="scoped">
	@import "../../static/css/font-awesome-4.2.0/css/font-awesome.min.css";
	#legendDiv {
		position: absolute;
		right: 20px;
		bottom: 20px;
		z-index: 50;
		font-size: 12px;
		/*display: none;*/
	}
	
	#HomeButton {
		left: 20px;
		position: absolute;
		bottom: 20px;
		z-index: 50;
	}
	
	#LocateButton {
		left: 25px;
		position: absolute;
		top: 130px;
		z-index: 50;
	}
	
	#map_zoom_slider {
		top: 80px;
	}
	.hot-btn-list{
		
	}
	#hotlineCall{
		
	}
	.tab_choice {
		position: absolute;
		top: 50px;
		z-index: 100;
		width: 100%;
		padding-left: 50px;
	}
	
	.esriControlsBR {
		display: none !important;
	}
	
	body {
		font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		padding: 0;
		margin: 0;
		font-size: 15px;
		background: #f8f8f8;
	}
	
	html,
	body {
		height: 100%;
		width: 100%;
	}
	.container1{
		width: 100%;
		height: calc(100vh - 60px);
	    /*background: #f5f5f5;*/
	}
	.header{
		background: #515e73;
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 20px;
		color: #fff;
	}
	.bd {
		padding: 5px 3px;
		margin: 0;
		height: 100%;
	}
	
	.ht-50 {
		height: 50%;
		overflow: hidden;
	}
	
	.ht-100 {
		height: 100%;
		overflow: hidden;
	}
	
	.st-chart {
		height: 100%;
	}
	
	.inner {
		/*
		box-shadow: 2px 2px 5px #ddd;
		border: 1px solid #ccc;*/
		 height: 100%;
	    position: relative;
	    background: #fff;
	    border-radius: 2px;
	    box-shadow: 1px 1px 1px rgba(14, 14, 14, 0.1);
	    border: 1px solid #eee;
	}
	
	.inheader {
		height: 35px;
	    line-height: 35px;
	    border-bottom: 1px solid #eee;
	    padding: 0 10px;
	    background: #ffffff;
	    color: #666;
	    position: absolute;
	    z-index: 100;
	    width: 100%;
	}
	
	.inheader i {
		line-height: 35px;
		float: right;
	}
	.inheader span {
		float: right;
	}
	
	.inbody {
		height: 100%;
		padding: 10px 30px;
	}
	
 
 
	.col-100 {
		position: fixed !important;
		width: 100% !important;
		z-index: 200 !important;
		background: rgba(0, 0, 0, 0.7) !important;
		left: 0 !important;
		top: 0 !important;
		height: 100% !important;
		padding: 100px !important;
		margin: 0 !important;
	}
	
	.col-100 .inbody {
		background: #fff;
	}
	
	.cl1:before {
		background: #c3523c;
	}
	
	.cl2:before {
		background: #d56a2e;
	}
	
	.cl3:before {
		background: #e78f1c;
	}
	
	.cl4:before {
		background: #f1b510;
	}
	
	.cl5:before {
		background: #f7d706;
	}
	
	.cl6:before {
		background: #edfd00;
	}
	
	.cl7:before {
		background: #7aed00;
	}
	
	.cl8:before {
		background: #12df00;
	}
	
	.cl9:before {
		background: #0ec540;
	}
	
	.cl10:before {
		background: #1aa97c;
	}
	
	.cl11:before {
		background: #1e9195;
	}
	
	.cl12:before {
		background: #145c87;
	}
	
	.cl13:before {
		background: #0a2c7a;
	}
	

	
 
	.labels{
		position: absolute;
		min-width: 100px;
	    /*background: #438eb914;*/
	    z-index: 100;
	    top: 35px;
	    left: 0;
	    height: 35px;
	    line-height: 35px;
	    padding-left: 10px;
	}
/*	/*
	.labels .date-time{
	    position: absolute;
    	left: 0;
	}*/
	.labels .num{
	    /*margin-top: 50px;*/
	}
	.labels  span{
		font-size: 20px;
		margin: 0 2px;
	}
</style>
