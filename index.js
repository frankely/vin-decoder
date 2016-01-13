var fs = require('fs');
var path = require('path');

var countries = JSON.parse(fs.readFileSync(path.join('data','countries.json'), "utf8"));
var manufacturers = JSON.parse(fs.readFileSync(path.join('data','manufacters.json'), "utf8"));


var validate = function (vin) {
  if (vin.length == 0)
    return false;

  if (vin.length != 17)
    return false;

  return true;
};

var split = function(vin) {
  var INDEXES = {
    MADE_IN_START: 0,
    MADE_IN_END: 2,
    MANUFACTURER_START: 0,
    MANUFACTURER_END: 3,
    DETAILS_START: 3,
    DETAILS_END: 8,
    SECURITY_CODE: 8,
    YEAR: 9,
    ASSEMBLY_PLANT: 10,
    SERIAL_NUMBER_START: 11
  };

  var rawInfo = {
    madeIn: vin.substring(INDEXES.MADE_IN_START,INDEXES.MADE_IN_END),
    manufacturer: vin.substring(INDEXES.MANUFACTURER_START,INDEXES.MANUFACTURER_END),
    details: vin.substring(INDEXES.DETAILS_START,INDEXES.DETAILS_END),
    securityCode: vin.charAt(INDEXES.SECURITY_CODE),
    year: vin.charAt(INDEXES.YEAR),
    assemblyPlant: vin.charAt(INDEXES.ASSEMBLY_PLANT),
    serialNumber: vin.substring(INDEXES.SERIAL_NUMBER_START)
  };

  return rawInfo;
};


var lookup = function(keyName, key, elements) {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element[keyName] == key)
      return element;
  }

  return '';
};

var getCountry = function(countryCode) {
  var country = lookup('code',countryCode, countries);
  return country.name;
};

var getManufacturer = function(manufacturerCode) {
  var manufacturer = lookup('code', manufacturerCode, manufacturers);
  return manufacturer.name;
};

var decode = function(vin) {
  var codeValues = split(vin);

  var carInfo = {
    country: getCountry(codeValues.madeIn),
    serialNumber: codeValues.serialNumber,
    manufacturer: getManufacturer(codeValues.manufacturer)
  };

  return carInfo;
};

module.exports = {
  validate: validate,
  split: split,
  decode: decode
};
