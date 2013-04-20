$(function(){
	$.get("/data/GOS_vs_pfam-trunc.txt", function(data){
		var object = $.tsv.toArrays(data`);
		console.log("Object generated");
		var clustered = clusterfck.hcluster(object);
		console.log(clustered);
	});
});