export const civilizationsNames: { [key: number]: string } = {
    1: "Zeus",
    2: "Hades",
    3: "Poseidon",
    4: "Ra",
    5: "Isis",
    6: "Set",
    7: "Thor",
    8: "Odin",
    9: "Loki",
    10: "Kronos",
    11: "Oranos",
    12: "Gaia",
    13: "Freyr",
  };

  export const civilizationPortrait: { [key: number]: string } = {
    1: "/gods/greeks/major-gods/zeus_portrait.png",
    2: "/gods/greeks/major-gods/hades_portrait.png",
    3: "/gods/greeks/major-gods/poseidon_portrait.png",
    4: "/gods/egyptians/major-gods/ra_portrait.png",
    5: "/gods/egyptians/major-gods/isis_portrait.png",
    6: "/gods/egyptians/major-gods/set_portrait.png",
    7: "/gods/norse/major-gods/thor_portrait.png",
    8: "/gods/norse/major-gods/odin_portrait.png",
    9: "/gods/norse/major-gods/loki_portrait.png",
    10: "/gods/atlantean/major-gods/kronos_portrait.png",
    11: "/gods/atlantean/major-gods/oranos_portrait.png",
    12: "/gods/atlantean/major-gods/gaia_portrait.png",
    13: "/gods/norse/major-gods/freyr_portrait.png",
  };
  
  export const godPerks: { [key: string]: string[] } = {
    Zeus: [
      "Focus: Infantry and Heroes",
      "Starts with 10 Favor",
      "Gains Favor 20% faster",
      "Myth units cost 1 less population",
      "Infantry do +50% damage to buildings",
      "Hoplites move 15% faster",
    ],
    Hades: [
      "Focus: Ranged Soldiers and Buildings",
      "20% chance for fallen humans to return as Shades",
      "Myth units +15% hitpoints",
      "Ranged soldiers and heroes +1 range",
      "Ranged fortifications +2 range",
      "Ballistics and Burning Pitch are researched instantly for free in their respective ages",
    ],
    Poseidon: [
      "Focus: Cavalry and Economy",
      "Militia spawn from razed buildings",
      "Cavalry, Caravans, and Myth Units +0.4 speed",
      "Stables and Markets are 30% cheaper",
      "Market exchange rates improved by 15%",
      "A free Hippocampus respawns at the first Dock",
    ],
    Ra: [
      "Focus: Migdol Stronghold units and Empowerment",
      "+15% Camel Rider, Chariot Archer, and War Elephant hitpoints",
      "Pharaoh-empowered Monuments empower nearby buildings (70% efficiency of Pharaohs)",
      "Priests can empower (70% efficiency of Pharaohs)",
    ],
    Isis: [
      "Focus: Technology",
      "Town Centers and Citadel Centers support +5 population",
      "Monuments shield against enemy God Powers (25 range; 50 when empowered)",
      "Empowered Monuments heal nearby units (50 range) and generate Favor 100% faster",
      "Technologies cost -10%",
      "Obelisks cost -5 Gold, and are built 60% faster",
    ],
    Set: [
      "Focus: Barracks units",
      "Pharaohs can summon Animals of Set",
      "Priests can convert wild animals, but converted animals lose 25% of their Food",
      "+5% Spearman, Axeman, and Slinger speed",
      "Barracks, Siege Works, and Migdol Strongholds cost -25% Gold",
      "Monuments reduce the cost of units in nearby Barracks and Migdol Strongholds by 5%",
    ],
    Thor: [
      "Focus: Dwarves and Armory",
      "Start with Dwarves instead of Gatherers",
      "Dwarves cost -10 Gold, and gather Food and Wood nearly as fast as Gatherers",
      "Dwarven Armory can be built and research upgrades in any age",
      "Receive a free Dwarf for each Dwarven Armory upgrade researched",
      "Can research 3 extra Dwarven Armory upgrades",
    ],
    Odin: [
      "Focus: Great Hall units",
      "Gatherers and Dwarves gather 10% faster from hunt",
      "Great Hall units generate +25% Favor in battle",
      "Human units and heroes regenerate 0.5 hitpoints/second",
      "2 Raven scouts spawn once the first Temple is built, and respawn a short time after being killed",
    ],
    Loki: [
      "Focus: Myth Units",
      "Damaging enemy units can spawn myth units (Human soldiers contribute 10%; Hersirs 50% of damage dealt)",
      "Human soldiers and heroes +25% counter damage",
      "Buildings are constructed 25% faster",
      "Ox Carts are 50% cheaper",
      "Transforming Gatherers and Dwarves into Berserks is free",
    ],
    Kronos: [
      "Focus: Siege and Myth Units",
      "Can time-shift buildings to new locations (Towers & Palaces cost 50% of their price to shift, others are free)",
      "Buildings are constructed 25% faster per nearby Manor",
      "Receive 2 free myth units instead of 1 when advancing to the next age",
      "Lost siege and myth units return 20% of their resource cost",
    ],
    Oranos: [
      "Focus: Vision and Mobility",
      "Can build a new Sky Passage each age",
      "Units can enter Sky Passages to instantly travel between them",
      "All units have +4 Line of Sight",
      "Oracles generate +25% Favor at full Line of Sight",
      "Damaged enemy units remain visible for 25 seconds",
    ],
    Gaia: [
      "Focus: Economy and Buildings",
      "Start with Hero Citizens and promoting Citizens to heroes costs -25%",
      "Economic Guild upgrades cost -35% and can be researched an age early",
      "Economic Buildings (Town Centers, Manors, Economic Guilds, and Markets) grow Lush",
      "Lush heals friendly units and buildings (1 HP/second)",
    ],
    Freyr: [
      "Focus: Technology and Defense",
      "Has a potent defensive God Power that gets more powerful with each age advancement",
      "Technologies cost -50% Food, Wood, and Gold, but take 150% longer to research",
      "Hill Forts and Hill Fort units +10% damage",
      "Repairing buildings is free",
      "Gatherers and Dwarves can repair",
    ],
  };


  export const godNames: { [key: string]: { id: number; img: string; icon:string; name: string; title: string; description: string } } = {
    Zeus: {
      id: 1,
      img: "/gods/greeks/major-gods/zeus_portrait.png",
      icon: "/gods/greeks/major-gods/zeus_icon.png",
      name: "Zeus",
      title: "King of the Olympian gods",
      description: "Focus: Infantry and Heroes. • Starts with 10 Favor. • Gains Favor 20% faster. • Myth units cost 1 less population. • Infantry do +50% damage to buildings. • Hoplites move 15% faster."
    },
    Hades: {  
      id: 2,
      img: "/gods/greeks/major-gods/hades_portrait.png",
      icon: "/gods/greeks/major-gods/hades_icon.png",
      name: "Hades",
      title: "God of the Underworld",
      description: "Focus: Ranged Soldiers and Buildings. • 20% chance for fallen humans to return as Shades. • Myth units +15% hitpoints. • Ranged soldiers and heroes +1 range. • Ranged fortifications +2 range. • Ballistics and Burning Pitch are researched instantly for free in their respective ages."
    },
    Poseidon: {
      id: 3,
      img: "/gods/greeks/major-gods/poseidon_portrait.png",
      icon: "/gods/greeks/major-gods/poseidon_icon.png",
      name: "Poseidon",
      title: "God of the Sea",
      description: "Focus: Cavalry and Economy. • Militia spawn from razed buildings. • Cavalry, Caravans, and Myth Units +0.4 speed. • Stables and Markets are 30% cheaper. • Market exchange rates improved by 15%. • A free Hippocampus respawns at the first Dock."
    },
    Ra: {
      id: 4,
      img: "/gods/egyptians/major-gods/ra_portrait.png",
      icon: "/gods/egyptians/major-gods/ra_icon.png",
      name: "Ra",
      title: "God of the Sun",
      description: "Focus: Migdol Stronghold units and Empowerment. • +15% Camel Rider, Chariot Archer, and War Elephant hitpoints. • Pharaoh-empowered Monuments empower nearby buildings (70% efficiency of Pharaohs). • Priests can empower (70% efficiency of Pharaohs)."
    },
    Isis: {
      id: 5,
      img: "/gods/egyptians/major-gods/isis_portrait.png",
      icon: "/gods/egyptians/major-gods/isis_icon.png",
      name: "Isis",
      title: "Goddess of Magic and Healing",
      description: "Focus: Technology. • Town Centers and Citadel Centers support +5 population.... • Monuments shield against enemy God Powers (25 range; 50 when empowered). • Empowered Monuments heal nearby units (50 range) and generate Favor 100% faster. • Technologies cost -10%. • Obelisks cost -5 Gold, and are built 60% faster."
    },
    Set: {
      id: 6,
      img: "/gods/egyptians/major-gods/set_portrait.png",
      icon: "/gods/egyptians/major-gods/set_icon.png",
      name: "Set",
      title: "God of Storms and Trickery",
      description: "Focus: Barracks units. • Pharaohs can summon Animals of Set. • Priests can convert wild animals, but converted animals lose 25% of their Food. • +5% Spearman, Axeman, and Slinger speed. • Barracks, Siege Works, and Migdol Strongholds cost -25% Gold. • Monuments reduce the cost of units in nearby Barracks and Migdol Strongholds by 5%."
    },
    Thor: {
      id: 7,
      img: "/gods/norse/major-gods/thor_portrait.png",
      icon: "/gods/norse/major-gods/thor_icon.png",
      name: "Thor",
      title: "God of Thunder, Lightning, and the Skies",
      description: "Focus: Dwarves and Armory. • Start with Dwarves instead of Gatherers. • Dwarves cost -10 Gold, and gather Food and Wood nearly as fast as Gatherers. • Dwarven Armory can be built and research upgrades in any age. • Receive a free Dwarf for each Dwarven Armory upgrade researched. • Can research 3 extra Dwarven Armory upgrades."
    },
    Odin: {
      id: 8,
      img: "/gods/norse/major-gods/odin_portrait.png",
      icon: "/gods/norse/major-gods/odin_icon.png",
      name: "Odin",
      title: "God of War, Magic, and Power",
      description: "Focus: Great Hall units. • Gatherers and Dwarves gather 10% faster from hunt. • Great Hall units generate +25% Favor in battle. • Human units and heroes regenerate 0.5 hitpoints/second. • 2 Raven scouts spawn once the first Temple is built, and respawn a short time after being killed."
    },
    Loki: {
      id: 9,
      img: "/gods/norse/major-gods/loki_portrait.png",
      icon: "/gods/norse/major-gods/loki_icon.png",
      name: "Loki",
      title: "God of Trickery and Shapeshifting",
      description: "Focus: Myth Units. • Damaging enemy units can spawn myth units. (Human soldiers contribute 10%; Hersirs 50% of damage dealt.) • Human soldiers and heroes +25% counter damage. • Buildings are constructed 25% faster. • Ox Carts are 50% cheaper. • Transforming Gatherers and Dwarves into Berserks is free."
    },
    Kronos: {
      id: 10,
      img: "/gods/atlantean/major-gods/kronos_portrait.png",
      icon: "/gods/atlantean/major-gods/kronos_icon.png",
      name: "Kronos",
      title: "Ruler of the Titans",
      description: "Focus: Siege and Myth Units. • Can time-shift buildings to new locations (Towers & Palaces cost 50% of their price to shift, others are free). • Buildings are constructed 25% faster per nearby Manor. • Receive 2 free myth units instead of 1 when advancing to the next age. • Lost siege and myth units return 20% of their resource cost."
    },
    Oranos: {
      id: 11,
      img: "/gods/atlantean/major-gods/oranos_portrait.png",
      icon: "/gods/atlantean/major-gods/oranos_icon.png",
      name: "Oranos",
      title: "Lord of the Skies",
      description: "Focus: Vision and Mobility. • Can build a new Sky Passage each age. • Units can enter Sky Passages to instantly travel between them. • All units have +4 Line of Sight. • Oracles generate +25% Favor at full Line of Sight. • Damaged enemy units remain visible for 25 seconds."
    },
    Gaia: {
      id: 12,
      img: "/gods/atlantean/major-gods/gaia_portrait.png",
      icon: "/gods/atlantean/major-gods/gaia_icon.png",
      name: "Gaia",
      title: "Goddess of the Earth",
      description: "Focus: Economy and Buildings. • Start with Hero Citizens and promoting Citizens to heroes costs -25%. • Economic Guild upgrades cost -35% and can be researched an age early. • Economic Buildings (Town Centers, Manors, Economic Guilds, and Markets) grow Lush. • Lush heals friendly units and buildings (1 HP/second)."
    },
    Freyr: {
      id: 13,
      img: "/gods/norse/major-gods/freyr_portrait.png",
      icon: "/gods/norse/major-gods/freyr_icon.png",
      name: "Freyr",
      title: "God of Fertility and Kingship",
      description: "Focus: Technology and Defense. • Has a potent defensive God Power that gets more powerful with each age advancement. • Technologies cost -50% Food, Wood, and Gold, but take 150% longer to research. • Hill Forts and Hill Fort units +10% damage. • Repairing buildings is free. • Gatherers and Dwarves can repair."
    }
  };