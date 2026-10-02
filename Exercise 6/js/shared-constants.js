//EXERCISE 6.1
//set up dimenstions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800; // total width of the chart
const height = 400; // total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

//set up colors globally
const barColor = "#606464"
const bodyBackgroundColor = "#fffaf0"

//Exercise 6.3
let innerChartS;

//set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

//create a bin generator using d3.bin
const binGenerator = d3.bin()
.value(d => d.energyConsumption)//Accessor for energyConsumption

//EXERCISE 6.2
//Array of filter options for screen types
const filters_screen = [
    { id: "all", label: "All" , isActive: true},
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

//Exercise 6.3
const colorScale = d3.scaleOrdinal()
    .range(d3.schemeCategory10); // Use a predifined color scheme

//Exercise 6.4
const tooltipWidth = 90;
const tooltipHeight = 35;
