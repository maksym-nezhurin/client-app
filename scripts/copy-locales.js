#!/usr/bin/env node
/* eslint-disable no-console */

const { cpSync, existsSync, realpathSync, mkdirSync, readdirSync } = require('fs');
const { join } = require('path');

console.log('🔍 [copy-locales] Starting translation files copy...');

const possibleSourcePaths = [
  join(__dirname, '../../../packages/i18n/locales'),
  join(__dirname, '../../../node_modules/@reelo/i18n/locales'),
  join(__dirname, '../../node_modules/@reelo/i18n/locales'),
  join(__dirname, '../node_modules/@reelo/i18n/locales'),
  '/node_modules/@reelo/i18n/locales',
  join(__dirname, '../../../../node_modules/@reelo/i18n/locales'),
];

const targetPath = join(__dirname, '../public/locales');

let sourcePath = null;
for (const path of possibleSourcePaths) {
  try {
    if (existsSync(path)) {
      const resolvedPath = realpathSync(path);
      if (existsSync(resolvedPath)) {
        const files = readdirSync(resolvedPath);
        if (files.length > 0) {
          sourcePath = resolvedPath;
          break;
        }
      }
    }
  } catch (error) {
    continue;
  }
}

if (sourcePath && existsSync(sourcePath)) {
  try {
    mkdirSync(targetPath, { recursive: true });
    cpSync(sourcePath, targetPath, { recursive: true, force: true });
    const copiedFiles = readdirSync(targetPath);
    console.log(`✅ [copy-locales] Copied ${copiedFiles.length} language directories.`);
  } catch (error) {
    console.error('❌ [copy-locales] ERROR: Could not copy translation files');
    console.error('   → Error:', error.message);
    process.exit(1);
  }
} else {
  console.warn('⚠️  [copy-locales] WARNING: @reelo/i18n locales not found.');
  console.warn('   → Make sure the package is installed: pnpm install');
}