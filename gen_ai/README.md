# Quick Sort Documentation

## Overview

This project now uses an optimized quick sort implementation in [demo.js](/home/waleed/iti_tasks/gen_ai/demo.js). The public behavior is unchanged: `quickSort(array)` returns a sorted copy and does not mutate the original input.

The new version improves performance and memory usage by:

- making one copy of the input array instead of creating `left` and `right` arrays on every recursive call
- sorting that copy in place with swaps
- using median-of-three pivot selection to reduce bad partitions on sorted or nearly sorted input
- recursing into the smaller partition first and handling the larger one in a loop to keep recursion depth lower

## Current Optimized Version

```js
function quickSort(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array");
  }

  const result = [...array];

  if (result.length <= 1) {
    return result;
  }

  quickSortRange(result, 0, result.length - 1);
  return result;
}

function quickSortRange(array, low, high) {
  while (low < high) {
    const pivotIndex = partition(array, low, high);
    const leftSize = pivotIndex - low;
    const rightSize = high - pivotIndex;

    if (leftSize < rightSize) {
      quickSortRange(array, low, pivotIndex - 1);
      low = pivotIndex + 1;
    } else {
      quickSortRange(array, pivotIndex + 1, high);
      high = pivotIndex - 1;
    }
  }
}
```

## How The Optimized Version Works

### 1. Input validation

`quickSort` first checks that the input is an array. If not, it throws a `TypeError`.

### 2. Single upfront copy

Instead of building new arrays during every recursive step, the function creates one copy:

```js
const result = [...array];
```

This keeps the original input unchanged while allowing the algorithm to sort the copy in place.

### 3. In-place partitioning

The helper functions rearrange values inside the same array. Elements smaller than the pivot are moved to the left side, and the pivot is placed in its final sorted position.

This avoids repeatedly allocating:

- `left`
- `right`
- temporary merged arrays from spread syntax on every recursive return

### 4. Better pivot selection

The optimized version uses median-of-three pivot selection:

- first element
- middle element
- last element

It chooses the median of those three values as the pivot. This usually produces more balanced partitions than always choosing the first element.

That matters because poor pivot selection is a common reason quick sort slows down to worst-case behavior.

### 5. Lower recursion depth

The helper `quickSortRange` always recurses into the smaller partition first, then continues with the larger partition using the `while` loop.

That reduces stack growth. In practice this makes the algorithm safer for larger arrays because it avoids building a deep recursive chain when partitions are uneven.

## Why This Version Is Faster

Compared with the previous version, the optimized implementation is faster mainly because it:

- allocates much less memory
- performs fewer array copies
- avoids repeated spread operations like `[..., pivot, ...]`
- handles sorted and reverse-sorted inputs more robustly because of improved pivot selection

## Memory Usage Improvements

The previous version created new sub-arrays during every recursive call. That is simple to read, but it increases memory usage significantly.

The new implementation:

- creates one copied array at the start
- reorders values inside that same array
- uses only a small number of helper variables during partitioning

This is the main memory optimization in the current version.

## Recursion Optimization

The new implementation still uses recursion, but in a more controlled way.

The important optimization is:

- recurse on the smaller partition
- continue iterating on the larger partition

This pattern reduces the maximum call stack depth compared with a naive recursive quick sort.

## Example

Input:

```js
[10, 7, 8, 9, 1, 5]
```

Output:

```js
[1, 5, 7, 8, 9, 10]
```

The original input array is unchanged.

## Outdated Version

The following version is kept for reference only. It is easier to understand, but it is less efficient and should be considered outdated.

```js
function quickSort(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array");
  }

  if (array.length <= 1) {
    return [...array];
  }

  const [pivot, ...rest] = array;
  const left = [];
  const right = [];

  for (const value of rest) {
    if (value < pivot) {
      left.push(value);
    } else {
      right.push(value);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

### Why The Old Version Is Outdated

- It always picked the first element as the pivot.
- It created `left` and `right` arrays on every recursive call.
- It created additional arrays again during the final merge with spread syntax.
- It was more likely to perform poorly on already sorted or reverse-sorted input.
- It used more memory overall.

## Complexity

### Time complexity

- Best case: `O(n log n)`
- Average case: `O(n log n)`
- Worst case: `O(n^2)`

The optimized pivot strategy helps reduce the chance of the worst case, but quick sort still has worst-case `O(n^2)` behavior in theory.

### Space complexity

- Current optimized version: much lower auxiliary allocation than the outdated version because sorting is done in place on the copied array
- Outdated version: higher auxiliary memory usage because it creates new arrays at every level

## QuickSort vs MergeSort vs HeapSort

| Algorithm | Best Time | Average Time | Worst Time | Extra Space | Notes |
| --- | --- | --- | --- | --- | --- |
| QuickSort | `O(n log n)` | `O(n log n)` | `O(n^2)` | `O(log n)` stack for in-place versions, or higher if additional copies are made | Usually very fast in practice, but pivot choice matters |
| MergeSort | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` | Stable and predictable, but needs extra memory |
| HeapSort | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(1)` auxiliary space | In-place and worst-case safe, but often slower in practice than QuickSort |

### Summary Of Tradeoffs

- QuickSort is usually the fastest in real-world average cases because of good cache behavior and low constant overhead, but it can degrade to `O(n^2)` in the worst case.
- MergeSort gives guaranteed `O(n log n)` time and is stable, which makes it a strong choice when predictable performance or stable ordering matters.
- HeapSort also guarantees `O(n log n)` time and uses very little extra memory, but it tends to have weaker constant-factor performance than QuickSort.

### Which One To Choose

- Choose QuickSort when average-case speed is the main goal and you can use a good pivot strategy.
- Choose MergeSort when you need stable sorting or guaranteed `O(n log n)` behavior.
- Choose HeapSort when you need in-place sorting with guaranteed `O(n log n)` time and want to avoid large extra memory allocations.

## Running The Tests

Use Node's built-in test runner:

```bash
node --test demo.test.js
```

## Running The Benchmark

Use the benchmark script to compare this QuickSort implementation against JavaScript's built-in numeric sort:

```bash
node benchmark.js
```

The benchmark:

- measures average runtime over multiple runs
- compares random, sorted, reverse-sorted, and low-uniqueness inputs
- verifies both implementations produce identical sorted output before reporting timings

The tests cover:

- unsorted input
- duplicate values
- sorted input
- reverse-sorted input
- empty and single-item arrays
- non-mutation of the original input
- invalid input handling
