function ListDispenser(){

}

ListDispenser.writeLists = function(inputData, inputPath, outputData, outputPath){
	var FileSystem = require("fs");
	FileSystem.writeFile(outputPath, outputData, function(error){
		console.log(outputPath + " written.");
	});

	FileSystem.writeFile(inputPath, inputData, function(error){
		console.log(inputPath + " written.");
	});
}

ListDispenser.dispense = function(inputPath, outputPath, count){
	//var lists = ListDispenser.getLists(inputPath);
	console.log("Dispensing from: " + inputPath);
	var FileSystem = require("fs");
	FileSystem.readdir(inputPath, function(error, files){
		console.log("Files: " + files);
		var numberOfFiles = files.length;
		var retrievedLineCount = 0;
		for(var i=0; i < numberOfFiles; i++){
			var file = files[i];
			console.log("Reading: " + file);
			var data = FileSystem.readFileSync(inputPath + "/" + file);
			if(data){
				//if(retrievedLineCount <= count){
				var dataLines = data.toString().split("\n");
				var numberOfDataLines = dataLines.length;
				var dispenserLines = new Array();
				for(var j=0; j < numberOfDataLines; j++){
					var dataLine = dataLines[j];
					if(retrievedLineCount < count && dataLine != ""){
						//console.log(dataLine);
						dispenserLines.push(dataLine);
						delete dataLines[j];
						retrievedLineCount++
					}
				}
				dataLines = dataLines.filter(function(result){
					return (result !== undefined && result != null);
				});
				//console.log("Remaining:");
				//console.log(dataLines.join("\n"));
				if(retrievedLineCount > 0){
					var outputPathExists = FileSystem.existsSync(outputPath);
					if(!outputPathExists){
						FileSystem.mkdirSync(outputPath);
					}

					ListDispenser.writeLists(dataLines.join("\n"), inputPath + "/" + file, dispenserLines.join("\n"), outputPath + "/" + file);
				}
				else{
					console.log("Pool is empty!");
				}
				
				/*
				FileSystem.writeFile(outputPath + "/" + file, dispenserLines.join("\n"), function(error){
					console.log(outputPath + "/" + file + " written - lines: " + dispenserLines.length );
				});

				FileSystem.writeFile(inputPath + "/" + file, dataLines.join("\n"), function(error){
					console.log(outputPath + "/" + file + " written!");
				});
				*/
				
			}



		}
	});
}


module.exports = ListDispenser;