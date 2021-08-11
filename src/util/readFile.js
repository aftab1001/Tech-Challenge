const fs = require('fs');
var constants = require('../constants/constant');

const readFile = async (path, cb) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, constants.Encoding, (err, data) => {
      if (err) {
        __logger.error(`${constants.ErrorOcurred} ${err.message}`);
        reject(err);
      }
      const response = cb(data);
      resolve(response);
    });
  });
};

module.exports = { readFile };
