
/*
/*路由基本使用
1：安装vue-router   npm i vue-router
2:导入vue-router    import VueRouter from 'vue-router'
3:注册              Vue.use(VueRouter)
4:实例化VueRouter   const router=new VueRouter({routes:[//写相应的路由配制]})
   输出 该路由实例化对象   export default router
5：注入到vue实例   
   导入路由实例化对象
   import router from "路径"
   new Vue({router})  
6:来一个路由出口   router-view

*/
// 导入路由
import VueRouter from "vue-router"
// 导入登陆组件
import login from '@/view/login/login.vue'
import layout from '@/view/home/layout.vue'
import business from '@/view/home/business/business.vue'
import chart from '@/view/home/chart/chart.vue'
import question from '@/view/home/question/question.vue'
import subject from '@/view/home/subject/subject.vue'
import userList from '@/view/home/userList/userList.vue'
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
        },
        {
            path: "/home",
            redirect:"/home/chart",
            component: layout,

            children:[
                {
                    path: "business",
                    component: business,
                    meta:{
                        title:"企业列表",

                    }
                },
                {
                    path: "chart",
                    component: chart,
                    meta:{
                        title:"数据概览",

                    }
                },
                {
                    path: "question",
                    component: question,
                    meta:{
                        title:"题库列表",

                    }
                },
                {
                    path: "subject",
                    component: subject,
                    meta:{
                        title:"学科列表",

                    }
                },
                {
                    path: "userList",
                    component: userList,
                    meta:{
                        title:"用户列表",

                    }
                },
            ]
        },
    ]
})
// 路由导航守卫
import  NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to,from,next) =>{
    NProgress.start()
    next()
})

// 进入后守卫
router.afterEach((to,from) =>{
    NProgress.done()
    window.console.log(from)
    document.title = to.meta.title
})
// 输出 出去
export default router











