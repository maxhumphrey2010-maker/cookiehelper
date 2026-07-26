// Cookie Helper+
// economy.js
// Economy calculations and smart purchasing helpers

(function () {
    "use strict";


    const CH = window.CookieHelper;


    if (!CH) {
        console.error(
            "Cookie Helper core missing!"
        );
        return;
    }


    CH.modules.economy = {};



    // Calculate building payback time
    CH.modules.economy.getBuildingEfficiency = function (building) {

        if (!building) return 0;


        let price = building.getPrice();


        let cpsIncrease =
            building.storedCps || 0;


        if (cpsIncrease <= 0) {
            return Infinity;
        }


        return price / cpsIncrease;

    };



    // Find the best building to buy
    CH.modules.economy.getBestBuilding = function () {


        if (typeof Game === "undefined") {
            return null;
        }


        let buildings =
            Game.ObjectsById.filter(
                building =>
                building.getPrice()
                <= Game.cookies
            );


        if (buildings.length === 0) {
            return null;
        }


        buildings.sort((a, b) => {

            return (
                CH.modules.economy.getBuildingEfficiency(a)
                -
                CH.modules.economy.getBuildingEfficiency(b)
            );

        });


        return buildings[0];

    };



    // Calculate upgrade value
    CH.modules.economy.getUpgradeScore = function (upgrade) {


        if (!upgrade) {
            return 0;
        }


        let price =
            upgrade.getPrice();


        if (!price) {
            return 0;
        }


        return 1 / price;

    };



    // Find best available upgrade
    CH.modules.economy.getBestUpgrade = function () {


        if (typeof Game === "undefined") {
            return null;
        }


        let upgrades =
            Game.UpgradesInStore.filter(
                upgrade =>
                upgrade.canBuy()
            );


        if (upgrades.length === 0) {
            return null;
        }


        upgrades.sort((a, b) => {

            return (
                CH.modules.economy.getUpgradeScore(b)
                -
                CH.modules.economy.getUpgradeScore(a)
            );

        });


        return upgrades[0];

    };



    // Get current cookies per second
    CH.modules.economy.getCPS = function () {


        if (typeof Game === "undefined") {
            return 0;
        }


        return Game.cookiesPs;

    };



    // Show recommendation
    CH.modules.economy.getRecommendation = function () {


        let building =
            CH.modules.economy.getBestBuilding();


        let upgrade =
            CH.modules.economy.getBestUpgrade();



        return {

            building: building
                ? building.name
                : "None",

            upgrade: upgrade
                ? upgrade.name
                : "None"

        };

    };



    CH.utils.log(
        "Economy system loaded."
    );


})();
