function ListDispenser(){

}

ListDispenser.dispense = function(inputPath, outputPath, count){
	//var lists = ListDispenser.getLists(inputPath);
	var FileSystem = require("fs");
	FileSystem.readdir(inputPath, function(error, files){
		console.log("Files: " + files);
		var numberOfFiles = files.length;
		for(var i=0; i < numberOfFiles; i++){
			var file = files[i];

		}
	});
}


module.exports = ListDispenser;