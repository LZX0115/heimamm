import instance from '@/utils/request.js'
function getBusinessData(params) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        params
    })
}
function addBusinessData(data) {
    return instance({
        url: "/enterprise/add",
        method: "post",
        data
    })
}
function delBusinessData(data) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data
    })
}
function setBusinessData(data) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        data
    })
}
function editBusinessDate(data) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}
export { getBusinessData,addBusinessData,delBusinessData,setBusinessData,editBusinessDate }