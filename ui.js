// Cookie Helper+
// ui.js
// User interface system

(function () {
    "use strict";


    const CH = window.CookieHelper;


    if (!CH) {
        console.error("Cookie Helper core missing!");
        return;
    }


    CH.modules.ui = {};


    CH.modules.ui.create = function () {

        if (document.getElementById("cookieHelperPanel")) {
            return;
        }


        let panel = document.createElement("div");

        panel.id = "cookieHelperPanel";


        panel.style.position = "fixed";
        panel.style.top = "100px";
        panel.style.right = "20px";
        panel.style.width = "280px";
        panel.style.background = "#222";
        panel.style.color = "white";
        panel.style.padding = "15px";
        panel.style.borderRadius = "10px";
        panel.style.zIndex = "999999";
        panel.style.fontFamily = "Arial";


        panel.innerHTML = `

        <h2>🍪 Cookie Helper+</h2>

        <hr>


        <label>
        <input id="chAutoClick" type="checkbox">
        Auto Click
        </label>
        <br>


        <label>
        <input id="chGolden" type="checkbox">
        Auto Golden Cookies
        </label>
        <br>


        <label>
        <input id="chReindeer" type="checkbox">
        Auto Reindeer
        </label>
        <br>


        <label>
        <input id="chUpgrade" type="checkbox">
        Auto Upgrades
        </label>
        <br>


        <label>
        <input id="chBuild" type="checkbox">
        Auto Buildings
        </label>


        <hr>


        <div id="chStats">
        Loading stats...
        </div>


        <button id="chSave">
        Save Settings
        </button>

        `;


        document.body.appendChild(panel);



        // Load saved settings into buttons

        document.getElementById("chAutoClick").checked =
            CH.settings.autoClick;

        document.getElementById("chGolden").checked =
            CH.settings.autoGolden;

        document.getElementById("chReindeer").checked =
            CH.settings.autoReindeer;

        document.getElementById("chUpgrade").checked =
            CH.settings.autoUpgrade;

        document.getElementById("chBuild").checked =
            CH.settings.autoBuild;



        // Update settings

        document.getElementById("chAutoClick")
        .onchange = e => {
            CH.settings.autoClick =
                e.target.checked;
        };


        document.getElementById("chGolden")
        .onchange = e => {
            CH.settings.autoGolden =
                e.target.checked;
        };


        document.getElementById("chReindeer")
        .onchange = e => {
            CH.settings.autoReindeer =
                e.target.checked;
        };


        document.getElementById("chUpgrade")
        .onchange = e => {
            CH.settings.autoUpgrade =
                e.target.checked;
        };


        document.getElementById("chBuild")
        .onchange = e => {
            CH.settings.autoBuild =
                e.target.checked;
        };



        document.getElementById("chSave")
        .onclick = () => {

            CH.saveSettings();

            CH.notify(
                "Settings saved!"
            );

        };


        // Stats updater

        setInterval(() => {

            if (CH.modules.stats) {

                let stats =
                    CH.modules.stats.getAll();


                document.getElementById(
                    "chStats"
                ).innerHTML = `

                🍪 Cookies:
                ${CH.utils.formatNumber(stats.cookies)}
                <br>

                ⚡ CPS:
                ${CH.utils.formatNumber(stats.cps)}
                <br>

                🖱 Click:
                ${CH.utils.formatNumber(stats.clickPower)}

                `;

            }

        }, 1000);

    };



    CH.modules.ui.create();


    CH.utils.log(
        "UI system loaded."
    );


})();
