<!--
	作者：zhaojia
	时间：2017-12-25
	描述：日历
-->
<template>
	<el-col :span="24">
		<el-col>
			<div id='calendar'></div>
		</el-col>
	</el-col>
</template>
<script>
	import { mapState } from 'vuex'
	import Vue from 'vue'

	var that;
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState({
				eventDetail: state => state.calendar.calendarData.eventDetail

			})
		},
		created() {
			that = this;
			this.$store.dispatch('getCalendar');
		},
		mounted() {
			initCalender()
		},
		methods: {}
	}

	function initCalender() {
		$(function() {
			//事件添加

			$('#calendar').fullCalendar({
				header: {
					left: 'prev,today,next ',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				firstDay: 1,
				editable: false,
//				timeFormat: 'H:mm',
//				axisFormat: 'H:mm',
				weekMode: 'fixed',
				weekNumbers: true,
				handleWindowResize: true,
				navLinks: true, // can click day/week names to navigate views
				eventLimit: 4, // allow "more" link when too many events
 				eventLimitText: "更多>>",
 				slotEventOverlap : false, 
				weekNumberTitle: "周",
				allDayText : "全天",
				locale :  "zh-cn",
				buttonText: {
					today: '今天',
					month: '月',
					week: '周',
					day: '日',
					listWeek: '列表'
				},
				lazyFetching : false,  
				eventRender: function(event, element) {
					console.log(event.id,"523")
					var styleDic = []
					styleDic["1"]="btn-info"
					styleDic["2"]="btn-yellow"
					styleDic["3"]="btn-pink"
					styleDic["4"]="disabled"
					var btnDic = []
					btnDic["1"]="开始"
					btnDic["2"]="进行中"
					btnDic["3"]="延期"
					btnDic["4"]="已完成"
					
					var i = event.state;
					i==4?i=1:i=i+1;
					
					element[0].innerHTML="<div class='fc-content'>"+
					"<span class='fc-title'>"+event.title+
					"</span><button  class='pull-right btn btn-white "+styleDic[event.state]+"' onclick = 'mytest("+event.id+","+i+")'>"+btnDic[event.state]+"</button></div>";					
			    },	  
				eventClick: function(event, jsEvent, view) {
					//window.location.href = "http://localhost:8088/#/component/calendarDetails"
				},
				droppable: false,
				events: that.eventDetail,
			});
 		});
	}
	window.mytest = function(a,b){
		alert("改变状态")
		var param = {id:a,state:b}
		that.$store.dispatch('getCalendar',param);
	};
</script>
<style scoped="scoped">
	.fc-state-highlight {
		background: #ff00003d !important;
	}
	
	#calendar {
		margin: 0 auto;
	}
	.fc-day-number{
		background: #0088CC!important;
		width: 100%!important; 
	}
</style>