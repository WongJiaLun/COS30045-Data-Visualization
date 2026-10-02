// ==========================================
// Exercise 5.2: Scatter Plot and Line Chart
// ==========================================

const drawLineChart = data => {
    // 1. Set up margins (matching Ex 5.1)
    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 2. Create the svg containers
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // Fixed variable interpolation
        .style("border", "1px solid black");

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        
        // 3. Create the Scales
        // Use d3.extent to find min and max years automatically
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.year))
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.averagePrice)])
            .range([innerHeight, 0]);

        // 4. Setup the Axes (forcing year to be an integer format)
        const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));
        const yAxis = d3.axisLeft(yScale);

        // Add X-Axis to innerChart
        innerChart.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "12px");

        // Add Y-Axis to innerChart
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
            .text("Average Price ($/MWh)")
            .style("font-size", "13px");

        // X-Axis Label (Bonus from "Things to do")
        innerChart.append("text")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + 40)
            .attr("text-anchor", "middle")
            .text("Year")
            .style("font-size", "13px");

        // 5. Draw a Scatter Plot (Circles)
        innerChart.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("r", 4)
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.averagePrice))
            .attr("fill", "steelblue");

        // 6. Draw a Line
        const lineGenerator = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.averagePrice))
            .curve(d3.curveMonotoneX); // Bonus: smooths the line slightly

        innerChart
            .append("path")
            .attr("d", lineGenerator(data))
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 2);
    };


    // Data Loading


    d3.csv("assets/data/ARE_Spot_Prices.csv").then(rawData => {
        
        // Parse strings to continuous numbers using the EXACT CSV headers
        const cleanData = rawData.map(d => {
            return {
                year: parseInt(d["Year"]), 
                averagePrice: parseFloat(d["Average Price (notTas-Snowy)"]) 
            };
        }).filter(d => !isNaN(d.year) && !isNaN(d.averagePrice));

        console.log("Line Chart Data Loaded:", cleanData);
        
        if (cleanData.length === 0) {
            console.error("Data array is empty! Check if the CSV headers exactly match the code.");
        } else {
            drawLineChart(cleanData);
        }
    }).catch(error => {
        console.error("Error loading ARE_Spot_Prices.csv:", error);
    });