
"use strict";

$(() => {

    $(window).on('wheel', function(event) {
        const wheelEvent = event.originalEvent as WheelEvent;
        const scrollMult = +$(".scrollable").attr("data-scrollMult");
        const yPos = +$(".scrollable").attr("data-yPos"); //        Get from attribute yPos
        const newYPos = desiredYPos(yPos, -wheelEvent.deltaY * scrollMult); //       Calculate new yPos
        $(".scrollable").attr("data-yPos", newYPos); //             Set to attribute yPos
        $(".scrollable")?.css("transform", `translateY(${newYPos}px)`);
    });

    function desiredYPos(yPos, deltaY) {
        const maxY = window.innerHeight;
        const minY = 0;

        yPos += deltaY;
        if(yPos > maxY) yPos = maxY;
        else if(yPos < minY) yPos = minY;
        
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

    $("#homeLink").click(async () => await handleHome());


    async function handleHome() {
        const coins = await getJSON("https://api.coingecko.com/api/v3/coins/list");
        displayCoins(coins);
    }


    function displayCoins(coins : object) {
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

    async function getJSON(url : string) {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }




    function setupParallaxScroll(element : HTMLElement) {
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