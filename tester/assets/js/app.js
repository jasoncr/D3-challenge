var svgWidth = 960;
var svgHeight = 500;
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Import Data
d3.csv("assets/data/data.csv").then(function(povData) {
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    povData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.abbr = data.abbr;
    });
    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([7, d3.max(povData, d => d.poverty)])
      .range([0, width]);
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(povData, d => d.healthcare)])
      .range([height, 0]);
    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
      svg.append("text")
      .attr("x", 400)             
      .attr("y", (margin.top / 2)+ 30)
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .style("text-decoration", "underline")  
      .text("Healthcare vs. Poverty");
    svg.append("text")      // text label for the x axis
      .attr("x", 400 )
      .attr("y",  490)
      .style("text-anchor", "bottom")
      .text("Poverty");
    svg.append("text")
      .attr("transform", "rotate(-90 " + margin.left/2 + " " + height/2 + ")")
      .attr("y", 200)
      .attr("x",10)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Healthcare");
    chartGroup.append("g")
      .call(leftAxis);
    //Step 5: Create Circles
    //==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(povData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "12")
    .attr("fill", "blue")
    .attr("opacity", ".3");


    //Step 5: Label Circles
    //==============================
    var node = svg.selectAll("circlesGroup")
    .data(povData)
    .enter()

    node.append("text")
      .attr("x", function(d) { return xLinearScale(d.poverty); })
      .attr("y", function(d) { return yLinearScale(d.healthcare); })
      .text(function(d) { return d.abbr})
      .attr("font-size", "12px")
      .attr("dx", "7.6em")
      .attr("dy", "2em")
      .style("fill", "white") //change to white after moving onto the circles
      .style("font-weight", "bold");

  }).catch(function(error) {
    console.log(error);
  });
