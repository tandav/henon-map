TESTER = document.getElementById('xy_plot');
// Plotly.plot( TESTER, [{
// x: [1, 2, 3, 4, 5],
// y: [1, 2, 4, 8, 16] }], {
// margin: { t: 0 } } );

// function myFunction() {
//     var x = document.getElementById("myInput").value;
//     document.getElementById("text").innerHTML = "You wrote: " + x;
// }

// var X = []
// var Y = []
var henon = {
    // x: [0.1],
    // y: [0.02],
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16],
    mode: 'markers',
    type: 'scatter',
    marker: { size: 3 }
};

var r = 5.5
var layout = {
  xaxis: {range: [-r, r]},
  yaxis: {range: [-r, r]}
};

function myFunction2() {
    var a = document.getElementById("a_slider").value;
    var b = document.getElementById("b_slider").value;
    henon.x = [0.1]
    henon.y = [0.02]
    for (var i = 0; i < 200; i++) {
        var x_next = 1 - a * henon.x[henon.x.length-1]**2 + henon.y[henon.y.length-1]
        var y_next = b * henon.x[henon.x.length-1]
        henon.x.push(x_next)
        henon.y.push(y_next)
    }
	// henon.y[0] = document.getElementById("a_slider").value;
	// henon.y[1] = document.getElementById("b_slider").value;
	Plotly.newPlot(TESTER, [henon], layout);
}


