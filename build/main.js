"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import requestData from './cryptoDataModule.js';
$(() => {
    $("a.nav-link").click(function () {
        $("a.nav-link").removeClass("active");
        $(this).addClass("active");
        $("section").css("display", "none");
        const sectionId = $(this).attr("data-section");
        $("#" + sectionId).css("display", "block");
    });
    $("#homeLink").click(() => __awaiter(void 0, void 0, void 0, function* () { return yield handleHome(); }));
    $("#coinsContainer").on("click", ".more-info", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const coinId = $(this).attr("id").substring(7);
            yield handleMoreInfo(coinId);
        });
    });
    function handleMoreInfo(coinId) {
        return __awaiter(this, void 0, void 0, function* () {
            const coin = yield requestData("https://api.coingecko.com/api/v3/coins/" + coinId);
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
        });
    }
    function handleHome() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coins = yield requestData("https://api.coingecko.com/api/v3/coins/list");
                displayCoins(coins);
            }
            catch (err) {
                console.error("Unable to display coins: \n" + err);
            }
        });
    }
    function displayCoins(coins) {
        let html = "";
        for (let i = 0; i < 100; i++) {
            html += `
                <div class="card" style="width: 18rem; height: 20rem; overflow: auto;">
                <div class="card-body">
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
