import {heading, subTitle} from "./logger.js";

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

subTitle('then() usage');

Promise.resolve(1)
  .then(x => x + 1)
  .then(x => x * 2)
  .then(x => x + 10)
  .then(x => console.log(x));


function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: 'Gabriel' }), 100);
  });
}

function getPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' }
    ]), 100);
  });
}

getUser(1)
  .then(user => {
    console.log('User:', user);
    return getPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts);
  });
