
// Exercise 5.1: Vertical Bar Chart
const drawBarChart = data => {

    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Select container and append SVG
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // Fixed variable interpolation
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Exercise 5.1: Draw Vertical Bar Chart


    // Scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech)) // Matches Screen_Tech
        .range([0, innerWidth])
        .paddingInner(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_Consumption)]) // Matches Energy_Consumption
        .range([innerHeight, 0]);

    // Axes
    const bottomAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const leftAxis = d3.axisLeft(yScale);

    // Draw X-Axis
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Draw Y-Axis
    innerChart
        .append("g")
        .call(leftAxis);
    
    // Y-Axis Label
    innerChart
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh)");

    // Bars
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
        .attr("fill", "green");

    // Data Labels on top of bars
    innerChart.selectAll(".label")
        .data(data)
        .join("text")
        .attr("class", "label")
        .attr("x", d => xScale(d.Screen_Tech) + (xScale.bandwidth() / 2))
        .attr("y", d => yScale(d.Energy_Consumption) - 5)
        .attr("text-anchor", "middle")
        .text(d => Math.round(d.Energy_Consumption)) 
        .style("font-size", "13px");
};



// Data Loading


d3.csv("assets/data/Data_exercise 5.1-1.csv", d => {
    const keys = Object.keys(d);
    return {
        Screen_Tech: String(d[keys[0]]).trim().toUpperCase(),
        Energy_Consumption: +d[keys[1]] || 0 
    };
}).then(data => {
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
    console.log("Bar Chart Data Loaded:", data);
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV in bar-chart.js:", error);
});