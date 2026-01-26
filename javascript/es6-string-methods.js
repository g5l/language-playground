import {heading} from "logger.js";

const text = 'JavaScript is awesome';

heading('includes()');
console.log(text.includes('Script'));
console.log(text.includes('script'));
console.log(text.includes('is', 12));
console.log(text.includes('Java', 1));


const banned = ['spam', 'scam'];
const comment = 'This is spam content';
const hasBanned = banned.some(word => comment.toLowerCase().includes(word));
console.log('Has banned word:', hasBanned);


heading('startsWith()');

const url = 'https://example.com/api/users';
console.log(url.startsWith('https://'));
console.log(url.startsWith('http://'));
console.log(url.startsWith('example', 8));

const isSecure = url.startsWith('https://');
const isAbsolute = ['http://', 'https://', '//'].some(p => url.startsWith(p));
console.log('Is secure:', isSecure);
console.log('Is absolute:', isAbsolute);

const arg = '--verbose';
if (arg.startsWith('--')) {
  console.log('Long flag:', arg.slice(2)); // 'verbose'
} else if (arg.startsWith('-')) {
  console.log('Short flag:', arg.slice(1));
}

heading('endsWith()');

const filename = 'document.PDF';
console.log(filename.endsWith('.PDF'));
console.log(filename.endsWith('.pdf'));
console.log(filename.endsWith('ment', 8));

const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const isImage = imageExts.some(ext => filename.toLowerCase().endsWith(ext));
console.log('Is image:', isImage);

const email = 'alice@company.com';
const isCompanyEmail = email.endsWith('@company.com');
console.log('Is company email:', isCompanyEmail);

const ensureSlash = path => path.endsWith('/') ? path : path + '/';
console.log(ensureSlash('/api/users'));

heading('repeat()');

console.log('ha'.repeat(3));
console.log('🎉'.repeat(5));
console.log('ab'.repeat(0));
console.log('ab'.repeat(2.9));

const separator = '─'.repeat(40);
console.log(separator);

const indent = (text, level) => '  '.repeat(level) + text;
console.log(indent('nested item', 3)); 

const progressBar = (percent, width = 20) => {
  const filled = Math.round(width * percent / 100);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
};
console.log(`[${progressBar(75)}] 75%`);

const tree = levels => {
  let result = '';
  for (let i = 0; i < levels; i++) {
    result += ' '.repeat(levels - i - 1) + '*'.repeat(2 * i + 1) + '\n';
  }
  return result;
};
console.log(tree(4));
