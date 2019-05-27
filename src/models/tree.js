export default {
    state:{
        treeData:{
        	tree:[],
        	treeDetial:[],
        	newChild:{}
        }   
            
    },
    actions: {
    	getTreeData({commit,state},items){
    		var myData = [{
					id: 1,
					label: '一级任务',
					detail:"这是描述，这是个艰巨的任务，这是个伟大的任务，具体内容是做什么什么，分配给什么什么人，怎么做都写在这里好吧",
					children: [{
						id: 4,
						label: '二级任务1',
						children: [{
							id: 9,
							label: '三级任务1'
						}, {
							id: 10,
							label: '三级任务2'
						}]
					}]
				}, {
					id: 2,
					label: '一级 任务2',
					children: [{
						id: 5,
						label: '二级任务1'
					}, {
						id: 6,
						label: '二级任务2'
					}]
				}, {
					id: 3,
					label: '一级任务 3',
					children: [{
						id: 7,
						label: '二级任务1'
					}, {
						id: 8,
						label: '二级任务2'
					}]
				}] ;
        	commit('getTreeDataOk', myData);
    	},
        getTreeDetail({commit, state},items){
        	
	        var myData;
	        myData = items;
        	commit('getTreeDetailOk', myData);
        },
        updataTreeDetail({commit, state},items){
        	var myData;
        	myData = items;
        	console.log(items,123123)
        	commit('updataTreeDetailOk',myData)
        }
            
    },
    mutations: {
    	getTreeDataOk(state, data){
            state.treeData.tree = data;
    	},
        getTreeDetailOk(state, data) {
            state.treeData.treeDetial = data;
        },
        updataTreeDetailOk(state, data){
        	state.treeData.newChild = data;
        }
    }
}
