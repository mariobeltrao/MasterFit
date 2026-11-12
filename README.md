<div align="center">

<img src="public/assets/brand/masterfit-logo-extracao-fiel-transparente.png" alt="Logo MasterFit" width="220" />

# MasterFit — Seu próximo movimento

Site institucional da rede de academias **MasterFit**, com três unidades na Paraíba:
**Aeroclube** (João Pessoa), **São José de Piranhas** e **Carrapateira**.

![React](https://img.shields.io/badge/React-19-0B0B0D?style=flat-square&logo=react&logoColor=F4CF1A)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-0B0B0D?style=flat-square&logo=typescript&logoColor=F4CF1A)
![Vite](https://img.shields.io/badge/Vite-6-0B0B0D?style=flat-square&logo=vite&logoColor=F4CF1A)
![React Router](https://img.shields.io/badge/React_Router-7-0B0B0D?style=flat-square&logo=reactrouter&logoColor=F4CF1A)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-0B0B0D?style=flat-square&logo=tailwindcss&logoColor=F4CF1A)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-0B0B0D?style=flat-square&logo=vercel&logoColor=F4CF1A)

</div>

---

## Filme de lançamento

<!--
  COMO ADICIONAR: edite este README no github.com e arraste o arquivo
  LauchingVideoMaster.mp4 para a linha em branco abaixo deste comentário.
  O GitHub vai gerar um link https://github.com/user-attachments/assets/...
  Mantenha esse link sozinho na linha, com uma linha em branco antes e depois.
-->

## O site em movimento

<!--
  COMO ADICIONAR: arraste o arquivo LauchingVideoMasterSite-github.mp4
  (versão comprimida, abaixo de 10 MB) para a linha em branco abaixo.
-->

---

## Sobre o projeto

Uma experiência escura, cinematográfica e responsiva para apresentar a marca, sua trajetória e cada unidade, com foco em exploração e em conversão pelo WhatsApp.

O site é **100% front-end**: não há backend, checkout, cadastro nem área do aluno. Todo o conteúdo institucional (unidades, horários, planos, avaliações e trajetória) vive em arquivos de dados tipados, separados dos componentes.

## Visão geral

### Hero interativa

Três caminhos, um para cada unidade. Ao escolher um destino, um vídeo faz a aproximação do satélite até a fachada real da academia.

![Hero da Home com os três destinos](docs/readme/01-hero.jpg)

![Aproximação por satélite até a fachada da unidade Aeroclube](docs/readme/02-hero-satellite-zoom.jpg)

### Nossa trajetória

Timeline vertical com os marcos da rede. A linha amarela acompanha a rolagem e retrocede ao subir a página.

![Timeline com os marcos de 2020, 2023 e 2024](docs/readme/03-trajetoria.jpg)

### Nossas unidades

![Cards das três unidades na Home](docs/readme/04-nossas-unidades.jpg)

### Histórias de quem treina

Avaliações reais em um leque de cartas: passar o mouse, focar pelo teclado ou tocar em uma carta atualiza a história exibida abaixo.

![Leque de depoimentos com uma história em destaque](docs/readme/05-depoimentos.jpg)

### CTA final e rodapé

![Chamada final e rodapé](docs/readme/06-cta-final.jpg)

### Páginas das unidades

Todas as unidades usam um único template, com apresentação, fotos e vídeos reais, localização, funcionamento, planos e contatos.

| Catálogo de unidades | Unidade Aeroclube |
| :---: | :---: |
| ![Página de unidades](docs/readme/07-pagina-unidades.jpg) | ![Página da unidade Aeroclube](docs/readme/08-unidade-aeroclube.jpg) |
| **Planos Master e Equilibrium** | **Unidade São José de Piranhas** |
| ![Planos da unidade Aeroclube](docs/readme/09-planos-aeroclube.jpg) | ![Página da unidade São José de Piranhas](docs/readme/10-unidade-sao-jose.jpg) |

## Funcionalidades

- **Hero cinematográfica:** prévia por hover, abertura por clique, teclado ou toque; controles de pausar, continuar, pular e voltar; imagem alternativa em caso de erro; `Esc` para retornar. Só o vídeo escolhido é carregado.
- **Fundo de partículas magnéticas** desenhado em `<canvas>`, com física independente da taxa de quadros e densidade reduzida no mobile.
- **Faixa infinita de logos** com botão de pausa.
- **Timeline sincronizada com a rolagem**, com entradas animadas que acontecem uma única vez.
- **Leque de depoimentos** sem setas nem modal: a última história escolhida permanece visível.
- **Galeria de fotos** com miniaturas, ampliação e navegação.
- **Planos por unidade**, com CTAs que abrem o WhatsApp já com a unidade e o plano escolhidos na mensagem.
- **Mapas de localização** e links oficiais de Instagram e WhatsApp por unidade.
- **Página 404** com `noindex` e redirecionamento da antiga rota `/sobre` para a seção de trajetória.

## Tecnologias

| Camada | Tecnologia | Uso |
| --- | --- | --- |
| Interface | **React 19** | Componentes e estado da interface |
| Linguagem | **TypeScript 5.7** | Tipagem dos componentes e dos dados |
| Build | **Vite 6** | Servidor de desenvolvimento e build de produção |
| Rotas | **React Router 7** | Navegação SPA, rotas dinâmicas por unidade e 404 |
| Estilo | **Tailwind CSS 4** + CSS próprio | Utilitários e folhas de estilo por seção, com tokens de design |
| Ícones | **Lucide React** | Ícones da interface |
| Animação | CSS, `IntersectionObserver`, `requestAnimationFrame` | Sem bibliotecas de animação |
| Qualidade | **ESLint 9** + `node:test` | Lint e testes unitários |
| Hospedagem | **Vercel** | Configuração SPA e cabeçalhos de segurança em `vercel.json` |

## Arquitetura

```mermaid
flowchart LR
  subgraph Dados["src/data"]
    U[units.ts]
    P[pricing.ts / monthlyPricing.ts]
    R[reviews.ts]
    T[trajectory.ts]
    H[hero.ts]
  end
  subgraph App["Aplicação"]
    RT[routes/AppRoutes.tsx]
    PG[pages/]
    CP[components/]
  end
  A[(public/ — fotos, vídeos, logos)]
  Dados --> CP
  RT --> PG --> CP
  A --> CP
  CP -->|CTA| W[WhatsApp]
```

Os componentes nunca guardam endereço, horário, preço ou contato: tudo vem de `src/data`. Para alterar uma unidade, basta editar o objeto dela em `units.ts`, e as páginas, a Hero e os cards se atualizam juntos.

```text
src/
├── components/
│   ├── home/        Hero, vídeo cinematográfico, partículas, timeline, depoimentos, faixa de logos
│   ├── units/       Template de unidade, galeria, mapa, planos, cards
│   ├── layout/      Header e Footer
│   └── ui/          Botões, títulos de seção, container e outros blocos reutilizáveis
├── data/            Unidades, planos, avaliações, trajetória e destinos da Hero
├── hooks/           Navegação (título, descrição, foco e âncoras) e revelações por rolagem
├── pages/           Home, Unidades, Contato e 404
├── routes/          Definição das rotas
└── styles/          Tokens de design e estilos por seção
public/
├── assets/          Logos oficiais e fotos das unidades (JPG/WebP em vários tamanhos)
└── videos/          Vídeos de aproximação por satélite e quadros finais
```

### Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/unidades` | Catálogo das três unidades |
| `/unidades/aeroclube` | Unidade Aeroclube |
| `/unidades/sao-jose-de-piranhas` | Unidade São José de Piranhas |
| `/unidades/carrapateira` | Unidade Carrapateira |
| `/contato` | Canais por unidade |
| `/sobre` | Redireciona para `/#trajetoria` |
| Qualquer outra | Página 404 (`noindex`) |

## Design system

| Token | Cor | Papel |
| --- | --- | --- |
| Background | `#0B0B0D` | Fundo principal |
| Surface | `#18191D` | Cards e painéis |
| Surface elevada | `#24252A` | Destaques de superfície |
| Amarelo principal | `#F4CF1A` | Interações e destaques |
| Amarelo hover | `#FFE147` | Estado de hover |
| Dourado da marca | `#D09636` | Detalhes da identidade |
| Texto | `#F7F7F7` | Texto principal |
| Texto secundário | `#B8BAC1` | Apoio e legendas |
| Roxo de atmosfera | `#7137A8` | Atmosfera das fotografias |

Todas as cores, espaçamentos e tempos de transição estão centralizados em `src/styles/tokens.css`.

## Acessibilidade e desempenho

- Navegação completa por teclado, com foco visível e restauração de foco ao fechar a experiência da Hero.
- Respeito a `prefers-reduced-motion`: as animações são reduzidas ou substituídas por estados estáticos.
- Regiões `aria-live` anunciam a história e a foto selecionadas; elementos ocultos usam `inert`.
- Título, descrição e `robots` atualizados a cada rota.
- Vídeos montados somente quando escolhidos (`preload="none"`) e imagens em vários tamanhos.

## Como rodar

Requer **Node.js 20.19+** ou **22.12+**.

```bash
npm install
npm run dev
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos e build de produção em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm run lint` | Lint com ESLint |

Testes da física das partículas:

```bash
node --experimental-strip-types --test src/components/home/magneticParticles.test.ts
```

## Deploy

O projeto já está configurado para a Vercel em `vercel.json`: build com Vite, saída em `dist/`, redirecionamento de todas as rotas para `index.html` (SPA) e cabeçalhos `X-Content-Type-Options`, `Referrer-Policy` e `X-Frame-Options`.

## Documentação

- [Histórico de desenvolvimento](docs/HISTORICO-DESENVOLVIMENTO.md)
- [Relatório de auditoria pré-deploy](audit/RELATORIO-PRE-DEPLOY.md)

---

<div align="center">

Marca, fotografias, vídeos e avaliações são materiais reais da MasterFit.

</div>
