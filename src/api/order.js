import request from "@/utils/request";

function findPage(params) {
    return request({
        url: "/orders/findOrderPage",
        method: "post",
        data: params
    });
}

function findOrderDetail(params) {
    return request({
        url: "/orders/findOrderDetails",
        method: "post",
        data: params
    });
}

function findOrderDetailPage(params) {
    return request({
        url: "/orders/findOrderDetailPage",
        method: "post",
        data: params
    });
}

function submitCheckIn(params) {
    return request({
        url: "/orders/submitCheckIn",
        method: "post",
        data: params
    });
}

function submitOrder(order) {
    return request({
        url: "orders/submitOrder",
        method: 'post',
        data: order
    })
}

function submitOrderDetails(orderDetails) {
    return request({
        url: "orders/submitOrderDetails",
        method: 'post',
        data: orderDetails
    })
}

function checkOut(params) {
    return request({
        url: "/orders/checkOut",
        method: "post",
        data: params
    });
}

function getMonthIncome(params) {
    return request({
        url: "/orders/getMonthIncome",
        method: "post",
        data: params
    });
}

function AddCheckInDays(params) {
    return request({
        url: "/orders/AddCheckInDays",
        method: "post",
        data: params
    });
}

function findHistoryOrderPage(params) {
    return request({
        url: "/orders/findHistoryOrderPage",
        method: "post",
        data: params
    });
}

export default {
    findPage,
    findOrderDetail,
    submitCheckIn,
    submitOrder,
    submitOrderDetails,
    findOrderDetailPage,
    checkOut,
    getMonthIncome,
    AddCheckInDays,
    findHistoryOrderPage
}