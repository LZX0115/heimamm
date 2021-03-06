/*
接口调用；
1：安装axios   npm i axios
2:导入axios    import axios from 'axios
3:使用axios调用接口
*/

import instance from '@/utils/request.js'
function getPhoneCode(data) {
    return instance({
        url: "/sendsms",
        method: "post",
        data
    })
}
function register(data) {
    return instance({
        url: "/register",
        method: "post",
        data,
    })
}
export { getPhoneCode, register, }