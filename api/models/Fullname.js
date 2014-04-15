/**
 * Fullname
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

  populateFullnames: function(next){
  	Firstname.find().done(function(err, firstNames){
  		if(err) return next(err);

  		Lastname.find().done(function(error, lastNames){
  			if(error) return next(error);

  			console.log(firstNames);
  			console.log(lastNames.length);
  			return next(null);
  		})
  	})
  }

};
