var values;

$.get("/data/GOS_vs_pfam-trunc.txt", function(data){
    var matrix = $.tsv.toArrays(data, {stripHeader: true});
    console.log("Object generated");
	var proteinFam = [];

    for(var i = 0; i < matrix.length; i++){
        proteinFam.push(matrix[i].shift());
    }
	console.log(proteinFam);
    var clustered = clusterfck.hcluster(matrix, "manhattan", "complete");
    console.log(clustered);
    
    var s = '<table><tr>';
    var c = '';
    for(var x = 0; x < matrix.length; x++){
        for( var y = 0; y < matrix[x].length; y++) {
            q = 255 - matrix[x][y];
            c = "rgb(255," +  q + "," + q + ")"
            s = s + "<td class='square' style='float:left; height:3px; width:3px; background-color:" + c + ";'></td>";
        }
        s = s + "</tr><tr>"
    }
    s = s + "</td></tr></table>"
    $("#Clusterdata").html(s)

});
