/**
 * Lastname
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/

  	id: 'int',
  	label: 'string'
    
  },

  populateLastnames: function(next){
	var fs = require('fs'),
	    readline = require('readline');

	var rd = readline.createInterface({
	    input: fs.createReadStream('lastname.txt'),
	    output: process.stdout,
	    terminal: false
	});

	var counter = 0;
	Lastname = this;
	rd.on('line', function(line) {
		if(!line || line==='')
			return next(null);
		counter++;
		var data = {id:counter, label: line};
		Lastname.create(data).done(function(err, firstName){
			if(err) return next(err);
		});
	});
  }

};





