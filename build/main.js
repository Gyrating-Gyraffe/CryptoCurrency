/// <reference path="../jQuery/jquery-3.7.0.js"/>
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
$(() => {
    $("a.nav-link").click(function () {
        $("a.nav-link").removeClass("active");
        $(this).addClass("active");
        $("section").css("display", "none");
        const sectionId = $(this).attr("data-section");
        $("#" + sectionId).css("display", "block");
    });
    $("#homeLink").click(() => __awaiter(void 0, void 0, void 0, function* () { return yield handleHome(); }));
    function handleHome() {
        return __awaiter(this, void 0, void 0, function* () {
            const coins = yield getJSON("https://api.coingecko.com/api/v3/coins/list");
            displayCoins(coins);
        });
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
    function getJSON(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url);
            const json = yield response.json();
            return json;
        });
    }
});
