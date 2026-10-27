// Sprites de pixel art de 12×12. Cada carácter es un píxel:
// k = línea, g = hoja, y = sol, t = mandarina, p = chicle, d = tierra, . = vacío
export const palette: Record<string, string> = {
  k: "var(--line)",
  g: "var(--leaf)",
  y: "var(--sun)",
  t: "var(--tangerine)",
  p: "var(--bubble)",
  d: "var(--muted)",
};

export const sprites = {
  semilla: [
    "............",
    "............",
    "............",
    ".....kk.....",
    "....kyyk....",
    "...kyyyyk...",
    "...ky.yyk...",
    "...kyyyyk...",
    "....kyyk....",
    "..kkkkkkkk..",
    ".kddddddddk.",
    "kkkkkkkkkkkk",
  ],
  brote: [
    "............",
    ".kkk....kkk.",
    "kgggk..kgggk",
    "kggggkkggggk",
    ".kgggkkgggk.",
    "..kkkggkkk..",
    "....kggk....",
    "....kggk....",
    "....kggk....",
    "..kkkkkkkk..",
    ".kddddddddk.",
    "kkkkkkkkkkkk",
  ],
  arbol: [
    "....kkkk....",
    "..kkggggkk..",
    ".kggggggggk.",
    "kggpgggggggk",
    "kgggggggpggk",
    ".kggggggggk.",
    "..kkkttkkk..",
    "....kttk....",
    "....kttk....",
    "..kkkkkkkk..",
    ".kddddddddk.",
    "kkkkkkkkkkkk",
  ],
} as const;

export type SpriteName = keyof typeof sprites;
