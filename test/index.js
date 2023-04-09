const should = require('chai').should();
const vinDecoder = require('../index');
const validate = vinDecoder.validate;
const split = vinDecoder.split;
const decode = vinDecoder.decode;

describe('#validate', () => {
  it('validate the length not to be empty', () => {
    validate('').should.equal(false);
  });

  it('validate the length to be 17', () => {
    validate('1NXBR32E77Z92360').should.equal(false);
  });

  it('validate the length to be 17', () => {
    validate('1NXBR32E77Z923602').should.equal(true);
  });
});

describe('#split', () => {
  it('split the vehicle year code', () => {
    split('1NXBR32E77Z923602').year.should.equal('7');
  });

  it('split the vehicle security code', () => {
    split('1NXBR32E77Z923602').securityCode.should.equal('7');
  });

  it('split the vehicle assembly plant code', () => {
    split('1NXBR32E77Z923602').assemblyPlant.should.equal('Z');
  });

  it('split the vehicle made in code', () => {
    split('1NXBR32E77Z923602').madeIn.should.equal('1N');
  });

  it('split the vehicle manufacturer code', () => {
    split('1NXBR32E77Z923602').manufacturer.should.equal('1NX');
  });

  it('split the vehicle details code', () => {
    split('1NXBR32E77Z923602').details.should.equal('BR32E');
  });

  it('split the vehicle serial number code', () => {
    split('1NXBR32E77Z923602').serialNumber.should.equal('923602');
  });
});

describe('#decode', () => {
  it('decode the vehicle country of origin', () => {
    decode('1NXBR32E77Z923602').country.should.equal('United States');
    console.log(decode('1NXBR32E77Z923602'));
  });

  it('decode the vehicle serial number', () => {
    decode('1NXBR32E77Z923602').serialNumber.should.equal('923602');
  });

  it('decode the vehicle manufacturer', () => {
    decode('1NXBR32E77Z923602').manufacturer.should.equal(
      'Toyota car made by NUMMI'
    );
  });
});
