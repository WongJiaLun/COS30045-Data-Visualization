// Exercise 6.3 - Scatterplot
const drawScatterplot = (data) => {
    
    // 1. Set the dimensions and create the responsive SVG container
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // 2. Create innerChartS FIRST before adding elements into it
    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 3. Set up domains and ranges for scatterplot scales (xScaleS & yScaleS)
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth])
        .nice();

    yScaleS
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    // 4. Set the colorScale domain explicitly for the screen types
    colorScale.domain(["LED", "LCD", "OLED"]);

    // 5. Draw the Data Points (Circles)
    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))             // X-axis: Star Rating
        .attr("cy", d => yScaleS(d.energyConsumption)) // Y-axis: Energy Consumption
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    // 6. Draw the X Axis
    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScaleS));

    // 7. Draw the Y Axis
    innerChartS.append("g")
        .call(d3.axisLeft(yScaleS));

    // 8. Add the Legend (top-right corner)
    const legend = svg
        .append("g")
        .attr("transform", `translate(${width - margin.right - 60}, ${margin.top})`);

    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        // Colored box
        legendRow.append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", colorScale(screenTech));

        // Label text
        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .style("font-size", "12px")
            .text(screenTech);
    });
};