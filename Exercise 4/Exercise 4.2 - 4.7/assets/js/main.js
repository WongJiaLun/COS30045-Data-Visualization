//Exercise 4.2: removed code

//d3.select("h1")
  //.style("color", "green");

//d3.select("div")
  //.append("p")
    //.text("Purchasing a low energy consumption TV will help with your energy bills!");

//d3.select("svg")
  //.append("rect");

  //d3.select("svg")
  //.append("rect")
   //.attr("x", 50)
   //.attr("y", 50)
   //.attr("width", 100)
   //.attr("height", 30)
   //.style("fill", "green");

// Exercise 4.3: D3 Set Up

// Create the responsive SVG object within the container
    const svg = d3.select(".responsive-svg-container") 
    .append("svg")
      .attr("viewBox", "0 0 500 1600")
      .style("border", "1px solid black");;

// Add a test SVG rectangle to the canvas(4.3)
//svg.append("rect")
    //.attr("x", 10)
    //.attr("y", 10)
    //.attr("width", 414)
    //.attr("height", 16)
    //.attr("fill", "blue");

// Exercise 4.4: Load Data from CSV


d3.csv("assets/data/BrandCount.csv", d => {
    // Robust header cleanup: handles extra spaces or case differences (Brand vs brand)
    const cleanRow = {};
    for (let key in d) {
        cleanRow[key.trim().toLowerCase()] = d[key] ? d[key].trim() : "";
    }

    return {
        brand: cleanRow.brand || cleanRow[Object.keys(cleanRow)[0]],
        count: +(cleanRow.count || cleanRow[Object.keys(cleanRow)[1]]) || 0 // Converts string to number safely
    };
}).then(data => {
    // Sort highest to lowest
    data.sort((a, b) => b.count - a.count);

    // Logging data stats
    console.log("Full data array:", data);
    console.log("Total number of brands (length):", data.length);
    console.log("Max count:", d3.max(data, d => d.count));
    console.log("Min count:", d3.min(data, d => d.count));
    console.log("Min & Max array (extent):", d3.extent(data, d => d.count));

    // Call the draw function with clean data
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});


// Exercise 4.5 + 4.6 +4.7: D3 Binding and Drawing Function + x and y Scales

const drawBarChart = data => {
    const barHeight = 20;
    const barSpacing = 5;
    const dynamicHeight = data.length * 25;
    svg.attr("viewBox", `0 0 550 ${dynamicHeight}`);
    const xScale = d3.scaleLinear()
  .domain([0, 1200])
  .range([0, 400]);
  const yScale = d3.scaleBand()
 .domain(data.map(d => d.brand))
 .range([0, dynamicHeight])
 .paddingInner(0.2);
// Step 2: Create a group container for our bars and labels
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        // This moves the entire group (bar + both labels) to the correct Y position
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);
        // Step 3: Add the rectangles to the group
    barAndLabel
        .append("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth()) 
        .attr("fill", "blue")
        // Step 1: Push bars over 100px to make room for the left labels
        .attr("x", 100) 
        // Y is now 0 because the group's "translate" is handling the vertical placement
        .attr("y", 0);
    // Step 4: Add the column category text (Brand names)
    barAndLabel
        .append("text")
        .text(d => d.brand)
        // Align text at 90px (leaves a 10px gap before the bar starts at 100px)
        .attr("x", 90) 
        .attr("y", 15) // Adjust this number if the text isn't vertically centered on your bar
        .attr("text-anchor", "end") // Right-aligns the text perfectly
        .style("font-size", "13px");
    // Step 5: Add the value number (Counts)
    barAndLabel
        .append("text")
        .text(d => d.count)
        // Position: 100px (bar start) + width of the bar + 5px gap
        .attr("x", d => 100 + xScale(d.count) + 5) 
        .attr("y", 15)
        .style("font-size", "13px");
};



