const assert = require("assert");
const fs = require("fs");
const constants = require("../../constants/constant");

describe("File I/O", function () {
  let inputFileName;
  var content =
    "81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)";

  before(function () {
    inputFileName = __dirname + "/../../resources/test.txt";
  });

  it("should read from file", function (done) {
    fs.readFile(inputFileName, constants.Encoding, function (err, data) {
      if (err) {
        return done(err);
      }
      assert.equal(data, content);
      done();
    });
  });
});
