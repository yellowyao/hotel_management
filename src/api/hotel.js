import request from "@/utils/request";

function findHotel(id) {
    return request({
        url: "hotels/findHotel?id=" + id,
        method: "get",

    });
}

function findAllHotel() {
    return request({
        url: "hotels/findAllHotel",
        method: "get",

    });
}

function CalculateCheckInRate(params) {
    return request({
        url: "hotels/CalculateCheckInRate",
        method: "post",
        data: params
    });
}

function export_test(params) {
    return request({
        url: "hotels/export",
        method: "post",
        data: params
    });
}

export default {
    findHotel,
    findAllHotel,
    CalculateCheckInRate,
    export_test
}