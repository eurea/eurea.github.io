function updateLang(lang) {
    localStorage.setItem("lang", lang);
}

function changeLanguage() {
    $('[lang="jp"]').toggle();
    $('[lang="en"]').toggle();
    if (localStorage.getItem("lang") == "en") {
        updateLang("jp");
        $("#bonus-info").data('bs.popover').options.content = "普通に大事なものと属性強化スキルから";
        document.title = "グラブルEXPと蒼光の御印の計算";
    }
    else {
        updateLang("en");
        $("#bonus-info").data('bs.popover').options.content = "Usually comes from Wonders and Elemental Skills.";
        document.title = "GBF Exp and Spark Calculator";
    }
}

$(function () {
    if (localStorage.getItem("lang") != "jp") {
        updateLang("en");
    }
    else {
        $('[lang="jp"]').toggle();
        $('[lang="en"]').toggle();
        document.title = "グラブルEXPと蒼光の御印の計算";
        setTimeout('$("#bonus-info").data("bs.popover").options.content = "普通に大事なものと属性強化スキルから";', 200);
    }
});
