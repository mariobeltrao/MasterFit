/** Imagem oficial com pixels preservados: sem filtros, recorte ou mudança de proporção. */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <img
      className={`brand-logo ${className}`}
      src="/assets/brand/masterfit-logo-extracao-fiel-transparente.webp"
      width={1728}
      height={952}
      alt="MasterFit — Training center"
      decoding="async"
    />
  );
}
