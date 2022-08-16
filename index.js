var fs = require('fs');
var path = require('path');

var countries = JSON.parse(fs.readFileSync(path.join('data','countries.json'), "utf8"));
var manufacturers = JSON.parse(fs.readFileSync(path.join('data','manufacters.json'), "utf8"));


var validate = function (vin) {
  let splitVIN = vin.split("");
  let total = 0;

  for (let i = 0; i < splitVIN.length; i++) {
    let numValue = 0;
    let weight = 0;

    switch(splitVIN[i]) {
      case "0":
        numValue = 0;
        break;
      case "1":
      case "a":
      case "j":
        numValue = 1;
        break;
      case "2":
      case "b":
      case "k":
      case "s":
        numValue = 2;
        break;
      case "3":
      case "c":
      case "l":
      case "t":
        numValue = 3;
        break;
      case "4":
      case "d":
      case "m":
      case "u":
        numValue = 4;
        break;
      case "5":
      case "e":
      case "n":
      case "v":
        numValue = 5;
        break;
      case "6":
      case "f":
      case "w":
        numValue = 6;
        break;
      case "7":
      case "g":
      case "p":
      case "x":
        numValue = 7;
        break;
      case "8":
      case "h":
      case "y":
        numValue = 8;
        break;
      case "9":
      case "r":
      case "z":
        numValue = 9;
        break;
      default:
        return false;
    }

    switch (i) {
      case 0:
        weight = 8;
        break;
      case 1:
        weight = 7;
        break;
      case 2:
        weight = 6;
        break;
      case 3:
        weight = 5;
        break;
      case 4:
        weight = 4;
        break;
      case 5:
        weight = 3;
        break;
      case 6:
        weight = 2;
        break;
      case 7:
        weight = 10;
        break;
      case 8:
        weight = 0;
        break;
      case 9:
        weight = 9;
        break;
      case 10:
        weight = 8;
        break;
      case 11:
        weight = 7;
        break;
      case 12:
        weight = 6;
        break;
      case 13:
        weight = 5;
        break;
      case 14:
        weight = 4;
        break;
      case 15:
        weight = 3;
        break;
      case 16:
        weight = 2;
        break;
      default:
        return false;
    }
    splitVIN.splice(i, 1, numValue * weight);
  }

  
  for (let j = 0; j < splitVIN.length; j++) {
    total += splitVIN[j];
  }

  const lastFive = vin.split("");
  lastFive.splice(0, 12);
  for (let k = 0; k < lastFive.length; k++) {
    if (!Number.isInteger(parseInt(lastFive[k]))) {
      return false;
    }
  }

  if (total % 11 === parseInt(VIN.split("")[8])) {
    return true;
  } else if (total % 11 === 10 && VIN.split("")[8] === "x") {
    return true;
  } else {
    return false;
  }

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
