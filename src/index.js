const { pack, writeOutPutToFile } = require('./util/packHandler');
const { knapsackAlog } = require('./util/knapsackAlgo');
const constants = require('./constants/constant');
let logger = require('./util/loggingFactory');
global.__logger = logger;

const runHandler = async () => {
  try {
    const testFile = process.argv.slice(2)[0];
    const { packagesData, capacityData } = await pack(testFile);
    let output = '';
    for (
      let pCounter = 0, length = packagesData.length;
      pCounter < length;
      pCounter++
    ) {
      const result = getBagPackItemsOutput(
        packagesData[pCounter],
        capacityData[pCounter]
      );
      output += `${result === 0 ? '-' : result}\n`;
    }

    await writeOutPutToFile(constants.OutputFileName, output);
  } catch (exception) {
    logger.error(`${constants.ErrorOcurred} ${exception.message}`);
  }
};
const getBagPackItemsOutput = (items, maxCapacity) => {
  return knapsackAlog(items, maxCapacity);
};
runHandler();
