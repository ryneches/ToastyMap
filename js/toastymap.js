var values;

$.get("/data/GOS_vs_pfam_100.txt", function(data){
    var matrix = $.tsv.toArrays(data, {stripHeader: true});
    console.log("Object generated");
	var proteinFam = [];

    for(var i = 0; i < matrix.length; i++){
        proteinFam.push(matrix[i].shift());
    }
	console.log(proteinFam);
    var clustered = clusterfck.hcluster(matrix, "manhattan", "complete");
    console.log(clustered);
    
    var data = [];
     
    var s = '<table><tr>';
    var c = '';
    var minscore = 0;
    var maxscore = 0;
    for(var x = 0; x < matrix.length; x++){
        for( var y = 0; y < matrix[x].length; y++) {
            q = matrix[x][y];
            data.push( { row:y, col:x, score:q } );
            if( q > maxscore ) { maxscore = q; }
            if( q < minscore ) { minscore = q; }
        }
    }

    //height of each row in the heatmap
    //width of each column in the heatmap
    var gridSize = 5,
        h = gridSize,
        w = gridSize,
        rectPadding = 6;
    
    var colorLow = 'green', colorMed = 'white', colorHigh = 'blue';
    
    var margin = {top: 80, right: 80, bottom: 30, left: 50},
        width = 1024 - margin.left - margin.right,
        height = 768 - margin.top - margin.bottom;

    var colorScale = d3.scale.linear()
        .domain([minscore, 0 , maxscore])
        .range([colorLow, colorMed, colorHigh]);
    
    var svg = d3.select("#heatmap").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // draw the rectangles in the heatmap
    var heatMap = svg.selectAll(".heatmap")
        .data(data, function(d) { return d.col + ':' + d.row; })
        .enter().append("svg:rect")
        .attr("x", function(d) { return d.row * w; })
        .attr("y", function(d) { return d.col * h; })
        .attr("width", function(d) { return w; })
        .attr("height", function(d) { return h; })
        .style("fill", function(d) { return colorScale(d.score); });

});
