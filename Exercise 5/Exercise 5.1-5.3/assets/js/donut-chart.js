
// Exercise 5.3: Donut Chart


    const drawDonutChart = data => {
    // 1. Set up dimensions and margins
    const width = 1000;
    const height = 600;
    
    // Calculate radius to fit the shortest side of the SVG
    const radius = Math.min(width, height) / 2 - 20;
    
    const color =d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_category))
        .range(d3.schemeSet2); // Built-in D3 color palette
    // 2. Create the SVG containers
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    // For a pie chart, the origin (0,0) is the center of the circle.
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // 4. Calculate the Angles
        const pie = d3.pie()
            .value(d => d.Count)
            .sort(null); // Maintains the order from the CSV file

        // 5. Set up the Arcs
        const arcGenerator = d3.arc()
            .innerRadius(radius * 0.6) // 60% inner radius creates the donut hole
            .outerRadius(radius * 1)

        // 6. Draw the Arcs
        innerChart
            .selectAll("path")
            .data(pie(data))
            .join("path")
            .attr("d", arcGenerator)
            .attr("fill", d => color(d.data.Screensize_category))
            .attr("stroke", "white")
            .attr("stroke-width", 2);

        // 7. Add Labels using the arc centroid (center of each slice)
        innerChart.selectAll("text")
            .data(pie(data))
            .join("text")
            .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => d.data.Screensize_category)
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .style("fill", "#333");
    };

    // Data Loading
 

    d3.csv("assets/data/Data_exercise 5.3.csv").then(rawData => {
        console.log("Raw Donut CSV (Row 1):", rawData[0]);

        // Dynamically grab the first column as the text category and second as the number
        const cleanData = rawData.map(d => {
            const keys = Object.keys(d);
            return {
                Screensize_category: String(d[keys[0]]).trim(),
                Count: parseFloat(d[keys[1]]) || 0
            };
        }).filter(d => d.Screensize_category && !isNaN(d.Count));

        console.log("Donut Chart Data Loaded:", cleanData);
        
        if (cleanData.length > 0) {
            drawDonutChart(cleanData);
        } else {
            console.error("Donut data is empty. Check CSV file formatting.");
        }
    }).catch(error => {
        console.error("Error loading Data_exercise 5.3.csv:", error);
    });