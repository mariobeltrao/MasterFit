import { useEffect, useId, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import "../../styles/logo-marquee.css";

interface Brand {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  crop: string;
  mode: "dark" | "light" | "alpha";
}
const brands: Brand[] = [
  {
    id: "technogym",
    name: "Technogym",
    src: "/assets/brand/marquee/technogym-original.webp",
    width: 915,
    height: 234,
    crop: "33 50 840 160",
    mode: "dark",
  },
  {
    id: "hammer-strength",
    name: "Hammer Strength",
    src: "/assets/brand/marquee/hammer-strength-original.webp",
    width: 456,
    height: 266,
    crop: "74 71 338 144",
    mode: "light",
  },
  {
    id: "masterfit",
    name: "Master Fit",
    src: "/assets/brand/marquee/masterfit-original.webp",
    width: 1839,
    height: 855,
    crop: "9 16 1823 833",
    mode: "alpha",
  },
];

/** Uses the original pixels as a mask; no redrawing, CSS blur, or deformation. */
function LogoArtwork({ brand }: { brand: Brand }) {
  const id = useId();
  const mask = `${id}-mask`;
  const invert = `${id}-invert`;
  return (
    <svg
      viewBox={brand.crop}
      className="marquee-logo"
      role="img"
      aria-label={brand.name}
      focusable="false"
    >
      <defs>
        {brand.mode === "dark" && (
          <filter id={invert} colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="linear" slope="-1" intercept="1" />
              <feFuncG type="linear" slope="-1" intercept="1" />
              <feFuncB type="linear" slope="-1" intercept="1" />
            </feComponentTransfer>
          </filter>
        )}
        <mask
          id={mask}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={brand.width}
          height={brand.height}
          style={{ maskType: brand.mode === "alpha" ? "alpha" : "luminance" }}
        >
          <image
            href={brand.src}
            width={brand.width}
            height={brand.height}
            filter={brand.mode === "dark" ? `url(#${invert})` : undefined}
          />
        </mask>
      </defs>
      <rect
        width={brand.width}
        height={brand.height}
        fill="currentColor"
        mask={`url(#${mask})`}
      />
    </svg>
  );
}

export function InfiniteLogoMarquee() {
  const [paused, setPaused] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const group = groupRef.current;
    const track = trackRef.current;
    if (!group || !track) return;
    const measure = () => {
      const width = group.getBoundingClientRect().width;
      const pixelsPerSecond = window.matchMedia("(max-width: 760px)").matches
        ? 40
        : 50;
      track.style.setProperty(
        "--marquee-duration",
        `${Math.max(24, width / pixelsPerSecond)}s`,
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    measure();
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className={`logo-marquee ${paused ? "is-paused" : ""}`}
      aria-label="Marcas em destaque"
    >
      <ul className="sr-only">
        {brands.map((brand) => (
          <li key={brand.id}>{brand.name}</li>
        ))}
      </ul>
      <div className="logo-marquee-viewport">
        <div className="logo-marquee-track" ref={trackRef} aria-hidden="true">
          {[0, 1].map((copy) => (
            <div
              className="logo-marquee-group"
              ref={copy === 0 ? groupRef : undefined}
              key={copy}
            >
              {[...brands, ...brands].map((brand, index) => (
                <div
                  className={`logo-marquee-item ${brand.id}`}
                  key={`${brand.id}-${index}`}
                >
                  <LogoArtwork brand={brand} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="logo-marquee-toggle"
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={
          paused ? "Retomar animação das logos" : "Pausar animação das logos"
        }
        aria-pressed={paused}
      >
        {paused ? (
          <Play size={14} aria-hidden="true" />
        ) : (
          <Pause size={14} aria-hidden="true" />
        )}
      </button>
    </section>
  );
}
