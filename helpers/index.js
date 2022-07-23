const bcrypt = require("bcrypt");
module.exports = {
  async encrypt(data) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  },
  async verify(data, dataCompare) {
    const compare = await bcrypt.compare(data, dataCompare);
    return compare;
  },
};
