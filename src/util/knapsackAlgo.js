// Returns the indexes that can be put in the bag
const knapsackAlog = (items, maxWeight) => {
  const possibleSolutions = prepItems(items).filter(
    (item) => item.weight < maxWeight + 1
  );
  if (possibleSolutions.length === 0) return 0;
  // stores Id's of the already used combinations
  const combinationsUsed = [];
  // Iterate for every valid combination
  [...possibleSolutions].forEach((item) => {
    [...possibleSolutions].forEach((combinationToCompare) => {
      // check id already used in the combinations or not
      if (combinationToCompare.idGroup.includes(item.id)) {
        return false;
      }
      // Check if exact combination already used or not
      const idGroup = [item.id, ...combinationToCompare.idGroup];
      if (checkIfComboHasBeenUsed(combinationsUsed, idGroup).includes(true)) {
        return false;
      } else {
        combinationsUsed.push(idGroup);
      }

      // Add to possible solution list if the combination is valid
      const combinedItem = combineItems(item, combinationToCompare, idGroup);
      if (combinedItem.weight < maxWeight + 1) {
        possibleSolutions.push(combinedItem);
      }
    });
  });

  return retrieveBestSolution(possibleSolutions, items);
};

const compareSolutions = (a, b) => {
  if (a.value < b.value) {
    return -1;
  }
  if (a.value > b.value) {
    return 1;
  }
  return 0;
};

const checkIfComboHasBeenUsed = (comboList, idGroup) =>
  comboList.map((combo) => combo.every((id) => idGroup.includes(id)));

const combineItems = (item, itemToCompare, idGroup) => {
  return {
    value: item.value + itemToCompare.value,
    weight: item.weight + itemToCompare.weight,
    idGroup,
  };
};

const retrieveBestSolution = (possibleSolutions, items) => {
  // For getting best possible solution
  let indexesToBeUsed = "";
  const highestValueSolution = possibleSolutions
    .sort(compareSolutions)
    .reverse()[0];

  // collecting combinations from best possible solutions
  highestValueSolution.idGroup.forEach((id,index) => {
    const matchedItem = items.find((item) => item.id == id);
    if (index == 0) indexesToBeUsed = matchedItem.id;
    else indexesToBeUsed += "," + matchedItem.id;
  });
  return indexesToBeUsed;
};

const prepItems = (items) =>
  items.map((item) => {
    // Add the idGroup property to each of the starting items
    item.idGroup = [item.id];
    return item;
  });

module.exports = { knapsackAlog };
