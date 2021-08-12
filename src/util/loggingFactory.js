const path = require("path");
var winston = require("winston");
const constants = require("../constants/constant");
const appDir = path.dirname(require.main.filename);
var winston = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(
        appDir,
        constants.ParentDirectory,
        constants.LogFile
      ),
    }),
  ],
});
module.exports = winston;
