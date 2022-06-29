import request from "@/utils/request";

function addRooms(room) {
    return request({
        url: 'rooms/addRoom',
        method: 'post',
        data: room
    })
}

function findRoomsPage(query) {
    return request({
        url: 'rooms/findRoomsPage',
        method: 'post',
        data: query
    })
}

function findAllRoomsByStatusAndType(query) {
    return request({
        url: 'rooms/findAllRoomsByStatusAndType',
        method: 'post',
        data: query
    })
}

function getRoomcheckinstatus(params) {
    return request({
        url: 'roomcheckinstatus/getRoomcheckinstatus',
        method: 'post',
        data: params
    })
}

export default {
    addRooms,
    findRoomsPage,
    findAllRoomsByStatusAndType,
    getRoomcheckinstatus
}