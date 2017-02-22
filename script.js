
var n_plots = d3.select(".n_plots")

n_plots.append("svg")
	.attr("width", "31vw")
	.attr("height", "15vw")
	.attr("class", "xn_plot")

n_plots.append("svg")
	.attr("width", "31vw")
	.attr("height", "15vw")
	.attr("class", "yn_plot")

var xy_plot = d3.select(".charts")
	.append("svg")
	.attr("width", "31vw")
	.attr("height", "31vw")
	.attr("class", "xy_plot")