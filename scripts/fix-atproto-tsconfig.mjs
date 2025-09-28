#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';

const packages = ['@atproto+api', '@atproto+common-web', '@atproto+xrpc'];
const projectRoot = process.cwd();
const pnpmRoot = path.join(projectRoot, 'node_modules', '.pnpm');

const configContent = `${JSON.stringify(
  {
    compilerOptions: {
      composite: true,
      declaration: true,
      declarationMap: true,
      incremental: true,
      emitDeclarationOnly: false,
    },
  },
  null,
  2,
)}\n`;

async function ensureFile(filePath, content) {
  try {
    const existing = await fs.readFile(filePath, 'utf8');
    if (existing === content) {
      return false;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
  await fs.writeFile(filePath, content, 'utf8');
  return true;
}

async function main() {
  let updatedAny = false;
  let entries;
  try {
    entries = await fs.readdir(pnpmRoot, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return; // nothing to do if node_modules/.pnpm is missing
    }
    throw error;
  }

  for (const dirent of entries) {
    if (!dirent.isDirectory()) continue;
    const match = packages.some((pkg) => dirent.name.startsWith(`${pkg}@`));
    if (!match) continue;

    const tsconfigDir = path.join(pnpmRoot, dirent.name, 'node_modules', 'tsconfig');
    await fs.mkdir(tsconfigDir, { recursive: true });
    const filePath = path.join(tsconfigDir, 'isomorphic.json');
    const changed = await ensureFile(filePath, configContent);
    updatedAny ||= changed;
  }

  if (updatedAny) {
    console.log('Created missing @atproto tsconfig/isomorphic.json files.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
