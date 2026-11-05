# MasterFit — estrutura institucional

Base local, responsiva e navegável para três unidades. A identidade usa a paleta oficial fornecida e o PNG original transparente da MasterFit. A Hero possui uma experiência cinematográfica local com vídeo sob demanda. Não há backend, integração de matrícula ou deploy.

## Iniciar

Requer Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

Abra a URL informada pelo Vite. Para verificar e gerar a versão de produção:

```sh
npm run lint
npm run build
npm run preview
```

O build gera `dist/`. Não há uma suíte de testes preexistente. Em uma futura hospedagem estática, configure fallback das rotas para `index.html`, pois a navegação usa BrowserRouter.

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4 (plugin Vite), React Router e Lucide React. CSS semântico com tokens globais controla o sistema visual; utilitários Tailwind também estão disponíveis. Sem fontes externas nem bibliotecas de animação.

## Rotas

| Rota                                     | Página                                       |
| ---------------------------------------- | -------------------------------------------- |
| `/`                                      | Home com dez blocos, incluindo header/footer |
| `/unidades`                              | Catálogo das três unidades                   |
| `/unidades/aeroclube`                    | Aeroclube                                    |
| `/unidades/sao-jose-de-piranhas`         | São José de Piranhas                         |
| `/unidades/carrapateira`                 | Carrapateira                                 |
| `/sobre`                                 | Institucional                                |
| `/contato`                               | Canais por unidade                           |
| Qualquer outra rota/unidade desconhecida | 404                                          |

## Organização e edição

- `src/data/units.ts`: configuração e tipos das unidades, imagens, endereço, horários, WhatsApp, Instagram, modalidades, estrutura, planos, mapa e FAQs. Campos ausentes produzem estados identificados, sem links falsos. Para alterar uma unidade, edite apenas seu objeto.
- `src/data/site.ts`: navegação, textos institucionais provisórios, catálogo de modalidades, diferenciais e perguntas gerais. Os placeholders editoriais de modalidades não são atividades confirmadas.
- `src/components/home/Hero.tsx`: Hero com três destinos, destaque por hover/foco e transição interna para o vídeo da Aeroclube ao clicar/tocar.
- `src/components/units/UnitPageTemplate.tsx`: template único das três unidades. FAQs individuais aparecem quando cadastradas; planos e modalidades têm estados vazios.
- `src/components/units/UnitCard.tsx`: card reutilizável de unidade.
- `src/components/ui/index.tsx`: Container, Button, SectionHeading, MediaPlaceholder, FAQAccordion, ModalityCard, CTASection, PageHero e Pending.
- `src/components/layout/`: Header e Footer compartilhados.
- `src/pages/`: composição e textos contextuais das páginas. Rótulos e estados específicos de seção ficam junto do componente correspondente, para edição independente.
- `src/routes/AppRoutes.tsx`: rotas e resolução das unidades por slug.
- `src/hooks/usePageNavigation.ts`: título/descrição SEO por rota, âncoras e retorno ao topo/foco durante navegação.
- `src/styles/tokens.css`: cores, fontes, largura, espaços, raio e duração das transições.
- `src/styles/global.css`: estilos das seções e breakpoints mobile/tablet/desktop.
- `src/assets/`: reservado para arquivos importados pelo código; `public/` para arquivos referenciados por URL.
- `index.html`: metadata base e favicon com a logo oficial.

### Imagens e links reais

Não foram usadas fotografias aleatórias ou referências como imagens oficiais. Os materiais já existentes na raiz foram preservados sem alteração e não fazem parte do build.

Copie imagens aprovadas para `public/images/` e preencha `heroImage.src` e `gallery[].src` com caminhos como `/images/aeroclube.webp`. Atualize o `alt` para descrever o conteúdo. Sem `src`, aparece o placeholder visual. A apresentação institucional pode receber mídia no componente Home/About; a Hero mantém sua área visual independente.

Em `units.ts`, use URLs oficiais completas para `whatsapp` (URL HTTPS de contato), `instagram` e `mapUrl`. O mapa é inicialmente um placeholder, e o campo confirmado habilita o link de localização; um mapa incorporado poderá ser integrado posteriormente. Não coloque números ou URLs de exemplo na configuração. Preencha `modalities` por unidade; o catálogo global é editorial e independente. Cadastre planos somente após aprovação de nome, descrição, valor e condições.

## Acessibilidade e comportamento

Menu mobile com controle expandido e fechamento por Escape, navegação ativa, link para pular ao conteúdo, foco visível, hierarquia semântica, acordeão nativo `details/summary`, alvos de toque e respeito a movimento reduzido. Nenhum canal pendente é um link ativo. Ano do rodapé é dinâmico.

## Dados pendentes

Textos oficiais de apresentação, história, missão, visão, valores e diferenciais; fotos/vídeos autorizados; endereços, horários, links de mapa e canais oficiais; modalidades, ambientes e equipamentos por unidade; planos, preços, condições e processo de matrícula; FAQs reais. Nenhum fato comercial foi presumido.

## Verificação desta entrega

`npm run lint` e `npm run build` executados com sucesso. Revisão no navegador em larguras de desktop, tablet e smartphone: páginas e três unidades, menu mobile (incluindo Escape), accordion, âncora de contato e rota 404. Sem overflow horizontal observado nas telas verificadas e sem erros/avisos no console durante a revisão. Prévia de smartphone em `preview-mobile.jpg`.

## Identidade MasterFit

A paleta completa está em `src/styles/tokens.css`; as demais folhas usam apenas tokens, inclusive estados de hover, foco e campos de formulário. Preto/grafite predominam, amarelo identifica interações e o roxo aparece somente como atmosfera discreta na Hero. Dourado e prata da logo permanecem no PNG original, sem filtros.

- `public/assets/brand/masterfit-logo-extracao-fiel-transparente.png`: cópia intacta do quarto anexo fornecido (não havia arquivo com esse nome no projeto).
- `src/components/ui/BrandLogo.tsx`: imagem oficial com proporção preservada, aplicada no Header e Footer.
- `public/assets/references/masterfit-fachada.png`: foto fornecida e identificada pelo usuário como Aeroclube; configurada em `src/data/units.ts`. As outras duas rotas da Hero usam placeholders enquanto suas fotografias não forem fornecidas.
- `src/components/home/Hero.tsx`: seleção de destinos com botão de vídeo para Aeroclube e links diretos para unidades sem vídeo. Hover e foco apenas destacam a rota; clique/toque inicia a jornada. A experiência respeita movimento reduzido.

As rotas, os dados comerciais e as demais seções foram preservados. Nenhuma biblioteca foi adicionada.

### Verificação da atualização de identidade

Build e lint aprovados. No navegador: prévias selecionáveis por foco/Tab e clique, link da unidade selecionada, menu mobile/Escape, accordion, rotas institucionais e 404. Sem overflow observado em 390, 820 e 1280 px, sem erros ou avisos no console. A cópia da logo tem SHA-256 idêntico ao anexo e canal alpha preservado. Captura em `preview-identidade-desktop.jpg`.

## Hero cinematográfica — Satellite Zoom

### Arquivos e organização

- `src/data/hero.ts`: deriva ID, nome, imagem, descrição e rota de `units.ts`, e associa vídeos opcionais por slug em `videosByUnit`. Somente Aeroclube tem vídeo neste teste; Bessa é um rótulo interno da jornada, sem criar uma quarta unidade.
- `src/components/home/Hero.tsx`: seleção de três rotas, transições de entrada/saída e controle de sessão. Uma trava síncrona impede cliques repetidos; voltar cancela transições pendentes, restaura a seleção e devolve o foco ao botão original. Escape também sai da experiência.
- `src/components/home/HeroVideoExperience.tsx`: vídeo HTML5, progresso sincronizado, pausa/continuação, pulo, resultado, replay e tratamento de erro. O player é montado somente após seleção, usa `muted`, `playsInline`, `preload="none"`, sem loop nem controles nativos. Os recursos são liberados ao voltar ou desmontar.
- `src/styles/hero.css`: estilos exclusivos da nova Hero; perspectiva e transições de `transform`/`opacity`, breakpoints e alternativa sem movimento. Demais seções e rotas permanecem intactas.
- `public/videos/masterfit-bessa-satellite.mp4`: cópia integral do vídeo fornecido. H.264, 854 × 480, 11,04 s, sem faixa de áudio, aproximadamente 8,2 MiB.
- `public/videos/masterfit-bessa-final.jpg`: último frame extraído do próprio vídeo para pulo, fallback de erro e movimento reduzido.

Ao terminar normalmente, o elemento de vídeo permanece montado, pausado no último frame. Pular mostra a captura desse mesmo frame, sem esperar o download completo. A tela final apresenta o link existente `/unidades/aeroclube`, escolha de outro destino e replay. Não há navegação automática ou modal.

Com `prefers-reduced-motion: reduce`, selecionar Aeroclube abre diretamente a imagem final, sem baixar/reproduzir vídeo automaticamente; “Reproduzir animação” permite iniciar por escolha explícita. O vídeo usa `object-fit: contain`, preservando todo o enquadramento; no mobile, barras escuras são intencionais. Não há filtros de ampliação sobre o vídeo 480p.

### Integrar os próximos vídeos

1. Coloque os MP4s e suas capturas de último frame em `public/videos/`.
2. Acrescente entradas `sao-jose-de-piranhas` e `carrapateira` em `videosByUnit`, cada uma com `src`, `finalFrame` e `locationLabel`.
3. Atualize as fotos reais em `src/data/units.ts`, quando disponíveis.

A mesma experiência será aplicada automaticamente, sem alterar componentes ou rotas. Sem uma entrada de vídeo, a seta continua sendo um link direto para a unidade e não tenta carregar arquivos. Não reutilizamos o vídeo de Bessa nas outras unidades.

### Verificação e limites

Build e lint executados. Testes no navegador integrado: carga sob demanda (sem elemento de vídeo inicialmente), reprodução natural até o último frame, pausa, pulo, replay, retorno/descarregamento, recuperação após arquivo indisponível, clique duplo e Escape. Foco restaurado ao sair. Layout de vídeo revisado em desktop e smartphone. A falha de mídia foi provocada apenas durante o teste; o MP4 original foi restaurado e reproduziu novamente.

O controle nativo do Safari não respondeu, portanto a verificação direta em Safari e Chrome nativos permanece pendente. A implementação usa H.264 e os atributos de reprodução inline/muda, mas a revisão no navegador integrado não substitui a matriz de compatibilidade em dispositivos reais. Não houve instalação de bibliotecas, deploy ou push.

Verificação final adicional: build de produção revisado pelo servidor `vite preview`, incluindo navegação para Aeroclube e as duas unidades sem vídeo. Sem overflow nas larguras de 320, 390, 820 e desktop verificadas; nomes completos preservados na menor largura. Testado também pular durante a entrada, sem reinício posterior do player. Console do fluxo normal sem erros/avisos. O MP4 de destino tem SHA-256 idêntico ao original. Capturas: `preview-hero-cinematica.jpg` e `preview-hero-final.jpg`.

## Aeroclube e faixa de marcas

A página `/unidades/aeroclube` utiliza a apresentação editorial do template existente, ativada por `presentation` em `src/data/units.ts`. Os dados oficiais da unidade — endereço, telefone, WhatsApp, sete horários, coordenadas, descrição e fotografias — estão centralizados nesse objeto. As demais unidades mantêm seus dados e estados pendentes.

- `UnitInfo.tsx`: endereço, telefone clicável, tabela semanal e CTA WhatsApp.
- `UnitLocationMap.tsx`: iframe interativo com título acessível, carregamento lazy e link externo. O URL foi copiado do menu **Compartilhar → Incorporar um mapa** do próprio Google Maps, com o ponto fornecido (-7.0845734, -34.843454). Não é a API Embed v1 e não requer uma chave configurada neste projeto. Referência do fluxo: [ajuda oficial do Google Maps](https://support.google.com/maps/answer/7101463).
- `UnitGallery.tsx`: fotografia principal, quatro miniaturas, navegação circular, gestos horizontais em telas de toque e lightbox nativo `dialog`. A ampliação aceita setas do teclado e Escape. As fotos preservam a proporção com `object-fit: contain`.
- `src/styles/unit-details.css`: estilos exclusivos desses componentes e da apresentação da Aeroclube.

As quatro fotos fornecidas em `ImagemTratada1.png` a `ImagemTratada4.png` foram preservadas na raiz. Suas cópias JPEG em `public/assets/units/aeroclube/` têm larguras de 320, 640 e 1122 px, utilizadas com `srcSet` e miniaturas. Não foram adicionados elementos ou alterados os ambientes. As quatro versões maiores somam aproximadamente 1,46 MiB, frente a cerca de 8,4 MiB dos PNGs originais. A foto de fachada utilizada na Hero permanece a mesma.

`InfiniteLogoMarquee.tsx` foi inserido imediatamente após a Hero em `Home.tsx`. Seus estilos estão em `src/styles/logo-marquee.css`. Dois grupos de largura idêntica, cada um com duas sequências das marcas, deslocam-se exatamente metade da largura total do trilho. Cada grupo tem pelo menos a largura do viewport, evitando vazios ao fechar o loop. A velocidade é linear, com ciclo mínimo de 24 s e ajuste pela largura; há controle de pausa e apresentação estática com movimento reduzido. As duplicações visuais ficam ocultas dos leitores de tela.

Os arquivos `tecnogym_marquee.png`, `hammer_strength_marquee.png` e `masterfit_marquee.png` não estavam presentes. Foram usados os originais fornecidos, copiados sem alteração para `public/assets/brand/marquee/`. Máscaras SVG utilizam os pixels originais para a apresentação branca/transparente: luminância invertida para a Technogym (original preto sobre branco), luminância para Hammer Strength (branco sobre preto) e alpha para Master Fit. Os recortes de `viewBox` removem somente margem vazia. Não há redesenho, filtro CSS de desfoque nem alteração das logos do Header/Footer. Caso sejam fornecidos PNGs monocromáticos oficiais, atualize `brands` no componente com seus caminhos, dimensões e modo `alpha`.

Ainda dependem de confirmação: modalidades, planos/preços e Instagram da Aeroclube; conteúdo oficial das outras unidades. Não foram criados números, horários ou endereços para elas. Sem novas bibliotecas, commit ou push.

### Verificação da integração Aeroclube / marcas

- `npm run build` e `npm run lint`: aprovados.
- `node --experimental-strip-types --test src/components/home/magneticParticles.test.ts`: seis testes aprovados.
- Conferência dos dados oficiais, sete horários e arquivos das quatro fotos: aprovada. Comparação com os hashes anteriores confirmou que Hero, partículas, Header, Footer, rotas e dependências não foram alterados.
- Navegador: galeria com miniaturas, navegação, ampliação e Escape; mapa carregado; links de telefone/WhatsApp corretos; layouts desktop, tablet (820 px) e mobile sem overflow horizontal. Pausa/retomada da faixa, grupos de mesma largura e três logos conferidos. A apresentação estática com movimento reduzido foi conferida no CSS; a preferência do sistema não foi modificada.
- Regressão da Home: um canvas de partículas, vídeo da Aeroclube reproduzindo (`readyState=4`) e retorno à seleção funcionando. Console sem erros ou avisos nas verificações finais.
- Capturas finais: `masterfit-marquee.jpg` e `aeroclube-updated.jpg`, no diretório de visualizações desta conversa.

## Carrapateira e 3D Review Stack

Atualização incremental de 01/11/2026, disponível apenas no localhost, sem commit/push/publicação.

### Carrapateira

- `src/data/units.ts`: dados fornecidos, apresentação, coordenadas, contatos e mídias de Carrapateira. Horários permanecem sob consulta pelo WhatsApp; nenhum horário da Aeroclube foi copiado. `@ct.masterfit` é identificado como **Instagram reserva**.
- `src/data/hero.ts`: associa o vídeo exclusivamente a Carrapateira. O componente e os estados existentes da Hero não foram modificados. Hover/toque/teclado usam o fluxo existente; a mídia só é montada na prévia ativa e liberada na saída. Movimento reduzido usa o frame final até reprodução explícita.
- `src/components/units/UnitPresentationMedia.tsx`: player com controles nativos, `muted`, `playsInline`, preload de metadados, enquadramento integral e foto única. Sem autoplay na página da unidade.
- `UnitPageTemplate.tsx`, `UnitInfo.tsx`, `UnitLocationMap.tsx` e `src/styles/unit-details.css`: reaproveitamento do layout editorial, Instagram, WhatsApp, CTA “COMO CHEGAR” e ajuste do título para telas de 320 px. A apresentação da Aeroclube mantém suas fotos e seus sete horários.
- O iframe foi obtido em **Compartilhar → Incorporar um mapa** da ficha acessada pelo link fornecido. A ficha confirmou Master Fit - Carrapateira, R. Joel Pereira, 117 e as coordenadas -7.0412226, -38.3466987. Não há chave de API adicionada.
- A fachada foi comparada com o frame final do vídeo e confirmada como Carrapateira pelo responsável nesta conversa. Cópias intactas da foto e da captura do Instagram estão em `references/carrapateira/`; a foto otimizada está em `public/assets/units/carrapateira/fachada.jpg`.
- `public/videos/masterfit-carrapateira-satellite.mp4`: cópia do vídeo original com o fluxo H.264 preservado, sem recodificação, com faixa de áudio removida e faststart. Resolução 1296×732; duração 19,875 s. O arquivo original `Video_carrapateira.mp4` permanece intacto. Poster extraído do último frame em `public/videos/masterfit-carrapateira-final.jpg`.

### Avaliações da Aeroclube

- `src/data/reviews.ts`: exatamente os oito nomes, notas 5/5 e comentários completos selecionados no briefing. Texto também conferido com `avaliacoes_masterfit_aeroclube.txt`. Sem avatares, datas, selos, nota agregada ou sincronização com Google.
- `src/components/home/ReviewCard.tsx`: estrelas, aspas, comentário integral, autor e unidade.
- `src/components/home/ReviewStack3D.tsx`: três camadas com perspectiva; saída lateral e reorganização em 550 ms; tilt limitado a 3°/4°; botões, setas do teclado e gestos horizontais com preservação do scroll vertical. Sem troca automática. Timers/RAF são cancelados ao desmontar; navegação rápida não cria transições concorrentes.
- `src/components/home/ReviewsSection.tsx` e `src/styles/reviews.css`: seção entre estrutura e FAQ/CTA, atribuição explícita à Aeroclube, link de avaliações fornecido, halo discreto, estilos responsivos e movimento reduzido. Cartões inativos são `inert`/`aria-hidden`; apenas o ativo é anunciado, com indicador acessível.
- `src/pages/Home.tsx`: inserção da seção; Hero, partículas, marquee, Header e Footer preservados.

### Validações e pendências

Build/lint e os seis testes das partículas aprovados. Conferência programática dos oito comentários nas duas fontes, dos dados/mídias de Carrapateira e do isolamento das unidades aprovada. Vídeo da página reproduziu sem áudio; hover na Hero carregou apenas o MP4 de Carrapateira, com `readyState=4`, e a saída retornou à seleção com zero players montados. Mapa incorporado carregou em Carrapateira. Botões e teclado da pilha, tilt/retorno e layouts de 1280, 390 e 320 px conferidos; sem overflow horizontal após o ajuste do título. Console sem erros/avisos nos fluxos verificados. Os caminhos de swipe e movimento reduzido foram revisados no código; não houve teste em aparelho de toque físico nem alteração da preferência do sistema.

Pendências editoriais: horários, modalidades, planos e estrutura detalhada de Carrapateira não foram fornecidos; o Instagram principal definitivo também segue sem confirmação. Nenhuma pendência de asset para os recursos desta entrega.

## Leque de avaliações e São José de Piranhas — 01/11/2026

Esta atualização substitui a interação anterior da pilha de reviews. Os registros acima descrevem as entregas anteriores; o comportamento atual é o leque abaixo.

### Leque interativo

`src/components/home/ReviewStack3D.tsx` mantém a API existente da seção e reutiliza `ReviewCard` para exibir a avaliação completa. O baralho fechado mostra um resumo frontal; hover do mouse ou clique/toque abre as oito cartas para seleção direta. Não há setas nem sequência obrigatória. Cada carta abre um `dialog` central com o comentário integral, estrelas e nome original. Botão, Esc e clique no backdrop fecham o destaque e mantêm o leque aberto. O dialog nativo contém o foco e o devolve à carta selecionada.

`src/styles/reviews.css` organiza o leque horizontal em desktop e uma grade de quatro ou duas colunas quando o espaço diminui. Todas as cartas ficam acessíveis, sem swipe obrigatório ou cortes nas bordas da tela. Transições usam transform; `prefers-reduced-motion` remove as animações. O texto e os oito registros de `src/data/reviews.ts` não foram alterados. A atribuição à Aeroclube e o link do Google continuam presentes. Home, Hero, partículas, marquee, Header, Footer e demais seções não receberam mudanças para implementar o leque.

### São José de Piranhas

- `src/data/units.ts`: cadastro completo com nome, descrição, endereço fornecido, segunda a sexta 06:00–21:00, sábado 13:00–17:00, domingo fechado e nota geral sobre feriados. O aviso de Finados não foi transformado em horário recorrente. Contatos próprios permanecem ausentes; não foram copiados das outras unidades.
- `src/data/hero.ts`: associa apenas à opção São José de Piranhas o novo vídeo. Os componentes/estados da Hero permanecem intactos, incluindo hover, toque, teclado, pausa ao sair e movimento reduzido. A sequência completa de 22,958 s foi mantida, sem cortes na chegada.
- `src/components/units/UnitInfo.tsx`: suporte a dia fechado e nota de feriados, preservando a exibição das outras tabelas.
- `src/components/units/UnitPresentationMedia.tsx`: legenda derivada do nome da unidade em vez do texto fixo de Carrapateira; layout, player e foto única reaproveitados.
- `src/styles/unit-details.css`: rodapé discreto da tabela e zoom de foto de 1% restrito a São José e a usuários sem movimento reduzido.
- `public/assets/units/sao-jose-de-piranhas/fachada.jpg`: cópia otimizada da imagem fornecida, com dimensão original 842×607 e enquadramento preservado. Fontes intactas em `references/sao-jose-de-piranhas/fachada-original.png` e `horarios.png`.
- `public/videos/masterfit-saojose-satellite.mp4`: H.264 original 1296×732 sem recodificação visual, com áudio removido e faststart. SHA256 do fluxo de vídeo idêntico ao original `video_saojose.mp4`, preservado na raiz. Poster final extraído em `masterfit-saojose-final.jpg`.

O link `https://share.google/Gkw3E84isUjaxeFnX` abriu a ficha **Academia Master Fit**, na R. Juvêncio Andrade, Centro, São José de Piranhas. O mapa incorporado foi copiado de **Compartilhar → Incorporar um mapa** dessa ficha, no ponto -7.1212175, -38.4973176 e place ID `0x7a4054f8a1e5a07:0x4d6e7a2395b87318`. O iframe carregou com o marcador do estabelecimento na rua informada. Não se utilizou um ponto genérico da rua nem coordenadas de outras cidades. O CTA “COMO CHEGAR” mantém o link fornecido. Número do imóvel e precisão da porta de entrada ainda dependem de confirmação do responsável; o ponto utilizado corresponde à ficha compartilhada. Nenhuma chave de API foi criada.

### Verificação final

- Build e lint aprovados; seis testes existentes das partículas aprovados.
- Comparação programática: objetos Aeroclube e Carrapateira idênticos aos anteriores; sete horários e arquivos de São José corretos; telefone/WhatsApp/Instagram não preenchidos; zero fotos internas inventadas. Hashes de Hero, HeroVideoExperience, Home, reviews.ts e dependências preservados.
- Navegador: leque aberto por hover e botão; seleção direta da primeira e oitava cartas; abertura por Enter; fechamento por botão, Esc e clique fora; foco restaurado à carta; grade e dialog sem overflow em 320 px. Comentário longo conferido integralmente no destaque.
- Vídeo da unidade e prévia da Hero reproduzidos silenciosamente; prévia de São José com `readyState=4` e URL correta. Mapa carregado com marcador na R. Juvêncio Andrade. Página em 320 px e desktop legível, sem overflow horizontal; console sem erros/avisos nos fluxos conferidos.
- Preferência de movimento reduzido e caminho de toque revisados no código; sem teste em aparelho físico de toque ou alteração da preferência do sistema.

Pendências: telefone/WhatsApp próprio, Instagram oficial, número do imóvel e confirmação da porta exata; modalidades, estrutura detalhada e planos ainda não fornecidos. Nenhum asset solicitado ficou ausente. Sem bibliotecas adicionais, commit, push ou publicação. Capturas finais no diretório de visualizações desta conversa: `masterfit-fan.jpg` e `masterfit-saojose-mapa.jpg`.

## Home cinematográfica e histórias automáticas — 01/11/2026

Com o briefing adicional, a Home passou à sequência Hero (com marquee preservado), Sobre, Nossa Trajetória, Estrutura e experiências, Modalidades e serviços, Comunidade/depoimentos, CTA e Footer. Os cards de unidades e diferenciais foram agrupados em Estrutura; o FAQ foi mantido antes do CTA. Nenhum conteúdo existente foi duplicado ou removido. O destino `#unidades` continua disponível.

### Implementação

- `src/data/trajectory.ts`: somente os três marcos fornecidos pelo responsável (2020, 2023 e 2024), com os textos integrais do briefing.
- `src/components/home/TrajectoryTimeline.tsx`: lista vertical semântica; cards alternados no desktop e coluna única no mobile. Um listener passivo agenda no máximo um RAF por frame; o preenchimento corresponde à posição real entre o primeiro e o último marcador, medido a 58% da altura da viewport. A linha retrocede ao subir. ResizeObserver recalcula após mudança de largura/conteúdo. Marcadores e cards respondem à mesma medição. Todos os listeners, RAF e observer são liberados no cleanup.
- `src/hooks/useHomeReveals.ts`: IntersectionObserver para títulos, fotografias, grupos de cards e colunas do Footer. Fade/translateY de 650 ms e stagger de até 210 ms. Foco de teclado revela imediatamente o conteúdo correspondente. Sem suporte a observer, ou com movimento reduzido, o conteúdo permanece visível. A saída da Home remove classes e listeners do Footer compartilhado.
- `src/styles/home-sequence.css`: linha institucional amarela, superfícies pretas/grafite, cards com entrada lateral de 30 px, hover discreto e transições suaves de superfície. Não controla a rolagem nem captura gestos.
- `src/pages/Home.tsx`: ordem atualizada, reaproveitando os blocos existentes. Componentes e estilos da Hero, vídeos e partículas permanecem intactos.
- `src/components/home/ReviewStack3D.tsx`: uma história selecionada desde o carregamento. Hover, foco, clique ou toque atualizam imediatamente o painel abaixo do leque. O primeiro toque em uma carta já seleciona e mostra o relato. A última seleção permanece ao sair; não há modal, setas ou segundo clique. Nenhum handler move o foco ou faz scroll automático.
- `src/styles/reviews.css`: abertura em 520 ms; destaque em 250 ms; crossfade dos relatos em 280 ms. A área clicável da carta fica fixa enquanto sua face se eleva, reduzindo oscilação do hover. Os oito painéis compartilham a mesma célula de grid; o maior comentário reserva a altura, inclusive nas larguras menores. Apenas o painel ativo fica acessível e o status anuncia o nome selecionado. Movimento reduzido remove transições e elevação. No mobile, resumos compactos mantêm as oito cartas acessíveis.

Os oito comentários, nomes, notas e sua atribuição à Aeroclube não foram modificados. Não foram adicionadas fotografias ou avatares fictícios. O histórico da marca foi alterado apenas na nova seção da Home com os dados recebidos; as páginas das unidades continuam com suas informações e contatos já cadastrados.

### Verificações

Build e lint aprovados; seis testes existentes das partículas aprovados. No navegador, timeline conferida em progresso inicial, intermediário e completo (incluindo retorno de aproximadamente 67% para 15% e avanço para 100%), com um, dois e três marcadores ativos. A coluna única e os limites dos cards foram conferidos em 320 px, sem overflow.

Histórias conferidas por foco/Tab, clique único e hover sem clique; saída do mouse mantém a última carta percorrida. A área manteve a mesma altura ao alternar textos longos e curtos: aproximadamente 370 px no desktop e 529 px na largura mobile de 355 px; em 320 px reserva cerca de 559 px para o texto completo. Nenhum modal é montado. Sem teste em aparelho de toque físico; o caminho de eventos de toque e os fallbacks de movimento reduzido foram revisados no código.

Verificação adicional: navegação SPA para `/unidades` removeu todas as classes de revelação do Footer; retorno à Home e console sem erros/avisos conferidos. Capturas: `masterfit-timeline.jpg` e `masterfit-historias-inline.jpg` no diretório de visualizações desta conversa.

## Contatos confirmados e vídeo institucional — 01/11/2026

### Contatos e horários

`src/data/units.ts` passa a usar `@masterfitjp` na Aeroclube e em São José de Piranhas; Carrapateira mantém `@ct.masterfit` e sua identificação anterior de perfil reserva. São José e Carrapateira usam +55 83 99619-1918 (`https://wa.me/5583996191918`); Aeroclube mantém +55 83 99832-5451. Carrapateira recebeu os mesmos sete horários de São José: segunda a sexta 06:00–21:00, sábado 13:00–17:00 e domingo fechado. Endereços, mapas, mídias e horários da Aeroclube foram preservados.

`src/pages/Contact.tsx` remove as mensagens de canais ainda não confirmados. Todos os cards agora têm links reais de Instagram/WhatsApp, sem placeholders para esses dados. `src/components/layout/Footer.tsx` substitui as duas linhas “a fornecer” por links para os contatos das unidades, sem atribuir um único número geral à rede. `src/components/units/UnitInfo.tsx` usa um rótulo acessível genérico de Instagram, sem chamar os novos perfis de reserva. A estrutura visual dos cards foi mantida.

### Sobre a MasterFit na Home

- `src/pages/Home.tsx`: mídia à esquerda e texto à direita; no mobile a mídia vem antes do texto. Título “A FORÇA QUE / TE FAZ MASTER.” com destaque amarelo, dois parágrafos fornecidos e CTA “CONHEÇA NOSSA HISTÓRIA” para `#trajetoria`. Placeholder, badge e textos provisórios removidos desta seção.
- `src/components/ui/ViewportVideo.tsx`: componente local reutilizável com `muted`, `loop`, `playsInline` e sem controles nativos. Carrega o MP4 e inicia a reprodução apenas quando ao menos 15% da mídia entra na viewport. Pausa ao sair ou ocultar a aba e retoma quando volta. Respeita a pausa manual. A superfície inteira é um botão acessível para pausar/reproduzir por clique ou teclado, sem adicionar ícones sobre a imagem. Possui poster/fallback e tratamento de rejeição de autoplay; uma nova ativação permite tentar novamente. Observer/listeners e reprodução são liberados ao desmontar.
- Com movimento reduzido, o MP4 não é carregado/reproduzido automaticamente; o poster permanece estático até uma escolha explícita de reprodução.
- `src/styles/viewport-video.css`: proporção 9:16 preservada, `object-fit: contain`, largura máxima de 390 px em desktop, layout vertical no mobile e título ajustado para 320 px. Sem recorte, zoom ou distorção do ambiente.
- `src/hooks/useHomeReveals.ts`: vídeo e título entram suavemente; parágrafos recebem atrasos de 120/200 ms e CTA de 280 ms, reutilizando o observer existente. Sem animação para movimento reduzido.
- `public/videos/masterfit-institucional.mp4`: cópia otimizada com faststart do arquivo `masterfit-video-institucional-limpo.mp4` fornecido. Duração 13,2 s, 720×1280, H.264, aproximadamente 3 MB. O original já não possui faixa de áudio; não há música adicionada. SHA256 do fluxo visual idêntico ao original, sem recodificação ou alteração do conteúdo. As legendas integradas ao material foram preservadas; não há player/interface de Instagram incorporado.
- `public/videos/masterfit-institucional-poster.jpg`: quadro extraído do próprio vídeo para carregamento, erro e movimento reduzido.

### Validação desta entrega

Build/lint e seis testes existentes das partículas aprovados. Conferência programática dos contatos e links, igualdade dos horários Carrapateira/São José e preservação dos horários Aeroclube aprovada. Na página Contato, os três cards exibem os links corretos e zero placeholders de dados preenchidos; layout em 320 px sem overflow. Vídeo inicial sem atributo `src` fora da viewport; autoplay ao entrar, `muted/loop/playsInline`, resolução 720×1280 e controles desativados conferidos no navegador. CTA chegou a `#trajetoria`; vídeo pausou fora da seção, retomou ao voltar e aceitou pausa/retomada por teclado. Navegar para Contato desmontou o player. Mobile conferido com mídia acima do título e proporção integral. Movimento reduzido revisado no código, sem alterar a configuração do sistema.

## Simplificação da Home e das três unidades — 01/11/2026

Esta entrega substitui a organização anterior das quatro páginas indicadas. Não houve alteração de dados oficiais, paleta, fotografias ou vídeos.

### Seções removidas

| Página | Remoções |
| --- | --- |
| Home `/` | Estrutura e experiências (“Espaço para a sua evolução.”), Modalidades e serviços (“Seu movimento. Seu ritmo.”) e Diferenciais (“Uma base para ir além.”), incluindo cards, ícones e conteúdo provisório. |
| Aeroclube | Estrutura física (“Por dentro da unidade.”), Modalidades (“Encontre seu movimento.”) e Planos e matrículas (“Prepare seu próximo passo.”). |
| São José de Piranhas | As mesmas três categorias, removidas do template compartilhado. |
| Carrapateira | As mesmas três categorias, removidas do template compartilhado. |

A Home segue Hero + marquee, Sobre com vídeo, Trajetória, Nossas unidades independente, Histórias e CTA/Footer. O FAQ provisório da Home também foi retirado para seguir a sequência final solicitada; suas respostas ainda tratavam horários como dados não fornecidos e apontavam para os blocos removidos. O aviso “Estrutura inicial · conteúdo em preparação” saiu do Footer; seus links e contatos permanecem intactos.

### Arquivos modificados

- `src/pages/Home.tsx`: remoção real dos blocos, promoção de Nossas unidades a seção independente, preservação do ID `unidades`, fotos e links. Índice 03 para unidades.
- `src/components/units/UnitPageTemplate.tsx`: remoção das três categorias em um único ponto para as três rotas. Apresentação, galeria real, players, mapas, funcionamento, contato e CTA foram preservados. Contato passa a 02 na composição editorial atual; os índices do fallback também foram recalculados.
- `src/components/home/ReviewsSection.tsx`: índice 04 para a seção remanescente, sem alterar dados ou mecânica das cartas.
- `src/hooks/useHomeReveals.ts`: observação restrita aos títulos e cards restantes; stagger das unidades preservado, assim como Sobre, timeline, histórias, CTA e Footer.
- `src/styles/home-sequence.css`: retirada do espaçamento exclusivo dos antigos agrupamentos de estrutura.
- `src/styles/global.css`: remoção dos estilos exclusivos de diferenciais, planos, lista de estrutura, cabeçalho de modalidade e layout do FAQ da Home, inclusive regras responsivas. `.modalities-grid`/`.modality-card` permanecem porque a página `/sobre`, fora do escopo da reestruturação, ainda usa esses estilos. Galerias e estilos compartilhados também foram mantidos.
- `src/components/ui/index.tsx`: retirada de `ModalityCard` e seus imports agora sem consumidores. Componentes compartilhados utilizados em outras páginas permanecem disponíveis.
- `src/data/site.ts`: retirada dos dados provisórios sem consumidores (diferenciais, catálogo de modalidades e FAQ da Home). `src/data/units.ts` permaneceu idêntico; nenhum dado oficial foi apagado.
- `src/components/layout/Footer.tsx`: apenas retirada do aviso de construção; copyright, contatos e navegação preservados.
- `README.md`: registro da entrega, validações e limites.

### Ajustes e preservação

As remoções foram feitas no JSX, não com CSS para ocultar seções. Não restam containers vazios dos blocos removidos. O ritmo de espaçamento usa o `.section` existente; Nossas unidades tem sua própria seção e os cards continuam com alinhamento, fotografias e navegação anteriores. As três unidades agora renderizam somente a apresentação editorial com informações/mídias/mapa, o contato e o CTA final, seguidos do Footer compartilhado.

Hashes SHA256 confirmaram que os dados das unidades, destinos da Hero, avaliações, marcos históricos, tokens de cor, Hero, player cinematográfico, timeline, leque e vídeo institucional não foram modificados. Nenhum asset foi removido. Sem dependências novas, commit, push ou deploy.

### Validações executadas

- `npm run build` e `npm run lint`: aprovados.
- `node --experimental-strip-types --test src/components/home/magneticParticles.test.ts`: seis testes aprovados.
- Navegador: as quatro rotas verificadas em **1280, 820 e 320 px** (12 combinações). Nenhum overflow horizontal; nenhum dos seis títulos das categorias removidas presente no DOM. Cada página de unidade renderiza três seções de conteúdo: apresentação, contato e CTA.
- Endereços, sete linhas de horários, WhatsApps, Instagrams e URLs de incorporação dos mapas conferidos nas três unidades. Links externos foram conferidos pelos destinos cadastrados, sem envio de mensagens.
- Navegação pelos links reais: Home → Aeroclube → São José de Piranhas → Carrapateira → Home, aprovada.
- Hero da Aeroclube reproduziu o MP4 correto, com `readyState=4`; retorno à seleção aprovado. Os outros dois destinos e seus arquivos permanecem idênticos aos anteriores.
- Galeria da Aeroclube: próxima foto, ampliação e fechamento por Esc aprovados.
- Sobre: reprodução silenciosa do vídeo e CTA para a timeline aprovados.
- Timeline: progresso intermediário de aproximadamente 75% com dois marcos ativos conferido após a reorganização.
- Leque: troca por foco/Tab para Cecilia Holmes e clique direto em Bárbara Lins conferida; foco visível sólido e área de histórias com altura estável preservados.
- Três fotografias de Nossas unidades carregadas sem erro. Console sem erros/avisos nos fluxos conferidos.

Limites: não houve teste em aparelho de toque físico nem alteração da preferência do sistema para movimento reduzido; os caminhos existentes e as regras correspondentes foram preservados/revisados no código. A página institucional `/sobre` mantém seu conteúdo anterior, pois não faz parte das quatro rotas desta solicitação.

### Instagram e planos do Aeroclube — 03/11/2026

- `src/data/units.ts`: São José de Piranhas e Carrapateira usam `@ct.masterfit`. O Aeroclube mantém `@masterfitjp`. A comparação com a cópia anterior confirmou que os demais dados das três unidades permaneceram iguais.
- `src/data/pricing.ts`: cinco preços, períodos, benefícios e observações centralizados, conferidos visualmente com `/Users/beltrao/Downloads/panfleto.master.pdf`. O Instagram impresso no panfleto não substitui o perfil do Aeroclube, por instrução expressa do briefing.
- `src/components/units/PricingSection.tsx`: seção e cards sem dependências novas; CTAs usam o WhatsApp do objeto da unidade com mensagens codificadas por plano. Entrada por IntersectionObserver, revelação ao receber foco e suporte a prefers-reduced-motion, inclusive mudanças de preferência.
- `src/styles/pricing.css`: tokens existentes, anual destacado pelo menor valor mensal, três cards na primeira linha e dois na segunda em desktop, duas colunas em tablet e uma em mobile.
- `src/components/units/UnitPageTemplate.tsx`: planos montados exclusivamente no Aeroclube, após a apresentação e antes do contato. Endereço, horários e mapa já integrados à apresentação foram preservados no lugar existente. Home e demais unidades não recebem preços ou placeholders.

Verificações executadas: `npm run build`, `npm run lint` e os seis testes de `magneticParticles.test.ts` passaram. Asserções adicionais confirmaram preservação dos dados das unidades, os cinco preços e os cinco destinos/mensagens de WhatsApp. No navegador, foram conferidas as rotas das três unidades, contato e Home; ausência de planos nas demais rotas; perfis corretos; preços e notas; responsividade em 1280, 820 e 320 px sem overflow horizontal ou cards cortados; foco visível por teclado e ausência de erros/avisos no console das navegações verificadas. URLs de Instagram e WhatsApp foram verificadas pelos destinos renderizados; não foram enviadas mensagens nem validado login nos serviços externos. A preferência de movimento reduzido foi revisada no código, sem alteração da preferência do sistema. Não houve novo teste completo de todas as interações preexistentes.

### Comparação Master + Equilibrium — 03/11/2026

A seção existente `#planos` do Aeroclube agora compara as duas categorias, com dez opções pareadas por período. Não foi criada outra seção nem foram publicados planos na Home ou nas outras unidades. Foram atualizados `src/data/pricing.ts`, `src/components/units/PricingSection.tsx` e `src/styles/pricing.css`.

As fontes são os panfletos oficiais Master e Equilibrium em Downloads. O trecho cortado da mensagem do usuário sobre recorrência foi conferido no PDF Equilibrium: cobrança recorrente no cartão de crédito, com limite requerido igual ao valor mensal. Os preços Master foram preservados. Ambos os anuais parcelados têm Amigo VIP; o benefício não foi estendido aos anuais recorrentes.

O aviso Equilibrium fica permanentemente visível acima dos CTAs, com repetição da regra em cada card e associação por aria-describedby. Segunda a sexta: acesso das 10h às 14h. Sábados, domingos e feriados: a restrição de faixa não se aplica, respeitando o funcionamento da unidade. O Master usa a formulação de acesso condicional solicitada, sem alegar horário livre ou 24 horas. Não foram inferidos horários de feriados, tolerâncias ou permanência. As mensagens de WhatsApp identificam categoria e período.

Verificações: build e lint passaram; seis testes existentes das partículas passaram. Asserções adicionais conferiram os dez preços, parcelamentos, regras de acesso, benefício VIP apenas nos anuais parcelados, preservação dos preços Master e dez destinos/mensagens de WhatsApp. No navegador: uma única seção, dez cards, aviso antes dos CTAs, foco visível por teclado, preços sem cortes e ausência de overflow em 1280, 820 e 320 px. Home, São José e Carrapateira permanecem sem planos. Console sem erros/avisos nas navegações verificadas. URLs verificadas por seus destinos; nenhuma mensagem enviada. Suporte a movimento reduzido preservado no código, sem alterar a preferência do sistema. Não foi repetido um teste completo de todas as funcionalidades anteriores.

### Mensalidades São José de Piranhas e Carrapateira — 03/11/2026

- `src/data/monthlyPricing.ts`: configurações específicas por unidade, três valores e mensagens oficiais do briefing. São José: Horário Livre R$ 75,00/mês, conforme o funcionamento; Horário Restrito R$ 65,00/mês, acesso das 11h às 15h nos dias e horários de funcionamento. Carrapateira: somente Mensalidade R$ 70,00/mês, sem condições adicionais.
- `src/components/units/MonthlyPricingSection.tsx`: reutiliza Container, ícone e classes visuais dos planos, sem alterar o componente do Aeroclube. Seção própria configurável para estas duas unidades, com links de WhatsApp usando o contato central da unidade, foco acessível, entrada por IntersectionObserver e suporte a mudanças de prefers-reduced-motion.
- `src/styles/monthly-pricing.css`: regras limitadas a `.monthly-pricing`, dois cards lado a lado em São José e um card central de até 560 px em Carrapateira; coluna única no mobile, restrição de horário visível e hover discreto.
- `src/components/units/UnitPageTemplate.tsx`: monta as mensalidades somente nas duas rotas solicitadas, após a apresentação existente e antes do contato. O mapa e os horários gerais já fazem parte da apresentação e mantêm a posição original. Contato dessas unidades renumerado para 03.

Validações realizadas: build e lint aprovados; os seis testes existentes de partículas aprovados. Asserções ad hoc conferiram os três preços, quantidade de planos, regra 11h–15h e as três mensagens/URLs de WhatsApp para 5583996191918. Comparação SHA256 confirmou que dados, componente e CSS dos planos Aeroclube, dados das unidades, Home e tokens permaneceram idênticos. No navegador, as duas rotas foram verificadas em 1280, 820 e 320 px: nenhum overflow horizontal ou card com conteúdo cortado; dois planos em São José e um em Carrapateira. Foco visível por teclado e associação da restrição ao CTA conferidos em São José. Aeroclube continua com uma seção, dez opções Master/Equilibrium e suas regras anteriores, sem montar o componente de mensalidades. Console sem erros/avisos nas navegações verificadas. Nenhuma mensagem foi enviada; os destinos e textos dos links foram inspecionados. Movimento reduzido revisado no código, sem mudar a preferência do sistema. Não foi repetido um teste completo das demais funcionalidades do site.

### Auditoria pré-deploy e remoção institucional da Home — 05/11/2026

Relatório completo: [audit/RELATORIO-PRE-DEPLOY.md](audit/RELATORIO-PRE-DEPLOY.md). A seção Sobre foi removida do JSX da Home, com limpeza exclusiva; página independente `/sobre` preservada e sinalizada como pendência editorial. Planos, preços e contatos mantidos. Auditoria inclui build, lint, seis testes, verificações comerciais/HTTP, 36 combinações de rota e viewport, Lighthouse, dependências e limitações de cobertura. Nenhum deploy realizado. Domínio próprio adiado por orientação do proprietário.
