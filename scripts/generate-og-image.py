"""Gera a imagem de compartilhamento (Open Graph) da MasterFit.

Uso (Pillow fora do projeto, ex.: venv temporário):
    python3 -m venv /tmp/ogvenv && /tmp/ogvenv/bin/pip install Pillow
    /tmp/ogvenv/bin/python scripts/generate-og-image.py

Saída: public/og/masterfit-share-v2.png (1200x630, fundo #0B0B0D, logo centralizada).
A logo é usada com os pixels originais: só as margens transparentes são aparadas e
ela é redimensionada proporcionalmente (LANCZOS), sem recolorir nem aplicar filtros.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/assets/brand/masterfit-logo-extracao-fiel-transparente.png"
OUT = ROOT / "public/og/masterfit-share-v2.png"

CANVAS_W, CANVAS_H = 1200, 630
BACKGROUND = (0x0B, 0x0B, 0x0D)
# O WhatsApp pode cortar o preview para um quadrado central de 630x630.
# A logo precisa caber nele com folga, então a largura visível fica limitada a 560 px
# (~47% do canvas; 35 px de respiro de cada lado dentro do quadrado).
LOGO_MAX_W = 560
LOGO_MAX_H = 400


def main() -> None:
    logo = Image.open(SRC).convert("RGBA")
    bbox = logo.getchannel("A").getbbox()
    if bbox:
        logo = logo.crop(bbox)

    scale = min(LOGO_MAX_W / logo.width, LOGO_MAX_H / logo.height)
    size = (round(logo.width * scale), round(logo.height * scale))
    logo = logo.resize(size, Image.LANCZOS)

    canvas = Image.new("RGB", (CANVAS_W, CANVAS_H), BACKGROUND)
    x = (CANVAS_W - logo.width) // 2
    y = (CANVAS_H - logo.height) // 2
    canvas.paste(logo, (x, y), logo)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG", optimize=True)
    print(f"{OUT.relative_to(ROOT)}: logo {logo.width}x{logo.height} em ({x},{y}), "
          f"{OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
