import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../containers/layout.vue';
import Home from '@/containers/home'
//import Login from '@/containers/login'
import Upload from '@/containers/upload'

import Largescreen from "@/containers/largescreen"
import Organization from '@/containers/organization'
import Details from '@/containers/details'

import Wokorder from '@/containers/wokorder'
import IMorder from '@/containers/IMorder'
//import WokorderDetails from '@/containers/wokorderdetails'
//import More12345Order from '@/containers/more12345Order'
//import Details from '@/containers/details'

//import Calendar from '@/components/component/calendar'
//import CalendarDetails from '@/components/component/calendarDetails'
//import Organization from '@/containers/staff/organization'
//import Job from '@/containers/staff/job'
//import Member from '@/containers/staff/member'
//import Limit from '@/containers/staff/limit'
//
//import Form from '@/components/component/form'
//import Table from '@/components/component/table'

Vue.use(Router)

var router = new Router({
	routes: [{
		path: "/",
		name: "",
		component: Layout,
		children: [{
				path: "",
				name: "",
				component: Largescreen
			},
			{
				path: "home",
				name: "工单",
				meta: {
		            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		        },
				component: Home
			},
			{
				path: "largescreen",
				name: "大数据展示平台",
				meta: {
				    requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
				},
				component: Largescreen
			},{
				path: "organization",
				name: "工单管理",
				component: Organization
			},
			{
				path: "details",
				name: "工单详情",
				component: Details
			},
			{
				path: "wokorder",
				name: "12345工单管理",
				component: Wokorder
			},
			{
				path: "IMorder",
				name: "12345工单管理",
				component: IMorder
			},
//			{
//				path: "upload",
//				name: "上传工单",
//				meta: {
//		            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
//		       },
//				component: Upload
//			},
		]
	},
//	{
//		path: "/login",
//		name: "登录",
//		component: Login
//	},
	{
		path: "*"
	}]
});
export default router;
 	
	
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
 
        if (document.cookie) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})