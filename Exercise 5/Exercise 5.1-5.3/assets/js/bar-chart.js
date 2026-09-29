// ==========================================
// Exercise 5.1: Vertical Bar Chart
// Encapsulated in an IIFE to prevent variable collisions with main.js
// ==========================================

(() => {
    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const innerWidth = 600 - margin.left - margin.right;
    const innerHeight = 400 - margin.top - margin.bottom;

    // Select container and append SVG
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 600 400`) 
        .style("border", "1px solid black");

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // ==========================================
    // Exercise 5.1: Draw Vertical Bar Chart
    // ==========================================

    const drawBarChart = data => {
        
        // Scales
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.screenType))
            .range([0, innerWidth])
            .paddingInner(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.energy)])
            .range([innerHeight, 0]);

        // Axes
        const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale);

        // Draw X-Axis
        innerChart.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "14px");

        // Draw Y-Axis
        innerChart.append("g")
            .call(yAxis)
            .selectAll("text")
            .style("font-size", "12px");

        // Y-Axis Label
        innerChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -45)
            .attr("text-anchor", "middle")
            .text("Average Energy Consumption (kWh/yr)")
            .style("font-size", "13px");

        // Bars
        innerChart.selectAll("rect.bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.screenType))
            .attr("y", d => yScale(d.energy))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.energy))
            .attr("fill", "green");

        // Data Labels on top of bars
        innerChart.selectAll(".label")
            .data(data)
            .join("text")
            .attr("class", "label")
            .attr("x", d => xScale(d.screenType) + (xScale.bandwidth() / 2))
            .attr("y", d => yScale(d.energy) - 5)
            .attr("text-anchor", "middle")
            .text(d => Math.round(d.energy)) 
            .style("font-size", "13px");
    };


    // ==========================================
    // Data Loading
    // ==========================================

    d3.csv("assets/data/Data_exercise 5.1-1.csv", d => {
        const keys = Object.keys(d);
        return {
            screenType: String(d[keys[0]]).trim().toUpperCase(),
            energy: +d[keys[1]] || 0 
        };
    }).then(data => {
        data.sort((a, b) => b.energy - a.energy);
        console.log("Bar Chart Data Loaded:", data);
        drawBarChart(data);
    }).catch(error => {
        console.error("Error loading CSV in bar-chart.js:", error);
    });
})();