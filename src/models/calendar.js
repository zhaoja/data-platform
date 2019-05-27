var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
// 开始：'label-info'
//进行中： 'label-yellow'
//已完成：'label-grey'
//挂起：'label-pink'

 export default {
	state: {
		calendarData: {
			eventDetail: []

		}
	},
	actions: {
		getCalendar({commit,state}, items) {
			console.log(items)
 			var mydata = [{
					id: 1,
					title: '全天计划写脚本',
					start: '2018-01-01 06:30',
					end: '2018-01-01 16:30',
					className: 'label-info',
					note: '时间紧迫大家抓紧时间啊啊啊啊时间紧迫大家抓紧时间，干完发年终奖啊啊啊 啊啊啊啊时间紧迫大家抓紧时间啊啊啊啊时间紧\迫大家抓紧时间啊啊啊啊',
					editable: false,
					state:1
				},
				{
					id: 2,
					title: '港台四日游\r\n'+"哈哈哈",
					start: '2018-01-11',
					end: '2018-01-11',
					allDay: true,
					className: 'label-success',
					state:2
				},
 
				{
					id: 3,
					title: '电话回访客户',
					start: '2017-12-14'+'06:00',
					end: '2017-12-15'+' 18:00',
					allDay: true,state:3,
					className: 'label-grey'
				},
				{
					id: 4,
					title: '电话回访客户',
					start: new Date(y, m, d + 4, 16, 0),
					allDay: false,state:4,
					className: 'label-pink'
				},
				{
					title: '视频会议阿萨德撒的撒的阿萨德啊实打实的阿萨德阿萨德达到',
					start: '2018-01-02',
					end: '2018-01-02',
					allDay: true,state:3,
					className: 'label-yellow'
				},
				{
					title: '6663eterwtewrtr',
					start: '2018-01-02',
					end: '2018-01-02',
					allDay: true,state:2,
					className: 'label-yellow'
				},
				{
					title: '中秋放假阿萨德撒的阿萨德阿萨德阿萨德',
					start: new Date(y, m, d, 10, 30),state:1,
					allDay: false
				},
				{
					title: '中秋放假阿萨德撒的阿萨德阿萨德阿萨德',
					start: '2013-09-19',
					end: '2013-09-21',state:1,
				},
				{
					title: '午饭艾斯德斯多所',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),state:1,
					allDay: false
				}, {
					title: '吃鸡阿萨德撒手动阀手动阀安抚答复大手动阀手动阀阿萨德的',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),state:1,
					allDay: false
				}, {
					title: '吃午饭阿萨德撒大声地',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),state:1,
					allDay: false
				}
			]
			commit("getCalendarOk",mydata)
		},
		newState({commit,state}, items) {
			console.log(items, 2222)
//			 commit(infosuccess,mydata)
//           $http.post("/api/asset/show/info",items).then(({ status, msg, data ,total})=>{
//              if(status == "succcess"){
//                     var mydata={};
////                      mydata.items=items
////                      mydata.data=data
////                      mydata.total=total
////                      commit(infosuccess,mydata)
//              }
//           })
		}
	},
	mutations: {
		getCalendarOk(state,data){
			state.calendarData.eventDetail = data;
		}
	}
}