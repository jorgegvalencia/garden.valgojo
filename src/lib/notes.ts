import { getCollection, type CollectionEntry } from "astro:content";

export type Note = CollectionEntry<"notes">;

/** Fecha del último riego, o la de plantada si nunca se ha regado */
export const lastWatered = ({ data }: Note) =>
  data.waterings.reduce((latest, { date }) => (date > latest ? date : latest), data.plantedAt);

/** Notas publicadas, de la regada más recientemente a la más antigua */
export async function getNotes() {
  const notes = await getCollection("notes", ({ data }) => !data.draft);
  return notes.sort((a, b) => lastWatered(b).getTime() - lastWatered(a).getTime());
}

/** Primero las enlazadas a mano y después las del mismo tema */
export function getRelated(note: Note, notes: Note[], limit = 3) {
  const others = notes.filter(({ id }) => id !== note.id);
  const manual = note.data.related
    .map(({ id }) => others.find((other) => other.id === id))
    .filter((other): other is Note => Boolean(other));
  const sameTopic = others.filter(
    (other) => other.data.topic === note.data.topic && !manual.includes(other),
  );
  return [...manual, ...sameTopic].slice(0, limit);
}
