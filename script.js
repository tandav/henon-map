const n = 500;
const small_chart_height = 250;
const margin = 10;
const all_charts_width = small_chart_height*2 + margin;
const radius = 4; // x and y axes scope
// let a_min = -1.5;
// let a_max = 1.2;
// let b_min = -0.5;
// let b_max = 1.2;

const a_min = -0.43;
const a_max = 0.5;
const b_min = -0.5;
const b_max = 2.1;

// let x_init = 0.1;
// let y_init = 0.2;
const x_init = 0.1;
const y_init = 0.8;

document.querySelector("#a_slider").min = a_min;
document.querySelector("#a_slider").max = a_max;
document.querySelector("#b_slider").min = b_min;
document.querySelector("#b_slider").max = b_max;

document.querySelector("#a_slider").value = (a_min + a_max) / 2;
document.querySelector("#b_slider").value = (b_min + b_max) / 2;

//TODO : rewrite this
let inputs = document.querySelectorAll("input");
[].forEach.call(inputs, function(inp) {
  inp.step = 0.000001;
});

let arr = {	
	max: function(array) {
		return Math.max.apply(null, array);
	},
	
	min: function(array) {
		return Math.min.apply(null, array);
	},
	
	range: function(array) {
		return arr.max(array) - arr.min(array);
	},
	
	midrange: function(array) {
		return arr.range(array) / 2;
	},

	sum: function(array) {
		let num = 0;
		for (let i = 0, l = array.length; i < l; i++) num += array[i];
		return num;
	},
	
	mean: function(array) {
		return arr.sum(array) / array.length;
	},
	
	median: function(array) {
		array.sort(function(a, b) {
			return a - b;
		});
		let mid = array.length / 2;
		return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
	},
	
	modes: function(array) {
		if (!array.length) return [];
		let modeMap = {},
			maxCount = 0,
			modes = [];

		array.forEach(function(val) {
			if (!modeMap[val]) modeMap[val] = 1;
			else modeMap[val]++;

			if (modeMap[val] > maxCount) {
				modes = [val];
				maxCount = modeMap[val];
			}
			else if (modeMap[val] === maxCount) {
				modes.push(val);
				maxCount = modeMap[val];
			}
		});
		return modes;
	},
	
	variance: function(array) {
		let mean = arr.mean(array);
		return arr.mean(array.map(function(num) {
			return Math.pow(num - mean, 2);
		}));
	},
	
	standardDeviation: function(array) {
		return Math.sqrt(arr.variance(array));
	},
	
	meanAbsoluteDeviation: function(array) {
		let mean = arr.mean(array);
		return arr.mean(array.map(function(num) {
			return Math.abs(num - mean);
		}));
	},
	
	zScores: function(array) {
		let mean = arr.mean(array);
		let standardDeviation = arr.standardDeviation(array);
		return array.map(function(num) {
			return (num - mean) / standardDeviation;
		});
	}
};


let xn_plot = d3.select(".n_plots").append("svg")
	.attr("width", all_charts_width)
	.attr("height", small_chart_height)
	.attr("class", "xn_plot")

let yn_plot = d3.select(".n_plots").append("svg")
	.attr("width", all_charts_width)
	.attr("height", small_chart_height)
	.attr("class", "yn_plot")

let xy_plot = d3.select(".charts").append("svg")
	.attr("width", all_charts_width)
	.attr("height", all_charts_width)
	.attr("class", "xy_plot")
	.on("mousemove", mouse_mooved);


//------------------------------------------------
// xn_plot
let xn_plot_xScale = d3.scaleLinear()
	.domain([0, n]) // the range of the values to plot
	// .range([ margin, all_charts_width - 2*margin ]); // the pixel range of the x-axis
	.range([ 0, all_charts_width ]); // the pixel range of the x-axis
let xn_plot_yScale = d3.scaleLinear()
	.domain([-radius, radius])
	// .range([ small_chart_height - margin, margin ]);
	.range([ small_chart_height, 0 ]);

// draw the x axis
let xn_xAxis = d3.axisBottom(xn_plot_xScale)
xn_plot.append("g")
	// .attr("transform", "translate(" + (margin) + ", " + (small_chart_height/2) + ")")
	.attr("transform", "translate(0, " + (small_chart_height/2) + ")")
	.call(xn_xAxis);
// draw the y axis
let xn_yAxis = d3.axisLeft(xn_plot_yScale)
xn_plot.append("g")
	// .attr("transform", "translate(" + (2*margin) + ",0)")
	// .attr("transform", "translate(" + ",0)")
	.call(xn_yAxis);


//------------------------------------------------
// yn_plot
let yn_plot_xScale = d3.scaleLinear()
	.domain([0, n]) // the range of the values to plot
	.range([ margin, all_charts_width - 2*margin ]); // the pixel range of the x-axis
let yn_plot_yScale = d3.scaleLinear()
	.domain([-radius, radius])
	.range([ small_chart_height - margin, margin ]);

// draw the x axis
let yn_xAxis = d3.axisBottom(yn_plot_xScale)
yn_plot.append("g")
	.attr("transform", "translate(" + (margin) + ", " + (small_chart_height/2) + ")")
	.call(yn_xAxis);
// draw the y axis
let yn_yAxis = d3.axisLeft(yn_plot_yScale)
yn_plot.append("g")
	.attr("transform", "translate(" + (2*margin) + ",0)")
	.call(yn_yAxis);


//------------------------------------------------
// xy_plot
let xy_plot_xScale = d3.scaleLinear()
	.domain([-radius, radius]) // the range of the values to plot
	// .range([ 2*margin, all_charts_width - 2 *margin]); // the pixel range of the x-axis
	.range([0, all_charts_width]); // the pixel range of the x-axis
let xy_plot_yScale = d3.scaleLinear()
	.domain([-radius, radius])
	// .range([ all_charts_width - margin, margin ]);
	.range([ all_charts_width, 0 ]);

// draw the x axis
let xy_xAxis = d3.axisBottom(xy_plot_xScale)
xy_plot.append("g")
	.attr("transform", "translate(0," + (all_charts_width/2) + ")")
	.call(xy_xAxis);
// draw the y axis
let xy_yAxis = d3.axisLeft(xy_plot_yScale)
xy_plot.append("g")
	.attr("transform", "translate(" + (all_charts_width/2) + ",0)")
	.call(xy_yAxis);
//------------------------------------------------

// scales for a and b
let a_scale = d3.scaleLinear()
	.domain([a_min, a_max])
	.range([0, all_charts_width])

let b_scale = d3.scaleLinear()
	.domain([b_min, b_max])
	.range([all_charts_width, 0])


let xy_heatmap = xy_plot.append("g");
let xn_dots = xn_plot.append("g");
let yn_dots = yn_plot.append("g");
let xy_dots = xy_plot.append("g");
let xy_pointer = xy_plot.append("g");

//////////////////////////////////////////////////////////////////
// DRAW BACKGROUND HEATMAP ///////////////////////////////////////
let hmap_rect_per_side = 510/6; // how many small rects per xy_plot side in background/ better - divisors of 510,only then axes will be in the middle of svg
// let hmap_rect_per_side = 510/3; // how many small rects per xy_plot side in background/ better - divisors of 510,only then axes will be in the middle of svg
let hmap_rect_size = Math.floor(all_charts_width / hmap_rect_per_side);
// let heatmap  = [12, 20];
let heatmap  = [];
let badass = 0;
// calculating remoteness of all points caused by (a, b) (we take those (a, b) values that corresponds to the centers of each heatmap rect)
for (let i = hmap_rect_size/2; i < all_charts_width; i += hmap_rect_size) {
	for (let j = hmap_rect_size/2; j < all_charts_width; j += hmap_rect_size) {
		let a = a_scale.invert(i);
		let b = b_scale.invert(j);
		let x_curr = x_init;
		let y_curr = y_init;
		let remoteness = 0; 
		// let counter = 0;
		let points = [];

		// Henon Map
		for (let k = 0; k < n; k++)
		{
			let x_prev = x_curr;
			let y_prev = y_curr;

			x_curr = 1 - a * Math.pow(x_prev, 2) + y_prev;
			y_curr = b * x_prev;
			
			// prevent infinity
			if (Math.abs(x_curr) < radius && Math.abs(y_curr) < radius) {
				points.push((Math.abs(x_curr) + Math.abs(y_curr))/2);
				// remoteness += Math.abs(x_curr) + Math.abs(y_curr);
			} else { 
				// remoteness = 1e6; 
				// break; 
			}
			// let dist = Math.sqrt(x_curr*x_curr + y_curr*y_curr);
			// if (dist < radius) {
			// 	remoteness += dist;
			// 	counter++;
			// } else { 
			// 	// remoteness = 1e6; 
			// 	break; 
			// }
		}
		let coolness;


		// coolness = Math.exp(points.length * Math.abs(arr.max(points) - arr.min(points)));
		// if (coolness > badass) {
		// 	badass = coolness;
		// }

		if (points.length > 200 && Math.abs(arr.max(points) - arr.min(points)) > 0.8) { // filter too small
			coolness = points.length * Math.abs(arr.max(points) - arr.min(points)); // only "long and tail" .n_plots
			if (coolness > badass) {
				badass = coolness;
			}
		}
		else {coolness = 0;} // "fake badass" 


		heatmap.push(coolness);
	}
}

console.log("badass: ", badass);
let color = d3.scaleLinear() // for heatmap
	.domain([0, badass])
	// .domain([0, 1e6])
	.range(["#aaaaaa", "#ffffff"]);
	// .range(["#8b0000", "#FFF0F0"]);

// for (let i = 0; i < (hmap_rect_per_side*hmap_rect_per_side); i++) 
// {
//     heatmap[i] = Math.random()*1e6; 
// }
xy_heatmap.selectAll("*").remove(); //without that line old data remains
xy_heatmap.selectAll("rect") // background heatmap
    .data(heatmap)
    .enter()
    .append("rect")
        .attr("x", function(d,i) { return Math.floor(i / hmap_rect_per_side) * hmap_rect_size; })
        .attr("y", function(d,i) { return i % hmap_rect_per_side * hmap_rect_size; })
        .attr("width", hmap_rect_size)
        .attr("height", hmap_rect_size)
        .attr('opacity', 0.8)
        .attr("fill", color);
//////////////////////////////////////////////////////////////////

function redraw() {
	let xdata = [x_init];
	let ydata = [y_init];
	let a = document.getElementById("a_slider").value;
	let b = document.getElementById("b_slider").value;
	document.querySelector("#a_out").value = a;
	document.querySelector("#b_out").value = b;
	
	// Henon Map
	for (let i = 0; i < n; i++)
	{
		let x_curr = 1 - a * Math.pow(xdata[xdata.length - 1], 2) + ydata[ydata.length - 1];
		let y_curr = b * xdata[xdata.length - 1];

		// prevent infinity
		if (Math.abs(x_curr) < radius && Math.abs(y_curr) < radius) { 
			xdata.push(x_curr);
			ydata.push(y_curr);
		}

	}
	// console.log((arr.variance(xdata) + arr.variance(ydata))*xdata.length, arr.max(xdata), xdata.length);
	// console.log(xdata.length, ydata.length); // always equal (empiric)

	xn_dots.selectAll("*").remove(); //without that line old data remains
	xn_dots.selectAll("scatter-dots")
		.data(xdata)  // using the values in the xdata array
		.enter().append("svg:circle")  // create a new circle for each value
		.attr("cx", function (d,i) { return xn_plot_xScale(i); } ) // translate x value
		.attr("cy", function (d) { return xn_plot_yScale(d); } ) // translate y value to a pixel
		.attr("r", 1) // radius of circle
		.style("opacity", 1.0); // opacity of circle

	yn_dots.selectAll("*").remove(); //without that line old data remains
	yn_dots.selectAll("scatter-dots")
		.data(ydata)  // using the values in the ydata array
		.enter().append("svg:circle")  // create a new circle for each value
		.attr("cx", function (d,i) { return xn_plot_xScale(i); } ) // translate x value
		.attr("cy", function (d) { return xn_plot_yScale(d); } ) // translate y value to a pixel
		.attr("r", 1) // radius of circle
		.style("opacity", 1.0); // opacity of circle

	xy_dots.selectAll("*").remove(); //without that line old data remains
	xy_dots.selectAll("scatter-dots")
		.data(ydata)  // using the values in the ydata array
		.enter().append("svg:circle")  // create a new circle for each value
		.attr("cx", function (d,i) { return xy_plot_xScale(xdata[i]); } ) // translate x value
		.attr("cy", function (d) { return xy_plot_yScale(d); } ) // translate y value to a pixel
		.attr("r", 1) // radius of circle
		.style("opacity", 1.0); // opacity of circle
	
	xy_pointer.selectAll("circle").remove();
	xy_pointer.append("svg:circle")  // create a new circle for each value
		.attr("cx", a_scale(a) ) // translate x value
		.attr("cy", b_scale(b) ) // translate y value to a pixel
		.attr("r", 3) // radius of circle
		.style("opacity", 1.0) // opacity of circle
		.attr("class", "pointer");
}

function mouse_mooved() 
{
	let mouse_xy = d3.mouse(this);
	document.getElementById("a_slider").value = a_scale.invert(mouse_xy[0]);
	document.getElementById("b_slider").value = b_scale.invert(mouse_xy[1]);
	redraw();
}

