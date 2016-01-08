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
      ASSEMBLY_PLANT: 9,
      YEAR: 8,
      SECURITY_CODE: 7
    };

    var rawInfo = {
      madeIn: '',
      manufacter: '',
      details: '',
      securityCode: vin.charAt(INDEXES.SECURITY_CODE),
      year: vin.charAt(INDEXES.YEAR),
      assemblyPlant: vin.charAt(INDEXES.ASSEMBLY_PLANT),
      serialNumber: ''
    };

    return rawInfo;
  }
};
