// Catálogo de temas y etapas. Las clases van completas para que Tailwind las detecte.
export const topics = {
  frontend: { label: "Frontend", bg: "bg-leaf", hoverBg: "hover:bg-leaf" },
  producto: { label: "Producto", bg: "bg-sun", hoverBg: "hover:bg-sun" },
  videojuegos: { label: "Videojuegos", bg: "bg-bubble", hoverBg: "hover:bg-bubble" },
  cultura: { label: "Cultura", bg: "bg-tangerine", hoverBg: "hover:bg-tangerine" },
  actualidad: { label: "Actualidad", bg: "bg-sky", hoverBg: "hover:bg-sky" },
  musica: { label: "Música", bg: "bg-lilac", hoverBg: "hover:bg-lilac" },
} as const;

export const stages = {
  semilla: { label: "Semilla", description: "Una idea recién plantada: apuntes sueltos y preguntas." },
  brote: { label: "Brote", description: "Empieza a tomar forma, pero aún cambia a menudo." },
  arbol: { label: "Árbol", description: "Bastante madura. Aun así, se sigue regando." },
} as const;

export type Topic = keyof typeof topics;
export type Stage = keyof typeof stages;

export const topicKeys = Object.keys(topics) as [Topic, ...Topic[]];
export const stageKeys = Object.keys(stages) as [Stage, ...Stage[]];

const dateFormat = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC", // las fechas del frontmatter (AAAA-MM-DD) se leen en UTC
});

export const formatDate = (date: Date) => dateFormat.format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
