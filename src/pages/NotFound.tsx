import { Button, Container } from "../components/ui";
export function NotFound() {
  return (
    <section className="section not-found">
      <Container>
        <span className="eyebrow">404 / Página não encontrada</span>
        <h1>
          Vamos encontrar
          <br />
          outro caminho.
        </h1>
        <p>Esta página não existe. Continue explorando a MasterFit.</p>
        <Button to="/">Voltar para o início</Button>
      </Container>
    </section>
  );
}
