import instance from '@/utils/request.js'
function getSubjectData(params) {
    return instance({
        url: "/subject/list",
        method: "get",
        params
    })
}
export { getSubjectData }