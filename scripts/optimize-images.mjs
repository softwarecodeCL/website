import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';

const publicDir = 'public';
const validExt = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walk(full));
      continue;
    }

    if (validExt.has(extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }

  return files;
}

const files = await walk(publicDir);

for (const file of files) {
  const info = await stat(file);

  // Solo optimiza imágenes mayores a 300 KB
  if (info.size < 300 * 1024) continue;

  const output = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  await mkdir(dirname(output), { recursive: true });

  await sharp(file)
    .resize({
      width: 1920,
      withoutEnlargement: true,
    })
    .webp({
      quality: 78,
      effort: 6,
    })
    .toFile(output);

  console.log(`Optimizada: ${file} -> ${output}`);
}