// Data points type for labeling and charting Y axis on the chart
type DataPoints = {
    label: string;
    y: number;
}

// Class represents "data" object for charts
export class ChartData {
    constructor(
        public type: string,
        public visible: boolean,
        public showInLegend: boolean,
        public yValueFormatString: string, // "##.00mn"
        public name: string,
        public dataPoints: DataPoints[]
    ) {}
}