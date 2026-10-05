import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const colecoes = ['servicos', 'bairros'];
const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content');

function separarFrontmatter(texto) {
  const match = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return match ? { frontmatter: match[1], corpo: match[2] } : { frontmatter: '', corpo: texto };
}

function contarPalavras(markdown) {
  const texto = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`|~-]/g, ' ');

  return (texto.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) ?? []).length;
}

function contarFaq(frontmatter) {
  return (frontmatter.match(/^\s*-\s+pergunta\s*:/gm) ?? []).length;
}

for (const colecao of colecoes) {
  const pasta = path.join(raiz, colecao);
  const arquivos = (await readdir(pasta)).filter((nome) => nome.endsWith('.md')).sort();

  console.log(`\n${colecao}`);
  console.log(`${'arquivo'.padEnd(24)}${'palavras'.padStart(10)}${'faq'.padStart(6)}`);

  for (const arquivo of arquivos) {
    const { frontmatter, corpo } = separarFrontmatter(await readFile(path.join(pasta, arquivo), 'utf8'));
    console.log(
      `${arquivo.padEnd(24)}${String(contarPalavras(corpo)).padStart(10)}${String(contarFaq(frontmatter)).padStart(6)}`,
    );
  }
}
