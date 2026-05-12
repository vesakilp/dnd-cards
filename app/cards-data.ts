export type CardType = "spell" | "feat";

type BaseCard = {
  id: string;
  kind: CardType;
  name: string;
  classes: string[];
  level: number;
  description: string;
  details: string[];
};

export type SpellCard = BaseCard & {
  kind: "spell";
  school: string;
  castingTime: string;
  range: string;
  duration: string;
};

export type FeatCard = BaseCard & {
  kind: "feat";
  featureType: string;
  activation: string;
};

export type Card = SpellCard | FeatCard;

export const SPELLS: SpellCard[] = [
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

export const FEATS: FeatCard[] = [
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

export const ALL_CLASSES = [
  "All",
  ...Array.from(
    new Set([...SPELLS.flatMap((item) => item.classes), ...FEATS.flatMap((item) => item.classes)])
  ).sort(),
];
