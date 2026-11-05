// Valores e condições fornecidos diretamente pelo proprietário para estas unidades.
export interface MonthlyPlan {
  id: string;
  name: string;
  amount: string;
  description: string;
  access?: string;
  accessDetail?: string;
  featured?: boolean;
  restricted?: boolean;
  message: string;
}
interface MonthlyPricing {
  title: string;
  subtitle: string;
  plans: MonthlyPlan[];
}
export const monthlyPricingByUnit: Record<string, MonthlyPricing | undefined> = {
  "sao-jose-de-piranhas": {
    title: "SEU TREINO, NO SEU HORÁRIO.",
    subtitle: "Conheça as duas mensalidades da MasterFit São José de Piranhas e escolha a opção que combina com sua rotina.",
    plans: [
      {
        id: "horario-livre",
        name: "Horário Livre",
        amount: "75,00",
        description: "Mais liberdade para organizar seus treinos de acordo com sua rotina.",
        access: "Acesso conforme o funcionamento da unidade.",
        featured: true,
        message: "Olá! Gostaria de saber mais sobre a mensalidade de R$ 75,00 com horário livre da MasterFit São José de Piranhas.",
      },
      {
        id: "horario-restrito",
        name: "Horário Restrito",
        amount: "65,00",
        description: "Uma opção econômica para quem prefere treinar em horários específicos.",
        access: "ACESSO RESTRITO: DAS 11H ÀS 15H",
        accessDetail: "Faixa de acesso válida nos dias e horários em que a unidade estiver funcionando.",
        restricted: true,
        message: "Olá! Gostaria de saber mais sobre a mensalidade de R$ 65,00, com acesso das 11h às 15h, da MasterFit São José de Piranhas.",
      },
    ],
  },
  carrapateira: {
    title: "SUA ROTINA COMEÇA AQUI.",
    subtitle: "Conheça a mensalidade da MasterFit Carrapateira.",
    plans: [
      {
        id: "mensalidade",
        name: "Mensalidade",
        amount: "70,00",
        description: "Seu espaço para manter uma rotina de treinamento.",
        message: "Olá! Gostaria de saber mais sobre a mensalidade de R$ 70,00 da MasterFit Carrapateira.",
      },
    ],
  },
};
export function monthlyPlanWhatsAppUrl(whatsapp: string, message: string) {
  const url = new URL(whatsapp);
  url.searchParams.set("text", message);
  return url.toString();
}
