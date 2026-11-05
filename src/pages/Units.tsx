import { PageHero, Container, CTASection } from "../components/ui";
import { UnitCard } from "../components/units/UnitCard";
import { units } from "../data/units";
export function Units() {
  return (
    <>
      <PageHero
        eyebrow="Encontre a sua unidade"
        title="Três lugares. Seu próximo passo."
        description="Explore Aeroclube, São José de Piranhas e Carrapateira. As informações oficiais de cada espaço serão adicionadas em breve."
      />
      <section className="section">
        <Container>
          <h2 className="sr-only">Todas as unidades</h2>
          <div className="units-grid">
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title="Qual unidade faz parte do seu caminho?"
        text="Acesse os espaços de contato de cada unidade."
        to="/contato"
        label="Ver canais de contato"
      />
    </>
  );
}
