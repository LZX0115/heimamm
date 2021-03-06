import instance from '@/utils/request.js'
function getSubjectData(params) {
    return instance({
        url: "/subject/list",
        method: "get",
        params
    })
}
function getSubjectStatus(data) {
    return instance({
        url: "/subject/status",
        method: "post",
        data
    })
}
function delSubjectData(data) {
    return instance({
        url: "/subject/remove",
        method: "post",
        data
    })
}
function addSubjectData(data) {
    return instance({
        url: "/subject/add",
        method: "post",
        data
    })
}
function editSubjectData(data) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data      //data: data   
    })
}
export { getSubjectData,getSubjectStatus,delSubjectData,addSubjectData,editSubjectData }