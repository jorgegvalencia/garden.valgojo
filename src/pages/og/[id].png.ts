import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { stages, topics } from "../../lib/garden";
import { getNotes } from "../../lib/notes";

const SIZE = { width: 1200, height: 630 };
const INK = "#151515";
const PAPER = "#f6f1e7";

const font = (pkg: string, file: string) => readFile(`node_modules/@fontsource/${pkg}/files/${file}`);
const fonts = (async () => [
  { name: "Space Grotesk", data: await font("space-grotesk", "space-grotesk-latin-700-normal.woff"), weight: 700 as const },
  { name: "Space Grotesk", data: await font("space-grotesk", "space-grotesk-latin-400-normal.woff"), weight: 400 as const },
  { name: "Press Start 2P", data: await font("press-start-2p", "press-start-2p-latin-400-normal.woff"), weight: 400 as const },
]);
const fontsPromise = fonts();

interface Card {
  title: string;
  summary: string;
  badges: { label: string; color: string }[];
}

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});

const badge = ({ label, color }: Card["badges"][number]) =>
  h(
    "div",
    {
      background: color,
      color: INK,
      border: `4px solid ${INK}`,
      padding: "10px 20px",
      fontFamily: "Press Start 2P",
      fontSize: 20,
    },
    label.toUpperCase(),
  );

const layout = ({ title, summary, badges }: Card) =>
  h("div", { boxSizing: "border-box", width: "100%", height: "100%", background: PAPER, padding: 48, fontFamily: "Space Grotesk" },
    h(
      "div",
      {
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#fffdf8",
        border: `6px solid ${INK}`,
        boxShadow: `14px 14px 0 ${INK}`,
        padding: 56,
        color: INK,
      },
      [
        h("div", { gap: 16 }, badges.map(badge)),
        h("div", { flexDirection: "column", gap: 24 }, [
          h("div", { fontSize: title.length > 40 ? 64 : 80, fontWeight: 700, lineHeight: 1.05 }, title),
          h("div", { fontSize: 32, color: "#5b574f", lineHeight: 1.3 }, summary),
        ]),
        h("div", { fontFamily: "Press Start 2P", fontSize: 20 }, "GARDEN.VALGOJO.COM"),
      ],
    ),
  );

export const getStaticPaths = (async () => {
  const notes = await getNotes();
  const cards: Record<string, Card> = {
    default: {
      title: "Jorge's Digital Garden",
      summary: "Un jardín digital de ideas a medio crecer.",
      badges: [{ label: "Jardín digital", color: "#ffd23f" }],
    },
  };
  for (const { id, data } of notes) {
    cards[id] = {
      title: data.title,
      summary: data.summary,
      badges: [
        { label: topics[data.topic].label, color: topics[data.topic].hex },
        { label: stages[data.stage].label, color: "#fffdf8" },
      ],
    };
  }
  return Object.entries(cards).map(([id, card]) => ({ params: { id }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ card: Card }> = async ({ props }) => {
  const svg = await satori(layout(props.card) as never, { ...SIZE, fonts: await fontsPromise });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: SIZE.width } }).render().asPng();
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
