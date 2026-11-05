import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AppRoutes } from "./routes/AppRoutes";
import { usePageNavigation } from "./hooks/usePageNavigation";
export default function App() {
  usePageNavigation();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <div id="top" />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}
