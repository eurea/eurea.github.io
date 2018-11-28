"use strict";

$(function () {
    var lang = localStorage.getItem("lang");
    var titleJP = "グラブルEXPと蒼光の御印の計算";
    var popoverJP = "普通に大事なものと属性強化スキルから";
    var popoverEN = "Usually comes from Wonders and Elemental Skills.";
    var Language = {
        English: "en",
        Japanese: "jp"
    };

    function setLanguage(newLang) {
        lang = newLang;
        localStorage.setItem("lang", newLang);
    }

    window.changeLanguage = function(e, forceJp) {
        $('[lang="jp"]').toggle();
        $('[lang="en"]').toggle();
        if (forceJp || lang === Language.English) {
            setLanguage(Language.Japanese);
            document.title = titleJP;
            $("#bonus-info").data('bs.popover').options.content = popoverJP;
        }
        else {
            setLanguage(Language.English);
            document.title = "GBF Exp and Spark Calculator";
            $("#bonus-info").data('bs.popover').options.content = popoverEN;
        }
    }

    $("#bonus-info").popover({
        animation: true,
        content: popoverEN,
        trigger: "hover",
        placement: "auto bottom",
    });

    if (lang === Language.Japanese) {
        changeLanguage(null, true);
        $("#lang-box").prop("checked", true);
    }
    else {
        setLanguage(Language.English);
    }
});
