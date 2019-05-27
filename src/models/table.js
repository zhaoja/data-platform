export default {
    state:{
        table:{
            tableData: []
        }
    },
    actions: {
        getTable({commit, state},items){
            var data = [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }];
            commit('getTableOk', data)
        }
    },
    mutations: {
        getTableOk(state, data) {
            state.table.tableData = data;
        }
    }
}
