/*
 name = value;
 expires = date;
 koszones = Tihamer;
 expire = lejarati datum;*/
function setCooie(name, value, expire) {
    var nowDate = new Date();
    nowDate.setDate(nowDate.getDate() + expire);
    var cookieExpire = (expire == null) ? "" : "expires =" + nowDate.toUTCString() + ";";
    // document.cookie = cookieName + cookieValue + cookieExpire;
    document.cookie = name + "=" + escape(value) + ";" + cookieExpire;
};
function getCookie(name) {
    var cookieValue;
    var cookieArray = new Array();
    cookieArray = document.cookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
        if (cookieArray[i].indexOf(name) != +1) {
            cookieValue = cookieArray[i].substr(cookieArray[i].indexOf("=") + 1)
            return unescape(cookieValue);
        }
    }
};
function checkCookie() {
    var newUser = getCookie("koszones");
    if (newUser == "") {
        newUser = prompt("Kerlek add meg a neved!");

        setCooie("koszones", newUser, 365);
        document.write("megjegyeztem a neved" + newUser + ". Legkozelebb emlekezni fogok rad")
    }
    else {
        document.write(document.cookie);
        document.write("Udvozollek " + newUser);
    }
}


