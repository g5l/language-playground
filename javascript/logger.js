import util from 'node:util';

export const log = (value) =>
  console.log(util.inspect(value, { depth: null, colors: true }));

export const heading = (title) => console.log(`\n=== ${title} ===`);

export const subTitle = (title) => console.log(`\n-- ${title} --`);

export const separator = () => console.log('-'.repeat(100));

