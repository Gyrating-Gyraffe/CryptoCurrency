"use strict";
import requestData from './cryptoDataModule.js';
import { ChartManager } from './Chart/chartManager.js';
//import { chart } from './chart.js';


$(() => {
    const chartManager = new ChartManager();
    // chart.render();
    let selectedIDs: string[] = [];

    $("#coinsContainer").on("click", ".coin-select", function () {
        const coinId = $(this).attr("id").substring(11);
        selectedIDs.push(coinId);
        chartManager.addID(coinId);
    });



    $("a.nav-link").click(function () {
        $("a.nav-link").removeClass("active");
        $(this).addClass("active");
        $("section").css("display", "none");
        const sectionId = $(this).attr("data-section");
        $("#" + sectionId).css("display", "block");
    });

    $("#homeLink").click(async () => await handleHome());

    $("#coinsContainer").on("click", ".more-info", async function () {
        const coinId = $(this).attr("id").substring(7);
        await handleMoreInfo(coinId);
    });

    async function handleMoreInfo(coinId: string) {
        const coin = await requestData("https://api.coingecko.com/api/v3/coins/" + coinId);
        const imageSource = coin.image.thumb;
        const usd = coin.market_data.current_price.usd;
        const eur = coin.market_data.current_price.eur;
        const ils = coin.market_data.current_price.ils;
        const moreInfo = `
            <img src="${imageSource}"> <br>
            USD: $${usd} <br>
            EUR: Є${eur} <br>
            ILS: ₪${ils}
        `;
        $(`#collapse_${coinId}`).children().html(moreInfo);
    }


    async function handleHome() {
        try {
            const coins = await requestData("https://api.coingecko.com/api/v3/coins/list");
            displayCoins(coins);
        }
        catch (err) {
            console.error("Unable to display coins: \n" + err);
        }
    }

    function displayCoins(coins: object) {
        let html = "";
        for (let i = 0; i < 100; i++) {
            html += `
                <div class="card" style="width: 18rem; height: 20rem; overflow: auto;">
                <div class="card-body">
                    <div class="form-check form-switch">
                        <input class="form-check-input coin-select" type="checkbox" role="switch" id="coinSelect_${coins[i].id}">
                    </div>
                    <h5 class="card-title">${coins[i].symbol}</h5>
                    <p class="card-text">${coins[i].name}</p>

                    <button id="button_${coins[i].id}" class="btn btn-primary more-info" data-bs-toggle="collapse" data-bs-target="#collapse_${coins[i].id}">
                        More Info
                    </button>
                    <div style="min-height: 120px;">
                        <div class="collapse collapse-horizontal" id="collapse_${coins[i].id}">
                            <div class="card card-body">
                                Testing
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            `;
        }
        $("#coinsContainer").html(html);
    }
});