const fs = require('fs');

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        __logger.error(`${constants.ErrorOcurred} ${err.message}`);
        reject();
      }
      resolve();
    });
  });
};

module.exports = { writeFile };
