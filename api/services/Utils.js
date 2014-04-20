module.exports = {
	genRand: function(min, max){
		return Math.floor(Math.random()*(max-min+1)+min);
	},
	populateAsync: function(obj, file, limit, next){
		var counter = 0;
		var populateHelper = function(index, data, cb){
			obj.create(data).done(function(err, name){
				counter++;
				return cb(err);
			});
		};
		var fs = require('fs'),
	    readline = require('readline');
		var rd = readline.createInterface({
		    input: fs.createReadStream(file),
		    output: process.stdout,
		    terminal: false
		});

		var names = [];
		rd.on('line', function(line) {
			names.push(line);
		});
		rd.on('close', function(){
			names = names.filter(function(elem, pos) {
			    return names.indexOf(elem) == pos;
			});
			if(!limit || limit>names.length) limit = names.length;
			
			var index = 0;
			for (var i = 0; i < names.length && i < limit; i++) {
			  	var data = {label: names[i]};
				populateHelper(i, data, function(err, done){
					if(err) return next(err);

					if(counter>=limit) {
						console.log('Done populating...');
						return next(null)};
				})
			};
		});
	}
}