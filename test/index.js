var should = require('chai').should();
var vinDecoder = require('../index');
var validate = vinDecoder.validate;
var split = vinDecoder.split;


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
});
