//EXERCISE 6.1

const drawHistogram = (data) => {
    // 1. Set the dimensions and margins of the chart area 
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`); // Fixed template literal

    // 2. Create an inner chart group with margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`); // Fixed template literal

    // 3. Get the bins for our dataset using bin generator 
    const bins = binGenerator(data);
    console.log("Generated bins:", bins); 

    // 4. Calculate domain bounds from bins
    const minEng = bins[0].x0; // lower bound of the first bin
    const maxEng = bins[bins.length - 1].x1; // upper bound of the last bin
    const binsMaxLength = d3.max(bins, d => d.length); 

    console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

    // 5. Set domains and ranges for the x and y scales
    xScale 
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // 6. Draw the histogram bars
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("width", d => (xScale(d.x1) - xScale(d.x0)))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 2);

    // 7. Add X-axis
    const bottomAxis = d3.axisBottom(xScale);
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // 8. Add Y-axis
    const leftAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .call(leftAxis);
};

