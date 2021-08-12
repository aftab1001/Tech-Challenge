const path = require("path");
const { readFile } = require("./readFile");
const { writeFile } = require("./writeFile");
const constants = require("../constants/constant");
const appDir = path.dirname(require.main.filename);

const pack = async (fileName) => {
  const packagesData = [];
  const capacityData = [];
  const data = await readFile(
    path.join(appDir, constants.ParentDirectory, fileName),
    (data) => {
      try {
        const lines = data.split("\n");
        let numberOfItems = 0;
        let maxCapacity = 0;

        for (let i = 0, length = lines.length; i < length; i++) {
          maxCapacity = parseFloat(lines[i].split(":")[0]);
          numberOfItems = lines[i].split(":")[1].trim().split(" ").length;
          const packageData = getSinglePackageData(lines[i], numberOfItems);
          capacityData.push(maxCapacity);
          packagesData.push(packageData);
        }
      } catch (exception) {
        __logger.error(`${constants.ErrorOcurred} ${exception.message}`);
      }
      return {
        packagesData: packagesData,
        capacityData: capacityData,
      };
    }
  );
  return data;
};
const getSinglePackageData = (currentLine, numberOfItems) => {
  const packageData = [];
  for (
    let lineDetailCounter = 0;
    lineDetailCounter < numberOfItems;
    lineDetailCounter++
  ) {
    const lineDetail = currentLine.match(/\(([^)]+)\)/g)[lineDetailCounter];
    const lineItems = lineDetail.replace(/[{()}]/g, "").split(",");
    packageData.push({
      id: parseFloat(lineItems[0]),
      value: parseFloat(lineItems[2].replace("€", "")),
      weight: parseFloat(lineItems[1]),
    });
  }
  return packageData;
};
const writeOutPutToFile = async (fileName, data) => {
  try {
    __logger.info(`Output ${data}`);
    await writeFile(
      path.join(
        appDir,
        constants.ParentDirectory,
        fileName
      ),
      data
    );
  } catch (e) {
    __logger.error(`${constants.ErrorOcurred} ${err.message}`);
  }
  return;
};

module.exports = { pack, writeOutPutToFile };
