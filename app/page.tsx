"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { SPELLS, FEATS, ALL_CLASSES } from "./cards-data";
import type { Card } from "./cards-data";

export default function Home() {
  const [tab, setTab] = useState<"spells" | "feats">("spells");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedSpells, setSelectedSpells] = useState<Set<string>>(new Set());
  const [selectedFeats, setSelectedFeats] = useState<Set<string>>(new Set());
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const router = useRouter();

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
    const ids = selectedCards.map((c) => c.id).join(",");
    router.push(`/print?ids=${ids}`);
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
