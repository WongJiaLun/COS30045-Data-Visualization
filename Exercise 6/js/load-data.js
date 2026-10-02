//EXERCISE 6.1
//load the csv file with a row conversion function
d3.csv("data/Ex6_TVdata_withStar.csv", d =>({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, //Convert screensize to a number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, //Convert energy consumption to a number
    star: +d.star //Convert to number
})).then(data =>{
    //log the processed data to the console
    console.log(data);

    //call functions after data is loaded
    drawHistogram(data);
    //EXERCISE 6.2
    populateFilters(data);
    //EXERCISE 6.3
    colorScale.domain(data.map(d => d.screenTech)); // Get unique screenTech values
    drawScatterplot(data);
    //Exercise 6.4
    createTooltip();
    handleMouseEvents();

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});

