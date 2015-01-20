(function(){
	var data;
	d3.csv("file.csv", function(loadedRows) {
		  data = loadedRows;
		  doSomethingWithRows();
		});

	function doSomethingWithRows() {
	
	//height of each row in the heatmap
	        //width of each column in the heatmap
	        var gridSize = 10,
	            h = gridSize,
	            w = gridSize,
	            rectPadding = 10;

	        var colorLow = 'green', colorMed = 'yellow', colorHigh = 'red';

	        var margin = {top: 20, right: 80, bottom: 30, left: 50},
	            width = 1640 - margin.left - margin.right,
	            height = 5380 - margin.top - margin.bottom;

	        var colorScale = d3.scale.linear()
	             .domain([0, 5, 100])
	             .range([colorLow, colorMed, colorHigh]);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return d.score + ' (' + d.ip + ', ' + d.user + ')';
  });

	        var svg = d3.select("#heatmap").append("svg")
	            .attr("width", width + margin.left + margin.right)
	            .attr("height", height + margin.top + margin.bottom)
	          .append("g")
	            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

	        var heatMap = svg.selectAll(".heatmap")
	            .data(data, function(d) { return d.col + ':' + d.row; })
	          .enter().append("svg:rect")
	            .attr("x", function(d) { return d.row * w; })
	            .attr("y", function(d) { return d.col * h; })
	            .attr("width", function(d) { return w; })
	            .attr("height", function(d) { return h; })
	            .attr("stroke-width", 1)
	            .attr("stroke", "black")
//	            .attr("title", function(d) { return d.score + ' (' + d.ip + ', ' + d.user + ')';})
//	            .attr("alt", function(d) { return d.score + ' (' + d.ip + ', ' + d.user + ')';})
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)
	            .style("fill", function(d) { return colorScale(d.score); }); 
	}
         
})();
