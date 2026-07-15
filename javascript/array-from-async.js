// Like Array.from(), but works with async iterables and resolves Promises in the source.

// 1. Async iterable (async generator)
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise(resolve => setTimeout(resolve, 10));
    yield i;
  }
}

const fromAsyncGenerator = await Array.fromAsync(asyncRange(1, 5));
const nonAsyncArray = await Array.from(asyncRange(1, 5));
console.log({ fromAsyncGenerator, nonAsyncArray }); // { fromAsyncGenerator: [ 1, 2, 3, 4, 5 ], nonAsyncArray: [] }

// 2. Sync iterable of Promises
// Each element is awaited before being added to the result array.
const promises = [Promise.resolve(10), Promise.resolve(20), Promise.resolve(30)];
const fromPromises = await Array.fromAsync(promises);
console.log({ fromPromises, promises2 }); // [10, 20, 30]

// 3. Map function (second argument)
// Applied after each value is awaited, just like Array.from()'s mapFn.
const doubled = await Array.fromAsync(asyncRange(1, 4), x => x * 2);
console.log({ doubled }); // [2, 4, 6, 8]

// The map function can itself be async.
async function fetchMock(id) {
  await new Promise(resolve => setTimeout(resolve, 5));
  return { id, name: `item-${id}` };
}

const enriched = await Array.fromAsync([1, 2, 3], fetchMock);
console.log({ enriched });
// [{ id: 1, name: 'item-1' }, { id: 2, name: 'item-2' }, { id: 3, name: 'item-3' }]

// --- 4. Sync iterable (works just like Array.from, but returns a Promise) ---
const fromSync = await Array.fromAsync([4, 5, 6]);
console.log({ fromSync }); // [4, 5, 6]

// --- 5. Real-world: paginated async data source ---
async function* fetchPages() {
  const pages = [
    [{ id: 1 }, { id: 2 }],
    [{ id: 3 }, { id: 4 }],
    [{ id: 5 }],
  ];
  for (const page of pages) {
    await new Promise(resolve => setTimeout(resolve, 10));
    yield* page;
  }
}

const allItems = await Array.fromAsync(fetchPages());
console.log({ allItems }); // [{ id:1 }, { id:2 }, { id:3 }, { id:4 }, { id:5 }]

// --- 6. Difference from Promise.all(array.map(...)) ---
// Array.fromAsync processes values lazily (one at a time, in order).
// Promise.all starts all promises concurrently.
// Use Array.fromAsync when you need sequential, ordered, or backpressured async iteration.

async function* slowCounter() {
  for (let i = 0; i < 3; i++) {
    console.log(`  yielding ${i}`);
    yield i;
  }
}

console.log('Sequential consumption:');
const sequential = await Array.fromAsync(slowCounter());
console.log({ sequential }); // [0, 1, 2]
