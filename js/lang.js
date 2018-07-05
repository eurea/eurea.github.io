function updateLang(lang) {
    var date = new Date();
    date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 365);
    document.cookie = 'lang=' + lang + ';expires=' + date.toGMTString() + ';';
    console.log(getCookie("lang"));
}

function changeLanguage() {
    $('[lang="jp"]').toggle();
    $('[lang="en"]').toggle();
    if (getCookie("lang") == "en") {
        updateLang("jp");
        $("#bonus-info").data('bs.popover').options.content = "大事なものと属性強化から受け受けられています";
        document.title = "グラブルExpと蒼光の御印カルキュレーター";
    }
    else {
        updateLang("en");
        $("#bonus-info").data('bs.popover').options.content = "Usually comes from Wonders and Elemental Skills.";
        document.title = "GBF Exp and Spark Calculator";
    }
}
console.log(getCookie("lang"));
if (getCookie("lang") != "jp") {
    updateLang("en");
}
else {
    $('[lang="jp"]').toggle();
    $('[lang="en"]').toggle();
    document.title = "グラブルExpと蒼光の御印カルキュレーター";
    setTimeout('$("#bonus-info").data("bs.popover").options.content = "大事なものと属性強化から受け受けられています";', 200);
}