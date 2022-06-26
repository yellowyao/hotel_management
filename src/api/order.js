import request from "@/utils/request";

function findPage(params) {
    return request({
        url: "/orders/findPage",
        method: "post",
        params
    });
}

export default {
    findPage
}