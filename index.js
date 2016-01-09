var fs = require('fs');
var path = require('path');

var countries = JSON.parse(fs.readFileSync(path.join('data','countries.json'), "utf8"));
var manufacters = JSON.parse(fs.readFileSync(path.join('data','manufacters.json'), "utf8"));

module.exports = {
  validate: function (vin) {
    if (vin.length == 0)
      return false;

    if (vin.length != 17)
      return false;

    return true;
  },
  split: function(vin) {
    var INDEXES = {
      MADE_IN_START: 0,
      MADE_IN_END: 2,
      MANUFACTER_START: 1,
      MANUFACTER_END: 3,
      DETAILS_START: 3,
      DETAILS_END: 8,
      SECURITY_CODE: 8,
      YEAR: 9,
      ASSEMBLY_PLANT: 10,
      SERIAL_NUMBER_START: 11
    };

    var rawInfo = {
      madeIn: vin.substring(INDEXES.MADE_IN_START,INDEXES.MADE_IN_END),
      manufacter: vin.substring(INDEXES.MANUFACTER_START,INDEXES.MANUFACTER_END),
      details: vin.substring(INDEXES.DETAILS_START,INDEXES.DETAILS_END),
      securityCode: vin.charAt(INDEXES.SECURITY_CODE),
      year: vin.charAt(INDEXES.YEAR),
      assemblyPlant: vin.charAt(INDEXES.ASSEMBLY_PLANT),
      serialNumber: vin.substring(INDEXES.SERIAL_NUMBER_START)
    };

    return rawInfo;
  },
  decode: function(vin) {
    var carInfo = {

    };

    var codeValues = split(vin);

    return carInfo;
  }
};
