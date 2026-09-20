import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const CANDIDATES_DIR = join(ROOT, '.pexels-candidatos');
export const CONTENT_DIR = join(ROOT, 'src', 'content');
export const PEXELS_SEARCH = 'https://api.pexels.com/v1/search';
export const PEXELS_PHOTO = 'https://api.pexels.com/v1/photos';

const QUERIES_SERVICO = {
  pia: 'clogged kitchen sink drain plumber',
  vaso: 'clogged toilet plumber drain',
  esgoto: 'sewer drain pipe plumber',
  ralo: 'bathroom floor drain plumbing',
  hidrojateamento: 'hydro jetting high pressure drain hose',
};

const QUERIES_BAIRRO = {
  jardins: 'drain cleaning plumbing tools',
  atalaia: 'plumber fixing drain pipe',
  farolandia: 'clogged sink plumber working',
  'treze-de-julho': 'copper plumbing pipes closeup',
  'sao-jose': 'residential plumber wrench pipes',
};

const QUERIES_BAIRRO_FALLBACK = [
  'plumber fixing drain pipe',
  'drain cleaning plumbing tools',
  'copper plumbing pipes closeup',
  'clogged sink plumber working',
  'residential plumber wrench pipes',
];

export function loadEnvFile() {
  const envPath = join(ROOT, '.env');
  if (!existsSync(envPath)) {
    return;
  }

  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separator = trimmed.indexOf('=');
    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

export function getPexelsApiKey() {
  loadEnvFile();
  const key = process.env.PEXELS_API_KEY?.trim();
  if (!key) {
    throw new Error(
      'PEXELS_API_KEY não encontrada. Crie um arquivo .env na raiz com PEXELS_API_KEY=sua_chave.',
    );
  }
  return key;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error('Arquivo Markdown sem frontmatter YAML.');
  }

  /** @type {Record<string, string>} */
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return data;
}

export function listCollectionEntries() {
  /** @type {Array<{ tipo: 'bairros' | 'servicos'; slug: string; nome: string; imagem?: string; filePath: string }>} */
  const entries = [];

  for (const tipo of /** @type {const} */ (['bairros', 'servicos'])) {
    const folder = join(CONTENT_DIR, tipo);
    if (!existsSync(folder)) {
      continue;
    }

    for (const fileName of readdirSync(folder).filter((name) => name.endsWith('.md'))) {
      const filePath = join(folder, fileName);
      const data = parseFrontmatter(readFileSync(filePath, 'utf8'));
      const slug = data.slug || fileName.replace(/\.md$/, '');
      entries.push({
        tipo,
        slug,
        nome: data.nome || slug,
        imagem: data.imagem?.trim() || undefined,
        filePath,
      });
    }
  }

  return entries;
}

export function findEntryBySlug(slug) {
  return listCollectionEntries().find((entry) => entry.slug === slug);
}

export function queryForEntry(entry) {
  if (entry.tipo === 'servicos' && QUERIES_SERVICO[entry.slug]) {
    return QUERIES_SERVICO[entry.slug];
  }

  if (entry.tipo === 'bairros' && QUERIES_BAIRRO[entry.slug]) {
    return QUERIES_BAIRRO[entry.slug];
  }

  const index = Math.abs(hashString(entry.slug)) % QUERIES_BAIRRO_FALLBACK.length;
  return QUERIES_BAIRRO_FALLBACK[index];
}

function hashString(value) {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return hash;
}

export async function pexelsRequest(url, apiKey) {
  const response = await fetch(url, {
    headers: { Authorization: apiKey },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Pexels API ${response.status} em ${url}: ${body.slice(0, 240)}`);
  }

  return response.json();
}

export function candidatePath(slug) {
  return join(CANDIDATES_DIR, `${slug}.json`);
}

export function readCandidates(slug) {
  const filePath = candidatePath(slug);
  if (!existsSync(filePath)) {
    return null;
  }
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

export function writeCandidates(payload) {
  mkdirSync(CANDIDATES_DIR, { recursive: true });
  writeFileSync(candidatePath(payload.slug), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

export function setFrontmatterImagem(filePath, imagemPath) {
  const raw = readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error(`Sem frontmatter em ${filePath}`);
  }

  const block = match[1];
  const nextBlock = /^imagem:/m.test(block)
    ? block.replace(/^imagem:.*$/m, `imagem: ${imagemPath}`)
    : `${block}\nimagem: ${imagemPath}`;

  writeFileSync(filePath, raw.replace(block, nextBlock), 'utf8');
}

export function upsertCredito({ slug, fotografo, id }) {
  const creditsPath = join(ROOT, 'CREDITOS-IMAGENS.md');
  const header = `# Créditos das imagens

Registro de atribuição das fotos baixadas da Pexels. A Pexels não exige atribuição obrigatória, mas mantemos o crédito de cada fotógrafo.

`;
  const line = `- ${slug}: foto de ${fotografo} (pexels.com/photo/${id})`;
  const current = existsSync(creditsPath) ? readFileSync(creditsPath, 'utf8') : header;
  const lines = current.trimEnd().split(/\r?\n/);
  const filtered = lines.filter((item) => !item.startsWith(`- ${slug}:`));
  const withoutTrailingBlank = filtered.at(-1) === '' ? filtered.slice(0, -1) : filtered;
  writeFileSync(creditsPath, `${withoutTrailingBlank.join('\n')}\n${line}\n`, 'utf8');
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
