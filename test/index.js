var should = require('chai').should();
var vinDecoder = require('../index');
var validate = vinDecoder.validate;
var split = vinDecoder.split;
var decode = vinDecoder.decode;


describe('#validate', function(){
  it('validate the length not to be empty',function(){
    validate('').should.equal(false);
  });

  it('validate the length to be 17',function(){
    validate('1NXBR32E77Z92360').should.equal(false);
  });

  it('validate the length to be 17',function(){
    validate('1NXBR32E77Z923602').should.equal(true);
  });
});

describe('#split',function(){
  it('split the vehicle year code',function(){
    split('1NXBR32E77Z923602').year.should.equal('7');
  });

  it('split the vehicle security code',function(){
    split('1NXBR32E77Z923602').securityCode.should.equal('7');
  });

  it('split the vehicle assembly plant code',function(){
    split('1NXBR32E77Z923602').assemblyPlant.should.equal('Z');
  });

  it('split the vehicle made in code',function(){
    split('1NXBR32E77Z923602').madeIn.should.equal('1N');
  });

  it('split the vehicle manufacturer code',function(){
    split('1NXBR32E77Z923602').manufacturer.should.equal('1NX');
  });

  it('split the vehicle details code',function(){
    split('1NXBR32E77Z923602').details.should.equal('BR32E');
  });

  it('split the vehicle serial number code',function(){
    split('1NXBR32E77Z923602').serialNumber.should.equal('923602');
  });
});

describe('#decode', function(){
  it('decode the vehicle country of origin', function(){
    decode('1NXBR32E77Z923602').country.should.equal('United States');
  });

  it('decode the vehicle serial number',function(){
    decode('1NXBR32E77Z923602').serialNumber.should.equal('923602');
  });

  it('decode the vehicle manufacturer',function(){
    decode('1NXBR32E77Z923602').manufacturer.should.equal('NUMMI USA');
  });
});
