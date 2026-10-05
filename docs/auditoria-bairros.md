# Auditoria das descrições dos bairros

## Situação atual (05/10/2026)

Os cinco bairros foram reescritos usando exclusivamente as fichas de `docs/fichas-bairros.md`. Todas as afirmações locais não verificadas da primeira auditoria foram **removidas** ou **substituídas** por dados das fichas. A coluna "Status após reescrita" em cada tabela abaixo registra o destino de cada afirmação.

- **removida:** não aparece mais em nenhum campo do bairro (descrição, título SEO, meta descrição, corpo ou FAQ).
- **substituída:** o tema continua, mas agora com o dado da ficha indicado.
- **mantida (confirmada na ficha):** a afirmação original consta na ficha.

A varredura global em `src/` e `public/` não encontra mais "zona nobre", "zona norte", "tubulação de ferro", "subdimensionad", "equipe local", "Av. Maranhão" nem "Mercado". "Beira Mar" aparece só no 13 de Julho, como parte do nome da via que está na ficha ("trecho conhecido como Av. Beira Mar").

## Método e critérios (primeira auditoria)

- Foram lidos os campos `descricao`, `titulo_seo`, `meta_descricao` e o corpo Markdown de cada arquivo.
- Foi listada toda afirmação local específica: ruas e avenidas, pontos de referência, instituições, tipos de imóvel predominantes, características do bairro e afirmações sobre a rede de esgoto.
- **Origem provável:** os cinco arquivos entraram de uma vez no commit inicial (`bc66ddb`). Não havia versão anterior, briefing nem fonte no repositório, por isso todas as afirmações foram classificadas como **gerada (provável)**.
- **Precisa de verificação:** "sim" para tudo que não pode ser confirmado só pelo código.

## Atalaia (`atalaia.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação | Status após reescrita |
|---|---|---|---|---|
| Atalaia | O bairro tem a "Orla de Atalaia" | gerada (provável) | sim | mantida (confirmada na ficha: Orla de Atalaia, Av. Santos Dumont) |
| Atalaia | Concentra um grande volume de bares, hotéis e imóveis de temporada | gerada (provável) | sim | removida |
| Atalaia | Esse volume sobrecarrega a rede com gordura de cozinha | gerada (provável) | sim | removida |
| Atalaia | Areia desce pelos ralos e contribui para os entupimentos | gerada (provável) | sim | removida |
| Atalaia | O deslocamento da equipe segue a Beira Mar | gerada (provável) | sim | removida |
| Atalaia | O acesso é feito pelos cruzamentos da Av. Santos Dumont | gerada (provável) | sim | substituída: Av. Santos Dumont como via de referência (ficha) |
| Atalaia | Público atendido: residências, hotéis e bares da Beira Mar (`meta_descricao`) | gerada (provável) | sim | removida |
| Atalaia | Público atendido: residências, pousadas e pontos comerciais da beira-mar (corpo) | gerada (provável) | sim | removida |
| Atalaia | "Orla 24h" no título SEO | gerada (provável) | sim | substituída: "Av. Santos Dumont" no título |

## Farolândia (`farolandia.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação | Status após reescrita |
|---|---|---|---|---|
| Farolândia | Concentra casas térreas | gerada (provável) | sim | removida |
| Farolândia | Concentra prédios de médio porte | gerada (provável) | sim | removida |
| Farolândia | Tem o fluxo da Universidade Tiradentes | gerada (provável) | sim | substituída: Universidade Tiradentes (Unit) como referência na Av. Murilo Dantas, 300 (ficha) |
| Farolândia | É "o bairro da Universidade Tiradentes" (`meta_descricao`) | gerada (provável) | sim | removida |
| Farolândia | Entupimentos recorrentes vêm de ralos de área de serviço | gerada (provável) | sim | removida |
| Farolândia | Entupimentos recorrentes vêm da rede de esgoto das ruas ligadas à Av. Presidente Tancredo Neves | gerada (provável) | sim | removida |
| Farolândia | Há kits (quitinetes) e comércios próximos ao campus (corpo) | gerada (provável) | sim | removida |
| Farolândia | A Av. Tancredo Neves passa pelo bairro ou fica próxima dele (corpo) | gerada (provável) | sim | substituída: vias da ficha (Av. Murilo Dantas e Av. Dr. Tarcísio Daniel dos Santos) |

## Jardins (`jardins.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação | Status após reescrita |
|---|---|---|---|---|
| Jardins | Predominam condomínios residenciais | gerada (provável) | sim | removida |
| Jardins | Há casas de rua interna | gerada (provável) | sim | removida |
| Jardins | A rede predial costuma entupir por gordura acumulada nas colunas | gerada (provável) | sim | removida |
| Jardins | Raízes avançam sobre a tubulação | gerada (provável) | sim | removida |
| Jardins | A tubulação das quadras mais próximas da Av. Ministro Geraldo Barreto Sobral é antiga | gerada (provável) | sim | removida |
| Jardins | A Av. Ministro Geraldo Barreto Sobral passa pelo bairro ou fica próxima dele | gerada (provável) | sim | mantida (confirmada na ficha) |
| Jardins | "Equipe local" com "acesso rápido às vias internas do bairro" (corpo) | gerada (provável) | sim | removida |

## São José (`sao-jose.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação | Status após reescrita |
|---|---|---|---|---|
| São José | O bairro fica na zona norte de Aracaju (`descricao`, `titulo_seo` e corpo) | gerada (provável) | sim | removida |
| São José | Tem comércio de rua | gerada (provável) | sim | removida |
| São José | Tem casas antigas | gerada (provável) | sim | removida |
| São José | Os entupimentos vêm de restos sólidos na rede de esgoto | gerada (provável) | sim | removida |
| São José | Há ramais domésticos sem manutenção | gerada (provável) | sim | removida |
| São José | A equipe circula pela Av. Maranhão | gerada (provável) | sim | removida; vias substituídas pelas seis ruas da ficha |
| São José | Há um "Mercado" no entorno, como referência conhecida | gerada (provável) | sim | substituída: Hospital São Lucas e Santuário São José (ficha) |
| São José | A Av. Maranhão e o Mercado ficam no bairro (`meta_descricao`) | gerada (provável) | sim | removida |

## 13 de Julho (`treze-de-julho.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação | Status após reescrita |
|---|---|---|---|---|
| 13 de Julho | Há consultórios (e clínicas, no corpo) | gerada (provável) | sim | removida |
| 13 de Julho | Há edifícios residenciais | gerada (provável) | sim | removida |
| 13 de Julho | Há casas antigas perto do Rio Sergipe | gerada (provável) | sim | removida |
| 13 de Julho | O bairro fica junto ao Rio Sergipe ("beira do rio") | gerada (provável) | sim | substituída: "o calçadão fica no encontro do Rio Poxim com o Rio Sergipe" (fato permitido da ficha) |
| 13 de Julho | Os imóveis sofrem com tubulação de ferro | gerada (provável) | sim | removida |
| 13 de Julho | Os imóveis têm caixas de gordura subdimensionadas | gerada (provável) | sim | removida |
| 13 de Julho | O acesso é feito pela Av. Beira Mar | gerada (provável) | sim | substituída: Av. Governador Paulo Barreto de Menezes (trecho conhecido como Av. Beira Mar), via da ficha |
| 13 de Julho | O acesso também é feito pelas transversais | gerada (provável) | sim | removida |
| 13 de Julho | O bairro é "zona nobre" (`descricao` e `meta_descricao`) | gerada (provável) | sim | removida |

## Itens que não precisam de verificação

| Bairro | Afirmação | Origem provável | Precisa de verificação | Status após reescrita |
|---|---|---|---|---|
| Todos | Nome do bairro e slug | dado do site | não | mantida |
| Todos | O bairro fica em Aracaju (cidade de `negocio.json`) | dado do site | não | mantida |
| Todos | Atendimento 24h (horário de `negocio.json`) | dado do site | não | removido dos títulos SEO dos bairros; continua no restante do site |
| Todos | Serviços citados: pia, vaso, ralo, esgoto, hidrojateamento (collection `servicos`) | dado do site | não | mantida, agora com links internos |

## Frases semelhantes entre bairros

**Antes da reescrita**, os cinco arquivos seguiam o mesmo molde em todos os campos:

- `descricao`: "No/Na/Em {bairro}, {tipos de imóvel} geram/sofrem com {problema}. O acesso/deslocamento segue pela {Av. X}."
- `meta_descricao`: "Desentupidora {em/na/no} {bairro}, Aracaju. {Atendimento | Serviço | Desentupimento} 24h {para/de} {serviços} {em/de} {imóveis} {referência local}."
- Corpo: "{Atendimento | Cobertura | Serviço | Equipe local} {no/na/em} {bairro} para {residências...} e {comércios} {da referência local}."
- `titulo_seo`: "Desentupidora {em/na/no} {bairro}, Aracaju | {complemento}", com "24h" em três deles.

**Depois da reescrita**, cada bairro tem abertura e organização próprias:

| Bairro | Abertura | Organização do corpo |
|---|---|---|
| Atalaia | Quem precisa de atendimento e a via de referência | Referências em lista, serviços em lista com links, passo a passo numerado, fechamento |
| Farolândia | As duas avenidas de referência | Uma seção por avenida, orientação de serviço por sintoma em parágrafos, fechamento |
| Jardins | Sintomas (pia, vaso, ralo, esgoto) | Vias em parágrafos curtos com negrito, sintoma para serviço, seção sobre entupimento recorrente, fechamento |
| São José | Lista das seis ruas | Texto mais curto: referências, serviços em um parágrafo, o que informar, fechamento |
| 13 de Julho | Origem do nome do bairro | Vias e referências, serviços em lista de sintoma e serviço, cuidados antes de chamar, fechamento |

As meta descrições e os títulos SEO também têm redação diferente entre os bairros. O título começa sempre por "Desentupidora {em/na/no} {bairro}" porque essa é a palavra-chave da página; o complemento muda em cada um.
