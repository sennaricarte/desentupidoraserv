# Auditoria das descrições dos bairros

Auditoria somente leitura de `src/content/bairros/*.md`. Nenhum arquivo de bairro foi alterado.

## Método e critérios

- Foram lidos os campos `descricao`, `titulo_seo`, `meta_descricao` e o corpo Markdown de cada arquivo.
- Foi listada toda afirmação local específica: ruas e avenidas, pontos de referência, instituições, tipos de imóvel predominantes, características do bairro e afirmações sobre a rede de esgoto.
- **Origem provável:** os cinco arquivos entraram de uma vez no commit inicial (`bc66ddb`, "Publish the Desentope Aracaju static site"). Não há versão anterior, briefing ou fonte no repositório que mostre de onde veio cada informação. Por isso, todas as afirmações estão classificadas como **gerada (provável)**: o git não permite provar que alguma delas "já existia" antes, vinda do cliente.
- **Precisa de verificação:** "sim" para tudo que não pode ser confirmado só pelo código, o que inclui todas as afirmações sobre geografia, imóveis e tubulação. "não" fica só para itens que são dados do próprio site (nome do bairro, cidade, horário vindo de `negocio.json`).
- **Onde aparece:** `descricao` é exibida no Hero da página do bairro e no `BairroCard`. `meta_descricao` vai para `<meta name="description">` e para o `llms.txt`. O corpo Markdown dos bairros **não é renderizado em nenhuma página** hoje, então ele só importa se passar a ser exibido.

## Atalaia (`atalaia.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação |
|---|---|---|---|
| Atalaia | O bairro tem a "Orla de Atalaia" | gerada (provável) | sim |
| Atalaia | Concentra um grande volume de bares, hotéis e imóveis de temporada | gerada (provável) | sim |
| Atalaia | Esse volume sobrecarrega a rede com gordura de cozinha | gerada (provável) | sim |
| Atalaia | Areia desce pelos ralos e contribui para os entupimentos | gerada (provável) | sim |
| Atalaia | O deslocamento da equipe segue a Beira Mar | gerada (provável) | sim |
| Atalaia | O acesso é feito pelos cruzamentos da Av. Santos Dumont | gerada (provável) | sim |
| Atalaia | Público atendido: residências, hotéis e bares da Beira Mar (`meta_descricao`) | gerada (provável) | sim |
| Atalaia | Público atendido: residências, pousadas e pontos comerciais da beira-mar (corpo) | gerada (provável) | sim |
| Atalaia | "Orla 24h" no título SEO (atendimento 24h vem de `negocio.json`; "Orla" é afirmação local) | gerada (provável) | sim |

## Farolândia (`farolandia.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação |
|---|---|---|---|
| Farolândia | Concentra casas térreas | gerada (provável) | sim |
| Farolândia | Concentra prédios de médio porte | gerada (provável) | sim |
| Farolândia | Tem o fluxo da Universidade Tiradentes | gerada (provável) | sim |
| Farolândia | É "o bairro da Universidade Tiradentes" (`meta_descricao`) | gerada (provável) | sim |
| Farolândia | Entupimentos recorrentes vêm de ralos de área de serviço | gerada (provável) | sim |
| Farolândia | Entupimentos recorrentes vêm da rede de esgoto das ruas ligadas à Av. Presidente Tancredo Neves | gerada (provável) | sim |
| Farolândia | Há kits (quitinetes) e comércios próximos ao campus (corpo) | gerada (provável) | sim |
| Farolândia | A Av. Tancredo Neves passa pelo bairro ou fica próxima dele (corpo) | gerada (provável) | sim |

## Jardins (`jardins.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação |
|---|---|---|---|
| Jardins | Predominam condomínios residenciais | gerada (provável) | sim |
| Jardins | Há casas de rua interna | gerada (provável) | sim |
| Jardins | A rede predial costuma entupir por gordura acumulada nas colunas | gerada (provável) | sim |
| Jardins | Raízes avançam sobre a tubulação | gerada (provável) | sim |
| Jardins | A tubulação das quadras mais próximas da Av. Ministro Geraldo Barreto Sobral é antiga | gerada (provável) | sim |
| Jardins | A Av. Ministro Geraldo Barreto Sobral passa pelo bairro ou fica próxima dele | gerada (provável) | sim |
| Jardins | "Equipe local" com "acesso rápido às vias internas do bairro" (corpo; afirmação operacional sobre a empresa) | gerada (provável) | sim |

## São José (`sao-jose.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação |
|---|---|---|---|
| São José | O bairro fica na zona norte de Aracaju (`descricao`, `titulo_seo` e corpo) | gerada (provável) | sim |
| São José | Tem comércio de rua | gerada (provável) | sim |
| São José | Tem casas antigas | gerada (provável) | sim |
| São José | Os entupimentos vêm de restos sólidos na rede de esgoto | gerada (provável) | sim |
| São José | Há ramais domésticos sem manutenção | gerada (provável) | sim |
| São José | A equipe circula pela Av. Maranhão | gerada (provável) | sim |
| São José | Há um "Mercado" no entorno, como referência conhecida | gerada (provável) | sim |
| São José | A Av. Maranhão e o Mercado ficam no bairro (`meta_descricao`) | gerada (provável) | sim |

## 13 de Julho (`treze-de-julho.md`)

| Bairro | Afirmação | Origem provável | Precisa de verificação |
|---|---|---|---|
| 13 de Julho | Há consultórios (e clínicas, no corpo) | gerada (provável) | sim |
| 13 de Julho | Há edifícios residenciais | gerada (provável) | sim |
| 13 de Julho | Há casas antigas perto do Rio Sergipe | gerada (provável) | sim |
| 13 de Julho | O bairro fica junto ao Rio Sergipe ("beira do rio") | gerada (provável) | sim |
| 13 de Julho | Os imóveis sofrem com tubulação de ferro | gerada (provável) | sim |
| 13 de Julho | Os imóveis têm caixas de gordura subdimensionadas | gerada (provável) | sim |
| 13 de Julho | O acesso é feito pela Av. Beira Mar | gerada (provável) | sim |
| 13 de Julho | O acesso também é feito pelas transversais | gerada (provável) | sim |
| 13 de Julho | O bairro é "zona nobre" (`descricao` e `meta_descricao`) | gerada (provável) | sim |

## Itens que não precisam de verificação

| Bairro | Afirmação | Origem provável | Precisa de verificação |
|---|---|---|---|
| Todos | Nome do bairro e slug | dado do site | não |
| Todos | O bairro fica em Aracaju (cidade de `negocio.json`) | dado do site | não |
| Todos | Atendimento 24h (horário de `negocio.json`) | dado do site | não |
| Todos | Serviços citados: pia, vaso, ralo, esgoto (existem na collection `servicos`) | dado do site | não |

## Frases semelhantes entre bairros

Os cinco arquivos seguem o mesmo molde em todos os campos. Trocando o nome do bairro e a avenida, o texto se repete.

**`descricao` (três frases com a mesma estrutura):**

1. Abertura com "No/Na/Em {bairro}," seguida de uma lista de tipos de imóvel.
2. Causa do entupimento: "{imóveis} geram/sobrecarregam/sofrem com {gordura | restos sólidos | tubulação antiga}".
3. Fechamento com logística e uma avenida: "O deslocamento segue / O acesso é feito pela / A equipe circula pela {Av. X}".

Exemplos lado a lado:

- Atalaia: "O deslocamento segue a Beira Mar e o acesso pelos cruzamentos da Av. Santos Dumont."
- São José: "A equipe circula pela Av. Maranhão e pelo entorno do Mercado."
- 13 de Julho: "O acesso é feito pela Av. Beira Mar e pelas transversais da zona nobre."
- Farolândia e Jardins encaixam a avenida no fim da frase de causa ("ruas ligadas à Av. Presidente Tancredo Neves", "quadras mais próximas da Av. Ministro Geraldo Barreto Sobral").

**`meta_descricao` (molde idêntico):**

"Desentupidora {em/na/no} {bairro}, Aracaju. {Atendimento | Serviço | Desentupimento} 24h {para/de} {lista de pia, vaso, ralo, esgoto} {em/de} {tipos de imóvel} {da/perto da/junto ao} {referência local}."

Os cinco começam com as mesmas cinco palavras e mudam só a referência final.

**Corpo Markdown (uma frase, molde idêntico):**

"{Atendimento | Cobertura | Serviço | Equipe local} {no/na/em} {bairro} para/com foco em {residências, ...} e {pontos comerciais | comércios} {da referência local}."

- Atalaia: "Atendimento na Orla de Atalaia para residências, pousadas e pontos comerciais da beira-mar."
- São José: "Serviço no São José para residências e pontos comerciais da zona norte de Aracaju."
- Farolândia: "Cobertura da Farolândia para residências, kits e comércios próximos ao campus e à Tancredo Neves."

**`titulo_seo`:** todos seguem "Desentupidora {em/na/no} {bairro}, Aracaju | {complemento}". Os complementos se repetem: "24h" aparece em três deles; Atalaia usa "Orla 24h" e São José usa "Zona norte".

## Recomendações

1. Confirmar com o cliente, ou com fonte local confiável, cada avenida, ponto de referência e característica marcada com "sim". Remover o que não puder ser confirmado.
2. Revisar com atenção as afirmações técnicas sobre a rede ("tubulação de ferro", "caixas de gordura subdimensionadas", "tubulação antiga", "ramais sem manutenção"). Elas soam como diagnóstico e dificilmente podem ser sustentadas para um bairro inteiro.
3. Revisar as afirmações operacionais sobre a empresa ("equipe local", "acesso rápido", "a equipe circula pela Av. ..."), que implicam presença física ou tempo de deslocamento.
4. Variar a estrutura das frases entre bairros depois da verificação, para reduzir o padrão de texto montado a partir de um molde.
