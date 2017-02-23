var n = 100;
var small_chart_height = 250;
var margin = 10;
var all_charts_width = small_chart_height*2 + margin;
// var all_charts_width = "41vw"; // small_chart_height*2 + 1vw_margin
// var n_plots = d3.select(".n_plots");
var radius = 5.5;
xn_plot = d3.select(".n_plots").append("svg")
	.attr("width", all_charts_width)
	.attr("height", small_chart_height)
	.attr("class", "xn_plot")

yn_plot = d3.select(".n_plots").append("svg")
	.attr("width", all_charts_width)
	.attr("height", small_chart_height)
	.attr("class", "yn_plot")

var xy_plot = d3.select(".charts").append("svg")
	.attr("width", all_charts_width)
	.attr("height", all_charts_width)
	.attr("class", "xy_plot")

//------------------------------------------------
// xn plot
var xn_plot_xScale = d3.scaleLinear()
	.domain([0, n]) // the range of the values to plot
	.range([ 2*margin, all_charts_width ]); // the pixel range of the x-axis
	// .domain([0, d3.max(xdata)]) // the range of the values to plot
	// .range([ 0, width ]); // the pixel range of the x-axis
var xn_plot_yScale = d3.scaleLinear()
	.domain([-radius, radius])
	.range([ small_chart_height - 20, 0 ]);

// draw the x axis
var xn_xAxis = d3.axisBottom(xn_plot_xScale)
xn_plot.append("g")
	// .attr("transform", "translate(0," + all_charts_width - 20 + ")")
	.attr("transform", "translate(0, 490)")
	.attr("transform", "translate(0," + (small_chart_height - 2*margin) + ")")
	.call(xn_xAxis);
// draw the y axis
var xn_yAxis = d3.axisLeft(xn_plot_yScale)
xn_plot.append("g")
	// .attr("transform", "translate(20,0)")
	.attr("transform", "translate(" + (2*margin) + ",0)")
	.call(xn_yAxis);

//------------------------------------------------
// yn plot
var yn_plot_xScale = d3.scaleLinear()
	.domain([0, n]) // the range of the values to plot
	.range([ 2*margin, all_charts_width ]); // the pixel range of the x-axis
	// .domain([0, d3.max(xdata)]) // the range of the values to plot
	// .range([ 0, width ]); // the pixel range of the x-axis
var yn_plot_yScale = d3.scaleLinear()
	.domain([-radius, radius])
	.range([ small_chart_height - 20, 0 ]);

// draw the x axis
var yn_xAxis = d3.axisBottom(yn_plot_xScale)
yn_plot.append("g")
	// .attr("transform", "translate(0," + all_charts_width - 20 + ")")
	// .attr("transform", "translate(0, 490)")
	.attr("transform", "translate(0," + (small_chart_height - 2*margin) + ")")
	.call(yn_xAxis);
// draw the y axis
var yn_yAxis = d3.axisLeft(yn_plot_yScale)
yn_plot.append("g")
	// .attr("transform", "translate(20,0)")
	.attr("transform", "translate(" + (2*margin) + ",0)")
	.call(yn_yAxis);


//------------------------------------------------
// xy_plot
var xy_plot_xScale = d3.scaleLinear()
	.domain([-radius, radius]) // the range of the values to plot
	.range([ 2*margin, all_charts_width ]); // the pixel range of the x-axis
	// .domain([0, d3.max(xdata)]) // the range of the values to plot
	// .range([ 0, width ]); // the pixel range of the x-axis
var xy_plot_yScale = d3.scaleLinear()
	.domain([-radius, radius])
	.range([ all_charts_width - 20, 0 ]);

// draw the x axis
var xy_xAxis = d3.axisBottom(xy_plot_xScale)
xy_plot.append("g")
	// .attr("transform", "translate(0," + all_charts_width - 20 + ")")
	.attr("transform", "translate(0, 490)")
	.attr("transform", "translate(0," + (all_charts_width - 2*margin) + ")")
	.call(xy_xAxis);
// draw the y axis
var xy_yAxis = d3.axisLeft(xy_plot_yScale)
xy_plot.append("g")
	.attr("transform", "translate(" + (2*margin) + ",0)")
	.call(xy_yAxis);