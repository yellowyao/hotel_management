import Cookies from 'js-cookie'


function setTokenByName(name, token) {
    return Cookies.set(name, token)
}

function getTokenByName(name) {
    return Cookies.get(name)
}


function removeTokenByName(name) {
    return Cookies.remove(name)
}


export default {

    setTokenByName,
    getTokenByName,
    removeTokenByName,
}