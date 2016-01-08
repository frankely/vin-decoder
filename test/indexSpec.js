var should = require('chai').should();
var vinDecoder = require('../index');
var validate = vinDecoder.validate;


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
