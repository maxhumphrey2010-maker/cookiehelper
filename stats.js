// Cookie Helper+
// stats.js
// Statistics tracking system

(function () {
    "use strict";


    const CH = window.CookieHelper;


    if (!CH) {
        console.error(
            "Cookie Helper core missing!"
        );
        return;
    }


    CH.modules.stats = {};


    // Get current cookie stats
    CH.modules.stats.getCookies = function () {

        if (typeof Game === "undefined") {
            return 0;
        }

        return Game.cookies;

    };


    // Get CPS
    CH.modules.stats.getCPS = function () {

        if (typeof Game === "undefined") {
            return 0;
        }

        return Game.cookiesPs;

    };


    // Get cookies per click
    CH.modules.stats.getClickPower = function () {

        if (typeof Game === "undefined") {
            return 0;
        }

        return Game.computedMouseCps;

    };


    // Get total cookies baked
    CH.modules.stats.getTotalCookies = function () {

        if (typeof Game === "undefined") {
            return 0;
        }

        return Game.cookiesEarned;

    };


    // Estimate time until target amount
    CH.modules.stats.timeUntil = function (target) {

        if (typeof Game === "undefined") {
            return Infinity;
        }


        let difference =
            target - Game.cookies;


        if (difference <= 0) {
            return 0;
        }


        if (Game.cookiesPs <= 0) {
            return Infinity;
        }


        return difference / Game.cookiesPs;

    };


    // Format seconds into readable time
    CH.modules.stats.formatTime = function (seconds) {

        if (!isFinite(seconds)) {
            return "∞";
        }


        if (seconds < 60) {
            return Math.floor(seconds) + " seconds";
        }


        if (seconds < 3600) {
            return Math.floor(seconds / 60) + " minutes";
        }


        return Math.floor(seconds / 3600) + " hours";

    };



    // Get all stats at once
    CH.modules.stats.getAll = function () {


        return {

            cookies:
                CH.modules.stats.getCookies(),

            cps:
                CH.modules.stats.getCPS(),

            clickPower:
                CH.modules.stats.getClickPower(),

            total:
                CH.modules.stats.getTotalCookies()

        };

    };



    CH.utils.log(
        "Stats system loaded."
    );


})();
