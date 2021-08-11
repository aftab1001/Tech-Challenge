const fs = require("fs");

describe("File I/O", function () {
  let outputFileName;
  var content =
    "81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)";

  before(function () {
    outputFileName = __dirname + "/../test.txt";
  });

  it("should write to file", function (done) {
    fs.writeFile(outputFileName, content, function (err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
