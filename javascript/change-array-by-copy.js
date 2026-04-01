import {heading, separator} from "./logger.js";

const tasks = [
  {id: 1, title: 'Setup CI/CD pipeline', priority: 2, status: 'done'},
  {id: 2, title: 'Write integration tests', priority: 1, status: 'in-progress'},
  {id: 3, title: 'Deploy to staging', priority: 3, status: 'todo'},
  {id: 4, title: 'Code review PR #42', priority: 1, status: 'todo'},
  {id: 5, title: 'Update API documentation', priority: 2, status: 'todo'},
];

heading('toSorted()');

const byPriority = tasks.toSorted((a, b) => a.priority - b.priority);
console.log(byPriority);

separator()

heading('toReversed()');

const newestFirst = tasks.toReversed();
console.log(newestFirst)

separator()

heading('toSpliced()'); 

const newSpliced = tasks.toSpliced(2, 1);
console.log(newSpliced);

const doneIndex =  tasks.findIndex(t => t.status === 'done');
const removedDone = tasks.toSpliced(doneIndex, 1);

console.log(removedDone);

separator()

heading('with()');

const taskIndex = tasks.findIndex(t => t.id === 3);
const afterStatusUpdate = tasks.with(taskIndex, {
  ...tasks[taskIndex],
  status: 'in-progress',
});

console.log(afterStatusUpdate);

separator()