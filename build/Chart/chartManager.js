// Manages the chart's data and functionality
/// <reference types="canvasjs" />
export class ChartManager {
    constructor() {
        this.selectedIDs = [];
        this.chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2",
            animationEnabled: true,
            title: {
                text: "Crypto Currency Trends"
            },
            axisY: {
                title: "Price (USD)",
                prefix: "$"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            //data: // DATA HERE
        });
    }
    addID(id) {
        this.selectedIDs.push(id);
        // Keep a maximum length of 5
        if (this.selectedIDs.length >= 5)
            this.selectedIDs.splice(0, this.selectedIDs.length - 5);
    }
    createData(ids) {
        for (const id in ids) {
            console.log("ID: " + ids[id]);
        }
    }
    toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
}
