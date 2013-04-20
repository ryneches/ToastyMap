$(function(){
	$.get("/data/GOS_vs_pfam-trunc.txt", function(data){
		var object = $.tsv.toArrays(data, {stripHeader: true});
		console.log("Object generated");

		var proteinFam = [];

		for(var i = 0; i < object.length; i++){
			proteinFam.push(object[i].shift());
		}

		console.log(proteinFam);

		var clustered = clusterfck.hcluster(object);
		console.log(clustered);

		
	});	
});