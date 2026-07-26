// Cookie Helper+
// economy.js
// Smart economy calculations

(function () {
    "use strict";

    const CH = window.CookieHelper;

    if (!CH) {
        console.error("Cookie Helper core missing!");
        return;
    }


    CH.modules.economy = {};



    // Calculate how good a building is
    CH.modules.economy.getBuildingScore = function (building) {

        if (!building) return 0;


        let price = building.getPrice();


        let cpsGain = building.storedCps || 0;


        if (price <= 0 || cpsGain <= 0) {
            return 0;
        }


        // Higher is better
        return cpsGain / price;

    };



    // Find best building available
    CH.modules.economy.getBestBuilding = function () {


        if (typeof Game === "undefined") {
            return null;
        }


        let buildings =
            Game.ObjectsById.filter(
                b =>
                b.getPrice() <= Game.cookies
            );


        if (buildings.length === 0) {
            return null;
        }


        buildings.sort(
            (a, b) =>
            CH.modules.economy.getBuildingScore(b)
            -
            CH.modules.economy.getBuildingScore(a)
        );


        return buildings[0];

    };



    // Calculate upgrade value
    CH.modules.economy.getUpgradeScore = function (upgrade) {


        if (!upgrade) return 0;


        let price =
            upgrade.getPrice();


        if (!price) {
            return 0;
        }


        // Cheaper upgrades get higher priority
        return 1 / price;

    };



    // Find best upgrade
    CH.modules.economy.getBestUpgrade = function () {


        if (typeof Game === "undefined") {
            return null;
        }


        let upgrades =
            Game.UpgradesInStore.filter(
                u =>
                u.canBuy()
            );


        if (upgrades.length === 0) {
            return null;
        }


        upgrades.sort(
            (a, b) =>
            CH.modules.economy.getUpgradeScore(b)
            -
            CH.modules.economy.getUpgradeScore(a)
        );


        return upgrades[0];

    };



    // Current CPS
    CH.modules.economy.getCPS = function () {


        if (typeof Game === "undefined") {
            return 0;
        }


        return Game.cookiesPs;

    };



    // Full recommendation
    CH.modules.economy.getRecommendation = function () {


        let building =
            CH.modules.economy.getBestBuilding();


        let upgrade =
            CH.modules.economy.getBestUpgrade();


        return {

            building:
                building
                ? building.name
                : "None",


            upgrade:
                upgrade
                ? upgrade.name
                : "None"

        };

    };


    CH.utils.log(
        "Smart economy system loaded."
    );


})();
