const assert = require("assert");
var bagPack = require("../../util/knapsackAlgo");

describe("knapSackAlog", function () {
  describe("Returns the indexes that can be put in the bag", function () {
    it("Should return 0 if the items are empty", function () {
      assert.equal(0, bagPack.knapsackAlog([], 0));
    });
    it("Should return 0 if package weight is large then capacity", function () {
      let items = [{ weight: 75, id: 1, value: 63 }];
      assert.equal(0, bagPack.knapsackAlog(items, 8));
    });
    it("Should return optimal index for a given package If There is only one optimal Index", function () {
      let items = [
        { weight: 53.38, id: 1, value: 45 },
        { weight: 88.62, id: 2, value: 98 },
        { weight: 78.48, id: 3, value: 3 },
        { weight: 72.3, id: 4, value: 76 },
        { weight: 30.18, id: 5, value: 9 },
        { weight: 46.34, id: 6, value: 48 },
      ];
      assert.equal(4, bagPack.knapsackAlog(items, 81));
    });

    it("Should return optimal comma seprated index for a given package If There are mor then one Indexes", function () {
      let items = [
        { weight: 90.72, id: 1, value: 13 },
        { weight: 33.8, id: 2, value: 40 },
        { weight: 43.15, id: 3, value: 10 },
        { weight: 37.97, id: 4, value: 16 },
        { weight: 46.81, id: 5, value: 36 },
        { weight: 48.77, id: 6, value: 79 },
        { weight: 81.8, id: 7, value: 45 },
        { weight: 19.36, id: 8, value: 79 },
        { weight: 6.76, id: 9, value: 64 },
      ];
      assert.equal(`8,9`, bagPack.knapsackAlog(items, 56));
    });
  });
});
