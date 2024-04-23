const ordinarySolution = (arr, target) => {
  for(let i=0; i< arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
}

const binarySearch1 = (target, start, end) => {
  // Recursive Version
  if (start > end) {
    return 'Not Found';
  }

  const middle = Math.floor((start + end) / 2);

  if(arr[middle] === target) {
    return `Found it at index ${middle}`;
  }

  if(arr[middle] > target) {
    return binarySearch1(target, start, middle -1);
  }

  if(arr[middle] < target) {
    return binarySearch1(target, middle + 1, end);
  }
}

function binarySearch2(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) {
          return mid; // Found the target
      } else if (arr[mid] < target) {
          left = mid + 1; // Search the right half
      } else {
          right = mid - 1; // Search the left half
      }
  }

  return -1; // Target not found
}


function rubyCode() {
  /** Ruby code inside JS code
   * 
   * def binary_search(arr, target)
      left = 0
      right = arr.length - 1

      while left <= right
        mid = (left + right) / 2
        mid_value = arr[mid]

        if mid_value == target
          return mid  # Target found, return its index
        elsif mid_value < target
          left = mid + 1  # Discard the left half
        else
          right = mid - 1  # Discard the right half
        end
      end

      return nil  # Target not found
    end
   */
}
