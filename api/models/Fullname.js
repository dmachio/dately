/**
 * Fullname
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var Utils = require('../services/Utils.js');
var conf = require('../../config/datelyconf');

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/

    firstName: 'string',
    lastName: 'string'
    
  },

  populate: function(next){
    Fullname.checkFirstLast(function(err){
      if (err) {return next(err)};

      Firstname.find().done(function(err, firstNames){
        if(err) return next(err);

        Lastname.find().done(function(error, lastNames){
          if(error) return next(error);
          
          var numFirstNamesToInclude = (conf.numFirstNamesToInclude &&
            conf.numFirstNamesToInclude<=firstNames.length) ? 
            conf.numFirstNamesToInclude : firstNames.length;
          
          var numLastNamesToInclude = (conf.numLastNamesToInclude && 
            conf.numLastNamesToInclude<=lastNames.length) ? 
            conf.numLastNamesToInclude : lastNames.length;
          
          var upperLimit = numFirstNamesToInclude*numLastNamesToInclude;
          console.log('Populating full names...');
          for (var i = 0; i < firstNames.length && i < numFirstNamesToInclude; i++) {
            var lastNameIDs = [];
            var index = 0;
            while(index < numLastNamesToInclude){
              var id = Utils.genRand(0, lastNames.length-1);
              if(lastNames.indexOf(id)===-1){
                index++;
                lastNameIDs.push(id);
              }
            }
            for (var j = 0; j < lastNameIDs.length; j++) {
              var data = {firstName: firstNames[i].label, lastName: lastNames[lastNameIDs[j]].label};
              Fullname.create(data).done(function(error, fName){
                if(error) return next(error);
                if(--upperLimit===0){
                  console.log('Done populating full names...');
                  return next(null);
                }
              });
            };
          };
        });
      });
    });
  	
  },
  checkFirstLast: function(next){
    Fullname.checkFirst(function(err){
      if(err) return next(err);

      Fullname.checkLast(function(err){
        return next(err);
      })
    })
  },
  checkFirst: function(next){
    console.log('Checking that first last names are in db. Otherwise populate');
    Firstname.find().done(function(err, firstnames){
      if(err) return next(err);

      if(firstnames.length===0){
        Utils.populateAsync(Firstname, 'firstname.txt', conf.firstNamesMax, function(err){
          return next(err);
        });
      }
      else{
        return next(null);
      }
    })
  },
  checkLast: function(next){
    console.log('Checking that last names are in db. Otherwise populate');
    Lastname.find().done(function(err, lastnames){
      if(err) return next(err);

      if(lastnames.length===0){
        Utils.populateAsync(Lastname, 'lastname.txt', conf.lastNamesMax, function(err){
          return next(err);
        });
      }
      else{
        return next(null);
      }
    })
  }

};
