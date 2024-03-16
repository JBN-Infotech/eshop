export const countOccurrences = (arr, targetItem) => {
  return arr ? arr.reduce((count, item) => (item === targetItem ? count + 1 : count), 0): [];
}

export const availableItems = (arr, targetItem) => {
  return targetItem.quantity - countOccurrences(arr, targetItem.id);
  
}
