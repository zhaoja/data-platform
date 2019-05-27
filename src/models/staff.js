export default {
    state:{
        staffData:{
        	organization:{
	        	tTitle:"",
	        	tHead:[],
	            tData: [],
	            editBtn:[]
			},
			jobBinding:{
	        	tTitle:"",
	        	tHead:[],
	            tData: [],
	            editBtn:[]
			},
			job:{
				tTitle:"",
	        	tHead:[],
	            tData: [],
	            editBtn:[]
			},
            member:{
            	tTitle:"",
	        	tHead:[],
	            tData: [],
	            editBtn:[]
            },
            dialog:{
            	dialogFormVisible:false,
            	fData:[ ]
            }
        }
    },
    actions: {
        getOrganization({commit, state},items){
         	var data = {};
	  		data.tTitle = "组织管理"
	    	data.tHead = [
	    		{name:"name",cname:'组织名'},
	    		{name:"state",cname:'状态'},
	    		{name:"date",cname:'创建时间'},
	    		{name:"person",cname:'创建人'},
			]
	    	data.tData = [{
	            name: '任务管理系统',
	            state:'正常',
	            date: '2016-05-02',
	            person:'赵英俊',
	          },{
	            name: '任务管理系统',
	            state:'正常',
	            date: '2016-05-02',
	            person:'赵英俊',
	          } ,{
	            name: '任务管理系统',
	            state:'正常',
	            date: '2016-05-02',
	            person:'赵英俊',
	          } ,{
	            name: '任务管理系统',
	            state:'正常',
	            date: '2016-05-02',
	            person:'赵英俊',
	          } ,{
	            name: '任务管理系统',
	            state:'正常',
	            date: '2016-05-02',
	            person:'赵英俊',
	          } ,{
	            name: '任务管理系统',
	            state:'正常',
	            date: '2016-05-02',
	            person:'赵英俊',
	          }   
	    	];
            data.editBtn = [
            	{name:"添加",act:"addChildOgn"},
            	{name:"修改",act:"updata"},
            	{name:"删除",act:"delete"},
            ]
            commit('getOrganizationOk', data)
        },
        getJobBinding({commit, state},items){
        	var data = {};
        	data.tTitle = "职务绑定"
        	data.tHead = [
        		{name:"id",cname:'序号'},
        		{name:"jobname",cname:'职务名'}
			]
        	data.tData = [{
	            id: '1',
	            jobname:'总管理员'
	          },{
	            id: '1',
	            jobname:'总管理员'
	          },{
	            id: '1',
	            jobname:'总管理员'
	          },{
	            id: '1',
	            jobname:'总管理员'
	          },{
	            id: '1',
	            jobname:'总管理员'
	          },{
	            id: '1',
	            jobname:'总管理员'
	          }]
        	data.editBtn = [
            	{name:"解绑",act:"Unbundling"},
            ]
        	commit('getJobBindingOk', data)
        },
        getJob({commit, state},items){
        	var data = {};
        	data.tTitle = "职务绑定"
        	data.tHead = [
        		{name:"job",cname:'职务名'},
        		{name:"state",cname:'状态'},
        		{name:"person",cname:'创建人'},
        		{name:"date",cname:'创建时间'},
			]
        	data.tData = [{
	            job:'董事长',
	            state:'正常',
	            person:'范冰冰',
	            date:'2012-11-12',
	          },{
	            job:'董事长',
	            state:'正常',
	            person:'范冰冰',
	            date:'2012-11-12',
	          },{
	            job:'董事长',
	            state:'正常',
	            person:'范冰冰',
	            date:'2012-11-12',
	          },{
	            job:'董事长',
	            state:'正常',
	            person:'范冰冰',
	            date:'2012-11-12',
	          },{
	            job:'董事长',
	            state:'正常',
	            person:'范冰冰',
	            date:'2012-11-12',
	          },{
	            job:'董事长',
	            state:'正常',
	            person:'范冰冰',
	            date:'2012-11-12',
	          } 
        	]
        	data.editBtn = [
            	{name:"创建子职务",act:"creat"},
            	{name:"修改",act:"updata"},
            	{name:"删除",act:"delete"},
            ]
        	commit('getJobOk', data)
        },
        getMember({commit, state},items){
        	var data = {};
        	data.tTitle = "成员"
        	data.tHead = [
        		{name:"id",cname:'序号'},
        		{name:"name",cname:'成员名'}
			]
        	data.tData = [{
	            id:'1',
	            name:'范冰冰'
	          },{
	            id:'1',
	            name:'范冰冰'
	          },{
	            id:'1',
	            name:'范冰冰'
	          },{
	            id:'1',
	            name:'范冰冰'
	          },
        	]
        	data.editBtn = [
            	{name:"解绑",act:"creat"},
            ]
        	commit('getMemberOk', data)
        },
        getDialogForm({commit, state},items){
         
        	var data = {};
        	data.dialogFormVisible=true,
            data.fData = [
            	{name:"name",cname:"用户名",value:""},
            	{name:"state",cname:"状态",value:""}
        	]
            commit('getdialogFormOk', data) 
        }
    },
    mutations: {
        getOrganizationOk(state, data) {
            state.staffData.organization = data;
        },getJobBindingOk(state, data) {
            state.staffData.jobBinding = data;
        },getJobOk(state, data) {
            state.staffData.job = data;
        },getMemberOk(state, data) {
            state.staffData.member = data;
        },getdialogFormOk(state, data) {
        	console.log(2)
            state.staffData.dialog = data;
        }
        
        
    }
}
   