const test = require("node:test");
const assert = require("node:assert/strict");

const { builtInSort, builtInSortSteps, quickSort, quickSortSteps } = require("./demo");

test("sorts an unsorted array of numbers", () => {
  const input = [10, 7, 8, 9, 1, 5];
  const result = quickSort(input);

  assert.deepEqual(result, [1, 5, 7, 8, 9, 10]);
});

test("returns a new sorted array without mutating the original", () => {
  const input = [3, 2, 1];
  const original = [...input];
  const result = quickSort(input);

  assert.deepEqual(result, [1, 2, 3]);
  assert.deepEqual(input, original);
  assert.notStrictEqual(result, input);
});

test("handles duplicate values", () => {
  const input = [4, 2, 4, 1, 2, 3];
  const result = quickSort(input);

  assert.deepEqual(result, [1, 2, 2, 3, 4, 4]);
});

test("handles arrays where all values are equal", () => {
  const input = [5, 5, 5, 5, 5];
  const result = quickSort(input);

  assert.deepEqual(result, [5, 5, 5, 5, 5]);
  assert.deepEqual(input, [5, 5, 5, 5, 5]);
});

test("sorts negative numbers and zero correctly", () => {
  const input = [0, -10, 5, -3, 8, -1];
  const result = quickSort(input);

  assert.deepEqual(result, [-10, -3, -1, 0, 5, 8]);
});

test("sorts mixed small and large numbers correctly", () => {
  const input = [1000, 3, 500, 2, 9999, 0, -200];
  const result = quickSort(input);

  assert.deepEqual(result, [-200, 0, 2, 3, 500, 1000, 9999]);
});

test("handles already sorted arrays efficiently and correctly", () => {
  const input = [1, 2, 3, 4, 5, 6, 7];
  const result = quickSort(input);

  assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(input, [1, 2, 3, 4, 5, 6, 7]);
});

test("handles reverse-sorted arrays correctly", () => {
  const input = [7, 6, 5, 4, 3, 2, 1];
  const result = quickSort(input);

  assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7]);
});

test("handles many repeated pivot candidates correctly", () => {
  const input = [9, 1, 9, 2, 9, 3, 9, 4, 9, 5, 9];
  const result = quickSort(input);

  assert.deepEqual(result, [1, 2, 3, 4, 5, 9, 9, 9, 9, 9, 9]);
});

test("handles empty and single-item arrays", () => {
  assert.deepEqual(quickSort([]), []);
  assert.deepEqual(quickSort([42]), [42]);
});

test("sorts two-item arrays without reading past the end", () => {
  assert.deepEqual(quickSort([2, 1]), [1, 2]);
  assert.deepEqual(quickSort([1, 2]), [1, 2]);
});

test("records QuickSort visualization steps while preserving the final result", () => {
  const input = [3, 1, 2];
  const { sorted, steps } = quickSortSteps(input);

  assert.deepEqual(sorted, [1, 2, 3]);
  assert.deepEqual(steps[0], input);
  assert.deepEqual(steps.at(-1), sorted);
  assert.ok(steps.length >= 2);
});

test("built-in sort helper matches numeric sort and exposes start/end steps", () => {
  const input = [5, -1, 4, 0];
  const expected = [-1, 0, 4, 5];

  assert.deepEqual(builtInSort(input), expected);

  const { sorted, steps } = builtInSortSteps(input);
  assert.deepEqual(sorted, expected);
  assert.deepEqual(steps, [input, expected]);
});

test("matches JavaScript numeric sort on a larger dataset", () => {
  const input = [23, -4, 17, 0, 99, 12, -50, 8, 8, 42, 7, 19, -1, 3, 100, 56];
  const expected = [...input].sort((a, b) => a - b);

  assert.deepEqual(quickSort(input), expected);
});

test("throws a TypeError for non-array input", () => {
  assert.throws(() => quickSort("not-an-array"), {
    name: "TypeError",
    message: "Expected an array",
  });
});
