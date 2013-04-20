$(function(){
	$.get("/data/GOS_vs_pfam-clean.txt", function(data){
		var object = $.tsv.toArrays(data, {stripHeader: true});
		console.log("Object generated");
		var clustered = clusterfck.kmeans(object,3);
		console.log(clustered);
	});
});