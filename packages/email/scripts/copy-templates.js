/**
 * 템플릿 파일(.hbs)을 dist 디렉토리로 복사하는 스크립트
 * Windows/Linux/Mac 모두 호환
 */

import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = join(__dirname, '../src/templates/files');
const destDir = join(__dirname, '../dist/templates/files');

try {
  // 대상 디렉토리 생성 (재귀적으로)
  mkdirSync(destDir, { recursive: true });
  console.log(`✓ Created directory: ${destDir}`);

  // .hbs 파일들 복사
  const files = readdirSync(srcDir).filter((file) => file.endsWith('.hbs'));

  files.forEach((file) => {
    const srcPath = join(srcDir, file);
    const destPath = join(destDir, file);
    copyFileSync(srcPath, destPath);
    console.log(`✓ Copied: ${file}`);
  });

  console.log(`\n✓ Successfully copied ${files.length} template file(s)`);
} catch (error) {
  console.error('✗ Error copying templates:', error.message);
  process.exit(1);
}
