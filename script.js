
// var n = 100;


// var data = [[5,3], [10,17], [15,4], [2,8]];
// data that you want to plot, I've used separate arrays for x and y values
var xdata = [5, 10, 15, 20],
    ydata = [3, 17, 4, 6];
   
var margin = {top: 20, right: 15, bottom: 60, left: 60}
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;



// x and y scales, I've used linear here but there are other options
// the scales translate data values to pixel values for you
var x = d3.scaleLinear()
    .domain([0, d3.max(xdata)]) // the range of the values to plot
    .range([ 0, width ]); // the pixel range of the x-axis
var y = d3.scaleLinear()
	.domain([0, d3.max(ydata)])
  	.range([ height, 0 ]);

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

g.selectAll("scatter-dots")
  	.data(ydata)  // using the values in the ydata array
  	.enter().append("svg:circle")  // create a new circle for each value
    .attr("cy", function (d) { return y(d); } ) // translate y value to a pixel
    .attr("cx", function (d,i) { return x(xdata[i]); } ) // translate x value
  	.attr("r", 10) // radius of circle
  	.style("opacity", 0.6); // opacity of circle

// function myFunction1() 
// {
// 	var x = [0.1];
// 	var y = [0.02];
// 	var a = document.getElementById("a_slider").value;
//     var b = document.getElementById("b_slider").value;
// 	for (var i = 0; i < n; i++) 
// 	{
// 	    var x_next = 1 - a * x[x.length - 1]**2 + y[y.length - 1];
//     	var y_next = b * x[x.length - 1];
//    		x.push(x_next);
//    		y.push(y_next);
// 	}

// 	xy_data = []
// 	for (var i = 0; i < n; i++) 
// 	{
// 		xy_data.push([x[i], y[i]]);
// 	}
// 	console.log(xy_data);

// }