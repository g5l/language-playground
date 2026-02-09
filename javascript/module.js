import {heading} from "logger.js";

heading('Module');

// Ways to export 

export function add(a, b) {
  return a + b;
}

// or

function multiply(a, b) {
  return a * b;
}

export {multiply};

// Renaming on export

function multiply2(x) { return x * 2; }

export { multiply2 as double };

// Ways to import

// Basic
import { add } from './math.js';

// Rename on import
import { add as sum, multiply as mul } from './math.js';