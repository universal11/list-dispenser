function ListDispenser(){

}

ListDispenser.writeLists = function(inputData, inputPath, outputData, outputPath){
	var FileSystem = require("fs");
	FileSystem.writeFile(outputPath, outputData, function(error){
		//console.log(outputPath + " written.");
	});

	FileSystem.writeFile(inputPath, inputData, function(error){
		//console.log(inputPath + " updated.");
	});
}

ListDispenser.isValidLine = function(line){
	if(line && line != "" && line != null && line != undefined && line.length > 0 && line != "\r"){
		return true;
	}
	return false;
}


ListDispenser.dispense = function(inputPath, outputPath, count){
	//var lists = ListDispenser.getLists(inputPath);
	console.log("Dispensing from: " + inputPath);
	var FileSystem = require("fs");
	FileSystem.readdir(inputPath, function(error, files){
		console.log("Lists: " + files);
		var numberOfFiles = files.length;
		var retrievedLineCount = 0;

		var outputPathExists = FileSystem.existsSync(outputPath);
		if(!outputPathExists){
			FileSystem.mkdirSync(outputPath);
		}

		for(var i=0; i < numberOfFiles; i++){
			var file = files[i];
			//console.log("Reading: " + file);
			var data = FileSystem.readFileSync(inputPath + "/" + file);
			if(data){

				var dataLines = data.toString().split("\n");
				var numberOfDataLines = dataLines.length;
				var dispenserLines = new Array();
				for(var j=0; j < numberOfDataLines; j++){
					var dataLine = dataLines[j];
					if(retrievedLineCount < count){
						if(ListDispenser.isValidLine(dataLine)){
							dispenserLines.push(dataLine);
							delete dataLines[j];
							retrievedLineCount++
						}
					}
				}
				dataLines = dataLines.filter(function(result){
					return (result !== undefined && result != null);
				});

				

				ListDispenser.writeLists(dataLines.join("\n"), inputPath + "/" + file, dispenserLines.join("\n"), outputPath + "/" + file);
				
			}



		}
		if(retrievedLineCount == 0){
			console.log("Pool Empty!");
		}
		console.log("Created: " + outputPath);
	});
}


module.exports = ListDispenser;