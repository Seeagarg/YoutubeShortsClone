import Cookies from "js-cookie"

export function setCookie(data){
    Cookies.set('token',data,{expires:2})
    // console.log(data,"added to the cookie")
}

export  function getCookie(){
    const token = Cookies.get('token');
    // console.log(token,"token....")
    return token;
}

export function removeCookie(){
    Cookies.remove('token');
}