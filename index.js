const fs = require('fs');
const path = require('path');

const countries = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'countries.json'), 'utf8')
);
const manufacturers = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'manufacturers.json'), 'utf8')
);

const validate = (vin, checksumParam) => {
  const splitVIN = vin.toLowerCase().split('');

  //  use 9th character when checksumParam is not set
  const checksum = checksumParam || splitVIN[8];

  let total = 0;

  for (let i = 0; i < splitVIN.length; i++) {
    let numValue = 0;
    let weight = 0;

    switch (splitVIN[i]) {
      case '0':
        numValue = 0;
        break;
      case '1':
      case 'a':
      case 'j':
        numValue = 1;
        break;
      case '2':
      case 'b':
      case 'k':
      case 's':
        numValue = 2;
        break;
      case '3':
      case 'c':
      case 'l':
      case 't':
        numValue = 3;
        break;
      case '4':
      case 'd':
      case 'm':
      case 'u':
        numValue = 4;
        break;
      case '5':
      case 'e':
      case 'n':
      case 'v':
        numValue = 5;
        break;
      case '6':
      case 'f':
      case 'w':
        numValue = 6;
        break;
      case '7':
      case 'g':
      case 'p':
      case 'x':
        numValue = 7;
        break;
      case '8':
      case 'h':
      case 'y':
        numValue = 8;
        break;
      case '9':
      case 'r':
      case 'z':
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

  for (const element of splitVIN) {
    total += element;
  }

  const lastFiveChars = splitVIN.splice(0, 12);
  for (const element of lastFiveChars) {
    if (!Number.isInteger(parseInt(element))) {
      return false;
    }
  }

  if (
    total % 11 === parseInt(checksum) ||
    (total % 11 === 10 && checksum === 'x')
  ) {
    return true;
  } else {
    return false;
  }
};

const split = (vin) => {
  const INDEXES = {
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

  const rawInfo = {
    madeIn: vin.substring(INDEXES.MADE_IN_START, INDEXES.MADE_IN_END),
    manufacturer: vin.substring(
      INDEXES.MANUFACTURER_START,
      INDEXES.MANUFACTURER_END
    ),
    details: vin.substring(INDEXES.DETAILS_START, INDEXES.DETAILS_END),
    securityCode: vin.charAt(INDEXES.SECURITY_CODE),
    year: vin.charAt(INDEXES.YEAR),
    assemblyPlant: vin.charAt(INDEXES.ASSEMBLY_PLANT),
    serialNumber: vin.substring(INDEXES.SERIAL_NUMBER_START)
  };

  return rawInfo;
};

const lookup = (keyName, key, elements) => {
  for (const element of elements) {
    if (element[keyName] == key) return element;
  }

  return '';
};

const getVinYear = (vin) => {
  const letters = 'ABCDEFGHJKLMNPRSTVWXY123456789';
  const yearStr = vin[10];

  const currentYear = new Date().getFullYear();
  const result = [];

  let yearCounter = 1980;
  let lettersCounter = 0;

  while (yearCounter !== currentYear) {
    const letter = letters[lettersCounter];

    if (letter == yearStr) {
      result.push(yearCounter);
    }

    if (lettersCounter == letters.length - 1) {
      lettersCounter = 0;
    } else {
      lettersCounter += 1;
    }

    yearCounter += 1;
  }

  result.sort().reverse();

  return result;
};

const getCountry = (countryCode) => {
  const country = lookup('code', countryCode, countries);
  return country.name;
};

const getManufacturer = (manufacturerCode) => {
  const manufacturer = lookup('code', manufacturerCode, manufacturers);
  return manufacturer.name;
};

const decode = (vin) => {
  const codeValues = split(vin);

  const carInfo = {
    country: getCountry(codeValues.madeIn),
    serialNumber: codeValues.serialNumber,
    manufacturer: getManufacturer(codeValues.manufacturer),
    modelYear: getVinYear(vin)
  };

  return carInfo;
};

module.exports = {
  validate: validate,
  split: split,
  decode: decode
};
