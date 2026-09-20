import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import {
  findEntryBySlug,
  getPexelsApiKey,
  pexelsRequest,
  PEXELS_PHOTO,
  readCandidates,
  ROOT,
  setFrontmatterImagem,
  upsertCredito,
} from './lib-pexels.mjs';

const args = process.argv.slice(2).filter((arg) => arg !== '--');
const help = args.includes('--help') || args.includes('-h');

if (help || args.length === 0) {
  console.log(`Uso: pnpm baixar-imagem {slug} {id}

Exemplos:
  pnpm baixar-imagem jardins 123456
  pnpm baixar-imagem pia 987654

O id deve ser um dos candidatos gerados por pnpm buscar-imagens.
`);
  process.exit(help ? 0 : 1);
}

const [slug, photoIdRaw] = args;
const photoId = Number(photoIdRaw);

if (!slug || !photoIdRaw) {
  console.error('Informe slug e id da foto. Ex.: pnpm baixar-imagem jardins 123456');
  process.exit(1);
}

if (!Number.isFinite(photoId)) {
  console.error(`Id inválido: "${photoIdRaw}". Use o número da foto na Pexels.`);
  process.exit(1);
}

const entry = findEntryBySlug(slug);
if (!entry) {
  console.error(`Nenhuma entry encontrada com slug "${slug}" em bairros ou servicos.`);
  process.exit(1);
}

const candidatos = readCandidates(slug);
if (candidatos) {
  const escolhida = candidatos.candidatos?.find((item) => Number(item.id) === photoId);
  if (!escolhida) {
    const ids = (candidatos.candidatos ?? []).map((item) => item.id).join(', ') || 'nenhum';
    console.error(`O id ${photoId} não está nos candidatos de ${slug}. Ids disponíveis: ${ids}`);
    process.exit(1);
  }
} else {
  console.warn(
    `Aviso: .pexels-candidatos/${slug}.json não encontrado. Baixando o id ${photoId} direto da API.`,
  );
}

const apiKey = getPexelsApiKey();
const photo = await pexelsRequest(`${PEXELS_PHOTO}/${photoId}`, apiKey);
const originalUrl = photo.src?.original;

if (!originalUrl) {
  console.error(`A foto ${photoId} não retornou URL original.`);
  process.exit(1);
}

console.log(`Baixando original de ${photo.photographer}…`);
const imageResponse = await fetch(originalUrl);
if (!imageResponse.ok) {
  console.error(`Falha ao baixar a original (${imageResponse.status}).`);
  process.exit(1);
}

const buffer = Buffer.from(await imageResponse.arrayBuffer());
const assetRelative = `${entry.tipo}/${entry.slug}.jpg`;
const assetPath = join(ROOT, 'src', 'assets', assetRelative);
const ogDir = join(ROOT, 'public', 'images', 'og');
const ogPath = join(ogDir, `${entry.slug}.jpg`);

mkdirSync(join(ROOT, 'src', 'assets', entry.tipo), { recursive: true });
mkdirSync(ogDir, { recursive: true });

await sharp(buffer)
  .rotate()
  .resize(1600, 900, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(assetPath);

await sharp(buffer)
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(ogPath);

setFrontmatterImagem(entry.filePath, assetRelative);
upsertCredito({
  slug: entry.slug,
  fotografo: photo.photographer,
  id: photo.id,
});

console.log(`Salvo: src/assets/${assetRelative}`);
console.log(`OG: public/images/og/${entry.slug}.jpg`);
console.log(`Frontmatter atualizado: imagem: ${assetRelative}`);
console.log(`Crédito: foto de ${photo.photographer} — ${photo.url}`);
if (photo.photographer_url) {
  console.log(`Fotógrafo: ${photo.photographer_url}`);
}
