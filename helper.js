// Cookie Helper+
// helper.js
// Core functions and utilities

(function () {
    "use strict";


    if (!window.CookieHelper) {
        console.error(
            "Cookie Helper loader was not found!"
        );
        return;
    }


    const CH = window.CookieHelper;


    CH.running = true;


    // Utility functions
    CH.utils = {


        // Create a message in the Cookie Clicker console
        log(message) {

            console.log(
                "[Cookie Helper+]",
                message
            );

        },


        // Check if a feature is enabled
        enabled(feature) {

            return CH.settings[feature] === true;

        },


        // Format large cookie numbers
        formatNumber(number) {

            if (number >= 1e12) {

                return (
                    (number / 1e12)
                    .toFixed(2)
                    + " trillion"
                );

            }

            if (number >= 1e9) {

                return (
                    (number / 1e9)
                    .toFixed(2)
                    + " billion"
                );

            }

            if (number >= 1e6) {

                return (
                    (number / 1e6)
                    .toFixed(2)
                    + " million"
                );

            }


            return Math.floor(number);

        },


        // Wait function
        sleep(ms) {

            return new Promise(
                resolve => setTimeout(resolve, ms)
            );

        }

    };



    // Mod startup
    CH.init = function () {

        CH.utils.log(
            "Initializing Cookie Helper+"
        );


        if (CH.modules) {

            CH.modules.loaded = true;

        }


        CH.utils.log(
            "Cookie Helper+ is ready!"
        );

    };



    // Simple notification
    CH.notify = function (message) {


        let box = document.createElement(
            "div"
        );


        box.innerText = message;


        box.style.position = "fixed";
        box.style.bottom = "20px";
        box.style.right = "20px";
        box.style.background = "#222";
        box.style.color = "white";
        box.style.padding = "10px 15px";
        box.style.borderRadius = "8px";
        box.style.zIndex = "999999";


        document.body.appendChild(box);


        setTimeout(() => {

            box.remove();

        }, 3000);

    };



    CH.utils.log(
        "helper.js loaded"
    );


})();
