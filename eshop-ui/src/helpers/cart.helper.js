/** Function to count the number of items in the array. */
export const countItems = (arr) => {
  // Use reduce to create a frequency map
  const itemFrequencyMap = arr.reduce((acc, item) => {
    // Increment the count for the current item
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return itemFrequencyMap;
}

/** Function to get the unique items in an array. */
export const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
}
