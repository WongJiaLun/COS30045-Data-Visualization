//EXERCISE 6.2

const populateFilters = (data) => {
    
    // 1. Select the container and build the buttons
    const filterContainer = d3.select("#filters_screen");

    filterContainer
        .selectAll(".filter")
        .data(filters_screen) // Uses the filters_screen array from shared-constants.js
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);

            // 2. ONLY run this if the clicked filter is not already active
            if (!d.isActive) {
                
                // Update the isActive state in filters_screen
                filters_screen.forEach(filter => {
                    filter.isActive = (d.id === filter.id ? true : false);
                });
                
                // Update the CSS 'active' class on the buttons
                filterContainer.selectAll(".filter")
                    .classed("active", filter => filter.id === d.id ? true : false);

                // 3. Update the chart
                updateHistogram(d.id);
            }
        });

    // 4. Update the histogram based on the selected filter
    const updateHistogram = (filterId) => {
        let updatedData;

        // Make sure 'screenTech' matches your exact CSV column header name
        if (filterId === "All") {
            updatedData = data;
        } else {
            updatedData = data.filter(tv => tv.screenTech === filterId);
        }

        // Generate updated bins
        const updatedBins = binGenerator(updatedData);

        // Bind new data and animate the bars
        d3.select("#histogram").selectAll(".bar")
            .data(updatedBins)
            .join("rect")
            .transition()
            .duration(750)
            .ease(d3.easeCubicOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
    };
};
        //Exercise 6.4
        const createTooltip = (data) => {
            //tooltip code here
            const tooltip = innerChartS
                .append("g")
                .attr("class", "tooltip")
                .style("opacity", 0);

        tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("fill", barColor)
        .attr("rx", 3) 
        .attr("ry", 3)
        .attr("fill-opacity", 0.75);

    // 3. Append text element
    tooltip.append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2)
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("font-weight", 900);
        }

    const handleMouseEvents = () => {
    // Select all scatterplot data circles
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle:", d);
            d3.select(".tooltip text")
            .text(d.screenSize)//Update the text in the tooltip with the screenTech value
            // Get circle center coordinates
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

          d3.select(".tooltip")
            .transition()
            .duration(200)
            .style("opacity", 1)
            .attr("transform", `translate(${cx - 0.5*tooltipWidth}, ${cy - 1.5*tooltipHeight})`);
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle:", d);
            // Hide tooltip smoothly when leaving circle
            d3.select(".tooltip")
                .attr("transform", `translate(0, 500)`) // Move it off-screen
                .style("opacity", 0);
});

    };
