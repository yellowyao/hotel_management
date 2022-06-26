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

export default {
    addRooms,
    findRoomsPage
}