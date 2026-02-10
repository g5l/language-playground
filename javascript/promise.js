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

subTitle('Promise.any(iterable)')

const promise1 = Promise.reject(new Error("error"));
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

subTitle('Promise.all(iterable)')

// Dashboard requests
const fetchUser = () => Promise.resolve({ id: 1, name: 'Test' });
const fetchPosts = () => Promise.resolve([{ id: 1, title: 'Hello' }]);
const fetchSettings = () => Promise.resolve({ theme: 'dark' });

// Load all
Promise.all([fetchUser(), fetchPosts(), fetchSettings()])
  .then(([user, posts, settings]) => {
    console.log('Dashboard loaded:');
    console.log('User:', user.name);
    console.log('Posts:', posts.length);
    console.log('Theme:', settings.theme);
  })
  .catch(error => {
    console.error('Failed:', error);
  });
 
subTitle('Promise.race(iterable)')

const delay = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
const server1 = delay(300, 'Server 1');
const server2 = delay(100, 'Server 2');
const server3 = delay(200, 'Server 3');

// First to return (success or failure) "win"
Promise.race([server1, server2, server3])
  .then(fastest => console.log('Fastest:', fastest));  // 'Server 2'
