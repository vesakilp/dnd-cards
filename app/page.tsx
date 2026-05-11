"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type CardType = "spell" | "feat";

type BaseCard = {
  id: string;
  kind: CardType;
  name: string;
  classes: string[];
  level: number;
  description: string;
  details: string[];
};

type SpellCard = BaseCard & {
  kind: "spell";
  school: string;
  castingTime: string;
  range: string;
  duration: string;
};

type FeatCard = BaseCard & {
  kind: "feat";
  featureType: string;
  activation: string;
};

type Card = SpellCard | FeatCard;

const SPELLS: SpellCard[] = [
  {
    id: "spell-guidance",
    kind: "spell",
    name: "Guidance",
    classes: ["Cleric", "Druid"],
    level: 0,
    school: "Divination",
    castingTime: "Action",
    range: "Touch",
    duration: "Concentration, up to 1 minute",
    description:
      "You touch a willing creature and grant it a brief burst of divine insight.",
    details: [
      "Once before the spell ends, the target can roll 1d4 and add it to one ability check.",
      "The die can be rolled before or after making the check.",
    ],
  },
  {
    id: "spell-healing-word",
    kind: "spell",
    name: "Healing Word",
    classes: ["Bard", "Cleric", "Druid"],
    level: 1,
    school: "Evocation",
    castingTime: "Bonus Action",
    range: "60 feet",
    duration: "Instantaneous",
    description: "A creature you can see regains hit points through soothing magic.",
    details: [
      "The target regains 1d4 + your spellcasting ability modifier hit points.",
      "No effect on undead or constructs.",
    ],
  },
  {
    id: "spell-magic-missile",
    kind: "spell",
    name: "Magic Missile",
    classes: ["Sorcerer", "Wizard"],
    level: 1,
    school: "Evocation",
    castingTime: "Action",
    range: "120 feet",
    duration: "Instantaneous",
    description:
      "You create three glowing darts of force that strike creatures of your choice.",
    details: [
      "Each dart hits automatically and deals 1d4 + 1 force damage.",
      "Darts can target one creature or several.",
    ],
  },
  {
    id: "spell-fireball",
    kind: "spell",
    name: "Fireball",
    classes: ["Sorcerer", "Wizard"],
    level: 3,
    school: "Evocation",
    castingTime: "Action",
    range: "150 feet",
    duration: "Instantaneous",
    description:
      "A bright streak flashes and erupts in a roaring explosion of flame.",
    details: [
      "20-foot-radius sphere.",
      "Creatures make a Dexterity save, taking 8d6 fire damage on a failure.",
    ],
  },
  {
    id: "spell-revivify",
    kind: "spell",
    name: "Revivify",
    classes: ["Cleric", "Paladin"],
    level: 3,
    school: "Necromancy",
    castingTime: "Action",
    range: "Touch",
    duration: "Instantaneous",
    description: "You restore life to a creature that has recently died.",
    details: [
      "Must be cast within 1 minute of death.",
      "Creature returns to life with 1 hit point.",
    ],
  },
];

const FEATS: FeatCard[] = [
  {
    id: "feat-arcane-initiate",
    kind: "feat",
    name: "Arcane Initiate",
    classes: ["Wizard", "Sorcerer", "Bard"],
    level: 1,
    featureType: "Class Feat",
    activation: "Passive",
    description: "You have begun formal arcane training and can shape simple spells.",
    details: [
      "Learn one additional cantrip from your class spell list.",
      "Gain proficiency in Arcana.",
    ],
  },
  {
    id: "feat-divine-smite",
    kind: "feat",
    name: "Divine Smite",
    classes: ["Paladin"],
    level: 2,
    featureType: "Class Feat",
    activation: "On hit",
    description: "You channel holy power through a weapon strike.",
    details: [
      "When you hit, expend a spell slot to deal radiant damage.",
      "Extra 1d8 against fiends and undead.",
    ],
  },
  {
    id: "feat-cunning-action",
    kind: "feat",
    name: "Cunning Action",
    classes: ["Rogue"],
    level: 2,
    featureType: "Class Feat",
    activation: "Bonus Action",
    description: "Quick tactics let you reposition and evade in combat.",
    details: [
      "Take Dash, Disengage, or Hide as a bonus action.",
      "You can use this each turn.",
    ],
  },
  {
    id: "feat-action-surge",
    kind: "feat",
    name: "Action Surge",
    classes: ["Fighter"],
    level: 2,
    featureType: "Class Feat",
    activation: "Free action",
    description: "Push beyond your normal limits for a burst of effort.",
    details: [
      "Take one additional action on your turn.",
      "Regain use after a short or long rest.",
    ],
  },
  {
    id: "feat-channel-divinity",
    kind: "feat",
    name: "Channel Divinity",
    classes: ["Cleric"],
    level: 2,
    featureType: "Class Feat",
    activation: "Action",
    description: "You invoke divine power for unique holy effects.",
    details: [
      "Use subclass-specific divine options.",
      "Typically recharges on a short or long rest.",
    ],
  },
];

const ALL_CLASSES = [
  "All",
  ...Array.from(new Set([...SPELLS.flatMap((item) => item.classes), ...FEATS.flatMap((item) => item.classes)])).sort(),
];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPrintHtml(cards: Card[]) {
  const cardHtml = cards
    .map((card) => {
      const meta =
        card.kind === "spell"
          ? `Spell • ${card.school} • Level ${card.level}`
          : `Feat • ${card.featureType} • Level ${card.level}`;
      const extra =
        card.kind === "spell"
          ? `Casting Time: ${card.castingTime} • Range: ${card.range} • Duration: ${card.duration}`
          : `Activation: ${card.activation}`;
      const details = card.details
        .map((line) => `<li>${escapeHtml(line)}</li>`)
        .join("");

      return `
      <article class="card">
        <header>
          <h2>${escapeHtml(card.name)}</h2>
          <p class="meta">${escapeHtml(meta)}</p>
          <p class="classes">Classes: ${escapeHtml(card.classes.join(", "))}</p>
        </header>
        <p class="description">${escapeHtml(card.description)}</p>
        <p class="extra">${escapeHtml(extra)}</p>
        <ul>${details}</ul>
      </article>`;
    })
    .join("");

  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>D&D Cards</title>
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #fff; color: #111; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(2.5in, 1fr)); gap: 0.16in; padding: 0.16in; }
      .card { width: 2.5in; min-height: 3.5in; border: 1px solid #111; border-radius: 0.12in; padding: 0.14in; display: flex; flex-direction: column; gap: 0.06in; break-inside: avoid; }
      h2 { margin: 0; font-size: 14pt; }
      .meta, .classes, .extra { margin: 0; font-size: 8.5pt; color: #333; }
      .description { margin: 0; font-size: 9pt; line-height: 1.3; }
      ul { margin: 0; padding-left: 0.16in; font-size: 8.5pt; line-height: 1.3; }
      @page { margin: 0.35in; size: letter; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    </style>
  </head>
  <body>
    <main class="grid">${cardHtml}</main>
  </body>
</html>`;
}

export default function Home() {
  const [tab, setTab] = useState<"spells" | "feats">("spells");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedSpells, setSelectedSpells] = useState<Set<string>>(new Set());
  const [selectedFeats, setSelectedFeats] = useState<Set<string>>(new Set());
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const levels = useMemo(() => {
    const source = tab === "spells" ? SPELLS : FEATS;
    return ["All", ...Array.from(new Set(source.map((item) => item.level))).sort((a, b) => a - b).map(String)];
  }, [tab]);

  const filteredSpells = useMemo(
    () =>
      SPELLS.filter((item) => {
        const classMatch = selectedClass === "All" || item.classes.includes(selectedClass);
        const levelMatch = selectedLevel === "All" || item.level === Number(selectedLevel);
        return classMatch && levelMatch;
      }),
    [selectedClass, selectedLevel],
  );

  const filteredFeats = useMemo(
    () =>
      FEATS.filter((item) => {
        const classMatch = selectedClass === "All" || item.classes.includes(selectedClass);
        const levelMatch = selectedLevel === "All" || item.level === Number(selectedLevel);
        return classMatch && levelMatch;
      }),
    [selectedClass, selectedLevel],
  );

  const selectedCards = useMemo(() => {
    const spells = SPELLS.filter((spell) => selectedSpells.has(spell.id));
    const feats = FEATS.filter((feat) => selectedFeats.has(feat.id));
    return [...spells, ...feats];
  }, [selectedSpells, selectedFeats]);

  const toggleSelection = (card: Card) => {
    if (card.kind === "spell") {
      setSelectedSpells((prev) => {
        const next = new Set(prev);
        if (next.has(card.id)) {
          next.delete(card.id);
        } else {
          next.add(card.id);
        }
        return next;
      });
      return;
    }

    setSelectedFeats((prev) => {
      const next = new Set(prev);
      if (next.has(card.id)) {
        next.delete(card.id);
      } else {
        next.add(card.id);
      }
      return next;
    });
  };

  const isSelected = (card: Card) => {
    if (card.kind === "spell") {
      return selectedSpells.has(card.id);
    }
    return selectedFeats.has(card.id);
  };

  const handlePrint = () => {
    if (selectedCards.length === 0) {
      return;
    }

    const popup = window.open("", "_blank", "noopener,noreferrer,width=1000,height=700");
    if (!popup) {
      window.alert("Please allow popups to print cards.");
      return;
    }

    popup.document.open();
    popup.document.write(buildPrintHtml(selectedCards));
    popup.document.close();
    popup.focus();
    window.setTimeout(() => popup.print(), 250);
  };

  const visibleItems = tab === "spells" ? filteredSpells : filteredFeats;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>D&amp;D 5.5e Card Builder</h1>
        <p>Select spells and class feats, then print a PDF-ready card sheet.</p>
      </header>

      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <h2>Filters</h2>
          <div className={styles.field}>
            <label htmlFor="class-filter">Class</label>
            <select
              id="class-filter"
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
            >
              {ALL_CLASSES.map((itemClass) => (
                <option key={itemClass} value={itemClass}>
                  {itemClass}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="level-filter">Level</label>
            <select
              id="level-filter"
              value={selectedLevel}
              onChange={(event) => setSelectedLevel(event.target.value)}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.toolbar}>
            <div className={styles.tabs}>
              <button
                className={tab === "spells" ? styles.activeTab : ""}
                onClick={() => {
                  setTab("spells");
                  setSelectedLevel("All");
                }}
                type="button"
              >
                Spells ({filteredSpells.length})
              </button>
              <button
                className={tab === "feats" ? styles.activeTab : ""}
                onClick={() => {
                  setTab("feats");
                  setSelectedLevel("All");
                }}
                type="button"
              >
                Class Feats ({filteredFeats.length})
              </button>
            </div>

            <div className={styles.actions}>
              <span>{selectedCards.length} selected</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedSpells(new Set());
                  setSelectedFeats(new Set());
                }}
              >
                Clear
              </button>
              <button type="button" onClick={handlePrint} disabled={selectedCards.length === 0}>
                Print PDF
              </button>
            </div>
          </div>

          <ul className={styles.list}>
            {visibleItems.map((item) => (
              <li key={item.id} className={styles.listItem}>
                <div className={styles.itemContent}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      {item.kind === "spell" ? item.school : item.featureType} • Level {item.level}
                    </p>
                    <p>Classes: {item.classes.join(", ")}</p>
                  </div>
                  <div className={styles.itemActions}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={isSelected(item)}
                        onChange={() => toggleSelection(item)}
                      />
                      Select
                    </label>
                    <button type="button" onClick={() => setActiveCard(item)}>
                      View
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <button
        className={styles.mobileFilterButton}
        onClick={() => setMobileFiltersOpen(true)}
        type="button"
      >
        Filters
      </button>

      {mobileFiltersOpen ? (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobilePanel}>
            <h2>Filters</h2>
            <div className={styles.field}>
              <label htmlFor="mobile-class-filter">Class</label>
              <select
                id="mobile-class-filter"
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
              >
                {ALL_CLASSES.map((itemClass) => (
                  <option key={itemClass} value={itemClass}>
                    {itemClass}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="mobile-level-filter">Level</label>
              <select
                id="mobile-level-filter"
                value={selectedLevel}
                onChange={(event) => setSelectedLevel(event.target.value)}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" onClick={() => setMobileFiltersOpen(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}

      {activeCard ? (
        <div className={styles.modalOverlay} onClick={() => setActiveCard(null)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <h2>{activeCard.name}</h2>
            <p>
              {activeCard.kind === "spell" ? activeCard.school : activeCard.featureType} • Level {activeCard.level}
            </p>
            <p>Classes: {activeCard.classes.join(", ")}</p>
            <p>{activeCard.description}</p>
            <ul>
              {activeCard.details.map((detail, index) => (
                <li key={`${activeCard.id}-${index}`}>{detail}</li>
              ))}
            </ul>
            <button type="button" onClick={() => setActiveCard(null)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
