"use strict";

(function() {
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

    function writeToStorage() {
        localStorage.setItem("crystals", $("#crystals").val());
        localStorage.setItem("singles", $("#singles").val());
        localStorage.setItem("tens", $("#tens").val());
    }

    window.calcRolls = function() {
        writeToStorage();
        $("#total-rolls").val(Number(Math.floor($("#crystals").val() / 300)) + Number($("#singles").val()) + Number($("#tens").val() * 10));
        $("#percentage").val(~~(($("#total-rolls").val() / 300) * 100) + "%");
    };

    if (localStorage.getItem("newFormat")) {
        $("#crystals").val(localStorage.getItem("crystals"));
        $("#singles").val(localStorage.getItem("singles"));
        $("#tens").val(localStorage.getItem("tens"));
    }
    else {
        // move data from cookies to local storage
        $("#crystals").val(getCookie("crystals"));
        $("#singles").val(getCookie("singles"));
        $("#tens").val(getCookie("tens"));

        localStorage.setItem("lang", getCookie("lang"));
        localStorage.setItem("newFormat", true);
        writeToStorage();
    }
    calcRolls();
})();