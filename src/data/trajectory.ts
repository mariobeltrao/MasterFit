// Milestones supplied by the project owner; no dates inferred from media.
export interface Milestone {
  /** Unique key; never derive React keys from the year (two milestones share 2025). */
  id: string;
  /** Visible date label. */
  label: string;
  /** ISO date for <time dateTime>; omitted on teasers (no date announced). */
  dateTime?: string;
  /** Teaser milestone: no date, rendered as a "mystery box". */
  teaser?: boolean;
  title: string;
  description: string;
}
export const trajectory: Milestone[] = [
  {
    id: "sao-jose-2020",
    label: "2020",
    dateTime: "2020-11-19",
    title: "O COMEÇO NO SERTÃO",
    description: "Em 19 de novembro, nasce a primeira MasterFit no Centro de São José de Piranhas, com foco em musculação e uma estrutura moderna para a cidade.",
  },
  {
    id: "carrapateira-2025-05",
    label: "MAI 2025",
    dateTime: "2025-05",
    title: "EXPANSÃO EM CARRAPATEIRA",
    description: "Em maio de 2025, a MasterFit chega a Carrapateira e amplia sua presença no Sertão, com musculação e treinamento funcional.",
  },
  {
    id: "aeroclube-2025-10",
    label: "OUT 2025",
    dateTime: "2025-10",
    title: "CHEGADA À CAPITAL",
    description: "Em outubro de 2025, a rede inaugura a unidade João Pessoa – Aeroclube, com uma estrutura de dois pisos climatizados.",
  },
  {
    id: "cajazeiras-em-breve",
    teaser: true,
    label: "EM BREVE",
    title: "PRÓXIMA PARADA: CAJAZEIRAS",
    description: "Uma nova unidade MasterFit está a caminho. Em breve, mais novidades.",
  },
];
