// Cookie Helper+
// loader.js
// Main loader for the Cookie Clicker helper mod

(function () {
    "use strict";

    // Prevent duplicate loading
    if (window.CookieHelperLoaded) {
        console.log("Cookie Helper+ is already loaded.");
        return;
    }

    window.CookieHelperLoaded = true;

    console.log("Loading Cookie Helper+...");


    // Main mod object
    window.CookieHelper = {

        version: "1.0.0",

        settings: {
            autoClick: false,
            autoGolden: false,
            autoUpgrade: false,
            autoBuild: false,
            autoReindeer: false,

            clickSpeed: 50,

            theme: "dark"
        },


        modules: {},


        saveSettings() {
            localStorage.setItem(
                "CookieHelperSettings",
                JSON.stringify(this.settings)
            );
        },


        loadSettings() {

            let saved = localStorage.getItem(
                "CookieHelperSettings"
            );

            if (saved) {

                try {

                    this.settings = {
                        ...this.settings,
                        ...JSON.parse(saved)
                    };

                } catch (error) {

                    console.warn(
                        "Could not load Cookie Helper settings."
                    );

                }
            }
        }
    };


    // Load JavaScript files
    function loadScript(file) {

        return new Promise((resolve, reject) => {

            let script = document.createElement("script");

            script.src = "CookieHelper/" + file;

            script.onload = resolve;

            script.onerror = reject;

            document.head.appendChild(script);

        });
    }


    // Load CSS file
    function loadCSS(file) {

        let style = document.createElement("link");

        style.rel = "stylesheet";

        style.href = "CookieHelper/" + file;

        document.head.appendChild(style);

    }


    async function start() {

        CookieHelper.loadSettings();


        loadCSS("themes.css");


        let files = [

            "helper.js",
            "automation.js",
            "economy.js",
            "stats.js",
            "ui.js"

        ];


        for (let file of files) {

            try {

                await loadScript(file);

                console.log(
                    "Loaded:",
                    file
                );

            } catch (error) {

                console.error(
                    "Failed loading:",
                    file,
                    error
                );

            }
        }


        console.log(
            "Cookie Helper+ loaded successfully!"
        );


        if (CookieHelper.init) {

            CookieHelper.init();

        }

    }



    // Wait until Cookie Clicker loads
    let waitForGame = setInterval(() => {

        if (typeof Game !== "undefined") {

            clearInterval(waitForGame);

            start();

        }

    }, 500);


})();
