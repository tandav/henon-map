var width = 600;
var height = 300;
 
var holder = d3.select("body")
    .append("svg")
    .attr("width", width)    
    .attr("height", height); 

// draw the circle
holder.append("circle")
    .attr("cx", 300)
    .attr("cy", 150) 
    // .style("fill", "none")   
    .style("stroke", "blue") 
    .attr("r", 120);

// when the input range changes update the circle 
d3.select("#nRadius").on("input", function() {
    update(+this.value);
});

// Initial starting radius of the circle 
update(120);

// update the elements
function update(nRadius) {
    // adjust the text on the range slider
    d3.select("#nRadius-value").text(nRadius);
    d3.select("#nRadius").property("value", nRadius);

    // update the rircle radius
    holder.selectAll("circle") 
        .attr("r", nRadius);
}


// --- --- --- --- --- --- --- --- --- 
var data = [[5,3], [10,17], [15,4], [2,8]];

var margin = {top: 20, right: 15, bottom: 60, left: 60};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// var x = d3.scale.linear()
//     .domain([0, d3.max(data, function(d) { return d[0]; })])
//     .range([ 0, width ]);

// var y = d3.scale.linear()
//     .domain([0, d3.max(data, function(d) { return d[1]; })])
//     .range([ height, 0 ]);