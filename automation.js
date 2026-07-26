// Cookie Helper+
// automation.js
// Automation features

(function () {
    "use strict";


    const CH = window.CookieHelper;


    if (!CH) {
        console.error(
            "Cookie Helper core missing!"
        );
        return;
    }


    CH.modules.automation = {};



    // Auto click big cookie
    CH.modules.automation.autoClick = function () {

        if (
            CH.utils.enabled("autoClick")
            && typeof Game !== "undefined"
        ) {

            Game.ClickCookie();

        }

    };



    // Auto click golden cookies and other shimmers
    CH.modules.automation.autoGolden = function () {

        if (
            CH.utils.enabled("autoGolden")
            && typeof Game !== "undefined"
        ) {

            Game.shimmers.forEach(shimmer => {

                if (
                    shimmer.type === "golden"
                ) {

                    shimmer.pop();

                }

            });

        }

    };



    // Auto click reindeer
    CH.modules.automation.autoReindeer = function () {

        if (
            CH.utils.enabled("autoReindeer")
            && typeof Game !== "undefined"
        ) {

            Game.shimmers.forEach(shimmer => {

                if (
                    shimmer.type === "reindeer"
                ) {

                    shimmer.pop();

                }

            });

        }

    };



    // Buy available upgrades
    CH.modules.automation.autoUpgrade = function () {

        if (
            CH.utils.enabled("autoUpgrade")
            && typeof Game !== "undefined"
        ) {


            Game.UpgradesInStore.forEach(upgrade => {

                if (
                    upgrade.canBuy()
                ) {

                    upgrade.buy();

                }

            });

        }

    };



   // Smart building buying
CH.modules.automation.autoBuild = function () {

    if (
        CH.utils.enabled("autoBuild")
        && typeof Game !== "undefined"
    ) {


        if (!CH.modules.economy) {
            return;
        }


        let best =
            CH.modules.economy.getBestBuilding();


        if (
            best
            &&
            best.getPrice()
            <= Game.cookies
        ) {

            best.buy();

            CH.utils.log(
                "Bought best building: "
                + best.name
            );

        }

    }

};

        if (
            CH.utils.enabled("autoBuild")
            && typeof Game !== "undefined"
        ) {


            let buildings =
                Game.ObjectsById.filter(
                    building =>
                    building.getPrice()
                    <= Game.cookies
                );


            if (buildings.length > 0) {


                buildings.sort(
                    (a, b) =>
                    b.storedCps -
                    a.storedCps
                );


                buildings[0].buy();

            }

        }

    };



    // Start automation loops
    CH.modules.automation.start = function () {


        setInterval(() => {

            CH.modules.automation.autoClick();

        }, CH.settings.clickSpeed);



        setInterval(() => {

            CH.modules.automation.autoGolden();

            CH.modules.automation.autoReindeer();

        }, 100);



        setInterval(() => {

            CH.modules.automation.autoUpgrade();

            CH.modules.automation.autoBuild();

        }, 1000);



        CH.utils.log(
            "Automation system started."
        );

    };



    // Start when mod loads
    CH.modules.automation.start();


})();
