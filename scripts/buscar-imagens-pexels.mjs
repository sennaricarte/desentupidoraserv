import {
  getPexelsApiKey,
  listCollectionEntries,
  pexelsRequest,
  PEXELS_SEARCH,
  queryForEntry,
  sleep,
  writeCandidates,
} from './lib-pexels.mjs';

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const help = args.includes('--help') || args.includes('-h');

if (help) {
  console.log(`Uso: pnpm buscar-imagens [--apply]

DRY-RUN (padrão): busca 5 candidatos na Pexels para cada entry sem campo imagem
e salva em .pexels-candidatos/{slug}.json. Não baixa originais.

--apply não seleciona nem baixa foto automaticamente. A escolha continua manual
via: pnpm baixar-imagem {slug} {id}
`);
  process.exit(0);
}

if (apply) {
  console.log(
    '--apply não baixa originais nem escolhe foto. Use pnpm baixar-imagem {slug} {id} depois de curar os candidatos.\n',
  );
}

const apiKey = getPexelsApiKey();
const pending = listCollectionEntries().filter((entry) => !entry.imagem);

if (pending.length === 0) {
  console.log('Todas as entries já têm o campo imagem preenchido. Nada a buscar.');
  process.exit(0);
}

console.log(`DRY-RUN: ${pending.length} entries sem imagem. Buscando 5 candidatos cada.\n`);

for (const [index, entry] of pending.entries()) {
  const query = queryForEntry(entry);
  const url = new URL(PEXELS_SEARCH);
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', '5');
  url.searchParams.set('page', String((Math.abs(hashSlug(entry.slug)) % 3) + 1));
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('locale', 'en-US');

  const data = await pexelsRequest(url, apiKey);
  const candidatos = (data.photos ?? []).map((photo) => ({
    id: photo.id,
    preview: photo.src?.medium ?? photo.src?.large,
    fotografo: photo.photographer,
    fotografo_url: photo.photographer_url,
    pagina: photo.url,
  }));

  writeCandidates({
    slug: entry.slug,
    tipo: entry.tipo,
    nome: entry.nome,
    query,
    gerado_em: new Date().toISOString(),
    candidatos,
  });

  console.log(`[${entry.tipo}/${entry.slug}] query="${query}" → ${candidatos.length} candidatos`);
  for (const candidato of candidatos) {
    console.log(`  - ${candidato.id} · ${candidato.fotografo} · ${candidato.pagina}`);
  }

  if (index < pending.length - 1) {
    await sleep(250);
  }
}

console.log('\nCandidatos salvos em .pexels-candidatos/. Abra os JSON e escolha o id visualmente.');
console.log('Depois rode: pnpm baixar-imagem {slug} {id}');

function hashSlug(value) {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return hash;
}
