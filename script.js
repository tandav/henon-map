const n = 800;
const height_unit = 250;
const margin = 10;
const width_unit = height_unit*2 + margin;

const fixed_radius = 5; // for .n_plots
const xy_radius = 12.2;
const xmin = -6.2;
const xmax = xmin + xy_radius;
const ymin = -6.2;
const ymax = ymin + xy_radius;

// a, b scope
const a_min = -0.43;
const a_max = 0.5;
const b_min = -0.5;
const b_max = 2.1;

const x0 = 0.1;
const y0 = 0.8;
let hmap = new Array(n).fill([0, 0]); // [[x0, y0], [x1, y1], ... [xn, yn]]

const arr = {
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

const henon_map_update = function(a, b, x0, y0, n) {
    hmap[0] = [x0, y0];
    for (let i = 1; i < n; i++)
    {
        hmap[i] = [1 - a * Math.pow(hmap[i - 1][0], 2) + hmap[i - 1][1], b * hmap[i - 1][0]]

        // prevent infinity
        if (Math.abs(hmap[i][0]) > 1e6 || Math.abs(hmap[i][1]) > 1e6) { 
            hmap[i] = [0, 0]; 
        }
    }
}

const redraw = function() {
    xy_dots.selectAll("circle")
        .data(hmap) // bind and update
        .attr("cx", function(d) { return xy_plot_xScale(d[0]); })
        .attr("cy", function(d) { return xy_plot_yScale(d[1]); })
        .enter().append("circle") // enter section
        .attr("cx", function(d) { return xy_plot_xScale(d[0]); })
        .attr("cy", function(d) { return xy_plot_yScale(d[1]); })
        .attr("r", 1.5)
        .attr("fill", "white")

    xn_dots.selectAll("circle")
        .data(hmap)
        .attr("cx", function(d, i) { return xn_yn_plot_xScale(i); })
        .attr("cy", function(d) { return xn_yn_plot_yScale(d[0]); })
        .enter().append("circle")
        .attr("cx", function(d, i) { return xn_yn_plot_xScale(i); })
        .attr("cy", function(d) { return xn_yn_plot_yScale(d[0]); })
        .attr("r", 1)
        .attr("fill", "purple")

    yn_dots.selectAll("circle")
        .data(hmap)
        .attr("cx", function(d, i) { return xn_yn_plot_xScale(i); })
        .attr("cy", function(d) { return xn_yn_plot_yScale(d[1]); })
        .enter().append("circle")
        .attr("cx", function(d, i) { return xn_yn_plot_xScale(i); })
        .attr("cy", function(d) { return xn_yn_plot_yScale(d[1]); })
        .attr("r", 1)
        .attr("fill", "SpringGreen")
}

//--------------------------------------------------------------
// ab_plot stuff -----------------------------------------------
let ab_plot = d3.select(".ab_xy_plots").append("svg")
    .attr("class", "ab_plot")
    .attr("width", width_unit)
    .attr("height", width_unit)


// scales
let a_scale = d3.scaleLinear()
    .domain([a_min, a_max])
    .range([0, width_unit])

let b_scale = d3.scaleLinear()
    .domain([b_min, b_max])
    .range([width_unit, 0])

// axes
let ab_aAxis = d3.axisBottom(a_scale)
    .ticks(10)
    // .tickSize(width_unit)
    // .tickPadding(width_unit);

let ab_bAxis = d3.axisRight(b_scale)
    .ticks(10)
    // .tickSize(width_unit)
    // .tickPadding(width_unit);


// transparent rect for zoom
let view = ab_plot.append("rect")
    .attr("width", width_unit)
    .attr("height", width_unit)
    // .style("fill", "none")
    .on("mousemove", mouse_mooved);
    // .style("pointer-events", "all")
    // .on("click", clicked)

var gA = ab_plot.append("g")
    .attr("class", "axis axis--x")
    .call(ab_aAxis);

var gB = ab_plot.append("g")
    .attr("class", "axis axis--y")
    .call(ab_bAxis);



// DRAW BACKGROUND HEATMAP ///////////////////////////////////////
// let heatmap_pixels = ab_plot.append("g");
// let hmap_rect_per_side = 510/6; // how many small rects per xy_plot side in background/ better - divisors of 510,only then axes will be in the middle of svg
// // let hmap_rect_per_side = 510/3; // how many small rects per xy_plot side in background/ better - divisors of 510,only then axes will be in the middle of svg
// let hmap_rect_size = Math.floor(width_unit / hmap_rect_per_side);
// // let heatmap  = [12, 20];
// let heatmap  = [];
// let badass = 0;
// // calculating remoteness of all points caused by (a, b) (we take those (a, b) values that corresponds to the centers of each heatmap rect)
// for (let i = hmap_rect_size/2; i < width_unit; i += hmap_rect_size) {
//     for (let j = hmap_rect_size/2; j < width_unit; j += hmap_rect_size) {
//         let a = a_scale.invert(i);
//         let b = b_scale.invert(j);
//         let x_curr = x0;
//         let y_curr = y0;
//         let remoteness = 0;
//         // let counter = 0;
//         let points = [];

//         // Henon Map
//         for (let k = 0; k < n; k++)
//         {
//             let x_prev = x_curr;
//             let y_prev = y_curr;

//             x_curr = 1 - a * Math.pow(x_prev, 2) + y_prev;
//             y_curr = b * x_prev;

//             // prevent infinity
//             if (Math.abs(x_curr) < xy_radius && Math.abs(y_curr) < xy_radius) {
//                 points.push((Math.abs(x_curr) + Math.abs(y_curr))/2);
//                 // remoteness += Math.abs(x_curr) + Math.abs(y_curr);
//             } else {
//                 // remoteness = 1e6;
//                 // break;
//             }
//             // let dist = Math.sqrt(x_curr*x_curr + y_curr*y_curr);
//             // if (dist < radius) {
//             //  remoteness += dist;
//             //  counter++;
//             // } else {
//             //  // remoteness = 1e6;
//             //  break;
//             // }
//         }
//         let coolness;


//         // coolness = Math.exp(points.length * Math.abs(arr.max(points) - arr.min(points)));
//         // if (coolness > badass) {
//         //  badass = coolness;
//         // }

//         if (points.length > 200 && Math.abs(arr.max(points) - arr.min(points)) > 0.8) { // filter too small
//             coolness = points.length * Math.abs(arr.max(points) - arr.min(points)); // only "long and tail" .n_plots
//             if (coolness > badass) {
//                 badass = coolness;
//             }
//         }
//         else {coolness = 0;} // "fake badass"
//         heatmap.push(coolness);
//     }
// }

// console.log("badass: ", badass);
// let color = d3.scaleLinear() // for heatmap
//     .domain([0, badass])
//     .range(["#aaaaaa", "#ffffff"]);

// heatmap_pixels.selectAll("rect")
//     .data(heatmap)
//     .enter()
//     .append("rect")
//         .attr("x", function(d,i) { return Math.floor(i / hmap_rect_per_side) * hmap_rect_size; })
//         .attr("y", function(d,i) { return i % hmap_rect_per_side * hmap_rect_size; })
//         .attr("width", hmap_rect_size)
//         .attr("height", hmap_rect_size)
//         // .attr('opacity', 0.8)
//         .attr("fill", color);



// let ab_g = ab_plot.append("g");

let red_pointer = ab_plot.append("circle")
        .attr("cx", a_scale((a_min + a_max) / 2))
        .attr("cy", b_scale((b_min + b_max) / 2))
        .attr("r", 5.0)
        .attr("fill", "red");
        // .style("pointer-events", "all")
        // .call(d3.drag()
        //     .on("start", dragstarted)
        //     .on("drag", dragged)
        //     .on("end", dragended));


ab_plot.call(d3.zoom()
    .scaleExtent([1, 64])
    .on("zoom", zoomed_ab));

function zoomed_ab() {
  // heatmap_pixels.attr("transform", d3.event.transform);
  // red_pointer.attr("transform", d3.event.transform);
  view.attr("transform", d3.event.transform);
  gA.call(ab_aAxis.scale(d3.event.transform.rescaleX(a_scale)));
  gB.call(ab_bAxis.scale(d3.event.transform.rescaleY(b_scale)));
}

function mouse_mooved() 
{
    let mouse = d3.mouse(this);
    let mouse_unzoomed = d3.mouse(d3.select(".ab_plot").node());
    console.log(a_scale.invert(mouse[0]), b_scale.invert(mouse[1]));
    // red_pointer.attr("cx", mouse[0]).attr("cy", mouse[1]);
    red_pointer.attr("cx", mouse_unzoomed[0]).attr("cy", mouse_unzoomed[1]);
    // red_pointer.attr("cx", d3.event.pageX).attr("cy", d3.event.pageY);
    henon_map_update(a_scale.invert(mouse[0]), b_scale.invert(mouse[1]), x0, y0, n);
    redraw();
}

// function dragstarted(d) { // mb del args
//   // d3.select(this).raise().classed("active", true);
// }

// function dragged(d) { // mb del args
//     let mouse = d3.mouse(this);
//     console.log(mouse[0], mouse[1]);
//     red_pointer.attr("cx", mouse[0]).attr("cy", mouse[1]);
//     henon_map_update(a_scale.invert(mouse[0]), b_scale.invert(mouse[1]), x0, y0, n)
//     redraw();
// }

// function dragended(d) {
//   // d3.select(this).classed("active", false);
// }



//--------------------------------------------------------------
// xy_plot stuff -----------------------------------------------
let xy_plot = d3.select(".ab_xy_plots").append("svg")
    .attr("class", "xy_plot")
    .attr("width", width_unit)
    .attr("height", width_unit)

// scales 
let xy_plot_xScale = d3.scaleLinear()
    .domain([xmin, xmax]) // the range of the values to plot
    // .range([ 2*margin, width_unit - 2 *margin]); // the pixel range of the x-axis
    .range([0, width_unit]); // the pixel range of the x-axis
let xy_plot_yScale = d3.scaleLinear()
    .domain([ymin, ymax])
    // .range([ width_unit - margin, margin ]);
    .range([ width_unit, 0 ]);

// axes
let xy_xAxis = d3.axisBottom(xy_plot_xScale)
xy_plot.append("g")
    .attr("transform", "translate(0," + (width_unit/2) + ")")
    .call(xy_xAxis);
let xy_yAxis = d3.axisLeft(xy_plot_yScale)
xy_plot.append("g")
    .attr("transform", "translate(" + (width_unit/2) + ",0)")
    .call(xy_yAxis);

let xy_dots = xy_plot.append("g");

// transparent rect for zoom
xy_plot.append("rect")
    .attr("width", width_unit)
    .attr("height", width_unit)
        .style("fill", "none")
        .style("pointer-events", "all")
        .call(d3.zoom()
            .scaleExtent([1 / 16, 16])
            .on("zoom", zoomed));

function zoomed() {
  xy_dots.attr("transform", d3.event.transform);
}

//--------------------------------------------------------------
// xn_yn_plot stuff --------------------------------------------
let xn_yn_plot = d3.select(".charts").append("svg")
    .attr("class", "xn_yn_plots")
    .attr("width", width_unit*2)
    .attr("height", width_unit/2)

// scales 
let xn_yn_plot_xScale = d3.scaleLinear()
    .domain([0, n]) // the range of the values to plot
    .range([ 0, width_unit*2 ]); // the pixel range of the x-axis
let xn_yn_plot_yScale = d3.scaleLinear()
  .domain([-fixed_radius, fixed_radius])
    .range([ width_unit/2, 0 ]);

// axes
let xn_yn_xAxis = d3.axisBottom(xn_yn_plot_xScale)
xn_yn_plot.append("g")
    .attr("transform", "translate(0, " + (width_unit/2/2) + ")")
    .call(xn_yn_xAxis);
let xn_yn_yAxis = d3.axisRight(xn_yn_plot_yScale)
xn_yn_plot.append("g")
    .call(xn_yn_yAxis);

let xn_dots = xn_yn_plot.append("g");
let yn_dots = xn_yn_plot.append("g");
//--------------------------------------------------------------