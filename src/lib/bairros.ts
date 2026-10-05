import { getCollection } from 'astro:content';

export async function getBairrosPublicados() {
  const bairros = await getCollection('bairros', ({ data }) => data.publicar !== false);
  return bairros.sort((a, b) => a.data.nome.localeCompare(b.data.nome, 'pt-BR'));
}
