/// <reference path="../jQuery/jquery-3.7.0.js"/>
"use strict";

$(() => {

    $("a.nav-link").click(function () {
        $("a.nav-link").removeClass("active");
        $(this).addClass("active");
        $("section").css("display", "none");
        const sectionId = $(this).attr("data-section");
        $("#" + sectionId).css("display", "block");
    });

    $("#homeLink").click(async () => await handleHome());


    async function handleHome() {
        const coins = await getJSON("https://api.coingecko.com/api/v3/coins/list");
        displayCoins(coins);
    }


    function displayCoins(coins) {
        let html = "";
        for (let i = 0; i < 100; i++) {
            html += `
                <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${coins[i].symbol}</h5>
                        <p class="card-text">${coins[i].name}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            `;
        }
        $("#coinsContainer").html(html);
    }

    async function getJSON(url) {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

});