module.exports = {
  validate: function (vin) {
    if (vin.length == 0)
      return false;

    if (vin.length != 17)
      return false;

    return true;
  }
};
