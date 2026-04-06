function quickSort(array) {
  return sortWithQuickSort(array).sorted;
}

function quickSortSteps(array) {
  return sortWithQuickSort(array, { recordSteps: true });
}

function builtInSort(array) {
  validateArray(array);
  return [...array].sort((left, right) => left - right);
}

function builtInSortSteps(array) {
  validateArray(array);

  const initial = [...array];
  const sorted = builtInSort(array);

  return {
    sorted,
    steps: [initial, sorted],
  };
}

function sortWithQuickSort(array, options = {}) {
  validateArray(array);

  const result = [...array];
  const steps = options.recordSteps ? [[...result]] : null;

  if (result.length <= 1) {
    return options.recordSteps ? { sorted: result, steps } : { sorted: result };
  }

  quickSortRange(result, 0, result.length - 1, steps);

  return options.recordSteps ? { sorted: result, steps } : { sorted: result };
}

function validateArray(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array");
  }
}

function quickSortRange(array, low, high, steps) {
  while (low < high) {
    const pivotIndex = partition(array, low, high, steps);
    const leftSize = pivotIndex - low;
    const rightSize = high - pivotIndex;

    // Recurse into the smaller side first to keep the stack shallow.
    if (leftSize < rightSize) {
      quickSortRange(array, low, pivotIndex - 1, steps);
      low = pivotIndex + 1;
    } else {
      quickSortRange(array, pivotIndex + 1, high, steps);
      high = pivotIndex - 1;
    }
  }
}

function partition(array, low, high, steps) {
  const mid = low + Math.floor((high - low) / 2);
  const pivotIndex = medianOfThree(array, low, mid, high);
  const pivotValue = array[pivotIndex];

  swap(array, pivotIndex, high, steps);

  let storeIndex = low;

  for (let i = low; i < high; i += 1) {
    if (array[i] < pivotValue) {
      swap(array, i, storeIndex, steps);
      storeIndex += 1;
    }
  }

  swap(array, storeIndex, high, steps);
  return storeIndex;
}

function medianOfThree(array, a, b, c) {
  const first = array[a];
  const second = array[b];
  const third = array[c];

  if (
    (first <= second && second <= third) ||
    (third <= second && second <= first)
  ) {
    return b;
  }

  if (
    (second <= first && first <= third) ||
    (third <= first && first <= second)
  ) {
    return a;
  }

  return c;
}

function swap(array, left, right, steps) {
  if (left === right) {
    return;
  }

  const temp = array[left];
  array[left] = array[right];
  array[right] = temp;

  if (steps) {
    steps.push([...array]);
  }
}

if (typeof window !== "undefined") {
  window.quickSort = quickSort;
  window.quickSortSteps = quickSortSteps;
  window.builtInSort = builtInSort;
  window.builtInSortSteps = builtInSortSteps;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { builtInSort, builtInSortSteps, quickSort, quickSortSteps };
}

if (typeof require !== "undefined" && require.main === module) {
  const numbers = [10, 7, 8, 9, 1, 5];
  console.log(quickSort(numbers));
}
