import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bairros = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/bairros',
    generateId: ({ data }) => String(data.slug),
  }),
  schema: z.object({
    nome: z.string(),
    slug: z.string(),
    descricao: z.string(),
    titulo_seo: z.string(),
    meta_descricao: z.string().max(160),
    imagem: z.string().optional(),
  }),
});

const servicos = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/servicos',
    generateId: ({ data }) => String(data.slug),
  }),
  schema: z.object({
    nome: z.string(),
    slug: z.string(),
    descricao: z.string(),
    icone: z.string(),
    titulo_seo: z.string(),
    meta_descricao: z.string().max(160),
    ordem: z.number(),
    imagem: z.string().optional(),
    faq: z
      .array(
        z.object({
          pergunta: z.string(),
          resposta: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { bairros, servicos };
