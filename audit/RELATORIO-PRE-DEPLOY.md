# MasterFit — auditoria pré-deploy

Data: 05/11/2026. Ambiente: build Vite/React local, `http://127.0.0.1:4173`. Nenhum deploy realizado.

## Parecer: NÃO APROVADO PARA DEPLOY definitivo

As rotas principais, os 13 planos e os recursos exercitados funcionam no ambiente local. A remoção institucional da Home está implementada. A publicação definitiva ainda deve aguardar a resolução editorial de `/sobre` e a aceitação das interações em aparelho touch real. Há também trabalho importante de performance mobile. Isso não significa que o build esteja quebrado: build, lint e testes passaram, e ele está disponível para revisão local.

A ausência de domínio próprio **não é bloqueador**, conforme decisão expressa do proprietário nesta conversa. Canonical, sitemap e URLs absolutas de compartilhamento ficam para quando a URL de produção — inclusive uma URL Vercel — estiver definida. Não foi inventado um domínio.

## Bloqueadores

| ID | Página/componente | Descrição e gravidade | Correção/ação necessária | Status | Evidência |
|---|---|---|---|---|---|
| B1 | `/sobre`, `src/pages/About.tsx`, `src/data/site.ts` | Alta, editorial: página pública e linkada ainda anuncia conteúdo institucional em preparação; imagem “a fornecer”, história provisória e missão/visão/valores não aprovados. | Aprovar conteúdo real ou decidir como disponibilizar essa página no lançamento. A Home foi limpa; a página independente não foi excluída sem autorização. | Pendente de decisão editorial. | Código e rota `/sobre` carregada nos quatro tamanhos; `browser-routes.json`. |
| B2 | Hero, leque, menu e mídia em touch | Alta para a aceitação solicitada: não houve acesso a um telefone/tablet físico; a ferramenta disponível permite clique/teclado/ponteiro e mudança de viewport, sem teste de gestos touch genuínos. Não se trata de um defeito comprovado. | Fazer uma rodada em iPhone/Safari e Android/Chrome: primeiro toque nas três prévias, voltar, vídeo inline, abrir leque, selecionar cada história, menu e CTAs. | Cobertura parcial: layout mobile e clique único testados; aceite touch real pendente. | `interactions.json` declara a limitação; 36 combinações de rota/largura em `browser-routes.json`. |

## Importantes

| ID | Página/componente | Descrição e gravidade | Correção necessária | Status | Evidência |
|---|---|---|---|---|---|
| I1 | Home/imagens/marquee | Alta em desempenho: último Lighthouse mobile medido nesta auditoria: performance 75, LCP 8,4 s, FCP 1,5 s, TBT 10 ms, CLS 0. O carregamento de maior conteúdo ainda é lento sob a simulação mobile. | Prosseguir com variantes de imagem menores, descoberta/prioridade do conteúdo inicial e investigar a participação das máscaras SVG animadas no LCP, sem suprimir a experiência principal. | Parcialmente corrigido: payload medido caiu de 6.104 para 2.582 KiB; LCP de 29,5 para 8,4 s. Não houve aumento da nota global (75 antes e depois). | `lighthouse-mobile.report.html`, `lighthouse-final.report.html`, `image-optimization.json`. O relatório associa a descoberta de LCP a uma imagem de máscara do marquee; atribuir toda a demora a ela seria uma inferência, não uma conclusão comprovada. |
| I2 | Ferramentas de desenvolvimento | Moderada: sete entradas de vulnerabilidade moderada, derivadas de minimatch e cadeia typescript-eslint. | Atualizar a cadeia quando houver resolução compatível; revisar a versão corrigida do advisory antes de forçar overrides/major. | `npm audit fix` compatível tentado; sete alertas persistem. Sem atualização forçada. Produção: zero vulnerabilidades reportadas por `npm audit --omit=dev`. | `npm-audit.json`, `npm-audit-production.json`; [advisory oficial](https://github.com/advisories/GHSA-g3hv-75wg-m249). |
| I3 | Aeroclube/Instagram e horários | Moderada, consistência comercial: o panfleto mostra `@masterfit.jpessoa`, mas o site usa `@masterfitjp`, preservado por instrução expressa anterior. O panfleto não documenta os horários de funcionamento. | Proprietário conferir o perfil que pretende divulgar e ratificar os horários atuais. Não trocar automaticamente o perfil nem inferir horários do Equilibrium como funcionamento geral. | Dados mantidos. Divergência documentada, não resolvida por suposição. | `src/data/units.ts`; panfletos fornecidos em Downloads e orientação anterior da conversa. |
| I4 | Vercel/HTTPS/deep links | Alta antes da exposição pública: os rewrites e headers estão preparados, mas não houve ambiente Vercel para observar sua aplicação. Preview local não executa `vercel.json`. | Após um deploy autorizado para homologação, conferir HTTPS, redirecionamento HTTP→HTTPS, headers, refresh das três unidades, assets e 404. | Configuração criada; validação real da plataforma pendente. | `vercel.json`; rotas diretas e reload local funcionaram; [documentação Vercel para Vite SPA](https://vercel.com/docs/frameworks/frontend/vite). |
| I5 | SEO social e URL de produção | Moderada: não há canonical, sitemap, `og:url`/`og:image` absolutos; Open Graph estático é genérico. Títulos/descriptions das rotas são atualizados por JS; crawlers de redes sociais podem receber apenas o HTML inicial. | Quando definida a URL pública, gerar sitemap/canonical/OG e considerar pré-renderização das rotas. | Adiado por autorização do proprietário quanto ao domínio. OG básico e robots adicionados; não se anuncia SEO completo pela nota automática 100. | `index.html`, `usePageNavigation.ts`, `public/robots.txt`. |
| I6 | Acessibilidade da Hero | Moderada: Lighthouse sinalizou que os nomes acessíveis das três cartas não incluem todo o texto visual (“Iniciar jornada”, identificação etc.). | Refinar os rótulos/ocultação de texto decorativo sem mudar a interação. | Registrado; a mecânica e o arquivo da Hero foram preservados. | Auditoria `label-content-name-mismatch` nos relatórios Lighthouse. Nota automatizada de acessibilidade 100 não cobre todos os casos manuais. |
| I7 | Rotas inexistentes | Moderada para SEO: o componente 404 funciona e recebe `noindex,follow` por JS, mas o fallback SPA responde HTTP 200. | Avaliar 404 real ou pré-renderização quando houver configuração de hospedagem/SEO definitiva. | Tratamento visual e noindex corrigidos; status HTTP continua soft-404 típico do fallback. | `/rota-inexistente` e `/unidades/inexistente` em `browser-routes.json`; HEAD local 200 em `http-checks.json`. |

## Melhorias futuras

| ID | Página/componente | Gravidade/descrição | Ação | Status/evidência |
|---|---|---|---|---|
| F1 | Vídeos das unidades | Moderada em redes lentas: arquivos de aproximadamente 8,2 / 17 / 12 MiB. | Preparar versões menores e eventualmente múltiplas resoluções, preservando os originais e o enquadramento. | Adiado. Hero monta apenas o vídeo selecionado, `preload=none`; vídeos das páginas usam `metadata`, poster e controles nativos. Tamanhos em `static-checks.json`. |
| F2 | LocalBusiness | Baixa: não há JSON-LD. | Gerar dados estruturados a partir dos contatos/endereço/funcionamento confirmados, com URL pública definida. | Adiado; não foram inventados campos. |
| F3 | Favicon | Baixa: há favicon MasterFit válido, mas o PNG completo é pesado e pouco legível em 16–32 px. | Exportar tamanhos dedicados sem recriar a marca. | Original preservado; referência em `index.html`. |
| F4 | Privacidade/mapas | Moderada, a revisar com o responsável: iframes Google Maps fazem requisições ao Google. | Revisar informação de privacidade e necessidade de consentimento conforme a operação real do site. | Sem formulário, login, checkout, coleta própria ou chamadas de backend identificadas nas fontes; links externos e mapas permanecem. Não é uma avaliação jurídica. |
| F5 | Core Web Vitals e tecnologias assistivas | Baixa/monitoramento: não existe tráfego público nesta auditoria. | Medir LCP/INP/CLS de usuários reais após lançamento e testar leitor de tela real. | Lighthouse é laboratório; não foi medido INP de campo nem executado VoiceOver/NVDA. |
| F6 | Empacotamento | Baixa: bundle JS ~341 kB (~106 kB gzip), sistema usa fontes locais Arial/Helvetica e sem fonte externa bloqueante. | Considerar divisão por rotas e redução de código após perfil de uso real. | TBT final de laboratório 10 ms. Sem bibliotecas novas de runtime. |

## Correções implementadas e escopo

1. Removida de verdade a seção `#sobre-masterfit` da Home: título, vídeo, parágrafos e CTA. Não foi usada ocultação CSS.
2. Home: Hero, faixa de marcas existente, timeline **01**, unidades **02**, depoimentos **03**, CTA e footer. A faixa de logos foi preservada como assinatura da Hero; não foi criada outra seção institucional. Se a intenção for eliminar também essa faixa, isso é uma mudança distinta da seção “Sobre”.
3. Removidos o import, componente de vídeo que não tinha outro consumidor, CSS exclusivo e cópias públicas do vídeo/poster institucional. O MP4 original `masterfit-video-institucional-limpo.mp4` continua na raiz do workspace. Os demais vídeos não foram removidos.
4. Adicionado “Nossa História” no header/footer para `/#trajetoria`; `/sobre` independente continua acessível. O link de âncora no header usa Link, evitando marcar duas páginas como atuais.
5. Descriptions das unidades deixaram de anunciar dados “em preparação”. Rotas inexistentes ganham noindex; fragmento URL malformado não lança exceção. Robots permite indexação das rotas reais, sem bloqueio acidental de produção. OG básico incluído, sem domínio fictício.
6. Criado `vercel.json`: Vite, build `npm run build`, saída `dist`, rewrite SPA e headers nosniff/referrer policy/frame denial. A configuração segue a [documentação oficial da Vercel](https://vercel.com/docs/frameworks/frontend/vite); não equivale a teste na Vercel.
7. Criados WebPs de quatro logos com **RGBA idêntico** aos PNGs, incluindo transparência; originais preservados. Criado derivado WebP 1280×643 da fotografia da fachada Aeroclube, com mesma proporção, sem alterar a cena; é uma versão comprimida/redimensionada, não pixel-idêntica. Foto passou de 3.588.797 para 120.740 bytes. A única mudança em `units.ts` é essa URL de imagem.
8. Excluída a pasta de relatórios da detecção de classes Tailwind para ela não inflar o CSS da aplicação: [diretiva oficial `@source not`](https://tailwindcss.com/docs/detecting-classes-in-source-files). Cores e tokens de identidade preservados.
9. `.gitignore` passa a ignorar arquivos `.env` e permitir `.env.example`. Não foi criada variável com credenciais. O lockfile foi atualizado pela tentativa compatível de `npm audit fix`.

### Arquivos alterados/criados

- `src/pages/Home.tsx`
- `src/hooks/useHomeReveals.ts`, `src/hooks/usePageNavigation.ts`
- `src/components/home/TrajectoryTimeline.tsx`, `ReviewsSection.tsx`, `InfiniteLogoMarquee.tsx`
- `src/components/layout/Header.tsx`, `src/components/ui/BrandLogo.tsx`
- `src/data/site.ts`, `src/data/units.ts` (apenas URL da fotografia)
- `src/styles/global.css`, `src/styles/tokens.css` (apenas exclusão da pasta audit no último)
- `index.html`, `vercel.json`, `public/robots.txt`, `.gitignore`, `package-lock.json`
- cinco derivados WebP em `public/assets/brand/`, `public/assets/brand/marquee/` e `public/assets/references/`
- `audit/` com relatório, verificações e evidências; README com referência a este relatório.

Excluídos: `src/components/ui/ViewportVideo.tsx`, `src/styles/viewport-video.css`, `public/videos/masterfit-institucional.mp4` e `public/videos/masterfit-institucional-poster.jpg`. Foram verificados os consumidores antes da remoção. Original MP4 preservado fora de public.

## Validação comercial

| Opção | Master / Aeroclube | Equilibrium / Aeroclube |
|---|---|---|
| Mensal | R$ 179,90/mês | R$ 159,90/mês |
| Trimestral | 3× R$ 159,90 | 3× R$ 139,90 |
| Semestral | 6× R$ 139,90 | 6× R$ 119,90 |
| Anual parcelado | 12× R$ 119,90 | 12× R$ 99,90 |
| Anual recorrente | R$ 139,90/mês | R$ 119,90/mês |

Ambos os anuais parcelados têm Amigo VIP, quatro acessos mensais para convidados. O benefício **não** foi atribuído aos recorrentes. Recorrência: cartão de crédito, limite requerido do valor mensal. Master mantém acesso conforme condições do plano e funcionamento; não se anuncia horário livre/24h. Equilibrium: segunda a sexta 10h–14h; sábados, domingos e feriados sem essa restrição, dentro do funcionamento.

São José: Horário Livre R$ 75,00/mês conforme funcionamento; Horário Restrito R$ 65,00/mês, 11h–15h nos dias/horários em que a academia funcionar. Nenhuma exceção de fim de semana foi inventada. Carrapateira: uma mensalidade de R$ 70,00/mês, sem condições extras. Assertions de preços, períodos, benefícios e URLs passaram em `verify-static.mjs`.

| Unidade | WhatsApp | Instagram cadastrado | Funcionamento cadastrado, preservado |
|---|---|---|---|
| Aeroclube | +55 83 99832-5451 | @masterfitjp | Seg–sex 05h–23h; sáb 07h–17h; dom 07h–12h |
| São José de Piranhas | +55 83 99619-1918 | @ct.masterfit | Seg–sex 06h–21h; sáb 13h–17h; dom fechado |
| Carrapateira | +55 83 99619-1918 | @ct.masterfit | Seg–sex 06h–21h; sáb 13h–17h; dom fechado |

Endereços e URLs de Maps/embeds preservados em `src/data/units.ts`. Contatos e horários gerais não foram substituídos pelas faixas de planos.

## Testes executados e limitações

- `npm run build`: passou; resultado em `build.txt`.
- `npm run lint`: passou; `lint.txt`.
- Seis testes existentes de partículas: passaram; `tests.txt`.
- `node --experimental-strip-types audit/verify-static.mjs`: passou; 13 opções comerciais, contatos e URLs, 25 referências a assets presentes, varredura heurística de segredos em fontes/configuração sem candidatos. `static-checks.json`.
- Não há diretório `.git`: não foi possível auditar histórico ou segredos em commits antigos. Não foram encontrados `.env` no projeto. Varredura heurística não garante ausência universal de segredos.
- Nove rotas × quatro larguras CSS (320, 430, 820, 1440): 36 verificações, sem overflow, um H1 por página, nenhum `<img>` sem atributo alt e nenhum link externo `_blank` sem noopener. São sete rotas reais e dois casos 404. `browser-routes.json`.
- HEAD local de rotas/arquivos do build: 42 solicitações, sem falhas; `http-checks.json`. Status/MIME do preview não prova headers/HTTPS na Vercel.
- Navegação: header “Nossa História” levou à âncora; menu mobile abriu, fechou por Escape devolvendo foco, e fechou ao navegar a Contato; footer levou ao Aeroclube e reload preservou a página.
- Hero: as três fontes de vídeo alcançaram readyState 4 e o final; Enter, retorno e Escape foram exercitados. Hover de São José abriu cinema. Clique único abriu a prévia no layout mobile. Não foi simulado um evento touch real.
- Timeline: barra observada em progresso ~0,77 com dois marcos ativos ao navegar ao marco de 2023. Código mantém atualização reversa por scroll e reduced-motion; não foi feita medição quantitativa de todas as posições de scroll.
- Leque: clique em Bárbara atualizou a história; Tab selecionou Cecilia e mostrou foco; movimento do ponteiro selecionou Toth sem clicar. A área continuou preenchida ao sair. Oito cartas mantidas; painel medido ~372 px na largura desktop testada. `interactions.json`.
- Galeria Aeroclube: próxima foto, abertura do diálogo e Escape funcionaram. Vídeos nativos das outras páginas têm poster e controles por inspeção; a reprodução efetiva testada foi a das prévias da Hero, não uma rodada exaustiva de cada controle nativo.
- Destinos de Instagram, WhatsApp, Google Maps e mensagens dos CTAs foram inspecionados. Não foram enviados contatos, validada a titularidade de perfis ou executada uma sessão autenticada nos serviços externos. Links externos não podem ser certificados apenas pelo href.
- Console das interações da rodada final: sem erros/avisos capturados. `interactions.json`.
- Lighthouse da Home, mobile emulado: 75 performance, 100 acessibilidade, 100 boas práticas, 100 SEO automatizado; FCP 1,5 s, LCP 8,4 s, TBT 10 ms, CLS 0. `lighthouse-final.report.html/json`. Medição de laboratório de uma rodada, não p75 de usuários reais. A pontuação SEO não cobre todas as pendências acima. A última pequena correção do link ativo do header não foi objeto de nova medição Lighthouse.
- Sem teste físico de toque, Safari/iOS, Android real, VoiceOver/NVDA ou alteração real da preferência de movimento do sistema. Os caminhos de reduced-motion foram inspecionados no código/CSS. Não houve deploy, teste de certificado HTTPS ou medição pública de Core Web Vitals.

## Próximos passos para aprovação

1. Resolver a exposição editorial de `/sobre` com conteúdo aprovado ou decisão do proprietário.
2. Realizar o aceite em touch real e registrar os resultados.
3. Preferencialmente reduzir o LCP mobile e revisar o alerta de nomes acessíveis da Hero.
4. No primeiro ambiente Vercel autorizado, executar o smoke test de HTTPS, headers, deep links e assets.
5. Com URL pública definida, completar SEO de URL; domínio próprio pode ser adquirido depois, como combinado.


## Atualização — remoção completa de Sobre nós (05/11/2026)

Após a revisão do proprietário, foi removido também o item Sobre nós do header/footer e excluída a página provisória. O endereço `/sobre` agora redireciona para `/#trajetoria`, preservando links antigos sem expor placeholders. Os dados editoriais provisórios exclusivos dessa página foram eliminados. Assim, **B1 está corrigido** nesta atualização; a descrição e o teste de `/sobre` acima registram a situação observada antes da correção. O parecer geral continua condicionado ao aceite touch real (B2); não houve deploy.
