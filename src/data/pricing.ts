// Fontes: panfleto.master.pdf e panfleto.equilibrium.pdf. Exclusivo do Aeroclube.
export interface PricingPlan {
  id: string;
  name: string;
  amount: string;
  cadence?: string;
  installments?: number;
  period: string;
  accessiblePrice: string;
  featured?: boolean;
  note?: string;
  benefit?: string;
  /** Formas de pagamento informadas pelo proprietário. */
  payment: string[];
}
export interface PricingCategory {
  id: "master" | "equilibrium";
  name: string;
  description: string;
  access: string;
  startingPrice: string;
  disclosures: string[];
  plans: PricingPlan[];
}
const annualBenefit = "Amigo VIP: 4 acessos mensais para convidados.";
const recurrence = "Cobrança recorrente no cartão de crédito, com limite requerido correspondente ao valor mensal.";
export const annualVsRecurring = {
  title: "ANUAL × ANUAL COM RECORRÊNCIA",
  options: [
    { name: "Plano anual", text: "O valor total do plano é descontado do limite do cartão de crédito e dividido em 12 parcelas." },
    { name: "Plano anual com recorrência", text: "Somente cartão de crédito. A cobrança é feita mês a mês, então o cartão precisa ter limite apenas para o valor da mensalidade." },
  ],
};
const payment = {
  monthly: ["Cartão de crédito", "Cartão de débito", "PIX"],
  quarterly: ["PIX", "Cartão"],
  // CONFIRMAR COM O PROPRIETÁRIO: semestral não informado; segue a regra do trimestral.
  semiannual: ["PIX", "Cartão"],
  annual: ["Cartão de crédito em 12 parcelas (valor total descontado do limite)"],
  recurring: ["Somente cartão de crédito (cobra só o valor de cada mês)"],
};
function createPlans(amounts: string[]): PricingPlan[] {
  const [monthly, quarterly, semiannual, annual, recurring] = amounts;
  return [
    { id: "mensal", name: "Plano mensal", amount: monthly, cadence: "/mês", period: "Mensal", accessiblePrice: `R$ ${monthly} por mês`, payment: payment.monthly },
    { id: "trimestral", name: "Plano trimestral", amount: quarterly, installments: 3, period: "3 meses", accessiblePrice: `3 parcelas de R$ ${quarterly}`, payment: payment.quarterly },
    { id: "semestral", name: "Plano semestral", amount: semiannual, installments: 6, period: "6 meses", accessiblePrice: `6 parcelas de R$ ${semiannual}`, payment: payment.semiannual },
    { id: "anual", name: "Plano anual", amount: annual, installments: 12, period: "12 meses", accessiblePrice: `12 parcelas de R$ ${annual}`, featured: true, note: "**", benefit: annualBenefit, payment: payment.annual },
    { id: "anual-recorrente", name: "Plano anual com recorrência", amount: recurring, cadence: "/mês", period: "Anual · cobrança recorrente", accessiblePrice: `R$ ${recurring} por mês`, note: "***", benefit: recurrence, payment: payment.recurring },
  ];
}
export const aeroclubePricing = {
  eyebrow: "PLANOS MASTERFIT",
  title: "SEU PRÓXIMO NÍVEL COMEÇA AQUI.",
  subtitle: "Compare Master e Equilibrium e escolha a opção que combina com sua rotina de treinamento na unidade João Pessoa – Aeroclube.",
  categories: [
    {
      id: "master",
      name: "MASTER",
      description: "Conheça as opções do plano Master para treinar na unidade João Pessoa – Aeroclube.",
      access: "Acesso livre conforme o horário de funcionamento da unidade.",
      startingPrice: "A partir de R$ 119,90/mês no plano anual.",
      disclosures: [
        "O valor a partir de R$ 119,90/mês corresponde ao plano anual Master, em 12 parcelas.",
        `** Plano anual Master: pagamento no cartão de crédito em 12 parcelas; o valor total do plano é descontado do limite do cartão. Bônus ${annualBenefit}`,
        `*** Plano anual Master com recorrência: somente cartão de crédito. A cobrança é mensal, e o limite necessário corresponde apenas ao valor da mensalidade.`,
      ],
      plans: createPlans(["179,90", "159,90", "139,90", "119,90", "139,90"]),
    },
    {
      id: "equilibrium",
      name: "EQUILIBRIUM",
      description: "Uma opção com valores menores para quem consegue organizar seus treinos dentro de horários específicos.",
      access: "De segunda a sexta, o plano Equilibrium permite acesso das 10h às 14h. Aos sábados, domingos e feriados, não há essa restrição de faixa horária, respeitando o funcionamento da unidade.",
      startingPrice: "A partir de R$ 99,90/mês no plano anual.",
      disclosures: [
        "O valor a partir de R$ 99,90/mês corresponde ao plano anual Equilibrium, em 12 parcelas.",
        `** Plano anual Equilibrium: pagamento no cartão de crédito em 12 parcelas; o valor total do plano é descontado do limite do cartão. Bônus ${annualBenefit}`,
        `*** Plano anual Equilibrium com recorrência: somente cartão de crédito. A cobrança é mensal, e o limite necessário corresponde apenas ao valor da mensalidade.`,
      ],
      plans: createPlans(["159,90", "139,90", "119,90", "99,90", "119,90"]),
    },
  ] satisfies PricingCategory[],
};
export function planWhatsAppUrl(whatsapp: string, planName: string, category: string) {
  const url = new URL(whatsapp);
  url.searchParams.set("text", `Olá! Gostaria de saber mais sobre o ${planName.toLocaleLowerCase("pt-BR")} da categoria ${category} da MasterFit João Pessoa – Aeroclube.`);
  return url.toString();
}
