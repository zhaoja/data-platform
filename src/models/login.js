export default {
    state:{
        loginData:{
        	
            formName: [
            	{cname:"用户名",name:"user",value:"",error:""},
            	{cname:"密码",name:"password",value:"",error:""},
            ],
//          formName1: [
//          	{cname:"姓名",name:"name",value:"",error:""},
//          	{cname:"用户名",name:"user",value:"",error:""},
//          	{cname:"密码",name:"password",value:"",error:""},
//          	{cname:"确认密码",name:"againPassword",value:"",error:""},
//          	{cname:"角色",name:"role",value:"",error:""},
//          ],
            loginName:"",
            token:""
        }
    },
    actions: {
        getLogin({commit, state},items){
        	
        	var ndata;
	        if(items==1){
	        		
	    		ndata =  [
	            	{cname:"用户名",name:"user",value:"",error:""},
	            	{cname:"密码",name:"password",value:"",error:""},
	            ],
    			state.loginData.loginName ="登录";
	        	}else if(items==2){
	        		
        		ndata = [
	          		{cname:"姓名",name:"name",value:"",error:""},
	            	{cname:"用户名",name:"user",value:"",error:""},
	            	{cname:"密码",name:"password",value:"",error:""},
	            	{cname:"确认密码",name:"againPassword",value:"",error:""},
	          		{cname:"角色",name:"role",value:"",error:""},
	            ],
	        		state.loginData.loginName ="注册";
	        	}
        	  
        	commit('getLoginOk', ndata)
        }  
  	},
    mutations: {
        getLoginOk(state, data) {
            state.loginData.formName = data;
        }
    }
}
