// Class represents "data" object for charts
export class ChartData {
    constructor(type, visible, showInLegend, yValueFormatString, // "##.00mn"
    name, dataPoints) {
        this.type = type;
        this.visible = visible;
        this.showInLegend = showInLegend;
        this.yValueFormatString = yValueFormatString;
        this.name = name;
        this.dataPoints = dataPoints;
    }
}
