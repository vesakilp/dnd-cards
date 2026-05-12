import Link from "next/link";
import { FEATS, SPELLS } from "../cards-data";
import type { Card } from "../cards-data";
import PrintButton from "./PrintButton";
import styles from "./page.module.css";

export const metadata = { title: "Print Cards – D&D Cards" };

export default async function PrintPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { ids } = await searchParams;
  const idList = typeof ids === "string" ? ids.split(",").filter(Boolean) : [];

  const cards: Card[] = [
    ...SPELLS.filter((c) => idList.includes(c.id)),
    ...FEATS.filter((c) => idList.includes(c.id)),
  ];

  return (
    <div>
      <div className={styles.toolbar}>
        <Link href="/">← Back</Link>
        {cards.length > 0 && <PrintButton />}
        {cards.length > 0 && <span>{cards.length} card{cards.length !== 1 ? "s" : ""}</span>}
      </div>

      {cards.length === 0 ? (
        <div className={styles.empty}>
          <p>No cards selected. Go back and select some cards first.</p>
          <Link href="/">← Back to card builder</Link>
        </div>
      ) : (
        <main className={styles.grid}>
          {cards.map((card) => {
            const meta =
              card.kind === "spell"
                ? `Spell • ${card.school} • Level ${card.level}`
                : `Feat • ${card.featureType} • Level ${card.level}`;
            const extra =
              card.kind === "spell"
                ? `Casting Time: ${card.castingTime} • Range: ${card.range} • Duration: ${card.duration}`
                : `Activation: ${card.activation}`;

            return (
              <article key={card.id} className={styles.card}>
                <header>
                  <h2>{card.name}</h2>
                  <p className={styles.meta}>{meta}</p>
                  <p className={styles.classes}>Classes: {card.classes.join(", ")}</p>
                </header>
                <p className={styles.description}>{card.description}</p>
                <p className={styles.extra}>{extra}</p>
                <ul>
                  {card.details.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </main>
      )}
    </div>
  );
}
