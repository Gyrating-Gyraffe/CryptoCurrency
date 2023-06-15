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
    $(window).on('wheel', function (event) {
        var _a;
        const wheelEvent = event.originalEvent;
        const scrollMult = +$(".scrollable").attr("data-scrollMult");
        const yPos = +$(".scrollable").attr("data-yPos"); //        Get from attribute yPos
        const newYPos = desiredYPos(yPos, -wheelEvent.deltaY * scrollMult); //       Calculate new yPos
        $(".scrollable").attr("data-yPos", newYPos); //             Set to attribute yPos
        (_a = $(".scrollable")) === null || _a === void 0 ? void 0 : _a.css("transform", `translateY(${newYPos}px)`);
    });
    function desiredYPos(yPos, deltaY) {
        const maxY = window.innerHeight;
        const minY = 0;
        yPos += deltaY;
        if (yPos > maxY)
            yPos = maxY;
        else if (yPos < minY)
            yPos = minY;
        return yPos;
    }
    //setupParallaxScroll($("#coinsContainer")[0]);
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
    function setupParallaxScroll(element) {
        // Push element out of view
        element.style.position = "absolute";
        let yPos = 0;
        // Subscribe to scrolling action
        addEventListener("wheel", (event) => {
            yPos -= event.deltaY;
            element.style.transform = `translateY(0, ${yPos}px)`;
            console.log("Scrolling " + element.id + " " + yPos);
            console.log(element.getBoundingClientRect().top);
        });
    }
});
