var small_chart_height = "20vw";
var all_charts_width = "41vw"; // small_chart_height*2 + 1vw_margin
var n_plots = d3.select(".n_plots");

n_plots.append("svg")
	.attr("width", all_charts_width)
	.attr("height", small_chart_height)
	.attr("class", "xn_plot")

n_plots.append("svg")
	.attr("width", all_charts_width)
	.attr("height", small_chart_height)
	.attr("class", "yn_plot")

var xy_plot = d3.select(".charts")
	.append("svg")
	.attr("width", all_charts_width)
	.attr("height", all_charts_width)
	.attr("class", "xy_plot")