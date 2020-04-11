
// 导入
import Vuex from 'vuex'
import Vue from 'vue'
// 注册
Vue.use(Vuex)
// 实例化new
const store = new Vuex.Store({
    state:{
        userInfo:""
    }
})

// 导出
export default store