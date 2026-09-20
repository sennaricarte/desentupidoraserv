import type { ImageMetadata } from 'astro';

const assetImages = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/**/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

export function resolveAssetImage(path?: string): ImageMetadata | undefined {
  if (!path) {
    return undefined;
  }

  const normalized = path.replace(/^\/+/, '').replace(/^src\/assets\//, '');

  const match = Object.entries(assetImages).find(([key]) => {
    const relative = key.replace(/^\.\.\//, '').replace(/^assets\//, '');
    return relative === normalized || key.endsWith(`/${normalized}`) || key.endsWith(normalized);
  });

  return match?.[1].default;
}

export function toPublicImagePath(path?: string): string | undefined {
  if (!path) {
    return undefined;
  }

  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path;
  }

  return `/images/${path}`;
}

export function toOgImagePath(slug?: string, imagem?: string): string | undefined {
  if (!slug || !imagem) {
    return undefined;
  }

  return `/images/og/${slug}.jpg`;
}
