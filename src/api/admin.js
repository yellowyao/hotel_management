import request from "@/utils/request";

function login(params) {
    return request({
        url: "administrator/login",
        method: "post",
        data: params
    });
}

export default {
    login
}