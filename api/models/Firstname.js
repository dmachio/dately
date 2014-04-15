/**
 * Firstname
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

  populateFirstnames: function(next){
	var fs = require('fs'),
	    readline = require('readline');

	var rd = readline.createInterface({
	    input: fs.createReadStream('firstname.txt'),
	    output: process.stdout,
	    terminal: false
	});

	var counter = 0;
	Firstname = this;
	rd.on('line', function(line) {
		if(!line || line==='')
			return next(null);
		counter++;
		var data = {id:counter, label: line};
		Firstname.create(data).done(function(err, firstName){
			if(err) return next(err);
		});
	});
  }

};
