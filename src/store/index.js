
// 导入
import Vuex from 'vuex'
import Vue from 'vue'
// 注册
Vue.use(Vuex)
// 实例化new
const store = new Vuex.Store({
    state:{
        userInfo:"",
        roleObj: {
            1:"超级管理员",
            2: "管理员",
            3: "老师",
            4: "学生"
        },
         // 定义一下默认角色为超级管理员
         role: "超级管理员"
    }
})

// 导出
export default store