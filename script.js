
var n_plots = d3.select(".n_plots")

n_plots.append("svg")
	.attr("width", "25vw")
	.attr("height", "12.5vw")
	.attr("class", "xn_plot")

n_plots.append("svg")
	.attr("width", "25vw")
	.attr("height", "12.5vw")
	.attr("class", "yn_plot")

var xy_plot = d3.select(".charts")
	.append("svg")
	.attr("width", "25vw")
	.attr("height", "25vw")
	.attr("class", "xy_plot")