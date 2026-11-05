# Design System — Gymbox Reference

> **Base da análise:** gravação de 12,45 segundos da versão desktop de gymbox.com, com resolução de 2940 × 1846 px. Os valores de cores foram obtidos por amostragem visual; dimensões tipográficas e espaciais são aproximadas. Elementos não exibidos no vídeo estão identificados como não verificáveis.

## 1. Cores

A identidade visual utiliza **preto dominante, amarelo vibrante e branco de alto contraste**. As cores vermelha, azul, verde e roxa aparecem principalmente nas fotografias e na iluminação dos ambientes, não como cores institucionais de interface.

### Paleta principal

| Token | HEX | Uso observado |
|---|---|---|
| `primary` | `#F6C930` | CTAs, títulos, destaques, indicadores e badges |
| `background` | `#000000` | Fundo principal, header, seções e footer |
| `foreground` | `#FFFFFF` | Títulos, navegação, descrições e ícones |
| `neutral-dark` | `#171717` | Superfícies escuras auxiliares |
| `neutral-muted` | `#8C8C8C` | Linhas divisórias e texto secundário |
| `neutral-subtle` | `#505050` | Indicadores inativos e separadores |
| `contrast-surface` | `#FFFFFF` | Botão secundário preenchido |

### Cores secundárias

Não há uma segunda cor de marca claramente estabelecida. O sistema é essencialmente monocromático, com o amarelo como destaque.

As fotografias introduzem cores contextuais:

- Vermelho intenso em tratamentos de recuperação.
- Verde escuro em ambientes de treinamento.
- Azul e roxo nas áreas com iluminação artificial.
- Laranja e âmbar em fotografias de equipamentos.

Essas cores devem continuar pertencendo ao conteúdo visual, sem se tornarem automaticamente cores de botões ou elementos de interface.

### Estados interativos

| Estado | Cor / regra | Evidência |
|---|---|---|
| Default primário | `#F6C930` | Observado |
| Default secundário | `#FFFFFF` | Observado |
| Selecionado / indicador | `#F6C930` | Observado nos indicadores de carrossel |
| Hover | Variação do amarelo original | Não demonstrado no vídeo |
| Active / pressed | Variação do amarelo original | Não demonstrado |
| Focus | Contorno de alto contraste | Especificação de acessibilidade |
| Erro | Não identificado | Não demonstrado |
| Sucesso | Não identificado | Não demonstrado |
| Disabled | Não identificado | Não demonstrado |

**Nota:** não atribuir cores de erro ou sucesso como se fossem extraídas da referência.

---

## 2. Tipografia

### Características visuais

A tipografia apresenta:

- Família sem serifa, geométrica e expandida.
- Títulos com peso elevado e formas largas.
- Predominância de caixa alta.
- Espaçamento relativamente compacto em títulos grandes.
- Textos menores com peso reduzido e maior abertura entre caracteres.
- Hierarquia marcada principalmente pelo tamanho, peso e cor.

**Família exata:** não pode ser confirmada apenas pela gravação. Os títulos apresentam características de fontes *extended / wide display*. Não é possível afirmar o nome comercial sem inspecionar as fontes renderizadas do site.

### Escala tipográfica aproximada

| Token | Desktop | Peso | Line-height | Letter-spacing |
|---|---:|---:|---:|---:|
| `display-xl` | 72–80px | 800–900 | 0.95 | -0.03em |
| `display-lg` | 56–68px | 800–900 | 1.0 | -0.025em |
| `heading-lg` | 36–44px | 800 | 1.05 | -0.015em |
| `heading-md` | 26–32px | 700–800 | 1.1 | -0.01em |
| `body-lg` | 20–24px | 400–500 | 1.3 | 0 |
| `body-md` | 16–18px | 400–500 | 1.5 | 0 |
| `label` | 14–17px | 600–700 | 1.2 | 0.02em |
| `caption` | 11–13px | 600–700 | 1.25 | 0.06em |

### Aplicação visual

| Exemplo de conteúdo | Tratamento |
|---|---|
| `NOTHIN' LIKE IT` | Display grande, amarelo, caixa alta e peso máximo |
| `BEST EQUIPMENT` | Heading grande, branco, caixa alta |
| `Inside London's Most Creative Gym With 10 Locations` | Texto de apoio branco |
| `OFFER ENDS IN: 02 DAYS` | Caption menor, cinza |

---

## 3. Tokens CSS

Tokens organizados a partir dos padrões visíveis. Onde não há medição exata, os valores são aproximações de implementação.

```css
:root {
  /* COLORS */
  --color-primary: #F6C930;
  --color-black: #000000;
  --color-white: #FFFFFF;

  --color-neutral-900: #171717;
  --color-neutral-500: #8C8C8C;
  --color-neutral-700: #505050;

  /* SEMANTIC COLORS */
  --color-bg: var(--color-black);
  --color-text: var(--color-white);
  --color-accent: var(--color-primary);
  --color-border: var(--color-neutral-700);

  /* TYPOGRAPHY
     Fallbacks temporários.
     Família exata não identificada. */
  --font-display: "Arial Black", Arial, sans-serif;
  --font-body: "Helvetica Neue", Arial, sans-serif;

  --text-display-xl: 4.5rem;
  --text-display-lg: 4rem;
  --text-heading-lg: 2.5rem;
  --text-heading-md: 1.875rem;
  --text-body-lg: 1.375rem;
  --text-body: 1rem;
  --text-caption: 0.75rem;

  --weight-normal: 400;
  --weight-medium: 500;
  --weight-bold: 700;
  --weight-black: 900;

  /* SPACING */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.25rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 4rem;
  --space-7: 6rem;

  /* RADIUS */
  --radius-none: 0;
  --radius-card: 0.875rem;
  --radius-circle: 50%;

  /* LAYOUT */
  --container-max: 1254px;
  --container-gutter: clamp(20px, 6.8vw, 100px);
  --grid-gap: 20px;

  /* SHADOW / IMAGE OVERLAY */
  --shadow-none: none;
  --image-overlay: linear-gradient(
    180deg,
    transparent 35%,
    rgba(0, 0, 0, 0.85) 100%
  );

  /* TRANSITIONS: proposed, not measured */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

A referência não apresenta sombras elevadas típicas de interfaces com cards flutuantes. A profundidade é obtida principalmente por fotografias, iluminação e sobreposições escuras.

---

## 4. Layout

### Estrutura identificada

O vídeo mostra uma página predominantemente vertical, composta por blocos de alto impacto visual.

| Elemento | Padrão observado |
|---|---|
| Container | Centralizado, aproximadamente 1254px na captura normalizada |
| Margens desktop | Aproximadamente 100px nas seções contidas |
| Header | Horizontal, preto, persistente durante o scroll |
| Hero | Largura total, vídeo de fundo e conteúdo centralizado |
| Grid de benefícios | 4 colunas |
| Gap entre cards | Aproximadamente 20px |
| Cards de aulas | Carrossel horizontal de imagens largas |
| Cards de novidades | 2 colunas grandes |
| Galeria social | Mosaico fotográfico de múltiplas colunas |
| Localizações | Lista à esquerda e fotografia grande à direita |
| Footer | Colunas de links com títulos amarelos |

### Grid

```css
.container {
  width: min(
    calc(100% - 2 * var(--container-gutter)),
    var(--container-max)
  );
  margin-inline: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--grid-gap);
}

.upgrades-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-6);
}
```

### Escala de espaçamento

| Espaçamento | Valor de referência | Aplicação |
|---|---:|---|
| XS | 8px | Separação entre detalhes |
| SM | 16px | Textos e controles próximos |
| MD | 20px | Gap identificado entre cards |
| LG | 32px | Títulos e conteúdos |
| XL | 48px | Grupos de elementos |
| 2XL | 64px | Cards e chamadas |
| 3XL | 96px | Separação de seções |

A cadência visual alterna **áreas de respiro generosas com grandes blocos de imagens**. Não é uma interface compacta.

---

## 5. Componentes

### 5.1 Botões

| Variante | Fundo | Texto | Borda | Raio |
|---|---|---|---|---|
| Primary (`JOIN NOW`) | Amarelo | Preto | Nenhuma | 0 |
| Secondary (`FREE TRIAL`) | Branco | Preto | Nenhuma | 0 |
| Outline (`VIEW CLASSES`) | Transparente | Branco | Branca, fina | 0 |
| Link | Transparente | Branco | Nenhuma | 0 |
| Icon | Transparente | Branco | Nenhuma | 0 |

Padrões reais: botões retangulares, sem cantos arredondados perceptíveis, texto em caixa alta, seta para a direita e largura generosa.

### 5.2 Cards

| Variante | Características |
|---|---|
| Feature card | Vertical, cantos arredondados (~14px), título branco na base |
| Class card | Horizontal, imagem escurecida, título grande e botão outline |
| Upgrade card | Fotografia larga, contraste dramático, informações sobrepostas |
| Social card | Imagem quase integral, pouca interface |
| Location row | Texto branco, divisor cinza e seta diagonal |

Evitar cards brancos com sombras convencionais, pois não fazem parte da linguagem observada.

### 5.3 Navegação

- Logotipo à esquerda.
- Links alinhados horizontalmente.
- CTA amarelo à direita.
- Fundo preto sólido.
- Navegação permanece visível durante a rolagem.
- Sem fundos individuais ou caixas ao redor dos links.

### 5.4 Badges

O vídeo exibe um badge circular amarelo sobre uma imagem de novidades, com texto preto em caixa alta, centralizado e ligeiramente inclinado.

```css
.badge--highlight {
  width: 110px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-black);

  display: grid;
  place-items: center;
  text-align: center;

  font-weight: 900;
  text-transform: uppercase;
  transform: rotate(-12deg);
}
```

A rotação e o diâmetro são aproximações da composição vista.

### 5.5 Inputs, modais e acordeões

| Componente | Situação |
|---|---|
| Input de texto | Não aparece no vídeo |
| Select | Não aparece |
| Checkbox | Não aparece |
| Modal | Não aparece |
| Acordeão FAQ | Observado |
| Controles de carrossel | Observados |

O FAQ utiliza linhas horizontais finas, perguntas em branco e símbolo `+` amarelo à direita.

Não é possível extrair estados de input, dimensões de modal ou comportamento de validação dessa gravação.

---

## 6. Responsividade

**Limitação da referência:** somente a versão desktop é mostrada. O vídeo não comprova a existência nem o comportamento de menu mobile, carrosséis mobile ou breakpoints reais.

A seguir, uma adaptação *mobile first* que preserva os padrões observados no desktop.

### Breakpoints propostos

| Dispositivo | Largura | Comportamento recomendado |
|---|---|---|
| Mobile | Até 767px | Uma coluna, CTA acessível, menu compacto |
| Tablet | 768–1199px | Duas colunas para benefícios e novidades |
| Desktop | 1200px+ | Quatro cards, header completo e layouts divididos |

```css
/* MOBILE FIRST */
.features-grid,
.upgrades-grid,
.locations-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  line-height: 0.95;
}

@media (min-width: 768px) {
  .features-grid,
  .upgrades-grid,
  .locations-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .hero-title {
    font-size: 4.5rem;
  }
}
```

Na implementação mobile, priorizar a manutenção da tipografia marcante, imagens grandes, botões retangulares e contraste preto/amarelo. Reduzir colunas antes de reduzir excessivamente a tipografia.

---

## 7. Usabilidade e acessibilidade

### Contraste

| Combinação | Contraste aproximado | Avaliação WCAG |
|---|---:|---|
| Preto sobre amarelo | 13,32:1 | AAA |
| Branco sobre preto | 21:1 | AAA |
| Branco sobre amarelo | 1,58:1 | Insuficiente |
| Cinza `#8C8C8C` sobre preto | 6,25:1 | AA para texto normal |

### Regras

- Manter texto preto sobre botões amarelos.
- Não utilizar branco sobre amarelo como combinação principal.
- Garantir pelo menos 44 × 44px como alvo recomendado de toque.
- Exibir foco de teclado claramente distinguível.
- Aplicar sobreposição escura nas imagens antes de inserir texto branco.
- Garantir que CTAs não dependam exclusivamente de cor.
- Oferecer alternativa estática ao vídeo de fundo e respeitar `prefers-reduced-motion`.
- Utilizar títulos semânticos em ordem lógica, independentemente da aparência visual.

### Foco visível

```css
:where(a, button, input, select, textarea):focus-visible {
  outline: 3px solid var(--color-white);
  outline-offset: 3px;
}

.btn--secondary:focus-visible {
  outline-color: var(--color-primary);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Direção de imagens

A fotografia é um dos pilares centrais do design, com linguagem energética, noturna e cinematográfica.

### Características

| Aspecto | Padrão observado |
|---|---|
| Estilo | Editorial fitness, urbano e cinematográfico |
| Iluminação | Artificial, contrastada, com luzes coloridas |
| Pessoas | Atletas em ação e interações espontâneas |
| Ambientes | Equipamentos, áreas de treino e recuperação |
| Tratamento | Pretos profundos, sombras densas e cores intensas |
| Enquadramento | Pessoas próximas, movimento e cortes marcantes |
| Composição | Fotografias ocupam grande parte da interface |
| Overlay | Gradiente preto sobre imagens para legibilidade |

### Proporções observadas

| Componente | Proporção aproximada |
|---|---|
| Hero | Full width, altura variável |
| Feature card | 1:2 |
| Class card | 2.5:1 |
| Upgrade card | 16:9 a 2:1 |
| Gallery | Cards retangulares em mosaico |
| Location image | Vertical ou quase quadrada |

### Ícones

- Ícones lineares e simples.
- Setas horizontais e diagonais.
- Indicadores de mais (`+`) no FAQ.
- Controles de carrossel com setas.
- Ícones sociais discretos no footer.

Evitar ícones preenchidos e multicoloridos sem necessidade. A direção visual usa predominantemente traços brancos ou amarelos.

---

## 9. Regras de implementação

### Convenções de nomenclatura

| Categoria | Padrão | Exemplo |
|---|---|---|
| Componentes React | PascalCase | `FeatureCard` |
| Classes CSS | kebab-case / BEM | `.feature-card__title` |
| Tokens CSS | kebab-case | `--color-primary` |
| Variantes | Modificador BEM | `.button--outline` |
| Arquivos de componentes | PascalCase | `HeroSection.tsx` |
| Assets | kebab-case | `recovery-zone.webp` |

### Estrutura sugerida

```text
src/
├── components/
│   ├── Header/
│   ├── Button/
│   ├── FeatureCard/
│   ├── ClassCarousel/
│   ├── UpgradeCard/
│   ├── FAQAccordion/
│   └── Footer/
├── sections/
│   ├── HeroSection/
│   ├── FeaturesSection/
│   ├── ClassesSection/
│   ├── UpgradesSection/
│   ├── SocialGallery/
│   └── LocationsSection/
├── styles/
│   ├── tokens.css
│   ├── typography.css
│   ├── globals.css
│   └── utilities.css
└── assets/
    ├── images/
    ├── videos/
    └── icons/
```

### Boas práticas

1. Centralizar os tokens em um único arquivo CSS.
2. Implementar componentes reutilizáveis com variantes explícitas.
3. Preservar os grandes espaços negativos entre seções.
4. Priorizar imagens otimizadas em AVIF/WebP, com dimensões definidas.
5. Usar `object-fit: cover` e ajustar `object-position` para cada imagem.
6. Reservar o amarelo para ações, destaques e elementos de maior importância.
7. Usar animações discretas que não prejudiquem o scroll nem a navegação.
8. Manter a navegação persistente sem esconder o conteúdo ao navegar por âncoras.
9. Implementar carrosséis com controles acessíveis e suporte a teclado.
10. Respeitar as licenças das fotografias, fontes e demais recursos originais.

### O que evitar

| Evitar | Motivo |
|---|---|
| Excesso de cores na UI | Enfraquece a identidade preto/amarelo |
| Cards brancos elevados | Divergem dos cards fotográficos observados |
| Gradientes decorativos em botões | Os CTAs vistos são sólidos |
| Bordas muito arredondadas | Botões têm geometria retangular |
| Sombras fortes em blocos | A profundidade vem das imagens |
| Fontes condensadas e delicadas | Perdem a presença dos títulos largos |
| Animações excessivas | Competem com vídeos e fotografias |
| Fotografias genéricas muito claras | Não acompanham a linguagem noturna |
| Copiar logotipo, textos ou imagens da Gymbox | Pode infringir direitos de marca e propriedade intelectual |

### Princípios visuais finais

**Preto como estrutura. Amarelo como impacto. Branco como informação. Fotografia como experiência.**

A identidade extraída da referência se sustenta em tipografia expandida, composições de grande escala, fotografias de alto contraste, botões retangulares, grandes áreas negativas e poucos elementos decorativos.

**Itens pendentes de validação:** família tipográfica exata, tamanhos CSS computados, tokens oficiais de hover/erro/sucesso, breakpoints reais e especificações de inputs e modais. Esses detalhes não podem ser apresentados como fatos extraídos do vídeo.
