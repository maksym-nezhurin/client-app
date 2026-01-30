import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const possibleSourcePaths = [
  join(process.cwd(), 'packages/i18n/locales'),
  join(process.cwd(), '../packages/i18n/locales'),
  join(process.cwd(), '../../packages/i18n/locales'),
  join(process.cwd(), 'node_modules/@reelo/i18n/locales'),
  join(process.cwd(), '../node_modules/@reelo/i18n/locales'),
  join(process.cwd(), '../../node_modules/@reelo/i18n/locales'),
];

function resolveLocalesPath(): string | null {
  for (const candidate of possibleSourcePaths) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lng: string; path: string[] }> }
) {
  const resolvedParams = await params;
  const basePath = resolveLocalesPath();
  if (!basePath) {
    return NextResponse.json({ message: 'Locales not found' }, { status: 404 });
  }

  const [fileName] = resolvedParams.path ?? [];
  if (!fileName) {
    return NextResponse.json({ message: 'Locale file missing' }, { status: 400 });
  }

  const namespace = fileName.endsWith('.json') ? fileName.slice(0, -5) : fileName;
  const filePath = join(basePath, resolvedParams.lng, `${namespace}.json`);

  try {
    const contents = await readFile(filePath, 'utf8');
    return new NextResponse(contents, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Locale file error:', error);
    return NextResponse.json({ message: 'Locale file not found' }, { status: 404 });
  }
}
