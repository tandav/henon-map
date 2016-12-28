var n = 1000;
var r = 5.5;
var margin = {top: 20, right: 15, bottom: 60, left: 60}
var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var chart = d3.select('body')
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')   
	
// x and y scales, I've used linear here but there are other options
// the scales translate data values to pixel values for you
// scales are constand (TODO zoom-sliders)
var x = d3.scaleLinear()
	.domain([-r, r]) // the range of the values to plot
	.range([ 0, width ]); // the pixel range of the x-axis
	// .domain([0, d3.max(xdata)]) // the range of the values to plot
	// .range([ 0, width ]); // the pixel range of the x-axis
var y = d3.scaleLinear()
	.domain([-r, r])
	.range([ height, 0 ]);

// draw the x axis
var xAxis = d3.axisBottom(x)
main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);
// draw the y axis
var yAxis = d3.axisLeft(y)
	main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

// draw the graph object
var g = main.append("svg:g"); 

function redraw() 
{
// 	g.selectAll("scatter-dots")
// 		// .exit().remove()
// 		.data(yy, function(d) { return d; });
	
	var xdata = [0.1];
	var ydata = [0.2];
	var a = document.getElementById("a_slider").value;
	var b = document.getElementById("b_slider").value;

	// Henon Map
	for (var i = 0; i < n; i++) 
	{
		var x_next = 1 - a * Math.pow(xdata[xdata.length - 1], 2) + ydata[ydata.length - 1];
		var y_next = b * xdata[xdata.length - 1];
		xdata.push(x_next);
		ydata.push(y_next);
	}

	g.selectAll("*").remove(); //without that line old data remains
	g.selectAll("scatter-dots")
		.data(ydata)  // using the values in the ydata array
		.enter().append("svg:circle")  // create a new circle for each value
		.attr("cy", function (d) { return y(d); } ) // translate y value to a pixel
		.attr("cx", function (d,i) { return x(xdata[i]); } ) // translate x value
		.attr("r", 1) // radius of circle
		.style("opacity", 1.0); // opacity of circle
}

// redraw(initial);

// function slider_mooved() 
// {

// }