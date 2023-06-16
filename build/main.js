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
    // $(window).on('scroll', function(event) {
    //     const wheelEvent = event.originalEvent as WheelEvent;
    //     const scrollMult = +$(".scrollable").attr("data-scrollMult");
    //     const yPos = +$(".scrollable").attr("data-yPos"); //        Get from attribute yPos
    //     const newYPos = desiredYPos(yPos, -wheelEvent.deltaY * scrollMult); //       Calculate new yPos
    //     $(".scrollable").attr("data-yPos", newYPos); //             Set to attribute yPos
    //     $(".scrollable")?.css("transform", `translateY(${newYPos}px)`);
    // });
    // function desiredYPos(yPos, deltaY) {
    //     const maxY = window.innerHeight;
    //     const minY = -1500;
    //     yPos += deltaY;
    //     if(yPos > maxY) yPos = maxY;
    //     else if(yPos < minY) yPos = minY;
    //     return yPos;
    // }
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
            const coins = yield requestData("https://api.coingecko.com/api/v3/coins/list");
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
    // async function getJSON(url: string) {
    //     try {
    //         const response = await fetch(url+"s");
    //         const json = await response.json();
    //         if(json.error) throw new Error(json.error)
    //         saveObject(url, json);
    //         return json;
    //     }
    //     catch (err) {
    //         console.error("Couldn't load data from API\n " + err);
    //         console.log("Showing stored data due to error\n " + err);   
    //         const storedJson = loadObject(url);
    //         console.log("Date of stored data: " + storedJson.date);
    //         return storedJson.content;
    //     }
    // }
    // function getLocalStorageItemSize(key) {
    //     const value = localStorage.getItem(key);
    //     if (value !== null) {
    //       const sizeInBytes = new Blob([value]).size;
    //       return sizeInBytes;
    //     }
    //     return 0;
    //   }
});
