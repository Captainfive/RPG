-- adding World-Name
CREATE TABLE IF NOT EXISTS "world_name" (
    "name" VARCHAR(60)
);

-- adding Actual_gaming_class
CREATE TABLE IF NOT EXISTS "actual_gaming_class" (
    "class_name" VARCHAR(60)
);

-- ::: CLASSES :::

-- WARRIOR !

    -- adding warrior table
CREATE TABLE IF NOT EXISTS "warrior" (
    "name" VARCHAR(60),
    "argent" INTEGER NOT NULL,
    "tête" VARCHAR(40),
    "torse" VARCHAR(40),
    "mains" VARCHAR(40),
    "jambes" VARCHAR(40),
    "pieds" VARCHAR(40),
    "heal" INTEGER NOT NULL,
    "iron_fist" INTEGER NOT NULL,
    "dash" INTEGER NOT NULL,
    "life_points" INTEGER NOT NULL,
    "mana_points" INTEGER NOT NULL,
    "damage_points" INTEGER NOT NULL,
    "block_points" INTEGER NOT NULL,
    "spell_damage" INTEGER
);

    -- pushing in warrior table
INSERT INTO warrior (name, argent, tête, torse, mains, jambes, pieds, heal, iron_fist, dash, life_points, mana_points, damage_points, block_points, spell_damage)
 VALUES
 (?, "500", ?, ?, ?, ?, ?, "120", "350", "180", "750", "350", "120", "180", "0");

-- WIZARD !

    -- adding wizard table
CREATE TABLE IF NOT EXISTS "wizard" (
    "name" VARCHAR(60),
    "argent" INTEGER,
    "tête" VARCHAR(40),
    "torse" VARCHAR(40),
    "mains" VARCHAR(40),
    "jambes" VARCHAR(40),
    "pieds" VARCHAR(40),
    "barrier" INTEGER NOT NULL,
    "frostlin" INTEGER NOT NULL,
    "floor_is_lava" INTEGER NOT NULL,
    "life_points" INTEGER NOT NULL,
    "mana_points" INTEGER NOT NULL,
    "damage_points" INTEGER NOT NULL,
    "block_points" INTEGER NOT NULL,
    "spell_damage" INTEGER
);

    -- pushing in wizard table
INSERT INTO wizard (name, argent, tête, torse, mains, jambes, pieds, barrier, frostlin, floor_is_lava, life_points, mana_points, damage_points, block_points, spell_damage)
 VALUES
 (?, "500", ?, ?, ?, ?, ?, "350", "700", "450", "550", "650", "175", "0", "150");

 -- ROGUE !

    -- adding rogue table
CREATE TABLE IF NOT EXISTS "rogue" (
    "name" VARCHAR(60),
    "argent" INTEGER,
    "tête" VARCHAR(40),
    "torse" VARCHAR(40),
    "mains" VARCHAR(40),
    "jambes" VARCHAR(40),
    "pieds" VARCHAR(40),
    "dodge" INTEGER NOT NULL,
    "execute" INTEGER NOT NULL,
    "fan_of_knives" INTEGER NOT NULL,
    "life_points" INTEGER NOT NULL,
    "mana_points" INTEGER NOT NULL,
    "damage_points" INTEGER NOT NULL,
    "block_points" INTEGER NOT NULL,
    "spell_damage" INTEGER
);

    -- pushing in rogue table
INSERT INTO rogue (name, argent, tête, torse, mains, jambes, pieds, dodge, execute, fan_of_knives, life_points, mana_points, damage_points, block_points, spell_damage)
 VALUES
 (?, "500", ?, ?, ?, ?, "300", "750", "250", "625", "525", "225", "125", "50", "0");


--   ::: SHOP :::

-- adding weapons
CREATE TABLE IF NOT EXISTS "weapons" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "life" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "spell_damage" INTEGER NOT NULL
);

    -- pushing into weapons table
INSERT INTO weapons (name, life, damage, spell_damage)
 VALUES
 ("épée en bois", "0", "25", "0"),
 ("épée en pierre", "15", "50", "0"),
 ("épée en fer", "30", "150", "50"),
 ("épée en acier", "50", "300", "100"),
 ("baton en bois", "0", "10", "25"),
 ("baton en pierre", "10", "20", "50"),
 ("baton en fer", "25", "50", "100"),
 ("baton en acier", "40", "75", "225"),
 ("dague en bois", "10", "25", "10"),
 ("dague en pierre", "25", "50", "25"),
 ("dague en fer", "40", "100", "75"),
 ("dague en acier", "60", "200", "150");

-- adding armors
CREATE TABLE IF NOT EXISTS "armors" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "life" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "spell_damage" INTEGER NOT NULL
);

    -- pushing into armors table
INSERT INTO armors (name, life, mana, damage, spell_damage)
 VALUES
 ("torse en tissus usé", "15", "10", "0", "5"),
 ("torse en tissus neuf", "35", "30", "20", "20"),
 ("torse en maille usé", "30", "0", "0", "0"),
 ("torse en maille neuf", "50", "20", "30", "10"),
 ("torse en lain usé", "10", "15", "0", "10"),
 ("torse en lain neuf", "20", "45", "20", "35");


-- adding helmets
CREATE TABLE IF NOT EXISTS "helmets" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "life" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "spell_damage" INTEGER NOT NULL
);

    -- pushing into helmets table
INSERT INTO helmets (name, life, mana, damage, spell_damage)
 VALUES
 ("casque usé de guerrier", "20", "0", "10", "0"),
 ("casque neuf de guerrier", "50", "20", "30", "10"),
 ("casque usé de mage", "10", "20", "10", "10"),
 ("casque neuf de mage", "25", "35", "20", "45"),
 ("casque usé de voleur", "15", "15", "15", "5"),
 ("casque neuf de voleur", "40", "20", "45", "10");

-- adding pants
CREATE TABLE IF NOT EXISTS "pants" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "life" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "spell_damage" INTEGER NOT NULL
);

    -- pushing into pants table
INSERT INTO pants (name, life, mana, damage, spell_damage)
 VALUES
 ("pantalon usé de guerrier", "25", "0", "5", "0"),
 ("pantalon neuf de guerrier", "50", "25", "25", "25"),
 ("pantalon usé de mage", "20", "20", "0", "10"),
 ("pantalon neuf de mage", "50", "25", "10", "50"),
 ("pantalon usé de voleur", "20", "10", "20", "0"),
 ("pantalon neuf de voleur", "50", "25", "50", "20");

-- adding shoes
CREATE TABLE IF NOT EXISTS "shoes" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "life" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "spell_damage" INTEGER NOT NULL
);

    -- pushing into shoes table
INSERT INTO shoes (name, life, mana, damage, spell_damage)
 VALUES
 ("chaussures usé de guerrier", "15", "0", "10", "0"),
 ("chaussures neuf de guerrier", "35", "15", "30", "0"),
 ("chaussures usé de mage", "10", "10", "0", "10"),
 ("chaussures neuf de mage", "25", "20", "0", "40"),
 ("chaussures usé de voleur", "15", "0", "20", "0"),
 ("chaussures neuf de voleur", "30", "10", "40", "0");