const { performance } = require("node:perf_hooks");
const assert = require("node:assert/strict");

const { quickSort } = require("./demo");

const DATASET_SIZES = [100, 1_000, 10_000];
const RUNS_PER_CASE = 20;
const WARMUP_RUNS = 5;

function randomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 200_001) - 100_000);
}

function sortedArray(size) {
  return Array.from({ length: size }, (_, index) => index);
}

function reverseSortedArray(size) {
  return Array.from({ length: size }, (_, index) => size - index);
}

function fewUniqueArray(size) {
  return Array.from({ length: size }, (_, index) => index % 7);
}

const scenarios = [
  { name: "Random", create: randomArray },
  { name: "Sorted", create: sortedArray },
  { name: "Reverse", create: reverseSortedArray },
  { name: "Few Unique", create: fewUniqueArray },
];

function builtInSort(array) {
  return [...array].sort((left, right) => left - right);
}

function measure(sortFn, input) {
  const start = performance.now();
  const output = sortFn(input);
  const duration = performance.now() - start;
  return { duration, output };
}

function benchmarkCase(name, input) {
  const expected = builtInSort(input);
  assert.deepEqual(quickSort(input), expected);

  for (let run = 0; run < WARMUP_RUNS; run += 1) {
    quickSort(input);
    builtInSort(input);
  }

  let quickSortTotal = 0;
  let builtInTotal = 0;

  for (let run = 0; run < RUNS_PER_CASE; run += 1) {
    const quickSortResult = measure(quickSort, input);
    const builtInResult = measure(builtInSort, input);

    assert.deepEqual(quickSortResult.output, builtInResult.output);

    quickSortTotal += quickSortResult.duration;
    builtInTotal += builtInResult.duration;
  }

  return {
    name,
    size: input.length,
    quickSortMs: quickSortTotal / RUNS_PER_CASE,
    builtInMs: builtInTotal / RUNS_PER_CASE,
  };
}

function formatRow(result) {
  const ratio = result.quickSortMs / result.builtInMs;
  return [
    result.name.padEnd(12),
    String(result.size).padStart(8),
    result.quickSortMs.toFixed(3).padStart(14),
    result.builtInMs.toFixed(3).padStart(14),
    ratio.toFixed(2).padStart(10),
  ].join(" ");
}

function main() {
  const results = [];

  for (const scenario of scenarios) {
    for (const size of DATASET_SIZES) {
      results.push(benchmarkCase(scenario.name, scenario.create(size)));
    }
  }

  console.log("Average time in milliseconds");
  console.log("Scenario         Size    QuickSort ms   Built-in ms      Ratio");
  console.log("---------------------------------------------------------------");

  for (const result of results) {
    console.log(formatRow(result));
  }
}

main();
