
// 导入路由
import VueRouter from "vue-router"
// 导入登陆组件
import login from '@/view/login/login.vue'
// 注册
import Vue from 'vue'
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    // 路由配制
    routes: [
        {
            path: "/",
            component: login
        }
    ]
})
// 输出 出去
export default router