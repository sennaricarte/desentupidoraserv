import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import negocio from '../data/negocio.json';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('Defina "site" em astro.config.mjs para gerar URLs absolutas no llms.txt.');
  }

  const { nome } = negocio;
  const { cidade, estado } = negocio.endereco;
  const url = (path: string) => new URL(path, site).href;

  const servicos = (await getCollection('servicos')).sort((a, b) => a.data.ordem - b.data.ordem);
  const bairros = (await getCollection('bairros')).sort((a, b) =>
    a.data.nome.localeCompare(b.data.nome, 'pt-BR'),
  );

  const linhas = [
    `# ${nome}`,
    '',
    `> Desentupidora em ${cidade}/${estado} com atendimento 24 horas, todos os dias, para desentupimento residencial e comercial.`,
    '',
    '## Serviços',
    '',
    ...servicos.map(
      ({ data }) => `- [${data.nome}](${url(`/servicos/${data.slug}/`)}): ${data.descricao}`,
    ),
    '',
    '## Bairros atendidos',
    '',
    ...bairros.map(
      ({ data }) =>
        `- [Desentupidora em ${data.nome}, ${cidade}](${url(`/desentupidora-em-${data.slug}/`)}): ${data.meta_descricao}`,
    ),
    '',
    '## Contato',
    '',
    `- [Página inicial](${url('/')})`,
    '',
  ];

  return new Response(linhas.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
