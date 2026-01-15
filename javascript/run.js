import { readdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const EXCLUDED_FILES = ['run.js', 'logger.js'];

async function runFile(filePath) {
  return new Promise((resolve) => {
    const child = spawn('node', [filePath], { stdio: 'inherit' });
    child.on('close', resolve);
  });
}

async function main() {
  const specificFile = process.argv[2];

  if (specificFile) {
    const filePath = specificFile.endsWith('.js') ? specificFile : `${specificFile}.js`;
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Running: ${filePath}`);
    console.log('='.repeat(50));
    await runFile(join(__dirname, filePath));
    return;
  }

  const files = await readdir(__dirname);
  const jsFiles = files
    .filter(f => f.endsWith('.js') && !EXCLUDED_FILES.includes(f))
    .sort();

  for (const file of jsFiles) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Running: ${file}`);
    console.log('='.repeat(50));
    await runFile(join(__dirname, file));
  }
}

main();
