import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { Home } from "../pages/Home";
import { Units } from "../pages/Units";
import { Contact } from "../pages/Contact";
import { NotFound } from "../pages/NotFound";
import { UnitPageTemplate } from "../components/units/UnitPageTemplate";
import { units } from "../data/units";
function UnitPage() {
  const { slug } = useParams();
  const unit = units.find((item) => item.slug === slug);
  return unit ? <UnitPageTemplate unit={unit} /> : <NotFound />;
}
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/unidades" element={<Units />} />
      <Route path="/unidades/:slug" element={<UnitPage />} />
      <Route path="/sobre" element={<Navigate to="/#trajetoria" replace />} />
      <Route path="/contato" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
