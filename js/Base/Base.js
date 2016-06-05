import {Print} from './Print'

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

function getBrowserType() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return "weixin"
    }
    if (ua.match(/MSIE/i) == 'msie') {
        return "MSIE"
    }
    if (ua.match(/Firefox/i) == 'firefox') {
        return "Firefox"
    }
    if (ua.match(/Chrome/i) == 'chrome') {
        return "Chrome"
    }
    if (ua.match(/Safari/i) == 'safari') {
        return "Safari"
    }
    if (ua.match(/Camino/i) == 'camino') {
        return "Camino"
    }
    if (ua.match(/Gecko/i) == 'gecko') {
        return "Gecko"
    }
    return "Unknown"
}

function getOSType() {
    var OSName = "Unknown";
    var app_version = navigator.appVersion;

    if (app_version.indexOf("Win") != -1) {
        OSName = "Windows";
    } else if (app_version.indexOf("Macintosh") != -1) {
        OSName = "Mac";
    } else if (app_version.indexOf("Android") != -1) {
        OSName = "Android";
    } else if (app_version.indexOf("iPhone") != -1) {
        OSName = "iPhone";
    } else if (app_version.indexOf("iPod") != -1) {
        OSName = "iPod";
    } else if (app_version.indexOf("X11") != -1) {
        OSName = "UNIX";
    } else if (app_version.indexOf("Linux") != -1) {
        OSName = "Linux"
    }

    return OSName
}

function SetCookie(name, value, expires, path, domain, secure) {
    var cookieStr = name + "=" + escape(value) + "; ";

    if (expires) {
        expires = SetExpiration(expires);
        cookieStr += "expires=" + expires + "; ";
    }
    if (path) {
        cookieStr += "path=" + path + "; ";
    }
    if (domain) {
        cookieStr += "domain=" + domain + "; ";
    }
    if (secure) {
        cookieStr += "secure; ";
    }

    document.cookie = cookieStr;
}

function GetCookie(cookie_name) {
    var cName = "";

    var pCOOKIES = document.cookie.split('; ');
    for (var bb = 0; bb < pCOOKIES.length; bb++) {
        var NmeVal = new Array();
        NmeVal = pCOOKIES[bb].split('=');
        if (NmeVal[0] == cookie_name) {
            cName = unescape(NmeVal[1]);
            break;
        }
    }
    return cName;
}

function PrintCookies() {
    var cStr = "";
    var pCOOKIES = document.cookie.split('; ');
    for (var bb = 0; bb < pCOOKIES.length; bb++) {
        var NmeVal = pCOOKIES[bb].split('=');
        if (NmeVal[0]) {
            cStr += NmeVal[0] + '=' + unescape(NmeVal[1]) + '; ';
            break;
        }
    }
    return cStr;
}

function SetExpiration(cookieLife) {
    var today = new Date();
    var expr = new Date(today.getTime() + cookieLife * 24 * 60 * 60 * 1000);
    return expr.toGMTString();
}

function QueryParam(search_key) {
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    for (var i = 0; i < parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0 && search_key == parms[i].substring(0, pos)) {
            return parms[i].substring(pos + 1);;
        }
    }
    return "";
}

function LoadJS(file_path) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", file_path);
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

module.exports = {
    Assert: assert,
    Print: Print,

    get Debug() {
        return process.env.NODE_ENV !== 'production';
    },
    
    get BrowserType() {
        return getBrowserType()
    },

    get OSType() {
        return getOSType()
    },

    SetCookie: SetCookie,
    GetCookie: GetCookie,
    PrintCookies: PrintCookies,
    QueryParam: QueryParam,
    LoadJS: LoadJS
}