function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function calcRolls(){
    //console.log(Math.floor($("#crystals").val() / 300));
    var date = new Date();
    date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 365);
    document.cookie = 'crystals=' + $("#crystals").val() + ';expires=' + date.toGMTString() + ';';
    document.cookie = 'singles=' + $("#singles").val() + ';expires=' + date.toGMTString() + ';';
    document.cookie = 'tens=' + $("#tens").val() + ';expires=' + date.toGMTString() + ';';
    console.log(document.cookie);
    $("#total-rolls").val(Number(Math.floor($("#crystals").val() / 300)) + Number($("#singles").val()) + Number($("#tens").val() * 10));
    $("#percentage").val(~~(($("#total-rolls").val() / 300) * 100) + "%");
}

$("#crystals").val(getCookie("crystals"));
$("#singles").val(getCookie("singles"));
$("#tens").val(getCookie("tens"));
calcRolls();