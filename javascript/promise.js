import {heading} from "logger.js";

heading('Promise');

// Basic Promise
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve('completed!');
  } else {
    reject(new Error('failed!'));
  }
});

promise.then(
  value => { /* success */ },
  error => { /* error (optional) */ }
);

promise.catch(error => {
  console.error('Error:', error);
});

// Same to:
promise.then(null, error => {
  console.error('Error:', error);
});

// Using finally
// let isLoading = true;
//
// fetchData()
//   .then(data => processData(data))
//   .catch(error => handleError(error))
//   .finally(() => {
//     isLoading = false;
//   });

