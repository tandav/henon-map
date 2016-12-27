TESTER = document.getElementById('xy_plot');
// Plotly.plot( TESTER, [{
// x: [1, 2, 3, 4, 5],
// y: [1, 2, 4, 8, 16] }], {
// margin: { t: 0 } } );

// function myFunction() {
//     var x = document.getElementById("myInput").value;
//     document.getElementById("text").innerHTML = "You wrote: " + x;
// }

function range(start, count) {
      return Array.apply(0, Array(count))
        .map(function (element, index) { 
          return index + start;  
      });
}

var X = []
var Y = []
var henon_xn = {
    // x: [0.1],
    // y: [0.02],
    x: X,
    y: Y,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 3 }
};

var henon_xy = {
    // x: [0.1],
    // y: [0.02],
    x: X,
    y: Y,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 3 }
};

var r = 5.5

var xy_layout = {
    xaxis: {range: [-r, r]},
    yaxis: {range: [-r, r]}
};

function myFunction2() {
    var a = document.getElementById("a_slider").value;
    var b = document.getElementById("b_slider").value;
    X = [0.1]
    Y = [0.02]
    for (var i = 0; i < 200; i++) {
        var x_next = 1 - a * X[X.length-1]**2 + Y[Y.length-1]
        var y_next = b * X[X.length-1]
        X.push(x_next)
        Y.push(y_next)
    }
    henon_xn.x = range(0, X.length)
    log(range(0, X.length))
    henon_xn.y = X
    Plotly.newPlot(TESTER, [henon_xn], xy_layout);`

    henon_xy.x = X
    henon_xy.y = Y
	Plotly.newPlot(TESTER, [henon_xy], xy_layout);
}


