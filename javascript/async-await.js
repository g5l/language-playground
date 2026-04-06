import {heading, subTitle} from "./logger.js";

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error(`Invalid user id: ${id}`));
      resolve({ id, name: `User_${id}`, role: 'engineer' });
    }, 150);
  });
}

function fetchPosts(userName) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { title: `${userName}'s first post`, likes: 12 },
        { title: `${userName}'s second post`, likes: 37 },
      ]);
    }, 100);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async () => {

  heading('Async / Await');

  // 1. An async function always returns a Promise
  subTitle('1. Basics');

  async function greet(name) {
    return `Hello, ${name}`;
  }

  const result = greet('Gabriel');
  console.log('Return type:', result)
  console.log('Awaited value:', await result);

  // 2. Pauses until the promise settles
  subTitle('2. Await pauses execution');

  const user = await fetchUser(1);
  console.log('User:', user.name);

  const posts = await fetchPosts(user.name);
  console.log('Posts:', posts);

  subTitle('3. Error handling');

  try {
    const badUser = await fetchUser(-1);
    console.log(badUser);
  } catch (err) {
    console.log('Caught:', err.message);
  } finally {
    console.log('Cleanup runs regardless');
  }

  subTitle('4. Await in loops');

  const ids = [1, 2, 3];
  const users = [];
  for (const id of ids) {
    users.push(await fetchUser(id));
  }
  console.log('for...of results:', users.map(u => u.name));
})()