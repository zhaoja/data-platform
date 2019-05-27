import echarts from 'echarts'
import that from "../main.js"

//饼图
export function pie (id, data, ring) {

	if(ring===1) {
		var radiusAp = ['40%', '60%'];
		var unit = "{b}: {c} ({d}%)"
		var color = ["#78c825", "#3daad1", "#f1c90b", "#e9581f", "#ccc"];
		var mylabel = {
			normal: {
				show: false,
				position: 'center'
			},
			emphasis: {
				show: true,
				textStyle: {
					fontSize: '20',
					fontWeight: 'bold'
				}
			}
		};
		var mylabelLine = {
			normal: {
				show: false
			}
		}
	} else {
		var radiusAp = '60%';
		var unit = "{b}: {c}亩 ({d}%)";
		var color = [
			'#6ca30f','#f59311','#fa4343','#16afcc','#0e72cc'
//			'#2b821d', '#32a487', '#759c6a', '#8abb6f', '#a9cba2', 
//			'#b8d2c7', '#c8e49c', '#f3f39d', "#b5b55f", '#cda819',
//			'#d3758f', '#b5b5b5', '#e9e9e9', '#c6b38e'
		]
		var mylabel = {};
		var mylabelLine = {}
	}
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		color: color,
		tooltip: {
			trigger: 'item',
//			formatter: unit
		},
		legend: {
			orient: 'vertical',
			x: 'right',
			top: 80,
			data: data
		},
		series: [{
			name: '',
			type: 'pie',
			center: ['40%', '55%'],
			radius: radiusAp,
			avoidLabelOverlap: false,
			label: mylabel,
			labelLine: mylabelLine,
			data: data
		}]
	};
	myChart.setOption(option, true);
 
	myChart.on('click', function (params) {
		myChart.dispose();
		if (id == 'hotlineData') {
			that.$router.push({path:"/wokorder",query:{name:params.name}});
		} else if(id == 'electronicDispatchList'){
			that.$router.push({path:"/organization",query:{name:params.name}});
		}
	})
	window.onresize = function(){
		myChart.resize();
	}
}
//折线图
export function line(id, data){
	
	var color = [];
	var unit = "";
 
	//作物年变化趋势
	color = [
	'#0adc98','#aadd3b','#feea9c','#fdca02','#f27a05',
	'#c6504c','#26d4ea','#2d8dfb','#4a82bd','#8774ff',
	'#840185','#0000fe',
	
	'#17497a', '#e31430', '#a6cd50', '#002764',
	'#d7de2d', '#bf1e14', '#05a5df', '#e6b90d', 
	'#5f2c29'
	];
	unit = "(亩)";
		
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		 xAxis: {
	        type: 'category',
	        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: [820, 932, 901, 934, 1290, 1330, 1320],
	        type: 'line'
	    }]

	};
	myChart.setOption(option);
	window.onresize = function(){
		myChart.resize();
	}
}
//动态折线图
export function runingLine(id, data) {
  	var test = 10
  	var times = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  	var data = [820, 932, 901, 934, 1290, 1330, 1320]
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		grid: {
			left: 0,
			top: 70,
			right: 30,
			bottom: 30,
			containLabel: true
		},
		xAxis: {
	        type: 'category',
//	        boundaryGap : false,
	        data: times
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: data,
	        type: 'line',
	        smooth: true,
	        

	    }]

	};
	myChart.setOption(option);
  window.onresize = function(){
  	myChart.resize();
  }
    //这里用setTimeout代替ajax请求进行演示
	
	window.setInterval(function () {
//		console.log(111)
//  	var data = [test, 5, 10, 40, 20, 10];
    	times.shift()
    	data.shift();
    	
    	var aa = Math.random() * 21;
    	var bb = Math.random() * 21;
    	
//  	console.log(aa,bb)
    	times.push(aa)
    	data.push(bb)
//	   $.get("SQLTest.ashx",function(responseTxt,statusTxt,xhr) {
//	    test=responseTxt;
//	    //if (statusTxt == "success")alert(test);
//	    if (statusTxt == "error")
//	            alert("Error: " + xhr.status + ": " + xhr.statusText);
//	   });
//	    data = [test, 5, 10, 40, 20, 10];
	    refreshData(data,times);       
	},1000);
	function refreshData(data,times){
     	if(!myChart){
          	return;
     	}
	     //更新数据
	      var option = myChart.getOption();
  	      option.xAxis[0].data = times;
	      option.series[0].data = data; 
	      myChart.setOption(option);    
	}
 
}
//柱形图
export function bar(id,data){

//	var myChart = echarts.init(document.getElementById(id));
	var option = {
//	    color: ['#3398DB'],
//	    tooltip : {
//	        trigger: 'axis',
//	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//	        }
//	    },
//	    grid: {
//	        left: '3%',
//	        right: '4%',
//	        bottom: '3%',
//	        containLabel: true
//	    },
//	    xAxis : [
//	        {
//	            type : 'category',
//	            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//	            axisTick: {
//	                alignWithLabel: true
//	            }
//	        }
//	    ],
//	    yAxis : [
//	        {
//	            type : 'value'
//	        }
//	    ],
//	    series : [
//	        {
//	            name:'直接访问',
//	            type:'bar',
//	            barWidth: '60%',
//	            data:[10, 52, 200, 334, 390, 330, 220]
//	        }
//	    ]
	}
// 	window.onresize = function(){
// 		myChart.resize();
// 	}
}