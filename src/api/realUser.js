import request from "@/utils/request";
import cookie from "@/utils/cookie";

function addRealUser(realUser) {
    return request({
        url: "realusers/addRealUser?id=" + cookie.getTokenByName("userId"),
        method: 'post',
        data: realUser
    })
}

function findRealPage(query) {
    return request({
        url: 'realusers/findRealPage',
        method: 'post',
        data: query
    })
}

export default {
    addRealUser,
    findRealPage
}