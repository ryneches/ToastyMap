$(function(){
	$.get("/data/GOS_vs_pfam-trunc-clean.txt", function(data){
		var object = $.tsv.toArrays(data, {stripHeader: true});
		console.log("Object generated");
		var clustered = clusterfck.hcluster(object);
		console.log(clustered);
	});
});